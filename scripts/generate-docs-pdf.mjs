/**
 * Génère 2 PDFs stylisés à partir des fichiers Markdown de docs/ :
 *   - docs/GUIDE-ADMINISTRATEUR.md  → docs/pdf/Guide-administrateur.pdf
 *   - docs/NOTICE-TECHNIQUE.md      → docs/pdf/Notice-technique.pdf
 *
 * Style : palette Acte 2 (or rideau, rouge, noir), typo Playfair Display
 * pour les titres, Inter pour le texte. Logo en en-tête de chaque page,
 * numérotation en pied de page.
 *
 * Lance avec :
 *   node scripts/generate-docs-pdf.mjs
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import puppeteer from "puppeteer";

const DOCS_DIR = path.resolve("docs");
const OUT_DIR = path.join(DOCS_DIR, "pdf");

const FILES = [
  {
    md: "GUIDE-ADMINISTRATEUR.md",
    pdf: "Guide-administrateur.pdf",
    title: "Guide administrateur",
    subtitle: "Acte 2 Théâtre — back-office Sanity",
    accent: "#C9151E", // rouge
  },
  {
    md: "NOTICE-TECHNIQUE.md",
    pdf: "Notice-technique.pdf",
    title: "Notice technique",
    subtitle: "Acte 2 Théâtre — stack, SEO, conformité",
    accent: "#F5C518", // or rideau
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CSS print-friendly aux couleurs Acte 2
// ─────────────────────────────────────────────────────────────────────────────

function htmlShell({ title, subtitle, accent, content }) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${title} — Acte 2 Théâtre</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
  :root {
    --or: #F5C518;
    --rouge: #C9151E;
    --noir: #0A0A0A;
    --craie: #FFFBEC;
    --gris-clair: #f3f1ec;
    --gris-fonce: #555;
    --accent: ${accent};
  }

  * { box-sizing: border-box; }

  @page {
    size: A4;
    margin: 18mm 16mm 22mm 16mm;
  }

  html, body {
    font-family: "Inter", system-ui, sans-serif;
    color: var(--noir);
    line-height: 1.55;
    font-size: 10.5pt;
    background: #fff;
    margin: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* COVER PAGE */
  .cover {
    page-break-after: always;
    height: calc(297mm - 40mm);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background:
      radial-gradient(ellipse at top, rgba(245,197,24,0.18), transparent 60%),
      linear-gradient(180deg, #141416 0%, #0a0a0a 100%);
    color: var(--craie);
    padding: 24mm 16mm;
    margin: -18mm -16mm 0;
    position: relative;
  }

  .cover::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3mm;
    background: linear-gradient(90deg, transparent, var(--or) 50%, transparent);
  }
  .cover::after {
    content: "";
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3mm;
    background: linear-gradient(90deg, transparent, var(--or) 50%, transparent);
  }

  .cover .kicker {
    font-family: "Playfair Display", Georgia, serif;
    font-style: italic;
    font-size: 14pt;
    color: var(--or);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 10mm;
  }

  .cover h1 {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 38pt;
    font-weight: 600;
    line-height: 1.1;
    margin: 0 0 6mm 0;
    border: none;
    color: var(--craie);
  }

  .cover .subtitle {
    font-size: 13pt;
    color: rgba(255, 251, 236, 0.75);
    max-width: 120mm;
    margin: 0 auto 16mm;
    font-style: italic;
  }

  .cover .meta {
    font-size: 9pt;
    color: rgba(255, 251, 236, 0.55);
    text-transform: uppercase;
    letter-spacing: 0.18em;
  }

  .cover .brand {
    margin-top: 20mm;
    padding-top: 10mm;
    border-top: 1px solid rgba(245,197,24,0.3);
    font-family: "Playfair Display", Georgia, serif;
    font-size: 14pt;
  }
  .cover .brand .acte2 .num { color: var(--or); font-style: italic; }
  .cover .brand .happy {
    display: block;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.32em;
    color: var(--or);
    margin-top: 1mm;
  }

  /* PAGES SUIVANTES */
  main {
    max-width: 100%;
  }

  h1, h2, h3, h4, h5 {
    font-family: "Playfair Display", Georgia, serif;
    font-weight: 600;
    color: var(--noir);
    page-break-after: avoid;
  }

  h1 {
    font-size: 22pt;
    margin: 12mm 0 6mm;
    border-bottom: 2px solid var(--accent);
    padding-bottom: 3mm;
    page-break-before: always;
  }
  h1:first-of-type { page-break-before: auto; margin-top: 0; }

  h2 {
    font-size: 15pt;
    margin: 10mm 0 4mm;
    color: var(--accent);
  }

  h3 {
    font-size: 12pt;
    margin: 7mm 0 2mm;
    color: var(--noir);
  }

  h4 {
    font-size: 10.5pt;
    margin: 4mm 0 1mm;
    color: var(--gris-fonce);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p { margin: 0 0 3mm; text-align: justify; hyphens: auto; }

  a { color: var(--rouge); text-decoration: none; border-bottom: 1px solid rgba(201,21,30,0.3); }

  blockquote {
    margin: 4mm 0;
    padding: 3mm 5mm;
    border-left: 3px solid var(--or);
    background: rgba(245,197,24,0.08);
    color: var(--gris-fonce);
    font-style: italic;
  }

  code, kbd {
    font-family: "SFMono-Regular", "Menlo", "Consolas", monospace;
    font-size: 0.85em;
    background: var(--gris-clair);
    padding: 0.5mm 1.5mm;
    border-radius: 1mm;
  }

  pre {
    background: #1a1a1c;
    color: #f3f1ec;
    padding: 4mm 5mm;
    border-radius: 2mm;
    font-size: 8.5pt;
    line-height: 1.4;
    overflow-x: hidden;
    page-break-inside: avoid;
    margin: 4mm 0;
  }
  pre code {
    background: none;
    color: inherit;
    padding: 0;
  }

  ul, ol {
    margin: 0 0 4mm 6mm;
    padding: 0;
  }
  li { margin-bottom: 1mm; }
  li::marker { color: var(--accent); }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 4mm 0 6mm;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 2mm 3mm;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: var(--noir);
    color: var(--craie);
    font-family: "Playfair Display", Georgia, serif;
    font-weight: 600;
    font-size: 9.5pt;
  }
  tr:nth-child(even) td { background: #fafaf7; }

  hr {
    border: none;
    border-top: 1px solid #e0dccd;
    margin: 8mm 0;
  }

  strong { color: var(--noir); font-weight: 600; }
  em { color: var(--gris-fonce); }

  /* badges/chips inline */
  .badge {
    display: inline-block;
    padding: 0.5mm 2mm;
    border-radius: 4px;
    background: rgba(245,197,24,0.15);
    color: #74511a;
    font-size: 8pt;
    font-weight: 600;
  }
</style>
</head>
<body>
  <header class="cover">
    <div class="kicker">${subtitle}</div>
    <h1>${title}</h1>
    <p class="subtitle">Document préparé pour Acte 2 Théâtre — version 1.0</p>
    <p class="meta">28 avril 2026 · Réalisation Kayzen Web</p>
    <div class="brand">
      <div class="acte2">Acte <span class="num">2</span> Théâtre</div>
      <span class="happy">Happy Culture</span>
    </div>
  </header>

  <main>${content}</main>
</body>
</html>`;
}

const HEADER_TEMPLATE = `<div style="font-family: Inter, sans-serif; font-size: 8pt; color: #999; width: 100%; padding: 0 14mm; display: flex; justify-content: space-between; align-items: center;">
  <span style="font-family: Playfair Display, Georgia, serif; font-size: 10pt; color: #0a0a0a;">
    Acte <span style="color: #F5C518; font-style: italic;">2</span> Théâtre
  </span>
  <span class="title"></span>
</div>`;

const FOOTER_TEMPLATE = `<div style="font-family: Inter, sans-serif; font-size: 7.5pt; color: #999; width: 100%; padding: 0 14mm; display: flex; justify-content: space-between;">
  <span>Réalisé par Kayzen Web</span>
  <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
</div>`;

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

await mkdir(OUT_DIR, { recursive: true });

console.log("→ Lancement de Puppeteer…");
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

for (const f of FILES) {
  const mdPath = path.join(DOCS_DIR, f.md);
  const md = await readFile(mdPath, "utf-8");

  // Marked en mode sécurisé, gfm activé
  const html = marked.parse(md, {
    gfm: true,
    breaks: false,
  });

  const fullHtml = htmlShell({
    title: f.title,
    subtitle: f.subtitle,
    accent: f.accent,
    content: html,
  });

  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: "networkidle0" });
  await page.emulateMediaType("print");

  const outPath = path.join(OUT_DIR, f.pdf);
  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: HEADER_TEMPLATE.replace(
      'class="title"></span>',
      `class="title">${f.title}</span>`
    ),
    footerTemplate: FOOTER_TEMPLATE,
    margin: { top: "20mm", bottom: "22mm", left: "16mm", right: "16mm" },
  });

  await page.close();
  console.log(`  ✓ ${f.pdf}`);
}

await browser.close();
console.log("\n🎉 PDFs générés dans docs/pdf/");
