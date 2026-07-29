export type Theme = "light" | "dark";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore (private mode / storage disabled)
  }
  // Let other components (footer switch, palette) stay in sync.
  window.dispatchEvent(new Event("themechange"));
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}
