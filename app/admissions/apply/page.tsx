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

  return (
    <>
      <PageHero
        title="Apply Now"
        breadcrumb="Home / Admissions / Apply"
      />

      <section className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-gray-700 leading-relaxed mb-8">
          Complete the form below to begin your application to Rise Preparatory
          Academy. A member of our admissions team will follow up within 3–5
          business days.
        </p>

        <form className="space-y-6" aria-label="Application form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-navy mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                disabled={loading}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-navy mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                disabled={loading}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
              Parent / Guardian Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-navy mb-1">
              Grade Applying For
            </label>
            <select
              id="grade"
              name="grade"
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select a grade</option>
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i} value={String(i + 5)}>
                  Grade {i + 5}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-navy mb-1">
              Additional Information
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy resize-none disabled:opacity-50 disabled:cursor-not-allowed"
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
            ) : submitted ? (
              "Submit Another Application"
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </section>
    </>
  );
}
