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

  window.IV_utils = { escapeHtml, normalize, onReady };
})();
