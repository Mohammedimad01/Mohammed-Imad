import { useState, useEffect, useRef } from "react";
import { Mail, ChevronDown, ArrowRight, Globe, Award, BarChart2, Brain, Briefcase, Code2, Database, Zap, MapPin, TrendingUp, Users, Star, ExternalLink } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

// Brand SVG icons (lucide-react no longer ships brand icons)
const GithubIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
);
const LinkedinIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#04040A;--surface:#0D0D16;--surface2:#12121C;
  --bd:#1A1A28;--bd2:#242436;
  --gold:#C49A3C;--gold-dim:rgba(196,154,60,.1);--gold-glow:rgba(196,154,60,.22);
  --blue:#4E6EF2;--teal:#22D3B8;--violet:#9B7FF7;--rose:#F0648C;
  --t1:#EDECEA;--t2:#7B7A82;--t3:#38373F;
  --ff-d:'Cormorant Garamond',Georgia,serif;
  --ff-b:'DM Sans',system-ui,sans-serif;
  --ff-m:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth}
body,#p-root{background:var(--bg);color:var(--t1);font-family:var(--ff-b);min-height:100vh;overflow-x:hidden;cursor:none}
a,button{cursor:none}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:2px}
.grid-bg{
  position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(26,26,40,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(26,26,40,.35) 1px,transparent 1px);
  background-size:52px 52px;
  -webkit-mask-image:radial-gradient(ellipse 90% 90% at 50% 40%,black 20%,transparent 100%);
  mask-image:radial-gradient(ellipse 90% 90% at 50% 40%,black 20%,transparent 100%);
}
.progress-bar{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--gold),#E8C87A);z-index:200;transition:width .1s linear}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.cursor-blink{animation:blink 1s step-end infinite}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes pulseDot{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(196,154,60,.4)}70%{opacity:.8;box-shadow:0 0 0 6px rgba(196,154,60,0)}}
@keyframes shimmer{0%{background-position:-300% 0}100%{background-position:300% 0}}
.shimmer-card{background:linear-gradient(90deg,transparent 0%,rgba(196,154,60,.04) 50%,transparent 100%);background-size:300% 100%;animation:shimmer 4s linear infinite}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
.reveal.in{opacity:1;transform:none}
.d1{transition-delay:.08s}.d2{transition-delay:.18s}.d3{transition-delay:.28s}.d4{transition-delay:.38s}
.g-text{background:linear-gradient(120deg,#C49A3C 0%,#EAC96A 45%,#C49A3C 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.s-label{font-family:var(--ff-m);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:8px}
.s-label::before{content:'';width:22px;height:1px;background:var(--gold)}
.gc{background:rgba(13,13,22,.82);border:1px solid var(--bd);border-radius:12px;transition:border-color .3s,transform .3s;backdrop-filter:blur(10px)}
.gc:hover{border-color:var(--bd2);transform:translateY(-2px)}
.tag{display:inline-flex;align-items:center;padding:3px 9px;background:rgba(255,255,255,.04);border:1px solid var(--bd);border-radius:4px;font-family:var(--ff-m);font-size:10px;color:var(--t2)}
.btn-p{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:var(--gold);color:#040408;border-radius:6px;font-family:var(--ff-b);font-size:13px;font-weight:500;cursor:none;border:none;text-decoration:none;transition:all .2s}
.btn-p:hover{background:#D4A947;transform:translateY(-1px);box-shadow:0 8px 28px rgba(196,154,60,.28)}
.btn-s{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;background:transparent;color:var(--t1);border-radius:6px;font-family:var(--ff-b);font-size:13px;cursor:none;border:1px solid var(--bd2);text-decoration:none;transition:all .2s}
.btn-s:hover{border-color:var(--gold);color:var(--gold);background:var(--gold-dim)}
.timeline-stem{position:absolute;left:15px;top:30px;bottom:0;width:1px;background:linear-gradient(to bottom,var(--bd2),transparent)}
.cursor-dot{position:fixed;pointer-events:none;z-index:9999;width:6px;height:6px;background:var(--gold);border-radius:50%;transition:transform .08s ease,background .2s,width .2s,height .2s}
.cursor-ring{position:fixed;pointer-events:none;z-index:9998;width:32px;height:32px;border:1.5px solid rgba(196,154,60,.35);border-radius:50%;transition:width .22s ease,height .22s ease,border-color .22s,background .22s}
.cursor-ring.hovering{width:48px;height:48px;border-color:rgba(196,154,60,.75);background:rgba(196,154,60,.06)}
.cursor-dot.hovering{width:4px;height:4px;background:#E8C87A}

/* ── Responsive layout helpers ─────────────────────────────────────────────── */
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.grid-2-tight{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.grid-bio{display:grid;grid-template-columns:1fr 1fr;gap:64px}
.sec-pad{padding:120px 32px}
.sec-pad-hero{padding:0 32px}
.cert-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.exp-wrap{position:relative;padding-left:44px}

/* Hamburger nav */
.nav-links{display:flex;gap:36px}
.nav-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px}
.nav-hamburger span{display:block;width:22px;height:1.5px;background:var(--t2);border-radius:2px;transition:all .3s}
.nav-mobile{display:none;position:fixed;inset:0;top:64px;background:rgba(4,4,10,.98);backdrop-filter:blur(20px);z-index:99;flex-direction:column;align-items:center;justify-content:center;gap:36px;border-top:1px solid var(--bd)}
.nav-mobile.open{display:flex}
.nav-mobile button{font-family:var(--ff-m);font-size:16px;letter-spacing:.1em;color:var(--t2);background:none;border:none;padding:8px 0;transition:color .2s;cursor:pointer}
.nav-mobile button:hover{color:var(--gold)}

@media(max-width:768px){
  body,#p-root{cursor:auto}
  a,button{cursor:auto}
  .cursor-dot,.cursor-ring{display:none}
  .nav-links{display:none}
  .nav-hamburger{display:flex}
  .sec-pad{padding:80px 20px}
  .sec-pad-hero{padding:0 20px}
  .grid-4{grid-template-columns:repeat(2,1fr)}
  .grid-2{grid-template-columns:1fr}
  .grid-2-tight{grid-template-columns:1fr}
  .grid-bio{grid-template-columns:1fr;gap:36px}
  .cert-grid{grid-template-columns:repeat(2,1fr)}
  .exp-wrap{padding-left:36px}
  .contact-card{padding:20px 18px !important}
}
@media(max-width:480px){
  .sec-pad{padding:64px 16px}
  .sec-pad-hero{padding:0 16px}
  .grid-4{grid-template-columns:repeat(2,1fr);gap:10px}
  .cert-grid{grid-template-columns:1fr}
  .grid-2{grid-template-columns:1fr}
  .grid-2-tight{grid-template-columns:1fr}
  .grid-bio{grid-template-columns:1fr;gap:28px}
  .exp-wrap{padding-left:28px}
}
`;

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const openLink = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];
const TITLES = ["Business / Data Analyt", "Aspiring Management Consultant", "Data-Driven Problem Solver", "Full Stack Developer", "Strategy & Analytics Enthusiast"];

const STATS = [
  { v: 8.9, s: "/10", l: "CGPA", d: "Academic Excellence" },
  { v: 4, s: "+", l: "Internships", d: "Industry Experience" },
  { v: 8, s: "+", l: "Projects", d: "Innovation Work" },
  { v: 10, s: "+", l: "Certifications", d: "Professional Credentials" },
];

const EXP = [
  {
    role: "Technical Lead – Web Development", co: "Qlovix", period: "Sep 2025 – Present", type: "Leadership & Engineering", col: "#F0648C",
    pts: ["Lead technical direction and architecture decisions for the web development team, overseeing project execution from client requirements through production deployment across 3+ concurrent engagements",
      "Manage and mentor a team of developers, conducting code reviews and setting engineering standards across React.js, Next.js, and Node.js codebases",
      "Own technical stack and architecture strategy, evaluating and selecting frameworks and tools to balance performance, scalability, and delivery speed",
      "Scaled development process into a formal team-wide framework — reusable UI component libraries, structured planning-to-deployment workflows, and QA checkpoints",
      "Serve as primary technical point of contact for client stakeholders, translating business requirements into technical specifications and managing delivery timelines"],
    tools: ["React.js", "Next.js", "Node.js", "Team Leadership", "Technical Architecture", "Client Management"]
  },
  {
    role: "Data Analyst Intern", co: "Meknoid Solutions Pvt. Ltd", period: "Jul – Aug 2025", type: "Analytics", col: "#C49A3C",
    pts: ["Built 10+ Power BI & Excel dashboards, cutting time-to-insight for operations leadership",
      "Automated recurring reporting workflows via Python, eliminating manual effort firm-wide",
      "Engineered SQL pipelines serving cross-functional data needs across 4+ business teams"],
    tools: ["Power BI", "Python", "SQL", "Excel", "Data Storytelling"]
  },
  {
    role: "Full Stack Web Developer Intern", co: "Zephyr Technologies", period: "Jun – Jul 2025", type: "Engineering", col: "#9B7FF7",
    pts: ["Built responsive web applications supporting digital transformation initiatives",
      "Implemented Git-based version control reducing deployment errors across distributed sprints"],
    tools: ["React", "Node.js", "Git", "REST APIs"]
  },
  {
    role: "Business Operations & Project Management Intern", co: "Rainbow Pipes", period: "Apr – May 2025", type: "Strategy & Ops", col: "#4E6EF2",
    pts: ["Analyzed production, sales & supply-chain data to pinpoint operational bottlenecks",
      "Coordinated cross-functional teams across 3+ departments for on-time milestone delivery",
      "Designed executive reports translating supply-chain analytics into strategic recommendations"],
    tools: ["Excel", "PowerPoint", "Operations Analytics", "Stakeholder Management"]
  },
  {
    role: "Finance Intern", co: "Manipal Academy of Higher Education", period: "Mar 2025", type: "Finance", col: "#22D3B8",
    pts: ["Built financial models for variance analysis and multi-period budget forecasting",
      "Translated financial data into strategic recommendations aligned with institutional priorities"],
    tools: ["Excel", "Financial Modeling", "Variance Analysis", "Forecasting"]
  },
];

const PROJECTS = [
  {
    name: "SkillBridge", tag: "Founder & Product Lead · Aspire Institute Seed Fund", type: "Venture · AI-Enabled Platform", Icon: TrendingUp, col: "#21C2DB",
    problem: "College students lack access to verified, structured work experience, creating a structural employability gap before graduation.",
    approach: "Founded an AI-enabled platform connecting students with local businesses for verified micro-internships. Pitched full business model, scalability strategy & roadmap to Aspire Institute evaluators.",
    impact: "Selected for the Aspire Institute Seed Fund Program. Developed multi-stakeholder growth strategy with college partnerships, business subscription tiers, and workforce development initiatives.",
    tools: ["Venture Building", "Financial Modeling", "AI Product Design", "Market Research", "Growth Strategy"], status: "🌱 To be Seed Funded"
  },
  {
    name: "ChurnSense AI", tag: "End-to-end ML churn prediction & BI platform", type: "Machine Learning · Business Intelligence", Icon: Brain, col: "#C49A3C",
    problem: "Businesses can't identify at-risk customers before churn occurs — causing preventable revenue loss without structured early-warning analytics.",
    approach: "Trained Logistic Regression, Random Forest & XGBoost on IBM Telco dataset (7,000+ records), achieving ROC-AUC > 0.85. Applied SHAP explainability to surface key churn drivers; built 12+ SQL queries for segmentation & revenue leakage analysis.",
    impact: "Power BI dashboard + Streamlit app for real-time risk scoring. Identified contract type, tenure & monthly charges as top churn drivers — enabling targeted CRM retention strategy.",
    tools: ["Python", "XGBoost", "SHAP", "SQL", "Power BI", "Streamlit", "scikit-learn"], status: "Completed · Jan–May 2026"
  },
  {
    name: "EcoFlow", tag: "1st Place — Entrepreneurship & Product Innovation Challenge", type: "Business Strategy · Venture Design", Icon: Award, col: "#4E6EF2",
    problem: "Develop a full business concept under competitive evaluation by faculty and industry stakeholders.",
    approach: "Applied end-to-end consulting framework: market research, pricing, brand positioning, growth strategy, investor pitch.",
    impact: "1st place finish. Demonstrated structured strategic planning and executive-level communication at a competitive challenge.",
    tools: ["Business Strategy", "Market Research", "Financial Modeling", "Executive Pitching"], status: "🏆 1st Place"
  },
  {
    name: "Failure Autopsy Engine", tag: "AI diagnostic platform for root-cause analysis", type: "AI Engineering · Cloud Architecture", Icon: Zap, col: "#22D3B8",
    problem: "Application failures lack structured root-cause analysis, causing prolonged downtime and repeated incidents.",
    approach: "Architected AI diagnostic system using semantic embeddings + FAISS vector search for scalable cloud deployment on AWS.",
    impact: "Structured decision-support platform enabling faster root-cause identification — built for AWS AI for Bharat Hackathon 2026.",
    tools: ["Python", "FAISS", "Semantic Embeddings", "AWS", "Vector Search"], status: "Hackathon · 2026"
  },
  {
    name: "AI Database Agent", tag: "Natural language → SQL via Azure OpenAI", type: "Conversational AI · Data Engineering", Icon: Database, col: "#F0648C",
    problem: "Non-technical stakeholders can't self-serve data retrieval, creating bottlenecks in analytics workflows.",
    approach: "Built conversational AI using Azure OpenAI, RAG pipelines, and function calling to convert natural language into executable SQL.",
    impact: "Self-serve data retrieval for business users, automating analytics workflows previously requiring data team intervention.",
    tools: ["Azure OpenAI", "LangChain", "RAG", "SQL", "Python"], status: "Completed"
  },
  {
    name: "Google Play Store Product Intelligence Platform",
    tag: "End-to-end analytics pipeline · 10,841 apps, 64,296 reviews",
    type: "Data Analytics · Statistical Testing · NLP", Icon: BarChart2, col: "#4E6EF2",
    problem: "Businesses assumed app metadata (category, size, price) drove user ratings — but without statistical validation, that assumption could misdirect product investment entirely.",
    approach: "Built a full pipeline from data cleaning through statistical testing to two live BI dashboards. Wrote 25 production-quality SQL queries in BigQuery (window functions: RANK, LAG/LEAD, running totals). Built a VADER-based sentiment pipeline validated at 76.3% agreement against an independent labeling method.",
    impact: "Found app metadata explains <1% of rating variance (R²=0.008) — reframing the core business question toward review-text sentiment. Identified a 36% negative-review rate in the platform's largest app category. Delivered 3 prioritized, quantified recommendations in a written report and stakeholder presentation.",
    tools: ["Python", "SQL", "BigQuery", "Power BI", "Looker Studio", "Statistics", "NLP"],
    status: "Jul 2026",
  },
  {
    name: "ExpenseAudit AI",
    tag: "Multi-agent AI system · Kaggle x Google AI Agents Capstone 2026",
    type: "AI Engineering · Multi-Agent Systems", Icon: Zap, col: "#9B7FF7",
    problem: "Expense auditing needs dollar-accurate, auditable decisions — but rule-based systems alone can't interpret policy language or describe fraud patterns the way LLMs can.",
    approach: "Architected a multi-agent platform using Google ADK and Gemini 2.0 Flash, orchestrating 3 specialized LLM agents (policy compliance, fraud detection, executive reporting) through a Sequential Agent pipeline. Built deterministic Python rule engines for spend-policy limits and fraud pattern detection (duplicate submissions, split transactions, statistical outliers) — ensuring every dollar decision came from tested code, not LLM inference.",
    impact: "Deployed as a FastAPI service with Docker containerization and 89 automated tests. Integrated Google Drive export via a custom MCP Toolset for finance-ready reporting.",
    tools: ["Google ADK", "Gemini 2.0 Flash", "Python", "FastAPI", "Docker", "MCP"],
    status: "Kaggle × Google Capstone 2026",
  },
  {
    name: "Superstore Sales & Profit Performance Dashboard",
    tag: "Power BI dashboard · 5,000+ orders, $2.3M in sales",
    type: "Business Intelligence · Power BI", Icon: Database, col: "#22D3B8",
    problem: "Topline sales growth was masking where profit was actually leaking across product categories and regions.",
    approach: "Built an interactive Power BI dashboard analyzing 5,000+ orders and $2.3M in sales from the Superstore retail dataset, using DAX measures to surface KPIs across sales, profit, discount, and regional performance.",
    impact: "Identified profit leakage from over-discounting on low-margin Furniture products and surfaced regional performance gaps — translated into data-driven recommendations on category focus and discount strategy.",
    tools: ["Power BI", "DAX", "Data Visualization"],
    status: "Completed",
  },
];

const SKILL_CATS = [
  { l: "Analytics & Data", Icon: BarChart2, col: "#C49A3C", skills: ["Python", "SQL", "R", "Power BI", "Tableau", "Excel", "SAS", "Data Visualization", "Data Storytelling", "Predictive Analytics", "Sheets", "Fabric Analytics", "Colab", "BigQuery", "Data Studio"] },
  { l: "AI & Technology", Icon: Brain, col: "#4E6EF2", skills: ["Prompt Engineering", "Generative AI", "Machine Learning", "NLP / Sentiment Analysis", "API Integration", "AI-assisted Analytics", "Agile/Scrum", "JIRA"] },
  { l: "Business & Consulting", Icon: Briefcase, col: "#22D3B8", skills: ["Business Requirement Analysis", "Market Research", "Strategic Planning", "Stakeholder Management", "Hypothesis Analysis", "Process Improvement", "Financial Modelling", "Business Insights Generation", "Management Consulting", "Commercial Awareness", "Organisational Performance Analysis", "Change Management"] },
  { l: "Engineering", Icon: Code2, col: "#9B7FF7", skills: ["React", "Node.js", "Next.js", "Git/GitHub", "REST APIs", "HTML/CSS/JS", "Database Management", "MySQL", "SQL Server"] },
];

const CERTS = [
  { n: "Google Data Analytics Professional Certificate", org: "Google", col: "#4E6EF2" },
  { n: "Data Analytics Associate (SQL & Power BI)", org: "Datacamp", col: "#25c25fff" },
  { n: "AI Foundations for Business", org: "Saïd Business School, Oxford", col: "#C49A3C" },
  { n: "Microsoft Power BI Certification", org: "Microsoft", col: "#ca2874ff" },
  { n: "Oracle OCI Data Science & AI", org: "Oracle", col: "#9B7FF7" },
];

const RADAR_DATA = [
  { s: "Data Analytics", v: 92 }, { s: "Business Strategy", v: 85 }, { s: "AI/ML", v: 80 },
  { s: "Finance", v: 74 }, { s: "Engineering", v: 77 }, { s: "Leadership", v: 82 },
];
const BAR_DATA = [
  { n: "Excel", v: 93 }, { n: "Power BI", v: 90 }, { n: "Python", v: 88 }, { n: "SQL", v: 88 }, { n: "Tableau", v: 83 }, { n: "R", v: 72 },
];
const ACHIEVEMENTS = [
  { Icon: Award, col: "#C49A3C", title: "1st Place — Product Innovation Challenge", sub: "EcoFlow: end-to-end business concept judged by faculty & industry" },
  { Icon: Star, col: "#4E6EF2", title: "Aspire Young Leaders Program, Cohort 1", sub: "Competitive global cohort by Harvard Business School faculty" },
  { Icon: Users, col: "#22D3B8", title: "AIESEC Manipal", sub: "Cross-cultural leadership & international professional development" },
  { Icon: TrendingUp, col: "#9B7FF7", title: "CGPA 8.9/10 — Top Academic Standing", sub: "Manipal Academy of Higher Education (MAHE)" },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function AnimCounter({ target, suffix = "", dur = 1400 }) {
  const [n, setN] = useState(0);
  const [ref, v] = useReveal(.5);
  useEffect(() => {
    if (!v) return;
    let step = 0; const total = 55;
    const t = setInterval(() => {
      step++;
      const p = 1 - Math.pow(1 - step / total, 3);
      const dec = target % 1 !== 0;
      setN(dec ? +(p * target).toFixed(1) : Math.round(p * target));
      if (step >= total) clearInterval(t);
    }, dur / total);
    return () => clearInterval(t);
  }, [v, target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function useTyper(texts, speed = 75, pause = 2200) {
  const [txt, setTxt] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[idx]; let t;
    if (!del && txt === cur) { t = setTimeout(() => setDel(true), pause); }
    else if (del && txt === "") { setDel(false); setIdx((idx + 1) % texts.length); }
    else { t = setTimeout(() => setTxt(del ? txt.slice(0, -1) : cur.slice(0, txt.length + 1)), del ? speed / 2 : speed); }
    return () => clearTimeout(t);
  }, [txt, del, idx]);
  return txt;
}

// ── Custom Cursor ─────────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const hovering = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = (e.clientX - 3) + "px";
        dotRef.current.style.top = (e.clientY - 3) + "px";
      }
    };

    const animate = () => {
      const dx = mouse.current.x - ring.current.x;
      const dy = mouse.current.y - ring.current.y;
      ring.current.x += dx * 0.11;
      ring.current.y += dy * 0.11;
      if (ringRef.current) {
        const sz = hovering.current ? 48 : 32;
        ringRef.current.style.left = (ring.current.x - sz / 2) + "px";
        ringRef.current.style.top = (ring.current.y - sz / 2) + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onOver = (e) => {
      const el = e.target.closest("a,button,[data-hover]");
      if (el) {
        hovering.current = true;
        dotRef.current && dotRef.current.classList.add("hovering");
        ringRef.current && ringRef.current.classList.add("hovering");
      } else {
        hovering.current = false;
        dotRef.current && dotRef.current.classList.remove("hovering");
        ringRef.current && ringRef.current.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ position: "fixed", top: 0, left: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: "fixed", top: 0, left: 0 }} />
    </>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav({ active }) {
  const [sc, setSc] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const handleNav = (k) => { scrollTo(k.toLowerCase()); setMenuOpen(false); };
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 20px",
        background: sc || menuOpen ? "rgba(4,4,10,.96)" : "transparent",
        backdropFilter: sc || menuOpen ? "blur(20px)" : "none",
        borderBottom: sc || menuOpen ? "1px solid var(--bd)" : "none", transition: "all .3s"
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--ff-m)", fontSize: 12, color: "var(--gold)", letterSpacing: ".12em" }}>
            MIT<span style={{ color: "var(--t3)" }}>.</span>
          </div>
          {/* Desktop nav links */}
          <div className="nav-links">
            {NAV_LINKS.map(k => (
              <button key={k}
                onClick={() => scrollTo(k.toLowerCase())}
                style={{
                  fontFamily: "var(--ff-m)", fontSize: 11, letterSpacing: ".07em",
                  color: active === k.toLowerCase() ? "var(--gold)" : "var(--t2)",
                  background: "none", border: "none", padding: 0, transition: "color .2s", cursor: "none"
                }}
                onMouseEnter={e => e.target.style.color = "var(--t1)"}
                onMouseLeave={e => e.target.style.color = active === k.toLowerCase() ? "var(--gold)" : "var(--t2)"}>
                {k}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn-p" style={{ padding: "8px 18px", fontSize: 11 }}
              onClick={() => openLink("mailto:mohammedimad031@gmail.com")}>
              Get in Touch
            </button>
            {/* Hamburger button */}
            <button
              className="nav-hamburger"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(o => !o)}>
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile full-screen menu */}
      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(k => (
          <button key={k}
            onClick={() => handleNav(k)}
            style={{ color: active === k.toLowerCase() ? "var(--gold)" : "var(--t2)" }}>
            {k}
          </button>
        ))}
      </div>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const title = useTyper(TITLES);
  const links = [
    { icon: <Mail size={13} />, label: "Email Address", action: () => openLink("mailto:mohammedimad031@gmail.com") },
    { icon: <Globe size={13} />, label: "LinkedIn", action: () => openLink("https://www.linkedin.com/in/mohammed-imad-68b036330") },
    { icon: <MapPin size={13} />, label: "Karnataka, IN", action: () => openLink("https://www.google.com/maps/search/Udupi,+Karnataka,+IN") },
  ];
  return (
    <section id="hero" className="sec-pad-hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", position: "relative", zIndex: 2
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", width: "100%", paddingTop: 80 }}>
        {/* Status badge */}
        <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", animation: "pulseDot 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t2)", letterSpacing: ".16em", textTransform: "uppercase" }}>
            Available for 2026 Opportunities
          </span>
        </div>
        {/* Name */}
        <h1 style={{
          fontFamily: "var(--ff-d)", fontWeight: 300, fontSize: "clamp(56px,8.5vw,108px)",
          lineHeight: .94, letterSpacing: "-.02em", marginBottom: 28
        }}>
          <span style={{ display: "block", color: "var(--t1)" }}>Mohammed</span>
          <span style={{ display: "block" }} className="g-text">Imad Thotan</span>
        </h1>
        {/* Typewriter */}
        <div style={{ height: 28, marginBottom: 32, display: "flex", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--ff-m)", fontSize: 13, color: "var(--t2)", letterSpacing: ".06em" }}>
            {title}<span className="cursor-blink" style={{ color: "var(--gold)" }}>_</span>
          </span>
        </div>
        {/* Tagline */}
        <p style={{ maxWidth: 600, fontSize: 16, fontWeight: 300, color: "var(--t2)", lineHeight: 1.75, marginBottom: 44, letterSpacing: ".01em" }}>
          Bridging business strategy, data analytics, and emerging technology to deliver measurable impact.
          Business / Data Analyst · CGPA 8.9/10 · MAHE Manipal.
        </p>
        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
          <button className="btn-p" onClick={() => scrollTo("projects")}>
            View Case Studies <ArrowRight size={13} />
          </button>
          <button className="btn-s" onClick={() => scrollTo("contact")}>
            Let's Connect
          </button>
        </div>
        {/* Social links */}
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          {links.map((item, i) => (
            <button key={i}
              onClick={item.action || undefined}
              style={{
                display: "flex", alignItems: "center", gap: 6, color: "var(--t3)",
                background: "none", border: "none", padding: 0, fontFamily: "var(--ff-m)", fontSize: 10,
                letterSpacing: ".06em", transition: "color .2s", cursor: item.action ? "none" : "default"
              }}
              onMouseEnter={e => { if (item.action) e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--t3)"; }}>
              {item.icon}{item.label}
            </button>
          ))}
        </div>
        {/* Scroll hint */}
        <div style={{ marginTop: 72, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, opacity: .35 }}>
          <span style={{ fontFamily: "var(--ff-m)", fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--t2)" }}>Scroll</span>
          <ChevronDown size={13} color="var(--t2)" style={{ animation: "floatY 2.2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function About() {
  const [ref, v] = useReveal(.08);
  return (
    <section id="about" ref={ref} className="sec-pad" style={{ position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className={`reveal ${v ? "in" : ""}`}>
          <div className="s-label" style={{ marginBottom: 16 }}>Executive Profile</div>
          <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(38px,5vw,62px)", fontWeight: 400, lineHeight: 1.06, marginBottom: 52 }}>
            Structured thinking.<br /><em style={{ color: "var(--gold)" }}>Measurable outcomes.</em>
          </h2>
        </div>
        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: 64 }}>
          {STATS.map((s, i) => (
            <div key={i} className={`gc reveal d${i + 1} ${v ? "in" : ""}`}
              style={{ padding: "28px 22px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div className="shimmer-card" style={{ position: "absolute", inset: 0, borderRadius: 12, pointerEvents: "none" }} />
              <div style={{ fontFamily: "var(--ff-d)", fontSize: 50, fontWeight: 300, lineHeight: 1, marginBottom: 6 }} className="g-text">
                <AnimCounter target={parseFloat(s.v)} suffix={s.s} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--t1)", marginBottom: 3 }}>{s.l}</div>
              <div style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t3)", letterSpacing: ".08em" }}>{s.d}</div>
            </div>
          ))}
        </div>
        {/* Bio columns */}
        <div className="grid-bio">
          <div className={`reveal d1 ${v ? "in" : ""}`}>
            <p style={{ fontSize: 15.5, lineHeight: 1.82, color: "var(--t2)", fontWeight: 300, marginBottom: 22 }}>
              Final-year Analytics student at MAHE Manipal, graduating with a 8.9/10 CGPA and a record of turning complex analytical problems into structured, evidence-based strategic recommendations.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.82, color: "var(--t2)", fontWeight: 300 }}>
              Across four internships spanning analytics, operations, finance, and engineering, I've consistently bridged technical outputs and executive decision-making — building dashboards, models, and AI systems that create measurable business impact.
            </p>
          </div>
          <div className={`reveal d2 ${v ? "in" : ""}`}>
            {[
              { l: "Hypothesis-Driven Analysis", d: "Structure ambiguous problems using MECE frameworks and structured problem decomposition" },
              { l: "Cross-Functional Communication", d: "Translate complex analytics into executive-ready narratives and data-driven presentations" },
              { l: "AI + Business Integration", d: "Deploy generative AI, ML pipelines, and automation to solve real business challenges at scale" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 26 }}>
                <div style={{ width: 3, flexShrink: 0, background: "var(--gold)", borderRadius: 2, marginTop: 5 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--t1)", marginBottom: 4 }}>{item.l}</div>
                  <div style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65 }}>{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────

function Experience() {
  const [ref, v] = useReveal(.08);
  return (
    <section id="experience" ref={ref} className="sec-pad" style={{ position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className={`reveal ${v ? "in" : ""}`}>
          <div className="s-label" style={{ marginBottom: 16 }}>Track Record</div>
          <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(38px,5vw,62px)", fontWeight: 400, lineHeight: 1.06, marginBottom: 64 }}>
            Experience<br /><em style={{ color: "var(--gold)" }}>& Internships</em>
          </h2>
        </div>
        <div className="exp-wrap">
          <div className="timeline-stem" />
          {EXP.map((e, i) => (
            <div key={i} className={`reveal d${Math.min(i + 1, 4)} ${v ? "in" : ""}`} style={{ marginBottom: 28, position: "relative" }}>
              <div style={{
                position: "absolute", left: -36, top: 22, width: 14, height: 14, borderRadius: "50%",
                background: e.col, border: "3px solid var(--bg)", boxShadow: `0 0 0 1px ${e.col}50`
              }} />
              <div className="gc" style={{ padding: "26px 30px" }}
                onMouseEnter={el => el.currentTarget.style.borderColor = e.col + "55"}
                onMouseLeave={el => el.currentTarget.style.borderColor = "var(--bd)"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "var(--ff-m)", fontSize: 9, color: e.col, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 5 }}>{e.type}</div>
                    <h3 style={{ fontSize: 17, fontWeight: 500, color: "var(--t1)", marginBottom: 2 }}>{e.role}</h3>
                    <div style={{ fontSize: 13, color: "var(--t2)" }}>{e.co}</div>
                  </div>
                  <span style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t3)", letterSpacing: ".07em", marginTop: 3 }}>{e.period}</span>
                </div>
                <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 14 }}>
                  {e.pts.map((p, j) => (
                    <li key={j} style={{ display: "flex", gap: 9, marginBottom: 7, alignItems: "flex-start" }}>
                      <span style={{ color: e.col, fontSize: 9, marginTop: 5, flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65 }}>{p}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {e.tools.map((t, j) => <span key={j} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function Projects() {
  const [ref, v] = useReveal(.06);
  return (
    <section id="projects" ref={ref} className="sec-pad" style={{ position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className={`reveal ${v ? "in" : ""}`}>
          <div className="s-label" style={{ marginBottom: 16 }}>Case Studies</div>
          <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(38px,5vw,62px)", fontWeight: 400, lineHeight: 1.06, marginBottom: 14 }}>
            Projects as<br /><em style={{ color: "var(--gold)" }}>Business Impact Stories</em>
          </h2>
          <p style={{ fontSize: 14, color: "var(--t2)", marginBottom: 60, maxWidth: 500, lineHeight: 1.7 }}>
            Each case study follows the consulting framework: problem identification → analytical approach → measurable outcomes.
          </p>
        </div>
        <div className="grid-2">
          {PROJECTS.map((p, i) => {
            const Icon = p.Icon;
            return (
              <div key={i} className={`gc reveal d${Math.min(i + 1, 4)} ${v ? "in" : ""}`}
                style={{ padding: "30px", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = p.col + "45"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--bd)"}>
                <div style={{
                  position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%",
                  background: `radial-gradient(circle,${p.col}07 0%,transparent 70%)`, pointerEvents: "none"
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8, background: `${p.col}14`,
                    display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${p.col}22`
                  }}>
                    <Icon size={17} color={p.col} />
                  </div>
                  <span style={{
                    fontFamily: "var(--ff-m)", fontSize: 9, color: p.col, padding: "4px 9px",
                    background: `${p.col}10`, borderRadius: 4, border: `1px solid ${p.col}1C`, letterSpacing: ".05em"
                  }}>
                    {p.status}
                  </span>
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 500, color: "var(--t1)", marginBottom: 3 }}>{p.name}</h3>
                <p style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t3)", marginBottom: 18, letterSpacing: ".07em" }}>{p.type}</p>
                {[
                  { label: "Problem", text: p.problem, col: "#F97066" },
                  { label: "Approach", text: p.approach, col: p.col },
                  { label: "Impact", text: p.impact, col: "#4ADE80" },
                ].map((pillar, j) => (
                  <div key={j} style={{ marginBottom: 13 }}>
                    <div style={{ fontFamily: "var(--ff-m)", fontSize: 9, letterSpacing: ".15em", textTransform: "uppercase", color: pillar.col, marginBottom: 4 }}>{pillar.label}</div>
                    <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.7 }}>{pillar.text}</p>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 18 }}>
                  {p.tools.map((t, j) => <span key={j} className="tag">{t}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Analytics ─────────────────────────────────────────────────────────────────

function Analytics() {
  const [ref, v] = useReveal(.08);
  const CT = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: "var(--surface)", border: "1px solid var(--bd2)", borderRadius: 8, padding: "8px 12px" }}>
        <p style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t2)", marginBottom: 3 }}>{label}</p>
        <p style={{ fontSize: 13, color: "var(--gold)", fontWeight: 500 }}>{payload[0].value}%</p>
      </div>
    );
  };
  return (
    <section className="sec-pad" style={{ position: "relative", zIndex: 2 }}>
      <div ref={ref} style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className={`reveal ${v ? "in" : ""}`}>
          <div className="s-label" style={{ marginBottom: 16 }}>Intelligence Dashboard</div>
          <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(38px,5vw,62px)", fontWeight: 400, lineHeight: 1.06, marginBottom: 64 }}>
            Capability<br /><em style={{ color: "var(--gold)" }}>at a Glance</em>
          </h2>
        </div>
        <div className="grid-2">
          <div className={`gc reveal d1 ${v ? "in" : ""}`} style={{ padding: "30px" }}>
            <div style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t2)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 24 }}>Capability Radar</div>
            <ResponsiveContainer width="100%" height={270}>
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="rgba(255,255,255,.05)" />
                <PolarAngleAxis dataKey="s" tick={{ fill: "#7B7A82", fontSize: 10, fontFamily: "'JetBrains Mono',monospace" }} />
                <Radar dataKey="v" stroke="#C49A3C" fill="#C49A3C" fillOpacity={.1} strokeWidth={1.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className={`gc reveal d2 ${v ? "in" : ""}`} style={{ padding: "30px" }}>
            <div style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t2)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 24 }}>Tool Proficiency</div>
            <ResponsiveContainer width="100%" height={270}>
              <BarChart data={BAR_DATA} layout="vertical" barSize={7}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#38373F", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="n" tick={{ fill: "#7B7A82", fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }} axisLine={false} tickLine={false} width={64} />
                <Tooltip content={<CT />} cursor={{ fill: "rgba(255,255,255,.02)" }} />
                <Bar dataKey="v" radius={[0, 4, 4, 0]}>
                  {BAR_DATA.map((_, i) => (<Cell key={i} fill={i % 2 === 0 ? "#C49A3C" : "#4E6EF2"} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────

function Skills() {
  const [ref, v] = useReveal(.08);
  return (
    <section id="skills" ref={ref} className="sec-pad" style={{ position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className={`reveal ${v ? "in" : ""}`}>
          <div className="s-label" style={{ marginBottom: 16 }}>Capabilities</div>
          <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(38px,5vw,62px)", fontWeight: 400, lineHeight: 1.06, marginBottom: 60 }}>
            Technical &<br /><em style={{ color: "var(--gold)" }}>Business Skills</em>
          </h2>
        </div>
        <div className="grid-2" style={{ marginBottom: 40 }}>
          {SKILL_CATS.map((cat, i) => {
            const Icon = cat.Icon;
            return (
              <div key={i} className={`gc reveal d${i + 1} ${v ? "in" : ""}`} style={{ padding: "26px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 18 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 7, background: `${cat.col}13`,
                    display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${cat.col}20`
                  }}>
                    <Icon size={15} color={cat.col} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--t1)" }}>{cat.l}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cat.skills.map((sk, j) => (
                    <span key={j} style={{
                      padding: "5px 12px", background: `${cat.col}08`, border: `1px solid ${cat.col}1C`,
                      borderRadius: 20, fontSize: 12, color: "var(--t2)", transition: "all .2s", cursor: "none"
                    }}
                      onMouseEnter={e => { e.target.style.background = `${cat.col}18`; e.target.style.color = "var(--t1)"; e.target.style.borderColor = `${cat.col}45`; }}
                      onMouseLeave={e => { e.target.style.background = `${cat.col}08`; e.target.style.color = "var(--t2)"; e.target.style.borderColor = `${cat.col}1C`; }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className={`reveal ${v ? "in" : ""}`}>
          <div style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t2)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18 }}>Certifications</div>
          <div className="cert-grid">
            {CERTS.map((c, i) => (
              <div key={i} className="gc" style={{ padding: "20px" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.col, marginBottom: 10 }} />
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--t1)", lineHeight: 1.4, marginBottom: 6 }}>{c.n}</div>
                <div style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t3)" }}>{c.org}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Achievements ──────────────────────────────────────────────────────────────

function Achievements() {
  const [ref, v] = useReveal(.08);
  return (
    <section className="sec-pad" style={{ position: "relative", zIndex: 2 }}>
      <div ref={ref} style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className={`reveal ${v ? "in" : ""}`}>
          <div className="s-label" style={{ marginBottom: 16 }}>Recognition</div>
          <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(38px,5vw,62px)", fontWeight: 400, lineHeight: 1.06, marginBottom: 56 }}>
            Leadership &<br /><em style={{ color: "var(--gold)" }}>Achievements</em>
          </h2>
        </div>
        <div className="grid-2-tight">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = a.Icon;
            return (
              <div key={i} className={`gc reveal d${i + 1} ${v ? "in" : ""}`}
                style={{ padding: "24px 28px", display: "flex", gap: 16, alignItems: "flex-start" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = a.col + "50"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--bd)"}>
                <div style={{
                  width: 38, height: 38, borderRadius: 7, background: `${a.col}12`, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${a.col}20`
                }}>
                  <Icon size={16} color={a.col} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--t1)", marginBottom: 4 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>{a.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  const [ref, v] = useReveal(.08);
  const CONTACT_LINKS = [
    {
      Icon: Mail,
      label: "Email",
      value: "mohammedimad031@gmail.com",
      href: "mailto:mohammedimad031@gmail.com",
      col: "#C49A3C",
      desc: "Drop me a line anytime",
    },
    {
      Icon: LinkedinIcon,
      label: "LinkedIn",
      value: "Mohammed Imad",
      href: "https://www.linkedin.com/in/mohammed-imad-68b036330",
      col: "#4E6EF2",
      desc: "Let's connect professionally",
    },
    {
      Icon: GithubIcon,
      label: "GitHub",
      value: "Mohammedimad01",
      href: "https://github.com/Mohammedimad01",
      col: "#9B7FF7",
      desc: "Explore my code & projects",
    },
  ];
  return (
    <section id="contact" ref={ref} className="sec-pad" style={{ position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div className={`reveal ${v ? "in" : ""}`}>
          <div className="s-label" style={{ marginBottom: 16 }}>Let's Talk</div>
          <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(38px,5vw,62px)", fontWeight: 400, lineHeight: 1.06, marginBottom: 14 }}>
            Open to<br /><em style={{ color: "var(--gold)" }}>Opportunities</em>
          </h2>
          <p style={{ fontSize: 14, color: "var(--t2)", marginBottom: 44, maxWidth: 460, lineHeight: 1.75 }}>
            Actively seeking roles in strategy consulting, business analytics, and AI-driven decision-making for 2026. Let's explore how I can add value to your team.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {CONTACT_LINKS.map((item, i) => {
            const Icon = item.Icon;
            return (
              <div key={i}
                className={`gc reveal d${i + 1} ${v ? "in" : ""}`}
                style={{ padding: "28px 32px", position: "relative", overflow: "hidden", cursor: "none" }}
                onClick={() => openLink(item.href)}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = item.col + "60";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 12px 40px ${item.col}12`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--bd)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-hover="true">
                {/* Subtle glow behind the icon */}
                <div style={{
                  position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%",
                  background: `radial-gradient(circle,${item.col}08 0%,transparent 70%)`, pointerEvents: "none"
                }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    {/* Icon container */}
                    <div style={{
                      width: 48, height: 48, borderRadius: 10, background: `${item.col}12`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1px solid ${item.col}25`, flexShrink: 0,
                      transition: "background .2s, border-color .2s"
                    }}>
                      <Icon size={22} color={item.col} />
                    </div>
                    {/* Text */}
                    <div>
                      <div style={{
                        fontFamily: "var(--ff-m)", fontSize: 9, letterSpacing: ".14em",
                        textTransform: "uppercase", color: item.col, marginBottom: 4
                      }}>{item.label}</div>
                      <div style={{
                        fontSize: 15, fontWeight: 500, color: "var(--t1)", marginBottom: 2,
                        letterSpacing: ".01em"
                      }}>{item.value}</div>
                      <div style={{ fontSize: 12, color: "var(--t3)", fontWeight: 300 }}>{item.desc}</div>
                    </div>
                  </div>
                  {/* Arrow indicator */}
                  <div style={{
                    width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,.03)",
                    border: "1px solid var(--bd)", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all .2s"
                  }}>
                    <ExternalLink size={14} color="var(--t3)" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--bd)", padding: "28px 32px", position: "relative", zIndex: 2 }}>
      <div style={{
        maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12
      }}>
        <div style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t3)" }}>© 2026 · Mohammed Imad Thotan</div>
        <div style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t3)", letterSpacing: ".07em" }}>Strategy · Analytics · Technology</div>
        <div style={{ fontFamily: "var(--ff-m)", fontSize: 10, color: "var(--t3)" }}>Open to 2026 Roles</div>
      </div>
    </footer>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => { try { document.head.removeChild(style); } catch { } };
  }, []);

  useEffect(() => {
    const handler = () => {
      const doc = document.documentElement;
      const st = doc.scrollTop || document.body.scrollTop;
      const sh = doc.scrollHeight - doc.clientHeight;
      setProgress(sh > 0 ? Math.min(100, (st / sh) * 100) : 0);
      const ids = ["hero", "about", "experience", "projects", "skills", "contact"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 90 && r.bottom > 90) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div id="p-root">
      <CustomCursor />
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="grid-bg" />
      <Nav active={active} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Analytics />
      <Skills />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}
