"use client";

import React, { useState } from "react";
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
import { Clock, Users, Eye, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Prototype':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-xl max-w-sm pt-0 px-0 group hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image with Hover Overlay */}
      <div className="aspect-video h-44 overflow-hidden relative">
        <Image
          src={project.image || "/placeholder.png"}
          alt={project.title}
          width={600}
          height={500}
          className="object-cover h-full transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center justify-between mb-2">
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
              <div className="flex items-center gap-1 text-xs">
                <Clock className="h-3 w-3" />
                {project.duration}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Users className="h-3 w-3" />
              <span>{project.teamSize}</span>
              <span>•</span>
              <span>{project.clientType}</span>
            </div>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <Badge variant="outline" className="text-xs whitespace-nowrap">
            {project.projectType}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.slice(0, isHovered ? undefined : 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {!isHovered && project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>

        {/* Quick View Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`w-full transition-all duration-300 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
        >
          <Eye className="h-4 w-4 mr-2" />
          Quick View
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>

      <CardFooter className="mt-auto">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="cursor-pointer flex-1" variant="outline">
              View Details
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-4 flex flex-col items-center">
            <DrawerHeader className="text-center max-w-lg">
              <DrawerTitle>{project.title}</DrawerTitle>
              <DrawerDescription>{project.description}</DrawerDescription>

              {/* Project Metadata */}
              <div className="grid grid-cols-3 gap-4 w-full mt-4">
                <div className="text-center">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Status</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-medium">
                    <Clock className="h-3 w-3" />
                    {project.duration}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Duration</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-medium">
                    <Users className="h-3 w-3" />
                    {project.teamSize}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Team</p>
                </div>
              </div>

              <div className="text-center mt-3">
                <Badge variant="outline" className="text-sm">
                  {project.clientType} • {project.projectType}
                </Badge>
              </div>

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
                <Button className="cursor-pointer w-56">Close</Button>
              </DrawerClose>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
}

export { ProjectCard };
