import { useEffect, useRef, useState } from "react";
import { usePrefs } from "../../context/PrefsContext";

// Floating card that trails the cursor over the project index, tilting in
// the direction of travel. Desktop + fine pointer only; purely decorative
// (the row itself carries all the content), so it's aria-hidden.
export default function ProjectPreview({ project }) {
  const ref = useRef(null);
  const { reducedMotion } = usePrefs();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1025px)");
    const update = () => setEnabled(mq.matches && !reducedMotion);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0, init: false };
    let raf;
    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!pos.init) {
        pos.x = target.x;
        pos.y = target.y;
        pos.init = true;
      }
    };
    const tick = () => {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      pos.x += dx * 0.14;
      pos.y += dy * 0.14;
      const el = ref.current;
      if (el) {
        const ry = Math.max(-18, Math.min(18, dx * 0.12));
        const rx = Math.max(-14, Math.min(14, -dy * 0.12));
        el.style.transform = `translate3d(${pos.x + 28}px, ${pos.y - 90}px, 0) perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  const metrics = project?.metrics.slice(0, 2) || [];
  return (
    <div ref={ref} className={`pv${project ? " is-on" : ""}`} aria-hidden="true">
      {project && (
        <div className="pv__card" key={project.id}>
          <span className="pv__type">{project.type}</span>
          <div className="pv__metrics">
            {metrics.map((m) => (
              <div key={m.l}>
                <strong>{m.v}</strong>
                <span>{m.l}</span>
              </div>
            ))}
          </div>
          <span className="pv__stack">{project.tools.slice(0, 4).join(" · ")}</span>
        </div>
      )}
    </div>
  );
}
