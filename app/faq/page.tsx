import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Rise Preparatory Academy — graduation, athletics, tuition, enrollment, and more.",
  openGraph: {
    title: "FAQ | Rise Preparatory Academy",
    description:
      "Answers to common questions about Rise Preparatory Academy — graduation, athletics, tuition, enrollment, and more.",
    url: "https://riseprep.vercel.app/faq",
  },
};

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const faqs = [
  { q: "Can RPA students attend charter or public schools prom?", a: LOREM },
  { q: "Do students graduate from Rise Prep Academy or the school he/she participates in for athletics?", a: LOREM },
  { q: "Do I have to withdraw from my school to attend RPA?", a: LOREM },
  { q: "Is RPA accredited?", a: LOREM },
  { q: "Does RPA have certified teachers?", a: LOREM },
  { q: "Can students play football during the fall at one school and play basketball or track at another school?", a: LOREM },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        breadcrumb="Home / FAQ"
      />

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-navy text-2xl md:text-3xl mb-8">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <details key={q} className="border border-gray-200 rounded-lg group">
              <summary className="px-5 py-4 cursor-pointer hover:bg-cream/60 rounded-lg list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy flex items-center justify-between gap-4">
                <h3 className="text-navy font-medium text-sm leading-snug">{q}</h3>
                <span className="flex-shrink-0 text-gold text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
              </summary>
              <p className="px-5 pb-5 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
