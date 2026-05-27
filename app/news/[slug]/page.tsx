import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsItems, type NewsCategory } from "@/lib/data/news";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

const CATEGORY_STYLES: Record<NewsCategory, string> = {
  Announcement: "bg-navy/10 text-navy",
  Event:        "bg-gold/20 text-[#7a6020]",
  Achievement:  "bg-green-100 text-green-700",
  Academic:     "bg-purple-100 text-purple-700",
};

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} — Rise Preparatory Academy`,
    description: item.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) notFound();

  const related = newsItems.filter((n) => n.slug !== item.slug).slice(0, 2);

  return (
    <main>
      <PageHero
        title={item.title}
        breadcrumb={`News & Events / ${item.category}`}
        imageSrc="/rise-preparatory-academy-cutler-bay-fl-primaryphoto.jpg"
        imageAlt="Rise Preparatory Academy"
      />

      <section className="bg-cream py-16 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${CATEGORY_STYLES[item.category]}`}>
              {item.category}
            </span>
            <span className="text-xs text-gray-400">{item.date}</span>
          </div>

          {/* Cover image */}
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <Image
              src={item.image}
              alt={item.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Body */}
          <div className="max-w-none font-sans text-gray-700 leading-relaxed space-y-5">
            {item.body ? (
              item.body.split("\n\n").map((block, i) => {
                const lines = block.trim().split("\n");
                const isBulletBlock = lines.every((l) => l.startsWith("•"));
                const isHeading = lines.length === 1 && !lines[0].startsWith("•") && lines[0] === lines[0].toUpperCase() || (lines.length === 1 && lines[0].endsWith("Highlights"));

                if (isBulletBlock) {
                  return (
                    <ul key={i} className="space-y-2 pl-1">
                      {lines.map((line, j) => (
                        <li key={j} className="flex gap-2 text-sm md:text-base">
                          <span className="text-gold font-bold flex-shrink-0">•</span>
                          <span>{line.replace(/^•\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (isHeading) {
                  return (
                    <h3 key={i} className="font-serif text-navy text-lg md:text-xl font-bold pt-2">
                      {block.trim()}
                    </h3>
                  );
                }

                return (
                  <p key={i} className="text-sm md:text-base">
                    {block.trim()}
                  </p>
                );
              })
            ) : (
              <>
                <p>{item.excerpt}</p>
                <p>
                  Rise Preparatory Academy continues to build on its legacy of academic excellence,
                  preparing students in grades 5–12 for college and beyond.
                </p>
                <p>
                  For more information, contact our main office at{" "}
                  <a href="tel:+13057609494" className="text-navy underline hover:text-gold transition-colors">
                    (305) 760-9494
                  </a>{" "}
                  or visit us at 18900 SW 106 Ave, Suite 205, Cutler Bay, FL 33157.
                </p>
              </>
            )}
          </div>

          {/* Back link */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link href="/news" className="text-sm font-semibold text-navy hover:text-gold transition-colors">
              ← Back to News & Events
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="font-serif text-navy text-xl mb-6">More News</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/news/${r.slug}`}
                    className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
                  >
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-1">
                      <p className="text-xs text-gray-400">{r.date}</p>
                      <p className="font-serif text-navy text-sm leading-snug group-hover:text-gold transition-colors">
                        {r.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <CtaBand ctaLabel="Apply Now" ctaHref="/admissions/apply" />
    </main>
  );
}
