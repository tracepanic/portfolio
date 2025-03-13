"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navs } from "@/data/index";
import { Theme } from "@/components/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <header>
      <section>
        <button
          className="open-dropdown"
          onClick={() => setDropdown((current) => !current)}
        >
          <Menu />
        </button>

        <Link className="main-title" href={"/"}>
          PATRICK O.
        </Link>

        <ul>
          {navs.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className={
                    item.link === pathname ? "active-nav" : "inactive-nav"
                  }
                  href={item.link}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {dropdown && (
          <section>
            <button
              className="close-dropdown"
              onClick={() => setDropdown((current) => !current)}
            >
              <X />
            </button>
            <ul>
              {navs.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      onClick={() => setDropdown((current) => !current)}
                      className={
                        item.link === pathname ? "active-nav" : "inactive-nav"
                      }
                      href={item.link}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <Theme />
      </section>
    </header>
  );
};
