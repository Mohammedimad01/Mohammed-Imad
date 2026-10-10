import { PROFILE } from "../../data/meta";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

const ROMAN = ["i", "ii", "iii", "iv"];

export default function About({ level = 2 }) {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHeader level={level} title="Structured thinking." accent="Measurable outcomes." id="about-title" />
        <div className="about">
          <Reveal className="about__bio">
            {PROFILE.bio.map((p, i) => (
              <p key={i} className={i === 0 ? "dropcap" : undefined}>{p}</p>
            ))}
          </Reveal>
          <Reveal as="ol" className="principles" delay={120}>
            {PROFILE.principles.map((p, i) => (
              <li key={p.l}>
                <span className="principles__n">{ROMAN[i]}.</span>
                <div>
                  <h3>{p.l}</h3>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
