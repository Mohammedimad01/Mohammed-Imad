import { ArrowRight, FileDown } from "lucide-react";
import { PROFILE } from "../../data/meta";
import { useUI } from "../../context/UIContext";
import Reveal from "../common/Reveal";
import Link from "../../router/Link";

export default function CtaBand() {
  const { openResume } = useUI();
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="wrap">
        <Reveal className="cta__inner">
          <p className="cta__k">
            <span className="avail__dot" aria-hidden="true" /> {PROFILE.availabilityShort}
          </p>
          <h2 className="cta__title" id="cta-title">
            Let&apos;s <em>talk.</em>
          </h2>
          <p className="cta__text">{PROFILE.seeking}</p>
          <div className="cta__actions">
            <Link to="/contact/" className="btn btn--primary btn--lg">
              Get in touch <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <button className="btn btn--ghost btn--lg" onClick={openResume}>
              <FileDown size={15} aria-hidden="true" /> Download résumé
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
