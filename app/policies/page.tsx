import { PageHero } from "@/components/ui/PageHero";

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        title="Policies & Procedures"
        breadcrumb="Home / Policies"
      />

      {/* Non-Discriminatory Policy */}
      <section className="max-w-3xl mx-auto px-6 py-16 space-y-6 text-gray-600 text-sm leading-relaxed">
        <h2 className="text-navy text-2xl md:text-3xl">
          Non-Discriminatory Policy Statement
        </h2>

        <p>
          Rise Preparatory Academy admits students of any race, color, national
          and ethnic origin to all the rights, privileges, programs, and
          activities generally accorded or made available to students at the
          school. It does not discriminate on the basis of race, color, national
          and ethnic origin in administration of its educational policies,
          admissions policies, scholarship and loan programs, and athletic and
          other school-administered programs.
        </p>

        <p>
          Rise Preparatory Academy is committed to providing a learning
          environment free from discrimination and harassment. All students,
          staff, and faculty are entitled to a respectful and inclusive
          environment regardless of race, color, religion, gender, gender
          identity or expression, sexual orientation, national origin, genetics,
          disability, age, or veteran status.
        </p>

        <p>
          Complaints of discrimination or harassment should be reported to the
          school administration promptly. All complaints will be investigated
          thoroughly and in accordance with applicable law. Retaliation against
          any person who reports discrimination or participates in an
          investigation is strictly prohibited.
        </p>

        <p>
          This policy applies to all aspects of the school&apos;s operations,
          including but not limited to admissions, academics, extracurricular
          activities, employment, and disciplinary actions.
        </p>
      </section>

    </>
  );
}
