import { useEffect, useState } from "react";
import { getTheme, setTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  // The inline script in index.html sets the class before render, so this
  // reads the correct initial value with no flash.
  const [theme, setThemeState] = useState<Theme>(getTheme);

  // Stay in sync when the theme is changed elsewhere (e.g. command palette).
  useEffect(() => {
    const sync = () => setThemeState(getTheme());
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  return (
    <div className="text-xs">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
        className={
          theme === "light"
            ? "text-fg"
            : "text-muted underline hover:text-fg transition-colors"
        }
      >
        light
      </button>
      <span className="text-muted mx-1.5">/</span>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
        className={
          theme === "dark"
            ? "text-fg"
            : "text-muted underline hover:text-fg transition-colors"
        }
      >
        dark
      </button>
    </div>
  );
}
