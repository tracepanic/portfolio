import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Patrick Obama</h1>
        <p className="mt-2">
          Full-stack developer building secure, performant web applications with
          Next.js, NestJS, TanStack, TypeScript and PostgreSQL.
        </p>
      </div>

      <div className="space-y-3 mt-10">
        <p>This site contains:</p>
        <ul className="space-y-1 pl-4">
          <li>
            →{" "}
            <Link to="/projects" className="underline">
              projects
            </Link>
            : things I've built
          </li>
          <li>
            →{" "}
            <Link to="/work" className="underline">
              work
            </Link>
            : where I've worked
          </li>
          <li>
            →{" "}
            <Link to="/stack" className="underline">
              stack
            </Link>
            : tools and tech I use
          </li>
          <li>
            →{" "}
            <Link to="/contact" className="underline">
              contact
            </Link>
            : ways to reach me
          </li>
        </ul>
      </div>

      <div className="pt-5 mt-20 border-t border-gray-200">
        <p className="text-xs mb-2">Recent Changes</p>
        <ul className="space-y-1 text-sm">
          <li>2026-02-04 — Redesign portfolio</li>
        </ul>
      </div>
    </>
  );
}
