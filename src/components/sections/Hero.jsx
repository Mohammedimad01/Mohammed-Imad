import { useEffect, useState } from "react";
import { ArrowDownRight, Copy, FileDown } from "lucide-react";
import { PROFILE, STATS } from "../../data/meta";
import { EXPERIENCE } from "../../data/experience";
import { useUI } from "../../context/UIContext";
import { useIntersection } from "../../hooks/useIntersection";
import { useCounter } from "../../hooks/useCounter";
import { scrollToId } from "../../lib/actions";

function useLocalTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: PROFILE.timeZone }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    // Tick once right away: pre-rendered HTML carries the build-time clock.
    const now = setTimeout(() => setT(fmt()), 0);
    const id = setInterval(() => setT(fmt()), 20_000);
    return () => {
      clearTimeout(now);
      clearInterval(id);
    };
  }, []);
  return t;
}

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
  const { openResume, copyEmail, landingProjectId } = useUI();
  // One H1 per page: on a case-study URL the project title takes it.
  const NameTag = landingProjectId ? "p" : "h1";
  const time = useLocalTime();
  const [statsRef, statsIn] = useIntersection({ threshold: 0.4 });
  const [current, ...previous] = EXPERIENCE;

  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="wrap">
        <div className="hero__strip rise" style={{ "--i": 0 }}>
          <span>Portfolio / {new Date().getFullYear()}</span>
          <span className="hide-sm">{PROFILE.location}</span>
          <span className="hide-sm">{PROFILE.coords}</span>
          <span>
            <span className="hide-sm">Local time </span>
            <time suppressHydrationWarning>{time} {PROFILE.tzLabel}</time>
          </span>
        </div>

        <p className="avail rise" style={{ "--i": 1 }}>
          <span className="avail__dot" aria-hidden="true" />
          {PROFILE.availability}
        </p>

        <NameTag className="hero__name">
          <span className="line"><span className="line__in">{PROFILE.firstName}</span></span>{" "}
          <span className="line"><em className="line__in">{PROFILE.lastName}</em></span>
        </NameTag>

        <div className="hero__grid">
          <div className="hero__main">
            <p className="hero__lede rise" style={{ "--i": 4 }}>
              {PROFILE.intro} <span className="muted">BBA Business Analytics · MAHE Manipal · GPA 8.9/10</span>
            </p>

            <ul className="hero__disc rise" style={{ "--i": 5 }} aria-label="Disciplines">
              {PROFILE.disciplines.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            <div className="hero__cta rise" style={{ "--i": 6 }}>
              <button className="btn btn--primary btn--lg" onClick={openResume}>
                <FileDown size={15} aria-hidden="true" /> Download résumé
              </button>
              <button className="btn btn--ghost btn--lg" onClick={() => scrollToId("projects")}>
                Read the case studies <ArrowDownRight size={15} aria-hidden="true" />
              </button>
              <button className="btn btn--text" onClick={copyEmail}>
                <Copy size={13} aria-hidden="true" /> Copy email
              </button>
            </div>
          </div>

          <aside className="hero__aside rise" style={{ "--i": 5 }} aria-label="Most recent role">
            <div className="now">
              <div className="now__k">Most recently</div>
              <div className="now__role">{current.role}</div>
              <div className="now__org">
                {current.co} <span>· {current.period}</span>
              </div>
            </div>
            <div className="prev">
              <div className="now__k">Previously</div>
              <ul>
                {previous.map((e) => (
                  <li key={e.co}>
                    <span>{e.co}</span>
                    <span className="prev__t">{e.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
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
