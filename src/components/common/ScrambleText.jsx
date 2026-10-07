import { useEffect, useState } from "react";
import { useIntersection } from "../../hooks/useIntersection";
import { usePrefs } from "../../context/PrefsContext";

const GLYPHS = "01<>/{}[]#_=+*";

// Decodes `text` from random glyphs, left to right, the first time it scrolls
// into view. Server HTML (what crawlers read) always has the real text.
export default function ScrambleText({ text, className = "", duration = 700 }) {
  const [ref, inView] = useIntersection({ threshold: 0.6 });
  const { reducedMotion } = usePrefs();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const fixed = Math.floor(p * text.length);
      setShown(
        text
          .split("")
          .map((ch, i) => (i < fixed || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join("")
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reducedMotion, text, duration]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
