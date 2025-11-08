"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FilterState {
  technologies: string[];
  projectTypes: string[];
  status: string[];
}

interface InteractiveState {
  // Project filters
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;

  // Contact form states
  contactFormLoading: boolean;
  setContactFormLoading: (loading: boolean) => void;
  contactFormMessage: string | null;
  setContactFormMessage: (message: string | null) => void;

  // Floating chat state
  showFloatingChat: boolean;
  setShowFloatingChat: (show: boolean) => void;
  floatingChatDismissed: boolean;
  setFloatingChatDismissed: (dismissed: boolean) => void;

  // Availability status
  availabilityStatus: 'available' | 'busy' | 'limited';
  responseTime: string;

  // Statistics animation
  statsAnimated: boolean;
  setStatsAnimated: (animated: boolean) => void;
}

const InteractiveContext = createContext<InteractiveState | undefined>(undefined);

export const useInteractive = () => {
  const context = useContext(InteractiveContext);
  if (!context) {
    throw new Error("useInteractive must be used within an InteractiveProvider");
  }
  return context;
};

interface InteractiveProviderProps {
  children: ReactNode;
}

export const InteractiveProvider: React.FC<InteractiveProviderProps> = ({ children }) => {
  const [filters, setFiltersState] = useState<FilterState>({
    technologies: [],
    projectTypes: [],
    status: []
  });

  const [contactFormLoading, setContactFormLoading] = useState(false);
  const [contactFormMessage, setContactFormMessage] = useState<string | null>(null);
  const [showFloatingChat, setShowFloatingChat] = useState(false);
  const [floatingChatDismissed, setFloatingChatDismissed] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Get availability status from environment or default to available
  const availabilityStatus: 'available' | 'busy' | 'limited' =
    (process.env.NEXT_PUBLIC_AVAILABILITY_STATUS as any) || 'available';

  const getResponseTime = (status: string) => {
    switch (status) {
      case 'available':
        return '< 24 hours';
      case 'busy':
        return '48-72 hours';
      case 'limited':
        return '3-5 days';
      default:
        return '< 24 hours';
    }
  };

  const responseTime = getResponseTime(availabilityStatus);

  // Load dismissed state from localStorage
  useEffect(() => {
    const dismissed = localStorage.getItem('floatingChatDismissed');
    if (dismissed === 'true') {
      setFloatingChatDismissed(true);
    }
  }, []);

  // Save dismissed state to localStorage
  useEffect(() => {
    localStorage.setItem('floatingChatDismissed', floatingChatDismissed.toString());
  }, [floatingChatDismissed]);

  const setFilters = (newFilters: FilterState) => {
    setFiltersState(newFilters);
  };

  const clearFilters = () => {
    setFiltersState({
      technologies: [],
      projectTypes: [],
      status: []
    });
  };

  const value: InteractiveState = {
    filters,
    setFilters,
    clearFilters,
    contactFormLoading,
    setContactFormLoading,
    contactFormMessage,
    setContactFormMessage,
    showFloatingChat,
    setShowFloatingChat,
    floatingChatDismissed,
    setFloatingChatDismissed,
    availabilityStatus,
    responseTime,
    statsAnimated,
    setStatsAnimated
  };

  return (
    <InteractiveContext.Provider value={value}>
      {children}
    </InteractiveContext.Provider>
  );
};