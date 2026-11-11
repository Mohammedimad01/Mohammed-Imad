import { PROJECTS } from "./projects.js";
// Single source of truth for identity, links and SEO.
// Update SITE_URL once the portfolio is deployed (used for canonical + OpenGraph).

export const SITE_URL = "https://mohammed-imad.vercel.app";

export const PROFILE = {
  name: "Mohammed Imad Thotan",
  headline: "Business Technology Analyst",
  location: "Dubai, UAE",
  availability: "Available now · Business, data and analytics roles in the UAE",
  availabilityShort: "Open to work",
  availabilityHero: "Available immediately · Open to work",
  intro:
    "I bridge business and technology to implement AI, improve processes and turn data into decisions, backed by a year of software delivery at Qlovix, where I was promoted to Technical Lead. Based in Dubai.",
  // The one-breath version, revealed word by word on the home page.
  statement:
    "I bridge business and technology. Requirements and process to frame the problem. SQL, Python and AI to solve it. A year in software delivery to ship it.",
  // Phase 2: set to { src, alt, width, height } to place a portrait in the hero.
  portrait: null,
  bio: [
    "Business Technology Analyst based in Dubai. I bridge business and technology to implement AI, improve processes and turn data into decisions. I gather requirements, map how the work really runs, and translate it into KPIs, user stories and UAT test cases, then use SQL, Python and Power BI to show what the data supports. At Meknoid Solutions I mapped manual reporting processes and automated them in Python, cutting preparation time by about 70%.",
    "That analysis is backed by a year of real software delivery at Qlovix. I joined as a Software Developer building client applications in React, Next.js and Node.js, and was promoted to Technical Lead – Software Developer in June 2026, leading a 4-developer team from requirements to production across 3+ concurrent client engagements as the point of contact for client stakeholders. I also ship AI tools with checks a business can trust, from verifying every AI-generated number in Analyst IQ to enforcing no-diagnosis safety rules in Ivo. I bring a builder's mindset, shown through an AI-enabled venture seed funded by Aspire Institute, run live in market and delivered to Aspire Institute, and I'm comfortable working independently in fast-paced, ambiguous environments.",
  ],
  principles: [
    { l: "Business–Technology Translation", d: "Turn business questions into requirements, KPIs, user stories and UAT test cases a delivery team can build against" },
    { l: "Process Improvement", d: "Map how the work actually runs, find the bottleneck, then standardise it or automate it" },
    { l: "Trustworthy AI Implementation", d: "Put AI into real workflows with validation and guardrails, so every output can be checked against its source" },
  ],
  seeking:
    "Open to Business Technology Analyst, Business Analyst, Data Analyst and analytics roles in the UAE. Based in Dubai and available to start. Let's talk about what your team needs.",
  // The roles I'm open to, shown on the home page and the contact page.
  roles: [
    { title: "Business Technology Analyst", detail: "Bridging business and technology through AI implementation and process improvement", tools: "AI Implementation · Process Mapping · SQL · Python" },
    { title: "Business Analyst", detail: "Requirements, user stories, UAT and stakeholder management", tools: "Requirements · User Stories · UAT · JIRA" },
    { title: "Data Analyst", detail: "Data cleaning, analysis, dashboards and reporting automation", tools: "SQL · Python · Power BI · Tableau" },
    { title: "Business Data Analyst", detail: "KPIs and analysis that answer the business question", tools: "KPI Development · SQL · Excel · Power BI" },
    { title: "Analytics Consultant", detail: "Turning client questions into findings and recommendations", tools: "Statistical Analysis · Market Research · Power BI" },
    { title: "Analytics Developer", detail: "Data pipelines, BI models and analytics applications", tools: "ETL · PostgreSQL · DAX · Python" },
  ],
};

export const CONTACT = {
  email: "mohammedimad031@gmail.com",
  phone: "+971 54 125 6623",
  phoneHref: "tel:+971541256623",
  linkedin: "https://www.linkedin.com/in/mohammed-imad-68b036330",
  linkedinHandle: "Mohammed Imad",
  github: "https://github.com/Mohammedimad01",
  githubHandle: "Mohammedimad01",
};

// The PDF lives at /public/resume/. Replace the file to update it, and bump
// `version` so browsers fetch the new copy instead of a cached one.
const RESUME_FILE = "/resume/Mohammed-Imad-Thotan-Resume.pdf";
export const RESUME = {
  path: RESUME_FILE,
  version: "2026-11-09",
  get href() {
    return `${this.path}?v=${this.version}`;
  },
  fileName: "Mohammed-Imad-Thotan-Resume.pdf",
  updated: "Nov 2026",
};

// Optional: set VITE_WEB3FORMS_KEY in a .env file to deliver the contact form
// straight to your inbox (free key at web3forms.com). Without it the form
// falls back to opening a pre-filled email.
export const FORM_ENDPOINT = "https://api.web3forms.com/submit";

// Home "Highlights" bento: each tile points at a metric that already lives in
// experience.js or projects.js, so the numbers can't drift. `wide` spans two
// columns; keep the spans summing to whole rows of three.
export const HIGHLIGHTS = [
  { exp: "Meknoid Solutions Pvt. Ltd", wide: true },
  { project: "analyst-iq", metric: 0 },
  { project: "play-store", metric: 0 },
  { project: "superstore", metric: 0, wide: true },
  { exp: "Qlovix" },
  { project: "ivo", metric: 0, wide: true },
];

export const STATS = [
  { v: 1, s: " yr", l: "At Qlovix", d: "Software Developer, promoted to Technical Lead in Jun 2026" },
  { v: 70, s: "%", l: "Less report prep", d: "~8 hrs/week saved via Python automation" },
  { v: 6, s: "", l: "Roles", d: "Developer, tech lead + 4 internships across analytics, engineering, ops & finance" },
  { v: PROJECTS.length, s: "", l: "Projects", d: "Analytics, BI, AI apps and ventures" },
];
