import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function MissionVisionPage() {
  return (
    <>
      <PageHero
        title="Mission & Vision"
        breadcrumb="Home / About / Mission & Vision"
      />

      <section className="bg-cream py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Vision */}
          <ScrollReveal>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 relative">
                <Image
                  src="/vision-e1605382586184.webp"
                  alt="Vision icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-navy text-xl font-serif">Vision Statement</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our vision is to prepare students to be successful in college, careers, and life.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Mission */}
          <ScrollReveal delay="delay-100">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 relative">
                <Image
                  src="/mission-e1605382619571.webp"
                  alt="Mission icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-navy text-xl font-serif">Mission Statement</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to provide students of diverse backgrounds a well-rounded college preparatory and career technical education that enable our students to lead and influence the next generation.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
