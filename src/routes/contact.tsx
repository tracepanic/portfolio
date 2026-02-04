import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
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
            <p className="text-gray-600 mb-1">Email</p>
            <a href="mailto:patrickobamascript@gmail.com" className="underline">
              patrickobamascript@gmail.com
            </a>
          </div>

          <div>
            <p className="text-gray-600 mb-1">GitHub</p>
            <a
              href="https://github.com/tracepanic"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/tracepanic
            </a>
          </div>

          <div>
            <p className="text-gray-600 mb-1">LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/patrick-obama-8269152bb"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.linkedin.com/in/patrick-obama-8269152bb
            </a>
          </div>
        </div>

        <div className="pt-5 mt-20 border-t border-gray-200">
          <p className="text-sm">Response time: usually within 24 hours.</p>
        </div>
      </div>
    </>
  );
}
