"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journey = [
  {
    year: "1989",
    title: "Company Founded",
  },
  {
    year: "2000",
    title: "Expanded Production",
  },
  {
    year: "2010",
    title: "Garment Trim Division",
  },
  {
    year: "2020",
    title: "Pan India Supply",
  },
];

export default function AboutJourney() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".journeyCard",
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[var(--primary)] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="text-center mb-16">
          <p className="text-[var(--secondary)] uppercase tracking-[0.25em] text-xs font-bold mb-5">
            Company Journey
          </p>

          <h2 className="text-4xl lg:text-5xl font-black">
            35+ Years of Manufacturing
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {journey.map((item, i) => (
            <div
              key={i}
              className="journeyCard border border-white/10 p-8 bg-white/5 backdrop-blur-sm"
            >
              <p className="text-[var(--secondary)] text-5xl font-black mb-5">
                {item.year}
              </p>

              <h3 className="text-xl font-bold">
                {item.title}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}