"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FiCheckCircle, FiShield, FiActivity } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi";
import {
  MdOutlinePrecisionManufacturing,
  MdOutlineVerified,
  MdOutlineFactory,
  MdOutlineEngineering,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { TbBuildingWarehouse, TbReportAnalytics } from "react-icons/tb";
import { GiCog } from "react-icons/gi";

gsap.registerPlugin(ScrollTrigger);

/* ─── data ───────────────────────────────────────────────────── */
const capabilities = [
  { icon: <MdOutlinePrecisionManufacturing className="text-xl" />, title: "Advanced Machinery" },
  { icon: <MdOutlineFactory className="text-xl" />,               title: "Production Lines" },
  { icon: <MdOutlineVerified className="text-xl" />,              title: "Quality Inspection" },
  { icon: <GiCog className="text-xl" />,                         title: "Engineering Process" },
  { icon: <TbBuildingWarehouse className="text-xl" />,           title: "Warehouse & Storage" },
  { icon: <MdOutlineEngineering className="text-xl" />,          title: "Technical Team" },
  { icon: <FiActivity className="text-xl" />,                    title: "Production Monitoring" },
  { icon: <TbReportAnalytics className="text-xl" />,             title: "Process Documentation" },
];

const metrics = [
  { num: "35+",      label: "Years of Operation"  },
  { num: "100+",     label: "Production Staff"    },
  { num: "2+",       label: "Product Divisions"   },
  { num: "Pan India", label: "Supply Network"     },
];

const pillars = [
  {
    step: "01",
    heading: "Advanced Weaving Machines",
    body: "High-speed weaving machines and elastic production systems manufacture woven elastics, webbing tapes, jacquard elastics and garment trim products with precision parameter control and consistent dimensional quality at every production run.",
    tags: ["Woven Elastics", "Webbing Tapes", "Jacquard Elastic"],
    img: "/infrastructure/Advanced Weaving Machines_2.png",
    reversed: false,
  },
  {
    step: "02",
    heading: "High-Speed Packaging Lines",
    body: "Modern production lines for PP polybags, LDPE bags and custom printed packaging are designed for high-volume throughput while maintaining consistent seal quality, dimensional accuracy and precise print registration on every batch.",
    tags: ["PP Polybags", "LDPE Bags", "Printed Packaging"],
    img: "/infrastructure/Packaging Lines.png",
    reversed: true,
  },
  {
    step: "03",
    heading: "Integrated Quality Inspection",
    body: "A dedicated quality inspection setup is built into every production stage. From raw material verification to final dispatch, each product is monitored for tensile strength, dimensional accuracy, print quality and durability before delivery.",
    tags: ["Tensile Testing", "Dimensional QC", "Print Accuracy"],
    img: "/infrastructure/Integrated Quality Inspection.png",
    reversed: false,
  },
  {
    step: "04",
    heading: "Skilled Team & Process Monitoring",
    body: "Supported by skilled technicians, experienced production engineers and continuous process monitoring systems. Regular technological upgrades and process optimisation maintain operational efficiency and minimise production downtime.",
    tags: ["100+ Staff", "Process Control", "Tech Upgrades"],
    img: "/infrastructure/Skilled Team & Process Monitoring_2.png",
    reversed: true,
  },
];

const qualitySteps = [
  {
    num: "01",
    label: "Raw Material Verification",
    desc: "Premium-grade raw materials are tested and documented for compliance before entering production. Every lot is verified by the quality team.",
  },
  {
    num: "02",
    label: "Tensile Strength Testing",
    desc: "Structural integrity of all products is tested under standardised load conditions to ensure field-grade reliability across applications.",
  },
  {
    num: "03",
    label: "Dimensional Accuracy",
    desc: "Width, length and thickness are verified at multiple production checkpoints ensuring consistent dimensions across every batch.",
  },
  {
    num: "04",
    label: "Print Quality Control",
    desc: "Colour accuracy, print registration and ink adhesion are individually tested for every custom printed batch before packaging.",
  },
  {
    num: "05",
    label: "Final Dispatch Inspection",
    desc: "Comprehensive visual and dimensional inspection before goods are packed, labelled and dispatched. No product leaves without approval.",
  },
];

/* ─── Section 1: Overview (dark, video background) ──────────── */
function OverviewSection() {
  const secRef   = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* parallel x: both columns fire at the same scroll point */
      gsap.fromTo(
        leftRef.current,
        { x: -75, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: secRef.current, start: "top 76%" } }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 75, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: secRef.current, start: "top 76%" } }
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="relative py-24 overflow-hidden">
      {/* video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay muted loop playsInline
      >
        <source src="/Polybags.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[var(--primary)]/78" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[440px] h-[440px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle at 70% 25%, var(--secondary) 0%, transparent 62%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT: intro + metrics */}
          <div ref={leftRef}>
            <span className="inline-block text-[var(--secondary)] text-[11px] font-bold uppercase tracking-[0.22em] border-l-[3px] border-[var(--secondary)] pl-3 mb-6">
              Manufacturing Excellence
            </span>
            <h2
              className="text-white font-black leading-tight mb-6"
              style={{ fontSize: "clamp(30px, 3.8vw, 50px)", letterSpacing: "-0.02em" }}
            >
              Precision{" "}
              <span className="text-[var(--secondary)]">Manufacturing</span>{" "}
              Infrastructure
            </h2>
            <p className="text-white/58 leading-[1.8] mb-10 text-sm">
              Our infrastructure is developed to support precision manufacturing, high production efficiency and consistent product quality across all operations. Equipped with advanced machinery and modern production systems, we maintain seamless manufacturing processes for woven elastics, webbing tapes, garment trims and flexible packaging products.
            </p>

            {/* metrics 2×2 */}
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="bg-white/5 hover:bg-white/10 transition-all duration-300 px-6 py-5 group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white leading-none group-hover:text-[var(--secondary)] transition-colors duration-300">
                    {m.num}
                  </div>
                  <div className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: capabilities grid */}
          <div ref={rightRef}>
            <p className="text-white/35 text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
              Manufacturing Capabilities
            </p>
            <div className="grid grid-cols-2 gap-px bg-white/8 border border-white/10">
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

            <div className="mt-6 flex items-center gap-3 border border-white/10 px-5 py-3 bg-white/4">
              <FiShield className="text-[var(--secondary)] shrink-0" />
              <p className="text-white/50 text-xs leading-relaxed">
                <span className="text-white font-semibold">Export-ready manufacturing</span>
                {" "}— meeting quality benchmarks demanded by world-class brands.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Pillar Row (parallel x per row) ────────────── */
function PillarRow({ pillar }) {
  const rowRef   = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* parallel x — both sides animate simultaneously */
      gsap.fromTo(
        leftRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: rowRef.current, start: "top 78%" } }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: rowRef.current, start: "top 78%" } }
      );
    }, rowRef);
    return () => ctx.revert();
  }, []);

  const TextBlock = ({ refProp, extraClass = "" }) => (
    <div
      ref={refProp}
      className={`flex flex-col justify-center py-14 px-8 lg:px-14 overflow-hidden ${extraClass}`}
    >
      <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] border-l-[3px] border-[var(--secondary)] pl-2.5 text-[var(--secondary)] mb-5">
        Step {pillar.step}
      </span>
      <h3
        className="font-black text-[var(--primary)] leading-tight mb-5"
        style={{ fontSize: "clamp(22px, 2.4vw, 32px)", letterSpacing: "-0.02em" }}
      >
        {pillar.heading}
      </h3>
      <p className="text-[var(--accent)]/68 leading-[1.78] text-sm max-w-[400px] mb-6">
        {pillar.body}
      </p>
      <div className="flex flex-wrap gap-2">
        {pillar.tags.map((t) => (
          <span
            key={t}
            className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 bg-[var(--secondary)]/8 text-[var(--secondary)] border border-[var(--secondary)]/15"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );

  const ImageBlock = ({ refProp, extraClass = "" }) => (
    <div
      ref={refProp}
      className={`relative overflow-hidden min-h-[320px] lg:min-h-0 bg-[#f4f7fb] ${extraClass}`}
    >
      <img
        src={pillar.img}
        alt={pillar.heading}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* subtle tint */}
      <div className="absolute inset-0 bg-[var(--primary)]/8" />
      {/* ghost step number */}
      <div
        className="absolute bottom-3 right-5 font-black leading-none text-[var(--primary)]/[0.08] select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 10vw, 130px)" }}
      >
        {pillar.step}
      </div>
      {/* accent bar */}
      <div className="absolute top-0 left-0 w-[3px] h-full bg-[var(--secondary)]/60" />
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="grid lg:grid-cols-2 border-b border-[var(--primary)]/8 overflow-hidden"
      style={{ minHeight: "360px" }}
    >
      {pillar.reversed ? (
        <>
          <ImageBlock refProp={leftRef} extraClass="order-2 lg:order-1" />
          <TextBlock  refProp={rightRef} extraClass="order-1 lg:order-2" />
        </>
      ) : (
        <>
          <TextBlock  refProp={leftRef} />
          <ImageBlock refProp={rightRef} />
        </>
      )}
    </div>
  );
}

function PillarsSection() {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 82%" } }
    );
  }, []);

  return (
    <section className="bg-white overflow-hidden">
      {/* section header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-20 pb-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="section-label">Manufacturing Divisions</span>
            <h2 className="section-heading mt-2">
              Our Manufacturing{" "}
              <span className="text-[var(--secondary)]">Pillars</span>
            </h2>
          </div>
          <p className="text-[var(--accent)]/60 text-sm leading-relaxed max-w-sm">
            The facility is designed with a structured workflow enabling smooth material movement,
            efficient production handling and timely order execution.
          </p>
        </div>
      </div>

      {/* pillar rows — full bleed within section */}
      <div className="border-t border-[var(--primary)]/8">
        {pillars.map((p) => (
          <PillarRow key={p.step} pillar={p} />
        ))}
      </div>
    </section>
  );
}

/* ─── Section 3: Quality Inspection (dark, alternating x) ───── */
function QualitySection() {
  const secRef    = useRef(null);
  const headerRef = useRef(null);
  const itemsRef  = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" } }
      );

      /* alternating: odd items from left, even from right */
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const fromX = i % 2 === 0 ? -65 : 65;
        gsap.fromTo(
          el,
          { x: fromX, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%" } }
        );
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="relative py-24 bg-[var(--primary)] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--secondary)]" />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[380px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 80%, var(--secondary) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* header */}
        <div ref={headerRef} className="max-w-2xl mb-14">
          <span className="inline-block text-[var(--secondary)] text-[11px] font-bold uppercase tracking-[0.22em] border-l-[3px] border-[var(--secondary)] pl-3 mb-5">
            Quality Assurance
          </span>
          <h2
            className="text-white font-black leading-tight"
            style={{ fontSize: "clamp(28px, 3.5vw, 46px)", letterSpacing: "-0.02em" }}
          >
            Quality at Every{" "}
            <span className="text-[var(--secondary)]">Production Stage</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mt-4 max-w-lg">
            From raw material intake to final dispatch inspection, each product undergoes
            strict monitoring to ensure compliance with industry standards and customer specifications.
          </p>
        </div>

        {/* quality steps — alternating x animation */}
        <div className="space-y-px overflow-hidden">
          {qualitySteps.map((qs, i) => (
            <div
              key={qs.num}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group flex items-start gap-6 sm:gap-10 bg-white/[0.04] hover:bg-white/[0.08] border border-white/8 hover:border-[var(--secondary)]/25 px-6 sm:px-8 py-6 transition-all duration-300"
            >
              {/* step badge */}
              <div className="shrink-0 flex flex-col items-center gap-1">
                <div className="w-10 h-10 border border-[var(--secondary)]/30 bg-[var(--secondary)]/8 flex items-center justify-center text-[var(--secondary)] text-[10px] font-black">
                  {qs.num}
                </div>
              </div>

              {/* divider */}
              <div className="hidden sm:block w-px self-stretch bg-white/10 shrink-0" />

              {/* content */}
              <div className="flex-1 grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-8 items-start">
                <h4 className="text-white font-bold text-base leading-snug">{qs.label}</h4>
                <p className="text-white/48 group-hover:text-white/65 transition-colors duration-300 text-sm leading-relaxed">
                  {qs.desc}
                </p>
              </div>

              {/* hover check */}
              <FiCheckCircle className="text-[var(--secondary)] shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-white/30 text-sm">
          Every batch is traceable from raw material to dispatch —{" "}
          <span className="text-white/55 font-semibold">
            quality is built throughout, not checked at the end.
          </span>
        </p>
      </div>
    </section>
  );
}

/* ─── Section 4: CTA ─────────────────────────────────────────── */
function CtaSection() {
  const ref     = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    /* parallel x on the cta strip too */
    gsap.fromTo(
      leftRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" } }
    );
    gsap.fromTo(
      rightRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" } }
    );
  }, []);

  return (
    <section className="py-16 bg-white border-t border-[var(--primary)]/8">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[var(--primary)] px-8 py-7 overflow-hidden">
          <div ref={leftRef} className="flex items-center gap-4">
            <FiShield className="text-[var(--secondary)] text-2xl shrink-0" />
            <p className="text-white/68 text-sm leading-relaxed">
              <span className="text-white font-semibold">
                Scalable production capacity
              </span>
              {" "}— our infrastructure is built to handle both bulk production requirements
              and customised product solutions with complete consistency.
            </p>
          </div>
          <div ref={rightRef} className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--secondary)] text-white text-sm font-bold uppercase tracking-wide hover:bg-[var(--secondary)]/90 transition-all duration-300"
            >
              Get In Touch <HiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── main export ─────────────────────────────────────────────── */
export default function InfrastructureShowcase() {
  return (
    <>
      <OverviewSection />
      <PillarsSection />
      <QualitySection />
      <CtaSection />
    </>
  );
}
