"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  MdOutlineFactory,
  MdOutlinePrecisionManufacturing,
  MdOutlineInventory,
  MdOutlineVerified,
  MdOutlineEngineering,
} from "react-icons/md";
import { TbBuildingWarehouse, TbReportAnalytics } from "react-icons/tb";
import { GiCog } from "react-icons/gi";
import { FiActivity, FiLayers, FiShield } from "react-icons/fi";

const capabilities = [
  {
    icon: <MdOutlinePrecisionManufacturing className="text-2xl" />,
    title: "Advanced Machinery",
    desc: "State-of-the-art equipment for high-volume precision production with consistent quality output.",
  },
  {
    icon: <MdOutlineFactory className="text-2xl" />,
    title: "Production Lines",
    desc: "Dedicated production lines for PP, LDPE, HDPE packaging and garment trim products at industrial scale.",
  },
  {
    icon: <MdOutlineVerified className="text-2xl" />,
    title: "Quality Inspection",
    desc: "Multi-stage QC checkpoints with stringent testing protocols at every production milestone.",
  },
  {
    icon: <GiCog className="text-2xl" />,
    title: "Engineering Process",
    desc: "Engineered manufacturing processes designed for repeatability, precision and zero-defect production.",
  },
  {
    icon: <TbBuildingWarehouse className="text-2xl" />,
    title: "Warehouse & Storage",
    desc: "Organised warehousing with systematic inventory management ensuring prompt order fulfillment.",
  },
  {
    icon: <MdOutlineEngineering className="text-2xl" />,
    title: "Technical Team",
    desc: "100+ skilled professionals including production engineers, quality supervisors and dispatch specialists.",
  },
  {
    icon: <FiActivity className="text-2xl" />,
    title: "Production Monitoring",
    desc: "Real-time production monitoring to maintain output consistency and meet delivery timelines.",
  },
  {
    icon: <TbReportAnalytics className="text-2xl" />,
    title: "Process Documentation",
    desc: "Comprehensive traceability documentation for every batch — from raw material to dispatch.",
  },
];

/* ── Animated number counter ── */
function MetricCounter({ value, label, isText = false }) {
  const [count, setCount] = useState(0);
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (isText) return; /* non-numeric — no counting needed */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num   = parseInt(value, 10);
          const steps = 50;
          const inc   = num / steps;
          let cur = 0;
          const timer = setInterval(() => {
            cur += inc;
            if (cur >= num) { setCount(num); clearInterval(timer); }
            else setCount(Math.floor(cur));
          }, 1600 / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, isText]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-black text-white leading-none tabular-nums">
      {isText ? value : `${count}${value.replace(/\d/g, "")}`}
    </div>
  );
}

const metrics = [
  { raw: "35+",       label: "Years of Operation", isText: false },
  { raw: "100+",      label: "Production Staff",   isText: false },
  { raw: "2+",        label: "Product Divisions",  isText: false },
  { raw: "Pan India", label: "Supply Network",     isText: true  },
];

export default function Infrastructure() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const metricsRef  = useRef(null);
  const capsRef     = useRef(null);
  const bannerRef   = useRef(null);

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

      if (metricsRef.current) {
        gsap.fromTo(
          Array.from(metricsRef.current.children),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: metricsRef.current, start: "top 82%" },
          }
        );
      }

      if (capsRef.current) {
        gsap.fromTo(
          Array.from(capsRef.current.children),
          { x: -25, opacity: 0 },
          {
            x: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power2.out",
            scrollTrigger: { trigger: capsRef.current, start: "top 80%" },
          }
        );
      }

      gsap.fromTo(
        bannerRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: bannerRef.current, start: "top 90%" },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--accent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14">
          <span
            className="inline-block text-[var(--secondary)] text-[11px] font-bold uppercase tracking-[0.22em] border-l-[3px] border-[var(--secondary)] pl-3 mb-5"
          >
            Manufacturing Excellence
          </span>
          <h2 className="section-heading-white mb-4">
            Industrial{" "}
            <span className="text-[var(--secondary)]">Infrastructure</span>{" "}
            &amp; Capability
          </h2>
          <p className="text-white/50 leading-relaxed text-sm">
            Our manufacturing facility is equipped with advanced machinery, quality-controlled
            production systems and an experienced technical team — built to deliver at
            industrial scale with engineering precision.
          </p>
        </div>

        {/* ── Metrics strip ── */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 border border-white/10 mb-14"
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="bg-[var(--accent)] hover:bg-[var(--primary)] transition-all duration-300 px-8 py-8 flex flex-col items-center gap-2 text-center group border border-white/0 hover:border-[var(--secondary)]/20"
            >
              <MetricCounter value={m.raw} label={m.label} isText={m.isText} />
              <span className="text-white/40 group-hover:text-white/55 transition-colors duration-300 text-[10px] uppercase tracking-widest mt-1">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Capabilities: 2-column horizontal rows ── */}
        <div
          ref={capsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/6 border border-white/10"
        >
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="group bg-[var(--accent)] hover:bg-[var(--primary)] transition-all duration-300 px-7 py-5 flex items-start gap-5 border border-white/0 hover:border-[var(--secondary)]/15"
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 flex items-center justify-center text-[var(--secondary)] shrink-0 transition-all duration-300 group-hover:bg-[var(--secondary)]/18">
                {cap.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white mb-1">{cap.title}</h4>
                <p className="text-white/45 group-hover:text-white/60 transition-colors duration-300 text-sm leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              {/* Right accent line (grows on hover) */}
              <div className="w-px h-0 group-hover:h-full bg-[var(--secondary)]/30 transition-all duration-500 self-stretch shrink-0" />
            </div>
          ))}
        </div>

        {/* ── Bottom banner ── */}
        <div
          ref={bannerRef}
          className="mt-10 border border-white/10 bg-[var(--primary)]/25 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <FiLayers className="text-[var(--secondary)] text-xl shrink-0" />
            <p className="text-white/65 text-sm leading-relaxed">
              <span className="text-white font-semibold">Export-ready manufacturing</span>
              {" "}— our infrastructure meets the quality benchmarks demanded by world-class brands.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <FiShield className="text-[var(--secondary)]" />
            <span className="text-[var(--secondary)] text-xs font-bold uppercase tracking-wider">
              ISO Oriented Quality
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
