import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { newsItems, type NewsCategory } from "@/lib/data/news";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Events — Rise Preparatory Academy",
  description: "Stay up to date with the latest news, events, and achievements at Rise Preparatory Academy.",
};

const CATEGORY_STYLES: Record<NewsCategory, string> = {
  Announcement: "bg-navy/10 text-navy",
  Event:        "bg-gold/20 text-[#7a6020]",
  Achievement:  "bg-green-100 text-green-700",
  Academic:     "bg-purple-100 text-purple-700",
};

export default function NewsPage() {
  return (
    <main>
      <PageHero
        title="News & Events"
        breadcrumb="Rise Prep / News & Events"
        imageSrc="/rise-preparatory-academy-cutler-bay-fl-primaryphoto.jpg"
        imageAlt="Rise Preparatory Academy"
      />

      <section className="bg-cream py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsItems.map((item) => (
              <article
                key={item.slug}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${CATEGORY_STYLES[item.category]}`}>
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <p className="text-xs text-gray-400">{item.date}</p>
                  <h2 className="font-serif text-navy text-base leading-snug group-hover:text-gold transition-colors duration-200">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-xs font-semibold text-navy hover:text-gold transition-colors mt-auto pt-2"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
