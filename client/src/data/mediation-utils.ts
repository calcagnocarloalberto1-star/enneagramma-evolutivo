// Mediation Analysis Utilities
// Builds mediation strategies programmatically from enneatipo/AT data

import {
  getATForEnneatipo,
  getATListForEnneatipo,
  getATInterazione,
  typeNames,
  type ATAdaptation,
  type ATInterazione,
} from "./percorsi-eta";

// ── Wing descriptions (reused from CoupleCompatibility) ──

export const wingDescriptions: Record<string, string> = {
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

// ── Helper: get wings for enneatipo ──

export function getWings(type: number): number[] {
  if (type < 1 || type > 9) return [];
  const left = type === 1 ? 9 : type - 1;
  const right = type === 9 ? 1 : type + 1;
  return [left, right];
}

// ── Motivational levers per enneatipo ──

const leveMotivazionali: Record<number, string> = {
  1: "Fare appello al senso di giustizia, equità e al fare la cosa giusta. Il Perfezionista è motivato dalla correttezza e dalla coerenza con i principi.",
  2: "Fare appello alle relazioni, alla collaborazione e al desiderio di aiutare. L'Altruista è motivato dal senso di connessione e dal sentirsi utile.",
  3: "Fare appello all'efficienza, ai risultati concreti e al pragmatismo. Il Realizzatore è motivato dal successo e dalla risoluzione rapida.",
  4: "Fare appello all'autenticità, alla comprensione profonda e al sentirsi riconosciuto. L'Individualista è motivato dall'essere capito nella sua unicità.",
  5: "Fare appello alla competenza, alla logica e all'analisi razionale. L'Osservatore è motivato dalla conoscenza e dalla comprensione sistematica.",
  6: "Fare appello alla sicurezza, alla lealtà e alla prevedibilità. Il Leale è motivato dalla chiarezza delle regole e dalla fiducia reciproca.",
  7: "Fare appello alle possibilità, alle opzioni future e alla creatività nelle soluzioni. L'Entusiasta è motivato dalla libertà e dalle prospettive positive.",
  8: "Fare appello alla giustizia, al rispetto e al controllo sulla situazione. Il Leader è motivato dalla forza, dall'onestà diretta e dalla protezione dei più deboli.",
  9: "Fare appello all'armonia, alla pace e al benessere collettivo. Il Pacificatore è motivato dalla stabilità e dall'evitamento del conflitto.",
};

// ── Traps to avoid per enneatipo ──

const trappolePerTipo: Record<number, string> = {
  1: "Non criticare né giudicare le sue posizioni. Evitare di far notare errori o imperfezioni nel suo ragionamento. Non usare un tono condiscendente: il Perfezionista percepisce immediatamente la mancanza di rigore.",
  2: "Non ignorare i suoi sentimenti né sembrare freddi o distaccati. Evitare di far sentire che il suo contributo non è apprezzato. Non trattarlo come manipolativo: l'Altruista ha genuinamente bisogno di sentirsi valorizzato.",
  3: "Non rallentare inutilmente il processo né perdersi in dettagli irrilevanti. Evitare di mettere in discussione la sua competenza. Non smascherare pubblicamente le sue strategie: il Realizzatore teme il fallimento visibile.",
  4: "Non minimizzare le sue emozioni né dire «non è poi così grave». Evitare approcci troppo tecnici o freddi. Non ignorare la sua sofferenza: l'Individualista ha bisogno di sentirsi profondamente ascoltato.",
  5: "Non invadere il suo spazio personale né forzare l'espressione emotiva. Evitare pressioni per decisioni immediate. Non pretendere risposte emotive: l'Osservatore ha bisogno di tempo e distanza per elaborare.",
  6: "Non essere ambigui o incoerenti. Evitare cambiamenti improvvisi di posizione. Non minimizzare le sue preoccupazioni: il Leale legge qualsiasi incongruenza come minaccia e perde fiducia.",
  7: "Non costringerlo in schemi rigidi o procedure noiose. Evitare toni pesanti o colpevolizzanti. Non bloccare le sue proposte creative: l'Entusiasta si chiude se sente di non avere via d'uscita.",
  8: "Non tentare di controllarlo o manipolarlo. Evitare atteggiamenti passivi o evasivi. Non mostrarsi deboli o ambigui: il Leader rispetta la franchezza e disprezza la debolezza percepita.",
  9: "Non forzare decisioni rapide né mettere pressione. Evitare conflitti diretti e toni aggressivi. Non ignorarlo credendo che «vada tutto bene»: il Pacificatore tende a reprimere il disagio che poi esplode.",
};

// ── Approach by door ──

function getApproccioPerPorta(porta: string, nomeParte: string, at: ATAdaptation): string {
  const lower = porta.toLowerCase();
  if (lower.includes("pensiero")) {
    return `Con ${nomeParte} (porta aperta: Pensiero), iniziare presentando fatti, dati e una struttura logica della situazione. Fornire un quadro chiaro e ordinato prima di affrontare gli aspetti emotivi. Lo stile comunicativo consigliato è: ${at.stileComunicazione}.`;
  }
  if (lower.includes("emozioni") || lower.includes("emozione")) {
    return `Con ${nomeParte} (porta aperta: Emozioni), iniziare riconoscendo i sentimenti e mostrando empatia genuina. Validare le emozioni prima di passare ai fatti. Lo stile comunicativo consigliato è: ${at.stileComunicazione}.`;
  }
  // Comportamento
  return `Con ${nomeParte} (porta aperta: Comportamento), iniziare proponendo azioni concrete e passi pratici. Essere direttivi e orientati alla soluzione. Lo stile comunicativo consigliato è: ${at.stileComunicazione}.`;
}

// ── Session management ──

function getGestioneSessione(at1: ATAdaptation, at2: ATAdaptation, livelloConflitto: string): string {
  let text = "";

  // Who escalates
  const escalation1 = at1.diFronteAMinaccia;
  const escalation2 = at2.diFronteAMinaccia;
  text += `Sotto pressione, la Parte 1 (${at1.nome}) tende a: ${escalation1}. La Parte 2 (${at2.nome}) tende a: ${escalation2}. `;

  // Seating/turn-taking
  const stile1 = at1.stileSociale.toLowerCase();
  const stile2 = at2.stileSociale.toLowerCase();

  if (stile1.includes("attivo") && stile2.includes("passivo")) {
    text += "Dare la parola prima alla Parte 2 (più passiva) per evitare che venga sopraffatta. La Parte 1, più attiva, va contenuta con regole di turno chiare. ";
  } else if (stile2.includes("attivo") && stile1.includes("passivo")) {
    text += "Dare la parola prima alla Parte 1 (più passiva) per evitare che venga sopraffatta. La Parte 2, più attiva, va contenuta con regole di turno chiare. ";
  } else if (stile1.includes("attivo") && stile2.includes("attivo")) {
    text += "Entrambe le parti tendono a essere attive: stabilire turni rigidi e usare un timer. Il mediatore deve mantenere il controllo del ritmo della sessione. ";
  } else {
    text += "Entrambe le parti tendono a essere passive: il mediatore dovrà stimolare la partecipazione attiva con domande dirette e specifiche. ";
  }

  // Caucus recommendation
  if (livelloConflitto === "alto") {
    text += "Con livello di conflittualità ALTO, prevedere caucus separati fin dall'inizio. Alternare sessioni congiunte brevi con incontri individuali più lunghi.";
  } else if (livelloConflitto === "medio") {
    text += "Con livello di conflittualità MEDIO, iniziare con sessione congiunta ma essere pronti a passare al caucus se la tensione sale. Preparare un piano B.";
  } else {
    text += "Con livello di conflittualità BASSO, la sessione congiunta è generalmente produttiva. Usare il caucus solo se emergono blocchi specifici.";
  }

  return text;
}

// ── Common ground ──

function getTerrenoComune(t1: number, t2: number, at1: ATAdaptation, at2: ATAdaptation): string {
  let text = "";

  // Shared values based on same topica/type
  const centri: Record<number, string> = {
    1: "istintivo", 2: "emotivo", 3: "emotivo",
    4: "emotivo", 5: "mentale", 6: "mentale",
    7: "mentale", 8: "istintivo", 9: "istintivo",
  };
  const c1 = centri[t1];
  const c2 = centri[t2];

  if (c1 === c2) {
    text += `Entrambe le parti appartengono al centro ${c1}: condividono una modalità simile di elaborare l'esperienza. Questo è un potente terreno comune su cui costruire. `;
  } else {
    text += `Le parti operano da centri diversi (${c1} e ${c2}): il mediatore deve fungere da ponte tra queste modalità diverse, traducendo il linguaggio dell'uno nella forma dell'altro. `;
  }

  // Shared door sequences
  if (at1.sequenzaPorte === at2.sequenzaPorte) {
    text += `Condividono la stessa sequenza di porte (${at1.sequenzaPorte}): la comunicazione può fluire naturalmente se il mediatore la facilita. `;
  } else {
    text += `Hanno sequenze di porte diverse (${at1.sequenzaPorte} vs ${at2.sequenzaPorte}): il mediatore deve adattare il proprio stile comunicativo a seconda di chi sta parlando. `;
  }

  // Reframing technique
  text += `\n\nTecnica di riformulazione consigliata: Riformulare le posizioni della Parte 1 nel linguaggio della Parte 2 e viceversa. `;
  text += `Per la Parte 1 (${typeNames[t1]}), ${leveMotivazionali[t1].split(". ")[0].toLowerCase()}. `;
  text += `Per la Parte 2 (${typeNames[t2]}), ${leveMotivazionali[t2].split(". ")[0].toLowerCase()}. `;
  text += `L'accordo ideale dovrebbe soddisfare entrambe queste motivazioni profonde.`;

  return text;
}

// ── Specific techniques ──

function getTecnicheSpecifiche(at1: ATAdaptation, at2: ATAdaptation): string {
  let text = "";

  text += `Stili comunicativi AT da utilizzare:\n`;
  text += `• Con ${at1.nome}: ${at1.stileComunicazione}\n`;
  text += `• Con ${at2.nome}: ${at2.stileComunicazione}\n\n`;

  text += `Rapport e aggancio:\n`;
  text += `• ${at1.nome}: ${at1.rapport}\n`;
  text += `• ${at2.nome}: ${at2.rapport}\n\n`;

  // Active listening vs directive approach
  const porta1 = at1.portaAperta.toLowerCase();
  const porta2 = at2.portaAperta.toLowerCase();

  if (porta1.includes("emozioni") || porta2.includes("emozioni")) {
    text += `Almeno una delle parti ha la porta aperta sulle emozioni: privilegiare l'ascolto attivo e la riformulazione empatica prima di passare all'approccio direttivo. `;
  }
  if (porta1.includes("pensiero") || porta2.includes("pensiero")) {
    text += `Almeno una delle parti ha la porta aperta sul pensiero: utilizzare domande esplorative e analisi razionale come strumento primario. `;
  }
  if (porta1.includes("comportamento") || porta2.includes("comportamento")) {
    text += `Almeno una delle parti ha la porta aperta sul comportamento: proporre azioni concrete e step-by-step, evitando lunghe discussioni teoriche.`;
  }

  return text;
}

// ── Fallback functions when AT data is not available ──

const centriEnneagramma: Record<number, string> = {
  1: "istintivo", 2: "emotivo", 3: "emotivo", 4: "emotivo",
  5: "mentale", 6: "mentale", 7: "mentale",
  8: "istintivo", 9: "istintivo",
};

function getGestioneSessioneFallback(p1: PartyProfile, p2: PartyProfile, livello: string): string {
  const c1 = centriEnneagramma[p1.enneatipo] || "emotivo";
  const c2 = centriEnneagramma[p2.enneatipo] || "emotivo";
  let text = "GESTIONE DELLA SESSIONE CONGIUNTA NELLA MEDIAZIONE FAMILIARE\n\n";
  text += "La sessione congiunta nella mediazione familiare è un momento delicato che richiede una preparazione attenta e una conduzione consapevole.\n\n";

  text += "PRINCIPI GENERALI:\n";
  text += "• Impermanenza: ogni porta resta aperta al cambiamento. Le posizioni espresse oggi sono provvisorie.\n";
  text += "• Compassione: il mediatore non giudica, ma comprende. Solo conoscendo la propria oscurità possiamo essere presenti nel buio degli altri.\n";
  text += "• Interdipendenza: l'esperienza di ciascuno dipende da come percepisce che l'altro lo percepisce.\n\n";

  text += `PROFILO DELLE PARTI AL TAVOLO:\n`;
  text += `${p1.nome} (${p1.nomeEnneatipo}, centro ${c1}): ${leveMotivazionali[p1.enneatipo]}\n`;
  text += `${p2.nome} (${p2.nomeEnneatipo}, centro ${c2}): ${leveMotivazionali[p2.enneatipo]}\n\n`;

  if (c1 === c2) {
    text += `Entrambe le parti operano dal centro ${c1}: condividono un modo simile di elaborare l'esperienza. Usare questo terreno comune come ponte.\n\n`;
  } else {
    text += `Le parti operano da centri diversi (${c1} vs ${c2}): il mediatore deve tradurre il linguaggio di una parte nella modalità dell'altra.\n\n`;
  }

  text += "STRUTTURA DELLA SESSIONE CONSIGLIATA:\n";
  text += "1. Discorso iniziale: stabilire le regole (toni rispettosi, turni di parola, possibilità di caucus).\n";
  text += "2. Ascolto delle parti: permettere a ciascuno di esprimere il proprio vissuto senza interruzioni.\n";
  text += "3. Riformulazione: il mediatore riformula le posizioni usando un linguaggio neutro e orientato ai bisogni.\n";
  text += "4. Individuazione dei punti comuni: evidenziare dove le esigenze convergono.\n";
  text += "5. Esplorazione delle opzioni: brainstorming guidato per possibili soluzioni.\n";
  text += "6. Verifica della realtà: controllare che le opzioni siano praticabili e sostenibili.\n\n";

  if (livello === "alto") {
    text += "ATTENZIONE — Conflittualità ALTA: prevedere caucus separati fin dall'inizio. Alternare sessioni congiunte brevi (max 20 min) con incontri individuali più lunghi. Monitorare costantemente i segnali di escalation.";
  } else if (livello === "medio") {
    text += "Conflittualità MEDIA: iniziare con sessione congiunta ma avere pronto un piano B (caucus). Se la tensione sale, interrompere con cortesia e passare a colloqui individuali.";
  } else {
    text += "Conflittualità BASSA: la sessione congiunta è generalmente produttiva. Usare il caucus solo se emergono blocchi specifici o se una parte ha bisogno di un momento di riflessione privata.";
  }

  return text;
}

function getTerrenoComuneFallback(p1: PartyProfile, p2: PartyProfile): string {
  const c1 = centriEnneagramma[p1.enneatipo] || "emotivo";
  const c2 = centriEnneagramma[p2.enneatipo] || "emotivo";
  let text = "";

  if (c1 === c2) {
    text += `Entrambe le parti appartengono al centro ${c1}: condividono una modalità simile di elaborare l'esperienza. `;
  }

  text += `Per la Parte 1 (${p1.nomeEnneatipo}): ${leveMotivazionali[p1.enneatipo]} `;
  text += `Per la Parte 2 (${p2.nomeEnneatipo}): ${leveMotivazionali[p2.enneatipo]} `;
  text += `\n\nIl mediatore dovrebbe cercare di costruire un accordo che soddisfi entrambe queste motivazioni profonde, riformulando le posizioni dell'uno nel linguaggio dell'altro.`;

  return text;
}

function getTecnicheSpecificheFallback(p1: PartyProfile, p2: PartyProfile): string {
  const c1 = centriEnneagramma[p1.enneatipo] || "emotivo";
  const c2 = centriEnneagramma[p2.enneatipo] || "emotivo";
  let text = "Tecniche consigliate in base al profilo enneagrammatico:\n\n";

  if (c1 === "emotivo" || c2 === "emotivo") {
    text += "• Ascolto attivo e riformulazione empatica: almeno una parte opera dal centro emotivo. Validare i sentimenti prima di passare al contenuto.\n";
  }
  if (c1 === "mentale" || c2 === "mentale") {
    text += "• Domande esplorative e analisi razionale: almeno una parte opera dal centro mentale. Usare dati e logica per costruire fiducia.\n";
  }
  if (c1 === "istintivo" || c2 === "istintivo") {
    text += "• Approccio direttivo e orientato all'azione: almeno una parte opera dal centro istintivo. Proporre step concreti ed evitare discussioni troppo astratte.\n";
  }

  text += "\n• Riformulazione positiva: trasformare le recriminazioni in bisogni (da \"non fai mai...\" a \"ho bisogno di...\").";
  text += "\n• Normalizzazione: aiutare le parti a comprendere che le reazioni sono tipiche della situazione.";
  text += "\n• Reality testing: verificare con domande concrete la fattibilità delle proposte.";
  text += "\n• Mutualizzazione: evidenziare gli elementi comuni nelle posizioni delle parti.";

  return text;
}

// ── Public: build full party profile ──

export interface PartyProfile {
  nome: string;
  enneatipo: number;
  nomeEnneatipo: string;
  ala: string;
  alaDescrizione: string;
  sottotipo: string;
  at: ATAdaptation | undefined;
  atSecondari: ATAdaptation[];
  approccio: string;
  levaMotivazionale: string;
  trappola: string;
  reazioneMinaccia: string;
  stileComunicazione: string;
}

export function buildPartyProfile(
  nome: string,
  enneatipo: number,
  ala: string,
  sottotipo: string,
): PartyProfile {
  const at = getATForEnneatipo(enneatipo);
  const atList = getATListForEnneatipo(enneatipo);
  const nomeEnneatipo = typeNames[enneatipo] || `Tipo ${enneatipo}`;
  const wingKey = ala && ala !== "nessuna" ? `${enneatipo}w${ala}` : "";
  const alaDescrizione = wingKey ? (wingDescriptions[wingKey] || "") : "";

  const nomeParte = nome || `Tipo ${enneatipo}`;
  const approccio = at ? getApproccioPerPorta(at.portaAperta, nomeParte, at) : "";

  return {
    nome: nomeParte,
    enneatipo,
    nomeEnneatipo,
    ala,
    alaDescrizione,
    sottotipo,
    at,
    atSecondari: atList.slice(1),
    approccio,
    levaMotivazionale: leveMotivazionali[enneatipo] || "",
    trappola: trappolePerTipo[enneatipo] || "",
    reazioneMinaccia: at?.diFronteAMinaccia || "",
    stileComunicazione: at?.stileComunicazione || "",
  };
}

// ── Public: full conflict dynamics ──

export interface ConflictDynamics {
  atInterazione: ATInterazione | null;
  puntiClash: string;
  dinamicheAttrazione: string;
}

export function buildConflictDynamics(t1: number, t2: number): ConflictDynamics {
  const at1 = getATForEnneatipo(t1);
  const at2 = getATForEnneatipo(t2);
  const atInterazione = getATInterazione(t1, t2);

  let puntiClash = "";
  if (at1 && at2) {
    if (at1.portaAperta !== at2.portaAperta) {
      puntiClash += `Le porte aperte sono diverse (${at1.portaAperta} vs ${at2.portaAperta}): comunicano su canali diversi, generando potenziali incomprensioni. `;
    }
    if (at1.spinta !== at2.spinta) {
      puntiClash += `Le spinte/driver sono diverse («${at1.spinta}» vs «${at2.spinta}»): ciò che motiva una parte può irritare l'altra. `;
    }
    if (at1.copione !== at2.copione) {
      puntiClash += `I copioni di vita differiscono («${at1.copione}» vs «${at2.copione}»): aspettative diverse sull'esito della mediazione.`;
    }
  }

  let dinamicheAttrazione = "";
  if (atInterazione) {
    dinamicheAttrazione = atInterazione.descrizione;
    if (atInterazione.tipo === "attrazione") {
      dinamicheAttrazione += " Questa dinamica di attrazione può essere utilizzata dal mediatore come leva per trovare punti di contatto.";
    } else if (atInterazione.tipo === "problematica") {
      dinamicheAttrazione += " Il mediatore deve essere particolarmente attento a questa dinamica problematica e prevenire escalation.";
    }
  }

  return { atInterazione, puntiClash, dinamicheAttrazione };
}

// ── Public: full mediator strategy ──

export interface MediatorStrategy {
  approccioIniziale: string;
  gestioneSessione: string;
  leveMotivazionali: string;
  terrenoComune: string;
  trappoleDaEvitare: string;
  tecnicheSpecifiche: string;
}

export function buildMediatorStrategy(
  profile1: PartyProfile,
  profile2: PartyProfile,
  livelloConflitto: string,
): MediatorStrategy {
  const at1 = profile1.at;
  const at2 = profile2.at;

  const approccioIniziale = [
    profile1.approccio,
    "",
    profile2.approccio,
  ].join("\n");

  const gestioneSessione = at1 && at2
    ? getGestioneSessione(at1, at2, livelloConflitto)
    : getGestioneSessioneFallback(profile1, profile2, livelloConflitto);

  const leveText = `Parte 1 (${profile1.nome} — ${profile1.nomeEnneatipo}):\n${profile1.levaMotivazionale}\n\nParte 2 (${profile2.nome} — ${profile2.nomeEnneatipo}):\n${profile2.levaMotivazionale}`;

  const terrenoComune = at1 && at2
    ? getTerrenoComune(profile1.enneatipo, profile2.enneatipo, at1, at2)
    : getTerrenoComuneFallback(profile1, profile2);

  const trappoleDaEvitare = `Con ${profile1.nome} (${profile1.nomeEnneatipo}):\n${profile1.trappola}\n\nCon ${profile2.nome} (${profile2.nomeEnneatipo}):\n${profile2.trappola}`;

  const tecnicheSpecifiche = at1 && at2
    ? getTecnicheSpecifiche(at1, at2)
    : getTecnicheSpecificheFallback(profile1, profile2);

  return {
    approccioIniziale,
    gestioneSessione,
    leveMotivazionali: leveText,
    terrenoComune,
    trappoleDaEvitare,
    tecnicheSpecifiche,
  };
}

// ── Public: simulation scenarios ──

export interface SimulationScenario {
  titolo: string;
  contesto: string;
  parti: string;
  puntoCritico: string;
  obiettivoFormativo: string;
  suggerimentiMediatore: string;
}

// Italian first names by enneatipo flavor
const nomiMaschili: Record<number, string> = {
  1: "Marco", 2: "Andrea", 3: "Luca", 4: "Giovanni", 5: "Roberto",
  6: "Alessandro", 7: "Matteo", 8: "Paolo", 9: "Stefano",
};
const nomiFemminili: Record<number, string> = {
  1: "Laura", 2: "Anna", 3: "Elena", 4: "Chiara", 5: "Silvia",
  6: "Francesca", 7: "Giulia", 8: "Valeria", 9: "Sara",
};

// ── Civile simulation templates ──

const tipiControversiaCivile = [
  "Contratti", "Diritti reali", "Condominio", "Successioni",
  "Locazioni", "Risarcimento danni", "Rapporti commerciali", "Altro",
];

function buildCivilSimulations(
  t1: number,
  t2: number,
  at1: ATAdaptation | undefined,
  at2: ATAdaptation | undefined,
  tipoControversia: string,
): SimulationScenario[] {
  const name1 = nomiMaschili[t1] || "Marco";
  const name2 = nomiFemminili[t2] || "Laura";
  const tipo1 = typeNames[t1];
  const tipo2 = typeNames[t2];
  const atNome1 = at1?.nome || "N/D";
  const atNome2 = at2?.nome || "N/D";
  const minaccia1 = at1?.diFronteAMinaccia || "si irrigidisce";
  const minaccia2 = at2?.diFronteAMinaccia || "si irrigidisce";
  const porta1 = at1?.portaAperta || "Pensiero";
  const porta2 = at2?.portaAperta || "Pensiero";
  const spinta1 = at1?.spinta || "";
  const spinta2 = at2?.spinta || "";

  const controversia = tipoControversia || "Contratti";

  const scenarios: SimulationScenario[] = [];

  // Scenario 1: Opening phase
  scenarios.push({
    titolo: `La prima sessione: ${controversia.toLowerCase()} tra personalità opposte`,
    contesto: `${name1} e ${name2} si trovano in una disputa riguardante ${controversia.toLowerCase()}. ${name1} (Tipo ${t1}, ${atNome1}) affronta la situazione con il suo stile caratteristico: ${minaccia1.toLowerCase()}. ${name2} (Tipo ${t2}, ${atNome2}) reagisce in modo opposto: ${minaccia2.toLowerCase()}.`,
    parti: `${name1} (${tipo1}): La spinta principale è «${spinta1}». Si esprime attraverso la porta ${porta1.toLowerCase()} ed è ${at1?.stileSociale?.toLowerCase() || "riservato nelle interazioni"}.\n${name2} (${tipo2}): La spinta principale è «${spinta2}». Si esprime attraverso la porta ${porta2.toLowerCase()} ed è ${at2?.stileSociale?.toLowerCase() || "riservata nelle interazioni"}.`,
    puntoCritico: `Il momento di massima tensione arriva quando ${name1} ${porta1.toLowerCase() === "pensiero" ? "presenta i fatti in modo freddo e distaccato" : porta1.toLowerCase() === "emozioni" ? "esprime le proprie emozioni con intensità" : "propone un'azione unilaterale"} e ${name2} ${porta2.toLowerCase() === "pensiero" ? "risponde con argomentazioni logiche che ignorano il piano emotivo" : porta2.toLowerCase() === "emozioni" ? "reagisce emotivamente amplificando il conflitto" : "si chiude in un silenzio ostile o propone soluzioni rigide"}.`,
    obiettivoFormativo: `Praticare l'approccio iniziale differenziato: entrare dalla porta aperta di ciascuna parte. Con ${name1} attraverso ${porta1.toLowerCase()}, con ${name2} attraverso ${porta2.toLowerCase()}.`,
    suggerimentiMediatore: `Aprire con ${name1} usando un approccio ${porta1.toLowerCase() === "pensiero" ? "esplorativo e razionale" : porta1.toLowerCase() === "emozioni" ? "affettivo ed empatico" : "direttivo e concreto"}. Con ${name2}, passare a uno stile ${porta2.toLowerCase() === "pensiero" ? "esplorativo e razionale" : porta2.toLowerCase() === "emozioni" ? "affettivo ed empatico" : "direttivo e concreto"}. Prestare attenzione alle reazioni di stress.`,
  });

  // Scenario 2: Escalation
  scenarios.push({
    titolo: `L'escalation: quando il mediatore perde il controllo`,
    contesto: `La mediazione per ${controversia.toLowerCase()} è a un punto critico. Le posizioni si sono irrigidite e la comunicazione è deteriorata. ${name1} e ${name2} hanno smesso di ascoltarsi.`,
    parti: `${name1} (${tipo1}, adattamento ${atNome1}): Di fronte alla minaccia, ${minaccia1.toLowerCase()}. Il suo gioco psicologico preferito è «${at1?.giocoPsicologico || "non specificato"}».\n${name2} (${tipo2}, adattamento ${atNome2}): Di fronte alla minaccia, ${minaccia2.toLowerCase()}. Il suo gioco psicologico preferito è «${at2?.giocoPsicologico || "non specificato"}».`,
    puntoCritico: `${name1} attiva il suo copione «${at1?.copione || "Sempre"}» (${at1?.copioneMotto || ""}). ${name2} risponde con il proprio copione «${at2?.copione || "Sempre"}» (${at2?.copioneMotto || ""}). I due copioni si alimentano a vicenda creando un circolo vizioso.`,
    obiettivoFormativo: `Riconoscere i giochi psicologici in atto e interromperli senza far perdere la faccia alle parti. Praticare il passaggio dalla sessione congiunta al caucus.`,
    suggerimentiMediatore: `Interrompere il gioco psicologico riconoscendo l'emozione sottostante. Proporre un caucus. In separata sede, con ${name1}: ${at1?.rapport || "utilizzare un approccio empatico"}. Con ${name2}: ${at2?.rapport || "utilizzare un approccio empatico"}. Tornare in sessione congiunta solo quando entrambi sono nello Stato dell'Io Adulto.`,
  });

  // Scenario 3: Resolution attempt
  scenarios.push({
    titolo: `Verso l'accordo: costruire il terreno comune`,
    contesto: `Dopo diverse sessioni, il mediatore ha stabilito una relazione con entrambe le parti. Ora deve guidarle verso un accordo su ${controversia.toLowerCase()} che soddisfi le motivazioni profonde di ciascuno.`,
    parti: `${name1} (${tipo1}): Ha bisogno che l'accordo soddisfi il suo driver «${spinta1}». La sua dignità nel sistema enneagrammatico richiede il riconoscimento di ${at1?.nome === "Ossessivo-compulsivo" ? "correttezza e rigore" : at1?.nome === "Istrionico" ? "valore personale e relazione" : at1?.nome === "Paranoide" ? "sicurezza e prevedibilità" : at1?.nome === "Schizoide" ? "autonomia e spazio" : at1?.nome === "Passivo-aggressivo" ? "libertà e autonomia decisionale" : at1?.nome === "Antisociale" ? "potere e rispetto" : "bisogni specifici"}.\n${name2} (${tipo2}): Ha bisogno che l'accordo soddisfi il suo driver «${spinta2}». Richiede il riconoscimento di ${at2?.nome === "Ossessivo-compulsivo" ? "correttezza e rigore" : at2?.nome === "Istrionico" ? "valore personale e relazione" : at2?.nome === "Paranoide" ? "sicurezza e prevedibilità" : at2?.nome === "Schizoide" ? "autonomia e spazio" : at2?.nome === "Passivo-aggressivo" ? "libertà e autonomia decisionale" : at2?.nome === "Antisociale" ? "potere e rispetto" : "bisogni specifici"}.`,
    puntoCritico: `Il momento più delicato è quando si passa dalle posizioni agli interessi. ${name1} rischia di ${t1 <= 3 ? "irrigidirsi sulla forma" : t1 <= 6 ? "analizzare all'infinito" : "perdere pazienza o disimpegnarsi"}. ${name2} rischia di ${t2 <= 3 ? "irrigidirsi sulla forma" : t2 <= 6 ? "analizzare all'infinito" : "perdere pazienza o disimpegnarsi"}.`,
    obiettivoFormativo: `Praticare la costruzione dell'accordo partendo dai bisogni profondi di ciascun enneatipo. Strutturare proposte che parlino il linguaggio motivazionale di entrambe le parti.`,
    suggerimentiMediatore: `Formulare la proposta di accordo con un doppio linguaggio: per ${name1}, enfatizzare ${leveMotivazionali[t1].split(".")[0].toLowerCase().replace("fare appello ", "")}. Per ${name2}, enfatizzare ${leveMotivazionali[t2].split(".")[0].toLowerCase().replace("fare appello ", "")}. L'accordo scritto deve contenere elementi che soddisfino entrambi i driver.`,
  });

  return scenarios;
}

// ── Familiare simulation templates ──

function buildFamilySimulations(
  t1: number,
  t2: number,
  at1: ATAdaptation | undefined,
  at2: ATAdaptation | undefined,
  tipoMediazione: string,
  figliCoinvolti: boolean,
  numFigli: string,
  etaFigli: string,
): SimulationScenario[] {
  const name1 = nomiMaschili[t1] || "Marco";
  const name2 = nomiFemminili[t2] || "Laura";
  const tipo1 = typeNames[t1];
  const tipo2 = typeNames[t2];
  const atNome1 = at1?.nome || "N/D";
  const atNome2 = at2?.nome || "N/D";
  const minaccia1 = at1?.diFronteAMinaccia || "si irrigidisce";
  const minaccia2 = at2?.diFronteAMinaccia || "si irrigidisce";
  const porta1 = at1?.portaAperta || "Pensiero";
  const porta2 = at2?.portaAperta || "Pensiero";
  const spinta1 = at1?.spinta || "";
  const spinta2 = at2?.spinta || "";

  const tipo = tipoMediazione || "Separazione/Divorzio";
  const figliInfo = figliCoinvolti && numFigli
    ? `${numFigli} figli${etaFigli ? ` (${etaFigli} anni)` : ""}`
    : "";

  const scenarios: SimulationScenario[] = [];

  // Scenario 1: Emotional flood
  scenarios.push({
    titolo: `La tempesta emotiva: ${tipo.toLowerCase()}`,
    contesto: `${name1} (Tipo ${t1}, ${atNome1}) e ${name2} (Tipo ${t2}, ${atNome2}) sono in mediazione per ${tipo.toLowerCase()}.${figliInfo ? ` Hanno ${figliInfo} coinvolti nella situazione.` : ""} Le emozioni sono al massimo e la comunicazione è interrotta.`,
    parti: `${name1} (${tipo1}): Sotto stress emotivo, ${minaccia1.toLowerCase()}. Il suo copione «${at1?.copione || "Sempre"}» si attiva: «${at1?.copioneMotto || ""}». ${at1?.tipo === "Adattamento di sopravvivenza" ? "Come adattamento di sopravvivenza, le sue difese sono particolarmente rigide." : "Come adattamento di performance, cerca di mantenere il controllo attraverso la prestazione."}\n${name2} (${tipo2}): Sotto stress emotivo, ${minaccia2.toLowerCase()}. Il suo copione «${at2?.copione || "Sempre"}» si attiva: «${at2?.copioneMotto || ""}». ${at2?.tipo === "Adattamento di sopravvivenza" ? "Come adattamento di sopravvivenza, le sue difese sono particolarmente rigide." : "Come adattamento di performance, cerca di mantenere il controllo attraverso la prestazione."}`,
    puntoCritico: `Il momento critico arriva quando${figliInfo ? " si parla dei figli e" : ""} ${name1} ${porta1.toLowerCase() === "pensiero" ? "cerca di razionalizzare la situazione negando le emozioni in gioco" : porta1.toLowerCase() === "emozioni" ? "viene travolto/a dalle proprie emozioni e non riesce a contenere il dolore" : "si chiude in un'azione unilaterale rifiutando il dialogo"}. ${name2} risponde ${porta2.toLowerCase() === "pensiero" ? "con freddezza e distacco, che viene percepito come mancanza di empatia" : porta2.toLowerCase() === "emozioni" ? "amplificando l'emotività, trasformando la sessione in uno sfogo" : "con una reazione impulsiva che blocca la mediazione"}.`,
    obiettivoFormativo: `Gestire il flooding emotivo in mediazione familiare. Praticare tecniche di contenimento emotivo calibrate sull'adattamento AT di ciascuna parte.`,
    suggerimentiMediatore: `Riconoscere il flooding e proporre una pausa. Con ${name1}: ${at1?.rapport || "approccio empatico"}. Con ${name2}: ${at2?.rapport || "approccio empatico"}.${figliInfo ? " Riportare il focus sui bisogni dei figli come terreno neutro." : ""} Non forzare il contatto emotivo con chi ha la porta trappola sulle emozioni.`,
  });

  // Scenario 2: Children-focused (or inheritance/patrimonial)
  if (figliCoinvolti && figliInfo) {
    scenarios.push({
      titolo: `I figli al centro: chi decide per ${figliInfo}?`,
      contesto: `La questione dell'affidamento e delle decisioni riguardanti i figli (${figliInfo}) è diventata il nodo principale della mediazione. ${name1} e ${name2} hanno visioni molto diverse su come gestire la genitorialità condivisa.`,
      parti: `${name1} (${tipo1}, ${atNome1}): Il suo stile genitoriale riflette il driver «${spinta1}». Tende a ${t1 === 1 ? "imporre regole rigide e aspettative elevate" : t1 === 2 ? "essere iperprotettivo e dare attenzione costante" : t1 === 3 ? "spingere verso il successo e l'autonomia" : t1 === 4 ? "valorizzare l'espressione emotiva e la creatività" : t1 === 5 ? "dare spazio e autonomia, a volte troppa distanza" : t1 === 6 ? "proteggere e controllare, con ansia per la sicurezza" : t1 === 7 ? "proporre attività stimolanti ma evitare la disciplina" : t1 === 8 ? "proteggere con forza ma con disciplina molto dura" : "essere accogliente ma evitare le decisioni difficili"}.\n${name2} (${tipo2}, ${atNome2}): Il suo stile genitoriale riflette il driver «${spinta2}». Tende a ${t2 === 1 ? "imporre regole rigide e aspettative elevate" : t2 === 2 ? "essere iperprotettiva e dare attenzione costante" : t2 === 3 ? "spingere verso il successo e l'autonomia" : t2 === 4 ? "valorizzare l'espressione emotiva e la creatività" : t2 === 5 ? "dare spazio e autonomia, a volte troppa distanza" : t2 === 6 ? "proteggere e controllare, con ansia per la sicurezza" : t2 === 7 ? "proporre attività stimolanti ma evitare la disciplina" : t2 === 8 ? "proteggere con forza ma con disciplina molto dura" : "essere accogliente ma evitare le decisioni difficili"}.`,
      puntoCritico: `Lo scontro si accende quando si discute di ${tipo.includes("Affidamento") ? "tempi e modalità dell'affidamento" : "decisioni importanti per i figli (scuola, salute, tempo libero)"}. Ciascun genitore proietta le proprie paure e i propri bisogni sui figli.`,
      obiettivoFormativo: `Spostare il focus dai bisogni dei genitori a quelli dei figli. Riconoscere come ciascun adattamento AT influenza lo stile genitoriale e trovare un equilibrio.`,
      suggerimentiMediatore: `Usare la tecnica del «figlio al centro»: chiedere a ciascun genitore di descrivere cosa vuole il figlio (non cosa vuole il genitore per il figlio). Aiutare ${name1} a ${t1 <= 3 ? "allentare il controllo e ascoltare i bisogni reali" : t1 <= 6 ? "uscire dalla propria testa e connettersi emotivamente" : "assumersi responsabilità concrete e durature"}. Aiutare ${name2} a ${t2 <= 3 ? "allentare il controllo e ascoltare i bisogni reali" : t2 <= 6 ? "uscire dalla propria testa e connettersi emotivamente" : "assumersi responsabilità concrete e durature"}.`,
    });
  } else {
    scenarios.push({
      titolo: `Il patrimonio e i sentimenti: ${tipo.toLowerCase()}`,
      contesto: `La questione patrimoniale ed economica è diventata il campo di battaglia emotivo per ${name1} e ${name2}. Il denaro è diventato il simbolo del conflitto relazionale sottostante.`,
      parti: `${name1} (${tipo1}, ${atNome1}): Per questo tipo, il denaro rappresenta ${t1 === 1 ? "equità e giustizia" : t1 === 2 ? "cura e dedizione" : t1 === 3 ? "valore e successo personale" : t1 === 4 ? "riconoscimento della sofferenza" : t1 === 5 ? "sicurezza e autonomia" : t1 === 6 ? "stabilità e prevedibilità" : t1 === 7 ? "libertà e opportunità" : t1 === 8 ? "potere e rispetto" : "pace e stabilità"}. La spinta «${spinta1}» orienta le sue richieste.\n${name2} (${tipo2}, ${atNome2}): Per questo tipo, il denaro rappresenta ${t2 === 1 ? "equità e giustizia" : t2 === 2 ? "cura e dedizione" : t2 === 3 ? "valore e successo personale" : t2 === 4 ? "riconoscimento della sofferenza" : t2 === 5 ? "sicurezza e autonomia" : t2 === 6 ? "stabilità e prevedibilità" : t2 === 7 ? "libertà e opportunità" : t2 === 8 ? "potere e rispetto" : "pace e stabilità"}. La spinta «${spinta2}» orienta le sue richieste.`,
      puntoCritico: `Il punto critico è quando le richieste economiche rivelano i bisogni emotivi non detti. ${name1} in realtà chiede ${at1?.nome === "Ossessivo-compulsivo" ? "riconoscimento del proprio impegno" : at1?.nome === "Istrionico" ? "prova d'amore" : at1?.nome === "Paranoide" ? "garanzie di sicurezza" : at1?.nome === "Schizoide" ? "indipendenza" : at1?.nome === "Passivo-aggressivo" ? "libertà di scelta" : at1?.nome === "Antisociale" ? "rispetto e potere" : "qualcosa di più profondo"}. ${name2} in realtà chiede ${at2?.nome === "Ossessivo-compulsivo" ? "riconoscimento del proprio impegno" : at2?.nome === "Istrionico" ? "prova d'amore" : at2?.nome === "Paranoide" ? "garanzie di sicurezza" : at2?.nome === "Schizoide" ? "indipendenza" : at2?.nome === "Passivo-aggressivo" ? "libertà di scelta" : at2?.nome === "Antisociale" ? "rispetto e potere" : "qualcosa di più profondo"}.`,
      obiettivoFormativo: `Separare le questioni materiali da quelle emotive. Praticare il passaggio dalle posizioni agli interessi profondi legati all'adattamento AT.`,
      suggerimentiMediatore: `Utilizzare la tecnica della «doppia lavagna»: su una scrivere le richieste materiali, sull'altra i bisogni emotivi sottostanti. Mostrare alle parti che le richieste economiche sono il sintomo, non la causa. Con ${name1}: ${at1?.rapport || "approccio empatico"}. Con ${name2}: ${at2?.rapport || "approccio empatico"}.`,
    });
  }

  // Scenario 3: Communication rebuilding
  scenarios.push({
    titolo: `Ricostruire il ponte: dal conflitto alla co-genitorialità`,
    contesto: `Dopo le sessioni iniziali, ${name1} e ${name2} hanno accettato la necessità di una comunicazione funzionale${figliInfo ? ` per il bene dei figli (${figliInfo})` : ""}. Ma le ferite emotive rendono ogni interazione un campo minato.`,
    parti: `${name1} (${tipo1}, ${atNome1}): La porta aperta (${porta1}) è il canale migliore per ristabilire la comunicazione. Le ingiunzioni ricevute nell'infanzia (${at1?.ingiunzioni?.slice(0, 2).join(", ") || "non specificate"}) influenzano il suo modo di stare nella relazione.\n${name2} (${tipo2}, ${atNome2}): La porta aperta (${porta2}) è il canale migliore per ristabilire la comunicazione. Le ingiunzioni ricevute nell'infanzia (${at2?.ingiunzioni?.slice(0, 2).join(", ") || "non specificate"}) influenzano il suo modo di stare nella relazione.`,
    puntoCritico: `Il punto critico è quando uno dei due ricade nei vecchi pattern relazionali. ${name1} attiva il gioco «${at1?.giocoPsicologico || "non specificato"}» e ${name2} risponde con «${at2?.giocoPsicologico || "non specificato"}». Il ciclo si ripete a meno che il mediatore non intervenga.`,
    obiettivoFormativo: `Insegnare alle parti a riconoscere i propri giochi psicologici e a interromperli. Costruire un nuovo protocollo di comunicazione basato sulle porte aperte di ciascuno.`,
    suggerimentiMediatore: `Proporre un «contratto di comunicazione» personalizzato: ${name1} comunicherà attraverso ${porta1.toLowerCase()} e ${name2} attraverso ${porta2.toLowerCase()}. Insegnare la tecnica della riformulazione incrociata: ciascuno deve ripetere ciò che ha capito dell'altro prima di rispondere. Prevedere sessioni di follow-up per consolidare i nuovi pattern.`,
  });

  return scenarios;
}

// ── Family-specific additional sections ──

export function buildFamilyDynamics(
  profile1: PartyProfile,
  profile2: PartyProfile,
): string {
  const at1 = profile1.at;
  const at2 = profile2.at;
  if (!at1 || !at2) return "Dati AT insufficienti.";

  let text = `${profile1.nome} (${at1.nome}, ${at1.tipo}):\n`;
  text += at1.tipo === "Adattamento di sopravvivenza"
    ? `Questo adattamento di sopravvivenza implica che i legami familiari sono vissuti con intensità e paura dell'abbandono. Le ingiunzioni («${at1.ingiunzioni.slice(0, 2).join("», «")}») influenzano profondamente il modo di vivere l'attaccamento. Il dilemma fondamentale è: «${at1.dilemma}».`
    : `Questo adattamento di performance implica che i legami familiari sono legati al valore personale e alla capacità di essere «abbastanza bravo/a». Le ingiunzioni («${at1.ingiunzioni.slice(0, 2).join("», «")}») creano un pattern relazionale basato sulla prestazione. Il dilemma fondamentale è: «${at1.dilemma}».`;

  text += `\n\n${profile2.nome} (${at2.nome}, ${at2.tipo}):\n`;
  text += at2.tipo === "Adattamento di sopravvivenza"
    ? `Questo adattamento di sopravvivenza implica che i legami familiari sono vissuti con intensità e paura dell'abbandono. Le ingiunzioni («${at2.ingiunzioni.slice(0, 2).join("», «")}») influenzano profondamente il modo di vivere l'attaccamento. Il dilemma fondamentale è: «${at2.dilemma}».`
    : `Questo adattamento di performance implica che i legami familiari sono legati al valore personale e alla capacità di essere «abbastanza bravo/a». Le ingiunzioni («${at2.ingiunzioni.slice(0, 2).join("», «")}») creano un pattern relazionale basato sulla prestazione. Il dilemma fondamentale è: «${at2.dilemma}».`;

  return text;
}

export function buildChildImpact(
  t1: number,
  t2: number,
  numFigli: string,
  etaFigli: string,
): string {
  const at1 = getATForEnneatipo(t1);
  const at2 = getATForEnneatipo(t2);
  if (!at1 || !at2) return "Dati AT insufficienti.";

  let text = `Il conflitto tra un genitore ${typeNames[t1]} (${at1.nome}) e un genitore ${typeNames[t2]} (${at2.nome}) può avere impatti specifici sui figli`;
  if (numFigli && etaFigli) text += ` (${numFigli} figli, ${etaFigli} anni)`;
  text += ".\n\n";

  text += `Rischio principale: i figli possono trovarsi intrappolati tra due modalità comunicative molto diverse. `;
  text += `Il genitore ${typeNames[t1]} tende a comunicare attraverso ${at1.portaAperta.toLowerCase()}, mentre il genitore ${typeNames[t2]} attraverso ${at2.portaAperta.toLowerCase()}. `;

  if (at1.portaAperta !== at2.portaAperta) {
    text += `Questa differenza costringe i figli ad adattarsi continuamente a linguaggi diversi, generando potenziale confusione e stress. `;
  }

  text += `\n\nIl mediatore deve osservare se i figli stanno sviluppando pattern di «triangolazione» (alleanza con un genitore contro l'altro). `;
  text += `In particolare, attenzione a:\n`;
  text += `• Il genitore ${typeNames[t1]} potrebbe involontariamente ${t1 === 1 ? "caricare i figli di aspettative eccessive" : t1 === 2 ? "rendere i figli dipendenti emotivamente" : t1 === 3 ? "spingere i figli a «scegliere il vincente»" : t1 === 4 ? "coinvolgere emotivamente i figli nel proprio dolore" : t1 === 5 ? "distaccarsi emotivamente dai figli in momenti critici" : t1 === 6 ? "trasmettere ansia e insicurezza ai figli" : t1 === 7 ? "minimizzare la sofferenza dei figli" : t1 === 8 ? "chiedere ai figli di «schierarsi»" : "evitare di affrontare i problemi con i figli"}\n`;
  text += `• Il genitore ${typeNames[t2]} potrebbe involontariamente ${t2 === 1 ? "caricare i figli di aspettative eccessive" : t2 === 2 ? "rendere i figli dipendenti emotivamente" : t2 === 3 ? "spingere i figli a «scegliere il vincente»" : t2 === 4 ? "coinvolgere emotivamente i figli nel proprio dolore" : t2 === 5 ? "distaccarsi emotivamente dai figli in momenti critici" : t2 === 6 ? "trasmettere ansia e insicurezza ai figli" : t2 === 7 ? "minimizzare la sofferenza dei figli" : t2 === 8 ? "chiedere ai figli di «schierarsi»" : "evitare di affrontare i problemi con i figli"}`;

  return text;
}

export function buildEmotionalManagement(
  profile1: PartyProfile,
  profile2: PartyProfile,
): string {
  const at1 = profile1.at;
  const at2 = profile2.at;
  if (!at1 || !at2) return "Dati AT insufficienti.";

  let text = `La mediazione familiare è intrinsecamente più emotiva di quella civile. Ecco le tecniche specifiche per ciascuna parte:\n\n`;

  text += `${profile1.nome} (${at1.nome}):\n`;
  text += `• Reazione sotto stress: ${at1.diFronteAMinaccia}\n`;
  text += `• Struttura tempo preferita: ${at1.strutturaTempoPreferita} — sfruttarla per creare un contesto confortevole\n`;
  text += `• Struttura tempo evitata: ${at1.strutturaTempoEvitata} — evitarla per non innescare difese\n`;
  text += `• Stato dell'Io predominante: ${at1.statoIo}\n`;
  text += `• Tecnica di contenimento: ${at1.portaAperta.toLowerCase() === "emozioni" ? "Non bloccare le emozioni ma canalizzarle. Usare la riformulazione empatica." : at1.portaAperta.toLowerCase() === "pensiero" ? "Offrire un quadro razionale delle emozioni. Normalizzare il dolore con dati e riferimenti." : "Proporre un'azione concreta per gestire l'emozione (es. pausa, cambio di argomento, esercizio di respirazione)."}\n`;

  text += `\n${profile2.nome} (${at2.nome}):\n`;
  text += `• Reazione sotto stress: ${at2.diFronteAMinaccia}\n`;
  text += `• Struttura tempo preferita: ${at2.strutturaTempoPreferita} — sfruttarla per creare un contesto confortevole\n`;
  text += `• Struttura tempo evitata: ${at2.strutturaTempoEvitata} — evitarla per non innescare difese\n`;
  text += `• Stato dell'Io predominante: ${at2.statoIo}\n`;
  text += `• Tecnica di contenimento: ${at2.portaAperta.toLowerCase() === "emozioni" ? "Non bloccare le emozioni ma canalizzarle. Usare la riformulazione empatica." : at2.portaAperta.toLowerCase() === "pensiero" ? "Offrire un quadro razionale delle emozioni. Normalizzare il dolore con dati e riferimenti." : "Proporre un'azione concreta per gestire l'emozione (es. pausa, cambio di argomento, esercizio di respirazione)."}`;

  return text;
}

export function buildCommunicationRebuilding(
  profile1: PartyProfile,
  profile2: PartyProfile,
): string {
  const at1 = profile1.at;
  const at2 = profile2.at;
  if (!at1 || !at2) return "Dati AT insufficienti.";

  let text = `Ricostruire la comunicazione tra ${profile1.nome} (${at1.nome}) e ${profile2.nome} (${at2.nome}) richiede un approccio strutturato:\n\n`;

  text += `1. Protocollo porte: ${profile1.nome} deve imparare ad accedere alla porta aperta di ${profile2.nome} (${at2.portaAperta.toLowerCase()}) e viceversa (${at1.portaAperta.toLowerCase()}). Il mediatore modella questa comunicazione incrociata.\n\n`;

  text += `2. Obiettivi terapeutici da perseguire nella mediazione:\n`;
  text += `   Per ${profile1.nome}: ${at1.obiettiviTerapia.slice(0, 2).map(o => `«${o}»`).join(", ")}\n`;
  text += `   Per ${profile2.nome}: ${at2.obiettiviTerapia.slice(0, 2).map(o => `«${o}»`).join(", ")}\n\n`;

  text += `3. Superamento delle ingiunzioni:\n`;
  text += `   ${profile1.nome} porta le ingiunzioni «${at1.ingiunzioni.slice(0, 2).join("», «")}» che gli/le impediscono di comunicare liberamente.\n`;
  text += `   ${profile2.nome} porta le ingiunzioni «${at2.ingiunzioni.slice(0, 2).join("», «")}» che gli/le impediscono di comunicare liberamente.\n\n`;

  text += `4. Contratto di comunicazione: stabilire regole chiare basate sulle porte aperte, con verifiche periodiche. Il mediatore aiuta entrambi a passare dallo Stato dell'Io del copione allo Stato dell'Io Adulto.`;

  return text;
}

// ── Public: generate simulations ──

export function generateCivilSimulations(
  t1: number,
  t2: number,
  tipoControversia: string,
): SimulationScenario[] {
  const at1 = getATForEnneatipo(t1);
  const at2 = getATForEnneatipo(t2);
  return buildCivilSimulations(t1, t2, at1, at2, tipoControversia);
}

export function generateFamilySimulations(
  t1: number,
  t2: number,
  tipoMediazione: string,
  figliCoinvolti: boolean,
  numFigli: string,
  etaFigli: string,
): SimulationScenario[] {
  const at1 = getATForEnneatipo(t1);
  const at2 = getATForEnneatipo(t2);
  return buildFamilySimulations(t1, t2, at1, at2, tipoMediazione, figliCoinvolti, numFigli, etaFigli);
}

// ── Dispute types ──

export const tipiControversiaCivileList = [
  "Contratti", "Diritti reali", "Condominio", "Successioni",
  "Locazioni", "Risarcimento danni", "Rapporti commerciali", "Altro",
];

export const tipiMediazioneFamiliareList = [
  "Separazione/Divorzio", "Affidamento figli", "Gestione patrimonio",
  "Conflitto genitori-figli", "Conflitto tra fratelli", "Successione ereditaria", "Altro",
];

export const ruoliFamiliari = [
  "Coniuge/Partner", "Genitore", "Figlio/a", "Fratello/Sorella",
];

export const sottotipi = ["Conservativo", "Sociale", "Sessuale"];
