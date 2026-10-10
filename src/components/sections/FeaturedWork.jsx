import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../data/projects";
import { FEATURED_PROJECTS } from "../../data/pages";
import { useUI } from "../../context/UIContext";
import { projectPath } from "../../seo/site.js";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import Tilt from "../common/Tilt";
import Link from "../../router/Link";
import { coverVisual } from "../../data/covers";

export default function FeaturedWork({ index = 2 }) {
  const { openProject } = useUI();
  const featured = FEATURED_PROJECTS.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="section" aria-labelledby="featured-title">
      <div className="wrap">
        <SectionHeader
          index={index}
          kicker="Selected Work"
          title="Three case studies,"
          accent="start to finish."
          id="featured-title"
          lede="Machine learning, statistical analysis and AI engineering: each with the problem, the method and a measurable result."
        />
        <ul className="feat">
          {featured.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 90} className="feat__item">
              <Tilt className="feat__card" max={5}>
                <a
                  className="feat__link"
                  href={projectPath(p.id)}
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                    e.preventDefault();
                    openProject(p.id);
                  }}
                >
                  {coverVisual(p.id) && (
                    <span className="feat__img">
                      <img src={coverVisual(p.id).src} width={coverVisual(p.id).width} height={coverVisual(p.id).height} alt="" loading="lazy" decoding="async" />
                    </span>
                  )}
                  <span className="feat__top">
                    <span className="feat__n">{String(PROJECTS.indexOf(p) + 1).padStart(2, "0")}</span>
                    <span className="feat__type">{p.type.split("·")[0].trim()}</span>
                  </span>
                  <span className="feat__name">{p.shortName || p.name}</span>
                  <span className="feat__sum">{p.summary}</span>
                  <span className="feat__metrics">
                    {p.metrics.slice(0, 2).map((m) => (
                      <span key={m.l}>
                        <strong>{m.v}</strong>
                        <small>{m.l}</small>
                      </span>
                    ))}
                  </span>
                  <span className="feat__go">
                    Read case study <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </a>
              </Tilt>
            </Reveal>
          ))}
        </ul>
        <Reveal className="feat__all">
          <Link to="/work/" className="btn btn--ghost">
            All {PROJECTS.length} case studies <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
