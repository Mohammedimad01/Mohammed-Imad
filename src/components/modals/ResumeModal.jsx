import { useEffect, useState } from "react";
import { Download, ExternalLink, Mail, Printer } from "lucide-react";
import { CONTACT, PROFILE, RESUME, STATS } from "../../data/meta";
import { EXPERIENCE } from "../../data/experience";
import { useUI } from "../../context/UIContext";
import Modal from "../common/Modal";

// Vite's dev server answers unknown paths with index.html (200), so check the
// content type rather than the status code.
async function probePdf(url) {
  try {
    const res = await fetch(url, { method: "HEAD", cache: "no-store" });
    return res.ok && (res.headers.get("content-type") || "").includes("pdf");
  } catch {
    return false;
  }
}

export default function ResumeModal() {
  const { resumeOpen, closeResume } = useUI();
  const [pdf, setPdf] = useState("checking"); // checking | ready | missing

  useEffect(() => {
    if (!resumeOpen || pdf !== "checking") return;
    let live = true;
    probePdf(RESUME.path).then((ok) => live && setPdf(ok ? "ready" : "missing"));
    return () => {
      live = false;
    };
  }, [resumeOpen, pdf]);

  const print = () => {
    closeResume();
    setTimeout(() => window.print(), 350);
  };

  return (
    <Modal open={resumeOpen} onClose={closeResume} title="Résumé" className="resume">
      <div className="resume__body">
        <div className="resume__intro">
          <div>
            <h2 className="resume__name" data-autofocus tabIndex={-1}>{PROFILE.name}</h2>
            <p className="resume__head">{PROFILE.headline}</p>
          </div>
          <span className="resume__upd">Updated {RESUME.updated}</span>
        </div>

        <div className="resume__actions">
          {pdf === "ready" ? (
            <a className="btn btn--primary btn--lg" href={RESUME.path} download={RESUME.fileName}>
              <Download size={15} aria-hidden="true" /> Download PDF
            </a>
          ) : (
            <a className="btn btn--primary btn--lg" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Résumé request")}`}>
              <Mail size={15} aria-hidden="true" /> Request the PDF
            </a>
          )}
          <button className="btn btn--ghost" onClick={print}>
            <Printer size={14} aria-hidden="true" /> Print / save web version
          </button>
          {pdf === "ready" && (
            <a className="btn btn--text" href={RESUME.path} target="_blank" rel="noopener noreferrer">
              Open in new tab <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}
        </div>
        <div className={`resume__preview${pdf === "ready" ? "" : " is-empty"}`}>
          {pdf === "ready" ? (
            <object data={`${RESUME.path}#view=FitH&toolbar=0`} type="application/pdf" aria-label="Résumé preview">
              <p className="resume__fallback">
                Your browser can't preview PDFs inline. <a href={RESUME.path} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>.
              </p>
            </object>
          ) : (
            <div className="resume__glance">
              <span className="eyebrow">{pdf === "checking" ? "Loading…" : "At a glance"}</span>
              <ul className="resume__stats">
                {STATS.map((s) => (
                  <li key={s.l}><strong>{s.v}{s.s}</strong> {s.l}</li>
                ))}
              </ul>
              <ol className="resume__roles">
                {EXPERIENCE.map((e) => (
                  <li key={e.role + e.co}>
                    <span>{e.role}</span>
                    <span className="muted">{e.co} · {e.period}</span>
                  </li>
                ))}
              </ol>
              {pdf === "missing" && (
                <p className="resume__note">
                  The PDF is being refreshed. The print version above is generated from this site and always current.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
