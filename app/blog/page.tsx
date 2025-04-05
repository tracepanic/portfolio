import { BlogCard } from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllPosts } from "@/lib/md";
import { PostMeta } from "@/types";
import { Calendar, Clock } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Blogs" };

export default function Page() {
  const posts: PostMeta[] = getAllPosts();

  const featuredPost = posts.filter((post) => post.tags.includes("New"))[0];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Blog
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Thoughts, insights, and updates from my journey as a developer.
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <h2 className="mb-6 mt-32 text-2xl font-bold">Featured Blog Post</h2>
        <Card className="mx-auto max-w-4xl p-0 overflow-hidden">
          <div className="grid md:grid-cols-2 md:max-h-[500px]">
            <div className="overflow-hidden">
              <div className="aspect-video md:h-full">
                <Image
                  src={featuredPost.image || "/placeholder.png"}
                  alt={featuredPost.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between p-6">
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={tag === "New" ? "default" : "secondary"}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="mb-2 text-2xl font-bold">
                  {featuredPost.title}
                </h3>
                <p className="mb-4 text-muted-foreground">
                  {featuredPost.description}
                </p>
              </div>
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                </div>
                <Link href={`/blog/${featuredPost.slug}`} className="w-full">
                  <Button className="w-full md:w-auto mt-auto cursor-pointer">
                    Read Article
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* All posts */}
      <div className="mt-32">
        <h2 className="mb-6 text-2xl font-bold">All Blog Posts</h2>
        <div className="grid mx-auto gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
