import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { CheckCircle, AlertCircle, CreditCard, Calendar, HelpCircle } from "lucide-react";

const TUITION_TIERS = [
  {
    grade: "Elementary",
    range: "K – 5th Grade",
    annual: "$7,200",
    monthly: "$720",
    color: "border-[#1C2956]",
    highlight: false,
  },
  {
    grade: "Middle School",
    range: "6th – 8th Grade",
    annual: "$8,400",
    monthly: "$840",
    color: "border-[#C9A84C]",
    highlight: true,
  },
  {
    grade: "High School",
    range: "9th – 12th Grade",
    annual: "$9,600",
    monthly: "$960",
    color: "border-[#1C2956]",
    highlight: false,
  },
];

const INCLUDED = [
  "All core academic curriculum materials",
  "Access to digital learning platforms",
  "College preparation & counseling sessions",
  "Student ID and school planner",
  "Standardized test preparation resources",
  "Annual academic progress reports",
];

const NOT_INCLUDED = [
  "School uniform (purchased separately)",
  "Extracurricular activity fees",
  "Field trips and special events",
  "Private tutoring sessions",
];

const PAYMENT_PLANS = [
  {
    icon: <Calendar size={22} className="text-[#C9A84C]" />,
    title: "Annual Payment",
    desc: "Pay the full year upfront and receive a 5% discount on total tuition.",
    badge: "5% Discount",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    icon: <CreditCard size={22} className="text-[#C9A84C]" />,
    title: "Semester Payments",
    desc: "Split tuition into two equal installments — due in August and January.",
    badge: "2 Payments",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: <CreditCard size={22} className="text-[#C9A84C]" />,
    title: "Monthly Payments",
    desc: "Spread payments over 10 months (August through May). A $50 enrollment fee applies.",
    badge: "10 Months",
    badgeColor: "bg-purple-100 text-purple-700",
  },
];

const FAQS = [
  {
    q: "Is financial aid available?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rise Preparatory Academy offers need-based financial assistance to qualifying families. Contact the Admissions Office to request a financial aid application.",
  },
  {
    q: "Are there sibling discounts?",
    a: "Lorem ipsum dolor sit amet. Families enrolling two or more siblings receive a 10% discount on the second child's tuition and 15% for each additional child enrolled simultaneously.",
  },
  {
    q: "What happens if I withdraw mid-year?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing. Tuition is non-refundable after the 30-day grace period from enrollment. Partial refunds may be considered on a case-by-case basis for medical withdrawals.",
  },
  {
    q: "Are there late payment fees?",
    a: "Lorem ipsum dolor sit amet. A $35 late fee is applied to any payment received more than 10 days past the due date. Accounts more than 30 days past due may result in a hold on academic records.",
  },
];

export default function TuitionPage() {
  return (
    <main>
      <PageHero
        title="Tuition & Fees"
        breadcrumb="Admissions / Tuition & Fees"
        imageSrc="/18900-SW-106th-Ave-Miami-FL-Building-Photo-2-LargeHighDefinition.webp"
        imageAlt="Rise Preparatory Academy campus"
      />

      {/* Intro */}
      <section className="bg-cream py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7a5518] mb-3">2025–2026 School Year</p>
          <h2 className="font-serif text-navy text-3xl md:text-4xl mb-4">Investing in Your Child's Future</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rise Preparatory Academy is committed to providing
            world-class education at an accessible cost. Our transparent pricing ensures families know exactly what
            to expect — no hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Tuition tiers */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-navy text-2xl md:text-3xl text-center mb-10">Tuition by Grade Level</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TUITION_TIERS.map((tier) => (
              <div
                key={tier.grade}
                className={`relative rounded-2xl border-2 ${tier.color} p-8 flex flex-col gap-4 shadow-sm ${
                  tier.highlight ? "shadow-[#C9A84C]/20 shadow-lg" : ""
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#030349] text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow">
                    Most Common
                  </span>
                )}
                <div>
                  <p className="font-serif text-navy text-xl font-bold">{tier.grade}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{tier.range}</p>
                </div>
                <div>
                  <p className="text-[#030349] text-4xl font-bold font-sans">{tier.annual}</p>
                  <p className="text-sm text-gray-500 mt-1">per year</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-600">
                    Or <span className="font-semibold text-navy">{tier.monthly}/mo</span> on a monthly plan
                  </p>
                </div>
                <Link
                  href="/admissions/apply"
                  className="mt-auto text-center btn-primary w-full"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 mt-6">
            * All fees are listed in USD. Prices are subject to change each academic year.
          </p>
        </div>
      </section>

      {/* What's included / not included */}
      <section className="bg-cream py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-navy text-2xl md:text-3xl text-center mb-10">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Included */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                <h3 className="font-serif text-navy text-lg font-bold">Included in Tuition</h3>
              </div>
              <ul className="space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Not included */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <AlertCircle size={18} className="text-amber-500 flex-shrink-0" />
                <h3 className="font-serif text-navy text-lg font-bold">Additional Costs</h3>
              </div>
              <ul className="space-y-3">
                {NOT_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <AlertCircle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-600 mt-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Contact the school office for a full
                schedule of additional fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment plans */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-navy text-2xl md:text-3xl text-center mb-4">Payment Plans</h2>
          <p className="text-center text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. We offer flexible options to fit every family's budget.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PAYMENT_PLANS.map((plan) => (
              <div key={plan.title} className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#1C2956]/8 flex items-center justify-center">
                  {plan.icon}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif text-navy font-bold text-base">{plan.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${plan.badgeColor}`}>{plan.badge}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{plan.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-navy text-2xl md:text-3xl text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-3 px-6 py-4 cursor-pointer list-none font-sans font-semibold text-navy text-sm hover:bg-gray-50 transition-colors">
                  <span className="flex items-center gap-2">
                    <HelpCircle size={15} className="text-[#C9A84C] flex-shrink-0" />
                    {faq.q}
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-base leading-none">↓</span>
                </summary>
                <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Have questions about tuition or financial aid?"
        ctaLabel="Contact Admissions"
        ctaHref="/contact"
        variant="navy"
      />
    </main>
  );
}
