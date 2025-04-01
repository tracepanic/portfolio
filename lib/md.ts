import { Post, PostMeta } from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      title: data.title,
      tags: data.tags,
      image: data.image,
      isLatest: data.isLatest,
      slug: data.slug || filename.replace(".md", ""),
      date: data.date,
      description: data.description,
      readTime: data.readTime,
    };
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title,
    tags: data.tags,
    slug: data.slug,
    date: data.date,
    isLatest: data.isLatest,
    image: data.image,
    description: data.description,
    readTime: data.readTime,
    contentHtml,
  };
}
