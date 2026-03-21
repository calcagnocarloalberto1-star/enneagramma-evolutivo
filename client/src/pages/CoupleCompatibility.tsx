import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ThumbsUp, AlertTriangle, Lightbulb, Check, Star } from "lucide-react";
import {
  getJourney,
  getCurrentPhase,
  getCurrentPhaseIndex,
  findSharedAttributes,
  findDifferentAttributes,
  typeNames,
  fruitEmoji,
  type Journey,
  type JourneyPhase,
} from "@/data/percorsi-eta";

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

function PhaseAttributeGrid({ phase, label }: { phase: JourneyPhase; label: string }) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
        <span className="text-lg">{fruitEmoji[phase.enneatipo]}</span>
        {label} — Fase enneatipo {phase.enneatipo}
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        <div><span className="text-muted-foreground">Dignità:</span> {phase.dignita}</div>
        <div><span className="text-muted-foreground">Virtù:</span> {phase.virtu}</div>
        <div><span className="text-muted-foreground">Vizio:</span> {phase.vizio}</div>
        <div><span className="text-muted-foreground">Gerarchia:</span> {phase.gerarchia}</div>
        <div><span className="text-muted-foreground">Musa:</span> {phase.musa}</div>
        <div><span className="text-muted-foreground">Facoltà:</span> {phase.facolta}</div>
        <div><span className="text-muted-foreground">Topica:</span> {phase.topica}</div>
        <div><span className="text-muted-foreground">Difesa:</span> {phase.meccanismoDifesa}</div>
        <div><span className="text-muted-foreground">Idea sacra:</span> {phase.ideaSacra}</div>
        <div><span className="text-muted-foreground">Chakra:</span> {phase.chakra}</div>
        <div><span className="text-muted-foreground">Pianeta:</span> {phase.pianeta}</div>
        <div><span className="text-muted-foreground">Melodia:</span> {phase.melodia}</div>
      </div>
    </div>
  );
}

function AgeCompatSection({ type1, type2, age1, age2, percorso1, percorso2 }: {
  type1: number; type2: number; age1: number; age2: number; percorso1: number; percorso2: number;
}) {
  const j1 = getJourney(type1, percorso1);
  const j2 = getJourney(type2, percorso2);
  if (!j1 || !j2) return null;

  const p1 = getCurrentPhase(j1, age1);
  const p2 = getCurrentPhase(j2, age2);
  if (!p1 || !p2) return null;

  const shared = findSharedAttributes(p1, p2);
  const diffs = findDifferentAttributes(p1, p2);
  const compatScore = Math.round((shared.length / 13) * 100);

  return (
    <div className="space-y-4">
      {/* Compatibility by age score */}
      <Card className="border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif font-bold text-base">Affinità per fase di vita</h3>
            <Badge className="bg-primary text-lg px-3">{compatScore}%</Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-3 mb-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${compatScore}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Basato su {shared.length} attributi condivisi su 13 totali nella fase di vita attuale.
          </p>
        </CardContent>
      </Card>

      {/* Individual phases */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-serif">Attributi attuali per fase d'età</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 divide-y">
          <PhaseAttributeGrid phase={p1} label={`Partner 1 (${age1} anni, Tipo ${type1} P${percorso1})`} />
          <div className="pt-4">
            <PhaseAttributeGrid phase={p2} label={`Partner 2 (${age2} anni, Tipo ${type2} P${percorso2})`} />
          </div>
        </CardContent>
      </Card>

      {/* Shared attributes */}
      {shared.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-serif flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" /> Punti di Incontro ({shared.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Questi attributi sono condivisi dai due partner nelle loro fasi di vita attuali, creando una base di comprensione reciproca naturale.
            </p>
            <div className="flex flex-wrap gap-2">
              {shared.map(s => (
                <Badge key={s} variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Differences */}
      {diffs.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-serif flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Aree di Differenza ({diffs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Queste differenze possono rappresentare aree di crescita reciproca o potenziale attrito.
            </p>
            <div className="space-y-2">
              {diffs.map(d => (
                <div key={d.attributo} className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="text-muted-foreground font-medium w-36 shrink-0">{d.attributo}:</span>
                  <Badge variant="outline" className="text-xs">P1: {d.persona1}</Badge>
                  <span className="text-muted-foreground">↔</span>
                  <Badge variant="outline" className="text-xs">P2: {d.persona2}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function CoupleCompatibility() {
  const [type1, setType1] = useState<string>("");
  const [type2, setType2] = useState<string>("");
  const [age1, setAge1] = useState<string>("");
  const [age2, setAge2] = useState<string>("");
  const [percorso1, setPercorso1] = useState<string>("1");
  const [percorso2, setPercorso2] = useState<string>("1");

  const shouldFetch = type1 && type2;
  const hasAges = age1 && age2;

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
          Seleziona i due enneatipi per scoprire la compatibilità. Aggiungi le età per un'analisi approfondita basata sulle fasi di vita.
        </p>
      </div>

      {/* Selectors */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-3 gap-4 items-end mb-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Partner 1 — Enneatipo</label>
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
              <label className="text-sm font-medium mb-2 block">Partner 2 — Enneatipo</label>
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

          {/* Age and percorso inputs */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Partner 1</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs mb-1 block">Età</label>
                  <Input
                    type="number" min={0} max={120}
                    placeholder="Es. 35" value={age1}
                    onChange={(e) => setAge1(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="text-xs mb-1 block">Percorso</label>
                  <Select value={percorso1} onValueChange={setPercorso1}>
                    <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Percorso 1</SelectItem>
                      <SelectItem value="2">Percorso 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Partner 2</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs mb-1 block">Età</label>
                  <Input
                    type="number" min={0} max={120}
                    placeholder="Es. 32" value={age2}
                    onChange={(e) => setAge2(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="text-xs mb-1 block">Percorso</label>
                  <Select value={percorso2} onValueChange={setPercorso2}>
                    <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Percorso 1</SelectItem>
                      <SelectItem value="2">Percorso 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
          {/* Tabs: base compatibility + age-based */}
          {hasAges && type1 && type2 ? (
            <Tabs defaultValue="eta" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="eta">Compatibilità per Età</TabsTrigger>
                <TabsTrigger value="base">Compatibilità Base</TabsTrigger>
              </TabsList>

              <TabsContent value="eta" className="mt-4">
                <AgeCompatSection
                  type1={parseInt(type1)} type2={parseInt(type2)}
                  age1={parseInt(age1)} age2={parseInt(age2)}
                  percorso1={parseInt(percorso1)} percorso2={parseInt(percorso2)}
                />
              </TabsContent>

              <TabsContent value="base" className="mt-4 space-y-6">
                <BaseCompatibilitySection compat={compat} type1={type1} type2={type2} percentage={percentage} />
              </TabsContent>
            </Tabs>
          ) : (
            <BaseCompatibilitySection compat={compat} type1={type1} type2={type2} percentage={percentage} />
          )}
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

function BaseCompatibilitySection({ compat, type1, type2, percentage }: {
  compat: any; type1: string; type2: string; percentage: number;
}) {
  return (
    <>
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
    </>
  );
}
