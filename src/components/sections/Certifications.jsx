import { CERTIFICATIONS } from "../../data/achievements";
import Reveal from "../common/Reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="section section--tight" aria-labelledby="cert-title">
      <div className="wrap">
        <Reveal className="certs">
          <h2 className="certs__h" id="cert-title">
            <span className="eyebrow">Certifications</span>
            <span className="certs__count">{String(CERTIFICATIONS.length).padStart(2, "0")}</span>
          </h2>
          <ul className="certs__list">
            {CERTIFICATIONS.map((c) => (
              <li key={c.n}>
                <span className="certs__n">{c.n}</span>
                <span className="certs__org">{c.org}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
