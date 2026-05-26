import Image from "next/image";
import Link from "next/link";
import { newsItems, type NewsCategory } from "@/lib/data/news";

const CATEGORY_STYLES: Record<NewsCategory, string> = {
  Announcement: "bg-navy/10 text-navy",
  Event:        "bg-gold/20 text-[#7a6020]",
  Achievement:  "bg-green-100 text-green-700",
  Academic:     "bg-purple-100 text-purple-700",
};

export function NewsEventsSection() {
  const featured = newsItems.slice(0, 4);

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020] mb-2">
              Latest Updates
            </p>
            <h2 className="font-serif text-navy text-2xl md:text-3xl leading-snug">
              News &amp; Events
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm font-semibold text-navy hover:text-gold transition-colors shrink-0"
          >
            View all →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <article
              key={item.slug}
              className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <Link href={`/news/${item.slug}`} className="absolute inset-0 z-10" aria-label={item.title} />
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Category badge */}
                <span
                  className={`absolute top-3 left-3 text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${CATEGORY_STYLES[item.category]}`}
                >
                  {item.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <p className="text-xs text-gray-400 font-sans">{item.date}</p>
                <h3 className="font-serif text-navy text-base leading-snug group-hover:text-gold transition-colors duration-200">
                  {item.title}
                </h3>
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
  );
}
