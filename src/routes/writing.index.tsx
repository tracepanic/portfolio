import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/data/posts";
import { site } from "@/data/site";

export const Route = createFileRoute("/writing/")({
  head: () => ({ meta: [{ title: `Writing — ${site.name}` }] }),
  component: Writing,
});

function Writing() {
  return (
    <>
      <Link to="/" className="text-sm">
        ← <span className="underline">home</span>
      </Link>

      <div className="mt-10">
        <h1 className="text-lg font-semibold">Writing</h1>

        {posts.length === 0 ? (
          <p className="text-muted text-sm mt-5 ml-2">Nothing here yet.</p>
        ) : (
          <ul className="space-y-6 mt-5 ml-2 text-sm">
            {posts.map((post) => (
              <li key={post.slug}>
                <div>
                  <Link
                    to="/writing/$slug"
                    params={{ slug: post.slug }}
                    className="underline font-semibold"
                  >
                    {post.title}
                  </Link>
                  {post.date && (
                    <span className="text-muted"> — {post.date}</span>
                  )}
                </div>
                {post.description && (
                  <p className="text-muted mt-1 max-w-prose">
                    {post.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
