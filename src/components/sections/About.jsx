import { useRef } from "react";
import { PROFILE } from "../../data/meta";
import { usePrefs } from "../../context/PrefsContext";
import { gsap, useGSAP } from "../../lib/gsap";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

export default function About({ level = 2 }) {
  const stmt = useRef(null);
  const { reducedMotion } = usePrefs();
  const words = PROFILE.statement.split(" ");

  // The statement lights up word by word, scrubbed to the scroll: read at
  // the pace you scroll. Words are full-strength in the HTML, so crawlers and
  // reduced-motion readers get the plain sentence.
  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo(
        ".stmt__w",
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: stmt.current, start: "top 78%", end: "bottom 42%", scrub: 0.5 },
        }
      );
    },
    { scope: stmt, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <p ref={stmt} className="stmt">
          {words.map((w, i) => (
            <span key={i} className="stmt__w">{w}{i < words.length - 1 ? " " : ""}</span>
          ))}
        </p>

        <div className="about">
          <SectionHeader level={level} eyebrow="About" title="Structured thinking." accent="Measurable outcomes." id="about-title" />
          <Reveal className="about__bio">
            {PROFILE.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>

        <ol className="principles">
          {PROFILE.principles.map((p, i) => (
            <Reveal as="li" key={p.l} delay={i * 90} className="principle">
              <span className="principle__n">0{i + 1}</span>
              <h3>{p.l}</h3>
              <p>{p.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
