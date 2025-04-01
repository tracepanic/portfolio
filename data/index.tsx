import { FooterLinks, HeaderNavs, Project } from "@/types";

const HEADER_NAVS: HeaderNavs = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Profile", link: "/profile" },
  { id: 3, name: "Projects", link: "/projects" },
  { id: 4, name: "Blog", link: "/blog" },
  { id: 5, name: "Contact", link: "/contact" },
];

const FOOTER_LINKS: FooterLinks = [
  { id: 1, name: "Github", link: "https://github.com/tracepanic" },
  {
    id: 2,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/patrick-obama-8269152bb",
  },
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Learn Sphere",
    description: "A full stack feature rich learning managment system (LMS)",
    image: "/projects/learn-sphere.png",
    technologies: ["Next.js", "Nest.js", "Tailwind CSS", "Prisma"],
    github: "https://github.com/tracepanic/learn-sphere",
    demo: "https://learn-sphere-web.vercel.app",
    category: "web",
    featured: true,
  },
  {
    id: 2,
    title: "Open Craft",
    description:
      "A version of infinite craft game that you can play on the terminal, run as a telegram bot or as a backend web server for any client",
    image: "/projects/open-craft.png",
    technologies: ["Golang"],
    github: "https://github.com/tracepanic/open-craft",
    demo: "https://github.com/tracepanic/open-craft",
    category: "games",
    featured: true,
  },
];

const GENERAL_SKILLS: string[] = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "NestJS",
  "Tailwind CSS",
  "Golang",
  "PostgreSQL",
  "Git",
];

const EXPERIENCE = [
  {
    id: 1,
    title: "Ass. Learner Experience Manager",
    company: "Power Learn Project Africa",
    period: "Jul 2024 - Oct 2024",
    description:
      "Taught students web development with HMTL, CSS, JavaScript, Node.js and MySQL while enhancing overall learner experience through mentorship, curriculum support, and engagement initiatives to ensure effective skill development.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL", "Express"],
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Godan Kenya",
    period: "Apr 2024 - Jul 2024",
    description:
      "Led the development and launch of a comprehensive farmers and logistics management system, overseeing the management of farmers, farms, produce, and farm hubs while streamlining logistics and supply chain operations for efficiency and scalability.",
    technologies: ["React", "Redux", "Google Maps"],
  },
];

const TECH_CATEGORIES = [
  {
    name: "Frontend",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Motion",
    ],
  },
  {
    name: "Backend",
    technologies: ["Node.js", "Express", "NestJS", "REST API", "Golang"],
  },
  {
    name: "Database",
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "Mongoose"],
  },
  {
    name: "DevOps",
    technologies: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Vercel"],
  },
  {
    name: "Testing",
    technologies: ["Jest"],
  },
  {
    name: "Mobile",
    technologies: ["React Native", "Expo"],
  },
];

// const education = [
//   {
//     degree: "Master of Computer Science",
//     school: "Stanford University",
//     years: "2016 - 2018",
//   },
//   {
//     degree: "Bachelor of Science in Computer Engineering",
//     school: "University of California, Berkeley",
//     years: "2012 - 2016",
//   },
// ];

export {
  HEADER_NAVS,
  FOOTER_LINKS,
  PROJECTS,
  GENERAL_SKILLS,
  EXPERIENCE,
  TECH_CATEGORIES,
};
