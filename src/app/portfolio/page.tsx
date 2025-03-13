"use client";

import { projects } from "@/data/index";
import { ExternalLink, Github } from "lucide-react";

export default function Portfolio() {
  return (
    <main>
      <section className="portfolio-section">
        <h1>Portfolio</h1>
        <p>
          Welcome to my portfolio! Here, you&apos;ll find a showcase of my
          projects. I&apos;m always developing new and exciting work, so make
          sure to check back regularly!
        </p>
        <ul>
          {projects.map((item, index) => {
            return (
              <li key={index} className="project">
                <div>
                  <Github size={30} />
                </div>
                <section>
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                  <div>
                    <a href={item.linkOne} target="_blank" rel="noreferrer">
                      <span>WEBSITE</span>
                      <ExternalLink size={14} />
                    </a>
                    <a href={item.linkTwo} target="_blank" rel="noreferrer">
                      <span>CODE</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </section>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
