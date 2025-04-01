export type HeaderNavs = { id: number; name: string; link: string }[];
export type FooterLinks = HeaderNavs;
export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  featured?: boolean;
  category: "web" | "games";
};
export type PostMeta = {
  title: string;
  tags: string[];
  slug: string;
  date: string;
  image: string;
  isLatest?: boolean;
  description: string;
  readTime: number;
};
export type Post = PostMeta & {
  contentHtml: string;
};
