import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

interface ProfileInput {
  enneatipo: number;
  ala: number | null;
  eta: number;
  punteggiFrutti: Record<number, number>;
  attrs: any;
  percorsoPersonalizzato: any;
  educativo: any;
  descrizioni: any;
  personalNotes?: string | null;
}

const typeNames: Record<number, string> = {
  1: "Il Perfezionista", 2: "L'Altruista", 3: "Il Realizzatore",
  4: "L'Individualista", 5: "L'Investigatore", 6: "Il Leale",
  7: "L'Entusiasta", 8: "Il Challenger", 9: "Il Pacificatore"
};

const fruitNames: Record<number, string> = {
  1: "Mela", 2: "Pera", 3: "Ciliegia", 4: "Nespola",
  5: "Uva", 6: "Mirtillo", 7: "Ananas", 8: "Albicocca", 9: "Fragola"
};

// AT adaptation data for Gemini prompt enrichment
const atAdaptations: Record<number, {
  nome: string; nomeAlternativo: string; tipo: string;
  portaAperta: string; portaBersaglio: string; portaTrappola: string;
  spinta: string; copione: string; copioneMotto: string;
  dilemma: string; ingiunzioni: string; obiettiviCrescita: string;
  statoIo: string;
}> = {
  1: { nome: "Ossessivo-compulsivo", nomeAlternativo: "Responsabile-stakanovista", tipo: "Performance", portaAperta: "Pensiero", portaBersaglio: "Emozioni", portaTrappola: "Comportamento", spinta: "Sii perfetto", copione: "Finché", copioneMotto: "Non mi posso divertire finché non ho fatto il mio lavoro", dilemma: "Posso essere libero se non perdo la testa e non mi arrendo completamente all'amore", ingiunzioni: "Non essere un bambino, non sentire, non essere intimo, non divertirti", obiettiviCrescita: "Accettare di essere sufficientemente buono; stare bene anche senza fare nulla", statoIo: "Adulto contaminato dal Genitore" },
  2: { nome: "Istrionico", nomeAlternativo: "Entusiasta-iperreattivo", tipo: "Performance", portaAperta: "Emozioni", portaBersaglio: "Pensiero", portaTrappola: "Comportamento", spinta: "Compiaci", copione: "Dopo", copioneMotto: "Posso divertirmi oggi, ma dovrò pagarlo domani", dilemma: "Se sono indipendente devo rinunciare al calore e al supporto", ingiunzioni: "Non crescere, non pensare, non essere importante, non essere te stesso", obiettiviCrescita: "Sono amato anche senza stare al centro dell'attenzione; so pensare e agire", statoIo: "Adulto contaminato dal Bambino" },
  3: { nome: "Istrionico (performance)", nomeAlternativo: "Realizzatore performante", tipo: "Performance", portaAperta: "Emozioni", portaBersaglio: "Pensiero", portaTrappola: "Comportamento", spinta: "Compiaci/Sii perfetto", copione: "Dopo", copioneMotto: "Valgo quanto produco", dilemma: "Se smetto di fare, perdo il mio valore", ingiunzioni: "Non essere te stesso, non sentire", obiettiviCrescita: "Riconoscere il proprio valore indipendentemente dai risultati", statoIo: "Adulto contaminato dal Bambino" },
  4: { nome: "Borderline (adattamento anomalo)", nomeAlternativo: "Emotivo profondo", tipo: "Anomalo", portaAperta: "-", portaBersaglio: "-", portaTrappola: "-", spinta: "-", copione: "-", copioneMotto: "-", dilemma: "Ha perso molto del vero sé nell'infanzia", ingiunzioni: "-", obiettiviCrescita: "Recuperare il contatto con il vero sé", statoIo: "Frammentazione degli stati dell'Io" },
  5: { nome: "Schizoide", nomeAlternativo: "Creativo-sognatore", tipo: "Sopravvivenza", portaAperta: "Comportamento", portaBersaglio: "Pensiero", portaTrappola: "Emozioni", spinta: "Sii forte", copione: "Mai", copioneMotto: "Non posso avere mai quello che più desidero", dilemma: "Posso esistere sino a che non chiedo troppo", ingiunzioni: "Non farlo, non appartenere, non sentire, non divertirti", obiettiviCrescita: "Prendersi cura di sé; avere diritto a uno spazio nel mondo; avvicinarsi agli altri", statoIo: "Doppia contaminazione dell'Adulto" },
  6: { nome: "Paranoide", nomeAlternativo: "Brillante-scettico", tipo: "Sopravvivenza", portaAperta: "Pensiero", portaBersaglio: "Emozioni", portaTrappola: "Comportamento", spinta: "Sii perfetto + Sii forte", copione: "Mai + Finché", copioneMotto: "Non posso avere mai quello che più desidero", dilemma: "Posso essere libero se non perdo la testa e non mi arrendo all'amore", ingiunzioni: "Non essere un bambino, non fidarti, non sentire, non appartenere", obiettiviCrescita: "Imparare a confrontarsi; verificare le proprie percezioni con gli altri", statoIo: "Adulto contaminato dal Genitore; Bambino escluso" },
  7: { nome: "Narcisista (adattamento anomalo)", nomeAlternativo: "Entusiasta visionario", tipo: "Anomalo", portaAperta: "-", portaBersaglio: "-", portaTrappola: "-", spinta: "-", copione: "-", copioneMotto: "-", dilemma: "Ha perso molto del vero sé nell'infanzia", ingiunzioni: "-", obiettiviCrescita: "Recuperare il contatto con il vero sé e con i limiti della realtà", statoIo: "Frammentazione degli stati dell'Io" },
  8: { nome: "Antisociale", nomeAlternativo: "Affascinante-manipolatore", tipo: "Sopravvivenza", portaAperta: "Comportamento", portaBersaglio: "Emozioni", portaTrappola: "Pensiero", spinta: "Sii forte + Compiaci", copione: "Mai", copioneMotto: "Non posso avere mai quello che più desidero", dilemma: "Posso esserti vicino se mi cedi la tua libertà", ingiunzioni: "Non essere intimo, non sentire tristezza/paura, non pensare a lungo termine", obiettiviCrescita: "Diventare disponibili per gli altri; non c'è bisogno di fingere", statoIo: "Genitore escluso; Adulto contaminato dal Bambino" },
  9: { nome: "Passivo-aggressivo", nomeAlternativo: "Scherzoso-oppositivo", tipo: "Performance", portaAperta: "Comportamento", portaBersaglio: "Emozioni", portaTrappola: "Pensiero", spinta: "Sforzati", copione: "Sempre", copioneMotto: "L'hai voluta la bicicletta e ora pedala", dilemma: "Se faccio quel che voglio perdo il tuo amore", ingiunzioni: "Non crescere, non sentire, non farlo, non essere intimo", obiettiviCrescita: "Non si deve sempre combattere; imparare a chiedere; sentirsi liberi e OK", statoIo: "Doppia contaminazione dell'Adulto" },
};

export async function generateNarrativeProfile(input: ProfileInput): Promise<string> {
  if (!GEMINI_API_KEY) {
    return generateStaticProfile(input);
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const { enneatipo, ala, eta, punteggiFrutti, attrs, percorsoPersonalizzato, educativo, personalNotes } = input;

    // Build scores summary
    const scoresSorted = Object.entries(punteggiFrutti)
      .map(([k, v]) => ({ tipo: parseInt(k), punteggio: v as number }))
      .sort((a, b) => b.punteggio - a.punteggio);

    const scoresText = scoresSorted
      .map(s => `Tipo ${s.tipo} (${typeNames[s.tipo]}/${fruitNames[s.tipo]}): ${s.punteggio}/20`)
      .join("\n");

    // Build integration path text
    const intFasi = percorsoPersonalizzato?.integrazione?.fasi || {};
    const intText = Object.entries(intFasi)
      .map(([fase, info]: [string, any]) => `${fase} anni - Punto ${info.punto}: "${info.nome}" - ${info.desc}`)
      .join("\n");

    const disFasi = percorsoPersonalizzato?.disintegrazione?.fasi || {};
    const disText = Object.entries(disFasi)
      .map(([fase, info]: [string, any]) => `${fase} anni - Punto ${info.punto}: "${info.nome}" - ${info.desc}`)
      .join("\n");

    const prompt = `Sei un esperto dell'Enneagramma Evolutivo. Scrivi un profilo personalizzato dettagliato e narrativo in italiano.

DATI DELLA PERSONA:
- Enneatipo: ${enneatipo} (${typeNames[enneatipo]})
- Ala: ${ala || "non determinata"} (${ala ? typeNames[ala] : ""})
- Età: ${eta} anni
- Fase attuale del percorso: ${percorsoPersonalizzato?.faseCorrente || ""}

PUNTEGGI DEL TEST (su 20):
${scoresText}

ATTRIBUTI DELL'ENNEATIPO:
- Dignità: ${attrs?.dignita}
- Virtù: ${attrs?.virtu}
- Vizio: ${attrs?.vizio}
- Gerarchia Angelica: ${attrs?.gerarchia_angelica}
- Musa: ${attrs?.musa}
- Facoltà: ${attrs?.facolta}
- Melodia: ${attrs?.melodia}
- Topica: ${attrs?.topica}
- Meccanismo di difesa: ${attrs?.meccanismo_difesa}
- Chakra: ${attrs?.chakra}
- Pianeta: ${attrs?.pianeta}
- Idea Sacra: ${attrs?.idea_sacra}
${educativo?.descrizione ? `\nDescrizione tipo: ${educativo.descrizione}` : ""}
${educativo?.motivazione ? `Motivazione: ${educativo.motivazione}` : ""}
${educativo?.paura ? `Paura: ${educativo.paura}` : ""}
${personalNotes ? `\nNOTE PERSONALI DELL'UTENTE:\nL'utente ha condiviso queste riflessioni prima del test: "${personalNotes}"\nIntegra queste informazioni nel profilo, facendo riferimento a ciò che ha condiviso.` : ''}

ADATTAMENTO DI PERSONALITÀ (Analisi Transazionale):
${(() => {
  const at = atAdaptations[enneatipo];
  if (!at) return "Dati non disponibili per questo enneatipo.";
  return `- Adattamento: ${at.nome} (${at.nomeAlternativo})
- Tipo: Adattamento di ${at.tipo.toLowerCase()}
- Porta aperta: ${at.portaAperta} (area di contatto iniziale)
- Porta bersaglio: ${at.portaBersaglio} (area di cambiamento)
- Porta trappola: ${at.portaTrappola} (area difensiva)
- Spinta (driver): ${at.spinta}
- Copione: ${at.copione} — "${at.copioneMotto}"
- Dilemma: ${at.dilemma}
- Ingiunzioni: ${at.ingiunzioni}
- Obiettivi di crescita: ${at.obiettiviCrescita}
- Stato dell'Io: ${at.statoIo}
NOTA: La terminologia degli adattamenti serve unicamente a facilitare il riconoscimento degli stili di personalità. Non si tratta di diagnosi cliniche.`;
})()}

PERCORSO DI INTEGRAZIONE (crescita):
${intText}

PERCORSO DI DISINTEGRAZIONE (stress):
${disText}

ISTRUZIONI:
Scrivi un profilo narrativo completo di circa 2000-3000 parole, organizzato così:

1. "CHI SEI" - Un ritratto vivido della persona basato sull'enneatipo, l'ala e i punteggi secondari. Usa metafore evocative. Spiega come i punteggi alti nei tipi secondari arricchiscono la personalità. Descrivi le "anime multiple" che convivono.

2. "LA TUA STRUTTURA INTERIORE" - Spiega Dignità, Virtù e Vizio in modo narrativo, collegandoli alla vita concreta. Non elencare: racconta. La Dignità è la missione di vita. La Virtù è la medicina. Il Vizio è la trappola.

3. "IL TUO MONDO SPIRITUALE" - Gerarchia Angelica, Musa, Idea Sacra. Spiega il significato profondo di ciascuno per questa persona specifica. Usa riferimenti a Raimondo Lullo, Kircher, la tradizione.

4. "IL VIAGGIO DELLA TUA VITA" - Percorri le fasi del percorso di integrazione fase per fase, collegandole all'età della persona. Per ogni fase: che cosa ha imparato? cosa stava cercando? quale dignità stava esprimendo? Evidenzia la fase attuale (${percorsoPersonalizzato?.faseCorrente} anni) con consigli pratici.

5. "IL PERCORSO D'OMBRA" - Descrivi il percorso di disintegrazione come la versione ombra di ogni fase. Cosa succede sotto stress? Quali sono le trappole per ogni periodo?

6. "IL TUO ADATTAMENTO DI PERSONALITÀ" - Basandoti sui dati dell'Analisi Transazionale, descrivi narrativamente l'adattamento della persona: come si è formato nell'infanzia, quali sono le tre porte (aperta, bersaglio, trappola) e cosa significano nella vita quotidiana, la spinta (driver) che lo muove, il copione di vita con il suo motto, il dilemma esistenziale. Concludi con gli obiettivi di crescita in chiave AT. Usa un tono rispettoso e non clinico. Ricorda: la terminologia degli adattamenti serve unicamente a facilitare il riconoscimento degli stili di personalità, non si tratta di diagnosi cliniche.

7. "DOVE TI TROVI ORA E IL TUO CAMMINO" - Sintesi della posizione attuale a ${eta} anni. Che cosa sta imparando in questa fase? Quali sono le sfide? Consigli pratici e spirituali integrando anche le indicazioni dell'Analisi Transazionale.

TONO: Diretto, empatico, profondo. Usa "tu" per rivolgerti alla persona. Evita genericità. Ogni frase deve sembrare scritta per questa persona specifica. Usa metafore tratte dal mondo della persona (il frutto dell'albero della vita, gli angeli, le muse). NON usare elenchi puntati: scrivi in paragrafi narrativi fluidi.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text || generateStaticProfile(input);
  } catch (error) {
    console.error("[Profile Generator] Gemini API error:", error);
    return generateStaticProfile(input);
  }
}

function generateStaticProfile(input: ProfileInput): string {
  const { enneatipo, ala, eta, punteggiFrutti, attrs, percorsoPersonalizzato, educativo, personalNotes } = input;

  const scoresSorted = Object.entries(punteggiFrutti)
    .map(([k, v]) => ({ tipo: parseInt(k), punteggio: v as number, nome: typeNames[parseInt(k)] }))
    .sort((a, b) => b.punteggio - a.punteggio);

  const topSecondary = scoresSorted.filter(s => s.tipo !== enneatipo).slice(0, 3);
  const faseAttuale = percorsoPersonalizzato?.faseCorrente || "";
  const intFase = percorsoPersonalizzato?.integrazione?.faseAttuale;
  const disFase = percorsoPersonalizzato?.disintegrazione?.faseAttuale;

  let profile = `## Chi sei\n\n`;
  profile += `Sei un **Enneatipo ${enneatipo} — ${typeNames[enneatipo]}**`;
  if (ala) profile += `, con **Ala ${ala} (${typeNames[ala]})**`;
  profile += `. `;
  if (educativo?.descrizione) profile += `${educativo.descrizione} `;
  if (educativo?.motivazione) profile += `La tua motivazione profonda è *${educativo.motivazione.toLowerCase()}*. `;
  if (educativo?.paura) profile += `La tua paura fondamentale è *${educativo.paura.toLowerCase()}*.\n\n`;

  if (topSecondary.length > 0) {
    profile += `I tuoi punteggi secondari rivelano anime multiple che convivono in te: `;
    profile += topSecondary.map(s => `**Tipo ${s.tipo} — ${s.nome}** (${s.punteggio}/20)`).join(", ");
    profile += `. Queste influenze arricchiscono e complicano il tuo profilo base.\n\n`;
  }

  if (personalNotes) {
    profile += `Le tue riflessioni prima del test — *"${personalNotes}"* — rivelano un aspetto importante del tuo percorso attuale.\n\n`;
  }

  profile += `## La tua struttura interiore\n\n`;
  profile += `La tua **Dignità** è **${attrs?.dignita}** — questa è la tua missione di vita, il dono che sei chiamato a portare nel mondo. `;
  profile += `La tua **Virtù** da coltivare è **${attrs?.virtu}** — è la medicina che bilancia la tua tendenza naturale. `;
  profile += `Il **Vizio** da trasformare è **${attrs?.vizio}** — non è un difetto morale, ma la trappola in cui cade il tuo tipo quando perde la connessione con sé stesso.\n\n`;

  profile += `## Il tuo mondo spirituale\n\n`;
  profile += `La tua **Gerarchia Angelica** sono i **${attrs?.gerarchia_angelica}**. `;
  profile += `La tua **Musa** ispiratrice è **${attrs?.musa}**. `;
  profile += `La tua **Idea Sacra** è **${attrs?.idea_sacra}**.\n\n`;

  profile += `## Il viaggio della tua vita\n\n`;
  if (percorsoPersonalizzato?.integrazione?.fasi) {
    const fasi = percorsoPersonalizzato.integrazione.fasi;
    for (const [fase, info] of Object.entries(fasi) as [string, any][]) {
      const isActive = fase === faseAttuale;
      profile += `**${fase} anni — "${info.nome}"** (Punto ${info.punto})${isActive ? " ← *Fase attuale*" : ""}\n`;
      profile += `${info.desc}\n\n`;
    }
  }

  // AT section
  const at = atAdaptations[enneatipo];
  if (at && at.portaAperta !== "-") {
    profile += `## Il tuo adattamento di personalità\n\n`;
    profile += `Secondo l'Analisi Transazionale, il tuo adattamento è **${at.nome}** (*${at.nomeAlternativo}*), un adattamento di ${at.tipo.toLowerCase()}. `;
    profile += `La tua **porta aperta** è il **${at.portaAperta.toLowerCase()}** — è l'area attraverso cui le persone possono raggiungerti più facilmente. `;
    profile += `La **porta bersaglio** è il **${at.portaBersaglio.toLowerCase()}** — l'area su cui lavorare per crescere. `;
    profile += `La **porta trappola** è il **${at.portaTrappola.toLowerCase()}** — l'area dove concentri più difese.\n\n`;
    profile += `La tua spinta è *"${at.spinta}"* e il tuo copione di vita è *"${at.copione}"*: «${at.copioneMotto}».\n`;
    profile += `Il tuo dilemma esistenziale: *${at.dilemma}*.\n\n`;
    profile += `I tuoi obiettivi di crescita: ${at.obiettiviCrescita}.\n\n`;
    profile += `*La terminologia degli adattamenti serve unicamente a facilitare il riconoscimento degli stili di personalità. Non si tratta di diagnosi cliniche.*\n\n`;
  }

  profile += `## Dove ti trovi ora\n\n`;
  profile += `A **${eta} anni**, ti trovi nella fase **${faseAttuale}** del tuo percorso evolutivo. `;
  if (intFase) {
    profile += `Se stai vivendo un percorso di crescita, sei nella fase "${intFase.nome}" — ${intFase.desc?.toLowerCase()}. `;
  }
  if (disFase) {
    profile += `Se attraversi un momento di stress, potresti riconoscere la fase "${disFase.nome}" — ${disFase.desc?.toLowerCase()}.`;
  }

  return profile;
}
