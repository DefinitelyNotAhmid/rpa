import { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riseprep.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                                  lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/about`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about/mission-vision`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about/accreditation`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/academics`,                   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/academics/curriculum`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/admissions`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/admissions/apply`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/contact`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/faq`,                         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/calendar`,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/policies`,                    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
