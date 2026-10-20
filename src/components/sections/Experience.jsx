import { EXPERIENCE } from "../../data/experience";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import Tag from "../common/Tag";

export default function Experience({ level = 2 }) {
  return (
    <section id="experience" className="section section--page" aria-labelledby="exp-title">
      <div className="wrap">
        <SectionHeader
          level={level}
          eyebrow="Experience"
          title="Where the work"
          accent="happened."
          id="exp-title"
          lede="A year leading software delivery at Qlovix, built on analytics work that shipped dashboards and Python automation. The through-line: turning stakeholder requirements into working products and decision-ready insight."
        />
        <ol className="ledger">
          {EXPERIENCE.map((e) => (
            <Reveal as="li" key={e.role + e.co} className="ledger__row">
              <div className="ledger__when">
                <span className="ledger__period">{e.period}</span>
                <span className="ledger__type">{e.type}{e.mode ? ` · ${e.mode}` : ""}</span>
              </div>
              <div className="ledger__body">
                <h2 className="ledger__role">{e.role}</h2>
                <p className="ledger__co">{e.co}</p>
                <div className="ledger__metric" aria-hidden="true">
                  <span className="ledger__mv">{e.metric.v}</span>
                  <span className="ledger__ml">{e.metric.l}</span>
                </div>
                <ul className="ledger__pts">
                  {e.pts.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="tags" aria-label="Tools and skills">
                  {e.tools.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
