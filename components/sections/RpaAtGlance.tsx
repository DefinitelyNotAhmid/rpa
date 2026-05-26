"use client";

import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stats = [
  { target: 12, suffix: ":1", label: "Student-Teacher Ratio" },
  { target: 8, suffix: "", label: "Sports Teams" },
  { target: 100, suffix: "%", label: "College Acceptance Rate" },
  { target: 30, suffix: "+", label: "Universities Attended" },
  { target: 5000, suffix: "+", label: "Community Service Hours" },
  { target: 2018, suffix: "", label: "Year Founded" },
];

export function RpaAtGlance() {
  return (
    <ScrollReveal>
      <section className="bg-cream py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <p className="text-xs text-gold font-semibold uppercase tracking-widest">
              RPA at a Glance
            </p>
            <h2 className="font-serif text-navy text-2xl md:text-4xl">
              Excellence in Numbers
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              See why Rise Preparatory Academy stands out in South Florida education.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white border border-gray-200 rounded-xl px-6 py-8 flex flex-col items-center gap-2 text-center hover:shadow-md transition-shadow duration-200"
              >
                <span className="font-serif text-gold text-3xl md:text-4xl font-bold leading-none">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                </span>
                <span className="text-gray-600 text-xs font-medium uppercase tracking-wide leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
