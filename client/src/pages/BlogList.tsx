import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen } from "lucide-react";

interface BlogArticle {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
}

export default function BlogList() {
  useEffect(() => { document.title = "Blog | Enneagramma Evolutivo"; }, []);
  const { data: articles, isLoading } = useQuery<BlogArticle[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3" data-testid="text-blog-title">
          Blog
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Approfondimenti, guide e articoli sull'Enneagramma Evolutivo e la crescita personale.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles?.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <Card className="group cursor-pointer hover:shadow-md transition-all" data-testid={`card-blog-${article.slug}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-[10px] shrink-0">
                          {article.category?.split(",")[0]?.trim() || "Enneagramma"}
                        </Badge>
                      </div>
                      <h2 className="font-serif font-bold text-base sm:text-lg mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      {article.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
