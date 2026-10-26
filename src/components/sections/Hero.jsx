import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { PROFILE, STATS } from "../../data/meta";
import { useUI } from "../../context/UIContext";
import { usePrefs } from "../../context/PrefsContext";
import { useIntersection } from "../../hooks/useIntersection";
import { useCounter } from "../../hooks/useCounter";
import { gsap, useGSAP } from "../../lib/gsap";
import Link from "../../router/Link";

function Stat({ stat, start, i }) {
  const n = useCounter(stat.v, { start, decimals: stat.dec || 0, duration: 1600 + i * 120 });
  return (
    <div className="stat">
      <dt className="stat__label">{stat.l}</dt>
      <dd className="stat__value num">
        <span aria-hidden="true">{n}{stat.s}</span>
        <span className="sr-only">{stat.v}{stat.s}</span>
      </dd>
      <dd className="stat__note">{stat.d}</dd>
    </div>
  );
}

export default function Hero() {
  const { openResume } = useUI();
  const { reducedMotion } = usePrefs();
  const [statsRef, statsIn] = useIntersection({ threshold: 0.4 });
  const root = useRef(null);
  const portrait = PROFILE.portrait;

  // As the page scrolls on, the headline recedes: drifts up, softens, fades.
  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.to(".hero__intro", {
        yPercent: -14,
        autoAlpha: 0,
        scale: 0.96,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: 0.4 },
      });
    },
    { scope: root, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <section id="top" ref={root} className="hero" aria-label="Introduction">
      <div className="wrap hero__wrap">
        <div className="hero__intro">
          <p className="avail hero__avail rise" style={{ "--i": 0 }}>
            <span className="avail__dot" aria-hidden="true" /> {PROFILE.availabilityHero}
          </p>
          <h1 className="hero__title">
            <span className="hero__line rise" style={{ "--i": 1 }}>{PROFILE.name}.</span>
            <span className="hero__line hero__line--muted rise" style={{ "--i": 2 }}>{PROFILE.headline}.</span>
          </h1>

          <p className="hero__lede rise" style={{ "--i": 3 }}>{PROFILE.intro}</p>

          <div className="hero__cta rise" style={{ "--i": 4 }}>
            <button className="btn btn--primary btn--lg" onClick={openResume}>
              Download résumé
            </button>
            <Link to="/work/" className="more more--lg">
              View case studies <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Phase 2: the portrait or hero animation lands here (PROFILE.portrait). */}
        {portrait && (
          <figure className="hero__media rise" style={{ "--i": 5 }}>
            <img src={portrait.src} width={portrait.width} height={portrait.height} alt={portrait.alt} fetchPriority="high" />
          </figure>
        )}

        <dl ref={statsRef} className="stats rise" style={{ "--i": 5 }}>
          {STATS.map((s, i) => (
            <Stat key={s.l} stat={s} start={statsIn} i={i} />
          ))}
        </dl>
      </div>
    </section>
  );
}
