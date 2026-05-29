"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FiShield, FiActivity } from "react-icons/fi";
import {
  MdOutlinePrecisionManufacturing,
  MdOutlineVerified,
  MdOutlineFactory,
  MdOutlineEngineering,
} from "react-icons/md";
import { TbBuildingWarehouse, TbReportAnalytics } from "react-icons/tb";
import { GiCog } from "react-icons/gi";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { icon: <MdOutlinePrecisionManufacturing className="text-xl" />, title: "Advanced Machinery" },
  { icon: <MdOutlineFactory className="text-xl" />,                title: "Production Lines" },
  { icon: <MdOutlineVerified className="text-xl" />,               title: "Quality Inspection" },
  { icon: <GiCog className="text-xl" />,                          title: "Engineering Process" },
  { icon: <TbBuildingWarehouse className="text-xl" />,            title: "Warehouse & Storage" },
  { icon: <MdOutlineEngineering className="text-xl" />,           title: "Technical Team" },
  { icon: <FiActivity className="text-xl" />,                     title: "Production Monitoring" },
  { icon: <TbReportAnalytics className="text-xl" />,              title: "Process Documentation" },
];

const metrics = [
  { num: "35+",      label: "Years" },
  { num: "100+",     label: "Staff" },
  { num: "2+",       label: "Divisions" },
  { num: "Pan India", label: "Supply" },
];

export default function AboutInfrastructure() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const contentRef = useRef(null);
  const capsRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Parallax — image drifts up as you scroll through the section */
      gsap.to(imageRef.current, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Left content block */
      gsap.fromTo(
        contentRef.current,
        { y: 45, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      /* Capabilities grid — stagger from left */
      if (capsRef.current) {
        gsap.fromTo(
          Array.from(capsRef.current.children),
          { x: -22, opacity: 0 },
          {
            x: 0, opacity: 1, stagger: 0.07, duration: 0.45, ease: "power2.out",
            scrollTrigger: { trigger: capsRef.current, start: "top 80%" },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: "90vh" }}
    >
      {/* Parallax background image */}
      <img
        ref={imageRef}
        src="/about/factory.jpg"
        alt="Manufacturing Infrastructure"
        className="absolute w-full object-cover pointer-events-none select-none"
        style={{ top: "-10%", height: "120%" }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-[var(--primary)]/78" />
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--secondary)]" />

      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 25%, var(--secondary) 0%, transparent 62%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: text + metrics */}
          <div ref={contentRef}>
            <span className="inline-block text-[var(--secondary)] text-[11px] font-bold uppercase tracking-[0.22em] border-l-[3px] border-[var(--secondary)] pl-3 mb-5">
              Infrastructure
            </span>

            <h2
              className="text-white font-black leading-tight mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              Advanced{" "}
              <span className="text-[var(--secondary)]">Manufacturing</span>{" "}
              Infrastructure
            </h2>

            <p className="text-white/60 leading-relaxed mb-10 text-sm">
              High-capacity machinery, quality-driven production systems and
              engineered workflows designed for industrial-scale output. Our
              facility is built to meet the demands of the world&apos;s most
              quality-conscious brands.
            </p>

            {/* Metrics strip */}
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 mb-10">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="bg-white/5 px-6 py-5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-2xl font-black text-white leading-none">{m.num}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <FiShield className="text-[var(--secondary)] text-xl shrink-0" />
              <p className="text-white/50 text-sm leading-relaxed">
                <span className="text-white font-semibold">Export-ready manufacturing</span>
                {" "}— our infrastructure meets the quality benchmarks demanded by world-class brands.
              </p>
            </div>
          </div>

          {/* Right: capabilities grid */}
          <div>
            <p className="text-white/35 text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
              Manufacturing Capabilities
            </p>

            <div
              ref={capsRef}
              className="grid grid-cols-2 gap-px bg-white/8 border border-white/10"
            >
              {capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="group bg-white/5 hover:bg-[var(--secondary)]/14 transition-all duration-300 px-5 py-4 flex items-center gap-3 border border-white/0 hover:border-[var(--secondary)]/20"
                >
                  <div className="w-9 h-9 bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 flex items-center justify-center text-[var(--secondary)] shrink-0 group-hover:bg-[var(--secondary)]/22 transition-all duration-300">
                    {cap.icon}
                  </div>
                  <span className="text-white/65 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                    {cap.title}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
