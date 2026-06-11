/**
 * IVANAPAM — carrega configuração central (data/site.json + manifest de imagens).
 * Para escalar: edite data/site.json e execute `py scripts/process_images.py`.
 */
(function () {
  "use strict";

  const SITE_URL = "data/site.json";
  const MANIFEST_URL = "assets/img/manifest.json";

  function resolveGallery(siteGallery, manifest) {
    const files = new Map((manifest || []).map((m) => [m.id, m]));
    return (siteGallery || []).map((item) => {
      const asset = files.get(item.id) || {};
      const base = `assets/img/gallery/${item.id}`;
      return {
        id: item.id,
        key: item.captionKey,
        captionKey: item.captionKey,
        src: asset.full || asset.fullJpg || `${base}.webp`,
        srcJpg: asset.fullJpg || `${base}.jpg`,
        fullHd: asset.fullHd || asset.fullHdJpg,
        full4k: asset.full4k,
        full4kJpg: asset.full4kJpg,
        fullHdJpg: asset.fullHdJpg,
        thumb: asset.thumb || asset.thumbJpg || `assets/img/thumbs/${item.id}.webp`,
        width: asset.width || 3840,
        height: asset.height || 2160,
      };
    });
  }

  function applyContactToDom(config) {
    const wa = config.site?.whatsappPrimary;
    const email = config.site?.email;
    const domain = config.site?.domain;
    const instagram = config.site?.instagram;
    const instagramHandle = config.site?.instagramHandle;

    document.querySelectorAll("[data-dynamic-wa]").forEach((el) => {
      if (wa) el.href = `https://wa.me/${wa}`;
    });

    document.querySelectorAll("[data-dynamic-email]").forEach((el) => {
      if (email) {
        el.href = `mailto:${email}`;
        if (el.tagName === "A" || el.dataset.dynamicText === "true") el.textContent = email;
      }
    });

    document.querySelectorAll("[data-dynamic-domain]").forEach((el) => {
      if (domain) {
        el.href = `https://${domain}`;
        if (el.dataset.dynamicText === "true") el.textContent = domain;
      }
    });

    document.querySelectorAll("[data-dynamic-instagram]").forEach((el) => {
      if (instagram) {
        el.href = instagram;
        if (el.dataset.dynamicText === "true" && instagramHandle) {
          el.textContent = instagramHandle;
        }
      }
    });
  }

  async function loadConfig() {
    const bust = Date.now();
    const [siteRes, manifestRes] = await Promise.all([
      fetch(`${SITE_URL}?v=${bust}`, { cache: "no-cache" }),
      fetch(`${MANIFEST_URL}?v=${bust}`, { cache: "no-cache" }).catch(() => null),
    ]);

    if (!siteRes.ok) throw new Error(`Failed to load ${SITE_URL}`);

    const site = await siteRes.json();
    const manifest = manifestRes?.ok ? await manifestRes.json() : [];

    const gallery = resolveGallery(site.gallery, manifest);

    const config = {
      ...site,
      gallery,
    };

    window.IV_CONFIG = config;
    window.IV_SITE = site.site;
    window.IV_IMG = site.images;
    window.IV_GALLERY = gallery;
    window.IV_PHONES = site.phones || [];
    window.IV_SERVICES_DEF = site.services || [];
    window.IV_PARTNERS_DEF = site.partners || [];
    window.IV_CATEGORIES_DEF = site.serviceCategories || [];

    applyContactToDom(site);
    if (window.IV_media) {
      window.IV_media.applyHeroMedia(site.images);
      window.IV_media.applyAboutMedia(site.images);
    }
    window.dispatchEvent(new CustomEvent("config-ready", { detail: config }));
    return config;
  }

  window.IV_loadConfig = loadConfig;

  loadConfig().catch((err) => {
    console.error("[IVANAPAM] Config load failed:", err);
    window.IV_CONFIG = {
      site: { name: "IVANAPAM Solutions", whatsappPrimary: "244925484438", email: "ivanapamsolutions@gmail.com" },
      phones: [],
      services: [],
      partners: [],
      serviceCategories: [],
      gallery: [],
    };
    window.IV_GALLERY = [];
    window.dispatchEvent(new CustomEvent("config-ready", { detail: window.IV_CONFIG }));
  });
})();
