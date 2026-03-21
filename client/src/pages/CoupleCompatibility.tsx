import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ThumbsUp, AlertTriangle, Lightbulb } from "lucide-react";

const typeNames: Record<number, string> = {
  1: "Il Perfezionista", 2: "L'Altruista", 3: "Il Realizzatore",
  4: "L'Individualista", 5: "L'Osservatore", 6: "Il Leale",
  7: "L'Entusiasta", 8: "Il Leader", 9: "Il Pacificatore",
};

const typeEmoji: Record<number, string> = {
  1: "🍎", 2: "🍐", 3: "🍒", 4: "🫐",
  5: "🍇", 6: "🫐", 7: "🍍", 8: "🍑", 9: "🍓",
};

const levelColors: Record<string, string> = {
  eccellente: "bg-green-500",
  ottima: "bg-emerald-500",
  buona: "bg-blue-500",
  media: "bg-amber-500",
  bassa: "bg-orange-500",
  difficile: "bg-red-500",
};

export default function CoupleCompatibility() {
  const [type1, setType1] = useState<string>("");
  const [type2, setType2] = useState<string>("");

  const shouldFetch = type1 && type2;

  const { data: compat, isLoading, isError } = useQuery<any>({
    queryKey: ["/api/compatibility", type1, type2],
    enabled: !!shouldFetch,
  });

  const percentage = compat?.percentuale || 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-rose-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3" data-testid="text-compat-title">
          Compatibilità di Coppia
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Seleziona i due enneatipi per scoprire il livello di compatibilità, i punti di forza e le sfide della coppia.
        </p>
      </div>

      {/* Selectors */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm font-medium mb-2 block">Partner 1</label>
              <Select value={type1} onValueChange={setType1}>
                <SelectTrigger data-testid="select-type1">
                  <SelectValue placeholder="Seleziona enneatipo" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 9 }, (_, i) => i + 1).map(n => (
                    <SelectItem key={n} value={String(n)}>
                      {typeEmoji[n]} Tipo {n} — {typeNames[n]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-center">
              <Heart className="w-8 h-8 text-rose-400" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Partner 2</label>
              <Select value={type2} onValueChange={setType2}>
                <SelectTrigger data-testid="select-type2">
                  <SelectValue placeholder="Seleziona enneatipo" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 9 }, (_, i) => i + 1).map(n => (
                    <SelectItem key={n} value={String(n)}>
                      {typeEmoji[n]} Tipo {n} — {typeNames[n]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {isLoading && shouldFetch && (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Calcolo compatibilità...</p>
        </div>
      )}

      {/* Error */}
      {isError && shouldFetch && (
        <div className="text-center py-12">
          <p className="text-destructive">Errore nel recupero dei dati. Riprova.</p>
        </div>
      )}

      {/* Results */}
      {compat && !isLoading && (
        <div className="space-y-6">
          {/* Compatibility meter */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl">{typeEmoji[parseInt(type1)]}</div>
                    <div className="text-xs text-muted-foreground mt-1">Tipo {type1}</div>
                  </div>
                  <Heart className="w-6 h-6 text-rose-500" />
                  <div className="text-center">
                    <div className="text-3xl">{typeEmoji[parseInt(type2)]}</div>
                    <div className="text-xs text-muted-foreground mt-1">Tipo {type2}</div>
                  </div>
                </div>

                {/* Visual meter */}
                <div className="w-full bg-muted rounded-full h-4 mb-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${levelColors[compat.livello] || "bg-primary"}`}
                    style={{ width: `${percentage}%` }}
                    data-testid="meter-compatibility"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="capitalize">{compat.livello}</Badge>
                  <span className="text-2xl font-bold text-primary" data-testid="text-percentage">{percentage}%</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-description">
                {compat.descrizione}
              </p>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-green-500" /> Punti di Forza
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {compat.puntiForza?.map((p: string) => (
                  <Badge key={p} variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                    {p}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Sfide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {compat.sfide?.map((s: string) => (
                  <Badge key={s} variant="secondary" className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Advice */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-blue-500" /> Consigli
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground" data-testid="text-advice">
                {compat.consigli}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty state */}
      {!shouldFetch && (
        <div className="text-center py-12 text-muted-foreground">
          <Heart className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>Seleziona entrambi gli enneatipi per visualizzare la compatibilità.</p>
        </div>
      )}
    </div>
  );
}
