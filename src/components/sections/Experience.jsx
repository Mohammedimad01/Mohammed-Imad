import { EXPERIENCE } from "../../data/experience";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import Tag from "../common/Tag";

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-title">
      <div className="wrap">
        <SectionHeader index={2} kicker="Track Record" title="Experience" accent="& Internships" id="exp-title" />
        <ol className="ledger">
          {EXPERIENCE.map((e, i) => (
            <Reveal as="li" key={e.role + e.co} className={`ledger__row${e.current ? " is-current" : ""}`} delay={Math.min(i, 3) * 60}>
              <div className="ledger__when">
                <span className="ledger__period">{e.period}</span>
                <span className="ledger__type">{e.type}</span>
                {e.current && <span className="ledger__now">Now</span>}
              </div>
              <div className="ledger__body">
                <h3 className="ledger__role">{e.role}</h3>
                <div className="ledger__co">{e.co}</div>
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
              <div className="ledger__metric" aria-hidden="true">
                <span className="ledger__mv">{e.metric.v}</span>
                <span className="ledger__ml">{e.metric.l}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
