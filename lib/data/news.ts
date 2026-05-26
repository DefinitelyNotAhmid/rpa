export type NewsCategory = "Announcement" | "Event" | "Achievement" | "Academic";

export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  image: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "spring-2025-enrollment-open",
    title: "Spring 2025 Enrollment Now Open",
    excerpt:
      "Rise Preparatory Academy is now accepting applications for the 2025–2026 school year. Limited seats available for grades 5–12. Early applicants receive priority placement.",
    date: "Jan 15, 2026",
    category: "Announcement",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&h=400",
  },
  {
    slug: "class-of-2024-college-acceptance",
    title: "Class of 2026 Achieves 100% College Acceptance",
    excerpt:
      "Every graduating senior in the Class of 2026 was accepted to a four-year college or university, continuing Rise Prep's proud tradition of college-prep excellence.",
    date: "Jun 3, 2026",
    category: "Achievement",
    image:
      "https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&w=800&h=400",
  },
  {
    slug: "fall-open-house-2025",
    title: "Fall Open House — Come See Rise Prep",
    excerpt:
      "Join us for our Fall Open House and experience Rise Preparatory Academy firsthand. Tour classrooms, meet faculty, and learn about our accelerated programs.",
    date: "Oct 12, 2026",
    category: "Event",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&h=400",
  },
  {
    slug: "ap-courses-expansion",
    title: "Rise Prep Expands AP Course Offerings",
    excerpt:
      "We are proud to announce the addition of AP Computer Science and AP Environmental Science, bringing our total Advanced Placement course offerings to ten.",
    date: "Aug 20, 2026",
    category: "Academic",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&h=400",
  },
];
