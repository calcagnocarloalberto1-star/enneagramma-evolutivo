import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Users, Plus, Trash2, Heart, AlertTriangle, Check } from "lucide-react";
import {
  getJourney,
  getCurrentPhase,
  findSharedAttributes,
  findDifferentAttributes,
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

export default function FamilyCompatibility() {
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
