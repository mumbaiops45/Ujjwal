import Link from "next/link";
import {
  FiMapPin,
  FiMail,
  FiGlobe,
  FiPhone,
} from "react-icons/fi";

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Infrastructure", href: "/infrastructure" },
  { name: "Contact Us", href: "/contact" },
];

const productLinks = [
  "PP Polybags",
  "LDPE Bags",
  "HDPE Packaging",
  "Printed Bags",
  "Jacquard Elastic",
  "Smocking Thread",
];

export default function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-white">

      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1 */}
          <div>

            <div className="flex flex-col leading-none mb-5">

              <span className="text-3xl font-black tracking-wide uppercase">
                Ujjwal
              </span>

              <span className="text-xs font-semibold tracking-[0.3em] text-[var(--secondary)] uppercase mt-2">
                Poly Pack
              </span>

            </div>

            <p className="text-white/70 leading-relaxed text-sm">
              Engineering flexible packaging and garment trim solutions
              with reliability, precision and manufacturing excellence
              since 1989.
            </p>

          </div>

          {/* Column 2 */}
          <div>

            <h3 className="text-lg font-bold uppercase tracking-wide mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              {menuLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-[var(--secondary)] transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}

            </div>

          </div>

          {/* Column 3 */}
          <div>

            <h3 className="text-lg font-bold uppercase tracking-wide mb-6">
              Products
            </h3>

            <div className="flex flex-col gap-4">

              {productLinks.map((product) => (
                <p
                  key={product}
                  className="text-sm text-white/70"
                >
                  {product}
                </p>
              ))}

            </div>

          </div>

          {/* Column 4 */}
          <div>

            <h3 className="text-lg font-bold uppercase tracking-wide mb-6">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-3">

                <FiMapPin className="text-[var(--secondary)] text-lg mt-1 shrink-0" />

                <div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Bengaluru, Karnataka
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <FiGlobe className="text-[var(--secondary)] text-lg mt-1 shrink-0" />

                <div>
                  <a
                    href="https://www.ujjwals.com"
                    target="_blank"
                    className="text-sm text-white/70 hover:text-[var(--secondary)] transition-all duration-300"
                  >
                    www.ujjwals.com
                  </a>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <FiMail className="text-[var(--secondary)] text-lg mt-1 shrink-0" />

                <div>
                  <a
                    href="mailto:info@ujjwals.com"
                    className="text-sm text-white/70 hover:text-[var(--secondary)] transition-all duration-300"
                  >
                    info@ujjwals.com
                  </a>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <FiPhone className="text-[var(--secondary)] text-lg mt-1 shrink-0" />

                <div>
                  <p className="text-sm text-white/70">
                    Ujjwal Poly Pack India Pvt. Ltd.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-white/60 text-center md:text-left">
            © 2026 Ujjwal Poly Pack India Pvt. Ltd. All rights reserved.
          </p>

          <p className="text-sm text-white/60 text-center md:text-right">
            Developed by{" "}
            <span className="text-[var(--secondary)] font-semibold">
              Nakshatra Namah Creation
            </span>
          </p>

        </div>

      </div>

    </footer>
  );
}