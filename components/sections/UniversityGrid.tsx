"use client";

import Image from "next/image";
import { useState } from "react";
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

export function UniversityGrid() {
  const [view, setView] = useState<View>("grid");
  const [active, setActive] = useState<Filter>("all");
  const [fading, setFading] = useState(false);
  const [showAll, setShowAll] = useState(false);

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
            { target: 30, suffix: "+", label: "Colleges & Universities" },
            { target: 15, suffix: "",  label: "States Represented" },
            { target: 100, suffix: "%", label: "Graduation Rate" },
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
          ⊞ Grid View
        </button>
        <button onClick={() => setView("map")} className={tabCls(view === "map")}>
          🗺 Map View
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
                <span className="ml-1.5 font-normal opacity-70">
                  ({f.value === "all"
                    ? universities.length
                    : universities.filter((u) => u.categories.includes(f.value as UniversityCategory)).length})
                </span>
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-center text-xs text-gray-500 mb-8">
            Showing {visible.length} of {filtered.length} institutions
          </p>

          {/* Grid */}
          <div
            className={`max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-opacity duration-150 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {visible.map((u) => (
              <div
                key={u.name}
                className="group bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-3 shadow-sm hover:shadow-md hover:border-navy/20 transition-all duration-200"
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
                <span className="text-[0.6rem] font-semibold text-navy/80 uppercase tracking-wide text-center leading-tight">
                  {u.name}
                </span>
                <div className="flex flex-wrap gap-1 justify-center">
                  {u.categories.includes("florida") && (
                    <span className="text-[0.55rem] font-bold uppercase tracking-wide bg-navy/10 text-navy px-1.5 py-0.5 rounded-full">FL</span>
                  )}
                  {u.categories.includes("out-of-state") && (
                    <span className="text-[0.55rem] font-bold uppercase tracking-wide bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">Out-of-State</span>
                  )}
                </div>
              </div>
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
  );
}
