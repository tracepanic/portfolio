import { Command } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  return (
    <footer className="pt-5 mt-20 border-t border-border flex items-center justify-between text-xs text-muted">
      <span>© {new Date().getFullYear()} Patrick Obama</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new Event("open-command-palette"))
          }
          className="flex items-center gap-0.5 text-sm leading-none hover:text-fg transition-colors"
          aria-label="Open command palette"
        >
          <Command size={14} />
          <span>K</span>
        </button>
        <ThemeToggle />
      </div>
    </footer>
  );
}
