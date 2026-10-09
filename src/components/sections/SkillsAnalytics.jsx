import { lazy, Suspense, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SKILL_TABS, levelLabel } from "../../data/skills";
import { useIntersection } from "../../hooks/useIntersection";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

const SkillRadar = lazy(() => import("./SkillRadar"));

export default function SkillsAnalytics({ index = 4, level = 2 }) {
  const [tab, setTab] = useState("overview");
  // Start fetching the chart bundle a little before the section scrolls in.
  const [chartRef, chartNear] = useIntersection({ threshold: 0, rootMargin: "600px 0px" });
  const tabRefs = useRef([]);
  const baseId = useId();
  const current = SKILL_TABS.find((t) => t.id === tab);
  const toolkit = SKILL_TABS.filter((t) => t.skills);

  const onTabKey = (e, i) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + SKILL_TABS.length) % SKILL_TABS.length;
    setTab(SKILL_TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHeader index={index} level={level} kicker="Capabilities" title="Technical &" accent="business skills." id="skills-title" />

        <Reveal className="tabs" role="tablist" aria-label="Skill categories">
          {SKILL_TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`${baseId}-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`${baseId}-panel`}
              tabIndex={tab === t.id ? 0 : -1}
              className={`tab${tab === t.id ? " is-active" : ""}`}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {tab === t.id && <motion.span layoutId="tab-ink" className="tab__ink" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
              <span className="tab__label">{t.label}</span>
            </button>
          ))}
        </Reveal>

        <Reveal className="skills" id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${tab}`}>
          <figure className="skills__chart">
            <figcaption className="skills__cap">
              <span className="eyebrow">{current.label}</span>
              <span>{current.blurb}</span>
            </figcaption>
            <div className="skills__radar" ref={chartRef} aria-hidden="true">
              {chartNear && (
                <Suspense fallback={null}>
                  <SkillRadar data={current.radar} id={tab} />
                </Suspense>
              )}
            </div>
          </figure>

          <div className="matrix">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={tab}
                className="matrix__list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {[...current.radar]
                  .sort((a, b) => b.v - a.v)
                  .map((r, i) => (
                    <li key={r.s} className="matrix__row">
                      <span className="matrix__name">{r.s}</span>
                      <span className="matrix__lvl">{levelLabel(r.v)}</span>
                      <span className="matrix__bar" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={r.v} aria-label={`${r.s} proficiency`}>
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: r.v / 100 }}
                          transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.2, 0.7, 0.2, 1] }}
                        />
                      </span>
                      <span className="matrix__v">{r.v}</span>
                    </li>
                  ))}
              </motion.ul>
            </AnimatePresence>

            {current.skills && (
              <div className="matrix__also">
                <span className="eyebrow">Full toolkit</span>
                <p>{current.skills.join(" · ")}</p>
              </div>
            )}
          </div>
        </Reveal>

        {tab === "overview" && (
          <Reveal className="toolkit">
            {toolkit.map((t) => (
              <div key={t.id} className="toolkit__col">
                <button className="toolkit__h" onClick={() => setTab(t.id)}>
                  {t.label} <span aria-hidden="true">→</span>
                </button>
                <ul>
                  {t.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
