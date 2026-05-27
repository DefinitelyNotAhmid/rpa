"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const graduates = [
  {
    src: "/grad1.jpg",
    alt: "Melvin Hayward — Rise Prep Graduate",
    name: "Melvin Hayward",
    detail: "Flanagan High School",
  },
  {
    src: "/grad2.jpg",
    alt: "Trace Poncev — Rise Prep Graduate",
    name: "Trace Poncev",
    detail: "West Broward High School",
  },
  {
    src: "/grad3.jpg",
    alt: "Zakeiria Cobb — Rise Prep Graduate",
    name: "Zakeiria Cobb",
    detail: "Miami Palmetto Senior High",
  },
  {
    src: "/grad4.jpg",
    alt: "Eric Nelson — Rise Prep Graduate",
    name: "Eric Nelson",
    detail: "Viera High School",
  },
  {
    src: "/grad5.jpg",
    alt: "Carlos Gutierrez — Rise Prep Graduate",
    name: "Carlos Gutierrez",
    detail: "Miami Southridge Senior High",
  },
];

function GradPhoto({
  grad,
  className,
  hero = false,
}: {
  grad: (typeof graduates)[0];
  className: string;
  hero?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl cursor-default ${hero ? "border-l-2 border-gold" : ""} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cinematic navy tint — mix-blend lifts on hover */}
      <div
        className={`absolute inset-0 z-10 bg-navy transition-opacity duration-500 pointer-events-none ${hovered ? "opacity-0" : "opacity-30"}`}
        style={{ mixBlendMode: "multiply" }}
      />

      <Image
        src={grad.src}
        alt={grad.alt}
        fill
        className={`object-cover object-top transition-transform duration-700 ${hovered ? "scale-[1.07]" : "scale-100"}`}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Permanent bottom gradient for name legibility */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-deep-navy/85 via-transparent to-transparent pointer-events-none" />

      {/* Slide-up name card on hover */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 px-5 transition-all duration-400 ${hovered ? "pb-5 opacity-100" : "pb-3 opacity-80"}`}
      >
        <p className={`font-serif text-white font-semibold leading-tight transition-all duration-400 ${hovered ? "text-lg" : "text-sm"}`}>
          {grad.name}
        </p>
        <p
          className={`font-sans uppercase tracking-widest text-gold/80 transition-all duration-400 ${hovered ? "text-[0.65rem] mt-1 opacity-100 translate-y-0" : "text-[0.55rem] mt-0.5 opacity-60"}`}
        >
          {grad.detail}
        </p>
        {hovered && (
          <p className="font-sans text-[0.55rem] uppercase tracking-widest text-cream/40 mt-0.5">
            AA Degree · Miami Dade College
          </p>
        )}
      </div>
    </div>
  );
}

const stats = [
  { value: "12", label: "AA Degrees Earned" },
  { value: "100%", label: "College Acceptance" },
  { value: "920", label: "College Credits · '26" },
];

export function GraduatesPanel() {
  return (
    <section className="relative bg-deep-navy py-20 px-4 overflow-hidden">
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="text-gold text-[0.5rem]">◆</span>
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold/80 font-sans">
            Commencement 2026
          </span>
          <span className="text-gold text-[0.5rem]">◆</span>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="font-serif text-gold text-4xl md:text-6xl font-bold leading-none mb-3">
            Class of 2026
          </h2>
          <p className="font-sans text-cream/40 text-xs uppercase tracking-[0.2em]">
            Rise Preparatory Academy · Cutler Bay, Florida
          </p>
        </div>

        {/* Stat bar */}
        <div className="flex items-center justify-center gap-0 mb-12 border border-gold/20 rounded-2xl overflow-hidden divide-x divide-gold/20 max-w-xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="flex-1 py-4 px-2 text-center">
              <p className="font-serif text-gold text-2xl md:text-3xl font-bold leading-none">{s.value}</p>
              <p className="font-sans text-cream/40 text-[0.6rem] uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Editorial split layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Left: hero photo — tall */}
          <GradPhoto grad={graduates[0]} className="h-80 md:h-full min-h-[500px]" hero />

          {/* Right: 2×2 mosaic */}
          <div className="grid grid-cols-2 gap-3">
            <GradPhoto grad={graduates[1]} className="h-48 md:h-[240px]" />
            <GradPhoto grad={graduates[2]} className="h-48 md:h-[240px]" />
            <GradPhoto grad={graduates[3]} className="h-48 md:h-[240px]" />
            <GradPhoto grad={graduates[4]} className="h-48 md:h-[240px]" />
          </div>

        </div>

        {/* Pull quote */}
        <div className="mt-14 text-center max-w-2xl mx-auto">
          <div className="w-8 h-px bg-gold/40 mx-auto mb-6" />
          <blockquote className="font-serif italic text-cream text-xl md:text-2xl leading-relaxed">
            "12 students earned their Associate of Arts degree{" "}
            <span className="text-gold">before receiving their high school diploma.</span>"
          </blockquote>
          <p className="font-sans text-cream/30 text-xs uppercase tracking-widest mt-4">
            Rise Prep · Academic &amp; Athletic Excellence · Est. 2018
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
