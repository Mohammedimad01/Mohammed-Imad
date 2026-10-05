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
    skills: ["Python", "R", "SAS", "SQL", "Sheets", "Excel", "Power BI", "Tableau", "Fabric Analytics", "ETL", "Data Visualization", "Colab", "BigQuery", "Looker Studio"],
  },
  {
    id: "fullstack",
    label: "Full Stack",
    blurb: "Shipping the tool, not just the slide, and leading the team that builds it.",
    radar: [
      { s: "React", v: 85 },
      { s: "Next.js", v: 80 },
      { s: "Node.js", v: 78 },
      { s: "REST APIs", v: 80 },
      { s: "Git/GitHub", v: 86 },
      { s: "SQL Databases", v: 82 },
    ],
    skills: ["React.js", "Node.js", "Next.js", "Full-Stack Development", "Git/GitHub", "REST APIs", "HTML/CSS/JS", "Database Management", "MySQL", "SQL Server"],
  },
  {
    id: "strategy",
    label: "Business & Comms",
    blurb: "Framing the problem before anyone opens a notebook, then presenting the answer so it gets acted on.",
    radar: [
      { s: "Problem Structuring", v: 88 },
      { s: "Market Research", v: 85 },
      { s: "Financial Modelling", v: 78 },
      { s: "Stakeholder Mgmt", v: 84 },
      { s: "Process Improvement", v: 80 },
      { s: "Exec Communication", v: 86 },
    ],
    skills: ["Management Consulting", "Financial Modelling", "Commercial Awareness", "Strategic Planning", "Market Research", "Stakeholder Management", "Organisational Performance Analysis", "Change Management", "Business Intelligence", "Process Improvement", "Hypothesis-Driven Analysis", "Structured Problem-Solving", "PowerPoint", "Structured Storytelling", "Client Communication", "Data-Driven Presentations"],
  },
  {
    id: "ai",
    label: "AI / ML",
    blurb: "Models and agents with the guardrails a business can actually trust.",
    radar: [
      { s: "Machine Learning", v: 82 },
      { s: "Generative AI", v: 84 },
      { s: "Prompt Engineering", v: 86 },
      { s: "NLP / Sentiment", v: 78 },
      { s: "RAG & Agents", v: 80 },
      { s: "Explainability", v: 76 },
    ],
    skills: ["Prompt Engineering", "NLP / Sentiment Analysis", "Machine Learning", "Generative AI Applications", "API Integration", "Computer Vision", "Agile/Scrum", "JIRA"],
  },
];

export const levelLabel = (v) =>
  v >= 88 ? "Expert" : v >= 80 ? "Advanced" : v >= 70 ? "Proficient" : "Working";
