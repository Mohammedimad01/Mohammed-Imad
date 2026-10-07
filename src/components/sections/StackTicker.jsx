import { SKILL_TABS } from "../../data/skills";
import { PROJECTS } from "../../data/projects";
import { EXPERIENCE } from "../../data/experience";
import Marquee from "../common/Marquee";

const uniq = (a) => [...new Set(a)];
const skills = (id) => SKILL_TABS.find((t) => t.id === id)?.skills || [];

// Tools: the analytics toolkit, the tech used across the AI/analytics case
// studies, and the core web stack. All from src/data, nothing hand-listed.
const TOOLS = uniq([
  ...skills("analytics"),
  ...PROJECTS.filter((p) => p.category !== "venture").flatMap((p) => p.tools),
  "React.js",
  "Next.js",
  "Node.js",
]).filter((t) => !/^(Statistics|NLP|Data Visualization)$/.test(t));

// Proof points: every quantified result in experience and case studies.
const METRICS = [
  ...EXPERIENCE.filter((e) => /\d/.test(e.metric.v)).map((e) => ({ v: e.metric.v, l: e.metric.l, src: e.co })),
  ...PROJECTS.flatMap((p) => p.metrics.filter((m) => /\d/.test(m.v)).map((m) => ({ ...m, src: p.shortName || p.name }))),
];

export default function StackTicker() {
  return (
    <section className="ticker" aria-label="Tools and results at a glance">
      <Marquee
        label="Tools I work with"
        items={TOOLS}
        duration={70}
        render={(t) => (
          <li key={t} className="ticker__tool">
            <span className="ticker__glyph" aria-hidden="true">◇</span>
            {t}
          </li>
        )}
      />
      <Marquee
        label="Results from my work"
        items={METRICS}
        reverse
        duration={90}
        className="ticker__row--metrics"
        render={(m) => (
          <li key={m.v + m.l} className="ticker__metric">
            <strong>{m.v}</strong>
            <span>{m.l}</span>
            <em>{m.src}</em>
          </li>
        )}
      />
    </section>
  );
}
