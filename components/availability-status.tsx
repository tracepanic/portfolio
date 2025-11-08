"use client";

import React from "react";
import { useInteractive } from "@/contexts/interactive-context";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

export const AvailabilityStatus: React.FC = () => {
  const { availabilityStatus, responseTime } = useInteractive();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          label: 'Available for freelance projects',
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          textColor: 'text-green-800 dark:text-green-300',
          borderColor: 'border-green-200 dark:border-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-600 dark:text-green-400'
        };
      case 'busy':
        return {
          label: 'Currently busy',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
          textColor: 'text-yellow-800 dark:text-yellow-300',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          icon: AlertCircle,
          iconColor: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'limited':
        return {
          label: 'Limited availability',
          bgColor: 'bg-orange-100 dark:bg-orange-900/20',
          textColor: 'text-orange-800 dark:text-orange-300',
          borderColor: 'border-orange-200 dark:border-orange-800',
          icon: Clock,
          iconColor: 'text-orange-600 dark:text-orange-400'
        };
      default:
        return getStatusConfig('available');
    }
  };

  const config = getStatusConfig(availabilityStatus);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} transition-all duration-300 hover:scale-105`}>
      <Icon className={`h-4 w-4 ${config.iconColor}`} />
      <span className="text-sm font-medium">{config.label}</span>
      <span className="text-xs opacity-75">• Response time: {responseTime}</span>
    </div>
  );
};