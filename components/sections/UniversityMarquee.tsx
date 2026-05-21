"use client";

import { universities } from "@/lib/data/universities";

export function UniversityMarquee() {
  // Duplicate the list for seamless loop
  const marqueeContent = [...universities, ...universities];

  return (
    <div className="relative overflow-hidden bg-navy/5 py-4">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-container {
          animation: marquee 35s linear infinite;
          will-change: transform;
        }

        .marquee-container:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-container {
            animation: none;
          }
        }
      `}</style>
      
      <div className="relative">
        <div className="marquee-container flex gap-8">
          {marqueeContent.map((university, index) => (
            <div
              key={`${university.name}-${index}`}
              className="flex-shrink-0 flex items-center gap-2 transition-opacity duration-200 hover:opacity-100"
              {...(index >= universities.length ? { "aria-hidden": true } : {})}
            >
              <span className="text-navy/60 font-semibold text-sm md:text-base transition-colors duration-200 hover:text-navy">
                {university.name}
              </span>
              <span className="text-gold text-xl animate-soft-pulse">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
