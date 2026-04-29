// Renomme "L'Acte 2" → "Acte 2 Théâtre" dans le code source.
// Couvre toutes les variantes typographiques (apostrophes, &nbsp;, &rsquo;).
// N'altère PAS : URLs, emails, classes CSS, slugs, noms de packages.

import { readFileSync, writeFileSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = new URL("../", import.meta.url).pathname.replace(/^\//, "");
const SCAN_DIRS = ["src", "docs"];
const ALLOWED_EXT = new Set([".ts", ".tsx", ".css", ".md", ".mdx", ".json"]);
const SKIP_DIRS = new Set(["node_modules", ".next", "dist", "build", "out"]);

const REPLACEMENTS = [
  // Variantes avec L' / L&rsquo; / L’ + espace ou nbsp + 2
  [/L(?:&rsquo;|&#8217;|'|’)Acte(?:&nbsp;|&#160;| |\s)2/g, "Acte 2 Théâtre"],
  // Standalone bien ciblés (la marque, sans "L'")
  [/\bsalle d'Acte 2\b(?! Théâtre)/g, "salle d'Acte 2 Théâtre"],
  [/\bà Acte 2\b(?! Théâtre)/g, "à Acte 2 Théâtre"],
  [/\bchez Acte 2\b(?! Théâtre)/g, "chez Acte 2 Théâtre"],
  [/\b(de|du) Acte 2\b(?! Théâtre)/g, "$1 Acte 2 Théâtre"],
  // hall Acte 2 / Logo officiel Acte 2 → uniquement dans commentaires/code
  [/hall Acte 2(?! Théâtre)/g, "hall Acte 2 Théâtre"],
  [/Logo officiel Acte 2(?! Théâtre)/g, "Logo officiel Acte 2 Théâtre"],
];

let totalChanged = 0;
const changedFiles = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full);
    else if (ALLOWED_EXT.has(extname(e.name))) processFile(full);
  }
}

function processFile(path) {
  const src = readFileSync(path, "utf8");
  let out = src;
  for (const [re, sub] of REPLACEMENTS) out = out.replace(re, sub);
  if (out !== src) {
    const matches = src.match(REPLACEMENTS[0][0]) || [];
    writeFileSync(path, out, "utf8");
    changedFiles.push({ path, occurrences: matches.length });
    totalChanged += matches.length;
  }
}

for (const dir of SCAN_DIRS) {
  try {
    statSync(dir);
    await walk(dir);
  } catch {
    /* skip */
  }
}

console.log(`\n${changedFiles.length} fichier(s) modifié(s), ${totalChanged} occurrences remplacées.\n`);
for (const f of changedFiles) console.log(`  ${f.occurrences.toString().padStart(3)}  ${f.path}`);
