import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/stack")({
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
          <div>
            <p className="text-gray-600 mb-1">Languages</p>
            <p>TypeScript, Python, Go</p>
          </div>

          <div>
            <p className="text-gray-600 mb-1">Frontend</p>
            <p>React, Next.js, Tailwind CSS, Vite, Tanstack</p>
          </div>

          <div>
            <p className="text-gray-600 mb-1">Backend</p>
            <p>Node.js, NestJS, PostgreSQL</p>
          </div>

          <div>
            <p className="text-gray-600 mb-1">Tools</p>
            <p>Git, Docker, Linux, Neovim</p>
          </div>
        </div>

        <div className="pt-5 mt-20 border-t border-gray-200">
          <p className="text-sm">Last updated: 04 February 2026</p>
        </div>
      </div>
    </>
  );
}
