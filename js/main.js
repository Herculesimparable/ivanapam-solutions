(function () {
  "use strict";

  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");
  const navLinks = document.querySelectorAll(".nav__list a");
  const sections = document.querySelectorAll("section[id], header[id]");

  const t = (key, vars) => (window.IV_t ? window.IV_t(key, vars) : key);

  const scrollProgress = document.getElementById("scroll-progress");

  function onScroll() {
    nav?.classList.toggle("scrolled", window.scrollY > 60);
    setActiveNav();
    if (scrollProgress) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      scrollProgress.style.width = `${pct}%`;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = document.body.classList.contains("cart-open")
          ? "hidden"
          : "";
      });
    });
  }

  function setActiveNav() {
    const scrollY = window.scrollY + 140;
    let activeId = null;
    sections.forEach((section) => {
      const id = section.getAttribute("id");
      if (!id) return;
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) activeId = id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", !!activeId && link.getAttribute("href") === `#${activeId}`);
    });
  }

  const revealEls = document.querySelectorAll(
    ".card, .about__header, .about__visual, .about__panel, .section__header, .service-card, .partners__item, .gallery__item"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  const contactForm = document.getElementById("contact-form");
  const contactMessage = document.getElementById("contact-message");

  if (contactForm && contactMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = contactForm.nome?.value.trim() || "";
      const email = contactForm.email?.value.trim() || "";
      const assunto = contactForm.assunto?.value.trim() || "";
      const mensagem = contactForm.mensagem?.value.trim() || "";
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nome || !email || !assunto || !mensagem || !emailOk) {
        contactMessage.textContent = t("forms.error");
        contactMessage.classList.remove("success");
        contactMessage.classList.add("error");
        return;
      }

      const to = window.IV_SITE?.email || "ivanapamsolutions@gmail.com";
      const body = `Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(body)}`;

      contactMessage.textContent = t("forms.contactOk");
      contactMessage.classList.remove("error");
      contactMessage.classList.add("success");
      contactForm.reset();
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector(".lightbox__img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = lightbox?.querySelector(".lightbox__close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const galleryMosaic = document.getElementById("gallery-mosaic");
  const partnersGrid = document.getElementById("partners-grid");

  let lightboxIndex = 0;
  let lightboxItems = [];
  let lightboxMode = "gallery";

  function getGalleryButtons() {
    return galleryMosaic?.querySelectorAll(".gallery__item") || [];
  }

  function syncLightboxItems() {
    lightboxItems = Array.from(getGalleryButtons()).map((btn) => ({
      src: btn.dataset.lightbox || "",
      caption: btn.dataset.caption || "",
    }));
    lightboxMode = "gallery";
  }

  function syncPartnerLightboxItems() {
    lightboxItems = Array.from(partnersGrid?.querySelectorAll(".partners__item--btn") || []).map((btn) => ({
      src: btn.dataset.partnerLightbox || "",
      name: btn.dataset.partnerName || "",
      desc: btn.dataset.partnerDesc || "",
      caption: btn.dataset.partnerName || "",
    }));
    lightboxMode = "partners";
  }

  function setPartnerCaption(item) {
    if (!lightboxCaption) return;
    lightboxCaption.replaceChildren();
    const title = document.createElement("strong");
    title.className = "lightbox__caption-title";
    title.textContent = item.name || item.caption || "";
    const desc = document.createElement("p");
    desc.className = "lightbox__caption-desc";
    desc.textContent = item.desc || "";
    lightboxCaption.append(title, desc);
  }

  function updateLightboxCounter() {
    if (!lightboxCounter) return;
    if (lightboxMode === "partners") {
      lightboxCounter.hidden = true;
      return;
    }
    lightboxCounter.hidden = false;
    if (!lightboxItems.length) return;
    lightboxCounter.textContent = t("gallery.photoOf", {
      n: lightboxIndex + 1,
      total: lightboxItems.length,
    });
  }

  function showLightboxSlide(index) {
    if (!lightboxItems.length || !lightboxImg) return;
    lightboxIndex = ((index % lightboxItems.length) + lightboxItems.length) % lightboxItems.length;
    const item = lightboxItems[lightboxIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.name || item.caption || "";
    if (lightboxMode === "partners") setPartnerCaption(item);
    else if (lightboxCaption) {
      lightboxCaption.replaceChildren();
      lightboxCaption.textContent = item.caption || "";
    }
    updateLightboxCounter();
    const showNav = lightboxItems.length > 1;
    if (lightboxPrev) lightboxPrev.hidden = !showNav;
    if (lightboxNext) lightboxNext.hidden = !showNav;
    lightbox?.classList.toggle("lightbox--partner", lightboxMode === "partners");
  }

  function openLightbox(src, caption, index, mode) {
    if (!lightbox || !lightboxImg || !src) return;
    if (mode === "partners") syncPartnerLightboxItems();
    else syncLightboxItems();
    if (typeof index === "number" && index >= 0) {
      lightboxIndex = index;
    } else {
      lightboxIndex = lightboxItems.findIndex((item) => item.src === src);
      if (lightboxIndex < 0) lightboxIndex = 0;
    }
    showLightboxSlide(lightboxIndex);
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightboxClose?.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  function stepLightbox(delta) {
    if (!lightboxItems.length || lightbox.hidden) return;
    showLightboxSlide(lightboxIndex + delta);
  }

  window.addEventListener("open-lightbox", (e) => {
    openLightbox(e.detail.src, e.detail.caption, e.detail.index);
  });

  function bindGalleryMosaic() {
    syncLightboxItems();
    galleryMosaic?.querySelectorAll(".gallery__item").forEach((btn, i) => {
      btn.style.setProperty("--gallery-delay", `${i * 0.07}s`);
      btn.classList.add("reveal");
      revealObserver.observe(btn);
    });
    document.querySelector("#galeria .section__header")?.classList.add("visible");
  }

  window.addEventListener("gallery-ready", bindGalleryMosaic);
  bindGalleryMosaic();

  galleryMosaic?.addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery__item");
    if (!btn) return;
    openLightbox(btn.dataset.lightbox || "", btn.dataset.caption || "", Number(btn.dataset.index), "gallery");
  });

  partnersGrid?.addEventListener("click", (e) => {
    const btn = e.target.closest(".partners__item--btn");
    if (!btn) return;
    const all = Array.from(partnersGrid.querySelectorAll(".partners__item--btn"));
    const index = all.indexOf(btn);
    openLightbox(btn.dataset.partnerLightbox || "", btn.dataset.partnerName || "", index, "partners");
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxPrev?.addEventListener("click", () => stepLightbox(-1));
  lightboxNext?.addEventListener("click", () => stepLightbox(1));

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });
})();
