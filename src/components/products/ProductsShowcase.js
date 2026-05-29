"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { FiCheckCircle } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── data ───────────────────────────────────────────────────── */
const PACKAGING = [
  {
    id: "pp-polybag",
    name: "PP Polybag",
    category: "Flexible Packaging",
    description:
      "High clarity polypropylene polybags engineered for garment packaging, retail packaging and industrial applications. Offering premium transparency, excellent print adhesion and reliable moisture resistance for demanding supply chains.",
    features: [
      "High transparency finish",
      "Excellent print compatibility",
      "Lightweight & durable",
      "Retail packaging ready",
    ],
    images: ["/products/PP  POLYBAG_N.png", "/products/PP  POLYBAG_2.png"],
  },
  {
    id: "ldpe-bags",
    name: "LDPE Bags",
    category: "Flexible Packaging",
    description:
      "Soft and flexible LDPE bags manufactured for textile, garment and industrial packaging requirements with strong sealing performance. Ensures consistent moisture protection and product integrity across all distribution channels.",
    features: [
      "Soft touch material",
      "Flexible construction",
      "Water resistant barrier",
      "Strong sealing quality",
    ],
    images: ["/products/LDPE   BAGS_1.png", "/products/LDPE   BAGS_2.png"],
  },
  {
    id: "printed-packing-bag",
    name: "Printed Packing Bag",
    category: "Custom Packaging",
    description:
      "Custom printed packaging bags developed for brand identity, retail presentation and export packaging applications. Combining premium print quality with structural integrity for effective product showcasing.",
    features: [
      "Custom branding",
      "High quality printing",
      "Export grade finish",
      "Retail ready appearance",
    ],
    images: [
      "/products/PRINTED  PACKING  BAG_1.png",
      "/products/PRINTED  PACKING  BAG_2.png",
    ],
  },
];

const ELASTIC = [
  {
    id: "jacquard-elastic",
    name: "Jacquard Elastic",
    category: "Garment Trim Division",
    description:
      "Premium woven jacquard elastic customized with logos, patterns and brand identity for garments, innerwear and fashion accessories. Each band delivers precision craftsmanship with consistent stretch quality.",
    features: [
      "Custom woven branding",
      "Premium stretch quality",
      "Fashion industry compatible",
      "Multi colour options",
    ],
    images: [
      "/products/JACQUARD   ELASTIC.png",
      "/products/JACQUARD   ELASTIC_2.png",
      "/products/JACQUARD   ELASTIC_3.png",
    ],
  },
  {
    id: "webbing-tape",
    name: "Webbing Tape",
    category: "Garment Trim Division",
    description:
      "Strong woven webbing tapes used in bags, garments, safety equipment and industrial textile applications requiring high tensile strength. Precision loom techniques for unmatched durability and dimensional stability.",
    features: [
      "Heavy duty strength",
      "Industrial grade weaving",
      "Multiple width options",
      "Long lasting durability",
    ],
    images: [
      "/products/WEBBING TAPE_1.png",
      "/products/WEBBING TAPE_2.png",
      "/products/WEBBING TAPE_3.png",
    ],
  },
  {
    id: "woven-elastic",
    name: "Woven Elastic",
    category: "Garment Trim Division",
    description:
      "Durable woven elastic designed for waistbands, activewear, uniforms and industrial garment applications requiring strong recovery. Maintains shape and performance through repeated wash cycles.",
    features: [
      "Strong elasticity",
      "Shape retention",
      "Garment industry standard",
      "Long term durability",
    ],
    images: [
      "/products/WOVEN  ELASTIC.png",
      "/products/WOVEN  ELASTIC_2.png",
    ],
  },
  {
    id: "knitted-elastic",
    name: "Knitted Elastic",
    category: "Garment Trim Division",
    description:
      "Soft knitted elastic ideal for lightweight garments, face masks, lingerie and flexible apparel applications. Delivers comfortable stretch performance without compromising material softness.",
    features: [
      "Soft texture finish",
      "Comfort stretch",
      "Lightweight material",
      "Flexible application",
    ],
    images: [
      "/products/KNITTED   ELASTIC.png",
      "/products/KNITTED   ELASTIC_2.png",
    ],
  },
  {
    id: "woven-elastic-tape",
    name: "Woven Elastic Tape",
    category: "Garment Trim Division",
    description:
      "Industrial woven elastic tapes manufactured for garment trims, sportswear and textile accessories. Engineered for superior stretch recovery and consistent dimensional stability in demanding environments.",
    features: [
      "Precision weaving",
      "Industrial quality",
      "High stretch recovery",
      "Multi application usage",
    ],
    images: [
      "/products/WOVEN  ELASTIC  TAPE.png",
      "/products/WOVEN  ELASTIC  TAPE_2.png",
    ],
  },
];

/* ─── ZigZag: percentage-based within any container ─────────── */
function ZigZag({ images }) {
  const n = images.length;

  if (n === 1) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-[260px] w-full overflow-hidden shadow-2xl aspect-[3/4]">
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  if (n === 2) {
    return (
      <div className="absolute inset-[6%]">
        {/* top-left image (larger) */}
        <div className="absolute top-0 left-0 w-[58%] h-[80%] overflow-hidden shadow-2xl">
          <img
            src={images[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* bottom-right image */}
        <div className="absolute bottom-0 right-0 w-[52%] h-[80%] overflow-hidden shadow-xl border-[5px] border-white">
          <img
            src={images[1]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    );
  }

  /* 3 images — triangular zig-zag */
  return (
    <div className="absolute inset-[4%]">
      {/* top-left */}
      <div className="absolute top-0 left-[4%] w-[51%] h-[70%] overflow-hidden shadow-2xl">
        <img
          src={images[0]}
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>
      {/* middle-right */}
      <div className="absolute top-[16%] right-0 w-[46%] h-[70%] overflow-hidden shadow-xl border-[5px] border-white">
        <img
          src={images[1]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* bottom-left */}
      <div className="absolute bottom-0 left-[30%] w-[40%] h-[50%] overflow-hidden shadow-lg border-[5px] border-white">
        <img
          src={images[2]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* accent dots */}
      <div className="absolute top-[17%] left-[52%] w-2 h-2 rounded-full bg-(--secondary)" />
      <div className="absolute top-[62%] right-[45%] w-1.5 h-1.5 rounded-full bg-(--primary)/25" />
    </div>
  );
}

/* ─── Desktop: full-screen pinned sticky section ─────────────── */
function DesktopSection({ label, title, highlight, products, reversed, dark }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = products[activeIdx];

  const wrapRef     = useRef(null);
  const panelRef    = useRef(null);
  const contentRef  = useRef(null);
  const imageRef    = useRef(null);
  const progBarRef  = useRef(null);
  const headBarRef  = useRef(null);
  const prevRef     = useRef(0);
  const dirRef      = useRef(1);      // 1 = scrolling forward, -1 = backward
  const enteredRef  = useRef(false);  // true once the section is in viewport
  const runAnimRef  = useRef(null);   // stores the animate fn for onEnter to call

  /* hide heading bar before first paint so the entrance animation doesn't flash */
  useLayoutEffect(() => {
    if (headBarRef.current) gsap.set(headBarRef.current, { opacity: 0, y: -28 });
  }, []);

  /* ── pin + scroll-driven product switching ── */
  useEffect(() => {
    const n    = products.length;
    const step = Math.round(window.innerHeight * 0.85);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: panelRef.current,
        start: "top top",
        end: `+=${n * step}`,
        pin: true,
        pinSpacing: true,

        onEnter() {
          enteredRef.current = true;

          /* heading bar slides down from top */
          gsap.to(headBarRef.current, {
            opacity: 1, y: 0,
            duration: 0.65, ease: "power3.out",
          });

          /* play the first product's entrance animation */
          runAnimRef.current?.();
        },

        onUpdate(self) {
          if (progBarRef.current) {
            progBarRef.current.style.width = `${self.progress * 100}%`;
          }
          const newIdx = Math.min(Math.floor(self.progress * n), n - 1);
          if (newIdx !== prevRef.current) {
            dirRef.current = newIdx > prevRef.current ? 1 : -1;
            prevRef.current = newIdx;
            setActiveIdx(newIdx);
          }
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [products]);

  /* ── premium directional animation on product change ── */
  useEffect(() => {
    if (!contentRef.current || !imageRef.current) return;

    const sel = gsap.utils.selector(contentRef);

    const animate = () => {
      const dir = dirRef.current;

      /*
       * Content side:
       *   reversed=false → content is left column → enters from left  (x negative)
       *   reversed=true  → content is right column → enters from right (x positive)
       *   dir flips sign when scrolling backward
       */
      const xFrom = (reversed ? 52 : -52) * dir;

      /*
       * Image side — clip-path wipe from the outer edge:
       *   reversed=false (image on right): wipe right→left   inset(left 100%) → 0
       *   reversed=true  (image on left):  wipe left→right   inset(right 100%) → 0
       *   dir flips which edge the wipe starts from
       */
      const clipFrom =
        dir === 1
          ? reversed ? "inset(0 100% 0 0%)" : "inset(0 0% 0 100%)"
          : reversed ? "inset(0 0% 0 100%)" : "inset(0 100% 0 0%)";

      gsap.timeline()
        /* image: clip-path wipe + subtle zoom */
        .fromTo(
          imageRef.current,
          { clipPath: clipFrom, scale: 1.07 },
          { clipPath: "inset(0 0% 0 0%)", scale: 1, duration: 0.75, ease: "expo.inOut" }
        )
        /* content items: staggered slide-in from their column's side */
        .fromTo(
          sel(".anim-child"),
          { x: xFrom, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.52, stagger: 0.07, ease: "power3.out" },
          "<0.09"
        );
    };

    runAnimRef.current = animate;

    if (!enteredRef.current) {
      /* section not yet in viewport — set to final state silently */
      gsap.set(sel(".anim-child"), { x: 0, opacity: 1 });
      gsap.set(imageRef.current, { clipPath: "inset(0 0% 0 0%)", scale: 1 });
      return;
    }

    animate();
  }, [activeIdx, reversed]);

  return (
    <div ref={wrapRef}>
      <div
        ref={panelRef}
        className="h-screen flex flex-col overflow-hidden bg-white"
      >
        {/* ── heading bar ─────────────────────────────────────── */}
        <div
          ref={headBarRef}
          className={`flex-shrink-0 flex items-center justify-between px-10 xl:px-14 py-4 ${
            dark
              ? "bg-(--primary) border-b border-white/10"
              : "bg-white border-b border-(--primary)/8"
          }`}
        >
          <div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] border-l-[3px] border-(--secondary) pl-2.5 text-(--secondary)">
              {label}
            </span>
            <h2
              className={`font-black leading-tight mt-1 ${
                dark ? "text-white" : "text-(--primary)"
              }`}
              style={{ fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.02em" }}
            >
              {title} <span className="text-(--secondary)">{highlight}</span>
            </h2>
          </div>

          {/* counter + dot navigation */}
          <div className="flex items-center gap-4">
            <span
              className={`text-xs font-black tabular-nums ${
                dark ? "text-white/35" : "text-(--primary)/30"
              }`}
            >
              {String(activeIdx + 1).padStart(2, "0")}&nbsp;/&nbsp;
              {String(products.length).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-1.5">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  aria-label={products[i].name}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIdx
                      ? "w-6 h-2 bg-(--secondary)"
                      : dark
                      ? "w-2 h-2 bg-white/20 hover:bg-white/45"
                      : "w-2 h-2 bg-(--primary)/15 hover:bg-(--primary)/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── scroll progress strip ── */}
        <div className={`flex-shrink-0 h-[3px] ${dark ? "bg-white/8" : "bg-(--primary)/6"}`}>
          <div
            ref={progBarRef}
            className="h-full bg-(--secondary)"
            style={{ width: "0%", transition: "width 80ms linear", willChange: "width" }}
          />
        </div>

        {/* ── two-column layout ── */}
        <div className="flex-1 grid grid-cols-2 min-h-0 overflow-hidden">

          {/* content column */}
          <div
            ref={contentRef}
            className={`flex flex-col justify-center px-10 xl:px-14 overflow-hidden bg-white ${
              reversed ? "order-2" : "order-1"
            }`}
          >
            <span className="section-label anim-child">{active.category}</span>

            <div className="flex items-start gap-4 mt-4 mb-5 anim-child">
              <span
                className="shrink-0 font-black tabular-nums leading-none mt-1 text-(--primary)/[0.07]"
                style={{ fontSize: "clamp(48px, 5.5vw, 80px)" }}
              >
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <h2 className="section-heading">{active.name}</h2>
            </div>

            <p
              className="text-(--accent)/68 leading-[1.76] mb-7 max-w-[420px] anim-child"
              style={{ fontSize: "14.5px" }}
            >
              {active.description}
            </p>

            <ul className="space-y-2.5 anim-child">
              {active.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-(--secondary)/10 flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-(--secondary) text-[9px]" />
                  </span>
                  <span className="text-sm text-(--accent)/75 font-medium">{f}</span>
                </li>
              ))}
            </ul>

            {/* inline mini-progress + scroll hint */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-(--primary)/8 anim-child">
              <span className="text-xs font-black tabular-nums text-(--primary)/50">
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 max-w-[90px] h-px bg-(--primary)/10">
                <div
                  className="h-full bg-(--secondary) transition-all duration-300"
                  style={{ width: `${((activeIdx + 1) / products.length) * 100}%` }}
                />
              </div>
              <span className="text-xs tabular-nums text-(--accent)/30">
                {String(products.length).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-(--accent)/25 ml-2">
                scroll ↓
              </span>
            </div>
          </div>

          {/* image column */}
          <div
            ref={imageRef}
            className={`relative overflow-hidden bg-[#f4f7fb] ${
              reversed ? "order-1" : "order-2"
            }`}
          >
            <ZigZag images={active.images} key={active.id} />
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Mobile: all products stacked with scroll-reveal ────────── */
function MobileProductRow({ product, index, reversed, dark }) {
  const rowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: rowRef.current, start: "top 88%" },
        }
      );
    }, rowRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`border-b px-5 py-10 ${dark ? "border-white/8" : "border-(--primary)/8"
        }`}
    >
      <span className="section-label">{product.category}</span>

      <div className="flex items-start gap-3 mt-3 mb-4">
        <span
          className="shrink-0 font-black tabular-nums leading-none mt-1 text-(--primary)/[0.07]"
          style={{ fontSize: "38px" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className={`section-heading ${dark ? "!text-white" : ""}`}
        >
          {product.name}
        </h3>
      </div>

      {/* image */}
      <div className="w-full aspect-[4/3] overflow-hidden shadow-xl mb-5">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <p
        className={`leading-relaxed mb-5 text-[14px] ${dark ? "text-white/60" : "text-(--accent)/68"
          }`}
      >
        {product.description}
      </p>

      <ul className="space-y-2">
        {product.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <FiCheckCircle className="text-(--secondary) text-sm shrink-0" />
            <span
              className={`text-sm font-medium ${dark ? "text-white/70" : "text-(--accent)/75"
                }`}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileSection({ label, title, highlight, products, reversed, dark }) {
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={dark ? "bg-(--primary)" : "bg-white"}>
      <div
        ref={headRef}
        className={`px-5 pt-14 pb-10 border-b ${dark ? "border-white/10" : "border-(--primary)/8"
          }`}
      >
        <span className="section-label">{label}</span>
        <h2
          className={`section-heading mt-2 ${dark ? "!text-white" : ""}`}
        >
          {title}{" "}
          <span className="text-(--secondary)">{highlight}</span>
        </h2>
      </div>

      {products.map((product, i) => (
        <MobileProductRow
          key={product.id}
          product={product}
          index={i}
          reversed={reversed}
          dark={dark}
        />
      ))}
    </div>
  );
}

/* ─── ProductSection: renders mobile + desktop variants ──────── */
function ProductSection(props) {
  return (
    <>
      {/* mobile: stacked scroll-reveal */}
      <div className="lg:hidden">
        <MobileSection {...props} />
      </div>

      {/* desktop: full-screen pinned panel */}
      <div className="hidden lg:block mt-16">
        <DesktopSection {...props} />
      </div>
    </>
  );
}

/* ─── main export ─────────────────────────────────────────────── */
export default function ProductsShowcase() {
  return (
    <>
      <ProductSection
        label="Division 01 — Poly Packaging"
        title="Poly Packaging"
        highlight="Products"
        products={PACKAGING}
        reversed={false}
        dark={false}
      />

      <ProductSection
        label="Division 02 — Garment Trim"
        title="Elastic &"
        highlight="Trim Products"
        products={ELASTIC}
        reversed={true}
        dark={true}
      />
    </>
  );
}
