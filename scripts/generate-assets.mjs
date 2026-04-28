/**
 * Génère :
 *  - Versions WebP de toutes les images de public/images
 *  - Favicons multi-tailles depuis public/logos/logo-acte2.jpg
 *  - apple-touch-icon (180x180)
 *  - favicon.ico (multi-tailles 16/32/48 fusionnés)
 *  - OG image par défaut (1200x630)
 *
 * Lance avec :
 *   node scripts/generate-assets.mjs
 */

import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const PUB = path.resolve("public");
const IMAGES_DIR = path.join(PUB, "images");
const LOGOS_DIR = path.join(PUB, "logos");
const LOGO_SRC = path.join(LOGOS_DIR, "logo-acte2.jpg");

// ─────────────────────────────────────────────────────────────────────────────
// 1. Conversion WebP des photos
// ─────────────────────────────────────────────────────────────────────────────

async function convertImagesToWebp() {
  const files = await readdir(IMAGES_DIR);
  const candidates = files.filter((f) => /\.(jpe?g|png)$/i.test(f));

  for (const f of candidates) {
    const src = path.join(IMAGES_DIR, f);
    const out = path.join(IMAGES_DIR, f.replace(/\.(jpe?g|png)$/i, ".webp"));

    if (existsSync(out)) {
      // Saute si déjà converti (idempotent)
      console.log(`  · ${f} → déjà converti, skip`);
      continue;
    }

    await sharp(src)
      .webp({ quality: 82, effort: 4 })
      .toFile(out);

    console.log(`  ✓ ${f} → ${path.basename(out)}`);
  }

  // Logo aussi en WebP
  const logoWebp = path.join(LOGOS_DIR, "logo-acte2.webp");
  if (!existsSync(logoWebp)) {
    await sharp(LOGO_SRC).webp({ quality: 90 }).toFile(logoWebp);
    console.log(`  ✓ logo-acte2.jpg → logo-acte2.webp`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Favicons & icônes PWA
// ─────────────────────────────────────────────────────────────────────────────

async function generateFavicons() {
  // Source : on prend le logo, on le centre sur un fond noir avec un peu de
  // padding pour que ce soit lisible aux petites tailles.
  const baseSquare = await sharp(LOGO_SRC)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 10, g: 10, b: 10, alpha: 1 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();

  // Toutes les tailles standard
  const targets = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-48x48.png", size: 48 },
    { name: "favicon-96x96.png", size: 96 },
    { name: "android-chrome-192x192.png", size: 192 },
    { name: "android-chrome-512x512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "apple-touch-icon-precomposed.png", size: 180 },
    { name: "mstile-150x150.png", size: 150 },
    { name: "mstile-310x310.png", size: 310 },
  ];

  for (const t of targets) {
    const out = path.join(PUB, t.name);
    await sharp(baseSquare)
      .resize(t.size, t.size, { fit: "fill" })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`  ✓ ${t.name} (${t.size}×${t.size})`);
  }

  // favicon.ico — png minimaliste (Next.js l'accepte aussi en .ico via PNG)
  await sharp(baseSquare)
    .resize(48, 48, { fit: "fill" })
    .toFile(path.join(PUB, "favicon.ico"));
  console.log(`  ✓ favicon.ico (48×48)`);

  // Safari pinned tab (SVG simple — couleur or)
  const safariSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#0a0a0a"/>
  <text x="50" y="62" font-family="Georgia, serif" font-size="56" font-weight="700" fill="#F5C518" text-anchor="middle">2</text>
</svg>`;
  await writeFile(path.join(PUB, "safari-pinned-tab.svg"), safariSvg, "utf-8");
  console.log(`  ✓ safari-pinned-tab.svg`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. OG image par défaut (1200×630)
// ─────────────────────────────────────────────────────────────────────────────

async function generateOgDefault() {
  const out = path.join(PUB, "og-default.jpg");
  if (existsSync(out)) {
    console.log("  · og-default.jpg existe déjà, skip");
    return;
  }

  // SVG composite "L'Acte 2" + "Happy Culture" + "Lyon 9"
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#141416"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#F5C518"/>
  <rect x="0" y="624" width="1200" height="6" fill="#F5C518"/>
  <text x="100" y="170" font-family="Georgia, serif" font-size="36" fill="#F5C518" font-style="italic" letter-spacing="6">HAPPY CULTURE</text>
  <text x="100" y="320" font-family="Georgia, serif" font-size="120" font-weight="700" fill="#fffbec">Acte <tspan fill="#F5C518" font-style="italic">2</tspan> Théâtre</text>
  <text x="100" y="400" font-family="Georgia, serif" font-size="44" fill="#fffbec" opacity="0.82">Théâtre de proximité — Lyon 9</text>
  <text x="100" y="540" font-family="Inter, system-ui, sans-serif" font-size="24" fill="#C9151E" font-weight="600" letter-spacing="3">SAISON 2025-2026 · 30 SPECTACLES · 100 PLACES</text>
</svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(out);
  console.log(`  ✓ og-default.jpg (1200×630)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

console.log("→ Génération des assets L'Acte 2\n");

console.log("─ WebP des photos ─");
await convertImagesToWebp();

console.log("\n─ Favicons / icônes PWA ─");
await mkdir(PUB, { recursive: true });
await generateFavicons();

console.log("\n─ OG image par défaut ─");
await generateOgDefault();

console.log("\n🎉 Assets générés.");
