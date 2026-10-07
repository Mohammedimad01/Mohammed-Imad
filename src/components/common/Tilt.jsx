import { useRef } from "react";
import { usePrefs } from "../../context/PrefsContext";

// Perspective tilt toward the pointer with a soft glare. Mouse/pen only;
// touch and reduced-motion users get a static element.
export default function Tilt({ as: Tag = "div", max = 7, className = "", children, ...rest }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const { reducedMotion } = usePrefs();

  const set = (rx, ry, gx, gy, on) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
      el.style.setProperty("--gx", `${gx}%`);
      el.style.setProperty("--gy", `${gy}%`);
      el.classList.toggle("is-tilting", on);
    });
  };

  const onMove = (e) => {
    if (reducedMotion || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    set((0.5 - py) * max * 2, (px - 0.5) * max * 2, px * 100, py * 100, true);
  };

  return (
    <Tag ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={() => set(0, 0, 50, 50, false)} {...rest}>
      {children}
      <span className="tilt__glare" aria-hidden="true" />
    </Tag>
  );
}
