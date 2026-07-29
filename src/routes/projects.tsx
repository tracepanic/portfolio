import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: `Projects — ${site.name}` }] }),
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
          {projects.map((project) => (
            <div key={project.name}>
              <p className="font-semibold">{project.name}</p>
              <p className="text-muted mt-1">{project.tagline}</p>
              <p className="mt-2 max-w-prose">{project.description}</p>
              <div className="mt-2 space-x-3">
                {project.code && (
                  <a
                    href={project.code}
                    className="underline text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    className="underline text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
