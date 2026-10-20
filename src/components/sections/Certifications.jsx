import { CERTIFICATIONS } from "../../data/achievements";
import Reveal from "../common/Reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="section section--tight" aria-labelledby="cert-title">
      <div className="wrap">
        <h2 className="sub-h" id="cert-title">
          Certifications <span className="sub-h__count num">{CERTIFICATIONS.length}</span>
        </h2>
        <ul className="certs">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal as="li" key={c.n} className="cert" delay={(i % 3) * 80}>
              <span className="cert__org">{c.org}</span>
              <span className="cert__n">{c.n}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
