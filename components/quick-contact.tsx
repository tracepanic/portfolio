"use client";

import React, { useState } from "react";
import { useInteractive } from "@/contexts/interactive-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  projectBrief: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectBrief?: string;
}

export const QuickContact: React.FC = () => {
  const {
    contactFormLoading,
    setContactFormLoading,
    contactFormMessage,
    setContactFormMessage
  } = useInteractive();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectBrief: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name must be less than 50 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value.trim())) return 'Please enter a valid email address';
        return undefined;
      case 'projectBrief':
        if (!value.trim()) return 'Project brief is required';
        if (value.trim().length < 10) return 'Project brief must be at least 10 characters';
        if (value.trim().length > 500) return 'Project brief must be less than 500 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, projectBrief: true });
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
            from_name: formData.name.trim(),
            from_email: formData.email.trim(),
            project_brief: formData.projectBrief.trim(),
            to_email: 'hello@tracepanic.com', // Your email
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        if (result.status === 200) {
          setContactFormMessage('Message sent! I\'ll respond within 24 hours.');
          setFormData({ name: '', email: '', projectBrief: '' });
          setErrors({});
          setTouched({});
        } else {
          throw new Error('Failed to send message');
        }
      } else {
        // Fallback for development when EmailJS is not available
        console.log('Contact form submission:', formData);
        setContactFormMessage('Message received! I\'ll respond within 24 hours.');
        setFormData({ name: '', email: '', projectBrief: '' });
        setErrors({});
        setTouched({});
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setContactFormMessage('Failed to send message. Please try again or contact me directly.');
    } finally {
      setContactFormLoading(false);
    }
  };

  const hasErrors = Object.values(errors).some(error => error !== undefined);

  return (
    <Card className="w-full max-w-md mx-auto bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Quick Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contactFormMessage && (
          <div className={`p-3 rounded-lg flex items-center gap-2 ${
            contactFormMessage.includes('sent') || contactFormMessage.includes('received')
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
              : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
          }`}>
            {contactFormMessage.includes('sent') || contactFormMessage.includes('received') ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm">{contactFormMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.name ? 'border-red-300 dark:border-red-700' : ''}
              disabled={contactFormLoading}
            />
            {errors.name && touched.name && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.email ? 'border-red-300 dark:border-red-700' : ''}
              disabled={contactFormLoading}
            />
            {errors.email && touched.email && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Textarea
              name="projectBrief"
              placeholder="Tell me about your project..."
              value={formData.projectBrief}
              onChange={handleInputChange}
              onBlur={handleBlur}
              rows={4}
              className={`resize-none ${errors.projectBrief ? 'border-red-300 dark:border-red-700' : ''}`}
              disabled={contactFormLoading}
            />
            {errors.projectBrief && touched.projectBrief && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.projectBrief}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {formData.projectBrief.trim().length}/500 characters
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={contactFormLoading || hasErrors}
          >
            {contactFormLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};