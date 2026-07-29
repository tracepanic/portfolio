import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/data/site";
import { work } from "@/data/work";

export const Route = createFileRoute("/work")({
  head: () => ({ meta: [{ title: `Work Experience — ${site.name}` }] }),
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
          {work.map((job) => (
            <div key={`${job.company}-${job.period}`}>
              <p className="font-semibold">
                {job.role} ({job.period})
              </p>
              <p className="text-muted">
                <a
                  href={job.url}
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {job.company}
                </a>
              </p>
              <p className="mt-2 max-w-prose">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
