// Percorsi di Vita - Dati completi dei percorsi evolutivi per ogni enneatipo
// Estratti dal Prontuario dell'Enneagramma Evolutivo

export interface JourneyPhase {
  eta: string;
  enneatipo: number;
  dignita: string;
  virtu: string;
  vizio: string;
  gerarchia: string;
  musa: string;
  facolta: string;
  melodia: string;
  topica: string;
  meccanismoDifesa: string;
  chakra: string;
  pianeta: string;
  correlazioneCerebrale: string;
  ideaSacra: string;
}

export interface Journey {
  enneatipo: number;
  percorso: number;
  tipo: "esagramma" | "triangolo";
  sequenza: number[];
  principio: string;
  virtuPartenza: string;
  vizioPartenza: string;
  influenzaIniziale: string;
  vak: string;
  facolta: string;
  musaPartenza: string;
  domandaPartenza: string;
  puntoStallo: string;
  topica: string;
  meccanismoDifesa: string;
  correlazioneCerebrale: string;
  adattamento: string;
  fasi: JourneyPhase[];
}

export interface ATAdaptation {
  nome: string;
  enneatipo: number;
  eysenck: string;
  tipo: string;
  descrizione: string;
  stileSociale: string;
  portaAperta: string;
  portaBersaglio: string;
  portaTrappola: string;
  spinta: string;
  ingiunzioni: string;
  giocoPsicologico: string;
  copione: string;
  dilemma: string;
  andatura: string;
  diFronteAMinaccia: string;
  stileComunicazione: string;
  obiettiviTerapia: string[];
  statoIo: string;
}

export interface EtaVita {
  numero: number;
  eta: string;
  nome: string;
  enneatipo: number;
  descrizione: string;
}

// Le 6 Età della Vita (dal Prontuario — tradizione antica + Freud + Erikson)
// Queste sono le fasce d'età usate nei percorsi dell'esagramma
export const etaVita: EtaVita[] = [
  { numero: 1, eta: "0-3", nome: "Infantia (Infanzia)", enneatipo: 0, descrizione: "Fase orale di fiducia/sfiducia (Erikson). Si forma il legame primario e l'attaccamento. Primo contatto con il proprio enneatipo di base." },
  { numero: 2, eta: "3-12", nome: "Pueritia (Puerizia)", enneatipo: 0, descrizione: "Spirito d'iniziativa e operosità opposti a senso di colpa e inferiorità (Erikson). Fase di latenza: il bambino sviluppa competenze e socialità." },
  { numero: 3, eta: "12-19", nome: "Adolescentia (Adolescenza)", enneatipo: 0, descrizione: "Età dell'identità o della dispersione dei ruoli (Erikson). Si affrontano le sfide della pubertà, si cerca sicurezza e appartenenza." },
  { numero: 4, eta: "20-30", nome: "Juventus (Gioventù)", enneatipo: 0, descrizione: "Giovane età adulta: intimità e solidarietà oppure isolamento (Erikson). Amore, amicizia e lavoro, o isolamento se fallite le fasi precedenti." },
  { numero: 5, eta: "25-60", nome: "Virilitas (Virilità)", enneatipo: 0, descrizione: "Generatività opposta a stagnazione e auto-assorbimento (Erikson). Si procrea, si cura, si costruisce — o si regredisce chiudendosi in un ruolo." },
  { numero: 6, eta: "60+", nome: "Senectutes (Vecchiaia)", enneatipo: 0, descrizione: "Integrità opposta a disperazione (Erikson). Riflessione e bilancio sulla vita; disperazione se si pensa a ciò che non si è potuto realizzare." },
];

// Adattamenti dell'Analisi Transazionale
export const adattamentiAT: ATAdaptation[] = [
  {
    nome: "Istrionico",
    enneatipo: 2,
    eysenck: "Estroverso",
    tipo: "Adattamento di performance",
    descrizione: "I genitori enfatizzano il fatto di far felici gli altri; il bambino cerca di mettersi al centro dell'attenzione",
    stileSociale: "Attivo socievole; attraente per gli altri",
    portaAperta: "Emozioni",
    portaBersaglio: "Pensiero",
    portaTrappola: "Comportamento",
    spinta: "Sono ok se compiaccio gli altri — Compiaci",
    ingiunzioni: "Non crescere, non pensare, non essere importante, non essere te stesso",
    giocoPsicologico: "Tutta colpa tua",
    copione: "Dopo",
    dilemma: "Se sono indipendente devo rinunciare al calore e al supporto",
    andatura: "Lievemente oscillante o con lieve rimbalzo ad ogni passo",
    diFronteAMinaccia: "Intensifica le emozioni",
    stileComunicazione: "Affettivo unitamente a emotivo",
    obiettiviTerapia: [
      "Sono amato anche se non sto al centro dell'attenzione",
      "Non è vero ciò che sento vero",
      "So agire e so pensare",
    ],
    statoIo: "Adulto contaminato dal Bambino",
  },
  {
    nome: "Ossessivo-compulsivo",
    enneatipo: 1,
    eysenck: "Introverso",
    tipo: "Adattamento di performance",
    descrizione: "Il genitore enfatizza il risultato; il bambino cerca di essere bravo per evitare vergogna e colpa",
    stileSociale: "Attivo ritirato; introverso nelle relazioni ma prende iniziativa per risolvere problemi",
    portaAperta: "Pensiero",
    portaBersaglio: "Emozioni",
    portaTrappola: "Comportamento",
    spinta: "Sono ok se sono perfetto",
    ingiunzioni: "Non essere un bambino, non sentire, non essere intimo, non essere importante, non divertirti",
    giocoPsicologico: "Tutta colpa tua",
    copione: "Finché + Quasi tipo 2 + Finale aperto",
    dilemma: "Posso essere libero se non perdo la testa e non mi arrendo completamente all'amore",
    andatura: "Tiene sotto controllo i movimenti eccessivi",
    diFronteAMinaccia: "Diventa iper-razionale",
    stileComunicazione: "Esplorativo e direttivo",
    obiettiviTerapia: [
      "Accetto di essere sufficientemente buono anche se non sono perfetto",
      "Devo stare bene anche se non faccio niente",
      "Non devo vivere nella paura che qualcuno mi faccia notare un difetto",
    ],
    statoIo: "Adulto contaminato dal Genitore",
  },
  {
    nome: "Paranoide",
    enneatipo: 6,
    eysenck: "Introverso",
    tipo: "Adattamento di sopravvivenza",
    descrizione: "Non sapendo che cosa aspettarsi, vigilerà e controllerà tutta la vita",
    stileSociale: "A cavallo tra attivo e passivo ritirato",
    portaAperta: "Pensiero",
    portaBersaglio: "Emozioni",
    portaTrappola: "Comportamento",
    spinta: "Sono ok se sono forte e perfetto",
    ingiunzioni: "Non essere un bambino, non essere intimo, non fidarti, non sentire, non divertirti, non appartenere",
    giocoPsicologico: "Ti ho beccato figlio di puttana",
    copione: "Mai + Finché",
    dilemma: "Posso essere libero se non perdo la testa e non mi arrendo completamente all'amore",
    andatura: "In modo rigido come se avesse un palo d'acciaio nella schiena",
    diFronteAMinaccia: "Attacca con ragionamenti logici molto acuti",
    stileComunicazione: "Esplorativo insieme a direttivo",
    obiettiviTerapia: [
      "Anche se non controllo le cose non per questo vanno fuori controllo",
      "Devo imparare a confrontarmi con gli altri",
      "Devo imparare a verificare le mie percezioni con quelle degli altri",
    ],
    statoIo: "Adulto contaminato dal Genitore; Bambino escluso",
  },
  {
    nome: "Schizoide",
    enneatipo: 5,
    eysenck: "Introverso",
    tipo: "Adattamento di sopravvivenza",
    descrizione: "Ha genitori esitanti; si impone di non aver bisogno di loro e di farcela da solo",
    stileSociale: "Passivo ritirato",
    portaAperta: "Comportamento",
    portaBersaglio: "Pensiero",
    portaTrappola: "Emozioni",
    spinta: "Sono ok se sono forte e non sento",
    ingiunzioni: "Non farlo, non appartenere, non essere sano, non sentire, non divertirti, non crescere, non pensare",
    giocoPsicologico: "Tutta colpa tua",
    copione: "Mai + Sempre",
    dilemma: "Posso esistere sino a che non chiedo troppo",
    andatura: "Fiacco e poco coordinato nei movimenti",
    diFronteAMinaccia: "Tiene un basso profilo",
    stileComunicazione: "Direttivo",
    obiettiviTerapia: [
      "Devo prendermi cura di me come faccio con tutti gli altri",
      "Ho diritto come tutti ad avere uno spazio nel mondo",
      "È ok che io abbia bisogni ed emozioni e che gli altri le prendano in considerazione",
      "Posso avvicinarmi agli altri senza rinunciare a me stesso",
    ],
    statoIo: "Doppia contaminazione dell'Adulto (Bambino e Genitore)",
  },
  {
    nome: "Passivo-aggressivo",
    enneatipo: 9,
    eysenck: "Estroverso",
    tipo: "Adattamento di performance",
    descrizione: "Genitori ipercontrollanti; reazione: se non posso ottenere ciò che voglio posso impedire che lo ottieni tu",
    stileSociale: "Passivo socievole; ama appartenere al gruppo ma passivo davanti al problema",
    portaAperta: "Comportamento",
    portaBersaglio: "Emozioni",
    portaTrappola: "Pensiero",
    spinta: "Sei ok se ti sforzi, ma non devi riuscire",
    ingiunzioni: "Non crescere, non sentire, non farlo, non essere intimo, non divertirti",
    giocoPsicologico: "Perché non... sì ma",
    copione: "Sempre + Quasi tipo 2",
    dilemma: "Se faccio quel che voglio perdo il tuo amore. Per avere il tuo amore devo rinunciare a me stesso",
    andatura: "A scatti",
    diFronteAMinaccia: "Si lamenta, protesta, oppone resistenza",
    stileComunicazione: "Emotivo (ironia e battute)",
    obiettiviTerapia: [
      "Non si deve sempre combattere per sopravvivere",
      "Devo imparare a chiedere: gli altri mi daranno; posso essere cooperativo",
      "Devo sperimentare la libertà di sentirmi diverso e sentirmi OK",
    ],
    statoIo: "Doppia contaminazione dell'Adulto (Bambino e Genitore)",
  },
  {
    nome: "Antisociale",
    enneatipo: 8,
    eysenck: "Estroverso",
    tipo: "Adattamento di sopravvivenza",
    descrizione: "Ha subito atteggiamento anticipatorio dei genitori; sono ok se sono più furbo degli altri",
    stileSociale: "Sta in centro; oscilla tra agire/stare con altri e non fare/star da solo",
    portaAperta: "Comportamento",
    portaBersaglio: "Emozioni",
    portaTrappola: "Pensiero",
    spinta: "Sono ok se sono più furbo degli altri",
    ingiunzioni: "Non essere intimo, non sentire, non farlo, non pensare",
    giocoPsicologico: "Prova a riscuotere",
    copione: "Mai (Sempre, Quasi)",
    dilemma: "Posso esserti vicino se mi cedi la tua libertà e lasci che io ti usi o ti controlli",
    andatura: "Con il bacino in avanti pavoneggiandosi",
    diFronteAMinaccia: "Cerca di intimidire e sedurre per ottenere un vantaggio",
    stileComunicazione: "Direttivo, emotivo e affettivo a seconda dell'opportunità",
    obiettiviTerapia: [
      "Che cosa realmente vorresti che non puoi ottenere (e quindi inganni)?",
      "Troverai sempre qualcuno: non resterai solo e abbandonato",
      "Non c'è più bisogno di fingere",
      "Ora è il momento di diventare disponibili per gli altri e cooperare",
    ],
    statoIo: "Genitore escluso; Adulto contaminato dal Bambino",
  },
];

// Helper: attributi base per ogni enneatipo (necessari per costruire le fasi)
const attrBase: Record<number, { dignita: string; virtu: string; vizio: string; gerarchia: string; musa: string; facolta: string; melodia: string; topica: string; meccanismoDifesa: string; chakra: string; pianeta: string; correlazioneCerebrale: string; ideaSacra: string }> = {
  1: { dignita: "Grandezza", virtu: "Prudenza", vizio: "Gola", gerarchia: "Serafini", musa: "Urania", facolta: "Mente", melodia: "Re", topica: "Super-Io", meccanismoDifesa: "Formazione reattiva", chakra: "3 (sotto ombelico)", pianeta: "Marte", correlazioneCerebrale: "Amigdala", ideaSacra: "Perfezione" },
  2: { dignita: "Eternità", virtu: "Perseveranza", vizio: "Lussuria", gerarchia: "Cherubini", musa: "Polimnia", facolta: "Intelletto", melodia: "Mi", topica: "Io", meccanismoDifesa: "Rimozione", chakra: "6 (terzo occhio)", pianeta: "Sole", correlazioneCerebrale: "Talamo", ideaSacra: "Volontà" },
  3: { dignita: "Potenza", virtu: "Temperanza", vizio: "Superbia", gerarchia: "Troni", musa: "Euterpe", facolta: "Ragione", melodia: "-", topica: "Io", meccanismoDifesa: "Identificazione", chakra: "Ketu", pianeta: "Ketu", correlazioneCerebrale: "Testa del nucleo caudato", ideaSacra: "Armonia" },
  4: { dignita: "Sapienza", virtu: "Fede", vizio: "Accidia", gerarchia: "Dominazioni", musa: "Erato", facolta: "Immaginazione", melodia: "Fa", topica: "Io", meccanismoDifesa: "Introiezione", chakra: "5 (gola)", pianeta: "Mercurio", correlazioneCerebrale: "Nucleo subtalamico", ideaSacra: "Origine" },
  5: { dignita: "Volontà", virtu: "Speranza", vizio: "Invidia", gerarchia: "Potestà", musa: "Melpomene", facolta: "Udito", melodia: "Sol", topica: "Super-Io", meccanismoDifesa: "Isolamento", chakra: "1 (base spina dorsale)", pianeta: "Saturno", correlazioneCerebrale: "Putamen", ideaSacra: "Onniscienza" },
  6: { dignita: "Virtù", virtu: "Carità", vizio: "Ira", gerarchia: "Virtù", musa: "Tersicore", facolta: "Vista", melodia: "-", topica: "Super-Io", meccanismoDifesa: "Proiezione", chakra: "Ketu", pianeta: "Ketu", correlazioneCerebrale: "Coda del nucleo caudato", ideaSacra: "Forza" },
  7: { dignita: "Verità", virtu: "Pazienza", vizio: "Menzogna", gerarchia: "Principati", musa: "Calliope", facolta: "Olfatto", melodia: "La", topica: "Es", meccanismoDifesa: "Razionalizzazione", chakra: "2 (sopra genitali)", pianeta: "Giove", correlazioneCerebrale: "Globo pallido", ideaSacra: "Saggezza" },
  8: { dignita: "Gloria", virtu: "Pietà", vizio: "Incostanza", gerarchia: "Arcangeli", musa: "Clio", facolta: "Gusto", melodia: "Si", topica: "Es", meccanismoDifesa: "Diniego", chakra: "4 (cuore)", pianeta: "Venere", correlazioneCerebrale: "Pars Reticolare e Substantia Nigra", ideaSacra: "Verità" },
  9: { dignita: "Bontà", virtu: "Giustizia", vizio: "Avarizia", gerarchia: "Angeli Custodi", musa: "Talia", facolta: "Tatto", melodia: "Do", topica: "Es", meccanismoDifesa: "Narcotizzazione", chakra: "7 (parte superiore testa)", pianeta: "Luna", correlazioneCerebrale: "Ipotalamo", ideaSacra: "Amore" },
};

function makePhase(eta: string, enneatipoNum: number): JourneyPhase {
  const a = attrBase[enneatipoNum];
  return { eta, enneatipo: enneatipoNum, ...a };
}

// Fasce d'età per esagramma e triangolo
const etaEsagramma = ["0-3", "3-12", "12-19", "20-30", "25-60", "60+"];
const etaTriangolo = ["0-30", "25-60", "60+"];

// Tutti i 18 percorsi (9 enneatipi × 2 percorsi)
export const journeys: Journey[] = [
  // ══════════════════════════════════════════
  // ENNEATIPO 1
  // ══════════════════════════════════════════
  {
    enneatipo: 1, percorso: 1, tipo: "esagramma",
    sequenza: [1, 4, 2, 8, 5, 7],
    principio: "Grandezza", virtuPartenza: "Prudenza", vizioPartenza: "Gola",
    influenzaIniziale: "Serafini", vak: "VA", facolta: "Mente",
    musaPartenza: "Urania, Musa dell'astronomia e della geometria",
    domandaPartenza: "Che cosa?", puntoStallo: "Tra i 3 e i 19 anni",
    topica: "Super-Io", meccanismoDifesa: "Formazione reattiva",
    correlazioneCerebrale: "Amigdala", adattamento: "Ossessivo-compulsivo",
    fasi: [1, 4, 2, 8, 5, 7].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  {
    enneatipo: 1, percorso: 2, tipo: "esagramma",
    sequenza: [1, 7, 5, 8, 2, 4],
    principio: "Grandezza", virtuPartenza: "Prudenza", vizioPartenza: "Gola",
    influenzaIniziale: "Serafini", vak: "VA", facolta: "Mente",
    musaPartenza: "Urania, Musa dell'astronomia e della geometria",
    domandaPartenza: "Che cosa?", puntoStallo: "Tra i 25 e i 60 anni",
    topica: "Super-Io", meccanismoDifesa: "Formazione reattiva",
    correlazioneCerebrale: "Amigdala", adattamento: "Ossessivo-compulsivo",
    fasi: [1, 7, 5, 8, 2, 4].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  // ══════════════════════════════════════════
  // ENNEATIPO 2
  // ══════════════════════════════════════════
  {
    enneatipo: 2, percorso: 1, tipo: "esagramma",
    sequenza: [2, 4, 1, 7, 5, 8],
    principio: "Eternità", virtuPartenza: "Perseveranza", vizioPartenza: "Lussuria",
    influenzaIniziale: "Cherubini", vak: "KV", facolta: "Intelletto",
    musaPartenza: "Polimnia, Musa della memoria e della retorica",
    domandaPartenza: "Di che cosa?", puntoStallo: "Dai 0 ai 3 anni e dopo i 60 anni",
    topica: "Io", meccanismoDifesa: "Rimozione",
    correlazioneCerebrale: "Talamo", adattamento: "Istrionico/passivo aggressivo",
    fasi: [2, 4, 1, 7, 5, 8].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  {
    enneatipo: 2, percorso: 2, tipo: "esagramma",
    sequenza: [2, 8, 5, 7, 1, 4],
    principio: "Eternità", virtuPartenza: "Perseveranza", vizioPartenza: "Lussuria",
    influenzaIniziale: "Cherubini", vak: "KV", facolta: "Intelletto",
    musaPartenza: "Polimnia, Musa della memoria e della retorica",
    domandaPartenza: "Di che cosa?", puntoStallo: "0-12 anni",
    topica: "Io", meccanismoDifesa: "Rimozione",
    correlazioneCerebrale: "Talamo", adattamento: "Istrionico/passivo aggressivo",
    fasi: [2, 8, 5, 7, 1, 4].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  // ══════════════════════════════════════════
  // ENNEATIPO 3
  // ══════════════════════════════════════════
  {
    enneatipo: 3, percorso: 1, tipo: "triangolo",
    sequenza: [3, 9, 6],
    principio: "Potenza", virtuPartenza: "Temperanza", vizioPartenza: "Superbia",
    influenzaIniziale: "Troni", vak: "VK", facolta: "Ragione",
    musaPartenza: "Euterpe, Musa della musica",
    domandaPartenza: "Perché?", puntoStallo: "25-60 anni",
    topica: "Io", meccanismoDifesa: "Identificazione",
    correlazioneCerebrale: "Testa del nucleo caudato", adattamento: "Ossessivo-compulsivo (enfasi risultati)",
    fasi: [3, 9, 6].map((e, i) => makePhase(etaTriangolo[i], e)),
  },
  {
    enneatipo: 3, percorso: 2, tipo: "triangolo",
    sequenza: [3, 6, 9],
    principio: "Potenza", virtuPartenza: "Temperanza", vizioPartenza: "Superbia",
    influenzaIniziale: "Troni", vak: "VK", facolta: "Ragione",
    musaPartenza: "Euterpe, Musa della musica",
    domandaPartenza: "Perché?", puntoStallo: "0-30 e 0-60 anni",
    topica: "Io", meccanismoDifesa: "Identificazione",
    correlazioneCerebrale: "Testa del nucleo caudato", adattamento: "Ossessivo-compulsivo (enfasi risultati)",
    fasi: [3, 6, 9].map((e, i) => makePhase(etaTriangolo[i], e)),
  },
  // ══════════════════════════════════════════
  // ENNEATIPO 4
  // ══════════════════════════════════════════
  {
    enneatipo: 4, percorso: 1, tipo: "esagramma",
    sequenza: [4, 1, 7, 5, 8, 2],
    principio: "Sapienza", virtuPartenza: "Fede", vizioPartenza: "Accidia",
    influenzaIniziale: "Dominazioni", vak: "KA", facolta: "Immaginazione",
    musaPartenza: "Erato, Musa del canto corale e della poesia amorosa",
    domandaPartenza: "Quanto?", puntoStallo: "25-60 anni",
    topica: "Io", meccanismoDifesa: "Introiezione",
    correlazioneCerebrale: "Nucleo subtalamico", adattamento: "-",
    fasi: [4, 1, 7, 5, 8, 2].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  {
    enneatipo: 4, percorso: 2, tipo: "esagramma",
    sequenza: [4, 2, 8, 5, 7, 1],
    principio: "Sapienza", virtuPartenza: "Fede", vizioPartenza: "Accidia",
    influenzaIniziale: "Dominazioni", vak: "KA", facolta: "Immaginazione",
    musaPartenza: "Erato, Musa del canto corale e della poesia amorosa",
    domandaPartenza: "Quanto?", puntoStallo: "0-12 anni",
    topica: "Io", meccanismoDifesa: "Introiezione",
    correlazioneCerebrale: "Nucleo subtalamico", adattamento: "-",
    fasi: [4, 2, 8, 5, 7, 1].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  // ══════════════════════════════════════════
  // ENNEATIPO 5
  // ══════════════════════════════════════════
  {
    enneatipo: 5, percorso: 1, tipo: "esagramma",
    sequenza: [5, 7, 1, 4, 2, 8],
    principio: "Volontà", virtuPartenza: "Speranza", vizioPartenza: "Invidia",
    influenzaIniziale: "Potestà", vak: "AV", facolta: "Udito",
    musaPartenza: "Melpomene, Musa della tragedia",
    domandaPartenza: "Quale?", puntoStallo: "Dai 20-30 e dopo i 60",
    topica: "Super-Io", meccanismoDifesa: "Isolamento",
    correlazioneCerebrale: "Putamen", adattamento: "Schizoide",
    fasi: [5, 7, 1, 4, 2, 8].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  {
    enneatipo: 5, percorso: 2, tipo: "esagramma",
    sequenza: [5, 8, 2, 4, 1, 7],
    principio: "Volontà", virtuPartenza: "Speranza", vizioPartenza: "Invidia",
    influenzaIniziale: "Potestà", vak: "AV", facolta: "Udito",
    musaPartenza: "Melpomene, Musa della tragedia",
    domandaPartenza: "Quale?", puntoStallo: "12-30 e dai 25 in poi",
    topica: "Super-Io", meccanismoDifesa: "Isolamento",
    correlazioneCerebrale: "Putamen", adattamento: "Schizoide",
    fasi: [5, 8, 2, 4, 1, 7].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  // ══════════════════════════════════════════
  // ENNEATIPO 6
  // ══════════════════════════════════════════
  {
    enneatipo: 6, percorso: 1, tipo: "triangolo",
    sequenza: [6, 9, 3],
    principio: "Virtù", virtuPartenza: "Carità", vizioPartenza: "Ira",
    influenzaIniziale: "Virtù", vak: "AV", facolta: "Vista",
    musaPartenza: "Tersicore, Musa della danza",
    domandaPartenza: "Quando?", puntoStallo: "0-30 anni",
    topica: "Super-Io", meccanismoDifesa: "Proiezione",
    correlazioneCerebrale: "Coda del nucleo caudato", adattamento: "Paranoide",
    fasi: [6, 9, 3].map((e, i) => makePhase(etaTriangolo[i], e)),
  },
  {
    enneatipo: 6, percorso: 2, tipo: "triangolo",
    sequenza: [6, 3, 9],
    principio: "Virtù", virtuPartenza: "Carità", vizioPartenza: "Ira",
    influenzaIniziale: "Virtù", vak: "AV", facolta: "Vista",
    musaPartenza: "Tersicore, Musa della danza",
    domandaPartenza: "Quando?", puntoStallo: "25-60 anni",
    topica: "Super-Io", meccanismoDifesa: "Proiezione",
    correlazioneCerebrale: "Coda del nucleo caudato", adattamento: "Paranoide",
    fasi: [6, 3, 9].map((e, i) => makePhase(etaTriangolo[i], e)),
  },
  // ══════════════════════════════════════════
  // ENNEATIPO 7
  // ══════════════════════════════════════════
  {
    enneatipo: 7, percorso: 1, tipo: "esagramma",
    sequenza: [7, 1, 4, 2, 8, 5],
    principio: "Verità", virtuPartenza: "Pazienza", vizioPartenza: "Menzogna",
    influenzaIniziale: "Principati", vak: "VK", facolta: "Olfatto",
    musaPartenza: "Calliope, Musa della poesia epica",
    domandaPartenza: "Dove?", puntoStallo: "12-30 anni",
    topica: "Es", meccanismoDifesa: "Razionalizzazione",
    correlazioneCerebrale: "Globo pallido", adattamento: "Istrionico",
    fasi: [7, 1, 4, 2, 8, 5].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  {
    enneatipo: 7, percorso: 2, tipo: "esagramma",
    sequenza: [7, 5, 8, 2, 4, 1],
    principio: "Verità", virtuPartenza: "Pazienza", vizioPartenza: "Menzogna",
    influenzaIniziale: "Principati", vak: "VK", facolta: "Olfatto",
    musaPartenza: "Calliope, Musa della poesia epica",
    domandaPartenza: "Dove?", puntoStallo: "-",
    topica: "Es", meccanismoDifesa: "Razionalizzazione",
    correlazioneCerebrale: "Globo pallido", adattamento: "Istrionico",
    fasi: [7, 5, 8, 2, 4, 1].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  // ══════════════════════════════════════════
  // ENNEATIPO 8
  // ══════════════════════════════════════════
  {
    enneatipo: 8, percorso: 1, tipo: "esagramma",
    sequenza: [8, 2, 4, 1, 7, 5],
    principio: "Gloria", virtuPartenza: "Pietà", vizioPartenza: "Incostanza",
    influenzaIniziale: "Arcangeli", vak: "AK", facolta: "Gusto",
    musaPartenza: "Clio, Musa della storia",
    domandaPartenza: "Come? Con chi?", puntoStallo: "-",
    topica: "Es", meccanismoDifesa: "Diniego",
    correlazioneCerebrale: "Pars Reticolare e Substantia Nigra", adattamento: "Antisociale",
    fasi: [8, 2, 4, 1, 7, 5].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  {
    enneatipo: 8, percorso: 2, tipo: "esagramma",
    sequenza: [8, 5, 7, 1, 4, 2],
    principio: "Gloria", virtuPartenza: "Pietà", vizioPartenza: "Incostanza",
    influenzaIniziale: "Arcangeli", vak: "AK", facolta: "Gusto",
    musaPartenza: "Clio, Musa della storia",
    domandaPartenza: "Come? Con chi?", puntoStallo: "-",
    topica: "Es", meccanismoDifesa: "Diniego",
    correlazioneCerebrale: "Pars Reticolare e Substantia Nigra", adattamento: "Antisociale",
    fasi: [8, 5, 7, 1, 4, 2].map((e, i) => makePhase(etaEsagramma[i], e)),
  },
  // ══════════════════════════════════════════
  // ENNEATIPO 9
  // ══════════════════════════════════════════
  {
    enneatipo: 9, percorso: 1, tipo: "triangolo",
    sequenza: [9, 3, 6],
    principio: "Bontà", virtuPartenza: "Giustizia", vizioPartenza: "Avarizia",
    influenzaIniziale: "Angeli Custodi", vak: "KA", facolta: "Tatto",
    musaPartenza: "Talia, Musa della poesia bucolica",
    domandaPartenza: "Di che si tratta?", puntoStallo: "-",
    topica: "Es", meccanismoDifesa: "Narcotizzazione",
    correlazioneCerebrale: "Ipotalamo", adattamento: "-",
    fasi: [9, 3, 6].map((e, i) => makePhase(etaTriangolo[i], e)),
  },
  {
    enneatipo: 9, percorso: 2, tipo: "triangolo",
    sequenza: [9, 6, 3],
    principio: "Bontà", virtuPartenza: "Giustizia", vizioPartenza: "Avarizia",
    influenzaIniziale: "Angeli Custodi", vak: "KA", facolta: "Tatto",
    musaPartenza: "Talia, Musa della poesia bucolica",
    domandaPartenza: "Di che si tratta?", puntoStallo: "-",
    topica: "Es", meccanismoDifesa: "Narcotizzazione",
    correlazioneCerebrale: "Ipotalamo", adattamento: "-",
    fasi: [9, 6, 3].map((e, i) => makePhase(etaTriangolo[i], e)),
  },
];

// Helper: trova i percorsi per un dato enneatipo
export function getJourneysForType(enneatipo: number): Journey[] {
  return journeys.filter(j => j.enneatipo === enneatipo);
}

// Helper: trova un percorso specifico
export function getJourney(enneatipo: number, percorso: number): Journey | undefined {
  return journeys.find(j => j.enneatipo === enneatipo && j.percorso === percorso);
}

// Helper: determina la fase corrente in base all'età
export function getCurrentPhase(journey: Journey, age: number): JourneyPhase | null {
  const fasi = journey.fasi;
  if (journey.tipo === "triangolo") {
    if (age <= 30) return fasi[0];
    if (age <= 60) return fasi[1];
    return fasi[2];
  }
  // esagramma
  if (age <= 3) return fasi[0];
  if (age <= 12) return fasi[1];
  if (age <= 19) return fasi[2];
  if (age <= 30) return fasi[3];
  if (age <= 60) return fasi[4];
  return fasi[5];
}

// Helper: indice della fase corrente
export function getCurrentPhaseIndex(journey: Journey, age: number): number {
  if (journey.tipo === "triangolo") {
    if (age <= 30) return 0;
    if (age <= 60) return 1;
    return 2;
  }
  if (age <= 3) return 0;
  if (age <= 12) return 1;
  if (age <= 19) return 2;
  if (age <= 30) return 3;
  if (age <= 60) return 4;
  return 5;
}

// Helper: trova attributi condivisi tra due fasi
export function findSharedAttributes(phase1: JourneyPhase, phase2: JourneyPhase): string[] {
  const shared: string[] = [];
  if (phase1.dignita === phase2.dignita) shared.push(`Dignità: ${phase1.dignita}`);
  if (phase1.virtu === phase2.virtu) shared.push(`Virtù: ${phase1.virtu}`);
  if (phase1.vizio === phase2.vizio) shared.push(`Vizio: ${phase1.vizio}`);
  if (phase1.gerarchia === phase2.gerarchia) shared.push(`Gerarchia: ${phase1.gerarchia}`);
  if (phase1.musa === phase2.musa) shared.push(`Musa: ${phase1.musa}`);
  if (phase1.facolta === phase2.facolta) shared.push(`Facoltà: ${phase1.facolta}`);
  if (phase1.melodia === phase2.melodia && phase1.melodia !== "-") shared.push(`Melodia: ${phase1.melodia}`);
  if (phase1.topica === phase2.topica) shared.push(`Topica: ${phase1.topica}`);
  if (phase1.meccanismoDifesa === phase2.meccanismoDifesa) shared.push(`Meccanismo di difesa: ${phase1.meccanismoDifesa}`);
  if (phase1.chakra === phase2.chakra) shared.push(`Chakra: ${phase1.chakra}`);
  if (phase1.pianeta === phase2.pianeta) shared.push(`Pianeta: ${phase1.pianeta}`);
  if (phase1.correlazioneCerebrale === phase2.correlazioneCerebrale) shared.push(`Correlazione cerebrale: ${phase1.correlazioneCerebrale}`);
  if (phase1.ideaSacra === phase2.ideaSacra) shared.push(`Idea sacra: ${phase1.ideaSacra}`);
  return shared;
}

// Helper: trova differenze tra due fasi
export function findDifferentAttributes(phase1: JourneyPhase, phase2: JourneyPhase): Array<{ attributo: string; persona1: string; persona2: string }> {
  const diffs: Array<{ attributo: string; persona1: string; persona2: string }> = [];
  const fields: Array<{ key: keyof JourneyPhase; label: string }> = [
    { key: "dignita", label: "Dignità" },
    { key: "virtu", label: "Virtù" },
    { key: "vizio", label: "Vizio" },
    { key: "gerarchia", label: "Gerarchia" },
    { key: "musa", label: "Musa" },
    { key: "facolta", label: "Facoltà" },
    { key: "melodia", label: "Melodia" },
    { key: "topica", label: "Topica" },
    { key: "meccanismoDifesa", label: "Meccanismo di difesa" },
    { key: "chakra", label: "Chakra" },
    { key: "pianeta", label: "Pianeta" },
    { key: "correlazioneCerebrale", label: "Correlazione cerebrale" },
    { key: "ideaSacra", label: "Idea sacra" },
  ];
  for (const f of fields) {
    const v1 = phase1[f.key] as string;
    const v2 = phase2[f.key] as string;
    if (v1 !== v2) {
      diffs.push({ attributo: f.label, persona1: v1, persona2: v2 });
    }
  }
  return diffs;
}

// Nomi degli enneatipi
export const typeNames: Record<number, string> = {
  1: "Il Perfezionista", 2: "L'Altruista", 3: "Il Realizzatore",
  4: "L'Individualista", 5: "L'Osservatore", 6: "Il Leale",
  7: "L'Entusiasta", 8: "Il Leader", 9: "Il Pacificatore",
};

// Emoji dei frutti
export const fruitEmoji: Record<number, string> = {
  1: "🍎", 2: "🍐", 3: "🍒", 4: "🫐",
  5: "🍇", 6: "🫐", 7: "🍍", 8: "🍑", 9: "🍓",
};
