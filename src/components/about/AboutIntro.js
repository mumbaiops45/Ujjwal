"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HiArrowRight } from "react-icons/hi";
import { MdOutlineFactory, MdOutlineVerified } from "react-icons/md";
import { FiAward, FiCheckCircle } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

/* Walk every TEXT NODE inside `el` and wrap each word in an inline-block span
   so GSAP can tween words individually — colour spans are left intact. */
function splitWords(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);

  textNodes.forEach((tn) => {
    const parts = tn.textContent.split(/(\s+)/);
    const frag  = document.createDocumentFragment();
    parts.forEach((part) => {
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else if (part) {
        const span = document.createElement("span");
        span.textContent   = part;
        span.className     = "wru";
        span.style.cssText = "display:inline-block";
        frag.appendChild(span);
      }
    });
    tn.replaceWith(frag);
  });

  return Array.from(el.querySelectorAll(".wru"));
}

const strengths = [
  "35+ Years of manufacturing excellence",
  "Export quality production standards",
  "Pan India supply capability",
  "Engineering driven process control",
  "Zero-compromise quality assurance",
  "Reliable long-term client partnerships",
];

const highlightCards = [
  {
    icon : <FiAward className="text-2xl" />,
    value: "Est. 1989",
    label: "Three decades of industrial manufacturing heritage",
  },
  {
    icon : <MdOutlineVerified className="text-2xl" />,
    value: "Export Quality",
    label: "Standards aligned with global packaging requirements",
  },
  {
    icon : <TbTruckDelivery className="text-2xl" />,
    value: "Pan India Supply",
    label: "Seamless delivery network across all major cities",
  },
];

export default function AboutIntro() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const labelRef   = useRef(null);
  const headingRef = useRef(null);
  const para1Ref   = useRef(null);
  const para2Ref   = useRef(null);
  const listRef    = useRef(null);
  const ctaRef     = useRef(null);
  const cardsRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Left identity panel — slides in from left */
      gsap.fromTo(
        leftRef.current,
        { x: -70, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      /* Section label — scrub fade */
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1, y: 0, ease: "none",
            scrollTrigger: {
              trigger : labelRef.current,
              start   : "top 90%",
              end     : "bottom 72%",
              scrub   : 0.8,
            },
          }
        );
      }

      /* Heading — word-by-word scrub reveal */
      if (headingRef.current) {
        const words = splitWords(headingRef.current);
        gsap.timeline({
          scrollTrigger: {
            trigger : headingRef.current,
            start   : "top 88%",
            end     : "bottom 55%",
            scrub   : 1.4,
          },
        }).fromTo(words, { opacity: 0.06 }, { opacity: 1, stagger: 0.055, ease: "power1.inOut" });
      }

      /* Paragraph 1 — word scrub */
      if (para1Ref.current) {
        const words = splitWords(para1Ref.current);
        gsap.timeline({
          scrollTrigger: {
            trigger : para1Ref.current,
            start   : "top 90%",
            end     : "bottom 62%",
            scrub   : 1.2,
          },
        }).fromTo(words, { opacity: 0.06 }, { opacity: 1, stagger: 0.035, ease: "power1.inOut" });
      }

      /* Paragraph 2 — word scrub */
      if (para2Ref.current) {
        const words = splitWords(para2Ref.current);
        gsap.timeline({
          scrollTrigger: {
            trigger : para2Ref.current,
            start   : "top 90%",
            end     : "bottom 62%",
            scrub   : 1.2,
          },
        }).fromTo(words, { opacity: 0.06 }, { opacity: 1, stagger: 0.035, ease: "power1.inOut" });
      }

      /* Checklist — each item scrubs in from left */
      if (listRef.current) {
        const items = Array.from(listRef.current.children);
        gsap.timeline({
          scrollTrigger: {
            trigger : listRef.current,
            start   : "top 88%",
            end     : "bottom 65%",
            scrub   : 1,
          },
        }).fromTo(items, { opacity: 0, x: -18 }, { opacity: 1, x: 0, stagger: 0.1, ease: "power2.out" });
      }

      /* CTA buttons — one-shot stagger */
      if (ctaRef.current) {
        gsap.fromTo(
          Array.from(ctaRef.current.children),
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 92%" },
          }
        );
      }

      /* Highlight cards strip — scrub up */
      if (cardsRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger : cardsRef.current,
            start   : "top 92%",
            end     : "bottom 75%",
            scrub   : 1,
          },
        }).fromTo(
          Array.from(cardsRef.current.children),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, stagger: 0.14, ease: "power2.out" }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24">

        {/* ── Main two-panel block ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] overflow-hidden shadow-2xl">

          {/* LEFT: Company identity panel */}
          <div
            ref={leftRef}
            className="relative bg-[var(--primary)] p-10 lg:p-12 flex flex-col justify-between min-h-[460px] overflow-hidden"
          >
            {/* decorative factory icon */}
            <MdOutlineFactory className="absolute -bottom-4 -right-4 text-[220px] text-white/[0.04] pointer-events-none select-none" />
            <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
            <div
              className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)" }}
            />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-[var(--secondary)] text-[10px] font-bold uppercase tracking-[0.25em] border border-[var(--secondary)]/30 px-3 py-1.5 mb-8">
                <FiAward className="text-xs" />
                Est. 1989
              </span>

              <h3 className="text-white text-4xl sm:text-5xl font-black leading-[1.0] mb-5">
                Ujjwal<br />
                <span className="text-[var(--secondary)]">Poly Pack</span><br />
                India Pvt. Ltd.
              </h3>

              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                A trusted industrial manufacturing partner delivering flexible packaging
                and garment trim solutions for over three decades.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-3 mt-10 pt-8 border-t border-white/10">
              {[
                { num: "35+",  lbl: "Years"     },
                { num: "100+", lbl: "Team"      },
                { num: "2",    lbl: "Divisions" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-black text-white leading-none">{s.num}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Story content with scrub animations */}
          <div className="bg-white p-10 lg:p-12 flex flex-col justify-center border border-[var(--primary)]/8 lg:border-l-0">

            <span ref={labelRef} className="section-label">
              Our Story
            </span>

            <h2 ref={headingRef} className="section-heading mb-5">
              Engineering Packaging &{" "}
              <span className="text-[var(--secondary)]">Garment Trim</span>{" "}
              Solutions Since{" "}
              <span className="text-[var(--secondary)]">1989</span>
            </h2>

            <p ref={para1Ref} className="text-[var(--accent)]/80 leading-relaxed mb-4">
              Ujjwal Poly Pack India Pvt. Ltd. has built a reputation for manufacturing
              premium industrial packaging and garment trim products trusted by exporters,
              retail brands and textile manufacturers across India. Our engineering-driven
              approach ensures every product meets the highest standards.
            </p>

            <p ref={para2Ref} className="text-[var(--accent)]/80 leading-relaxed mb-8">
              With decades of manufacturing expertise, advanced infrastructure and strict
              quality systems, we continue to deliver scalable, reliable and export-ready
              production solutions. Our philosophy: when we earn your business, our promise
              is to keep it.
            </p>

            <ul ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-[var(--secondary)] text-base mt-0.5 shrink-0" />
                  <span className="text-sm text-[var(--accent)]/75">{s}</span>
                </li>
              ))}
            </ul>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wide hover:bg-[var(--secondary)] transition-all duration-300"
              >
                Get In Touch <HiArrowRight />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--primary)]/25 text-[var(--primary)] text-sm font-bold uppercase tracking-wide hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all duration-300"
              >
                View Products
              </Link>
            </div>

          </div>
        </div>

        {/* ── Highlight cards strip ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--primary)]/8 border border-t-0 border-[var(--primary)]/8 my-18"
        >
          {highlightCards.map((h, i) => (
            <div
              key={i}
              className="bg-white px-8 py-7 flex items-start gap-4 group hover:bg-[var(--primary)] transition-all duration-300 cursor-default"
            >
              <span className="text-[var(--secondary)] group-hover:text-white transition-colors duration-300 mt-0.5 shrink-0">
                {h.icon}
              </span>
              <div>
                <h4 className="text-[var(--primary)] group-hover:text-white transition-colors duration-300 mb-1">
                  {h.value}
                </h4>
                <p className="text-[var(--accent)]/70 group-hover:text-white/65 transition-colors duration-300 text-sm">
                  {h.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
