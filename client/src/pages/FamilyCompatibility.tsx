import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Users, Plus, Trash2, Heart, AlertTriangle, Check, FileText, Download, Brain, Lightbulb } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  getJourney,
  getCurrentPhase,
  findSharedAttributes,
  findDifferentAttributes,
  getATForEnneatipo,
  getATInterazione,
  AT_DISCLAIMER,
  typeNames,
  fruitEmoji,
  type JourneyPhase,
} from "@/data/percorsi-eta";

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

interface FamilyMember {
  id: number;
  nome: string;
  enneatipo: string;
  ala: string;
  percorso: string;
  eta: string;
}

function MemberPhaseCard({ member, phase }: { member: FamilyMember; phase: JourneyPhase }) {
  return (
    <Card className="bg-muted/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{fruitEmoji[parseInt(member.enneatipo)]}</span>
          <div>
            <div className="font-semibold text-sm">{member.nome}</div>
            <div className="text-xs text-muted-foreground">
              Tipo {member.enneatipo}{member.ala && member.ala !== "nessuna" ? ` con Ala ${member.ala}` : ""} P{member.percorso} — {member.eta} anni — Fase enneatipo {phase.enneatipo}
            </div>
            {member.ala && member.ala !== "nessuna" && wingDescriptions[`${member.enneatipo}w${member.ala}`] && (
              <div className="text-xs text-primary">
                {wingDescriptions[`${member.enneatipo}w${member.ala}`]}
              </div>
            )}
          </div>
        </div>
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
        </div>
      </CardContent>
    </Card>
  );
}

function PairComparison({ m1, m2, p1, p2 }: { m1: FamilyMember; m2: FamilyMember; p1: JourneyPhase; p2: JourneyPhase }) {
  const shared = findSharedAttributes(p1, p2);
  const diffs = findDifferentAttributes(p1, p2);
  const compatScore = Math.round((shared.length / 13) * 100);

  return (
    <Card className="border-primary/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-serif flex items-center gap-2 flex-wrap">
          <span>{fruitEmoji[parseInt(m1.enneatipo)]}</span>
          {m1.nome}{m1.ala && m1.ala !== "nessuna" ? ` (Ala ${m1.ala})` : ""}
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>{fruitEmoji[parseInt(m2.enneatipo)]}</span>
          {m2.nome}{m2.ala && m2.ala !== "nessuna" ? ` (Ala ${m2.ala})` : ""}
          <Badge variant="secondary" className="ml-auto">{compatScore}% affinità</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {shared.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-green-700 dark:text-green-300 mb-1.5 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Attributi condivisi ({shared.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {shared.map(s => (
                <Badge key={s} variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {diffs.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Differenze ({diffs.length})
            </h4>
            <div className="space-y-1">
              {diffs.map(d => (
                <div key={d.attributo} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-32 shrink-0">{d.attributo}:</span>
                  <Badge variant="outline" className="text-xs">{m1.nome}: {d.persona1}</Badge>
                  <span className="text-muted-foreground">vs</span>
                  <Badge variant="outline" className="text-xs">{m2.nome}: {d.persona2}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Wing influence note */}
        {((m1.ala && m1.ala !== "nessuna") || (m2.ala && m2.ala !== "nessuna")) && (
          <div className="text-xs text-muted-foreground bg-primary/5 p-2 rounded">
            <span className="font-medium text-primary">Ali:</span>{" "}
            {m1.ala && m1.ala !== "nessuna" && (
              <span>{m1.nome} ({m1.enneatipo}w{m1.ala}: {wingDescriptions[`${m1.enneatipo}w${m1.ala}`]})</span>
            )}
            {m1.ala && m1.ala !== "nessuna" && m2.ala && m2.ala !== "nessuna" && " — "}
            {m2.ala && m2.ala !== "nessuna" && (
              <span>{m2.nome} ({m2.enneatipo}w{m2.ala}: {wingDescriptions[`${m2.enneatipo}w${m2.ala}`]})</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function generateFamilySummary(
  memberPhases: Array<{ member: FamilyMember; phase: JourneyPhase }>,
  pairs: Array<{ m1: FamilyMember; m2: FamilyMember; p1: JourneyPhase; p2: JourneyPhase }>,
): string {
  if (memberPhases.length === 0) return "";

  const memberList = memberPhases
    .map(({ member }) => `${member.nome} (Tipo ${member.enneatipo} - ${typeNames[parseInt(member.enneatipo)]}${member.ala && member.ala !== "nessuna" ? `, Ala ${member.ala}` : ""})`)
    .join(", ");

  let text = `Questa famiglia e composta da ${memberPhases.length} membri: ${memberList}. `;

  if (pairs.length > 0) {
    // Find strongest and weakest pair
    const scored = pairs.map(p => {
      const shared = findSharedAttributes(p.p1, p.p2);
      return { ...p, score: Math.round((shared.length / 13) * 100) };
    });
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];
    const worst = scored[scored.length - 1];

    text += `Dall'analisi dei ${pairs.length} confronti a coppie emerge un quadro ricco e sfaccettato delle dinamiche familiari.`;

    text += `\n\nLa relazione con la maggiore affinita e quella tra ${best.m1.nome} e ${best.m2.nome} (${best.score}% di attributi condivisi), `;
    text += "il che suggerisce una naturale comprensione reciproca e una base solida per il supporto emotivo. ";

    if (worst !== best) {
      text += `La coppia che presenta le maggiori differenze e quella tra ${worst.m1.nome} e ${worst.m2.nome} (${worst.score}% di affinita), `;
      text += "un'area che richiede maggiore consapevolezza e impegno per favorire la comprensione reciproca.";
    }

    const avgScore = Math.round(scored.reduce((sum, p) => sum + p.score, 0) / scored.length);
    text += `\n\nComplessivamente, la famiglia presenta un livello medio di affinita del ${avgScore}%. `;
  }

  // Age-based note
  const agesNote = memberPhases
    .map(({ member, phase }) => `${member.nome} (${member.eta} anni, fase enneatipo ${phase.enneatipo})`)
    .join(", ");
  text += `Le fasi di vita attuali sono: ${agesNote}. `;
  text += "Queste fasi influenzano il modo in cui ciascun membro vive ed esprime il proprio enneatipo, creando dinamiche che evolvono nel tempo. ";

  // Wing note
  const withWings = memberPhases.filter(({ member }) => member.ala && member.ala !== "nessuna");
  if (withWings.length > 0) {
    text += "\n\nLe ali aggiungono sfumature importanti alle personalita familiari: ";
    text += withWings
      .map(({ member }) => `${member.nome} con Ala ${member.ala} (${wingDescriptions[`${member.enneatipo}w${member.ala}`] || ""})`)
      .join(", ");
    text += ". Queste influenze rendono le dinamiche familiari piu complesse e interessanti.";
  }

  return text;
}

function generateFamilyPdf(
  memberPhases: Array<{ member: FamilyMember; phase: JourneyPhase }>,
  pairs: Array<{ m1: FamilyMember; m2: FamilyMember; p1: JourneyPhase; p2: JourneyPhase }>,
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
  doc.text("Analisi di Compatibilita Familiare", pageWidth / 2, y, { align: "center" });
  y += 7;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Enneagramma Evolutivo", pageWidth / 2, y, { align: "center" });
  y += 10;

  // Date
  doc.setFontSize(9);
  doc.text(`Data analisi: ${new Date().toLocaleDateString("it-IT")}`, margin, y);
  y += 10;

  // Family members list
  addSectionTitle("Membri della Famiglia");
  memberPhases.forEach(({ member, phase }) => {
    const wingInfo = member.ala && member.ala !== "nessuna"
      ? `, Ala ${member.ala} (${wingDescriptions[`${member.enneatipo}w${member.ala}`] || ""})`
      : "";
    addWrappedText(`${member.nome}: Tipo ${member.enneatipo} - ${typeNames[parseInt(member.enneatipo)]}${wingInfo}, ${member.eta} anni, Percorso ${member.percorso}, Fase enneatipo ${phase.enneatipo}`);
  });
  y += 4;

  // Pair comparisons
  if (pairs.length > 0) {
    addSectionTitle("Confronto a Coppie");
    pairs.forEach(pair => {
      const shared = findSharedAttributes(pair.p1, pair.p2);
      const diffs = findDifferentAttributes(pair.p1, pair.p2);
      const score = Math.round((shared.length / 13) * 100);

      checkPage(30);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`${pair.m1.nome} - ${pair.m2.nome}: ${score}% affinita`, margin, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      if (shared.length > 0) {
        addWrappedText(`Attributi condivisi (${shared.length}): ${shared.join(", ")}`);
      }
      if (diffs.length > 0) {
        addWrappedText(`Differenze (${diffs.length}): ${diffs.map(d => `${d.attributo}: ${pair.m1.nome}=${d.persona1} vs ${pair.m2.nome}=${d.persona2}`).join("; ")}`);
      }

      // Wing influence note
      const w1 = pair.m1.ala && pair.m1.ala !== "nessuna" ? wingDescriptions[`${pair.m1.enneatipo}w${pair.m1.ala}`] : null;
      const w2 = pair.m2.ala && pair.m2.ala !== "nessuna" ? wingDescriptions[`${pair.m2.enneatipo}w${pair.m2.ala}`] : null;
      if (w1 || w2) {
        let wingNote = "Ali: ";
        if (w1) wingNote += `${pair.m1.nome} (${pair.m1.enneatipo}w${pair.m1.ala}: ${w1})`;
        if (w1 && w2) wingNote += " - ";
        if (w2) wingNote += `${pair.m2.nome} (${pair.m2.enneatipo}w${pair.m2.ala}: ${w2})`;
        addWrappedText(wingNote);
      }

      y += 3;
    });
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

  doc.save("compatibilita-familiare.pdf");
}

export default function FamilyCompatibility() {
  useEffect(() => { document.title = "Compatibilità Familiare | Enneagramma Evolutivo"; }, []);
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: 1, nome: "Genitore 1", enneatipo: "", ala: "nessuna", percorso: "1", eta: "" },
    { id: 2, nome: "Genitore 2", enneatipo: "", ala: "nessuna", percorso: "1", eta: "" },
    { id: 3, nome: "Figlio/a", enneatipo: "", ala: "nessuna", percorso: "1", eta: "" },
  ]);
  let nextId = Math.max(...members.map(m => m.id)) + 1;

  const addMember = () => {
    setMembers([...members, { id: nextId++, nome: `Membro ${members.length + 1}`, enneatipo: "", ala: "nessuna", percorso: "1", eta: "" }]);
  };

  const removeMember = (id: number) => {
    if (members.length <= 2) return;
    setMembers(members.filter(m => m.id !== id));
  };

  const updateMember = (id: number, field: keyof FamilyMember, value: string) => {
    setMembers(members.map(m => {
      if (m.id !== id) return m;
      // Reset ala when enneatipo changes
      if (field === "enneatipo") return { ...m, enneatipo: value, ala: "nessuna" };
      return { ...m, [field]: value };
    }));
  };

  // Get valid members (with all fields filled)
  const validMembers = members.filter(m => m.enneatipo && m.eta && m.percorso);

  // Compute phases for valid members
  const memberPhases: Array<{ member: FamilyMember; phase: JourneyPhase }> = [];
  for (const m of validMembers) {
    const journey = getJourney(parseInt(m.enneatipo), parseInt(m.percorso));
    if (journey) {
      const phase = getCurrentPhase(journey, parseInt(m.eta));
      if (phase) memberPhases.push({ member: m, phase });
    }
  }

  // Generate all pairs for comparison
  const pairs: Array<{ m1: FamilyMember; m2: FamilyMember; p1: JourneyPhase; p2: JourneyPhase }> = [];
  for (let i = 0; i < memberPhases.length; i++) {
    for (let j = i + 1; j < memberPhases.length; j++) {
      pairs.push({
        m1: memberPhases[i].member,
        m2: memberPhases[j].member,
        p1: memberPhases[i].phase,
        p2: memberPhases[j].phase,
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Compatibilità Familiare
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Analizza la compatibilità tra i membri della tua famiglia in base all'enneatipo, al percorso e all'età.
          Scopri gli attributi condivisi e le aree di potenziale attrito.
        </p>
      </div>

      {/* Family Members */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base font-serif">Membri della Famiglia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {members.map((m) => (
            <div key={m.id} className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-end p-3 bg-muted/30 rounded-lg">
              <div>
                <label className="text-xs font-medium mb-1 block">Nome</label>
                <Input
                  value={m.nome}
                  onChange={(e) => updateMember(m.id, "nome", e.target.value)}
                  placeholder="Nome"
                  className="h-9"
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Enneatipo</label>
                <Select value={m.enneatipo} onValueChange={(v) => updateMember(m.id, "enneatipo", v)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 9 }, (_, i) => i + 1).map(n => (
                      <SelectItem key={n} value={String(n)}>
                        {fruitEmoji[n]} {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Ala</label>
                <Select
                  value={m.ala}
                  onValueChange={(v) => updateMember(m.id, "ala", v)}
                  disabled={!m.enneatipo}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nessuna">Nessuna</SelectItem>
                    {m.enneatipo && getWings(parseInt(m.enneatipo)).map(w => (
                      <SelectItem key={w} value={String(w)}>
                        {w}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Percorso</label>
                <Select value={m.percorso} onValueChange={(v) => updateMember(m.id, "percorso", v)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Percorso 1</SelectItem>
                    <SelectItem value="2">Percorso 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Età</label>
                <Input
                  type="number"
                  min={0}
                  max={120}
                  value={m.eta}
                  onChange={(e) => updateMember(m.id, "eta", e.target.value)}
                  placeholder="Età"
                  className="h-9"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-destructive hover:text-destructive"
                  onClick={() => removeMember(m.id)}
                  disabled={members.length <= 2}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addMember} className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Aggiungi membro
          </Button>
        </CardContent>
      </Card>

      {/* Individual Phases */}
      {memberPhases.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold">Fasi Attuali</h2>
          <div className="grid gap-3">
            {memberPhases.map(({ member, phase }) => (
              <MemberPhaseCard key={member.id} member={member} phase={phase} />
            ))}
          </div>
        </div>
      )}

      {/* Quick PDF download at top of results */}
      {memberPhases.length >= 2 && pairs.length > 0 && (
        <div className="flex justify-end mt-6">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              const summaryText = generateFamilySummary(memberPhases, pairs);
              generateFamilyPdf(memberPhases, pairs, summaryText);
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Scarica PDF
          </Button>
        </div>
      )}

      {/* Pair Comparisons */}
      {pairs.length > 0 && (
        <div className="space-y-6 mt-8">
          <h2 className="text-xl font-serif font-bold">Confronto a Coppie</h2>
          <div className="space-y-4">
            {pairs.map((pair, i) => (
              <PairComparison key={i} {...pair} />
            ))}
          </div>
        </div>
      )}

      {/* AT Family Dynamics */}
      {memberPhases.length >= 2 && (() => {
        const membersWithAT = memberPhases
          .map(({ member }) => ({
            member,
            at: getATForEnneatipo(parseInt(member.enneatipo)),
          }))
          .filter((m): m is { member: FamilyMember; at: NonNullable<ReturnType<typeof getATForEnneatipo>> } => !!m.at);
        if (membersWithAT.length < 2) return null;
        return (
          <div className="space-y-4 mt-8">
            <h2 className="text-xl font-serif font-bold flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" /> Dinamiche degli Adattamenti (AT)
            </h2>
            <p className="text-xs text-muted-foreground italic p-2 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              {AT_DISCLAIMER}
            </p>
            {/* Member AT cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              {membersWithAT.map(({ member, at }) => (
                <Card key={member.id} className="bg-muted/30">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{fruitEmoji[parseInt(member.enneatipo)]}</span>
                      <div>
                        <div className="font-semibold text-sm">{member.nome}</div>
                        <div className="text-xs text-muted-foreground">{at.nome} ({at.nomeAlternativo})</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-center text-xs">
                      <div className="p-1 rounded bg-green-50 dark:bg-green-900/20"><div className="font-medium text-green-700 dark:text-green-300">{at.portaAperta}</div></div>
                      <div className="p-1 rounded bg-blue-50 dark:bg-blue-900/20"><div className="font-medium text-blue-700 dark:text-blue-300">{at.portaBersaglio}</div></div>
                      <div className="p-1 rounded bg-red-50 dark:bg-red-900/20"><div className="font-medium text-red-700 dark:text-red-300">{at.portaTrappola}</div></div>
                    </div>
                    <div className="mt-1.5 text-xs text-muted-foreground">Spinta: <span className="font-medium">{at.spinta}</span> — Sequenza: <span className="font-medium">{at.sequenzaPorte}</span></div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Pairwise AT interactions */}
            <div className="space-y-3">
              {membersWithAT.flatMap((m1, i) =>
                membersWithAT.slice(i + 1).map((m2) => {
                  const inter = getATInterazione(parseInt(m1.member.enneatipo), parseInt(m2.member.enneatipo));
                  if (!inter) return null;
                  return (
                    <div key={`${m1.member.id}-${m2.member.id}`} className={`p-3 rounded-lg border text-sm ${
                      inter.tipo === "attrazione" ? "border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-900/10" :
                      inter.tipo === "problematica" ? "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10" :
                      "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
                    }`}>
                      <div className="font-semibold text-xs mb-1">{m1.member.nome} + {m2.member.nome}</div>
                      <p className="text-xs text-muted-foreground mb-1.5">{inter.descrizione}</p>
                      <div className="flex items-start gap-1.5">
                        <Lightbulb className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground">{inter.consiglio}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })()}

      {/* Summary Comment + PDF Download */}
      {memberPhases.length >= 2 && pairs.length > 0 && (() => {
        const summaryText = generateFamilySummary(memberPhases, pairs);
        return (
          <div className="space-y-6 mt-8">
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

            <div className="flex justify-center">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => generateFamilyPdf(memberPhases, pairs, summaryText)}
              >
                <Download className="w-4 h-4" />
                Scarica Analisi PDF
              </Button>
            </div>
          </div>
        );
      })()}

      {/* Empty state */}
      {memberPhases.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>Compila enneatipo ed età di almeno due membri per visualizzare la compatibilità.</p>
        </div>
      )}
    </div>
  );
}
