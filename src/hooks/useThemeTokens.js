import { useMemo, useSyncExternalStore } from "react";

// Recharts writes colours as SVG attributes, which can't resolve CSS vars, so
// read the live tokens and hand concrete values to the chart. The theme
// attribute on <html> is the external store we subscribe to.
const KEYS = ["accent", "link", "ink", "ink-2", "ink-3", "line", "line-soft", "surface"];

const subscribe = (cb) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const getTheme = () => document.documentElement.dataset.theme || "light";
const getServerTheme = () => "";

export function useThemeTokens() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  return useMemo(() => {
    if (!theme) return null;
    const cs = getComputedStyle(document.documentElement);
    const next = {};
    KEYS.forEach((k) => (next[k] = cs.getPropertyValue(`--${k}`).trim()));
    return next;
  }, [theme]);
}
