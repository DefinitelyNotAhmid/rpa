"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const graduates = [
  {
    src: "/grad1.jpg",
    alt: "Melvin Hayward — Rise Prep Graduate",
    badge: "AA Degree · Miami Dade College",
    name: "Melvin Hayward",
    detail: "Flanagan High School",
  },
  {
    src: "/grad2.jpg",
    alt: "Trace Poncev — Rise Prep Graduate",
    badge: "AA Degree · Miami Dade College",
    name: "Trace Poncev",
    detail: "West Broward High School",
  },
  {
    src: "/grad3.jpg",
    alt: "Zakeiria Cobb — Rise Prep Graduate",
    badge: "AA Degree · Miami Dade College",
    name: "Zakeiria Cobb",
    detail: "Miami Palmetto Senior High",
  },
  {
    src: "/grad4.jpg",
    alt: "Eric Nelson — Rise Prep Graduate",
    badge: "AA Degree · Miami Dade College",
    name: "Eric Nelson",
    detail: "Viera High School",
  },
  {
    src: "/grad5.jpg",
    alt: "Carlos Gutierrez — Rise Prep Graduate",
    badge: "AA Degree · Miami Dade College",
    name: "Carlos Gutierrez",
    detail: "Miami Southridge Senior High",
  },
];

function GradPhoto({
  grad,
  className,
}: {
  grad: (typeof graduates)[0];
  className: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl group cursor-default ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={grad.src}
        alt={grad.alt}
        fill
        className={`object-cover object-top transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`}
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Base overlay — only at very bottom for caption legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/10 to-transparent" />

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-navy/50 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
      />

      {/* Caption — always visible at bottom */}
      <div className="absolute bottom-0 inset-x-0 px-4 py-3">
        <p className="font-serif text-white text-sm font-semibold leading-tight">{grad.name}</p>
        <p className="font-sans text-[0.6rem] uppercase tracking-widest text-cream/60 mt-0.5">{grad.detail}</p>
      </div>
    </div>
  );
}

export function GraduatesPanel() {
  return (
    <section className="relative bg-deep-navy py-20 px-4 overflow-hidden">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/60" />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-gold/80 font-sans">
              Commencement · 2026
            </span>
            <div className="h-px w-12 bg-gold/60" />
          </div>
          <h2 className="font-serif text-gold text-4xl md:text-6xl font-bold leading-none mb-3">
            Class of 2026
          </h2>
          <p className="font-sans text-cream/50 text-xs uppercase tracking-[0.2em]">
            Rise Preparatory Academy · Cutler Bay, Florida
          </p>
        </div>

        {/* Staggered photo grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">

          {/* Row 1: three photos, varying heights */}
          <GradPhoto grad={graduates[0]} className="h-80 md:h-[420px]" />
          <GradPhoto grad={graduates[1]} className="h-80 md:h-[380px] md:mt-8" />
          <GradPhoto grad={graduates[2]} className="h-80 md:h-[340px] md:mt-16" />

          {/* Row 2: one wide + one tall */}
          <div className="md:col-span-2 h-64 md:h-[300px]">
            <GradPhoto grad={graduates[3]} className="h-full w-full" />
          </div>
          <GradPhoto grad={graduates[4]} className="h-64 md:h-[300px] md:-mt-8" />

        </div>

        {/* Pull quote */}
        <div className="mt-14 text-center max-w-2xl mx-auto">
          <div className="w-8 h-px bg-gold/40 mx-auto mb-6" />
          <blockquote className="font-serif italic text-cream text-xl md:text-2xl leading-relaxed">
            "12 students earned their Associate of Arts degree{" "}
            <span className="text-gold">before receiving their high school diploma.</span>"
          </blockquote>
          <p className="font-sans text-cream/40 text-xs uppercase tracking-widest mt-4">
            Rise Prep · Academic &amp; Athletic Excellence · Est. 2010
          </p>
          <div className="w-8 h-px bg-gold/40 mx-auto mt-6" />
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/news/class-of-2026-graduation"
            className="inline-flex items-center gap-2 text-sm font-semibold font-sans text-gold border border-gold/40 rounded-full px-8 py-3 hover:bg-gold hover:text-deep-navy transition-all duration-300"
          >
            See Their Full Story
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
