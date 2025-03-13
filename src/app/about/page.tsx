"use client";

import { Lists } from "@/components/lists";
import { Work } from "@/components/work";

export default function About() {
  return (
    <main>
      <section className="about-section">
        <h1>About me</h1>
        <div>
          <div className="title">
            <h2>Profile</h2>
          </div>
          <article>
            <p>
              I am a <span>Senior Full Stack Developer</span>, specializing in{" "}
              <span>web development</span>, with extensive experience in{" "}
              <span>mobile development</span>. My expertise spans across both{" "}
              <span>backend and frontend</span> technologies, along with{" "}
              <span>mobile platforms</span>. I am passionate about{" "}
              <span>open-source</span> contributions and have a proven track
              record of delivering high-quality work, backed by strong
              recommendations from previous projects and work places. In my free
              time, I continually expand my knowledge by exploring new
              advancements in the development space.{" "}
            </p>
          </article>
        </div>
        <div>
          <Work />
        </div>
        <div>
          <Lists />
        </div>
      </section>
    </main>
  );
}
