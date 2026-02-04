import { getPostBySlug } from "@/lib/posts";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <>
      <Link to="/" className="text-sm">
        ← <span className="underline">home</span>
      </Link>

      <article className="mt-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold max-w-prose wrap-break-word">
            {post.title}
          </h1>
          <p className="text-xs text-gray-600">{post.date}</p>
        </div>

        <div
          className="mt-8 prose prose-sm"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      <div className="pt-5 mt-20 border-t border-gray-200">
        <Link to="/blog" className="text-sm">
          ← <span className="underline">All Blogs</span>
        </Link>
      </div>
    </>
  );
}
