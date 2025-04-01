"use server";

import { FormData } from "@/components/contact-form";
import * as nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/smtp-transport";

export async function sendEmail(data: FormData): Promise<{ success: boolean }> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions: MailOptions = {
    from: data.email,
    to: "patrickobamascript@gmail.com",
    subject: `Portfolio Inquiry: ${data.subject}`,
    text: `
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Message: ${data.message}
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch {
    return { success: false };
  }
}
