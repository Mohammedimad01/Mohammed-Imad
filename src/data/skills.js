// Proficiency scores are self-assessed (0–100). Overview + the Analytics tool
// scores carry over from the previous site; the rest are first estimates;
// tune them to what you'd defend in an interview.

export const SKILL_TABS = [
  {
    id: "overview",
    label: "Overview",
    blurb: "A self-assessed read across the six disciplines I work in.",
    radar: [
      { s: "Data Analytics", v: 92 },
      { s: "Business Strategy", v: 85 },
      { s: "AI / ML", v: 80 },
      { s: "Finance", v: 74 },
      { s: "Engineering", v: 77 },
      { s: "Leadership", v: 82 },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    blurb: "Querying, modelling and telling the story to people who make the call.",
    radar: [
      { s: "Excel", v: 93 },
      { s: "Power BI", v: 90 },
      { s: "Python", v: 88 },
      { s: "SQL", v: 88 },
      { s: "Tableau", v: 83 },
      { s: "R", v: 72 },
    ],
    skills: ["Python", "R", "SAS", "SQL", "Sheets", "Excel", "Power BI", "Tableau", "Fabric Analytics", "Alteryx", "ETL", "Data Visualization", "Colab", "BigQuery", "Looker Studio", "Data Modelling", "Statistical Analysis", "Anomaly Detection", "A/B Testing", "KPI Development"],
  },
  {
    id: "strategy",
    label: "Business Analysis",
    blurb: "Requirements, process and stakeholders: framing the problem before anyone opens a notebook, then presenting the answer so it gets acted on.",
    radar: [
      { s: "Problem Structuring", v: 88 },
      { s: "Market Research", v: 85 },
      { s: "Financial Modelling", v: 78 },
      { s: "Stakeholder Mgmt", v: 84 },
      { s: "Process Improvement", v: 80 },
      { s: "Exec Communication", v: 86 },
    ],
    skills: ["Requirements Gathering", "User Stories", "UAT", "Process Mapping", "Process Improvement", "Workflow Automation", "SOPs", "Agile/Scrum", "JIRA", "Management Consulting", "Financial Modelling", "Commercial Awareness", "Strategic Planning", "Market Research", "Stakeholder Management", "Organisational Performance Analysis", "Change Management", "Business Intelligence", "Hypothesis-Driven Analysis", "Structured Problem-Solving", "PowerPoint", "Structured Storytelling", "Client Communication", "Data-Driven Presentations"],
  },
  {
    id: "ai",
    label: "AI / ML",
    blurb: "Models and agents with the guardrails a business can actually trust, and AI coding tools used to move faster, never in place of judgement.",
    radar: [
      { s: "Machine Learning", v: 82 },
      { s: "Generative AI", v: 84 },
      { s: "Prompt Engineering", v: 86 },
      { s: "NLP / Sentiment", v: 78 },
      { s: "RAG & Agents", v: 80 },
      { s: "Explainability", v: 76 },
    ],
    skills: [
      "GenAI / LLM Integration", "AI Workflow Automation (n8n)", "AI Output Validation", "Voice AI", "MCP", "Prompt Engineering", "NLP / Sentiment Analysis", "Machine Learning", "Generative AI Applications", "API Integration", "Computer Vision",
      "AI-Assisted Development", "Claude Code", "Cursor", "OpenAI Codex", "Google Gemini", "Grok",
    ],
  },
  {
    id: "fullstack",
    label: "Development",
    blurb: "Hands-on React and Next.js from a year of client delivery at Qlovix, first as a developer and then as technical lead, so requirements turn into software that ships.",
    radar: [
      { s: "React", v: 85 },
      { s: "Next.js", v: 82 },
      { s: "TypeScript", v: 76 },
      { s: "Node.js", v: 78 },
      { s: "REST APIs", v: 80 },
      { s: "Git/GitHub", v: 86 },
      { s: "SQL Databases", v: 82 },
    ],
    skills: [
      "React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML/CSS", "Tailwind CSS", "Responsive UI",
      "Component Libraries & Design Systems", "SaaS Development", "Full-Stack Development", "Node.js", "REST APIs",
      "FastAPI", "Docker", "Git/GitHub", "Vite", "GSAP", "Recharts", "TanStack Table", "Vitest", "Streamlit",
      "Netlify", "Vercel", "Database Management", "MySQL", "SQL Server",
    ],
  },
];

export const levelLabel = (v) =>
  v >= 88 ? "Expert" : v >= 80 ? "Advanced" : v >= 70 ? "Proficient" : "Working";
