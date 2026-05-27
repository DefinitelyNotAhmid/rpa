"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { newsItems, type NewsCategory } from "@/lib/data/news";

const CATEGORY_STYLES: Record<NewsCategory, string> = {
  Announcement: "bg-navy/10 text-navy",
  Event:        "bg-gold/20 text-[#7a6020]",
  Achievement:  "bg-green-100 text-green-700",
  Academic:     "bg-purple-100 text-purple-700",
};

export function NewsEventsSection() {
  const items = newsItems;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => setActive((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setActive((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="bg-white py-16 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020] mb-2">
              Latest Updates
            </p>
            <h2 className="font-serif text-navy text-2xl md:text-3xl leading-snug">
              News &amp; Events
            </h2>
          </div>
          <Link href="/news" className="text-sm font-semibold text-navy hover:text-gold transition-colors shrink-0">
            View all →
          </Link>
        </div>
      </div>

      {/* Carousel track */}
      <div className="relative">
        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all duration-200"
        >
          ‹
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all duration-200"
        >
          ›
        </button>

        {/* Sliding window */}
        <div className="flex items-stretch justify-center gap-4 px-16 md:px-24">
          {[-1, 0, 1].map((offset) => {
            const idx = (active + offset + items.length) % items.length;
            const item = items[idx];
            const isCenter = offset === 0;

            return (
              <article
                key={`${idx}-${offset}`}
                onClick={() => !isCenter && setActive(idx)}
                className={`relative flex flex-col bg-white border rounded-2xl overflow-hidden transition-all duration-500 flex-shrink-0
                  ${isCenter
                    ? "w-full max-w-md shadow-xl border-gray-200 scale-100 opacity-100 cursor-default z-10"
                    : "hidden md:flex w-64 shadow-sm border-gray-100 scale-95 opacity-40 cursor-pointer hover:opacity-60 z-0"
                  }`}
              >
                {/* Invisible full-card link for center */}
                {isCenter && (
                  <Link href={`/news/${item.slug}`} className="absolute inset-0 z-10" aria-label={item.title} />
                )}

                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className={`object-cover transition-transform duration-500 ${isCenter ? "group-hover:scale-105" : ""}`}
                    sizes="(max-width: 768px) 100vw, 448px"
                  />
                  <span className={`absolute top-3 left-3 text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${CATEGORY_STYLES[item.category]}`}>
                    {item.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <p className="text-xs text-gray-400">{item.date}</p>
                  <h3 className="font-serif text-navy text-base leading-snug">
                    {item.title}
                  </h3>
                  {isCenter && (
                    <>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                      <Link
                        href={`/news/${item.slug}`}
                        className="relative z-20 text-xs font-semibold text-navy hover:text-gold transition-colors mt-auto pt-2 w-fit"
                      >
                        Read more →
                      </Link>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Dot pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "w-6 h-2 bg-navy"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
