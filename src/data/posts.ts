import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  draft: boolean;
  html: string;
};

marked.setOptions({ gfm: true, breaks: false });

// All markdown files under content/blog are bundled at build time as raw text.
const files = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.md$/, "");
}

/**
 * Minimal YAML-ish frontmatter parser (title/date/description/tags/draft).
 * Intentionally tiny so we don't need gray-matter + a Buffer polyfill in the
 * browser bundle. Posts are trusted, local files.
 */
function parseFrontmatter(raw: string): {
  data: Record<string, string | boolean | string[]>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const [, block, body] = match;
  const data: Record<string, string | boolean | string[]> = {};

  for (const line of block.split(/\r?\n/)) {
    const kv = /^(\w[\w-]*):\s*(.*)$/.exec(line);
    if (!kv) continue;
    const [, key, rawValue] = kv;
    const unquoted = rawValue.trim().replace(/^["']|["']$/g, "");

    if (key === "tags") {
      data.tags = rawValue
        .trim()
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((t) => t.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else if (unquoted === "true" || unquoted === "false") {
      data[key] = unquoted === "true";
    } else {
      data[key] = unquoted;
    }
  }

  return { data, body };
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const slug = (data.slug as string) || slugFromPath(path);
    return {
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || "",
      description: data.description as string | undefined,
      tags: data.tags as string[] | undefined,
      draft: data.draft === true,
      html: marked.parse(body) as string,
    };
  })
  // Drafts are visible in dev only.
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
