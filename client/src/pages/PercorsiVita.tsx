import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Compass, Star, Music, Brain, Shield, Sparkles, Eye, Heart } from "lucide-react";
import {
  journeys,
  getJourney,
  getCurrentPhaseIndex,
  typeNames,
  fruitEmoji,
  etaVita,
  adattamentiAT,
  type Journey,
  type JourneyPhase,
} from "@/data/percorsi-eta";

const attributeIcons: Record<string, any> = {
  "Dignità": Star,
  "Virtù": Heart,
  "Vizio": Shield,
  "Gerarchia": Sparkles,
  "Musa": Music,
  "Facoltà": Brain,
  "Idea sacra": Eye,
};

function PhaseCard({ phase, index, isCurrent, etaLabel }: { phase: JourneyPhase; index: number; isCurrent: boolean; etaLabel: string }) {
  return (
    <Card className={`transition-all ${isCurrent ? "ring-2 ring-primary shadow-lg" : "opacity-80"}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-serif flex items-center gap-2">
            <span className="text-xl">{fruitEmoji[phase.enneatipo]}</span>
            Fase {index + 1}: Enneatipo {phase.enneatipo}
          </CardTitle>
          <Badge variant={isCurrent ? "default" : "secondary"} className={isCurrent ? "bg-primary" : ""}>
            {etaLabel} anni
          </Badge>
        </div>
        {isCurrent && (
          <Badge className="w-fit bg-green-500 text-white mt-1">Fase attuale</Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <AttrItem label="Dignità" value={phase.dignita} />
          <AttrItem label="Virtù" value={phase.virtu} />
          <AttrItem label="Vizio" value={phase.vizio} />
          <AttrItem label="Gerarchia" value={phase.gerarchia} />
          <AttrItem label="Musa" value={phase.musa} />
          <AttrItem label="Facoltà" value={phase.facolta} />
          <AttrItem label="Melodia" value={phase.melodia} />
          <AttrItem label="Topica" value={phase.topica} />
          <AttrItem label="Meccanismo di difesa" value={phase.meccanismoDifesa} />
          <AttrItem label="Chakra" value={phase.chakra} />
          <AttrItem label="Pianeta" value={phase.pianeta} />
          <AttrItem label="Correlazione cerebrale" value={phase.correlazioneCerebrale} />
          <AttrItem label="Idea sacra" value={phase.ideaSacra} />
        </div>
      </CardContent>
    </Card>
  );
}

function AttrItem({ label, value }: { label: string; value: string }) {
  if (!value || value === "-") return null;
  const Icon = attributeIcons[label] || Star;
  return (
    <div className="flex items-start gap-1.5">
      <Icon className="w-3.5 h-3.5 mt-0.5 text-primary/60 shrink-0" />
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-medium text-xs">{value}</div>
      </div>
    </div>
  );
}

function JourneyTimeline({ journey, age }: { journey: Journey; age: number | null }) {
  const currentIdx = age !== null ? getCurrentPhaseIndex(journey, age) : -1;
  const etaLabels = journey.tipo === "triangolo"
    ? ["0-30", "25-60", "60+"]
    : ["0-3", "3-12", "12-19", "20-30", "25-60", "60+"];

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
            <div><span className="text-muted-foreground text-xs block">Principio</span><span className="font-semibold">{journey.principio}</span></div>
            <div><span className="text-muted-foreground text-xs block">Virtù di partenza</span><span className="font-semibold">{journey.virtuPartenza}</span></div>
            <div><span className="text-muted-foreground text-xs block">Vizio di partenza</span><span className="font-semibold">{journey.vizioPartenza}</span></div>
            <div><span className="text-muted-foreground text-xs block">Influenza</span><span className="font-semibold">{journey.influenzaIniziale}</span></div>
            <div><span className="text-muted-foreground text-xs block">VAK</span><span className="font-semibold">{journey.vak}</span></div>
            <div><span className="text-muted-foreground text-xs block">Facoltà</span><span className="font-semibold">{journey.facolta}</span></div>
            <div><span className="text-muted-foreground text-xs block">Musa</span><span className="font-semibold">{journey.musaPartenza}</span></div>
            <div><span className="text-muted-foreground text-xs block">Domanda</span><span className="font-semibold">{journey.domandaPartenza}</span></div>
            <div><span className="text-muted-foreground text-xs block">Topica</span><span className="font-semibold">{journey.topica}</span></div>
            <div><span className="text-muted-foreground text-xs block">Difesa</span><span className="font-semibold">{journey.meccanismoDifesa}</span></div>
            <div><span className="text-muted-foreground text-xs block">Cervello</span><span className="font-semibold">{journey.correlazioneCerebrale}</span></div>
            {journey.adattamento !== "-" && <div><span className="text-muted-foreground text-xs block">Adattamento</span><span className="font-semibold">{journey.adattamento}</span></div>}
            {journey.puntoStallo !== "-" && <div><span className="text-muted-foreground text-xs block">Punto di stallo</span><span className="font-semibold">{journey.puntoStallo}</span></div>}
          </div>
        </CardContent>
      </Card>

      {/* Sequence visualization */}
      <div className="flex items-center justify-center gap-1 flex-wrap py-2">
        {journey.sequenza.map((e, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
              i === currentIdx ? "bg-primary text-white shadow-md" : "bg-muted"
            }`}>
              <span>{fruitEmoji[e]}</span>
              <span>{e}</span>
            </div>
            {i < journey.sequenza.length - 1 && (
              <span className="text-muted-foreground mx-0.5">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Phase cards */}
      <div className="space-y-3">
        {journey.fasi.map((phase, i) => (
          <PhaseCard
            key={i}
            phase={phase}
            index={i}
            isCurrent={i === currentIdx}
            etaLabel={etaLabels[i]}
          />
        ))}
      </div>
    </div>
  );
}

export default function PercorsiVita() {
  useEffect(() => { document.title = "Percorsi di Vita | Enneagramma Evolutivo"; }, []);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedPercorso, setSelectedPercorso] = useState<string>("");
  const [ageInput, setAgeInput] = useState<string>("");

  const enneatipo = selectedType ? parseInt(selectedType) : null;
  const percorso = selectedPercorso ? parseInt(selectedPercorso) : null;
  const age = ageInput ? parseInt(ageInput) : null;

  const journey = enneatipo && percorso ? getJourney(enneatipo, percorso) : null;
  const adaptation = enneatipo ? adattamentiAT.find(a => a.enneatipo === enneatipo) : null;

  // Determine current "Età della Vita" (6 fasi dal Prontuario: 0-3, 3-12, 12-19, 20-30, 25-60, 60+)
  const currentEta = age !== null ? etaVita.find((e, i) => {
    const ranges = [
      [0, 3], [3, 12], [12, 19], [20, 30], [25, 60], [60, 200],
    ];
    return age >= ranges[i][0] && age <= ranges[i][1];
  }) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Compass className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Percorsi di Vita
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Scopri il tuo percorso evolutivo attraverso le fasi della vita. Ogni enneatipo ha due possibili percorsi,
          ciascuno con attributi specifici per ogni fascia d'età.
        </p>
      </div>

      {/* Selectors */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Enneatipo</label>
              <Select value={selectedType} onValueChange={(v) => { setSelectedType(v); setSelectedPercorso(""); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona enneatipo" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 9 }, (_, i) => i + 1).map(n => (
                    <SelectItem key={n} value={String(n)}>
                      {fruitEmoji[n]} Tipo {n} — {typeNames[n]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Percorso</label>
              <Select value={selectedPercorso} onValueChange={setSelectedPercorso} disabled={!selectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona percorso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Percorso 1 {enneatipo ? `(${getJourney(enneatipo, 1)?.sequenza.join("→")})` : ""}</SelectItem>
                  <SelectItem value="2">Percorso 2 {enneatipo ? `(${getJourney(enneatipo, 2)?.sequenza.join("→")})` : ""}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Età (opzionale)</label>
              <Input
                type="number"
                min={0}
                max={120}
                placeholder="Es. 35"
                value={ageInput}
                onChange={(e) => setAgeInput(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current age info */}
      {currentEta && (
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div>
              <h3 className="font-serif font-bold text-lg">{currentEta.nome}</h3>
              <p className="text-sm text-muted-foreground">
                Fascia d'età: {currentEta.eta} anni
              </p>
              <p className="text-sm mt-1">{currentEta.descrizione}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Journey display */}
      {journey && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold">
            Enneatipo {journey.enneatipo} — Percorso {journey.percorso}
            <Badge variant="secondary" className="ml-2 capitalize">{journey.tipo}</Badge>
          </h2>
          <JourneyTimeline journey={journey} age={age} />
        </div>
      )}

      {/* AT Adaptation */}
      {adaptation && journey && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-base font-serif">
              Adattamento: {adaptation.nome} (Analisi Transazionale)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground text-xs block">Porta aperta</span>{adaptation.portaAperta}</div>
              <div><span className="text-muted-foreground text-xs block">Porta bersaglio</span>{adaptation.portaBersaglio}</div>
              <div><span className="text-muted-foreground text-xs block">Porta trappola</span>{adaptation.portaTrappola}</div>
              <div><span className="text-muted-foreground text-xs block">Spinta</span>{adaptation.spinta}</div>
              <div className="sm:col-span-2"><span className="text-muted-foreground text-xs block">Ingiunzioni</span>{adaptation.ingiunzioni}</div>
              <div><span className="text-muted-foreground text-xs block">Gioco psicologico</span>{adaptation.giocoPsicologico}</div>
              <div><span className="text-muted-foreground text-xs block">Copione</span>{adaptation.copione}</div>
              <div className="sm:col-span-2"><span className="text-muted-foreground text-xs block">Dilemma</span>{adaptation.dilemma}</div>
              <div className="sm:col-span-2">
                <span className="text-muted-foreground text-xs block mb-1">Obiettivi terapeutici</span>
                <ul className="list-disc list-inside space-y-1">
                  {adaptation.obiettiviTerapia.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Le 6 Età della Vita section (Prontuario) */}
      {!journey && (
        <div className="mt-8">
          <h2 className="text-xl font-serif font-bold mb-4">Le Età della Vita</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Le fasi della vita secondo la tradizione antica integrata con Freud ed Erikson. Ogni enneatipo attraversa queste fasi vivendo attributi specifici in base al proprio percorso.
          </p>
          <div className="grid gap-3">
            {etaVita.map((eta) => (
              <Card key={eta.numero} className={`${currentEta?.numero === eta.numero ? "ring-2 ring-primary" : ""}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="text-2xl">📅</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold">{eta.nome}</span>
                      <Badge variant="secondary">{eta.eta} anni</Badge>
                      {currentEta?.numero === eta.numero && <Badge className="bg-green-500 text-white">Fase attuale</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {eta.descrizione}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!journey && !ageInput && (
        <div className="text-center py-12 text-muted-foreground mt-8">
          <Compass className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>Seleziona un enneatipo e un percorso per visualizzare il tuo viaggio evolutivo.</p>
        </div>
      )}
    </div>
  );
}
