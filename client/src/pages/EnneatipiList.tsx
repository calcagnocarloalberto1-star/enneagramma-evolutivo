import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const typeEmoji: Record<number, string> = {
  1: "🍎", 2: "🍐", 3: "🍒", 4: "🫐",
  5: "🍇", 6: "🫐", 7: "🍍", 8: "🍑", 9: "🍓",
};

const typeColors: Record<number, string> = {
  1: "from-red-500 to-red-600",
  2: "from-orange-500 to-amber-600",
  3: "from-yellow-500 to-yellow-600",
  4: "from-blue-500 to-[#0f3460]",
  5: "from-[#16213e] to-[#0f3460]",
  6: "from-teal-500 to-cyan-600",
  7: "from-amber-400 to-orange-500",
  8: "from-rose-500 to-red-600",
  9: "from-green-500 to-emerald-600",
};

export default function EnneatipiList() {
  const { data: enneatipi, isLoading } = useQuery<any[]>({
    queryKey: ["/api/enneatipi"],
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3" data-testid="text-enneatipi-title">
          I 9 Enneatipi
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Scopri le caratteristiche uniche di ogni enneatipo dell'Enneagramma Evolutivo.
        </p>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-40 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enneatipi?.map((t) => (
            <Link key={t.numero} href={`/enneatipi/${t.numero}`}>
              <Card className="group cursor-pointer hover:shadow-lg transition-all h-full overflow-hidden" data-testid={`card-enneatipo-${t.numero}`}>
                <div className={`h-2 bg-gradient-to-r ${typeColors[t.numero] || "from-[#16213e] to-[#0f3460]"}`} />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-3xl mb-2">{typeEmoji[t.numero]}</div>
                      <h2 className="font-serif font-bold text-lg mb-1">
                        Enneatipo {t.numero}
                      </h2>
                      <h3 className="font-semibold text-sm text-primary mb-2">{t.nome}</h3>
                      <p className="text-sm text-muted-foreground italic">"{t.motto}"</p>
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
