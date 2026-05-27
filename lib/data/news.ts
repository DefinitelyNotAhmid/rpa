export type NewsCategory = "Announcement" | "Event" | "Achievement" | "Academic";

export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  image: string;
  body?: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "class-of-2026-graduation",
    title: "Congratulations to the Rise Prep Class of 2026!",
    excerpt:
      "We are incredibly proud to celebrate another successful year as a \"B\" rated school. Valedictorian Jaden Chica earned a 5.35 GPA, AP Scholar with Honor, and National Hispanic Recognition. 9 students earned AA degrees from Miami Dade College and the class earned 920 total college credits.",
    date: "May 27, 2026",
    category: "Achievement",
    image: "/classof2026.jpg",
    body: `We are incredibly proud to celebrate another successful year as a "B" rated school and one of the leading hybrid online private schools.

A special congratulations to our Valedictorian and Summa Cum Laude graduate, Jaden Chica, who earned an outstanding 5.35 GPA, AP Scholar with Honor recognition, and National Hispanic Recognition Program honors. Your dedication and excellence inspire us all!

We also proudly recognize our students who earned their Associate of Arts (AA) degrees while completing high school — an incredible accomplishment! Jayden Chico, Zakieria Cobb, Luna Herrera, Bernard Oliva, Melvin Hayward, Trace Poncev, Eric Nelson, Bishop Hendricks.

Rise Preparatory Academy Highlights

• National Universities: University of Chicago ranked No. 6 nationally, No. 2 in Economics, and No. 26 globally.
• Top 10 Public Universities: UF, University of Texas–Austin, Georgia Tech, and FSU.
• Top 5 HBCUs: Howard University, FAMU, and Tuskegee University.
• Top 10 National Liberal Arts Colleges: United States Air Force Academy and United States Naval Academy.
• Miami Dade College: 9 students earned Associate of Arts (AA) degrees from Miami Dade College.
• College Credit Certificates: 4 students earned College Credit Certificates from Miami Dade College.
• Class of 2026: Earned 920 total college credits.
• Recognition: Rise Preparatory Academy was recognized by Niche as a "B" school and named among BusinessRate Cutler Bay's Best of 2025 schools.
• Athletics: 46 seniors signed Division I, 21 signed Division II, 5 signed Division III, and 11 signed NAIA.
• Early Enrollees: 38 seniors graduated early to begin collegiate athletic programs as early enrollees.

Class of 2026, continue to rise, lead, and achieve greatness. Your future is bright! 💙📚`,
  },
  {
    slug: "college-football-coaches-visit",
    title: "Thank You to All College Football Coaches Who Visited Rise Prep!",
    excerpt:
      "Thank you to all the college football coaches who stopped by Rise Preparatory Academy over the past 25 days. We truly appreciate your time, support, and commitment to providing opportunities for our student-athletes.",
    date: "May 25, 2026",
    category: "Achievement",
    image: "/37.jpg",
    body: `Thank you to all the college football coaches who stopped by Rise Preparatory Academy over the past 25 days. We truly appreciate your time, support, and commitment to providing opportunities for our student-athletes.

Your visits mean the world to our players and families. The chance to be seen, heard, and recruited at the collegiate level is a testament to the hard work our student-athletes put in every day — on the field and in the classroom.

Rise Preparatory Academy remains committed to developing the whole student-athlete: academically, athletically, and personally. We look forward to continuing to build these relationships and supporting our athletes in reaching their collegiate dreams.

Class of 2026, continue to rise, lead, and achieve greatness. Your future is bright! 💙🏈`,
  },
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
