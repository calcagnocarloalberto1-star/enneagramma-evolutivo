import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { ArrowRight, Star, Gem, Music, Brain, Shield, Sparkles, Heart } from "lucide-react";

const fruitNames: Record<number, string> = {
  1: "Mela", 2: "Pera", 3: "Ciliegia", 4: "Nespola",
  5: "Uva", 6: "Mirtillo", 7: "Ananas", 8: "Albicocca", 9: "Fragola"
};

const fruitEmoji: Record<number, string> = {
  1: "🍎", 2: "🍐", 3: "🍒", 4: "🫐",
  5: "🍇", 6: "🫐", 7: "🍍", 8: "🍑", 9: "🍓"
};

const typeColors: Record<number, string> = {
  1: "bg-red-100 text-red-700", 2: "bg-orange-100 text-orange-700",
  3: "bg-yellow-100 text-yellow-700", 4: "bg-blue-100 text-blue-700",
  5: "bg-indigo-100 text-indigo-700", 6: "bg-teal-100 text-teal-700",
  7: "bg-amber-100 text-amber-700", 8: "bg-rose-100 text-rose-700",
  9: "bg-green-100 text-green-700",
};

export default function TestResults() {
  const [, params] = useRoute("/test/results/:id");
  const id = params?.id;

  const { data: result, isLoading, isError } = useQuery<any>({
    queryKey: ["/api/test/result", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-64 mx-auto" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (isError || !result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Risultato non trovato</h2>
        <p className="text-muted-foreground mb-6">Non è stato possibile recuperare i risultati del test.</p>
        <Link href="/test">
          <Button>Rifai il Test</Button>
        </Link>
      </div>
    );
  }

  const scores = result.punteggiFrutti;
  const attrs = result.attributi;
  const desc = result.descrizioni || {};
  const enneatipo = result.enneatipo;
  const ala = result.ala;

  // Helper to get description for an attribute
  const getDesc = (category: string, value: string): string | null => {
    if (!desc[category]) return null;
    const cat = desc[category];
    // For objects with nested structure (gerarchia_angelica, musa)
    if (cat[value] && typeof cat[value] === 'object') {
      return cat[value].descrizione || cat[value].significato || null;
    }
    // For simple string descriptions
    if (typeof cat[value] === 'string') return cat[value];
    return null;
  };

  const getFullDesc = (category: string, value: string): any => {
    if (!desc[category]) return null;
    return desc[category][value] || null;
  };

  // Radar chart data
  const radarData = Object.entries(scores).map(([key, value]) => ({
    type: `${fruitEmoji[parseInt(key)]} ${parseInt(key)}`,
    score: value as number,
    fullMark: 20,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">{fruitEmoji[enneatipo]}</div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2" data-testid="text-result-type">
          Enneatipo {enneatipo}: {attrs?.nome}
        </h1>
        <p className="text-lg text-muted-foreground font-serif italic" data-testid="text-result-motto">
          "{attrs?.motto}"
        </p>
        {ala && (
          <Badge className={`mt-3 ${typeColors[ala] || "bg-muted"}`} data-testid="badge-wing">
            Ala {ala} — {fruitNames[ala]}
          </Badge>
        )}
        {result.needsGenogram && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg max-w-lg mx-auto">
            <p className="text-sm text-amber-800 dark:text-amber-200" data-testid="text-genogram-notice">
              <strong>Nota:</strong> Il test suggerisce la necessità di un genogramma per una determinazione più precisa 
              dell'enneatipo e/o dell'ala. Ti consigliamo di consultare un professionista.
            </p>
          </div>
        )}
        {/* Descrizione e motivazione dal contenuto educativo */}
        {result.educativo && (
          <div className="mt-6 max-w-2xl mx-auto text-left">
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{result.educativo.descrizione}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {result.educativo.motivazione && (
                <div className="px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Motivazione: </span>
                  <span className="text-xs text-green-800 dark:text-green-200">{result.educativo.motivazione}</span>
                </div>
              )}
              {result.educativo.paura && (
                <div className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <span className="text-xs text-red-600 dark:text-red-400 font-medium">Paura: </span>
                  <span className="text-xs text-red-800 dark:text-red-200">{result.educativo.paura}</span>
                </div>
              )}
            </div>
            {result.educativo.consigli && result.educativo.consigli.length > 0 && (
              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-200 mb-2">Consigli per la crescita</h4>
                <ul className="space-y-1.5">
                  {result.educativo.consigli.map((c: string, i: number) => (
                    <li key={i} className="text-xs text-purple-700 dark:text-purple-300 flex gap-2">
                      <span className="text-purple-400 shrink-0">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Radar Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-serif">Punteggi dei 9 Frutti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]" data-testid="chart-radar">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(270, 20%, 85%)" />
                <PolarAngleAxis dataKey="type" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 20]} tick={{ fontSize: 10 }} />
                <Radar
                  name="Punteggio"
                  dataKey="score"
                  stroke="hsl(271, 76%, 53%)"
                  fill="hsl(271, 76%, 53%)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          {/* Score details */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 mt-4">
            {Object.entries(scores).map(([key, value]) => {
              const num = parseInt(key);
              const isMain = num === enneatipo;
              return (
                <div
                  key={key}
                  className={`text-center p-2 rounded-lg ${isMain ? "bg-primary/10 ring-2 ring-primary" : "bg-muted/50"}`}
                  data-testid={`score-type-${num}`}
                >
                  <div className="text-lg">{fruitEmoji[num]}</div>
                  <div className="text-xs text-muted-foreground">{fruitNames[num]}</div>
                  <div className={`text-sm font-bold ${isMain ? "text-primary" : ""}`}>{value as number}/20</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Attributes Grid — with explanations */}
      {attrs && (
        <div className="space-y-4 mb-8">
          {/* Spiritual Attributes */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-serif font-semibold text-base mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" /> Attributi Spirituali
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Dignità", value: attrs.dignita, cat: "dignita" },
                  { label: "Virtù", value: attrs.virtu, cat: "virtu" },
                  { label: "Vizio", value: attrs.vizio, cat: "vizio" },
                  { label: "Idea Sacra", value: attrs.idea_sacra, cat: "idea_sacra" },
                ].map(({ label, value, cat }) => (
                  <div key={label} className="border-b border-border/50 last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="font-semibold text-sm text-foreground">{value}</dd>
                    </div>
                    {getDesc(cat, value) && (
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{getDesc(cat, value)}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gerarchia Angelica & Musa */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-5">
                <h3 className="font-serif font-semibold text-base mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" /> Gerarchia Angelica
                </h3>
                <p className="font-semibold text-sm mb-1">{attrs.gerarchia_angelica}</p>
                {(() => {
                  const info = getFullDesc("gerarchia_angelica", attrs.gerarchia_angelica);
                  if (!info) return null;
                  return (
                    <div className="space-y-2 mt-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">{info.descrizione}</p>
                      {info.sfera && <p className="text-[11px] text-primary/70 font-medium">{info.sfera}</p>}
                      {info.significato && <p className="text-xs text-muted-foreground leading-relaxed italic">{info.significato}</p>}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h3 className="font-serif font-semibold text-base mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Musa Ispiratrice
                </h3>
                <p className="font-semibold text-sm mb-1">{attrs.musa}</p>
                {(() => {
                  const musaName = attrs.musa?.split(" (")[0];
                  const info = getFullDesc("musa", musaName);
                  if (!info) return null;
                  return (
                    <div className="space-y-2 mt-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">{info.descrizione}</p>
                      {info.attributi && (
                        <div className="flex flex-wrap gap-1">
                          {info.attributi.map((a: string) => (
                            <span key={a} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{a}</span>
                          ))}
                        </div>
                      )}
                      {info.significato && <p className="text-xs text-muted-foreground leading-relaxed italic">{info.significato}</p>}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>

          {/* Psychology */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-serif font-semibold text-base mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" /> Psicologia
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Meccanismo di Difesa", value: attrs.meccanismo_difesa, cat: "meccanismo_difesa" },
                  { label: "Topica (Freud)", value: attrs.topica, cat: "topica" },
                  { label: "Adattamento", value: attrs.adattamento, cat: null },
                  { label: "Correlazione Cerebrale", value: attrs.correlazione_cerebrale, cat: null },
                ].map(({ label, value, cat }) => (
                  <div key={label} className="border-b border-border/50 last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="font-semibold text-sm text-foreground">{value}</dd>
                    </div>
                    {cat && getDesc(cat, value) && (
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{getDesc(cat, value)}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Correlations */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-serif font-semibold text-base mb-4 flex items-center gap-2">
                <Music className="w-4 h-4 text-primary" /> Correlazioni Cosmiche
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Chakra", value: attrs.chakra, cat: "chakra" },
                  { label: "Pianeta", value: attrs.pianeta, cat: "pianeta" },
                  { label: "Melodia", value: attrs.melodia, cat: "melodia" },
                  { label: "Facoltà", value: attrs.facolta, cat: "facolta" },
                ].map(({ label, value, cat }) => (
                  <div key={label} className="border-b border-border/50 last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="font-semibold text-sm text-foreground">{value}</dd>
                    </div>
                    {getDesc(cat, value) && (
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{getDesc(cat, value)}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Wellness */}
      {attrs && (
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
                {attrs.pietre_curative?.map((p: string) => (
                  <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">🍽️ Cibi Consigliati</h4>
              <div className="flex flex-wrap gap-1.5">
                {attrs.cibi_consigliati?.map((c: string) => (
                  <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">
                <Sparkles className="w-4 h-4 inline text-amber-500 mr-1" />
                Attività Benessere
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {attrs.attivita_benessere?.map((a: string) => (
                  <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Evolutionary Path */}
      {result.percorso && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-serif">Percorso Evolutivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-sm mb-3 text-green-600">🌱 Integrazione</h4>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {result.percorso.integrazione?.map((t: number, i: number) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
                        {t}
                      </span>
                      {i < result.percorso.integrazione.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      )}
                    </span>
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  {result.percorso.incrociIntegrazione && Object.entries(result.percorso.incrociIntegrazione).map(([key, val]) => (
                    <div key={key} className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{key}</span>: {val as string}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3 text-red-600">⚠️ Disintegrazione</h4>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {result.percorso.disintegrazione?.map((t: number, i: number) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium">
                        {t}
                      </span>
                      {i < result.percorso.disintegrazione.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      )}
                    </span>
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  {result.percorso.incrociDisintegrazione && Object.entries(result.percorso.incrociDisintegrazione).map(([key, val]) => (
                    <div key={key} className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{key}</span>: {val as string}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Age-based path */}
      {result.etaInfo && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-serif">Le Età dell'Enneagramma</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              La tua età attuale ({result.eta} anni) influenza il tuo percorso evolutivo.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {Object.entries(result.etaInfo).map(([key, info]: [string, any]) => {
                const rangeStr = info.eta;
                // Determine if the user's age falls in this range
                let isActive = false;
                if (rangeStr.includes("+")) {
                  const min = parseInt(rangeStr);
                  isActive = result.eta >= min;
                } else if (rangeStr.includes("-")) {
                  const [min, max] = rangeStr.split("-").map(Number);
                  isActive = result.eta >= min && result.eta <= max;
                }
                return (
                  <div
                    key={key}
                    className={`p-3 rounded-lg border ${isActive ? "border-primary bg-primary/5" : "border-border"}`}
                    data-testid={`age-period-${key}`}
                  >
                    <div className="text-xs text-muted-foreground">{rangeStr}</div>
                    <div className="font-semibold text-sm">{info.nome}</div>
                    <div className="text-xs text-muted-foreground mt-1">{info.descrizione}</div>
                    {isActive && <Badge className="mt-2 bg-primary/10 text-primary text-[10px]">La tua fase attuale</Badge>}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center pb-8">
        <Link href="/test">
          <Button variant="outline" data-testid="button-retake">Rifai il Test</Button>
        </Link>
        <Link href={`/enneatipi/${enneatipo}`}>
          <Button className="bg-primary hover:bg-primary/90" data-testid="button-explore-type">
            Esplora Enneatipo {enneatipo} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
        <Link href="/compatibilita/coppia">
          <Button variant="outline" data-testid="button-compatibility">
            Compatibilità di Coppia
          </Button>
        </Link>
      </div>
    </div>
  );
}
