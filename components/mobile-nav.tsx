import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FOOTER_LINKS, HEADER_NAVS } from "@/data";
import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button className="cursor-pointer" variant="outline" size="icon">
          <Menu className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mt-10">
          <SheetTitle className="text-xl font-semibold">
            Patrick Obama
          </SheetTitle>
          <SheetDescription>
            A passionate full-stack developer specializing in building
            exceptional digital experiences.
          </SheetDescription>
        </SheetHeader>
        <div className="pl-10 mt-10">
          <h3 className="underline">Navigation Links</h3>
          <nav className="mt-4 pl-4 flex flex-col gap-2 w-fit">
            {HEADER_NAVS.map((nav) => (
              <SheetClose key={nav.id} asChild>
                <Link
                  href={nav.link}
                  className="text-sm w-fit font-medium transition-colors hover:text-primary"
                >
                  {nav.name}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>
        <SheetFooter>
          <h4 className="font-semibold underline">Get in touch:</h4>
          <div className="flex items-center gap-3 text-sm">
            {FOOTER_LINKS.map((link, index) => (
              <React.Fragment key={link.id}>
                <SheetClose asChild>
                  <Link
                    target="_blank"
                    href={link.link}
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </SheetClose>
                {index < FOOTER_LINKS.length - 1 && (
                  <span className="text-muted-foreground">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };
