"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ApplicationsBanner() {
  return (
    <ScrollReveal>
      <section className="bg-gold py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-navy font-bold text-sm md:text-base">
            Accepting Applications for 2025-2026 School Year!
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/admissions/apply"
              className="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-deep-navy transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/admissions"
              className="text-navy text-xs font-semibold underline underline-offset-2 hover:text-deep-navy transition-colors"
            >
              Application Process
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
