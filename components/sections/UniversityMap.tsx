"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { universities } from "@/lib/data/universities";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const RISE_PREP: [number, number] = [-80.3355, 25.5813];

interface TooltipState {
  name: string;
  x: number;
  y: number;
}

export function UniversityMap() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 900 }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: { rsmKey: string; [key: string]: unknown }[] }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#e8e4e4"
                stroke="#1C2956"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover:   { outline: "none", fill: "#d6d0d0" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* University pins */}
        {universities.map((u) => (
          <Marker
            key={u.name}
            coordinates={u.coordinates}
            onMouseEnter={() => setTooltip({ name: u.name, x: mousePos.x, y: mousePos.y })}
            onMouseLeave={() => setTooltip(null)}
          >
            <circle
              r={5}
              fill="#C9A84C"
              stroke="#fff"
              strokeWidth={1}
              className="cursor-pointer"
              style={{ filter: tooltip?.name === u.name ? "brightness(1.3)" : "none" }}
            />
          </Marker>
        ))}

        {/* Rise Prep home marker */}
        <Marker coordinates={RISE_PREP}>
          <circle r={7} fill="#1C2956" stroke="#C9A84C" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={-12}
            style={{
              fontFamily: "sans-serif",
              fontSize: 9,
              fill: "#1C2956",
              fontWeight: 700,
              pointerEvents: "none",
            }}
          >
            Rise Prep
          </text>
        </Marker>
      </ComposableMap>

      {/* HTML tooltip card — always renders on top */}
      {tooltip && (
        <div
          className="absolute z-50 pointer-events-none rounded-lg shadow-xl overflow-hidden bg-deep-navy"
          style={{ left: mousePos.x + 12, top: mousePos.y - 120, width: 160 }}
        >
          <img
            src={universities.find((u) => u.name === tooltip.name)?.logo ?? ""}
            alt={tooltip.name}
            className="w-full object-cover"
            style={{ height: 88 }}
          />
          <p className="text-cream text-[0.65rem] font-sans font-semibold px-2 py-1.5 leading-snug">
            {tooltip.name}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-navy/80 font-sans">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-[#1C2956] border-2 border-[#C9A84C]" />
          Rise Prep (Cutler Bay, FL)
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-[#C9A84C]" />
          Graduate colleges
        </div>
      </div>
    </div>
  );
}
