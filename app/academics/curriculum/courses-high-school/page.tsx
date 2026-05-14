import { PageHero } from "@/components/ui/PageHero";

const courseGroups = [
  {
    subject: "Mathematics",
    courses: [
      { name: "FUNdamental Math",         credits: "1.0" },
      { name: "Algebra I",                credits: "1.0" },
      { name: "Geometry",                 credits: "1.0" },
      { name: "Algebra II",               credits: "1.0" },
      { name: "Trigonometry",             credits: "0.5" },
      { name: "College Exam Math Prep",   credits: "0.5" },
      { name: "Pre-Calculus",             credits: "1.0" },
      { name: "AP Calculus AB",           credits: "1.0" },
      { name: "AP Calculus BC",           credits: "1.0" },
      { name: "AP Statistics",            credits: "1.0" },
      { name: "Business Math",            credits: "1.0" },
    ],
  },
  {
    subject: "Language Arts",
    courses: [
      { name: "English I",                        credits: "1.0" },
      { name: "English II",                       credits: "1.0" },
      { name: "American Lit. – English III",      credits: "1.0" },
      { name: "British Lit. – English IV",        credits: "1.0" },
      { name: "College Prep – English IV",        credits: "1.0" },
      { name: "AP Eng. Literature & Comp.",       credits: "1.0" },
      { name: "AP Eng. Language & Comp.",         credits: "1.0" },
    ],
  },
  {
    subject: "Science",
    courses: [
      { name: "Physical Science",         credits: "1.0" },
      { name: "General Biology",          credits: "1.0" },
      { name: "Honors Biology",           credits: "1.0" },
      { name: "AP Biology",               credits: "1.0" },
      { name: "General Chemistry",        credits: "1.0" },
      { name: "Honors Chemistry",         credits: "1.0" },
      { name: "AP Chemistry",             credits: "1.0" },
      { name: "General Physics",          credits: "1.0" },
      { name: "Honors Physics",           credits: "1.0" },
      { name: "AP Physics I",             credits: "1.0" },
      { name: "Environmental Science",    credits: "1.0" },
      { name: "AP Environmental Science", credits: "1.0" },
    ],
  },
  {
    subject: "History / Social Studies",
    courses: [
      { name: "US History A – (1877–1940)",          credits: "0.5" },
      { name: "US History B – (1940–21st Century)",  credits: "0.5" },
      { name: "AP US History",                       credits: "1.0" },
      { name: "World History",                       credits: "1.0" },
      { name: "World Geography",                     credits: "1.0" },
      { name: "AP World History",                    credits: "1.0" },
      { name: "US Government and Civics",            credits: "0.5" },
      { name: "Economics",                           credits: "1.0" },
      { name: "AP European History",                 credits: "1.0" },
      { name: "Personal Finance",                    credits: "0.5" },
      { name: "Psychology",                          credits: "1.0" },
      { name: "AP Psychology",                       credits: "1.0" },
      { name: "Epic Moments in World Hist.",         credits: "1.0" },
    ],
  },
  {
    subject: "Foreign Languages",
    courses: [
      { name: "Discover Spanish", credits: "1.0" },
      { name: "French I",         credits: "1.0" },
      { name: "French II",        credits: "1.0" },
      { name: "German I",         credits: "1.0" },
      { name: "German II",        credits: "1.0" },
      { name: "Spanish I",        credits: "1.0" },
      { name: "Spanish II",       credits: "1.0" },
      { name: "Spanish III",      credits: "1.0" },
    ],
  },
];

export default function CoursesHighSchoolPage() {
  return (
    <>
      <PageHero
        title="Courses – High School"
        breadcrumb="Home / Academics / Curriculum / High School"
      />

      <section className="px-8 py-12 max-w-3xl space-y-8 text-gray-600 text-sm leading-relaxed">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020]">
            Grades 9 – 12
          </p>
          <h2 className="text-navy text-2xl md:text-3xl">High School Course Offerings</h2>
          <p>
            We use the{" "}
            <span className="font-semibold text-navy">Accellus Academy Curriculum</span>.
            Our high school program delivers rigorous, college-preparatory coursework
            across all core disciplines, including AP courses and dual-enrollment pathways.
          </p>
        </div>

        <div className="space-y-6">
          {courseGroups.map((group) => (
            <div key={group.subject} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-navy px-5 py-3">
                <h3 className="text-cream font-semibold text-sm">{group.subject}</h3>
              </div>
              <ul className="divide-y divide-gray-100">
                {group.courses.map((course) => (
                  <li key={course.name} className="px-5 py-2.5 flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {course.name}
                    </span>
                    <span className="text-xs font-semibold text-navy/80 flex-shrink-0">{course.credits}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-600 pt-2 border-t border-gray-200">
          Course availability may vary by year. Contact admissions for the current course catalogue.
        </p>
      </section>
    </>
  );
}
