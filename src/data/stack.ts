export type StackGroup = {
  label: string;
  items: string[];
};

export const stack: StackGroup[] = [
  { label: "Languages", items: ["TypeScript", "Python", "Go"] },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Vite", "TanStack"],
  },
  { label: "Backend", items: ["Node.js", "NestJS", "PostgreSQL"] },
  { label: "Tools", items: ["Git", "Docker", "Linux", "Neovim"] },
];
