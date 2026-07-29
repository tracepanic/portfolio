import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost } from "@/data/posts";
import { site } from "@/data/site";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ params }) => {
    const post = getPost(params.slug);
    return {
      meta: [
        { title: post ? `${post.title} — ${site.name}` : `Writing — ${site.name}` },
        ...(post?.description
          ? [{ name: "description", content: post.description }]
          : []),
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <>
      <Link to="/writing" className="text-sm">
        ← <span className="underline">writing</span>
      </Link>

      <article className="mt-10">
        <h1 className="text-lg font-semibold">{post.title}</h1>
        {post.date && <p className="text-muted text-sm mt-1">{post.date}</p>}

        {/* Content comes from local, trusted Markdown files (not user input). */}
        <div
          className="prose prose-sm mt-6"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: rendered from local trusted Markdown
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </>
  );
}
