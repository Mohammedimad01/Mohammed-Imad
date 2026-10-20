import { PROFILE } from "../../data/meta";
import Reveal from "../common/Reveal";

// The kinds of role I'm open to. `level` keeps the heading outline intact
// wherever it's placed (h3 under the home CTA's h2, h2 under Contact's h1).
export default function OpenRoles({ level = 3, className = "" }) {
  const H = `h${level}`;
  return (
    <div className={`roles ${className}`.trim()}>
      <p className="roles__k">Open to roles</p>
      <ul className="roles__list">
        {PROFILE.roles.map((r, i) => (
          <Reveal as="li" key={r.title} className="role" delay={i * 90}>
            <H className="role__t">{r.title}</H>
            <p className="role__d">{r.detail}</p>
            <p className="role__tools">{r.tools}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
