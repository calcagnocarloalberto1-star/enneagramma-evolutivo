import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Scale, Users, Target, Shield, BookOpen, AlertTriangle, Download, Info, FileText, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  typeNames,
  AT_DISCLAIMER,
} from "@/data/percorsi-eta";
import {
  getWings,
  wingDescriptions,
  sottotipi,
  tipiControversiaCivileList,
  buildPartyProfile,
  buildConflictDynamics,
  buildMediatorStrategy,
  generateCivilSimulations,
  type PartyProfile,
  type MediatorStrategy,
  type SimulationScenario,
  type ConflictDynamics,
} from "@/data/mediation-utils";

const levelColors: Record<string, string> = {
  eccellente: "bg-green-500",
  ottima: "bg-emerald-500",
  buona: "bg-blue-500",
  media: "bg-amber-500",
  bassa: "bg-orange-500",
  difficile: "bg-red-500",
};

export default function CivilMediation() {
  useEffect(() => { document.title = "Mediazione Civile e Commerciale | Enneagramma Evolutivo"; }, []);
  const [nome1, setNome1] = useState("");
  const [nome2, setNome2] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [wing1, setWing1] = useState("nessuna");
  const [wing2, setWing2] = useState("nessuna");
  const [sottotipo1, setSottotipo1] = useState("");
  const [sottotipo2, setSottotipo2] = useState("");
  const [tipoControversia, setTipoControversia] = useState("");
  const [livelloConflitto, setLivelloConflitto] = useState("medio");
  const [inquadramento, setInquadramento] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [minutaText, setMinutaText] = useState("");
  const [minutaLoading, setMinutaLoading] = useState(false);

  const t1 = parseInt(type1);
  const t2 = parseInt(type2);
  const wings1 = type1 ? getWings(t1) : [];
  const wings2 = type2 ? getWings(t2) : [];

  const { data: compatData } = useQuery({
    queryKey: ["/api/compatibility", type1, type2],
    queryFn: async () => {
      const res = await fetch(`/api/compatibility/${type1}/${type2}`);
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!type1 && !!type2 && showAnalysis,
  });

  const canAnalyze = !!type1 && !!type2;

  const profile1: PartyProfile | null = showAnalysis && type1
    ? buildPartyProfile(nome1 || `Parte 1`, t1, wing1, sottotipo1)
    : null;
  const profile2: PartyProfile | null = showAnalysis && type2
    ? buildPartyProfile(nome2 || `Parte 2`, t2, wing2, sottotipo2)
    : null;

  const dynamics: ConflictDynamics | null = showAnalysis && type1 && type2
    ? buildConflictDynamics(t1, t2)
    : null;

  const strategy: MediatorStrategy | null = showAnalysis && profile1 && profile2
    ? buildMediatorStrategy(profile1, profile2, livelloConflitto)
    : null;

  const simulations: SimulationScenario[] = showAnalysis && type1 && type2
    ? generateCivilSimulations(t1, t2, tipoControversia)
    : [];

  function handleAnalyze() {
    if (canAnalyze) setShowAnalysis(true);
  }

  function handleReset() {
    setShowAnalysis(false);
    setMinutaText("");
  }

  async function generateMinuta() {
    setMinutaLoading(true);
    setMinutaText("");
    try {
      const res = await fetch("/api/mediation/minuta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "civile",
          parte1: { nome: nome1 || "Parte 1", enneatipo: t1, ala: wing1, sottotipo: sottotipo1 },
          parte2: { nome: nome2 || "Parte 2", enneatipo: t2, ala: wing2, sottotipo: sottotipo2 },
          tipoControversia,
          livelloConflitto,
          inquadramento,
        }),
      });
      const data = await res.json();
      if (data.minuta) setMinutaText(data.minuta);
      else setMinutaText("Errore nella generazione della minuta.");
    } catch {
      setMinutaText("Errore di connessione. Riprova più tardi.");
    } finally {
      setMinutaLoading(false);
    }
  }

  function sanitizeForPdf(text: string): string {
    let t = text;
    // Remove markdown bold/italic markers
    t = t.replace(/\*\*\*/g, '');
    t = t.replace(/\*\*/g, '');
    t = t.replace(/\*/g, '');
    // Remove markdown headers
    t = t.replace(/^#{1,6}\s/gm, '');
    // Clean special Unicode chars that jsPDF can't render
    t = t.replace(/[═]/g, '=');
    t = t.replace(/[—–]/g, '-');
    t = t.replace(/[\u201C\u201D\u201E\u201F]/g, '"');
    t = t.replace(/[\u2018\u2019\u201A\u201B]/g, "'");
    t = t.replace(/\u2026/g, '...');
    t = t.replace(/[\u2192\u2794\u279C]/g, '->');
    t = t.replace(/[\u2022\u2023\u25CF\u25CB]/g, '-');
    t = t.replace(/[\u00A0]/g, ' ');
    // jsPDF 4.x supports Latin-1 accented chars natively (è, à, ù, ò, é, etc.)
    // Only strip chars outside Latin-1 range that could cause issues
    t = t.replace(/[^\x00-\xFF]/g, (ch) => {
      const map: Record<string, string> = { '\u2013': '-', '\u2014': '-', '\u2018': "'", '\u2019': "'", '\u201C': '"', '\u201D': '"', '\u2022': '-', '\u2026': '...', '\u2192': '->', '\u2550': '=' };
      return map[ch] || '';
    });
    return t;
  }

  function generateMinutaPdf() {
    if (!minutaText) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    const addFooter = () => {
      doc.setFontSize(7);
      doc.setFont("helvetica", "italic");
      doc.text("Generato da Enneagramma Evolutivo", pageWidth / 2, pageHeight - 10, { align: "center" });
    };

    const checkPage = (needed: number) => {
      if (y + needed > pageHeight - 25) {
        addFooter();
        doc.addPage();
        y = 20;
      }
    };

    // Header
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(sanitizeForPdf("Minuta di Accordo - Mediazione Civile"), pageWidth / 2, y, { align: "center" });
    y += 7;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(sanitizeForPdf(`Data: ${new Date().toLocaleDateString("it-IT")}`), pageWidth / 2, y, { align: "center" });
    y += 10;

    // Process text line by line with formatting
    const sanitized = sanitizeForPdf(minutaText);
    const rawLines = sanitized.split('\n');

    for (const rawLine of rawLines) {
      const trimmed = rawLine.trim();

      // Empty line = spacing
      if (!trimmed) {
        y += 3;
        continue;
      }

      // Section headers (lines with === or all caps section titles)
      const isHeader = /^[=]+$/.test(trimmed);
      if (isHeader) {
        y += 2;
        continue;
      }

      const isAllCaps = /^[A-Z\s']{5,}$/.test(trimmed) || /^[A-Z][A-Z\s']{3,}$/.test(trimmed.replace(/[^A-Za-z\s']/g, ''));
      const isArticle = /^Art\.\s*\d+/i.test(trimmed);
      const isSectionTitle = isAllCaps && trimmed.length > 4;

      if (isSectionTitle) {
        checkPage(14);
        y += 4;
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        const wrapped = doc.splitTextToSize(trimmed, contentWidth);
        doc.text(wrapped, margin, y);
        y += wrapped.length * 5 + 3;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
      } else if (isArticle) {
        checkPage(12);
        y += 2;
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        const wrapped = doc.splitTextToSize(trimmed, contentWidth);
        doc.text(wrapped, margin, y);
        y += wrapped.length * 5 + 2;
        doc.setFont("helvetica", "normal");
      } else {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const wrapped = doc.splitTextToSize(trimmed, contentWidth);
        checkPage(wrapped.length * 5 + 2);
        doc.text(wrapped, margin, y);
        y += wrapped.length * 5 + 1;
      }
    }

    // Footer on last page
    addFooter();
    doc.save(`minuta-mediazione-civile-${t1}-${t2}.pdf`);
  }

  function generatePdf() {
    if (!profile1 || !profile2 || !strategy || !dynamics) return;

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

    const addTitle = (title: string) => {
      checkPage(20);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
    };

    const addText = (text: string) => {
      const lines = doc.splitTextToSize(text, contentWidth);
      checkPage(lines.length * 5 + 5);
      doc.text(lines, margin, y);
      y += lines.length * 5 + 4;
    };

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Al Tavolo della Mediazione Civile e Commerciale", pageWidth / 2, y, { align: "center" });
    y += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Enneagramma Evolutivo - Analisi Transazionale", pageWidth / 2, y, { align: "center" });
    y += 7;
    doc.text(`Data: ${new Date().toLocaleDateString("it-IT")}`, margin, y);
    y += 10;

    // Parties
    addTitle("Profilo delle Parti");
    addText(`Parte 1: ${profile1.nome} - Tipo ${type1} ${profile1.nomeEnneatipo}${wing1 !== "nessuna" ? ` (Ala ${wing1})` : ""}${sottotipo1 ? `, Sottotipo: ${sottotipo1}` : ""}`);
    if (profile1.at) addText(`Adattamento AT: ${profile1.at.nome} (${profile1.at.tipo})`);
    addText(`Porta aperta: ${profile1.at?.portaAperta || "N/D"} | Driver: ${profile1.at?.spinta || "N/D"}`);
    addText(`Approccio consigliato: ${profile1.approccio}`);
    y += 4;

    addText(`Parte 2: ${profile2.nome} - Tipo ${type2} ${profile2.nomeEnneatipo}${wing2 !== "nessuna" ? ` (Ala ${wing2})` : ""}${sottotipo2 ? `, Sottotipo: ${sottotipo2}` : ""}`);
    if (profile2.at) addText(`Adattamento AT: ${profile2.at.nome} (${profile2.at.tipo})`);
    addText(`Porta aperta: ${profile2.at?.portaAperta || "N/D"} | Driver: ${profile2.at?.spinta || "N/D"}`);
    addText(`Approccio consigliato: ${profile2.approccio}`);
    y += 6;

    // Compatibility
    if (compatData) {
      addTitle(`Compatibilita: ${(compatData.livello || "").toUpperCase()} - ${compatData.percentuale || 0}%`);
      if (compatData.descrizione) addText(compatData.descrizione);
      y += 4;
    }

    // Dynamics
    if (dynamics?.atInterazione) {
      addTitle("Dinamiche del Conflitto");
      addText(`Tipo interazione AT: ${dynamics.atInterazione.tipo}`);
      addText(dynamics.atInterazione.descrizione);
      if (dynamics.puntiClash) addText(`Punti di scontro: ${dynamics.puntiClash}`);
      y += 4;
    }

    // Strategy sections
    addTitle("Strategia del Mediatore");

    addTitle("1. Approccio Iniziale");
    addText(strategy.approccioIniziale);

    addTitle("2. Gestione della Sessione");
    addText(strategy.gestioneSessione);

    addTitle("3. Leve Motivazionali");
    addText(strategy.leveMotivazionali);

    addTitle("4. Terreno Comune");
    addText(strategy.terrenoComune);

    addTitle("5. Trappole da Evitare");
    addText(strategy.trappoleDaEvitare);

    addTitle("6. Tecniche Specifiche");
    addText(strategy.tecnicheSpecifiche);

    // Simulations
    addTitle("Tracce di Simulazione");
    for (const sim of simulations) {
      addTitle(sim.titolo);
      addText(`Contesto: ${sim.contesto}`);
      addText(`Parti: ${sim.parti}`);
      addText(`Punto critico: ${sim.puntoCritico}`);
      addText(`Obiettivo formativo: ${sim.obiettivoFormativo}`);
      addText(`Suggerimenti: ${sim.suggerimentiMediatore}`);
      y += 4;
    }

    // Disclaimer
    checkPage(20);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    const discLines = doc.splitTextToSize(AT_DISCLAIMER, contentWidth);
    doc.text(discLines, margin, y);

    doc.save(`mediazione-civile-${type1}-${type2}.pdf`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-r from-primary/95 to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c9a227]/20 mb-4">
            <Scale className="w-8 h-8 text-[#c9a227]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
            Al Tavolo della Mediazione Civile e Commerciale
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Analisi delle dinamiche di conflitto e strategie del mediatore basate sull'Enneagramma Evolutivo e l'Analisi Transazionale
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Introductory Card */}
        <Card className="border-[#c9a227]/30 bg-gradient-to-br from-primary/5 to-[#c9a227]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Users className="w-5 h-5 text-[#c9a227]" />
              La Sessione Congiunta nella Mediazione Civile e Commerciale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              La sessione congiunta è il momento centrale della mediazione civile e commerciale. Il mediatore facilita il dialogo tra le parti per raggiungere una soluzione condivisa della controversia, lavorando sugli interessi sottostanti alle posizioni dichiarate.
            </p>
            <p className="font-medium text-primary">Principi fondamentali:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Volontarietà: le parti partecipano liberamente e possono ritirarsi in qualsiasi momento</li>
              <li>Riservatezza: tutto ciò che emerge in mediazione resta confidenziale</li>
              <li>Neutralità: il mediatore non giudica, non decide, ma facilita la comunicazione</li>
            </ul>
            <p>
              Il mediatore civile fonda la sessione sulla comprensione dei diversi stili comunicativi delle parti, utilizzando l'Enneagramma come strumento per personalizzare l'approccio e costruire accordi sostenibili che rispondano ai bisogni profondi di ciascuno.
            </p>
            <p className="text-xs italic">
              Compila i campi sottostanti e inserisci l'inquadramento della vicenda per ottenere un'analisi personalizzata, strategie per il mediatore e una bozza di accordo.
            </p>
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card className="border-[#c9a227]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Users className="w-5 h-5 text-[#c9a227]" />
              Configurazione delle Parti
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Party 1 & 2 side by side */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Party 1 */}
              <div className="space-y-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <h3 className="font-semibold text-primary">Parte 1</h3>
                <div>
                  <Label>Nome (opzionale)</Label>
                  <Input placeholder="es. Mario Rossi" value={nome1} onChange={(e) => { setNome1(e.target.value); setShowAnalysis(false); }} />
                </div>
                <div>
                  <Label>Enneatipo *</Label>
                  <Select value={type1} onValueChange={(v) => { setType1(v); setWing1("nessuna"); setShowAnalysis(false); }}>
                    <SelectTrigger><SelectValue placeholder="Seleziona enneatipo" /></SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9].map((n) => (
                        <SelectItem key={n} value={String(n)}>Tipo {n} — {typeNames[n]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {type1 && wings1.length > 0 && (
                  <div>
                    <Label>Ala (opzionale)</Label>
                    <Select value={wing1} onValueChange={(v) => { setWing1(v); setShowAnalysis(false); }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nessuna">Nessuna</SelectItem>
                        {wings1.map((w) => (
                          <SelectItem key={w} value={String(w)}>
                            Ala {w} — {wingDescriptions[`${type1}w${w}`] || ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label>Sottotipo (opzionale)</Label>
                  <Select value={sottotipo1} onValueChange={(v) => { setSottotipo1(v); setShowAnalysis(false); }}>
                    <SelectTrigger><SelectValue placeholder="Seleziona sottotipo" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nessuno">Nessuno</SelectItem>
                      {sottotipi.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Party 2 */}
              <div className="space-y-4 p-4 rounded-lg bg-accent/5 border border-accent/10">
                <h3 className="font-semibold text-primary">Parte 2</h3>
                <div>
                  <Label>Nome (opzionale)</Label>
                  <Input placeholder="es. Laura Bianchi" value={nome2} onChange={(e) => { setNome2(e.target.value); setShowAnalysis(false); }} />
                </div>
                <div>
                  <Label>Enneatipo *</Label>
                  <Select value={type2} onValueChange={(v) => { setType2(v); setWing2("nessuna"); setShowAnalysis(false); }}>
                    <SelectTrigger><SelectValue placeholder="Seleziona enneatipo" /></SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9].map((n) => (
                        <SelectItem key={n} value={String(n)}>Tipo {n} — {typeNames[n]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {type2 && wings2.length > 0 && (
                  <div>
                    <Label>Ala (opzionale)</Label>
                    <Select value={wing2} onValueChange={(v) => { setWing2(v); setShowAnalysis(false); }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nessuna">Nessuna</SelectItem>
                        {wings2.map((w) => (
                          <SelectItem key={w} value={String(w)}>
                            Ala {w} — {wingDescriptions[`${type2}w${w}`] || ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label>Sottotipo (opzionale)</Label>
                  <Select value={sottotipo2} onValueChange={(v) => { setSottotipo2(v); setShowAnalysis(false); }}>
                    <SelectTrigger><SelectValue placeholder="Seleziona sottotipo" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nessuno">Nessuno</SelectItem>
                      {sottotipi.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Dispute type & conflict level */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Tipo di controversia (opzionale)</Label>
                <Select value={tipoControversia} onValueChange={(v) => { setTipoControversia(v); setShowAnalysis(false); }}>
                  <SelectTrigger><SelectValue placeholder="Seleziona tipo" /></SelectTrigger>
                  <SelectContent>
                    {tipiControversiaCivileList.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Livello di conflittualità</Label>
                <RadioGroup value={livelloConflitto} onValueChange={(v) => { setLivelloConflitto(v); setShowAnalysis(false); }} className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basso" id="basso" />
                    <Label htmlFor="basso" className="cursor-pointer">Basso</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medio" id="medio" />
                    <Label htmlFor="medio" className="cursor-pointer">Medio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alto" id="alto" />
                    <Label htmlFor="alto" className="cursor-pointer">Alto</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Inquadramento della Vicenda */}
            <div>
              <Label>Inquadramento della Vicenda</Label>
              <Textarea
                placeholder="Descrivi brevemente i fatti, le pretese delle parti, il contesto della controversia e gli eventuali tentativi di soluzione precedenti..."
                value={inquadramento}
                onChange={(e) => { setInquadramento(e.target.value); setShowAnalysis(false); }}
                rows={5}
                className="mt-1"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                className="bg-[#c9a227] hover:bg-[#d4a843] text-[#1a1a2e] font-semibold"
              >
                <Scale className="w-4 h-4 mr-2" />
                Genera Analisi
              </Button>
              {showAnalysis && (
                <Button variant="outline" onClick={handleReset}>
                  Nuova Analisi
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Output */}
        {showAnalysis && profile1 && profile2 && (
          <>
            {/* AT Disclaimer */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-sm">
              <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-amber-800 dark:text-amber-200">{AT_DISCLAIMER}</p>
            </div>

            {/* PDF button */}
            <div className="flex justify-end">
              <Button onClick={generatePdf} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Scarica PDF
              </Button>
            </div>

            {/* A) Party Profiles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#c9a227]" />
                  A) Profilo delle Parti al Tavolo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[profile1, profile2].map((p, idx) => (
                    <div key={idx} className="space-y-3 p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{p.nome}</h3>
                        <Badge variant="secondary">Tipo {p.enneatipo}</Badge>
                      </div>
                      <p className="font-medium text-primary">{p.nomeEnneatipo}</p>
                      {p.alaDescrizione && (
                        <p className="text-sm text-muted-foreground">Ala {p.ala}: {p.alaDescrizione}</p>
                      )}
                      {p.sottotipo && p.sottotipo !== "nessuno" && (
                        <p className="text-sm">Sottotipo: <span className="font-medium">{p.sottotipo}</span></p>
                      )}
                      {p.at && (
                        <>
                          <div className="pt-2 border-t space-y-2">
                            <p className="text-sm"><strong>Adattamento AT:</strong> {p.at.nome} ({p.at.tipo})</p>
                            <p className="text-sm"><strong>Porta aperta:</strong> {p.at.portaAperta}</p>
                            <p className="text-sm"><strong>Driver/Spinta:</strong> {p.at.spinta}</p>
                            <p className="text-sm"><strong>Reazione alla minaccia:</strong> {p.reazioneMinaccia}</p>
                            <p className="text-sm"><strong>Stile sociale:</strong> {p.at.stileSociale}</p>
                            <p className="text-sm"><strong>Come approcciare:</strong> {p.approccio}</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* B) Conflict Dynamics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#c9a227]" />
                  B) Dinamiche del Conflitto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {compatData && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`w-3 h-3 rounded-full ${levelColors[compatData.livello] || "bg-gray-400"}`} />
                    <span className="font-medium">Compatibilità: {compatData.livello} ({compatData.percentuale}%)</span>
                  </div>
                )}
                {compatData?.descrizione && (
                  <p className="text-sm">{compatData.descrizione}</p>
                )}
                {dynamics?.atInterazione && (
                  <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={dynamics.atInterazione.tipo === "problematica" ? "destructive" : dynamics.atInterazione.tipo === "attrazione" ? "default" : "secondary"}>
                        {dynamics.atInterazione.tipo === "amicizia" ? "Amicizia" : dynamics.atInterazione.tipo === "attrazione" ? "Attrazione" : "Problematica"}
                      </Badge>
                      <span className="text-sm font-medium">Interazione AT</span>
                    </div>
                    <p className="text-sm">{dynamics.atInterazione.descrizione}</p>
                    <p className="text-sm text-muted-foreground italic">{dynamics.atInterazione.consiglio}</p>
                  </div>
                )}
                {dynamics?.puntiClash && (
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Punti di scontro potenziali:</h4>
                    <p className="text-sm text-muted-foreground">{dynamics.puntiClash}</p>
                  </div>
                )}
                {dynamics?.dinamicheAttrazione && (
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Dinamiche di attrazione/repulsione:</h4>
                    <p className="text-sm text-muted-foreground">{dynamics.dinamicheAttrazione}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* C) Mediator Strategy */}
            {strategy && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#c9a227]" />
                    C) Strategia del Mediatore
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" defaultValue={["approccio", "sessione", "leve", "terreno", "trappole", "tecniche"]}>
                    <AccordionItem value="approccio">
                      <AccordionTrigger className="text-sm font-semibold">
                        1. Approccio Iniziale
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="whitespace-pre-line text-sm text-muted-foreground">{strategy.approccioIniziale}</div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="sessione">
                      <AccordionTrigger className="text-sm font-semibold">
                        2. Gestione della Sessione Congiunta
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">{strategy.gestioneSessione}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="leve">
                      <AccordionTrigger className="text-sm font-semibold">
                        3. Leve Motivazionali
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="whitespace-pre-line text-sm text-muted-foreground">{strategy.leveMotivazionali}</div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="terreno">
                      <AccordionTrigger className="text-sm font-semibold">
                        4. Terreno Comune
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="whitespace-pre-line text-sm text-muted-foreground">{strategy.terrenoComune}</div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="trappole">
                      <AccordionTrigger className="text-sm font-semibold">
                        5. Trappole da Evitare
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="whitespace-pre-line text-sm text-muted-foreground">{strategy.trappoleDaEvitare}</div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tecniche">
                      <AccordionTrigger className="text-sm font-semibold">
                        6. Tecniche Specifiche Consigliate
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="whitespace-pre-line text-sm text-muted-foreground">{strategy.tecnicheSpecifiche}</div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {/* D) Simulations */}
            {simulations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#c9a227]" />
                    D) Tracce di Simulazione per il Mediatore
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {simulations.map((sim, idx) => (
                    <div key={idx} className="p-4 rounded-lg border bg-muted/20 space-y-3 print:break-inside-avoid">
                      <h4 className="font-semibold text-primary flex items-center gap-2">
                        <Badge variant="outline">{idx + 1}</Badge>
                        {sim.titolo}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Contesto:</span>
                          <p className="text-muted-foreground mt-1">{sim.contesto}</p>
                        </div>
                        <div>
                          <span className="font-medium">Parti:</span>
                          <p className="text-muted-foreground mt-1 whitespace-pre-line">{sim.parti}</p>
                        </div>
                        <div>
                          <span className="font-medium">Punto critico:</span>
                          <p className="text-muted-foreground mt-1">{sim.puntoCritico}</p>
                        </div>
                        <div className="p-3 rounded bg-[#c9a227]/5 border border-[#c9a227]/20">
                          <span className="font-medium text-[#c9a227]">Obiettivo formativo:</span>
                          <p className="text-muted-foreground mt-1">{sim.obiettivoFormativo}</p>
                        </div>
                        <div className="p-3 rounded bg-primary/5 border border-primary/10">
                          <span className="font-medium text-primary">Suggerimenti per il mediatore:</span>
                          <p className="text-muted-foreground mt-1">{sim.suggerimentiMediatore}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* E) Minuta di Accordo */}
            <Card className="border-[#c9a227]/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#c9a227]" />
                  E) Minuta di Accordo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Genera una bozza di accordo di mediazione personalizzata in base agli enneatipi delle parti e alla descrizione della vicenda. Il linguaggio dell'accordo viene adattato allo stile comunicativo di ciascuna parte.
                </p>
                {!minutaText && (
                  <Button
                    onClick={generateMinuta}
                    disabled={minutaLoading}
                    className="bg-[#c9a227] hover:bg-[#d4a843] text-[#1a1a2e] font-semibold"
                  >
                    {minutaLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generazione in corso...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Genera Minuta
                      </>
                    )}
                  </Button>
                )}
                {minutaText && (
                  <div className="space-y-4">
                    <div className="p-6 rounded-lg bg-muted/30 border whitespace-pre-line text-sm font-mono leading-relaxed">
                      {minutaText}
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={generateMinutaPdf} variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Scarica Minuta PDF
                      </Button>
                      <Button onClick={generateMinuta} variant="outline" className="gap-2">
                        <FileText className="w-4 h-4" />
                        Rigenera Minuta
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
