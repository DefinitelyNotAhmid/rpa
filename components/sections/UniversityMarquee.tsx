"use client";

import React from "react";
import { universities } from "@/lib/data/universities";
import { UniversityLogo } from "@/components/ui/UniversityLogo";

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
        <div className="marquee-container flex items-center gap-10">
          {marqueeContent.map((university, index) => (
            <React.Fragment key={`${university.name}-${index}`}>
              <div
                className="flex-shrink-0"
                {...(index >= universities.length ? { "aria-hidden": true } : {})}
              >
                <UniversityLogo
                  name={university.name}
                  domain={university.domain}
                  width={72}
                  height={24}
                />
              </div>
              <span className="text-gold text-xl flex-shrink-0">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
