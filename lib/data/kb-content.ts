export interface KbEntry {
  id: string;
  title: string;
  section: string;
  href: string;
  content: string;
  tags: string[];
}

export const kbContent: KbEntry[] = [
  {
    id: "accreditation",
    title: "Accreditation & Membership",
    section: "About",
    href: "/about/accreditation",
    content:
      "Rise Preparatory Academy is fully accredited by Cognia (formerly AdvancED) — recognized by the North Central Association, Northwest Accreditation Commission, and the Southern Association of Colleges and Schools. RPA is also a College Board Member (High School Code: 100723), listed by the Florida Department of Education (School Code: 9374), and accredited by the National Association of Private Schools (Accreditation Code: 700441). Accreditation assures that RPA meets rigorous standards for faculty, curriculum, and fiscal stability, and that diplomas are recognized by employers, professional associations, and institutions of higher learning.",
    tags: ["cognia", "college board", "fldoe", "naps", "accreditation", "diploma", "recognized"],
  },
  {
    id: "mission-vision",
    title: "Mission & Vision",
    section: "About",
    href: "/about/mission-vision",
    content:
      "Vision: Our vision is to prepare students to be successful in college, careers, and life. Mission: Our mission is to provide students of diverse backgrounds a well-rounded college preparatory and career technical education that enables our students to lead and influence the next generation.",
    tags: ["mission", "vision", "college prep", "career", "diverse", "education"],
  },
  {
    id: "admissions",
    title: "Admission Procedures",
    section: "Admissions",
    href: "/admissions",
    content:
      "Prospective students who wish to apply to Rise Preparatory Academy are invited to visit our campus by calling the office and scheduling an appointment. Applicants are expected to bring: last report card from prior school, official copy of transcript, attendance report and credits earned, updated vaccinations, completed entrance exam, copy of Birth Certificate or Baptismal Certificate, and copy of the student's and parent's Social Security card. Upon receipt and evaluation of these documents, a school official will schedule an interview with the applicant. Acceptance is subject to satisfactory completion of all current coursework. After acceptance, you will need to fill out the application and registration form. RPA does not discriminate on the basis of race, color, or national/ethnic origin.",
    tags: ["admissions", "enrollment", "apply", "transcript", "entrance exam", "birth certificate", "social security", "interview", "registration"],
  },
  {
    id: "curriculum",
    title: "Curriculum & Graduation Requirements",
    section: "Academics",
    href: "/academics/curriculum",
    content:
      "RPA requires 28 credits to graduate (vs. Florida state minimum of 24). Requirements: English 4 credits, Mathematics 4 credits (Algebra I and Geometry required), Science 3 credits (Biology required), Social Studies 3 credits (World History, U.S. History, Economics, American Government), HOPE/Physical Education 1 credit, Fine and Performing Arts 1 credit, Online Course 1 credit, World Languages 2 credits (2 consecutive years same language), Electives 8 credits. Fee schedule: Tuition $10,000, Books $500, Registration $200, Testing $45, Lab Fee $200, One-on-One Tutoring $150, College Prep Testing $150. Total: $11,245.",
    tags: ["curriculum", "graduation", "credits", "courses", "english", "math", "science", "fees", "tuition", "algebra", "biology"],
  },
  {
    id: "faq-athletics",
    title: "Athletics & Prom — FAQ",
    section: "FAQ",
    href: "/faq",
    content:
      "RPA students can attend prom at the charter or public school they participate in as a student-athlete, or purchase tickets. The student's diploma comes from RPA, but students can walk at their athletic school graduation if approved by the principal. RPA does not offer athletics — students can play football at one school in the fall and basketball or track at another school. Students must withdraw from their previous school to attend RPA. RPA is a fully accredited non-traditional private school registered with the Department of Education (school code 9374).",
    tags: ["athletics", "prom", "sports", "football", "basketball", "diploma", "graduation", "withdraw", "public school"],
  },
  {
    id: "faq-teachers",
    title: "Teachers & Staff — FAQ",
    section: "FAQ",
    href: "/faq",
    content:
      "RPA has three certified teachers and two facilitators with three or more years of classroom experience. RPA is accredited by the National Association of Private Schools and Cognia. Seniors have been accepted in 15 states and over 30 colleges and universities.",
    tags: ["teachers", "certified", "staff", "faculty", "colleges", "universities", "accepted"],
  },
  {
    id: "non-discriminatory-policy",
    title: "Non-Discriminatory Policy",
    section: "Policies",
    href: "/policies",
    content:
      "Rise Preparatory Academy admits students of any race, color, national and ethnic origin to all the rights, privileges, programs, and activities generally accorded or made available to students at the school. It does not discriminate on the basis of race, color, national and ethnic origin in administration of its educational policies, admissions policies, scholarship and loan programs, and athletic and other school-administered programs. RPA is committed to providing a learning environment free from discrimination and harassment. All students, staff, and faculty are entitled to a respectful and inclusive environment regardless of race, color, religion, gender, gender identity or expression, sexual orientation, national origin, genetics, disability, age, or veteran status. Complaints should be reported to school administration promptly.",
    tags: ["policy", "discrimination", "non-discriminatory", "race", "color", "ethnicity", "harassment", "inclusive"],
  },
];
