import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg max-w-sm pt-0 px-0">
      <div className="aspect-video h-44 overflow-hidden">
        <Image
          src={project.image || "/placeholder.png"}
          alt={project.title}
          width={600}
          height={500}
          className="object-cover h-full transition-transform duration-200 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="cursor-pointer" variant="outline">
              View Details
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-4 flex flex-col items-center">
            <DrawerHeader className="text-center max-w-lg">
              <DrawerTitle>{project.title}</DrawerTitle>
              <DrawerDescription>{project.description}</DrawerDescription>
              <div className="flex flex-wrap justify-center gap-2 mt-5">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-center gap-2 my-6">
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="cursor-pointer" variant="outline">
                    Github
                  </Button>
                </Link>

                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="cursor-pointer" variant="outline">
                    Demo
                  </Button>
                </Link>
              </div>

              <DrawerClose className="mx-auto" asChild>
                <Button className="cursor-pointer w-56">Cancel</Button>
              </DrawerClose>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
}

export { ProjectCard };
