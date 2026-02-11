# Assets manifest

- Кидай файлы в `assets/img` или `assets/sfx`.
- Пушь в GitHub — workflow сам обновит `assets.manifest.json`.
- В Figma Make надо `fetch(MANIFEST_URL)` и пользоваться `ASSETS.img.target` / `ASSETS.sfx.hit`.

```js
const CDN_BASE = "https://cdn.jsdelivr.net/gh/onegiantmoth/moth_assets@main/";
const MANIFEST_URL = CDN_BASE + "assets.manifest.json";
```
