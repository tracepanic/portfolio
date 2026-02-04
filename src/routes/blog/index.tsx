import { getAllPosts } from "@/lib/posts";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  component: Blog,
  loader: () => {
    const posts = getAllPosts();
    return { posts };
  },
});

function Blog() {
  const { posts } = Route.useLoaderData();

  return (
    <>
      <Link to="/" className="text-sm">
        ← <span className="underline">home</span>
      </Link>

      <div className="mt-8">
        <h1 className="text-lg font-semibold">Blog</h1>

        <div className="space-y-6 mt-5 ml-2 text-sm">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block group"
              >
                <p className="font-semibold max-w-prose group-hover:underline">
                  {post.title}
                </p>
                <p className="text-gray-600 text-xs mt-1">{post.date}</p>
                <p className="text-gray-700 max-w-prose mt-1">
                  {post.description}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <div className="pt-5 mt-20 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>
    </>
  );
}
