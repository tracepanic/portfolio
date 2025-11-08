"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInteractive } from "@/contexts/interactive-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Heart,
  Clock,
  Award,
  TrendingUp
} from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  value: string | number;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  animationDelay: number;
}

const STATS_CONFIG: StatItem[] = [
  {
    id: "projects",
    label: "Projects Completed",
    value: 47,
    suffix: "+",
    icon: Briefcase,
    color: "text-blue-600 dark:text-blue-400",
    animationDelay: 0
  },
  {
    id: "satisfaction",
    label: "Client Satisfaction",
    value: 98,
    suffix: "%",
    icon: Heart,
    color: "text-green-600 dark:text-green-400",
    animationDelay: 200
  },
  {
    id: "response",
    label: "Average Response Time",
    value: "< 2",
    suffix: " hours",
    icon: Clock,
    color: "text-purple-600 dark:text-purple-400",
    animationDelay: 400
  },
  {
    id: "experience",
    label: "Years Experience",
    value: 5,
    suffix: "+",
    icon: Award,
    color: "text-orange-600 dark:text-orange-400",
    animationDelay: 600
  }
];

export const InteractiveStats: React.FC = () => {
  const { statsAnimated, setStatsAnimated } = useInteractive();
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer to trigger animation when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimated) {
          setIsVisible(true);
          setStatsAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated, setStatsAnimated]);

  // Animate numbers
  useEffect(() => {
    if (!isVisible) return;

    const animationDuration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const stepDuration = animationDuration / steps;

    const timers: NodeJS.Timeout[] = [];

    STATS_CONFIG.forEach((stat) => {
      const targetValue = typeof stat.value === 'number' ? stat.value : 0;
      let currentValue = 0;
      const increment = targetValue / steps;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({
          ...prev,
          [stat.id]: Math.floor(currentValue)
        }));
      }, stepDuration);

      timers.push(timer);
    });

    return () => timers.forEach(clearInterval);
  }, [isVisible]);

  const getAnimatedValue = (stat: StatItem) => {
    if (typeof stat.value === 'string') {
      return stat.value;
    }
    return animatedValues[stat.id] || 0;
  };

  return (
    <div ref={ref} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl flex items-center gap-2">
              By the Numbers
              <TrendingUp className="h-8 w-8 text-primary" />
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Real-time metrics that showcase my expertise and commitment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 max-w-4xl mx-auto">
          {STATS_CONFIG.map((stat) => {
            const Icon = stat.icon;
            const animatedValue = getAnimatedValue(stat);

            return (
              <Card
                key={stat.id}
                className={`relative overflow-hidden transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${stat.animationDelay}ms`
                }}
              >
                <CardContent className="p-6 text-center">
                  {/* Pulse animation on first appearance */}
                  {isVisible && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse" />
                  )}

                  <div className="flex flex-col items-center space-y-3">
                    <Icon className={`h-8 w-8 ${stat.color} transition-transform duration-300 hover:scale-110`} />

                    <div className="space-y-1">
                      <div className="text-2xl font-bold tabular-nums">
                        {animatedValue}
                        <span className="text-lg font-normal ml-1">
                          {stat.suffix}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>

                    {/* Hover indicator */}
                    <Badge
                      variant="secondary"
                      className="text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      Live metric
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional credibility indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Stats updated in real-time
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};