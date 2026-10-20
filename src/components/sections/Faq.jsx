import { Plus } from "lucide-react";
import { FAQ } from "../../data/faq";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

// Answer-first Q&A: the passages search and AI engines quote for "who is…"
// and "what does he do…" questions. Mirrored in the FAQPage JSON-LD.
// Native <details>: answers stay in the HTML (crawlable); the first starts open.
export default function Faq({ level = 2 }) {
  return (
    <section id="faq" className="section section--alt" aria-labelledby="faq-title">
      <div className="wrap wrap--narrow">
        <SectionHeader level={level} align="center" eyebrow="Quick answers" title="The short version." id="faq-title" />
        <Reveal className="faq">
          {FAQ.map((f, i) => (
            <details key={f.q} className="faq__item" open={i === 0}>
              <summary className="faq__sum">
                <h3 className="faq__q">{f.q}</h3>
                <span className="faq__icon" aria-hidden="true"><Plus size={18} strokeWidth={1.75} /></span>
              </summary>
              <p className="faq__a">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
