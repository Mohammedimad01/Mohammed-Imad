import { ChevronRight } from "lucide-react";
import { PROFILE } from "../../data/meta";
import { useUI } from "../../context/UIContext";
import Reveal from "../common/Reveal";
import Link from "../../router/Link";
import OpenRoles from "./OpenRoles";

export default function CtaBand() {
  const { openResume } = useUI();
  return (
    <section className="cta section" aria-labelledby="cta-title">
      <Reveal className="wrap wrap--narrow cta__inner">
        <p className="avail">{PROFILE.availabilityShort}</p>
        <h2 className="cta__title" id="cta-title">
          Let&apos;s talk.
        </h2>
        <p className="cta__text">{PROFILE.seeking}</p>
        <OpenRoles className="roles--cta" />
        <div className="cta__actions">
          <Link to="/contact/" className="btn btn--primary btn--lg">
            Get in touch
          </Link>
          <button className="more more--lg" onClick={openResume}>
            Download résumé <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
