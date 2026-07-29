import { createFileRoute, Link } from "@tanstack/react-router";
import { changelog } from "@/data/changelog";
import { site } from "@/data/site";

export const Route = createFileRoute("/changelog")({
  head: () => ({ meta: [{ title: `Changelog — ${site.name}` }] }),
  component: Changelog,
});

function Changelog() {
  return (
    <>
      <Link to="/" className="text-sm">
        ← <span className="underline">home</span>
      </Link>

      <div className="mt-10">
        <h1 className="text-lg font-semibold">Changelog</h1>

        <ul className="space-y-3 mt-5 ml-2 text-sm">
          {changelog.map((entry, i) => (
            <li key={`${entry.date}-${i}`} className="flex gap-4">
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
