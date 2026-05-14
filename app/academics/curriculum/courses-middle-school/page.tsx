import { PageHero } from "@/components/ui/PageHero";

const courseGroups = [
  {
    subject: "Mathematics",
    courses: ["Grade 6 Math", "Grade 7 Math", "Grade 8 Math", "FUNdamental Math"],
  },
  {
    subject: "Language Arts",
    courses: [
      "Grade 6 Language Arts/Reading",
      "Grade 7 Language Arts/Reading",
      "Grade 8 Language Arts/Reading",
    ],
  },
  {
    subject: "Science",
    courses: ["Grade 6 Science", "Life Science", "Earth Science", "Physical Science"],
  },
  {
    subject: "History / Social Studies",
    courses: [
      "Ancient Civilizations",
      "Grade 6 Social Studies",
      "Middle School American History",
      "Grade 7 Social Studies",
      "Middle School Geography",
      "Middle School Personal Finance",
    ],
  },
  {
    subject: "Foreign Languages",
    courses: ["Middle School French I"],
  },
];

export default function CoursesMiddleSchoolPage() {
  return (
    <>
      <PageHero
        title="Courses – Middle School"
        breadcrumb="Home / Academics / Curriculum / Middle School"
      />

      <section className="px-8 py-12 max-w-3xl space-y-8 text-gray-600 text-sm leading-relaxed">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020]">
            Grades 5 – 8
          </p>
          <h2 className="text-navy text-2xl md:text-3xl">Middle School Course Offerings</h2>
          <p>
            We use the{" "}
            <span className="font-semibold text-navy">Accellus Academy Curriculum</span>.
            Our middle school program bridges foundational learning with
            high-school-level rigor. Accelerated students can access
            high school credit courses early, building a strong academic
            track record before entering 9th grade.
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
                  <li key={course} className="px-5 py-2.5 flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {course}
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
