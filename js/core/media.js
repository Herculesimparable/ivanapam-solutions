/** Helpers para imagens responsivas 4K / WebP */
(function () {
  "use strict";

  const resolveUrl = (path, { raw = false } = {}) => {
    if (!path) return "";
    if (raw) {
      return window.IV_utils?.assetUrl ? window.IV_utils.assetUrl(path) : path;
    }
    return path;
  };

  function escAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function buildSrcSet(item, raw = false) {
    const url = (path) => resolveUrl(path, { raw });
    const parts = [];
    if (item.thumb) parts.push(`${url(item.thumb)} 640w`);
    if (item.full || item.fullJpg) parts.push(`${url(item.full || item.fullJpg)} 1200w`);
    if (item.fullHd || item.fullHdJpg) parts.push(`${url(item.fullHd || item.fullHdJpg)} 1920w`);
    if (item.full4k || item.full4kJpg) parts.push(`${url(item.full4k || item.full4kJpg)} 3840w`);
    return parts.join(", ");
  }

  function pictureHtml(opts) {
    const {
      thumb,
      full,
      fullJpg,
      fullHd,
      fullHdJpg,
      full4k,
      full4kJpg,
      alt,
      className = "",
      loading = "lazy",
      sizes = "(max-width: 640px) 100vw, (max-width: 1200px) 80vw, 1200px",
      width = 1600,
      height = 1200,
      eager = false,
    } = opts;

    const raw = Boolean(opts.raw);
    const url = (path) => resolveUrl(path, { raw });
    const srcset = buildSrcSet(opts, raw);
    const fallback = url(fullJpg || full || fullHdJpg || full4kJpg || "");
    const loadAttr = eager || loading === "eager" ? 'loading="eager" fetchpriority="high"' : 'loading="lazy" decoding="async"';

    return `
      <picture>
        ${full4k ? `<source type="image/webp" srcset="${url(full4k)}" media="(min-width: 2000px)">` : ""}
        ${fullHd ? `<source type="image/webp" srcset="${url(fullHd)}">` : ""}
        ${full ? `<source type="image/webp" srcset="${url(full)}">` : ""}
        <img
          class="${className}"
          src="${fallback}"
          ${srcset ? `srcset="${srcset}" sizes="${sizes}"` : ""}
          alt="${escAttr(alt)}"
          width="${width}"
          height="${height}"
          ${loadAttr}
        >
      </picture>`;
  }

  function applyHeroMedia(images) {
    const frame = document.querySelector(".hero__frame");
    if (!frame || !images) return;

    const alt = document.querySelector(".hero__banner")?.getAttribute("alt") || "IVANAPAM Solutions";
    frame.innerHTML = pictureHtml({
      full: images.hero,
      fullJpg: images.heroJpg,
      full4k: images.hero4k,
      full4kJpg: images.hero4kJpg,
      raw: true,
      alt,
      className: "hero__banner",
      sizes: "(max-width: 768px) 96vw, 920px",
      width: 2160,
      height: 1438,
      eager: true,
    });

    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = resolveUrl(images.hero || images.heroJpg, { raw: true });
    preload.type = images.hero?.endsWith(".webp") ? "image/webp" : "image/jpeg";
    document.head.appendChild(preload);
  }

  function applyAboutMedia(images) {
    const img = document.querySelector(".about__frame img");
    if (!img || !images) return;
    if (images.about) img.src = resolveUrl(images.about, { raw: true });
    if (images.aboutJpg) img.dataset.jpg = resolveUrl(images.aboutJpg, { raw: true });
  }

  window.IV_media = { buildSrcSet, pictureHtml, applyHeroMedia, applyAboutMedia };
})();
