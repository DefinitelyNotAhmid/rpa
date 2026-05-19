import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Community Service Requirements",
  description:
    "Learn about Rise Preparatory Academy's community service requirements and download necessary forms for tracking volunteer hours.",
  openGraph: {
    title: "Community Service Requirements | Rise Preparatory Academy",
    description:
      "Learn about Rise Preparatory Academy's community service requirements and download necessary forms for tracking volunteer hours.",
    url: "https://riseprep.vercel.app/academics/community-service",
  },
};

export default function CommunityServicePage() {
  return (
    <>
      <PageHero
        title="Community Service Requirements"
        breadcrumb="Academics / Community Service Requirements"
      />

      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
          <div className="space-y-12">
              {/* Requirements text */}
              <div className="space-y-6">
                <h2 className="text-navy text-2xl md:text-3xl">Community Service Requirements</h2>
                <p className="text-gray-600 leading-relaxed">
                  All Rise Preparatory Academy students must download, complete, and submit the forms below to Community Service Coordinator Jerry Williamson
                </p>
              </div>

              {/* Forms section */}
              <div className="space-y-8">
                <h3 className="text-navy text-2xl font-semibold">Required Forms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Proposal */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-gold/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                        <FileText className="text-gold" size={24} />
                      </div>
                      <h4 className="font-semibold text-navy text-lg mb-2">Proposal Form</h4>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                        Submit before starting a community service project to gain approval for your proposed project. Once you receive approval, you may begin your service.
                      </p>
                      <a
                        href="https://www.commschool.org/fs/resource-manager/view/7ba247a5-1f0d-4829-9146-5a782f51a354"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-navy text-cream px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gold hover:text-deep-navy transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px w-full justify-center"
                      >
                        <Download size={16} />
                        Download Proposal
                      </a>
                    </div>
                  </div>

                  {/* Evaluation */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-gold/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                        <FileText className="text-gold" size={24} />
                      </div>
                      <h4 className="font-semibold text-navy text-lg mb-2">Evaluation Form</h4>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                        Submit after you complete your service, logging your the hours.
                      </p>
                      <a
                        href="https://www.commschool.org/fs/resource-manager/view/b3e1f242-6417-4e5d-8375-281ffae4dcd1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-navy text-cream px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gold hover:text-deep-navy transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px w-full justify-center"
                      >
                        <Download size={16} />
                        Download Evaluation
                      </a>
                    </div>
                  </div>

                  {/* Attendance */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-gold/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                        <FileText className="text-gold" size={24} />
                      </div>
                      <h4 className="font-semibold text-navy text-lg mb-2">Attendance Form</h4>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                        This is for group leaders to take attendance and corroborate the hours for each student who participated
                      </p>
                      <a
                        href="https://www.commschool.org/fs/resource-manager/view/a6f8d440-0a37-4e09-9a6b-a0e798688aef"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-navy text-cream px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gold hover:text-deep-navy transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px w-full justify-center"
                      >
                        <Download size={16} />
                        Download Attendance
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours requirement */}
              <div className="bg-navy/5 border border-navy/15 rounded-2xl p-8">
                <h3 className="text-navy text-lg font-semibold mb-4">Graduation Requirement</h3>
                <p className="text-gray-600 leading-relaxed">
                  For each college bound student, the requirement for graduation is a minimum of 100 hours of community service, which meets the eligibility criteria for the Florida Academic Scholars Award through the Florida Bright Futures Scholarship Program.
                </p>
              </div>

              {/* Directions */}
              <div className="space-y-4">
                <h3 className="text-navy text-lg font-semibold">***Directions***</h3>
                <p className="text-gray-600 leading-relaxed">
                  Please add Community Service Requirements under Student Life. Furthermore, please include the forms for proposal, evaluation, and attendance form (the same way you can click on it, like the actual website) here's the link below
                </p>
                
                {/* Volunteer Service Work Hours Log */}
                <div className="bg-gold/10 border border-gold/30 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Volunteer Service Work Hours Log</h4>
                      <p className="text-gray-600 text-sm">Track your community service hours</p>
                    </div>
                    <Link
                      href="/Volunteer-Service-Work-Hours-Log.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold text-deep-navy px-4 py-2 rounded-lg font-medium text-sm hover:bg-gold-dark transition-colors"
                    >
                      <Download size={16} />
                      Download
                    </Link>
                  </div>
                </div>
              </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay="delay-100">
        <CtaBand ctaLabel="Apply Now" ctaHref="/admissions/apply" />
      </ScrollReveal>
    </>
  );
}
