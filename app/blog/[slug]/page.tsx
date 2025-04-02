import { BlogCard } from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllPosts, getPostBySlug } from "@/lib/md";
import { PostMeta } from "@/types";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((post) => post.slug === slug);
  if (!post) return notFound();

  const title = post.title;
  const description = post.description;
  const image = post.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const posts: PostMeta[] = getAllPosts();
  if (!post) return notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const fullUrl = `${siteUrl}/blog/${slug}`;

  return (
    <>
      <div className="mt-12 md:mt-24 container px-4 md:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all blog posts
        </Link>
      </div>

      <div className="container mx-auto max-w-4xl px-4 md:px-6 mt-10">
        <article className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={tag === "New" ? "default" : "secondary"}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          <div className="aspect-video overflow-hidden rounded-lg">
            <Image
              src={post.image || "/placeholder.png"}
              alt={post.title}
              width={1200}
              height={675}
              className="object-cover h-full"
              priority
            />
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            className="prose prose-gray max-w-none dark:prose-invert mb-32"
          ></div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Share this article:
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </article>

        <Separator className="my-12" />

        {/* Author info */}
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative w-28 aspect-square overflow-hidden rounded-full">
            <Image
              src="/me.jpg"
              alt="Profile Picture"
              className="object-cover"
              fill
              sizes="100"
              priority
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold">Patrick Obama</h3>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer with a passion for creating exceptional
              digital experiences. Writing about web development, technology
              trends, and career growth.
            </p>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="space-y-6 mb-56">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
