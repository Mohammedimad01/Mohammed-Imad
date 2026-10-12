import { PROJECTS } from "./projects.js";
// Single source of truth for identity, links and SEO.
// Update SITE_URL once the portfolio is deployed (used for canonical + OpenGraph).

export const SITE_URL = "https://mohammed-imad.vercel.app";

export const PROFILE = {
  name: "Mohammed Imad Thotan",
  firstName: "Mohammed",
  lastName: "Imad Thotan",
  initials: "MIT",
  headline: "Business Data Analyst",
  disciplines: [
    "Business Data Analyst",
    "SQL · Python · Power BI / Tableau",
    "Data-Driven Problem Solver",
    "Software Development Lead",
    "Strategy & Analytics",
  ],
  location: "Dubai, UAE",
  locationShort: "Dubai, UAE",
  timeZone: "Asia/Dubai",
  tzLabel: "GST",
  mapsUrl: "https://www.google.com/maps/search/Dubai,+UAE",
  availability: "Available now · Business Data Analyst roles in the UAE",
  availabilityShort: "Open to work",
  intro:
    "Business Data Analyst with a year as Technical Lead – Software Developer at Qlovix. I turn raw data into decision-ready insight, and I can build the tools that deliver it.",
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
    "Seeking Business Data Analyst roles in the UAE. Based in Dubai and available to start. Let's talk about what your team needs.",
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

// The PDF lives at /public/resume/. Replace the file to update it.
export const RESUME = {
  path: "/resume/Mohammed-Imad-Thotan-Resume.pdf",
  fileName: "Mohammed-Imad-Thotan-Resume.pdf",
  updated: "Oct 2026",
};

// Optional: set VITE_WEB3FORMS_KEY in a .env file to deliver the contact form
// straight to your inbox (free key at web3forms.com). Without it the form
// falls back to opening a pre-filled email.
export const FORM_ENDPOINT = "https://api.web3forms.com/submit";

export const STATS = [
  { v: 1, s: " yr", l: "Technical Lead", d: "Software development at Qlovix, 3+ client engagements" },
  { v: 70, s: "%", l: "Less report prep", d: "~8 hrs/week saved via Python automation" },
  { v: 5, s: "", l: "Roles", d: "Tech lead + 4 internships across analytics, engineering, ops & finance" },
  { v: PROJECTS.length, s: "", l: "Projects", d: "ML, BI, AI agents and ventures" },
];
