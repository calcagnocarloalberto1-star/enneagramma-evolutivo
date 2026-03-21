import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-3xl font-serif font-bold mb-2">Pagina Non Trovata</h1>
      <p className="text-muted-foreground mb-6 text-center">
        La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <Link href="/">
        <Button className="bg-primary hover:bg-primary/90" data-testid="button-go-home">
          <Home className="mr-2 w-4 h-4" /> Torna alla Home
        </Button>
      </Link>
    </div>
  );
}
