(function () {

  "use strict";



  const { escapeHtml, normalize, onReady } = window.IV_utils || {

    escapeHtml: (s) => s,

    normalize: (s) => s,

    onReady: (ev, fn) => (window.IV_CONFIG ? fn() : window.addEventListener(ev, fn, { once: true })),

  };



  const BOOKING_KEY = "ivanapam-booking";

  const FORM_KEY = "ivanapam-booking-form";

  const MOBILE_BREAK = 900;

  const t = (key, vars) => (window.IV_t ? window.IV_t(key, vars) : key);



  let SERVICES_DEF = [];

  let CATEGORIES_DEF = [];

  let PARTNERS_DEF = [];

  let PHONES = [];

  let WHATSAPP_PRIMARY = "";



  let SERVICES = [];

  let CATEGORIES = [];

  let selected = [];

  let activeCategory = "all";

  let searchQuery = "";

  let toastTimer;



  const serviceGrid = document.getElementById("service-grid");

  const serviceTabs = document.getElementById("service-tabs");

  const serviceEmpty = document.getElementById("service-empty");

  const serviceSearch = document.getElementById("service-search");

  const bookingItems = document.getElementById("booking-items");

  const bookingEmpty = document.getElementById("booking-empty");

  const bookingCount = document.getElementById("booking-count");

  const bookingBarCount = document.getElementById("booking-bar-count");

  const bookingSteps = document.getElementById("booking-steps");

  const btnWhatsApp = document.getElementById("btn-whatsapp-booking");

  const btnClear = document.getElementById("btn-clear-booking");

  const bookingBackdrop = document.getElementById("booking-backdrop");

  const bookingDrawer = document.getElementById("booking-drawer");

  const bookingToggle = document.getElementById("booking-toggle");

  const bookingClose = document.getElementById("booking-close");

  const toast = document.getElementById("toast");

  const bookName = document.getElementById("book-name");

  const bookPhone = document.getElementById("book-phone");

  const bookPhoneHint = document.getElementById("book-phone-hint");

  const bookProperty = document.getElementById("book-property");

  const bookAddress = document.getElementById("book-address");

  const bookDate = document.getElementById("book-date");

  const bookTime = document.getElementById("book-time");

  const bookNote = document.getElementById("book-note");



  const FORM_FIELDS = [bookName, bookPhone, bookProperty, bookAddress, bookDate, bookTime, bookNote];



  function bindConfig(config) {

    SERVICES_DEF = config.services || [];

    CATEGORIES_DEF = config.serviceCategories || [];

    PARTNERS_DEF = config.partners || [];

    PHONES = config.phones || [];

    WHATSAPP_PRIMARY = config.site?.whatsappPrimary || PHONES.find((p) => p.primary)?.raw || "";

  }



  function buildData() {

    SERVICES = SERVICES_DEF.map((s) => ({

      id: s.id,

      name: t(`services.items.${s.itemKey}.name`),

      desc: t(`services.items.${s.itemKey}.desc`),

      category: s.category,

      icon: s.icon,

      badge: s.badgeKey ? t(`menu.badge.${s.badgeKey}`) : undefined,

    }));

    CATEGORIES = CATEGORIES_DEF.map((c) => ({

      id: c.id,

      label: t(`menu.cat.${c.labelKey}`),

    }));

  }



  function isMobile() {

    return window.matchMedia(`(max-width: ${MOBILE_BREAK}px)`).matches;

  }



  function getFiltered() {

    const q = normalize(searchQuery.trim());

    return SERVICES.filter((s) => {

      const matchCat = activeCategory === "all" || s.category === activeCategory;

      if (!matchCat) return false;

      if (!q) return true;

      return normalize(`${s.name} ${s.desc}`).includes(q);

    });

  }



  function isSelected(id) {

    return selected.includes(id);

  }



  function normalizeAngolaPhoneDigits(value) {

    const digits = String(value || "").replace(/\D/g, "");

    if (!digits) return null;

    if (digits.startsWith("244")) {

      return digits.length === 12 && /^2449\d{8}$/.test(digits) ? digits : null;

    }

    if (digits.startsWith("0") && digits.length === 10 && digits[1] === "9") {

      return `244${digits.slice(1)}`;

    }

    if (digits.startsWith("9") && digits.length === 9) {

      return `244${digits}`;

    }

    return null;

  }



  function isValidAngolaPhone(value) {

    return normalizeAngolaPhoneDigits(value) !== null;

  }



  function formatPhoneDisplay(value) {

    const digits = normalizeAngolaPhoneDigits(value);

    if (!digits) return String(value || "").trim() || "—";

    const local = digits.slice(3);

    return `+244 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;

  }



  function formatDateDisplay(iso) {

    if (!iso) return "—";

    try {

      const d = new Date(`${iso}T12:00:00`);

      return d.toLocaleDateString(document.documentElement.lang || "pt", {

        weekday: "short",

        day: "numeric",

        month: "long",

        year: "numeric",

      });

    } catch (_) {

      return iso;

    }

  }



  function propertyLabel(value) {

    const map = {

      residential: t("booking.propertyRes"),

      commercial: t("booking.propertyCom"),

      industrial: t("booking.propertyInd"),

      other: t("booking.propertyOther"),

    };

    return map[value] || "—";

  }



  function updateSteps() {

    if (!bookingSteps) return;

    const hasServices = selected.length > 0;

    const hasForm =

      hasServices &&

      bookName?.value.trim() &&

      bookPhone?.value.trim() &&

      isValidAngolaPhone(bookPhone.value) &&

      bookProperty?.value &&

      bookAddress?.value.trim() &&

      bookDate?.value;



    bookingSteps.querySelectorAll(".booking-steps__item").forEach((item) => {

      const step = Number(item.dataset.step);

      item.classList.remove("is-active", "is-done");

      if (step === 1) {

        if (!hasServices) item.classList.add("is-active");

        else item.classList.add("is-done");

      } else if (step === 2) {

        if (hasServices && !hasForm) item.classList.add("is-active");

        else if (hasForm) item.classList.add("is-done");

      } else if (step === 3) {

        if (hasForm) item.classList.add("is-active");

      }

    });

  }



  function todayIso() {

    return new Date().toISOString().split("T")[0];

  }



  function isDateNotPast(value) {

    if (!value) return false;

    return value >= todayIso();

  }



  function toggleService(id) {

    const idx = selected.indexOf(id);

    const svc = SERVICES.find((s) => s.id === id);

    const wasEmpty = selected.length === 0;



    if (idx >= 0) {

      selected.splice(idx, 1);

      if (svc) showToast(t("toast.removed", { name: svc.name }));

    } else {

      selected.push(id);

      if (svc) showToast(t("toast.added", { name: svc.name }));

      if (wasEmpty && isMobile()) openDrawer();

    }



    saveBooking();

    renderBooking();

    renderServices();

    updateCounts();

    updateSteps();

  }



  function saveBooking() {

    try {

      localStorage.setItem(BOOKING_KEY, JSON.stringify(selected));

    } catch (_) {}

  }



  function saveForm() {

    try {

      localStorage.setItem(

        FORM_KEY,

        JSON.stringify({

          name: bookName?.value || "",

          phone: bookPhone?.value || "",

          property: bookProperty?.value || "",

          address: bookAddress?.value || "",

          date: bookDate?.value || "",

          time: bookTime?.value || "09:00",

          note: bookNote?.value || "",

        })

      );

    } catch (_) {}

  }



  function loadBooking() {

    try {

      const raw = localStorage.getItem(BOOKING_KEY);

      if (!raw) return;

      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) return;

      selected = parsed.filter((id) => SERVICES_DEF.some((s) => s.id === id));

    } catch (_) {

      selected = [];

    }

  }



  function loadForm() {

    try {

      const raw = localStorage.getItem(FORM_KEY);

      if (!raw) return;

      const data = JSON.parse(raw);

      if (bookName && data.name) bookName.value = data.name;

      if (bookPhone && data.phone) bookPhone.value = data.phone;

      if (bookProperty && data.property) bookProperty.value = data.property;

      if (bookAddress && data.address) bookAddress.value = data.address;

      if (bookDate && data.date) bookDate.value = isDateNotPast(data.date) ? data.date : "";

      if (bookTime && data.time) bookTime.value = data.time;

      if (bookNote && data.note) bookNote.value = data.note;

    } catch (_) {}

  }



  function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.hidden = false;

    toast.classList.add("toast--visible");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      toast.classList.remove("toast--visible");

      toast.hidden = true;

    }, 2600);

  }



  function hasBookingContent() {

    if (selected.length > 0) return true;

    if (bookName?.value.trim()) return true;

    if (bookPhone?.value.trim()) return true;

    if (bookProperty?.value) return true;

    if (bookAddress?.value.trim()) return true;

    if (bookDate?.value) return true;

    if (bookNote?.value.trim()) return true;

    if (bookTime?.value && bookTime.value !== "09:00") return true;

    return false;

  }



  function clearAllBooking() {

    selected = [];

    if (bookName) bookName.value = "";

    if (bookPhone) bookPhone.value = "";

    if (bookProperty) bookProperty.value = "";

    if (bookAddress) bookAddress.value = "";

    if (bookDate) bookDate.value = "";

    if (bookTime) bookTime.value = "09:00";

    if (bookNote) bookNote.value = "";

    FORM_FIELDS.forEach((field) => markInvalid(field, false));

    try {

      localStorage.removeItem(BOOKING_KEY);

      localStorage.removeItem(FORM_KEY);

    } catch (_) {}

    renderBooking();

    renderServices();

    updateCounts();

    updateSteps();

  }



  function updateCounts() {

    const count = selected.length;

    [bookingCount, bookingBarCount].forEach((el) => {

      if (!el) return;

      el.textContent = String(count);

      el.hidden = count === 0;

    });

    if (btnClear) btnClear.hidden = !hasBookingContent();

    if (btnWhatsApp) btnWhatsApp.disabled = count === 0;

  }



  function renderTabs() {

    if (!serviceTabs) return;

    serviceTabs.innerHTML = CATEGORIES.map(

      (c) =>

        `<button type="button" class="menu-tabs__btn${activeCategory === c.id ? " active" : ""}" data-category="${escapeHtml(c.id)}">${escapeHtml(c.label)}</button>`

    ).join("");

    serviceTabs.querySelectorAll(".menu-tabs__btn").forEach((btn) => {

      btn.addEventListener("click", () => {

        activeCategory = btn.dataset.category;

        renderTabs();

        renderServices();

      });

    });

  }



  function renderServices() {

    if (!serviceGrid) return;

    const items = getFiltered();

    if (serviceEmpty) serviceEmpty.hidden = items.length > 0;



    serviceGrid.innerHTML = items

      .map(

        (s) => {
          const on = isSelected(s.id);
          return `
      <article class="menu-card${on ? " menu-card--selected" : ""}" data-id="${escapeHtml(s.id)}">

        <div class="menu-card__visual menu-card__visual--icon" aria-hidden="true">${s.icon}</div>

        <div class="menu-card__body">

          ${s.badge ? `<span class="menu-card__badge">${escapeHtml(s.badge)}</span>` : ""}

          <h3 class="menu-card__name">${escapeHtml(s.name)}</h3>

          <p class="menu-card__desc">${escapeHtml(s.desc)}</p>

          <button
            type="button"
            class="menu-card__toggle${on ? " menu-card__toggle--selected" : ""}"
            data-id="${escapeHtml(s.id)}"
            aria-pressed="${on}"
            aria-label="${escapeHtml(on ? t("menu.removeAria", { name: s.name }) : t("menu.addAria", { name: s.name }))}"
          >

            ${on ? escapeHtml(t("menu.remove")) : escapeHtml(t("menu.add"))}

          </button>

        </div>

      </article>`;
        }

      )

      .join("");



    serviceGrid.querySelectorAll(".menu-card").forEach((card) => {

      const id = card.dataset.id;

      card.addEventListener("click", (e) => {

        if (e.target.closest(".menu-card__toggle")) return;

        toggleService(id);

      });

    });



    serviceGrid.querySelectorAll(".menu-card__toggle").forEach((btn) => {

      btn.addEventListener("click", (e) => {

        e.stopPropagation();

        toggleService(btn.dataset.id);

      });

    });

  }



  function renderBooking() {

    if (!bookingItems || !bookingEmpty) return;

    bookingEmpty.hidden = selected.length > 0;

    bookingItems.innerHTML = selected

      .map((id) => {

        const s = SERVICES.find((x) => x.id === id);

        if (!s) return "";

        return `

        <li class="cart-item">

          <span class="cart-item__icon">${s.icon}</span>

          <div class="cart-item__info">

            <strong>${escapeHtml(s.name)}</strong>

            <span>${escapeHtml(s.desc)}</span>

          </div>

          <button type="button" class="cart-item__remove" data-id="${escapeHtml(s.id)}" aria-label="${escapeHtml(t("booking.remove", { name: s.name }))}">&times;</button>

        </li>`;

      })

      .join("");



    bookingItems.querySelectorAll(".cart-item__remove").forEach((btn) => {

      btn.addEventListener("click", () => toggleService(btn.dataset.id));

    });

  }



  function buildWhatsAppMessage() {

    const lines = [t("booking.waHeader"), ""];

    selected.forEach((id) => {

      const s = SERVICES.find((x) => x.id === id);

      if (s) lines.push(`• ${s.name}`);

    });

    lines.push("");

    lines.push(`${t("booking.name")}: ${bookName?.value.trim() || "—"}`);

    lines.push(`${t("booking.phone")}: ${formatPhoneDisplay(bookPhone?.value)}`);

    lines.push(`${t("booking.property")}: ${propertyLabel(bookProperty?.value)}`);

    lines.push(`${t("booking.address")}: ${bookAddress?.value.trim() || "—"}`);

    lines.push(`${t("booking.date")}: ${formatDateDisplay(bookDate?.value)}`);

    lines.push(`${t("booking.time")}: ${bookTime?.value || "—"}`);

    if (bookNote?.value.trim()) lines.push(`${t("booking.note")}: ${bookNote.value.trim()}`);

    lines.push("", t("booking.waFooter"));

    return lines.join("\n");

  }



  function markInvalid(field, invalid) {

    if (!field) return;

    field.classList.toggle("invalid", invalid);

    if (field === bookPhone && bookPhoneHint) {

      bookPhoneHint.hidden = !invalid;

    }

  }



  function validateBookingForm() {

    let valid = true;



    [bookName, bookAddress].forEach((field) => {

      if (!field) return;

      const empty = !field.value.trim();

      markInvalid(field, empty);

      if (empty) valid = false;

    });



    if (bookDate) {

      const dateVal = bookDate.value;

      const dateOk = dateVal && isDateNotPast(dateVal);

      markInvalid(bookDate, !dateOk);

      if (!dateOk) valid = false;

    }



    if (bookProperty) {

      const empty = !bookProperty.value;

      markInvalid(bookProperty, empty);

      if (empty) valid = false;

    }



    if (bookPhone) {

      const phoneVal = bookPhone.value.trim();

      const phoneOk = phoneVal && isValidAngolaPhone(phoneVal);

      markInvalid(bookPhone, !phoneOk);

      if (!phoneOk) valid = false;

    }



    return valid && selected.length > 0;

  }



  function openDrawer() {

    bookingDrawer?.classList.add("open");

    document.body.classList.add("cart-open");

    if (bookingBackdrop) {

      bookingBackdrop.hidden = false;

      bookingBackdrop.setAttribute("aria-hidden", "false");

    }

  }



  function closeDrawer() {

    bookingDrawer?.classList.remove("open");

    document.body.classList.remove("cart-open");

    if (bookingBackdrop) {

      bookingBackdrop.hidden = true;

      bookingBackdrop.setAttribute("aria-hidden", "true");

    }

  }



  function renderPhoneLinks(container) {

    if (!container || !PHONES.length) return;

    container.classList.add("phone-links");

    const waIcon = `<svg class="phone-links__wa" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

    container.innerHTML = PHONES.map(

      (p) => `

      <a class="phone-links__item" href="https://wa.me/${escapeHtml(p.raw)}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ${escapeHtml(p.display)}">

        ${waIcon}

        <span>${escapeHtml(p.display)}</span>

      </a>`

    ).join("");

  }



  function partnerAssetUrl(path) {

    if (!path) return "";

    return path.includes("?") ? path : `${path}?v=20260726`;

  }



  function partnerThumbUrl(p) {

    return p.logo || p.logoSvg || p.logoJpg;

  }



  function partnerLightboxUrl(p) {

    const raster = [p.logoJpg, p.logo].find((path) => path && /\.(jpe?g|png|webp)$/i.test(path));

    if (raster) return raster;

    return p.logoSvg || p.logo || p.logoJpg;

  }



  function partnerLogoHtml(p) {

    const name = t(`partners.items.${p.key}.name`);

    const subtitle = t(`partners.items.${p.key}.subtitle`);

    const tag = t(`partners.items.${p.key}.tag`);

    const location = t(`partners.items.${p.key}.location`);

    const desc = t(`partners.items.${p.key}.desc`);

    const thumb = partnerThumbUrl(p);

    const lightbox = partnerLightboxUrl(p);

    const isRaster = /\.(jpe?g|png|webp)$/i.test(thumb || "");

    if (thumb) {

      const thumbAsset = partnerAssetUrl(thumb);

      const lightboxAsset = partnerAssetUrl(lightbox);

      const lightboxDesc = [subtitle, location, desc].filter(Boolean).join(" · ");

      return `

        <button
          type="button"
          class="partners__item partners__item--btn${isRaster ? " partners__item--raster" : ""}"
          data-partner="${escapeHtml(p.id)}"
          data-partner-lightbox="${escapeHtml(lightboxAsset)}"
          data-partner-name="${escapeHtml(name)}"
          data-partner-desc="${escapeHtml(lightboxDesc)}"
          aria-label="${escapeHtml(t("partners.openLogo", { name }))}"
        >

          <span class="partners__tag">${escapeHtml(tag)}</span>

          <span class="partners__logo-wrap">
            <img class="partners__logo" src="${escapeHtml(thumbAsset)}" alt="" width="320" height="140" loading="lazy" decoding="async" aria-hidden="true">
            <span class="partners__zoom" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>
            </span>
          </span>

          <span class="partners__caption">
            <strong class="partners__name">${escapeHtml(name)}</strong>
            <span class="partners__subtitle">${escapeHtml(subtitle)}</span>
            <span class="partners__location">${escapeHtml(location)}</span>
            <span class="partners__desc">${escapeHtml(desc)}</span>
            <span class="partners__hint">${escapeHtml(t("partners.viewDetail"))}</span>
          </span>

        </button>`;

    }

    return `

      <figure class="partners__item partners__item--text">

        <span class="partners__initial">${escapeHtml(name.charAt(0))}</span>

        <figcaption>${escapeHtml(name)}</figcaption>

      </figure>`;

  }



  function renderPartners() {

    const grid = document.getElementById("partners-grid");

    if (!grid || !PARTNERS_DEF.length) return;

    grid.innerHTML = PARTNERS_DEF.map((p) => partnerLogoHtml(p)).join("");

    grid.querySelectorAll(".partners__item--btn").forEach((el, i) => {

      el.classList.add("reveal", "visible");

      el.style.setProperty("--partner-delay", `${i * 0.08}s`);

    });

    window.dispatchEvent(new CustomEvent("partners-ready"));

  }



  function lightboxSrc(item) {

    return item.full4k || item.full4kJpg || item.fullHd || item.srcJpg || item.src;

  }



  function renderGallery() {

    const mosaic = document.getElementById("gallery-mosaic");

    const gallery = window.IV_GALLERY || [];

    const pic = window.IV_media?.pictureHtml;



    if (!mosaic) return;



    mosaic.innerHTML = gallery

      .map((item, i) => {

        const caption = t(`gallery.photos.${item.captionKey || item.key}`);

        const imgHtml = pic

          ? pic({

              thumb: item.thumb,

              full: item.src,

              fullJpg: item.srcJpg,

              fullHd: item.fullHd,

              fullHdJpg: item.fullHdJpg,

              full4k: item.full4k,

              full4kJpg: item.full4kJpg,

              alt: caption,

              className: "",

              sizes: "(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw",

              width: item.width || 1920,

              height: item.height || 1080,

              eager: i < 2,

            })

          : `<img src="${escapeHtml(item.thumb || item.src)}" alt="${escapeHtml(caption)}" loading="${i < 2 ? "eager" : "lazy"}" width="640" height="480" decoding="async">`;



        return `

      <button type="button" class="gallery__item" role="listitem"

        data-index="${i}"

        data-lightbox="${escapeHtml(lightboxSrc(item))}"

        data-caption="${escapeHtml(caption)}"

        aria-label="${escapeHtml(t("gallery.viewLarge", { name: caption }))}">

        ${imgHtml}

        <span class="gallery__item-badge">HD</span>

        <span class="gallery__item-overlay">

          <span class="gallery__item-zoom">${escapeHtml(t("gallery.zoom"))}</span>

          <span class="gallery__item-caption">${escapeHtml(caption)}</span>

        </span>

      </button>`;

      })

      .join("");



    window.dispatchEvent(new CustomEvent("gallery-ready"));

  }



  function onFormChange() {

    saveForm();

    updateCounts();

    updateSteps();

    FORM_FIELDS.forEach((field) => {

      if (field?.classList.contains("invalid")) markInvalid(field, false);

    });

  }



  function refreshUI() {

    buildData();

    renderTabs();

    renderServices();

    renderBooking();

    renderPartners();

    renderGallery();

    updateCounts();

    updateSteps();

  }



  function bindEvents() {

    btnWhatsApp?.addEventListener("click", () => {

      if (!validateBookingForm()) {

        showToast(t("booking.formError"));

        openDrawer();

        return;

      }

      const url = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(buildWhatsAppMessage())}`;

      window.open(url, "_blank", "noopener,noreferrer");

      showToast(t("forms.bookingOk"));

    });



    btnClear?.addEventListener("click", () => {

      clearAllBooking();

      showToast(t("toast.cleared"));

    });



    bookingToggle?.addEventListener("click", openDrawer);

    bookingClose?.addEventListener("click", closeDrawer);

    bookingBackdrop?.addEventListener("click", closeDrawer);



    serviceSearch?.addEventListener("input", (e) => {

      searchQuery = e.target.value;

      renderServices();

    });



    FORM_FIELDS.forEach((field) => {

      field?.addEventListener("input", onFormChange);

      field?.addEventListener("change", onFormChange);

    });



    document.querySelectorAll("[href='#agendamentos']").forEach((link) => {

      link.addEventListener("click", () => closeDrawer());

    });



    document.addEventListener("keydown", (e) => {

      if (e.key !== "Escape") return;

      const lb = document.getElementById("lightbox");

      if (lb && !lb.hidden) return;

      closeDrawer();

    });



    window.addEventListener("language-changed", refreshUI);

  }



  function init(config) {

    bindConfig(config || window.IV_CONFIG || {});

    bindEvents();



    if (bookDate) {

      bookDate.setAttribute("min", todayIso());

    }



    renderPhoneLinks(document.getElementById("contact-phones"));



    buildData();

    loadBooking();

    loadForm();

    refreshUI();

  }



  onReady("config-ready", (e) => init(e.detail || window.IV_CONFIG));

})();

