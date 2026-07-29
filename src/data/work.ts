export type Job = {
  role: string;
  company: string;
  url: string;
  period: string;
  description: string;
};

export const work: Job[] = [
  {
    role: "Frontend & Docs Engineer",
    company: "Plakar",
    url: "https://plakar.io",
    period: "Jan 2026 — Present",
    description:
      "Maintaining and improving documentation platform. Restructured docs using Diátaxis framework. Test Plakar backup workflows across platforms. Write guides for setting up automated backups on cloud infrastructure (e.g. OVHcloud).",
  },
  {
    role: "Full-Stack Developer",
    company: "Compyle AI",
    url: "https://compyle.ai",
    period: "Sep 2025 — Present",
    description:
      "Built community platform for AI coding agent ecosystem. Developed features for hackathons and app publishing. Worked with Next.js, TanStack, Drizzle, PostgreSQL.",
  },
  {
    role: "Assistant Learner Experience Manager",
    company: "Power Learn Project Africa",
    url: "https://www.powerlearnprojectafrica.org",
    period: "Jul — Oct 2024",
    description:
      "Taught web development to students (Node.js, MySQL, JavaScript). Provided mentorship and curriculum support. Facilitated skill development in web technologies.",
  },
  {
    role: "Lead Frontend Developer",
    company: "GODAN Kenya",
    url: "https://www.godan.info",
    period: "Apr — Jul 2024",
    description:
      "Led team of 5 developers building farmers and logistics management system. Integrated Google Maps for farm visualization. Presented platform progress to stakeholders. Used React, TypeScript, Redux, Open Street Map.",
  },
];
