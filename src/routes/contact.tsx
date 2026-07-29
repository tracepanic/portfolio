import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: `Contact — ${site.name}` }] }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <Link to="/" className="text-sm">
        ← <span className="underline">home</span>
      </Link>

      <div className="mt-10">
        <h1 className="text-lg font-semibold">Contact</h1>

        <div className="space-y-4 mt-5 ml-2 text-sm">
          <div>
            <p className="text-muted mb-1">Email</p>
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
          </div>

          <div>
            <p className="text-muted mb-1">GitHub</p>
            <a
              href={site.github}
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/{site.githubHandle}
            </a>
          </div>

          <div>
            <p className="text-muted mb-1">LinkedIn</p>
            <a
              href={site.linkedin}
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.linkedin}
            </a>
          </div>
        </div>

        <div className="pt-5 mt-20 border-t border-border">
          <p className="text-sm">Response time: usually within 24 hours.</p>
        </div>
      </div>
    </>
  );
}
