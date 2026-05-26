"use client";

import Image from "next/image";
import { useState } from "react";

interface Spotlight {
  name: string;
  year: string;
  university: string;
  domain: string;
  major: string;
  quote: string;
}

interface Props {
  spotlights: Spotlight[];
  apiKey?: string;
}

function LogoAvatar({ domain, university, apiKey }: { domain: string; university: string; apiKey?: string }) {
  const [error, setError] = useState(false);
  const url = apiKey && !error
    ? `https://img.logo.dev/${domain}?token=${apiKey}&size=200&retina=true&format=png&fallback=404`
    : null;

  if (!url) {
    return (
      <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
        <span className="text-navy font-bold text-xs">{university[0]}</span>
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-gray-200 flex-shrink-0 flex items-center justify-center">
      <Image
        src={url}
        alt={university}
        width={36}
        height={36}
        className="object-contain p-1"
        onError={() => setError(true)}
      />
    </div>
  );
}

export function GraduateSpotlights({ spotlights, apiKey }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {spotlights.map((s) => (
        <div
          key={s.name}
          className="bg-cream border border-gray-100 rounded-2xl p-7 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* University logo + name */}
          <div className="flex items-center gap-3">
            <LogoAvatar domain={s.domain} university={s.university} apiKey={apiKey} />
            <div>
              <p className="font-sans text-xs font-bold text-navy leading-tight">{s.university}</p>
              <p className="font-sans text-[0.65rem] text-gray-400 uppercase tracking-wide">{s.major}</p>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="font-serif italic text-navy/80 text-sm leading-relaxed flex-1">
            "{s.quote}"
          </blockquote>

          {/* Graduate */}
          <div className="border-t border-gray-200 pt-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
              <span className="text-gold font-bold text-xs">{s.name[0]}</span>
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-navy">{s.name}</p>
              <p className="font-sans text-[0.65rem] text-gray-400">{s.year}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
