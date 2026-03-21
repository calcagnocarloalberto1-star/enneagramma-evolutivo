import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Star, Shield, Brain, Music, Gem, Heart, Sparkles } from "lucide-react";

const fruitNames: Record<number, string> = {
  1: "Mela", 2: "Pera", 3: "Ciliegia", 4: "Nespola",
  5: "Uva", 6: "Mirtillo", 7: "Ananas", 8: "Albicocca", 9: "Fragola"
};
const fruitEmoji: Record<number, string> = {
  1: "🍎", 2: "🍐", 3: "🍒", 4: "🫐",
  5: "🍇", 6: "🫐", 7: "🍍", 8: "🍑", 9: "🍓"
};

export default function EnneatipoDetail() {
  const [, params] = useRoute("/enneatipi/:id");
  const id = params?.id;

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["/api/enneatipi", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Enneatipo non trovato</h2>
        <Link href="/enneatipi"><Button variant="outline"><ArrowLeft className="mr-2 w-4 h-4" /> Torna agli Enneatipi</Button></Link>
      </div>
    );
  }

  const num = data.numero;
  const prevNum = num === 1 ? 9 : num - 1;
  const nextNum = num === 9 ? 1 : num + 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/enneatipi" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Torna ai 9 Enneatipi
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">{fruitEmoji[num]}</div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2" data-testid="text-enneatipo-title">
          Enneatipo {num}: {data.nome}
        </h1>
        <p className="text-lg text-muted-foreground font-serif italic">"{data.motto}"</p>
        <Badge className="mt-3 bg-primary/10 text-primary">Frutto: {fruitNames[num]}</Badge>
      </div>

      {/* Attributes Grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <h3 className="font-serif font-semibold text-base mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" /> Attributi Spirituali
            </h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Dignità</dt><dd className="font-medium">{data.dignita}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Virtù</dt><dd className="font-medium">{data.virtu}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Vizio</dt><dd className="font-medium">{data.vizio}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Idea Sacra</dt><dd className="font-medium">{data.idea_sacra}</dd></div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-serif font-semibold text-base mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Gerarchia e Musa
            </h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Gerarchia Angelica</dt><dd className="font-medium">{data.gerarchia_angelica}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Musa</dt><dd className="font-medium text-right">{data.musa}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Facoltà</dt><dd className="font-medium">{data.facolta}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Topica</dt><dd className="font-medium">{data.topica}</dd></div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-serif font-semibold text-base mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" /> Psicologia
            </h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Meccanismo di Difesa</dt><dd className="font-medium">{data.meccanismo_difesa}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Adattamento</dt><dd className="font-medium">{data.adattamento}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Correlazione Cerebrale</dt><dd className="font-medium">{data.correlazione_cerebrale}</dd></div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-serif font-semibold text-base mb-3 flex items-center gap-2">
              <Music className="w-4 h-4 text-primary" /> Correlazioni
            </h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Melodia</dt><dd className="font-medium">{data.melodia}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Chakra</dt><dd className="font-medium text-right">{data.chakra}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Pianeta</dt><dd className="font-medium">{data.pianeta}</dd></div>
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Wellness */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-serif flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" /> Benessere e Crescita
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
              <Gem className="w-4 h-4 text-purple-500" /> Pietre Curative
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {data.pietre_curative?.map((p: string) => (
                <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">🍽️ Cibi Consigliati</h4>
            <div className="flex flex-wrap gap-1.5">
              {data.cibi_consigliati?.map((c: string) => (
                <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">
              <Sparkles className="w-4 h-4 inline text-amber-500 mr-1" /> Attività Benessere
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {data.attivita_benessere?.map((a: string) => (
                <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evolutionary Path */}
      {data.percorso && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-serif">Percorso Evolutivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-sm mb-3 text-green-600">🌱 Integrazione</h4>
                <div className="flex items-center gap-1.5 flex-wrap mb-3">
                  {data.percorso.integrazione?.map((t: number, i: number) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
                        {t}
                      </span>
                      {i < data.percorso.integrazione.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      )}
                    </span>
                  ))}
                </div>
                {data.percorso.incrociIntegrazione && Object.entries(data.percorso.incrociIntegrazione).map(([key, val]) => (
                  <div key={key} className="text-xs text-muted-foreground mb-1">
                    <span className="font-medium text-foreground">{key}</span>: {val as string}
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3 text-red-600">⚠️ Disintegrazione</h4>
                <div className="flex items-center gap-1.5 flex-wrap mb-3">
                  {data.percorso.disintegrazione?.map((t: number, i: number) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium">
                        {t}
                      </span>
                      {i < data.percorso.disintegrazione.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      )}
                    </span>
                  ))}
                </div>
                {data.percorso.incrociDisintegrazione && Object.entries(data.percorso.incrociDisintegrazione).map(([key, val]) => (
                  <div key={key} className="text-xs text-muted-foreground mb-1">
                    <span className="font-medium text-foreground">{key}</span>: {val as string}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation between types */}
      <div className="flex justify-between items-center pb-8">
        <Link href={`/enneatipi/${prevNum}`}>
          <Button variant="outline" data-testid="button-prev-type">
            <ArrowLeft className="mr-2 w-4 h-4" />
            {fruitEmoji[prevNum]} Tipo {prevNum}
          </Button>
        </Link>
        <Link href={`/enneatipi/${nextNum}`}>
          <Button variant="outline" data-testid="button-next-type">
            Tipo {nextNum} {fruitEmoji[nextNum]}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
