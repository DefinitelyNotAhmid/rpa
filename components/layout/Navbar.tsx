"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { NavDropdown } from "./NavDropdown";
import { aboutItems, academicsItems } from "@/lib/data/nav";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-deep-navy text-cream/80 text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-6 flex justify-end gap-6">
          <Link href="/student-login" className="hover:text-white transition-colors">
            Student Login
          </Link>
          <span className="opacity-30" aria-hidden="true">|</span>
          <a href="https://registration.parchment.com/member/3fa0e142-0d1e-11ed-972a-5bcf5a36950b" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Transcript Request
          </a>
        </div>

      </div>

      {/* Main nav bar */}
      <nav className="bg-navy shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Rise Preparatory Academy home">
            <Image
              src="/slazzer-preview-u8tbq.png"
              alt="Rise Preparatory Academy"
              width={160}
              height={48}
              className="object-contain"
              style={{ width: 160, height: "auto", filter: "brightness(0) invert(1)" }}
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-cream text-sm font-medium">
            <NavDropdown label="About" items={aboutItems} />
            <NavDropdown label="Academics" items={academicsItems} />
            <Link href="/admissions" className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded py-1">
              Admissions
            </Link>
            <Link href="/contact" className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded py-1">
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <ButtonPrimary href="/admissions/apply">Apply Now</ButtonPrimary>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden text-cream p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-navy border-t border-white/10 px-6 pb-6 pt-4 flex flex-col gap-4">
            <p className="text-cream/90 text-[0.65rem] uppercase tracking-widest font-semibold">About</p>
            {aboutItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
                className="text-cream/80 hover:text-gold transition-colors text-sm pl-2">
                {item.label}
              </Link>
            ))}
            <p className="text-cream/90 text-[0.65rem] uppercase tracking-widest font-semibold mt-2">Academics</p>
            {academicsItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
                className="text-cream/80 hover:text-gold transition-colors text-sm pl-2">
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
              <Link href="/admissions" onClick={() => setMenuOpen(false)} className="text-cream/80 hover:text-gold transition-colors text-sm">Admissions</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-cream/80 hover:text-gold transition-colors text-sm">Contact</Link>
              <div className="mt-2">
                <ButtonPrimary href="/admissions/apply">Apply Now</ButtonPrimary>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
