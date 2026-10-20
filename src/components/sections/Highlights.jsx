import { HIGHLIGHTS } from "../../data/meta";
import { EXPERIENCE } from "../../data/experience";
import { PROJECTS } from "../../data/projects";
import { SKILL_TABS } from "../../data/skills";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

// Resolve each tile to a figure that already exists in the data.
const tiles = HIGHLIGHTS.map((h) => {
  if (h.exp) {
    const e = EXPERIENCE.find((x) => x.co === h.exp);
    return e && { v: e.metric.v, l: e.metric.l, src: `${e.role}, ${e.co.replace(/ Pvt\. Ltd$/, "")}`, wide: h.wide };
  }
  const p = PROJECTS.find((x) => x.id === h.project);
  const m = p?.metrics[h.metric];
  return m && { v: m.v, l: m.l, src: p.shortName || p.name, wide: h.wide };
}).filter(Boolean);

// The analytics toolkit, strongest first.
const TOOLS = [...(SKILL_TABS.find((t) => t.id === "analytics")?.radar || [])]
  .sort((a, b) => b.v - a.v)
  .map((r) => r.s);

export default function Highlights() {
  return (
    <section className="section section--alt" aria-labelledby="hl-title">
      <div className="wrap">
        <SectionHeader
          align="center"
          eyebrow="Highlights"
          title="The work,"
          accent="in numbers."
          id="hl-title"
        />
        <ul className="bento">
          {tiles.map((t, i) => (
            <Reveal as="li" key={t.v + t.l} delay={(i % 3) * 90} className={`bento__tile${t.wide ? " bento__tile--wide" : ""}`}>
              <span className="bento__v">{t.v}</span>
              <span className="bento__l">{t.l}</span>
              <span className="bento__src">{t.src}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal as="p" className="hl__tools">
          Fluent in <strong>{TOOLS.slice(0, -1).join(", ")}</strong> and <strong>{TOOLS.at(-1)}</strong>, with React, Next.js, TypeScript and Node.js on the development side.
        </Reveal>
      </div>
    </section>
  );
}
