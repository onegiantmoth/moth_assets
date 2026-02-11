# Figma Make + GitHub Assets

Use this repo as the source of truth for runtime assets.

## Canonical manifest

- Remote manifest: `git-assets.json`
- URL: `https://cdn.jsdelivr.net/gh/onegiantmoth/moth_assets@main/git-assets.json`
- Fallback URL: `https://raw.githubusercontent.com/onegiantmoth/moth_assets/main/git-assets.json`

## Runtime strategy

1. Try to fetch remote `git-assets.json`.
2. If fetch fails, use inline fallback object from `assets-inline.example.js`.
3. Resolve all assets by URL only (no local runtime asset folder required).

## Suggested prompt block for Figma Make

```text
Load assets from this manifest first:
https://cdn.jsdelivr.net/gh/onegiantmoth/moth_assets@main/git-assets.json

Fallback:
https://raw.githubusercontent.com/onegiantmoth/moth_assets/main/git-assets.json

If manifest fetch fails, use inline ASSETS object with same keys.
Use remote URLs only for png/jpg/webp/svg/audio/css chunks.
Do not assume a local public/assets folder exists.
```

## Updating assets

1. Add files under `assets/` (example: `assets/img/new.png`).
2. Add entries to `git-assets.json`.
3. Keep `assets-inline.example.js` synchronized.
4. Commit and push to `main` (or update `ref` to tag/commit for stable shares).
