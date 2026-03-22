import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Briefcase, Plus, Trash2, Users, AlertTriangle, ThumbsUp, Lightbulb, Star } from "lucide-react";
import { typeNames, fruitEmoji } from "@/data/percorsi-eta";

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

interface TeamMember {
  id: number;
  nome: string;
  enneatipo: string;
  ala: string;
  ruolo: string;
}

function PairWorkComparison({ m1, m2 }: {
  m1: TeamMember;
  m2: TeamMember;
}) {
  const { data: compat } = useQuery<any>({
    queryKey: ["/api/compatibility", m1.enneatipo, m2.enneatipo],
    enabled: !!m1.enneatipo && !!m2.enneatipo,
  });

  if (!compat) return null;

  const percentage = compat?.percentuale || 0;
  const wing1Desc = m1.ala && m1.ala !== "nessuna" ? wingDescriptions[`${m1.enneatipo}w${m1.ala}`] : null;
  const wing2Desc = m2.ala && m2.ala !== "nessuna" ? wingDescriptions[`${m2.enneatipo}w${m2.ala}`] : null;

  return (
    <Card className="border-primary/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-serif flex items-center gap-2 flex-wrap">
          <span>{fruitEmoji[parseInt(m1.enneatipo)]}</span>
          {m1.nome}{m1.ruolo ? ` (${m1.ruolo})` : ""}
          <Users className="w-3.5 h-3.5 text-blue-400" />
          <span>{fruitEmoji[parseInt(m2.enneatipo)]}</span>
          {m2.nome}{m2.ruolo ? ` (${m2.ruolo})` : ""}
          <Badge
            variant="secondary"
            className={`ml-auto text-white ${levelColors[compat?.livello] || "bg-primary"}`}
          >
            {percentage}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">{compat?.descrizione}</p>

        {compat?.puntiForza?.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-green-700 dark:text-green-300 mb-1.5 flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" /> Punti di Forza nel Lavoro
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {compat.puntiForza.map((s: string) => (
                <Badge key={s} variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {compat?.sfide?.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Sfide Professionali
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {compat.sfide.map((s: string) => (
                <Badge key={s} variant="secondary" className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {compat?.consigli && (
          <div>
            <h4 className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" /> Consigli
            </h4>
            <p className="text-xs text-muted-foreground">{compat.consigli}</p>
          </div>
        )}

        {/* Wing influence note */}
        {(wing1Desc || wing2Desc) && (
          <div className="text-xs text-muted-foreground bg-primary/5 p-2 rounded">
            <span className="font-medium text-primary flex items-center gap-1 mb-1">
              <Star className="w-3 h-3" /> Influenza delle Ali
            </span>
            {wing1Desc && (
              <p>{m1.nome} ({m1.enneatipo}w{m1.ala}: {wing1Desc})</p>
            )}
            {wing2Desc && (
              <p>{m2.nome} ({m2.enneatipo}w{m2.ala}: {wing2Desc})</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function WorkCompatibility() {
  useEffect(() => { document.title = "Compatibilità Lavorativa | Enneagramma Evolutivo"; }, []);
  const [members, setMembers] = useState<TeamMember[]>([
    { id: 1, nome: "Collega 1", enneatipo: "", ala: "nessuna", ruolo: "" },
    { id: 2, nome: "Collega 2", enneatipo: "", ala: "nessuna", ruolo: "" },
  ]);
  let nextId = Math.max(...members.map(m => m.id)) + 1;

  const addMember = () => {
    setMembers([...members, { id: nextId++, nome: `Collega ${members.length + 1}`, enneatipo: "", ala: "nessuna", ruolo: "" }]);
  };

  const removeMember = (id: number) => {
    if (members.length <= 2) return;
    setMembers(members.filter(m => m.id !== id));
  };

  const updateMember = (id: number, field: keyof TeamMember, value: string) => {
    setMembers(members.map(m => {
      if (m.id !== id) return m;
      if (field === "enneatipo") return { ...m, enneatipo: value, ala: "nessuna" };
      return { ...m, [field]: value };
    }));
  };

  // Valid members = have enneatipo selected
  const validMembers = members.filter(m => m.enneatipo);

  // Generate all unique pairs
  const pairs: Array<{ m1: TeamMember; m2: TeamMember }> = [];
  for (let i = 0; i < validMembers.length; i++) {
    for (let j = i + 1; j < validMembers.length; j++) {
      pairs.push({ m1: validMembers[i], m2: validMembers[j] });
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Compatibilità Lavorativa
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Migliora le relazioni professionali comprendendo gli enneatipi del team.
          Aggiungi i membri del tuo team per scoprire le dinamiche di lavoro.
        </p>
      </div>

      {/* Team Members */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base font-serif">Membri del Team</CardTitle>
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
                        {fruitEmoji[n]} {n} — {typeNames[n]}
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
              <div className="sm:col-span-2">
                <label className="text-xs font-medium mb-1 block">Ruolo</label>
                <Input
                  value={m.ruolo}
                  onChange={(e) => updateMember(m.id, "ruolo", e.target.value)}
                  placeholder="Es. Project Manager"
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
            <Plus className="w-4 h-4 mr-2" /> Aggiungi membro del team
          </Button>
        </CardContent>
      </Card>

      {/* Pair Comparisons */}
      {pairs.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold">Analisi Compatibilità di Team</h2>
          <div className="space-y-4">
            {pairs.map((pair, i) => (
              <PairWorkComparison key={`${pair.m1.id}-${pair.m2.id}`} m1={pair.m1} m2={pair.m2} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {validMembers.length < 2 && (
        <div className="text-center py-12 text-muted-foreground">
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>Seleziona l'enneatipo di almeno due membri del team per visualizzare la compatibilità lavorativa.</p>
        </div>
      )}
    </div>
  );
}
