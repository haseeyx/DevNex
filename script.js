/* ============================================================
   DevNext — animations & interactions
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);

/* ---------- 1. SCROLL PROGRESS BAR ---------- */
gsap.to("#scroll-progress", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.documentElement,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3,
  },
});

/* ---------- 2. SERVICE CONTENT ---------- */
const SERVICES = {
  shopify: {
    letter: "A", rank: "ACE",
    title: "Shopify Store Design & Development",
    desc: "A complete Shopify store, ready to sell from day one.",
    points: [
      "🎨 Custom theme design & store setup",
      "🌍 Arabic / English bilingual layout",
      "💳 Tabby & Tamara BNPL integration",
      "📦 Dropshipping configuration",
    ],
    wa: "Hi DevNext, I need a Shopify store built.",
  },
  custom: {
    letter: "K", rank: "KING",
    title: "Custom Website Development",
    desc: "Hand-coded, high-performance websites built to grow.",
    points: [
      "💻 Custom code — no page builders",
      "⚡ Loads in under 2 seconds",
      "📱 Mobile-first & fully responsive",
      "🔍 SEO-ready structure",
    ],
    wa: "Hi DevNext, I need a custom website built.",
  },
  redesign: {
    letter: "J", rank: "JACK",
    title: "Website Redesign & Modernization",
    desc: "Sharper design, better conversion — no loss of rankings.",
    points: [
      "🎯 UX & conversion audit",
      "✨ Modern visual refresh",
      "🔄 Zero-downtime migration",
      "📈 Post-launch tracking",
    ],
    wa: "Hi DevNext, I need my website redesigned.",
  },
  dropship: {
    letter: "Q", rank: "QUEEN",
    title: "Dropshipping & E-commerce Setup",
    desc: "Turn products into a running store, not a stalled launch.",
    points: [
      "🚀 Supplier & product setup",
      "🔁 Order & fulfilment workflows",
      "🤖 Store automation",
      "📊 Analytics & reporting",
    ],
    wa: "Hi DevNext, I need a dropshipping store setup.",
  },
};

/* ---------- 3. HERO INTRO TIMELINE ---------- */
const heroIntro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });
heroIntro
  .from(".hero__eyebrow", { opacity: 0, y: 14, duration: 0.7 })
  .from(".hero__title",   { opacity: 0, y: 24, filter: "blur(8px)", duration: 1.05 }, "-=0.35")
  .from(".hero__tagline", { opacity: 0, y: 10, duration: 0.7 }, "-=0.5")
  .from(".hand-svg",      { opacity: 0, y: 40, duration: 0.85 }, "-=0.45")
  .from(".play-card",     { opacity: 0, y: 30, duration: 0.8, stagger: 0.06 }, "-=0.5")
  .from(".hero__actions .btn", { opacity: 0, y: 12, stagger: 0.1, duration: 0.55 }, "-=0.35")
  .from(".hero__trust",   { opacity: 0, duration: 0.6 }, "-=0.25");

/* ---------- 4. CARD FAN — SCROLL-DRIVEN DEAL ---------- */
const playCards = gsap.utils.toArray(".play-card");
const isDesktop = window.matchMedia("(min-width: 721px)").matches;

/* Final fan positions (pixels relative to A's center) */
const FINAL = [
  { x:   0, y:   0 },   // A — center (held by hand)
  { x: 200, y:   0 },   // K — right
  { x: 160, y: -220 },  // J — top-right
  { x: 160, y:  220 },  // Q — bottom-right
];

/* Initial: A centered & visible; others hidden at center */
gsap.set(playCards[0], { x: 0, y: 0, opacity: 1, scale: 1 });
gsap.set([playCards[1], playCards[2], playCards[3]], {
  x: 0, y: 0, opacity: 0, scale: 0.85,
});

let heroST = null;

if (isDesktop) {
  /* Desktop: pinned hero, deal cards as you scroll */
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // STEP 1 (0 → 1): Card K deals to the right
  heroTl.to(playCards[1],
    { x: FINAL[1].x, y: FINAL[1].y, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0);
  // STEP 2 (1 → 2): Card J deals top-right
  heroTl.to(playCards[2],
    { x: FINAL[2].x, y: FINAL[2].y, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 1);
  // STEP 3 (2 → 3): Card Q deals bottom-right
  heroTl.to(playCards[3],
    { x: FINAL[3].x, y: FINAL[3].y, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 2);

  heroST = heroTl.scrollTrigger;
} else {
  /* Mobile: skip pin, show all cards at final positions */
  playCards.forEach((card, i) => {
    gsap.set(card, { x: FINAL[i].x, y: FINAL[i].y, opacity: 1, scale: 1 });
  });
}

/* ---------- 5. SUBTLE HAND FLOAT ---------- */
gsap.to(".hand-svg", {
  y: -5, repeat: -1, yoyo: true, duration: 3.6, ease: "sine.inOut",
});

/* ---------- 6. SECTION REVEALS ---------- */
gsap.utils.toArray("[data-reveal]").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
    opacity: 0, y: 40, duration: 0.85, delay: (i % 4) * 0.06, ease: "power3.out",
  });
});

/* ---------- 7. HEADER SHRINK ---------- */
ScrollTrigger.create({
  start: "top -60", end: 99999,
  onUpdate: (self) => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    if (self.scroll() > 60) {
      header.style.padding = "0.7rem 5vw";
      header.style.background = "rgba(5,2,5,0.96)";
    } else {
      header.style.padding = "1.1rem 5vw";
      header.style.background = "linear-gradient(to bottom, rgba(5,2,5,0.92), transparent)";
    }
  },
});

/* ---------- 8. CARD → INLINE DETAIL SECTION ---------- */
const detailSection = document.getElementById("service-detail");
const detailLetter  = document.getElementById("detail-letter");
const detailRank    = document.getElementById("detail-rank");
const detailTitle   = document.getElementById("detail-title");
const detailDesc    = document.getElementById("detail-desc");
const detailPoints  = document.getElementById("detail-points");
const detailCTA     = document.getElementById("detail-cta");

function showServiceDetail(key) {
  const s = SERVICES[key];
  if (!s) return;

  detailLetter.textContent = s.letter;
  detailRank.textContent   = s.rank;
  detailTitle.textContent  = s.title;
  detailDesc.textContent   = s.desc;
  detailPoints.innerHTML   = s.points.map(p => `<li>${p}</li>`).join("");
  detailCTA.href = `https://wa.me/923206708586?text=${encodeURIComponent(s.wa)}`;

  // Trigger highlight animation
  detailSection.classList.remove("is-active");
  void detailSection.offsetWidth; // force reflow
  detailSection.classList.add("is-active");

  // If we're inside the pinned hero, jump to end of pin first
  if (heroST && heroST.isActive) {
    heroST.scroll(heroST.end);
    setTimeout(() => {
      detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  } else {
    detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* Bind click + keyboard */
playCards.forEach((card) => {
  const key = card.dataset.service;
  card.addEventListener("click", () => showServiceDetail(key));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showServiceDetail(key);
    }
  });
});

/* ---------- 9. DYNAMIC YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- 10. REFRESH AFTER FONTS LOAD ---------- */
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}