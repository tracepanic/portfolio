import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/data/site";
import { stack } from "@/data/stack";

export const Route = createFileRoute("/stack")({
  head: () => ({ meta: [{ title: `Tech Stack — ${site.name}` }] }),
  component: Stack,
});

function Stack() {
  return (
    <>
      <Link to="/" className="text-sm">
        ← <span className="underline">home</span>
      </Link>

      <div className="mt-10">
        <h1 className="text-lg font-semibold">Tech Stack</h1>

        <div className="space-y-6 mt-5 ml-2 text-sm">
          {stack.map((group) => (
            <div key={group.label}>
              <p className="text-muted mb-1">{group.label}</p>
              <p>{group.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
