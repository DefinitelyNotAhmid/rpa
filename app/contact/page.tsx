import type { Metadata } from "next";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Need help? Chat with Admissions for enrollment questions or use the school contact details for general inquiries.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact Us"
        breadcrumb="Home / Contact"
      />

      <ScrollReveal>
        <section className="max-w-5xl mx-auto px-6 py-16 space-y-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#7a5518]">Admissions first</p>
              <h2 className="text-navy text-3xl md:text-4xl font-serif">Questions about enrollment?</h2>
              <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
                The fastest way to reach our admissions team is through the chat widget in the corner.
                It’s designed for applications, visit requests, and quick enrollment questions, so this page can stay focused on other ways to connect.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <ButtonPrimary href="/inquiry/start">Chat with Admissions</ButtonPrimary>
                <ButtonPrimary href="/admissions/apply">Apply Now</ButtonPrimary>
              </div>
            </div>

            <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-navy text-xl font-serif">General school contact</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Use this info for office-level questions that do not need a live admissions conversation.
              </p>

              <address className="not-italic text-sm text-gray-600 space-y-4 leading-relaxed">
                <p>
                  <span className="block font-semibold text-navy">School Address</span>
                  18900 SW 106 Ave, Suite 205
                  <br />
                  Cutler Bay, FL 33157
                </p>
                <p>
                  <span className="block font-semibold text-navy">Office Phone</span>
                  <a href="tel:+13057609494" className="hover:text-navy transition-colors">
                    (305) 760-9494
                  </a>
                </p>
                <p>
                  <span className="block font-semibold text-navy">Email</span>
                  <a href="mailto:Sperry@risepreparatory.org" className="hover:text-navy transition-colors">
                    Sperry@risepreparatory.org
                  </a>
                </p>
                <p>
                  <span className="block font-semibold text-navy">Office Hours</span>
                  Monday – Friday: 8:00 AM – 4:00 PM
                </p>
              </address>
            </aside>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-navy/5 border border-navy/10 rounded-2xl p-5">
              <h3 className="font-serif text-navy text-lg mb-2">Use chat for admissions</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Best for enrollment questions, scheduling, and application help.
              </p>
            </div>
            <div className="bg-navy/5 border border-navy/10 rounded-2xl p-5">
              <h3 className="font-serif text-navy text-lg mb-2">Use apply for next steps</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Start the application when you’re ready to move forward.
              </p>
            </div>
            <div className="bg-navy/5 border border-navy/10 rounded-2xl p-5">
              <h3 className="font-serif text-navy text-lg mb-2">Use office contact for general needs</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Reach the school office for non-admissions questions and basic support.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay="delay-100">
        <CtaBand heading="Still have an admissions question?" ctaLabel="Chat with Admissions" ctaHref="/inquiry/start" />
      </ScrollReveal>
    </main>
  );
}
