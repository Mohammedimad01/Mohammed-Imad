import { useEffect, useRef, useState } from "react";
import { usePrefs } from "../../context/PrefsContext";

// A single small dot that tracks the pointer exactly (no trailing lag) and
// swells slightly over interactive elements. Text fields keep the native
// I-beam. Disabled for touch and reduced-motion users.
export default function CustomCursor() {
  const { reducedMotion } = usePrefs();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches && !reducedMotion);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) {
      root.classList.remove("has-cursor");
      return;
    }
    root.classList.add("has-cursor");
    const dot = dotRef.current;

    const onMove = (e) => {
      if (!dot) return;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      dot.classList.add("is-visible");
    };
    const onOver = (e) => {
      if (!dot) return;
      const t = e.target;
      dot.classList.toggle("is-hover", !!t.closest?.("a,button,[role=button],[role=tab],label,select,summary"));
      dot.classList.toggle("is-text", !!t.closest?.("input,textarea,[contenteditable=true]"));
    };
    const onLeave = () => dot?.classList.remove("is-visible");
    const onDown = () => dot?.classList.add("is-down");
    const onUp = () => dot?.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
