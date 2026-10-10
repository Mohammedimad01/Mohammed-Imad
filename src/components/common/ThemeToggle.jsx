import { Moon, Sun } from "lucide-react";
import { usePrefs } from "../../context/PrefsContext";
import { useHydrated } from "../../hooks/useHydrated";

// Both icons are always rendered and CSS shows the right one from
// html[data-theme], so the pre-rendered button never flashes the wrong icon.
export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = usePrefs();
  // Saved theme lives in localStorage; match the pre-rendered default until hydrated.
  const shown = useHydrated() ? theme : "dark";
  const next = shown === "dark" ? "light" : "dark";
  return (
    <button type="button" className={`theme-btn ${className}`} onClick={toggleTheme} aria-label={`Switch to ${next} theme`} title={`Switch to ${next} theme`}>
      <Sun className="theme-btn__sun" size={15} aria-hidden="true" />
      <Moon className="theme-btn__moon" size={15} aria-hidden="true" />
    </button>
  );
}
