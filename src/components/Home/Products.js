"use client";

import { useState, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";
import { FiCheckCircle } from "react-icons/fi";
import { TbPackage, TbRibbonHealth } from "react-icons/tb";
import { GiRolledCloth } from "react-icons/gi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── product data ───────────────────────────────────────────── */
const products = [
  {
    id: "pp-polybag",
    name: "PP Polybag",
    category: "Flexible Packaging",
    icon: <TbPackage className="text-4xl" />,
    image: "/products/PP  POLYBAG_N.png",
    description:
      "High clarity polypropylene polybags used for garment packaging, retail packaging and industrial applications. Engineered for durability, premium appearance and moisture resistance.",
    features: [
      "High transparency finish",
      "Excellent print compatibility",
      "Lightweight & durable",
      "Retail packaging ready",
    ],
  },
  {
    id: "ldpe-bags",
    name: "LDPE Bags",
    category: "Flexible Packaging",
    icon: <TbPackage className="text-4xl" />,
    image: "/products/LDPE   BAGS_1.png",
    description:
      "Soft and flexible LDPE bags manufactured for textile, garment and industrial packaging requirements with strong sealing performance and moisture protection.",
    features: [
      "Soft touch material",
      "Flexible construction",
      "Water resistant",
      "Strong sealing quality",
    ],
  },
  {
    id: "printed-packing-bag",
    name: "Printed Packing Bag",
    category: "Custom Packaging",
    icon: <TbPackage className="text-4xl" />,
    image: "/products/PRINTED  PACKING  BAG_1.png",
    description:
      "Custom printed packaging bags developed for branding, retail presentation and export packaging applications with premium quality printing support.",
    features: [
      "Custom branding",
      "High quality printing",
      "Export grade finish",
      "Retail ready appearance",
    ],
  },
  {
    id: "jacquard-elastic",
    name: "Jacquard Elastic",
    category: "Garment Trim Division",
    icon: <TbRibbonHealth className="text-4xl" />,
    image: "/products/JACQUARD   ELASTIC.png",
    description:
      "Premium woven jacquard elastic customized with logos, patterns and brand identity for garments, innerwear and fashion accessories.",
    features: [
      "Custom woven branding",
      "Premium stretch quality",
      "Fashion industry compatible",
      "Multi colour options",
    ],
  },
  {
    id: "webbing-tape",
    name: "Webbing Tape",
    category: "Garment Trim Division",
    icon: <GiRolledCloth className="text-4xl" />,
    image: "/products/WEBBING TAPE_1.png",
    description:
      "Strong woven webbing tapes used in bags, garments, safety products and industrial textile applications requiring high tensile strength.",
    features: [
      "Heavy duty strength",
      "Industrial grade weaving",
      "Multiple width options",
      "Long lasting durability",
    ],
  },
  {
    id: "woven-elastic",
    name: "Woven Elastic",
    category: "Garment Trim Division",
    icon: <TbRibbonHealth className="text-4xl" />,
    image: "/products/WOVEN  ELASTIC.png",
    description:
      "Durable woven elastic designed for waistbands, activewear, uniforms and industrial garment applications requiring strong recovery.",
    features: [
      "Strong elasticity",
      "Shape retention",
      "Garment industry standard",
      "Long term durability",
    ],
  },
  {
    id: "knitted-elastic",
    name: "Knitted Elastic",
    category: "Garment Trim Division",
    icon: <TbRibbonHealth className="text-4xl" />,
    image: "/products/KNITTED   ELASTIC.png",
    description:
      "Soft knitted elastic ideal for lightweight garments, masks, lingerie and flexible apparel applications with comfortable stretch performance.",
    features: [
      "Soft texture finish",
      "Comfort stretch",
      "Lightweight material",
      "Flexible application",
    ],
  },
  {
    id: "woven-elastic-tape",
    name: "Woven Elastic Tape",
    category: "Garment Trim Division",
    icon: <GiRolledCloth className="text-4xl" />,
    image: "/products/WOVEN  ELASTIC  TAPE.png",
    description:
      "Industrial woven elastic tapes manufactured for garment trims, sportswear and textile accessories with precision woven construction.",
    features: [
      "Precision weaving",
      "Industrial quality",
      "High stretch recovery",
      "Multi application usage",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   PRODUCTS
═══════════════════════════════════════════════════════════════ */
export default function Products() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = products[activeIdx];

  /* refs */
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);   // the title block — scrolls away freely
  const gridWrapRef = useRef(null);   // ← ONLY this gets pinned
  const listRef     = useRef(null);
  const showcaseRef = useRef(null);
  const progBarRef  = useRef(null);   // direct DOM — no re-render

  /* ════════════════════════════════════════════════════════════
     SETUP
     • Entrance animations on the header + list + showcase
     • On desktop: pin ONLY gridWrapRef (not the section/header)
       so the "Industrial Packaging…" heading scrolls away first,
       then the tab panel sticks at the top of the viewport.
  ════════════════════════════════════════════════════════════ */
  useEffect(() => {
    const n      = products.length;
    const stepPx = Math.round(window.innerHeight * 0.65); // 65 vh per product

    const ctx = gsap.context(() => {

      /* ── entrance ── */
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      if (listRef.current) {
        gsap.fromTo(
          Array.from(listRef.current.children),
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power2.out",
            scrollTrigger: { trigger: listRef.current, start: "top 80%" },
          }
        );
      }

      gsap.fromTo(
        showcaseRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      /* ── sticky scroll-driven tabs (desktop ≥ 1024 px) ─────
         trigger  = gridWrapRef  →  pins only after the header
                                    has already scrolled away.
         start    = "top top"   →  grid's top edge hits viewport top.
         end      = n × stepPx  →  one stepPx of scroll per product.
         pinSpacing = true       →  GSAP inserts a spacer so the
                                    section below follows correctly.
      ───────────────────────────────────────────────────────── */
      if (window.innerWidth >= 1024) {
        let prevIdx = 0;

        ScrollTrigger.create({
          trigger    : gridWrapRef.current,
          start      : "top top",
          end        : `+=${n * stepPx}`,
          pin        : true,
          pinSpacing : true,

          onUpdate(self) {
            /* progress bar — direct DOM, zero re-renders */
            if (progBarRef.current) {
              progBarRef.current.style.width = `${self.progress * 100}%`;
            }

            /* tab index — setState only on actual change */
            const newIdx = Math.min(
              Math.floor(self.progress * n),
              n - 1
            );
            if (newIdx !== prevIdx) {
              prevIdx = newIdx;
              setActiveIdx(newIdx);
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* animate showcase whenever the active product changes */
  useEffect(() => {
    if (!showcaseRef.current) return;
    gsap.fromTo(
      showcaseRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [activeIdx]);

  /* ─── render ─────────────────────────────────────────────── */
  return (
    /*
      Section has natural height — no h-screen, no overflow tricks.
      The grid panel (gridWrapRef) is the only thing that gets pinned.
    */
    <section ref={sectionRef} className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ════════ HEADER — scrolls away freely ════════ */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pt-24 pb-14"
        >
          <div className="max-w-2xl">
            <span className="section-label">Product Portfolio</span>
            <h2 className="section-heading">
              Industrial{" "}
              <span className="text-[var(--secondary)]">Packaging</span>{" "}
              &amp;{" "}
              <span className="text-[var(--secondary)]">Garment Trim</span>{" "}
              Solutions
            </h2>
          </div>
          <p className="text-sm text-[var(--accent)]/65 leading-relaxed max-w-sm">
            Engineered product divisions serving garment manufacturers, exporters,
            retailers and industrial businesses across India.
          </p>
        </div>

      </div>

      {/* ════════ GRID WRAPPER — this element is pinned ════════
          It sits outside the inner max-w-7xl so GSAP can pin the
          full-bleed wrapper; the inner container keeps the gutters.
      ════════════════════════════════════════════════════════ */}
      <div ref={gridWrapRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0 border border-(--primary)/10 overflow-hidden">

            {/* ═══ LEFT: tab selector ═══ */}
            <div className="bg-(--primary) flex flex-col">

              {/* Progress strip */}
              <div className="px-6 py-4 border-b border-white/10">
                {/* scroll progress bar */}
                <div className="h-0.5 bg-white/10 w-full mb-3 overflow-hidden">
                  <div
                    ref={progBarRef}
                    className="h-full bg-(--secondary)"
                    style={{
                      width: "0%",
                      transition: "width 80ms linear",
                      willChange: "width",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.22em] mb-1">
                    Select Product
                  </p>
                  <p className="text-white/50 text-[10px] font-bold tabular-nums">
                    {String(activeIdx + 1).padStart(2, "0")} &nbsp;/&nbsp;
                    {String(products.length).padStart(2, "0")}
                  </p>
                </div>
                <p className="text-white/80 text-sm font-semibold truncate">
                  {active.name}
                </p>
              </div>

              {/* Tab list */}
              <div ref={listRef} className="flex flex-col flex-1">
                {products.map((item, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveIdx(idx)}
                      className={`group text-left border-b border-white/8 transition-all duration-250
                        ${isActive ? "bg-(--secondary)" : "hover:bg-white/5"}`}
                    >
                      <div className="flex items-center gap-4 px-5 py-2">

                        {/* number */}
                        <span className={`text-[11px] font-black tabular-nums w-5 shrink-0
                          ${isActive ? "text-white/70" : "text-white/25"}`}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>

                        {/* icon */}
                        <span className={`text-lg shrink-0 transition-colors duration-250
                          ${isActive ? "text-white" : "text-(--secondary)"}`}>
                          {item.icon}
                        </span>

                        {/* label */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-[10px] uppercase tracking-[0.18em] truncate mb-0.5
                            ${isActive ? "text-white/60" : "text-white/28"}`}>
                            {item.category}
                          </p>
                          <p className={`text-sm font-semibold truncate transition-colors duration-250
                            ${isActive ? "text-white" : "text-white/75 group-hover:text-white"}`}>
                            {item.name}
                          </p>
                        </div>

                        {/* arrow */}
                        <HiArrowRight className={`text-base shrink-0 transition-all duration-250
                          ${isActive
                            ? "text-white translate-x-0.5"
                            : "text-white/15 group-hover:text-white/40"}`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* scroll hint — desktop only */}
              <div className="px-6 py-4 border-t border-white/10 hidden lg:flex items-center gap-2 text-white/25 text-[9px] uppercase tracking-[0.2em]">
                <span className="animate-bounce inline-block leading-none">↓</span>
                <span>Scroll to navigate</span>
              </div>
            </div>

            {/* ═══ RIGHT: showcase ═══ */}
            <div ref={showcaseRef} className="bg-white flex flex-col">

              {/* top banner */}
              <div
                className="relative flex flex-col justify-end p-10 lg:p-12 overflow-hidden min-h-60"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary) 0%, rgba(57,63,75,0.95) 100%)",
                }}
              >
                {/* watermark */}
                <span
                  className="absolute top-1/2 right-6 -translate-y-1/2 text-[90px] font-black
                             uppercase leading-none select-none pointer-events-none
                             text-white/4 text-right hidden lg:block"
                  aria-hidden
                >
                  {active.name}
                </span>
                <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-(--secondary) text-[10px] font-bold uppercase tracking-[0.22em] mb-3 block">
                    {active.category}
                  </span>
                  <h3 className="text-white text-3xl lg:text-4xl font-black leading-tight mb-3">
                    {active.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-lg">
                    {active.description}
                  </p>
                </div>
              </div>

              {/* bottom: features + image */}
              <div className="p-8 lg:p-0 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* features */}
                <div className="lg:p-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-(--secondary) mb-5">
                    Product Highlights
                  </p>
                  <ul className="space-y-4">
                    {active.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-(--secondary)/12 flex items-center justify-center shrink-0 mt-0.5">
                          <FiCheckCircle className="text-(--secondary) text-xs" />
                        </span>
                        <span className="text-(--accent)/75 text-sm leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* product image */}
                <div className="bg-white border border-(--primary)/10 flex flex-col">
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      key={active.id}
                      src={active.image}
                      alt={active.name}
                      className="w-full h-[70%] object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-(--primary) text-white px-3 py-2 text-xs font-bold uppercase tracking-wide">
                      {active.name}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
