import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText, Mail, MonitorPlay } from "lucide-react";
import { PROJECTS } from "../../data/projects";
import { CONTACT } from "../../data/meta";
import { useUI } from "../../context/UIContext";
import Modal from "../common/Modal";
import { GithubIcon } from "../common/BrandIcons";

const LINKS = [
  { k: "demo", label: "Live demo", Icon: MonitorPlay },
  { k: "github", label: "Repository", Icon: GithubIcon },
  { k: "writeup", label: "Technical write-up", Icon: FileText },
];

function Body({ p, index, onSwitch }) {
  const [tool, setTool] = useState(null);
  const scrollRef = useRef(null);

  // Body is keyed by project id, so switching cases remounts it with fresh state.
  useEffect(() => {
    scrollRef.current?.querySelector("[data-autofocus]")?.focus({ preventScroll: true });
  }, []);

  const related = useMemo(
    () => (tool ? PROJECTS.filter((x) => x.id !== p.id && x.tools.includes(tool)) : []),
    [tool, p.id]
  );
  const links = LINKS.filter((l) => p.links?.[l.k]);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <>
      <div className="cs" ref={scrollRef}>
        <div className="cs__top">
          <span className="cs__no">Case {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
          <span className="cs__type">{p.type}</span>
        </div>
        <h2 className="cs__title" data-autofocus tabIndex={-1}>{p.name}</h2>
        <p className="cs__lede">{p.summary}</p>
        <dl className="cs__facts">
          <div><dt>Role</dt><dd>{p.role}</dd></div>
          <div><dt>Status</dt><dd>{p.status}</dd></div>
          <div><dt>Context</dt><dd>{p.tag}</dd></div>
        </dl>

        <section className="cs__metrics" aria-label="Impact metrics">
          {p.metrics.map((m) => (
            <div key={m.l} className="cs__metric">
              <span className="cs__mv">{m.v}</span>
              <span className="cs__ml">{m.l}</span>
            </div>
          ))}
        </section>

        <div className="cs__arc">
          {[
            ["The problem", p.problem],
            ["Approach", p.approach],
            ["Outcome", p.impact],
          ].map(([h, t], i) => (
            <section key={h} className="cs__block">
              <h3><span>{String(i + 1).padStart(2, "0")}</span>{h}</h3>
              <p>{t}</p>
            </section>
          ))}
        </div>

        <section className="cs__arch" aria-label="System architecture">
          <h3 className="eyebrow">Architecture &amp; method</h3>
          <ol className="flow">
            {p.pipeline.map((s, i) => (
              <li key={s} style={{ "--i": i }}>
                <span className="flow__n">{i + 1}</span>
                <span className="flow__s">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="cs__stack" aria-label="Tech stack">
          <h3 className="eyebrow">Stack: select a tool to see where else I've used it</h3>
          <div className="tags">
            {p.tools.map((t) => (
              <button key={t} type="button" className={`tag tag--btn${tool === t ? " is-active" : ""}`} aria-pressed={tool === t} onClick={() => setTool(tool === t ? null : t)}>
                {t}
              </button>
            ))}
          </div>
          {tool && (
            <p className="cs__related" aria-live="polite">
              {related.length ? (
                <>
                  <span className="muted">{tool} also appears in </span>
                  {related.map((r, i) => (
                    <span key={r.id}>
                      <button className="linkish" onClick={() => onSwitch(r.id)}>{r.shortName || r.name}</button>
                      {i < related.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </>
              ) : (
                <span className="muted">{tool} is unique to this project in the portfolio.</span>
              )}
            </p>
          )}
        </section>

        <section className="cs__links" aria-label="Links">
          {links.length ? (
            links.map(({ k, label, Icon }) => (
              <a key={k} className="btn btn--ghost" href={p.links[k]} target="_blank" rel="noopener noreferrer">
                <Icon size={14} aria-hidden="true" /> {label} <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))
          ) : (
            <p className="cs__private">
              Code, data and the full deck are available on request.{" "}
              <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Case study: ${p.name}`)}`} className="linkish">
                <Mail size={12} aria-hidden="true" /> Ask for the walkthrough
              </a>
            </p>
          )}
        </section>
      </div>

      <nav className="cs__nav" aria-label="Other case studies">
        <button className="cs__pn" onClick={() => onSwitch(prev.id)}>
          <ArrowLeft size={14} aria-hidden="true" />
          <span><small>Previous</small>{prev.shortName || prev.name}</span>
        </button>
        <button className="cs__pn cs__pn--next" onClick={() => onSwitch(next.id)}>
          <span><small>Next</small>{next.shortName || next.name}</span>
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </nav>
    </>
  );
}

export default function ProjectDetailModal() {
  const { projectId, closeProject, openProject } = useUI();
  const index = PROJECTS.findIndex((p) => p.id === projectId);
  const p = PROJECTS[index];

  return (
    <Modal open={!!p} onClose={closeProject} variant="drawer" title={p ? "Case study" : ""} className="drawer">
      {p && <Body key={p.id} p={p} index={index} onSwitch={openProject} />}
    </Modal>
  );
}
