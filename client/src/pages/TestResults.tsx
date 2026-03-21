import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { ArrowRight, ArrowUpRight, ArrowDownRight, Star, Gem, Music, Brain, Shield, Sparkles, Heart, FileText, Download, Loader2, BookOpen, Eye, AlertTriangle, Info, Check, Compass } from "lucide-react";
import { enneatypesDetailed, calculateArrowPercentages } from "@/data/enneatypes-detailed";
import {
  getJourney,
  getCurrentPhase,
  getCurrentPhaseIndex,
  typeNames as journeyTypeNames,
  fruitEmoji as journeyFruitEmoji,
  type Journey,
  type JourneyPhase,
} from "@/data/percorsi-eta";

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
  5: "bg-[#0f3460]/10 text-[#0f3460]", 6: "bg-teal-100 text-teal-700",
  7: "bg-amber-100 text-amber-700", 8: "bg-rose-100 text-rose-700",
  9: "bg-green-100 text-green-700",
};

const typeNames: Record<number, string> = {
  1: "Il Perfezionista", 2: "L'Altruista", 3: "Il Realizzatore",
  4: "L'Individualista", 5: "L'Investigatore", 6: "Il Leale",
  7: "L'Entusiasta", 8: "Il Challenger", 9: "Il Pacificatore",
};

// Wing descriptions for each enneatipo + wing combination
const wingDescriptions: Record<string, string> = {
  "1w9": "L'Enneatipo 1 con ala 9 (Il Perfezionista Idealista) tende a essere più pacato, riflessivo e orientato verso ideali elevati. Combina il desiderio di perfezione con la serenità interiore del Pacificatore, risultando più tollerante e meno critico rispetto al 1w2.",
  "1w2": "L'Enneatipo 1 con ala 2 (Il Perfezionista Altruista) è più orientato verso gli altri e più emotivamente coinvolto. Combina il senso del dovere con il desiderio di aiutare, diventando spesso un riformatore appassionato che si dedica a cause sociali.",
  "2w1": "L'Enneatipo 2 con ala 1 (L'Altruista Principiato) è più strutturato e orientato al dovere nel suo aiutare. Combina la generosità con un forte senso etico, offrendo aiuto in modo più organizzato e con standard elevati.",
  "2w3": "L'Enneatipo 2 con ala 3 (L'Altruista Ambizioso) è più orientato al successo e all'immagine. Combina il desiderio di aiutare con l'ambizione, risultando più socievole, carismatico e visibile nel proprio contributo.",
  "3w2": "L'Enneatipo 3 con ala 2 (Il Realizzatore Affascinante) è più orientato alle relazioni e al calore umano. Combina l'ambizione con il desiderio di piacere agli altri, risultando particolarmente carismatico e persuasivo.",
  "3w4": "L'Enneatipo 3 con ala 4 (Il Realizzatore Artista) è più introspettivo e orientato all'autenticità. Combina il desiderio di successo con una ricerca più profonda di significato personale e originalità.",
  "4w3": "L'Enneatipo 4 con ala 3 (L'Individualista Performer) è più orientato all'azione e alla presentazione di sé. Combina la sensibilità emotiva con l'ambizione, risultando più energico e determinato nel realizzare la propria visione creativa.",
  "4w5": "L'Enneatipo 4 con ala 5 (L'Individualista Pensatore) è più riservato e intellettuale. Combina la profondità emotiva con la curiosità analitica, risultando più introverso e originale nel proprio pensiero.",
  "5w4": "L'Enneatipo 5 con ala 4 (L'Investigatore Creativo) è più emotivamente ricco e orientato all'espressione artistica. Combina l'intelletto con la sensibilità, producendo spesso visioni originali e innovative.",
  "5w6": "L'Enneatipo 5 con ala 6 (L'Investigatore Leale) è più orientato alla sicurezza e alla collaborazione. Combina la ricerca intellettuale con un senso pratico di lealtà, risultando più socialmente integrato e affidabile.",
  "6w5": "L'Enneatipo 6 con ala 5 (Il Leale Investigatore) è più indipendente e intellettuale. Combina la ricerca di sicurezza con l'analisi profonda, risultando più riservato e auto-sufficiente nelle proprie valutazioni.",
  "6w7": "L'Enneatipo 6 con ala 7 (Il Leale Entusiasta) è più ottimista e socievole. Combina la prudenza con l'energia positiva, risultando più avventuroso e giocoso, pur mantenendo un occhio attento ai potenziali rischi.",
  "7w6": "L'Enneatipo 7 con ala 6 (L'Entusiasta Leale) è più responsabile e orientato alle relazioni. Combina la ricerca del piacere con la lealtà, risultando più affidabile e attento agli altri rispetto al 7w8.",
  "7w8": "L'Enneatipo 7 con ala 8 (L'Entusiasta Assertivo) è più determinato e orientato al potere. Combina l'entusiasmo con la forza, risultando più audace, diretto e capace di realizzare i propri progetti.",
  "8w7": "L'Enneatipo 8 con ala 7 (Il Challenger Entusiasta) è più energico e orientato al piacere. Combina la forza con l'entusiasmo, risultando più estroverso, imprenditoriale e aperto a nuove esperienze.",
  "8w9": "L'Enneatipo 8 con ala 9 (Il Challenger Pacificatore) è più calmo e contenuto. Combina la forza con la stabilità interiore, risultando più paziente, diplomatico e capace di esercitare il proprio potere in modo più misurato.",
  "9w8": "L'Enneatipo 9 con ala 8 (Il Pacificatore Assertivo) è più determinato e capace di agire. Combina la ricerca di pace con la forza interiore, risultando più deciso e capace di prendere posizione quando necessario.",
  "9w1": "L'Enneatipo 9 con ala 1 (Il Pacificatore Principiato) è più strutturato e orientato ai principi. Combina la serenità con il senso del dovere, risultando più metodico e impegnato nel miglioramento personale e sociale.",
};

// Subtype descriptions for each enneatipo
const subtypeDescriptions: Record<number, { conservativo: string; sociale: string; sessuale: string; personaggiConservativo: string[]; personaggiSociale: string[]; personaggiSessuale: string[] }> = {
  1: {
    conservativo: "Il Tipo 1 conservativo è particolarmente focalizzato sull'ordine personale, la salute e la gestione delle risorse. La sua ricerca di perfezione si concentra sulla vita quotidiana: alimentazione corretta, ambiente ordinato, routine ben strutturate. È il più ansioso dei tre sottotipi, preoccupato che tutto sia fatto nel modo giusto per garantire sicurezza e benessere.",
    sociale: "Il Tipo 1 sociale è il riformatore per eccellenza: canalizza la propria energia verso il miglioramento della società e delle istituzioni. Si sente chiamato a insegnare e a essere un modello di rettitudine. È il più visibile dei tre sottotipi, spesso coinvolto in cause sociali, politica o educazione.",
    sessuale: "Il Tipo 1 sessuale dirige la propria passione verso la trasformazione del partner e delle relazioni intime. Ha standard elevati per sé e per l'altro, desiderando una relazione che incarni i propri ideali. È il più intenso e appassionato dei tre sottotipi, con una forte carica di zelo riformatore nelle relazioni.",
    personaggiConservativo: ["Mahatma Gandhi", "Martha Stewart"],
    personaggiSociale: ["Martin Luther King Jr.", "Greta Thunberg"],
    personaggiSessuale: ["Giovanna d'Arco", "Martin Lutero"],
  },
  2: {
    conservativo: "Il Tipo 2 conservativo esprime il proprio aiuto attraverso la cura pratica e materiale: cucinare, accudire, creare un ambiente confortevole. È il più materno/paterno dei tre sottotipi, con un'attenzione particolare al benessere fisico delle persone care. Può avere difficoltà a riconoscere i propri bisogni.",
    sociale: "Il Tipo 2 sociale è un leader naturale che aiuta attraverso l'influenza e le connessioni. Si distingue per la capacità di creare reti sociali e facilitare le relazioni tra le persone. È il più ambizioso dei tre sottotipi, spesso attratto da posizioni di potere da cui può dispensare aiuto e supporto.",
    sessuale: "Il Tipo 2 sessuale è il più seducente e magnetico: cerca di essere irresistibile per la persona amata, offrendo un'attenzione esclusiva e intensa. Vive le relazioni con grande passione e può diventare possessivo. È il sottotipo che più confonde l'amore con il bisogno di essere necessario.",
    personaggiConservativo: ["Madre Teresa di Calcutta", "Mia Martini"],
    personaggiSociale: ["Eleanor Roosevelt", "Oprah Winfrey"],
    personaggiSessuale: ["Marilyn Monroe", "Casanova"],
  },
  3: {
    conservativo: "Il Tipo 3 conservativo ricerca il successo attraverso l'efficienza materiale e la sicurezza economica. È il più laborioso e meno appariscente dei tre sottotipi, concentrato sul raggiungere risultati concreti e tangibili. Lavora instancabilmente per garantire stabilità e benessere a sé e alla propria famiglia.",
    sociale: "Il Tipo 3 sociale è la star del gruppo: cerca il successo attraverso il riconoscimento pubblico, lo status e l'influenza sociale. È il più competitivo e orientato all'immagine dei tre sottotipi, abile nel networking e nella costruzione di una reputazione brillante.",
    sessuale: "Il Tipo 3 sessuale vuole essere attraente e desiderabile, concentrando la propria immagine di successo sulle relazioni intime. È il più sensibile dei tre sottotipi al fascino personale e alla chimica relazionale, cercando un partner che rifletta il proprio valore.",
    personaggiConservativo: ["Angela Merkel", "Warren Buffett"],
    personaggiSociale: ["Madonna", "Cristiano Ronaldo"],
    personaggiSessuale: ["John F. Kennedy", "Beyoncé"],
  },
  4: {
    conservativo: "Il Tipo 4 conservativo interiorizza le proprie emozioni e soffre in silenzio, cercando di resistere alla sofferenza con forza d'animo. È il più stoico dei tre sottotipi, capace di sopportare molto senza lamentarsi. Spesso si nega ciò che desidera, vivendo un conflitto tra bisogno e rinuncia.",
    sociale: "Il Tipo 4 sociale esprime la propria unicità attraverso il confronto con il gruppo: può sentirsi inferiore ma anche orgogliosamente diverso. È il più visibile nella sua sofferenza, usando la propria esperienza emotiva per connettersi con gli altri a un livello profondo.",
    sessuale: "Il Tipo 4 sessuale è il più intenso e competitivo: esprime le proprie emozioni con forza e pretende di essere visto nella propria unicità dall'altro. È il sottotipo più assertivo, capace di grande passione ma anche di gelosia e drammaticità nelle relazioni.",
    personaggiConservativo: ["Franz Kafka", "Virginia Woolf"],
    personaggiSociale: ["Frida Kahlo", "Amy Winehouse"],
    personaggiSessuale: ["Jim Morrison", "Edith Piaf"],
  },
  5: {
    conservativo: "Il Tipo 5 conservativo è il più ritirato e autosufficiente: minimizza i propri bisogni materiali per mantenere l'indipendenza. Vive con poco, creando confini chiari tra sé e il mondo esterno. La sua privacy e il suo spazio personale sono sacri.",
    sociale: "Il Tipo 5 sociale è il più intellettualmente orientato al gruppo: ricerca la conoscenza per contribuire alla comunità degli esperti. È il più socievole dei tre sottotipi, attratto da circoli intellettuali, accademie e gruppi di ricerca dove condividere il sapere.",
    sessuale: "Il Tipo 5 sessuale è il più emotivamente intenso: cerca una connessione profonda e totale con una persona speciale, a cui rivela il proprio mondo interiore. È il sottotipo che più oscilla tra il desiderio di intimità e il bisogno di ritiro.",
    personaggiConservativo: ["Emily Dickinson", "Isaac Newton"],
    personaggiSociale: ["Albert Einstein", "Bill Gates"],
    personaggiSessuale: ["Friedrich Nietzsche", "Tim Burton"],
  },
  6: {
    conservativo: "Il Tipo 6 conservativo è il più ansioso e orientato alla sicurezza personale: cerca protezione attraverso alleanze affidabili, routine stabili e preparazione ai rischi. È caloroso e affettuoso con chi si fida, ma sempre vigile verso i potenziali pericoli.",
    sociale: "Il Tipo 6 sociale cerca sicurezza attraverso l'appartenenza al gruppo e il rispetto delle regole condivise. È il più orientato al dovere dei tre sottotipi, leale verso le istituzioni e le autorità che considera affidabili. Può oscillare tra conformismo e ribellione.",
    sessuale: "Il Tipo 6 sessuale affronta la paura attraverso la forza e l'intimidazione (controfobico): è il più coraggioso e apparentemente sicuro di sé dei tre sottotipi. Cerca relazioni intense dove mettere alla prova la propria forza e la lealtà dell'altro.",
    personaggiConservativo: ["Papa Giovanni XXIII", "Angela Merkel"],
    personaggiSociale: ["Robert F. Kennedy", "J.R.R. Tolkien"],
    personaggiSessuale: ["Bruce Lee", "Che Guevara"],
  },
  7: {
    conservativo: "Il Tipo 7 conservativo è il più pratico e terreno: cerca il piacere attraverso il comfort fisico, il buon cibo, i viaggi e le esperienze sensoriali. È il più materialista dei tre sottotipi, abile nel creare reti di supporto e opportunità per il proprio benessere.",
    sociale: "Il Tipo 7 sociale è il più altruista e idealista: dirige la propria energia entusiastica verso cause collettive e visioni utopiche. È il meno egoista dei tre sottotipi, capace di sacrificare il piacere personale per il bene comune.",
    sessuale: "Il Tipo 7 sessuale è il più sognatore e romantico: cerca l'incanto e la meraviglia nelle relazioni intime, idealizzando il partner e l'amore. È il sottotipo più emotivamente coinvolto, con una tendenza a vivere le relazioni come avventure fantastiche.",
    personaggiConservativo: ["Epicuro", "Federico Fellini"],
    personaggiSociale: ["Robin Williams", "Dalai Lama"],
    personaggiSessuale: ["Casanova", "Amelia Earhart"],
  },
  8: {
    conservativo: "Il Tipo 8 conservativo è il più protettivo e territoriale: usa la propria forza per garantire la sopravvivenza e la sicurezza del proprio nucleo. È il sottotipo più intenso fisicamente, con un'energia che si esprime nella concretezza dell'azione e nella difesa dei più deboli.",
    sociale: "Il Tipo 8 sociale è il leader naturale del gruppo: usa la propria forza per proteggere la comunità e combattere le ingiustizie. È il più socialmente impegnato dei tre sottotipi, spesso in prima linea nelle battaglie per i diritti e la giustizia.",
    sessuale: "Il Tipo 8 sessuale è il più possessivo e magnetico: vive le relazioni con grande intensità e passione, cercando un legame totale e esclusivo. È il sottotipo più carismatico e provocatorio, capace di grande tenerezza ma anche di grande dominazione.",
    personaggiConservativo: ["Winston Churchill", "Indira Gandhi"],
    personaggiSociale: ["Martin Luther King Jr.", "Fidel Castro"],
    personaggiSessuale: ["Marlon Brando", "Cleopatra"],
  },
  9: {
    conservativo: "Il Tipo 9 conservativo cerca la pace attraverso le abitudini confortevoli, le attività ripetitive e i piccoli piaceri quotidiani. È il più passivo dei tre sottotipi, con una tendenza a narcotizzarsi attraverso il cibo, la televisione o altre attività routinarie che placano l'ansia.",
    sociale: "Il Tipo 9 sociale è il mediatore del gruppo: cerca l'armonia attraverso l'appartenenza e la fusione con la comunità. È il più attivo socialmente dei tre sottotipi, spesso coinvolto in gruppi dove può contribuire alla pace collettiva senza dover emergere individualmente.",
    sessuale: "Il Tipo 9 sessuale cerca la pace attraverso la fusione con il partner: si fonde emotivamente con l'altro, assumendone i desideri e le priorità. È il più dipendente dei tre sottotipi nelle relazioni, con una tendenza a perdere la propria identità nell'amore.",
    personaggiConservativo: ["Walt Disney", "Audrey Hepburn"],
    personaggiSociale: ["Abraham Lincoln", "Papa Francesco"],
    personaggiSessuale: ["John Lennon", "Grace Kelly"],
  },
};

function GenogrammaExplanation() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="genogramma-info" className="border-amber-200 dark:border-amber-800">
        <AccordionTrigger className="text-amber-800 dark:text-amber-200 hover:no-underline">
          <span className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            Cos'è il Genogramma?
          </span>
        </AccordionTrigger>
        <AccordionContent className="text-sm text-amber-900/80 dark:text-amber-100/80 leading-relaxed">
          <p className="mb-3">
            Il genogramma è uno strumento grafico utilizzato per rappresentare le relazioni familiari e le dinamiche
            intergenerazionali. Simile a un albero genealogico, ma molto più ricco di informazioni, il genogramma mappa
            non solo i legami di parentela, ma anche i pattern emotivi, i conflitti, le alleanze e i modelli
            comportamentali che si ripetono attraverso le generazioni.
          </p>
          <p className="mb-2 font-medium">Nell'ambito dell'Enneagramma Evolutivo, il genogramma viene utilizzato per:</p>
          <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
            <li>Comprendere come il tuo enneatipo si è formato nel contesto familiare</li>
            <li>Identificare i pattern relazionali ereditati che influenzano il tuo tipo</li>
            <li>Chiarire l'enneatipo quando il test non fornisce un risultato univoco</li>
            <li>Esplorare le dinamiche tra i diversi enneatipi presenti nella tua famiglia</li>
          </ul>
          <p>
            Un genogramma personalizzato, condotto da un professionista, permette di ottenere una comprensione più
            profonda e accurata del tuo profilo enneagrammatico rispetto al solo test.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function TestResults() {
  const [, params] = useRoute("/test/results/:id");
  const id = params?.id;

  const { data: result, isLoading, isError } = useQuery<any>({
    queryKey: ["/api/test/result", id],
    enabled: !!id,
  });

  const [selectedWing, setSelectedWing] = useState<number | null>(null);
  const [selectedSubtype, setSelectedSubtype] = useState<"conservativo" | "sociale" | "sessuale" | null>(null);

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
  const validationIssues = result.validationIssues;

  // Helper to get description for an attribute
  const getDesc = (category: string, value: string): string | null => {
    if (!desc[category]) return null;
    const cat = desc[category];
    if (cat[value] && typeof cat[value] === 'object') {
      return cat[value].descrizione || cat[value].significato || null;
    }
    if (typeof cat[value] === 'string') return cat[value];
    return null;
  };

  const getFullDesc = (category: string, value: string): any => {
    if (!desc[category]) return null;
    return desc[category][value] || null;
  };

  // Client-side validation (mirrors server logic)
  const maxScore = Math.max(...Object.values(scores).map(Number));
  const tiedMaxScores = validationIssues?.tiedMaxScores ?? Object.values(scores).filter((v) => Number(v) === maxScore).length > 1;
  const maxScoreTooLow = validationIssues?.maxScoreTooLow ?? maxScore < 10;
  const showBlockingWarning = tiedMaxScores || maxScoreTooLow;

  // Wing calculation
  const leftWing = enneatipo === 1 ? 9 : enneatipo - 1;
  const rightWing = enneatipo === 9 ? 1 : enneatipo + 1;
  const tiedWingScores = validationIssues?.tiedWingScores ?? (!showBlockingWarning && scores[leftWing] === scores[rightWing]);

  // Determine which wing is currently active (user-selected or auto-suggested)
  const suggestedWing = tiedWingScores ? null : ala;
  const activeWing = selectedWing ?? suggestedWing;

  // Wing description for the active wing
  const activeWingKey = activeWing ? `${enneatipo}w${activeWing}` : null;
  const activeWingDescription = activeWingKey ? wingDescriptions[activeWingKey] : null;

  // Subtype data for this enneatipo
  const subtypeData = subtypeDescriptions[enneatipo];

  // Radar chart data
  const radarData = Object.entries(scores).map(([key, value]) => ({
    type: `${fruitEmoji[parseInt(key)]} ${parseInt(key)}`,
    score: value as number,
    fullMark: 20,
  }));

  // Shared radar chart component
  const scoreChart = (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg font-serif">Punteggi dei 9 Frutti</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]" data-testid="chart-radar">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(36, 18%, 85%)" />
              <PolarAngleAxis dataKey="type" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 20]} tick={{ fontSize: 10 }} />
              <Radar
                name="Punteggio"
                dataKey="score"
                stroke="hsl(214, 73%, 22%)"
                fill="hsl(214, 73%, 22%)"
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
                className={`text-center p-2 rounded-lg ${isMain && !showBlockingWarning ? "bg-primary/10 ring-2 ring-primary" : "bg-muted/50"}`}
                data-testid={`score-type-${num}`}
              >
                <div className="text-lg">{fruitEmoji[num]}</div>
                <div className="text-xs text-muted-foreground">{fruitNames[num]}</div>
                <div className={`text-sm font-bold ${isMain && !showBlockingWarning ? "text-primary" : ""}`}>{value as number}/20</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  // Rule 1 or Rule 3: blocking validation — show warning instead of profile
  if (showBlockingWarning) {
    const warningMessage = tiedMaxScores
      ? "Non è stato possibile identificare con certezza il tuo enneatipo perché due o più tipi hanno ottenuto lo stesso punteggio massimo. Ti consigliamo di effettuare un genogramma personalizzato."
      : "Il punteggio massimo ottenuto è inferiore a 10/20, il che non consente un'identificazione affidabile. Ti consigliamo di effettuare un genogramma personalizzato.";

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Risultati del Test
          </h1>
        </div>

        {/* Warning Card */}
        <Card className="mb-8 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30" data-testid="validation-warning-card">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <AlertTriangle className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            <p className="text-amber-800 dark:text-amber-200 text-base leading-relaxed max-w-xl" data-testid="validation-warning-message">
              {warningMessage}
            </p>
            <Link href="/about">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white mt-2" data-testid="button-contact-cta">
                Contatta per un genogramma personalizzato
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Genogramma explanation */}
        <div className="mb-8 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <GenogrammaExplanation />
        </div>

        {/* Still show the score chart */}
        {scoreChart}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center pb-8">
          <Link href="/test">
            <Button variant="outline" data-testid="button-retake">Rifai il Test</Button>
          </Link>
        </div>
      </div>
    );
  }

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
              <div className="mt-4 p-4 bg-[#f5f0e8] dark:bg-[#0f3460]/20 rounded-lg border border-[#c9a227]/30 dark:border-[#c9a227]/20">
                <h4 className="text-sm font-semibold text-[#16213e] dark:text-[#f0e6d3] mb-2">Consigli per la crescita</h4>
                <ul className="space-y-1.5">
                  {result.educativo.consigli.map((c: string, i: number) => (
                    <li key={i} className="text-xs text-[#16213e] dark:text-[#f0e6d3]/80 flex gap-2">
                      <span className="text-[#c9a227] shrink-0">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Wing Selector (from master) */}
      <Card className="mb-8" data-testid="wing-selector">
        <CardHeader>
          <CardTitle className="text-lg font-serif">Scegli la tua ala</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            L'ala è il tipo adiacente che influenza maggiormente il tuo enneatipo.
            Il sistema suggerisce l'ala in base ai punteggi, ma puoi selezionare quella in cui ti riconosci di più.
          </p>
        </CardHeader>
        <CardContent>
          {tiedWingScores && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg" data-testid="wing-warning">
              <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                L'enneatipo è stato identificato, ma non è stato possibile determinare l'ala perché i tipi adiacenti hanno lo stesso punteggio.
                Ti consigliamo di effettuare un genogramma per chiarire questo aspetto, oppure scegli l'ala in cui ti riconosci di più.
              </p>
              <GenogrammaExplanation />
              <Link href="/about">
                <Button variant="outline" size="sm" className="mt-3 border-amber-400 text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/40" data-testid="button-wing-contact-cta">
                  Contatta per un genogramma personalizzato
                </Button>
              </Link>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[leftWing, rightWing].map((wing) => {
              const isSelected = activeWing === wing;
              const isSuggested = suggestedWing === wing;
              const wingKey = `${enneatipo}w${wing}`;
              return (
                <button
                  key={wing}
                  onClick={() => setSelectedWing(wing)}
                  className={`relative text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  data-testid={`wing-option-${wing}`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{fruitEmoji[wing]}</span>
                    <div>
                      <div className="font-semibold">
                        Ala {wing}: {typeNames[wing]}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {fruitNames[wing]} — Punteggio: {scores[wing]}/20
                        {isSuggested && <Badge className="ml-2 bg-primary/10 text-primary text-[10px]">Suggerita</Badge>}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {wingDescriptions[wingKey]}
                  </p>
                </button>
              );
            })}
          </div>
          {activeWing && activeWingDescription && (
            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20" data-testid="wing-description">
              <Badge className={`mb-2 ${typeColors[activeWing] || "bg-muted"}`}>
                Ala {activeWing} — {fruitNames[activeWing]}
              </Badge>
              <p className="text-sm leading-relaxed">{activeWingDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subtype Selector (from master) */}
      <Card className="mb-8" data-testid="subtype-selector">
        <CardHeader>
          <CardTitle className="text-lg font-serif">Scegli il tuo sottotipo</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Il sottotipo descrive come il tuo enneatipo si esprime nella vita quotidiana.
            Leggi le descrizioni e scegli quella in cui ti riconosci di più.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {([
              {
                key: "conservativo" as const,
                label: "Conservativo (Autoconservazione)",
                brief: "Focalizzato sulla sicurezza personale, il comfort fisico, la salute e le risorse materiali.",
              },
              {
                key: "sociale" as const,
                label: "Sociale",
                brief: "Focalizzato sull'appartenenza al gruppo, il ruolo sociale, la comunità e il riconoscimento.",
              },
              {
                key: "sessuale" as const,
                label: "Sessuale (Uno a uno)",
                brief: "Focalizzato sulle relazioni intime, l'intensità, l'attrazione e il legame profondo con l'altro.",
              },
            ]).map(({ key, label, brief }) => {
              const isSelected = selectedSubtype === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSubtype(key)}
                  className={`relative text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  data-testid={`subtype-option-${key}`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className="font-semibold mb-1">{label}</div>
                  <p className="text-sm text-muted-foreground">{brief}</p>
                </button>
              );
            })}
          </div>

          {/* Subtype detail when selected */}
          {selectedSubtype && subtypeData && (
            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20" data-testid="subtype-description">
              <h4 className="font-semibold text-sm mb-2">
                Enneatipo {enneatipo} — Sottotipo{" "}
                {selectedSubtype === "conservativo"
                  ? "Conservativo"
                  : selectedSubtype === "sociale"
                    ? "Sociale"
                    : "Sessuale"}
              </h4>
              <p className="text-sm leading-relaxed mb-3">{subtypeData[selectedSubtype]}</p>
              {(() => {
                const personaggiKey = selectedSubtype === "conservativo"
                  ? "personaggiConservativo"
                  : selectedSubtype === "sociale"
                    ? "personaggiSociale"
                    : "personaggiSessuale";
                const personaggi = subtypeData[personaggiKey];
                return personaggi && personaggi.length > 0 ? (
                  <div>
                    <h5 className="text-xs font-semibold text-muted-foreground mb-1">Personalità famose:</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {personaggi.map((p: string) => (
                        <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Radar Chart */}
      {scoreChart}

      {/* Integration/Disintegration Percentages (from main) */}
      {scores && (() => {
        const arrowData = calculateArrowPercentages(enneatipo, scores);
        const detailed = enneatypesDetailed[enneatipo];
        return (
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Card className="border-red-200 dark:border-red-900/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowDownRight className="w-5 h-5 text-red-500" />
                  <h3 className="font-serif font-semibold text-base text-red-600 dark:text-red-400">
                    Stress → Tipo {arrowData.stressType}
                  </h3>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${arrowData.stressPercent}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400 min-w-[3rem] text-right">
                    {arrowData.stressPercent}%
                  </span>
                </div>
                {detailed && (
                  <p className="text-xs text-muted-foreground mt-2">{detailed.frecce.stress.descrizione}</p>
                )}
              </CardContent>
            </Card>
            <Card className="border-green-200 dark:border-green-900/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowUpRight className="w-5 h-5 text-green-500" />
                  <h3 className="font-serif font-semibold text-base text-green-600 dark:text-green-400">
                    Riposo → Tipo {arrowData.riposoType}
                  </h3>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${arrowData.riposoPercent}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400 min-w-[3rem] text-right">
                    {arrowData.riposoPercent}%
                  </span>
                </div>
                {detailed && (
                  <p className="text-xs text-muted-foreground mt-2">{detailed.frecce.riposo.descrizione}</p>
                )}
              </CardContent>
            </Card>
          </div>
        );
      })()}

      {/* PNL & Subtypes Summary (from main) */}
      {enneatypesDetailed[enneatipo] && (() => {
        const detailed = enneatypesDetailed[enneatipo];
        return (
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="p-5">
                <h3 className="font-serif font-semibold text-base mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" /> PNL
                </h3>
                <dl className="space-y-2 text-sm">
                  <div><dt className="text-muted-foreground text-xs uppercase tracking-wider">Accesso</dt><dd className="font-medium mt-0.5">{detailed.pnl.accesso.split(":")[0]}</dd></div>
                  <div><dt className="text-muted-foreground text-xs uppercase tracking-wider">Elaborazione</dt><dd className="font-medium mt-0.5">{detailed.pnl.elaborazione.split(":")[0]}</dd></div>
                  <div><dt className="text-muted-foreground text-xs uppercase tracking-wider">Centro</dt><dd className="font-medium mt-0.5">{detailed.centro.tipo} — "{detailed.centro.domanda}"</dd></div>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h3 className="font-serif font-semibold text-base mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" /> Sottotipi
                </h3>
                <dl className="space-y-2 text-sm">
                  <div><dt className="text-muted-foreground text-xs">Conservativo</dt><dd className="font-medium">{detailed.sottotipi.conservativo.nome}</dd></div>
                  <div><dt className="text-muted-foreground text-xs">Sociale</dt><dd className="font-medium">{detailed.sottotipi.sociale.nome}</dd></div>
                  <div><dt className="text-muted-foreground text-xs">Sessuale</dt><dd className="font-medium">{detailed.sottotipi.sessuale.nome}</dd></div>
                </dl>
              </CardContent>
            </Card>
          </div>
        );
      })()}

      {/* Attributes Grid — with explanations (from main) */}
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

      {/* Wellness (from main) */}
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
                <Gem className="w-4 h-4 text-[#c9a227]" /> Pietre Curative
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

      {/* Journey Phase Info (from master - percorsi-eta) */}
      {result.eta && enneatipo && (
        <Card className="mb-8" data-testid="journey-phase-section">
          <CardHeader>
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" /> I tuoi Percorsi di Vita
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              In base alla tua età ({result.eta} anni), ecco cosa stai vivendo nei due possibili percorsi evolutivi.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              {[1, 2].map((percorsoNum) => {
                const journey = getJourney(enneatipo, percorsoNum);
                if (!journey) return null;
                const currentPhase = getCurrentPhase(journey, result.eta);
                const currentIdx = getCurrentPhaseIndex(journey, result.eta);
                if (!currentPhase) return null;
                const etaLabels = journey.tipo === "triangolo"
                  ? ["0-30", "25-60", "60+"]
                  : ["0-3", "3-12", "12-19", "20-30", "25-60", "60+"];
                return (
                  <div key={percorsoNum} className="p-4 bg-muted/30 rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2">
                      Percorso {percorsoNum}: {journey.sequenza.join("→")}
                    </h4>
                    {/* Sequence with current highlighted */}
                    <div className="flex items-center gap-1 flex-wrap mb-3">
                      {journey.sequenza.map((e, i) => (
                        <div key={i} className="flex items-center gap-0.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            i === currentIdx ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                          }`}>
                            {journeyFruitEmoji[e]} {e}
                          </span>
                          {i < journey.sequenza.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                        </div>
                      ))}
                    </div>
                    <Badge className="bg-green-500 text-white text-[10px] mb-2">
                      Fase attuale: {etaLabels[currentIdx]} anni
                    </Badge>
                    <div className="grid grid-cols-2 gap-1.5 text-xs mt-2">
                      <div><span className="text-muted-foreground">Enneatipo attivo:</span> {currentPhase.enneatipo}</div>
                      <div><span className="text-muted-foreground">Dignità:</span> {currentPhase.dignita}</div>
                      <div><span className="text-muted-foreground">Virtù:</span> {currentPhase.virtu}</div>
                      <div><span className="text-muted-foreground">Vizio:</span> {currentPhase.vizio}</div>
                      <div><span className="text-muted-foreground">Gerarchia:</span> {currentPhase.gerarchia}</div>
                      <div><span className="text-muted-foreground">Musa:</span> {currentPhase.musa}</div>
                      <div><span className="text-muted-foreground">Topica:</span> {currentPhase.topica}</div>
                      <div><span className="text-muted-foreground">Difesa:</span> {currentPhase.meccanismoDifesa}</div>
                      <div><span className="text-muted-foreground">Idea sacra:</span> {currentPhase.ideaSacra}</div>
                      <div><span className="text-muted-foreground">Chakra:</span> {currentPhase.chakra}</div>
                    </div>
                    <Link href="/percorsi" className="inline-block mt-3">
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 text-xs">
                        Esplora percorso completo →
                      </Badge>
                    </Link>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personalized Evolutionary Paths (from main) */}
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

      {/* Punti Caldi (from main) */}
      {result.percorsoPersonalizzato?.puntiCaldi && result.percorsoPersonalizzato.puntiCaldi.length > 0 && (
        <Card className="mb-8 border-[#c9a227]/30 dark:border-[#c9a227]/20">
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
                <div key={pc.punto} className="p-4 rounded-lg bg-[#f5f0e8] dark:bg-[#0f3460]/20 border border-[#c9a227]/30 dark:border-[#c9a227]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full bg-[#0f3460] text-[#f0e6d3] flex items-center justify-center text-lg font-bold shrink-0">{pc.punto}</span>
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
                    <div className="mt-2 p-2 rounded bg-[#ebe5d9] dark:bg-[#0f3460]/30">
                      <p className="text-xs font-semibold text-[#16213e] dark:text-[#f0e6d3] italic">
                        Domanda chiave: {pc.domanda_chiave}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {result.percorsoPersonalizzato.statistiche && (
              <div className="mt-4 pt-3 border-t border-[#c9a227]/30 dark:border-[#c9a227]/20 text-center">
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

      {/* Le Età della Vita (dal Prontuario) */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-serif">Le Età della Vita</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Le fasi della vita secondo la tradizione antica integrata con Freud ed Erikson. A {result.eta} anni ti trovi nella fase evidenziata.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { eta: "0-3", nome: "Infantia (Infanzia)", desc: "Fiducia vs sfiducia. Legame primario e attaccamento." },
              { eta: "3-12", nome: "Pueritia (Puerizia)", desc: "Iniziativa e operosità vs senso di colpa e inferiorità." },
              { eta: "12-19", nome: "Adolescentia", desc: "Identità vs dispersione dei ruoli. Sicurezza e appartenenza." },
              { eta: "20-30", nome: "Juventus (Gioventù)", desc: "Intimità e solidarietà vs isolamento. Amore e lavoro." },
              { eta: "25-60", nome: "Virilitas (Virilità)", desc: "Generatività vs stagnazione. Si costruisce o si regredisce." },
              { eta: "60+", nome: "Senectutes (Vecchiaia)", desc: "Integrità vs disperazione. Bilancio e riflessione sulla vita." },
            ].map((fase) => {
              const isActive = fase.eta.includes("+")
                ? result.eta >= parseInt(fase.eta)
                : (() => { const [min, max] = fase.eta.split("-").map(Number); return result.eta >= min && result.eta <= max; })();
              return (
                <div
                  key={fase.eta}
                  className={`p-3 rounded-lg border ${isActive ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <div className="text-xs text-muted-foreground">{fase.eta} anni</div>
                  <div className="font-semibold text-sm">{fase.nome}</div>
                  <div className="text-xs text-muted-foreground mt-1">{fase.desc}</div>
                  {isActive && <Badge className="mt-2 bg-primary/10 text-primary text-[10px]">La tua fase attuale</Badge>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* IL TUO PROFILO PERSONALE (from main) */}
      {attrs && result.percorsoPersonalizzato && (
        <Card className="mb-8 border-2 border-[#c9a227]/30 bg-gradient-to-br from-[#f5f0e8]/50 to-[#faf8f5]/50 dark:from-[#16213e]/20 dark:to-[#0f3460]/10">
          <CardHeader>
            <CardTitle className="text-xl font-serif flex items-center gap-2 text-primary">
              <span className="text-2xl">👤</span> Il Tuo Profilo Personale
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Sintesi completa basata su enneatipo, ala, età, attributi e percorso evolutivo.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-serif font-semibold text-base mb-2">Chi sei</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sei un <strong className="text-foreground">Enneatipo {enneatipo} — {attrs.nome}</strong>
                {activeWing && <>, con <strong className="text-foreground">Ala {activeWing} ({fruitNames[activeWing]})</strong></>}.
                {result.educativo?.descrizione && <> {result.educativo.descrizione}</>}
                {result.educativo?.motivazione && <> La tua motivazione profonda è <em>{result.educativo.motivazione.toLowerCase()}</em>.  </>}
                {result.educativo?.paura && <>La tua paura fondamentale è <em>{result.educativo.paura.toLowerCase()}</em>.</>}
              </p>
            </div>

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

      {/* Narrative Profile Generation (from main) */}
      {id && (
        <NarrativeProfileSection testResultId={parseInt(id)} enneatipo={enneatipo} attrs={attrs} eta={result.eta} ala={activeWing} />
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
        <Link href="/percorsi">
          <Button variant="outline" data-testid="button-percorsi">
            Percorsi di Vita
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Narrative Profile Component (from main)
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
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const pdfTypeNames: Record<number, string> = {
      1: "Il Perfezionista", 2: "L'Altruista", 3: "Il Realizzatore",
      4: "L'Individualista", 5: "L'Investigatore", 6: "Il Leale",
      7: "L'Entusiasta", 8: "Il Challenger", 9: "Il Pacificatore"
    };

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
          <div style="font-size:22px;font-weight:bold;font-family:'Cormorant Garamond',serif;">Enneatipo ${enneatipo}: ${pdfTypeNames[enneatipo]}</div>
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
            L'intelligenza artificiale analizzerà i tuoi risultati e creerà un profilo personalizzato
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
