import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { PROJECTS } from "../../data/projects";
import { FEATURED_PROJECTS } from "../../data/pages";
import { useUI } from "../../context/UIContext";
import { usePrefs } from "../../context/PrefsContext";
import { projectPath } from "../../seo/site.js";
import { coverVisual } from "../../data/covers";
import { gsap, useGSAP } from "../../lib/gsap";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import Link from "../../router/Link";

// Bento: the first case study gets the full width, the next two share a row.
export default function FeaturedWork() {
  const { openProject } = useUI();
  const { reducedMotion } = usePrefs();
  const root = useRef(null);
  const featured = FEATURED_PROJECTS.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean);

  // Each screenshot settles from a slight zoom as its card crosses the viewport.
  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.utils.toArray(".feat__img img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.1 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: img.closest(".feat__card"), start: "top bottom", end: "bottom 40%", scrub: 0.6 } }
        );
      });
    },
    { scope: root, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <section ref={root} className="section inverse" aria-labelledby="featured-title">
      <div className="wrap">
        <SectionHeader
          align="center"
          eyebrow="Selected work"
          title="Three case studies."
          accent="Start to finish."
          id="featured-title"
          lede="Machine learning, statistical analysis and AI engineering, each with the problem, the method and a measurable result."
        />
        <ul className="feat">
          {featured.map((p, i) => {
            const cover = coverVisual(p.id);
            return (
              <Reveal as="li" key={p.id} delay={i === 2 ? 90 : 0} className={`feat__item${i === 0 ? " feat__item--lead" : ""}`}>
                <a
                  className="feat__card"
                  href={projectPath(p.id)}
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                    e.preventDefault();
                    openProject(p.id);
                  }}
                >
                  <span className="feat__text">
                    <span className="feat__type">{p.type.split("·")[0].trim()}</span>
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
                    <span className="more">
                      Read the case study <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                    </span>
                  </span>
                  {cover && (
                    <span className="feat__img">
                      <img src={cover.src} width={cover.width} height={cover.height} alt="" loading="lazy" decoding="async" />
                    </span>
                  )}
                </a>
              </Reveal>
            );
          })}
        </ul>
        <Reveal className="feat__all">
          <Link to="/work/" className="btn btn--ghost">
            See all {PROJECTS.length} case studies
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
