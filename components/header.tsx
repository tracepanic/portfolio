import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { HEADER_NAVS } from "@/data";
import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto border-x border-dashed px-4 md:px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">PO</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {HEADER_NAVS.map((nav) => (
            <Link
              key={nav.id}
              href={nav.link}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {nav.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export { Header };
