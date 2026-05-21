"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("splash_shown")) return;
    setVisible(true);
    sessionStorage.setItem("splash_shown", "1");

    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-deep-navy transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <Image
        src="/slazzer-preview-u8tbq.png"
        alt="Rise Preparatory Academy"
        width={180}
        height={54}
        priority
        className="object-contain"
        style={{ filter: "brightness(0) invert(1)" }}
      />

      {/* Gold spinner */}
      <div className="mt-8 relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
      </div>

      {/* Tagline */}
      <p className="mt-5 text-cream/50 text-xs uppercase tracking-widest font-sans">
        Accelerated Excellence
      </p>
    </div>
  );
}
