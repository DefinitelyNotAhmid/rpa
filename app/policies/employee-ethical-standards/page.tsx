import { PageHero } from "@/components/ui/PageHero";

export default function EmployeeEthicalStandardsPage() {
  return (
    <>
      <PageHero
        title="Employee Ethical Standards"
        breadcrumb="Home / Policies / Employee Ethical Standards"
      />

      <section className="bg-cream px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-10 text-gray-600 text-sm leading-relaxed">

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020]">
              Policies &amp; Procedures
            </p>
            <h2 className="text-navy text-2xl md:text-3xl">
              Employee Ethical Standards-Policy and Procedures
            </h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-navy text-lg font-semibold">Employment Screening</h3>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  All Volunteers, Staff and Teachers are screened using VECHS
                  fingerprint and background check.
                </li>
                <li>
                  All volunteers, staff and teacher are disqualified from
                  employment if they are convicted of an act listed under Section
                  1012.315, Florida Statutes.
                </li>
                <li>All VECHS reports are reviewed by the CPA administrator.</li>
                <li>
                  New instructional personal and administrators are screened using
                  the two employee screening tools developed by the Department of
                  Education.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-navy text-lg font-semibold">
                Employee Standards of Ethical Conduct
              </h3>
              <p>
                Rise Preparatory Academy has adopted the policies establishing
                standards of ethical conduct for instructional personnel and school
                administrators.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
              <h3 className="text-navy text-lg font-semibold">Contact Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-deep-navy">Contact:</span>{" "}
                  Jerry Williamson
                </p>
                <p>
                  <span className="font-semibold text-deep-navy">Tel:</span>{" "}
                  <a
                    href="tel:3053567466"
                    className="text-navy font-medium hover:text-gold transition-colors"
                  >
                    (305) 356-7466
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-deep-navy">E-mail:</span>{" "}
                  <a
                    href="mailto:jwilliamson@risepreparatory.org"
                    className="text-navy font-medium hover:text-gold transition-colors"
                  >
                    jwilliamson@risepreparatory.org
                  </a>
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 pt-4 border-t border-gray-200">
            Rise Preparatory Academy · {new Date().getFullYear()}
          </p>
        </div>
      </section>
    </>
  );
}
