import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Articolo non trovato</h2>
        <Link href="/blog">
          <Button variant="outline"><ArrowLeft className="mr-2 w-4 h-4" /> Torna al Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-6">
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Torna al Blog
        </Link>
      </div>

      <article className="prose max-w-none" data-testid="article-content">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </article>

      <div className="mt-12 pt-6 border-t border-border">
        <Link href="/blog">
          <Button variant="outline">
            <ArrowLeft className="mr-2 w-4 h-4" /> Altri Articoli
          </Button>
        </Link>
      </div>
    </div>
  );
}
