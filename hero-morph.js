/* Hero name -> VJ monogram, driven by scroll. Works over any background (mix-blend-mode: difference). */
(() => {
  "use strict";
  const h1 = document.querySelector(".hero h1");
  const mark = document.querySelector(".wordmark");
  const hero = document.querySelector(".hero");
  if (!h1 || !mark || !hero) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const lines = [...h1.querySelectorAll("span")].map(s => s.textContent.trim());
  if (lines.length !== 2) return;

  const clone = document.createElement("div");
  clone.className = "name-morph";
  clone.setAttribute("aria-hidden", "true");
  const rows = lines.map((t, i) => {
    const row = document.createElement("div");
    row.className = "nm-row";
    const first = document.createElement("span");
    first.className = "nm-keep";
    first.textContent = t[0];
    const rest = document.createElement("span");
    rest.className = "nm-rest";
    rest.textContent = t.slice(1);
    row.append(first, rest);
    clone.append(row);
    return { row, first, rest };
  });
  document.body.append(clone);
  document.documentElement.classList.add("morph-on");

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => t * t * (3 - 2 * t);
  const fade = hero.querySelectorAll(".eyebrow, .hero-type p, .scroll-cue, .hero-index");
  let m = null;

  function measure() {
    const cs = getComputedStyle(h1);
    Object.assign(clone.style, {
      fontFamily: cs.fontFamily, fontSize: cs.fontSize, lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing, fontWeight: cs.fontWeight
    });
    clone.style.transform = "none";
    const r = h1.getBoundingClientRect();
    const y0 = r.top + window.scrollY;
    const x0 = r.left;
    const fs = parseFloat(cs.fontSize);
    const mcs = getComputedStyle(mark);
    const mfs = parseFloat(mcs.fontSize);
    const w = mark.getBoundingClientRect();
    const s = mfs / fs;
    const lh = rows[0].row.getBoundingClientRect().height;
    const vw = rows[0].first.getBoundingClientRect().width;
    // J sits right after V in the final monogram
    m = { x0, y0, s, lh, vw,
          x1: w.left, y1: w.top + w.height / 2 - (lh * s) / 2,
          dist: Math.max(260, window.innerHeight * 0.5) };
    update();
  }

  function update() {
    if (!m) return;
    const p = clamp(window.scrollY / m.dist);
    const e = ease(p);
    const x = m.x0 + (m.x1 - m.x0) * e;
    const y = m.y0 + (m.y1 - m.y0) * e - 0; // y0 is document-space at scroll 0 == viewport-space
    const sc = 1 + (m.s - 1) * e;
    clone.style.transform = `translate(${x}px,${y}px) scale(${sc})`;
    // other letters dissolve first, then JAIN's J slides up beside the V
    const rest = 1 - ease(clamp(p / 0.55));
    const join = ease(clamp((p - 0.35) / 0.65));
    rows[0].rest.style.opacity = rows[1].rest.style.opacity = rest;
    rows[1].row.style.transform = `translate(${m.vw * join}px,${-m.lh * join}px)`;
    const done = p >= 0.999;
    clone.style.visibility = done ? "hidden" : "visible";
    mark.style.opacity = done ? "1" : "0";
    fade.forEach(el => { el.style.opacity = String(1 - clamp(p / 0.4)); });
  }

  let tick = false;
  window.addEventListener("scroll", () => {
    if (tick) return; tick = true;
    requestAnimationFrame(() => { tick = false; update(); });
  }, { passive: true });
  window.addEventListener("resize", measure);
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(measure);
  measure();
})();
