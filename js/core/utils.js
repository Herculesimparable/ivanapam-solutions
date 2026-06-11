/** Utilitários partilhados — escaláveis para novos módulos */
(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalize(str) {
    return String(str)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function onReady(event, fn) {
    if (event === "config-ready" && window.IV_CONFIG) {
      fn({ detail: window.IV_CONFIG });
      return;
    }
    window.addEventListener(event, fn, { once: true });
  }

  /** Prefixo para GitHub Pages (/ivanapam-solutions/) e localhost (/). */
  function getBasePath() {
    const match = location.pathname.match(/^(.*\/ivanapam-solutions)\/?/);
    return match ? `${match[1]}/` : "/";
  }

  function assetUrl(path) {
    if (!path || /^https?:\/\//i.test(path) || path.startsWith("data:")) return path || "";
    const clean = String(path).replace(/^\//, "");
    const base = getBasePath();
    return base === "/" ? clean : `${base}${clean}`;
  }

  window.IV_utils = { escapeHtml, normalize, onReady, getBasePath, assetUrl };
})();
