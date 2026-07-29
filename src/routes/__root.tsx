import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: `${site.name} — Portfolio | ${site.role}` },
      { name: "description", content: site.bio },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <HeadContent />
      <CommandPalette />
      <div className="container px-6 py-4 mx-auto">
        <Outlet />
        <Footer />
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{ position: "bottom-right" }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <>
      <Link to="/" className="text-sm">
        ← <span className="underline">home</span>
      </Link>

      <div className="mt-10">
        <h1 className="text-lg font-semibold">404 — Page not found</h1>
        <p className="mt-2 text-muted text-sm">That page doesn’t exist.</p>
      </div>
    </>
  );
}
