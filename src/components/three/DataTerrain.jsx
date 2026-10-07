import { useEffect, useRef, useState } from "react";
import { usePrefs } from "../../context/PrefsContext";
import { useThemeTokens } from "../../hooks/useThemeTokens";

// Decorative 3D backdrop for the hero. Three.js is fetched only after the
// page is idle, so it never competes with the first paint or the intro.
export default function DataTerrain() {
  const hostRef = useRef(null);
  const sceneRef = useRef(null);
  const [ready, setReady] = useState(false);
  const { reducedMotion } = usePrefs();
  const tokens = useThemeTokens();
  const reducedRef = useRef(reducedMotion);

  useEffect(() => {
    reducedRef.current = reducedMotion;
    sceneRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    sceneRef.current?.refreshTheme();
  }, [tokens]);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      import("../../lib/three/terrain.js")
        .then(({ createTerrain }) => {
          if (cancelled || !hostRef.current) return;
          sceneRef.current = createTerrain(hostRef.current, { reducedMotion: reducedRef.current });
          setReady(true);
        })
        .catch(() => {
          /* No WebGL (or blocked): the hero simply has no 3D backdrop. */
        });

    const introLeft = document.documentElement.dataset.intro === "on" ? 2300 : 0;
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    const timer = setTimeout(() => idle(load), introLeft + 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return <div ref={hostRef} className={`hero__3d${ready ? " is-ready" : ""}`} aria-hidden="true" />;
}
