"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HiArrowRight } from "react-icons/hi";
import { MdOutlineStorefront, MdOutlineLocalShipping } from "react-icons/md";
import { GiClothes, GiSewingMachine } from "react-icons/gi";
import { TbShirt } from "react-icons/tb";
import { FiBox, FiPackage } from "react-icons/fi";
import { RiShoppingBag2Line } from "react-icons/ri";

const industries = [
  {
    num: "01",
    icon: <GiClothes className="text-3xl" />,
    title: "Apparel Industry",
    desc: "Garment cover bags, printed polybags and customised packaging for apparel brands, exporters and retailers.",
  },
  {
    num: "02",
    icon: <GiSewingMachine className="text-3xl" />,
    title: "Textile Manufacturing",
    desc: "Industrial packaging and elastic trim products tailored for textile mills and fabric manufacturers.",
  },
  {
    num: "03",
    icon: <RiShoppingBag2Line className="text-3xl" />,
    title: "FMCG Packaging",
    desc: "High-speed FMCG-compatible packaging solutions meeting strict food-safety adjacent quality benchmarks.",
  },
  {
    num: "04",
    icon: <MdOutlineStorefront className="text-3xl" />,
    title: "Retail Packaging",
    desc: "Branded and printed retail packaging for consumer goods, boutique brands and organised retail chains.",
  },
  {
    num: "05",
    icon: <MdOutlineLocalShipping className="text-3xl" />,
    title: "Logistics & Supply Chain",
    desc: "Durable, heavy-duty HDPE and PP packaging solutions for logistics warehousing and supply chain operations.",
  },
  {
    num: "06",
    icon: <FiBox className="text-3xl" />,
    title: "Industrial Packaging",
    desc: "Bulk industrial packaging products engineered for heavy loads, long-haul transport and storage environments.",
  },
  {
    num: "07",
    icon: <TbShirt className="text-3xl" />,
    title: "Garment Manufacturing",
    desc: "Complete garment trim solutions — elastic tapes, webbing, smocking thread and accessory products.",
  },
  {
    num: "08",
    icon: <FiPackage className="text-3xl" />,
    title: "Export Packaging",
    desc: "Export-grade flexible packaging meeting international quality standards for global trade and customs compliance.",
  },
];

export default function Industries() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const gridRef    = useRef(null);
  const footerRef  = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      if (gridRef.current) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1, stagger: 0.07, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      }

      gsap.fromTo(
        footerRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--primary)]/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="section-label">Industries We Serve</span>
            <h2 className="section-heading">
              Powering{" "}
              <span className="text-[var(--secondary)]">Multiple Sectors</span>{" "}
              Across{" "}
              <span className="text-[var(--secondary)]">India</span>
            </h2>
          </div>
          <p className="text-[var(--accent)]/60 text-sm leading-relaxed max-w-xs">
            Our products serve diverse industries — from apparel to FMCG, logistics to exports.
          </p>
        </div>

        {/* ── Industry tiles ── */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[var(--primary)]/10">
          {industries.map((ind, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden bg-white transition-all duration-400 cursor-default border-b border-r border-[var(--primary)]/8 ${
                /* remove right border on 4th column */
                (i + 1) % 4 === 0 ? "lg:border-r-0" : ""
              } ${
                /* remove bottom border on last row */
                i >= industries.length - 4 ? "lg:border-b-0" : ""
              } ${
                /* remove bottom border on last 2 for tablet */
                i >= industries.length - 2 ? "sm:border-b-0 lg:border-b-0" : ""
              }`}
            >
              {/* Hover fill overlay */}
              <div className="absolute inset-0 bg-[var(--primary)] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />

              {/* Static layout */}
              <div className="relative z-10 p-7 flex flex-col gap-4 h-full min-h-[180px]">

                {/* Top row: number + icon */}
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--primary)]/30 group-hover:text-white/30 transition-colors duration-300">
                    {ind.num}
                  </span>
                  <span className="text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors duration-300">
                    {ind.icon}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-[var(--primary)] group-hover:text-white transition-colors duration-300">
                  {ind.title}
                </h4>

                {/* Description: hidden by default, visible on hover */}
                <p className="text-xs text-[var(--accent)]/0 group-hover:text-white/65 transition-all duration-300 leading-relaxed">
                  {ind.desc}
                </p>

                {/* Bottom arrow indicator */}
                <div className="mt-auto flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-[var(--secondary)] text-xs font-bold uppercase tracking-wider">
                    Learn More
                  </span>
                  <HiArrowRight className="text-[var(--secondary)] text-xs" />
                </div>

              </div>

              {/* Left accent bar (visible on hover) */}
              <div className="absolute top-0 left-0 w-[3px] h-0 group-hover:h-full bg-[var(--secondary)] transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* ── Footer strip ── */}
        <div
          ref={footerRef}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-[var(--primary)]/10 pt-8"
        >
          <p className="text-[var(--accent)]/60 text-sm text-center sm:text-left">
            Don't see your industry?{" "}
            <span className="text-[var(--primary)] font-semibold">
              We work with any business that needs reliable packaging.
            </span>
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[var(--secondary)] text-sm font-bold uppercase tracking-wide hover:text-[var(--primary)] transition-colors duration-300 shrink-0"
          >
            Discuss Your Requirements <HiArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
}
