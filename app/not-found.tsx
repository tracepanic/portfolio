import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-16 md:py-24 lg:py-32">
      <div className="mb-8 w-full max-w-[500px]">
        <div className="relative w-full h-40">
          <Image
            src="/404.svg"
            alt="Page Not Found"
            className="object-contain"
            fill
            sizes="100"
            priority
          />
        </div>
      </div>

      <div className="space-y-6 text-center max-w-[600px]">
        <h2 className="text-2xl font-semibold tracking-tight">
          Oops! Page not found
        </h2>
        <p className="text-muted-foreground md:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="gap-2 w-44">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              View Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
