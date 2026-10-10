import { Plus } from "lucide-react";
import { FAQ } from "../../data/faq";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

// Answer-first Q&A: the passages search and AI engines quote for "who is…"
// and "what does he do…" questions. Mirrored in the FAQPage JSON-LD.
// Native <details>: answers stay in the HTML (crawlable) while the list stays
// short on phones; the first one starts open.
export default function Faq({ level = 2 }) {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="wrap">
        <SectionHeader level={level} title="The short" accent="version." id="faq-title" />
        <div className="faq">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 3) * 60}>
              <details className="faq__item" open={i === 0}>
                <summary className="faq__sum">
                  <h3 className="faq__q">
                    <span className="faq__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    {f.q}
                  </h3>
                  <span className="faq__icon" aria-hidden="true"><Plus size={16} /></span>
                </summary>
                <p className="faq__a">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
