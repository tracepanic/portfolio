export const site = {
  name: "Patrick Obama",
  role: "Frontend & Docs Engineer",
  bio: "Full-stack developer building secure, performant web applications with Next.js, NestJS, TanStack, TypeScript and PostgreSQL.",
  current: {
    role: "Frontend & Docs Engineer",
    company: "Plakar",
    url: "https://plakar.io",
  },
  url: "https://tracepanic.com",
  email: "patrickobamascript@gmail.com",
  github: "https://github.com/tracepanic",
  githubHandle: "tracepanic",
  linkedin: "https://www.linkedin.com/in/patrick-obama-8269152bb",
} as const;

export const nav = [
  { to: "/projects", label: "projects" },
  { to: "/work", label: "work" },
  { to: "/stack", label: "stack" },
  { to: "/contact", label: "contact" },
] as const;
