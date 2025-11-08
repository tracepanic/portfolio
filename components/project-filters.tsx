"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useInteractive } from "@/contexts/interactive-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { X, Filter } from "lucide-react";

interface ProjectFiltersProps {
  projects: any[];
  onFilteredProjects: (projects: any[]) => void;
}

const FILTER_CONFIG = {
  technologies: [
    "TypeScript", "Next.js", "React.js", "Node.js", "Tailwind CSS",
    "Prisma", "Nest.js", "Golang", "Server Actions"
  ],
  projectTypes: [
    "Web Application", "Mobile App", "API", "E-commerce", "SaaS"
  ],
  status: [
    "Completed", "In Progress", "Prototype"
  ]
};

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  projects,
  onFilteredProjects
}) => {
  const { filters, setFilters, clearFilters } = useInteractive();
  const [isExpanded, setIsExpanded] = useState(false);

  // Debounced filtering
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Technology filter
      if (debouncedFilters.technologies.length > 0) {
        const hasMatchingTech = debouncedFilters.technologies.some(tech =>
          project.technologies.includes(tech)
        );
        if (!hasMatchingTech) return false;
      }

      // Project type filter
      if (debouncedFilters.projectTypes.length > 0) {
        if (!debouncedFilters.projectTypes.includes(project.projectType)) {
          return false;
        }
      }

      // Status filter
      if (debouncedFilters.status.length > 0) {
        if (!debouncedFilters.status.includes(project.status)) {
          return false;
        }
      }

      return true;
    });
  }, [projects, debouncedFilters]);

  useEffect(() => {
    onFilteredProjects(filteredProjects);
  }, [filteredProjects, onFilteredProjects]);

  const hasActiveFilters = filters.technologies.length > 0 ||
                          filters.projectTypes.length > 0 ||
                          filters.status.length > 0;

  const handleFilterToggle = (category: keyof typeof filters, value: string) => {
    const currentFilters = filters[category];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];

    setFilters({
      ...filters,
      [category]: newFilters
    });
  };

  const getFilterCount = () => {
    return filters.technologies.length + filters.projectTypes.length + filters.status.length;
  };

  return (
    <Card className="w-full mb-8 bg-muted/30 border-dashed">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Project Filters</h3>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {getFilterCount()} active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        </div>

        <div className={`space-y-6 ${!isExpanded ? 'max-h-32 overflow-hidden' : ''}`}>
          {/* Technology Filters */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {FILTER_CONFIG.technologies.map(tech => (
                <Button
                  key={tech}
                  variant={filters.technologies.includes(tech) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterToggle('technologies', tech)}
                  className="text-xs h-8"
                >
                  {tech}
                </Button>
              ))}
            </div>
          </div>

          {/* Project Type Filters */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Project Types</h4>
            <div className="flex flex-wrap gap-2">
              {FILTER_CONFIG.projectTypes.map(type => (
                <Button
                  key={type}
                  variant={filters.projectTypes.includes(type) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterToggle('projectTypes', type)}
                  className="text-xs h-8"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Status Filters */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Status</h4>
            <div className="flex flex-wrap gap-2">
              {FILTER_CONFIG.status.map(status => (
                <Button
                  key={status}
                  variant={filters.status.includes(status) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterToggle('status', status)}
                  className="text-xs h-8"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </CardContent>
    </Card>
  );
};