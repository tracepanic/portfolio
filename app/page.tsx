import { BlogCard } from "@/components/blog-card";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GENERAL_SKILLS, PROJECTS } from "@/data";
import { getAllPosts } from "@/lib/md";
import { PostMeta } from "@/types";
import { ArrowRight, Code, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const posts: PostMeta[] = getAllPosts();

  const latestPosts = posts.filter((post) => post.isLatest === true);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full px-4 md:px-6 py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="px-2.5 pt-1 pb-0.5 mb-5 text-xs font-semibold cursor-default transition-colors bg-foreground hover:bg-foreground/80">
                Available for hire
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hi, I&apos;m <span className="text-primary">Patrick Obama</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                A passionate full-stack developer specializing in building
                exceptional digital experiences.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/projects">
                <Button className="text-sm font-medium cursor-pointer w-44">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="text-sm font-medium cursor-pointer"
                >
                  Contact Me
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-square overflow-hidden rounded-full border-8 border-muted w-[300px] h-[300px]">
              <Image
                src="/me.jpg"
                alt="Profile Picture"
                className="object-cover"
                fill
                sizes="100"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="w-full border-t border-dashed py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Featured Projects
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out some of my recent work
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t border-dashed">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Latest from the Blog
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Thoughts, insights, and updates from my journey
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="w-full border-t border-dashed py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                My Tech Stack
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Technologies I work with on a daily basis
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {GENERAL_SKILLS.map((tech) => (
              <div key={tech} className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted p-4">
                  <Code />
                </div>
                <h3 className="text-center font-medium">{tech}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t border-dashed mb-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Let&apos;s Work Together
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind? I&apos;m currently available for work.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/contact">
                <Button className="cursor-pointer w-44">
                  Get in Touch
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="cursor-pointer">
                  View Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
