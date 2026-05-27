"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FiShield,
  FiAward,
  FiUsers,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: <FiShield />,
    title: "Quality First",
  },
  {
    icon: <FiAward />,
    title: "Manufacturing Excellence",
  },
  {
    icon: <FiUsers />,
    title: "Long-Term Relationships",
  },
];

export default function AboutValues() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".valueCard",
      {
        y: 50,
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
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="text-center mb-16">
          <span className="section-label">
            Core Values
          </span>

          <h2 className="section-heading">
            What Drives Our Manufacturing
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {values.map((v, i) => (
            <div
              key={i}
              className="valueCard border border-[var(--primary)]/10 p-10 hover:border-[var(--secondary)]/30 transition-all duration-300"
            >
              <div className="text-[var(--secondary)] text-3xl mb-6">
                {v.icon}
              </div>

              <h3 className="text-2xl font-bold text-[var(--primary)]">
                {v.title}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}