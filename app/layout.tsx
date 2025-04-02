import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Basic metadata
  title: {
    template: "%s | Patrick Obama",
    default: "Patrick Obama | Full Stack Developer",
  },
  description:
    "A passionate full-stack developer specializing in building exceptional digital experiences.",

  // Canonical URL and base URL for metadata
  metadataBase: new URL("https://tracepanic.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },

  // Open Graph metadata for social sharing
  openGraph: {
    title: "Patrick Obama | Full Stack Developer",
    description:
      "A passionate full-stack developer specializing in building exceptional digital experiences.",
    url: "https://tracepanic.com",
    siteName: "My Website",
    images: [
      {
        url: "https://tracepanic.com/me.jpg",
        width: 1200,
        height: 630,
        alt: "Patrick Obama | Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "Patrick Obama | Full Stack Developer",
    description:
      "A passionate full-stack developer specializing in building exceptional digital experiences.",
    creator: "@tracepanic",
    images: ["https://tracepanic.com/me.jpg"],
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },

  // Manifest
  manifest: "https://tracepanic.com/manifest.json",

  // Additional metadata
  keywords: [
    "web development",
    "next.js",
    "react",
    "professional websites",
    "web design",
  ],
  generator: "Next.js",
  authors: [{ name: "Patrick Obama", url: "https://tracepanic.com/profile" }],
  creator: "Patrick Obama",
  publisher: "Patrick Obama",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // App information
  applicationName: "Patrick Obama",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Patrick Obama" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="container border-x border-dashed mx-auto min-h-dvh">
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
