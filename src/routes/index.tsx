import { createFileRoute, Link } from "@tanstack/react-router";
import { changelog } from "@/data/changelog";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">{site.name}</h1>
        <p className="mt-2 max-w-prose">{site.bio}</p>
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
            <Link to="/writing" className="underline">
              writing
            </Link>
            : notes and posts
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

      <div className="pt-5 mt-20 border-t border-border">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-xs">Recent Changes</p>
          <Link to="/changelog" className="text-xs underline">
            all →
          </Link>
        </div>
        <ul className="space-y-1 text-sm">
          {changelog.slice(0, 4).map((entry, i) => (
            <li key={`${entry.date}-${i}`} className="flex gap-3">
              <span className="text-muted tabular-nums shrink-0">
                {entry.date}
              </span>
              <span>{entry.summary}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
