"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const defaultStats = [
  { num: "Est.", accent: "1989", label: "Founded" },
  { num: "35+", accent: "", label: "Years Experience" },
  { num: "100+", accent: "", label: "Team Members" },
  { num: "Pan India", accent: "", label: "Supply Network" },
];

export default function PageHero({
  label = "Ujjwal Poly Pack India Pvt. Ltd.",
  title = "About",
  highlight = "Us",
  image = "/about/about-hero.jpg",
  stats = defaultStats,
}) {
  const router = useRouter();

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const breadcrumbRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Parallax */
      gsap.to(imageRef.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Entrance Animation */
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        breadcrumbRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          contentRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
          "-=0.4"
        );

      if (statsRef.current?.children.length) {
        tl.fromTo(
          Array.from(statsRef.current.children),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex flex-col justify-between"
   
    >



      {/* Overlays */}
      <div className="absolute inset-0 bg-[var(--primary)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />



      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10"
        style={{
          background:
            "radial-gradient(circle at center, var(--secondary) 0%, transparent 70%)",
        }}
      />

      {/* Breadcrumb */}
      <div className="relative z-20 pt-6 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">

          <button
            ref={breadcrumbRef}
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/60 hover:text-[var(--secondary)] transition-all duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>

            Home / {title}
          </button>

        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center text-center px-6 pb-18">

        <div ref={contentRef}>

          {/* <p className="text-[var(--secondary)] uppercase tracking-[0.35em] text-xs sm:text-sm font-bold mb-6">
            {label}
          </p> */}

          <h1
            className="font-black text-white flex items-center justify-center gap-4 flex-wrap"
         
          >
            <span>{title}</span>

            {highlight && (
              <span className="text-[var(--secondary)]">
                {highlight}
              </span>
            )}
          </h1>

        </div>

      </div>
    

    </section>
  );
}