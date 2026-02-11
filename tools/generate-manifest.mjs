import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const REPO_ASSETS_DIR = "assets";
const OUT_FILE = "assets.manifest.json";

// TODO: ЗАМЕНИ НА МОИ:
const GITHUB_USER = "onegiantmoth";
const GITHUB_REPO = "moth_assets";
const GITHUB_BRANCH = "main";

const CDN_BASE = `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}/`;

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const st = await stat(full);
    if (st.isDirectory()) files.push(...(await walk(full)));
    else files.push(full.replaceAll("\\", "/"));
  }
  return files;
}

function safeKey(s) {
  return s.replace(/[^a-zA-Z0-9_]/g, "_");
}

function setNested(obj, parts, value) {
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    cur[k] ||= {};
    cur = cur[k];
  }
  cur[parts[parts.length - 1]] = value;
}

const files = await walk(REPO_ASSETS_DIR);

const manifest = {
  base: CDN_BASE,
  files: {},
  flat: {},
};

for (const file of files) {
  // file like "assets/img/target.png"
  const rel = file.replace(/^assets\//, ""); // "img/target.png"
  const url = CDN_BASE + "assets/" + rel;

  const noExt = rel.replace(/\.[^/.]+$/, ""); // "img/target"
  const parts = noExt.split("/").map(safeKey);

  setNested(manifest.files, parts, url);
  manifest.flat[noExt] = url;
}

await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2), "utf8");
console.log(`Wrote ${OUT_FILE} with ${files.length} assets`);
