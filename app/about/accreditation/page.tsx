"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const memberships = [
  {
    logo: "/slazzer-preview-1wvhk.png",
    alt: "Cognia Accreditation Logo",
    name: "Cognia Accreditation",
    description:
      "Certificate of Accreditation by the North Central Association Commission on Accreditation and School Improvement, the Northwest Accreditation Commission, and the Southern Association of Colleges and Schools Council on Accreditation and School Improvement.",
    code: null,
  },
  {
    logo: "/College-Board-1.webp",
    alt: "College Board Logo",
    name: "College Board Member",
    description:
      "Rise Preparatory Academy is a member of College Board.",
    code: "High School Code: 100723",
  },
  {
    logo: "/fldoe-logo-2.webp",
    alt: "Florida Department of Education Logo",
    name: "Florida Department of Education",
    description:
      "Rise Preparatory Academy is listed by the Florida Department of Education.",
    code: "School Code: 9374",
  },
  {
    logo: "/cropped-NAPS35-1.webp",
    alt: "National Association of Private Schools Logo",
    name: "National Association of Private Schools",
    description:
      "Rise Preparatory Academy is fully accredited by the National Association of Private Schools.",
    code: "Accreditation Code: 700441",
  },
];

function CredentialShowcase() {
  const [active, setActive] = useState(0);
  const selected = memberships[active];

  return (
    <div className="space-y-6">
      {/* Logo wall */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {memberships.map((m, i) => (
          <button
            key={m.name}
            onClick={() => setActive(i)}
            className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 px-4 py-6 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              active === i
                ? "border-gold shadow-md -translate-y-1"
                : "border-gray-200 hover:border-gold/40"
            }`}
            aria-pressed={active === i}
            aria-label={m.name}
          >
            <div className="relative w-36 h-16">
              <Image src={m.logo} alt={m.alt} fill className="object-contain" />
            </div>
            {/* Active indicator dot */}
            <span
              className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                active === i ? "bg-gold opacity-100" : "opacity-0"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Detail panel — key forces remount + re-animation on change */}
      <div
        key={active}
        className="animate-fade-up bg-navy rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center gap-8"
      >
        {/* Larger logo on dark bg — white pill so logo reads on navy */}
        <div className="flex-shrink-0 bg-white rounded-xl px-5 py-3 shadow-sm">
          <div className="relative w-32 h-14">
            <Image
              src={selected.logo}
              alt={selected.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <h3 className="text-cream font-semibold text-lg">{selected.name}</h3>
          <p className="text-cream text-sm leading-relaxed">
            {selected.description}
          </p>
          {selected.code && (
            <span className="inline-block mt-2 text-[0.7rem] font-bold uppercase tracking-widest text-deep-navy bg-gold px-3 py-1 rounded-full">
              {selected.code}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccreditationPage() {
  return (
    <>
      <PageHero
        title="Accreditation & Membership"
        breadcrumb="Home / About / Accreditation"
      />

      {/* Section 1 — Why Accreditation Matters */}
      <ScrollReveal>
        <section className="bg-cream py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-5">
            <h2 className="text-navy text-2xl md:text-3xl">
              Why Accreditation Matters
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Accreditation is a critical credential. It assures learners and
              the public that a school meets and exceeds standards for quality
              of faculty, curriculum, and fiscal stability. It also assures
              that your diploma is recognized by employers, professional
              associations and other accredited institutions of higher
              learning.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2 — Logo wall + detail panel */}
      <ScrollReveal delay="delay-100">
        <section className="bg-white py-16 px-4 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020] text-center mb-3">
              Our Credentials
            </p>
            <h2 className="font-serif text-navy text-2xl md:text-3xl text-center mb-12">
              Accreditation &amp; Membership
            </h2>
            <CredentialShowcase />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3 — Non-Discriminatory Policy Callout */}
      <ScrollReveal delay="delay-100">
        <section className="bg-cream py-16 px-4 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="bg-navy/5 border border-navy/15 rounded-2xl p-8 space-y-4">
              <h3 className="text-navy text-xl font-semibold">
                Non-Discriminatory Policy
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rise Preparatory Academy admits students of any race, color,
                national and ethnic origin to all the rights, privileges,
                programs, and activities generally accorded or made available
                to students at the school. It does not discriminate on the
                basis of race, color, national or ethnic origin in
                administration of its educational policies, admissions
                policies, scholarship programs, and other school-administered
                programs.
              </p>
              <Link
                href="/policies"
                className="inline-flex items-center gap-1 text-sm font-medium text-navy underline underline-offset-2 hover:text-gold transition-colors"
              >
                View Full Non-Discriminatory Policy →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
