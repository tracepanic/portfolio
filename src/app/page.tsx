"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main>
      <section className="home-section">
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          data-aos-delay="300"
          className="image-container"
        >
          <Image
            src={"/me.jpg"}
            alt="Profile Picture"
            width={200}
            height={200}
          />
        </div>
        <article>
          <h4 data-aos="fade-up" data-oas-duration="1000" data-aos-delay="100">
            HI THERE
          </h4>
          <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
            I&apos;m Patrick Obama
          </h2>
          <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="900">
            I am a <span>Senior Full Stack Developer</span>, specializing in{" "}
            <span>web development</span>, with extensive experience in{" "}
            <span>mobile development</span>. My expertise spans across both{" "}
            <span>backend and frontend</span> technologies, along with{" "}
            <span>mobile platforms</span>. I am passionate about{" "}
            <span>open-source</span> contributions and have a proven track
            record of delivering high-quality work, backed by strong
            recommendations from previous projects and work places. In my free
            time, I continually expand my knowledge by exploring new
            advancements in the development space.
          </p>
        </article>
      </section>
    </main>
  );
}
