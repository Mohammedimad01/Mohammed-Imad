import { FAQ } from "../../data/faq";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

// Answer-first Q&A: the passages search and AI engines quote for "who is…"
// and "what does he do…" questions. Mirrored in the FAQPage JSON-LD.
export default function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="wrap">
        <SectionHeader index={6} kicker="Quick Answers" title="The short" accent="version." id="faq-title" />
        <div className="faq">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} className="faq__item" delay={Math.min(i, 3) * 60}>
              <h3 className="faq__q">
                <span className="faq__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                {f.q}
              </h3>
              <p className="faq__a">{f.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
