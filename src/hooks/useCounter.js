import { useEffect, useState } from "react";
import { usePrefs } from "../context/PrefsContext";

// Eases from 0 to `target` once `start` flips true.
export function useCounter(target, { start = true, duration = 1600, decimals = 0 } = {}) {
  const { reducedMotion } = usePrefs();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start || reducedMotion) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reducedMotion]);

  return (reducedMotion && start ? target : value).toFixed(decimals);
}
