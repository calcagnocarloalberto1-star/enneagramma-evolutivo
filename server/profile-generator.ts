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

export async function generateNarrativeProfile(input: ProfileInput): Promise<string> {
  if (!GEMINI_API_KEY) {
    return generateStaticProfile(input);
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const { enneatipo, ala, eta, punteggiFrutti, attrs, percorsoPersonalizzato, educativo } = input;

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

6. "DOVE TI TROVI ORA E IL TUO CAMMINO" - Sintesi della posizione attuale a ${eta} anni. Che cosa sta imparando in questa fase? Quali sono le sfide? Consigli pratici e spirituali.

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
  const { enneatipo, ala, eta, punteggiFrutti, attrs, percorsoPersonalizzato, educativo } = input;

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
