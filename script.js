
(() => {
  "use strict";

  const qs = (sel, root=document) => root.querySelector(sel);
  const qsa = (sel, root=document) => [...root.querySelectorAll(sel)];

  // ---------- Hero slideshow ----------
  const slides = qsa(".hero-slide");
  const heroCurrent = qs("#heroCurrent");
  let heroIndex = 0;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (slides.length > 1 && !reduceMotion) {
    window.setInterval(() => {
      slides[heroIndex]?.classList.remove("is-active");
      heroIndex = (heroIndex + 1) % slides.length;
      slides[heroIndex]?.classList.add("is-active");
      if (heroCurrent) heroCurrent.textContent = String(heroIndex + 1).padStart(2, "0");
    }, 4800);
  }

  // ---------- Mobile navigation ----------
  const menu = qs(".menu-panel");
  const menuToggle = qs(".menu-toggle");
  const menuClose = qs(".menu-close");

  const openMenu = () => {
    if (!menu) return;
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    menu.removeAttribute("inert");
    menuToggle?.setAttribute("aria-expanded", "true");
    menuClose?.focus();
  };
  const closeMenu = () => {
    if (!menu || !menu.classList.contains("open")) return;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    menu.setAttribute("inert", "");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.focus({ preventScroll: true });
  };

  menuToggle?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  qsa(".menu-panel a").forEach(a => a.addEventListener("click", closeMenu));

  // ---------- Custom cursor ----------
  const cursor = qs(".cursor");
  if (cursor && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", e => {
      cursor.classList.add("on");
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
    qsa("a, button, .video-card, .logo-grid figure, .expo-grid figure").forEach(el => {
      el.addEventListener("mouseenter", () => cursor.classList.add("big"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
    });
  }

  // ---------- Collection modal data ----------
  const collections = {
    saawaniya: {
      season: "Festive 2026",
      title: "Saawaniya",
      lead: "A festive collection built around Saawan, bringing Bandhani into dialogue with Banarasi silk brocade and hand zardozi.",
      meta: ["~14 styles", "Bandhani silk", "Banarasi brocade", "Zardozi", "Co-ords + kurta sets"],
      role: "Concept and collection planning, complete sketching, sourcing, embroidery khakaas and swatches, sampling, production, QC, Zoho setup, SKUs, Shopify, campaign and website content, store allocation, replenishment, influencer placements and post-launch merchandising.",
      lookbookDir: "assets/lookbooks/saawaniya",
      pageCount: 16
    },
    bagh: {
      season: "Festive 2025",
      title: "Bagh",
      lead: "A richer festive language in jewel tones — ruby, emerald, purple and burgundy — with brocade-led, corset-based silhouettes and the brand's first experiments with sleeveless cuts.",
      meta: ["16–20 styles", "Jewel tones", "Brocade", "Hand + machine embroidery", "Sleeveless experimentation"],
      role: "Product and colour strategy, collection development, sourcing and production coordination, styling, campaign planning, digital launch, retail allocation, performance tracking, stock rotation and influencer-led visibility.",
      lookbookDir: "assets/lookbooks/bagh",
      pageCount: 46
    },
    pastel: {
      season: "Spring / Summer 2025",
      title: "Pastel Mist",
      lead: "A summer collection in soft colour, lightweight silk and hand appliqué — developed as a complete product-to-market story.",
      meta: ["14 styles", "Summer silk", "Hand appliqué", "Pearls + crystals", "Co-ords + kurta sets", "Approved by the founders"],
      role: "Concept, design, material and embroidery development, sampling, production, styling and shoot direction, marketing, website launch, store merchandising and influencer placements.",
      lookbookDir: "assets/lookbooks/pastel",
      pageCount: 14
    },
    shringaar: {
      season: "Festive / Wedding 2024",
      title: "Shringaar",
      lead: "A festive wardrobe shaped by the idea of adornment, with luminous tissue, Chiniya silk, Chanderi, brocade and handwork.",
      meta: ["~20 styles", "Tissue", "Chiniya silk", "Chanderi", "Brocade"],
      role: "Collection planning, design, embroidery swatches, multiple sample iterations, production, QC, product setup, campaign and social rollout, store dispatch and replenishment.",
      lookbookDir: "assets/lookbooks/shringaar",
      pageCount: 15
    },
    aangan: {
      season: "Spring / Summer 2024",
      title: "Aangan",
      lead: "My first collection with NEITRI — a deliberately small-batch launch in handwoven Chiniya silk, designed with Indian body diversity and size inclusivity from XXS to 8XL.",
      meta: ["~12 styles", "XXS–8XL", "Handwoven Chiniya", "Hand embroidery", "Small-batch launch"],
      role: "End-to-end product ownership from concept and silhouettes to production, launch, retail and continued replenishment. The collection continued to generate sales across multiple seasons after launch.",
      lookbookDir: "assets/lookbooks/aangan",
      pageCount: 12
    }
  };

  const finalCollectionData = {
    saawaniya: {
      season: "Festive 2026",
      title: "Saawaniya",
      copy: "Bandhani × Banarasi brocade × zardozi. A Saawan-led festive collection developed end to end.",
      img: "assets/images/collection-saawaniya.webp"
    },
    bagh: {
      season: "Festive 2025",
      title: "Bagh",
      copy: "Jewel tones, brocade and corset-led silhouettes, and the brand's first experiments with sleeveless cuts.",
      img: "assets/images/collection-bagh.webp"
    },
    pastel: {
      season: "Spring / Summer 2025",
      title: "Pastel Mist",
      copy: "Summer silk, hand appliqué and a softer contemporary language built from concept to market.",
      img: "assets/images/collection-pastel.webp"
    },
    shringaar: {
      season: "Festive / Wedding 2024",
      title: "Shringaar",
      copy: "Tissue, Chiniya silk, Chanderi and brocade shaped into a festive wardrobe rooted in adornment.",
      img: "assets/images/collection-shringaar.webp"
    },
    aangan: {
      season: "Spring / Summer 2024",
      title: "Aangan",
      copy: "A considered small-batch launch designed with XXS–8XL inclusivity in handwoven Chiniya silk.",
      img: "assets/images/collection-aangan.webp"
    }
  };

  const modal = qs("#collectionModal");

  let lastFocus = null;
  const openCollection = key => {
    const c = collections[key];
    if (!c || !modal) return;

    const season = qs(".modal-season", modal);
    const title = qs(".modal-title", modal);
    const lead = qs(".modal-lead", modal);
    const meta = qs(".modal-meta", modal);
    const role = qs(".modal-role p", modal);
    const gallery = qs(".modal-gallery", modal);

    if (season) season.textContent = c.season;
    if (title) title.textContent = c.title;
    if (lead) lead.textContent = c.lead;
    if (meta) meta.innerHTML = c.meta.map(x => `<span>${x}</span>`).join("");
    if (role) role.textContent = c.role;
    if (gallery) {
      const pages = Array.from({length:c.pageCount}, (_,i) => String(i+1).padStart(2,"0"));
      gallery.innerHTML = pages.map((p,i) => `<figure class="lookbook-page"><img loading="lazy" decoding="async" src="${c.lookbookDir}/${p}.webp?v=20261115g" alt="${c.title} lookbook, page ${i+1} of ${c.pageCount}"><figcaption>${String(i+1).padStart(2,"0")} / ${String(c.pageCount).padStart(2,"0")}</figcaption></figure>`).join("");
    }

    lastFocus = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modal.removeAttribute("inert");
    modal.scrollTop = 0;
    document.body.style.overflow = "hidden";
    qs(".modal-close", modal)?.focus({ preventScroll: true });
  };

  const closeCollection = () => {
    if (!modal) return;
    if (!modal.classList.contains("open")) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("inert", "");
    document.body.style.overflow = "";
    lastFocus?.focus?.({ preventScroll: true });
  };

  qs(".modal-close")?.addEventListener("click", closeCollection);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeCollection();
      closeMenu();
    }
  });

  // ---------- Main collection switcher ----------
  const collectionHero = qs("#collectionHeroImage");
  const collectionFill = qs(".collection-fill");
  const collectionArt = qs("#collectionArt");

  let shownKey = "saawaniya";
  const showImage = key => {
    const data = finalCollectionData[key];
    if (!data || key === shownKey) return;
    shownKey = key;
    if (collectionArt) collectionArt.setAttribute("aria-label", `Open ${data.title} collection`);
    if (collectionHero) {
      collectionHero.style.opacity = "0.15";
      window.setTimeout(() => {
        if (shownKey !== key) return;   // a newer hover took over
        collectionHero.src = data.img;
        collectionHero.alt = data.title + " campaign";
        collectionHero.style.opacity = "1";
      }, 150);
    }
    if (collectionFill) collectionFill.style.backgroundImage = `url("${data.img}")`;
  };

  const activateCollection = key => {
    const data = finalCollectionData[key];
    if (!data) return;

    qsa(".coll-item").forEach(item => {
      const on = item.dataset.collection === key;
      item.classList.toggle("active", on);
      const t = qs(".collection-tab-final", item);
      t.classList.toggle("active", on);
      t.setAttribute("aria-expanded", on ? "true" : "false");
    });

    showImage(key);
  };

  const activeKey = () => qs(".coll-item.active")?.dataset.collection;
  qsa(".collection-tab-final").forEach(tab => {
    const key = tab.dataset.collection;
    // hovering (or keyboard focus) previews the picture; clicking opens the dropdown
    tab.addEventListener("mouseenter", () => showImage(key));
    tab.addEventListener("focus", () => showImage(key));
    tab.addEventListener("click", () => {
      const item = tab.closest(".coll-item");
      if (item.classList.contains("active")) {
        // second click folds the panel; the picture stays
        item.classList.remove("active");
        tab.classList.remove("active");
        tab.setAttribute("aria-expanded", "false");
      } else {
        activateCollection(key);
      }
    });
  });

  qs("#collectionAccordion")?.addEventListener("mouseleave", () => {
    const k = activeKey();
    if (k) showImage(k);   // back to the open collection's picture
  });

  // the big picture opens whichever collection it is showing
  if (collectionArt) {
    collectionArt.addEventListener("click", () => openCollection(shownKey));
    collectionArt.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCollection(shownKey); }
    });
  }

  qsa(".collections-final .feature-open").forEach(btn => {
    btn.addEventListener("click", () => openCollection(btn.dataset.collection));
  });

  // ---------- Videos ----------
  const videos = qsa("video");
  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const v = entry.target;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.15 });

    videos.forEach(v => videoObserver.observe(v));
  } else {
    videos.forEach(v => v.play().catch(() => {}));
  }
})();
