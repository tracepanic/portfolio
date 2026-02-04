// scripts/build-posts.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDirectory = path.join(__dirname, "../src/posts");
const outputFile = path.join(__dirname, "../src/generated/posts.json");

async function buildPosts() {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    filenames
      .filter((name) => name.endsWith(".md"))
      .map(async (filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        const processedContent = await remark().use(html).process(content);

        const slug = data.slug || filename.replace(".md", "");

        return {
          slug,
          title: data.title,
          date: data.date,
          description: data.description,
          contentHtml: processedContent.toString(),
        };
      }),
  );

  // Ensure directory exists
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to JSON file
  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log(`✅ Built ${posts.length} posts to ${outputFile}`);
}

buildPosts().catch(console.error);
