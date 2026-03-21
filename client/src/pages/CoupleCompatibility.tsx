import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ThumbsUp, AlertTriangle, Lightbulb, Check, Star, FileText, Download } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  getJourney,
  getCurrentPhase,
  getCurrentPhaseIndex,
  findSharedAttributes,
  findDifferentAttributes,
  getATForEnneatipo,
  getATInterazione,
  AT_DISCLAIMER,
  typeNames,
  fruitEmoji,
  type Journey,
  type JourneyPhase,
} from "@/data/percorsi-eta";

const typeEmoji: Record<number, string> = {
  1: "🍎", 2: "🍐", 3: "🍒", 4: "🫐",
  5: "🍇", 6: "🫐", 7: "🍍", 8: "🍑", 9: "🍓",
};

// Adjacent wings on the enneagram circle (wrapping: 9→1, 1→9)
function getWings(type: number): number[] {
  if (type < 1 || type > 9) return [];
  const left = type === 1 ? 9 : type - 1;
  const right = type === 9 ? 1 : type + 1;
  return [left, right];
}

const wingDescriptions: Record<string, string> = {
  "1w9": "più riflessivo e calmo, idealistico",
  "1w2": "più caloroso e orientato agli altri",
  "2w1": "più disciplinato e critico",
  "2w3": "più ambizioso e orientato al successo",
  "3w2": "più carismatico e relazionale",
  "3w4": "più introspettivo e creativo",
  "4w3": "più orientato al risultato e visibile",
  "4w5": "più riservato e intellettuale",
  "5w4": "più creativo e emotivo",
  "5w6": "più analitico e leale",
  "6w5": "più introverso e cerebrale",
  "6w7": "più estroverso e avventuroso",
  "7w6": "più responsabile e leale",
  "7w8": "più assertivo e deciso",
  "8w7": "più energico e impulsivo",
  "8w9": "più calmo e protettivo",
  "9w8": "più assertivo e determinato",
  "9w1": "più ordinato e principiale",
};


const levelColors: Record<string, string> = {
  eccellente: "bg-green-500",
  ottima: "bg-emerald-500",
  buona: "bg-blue-500",
  media: "bg-amber-500",
  bassa: "bg-orange-500",
  difficile: "bg-red-500",
};

function generateCoupleSummary(
  compat: any,
  type1: string,
  type2: string,
  wing1: string,
  wing2: string,
  age1?: string,
  age2?: string,
  percorso1?: string,
  percorso2?: string,
): string {
  const t1 = parseInt(type1);
  const t2 = parseInt(type2);
  const name1 = `Tipo ${type1} - ${typeNames[t1]}`;
  const name2 = `Tipo ${type2} - ${typeNames[t2]}`;
  const level = compat.livello || "";
  const pct = compat.percentuale || 0;
  const strengths = (compat.puntiForza || []) as string[];
  const challenges = (compat.sfide || []) as string[];

  let text = `La coppia formata da ${name1} e ${name2} presenta un livello di compatibilita ${level} (${pct}%). `;
  text += compat.descrizione ? compat.descrizione + " " : "";

  if (strengths.length > 0) {
    text += `\n\nTra i principali punti di forza emergono: ${strengths.join(", ")}. `;
    text += "Questi elementi rappresentano le fondamenta su cui la coppia puo costruire una relazione solida e appagante. ";
  }

  if (challenges.length > 0) {
    text += `Le sfide da affrontare includono: ${challenges.join(", ")}. `;
    text += "Riconoscere queste aree di potenziale attrito e il primo passo per trasformarle in opportunita di crescita reciproca. ";
  }

  const w1Desc = wing1 && wing1 !== "nessuna" ? wingDescriptions[`${type1}w${wing1}`] : null;
  const w2Desc = wing2 && wing2 !== "nessuna" ? wingDescriptions[`${type2}w${wing2}`] : null;
  if (w1Desc || w2Desc) {
    text += "\n\nLe ali giocano un ruolo importante nella dinamica di coppia. ";
    if (w1Desc) text += `Il Partner 1 (${name1} con Ala ${wing1}), essendo ${w1Desc}, arricchisce la relazione con sfumature uniche. `;
    if (w2Desc) text += `Il Partner 2 (${name2} con Ala ${wing2}), essendo ${w2Desc}, contribuisce con qualita aggiuntive alla dinamica. `;
  }

  if (age1 && age2) {
    text += `\n\nConsiderando le eta dei partner (${age1} e ${age2} anni), la fase di vita attuale influenza significativamente il modo in cui ciascuno vive ed esprime il proprio enneatipo. `;
    text += "Le fasi di crescita personale possono creare momenti di grande sintonia o di temporanea distanza, rendendo la consapevolezza reciproca ancora piu importante.";
  }

  if (compat.consigli) {
    text += `\n\nConsiglio pratico: ${compat.consigli}`;
  }

  return text;
}

function generateCouplePdf(
  compat: any,
  type1: string,
  type2: string,
  wing1: string,
  wing2: string,
  age1: string,
  age2: string,
  percorso1: string,
  percorso2: string,
  summaryText: string,
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const checkPage = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - 25) {
      doc.addPage();
      y = 20;
    }
  };

  const addSectionTitle = (title: string) => {
    checkPage(20);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  };

  const addWrappedText = (text: string) => {
    const lines = doc.splitTextToSize(text, contentWidth);
    checkPage(lines.length * 5 + 5);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 4;
  };

  // Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const title = "Analisi di Compatibilita di Coppia";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  y += 7;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Enneagramma Evolutivo", pageWidth / 2, y, { align: "center" });
  y += 10;

  // Date
  doc.setFontSize(9);
  doc.text(`Data analisi: ${new Date().toLocaleDateString("it-IT")}`, margin, y);
  y += 10;

  // Partner info
  const t1 = parseInt(type1);
  const t2 = parseInt(type2);
  addSectionTitle("Informazioni Partner");

  const w1Label = wing1 && wing1 !== "nessuna" ? ` con Ala ${wing1}` : "";
  const w2Label = wing2 && wing2 !== "nessuna" ? ` con Ala ${wing2}` : "";
  addWrappedText(`Partner 1: Tipo ${type1} - ${typeNames[t1]}${w1Label}${age1 ? `, ${age1} anni` : ""}${percorso1 ? `, Percorso ${percorso1}` : ""}`);
  addWrappedText(`Partner 2: Tipo ${type2} - ${typeNames[t2]}${w2Label}${age2 ? `, ${age2} anni` : ""}${percorso2 ? `, Percorso ${percorso2}` : ""}`);
  y += 4;

  // Compatibility level
  addSectionTitle(`Livello di Compatibilita: ${(compat.livello || "").toUpperCase()} - ${compat.percentuale || 0}%`);
  if (compat.descrizione) {
    addWrappedText(compat.descrizione);
  }
  y += 2;

  // Strengths
  if (compat.puntiForza?.length) {
    addSectionTitle("Punti di Forza");
    compat.puntiForza.forEach((p: string) => {
      addWrappedText(`  - ${p}`);
    });
    y += 2;
  }

  // Challenges
  if (compat.sfide?.length) {
    addSectionTitle("Sfide");
    compat.sfide.forEach((s: string) => {
      addWrappedText(`  - ${s}`);
    });
    y += 2;
  }

  // Advice
  if (compat.consigli) {
    addSectionTitle("Consigli");
    addWrappedText(compat.consigli);
    y += 2;
  }

  // Wing influence
  const w1Desc = wing1 && wing1 !== "nessuna" ? wingDescriptions[`${type1}w${wing1}`] : null;
  const w2Desc = wing2 && wing2 !== "nessuna" ? wingDescriptions[`${type2}w${wing2}`] : null;
  if (w1Desc || w2Desc) {
    addSectionTitle("Influenza delle Ali");
    if (w1Desc) addWrappedText(`Partner 1 (Tipo ${type1} con Ala ${wing1}): essendo ${w1Desc}, questa sfumatura influenza la dinamica di coppia.`);
    if (w2Desc) addWrappedText(`Partner 2 (Tipo ${type2} con Ala ${wing2}): essendo ${w2Desc}, questo colora la relazione con qualita aggiuntive.`);
    y += 2;
  }

  // Age-based analysis
  if (age1 && age2) {
    const j1 = getJourney(t1, parseInt(percorso1 || "1"));
    const j2 = getJourney(t2, parseInt(percorso2 || "1"));
    if (j1 && j2) {
      const p1 = getCurrentPhase(j1, parseInt(age1));
      const p2 = getCurrentPhase(j2, parseInt(age2));
      if (p1 && p2) {
        const shared = findSharedAttributes(p1, p2);
        const diffs = findDifferentAttributes(p1, p2);
        const compatScore = Math.round((shared.length / 13) * 100);

        addSectionTitle(`Analisi per Fase di Vita - Affinita: ${compatScore}%`);
        addWrappedText(`Partner 1 (${age1} anni): fase enneatipo ${p1.enneatipo} - Dignita: ${p1.dignita}, Virtu: ${p1.virtu}, Vizio: ${p1.vizio}`);
        addWrappedText(`Partner 2 (${age2} anni): fase enneatipo ${p2.enneatipo} - Dignita: ${p2.dignita}, Virtu: ${p2.virtu}, Vizio: ${p2.vizio}`);

        if (shared.length > 0) {
          addWrappedText(`Attributi condivisi (${shared.length}): ${shared.join(", ")}`);
        }
        if (diffs.length > 0) {
          addWrappedText(`Differenze (${diffs.length}): ${diffs.map(d => `${d.attributo}: ${d.persona1} vs ${d.persona2}`).join("; ")}`);
        }
        y += 2;
      }
    }
  }

  // Summary comment
  addSectionTitle("Commento Riepilogativo");
  addWrappedText(summaryText);

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Generato da Enneagramma Evolutivo - enneagrammaevolutivo.com",
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" },
    );
  }

  doc.save(`compatibilita-coppia-tipo${type1}-tipo${type2}.pdf`);
}

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
  const [wing1, setWing1] = useState<string>("nessuna");
  const [wing2, setWing2] = useState<string>("nessuna");
  const [age1, setAge1] = useState<string>("");
  const [age2, setAge2] = useState<string>("");
  const [percorso1, setPercorso1] = useState<string>("1");
  const [percorso2, setPercorso2] = useState<string>("1");

  // Reset wing when enneatipo changes
  const handleType1Change = (v: string) => { setType1(v); setWing1("nessuna"); };
  const handleType2Change = (v: string) => { setType2(v); setWing2("nessuna"); };

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
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Partner 1 — Enneatipo</label>
                <Select value={type1} onValueChange={handleType1Change}>
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
              {type1 && (
                <div>
                  <label className="text-xs mb-1 block">Ala</label>
                  <Select value={wing1} onValueChange={setWing1}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nessuna">Nessuna</SelectItem>
                      {getWings(parseInt(type1)).map(w => (
                        <SelectItem key={w} value={String(w)}>
                          Ala {w} — {wingDescriptions[`${type1}w${w}`] || ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex justify-center items-center">
              <Heart className="w-8 h-8 text-rose-400" />
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Partner 2 — Enneatipo</label>
                <Select value={type2} onValueChange={handleType2Change}>
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
              {type2 && (
                <div>
                  <label className="text-xs mb-1 block">Ala</label>
                  <Select value={wing2} onValueChange={setWing2}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nessuna">Nessuna</SelectItem>
                      {getWings(parseInt(type2)).map(w => (
                        <SelectItem key={w} value={String(w)}>
                          Ala {w} — {wingDescriptions[`${type2}w${w}`] || ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
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
          {/* Quick PDF download button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                const summaryText = generateCoupleSummary(compat, type1, type2, wing1, wing2, age1, age2, percorso1, percorso2);
                generateCouplePdf(compat, type1, type2, wing1, wing2, age1, age2, percorso1, percorso2, summaryText);
              }}
            >
              <Download className="w-3.5 h-3.5" />
              Scarica PDF
            </Button>
          </div>
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
                <BaseCompatibilitySection compat={compat} type1={type1} type2={type2} wing1={wing1} wing2={wing2} percentage={percentage} age1={age1} age2={age2} percorso1={percorso1} percorso2={percorso2} />
              </TabsContent>
            </Tabs>
          ) : (
            <BaseCompatibilitySection compat={compat} type1={type1} type2={type2} wing1={wing1} wing2={wing2} percentage={percentage} age1={age1} age2={age2} percorso1={percorso1} percorso2={percorso2} />
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

function BaseCompatibilitySection({ compat, type1, type2, wing1, wing2, percentage, age1, age2, percorso1, percorso2 }: {
  compat: any; type1: string; type2: string; wing1: string; wing2: string; percentage: number;
  age1?: string; age2?: string; percorso1?: string; percorso2?: string;
}) {
  const wing1Label = wing1 && wing1 !== "nessuna" ? `Ala ${wing1}` : null;
  const wing2Label = wing2 && wing2 !== "nessuna" ? `Ala ${wing2}` : null;
  const wing1Desc = wing1 && wing1 !== "nessuna" ? wingDescriptions[`${type1}w${wing1}`] : null;
  const wing2Desc = wing2 && wing2 !== "nessuna" ? wingDescriptions[`${type2}w${wing2}`] : null;

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
                {wing1Label && <div className="text-xs text-primary mt-0.5">{wing1Label}</div>}
              </div>
              <Heart className="w-6 h-6 text-rose-500" />
              <div className="text-center">
                <div className="text-3xl">{typeEmoji[parseInt(type2)]}</div>
                <div className="text-xs text-muted-foreground mt-1">Tipo {type2}</div>
                {wing2Label && <div className="text-xs text-primary mt-0.5">{wing2Label}</div>}
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

          {/* Wing influence on compatibility */}
          {(wing1Desc || wing2Desc) && (
            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-primary" /> Influenza delle Ali
              </h4>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                {wing1Desc && (
                  <p>
                    <strong>Partner 1</strong> (Tipo {type1} con Ala {wing1}): essendo {wing1Desc}, questa sfumatura influenza la dinamica di coppia rendendo il partner più sfaccettato rispetto al tipo base.
                  </p>
                )}
                {wing2Desc && (
                  <p>
                    <strong>Partner 2</strong> (Tipo {type2} con Ala {wing2}): essendo {wing2Desc}, questo colora la relazione con qualità aggiuntive che moderano o amplificano le caratteristiche del tipo base.
                  </p>
                )}
                {wing1Desc && wing2Desc && (
                  <p className="pt-1 text-foreground/70 font-medium">
                    La combinazione di queste ali può creare una dinamica unica: le sfumature di personalità introdotte dalle ali possono attenuare alcune sfide o rafforzare i punti di forza della coppia.
                  </p>
                )}
              </div>
            </div>
          )}
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

      {/* AT Dynamics */}
      {(() => {
        const t1 = parseInt(type1);
        const t2 = parseInt(type2);
        const at1 = getATForEnneatipo(t1);
        const at2 = getATForEnneatipo(t2);
        const interazione = getATInterazione(t1, t2);
        if (!at1 || !at2) return null;
        return (
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" /> Dinamiche degli Adattamenti (AT)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground italic p-2 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                {AT_DISCLAIMER}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{fruitEmoji[t1]}</span>
                    <div>
                      <div className="font-semibold text-sm">{at1.nome} ({at1.nomeAlternativo})</div>
                      <div className="text-xs text-muted-foreground">{at1.tipo} — {at1.eysenck}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center text-xs">
                    <div className="p-1 rounded bg-green-50 dark:bg-green-900/20"><div className="font-medium text-green-700 dark:text-green-300">{at1.portaAperta}</div><div className="text-[10px] text-muted-foreground">Aperta</div></div>
                    <div className="p-1 rounded bg-blue-50 dark:bg-blue-900/20"><div className="font-medium text-blue-700 dark:text-blue-300">{at1.portaBersaglio}</div><div className="text-[10px] text-muted-foreground">Bersaglio</div></div>
                    <div className="p-1 rounded bg-red-50 dark:bg-red-900/20"><div className="font-medium text-red-700 dark:text-red-300">{at1.portaTrappola}</div><div className="text-[10px] text-muted-foreground">Trappola</div></div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Sequenza porte: <span className="font-medium">{at1.sequenzaPorte}</span></div>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{fruitEmoji[t2]}</span>
                    <div>
                      <div className="font-semibold text-sm">{at2.nome} ({at2.nomeAlternativo})</div>
                      <div className="text-xs text-muted-foreground">{at2.tipo} — {at2.eysenck}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center text-xs">
                    <div className="p-1 rounded bg-green-50 dark:bg-green-900/20"><div className="font-medium text-green-700 dark:text-green-300">{at2.portaAperta}</div><div className="text-[10px] text-muted-foreground">Aperta</div></div>
                    <div className="p-1 rounded bg-blue-50 dark:bg-blue-900/20"><div className="font-medium text-blue-700 dark:text-blue-300">{at2.portaBersaglio}</div><div className="text-[10px] text-muted-foreground">Bersaglio</div></div>
                    <div className="p-1 rounded bg-red-50 dark:bg-red-900/20"><div className="font-medium text-red-700 dark:text-red-300">{at2.portaTrappola}</div><div className="text-[10px] text-muted-foreground">Trappola</div></div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Sequenza porte: <span className="font-medium">{at2.sequenzaPorte}</span></div>
                </div>
              </div>
              {interazione && (
                <div className={`p-4 rounded-lg border ${
                  interazione.tipo === "attrazione" ? "border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-900/10" :
                  interazione.tipo === "problematica" ? "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10" :
                  "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {interazione.tipo === "attrazione" && <Heart className="w-4 h-4 text-rose-500" />}
                    {interazione.tipo === "problematica" && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    {interazione.tipo === "amicizia" && <ThumbsUp className="w-4 h-4 text-green-500" />}
                    <span className="font-semibold text-sm capitalize">{interazione.tipo === "attrazione" ? "Dinamica di attrazione" : interazione.tipo === "problematica" ? "Attenzione: combinazione delicata" : "Buona sintonia"}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{interazione.descrizione}</p>
                  <div className="flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground">{interazione.consiglio}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })()}

      {/* Summary Comment */}
      {(() => {
        const summaryText = generateCoupleSummary(compat, type1, type2, wing1, wing2, age1, age2, percorso1, percorso2);
        return (
          <>
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-serif flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Commento Riepilogativo
                </CardTitle>
              </CardHeader>
              <CardContent>
                {summaryText.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>

            {/* PDF Download */}
            <div className="flex justify-center">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => generateCouplePdf(compat, type1, type2, wing1, wing2, age1 || "", age2 || "", percorso1 || "1", percorso2 || "1", summaryText)}
              >
                <Download className="w-4 h-4" />
                Scarica Analisi PDF
              </Button>
            </div>
          </>
        );
      })()}
    </>
  );
}
