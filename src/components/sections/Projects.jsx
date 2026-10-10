import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, PROJECT_FILTERS } from "../../data/projects";
import { useUI } from "../../context/UIContext";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import { projectPath } from "../../seo/site.js";
import ProjectPreview from "./ProjectPreview";

export default function Projects({ level = 2 }) {
  const { openProject } = useUI();
  const [filter, setFilter] = useState("all");
  const [hovered, setHovered] = useState(null);

  const counts = useMemo(() => {
    const c = { all: PROJECTS.length };
    PROJECTS.forEach((p) => (c[p.category] = (c[p.category] || 0) + 1));
    return c;
  }, []);

  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHeader
          level={level}
          title="Projects as"
          accent="business impact stories."
          id="work-title"
          lede="Each one follows the consulting arc: problem, approach, measurable outcome. Open any row for the full case study."
        />

        <Reveal className="filters" role="toolbar" aria-label="Filter projects">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter${filter === f.id ? " is-active" : ""}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <sup>{counts[f.id] || 0}</sup>
            </button>
          ))}
        </Reveal>

        <ol className="index" aria-live="polite" onPointerLeave={() => setHovered(null)}>
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((p) => {
              const n = PROJECTS.indexOf(p) + 1;
              return (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <a
                    className="index__row"
                    href={projectPath(p.id)}
                    aria-haspopup="dialog"
                    onPointerEnter={() => setHovered(p.id)}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                      e.preventDefault();
                      openProject(p.id);
                    }}
                  >
                    <span className="index__n">{String(n).padStart(2, "0")}</span>
                    <span className="index__main">
                      <span className="index__name">{p.shortName || p.name}</span>
                      <span className="index__sum">{p.summary}</span>
                    </span>
                    <span className="index__type">{p.type}</span>
                    <span className="index__status">{p.status}</span>
                    <span className="index__go" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
        <ProjectPreview project={PROJECTS.find((x) => x.id === hovered)} />
      </div>
    </section>
  );
}
