import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  component: Projects,
});

function Projects() {
  return (
    <>
      <Link to="/" className="text-sm">
        ← <span className="underline">home</span>
      </Link>

      <div className="mt-10">
        <h1 className="text-lg font-semibold">Projects</h1>

        <div className="space-y-8 mt-5 ml-2 text-sm">
          <div>
            <p className="font-semibold">Compyle Community Platform</p>
            <p className="text-gray-600 mt-1">
              Community platform for Compyle AI.
            </p>
            <p className="mt-2 max-w-prose">
              Built platform for hosting hackathons and publishing apps created
              with Compyle AI. Handles user management, event organization, and
              app marketplace. Built with Next.js, Tanstack, Drizzle,
              PostgreSQL.
            </p>
            <div className="mt-2 space-x-3">
              <a
                href="https://github.com/tracepanic/compyle"
                className="underline text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                code
              </a>
              <a
                href="https://compyle.tracepanic.com"
                className="underline text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                live
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold">Skill Bridge</p>
            <p className="text-gray-600 mt-1">
              AI-powered learning platform that generates courses and learning
              paths.
            </p>
            <p className="mt-2 max-w-prose">
              Built for IBM 2025 Global Hackathon. Generates personalized
              courses and learning paths based on user input and resume
              analysis. Built with TypeScript, Next.js, IBM Granite AI models.
            </p>
            <div className="mt-2 space-x-3">
              <a
                href="https://github.com/tracepanic/skillbridge"
                className="underline text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                code
              </a>
              <a
                href="https://skillbridge.tracepanic.com"
                className="underline text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                live
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold">Link Space</p>
            <p className="text-gray-600 mt-1">
              Platform to manage and share links, notes, and content.
            </p>
            <p className="mt-2 max-w-prose">
              Built for 2025 Next.js Global Hackathon. Manages personal links
              and content collections with sharing capabilities. TypeScript,
              Next.js, Server Actions, Prisma, Tailwind CSS.
            </p>
            <div className="mt-2 space-x-3">
              <a
                href="https://github.com/tracepanic/link-space"
                className="underline text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                code
              </a>
              <a
                href="https://spaces.tracepanic.com"
                className="underline text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                live
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold">Luzin</p>
            <p className="text-gray-600 mt-1">
              Full-stack learning management system.
            </p>
            <p className="mt-2 max-w-prose">
              Feature-rich LMS with course management, user enrollment, and
              progress tracking. Built with TypeScript, Next.js, Prisma,
              Tanstack, Tailwind CSS.
            </p>
            <div className="mt-2 space-x-3">
              <a
                href="https://github.com/luzin-labs/luzin"
                className="underline text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                code
              </a>
              <a
                href="https://luzin-docs.vercel.app/"
                className="underline text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                live
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold">Open Craft</p>
            <p className="text-gray-600 mt-1">
              Infinite crafting game for CLI, Telegram, and web.
            </p>
            <p className="mt-2 max-w-prose">
              Version of Infinite Craft that runs in the CLI, as a Telegram bot,
              or as a backend server. Written in Go.
            </p>
            <div className="mt-2 space-x-3">
              <a
                href="https://github.com/tracepanic/opencraft"
                className="underline text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                code
              </a>
            </div>
          </div>
        </div>

        <div className="pt-5 mt-20 border-t border-gray-200">
          <p className="text-sm">Last updated: 04 February 2026</p>
        </div>
      </div>
    </>
  );
}
