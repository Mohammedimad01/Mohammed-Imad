import { PROFILE, CONTACT, SITE_URL } from "../../data/meta";
import { EXPERIENCE } from "../../data/experience";
import { PROJECTS } from "../../data/projects";
import { SKILL_TABS } from "../../data/skills";
import { EDUCATION, ACHIEVEMENTS, CERTIFICATIONS } from "../../data/achievements";

const strip = (u) => u.replace(/^https?:\/\/(www\.)?/, "");

// Hidden on screen; the only thing rendered by @media print. Generated from the
// same data as the site so the printed résumé never drifts out of date.
export default function PrintResume() {
  return (
    <article className="print-cv" aria-hidden="true">
      <header>
        <h1>{PROFILE.name}</h1>
        <p className="pc-head">{PROFILE.headline}</p>
        <p className="pc-contact">
          {PROFILE.location} · {CONTACT.phone} · {CONTACT.email} · {strip(CONTACT.linkedin)} · {strip(CONTACT.github)} · {strip(SITE_URL)}
        </p>
      </header>

      <section>
        <h2>Profile</h2>
        <p>{PROFILE.bio.join(" ")}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {EXPERIENCE.map((e) => (
          <div className="pc-item" key={e.role + e.co}>
            <div className="pc-row"><strong>{e.role}</strong>, {e.co}<span>{e.period}</span></div>
            <ul>{e.pts.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Selected Projects</h2>
        {PROJECTS.map((p) => (
          <div className="pc-item" key={p.id}>
            <div className="pc-row"><strong>{p.name}</strong> | {p.type}<span>{p.status}</span></div>
            <p>{p.impact}</p>
          </div>
        ))}
      </section>

      <section className="pc-cols">
        <div>
          <h2>Education</h2>
          {EDUCATION.map((e) => (
            <p key={e.degree}>
              <strong>{e.degree}</strong>, {e.period}
              <br />
              {e.school}, {e.campus}{e.grade ? ` · ${e.gradeLabel}: ${e.grade}` : ""}
            </p>
          ))}
          <h2>Recognition</h2>
          <ul>{ACHIEVEMENTS.map((a) => <li key={a.title}>{a.title}</li>)}</ul>
        </div>
        <div>
          <h2>Skills</h2>
          {SKILL_TABS.filter((t) => t.skills).map((t) => (
            <p key={t.id}><strong>{t.label}:</strong> {t.skills.join(", ")}</p>
          ))}
          <h2>Certifications</h2>
          <ul>{CERTIFICATIONS.map((c) => <li key={c.n}>{c.n}, {c.org}</li>)}</ul>
        </div>
      </section>
    </article>
  );
}
