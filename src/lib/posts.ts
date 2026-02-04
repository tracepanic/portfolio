import postsData from "@/generated/posts.json";
import type { Post, PostMeta } from "@/types/posts";

const allPosts: Post[] = postsData as Post[];

export function getAllPosts(): PostMeta[] {
  return allPosts
    .map(({ slug, title, date, description }) => ({
      slug,
      title,
      date,
      description,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  return allPosts.find((post) => post.slug === slug) || null;
}
