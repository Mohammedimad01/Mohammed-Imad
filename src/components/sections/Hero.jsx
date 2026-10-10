import { ArrowDownRight, FileDown } from "lucide-react";
import { PROFILE, STATS } from "../../data/meta";
import { useUI } from "../../context/UIContext";
import { useIntersection } from "../../hooks/useIntersection";
import { useCounter } from "../../hooks/useCounter";
import Link from "../../router/Link";
import HeroCode from "./HeroCode";
import DataTerrain from "../three/DataTerrain";

function Stat({ stat, start, i }) {
  const n = useCounter(stat.v, { start, decimals: stat.dec || 0, duration: 1400 + i * 150 });
  return (
    <div className="stat">
      <dt className="stat__label">{stat.l}</dt>
      <dd className="stat__value">
        <span className="stat__num" aria-hidden="true">{n}</span>
        <span className="stat__suf" aria-hidden="true">{stat.s}</span>
        <span className="sr-only">{stat.v}{stat.s}</span>
      </dd>
      <dd className="stat__note">{stat.d}</dd>
    </div>
  );
}

export default function Hero() {
  const { openResume } = useUI();
  const [statsRef, statsIn] = useIntersection({ threshold: 0.4 });

  return (
    <section id="top" className="hero" aria-label="Introduction">
      <DataTerrain />
      <div className="wrap hero__wrap">
        <p className="avail rise" style={{ "--i": 1 }}>
          <span className="avail__dot" aria-hidden="true" />
          {PROFILE.availability}
        </p>

        <h1 className="hero__name">
          <span className="line"><span className="line__in">{PROFILE.firstName}</span></span>{" "}
          <span className="line"><em className="line__in">{PROFILE.lastName}</em></span>
        </h1>

        <div className="hero__grid">
          <div className="hero__main">
            <p className="hero__lede rise" style={{ "--i": 4 }}>
              {PROFILE.intro} <span className="muted">BBA in Business Analytics from MAHE Manipal, GPA 8.9/10.</span>
            </p>

            <div className="hero__cta rise" style={{ "--i": 6 }}>
              <button className="btn btn--primary btn--lg" onClick={openResume}>
                <FileDown size={15} aria-hidden="true" /> Download résumé
              </button>
              <Link to="/work/" className="btn btn--ghost btn--lg">
                Read the case studies <ArrowDownRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <HeroCode />
        </div>

        <dl ref={statsRef} className="stats rise" style={{ "--i": 7 }}>
          {STATS.map((s, i) => (
            <Stat key={s.l} stat={s} start={statsIn} i={i} />
          ))}
        </dl>
      </div>
    </section>
  );
}
