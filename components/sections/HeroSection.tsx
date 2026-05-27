import Image from "next/image";
import Link from "next/link";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";

const credibilityItems = [
  "Cognia Accredited",
  "97% College Acceptance",
  "Est. 2018",
];

export function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[580px] flex flex-col justify-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/graduation.png"
        alt="Rise Preparatory Academy Class of 2026 Graduation Ceremony"
        fill
        className="object-cover animate-soft-zoom"
        priority
      />

      {/* Directional overlay — dark left, fades right */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 via-deep-navy/50 to-deep-navy/20" />
      {/* Bottom fade for credibility strip */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-deep-navy/70 to-transparent" />

      {/* Main content — left-aligned on desktop, centered on mobile */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl text-center md:text-left">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 justify-center md:justify-start mb-5 animate-fade-up">
            <span className="text-gold text-[0.45rem]">◆</span>
            <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold/90">
              Cutler Bay, Florida
            </span>
            <span className="text-gold text-[0.45rem]">◆</span>
          </div>

          {/* Title */}
          <h1
            className="font-serif font-bold text-white leading-[1.05] mb-5 animate-fade-up delay-100"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
          >
            Rise Preparatory
            <br />
            <span className="text-gold">Academy</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-cream/80 text-lg md:text-xl mb-8 max-w-lg animate-fade-up delay-200">
            A college-preparatory academy built for driven students in grades 5–12.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start animate-fade-up delay-300">
            <ButtonPrimary href="/admissions/apply">Apply Now</ButtonPrimary>
            <Link
              href="/admissions"
              className="font-sans text-sm font-semibold text-cream/80 hover:text-gold transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              Schedule a Tour
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M1 6.5h11M7 1.5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

        </div>
      </div>

      {/* Credibility strip — pinned to bottom */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="w-full backdrop-blur-sm bg-navy/40 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-1">
            {credibilityItems.map((item, i) => (
              <div key={item} className="flex items-center gap-2">
                {i > 0 && <span className="text-gold/40 text-[0.5rem]">◆</span>}
                <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-widest text-cream/70">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
