import { Moon, Sun } from "lucide-react";
import { usePrefs } from "../../context/PrefsContext";
import { useHydrated } from "../../hooks/useHydrated";

// Both icons are always rendered and CSS shows the right one from
// html[data-theme], so the pre-rendered button never flashes the wrong icon.
export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = usePrefs();
  // The appearance is decided in the browser; match the pre-rendered default until hydrated.
  const shown = useHydrated() ? theme : "light";
  const next = shown === "dark" ? "light" : "dark";
  return (
    <button type="button" className={`nav__icon theme-btn ${className}`} onClick={toggleTheme} aria-label={`Switch to ${next} appearance`} title={`Switch to ${next} appearance`}>
      <Sun className="theme-btn__sun" size={16} strokeWidth={1.75} aria-hidden="true" />
      <Moon className="theme-btn__moon" size={16} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
