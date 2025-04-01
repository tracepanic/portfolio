import { FOOTER_LINKS } from "@/data";
import Link from "next/link";
import * as React from "react";

function Footer() {
  return (
    <footer className="border-t border-dashed bg-muted/40">
      <div className="container mx-auto border-x border-dashed py-6 md:py-0 px-4 md:px-6 flex flex-col items-center justify-center md:h-24 md:flex-row">
        <div className="text-center text-sm text-muted-foreground flex items-center gap-3">
          Get in touch:
          {FOOTER_LINKS.map((link, index) => (
            <React.Fragment key={link.id}>
              <Link
                target="_blank"
                href={link.link}
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
              {index < FOOTER_LINKS.length - 1 && (
                <span className="text-muted-foreground">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}

export { Footer };
