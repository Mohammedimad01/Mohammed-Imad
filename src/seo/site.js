// Search metadata built from src/data, shared by the app (client-side head
// updates) and scripts/prerender.mjs (static HTML, sitemap, robots, llms.txt).
// Plain JS with no React or DOM so Node can import it directly.

import { SITE_URL, PROFILE, CONTACT, RESUME } from "../data/meta.js";
import { PROJECTS } from "../data/projects.js";
import { EXPERIENCE } from "../data/experience.js";
import { EDUCATION, ACHIEVEMENTS } from "../data/achievements.js";
import { SKILL_TABS } from "../data/skills.js";
import { FAQ } from "../data/faq.js";

export const SITE = SITE_URL.replace(/\/$/, "");
export const OG_IMAGE = `${SITE}/og-image.png`;
const PERSON_ID = `${SITE}/#person`;
const WEBSITE_ID = `${SITE}/#website`;

export const projectPath = (id) => `/work/${id}/`;
export const projectIdFromPath = (path = "/") => {
  const m = /^\/work\/([a-z0-9-]+)\/?$/.exec(path);
  return m && PROJECTS.some((p) => p.id === m[1]) ? m[1] : null;
};

const clip = (s, max = 158) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "") + "…";
};

// ── Per-page head ──────────────────────────────────────────────────────────

export function pageMeta(projectId) {
  const p = projectId && PROJECTS.find((x) => x.id === projectId);
  if (!p) {
    return {
      path: "/",
      title: `${PROFILE.name} | Business / Data Analyst, Dubai`,
      description:
        "Mohammed Imad Thotan is a Business / Data Analyst in Dubai, UAE: SQL, Python, Power BI and Tableau, plus full-stack and AI delivery. Case studies and résumé.",
      ogType: "profile",
    };
  }
  const short = p.shortName || p.name;
  return {
    path: projectPath(p.id),
    title: `${short} case study | ${PROFILE.name}`,
    description: clip(`${p.summary} ${p.metrics.map((m) => `${m.v} ${m.l}`).slice(0, 2).join("; ")}. A case study by ${PROFILE.name}.`),
    ogType: "article",
  };
}

// ── Structured data ────────────────────────────────────────────────────────

const allSkills = [...new Set(SKILL_TABS.flatMap((t) => t.skills || []))];

function person() {
  const [degree, , school] = EDUCATION;
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PROFILE.name,
    alternateName: "Mohammed Imad",
    givenName: "Mohammed Imad",
    familyName: "Thotan",
    jobTitle: "Business / Data Analyst",
    description: FAQ[0].a,
    url: `${SITE}/`,
    image: OG_IMAGE,
    email: `mailto:${CONTACT.email}`,
    telephone: CONTACT.phone.replace(/\s/g, ""),
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    hasOccupation: {
      "@type": "Occupation",
      name: "Business / Data Analyst",
      occupationLocation: { "@type": "City", name: "Dubai" },
      skills: allSkills.slice(0, 14).join(", "),
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Manipal Academy of Higher Education", alternateName: "MAHE" },
      { "@type": "EducationalOrganization", name: school.school },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: degree.degree,
      credentialCategory: "degree",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "Manipal Academy of Higher Education" },
    },
    award: ACHIEVEMENTS.filter((a) => a.kind === "Award").map((a) => a.title),
    memberOf: [
      { "@type": "Organization", name: "AIESEC Manipal" },
      { "@type": "ProgramMembership", programName: "Aspire Young Leaders Program, Cohort 1", hostingOrganization: { "@type": "Organization", name: "Aspire Institute" } },
    ],
    knowsAbout: allSkills,
    sameAs: [CONTACT.linkedin, CONTACT.github],
  };
}

const website = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE}/`,
  name: PROFILE.name,
  alternateName: "Mohammed Imad Portfolio",
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
});

const caseStudy = (p) => ({
  "@type": "CreativeWork",
  "@id": `${SITE}${projectPath(p.id)}#case-study`,
  name: p.name,
  headline: p.name,
  url: `${SITE}${projectPath(p.id)}`,
  description: p.summary,
  genre: p.type,
  keywords: p.tools.join(", "),
  creator: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
  inLanguage: "en",
});

export function jsonLd(projectId, { dateModified } = {}) {
  const p = projectId && PROJECTS.find((x) => x.id === projectId);
  if (p) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        website(),
        person(),
        {
          ...caseStudy(p),
          abstract: p.problem,
          text: `${p.problem} ${p.approach} ${p.impact}`,
          about: p.metrics.map((m) => `${m.v} ${m.l}`),
          isPartOf: { "@id": WEBSITE_ID },
          ...(dateModified && { dateModified }),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Case studies", item: `${SITE}/#projects` },
            { "@type": "ListItem", position: 3, name: p.name },
          ],
        },
      ],
    };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(),
      {
        "@type": "ProfilePage",
        "@id": `${SITE}/#profile`,
        url: `${SITE}/`,
        name: pageMeta().title,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        ...(dateModified && { dateModified }),
      },
      person(),
      {
        "@type": "ItemList",
        "@id": `${SITE}/#case-studies`,
        name: `Case studies by ${PROFILE.name}`,
        itemListElement: PROJECTS.map((x, i) => ({ "@type": "ListItem", position: i + 1, item: caseStudy(x) })),
      },
      {
        // No FAQ rich result since May 2026, but the Q&A mirrors the visible
        // "Quick answers" section and helps engines map questions to answers.
        "@type": "FAQPage",
        "@id": `${SITE}/#faq`,
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}

// ── Crawl files ────────────────────────────────────────────────────────────

export const ROUTES = ["/", ...PROJECTS.map((p) => projectPath(p.id))];

export const sitemapXml = (lastmod) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>${SITE}${r}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;

// Visibility is the goal, so every crawler (search, AI search and AI
// training) is welcome. To opt out of model training while staying citable,
// add a Disallow group for GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot.
export const robotsTxt = () => `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

// llms.txt: an unofficial, low-cost convenience for AI agents. Not a ranking
// factor for Google or any confirmed AI engine.
export const llmsTxt = () => {
  const [current, ...rest] = EXPERIENCE;
  return `# ${PROFILE.name}

> ${FAQ[0].a}

${PROFILE.seeking}

- Location: ${PROFILE.location}
- Email: ${CONTACT.email}
- Phone: ${CONTACT.phone}
- LinkedIn: ${CONTACT.linkedin}
- GitHub: ${CONTACT.github}
- Résumé (PDF): ${SITE}${RESUME.path}

## Experience
- ${current.role}, ${current.co} (${current.period})
${rest.map((e) => `- ${e.role}, ${e.co} (${e.period})`).join("\n")}

## Education
${EDUCATION.map((e) => `- ${e.degree}, ${e.school} (${e.period})${e.grade ? `, ${e.gradeLabel} ${e.grade}` : ""}`).join("\n")}

## Case studies
${PROJECTS.map((p) => `- [${p.name}](${SITE}${projectPath(p.id)}): ${p.summary}`).join("\n")}

## Quick answers
${FAQ.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
};
