"use client";

import { useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { useToast } from "@/components/ui/Toast";

export default function ApplyPage() {
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
      show("Application received! Our team will follow up within 3\u20135 business days.", "success");
    } catch {
      show("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#030349] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2956]/30 focus:border-[#1C2956] placeholder:text-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2";

  return (
    <>
      <PageHero
        title="Apply Now"
        breadcrumb="Home / Admissions / Apply"
      />

      <section className="max-w-2xl mx-auto px-6 py-16">

        {submitted ? (
          <div className="bg-navy rounded-2xl px-8 py-12 text-center space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Submitted Successfully
            </p>
            <h2 className="font-serif text-white text-2xl md:text-3xl">
              Application Received
            </h2>
            <div className="w-12 h-px bg-gold/40 mx-auto" />
            <p className="text-cream/80 text-sm leading-relaxed max-w-sm mx-auto">
              Our admissions team will review your application and follow up within 3–5 business days.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-gold underline underline-offset-4 hover:text-cream transition-colors mt-2"
            >
              Submit another application
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 leading-relaxed mb-8">
              Complete the form below to begin your application to Rise Preparatory
              Academy. A member of our admissions team will follow up within 3–5
              business days.
            </p>

            <form className="space-y-6" aria-label="Application form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className={labelClass}>First Name</label>
                  <input
                    id="firstName" name="firstName" type="text" required
                    disabled={loading} placeholder="Maria"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>Last Name</label>
                  <input
                    id="lastName" name="lastName" type="text" required
                    disabled={loading} placeholder="Santos"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Parent / Guardian Email</label>
                <input
                  id="email" name="email" type="email" required
                  disabled={loading} placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                <input
                  id="phone" name="phone" type="tel"
                  disabled={loading} placeholder="(305) 000-0000"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="grade" className={labelClass}>Grade Applying For</label>
                <select
                  id="grade" name="grade" required
                  disabled={loading}
                  className={inputClass + " bg-gray-50"}
                >
                  <option value="">Select a grade</option>
                  {Array.from({ length: 8 }, (_, i) => (
                    <option key={i} value={String(i + 5)}>Grade {i + 5}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Additional Information</label>
                <textarea
                  id="message" name="message" rows={4}
                  disabled={loading}
                  placeholder="Tell us anything else we should know…"
                  className={inputClass + " resize-none"}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-deep-navy/30 border-t-deep-navy animate-spin" />
                    Submitting&hellip;
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </form>
          </>
        )}
      </section>
    </>
  );
}
