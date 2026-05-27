"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { universities, type UniversityCategory } from "@/lib/data/universities";
import { UniversityMap } from "./UniversityMap";
import { CountUp } from "@/components/ui/CountUp";

type Filter = "all" | UniversityCategory;
type View = "grid" | "map";

const INITIAL_VISIBLE = 8;

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Florida", value: "florida" },
  { label: "Out-of-State", value: "out-of-state" },
];

const tabCls = (active: boolean) =>
  `text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
    active
      ? "bg-navy text-white border-navy"
      : "bg-transparent text-navy/80 border-navy/30 hover:border-navy/60 hover:text-navy"
  }`;

type University = typeof universities[0];

function UniversityModal({ university, onClose }: { university: University; onClose: () => void }) {
  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-deep-navy/80 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative bg-white rounded-2xl px-10 py-12 flex flex-col items-center gap-5 shadow-2xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-navy text-base leading-none transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
        {/* Contained logo — not stretched */}
        <div className="relative w-full h-24 flex items-center justify-center">
          <Image
            src={university.logo}
            alt={university.name}
            fill
            className="object-contain"
            sizes="320px"
          />
        </div>
        <div className="w-8 h-px bg-gold/40" />
        <p className="font-serif text-navy text-lg text-center leading-snug">{university.name}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {university.categories.includes("florida") && (
            <span className="font-sans text-[0.6rem] font-bold uppercase tracking-widest text-navy/60">Florida</span>
          )}
          {university.categories.includes("out-of-state") && (
            <span className="font-sans text-[0.6rem] font-bold uppercase tracking-widest text-navy/60">Out-of-State</span>
          )}
        </div>
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(university.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs font-semibold text-navy/50 hover:text-navy transition-colors mt-1 inline-flex items-center gap-1"
        >
          Visit Website
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3.5 3H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V8.5M7 1h4m0 0v4m0-4L5 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </a>
      </div>
    </div>,
    document.body
  );
}

export function UniversityGrid() {
  const [view, setView] = useState<View>("grid");
  const [active, setActive] = useState<Filter>("all");
  const [fading, setFading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<University | null>(null);

  const filtered =
    active === "all"
      ? universities
      : universities.filter((u) => u.categories.includes(active));

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  function handleFilter(value: Filter) {
    if (value === active) return;
    setFading(true);
    setShowAll(false);
    setTimeout(() => {
      setActive(value);
      setFading(false);
    }, 150);
  }

  return (
    <>
    <section className="bg-cream py-14 px-4">

      {/* Header + stat strip */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020] mb-2">
          Graduate Outcomes
        </p>
        <h2 className="text-navy text-2xl md:text-3xl mb-6">
          Where Our Graduates Excel
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {[
            { target: 12, suffix: ":1", label: "Student-Teacher Ratio" },
            { target: 100, suffix: "%", label: "College Acceptance Rate" },
            { target: 30, suffix: "+", label: "Colleges & Universities" },
            { target: 15, suffix: "",  label: "States Represented" },
          ].map(({ target, suffix, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-serif text-navy text-3xl font-bold leading-none">
                <CountUp target={target} suffix={suffix} />
              </span>
              <span className="text-gray-600 text-xs mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* View toggle */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button onClick={() => setView("grid")} className={tabCls(view === "grid")}>
          Grid View
        </button>
        <button onClick={() => setView("map")} className={tabCls(view === "map")}>
          Map View
        </button>
      </div>

      {/* Map view */}
      {view === "map" && <UniversityMap />}

      {/* Grid view */}
      {view === "grid" && (
        <>
          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {filters.map((f) => (
              <button key={f.value} onClick={() => handleFilter(f.value)} className={tabCls(active === f.value)}>
                {f.label}
                <span className="ml-1.5 font-normal">
                  ({f.value === "all"
                    ? universities.length
                    : universities.filter((u) => u.categories.includes(f.value as UniversityCategory)).length})
                </span>
              </button>
            ))}
          </div>

          {/* Result count */}
          {!fading && filtered.length > 0 && (
            <p className="text-center text-xs text-gray-600 mb-8">
              Showing {visible.length} of {filtered.length} institutions
            </p>
          )}

          {/* Empty state */}
          {!fading && filtered.length === 0 && (
            <div className="max-w-5xl mx-auto flex flex-col items-center justify-center py-16 gap-4 text-center">
              <p className="text-navy/60 text-base font-medium">No institutions found for this filter.</p>
              <button
                onClick={() => handleFilter("all")}
                className="text-sm font-semibold text-navy border border-navy/30 rounded-full px-6 py-2 hover:bg-navy hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                Show All
              </button>
            </div>
          )}

          {/* Skeleton loader during transition */}
          {fading && (
            <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: INITIAL_VISIBLE }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-3 shadow-sm animate-pulse">
                  <div className="w-full h-14 bg-gray-200 rounded" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          )}

          {/* Grid */}
          <div
            className={`max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-opacity duration-150 ${
              fading ? "hidden" : "opacity-100"
            }`}
          >
            {visible.map((u) => (
              <button
                key={u.name}
                onClick={() => setSelected(u)}
                className="group bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-3 shadow-sm hover:shadow-md hover:border-navy/20 transition-all duration-200 text-left w-full cursor-pointer"
                aria-label={`View ${u.name}`}
              >
                <div className="relative w-full h-14">
                  <Image
                    src={u.logo}
                    alt={u.name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
                <span className="font-sans text-[0.6rem] font-semibold text-navy/80 uppercase tracking-wide text-center leading-tight">
                  {u.name}
                </span>
              </button>
            ))}
          </div>

          {/* Show more / less */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="text-sm font-semibold text-navy border border-navy/30 rounded-full px-7 py-2.5 hover:bg-navy hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                {showAll
                  ? "Show Less ↑"
                  : `Show All ${filtered.length} Institutions ↓`}
              </button>
            </div>
          )}
        </>
      )}

    </section>

      {selected && <UniversityModal university={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
