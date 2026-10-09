import { EDUCATION, ACHIEVEMENTS } from "../../data/achievements";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

export default function Education({ index = 5, level = 2 }) {
  const [degree, ...further] = EDUCATION;
  return (
    <section id="education" className="section" aria-labelledby="edu-title">
      <div className="wrap">
        <SectionHeader index={index} level={level} kicker="Education & Recognition" title="Education &" accent="leadership." id="edu-title" />
        <div className="edu">
          <div>
            <Reveal as="article" className="edu__card">
              <span className="eyebrow">{degree.period}</span>
              <h2 className="edu__school">{degree.degree}</h2>
              <p className="edu__deg">{degree.school} · {degree.campus}</p>
              <p className="edu__course">
                <span className="eyebrow">Relevant coursework</span>
                {degree.coursework.join(" · ")}
              </p>
              <div className="edu__gpa">
                <span className="edu__gpa-v">{degree.grade}</span>
                <span className="edu__gpa-l">{degree.gradeLabel}</span>
              </div>
            </Reveal>
            <ul className="edu__more">
              {further.map((e, i) => (
                <Reveal as="li" key={e.degree} delay={i * 70}>
                  <span className="edu__more-when">{e.period}</span>
                  <div>
                    <h2>{e.degree}</h2>
                    <p>
                      {e.school} · {e.campus}
                      {e.grade && <> · {e.gradeLabel}: {e.grade}</>}
                    </p>
                    {e.note && <p className="muted">{e.note}</p>}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <ul className="honours">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal as="li" key={a.title} className="honours__item" delay={i * 70}>
                <span className="honours__kind">{a.kind}</span>
                <div>
                  <h2>{a.title}</h2>
                  <p>{a.sub}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
