import { useMemo, useSyncExternalStore } from "react";

// Recharts writes colours as SVG attributes, which can't resolve CSS vars, so
// read the live palette tokens and hand concrete values to the chart. The
// palette attribute on <html> is the external store we subscribe to.
const KEYS = ["accent", "accent-2", "ink", "ink-2", "ink-3", "line", "surface"];

const subscribe = (cb) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-palette"] });
  return () => mo.disconnect();
};
const getPalette = () => document.documentElement.dataset.palette || "";
const getServerPalette = () => "";

export function useThemeTokens() {
  const palette = useSyncExternalStore(subscribe, getPalette, getServerPalette);
  return useMemo(() => {
    if (!palette) return null;
    const cs = getComputedStyle(document.documentElement);
    const next = {};
    KEYS.forEach((k) => (next[k] = cs.getPropertyValue(`--${k}`).trim()));
    return next;
  }, [palette]);
}
