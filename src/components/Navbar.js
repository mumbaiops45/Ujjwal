"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Infrastructure", href: "/infrastructure" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <header className="w-full border-b border-[var(--accent)]/10 bg-white sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">

            <span className="text-2xl font-black tracking-wide text-[var(--primary)] uppercase">
              Ujjwal
            </span>

            <span className="text-[11px] font-semibold tracking-[0.28em] text-[var(--secondary)] uppercase mt-1">
              Poly Pack
            </span>

          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">

            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-semibold uppercase tracking-wide transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-300
                  
                  ${
                    isActive
                      ? "text-[var(--secondary)] after:w-full after:bg-[var(--secondary)]"
                      : "text-[var(--accent)] hover:text-[var(--primary)] after:w-0 after:bg-[var(--primary)] hover:after:w-full"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

          </nav>

          {/* CTA */}
          <div className="hidden lg:flex">

            <Link
              href="/contact"
              className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white bg-[var(--primary)] hover:bg-[var(--secondary)] transition-all duration-300"
            >
              Get Quote
            </Link>

          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-3xl text-[var(--primary)]"
          >
            {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >

        <div className="px-4 pb-6 pt-2 border-t border-[var(--accent)]/10 bg-white flex flex-col">

          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-4 border-b border-[var(--accent)]/10 text-sm font-semibold uppercase tracking-wide transition-all duration-300
                  
                  ${
                    isActive
                      ? "text-[var(--secondary)]"
                      : "text-[var(--accent)] hover:text-[var(--primary)]"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="mt-5 w-full text-center px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white bg-[var(--primary)] hover:bg-[var(--secondary)] transition-all duration-300"
          >
            Get Quote
          </Link>

        </div>
      </div>
    </header>
  );
}