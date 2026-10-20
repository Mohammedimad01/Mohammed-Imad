import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { PROJECTS, PROJECT_FILTERS } from "../../data/projects";
import { useUI } from "../../context/UIContext";
import { coverVisual } from "../../data/covers";
import { ScrollTrigger } from "../../lib/gsap";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import { projectPath } from "../../seo/site.js";

const SPRING = { type: "spring", bounce: 0, duration: 0.5 };

export default function Projects({ level = 2 }) {
  const { openProject } = useUI();
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const c = { all: PROJECTS.length };
    PROJECTS.forEach((p) => (c[p.category] = (c[p.category] || 0) + 1));
    return c;
  }, []);

  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section section--page" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHeader
          level={level}
          eyebrow="Case studies"
          title="Projects as"
          accent="business impact stories."
          id="work-title"
          lede="Each one follows the consulting arc: problem, approach, measurable outcome. Open any card for the full case study."
        />

        <Reveal className="seg" role="toolbar" aria-label="Filter projects">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f.id}
              className={`seg__btn${filter === f.id ? " is-active" : ""}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {filter === f.id && <motion.span layoutId="seg-ink" className="seg__ink" transition={SPRING} />}
              <span className="seg__label">
                {f.label} <span className="seg__count">{counts[f.id] || 0}</span>
              </span>
            </button>
          ))}
        </Reveal>

        <motion.ol className="works" aria-live="polite" layout transition={SPRING}>
          <AnimatePresence initial={false} mode="popLayout" onExitComplete={() => ScrollTrigger.refresh()}>
            {list.map((p) => {
              const n = PROJECTS.indexOf(p) + 1;
              const cover = coverVisual(p.id);
              return (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
                  transition={SPRING}
                  className="works__item"
                >
                  <a
                    className="work"
                    href={projectPath(p.id)}
                    aria-haspopup="dialog"
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                      e.preventDefault();
                      openProject(p.id);
                    }}
                  >
                    <span className="work__img">
                      {cover ? (
                        <img src={cover.src} width={cover.width} height={cover.height} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <span className="work__mono" aria-hidden="true">{(p.shortName || p.name).slice(0, 1)}</span>
                      )}
                    </span>
                    <span className="work__meta">
                      <span className="work__n num">{String(n).padStart(2, "0")}</span>
                      <span className="work__type">{p.type.split("·")[0].trim()}</span>
                      <span className="work__status">{p.status}</span>
                    </span>
                    <span className="work__name">{p.shortName || p.name}</span>
                    <span className="work__sum">{p.summary}</span>
                    <span className="more">
                      Read the case study <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ol>
      </div>
    </section>
  );
}
