import { CERTIFICATIONS } from "../../data/achievements";
import Reveal from "../common/Reveal";
import Marquee from "../common/Marquee";

export default function Certifications() {
  return (
    <section id="certifications" className="section section--tight" aria-labelledby="cert-title">
      <div className="wrap">
        <Reveal className="certs">
          <h2 className="certs__h" id="cert-title">
            <span className="eyebrow">Certifications</span>
            <span className="certs__count">{String(CERTIFICATIONS.length).padStart(2, "0")}</span>
          </h2>
          <Marquee
            label="Certifications"
            items={CERTIFICATIONS}
            duration={38}
            className="certs__rail"
            render={(c, i) => (
              <li key={c.n} className="cert">
                <span className="cert__no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="cert__n">{c.n}</span>
                <span className="cert__org">{c.org}</span>
              </li>
            )}
          />
        </Reveal>
      </div>
    </section>
  );
}
