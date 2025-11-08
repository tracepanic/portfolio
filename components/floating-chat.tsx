"use client";

import React, { useState, useEffect } from "react";
import { useInteractive } from "@/contexts/interactive-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Minimize2, CheckCircle } from "lucide-react";

interface FloatingChatProps {
  onScrollPosition: (scrollY: number) => void;
}

export const FloatingChat: React.FC<FloatingChatProps> = ({ onScrollPosition }) => {
  const {
    showFloatingChat,
    setShowFloatingChat,
    floatingChatDismissed,
    setFloatingChatDismissed,
    contactFormLoading,
    setContactFormLoading,
    contactFormMessage,
    setContactFormMessage
  } = useInteractive();

  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  // Show/hide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      onScrollPosition(scrollY);

      // Show after scrolling 300px
      if (scrollY > 300 && !floatingChatDismissed) {
        setShowFloatingChat(true);
      } else if (scrollY <= 100) {
        setShowFloatingChat(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [floatingChatDismissed, onScrollPosition, setShowFloatingChat]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 140) {
      setMessage(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email');
      return;
    }

    setContactFormLoading(true);
    setContactFormMessage(null);

    try {
      // Initialize EmailJS (will be added later)
      if (typeof window !== 'undefined' && (window as any).emailjs) {
        const result = await (window as any).emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_email: email.trim(),
            message: message.trim() || 'Quick contact request',
            source: 'floating_chat',
            to_email: 'hello@tracepanic.com',
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        if (result.status === 200) {
          setContactFormMessage('Quick message sent! I\'ll respond within 2 hours during business hours.');
          setEmail('');
          setMessage('');
          setTimeout(() => {
            setIsExpanded(false);
          }, 2000);
        } else {
          throw new Error('Failed to send message');
        }
      } else {
        // Fallback for development
        console.log('Floating chat submission:', { email, message });
        setContactFormMessage('Message received! I\'ll respond within 2 hours during business hours.');
        setEmail('');
        setMessage('');
        setTimeout(() => {
          setIsExpanded(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Floating chat error:', error);
      setContactFormMessage('Failed to send message. Please try again.');
    } finally {
      setContactFormLoading(false);
    }
  };

  const handleDismiss = () => {
    setFloatingChatDismissed(true);
    setShowFloatingChat(false);
    setIsExpanded(false);
  };

  if (!showFloatingChat || floatingChatDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Expanded Chat */}
      {isExpanded && (
        <Card className="w-80 sm:w-96 shadow-lg border-border bg-background">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Quick Contact
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Have a quick question? Send me a message and I'll respond within 2 hours during business hours.
            </p>

            {contactFormMessage && (
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                contactFormMessage.includes('sent') || contactFormMessage.includes('received')
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
              }`}>
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">{contactFormMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={handleEmailChange}
                  className={emailError ? 'border-red-300 dark:border-red-700' : ''}
                  disabled={contactFormLoading}
                />
                {emailError && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">{emailError}</p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Quick message (optional)"
                  value={message}
                  onChange={handleMessageChange}
                  disabled={contactFormLoading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {message.length}/140 characters
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={contactFormLoading || !email.trim()}
              >
                {contactFormLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Quick Message
                  </>
                )}
              </Button>
            </form>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Badge variant="secondary" className="text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
    Online
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-xs text-muted-foreground"
              >
                Don't show again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Bubble */}
      {!isExpanded && (
        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-muted-foreground bg-background px-2 py-1 rounded shadow-sm">
            Need help? Chat with me!
          </div>
          <Button
            onClick={() => setIsExpanded(true)}
            size="lg"
            className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};