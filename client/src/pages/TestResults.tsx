import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { ArrowRight, Star, Gem, Music, Brain, Shield, Sparkles, Heart, FileText, Download, Loader2, BookOpen } from "lucide-react";

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
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold">I Tuoi Attributi</h2>
            <Link href="/glossario">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                <BookOpen className="w-3 h-3 mr-1" /> Glossario completo
              </Button>
            </Link>
          </div>
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

      {/* Personalized Evolutionary Paths */}
      {result.percorsoPersonalizzato && (
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-serif font-bold text-center">I Tuoi Percorsi Evolutivi</h2>
          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-4">
            A {result.eta} anni, ti trovi nella fase <strong className="text-foreground">{result.percorsoPersonalizzato.faseCorrente}</strong>. 
            Ogni enneatipo attraversa due percorsi nella vita: Integrazione (crescita) e Disintegrazione (stress).
          </p>

          {/* Integration Path */}
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-serif text-green-700 dark:text-green-400 flex items-center gap-2">
                <span className="text-xl">🌱</span> Percorso di Integrazione (Crescita)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Sequence */}
              <div className="flex items-center gap-1 flex-wrap mb-4">
                {result.percorsoPersonalizzato.integrazione.sequenza.map((t: number, i: number) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      Object.values(result.percorsoPersonalizzato.integrazione.faseAttuale || {}).includes(t) 
                        ? "bg-green-600 text-white ring-2 ring-green-400"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    }`}>{t}</span>
                    {i < result.percorsoPersonalizzato.integrazione.sequenza.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-green-400" />
                    )}
                  </span>
                ))}
              </div>

              {/* Life phases */}
              <div className="space-y-3">
                {Object.entries(result.percorsoPersonalizzato.integrazione.fasi).map(([fase, info]: [string, any]) => {
                  const isActive = fase === result.percorsoPersonalizzato.faseCorrente;
                  return (
                    <div key={fase} className={`p-3 rounded-lg border transition-all ${
                      isActive 
                        ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 ring-1 ring-green-400" 
                        : "border-border/50 opacity-75"
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}>
                          {fase} anni
                        </span>
                        <span className="text-xs text-muted-foreground">Punto {info.punto}</span>
                        {isActive && <Badge className="bg-green-100 text-green-700 text-[10px]">Fase attuale</Badge>}
                      </div>
                      <p className="font-semibold text-sm">{info.nome}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{info.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Crossings */}
              <div className="mt-4 pt-3 border-t border-green-200 dark:border-green-800">
                <h4 className="text-xs font-semibold text-green-600 mb-2">Incroci evolutivi</h4>
                <div className="grid sm:grid-cols-2 gap-1.5">
                  {Object.entries(result.percorsoPersonalizzato.integrazione.incroci).map(([key, val]) => (
                    <div key={key} className="text-xs">
                      <span className="font-medium text-green-700 dark:text-green-400">{key}:</span>{' '}
                      <span className="text-muted-foreground">{val as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disintegration Path */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-serif text-red-700 dark:text-red-400 flex items-center gap-2">
                <span className="text-xl">⚠️</span> Percorso di Disintegrazione (Stress)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Sequence */}
              <div className="flex items-center gap-1 flex-wrap mb-4">
                {result.percorsoPersonalizzato.disintegrazione.sequenza.map((t: number, i: number) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      Object.values(result.percorsoPersonalizzato.disintegrazione.faseAttuale || {}).includes(t)
                        ? "bg-red-600 text-white ring-2 ring-red-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                    }`}>{t}</span>
                    {i < result.percorsoPersonalizzato.disintegrazione.sequenza.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-red-400" />
                    )}
                  </span>
                ))}
              </div>

              {/* Life phases */}
              <div className="space-y-3">
                {Object.entries(result.percorsoPersonalizzato.disintegrazione.fasi).map(([fase, info]: [string, any]) => {
                  const isActive = fase === result.percorsoPersonalizzato.faseCorrente;
                  return (
                    <div key={fase} className={`p-3 rounded-lg border transition-all ${
                      isActive 
                        ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 ring-1 ring-red-400" 
                        : "border-border/50 opacity-75"
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}>
                          {fase} anni
                        </span>
                        <span className="text-xs text-muted-foreground">Punto {info.punto}</span>
                        {isActive && <Badge className="bg-red-100 text-red-700 text-[10px]">Fase attuale</Badge>}
                      </div>
                      <p className="font-semibold text-sm">{info.nome}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{info.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Crossings */}
              <div className="mt-4 pt-3 border-t border-red-200 dark:border-red-800">
                <h4 className="text-xs font-semibold text-red-600 mb-2">Incroci di stress</h4>
                <div className="grid sm:grid-cols-2 gap-1.5">
                  {Object.entries(result.percorsoPersonalizzato.disintegrazione.incroci).map(([key, val]) => (
                    <div key={key} className="text-xs">
                      <span className="font-medium text-red-700 dark:text-red-400">{key}:</span>{' '}
                      <span className="text-muted-foreground">{val as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Punti Caldi - crossing points */}
      {result.percorsoPersonalizzato?.puntiCaldi && result.percorsoPersonalizzato.puntiCaldi.length > 0 && (
        <Card className="mb-8 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              <span className="text-xl">🔥</span> Punti Caldi — Incroci tra Percorsi
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              I punti dove i percorsi di integrazione e disintegrazione di tipi diversi si incontrano. 
              Questi sono i momenti di massima intensità evolutiva.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.percorsoPersonalizzato.puntiCaldi.map((pc: any) => (
                <div key={pc.punto} className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-lg font-bold shrink-0">{pc.punto}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{pc.significato}</p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-[11px] text-green-600">Crescita: {pc.chi_integra?.join(', ')}</span>
                        <span className="text-[11px] text-red-600">Stress: {pc.chi_disintegra?.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  {pc.esempio && (
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{pc.esempio}</p>
                  )}
                  {pc.domanda_chiave && (
                    <div className="mt-2 p-2 rounded bg-purple-100 dark:bg-purple-800/30">
                      <p className="text-xs font-semibold text-purple-800 dark:text-purple-200 italic">
                        Domanda chiave: {pc.domanda_chiave}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {result.percorsoPersonalizzato.statistiche && (
              <div className="mt-4 pt-3 border-t border-purple-200 dark:border-purple-800 text-center">
                <p className="text-[11px] text-muted-foreground">
                  Totale incroci nel sistema: <strong>{result.percorsoPersonalizzato.statistiche.totaleComplessivo}</strong> 
                  ({result.percorsoPersonalizzato.statistiche.totaleIncrociCicloLungo} ciclo lungo + {result.percorsoPersonalizzato.statistiche.totaleIncrociCicloBreve} ciclo breve)
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Old basic path as fallback */}
      {!result.percorsoPersonalizzato && result.percorso && (
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
                      <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-medium">{t}</span>
                      {i < result.percorso.integrazione.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3 text-red-600">⚠️ Disintegrazione</h4>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {result.percorso.disintegrazione?.map((t: number, i: number) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">{t}</span>
                      {i < result.percorso.disintegrazione.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
                    </span>
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

      {/* IL TUO PROFILO PERSONALE - Synthesis of everything */}
      {attrs && result.percorsoPersonalizzato && (
        <Card className="mb-8 border-2 border-primary/30 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
          <CardHeader>
            <CardTitle className="text-xl font-serif flex items-center gap-2 text-primary">
              <span className="text-2xl">👤</span> Il Tuo Profilo Personale
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Sintesi completa basata su enneatipo, ala, età, attributi e percorso evolutivo.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Chi sei */}
            <div>
              <h4 className="font-serif font-semibold text-base mb-2">Chi sei</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sei un <strong className="text-foreground">Enneatipo {enneatipo} — {attrs.nome}</strong>
                {ala && <>, con <strong className="text-foreground">Ala {ala} ({fruitNames[ala]})</strong></>}. 
                {result.educativo?.descrizione && <> {result.educativo.descrizione}</>}
                {result.educativo?.motivazione && <> La tua motivazione profonda è <em>{result.educativo.motivazione.toLowerCase()}</em>.  </>}
                {result.educativo?.paura && <>La tua paura fondamentale è <em>{result.educativo.paura.toLowerCase()}</em>.</>}
              </p>
            </div>

            {/* La tua struttura interiore */}
            <div>
              <h4 className="font-serif font-semibold text-base mb-2">La tua struttura interiore</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                La tua <strong className="text-foreground">Dignità</strong> è <strong className="text-foreground">{attrs.dignita}</strong>
                {getDesc('dignita', attrs.dignita) && <> — {getDesc('dignita', attrs.dignita)?.split('.')[0]}.</>}{' '}
                La tua <strong className="text-foreground">Virtù</strong> da coltivare è <strong className="text-foreground">{attrs.virtu}</strong>
                {getDesc('virtu', attrs.virtu) && <> — {getDesc('virtu', attrs.virtu)?.split('.')[0]}.</>}{' '}
                Il <strong className="text-foreground">Vizio</strong> da trasformare è <strong className="text-foreground">{attrs.vizio}</strong>
                {getDesc('vizio', attrs.vizio) && <> — {getDesc('vizio', attrs.vizio)?.split('.')[0]}.</>}
              </p>
            </div>

            {/* Il tuo mondo spirituale */}
            <div>
              <h4 className="font-serif font-semibold text-base mb-2">Il tuo mondo spirituale</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                La tua <strong className="text-foreground">Gerarchia Angelica</strong> sono i <strong className="text-foreground">{attrs.gerarchia_angelica}</strong>
                {(() => { const info = getFullDesc('gerarchia_angelica', attrs.gerarchia_angelica); return info?.descrizione ? <> — {info.descrizione.split('.')[0]}.</> : null; })()}{' '}
                La tua <strong className="text-foreground">Musa</strong> ispiratrice è <strong className="text-foreground">{attrs.musa}</strong>
                {(() => { const musaName = attrs.musa?.split(' (')[0]; const info = getFullDesc('musa', musaName); return info?.descrizione ? <> — {info.descrizione}.</> : null; })()}{' '}
                La tua <strong className="text-foreground">Idea Sacra</strong> è <strong className="text-foreground">{attrs.idea_sacra}</strong>
                {getDesc('idea_sacra', attrs.idea_sacra) && <> — {getDesc('idea_sacra', attrs.idea_sacra)?.split('.')[0]}.</>}
              </p>
            </div>

            {/* La tua psicologia */}
            <div>
              <h4 className="font-serif font-semibold text-base mb-2">La tua psicologia</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Il tuo <strong className="text-foreground">Meccanismo di Difesa</strong> principale è la <strong className="text-foreground">{attrs.meccanismo_difesa}</strong>
                {getDesc('meccanismo_difesa', attrs.meccanismo_difesa) && <> — {getDesc('meccanismo_difesa', attrs.meccanismo_difesa)?.split('.')[0]}.</>}{' '}
                Nella topica freudiana, la tua istanza dominante è il <strong className="text-foreground">{attrs.topica}</strong>
                {getDesc('topica', attrs.topica) && <> — {getDesc('topica', attrs.topica)?.split('.')[0]}.</>}{' '}
                L'adattamento caratteriale è <strong className="text-foreground">{attrs.adattamento}</strong>.
                La correlazione cerebrale è con l'<strong className="text-foreground">{attrs.correlazione_cerebrale}</strong>.
              </p>
            </div>

            {/* Le tue risonanze cosmiche */}
            <div>
              <h4 className="font-serif font-semibold text-base mb-2">Le tue risonanze cosmiche</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Il tuo <strong className="text-foreground">Chakra</strong> è il <strong className="text-foreground">{attrs.chakra}</strong>
                {getDesc('chakra', attrs.chakra) && <> — {getDesc('chakra', attrs.chakra)?.split('.')[0]}.</>}{' '}
                Il tuo <strong className="text-foreground">Pianeta</strong> è <strong className="text-foreground">{attrs.pianeta}</strong>
                {getDesc('pianeta', attrs.pianeta) && <> — {getDesc('pianeta', attrs.pianeta)?.split('.')[0]}.</>}{' '}
                La tua <strong className="text-foreground">Melodia</strong> è <strong className="text-foreground">{attrs.melodia}</strong>.
                La tua <strong className="text-foreground">Facoltà</strong> è <strong className="text-foreground">{attrs.facolta}</strong>
                {getDesc('facolta', attrs.facolta) && <> — {getDesc('facolta', attrs.facolta)?.split('.')[0]}.</>}
              </p>
            </div>

            {/* Dove ti trovi ora */}
            {result.percorsoPersonalizzato.faseCorrente && (
              <div>
                <h4 className="font-serif font-semibold text-base mb-2">Dove ti trovi ora</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A <strong className="text-foreground">{result.eta} anni</strong>, ti trovi nella fase <strong className="text-foreground">{result.percorsoPersonalizzato.faseCorrente}</strong> del tuo percorso evolutivo.
                  {result.percorsoPersonalizzato.integrazione.faseAttuale && <>
                    {' '}Se stai vivendo un percorso di <strong className="text-green-600">integrazione</strong>, sei nella fase 
                    "<em className="text-foreground">{result.percorsoPersonalizzato.integrazione.faseAttuale.nome}</em>" — {result.percorsoPersonalizzato.integrazione.faseAttuale.desc?.toLowerCase()}.
                  </>}
                  {result.percorsoPersonalizzato.disintegrazione.faseAttuale && <>
                    {' '}Se invece stai attraversando un momento di <strong className="text-red-600">stress</strong>, potresti riconoscere la fase 
                    "<em className="text-foreground">{result.percorsoPersonalizzato.disintegrazione.faseAttuale.nome}</em>" — {result.percorsoPersonalizzato.disintegrazione.faseAttuale.desc?.toLowerCase()}.
                  </>}
                </p>
              </div>
            )}

            {/* Consigli */}
            {result.educativo?.consigli && result.educativo.consigli.length > 0 && (
              <div>
                <h4 className="font-serif font-semibold text-base mb-2">Il tuo cammino</h4>
                <ul className="space-y-1.5">
                  {result.educativo.consigli.map((c: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary shrink-0">→</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Narrative Profile Generation */}
      {id && (
        <NarrativeProfileSection testResultId={parseInt(id)} enneatipo={enneatipo} attrs={attrs} eta={result.eta} ala={ala} />
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

// Narrative Profile Component
function NarrativeProfileSection({ testResultId, enneatipo, attrs, eta, ala }: {
  testResultId: number; enneatipo: number; attrs: any; eta: number; ala: number | null;
}) {
  const [narrative, setNarrative] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/profile/generate", { testResultId });
      return res.json();
    },
    onSuccess: (data) => {
      setNarrative(data.narrative);
      setIsGenerating(false);
    },
    onError: () => {
      setIsGenerating(false);
    }
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    generateMutation.mutate();
  };

  const handleDownloadPDF = () => {
    if (!narrative) return;
    // Create a printable HTML and use browser print
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const typeNames: Record<number, string> = {
      1: "Il Perfezionista", 2: "L'Altruista", 3: "Il Realizzatore",
      4: "L'Individualista", 5: "L'Investigatore", 6: "Il Leale",
      7: "L'Entusiasta", 8: "Il Challenger", 9: "Il Pacificatore"
    };
    
    // Convert markdown-like text to HTML
    const htmlContent = narrative
      .replace(/## (.*)/g, '<h2 style="color:#7C3AED;margin-top:24px;margin-bottom:12px;font-family:Georgia,serif;">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p style="margin-bottom:12px;line-height:1.7;">')
      .replace(/\n/g, '<br/>');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head>
        <title>Profilo Enneagramma Evolutivo - Enneatipo ${enneatipo}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');
          body { font-family: 'DM Sans', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #333; line-height: 1.7; }
          h1 { font-family: 'Cormorant Garamond', serif; color: #7C3AED; text-align: center; font-size: 28px; margin-bottom: 4px; }
          h2 { font-family: 'Cormorant Garamond', serif; color: #7C3AED; font-size: 20px; border-bottom: 1px solid #E9D5FF; padding-bottom: 6px; }
          .subtitle { text-align: center; color: #666; font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 18px; margin-bottom: 30px; }
          .header-info { text-align: center; margin-bottom: 30px; }
          .badge { display: inline-block; background: #F3E8FF; color: #7C3AED; padding: 4px 12px; border-radius: 20px; font-size: 13px; margin: 4px; }
          p { margin-bottom: 12px; }
          strong { color: #4C1D95; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E9D5FF; color: #999; font-size: 12px; }
          @media print { body { padding: 20px; } }
        </style>
      </head><body>
        <h1>\u{1F34E} Enneagramma Evolutivo</h1>
        <div class="subtitle">Profilo Personalizzato</div>
        <div class="header-info">
          <div style="font-size:40px;margin-bottom:8px;">\u{1F34E}</div>
          <div style="font-size:22px;font-weight:bold;font-family:'Cormorant Garamond',serif;">Enneatipo ${enneatipo}: ${typeNames[enneatipo]}</div>
          ${ala ? `<span class="badge">Ala ${ala}</span>` : ''}
          <span class="badge">${eta} anni</span>
        </div>
        <p style="margin-bottom:12px;line-height:1.7;">${htmlContent}</p>
        <div class="footer">
          Profilo generato da Enneagramma Evolutivo<br/>
          Sistema basato sugli studi di Raimondo Lullo, Athanasio Kircher e G.I. Gurdjieff<br/>
          ${new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  if (!narrative) {
    return (
      <Card className="mb-8 border-dashed border-2 border-primary/30">
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 text-primary/40 mx-auto mb-4" />
          <h3 className="text-lg font-serif font-bold mb-2">Genera il Tuo Profilo Narrativo Completo</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
            L'intelligenza artificiale analizzer\u00e0 i tuoi risultati e creer\u00e0 un profilo personalizzato 
            e dettagliato del tuo percorso evolutivo, nello stile dell'Enneagramma Evolutivo.
          </p>
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="bg-primary hover:bg-primary/90"
            size="lg"
          >
            {isGenerating ? (
              <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Generazione in corso (30-60 sec)...</>
            ) : (
              <><FileText className="mr-2 w-4 h-4" /> Genera Profilo Narrativo</>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 border-2 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-serif flex items-center gap-2 text-primary">
          <FileText className="w-5 h-5" /> Il Tuo Profilo Narrativo
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
          <Download className="mr-2 w-4 h-4" /> Scarica PDF
        </Button>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none" 
          dangerouslySetInnerHTML={{ 
            __html: narrative
              .replace(/## (.*)/g, '<h2 class="text-lg font-serif font-bold text-primary mt-6 mb-3 border-b border-primary/20 pb-1">$1</h2>')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\n\n/g, '</p><p class="text-sm text-muted-foreground leading-relaxed mb-3">')
              .replace(/\n/g, '<br/>')
          }} 
        />
      </CardContent>
    </Card>
  );
}
