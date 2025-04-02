import { ProjectCard } from "@/components/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECTS } from "@/data";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Projects" };

export default function Page() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          My Projects
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          A collection of my work, side projects, and open source contributions.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="all">
              All
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="web">
              Web
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="games">
              Games
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="web" className="mt-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.filter((project) => project.category === "web").map(
              (project) => (
                <ProjectCard key={project.title} project={project} />
              ),
            )}
          </div>
        </TabsContent>

        <TabsContent value="games" className="mt-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.filter((project) => project.category === "games").map(
              (project) => (
                <ProjectCard key={project.title} project={project} />
              ),
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
