import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostMeta } from "@/types";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Card
      key={post.title}
      className="overflow-hidden mx-auto p-0 pb-6 max-w-sm transition-all hover:shadow-lg"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={post.image || "/placeholder.png"}
          alt={post.title}
          width={600}
          height={400}
          className="object-cover h-full transition-transform duration-200 hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant={tag === "New" ? "default" : "secondary"}>
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link className="w-full" href={`/blog/${post.slug}`}>
          <Button className="w-full cursor-pointer" variant="outline">
            Read Article
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export { BlogCard };
