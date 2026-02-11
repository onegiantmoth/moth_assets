const INLINE_ASSETS = {
  images: {
    target: "https://cdn.jsdelivr.net/gh/onegiantmoth/moth_assets@main/assets/img/target.png",
    crosshair: "https://cdn.jsdelivr.net/gh/onegiantmoth/moth_assets@main/assets/img/crosshair.png"
  }
};

const REMOTE_MANIFEST_URLS = [
  "https://cdn.jsdelivr.net/gh/onegiantmoth/moth_assets@main/git-assets.json",
  "https://raw.githubusercontent.com/onegiantmoth/moth_assets/main/git-assets.json"
];

const statusEl = document.getElementById("status");
const startBtn = document.getElementById("start-btn");
const popupBtn = document.getElementById("popup-btn");
const closeBtn = document.getElementById("close-btn");
const modalEl = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const targetImg = document.getElementById("asset-target");
const crosshairImg = document.getElementById("asset-crosshair");

async function loadManifest() {
  for (const url of REMOTE_MANIFEST_URLS) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        continue;
      }

      return await response.json();
    } catch {
      // Ignore and try next URL.
    }
  }

  return null;
}

function getImageUrl(manifest, key) {
  const imageEntry = manifest?.assets?.images?.[key];
  if (!imageEntry) {
    return INLINE_ASSETS.images[key] || "";
  }

  return imageEntry.url || imageEntry.fallbackUrl || INLINE_ASSETS.images[key] || "";
}

function setStatus(text) {
  statusEl.textContent = text;
}

function openModal(message) {
  modalText.textContent = message;
  modalEl.classList.remove("hidden");
}

function closeModal() {
  modalEl.classList.add("hidden");
}

startBtn.addEventListener("click", () => {
  openModal("Game start requested. Core game loop is intentionally not implemented in this test build.");
});

popupBtn.addEventListener("click", () => {
  openModal("Popup test successful. This confirms button wiring and modal behavior.");
});

closeBtn.addEventListener("click", closeModal);
modalEl.addEventListener("click", (event) => {
  if (event.target === modalEl) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

async function init() {
  const manifest = await loadManifest();

  targetImg.src = getImageUrl(manifest, "target");
  crosshairImg.src = getImageUrl(manifest, "crosshair");

  if (manifest) {
    setStatus("Assets loaded via remote git-assets.json");
  } else {
    setStatus("Manifest fetch failed. Inline asset fallback is active.");
  }
}

init();
