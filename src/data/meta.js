import { PROJECTS } from "./projects.js";
// Single source of truth for identity, links and SEO.
// Update SITE_URL once the portfolio is deployed (used for canonical + OpenGraph).

export const SITE_URL = "https://mohammed-imad.vercel.app";

export const PROFILE = {
  name: "Mohammed Imad Thotan",
  headline: "Business Data Analyst",
  location: "Dubai, UAE",
  availability: "Available now · Analyst, front-end and Next.js roles in the UAE",
  availabilityShort: "Open to work",
  intro:
    "I turn raw data into decision-ready insight with SQL, Python and Power BI, backed by a year as Technical Lead – Software Developer at Qlovix. Based in Dubai.",
  // The one-breath version, revealed word by word on the home page.
  statement:
    "I turn raw data into decisions people can act on. SQL, Python and Power BI for the analysis. A year leading software delivery for the tools that ship it.",
  // Phase 2: set to { src, alt, width, height } to place a portrait in the hero.
  portrait: null,
  bio: [
    "Business Data Analyst based in Dubai. I turn raw data into decision-ready insight using SQL, Python, and Power BI/Tableau, with a track record of building dashboards, automating reporting workflows, and delivering data-driven recommendations to operations and leadership teams across analytics, finance, and business operations settings. My foundation is statistical analysis, requirements gathering, and stakeholder communication: translating a business question into clear, actionable analysis.",
    "That analytical depth is backed by a year of real software delivery. As Technical Lead – Software Developer at Qlovix I led the development team across 3+ concurrent client engagements (React, Next.js, Node.js), owning architecture and acting as the technical point of contact for client stakeholders. That means closer collaboration with engineering and faster prototyping of data products. I bring a builder's mindset, shown through an AI-enabled venture seed funded by Aspire Institute, run live in market and delivered to Aspire Institute, and I'm comfortable working independently in fast-paced, ambiguous environments.",
  ],
  principles: [
    { l: "Hypothesis-Driven Analysis", d: "Translate business questions into structured, testable analysis, and say clearly what the data does and doesn't support" },
    { l: "Stakeholder Communication", d: "Requirements gathering up front; executive-ready dashboards, reports and presentations at the end" },
    { l: "Builder's Mindset", d: "Automate the recurring work and ship the data product, from Python reporting pipelines to full-stack apps and AI agents" },
  ],
  seeking:
    "Open to analyst, front-end and Next.js software roles in the UAE. Based in Dubai and available to start. Let's talk about what your team needs.",
  // The roles I'm open to, shown on the home page and the contact page.
  roles: [
    { title: "Business / Data Analyst", detail: "Business Analyst, Data Analyst and BI roles", tools: "SQL · Python · Power BI · Tableau" },
    { title: "Front-end Developer", detail: "Interfaces, dashboards and design systems", tools: "React · Next.js · JavaScript · CSS" },
    { title: "SaaS Software Developer", detail: "Next.js products, from architecture to deployment", tools: "Next.js · Node.js · REST APIs · SQL" },
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
  version: "2026-10-21",
  get href() {
    return `${this.path}?v=${this.version}`;
  },
  fileName: "Mohammed-Imad-Thotan-Resume.pdf",
  updated: "Oct 2026",
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
  { project: "meridian", metric: 0 },
  { project: "play-store", metric: 0 },
  { project: "superstore", metric: 0, wide: true },
  { exp: "Qlovix" },
  { project: "ivo", metric: 0, wide: true },
];

export const STATS = [
  { v: 1, s: " yr", l: "Technical Lead", d: "Software development at Qlovix, 3+ client engagements" },
  { v: 70, s: "%", l: "Less report prep", d: "~8 hrs/week saved via Python automation" },
  { v: 5, s: "", l: "Roles", d: "Tech lead + 4 internships across analytics, engineering, ops & finance" },
  { v: PROJECTS.length, s: "", l: "Projects", d: "Analytics, BI, AI apps and ventures" },
];
