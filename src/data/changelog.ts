export type ChangelogEntry = {
  date: string; // ISO: YYYY-MM-DD
  summary: string;
};

const entries: ChangelogEntry[] = [
  { date: "2026-07-29", summary: "Add ⌘K command palette and a markdown blog" },
  { date: "2026-07-29", summary: "Add dark mode with a light/dark switch" },
  { date: "2026-02-04", summary: "Redesign portfolio" },
];

// Always newest first, regardless of authoring order.
export const changelog: ChangelogEntry[] = [...entries].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);
