import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/work")({
  component: Work,
});

function Work() {
  return (
    <>
      <Link to="/" className="text-sm">
        ← <span className="underline">home</span>
      </Link>

      <div className="mt-10">
        <h1 className="text-lg font-semibold">Work Experience</h1>

        <div className="space-y-8 mt-5 ml-2 text-sm">
          <div>
            <p className="font-semibold">
              Documentation Engineer (Jan 2026 — Present)
            </p>
            <p className="text-gray-600">
              <a
                href="https://plakar.io"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plakar
              </a>
            </p>
            <p className="mt-2 max-w-prose">
              Maintaining and improving documentation platform. Restructured
              docs using Diátaxis framework. Test Plakar backup workflows across
              platforms. Write guides for setting up automated backups on cloud
              infrastructure (e.g. OVHcloud).
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Full-Stack Developer (Sep 2025 — Present)
            </p>
            <p className="text-gray-600">
              <a
                href="https://compyle.ai"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Compyle AI
              </a>
            </p>
            <p className="mt-2 max-w-prose">
              Built community platform for AI coding agent ecosystem. Developed
              features for hackathons and app publishing. Worked with Next.js,
              Tanstack, Drizzle, PostgreSQL.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Assistant Learner Experience Manager (Jul — Oct 2024)
            </p>
            <p className="text-gray-600">
              <a
                href="https://www.powerlearnprojectafrica.org"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Power Learn Project Africa
              </a>
            </p>
            <p className="mt-2 max-w-prose">
              Taught web development to students (Node.js, MySQL, JavaScript).
              Provided mentorship and curriculum support. Facilitated skill
              development in web technologies.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Lead Frontend Developer (Apr — Jul 2024)
            </p>
            <p className="text-gray-600">
              <a
                href="https://www.godan.info"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GODAN Kenya
              </a>
            </p>
            <p className="mt-2 max-w-prose">
              Led team of 5 developers building farmers and logistics management
              system. Integrated Google Maps for farm visualization. Presented
              platform progress to stakeholders. Used React, TypeScript, Redux,
              Open Street Map.
            </p>
          </div>
        </div>

        <div className="pt-5 mt-20 border-t border-gray-200">
          <p className="text-sm">Last updated: 04 February 2026</p>
        </div>
      </div>
    </>
  );
}
