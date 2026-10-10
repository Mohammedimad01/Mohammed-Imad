// Case-study images in public/covers/ (generated from each project's repo):
//   <id>.png          1200×630 share card (Open Graph / Twitter)
//   <id>-visual.webp  the picture alone, shown on the site; sizes below
export const COVER_SIZES = {
  "ai-db-agent": [960, 492],
  "churnsense": [960, 591],
  "ecoflow": [960, 501],
  "expenseaudit": [960, 472],
  "failure-autopsy": [960, 477],
  "ivo": [960, 591],
  "play-store": [960, 592],
  "scm": [960, 464],
  "skillbridge": [960, 502],
  "superstore": [960, 493],
};

const ALT = {
  churnsense: "ChurnSense AI: Power BI executive overview of high-risk customers and churn by contract, with the Streamlit risk-scoring app",
  "play-store": "Google Play Store analytics: executive summary dashboard with average rating, installs, satisfaction index and negative review share",
  superstore: "Superstore Power BI dashboard: sales, profit, discount and regional performance",
  scm: "SCM Analytics Power BI dashboard: sales, profit, shipping status by ship mode, segment profit and a state profit map",
  expenseaudit: "ExpenseAudit AI architecture: deterministic Python rule engines feeding policy, fraud and reporting LLM agents, served by FastAPI",
  ivo: "Ivo AI home screen: ask a health question or jump to Analyze a Report, Check Symptoms, Doctor Prep, Find a Doctor and Health Trends",
  "ai-db-agent": "AI Database Agent: a plain-English question answered with generated SQL, a results table and a chart, grounded in the database schema",
  "failure-autopsy": "Failure Autopsy Engine sample analysis: a rejected grant proposal broken down by root cause and severity, closest successful benchmarks and the top fix",
  skillbridge: "SkillBridge marketplace: verified micro-internships with local businesses in Mangalore and Udupi, and a student's AI match on mobile",
  ecoflow: "EcoFlow investor pitch deck: market sizing, pricing tiers and positioning slides, with the first-place award",
};

export const coverVisual = (id) =>
  COVER_SIZES[id] ? { src: `/covers/${id}-visual.webp`, width: COVER_SIZES[id][0], height: COVER_SIZES[id][1], alt: ALT[id] || "" } : null;
export const coverCard = (id) => (COVER_SIZES[id] ? `/covers/${id}.png` : null);
