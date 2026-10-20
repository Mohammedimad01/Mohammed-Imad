import { EDUCATION, ACHIEVEMENTS } from "../../data/achievements";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

export default function Education({ level = 2 }) {
  const [degree, ...further] = EDUCATION;
  return (
    <section id="education" className="section section--page" aria-labelledby="edu-title">
      <div className="wrap">
        <SectionHeader level={level} eyebrow="Education" title="Education and" accent="leadership." id="edu-title" />

        <div className="edu">
          <Reveal as="article" className="edu__card">
            <span className="edu__when">{degree.period}</span>
            <h2 className="edu__deg">{degree.degree}</h2>
            <p className="edu__school">{degree.school} · {degree.campus}</p>
            <div className="edu__gpa">
              <span className="edu__gpa-v num">{degree.grade}</span>
              <span className="edu__gpa-l">{degree.gradeLabel}</span>
            </div>
            <p className="edu__course">
              <span>Relevant coursework</span>
              {degree.coursework.join(" · ")}
            </p>
          </Reveal>

          <ul className="edu__more">
            {further.map((e, i) => (
              <Reveal as="li" key={e.degree} delay={i * 90} className="edu__tile">
                <span className="edu__when">{e.period}</span>
                <h2>{e.degree}</h2>
                <p>
                  {e.school} · {e.campus}
                  {e.grade && <> · {e.gradeLabel}: {e.grade}</>}
                </p>
                {e.note && <p className="muted">{e.note}</p>}
              </Reveal>
            ))}
          </ul>
        </div>

        <h2 className="sub-h">Honours and leadership</h2>
        <ul className="honours">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal as="li" key={a.title} className="honours__item" delay={(i % 2) * 90}>
              <span className="honours__kind">{a.kind}</span>
              <h3>{a.title}</h3>
              <p>{a.sub}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
