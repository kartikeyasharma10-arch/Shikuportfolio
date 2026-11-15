/* Phones: keep the page visual. Long copy is clamped with "Read more"; step lists show titles and open on tap. */
(() => {
  "use strict";
  const mq = window.matchMedia("(max-width: 600px)");
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];
  let done = false;

  const CLAMP = [
    ".about-final-copy > p", ".merch-final-head > p", ".retail-title-row p", ".exhibition-heading p",
    ".influencer-role-copy > p", ".masoom-feature-copy p", ".instagram-final p", ".tech-head-final > p",
    ".exp-note", ".process-role p", ".tech-note"
  ];

  function addMore(target, labelMore, labelLess, onToggle) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "m-more"; b.textContent = labelMore;
    b.setAttribute("aria-expanded", "false");
    b.addEventListener("click", () => {
      const open = !target.classList.contains("open");
      target.classList.toggle("open", open);
      b.textContent = open ? labelLess : labelMore;
      b.setAttribute("aria-expanded", String(open));
      if (onToggle) onToggle(open);
    });
    return b;
  }

  function init() {
    if (done) return; done = true;
    document.documentElement.classList.add("phone-lite");

    qsa(CLAMP.join(",")).forEach(p => {
      if (p.closest(".collection-modal")) return;
      p.classList.add("m-clamp");
      p.after(addMore(p, "Read more", "Show less"));
    });

    // step lists
    // (step lists are swipe cards on phones, see CSS)

    // fashion-tech cards: headline + first lines, details on demand
    qsa(".tech-card").forEach(card => {
      card.classList.add("m-card");
      const p = qsa(":scope > p", card)[0];
      if (p) p.classList.add("m-clamp");
      card.append(addMore(card, "Show details", "Hide details"));
    });
  }

  const apply = () => { if (mq.matches) init(); else document.documentElement.classList.remove("phone-lite"), done = false, qsa(".m-more").forEach(b => b.remove()), qsa(".m-clamp,.m-acc,.m-card").forEach(e => e.classList.remove("m-clamp", "m-acc", "m-card", "open")); };
  apply();
  (mq.addEventListener ? mq.addEventListener("change", apply) : mq.addListener(apply));
})();


/* Bottom tab bar: thumb-zone navigation that follows the section you are in */
(() => {
  const bar = document.getElementById("mTabbar");
  if (!bar) return;
  const hero = document.querySelector(".hero");
  const links = [...bar.querySelectorAll("a[data-t]")];
  const ids = links.map(a => a.dataset.t);
  const secs = ids.map(id => document.getElementById(id)).filter(Boolean);
  const modal = document.getElementById("collectionModal");

  // appear once the hero is scrolled away, so the first screen stays image-only
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => bar.classList.toggle("show", !e.isIntersecting || e.intersectionRatio < 0.35), { threshold: [0, 0.35, 1] }).observe(hero);
  } else bar.classList.add("show");

  // highlight the section in view
  const act = id => links.forEach(a => a.classList.toggle("on", a.dataset.t === id));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) act(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    secs.forEach(s => io.observe(s));
    // leaving the four main sections clears the highlight
    ["about", "fashion-tech", "experience", "contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) act(""); }), { rootMargin: "-45% 0px -50% 0px" }).observe(el);
    });
  }

  document.getElementById("mTabMore")?.addEventListener("click", () => document.querySelector(".menu-toggle")?.click());

  // hide the bar while a lookbook is open
  if (modal) new MutationObserver(() => bar.classList.toggle("hide", modal.classList.contains("open"))).observe(modal, { attributes: true, attributeFilter: ["class"] });
})();
