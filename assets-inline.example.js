/**
 * Inline fallback manifest for runtimes where remote git-assets.json
 * cannot be fetched. Keep keys aligned with git-assets.json.
 */
export const ASSETS = {
  images: {
    target: "https://cdn.jsdelivr.net/gh/onegiantmoth/moth_assets@main/assets/img/target.png",
    crosshair: "https://cdn.jsdelivr.net/gh/onegiantmoth/moth_assets@main/assets/img/crosshair.png"
  },
  audio: {},
  svg: {},
  cssChunks: {}
};
