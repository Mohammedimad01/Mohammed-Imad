// Site map: one entry per page, in navigation order. Drives the navbar, the
// router, prev/next links, per-page <head> tags and the sitemap.
// Titles ≈50–60 chars, descriptions ≈140–160 (see src/seo/site.js).

export const PAGES = [
  {
    id: "home",
    path: "/",
    label: "Home",
    title: "Mohammed Imad Thotan | Business Technology Analyst, Dubai",
    description:
      "Mohammed Imad Thotan is a Business Technology Analyst in Dubai, UAE: AI implementation, process improvement, SQL, Python and Power BI. Case studies and résumé.",
  },
  {
    id: "experience",
    path: "/experience/",
    label: "Experience",
    title: "Experience | Mohammed Imad Thotan, Business Technology Analyst",
    description:
      "Experience of Mohammed Imad Thotan: Technical Lead – Software Developer at Qlovix, Data Analyst Intern at Meknoid Solutions, plus engineering, operations and finance internships.",
  },
  {
    id: "work",
    path: "/work/",
    label: "Work",
    title: "Case Studies | Mohammed Imad Thotan, Business Technology Analyst",
    description:
      "Eleven case studies by Mohammed Imad Thotan: retail analytics, BI dashboards and statistical analysis first, then AI apps, machine learning and ventures.",
  },
  {
    id: "skills",
    path: "/skills/",
    label: "Skills",
    title: "Skills: SQL, Python, Power BI | Mohammed Imad Thotan",
    description:
      "Skills of Mohammed Imad Thotan: requirements, process improvement and AI implementation, plus SQL, Python, Power BI, Tableau, BigQuery, React and Next.js.",
  },
  {
    id: "education",
    path: "/education/",
    label: "Education",
    title: "Education & Certifications | Mohammed Imad Thotan",
    description:
      "Mohammed Imad Thotan holds a BBA in Business Analytics from MAHE (GPA 8.9/10), plus the Aspire Young Leaders Program, awards and five analytics certifications.",
  },
  {
    id: "contact",
    path: "/contact/",
    label: "Contact",
    title: "Contact | Mohammed Imad Thotan, Business Technology Analyst",
    description:
      "Contact Mohammed Imad Thotan, Business Technology Analyst in Dubai: email, phone, LinkedIn or the message form. Open to business, data and analytics roles.",
  },
];

export const NOT_FOUND = {
  id: "notfound",
  path: "/404/",
  label: "Not found",
  title: "Page not found | Mohammed Imad Thotan",
  description: "This page doesn't exist. Head back to the portfolio of Mohammed Imad Thotan, Business Technology Analyst in Dubai.",
};

// Case studies featured on the home page.
export const FEATURED_PROJECTS = ["analyst-iq", "superstore", "play-store", "ivo"];
