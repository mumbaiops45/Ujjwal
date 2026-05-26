"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HiArrowRight } from "react-icons/hi";
import { TbPackage, TbRibbonHealth } from "react-icons/tb";
import { MdOutlineWaterDrop, MdOutlineShield } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { GiSewingString } from "react-icons/gi";

/* ── ALL DIVISIONS ─────────────────────────────────────────── */
const divisions = {
  poly: [
    {
      id: "pp",
      num: "01",
      title: "PP Packaging",
      subtitle: "Polypropylene Solutions",
      icon: <TbPackage className="text-5xl" />,
      description:
        "Strong, lightweight polypropylene packaging for industrial polybags, garment packaging and printed packaging products. Engineered for clarity and consistency.",
      features: [
        "Durable & Tear Resistant",
        "Moisture Resistant",
        "High Quality Print Surface",
        "Lightweight Construction",
      ],
      products: ["PP Polybags", "Printed PP Bags", "Garment Cover Bags", "Industrial PP Pouches"],
      featured: true,
    },
    {
      id: "ldpe",
      num: "02",
      title: "LDPE Solutions",
      subtitle: "Low Density Polyethylene",
      icon: <MdOutlineWaterDrop className="text-5xl" />,
      description:
        "Flexible LDPE packaging solutions offering excellent softness, stretch and water resistance for retail, textile and soft packaging applications.",
      features: [
        "Flexible & Stretchable",
        "Smooth Surface Finish",
        "Water Resistant",
        "Soft Touch Packaging",
      ],
      products: ["LDPE Bags", "Soft Packaging Bags", "Stretch Wrap Films", "Retail LDPE Pouches"],
      featured: false,
    },
    {
      id: "hdpe",
      num: "03",
      title: "HDPE Packaging",
      subtitle: "High Density Polyethylene",
      icon: <MdOutlineShield className="text-5xl" />,
      description:
        "Heavy duty HDPE packaging built for industrial and export grade requirements with exceptional strength to weight ratio.",
      features: [
        "Industrial Grade Strength",
        "Excellent Tear Resistance",
        "Export Ready Quality",
        "Heavy Load Capable",
      ],
      products: ["HDPE Bags", "Industrial Packaging", "Export Packaging", "Heavy Duty Pouches"],
      featured: false,
    },
  ],
  elastic: [
    {
      id: "jacquard",
      num: "01",
      title: "Jacquard Elastic",
      subtitle: "Custom Woven Elastic",
      icon: <GiSewingString className="text-5xl" />,
      description:
        "Premium jacquard elastic manufactured with customised woven branding, decorative patterns and high stretch durability for garment trims.",
      features: [
        "Custom Brand Weaving",
        "High Stretch Strength",
        "Soft Finish",
        "Fashion Industry Ready",
      ],
      products: ["Logo Elastic", "Designer Waistbands", "Printed Elastic", "Custom Jacquard Tape"],
      featured: true,
    },
    {
      id: "woven",
      num: "02",
      title: "Woven Elastic",
      subtitle: "Industrial Elastic Solutions",
      icon: <TbRibbonHealth className="text-5xl" />,
      description:
        "Strong woven elastic tapes engineered for waistbands, garments, uniforms and industrial textile applications.",
      features: [
        "High Durability",
        "Strong Recovery",
        "Multi Colour Options",
        "Industrial Grade Quality",
      ],
      products: ["Elastic Tape", "Garment Elastic", "Waistband Elastic", "Decorative Elastic"],
      featured: false,
    },
    {
      id: "smocking",
      num: "03",
      title: "Smocking Thread",
      subtitle: "Elastic Thread Solutions",
      icon: <GiSewingString className="text-5xl" />,
      description:
        "Elastic smocking threads available in multiple deniers and colours for fashion garments, decorative stitching and textile manufacturing.",
      features: [
        "Smooth Stretch",
        "Colour Variety",
        "High Elasticity",
        "Soft Textile Feel",
      ],
      products: ["Elastic Thread", "Textile Thread", "Fashion Smocking", "Stretch Stitch Thread"],
      featured: false,
    },
    {
      id: "plain",
      num: "04",
      title: "Plain Solid Tape",
      subtitle: "Trim & Tape Products",
      icon: <TbRibbonHealth className="text-5xl" />,
      description:
        "Flat tapes and trim products designed for drawcords, garment reinforcement, apparel trims and utility textile applications.",
      features: [
        "Flat Woven Construction",
        "Strong Fabric Hold",
        "Soft Finish",
        "Garment Application Ready",
      ],
      products: ["Flat Tape", "Drawcord Tape", "Trim Tape", "Garment Reinforcement Tape"],
      featured: false,
    },
  ],
};

export default function Division() {
  const [activeTab, setActiveTab]     = useState("poly");
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const tabsRef     = useRef(null);
  const gridRef     = useRef(null);
  const prevTab     = useRef("poly");

  /* entrance animation */
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
      gsap.fromTo(
        tabsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );
      if (gridRef.current) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* tab switch animation */
  const handleTab = (tab) => {
    if (tab === activeTab) return;
    prevTab.current = activeTab;
    setActiveTab(tab);
    if (gridRef.current) {
      gsap.fromTo(
        Array.from(gridRef.current.children),
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  const activeData = divisions[activeTab];

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--primary)]/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <span className="section-label">Core Product Divisions</span>
            <h2 className="section-heading">
              Packaging Solutions{" "}
              <span className="text-[var(--secondary)]">Built For</span>{" "}
              Industry
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[var(--primary)] text-sm font-bold uppercase tracking-wide hover:text-[var(--secondary)] transition-colors duration-300 shrink-0"
          >
            View All Products <HiArrowRight />
          </Link>
        </div>

        {/* ── Tabs ── */}
        <div ref={tabsRef} className="flex flex-col sm:flex-row gap-0 mb-12 border border-[var(--primary)]/12 overflow-hidden">
          {[
            { key: "poly",    label: "Polyethylene Bags Division" },
            { key: "elastic", label: "Elastic Products Division"  },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTab(key)}
              className={`flex-1 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 relative ${
                activeTab === key
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white text-[var(--primary)] hover:bg-[var(--primary)]/5"
              }`}
            >
              {activeTab === key && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--secondary)]"
                />
              )}
              {label}
            </button>
          ))}
        </div>

        {/* ── Cards grid ── */}
        <div
          ref={gridRef}
          className={`grid gap-6 ${
            activeTab === "elastic"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {activeData.map((div) => (
            <div
              key={div.id}
              className={`group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border ${
                div.featured
                  ? "bg-[var(--primary)] border-[var(--primary)]"
                  : "bg-white border-[var(--primary)]/10 hover:border-[var(--secondary)]/30"
              }`}
            >
              {/* Top accent bar */}
              <div
                className={`h-[3px] w-full ${
                  div.featured ? "bg-[var(--secondary)]" : "bg-[var(--primary)]/20 group-hover:bg-[var(--secondary)] transition-colors duration-500"
                }`}
              />

              <div className="p-7 flex flex-col flex-1 relative">

                {/* Background number watermark */}
                <span
                  className={`absolute bottom-4 right-5 text-[80px] font-black leading-none select-none pointer-events-none ${
                    div.featured ? "text-white/[0.05]" : "text-[var(--primary)]/[0.05]"
                  }`}
                  aria-hidden
                >
                  {div.num}
                </span>

                {/* Header row */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.22em] border px-2 py-0.5 ${
                      div.featured
                        ? "text-white/40 border-white/15"
                        : "text-[var(--accent)]/40 border-[var(--primary)]/10"
                    }`}
                  >
                    Division {div.num}
                  </span>
                  <span
                    className={
                      div.featured
                        ? "text-[var(--secondary)]"
                        : "text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors duration-300"
                    }
                  >
                    {div.icon}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`mb-0.5 ${
                    div.featured ? "text-white" : "text-[var(--primary)]"
                  }`}
                >
                  {div.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-[var(--secondary)]">
                  {div.subtitle}
                </p>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed mb-5 ${
                    div.featured ? "text-white/60" : "text-[var(--accent)]/65"
                  }`}
                >
                  {div.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                  {div.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <FiCheckCircle className="text-[var(--secondary)] text-sm shrink-0" />
                      <span
                        className={
                          div.featured ? "text-white/70" : "text-[var(--accent)]/70"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Product chips */}
                <div
                  className={`flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-dashed ${
                    div.featured ? "border-white/10" : "border-[var(--primary)]/8"
                  }`}
                >
                  {div.products.map((p) => (
                    <span
                      key={p}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 ${
                        div.featured
                          ? "bg-white/10 text-white/55"
                          : "bg-[var(--primary)]/6 text-[var(--primary)]/55"
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
