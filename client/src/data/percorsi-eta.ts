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
  nomeAlternativo: string;
  enneatipo: number;
  enneatipiSecondari?: number[];
  eysenck: string;
  tipo: string;
  descrizione: string;
  stileSociale: string;
  portaAperta: string;
  portaBersaglio: string;
  portaTrappola: string;
  sequenzaPorte: string;
  spinta: string;
  ingiunzioni: string[];
  giocoPsicologico: string;
  copione: string;
  copioneMotto: string;
  copioneDescrizione: string;
  dilemma: string;
  andatura: string;
  diFronteAMinaccia: string;
  domandaConferma: string;
  stileComunicazione: string;
  rapport: string;
  obiettiviTerapia: string[];
  statoIo: string;
  contaminazioneAdulto: string;
  strutturaTempoPreferita: string;
  strutturaTempoEvitata: string;
}

// Mapping enneatipo → adattamento principale
export const enneatipoATMapping: Record<number, { adattamento: string; adattamentoSecondario?: string }> = {
  1: { adattamento: "Ossessivo-compulsivo" },
  2: { adattamento: "Istrionico", adattamentoSecondario: "Passivo-aggressivo" },
  3: { adattamento: "Istrionico" }, // Isteria → simile a Istrionico nella performance
  4: { adattamento: "Borderline" }, // Adattamento anomalo
  5: { adattamento: "Schizoide" },
  6: { adattamento: "Paranoide" },
  7: { adattamento: "Narcisista" }, // Adattamento anomalo
  8: { adattamento: "Antisociale", adattamentoSecondario: "Narcisista" },
  9: { adattamento: "Passivo-aggressivo" },
};

// Helper: trova l'adattamento AT per un enneatipo
export function getATForEnneatipo(enneatipo: number): ATAdaptation | undefined {
  const mapping = enneatipoATMapping[enneatipo];
  if (!mapping) return undefined;
  return adattamentiAT.find(a => a.nome === mapping.adattamento)
    || adattamentiAT.find(a => a.enneatipo === enneatipo);
}

// Helper: trova tutti gli adattamenti rilevanti per un enneatipo
export function getATListForEnneatipo(enneatipo: number): ATAdaptation[] {
  const mapping = enneatipoATMapping[enneatipo];
  if (!mapping) return [];
  const primary = adattamentiAT.find(a => a.nome === mapping.adattamento);
  const secondary = mapping.adattamentoSecondario
    ? adattamentiAT.find(a => a.nome === mapping.adattamentoSecondario)
    : undefined;
  return [primary, secondary].filter(Boolean) as ATAdaptation[];
}

// Disclaimer AT obbligatorio
export const AT_DISCLAIMER = "La terminologia degli adattamenti serve unicamente a facilitare il riconoscimento degli stili di personalità. Non si tratta di diagnosi cliniche.";

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

// Adattamenti dell'Analisi Transazionale (dati completi dal Prontuario)
export const adattamentiAT: ATAdaptation[] = [
  {
    nome: "Istrionico",
    nomeAlternativo: "Entusiasta-iperreattivo",
    enneatipo: 2,
    enneatipiSecondari: [3, 7],
    eysenck: "Estroverso",
    tipo: "Adattamento di performance",
    descrizione: "I genitori enfatizzano il fatto di far felici gli altri: il bambino cerca di mettersi al centro dell'attenzione e di intrattenere gli altri, ma non cresce nel pensiero. Tende ad equiparare amore e attenzione. È iperreattivo.",
    stileSociale: "Attivo socievole — è attraente per gli altri («l'anima della festa»)",
    portaAperta: "Emozioni",
    portaBersaglio: "Pensiero",
    portaTrappola: "Comportamento",
    sequenzaPorte: "e.p.c.",
    spinta: "Compiaci",
    ingiunzioni: ["Non crescere", "Non pensare", "Non essere importante", "Non essere te stesso"],
    giocoPsicologico: "Tutta colpa tua",
    copione: "Dopo",
    copioneMotto: "Posso divertirmi oggi, ma dovrò pagarlo domani",
    copioneDescrizione: "Si concede qualcosa di buono, ma poi si punisce con qualcosa di spiacevole. Può essere anche «Quasi tipo I» (inizia un progetto ma poi non riesce a finire) e «Quasi tipo II» (finisce un progetto e ne inizia subito un altro).",
    dilemma: "Se sono indipendente devo rinunciare al calore e al supporto",
    andatura: "Lievemente oscillante o con lieve rimbalzo ad ogni passo",
    diFronteAMinaccia: "Intensifica le emozioni",
    domandaConferma: "Si impegna a fare in modo che le persone che la circondano siano felici e serene?",
    stileComunicazione: "Lo stile affettivo unitamente a quello emotivo è indicato per comunicare con l'Istrionico",
    rapport: "Premura ed essere divertenti",
    obiettiviTerapia: [
      "Sono amato anche se non sto al centro dell'attenzione",
      "Non è vero ciò che sento vero",
      "So agire e so pensare",
    ],
    statoIo: "Adulto contaminato dal Bambino",
    contaminazioneAdulto: "L'Adulto è contaminato dal Bambino: le emozioni distorcono il pensiero razionale",
    strutturaTempoPreferita: "Passatempi, giochi e intimità",
    strutturaTempoEvitata: "Rituali",
  },
  {
    nome: "Ossessivo-compulsivo",
    nomeAlternativo: "Responsabile-stakanovista",
    enneatipo: 1,
    enneatipiSecondari: [3],
    eysenck: "Introverso",
    tipo: "Adattamento di performance",
    descrizione: "Il genitore enfatizza il risultato: il bambino cerca di essere bravo per evitare di vergognarsi e di sentirsi in colpa. Mantiene la parola data ed è considerato un pilastro sociale. Non sa porre limite alla sua responsabilità.",
    stileSociale: "Attivo ritirato — introverso nelle relazioni, ma prende iniziativa per risolvere i problemi e per relazionarsi con pochi",
    portaAperta: "Pensiero",
    portaBersaglio: "Emozioni",
    portaTrappola: "Comportamento",
    sequenzaPorte: "p.e.c.",
    spinta: "Sii perfetto",
    ingiunzioni: ["Non essere un bambino", "Non sentire", "Non essere intimo", "Non essere importante", "Non divertirti"],
    giocoPsicologico: "Tutta colpa tua",
    copione: "Finché",
    copioneMotto: "Non mi posso divertire finché non ho fatto il mio lavoro",
    copioneDescrizione: "Si trattiene dal provare piacere sino a che qualcosa di spiacevole non è stato completato. Può essere anche «Quasi tipo 2» (finisce un progetto e ne inizia subito un altro, senza darsi tregua) e «Finale aperto» (raggiunge un certo punto nella vita, dopo di che trova il vuoto).",
    dilemma: "Posso essere libero se non perdo la testa e non mi arrendo completamente all'amore",
    andatura: "Tiene sotto controllo i movimenti eccessivi",
    diFronteAMinaccia: "Diventa iper-razionale",
    domandaConferma: "Fa del suo meglio per essere bravo a fare ogni cosa nel modo giusto?",
    stileComunicazione: "L'esplorativo e il direttivo sono stili utili per comunicare con questo adattamento",
    rapport: "Aggancio a livello cognitivo e aiuto a liberare emozioni (premura e gioco)",
    obiettiviTerapia: [
      "Accetto di essere sufficientemente buono anche se non sono perfetto",
      "Devo stare bene anche se non faccio niente",
      "Non devo vivere nella paura che qualcuno mi faccia notare un difetto",
    ],
    statoIo: "Adulto contaminato dal Genitore (dai pregiudizi)",
    contaminazioneAdulto: "L'Adulto è contaminato dal Genitore: i pregiudizi e le regole interiorizzate distorcono la percezione della realtà",
    strutturaTempoPreferita: "Attività, giochi, intimità",
    strutturaTempoEvitata: "Rituali",
  },
  {
    nome: "Paranoide",
    nomeAlternativo: "Brillante-scettico",
    enneatipo: 6,
    eysenck: "Introverso",
    tipo: "Adattamento di sopravvivenza",
    descrizione: "Genitori inconsistenti che reagiscono in modo imprevedibile: non sapendo che cosa aspettarsi, vigilerà e controllerà tutta la vita. Devono recuperare le sicurezze perdute da piccoli. Brillanti pensatori, giuristi, organizzatori, controllori; svalutano a torto.",
    stileSociale: "A cavallo tra attivo e passivo ritirato — prima di assumere una posizione attiva o passiva si ritira e valuta la situazione",
    portaAperta: "Pensiero",
    portaBersaglio: "Emozioni",
    portaTrappola: "Comportamento",
    sequenzaPorte: "p.e.c.",
    spinta: "Sii perfetto + Sii forte",
    ingiunzioni: ["Non essere un bambino", "Non essere intimo", "Non fidarti", "Non sentire", "Non divertirti", "Non appartenere"],
    giocoPsicologico: "Ti ho beccato figlio di puttana",
    copione: "Mai + Finché",
    copioneMotto: "Non posso avere mai quello che più desidero",
    copioneDescrizione: "Non parte e non andrà mai da nessuna parte; si trattiene dal provare piacere sino a che qualcosa di spiacevole non è stato completato. Svaluta la realtà.",
    dilemma: "Posso essere libero se non perdo la testa e non mi arrendo completamente all'amore",
    andatura: "In modo rigido come se avesse un palo d'acciaio nella schiena",
    diFronteAMinaccia: "Attacca con ragionamenti logici molto acuti",
    domandaConferma: "Prima valuta accuratamente e poi si attiva con decisione per risolvere i problemi?",
    stileComunicazione: "L'esplorativo insieme allo stile direttivo è opportuno per comunicare col Paranoide",
    rapport: "Essere razionali e coerenti, dimostrare affidabilità nel tempo",
    obiettiviTerapia: [
      "Anche se non controllo le cose non per questo vanno fuori controllo",
      "Devo imparare a confrontarmi con gli altri",
      "Devo imparare a verificare le mie percezioni con quelle degli altri",
    ],
    statoIo: "Adulto contaminato dal Genitore; Bambino escluso",
    contaminazioneAdulto: "Lo stato dell'Io Adulto è contaminato dal Genitore ed il Bambino è escluso: prevale la sospettosità e manca la spontaneità",
    strutturaTempoPreferita: "Rituali, passatempi e giochi",
    strutturaTempoEvitata: "Intimità",
  },
  {
    nome: "Schizoide",
    nomeAlternativo: "Creativo-sognatore",
    enneatipo: 5,
    eysenck: "Introverso",
    tipo: "Adattamento di sopravvivenza",
    descrizione: "Ha genitori esitanti su come interagire (si sentono sopraffatti): il bambino cerca di aiutarli, ma se fallisce decide di farcela da solo. Carattere comune a pensatori, artisti e scrittori. È gentile e rispettoso, si perde nei suoi sogni e talvolta non sa agire.",
    stileSociale: "Passivo ritirato — preferisce non fare e star da solo",
    portaAperta: "Comportamento",
    portaBersaglio: "Pensiero",
    portaTrappola: "Emozioni",
    sequenzaPorte: "c.p.e.",
    spinta: "Sii forte",
    ingiunzioni: ["Non farlo", "Non appartenere", "Non essere sano", "Non sentire (gioia, sessualità, rabbia)", "Non divertirti", "Non crescere", "Non pensare"],
    giocoPsicologico: "Tutta colpa tua",
    copione: "Mai",
    copioneMotto: "Non posso avere mai quello che più desidero",
    copioneDescrizione: "Non parte e non andrà da nessuna parte. Può essere anche «Sempre»: rimane nelle situazioni in cui si trova anche se sono negative.",
    dilemma: "Posso esistere sino a che non chiedo troppo",
    andatura: "Fiacco e poco coordinato nei movimenti",
    diFronteAMinaccia: "Tiene un basso profilo",
    domandaConferma: "Si tira indietro e aspetta che le cose tornino alla normalità?",
    stileComunicazione: "Lo stile direttivo è particolarmente congeniale per lo Schizoide",
    rapport: "Prendere iniziativa ed incoraggiare ad esprimere i pensieri e ad agire",
    obiettiviTerapia: [
      "Devo prendermi cura di me come faccio con tutti gli altri",
      "Ho diritto come tutti ad avere uno spazio nel mondo",
      "È ok che io abbia bisogni ed emozioni e che gli altri le prendano in considerazione",
      "Posso avvicinarmi agli altri senza rinunciare a me stesso",
    ],
    statoIo: "Doppia contaminazione dell'Adulto (Bambino e Genitore)",
    contaminazioneAdulto: "Si assiste ad una doppia contaminazione dell'Adulto ad opera del Bambino e del Genitore: paure infantili e regole rigide offuscano la razionalità",
    strutturaTempoPreferita: "Isolamento, attività, intimità",
    strutturaTempoEvitata: "Giochi e passatempi",
  },
  {
    nome: "Passivo-aggressivo",
    nomeAlternativo: "Scherzoso-oppositivo",
    enneatipo: 9,
    enneatipiSecondari: [2],
    eysenck: "Estroverso",
    tipo: "Adattamento di performance",
    descrizione: "Genitori ipercontrollanti che dicono «Devi fare le cose come dico io!»: la vita diventa una lotta. I bambini divengono tenaci e se non raggiungono lo scopo cercano di impedire agli altri di raggiungerlo. Combatte il controllo anche quando nessuno tenta di controllarlo.",
    stileSociale: "Passivo socievole — ama appartenere al gruppo ma è passivo davanti al problema",
    portaAperta: "Comportamento",
    portaBersaglio: "Emozioni",
    portaTrappola: "Pensiero",
    sequenzaPorte: "c.e.p.",
    spinta: "Sforzati",
    ingiunzioni: ["Non crescere", "Non sentire", "Non farlo", "Non essere intimo", "Non divertirti"],
    giocoPsicologico: "Perché non… sì ma",
    copione: "Sempre",
    copioneMotto: "L'hai voluta la bicicletta e ora pedala",
    copioneDescrizione: "Rimane nelle situazioni in cui si trova anche se negative. Può essere anche «Quasi tipo 2»: finisce un progetto e ne continua subito un altro senza darsi tregua.",
    dilemma: "Se faccio quel che voglio perdo il tuo amore. Per avere il tuo amore devo rinunciare a me stesso",
    andatura: "A scatti",
    diFronteAMinaccia: "Si lamenta, protesta, oppone resistenza",
    domandaConferma: "Contrasta costantemente le aspettative degli altri per fare le cose alla sua maniera?",
    stileComunicazione: "Stile emotivo che si può tradurre in ironia e nel fare battute",
    rapport: "Essere scherzosi, favorire l'emozione e chiedere quel che vuole. Non farlo pensare.",
    obiettiviTerapia: [
      "Non si deve sempre combattere per sopravvivere",
      "Devo imparare a chiedere: gli altri mi daranno; posso essere cooperativo",
      "Devo sperimentare la libertà di sentirmi diverso e sentirmi OK",
    ],
    statoIo: "Doppia contaminazione dell'Adulto (Bambino e Genitore)",
    contaminazioneAdulto: "Si assiste ad una doppia contaminazione dell'Adulto ad opera del Bambino e del Genitore: resistenza passiva e regole rigide si sovrappongono",
    strutturaTempoPreferita: "Passatempi e giochi",
    strutturaTempoEvitata: "Rituali, attività e intimità",
  },
  {
    nome: "Antisociale",
    nomeAlternativo: "Affascinante-manipolatore",
    enneatipo: 8,
    eysenck: "Estroverso",
    tipo: "Adattamento di sopravvivenza",
    descrizione: "Ha subito un atteggiamento anticipatorio dei genitori (che fanno qualcosa prima che il bambino ne abbia bisogno). Quando sono stanchi il bambino si sente abbandonato; se fallisce nella richiesta di attenzione pretende ciò che gli era stato dato. Aggredisce, intimidisce e seduce (venditore, politico, imprenditore).",
    stileSociale: "Sta in centro — oscilla tra agire e stare con gli altri e non fare e stare da solo",
    portaAperta: "Comportamento",
    portaBersaglio: "Emozioni",
    portaTrappola: "Pensiero",
    sequenzaPorte: "c.e.p.",
    spinta: "Sii forte + Compiaci",
    ingiunzioni: ["Non essere intimo", "Non sentire (tristezza, paura)", "Non farlo", "Non pensare (alle soluzioni a lungo termine)"],
    giocoPsicologico: "Prova a riscuotere",
    copione: "Mai",
    copioneMotto: "Non posso avere mai quello che più desidero",
    copioneDescrizione: "Non parte e non andrà da nessuna parte. Può essere anche «Sempre» (rimane nelle situazioni negative) o «Quasi tipo 1» (inizia un progetto ma poi non riesce a finire).",
    dilemma: "Posso esserti vicino se mi cedi la tua libertà e lasci che io ti usi o ti controlli",
    andatura: "Con il bacino in avanti pavoneggiandosi",
    diFronteAMinaccia: "Cerca di intimidire e sedurre per ottenere un vantaggio",
    domandaConferma: "Prima valuta la situazione e poi prova a sfruttarla in modo da trarne un vantaggio personale?",
    stileComunicazione: "Il direttivo, l'emotivo e l'affettivo a seconda dell'opportunità",
    rapport: "Prendere in giro scherzosamente il suo tentativo di raggirare gli altri",
    obiettiviTerapia: [
      "Che cosa realmente vorresti che non puoi ottenere (e quindi inganni)?",
      "Troverai sempre qualcuno: non resterai solo e abbandonato",
      "Non c'è più bisogno di fingere",
      "Ora è il momento di diventare disponibili per gli altri e cooperare",
    ],
    statoIo: "Genitore escluso; Adulto contaminato dal Bambino",
    contaminazioneAdulto: "Il Genitore è escluso e l'Adulto è contaminato dal Bambino: prevale l'impulsività senza il filtro delle norme interiorizzate",
    strutturaTempoPreferita: "Passatempi e giochi",
    strutturaTempoEvitata: "Rituali, attività e intimità",
  },
];

// Dinamiche di interazione tra adattamenti (dal Prontuario sezione 6.4)
export interface ATInterazione {
  tipo: "amicizia" | "attrazione" | "problematica";
  descrizione: string;
  consiglio: string;
}

export function getATInterazione(enneatipo1: number, enneatipo2: number): ATInterazione | null {
  const a1 = getATForEnneatipo(enneatipo1);
  const a2 = getATForEnneatipo(enneatipo2);
  if (!a1 || !a2) return null;

  // Stessa sequenza porte → buoni amici
  if (a1.sequenzaPorte === a2.sequenzaPorte) {
    return {
      tipo: "amicizia",
      descrizione: `${a1.nome} e ${a2.nome} condividono la stessa sequenza di porte (${a1.sequenzaPorte}): tendono ad andare d'accordo e a scegliersi come amici o colleghi, perché si trovano a proprio agio.`,
      consiglio: "Valorizzate la naturale sintonia. Attenzione a non rinforzarvi a vicenda le stesse aree cieche.",
    };
  }

  // Coppie di attrazione note (porte opposte con adattamento in comune)
  const attrazioni: Array<{ nomi: [string, string]; desc: string; consiglio: string }> = [
    {
      nomi: ["Istrionico", "Ossessivo-compulsivo"],
      desc: "L'Istrionico (e.p.c.) e l'Ossessivo-compulsivo (p.e.c.) si attraggono: il primo ha bisogno di imparare a pensare e a non iperreagire, il secondo a mettersi in contatto con le proprie emozioni.",
      consiglio: "La porta bersaglio in comune è il «pensiero»: la relazione migliora quando entrambi imparano a riflettere prima di reagire.",
    },
    {
      nomi: ["Ossessivo-compulsivo", "Passivo-aggressivo"],
      desc: "L'Ossessivo-compulsivo (p.e.c.) e il Passivo-aggressivo (c.e.p.) si attraggono: il primo è premuroso e il secondo vuole essere accudito.",
      consiglio: "Porta bersaglio comune «emozioni»: finiranno di litigare quando si metteranno in contatto con le proprie emozioni.",
    },
    {
      nomi: ["Paranoide", "Antisociale"],
      desc: "Il Paranoide (p.e.c.) cerca l'Antisociale (c.e.p.): il primo vorrebbe più eccitazione e il secondo più controllo.",
      consiglio: "Porta bersaglio comune «emozioni»: la relazione migliora quando entrambi accedono alle proprie emozioni autentiche.",
    },
    {
      nomi: ["Istrionico", "Schizoide"],
      desc: "L'Istrionico (e.p.c.) e lo Schizoide (c.p.e.) si attraggono: il primo dà energia ed il secondo tende a calmare.",
      consiglio: "Porta bersaglio comune «pensiero»: la relazione migliora quando iniziano a riflettere insieme, privilegiando il dialogo razionale.",
    },
  ];

  // Coppie problematiche note
  const problematiche: Array<{ nomi: [string, string]; desc: string; consiglio: string }> = [
    {
      nomi: ["Paranoide", "Istrionico"],
      desc: "Uomo Paranoide e donna Istrionica: il primo è geloso e tenderà ad equivocare l'atteggiamento seduttivo della seconda, andando in collera. Questa combinazione può generare dinamiche molto conflittuali.",
      consiglio: "È fondamentale che il Paranoide impari a verificare le proprie percezioni e che l'Istrionico chiarisca le proprie intenzioni.",
    },
    {
      nomi: ["Antisociale", "Paranoide"],
      desc: "Antisociale e Paranoide: il primo si lamenta di quanto il secondo lo controlli, e il secondo si lamenta di quanto il primo sia inaffidabile.",
      consiglio: "Lavorare sulla fiducia reciproca e accettare che il controllo non porta sicurezza.",
    },
    {
      nomi: ["Antisociale", "Schizoide"],
      desc: "Antisociale e Schizoide: lo Schizoide crede di ottenere attenzioni compiacendo l'altro, ma l'Antisociale lo usa soltanto.",
      consiglio: "Lo Schizoide deve imparare a riconoscere i propri bisogni e a stabilire confini chiari.",
    },
    {
      nomi: ["Ossessivo-compulsivo", "Passivo-aggressivo"],
      desc: "Ossessivo-compulsivo e Passivo-aggressivo: il primo cercherà di essere perfetto e il secondo noterà sempre che ci sono dei difetti.",
      consiglio: "Entrambi devono lavorare sulle emozioni: l'Ossessivo-compulsivo su quelle proprie, il Passivo-aggressivo sull'esprimerle direttamente.",
    },
  ];

  // Cerca match nelle attrazioni
  for (const attr of attrazioni) {
    if ((a1.nome === attr.nomi[0] && a2.nome === attr.nomi[1]) ||
        (a1.nome === attr.nomi[1] && a2.nome === attr.nomi[0])) {
      return { tipo: "attrazione", descrizione: attr.desc, consiglio: attr.consiglio };
    }
  }

  // Cerca match nelle problematiche
  for (const prob of problematiche) {
    if ((a1.nome === prob.nomi[0] && a2.nome === prob.nomi[1]) ||
        (a1.nome === prob.nomi[1] && a2.nome === prob.nomi[0])) {
      return { tipo: "problematica", descrizione: prob.desc, consiglio: prob.consiglio };
    }
  }

  // Caso generico: sequenze opposte senza match specifico
  const opposte = (a1.sequenzaPorte === "p.e.c." && a2.sequenzaPorte === "c.e.p.")
    || (a1.sequenzaPorte === "c.e.p." && a2.sequenzaPorte === "p.e.c.")
    || (a1.sequenzaPorte === "e.p.c." && a2.sequenzaPorte === "c.p.e.")
    || (a1.sequenzaPorte === "c.p.e." && a2.sequenzaPorte === "e.p.c.");

  if (opposte) {
    return {
      tipo: "attrazione",
      descrizione: `${a1.nome} (${a1.sequenzaPorte}) e ${a2.nome} (${a2.sequenzaPorte}) hanno sequenze di porte opposte: cercano nell'altro ciò che non sanno fare con naturalezza.`,
      consiglio: "Valorizzate la porta bersaglio in comune per risolvere i conflitti e trovare un terreno di comprensione reciproca.",
    };
  }

  // Default
  return {
    tipo: "amicizia",
    descrizione: `${a1.nome} e ${a2.nome} possono costruire una relazione equilibrata rispettando le reciproche porte di accesso.`,
    consiglio: `Per comunicare meglio: contatta ${a1.nomeAlternativo} attraverso la porta aperta (${a1.portaAperta.toLowerCase()}) e ${a2.nomeAlternativo} attraverso la propria (${a2.portaAperta.toLowerCase()}).`,
  };
}

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
