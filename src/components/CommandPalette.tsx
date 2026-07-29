import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";
import { getTheme, setTheme } from "@/lib/theme";

type Command = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

export function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const pages: Command[] = [
      { id: "home", label: "Home", hint: "page", run: () => navigate({ to: "/" }) },
      { id: "projects", label: "Projects", hint: "page", run: () => navigate({ to: "/projects" }) },
      { id: "work", label: "Work", hint: "page", run: () => navigate({ to: "/work" }) },
      { id: "stack", label: "Stack", hint: "page", run: () => navigate({ to: "/stack" }) },
      { id: "writing", label: "Writing", hint: "page", run: () => navigate({ to: "/writing" }) },
      { id: "changelog", label: "Changelog", hint: "page", run: () => navigate({ to: "/changelog" }) },
      { id: "contact", label: "Contact", hint: "page", run: () => navigate({ to: "/contact" }) },
    ];

    const actions: Command[] = [
      {
        id: "theme",
        label: "Toggle light / dark",
        hint: "theme",
        run: () => setTheme(getTheme() === "dark" ? "light" : "dark"),
      },
      { id: "github", label: "GitHub", hint: "external", run: () => window.open(site.github, "_blank", "noopener,noreferrer") },
      { id: "linkedin", label: "LinkedIn", hint: "external", run: () => window.open(site.linkedin, "_blank", "noopener,noreferrer") },
      { id: "email", label: "Email", hint: "external", run: () => { window.location.href = `mailto:${site.email}`; } },
    ];

    return [...pages, ...actions];
  }, [navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.includes(q),
    );
  }, [commands, query]);

  // Global open/close: Cmd/Ctrl+K toggles, Escape closes, plus a custom event
  // so the footer button can open it too.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset selection as results change
  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  function exec(cmd: Command) {
    setOpen(false);
    cmd.run();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[active];
      if (cmd) exec(cmd);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-black/10"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-sm border border-border bg-bg">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Jump to…"
          aria-label="Search commands"
          className="w-full bg-transparent px-3 py-2.5 text-sm outline-none border-b border-border"
        />
        <ul className="max-h-72 overflow-y-auto">
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted">No matches</li>
          ) : (
            filtered.map((cmd, i) => (
              <li key={cmd.id}>
                <button
                  type="button"
                  onMouseMove={() => setActive(i)}
                  onClick={() => exec(cmd)}
                  className={`w-full px-3 py-1.5 text-left ${
                    i === active
                      ? "text-[0.95rem] font-semibold text-fg"
                      : "text-sm text-muted"
                  }`}
                >
                  {cmd.label}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
