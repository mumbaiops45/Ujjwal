"use client";

import { useState, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { TbPackage, TbRibbonHealth } from "react-icons/tb";
import { GiRolledCloth } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const products = [
  {
    id: "pp-polybag",
    name: "PP Polybag",
    category: "Flexible Packaging",
    icon: <TbPackage className="text-4xl" />,
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

export default function Products() {
  const [active, setActive] = useState(products[0]);
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const listRef     = useRef(null);
  const showcaseRef = useRef(null);

  /* ── initial scroll-triggered entrance ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── animate showcase panel on product change ── */
  useEffect(() => {
    if (!showcaseRef.current) return;
    gsap.fromTo(
      showcaseRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [active.id]);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
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

        {/* ── Main layout: sidebar + showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0 border border-[var(--primary)]/10 overflow-hidden">

          {/* ── Left: product selector ── */}
          <div className="bg-[var(--primary)] flex flex-col">
            <div className="px-6 py-5 border-b border-white/10">
              <p className="text-white/35 text-[10px] uppercase tracking-[0.22em] mb-1">
                Select Product
              </p>
              <p className="text-white/80 text-sm font-semibold">
                {products.length} Products Available
              </p>
            </div>

            <div ref={listRef} className="flex flex-col flex-1">
              {products.map((item, idx) => {
                const isActive = active.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActive(item)}
                    className={`group text-left border-b border-white/8 transition-all duration-250 ${
                      isActive
                        ? "bg-[var(--secondary)]"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4 px-5 py-4">
                      {/* Number */}
                      <span
                        className={`text-[11px] font-black tabular-nums w-5 shrink-0 ${
                          isActive ? "text-white/70" : "text-white/25"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Icon */}
                      <span
                        className={`text-lg shrink-0 transition-colors duration-250 ${
                          isActive ? "text-white" : "text-[var(--secondary)]"
                        }`}
                      >
                        {item.icon}
                      </span>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-[10px] uppercase tracking-[0.18em] truncate mb-0.5 ${
                            isActive ? "text-white/60" : "text-white/28"
                          }`}
                        >
                          {item.category}
                        </p>
                        <p
                          className={`text-sm font-semibold truncate transition-colors duration-250 ${
                            isActive
                              ? "text-white"
                              : "text-white/75 group-hover:text-white"
                          }`}
                        >
                          {item.name}
                        </p>
                      </div>

                      {/* Arrow */}
                      <HiArrowRight
                        className={`text-base shrink-0 transition-all duration-250 ${
                          isActive
                            ? "text-white translate-x-0.5"
                            : "text-white/15 group-hover:text-white/40"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: showcase panel ── */}
          <div ref={showcaseRef} className="bg-white flex flex-col">

            {/* Top showcase area */}
            <div
              className="relative flex flex-col justify-end p-10 lg:p-12 overflow-hidden min-h-[240px]"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary) 0%, rgba(57,63,75,0.95) 100%)",
              }}
            >
              {/* Decorative watermark product name */}
              <span
                className="absolute top-1/2 right-6 -translate-y-1/2 text-[90px] font-black uppercase leading-none select-none pointer-events-none text-white/[0.04] text-right hidden lg:block"
                style={{ lineHeight: 1 }}
                aria-hidden
              >
                {active.name}
              </span>

              {/* Background grid */}
              <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10">
                <span className="text-[var(--secondary)] text-[10px] font-bold uppercase tracking-[0.22em] mb-3 block">
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

            {/* Bottom detail area */}
            <div className="p-8 lg:p-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Features */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--secondary)] mb-5">
                  Product Highlights
                </p>
                <ul className="space-y-4">
                  {active.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--secondary)]/12 flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheckCircle className="text-[var(--secondary)] text-xs" />
                      </span>
                      <span className="text-[var(--accent)]/75 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA block */}
              <div className="bg-[var(--primary)]/4 border border-[var(--primary)]/10 p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)] shrink-0">
                      <MdOutlineLocalShipping className="text-xl" />
                    </div>
                    <div>
                      <p className="text-[var(--primary)] font-bold text-sm">Pan India Manufacturing</p>
                      <p className="text-xs text-[var(--accent)]/55">Industrial supply capability</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--accent)]/70 leading-relaxed">
                    All products are manufactured with export quality standards and precision
                    process control for consistency, durability and long-term performance.
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] text-white px-5 py-3 text-sm font-bold uppercase tracking-wide hover:bg-[var(--secondary)] transition-all duration-300"
                  >
                    Request Details <HiArrowRight />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 border border-[var(--primary)]/20 text-[var(--primary)] px-5 py-3 text-sm font-bold uppercase tracking-wide hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all duration-300"
                  >
                    All Products
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
