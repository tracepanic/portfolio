"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  firstName: z
    .string({ message: "First name must be a string" })
    .min(3, { message: "Min length 3 characters" })
    .max(50, { message: "Max length 50 characters" }),
  lastName: z
    .string({ message: "Last name must be a string" })
    .min(3, { message: "Min length 3 characters" })
    .max(50, { message: "Max length 50 characters" }),
  email: z
    .string({ message: "Invalid email address" })
    .email({ message: "Invalid email address" })
    .min(5, { message: "Min length 5 characters" })
    .max(50, { message: "Max length 50 characters" }),
  subject: z
    .string({})
    .min(5, { message: "Min length 5 characters" })
    .max(50, { message: "Max length 50 characters" }),
  message: z
    .string({})
    .min(15, { message: "Min length 15 characters" })
    .max(500, { message: "Max length 500 characters" }),
});

export type FormData = z.infer<typeof schema>;

function ContactForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    toast.loading("Sending message...");

    const res = await sendEmail(values);
    if (res.success) {
      toast.success("Message sent successfully!");
    } else {
      toast.error("Failed to send message.");
    }

    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a Message</CardTitle>
        <CardDescription>
          Fill out the form below and I'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Inquiry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea {...field}></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="cursor-pointer w-full"
            >
              Send Message
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { ContactForm };
