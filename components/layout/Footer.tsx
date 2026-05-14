import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const socials = [
  {
    icon: <Facebook size={18} aria-hidden="true" />,
    href: "https://facebook.com/riseprep",
    label: "Facebook",
  },
  {
    icon: <Instagram size={18} aria-hidden="true" />,
    href: "https://instagram.com/riseprep",
    label: "Instagram",
  },
  {
    icon: <Linkedin size={18} aria-hidden="true" />,
    href: "https://linkedin.com/school/riseprep",
    label: "LinkedIn",
  },
];

export function Footer() {
  return (
    <footer className="bg-deep-navy text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="md:col-span-1">
          <Image
            src="/slazzer-preview-u8tbq.png"
            alt="Rise Preparatory Academy"
            width={160}
            height={48}
            className="object-contain"
            style={{ width: 160, height: "auto", filter: "brightness(0) invert(1)" }}
          />
          <p className="mt-3 text-cream/80 text-sm font-light leading-relaxed max-w-[200px]">
            Empowering students through accelerated academic excellence.
          </p>
          <div className="flex gap-4 mt-5">
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-cream/75 hover:text-white hover:scale-110 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-gold text-xs font-semibold uppercase mb-4" style={{ letterSpacing: "var(--tracking-widest2)" }}>
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm text-cream/85">
            <li>
              <Link href="/admissions" className="hover:text-cream transition-colors">
                Admissions
              </Link>
            </li>
            <li>
              <Link href="/academics" className="hover:text-cream transition-colors">
                Academics
              </Link>
            </li>
            <li>
              <Link href="/tuition" className="hover:text-cream transition-colors">
                Tuition
              </Link>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h2 className="text-gold text-xs font-semibold uppercase mb-4" style={{ letterSpacing: "var(--tracking-widest2)" }}>
            Community
          </h2>
          <ul className="space-y-2 text-sm text-cream/85">
            <li>
              <Link href="/student-login" className="hover:text-cream transition-colors">
                Student Login
              </Link>
            </li>
            <li>
              <a href="https://registration.parchment.com/member/3fa0e142-0d1e-11ed-972a-5bcf5a36950b" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">
                Transcript Request
              </a>
            </li>
            <li>
              <Link href="/calendar" className="hover:text-cream transition-colors">
                Calendar
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-gold text-xs font-semibold uppercase mb-4" style={{ letterSpacing: "var(--tracking-widest2)" }}>
            Contact
          </h2>
          <address className="not-italic text-sm text-cream/85 space-y-2">
            <p>
              18900 SW 106 Ave, Suite 205
              <br />
              Cutler Bay, FL 33157
            </p>
            <p>
              <a href="tel:+13057609494" className="hover:text-cream transition-colors">
                (305) 760-9494
              </a>
            </p>
            <p>
              <a
                href="mailto:Sperry@risepreparatory.org"
                className="hover:text-cream transition-colors"
              >
                Sperry@risepreparatory.org
              </a>
            </p>
          </address>
        </div>

      </div>

      {/* Sub-footer */}
      <div className="bg-[#020235] border-t border-white/5 py-3 px-6 text-center">
        <p className="text-[0.7rem] text-cream/70 tracking-wide">
          © {new Date().getFullYear()} Rise Preparatory Academy
        </p>
        <Link
          href="/policies"
          className="text-cream/75 hover:text-cream transition-colors text-xs mt-1 inline-block"
        >
          Non-Discriminatory Policy
        </Link>
      </div>
    </footer>
  );
}
