export type Project = {
  name: string;
  tagline: string;
  description: string;
  code?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Compyle Community Platform",
    tagline: "Community platform for Compyle AI.",
    description:
      "Built platform for hosting hackathons and publishing apps created with Compyle AI. Handles user management, event organization, and app marketplace. Built with Next.js, TanStack, Drizzle, PostgreSQL.",
    code: "https://github.com/tracepanic/compyle",
    live: "https://compyle.tracepanic.com",
    featured: true,
  },
  {
    name: "Skill Bridge",
    tagline:
      "AI-powered learning platform that generates courses and learning paths.",
    description:
      "Built for IBM 2025 Global Hackathon. Generates personalized courses and learning paths based on user input and resume analysis. Built with TypeScript, Next.js, IBM Granite AI models.",
    code: "https://github.com/tracepanic/skillbridge",
    live: "https://skillbridge.tracepanic.com",
    featured: true,
  },
  {
    name: "Link Space",
    tagline: "Platform to manage and share links, notes, and content.",
    description:
      "Built for 2025 Next.js Global Hackathon. Manages personal links and content collections with sharing capabilities. TypeScript, Next.js, Server Actions, Prisma, Tailwind CSS.",
    code: "https://github.com/tracepanic/link-space",
    live: "https://spaces.tracepanic.com",
    featured: true,
  },
  {
    name: "Luzin",
    tagline: "Full-stack learning management system.",
    description:
      "Feature-rich LMS with course management, user enrollment, and progress tracking. Built with TypeScript, Next.js, Prisma, TanStack, Tailwind CSS.",
    code: "https://github.com/luzin-labs/luzin",
    live: "https://luzin-docs.vercel.app/",
  },
  {
    name: "Open Craft",
    tagline: "Infinite crafting game for CLI, Telegram, and web.",
    description:
      "Version of Infinite Craft that runs in the CLI, as a Telegram bot, or as a backend server. Written in Go.",
    code: "https://github.com/tracepanic/opencraft",
  },
];
