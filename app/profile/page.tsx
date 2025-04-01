import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EXPERIENCE, GENERAL_SKILLS, PROJECTS, TECH_CATEGORIES } from "@/data";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="relative h-44 w-44 overflow-hidden rounded-full border-8 border-muted">
              <Image
                src="/me.jpg"
                alt="Profile Picture"
                className="object-cover"
                fill
                sizes="100"
                priority
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Patrick Obama</h1>
              <p className="text-muted-foreground">Full Stack Developer</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link
                  href="https://github.com/tracepanic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href="https://www.linkedin.com/in/patrick-obama-8269152bb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="mailto:patrickobamascript@gmail.com">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                I'm a passionate full-stack developer with over 2 years of
                experience building web applications. I specialize in React
                &amp; Next.js for frontend and full stack apps. and Node.js
                using Nest.js and Golang for backend. I'm always trying to learn
                a technology or build something cool.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {GENERAL_SKILLS.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {education.map((edu) => (
                <div key={edu.degree} className="space-y-1">
                  <div className="font-medium">{edu.degree}</div>
                  <div className="text-sm">{edu.school}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{edu.years}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card> */}
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger className="cursor-pointer" value="experience">
                Experience
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="projects">
                Projects
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="tech">
                Tech Stack
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="space-y-6 pt-6">
              <h2 className="text-2xl font-bold">Work Experience</h2>
              {EXPERIENCE.map((job) => (
                <Card key={job.title}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.company}</CardDescription>
                      </div>
                      <Badge>{job.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {job.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="projects" className="space-y-6 pt-6">
              <h2 className="text-2xl font-bold">Featured Projects</h2>
              <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3 mx-auto">
                {PROJECTS.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <div className="flex justify-center">
                <Link href="/projects">
                  <Button className="cursor-pointer">View All Projects</Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="tech" className="space-y-6 pt-6">
              <h2 className="text-2xl font-bold">My Tech Stack</h2>
              <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                {TECH_CATEGORIES.map((category) => (
                  <Card key={category.name}>
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
