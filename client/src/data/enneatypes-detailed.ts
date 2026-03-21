export interface PNLInfo {
  accesso: string;
  elaborazione: string;
  gestualita: string;
  sguardo: string;
}

export interface Centro {
  tipo: string;
  domanda: string;
  nota: string;
}

export interface Sottotipo {
  nome: string;
  descrizione: string;
  personaggi: string;
  segnoAstrologico?: string;
}

export interface Ali {
  sinistra: { numero: number; descrizione: string; somiglianza?: string };
  destra: { numero: number; descrizione: string; somiglianza?: string };
}

export interface Lavoro {
  descrizione: string;
  mansioniAppropriate: string;
  mansioniNonAppropriate: string;
}

export interface Coppia {
  descrizione: string;
}

export interface LivelliEvoluzione {
  disintegrato: string;
  intermedio: string;
  integrato: string;
}

export interface Astrologia {
  segno: string;
  pianetaVedico: string;
  pianetaDescrizione: string;
  controFreccia: string;
  versoFreccia: string;
  chakra: string;
}

export interface Frecce {
  stress: { numero: number; descrizione: string };
  riposo: { numero: number; descrizione: string };
}

export interface EnneatipoDetailed {
  numero: number;
  motto: string;
  personalitaNaranjo: string;
  credenze: string;
  valori: string;
  criterio: string;
  definizione: string;
  animale: string;
  pnl: PNLInfo;
  centro: Centro;
  comeSiVede: string;
  comeSiRelaziona: string;
  comeRapportarsi: string;
  ali: Ali;
  sottotipi: {
    conservativo: Sottotipo;
    sociale: Sottotipo;
    sessuale: Sottotipo;
  };
  lavoro: Lavoro;
  coppia: Coppia;
  livelli: LivelliEvoluzione;
  astrologia: Astrologia;
  dsm: string;
  domandeUtili: string[];
  ideeSacre: { titolo: string; descrizione: string };
  frecce: Frecce;
  evoluzione: string;
}

export const enneatypesDetailed: Record<number, EnneatipoDetailed> = {
  1: {
    numero: 1,
    motto: "Fare le cose per bene",
    personalitaNaranjo: "Ossessiva. Ha l'ossessione di dover migliorare le cose.",
    credenze: "Il divertimento ed il piacere devono essere meritati. Le cose o sono giuste o sono sbagliate.",
    valori: "Migliorare se stessi / moralità",
    criterio: "Perfezione",
    definizione: "Il perfezionista. Potremmo definirlo un cane da caccia, perché quando prende un impegno lo assolve ad ogni costo.",
    animale: "Cane da caccia",
    pnl: {
      accesso: "Visivo: ama ricevere le informazioni sotto forma di immagini; quando incontra qualcuno per la prima volta formula il suo giudizio sull'impatto visivo.",
      elaborazione: "Auditivo: le sue decisioni sono fortemente influenzate da ciò che ascolta e dalla logica.",
      gestualita: "Accusatore: gesticola puntando il dito.",
      sguardo: "Quando gli si pone una domanda secca guarda in alto, a destra o a sinistra, prima di rispondere.",
    },
    centro: {
      tipo: "Istintivo",
      domanda: "Che cosa faccio?",
      nota: "Esagera nel suo agire sottomettendolo troppo alla sua censura interna.",
    },
    comeSiVede: `Si considera altruista, una persona che non desidera niente per sé, generoso e libero da interessi personali, un idealista mosso dalla devozione al meglio.

Vorrebbe essere una persona a modo, gentile, disponibile e soprattutto impeccabile; cerca di portare la perfezione in un mondo imperfetto.

In realtà non si sente buono e bravo (si sente cattivo) e vuole essere più che bravo, il migliore.

Da bambino era molto criticato e punito: ha dovuto quindi sempre controllarsi per essere approvato da genitori critici ed esigenti. Ha avuto prematuramente responsabilità da adulto, ma raramente è stato ricompensato per quel che ha fatto.

Da adulto continua a controllare le emozioni e cerca di evitare le umiliazioni che ha ricevuto da bambino.

È un buon cittadino e paga le tasse, obbedisce alla polizia e alle regole, ma può rivelarsi anche uno strenuo lottatore: può divenire un riformatore perché nell'inconscio è un ribelle. Il risentimento che aveva per i genitori si trasforma in critica di se stesso e degli altri.

Se donna l'1 è una «femminista»: dominante, competitiva, mascolina.

È un buon lavoratore con interesse per il dettaglio e l'organizzazione. Un abile parlatore e difensore di sé, in genere idealista censorio con spiccata integrità personale e morale, ma con senso pratico.

Ha un forte senso del dovere. È ambizioso ma leale. Disprezza il piacere perché crede che il divertimento ed il piacere debbano essere meritati.

Critica e giudica sé e gli altri; è rigido ed intransigente. Il giudizio e la critica sono le sue trappole, anche con le persone care.

La sua spinta è il perfezionismo. Pensa: "Come posso rendere tutto perfetto?". Si domanda spesso: "Ho ragione?".

Ha un super-io che lo sorveglia costantemente, gli dice cosa fare e come farlo. Cerca a qualsiasi costo di rispettare le regole per sfuggire alle critiche.

Vede le cose bianche o nere: è dicotomico. Vive e veste in modo austero. Misura le parole ed i gesti. Non sopporta il disordine e non sopporta il ritardo.

Ha sempre l'agenda piena e non un momento per sé stesso.`,

    comeSiRelaziona: `Non con un «vorrei che» ma con «tu devi», «Al rogo se non lo fai».

Cerca di nascondere i lati oscuri al partner e questo crea tensione. Quando il partner non ce la fa più delle omissioni l'1 lo lascia per non essere lasciato.

Mette il partner sul piedistallo, ma quando si sente minacciato o geloso lo critica pesantemente. È devoto con un partner di buone intenzioni.

Nei confronti dei figli è disposto a fare qualunque cosa ed è disposto ad autopunirsi se pensa di avere sbagliato nei loro confronti. Con i bambini piccoli è un ottimo educatore, ma si scontra con gli adolescenti.

In un litigio tende a chiedere a chi fa da paciere un giudizio morale.`,

    comeRapportarsi: `Gli piace stare con persone che siano coerenti, preparate e capaci. Ordine, chiarezza e puntualità sono per lui importanti. Ama vedersi riconosciuti i propri meriti.

Non bisogna dirgli che cosa dovrebbe fare; ma chiedere invece: «Che cosa vuoi fare?»

Quando è in ansia si autocorregge da solo, non c'è bisogno di sottolineare i suoi errori. Anzi evitare di parlare dei suoi errori perché li conosce già.

Lavora a modo suo partendo da una base alta e ideale: è difficile collaborare con lui.

Bisogna aiutarlo ad affrontare le emozioni con delicatezza perché è dotato di forte giudizio morale, bisogna proteggerlo da se stesso.

Predilige soluzioni a lungo termine. Non è amante del comando: preferisce organizzare che decidere.

Le forme per lui hanno grande importanza. La posizione difensiva di base è il giudizio: nel suo modo di giudicare condanna gli errori altrui ed i propri.`,

    frecce: {
      stress: { numero: 4, descrizione: "Diventa malinconico, depresso e ha un atteggiamento autodistruttivo." },
      riposo: { numero: 7, descrizione: "Riesce ad essere meno giudicante in senso critico, e più giudicante in senso positivo: vede i pregi degli altri e li sottolinea." },
    },
    ali: {
      sinistra: {
        numero: 9,
        descrizione: "Se ha ala 9 è più paziente e moderato nei giudizi, tende ad essere super partes. Ha valori primari: giustizia, verità e razionalità; mette però da parte i sentimenti, appare imperturbabile.",
        somiglianza: "Assomiglia superficialmente al 5",
      },
      destra: {
        numero: 2,
        descrizione: "Se ha ala 2 è più centrato nelle relazioni, obiettivo ed imparziale degli altri 1. Meno pungente, severo e giudicatore. Più attento alle esigenze altrui, tollerante ed empatico. Generoso, disponibile, gentile e di buon umore.",
        somiglianza: "Assomiglia superficialmente al 6",
      },
    },
    sottotipi: {
      conservativo: {
        nome: "Conservativo (ansiogeno)",
        descrizione: "È colui che reprime più la rabbia e la dirige verso se stesso; ha paura di commettere errori e ha bisogno di essere continuamente rassicurato. Ha paura di non farcela nella vita e cerca di impegnarsi sempre di più. È autocritico più che critico e non ha molta fiducia negli altri. È una persona colta, altruista e ha ideali cristallini. Ha le capacità di un 3 ed un grande spirito di organizzazione. È troppo onesto e troppo buono per arrivare in alto.",
        personaggi: "Confucio, Aristotele, Pasteur, Thomas Jefferson",
        segnoAstrologico: "Cancro, Bilancia e Capricorno",
      },
      sociale: {
        nome: "Sociale (inadattabile)",
        descrizione: "È un soggetto rigido con se stesso e con gli altri; le cose sono giuste o sbagliate, bianche o nere. Il divertimento va posposto al dovere. Reprime la rabbia ponendosi su un piedistallo e si considera dispensatore del verbo, inflessibile ed inadattabile. Gli piace insegnare, è puntiglioso e pedante, i suoi giudizi sono spesso severi. Non fa spesso complimenti e non ha il senso dell'umorismo. È più ritirato degli altri (assomiglia al 5).",
        personaggi: "Virgilio, Milton, George Bernard Shaw",
      },
      sessuale: {
        nome: "Sessuale (geloso)",
        descrizione: "È tendenzialmente e apertamente collerico ma esprime la rabbia attraverso canali legittimi per la società. Cerca di fare proseliti delle sue convinzioni. È spesso un moralista di facciata che cerca di risvegliare le coscienze, ma non si reprime sessualmente. È geloso del partner e pensa che gli altri siano tutti più attraenti di lui; può diventare possessivo, manipolatore ed oppressivo. Ha sempre paura di non essere desiderato.",
        personaggi: "San Paolo, Tolstoj",
      },
    },
    lavoro: {
      descrizione: "È un buon lavoratore. Mansioni appropriate comportano la cura dei dettagli, uno sviluppo a lungo termine, responsabilità e concetto. Ha interesse per il dettaglio e l'organizzazione. Viene considerato \"quello che sa su come si fanno le cose\". Mansioni che gli si confanno sono l'insegnante ed il predicatore.",
      mansioniAppropriate: "Cura dei dettagli, sviluppo a lungo termine, responsabilità e concetto, insegnamento.",
      mansioniNonAppropriate: "Decisioni immediate, quando l'obiettivo è più importante dei dettagli, quando bisogna negoziare con l'interlocutore.",
    },
    coppia: {
      descrizione: `Cerca di nascondere i lati oscuri al partner. Mette il partner sul piedistallo, ma quando si sente minacciato o geloso lo critica pesantemente.

È devoto con un partner di buone intenzioni. Nei confronti dei figli è disposto a fare qualunque cosa.

Con i bambini piccoli è un ottimo educatore, ma si scontra con gli adolescenti.`,
    },
    livelli: {
      disintegrato: "Estremista nel volere sempre ragione. Esiste solo il bianco e il nero e si sente più virtuoso di tutti gli altri. Tende a controllare la sua collera tanto da esplodere. Vuole dimostrare che gli altri sbagliano per punirli senza pietà. Può avere pensieri ossessivi.",
      intermedio: "Prova forte rimorso quando contravviene alle regole. Prende la responsabilità di fare la cosa giusta perché non si fida degli altri. Cerca di riparare i torti. Si pone sempre obiettivi elevati. È sicuro di sé perché pensa di avere sempre ragione. Interrompe spesso gli altri e li corregge. Difficilmente cambia opinione. Ama ordine e puntualità.",
      integrato: "Riesce a manifestare i propri sentimenti e a raggiungere un equilibrio psichico. Ha il senso della realtà e della tolleranza per sé e per gli altri. Abbandona la sua compulsione verso la perfezione e la superbia perché si misura con la realtà. Ha una visione che gli permette di non giudicare. Etica e integrità sono equilibrate. Non mente mai.",
    },
    astrologia: {
      segno: "Vergine (con tratti dello Scorpione)",
      pianetaVedico: "Marte",
      pianetaDescrizione: "Se Marte è forte abbiamo un individuo deciso, se Marte è debole un individuo indeciso e fortemente condizionato dall'ambiente oppure una persona aspra e irritabile.",
      controFreccia: "Ariete e Acquario (qualità positive)",
      versoFreccia: "Gemelli e Vergine (qualità negative)",
      chakra: "3° Chakra (sotto l'ombelico)",
    },
    dsm: "Ossessivo-compulsivo",
    domandeUtili: [
      "Ti piace fare le cose per bene?",
      "Per te è importante migliorarsi sempre di più?",
      "Tendi ad essere intollerante verso l'opinione altrui e a voler dimostrare che hai ragione?",
      "Quando esegui un lavoro, pensi che avresti potuto farlo meglio?",
      "Per te le cose o sono giuste o sono sbagliate?",
    ],
    ideeSacre: {
      titolo: "Perfezione",
      descrizione: `La sacra Perfezione consiste nel vedere la realtà come è e cioè non pensare che abbia bisogno di mutamenti o correzioni. Ogni tentativo di cambiare le cose è inutile.

L'enneatipo 1 ha la sensazione di avere dentro qualcosa di sbagliato. Ma se tutto è perfetto ed io appartengo al tutto non ci può essere nulla di sbagliato in me.

La reazione all'errore cognitivo di credere che ci sia qualcosa di sbagliato in me determina: cerco costantemente di migliorarmi e quando mi sento sbagliato provo risentimento. Voglio dimostrare agli altri che in me non c'è nulla di sbagliato, voglio avere sempre ragione per coprire i miei difetti.

Se ogni cosa è perfetta possiamo fidarci: l'enneatipo 1 ha perso la sua fiducia nel contenimento e per ottenerla di nuovo cerca di migliorare ciò che in realtà è già perfetto in sé.`,
    },
    evoluzione: "Un 1 evoluto riesce a catalizzare tanta energia acquisendo le qualità positive delle sue ali (2 e 9) e della sua contro freccia (7); più difficile ottenere anche le qualità positive del verso freccia (4). Se rimane fermo rischia di assommare le sue qualità negative a quelle del verso freccia (4).",
  },

  2: {
    numero: 2,
    motto: "Compiacere per ottenere",
    personalitaNaranjo: "Istrionica. È un carattere tipicamente femminile.",
    credenze: "I bisogni degli altri sono molto importanti; gli altri devono essere felici per merito mio.",
    valori: "Amicizia / aiutare gli altri",
    criterio: "Accettazione",
    definizione: "L'enneatipo della nutrice (Madre Teresa di Calcutta). Generoso e sempre disponibile ad aiutare quelli che gli piacciono.",
    animale: "Sanbernardo",
    pnl: {
      accesso: "Cenestesico: si relaziona col mondo attraverso le sensazioni. Nella relazione ama il contatto fisico coi suoi cari ma anche con gli estranei.",
      elaborazione: "Visivo: quando riflette e decide lo fa tramite immagini che influenzano le scelte di vita.",
      gestualita: "Propiziatore: mani a triangolo. Personalità collaborativa.",
      sguardo: "Quando gli si pone una domanda secca guarda in basso prima di rispondere.",
    },
    centro: {
      tipo: "Emotivo",
      domanda: "Che cosa sento?",
      nota: "Esagera nel suo sentire dandogli poco spazio per concentrarsi su quello altrui. Sua caratteristica naturale è quella di non avere difficoltà ad accettare gli altri.",
    },
    comeSiVede: `È convinta di avere moltissimo da dare e che la sua compagnia sia un dono per gli altri. Afferma di donarsi perché le piace farlo, non per secondi fini.

Da piccola non è stata accettata dai genitori, può essere stata abbandonata. Ha avuto la sensazione di doversi rendere utile per essere notata o amata. Anche da adulto ha la sensazione di essere amato per aver soddisfatto gli altri.

Il 2 è gentile, seduttivo, abile nell'adulare ed è attratto dai tipi difficili. Pensa che gli altri abbiano tutti bisogno di lei e che lei non abbia bisogno di nessuno. La sua trappola è la superbia e l'orgoglio.

Si preoccupa di aiutare gli altri sino a identificarsi. Fa sempre promesse teatrali. È allo stesso tempo tenera e aggressiva.

È il prototipo della femme fatal, ma possiede anche una personalità materna. Mostra i sentimenti in modo spesso eccessivo. Ha sempre un complimento per tutti.

In generale cerca di stare sempre al centro dell'attenzione e ricerca continuamente l'approvazione degli altri. È quella che si definisce una personalità istrionica.

Possiede un fortissimo orgoglio: piuttosto morire che piegarsi a «come ti vogliono gli altri». Può compiacere gli altri per interesse o perché ha paura di essere abbandonata.

Riceve nel momento in cui dona. È generosa, tanto da mettere sé stessa all'ultimo posto. Presta il suo aiuto agli altri e non di rado svolge attività caritatevoli.`,

    comeSiRelaziona: `Chiede quali siano i bisogni dell'altro perché in realtà vorrebbe ricevere la stessa richiesta (proiezione).

All'inizio della relazione si chiede: «Sarò amata?» e se così non è diviene adulatore e può cambiare personalità per adattarsi meglio.

Quello che offre è ciò che desidera ricevere: quindi se non ottiene recrimina.

Colpisce l'altro per poi aiutarlo quando va in crisi: «Non ti preoccupare ci sono qui io».

L'approvazione degli altri è essenziale per la sua autostima. Ha un feeling coi rapporti intimi, tanto che ricerca la fusione.

Si distingue dall'8 perché all'8 non interessa essere amato; si distingue dal 4 perché questi vuol essere amato solo da una persona specifica.`,

    comeRapportarsi: `Con il 2 bisogna favorire in ogni modo l'empatia. Vuole essere gratificato e la sua fiducia deve essere ricambiata.

Bisogna riconoscere il suo valore ed apporto perché diversamente soffre e piange. Ma anche nel dolore il 2 è accudente.`,

    frecce: {
      stress: { numero: 8, descrizione: "Se si sente usato, rifiutato od umiliato va in 8; fa credere di essere potente e la rabbia si traduce in rifiuti. Pretende riconoscimento, può essere distruttivo e vendicativo." },
      riposo: { numero: 4, descrizione: "Può pensare che sia meglio avere pochi amici ma buoni. È più riflessivo e analitico nei rapporti con gli altri. Quando sta bene considera la sua salvezza nell'essere amato/a." },
    },
    ali: {
      sinistra: {
        numero: 1,
        descrizione: "Se è un 2 ala 1 tratta gli altri lealmente senza manipolarli; è razionale e passionale insieme; in un gruppo è elemento aggregante; è meno invadente e più rispettoso degli spazi altrui.",
        somiglianza: "Assomiglia superficialmente al 6",
      },
      destra: {
        numero: 3,
        descrizione: "Se è un 2 ala 3 è particolarmente portato per le relazioni esterne; affascinante, cordiale e socievole; estremamente sicuro di sé; è manipolativo: vuole piacere ed ottenere successo; grande imbonitore e camaleonte.",
        somiglianza: "Assomiglia superficialmente al 7",
      },
    },
    sottotipi: {
      conservativo: {
        nome: "Conservativo (preminenza o privilegio)",
        descrizione: "È infantile, capricciosa e leggiadra; può avere una mente prodigiosa; pensa di meritare privilegi in cambio del compiacimento. Molto orgogliosa non chiede aiuto ed è convinta che gli altri dipendano da lei. Dà anche materialmente a chi ha bisogno. Si aspetta di essere trattata in modo speciale soprattutto dal sesso opposto. È più timida e ritirata degli altri 2.",
        personaggi: "Mozart, Yogananda, Lou Andreas-Salomé, Stendhal, Antoine de Saint-Exupéry",
        segnoAstrologico: "Cancro, Bilancia e Sagittario",
      },
      sociale: {
        nome: "Sociale (superiorità, ambizione)",
        descrizione: "Vuole un ruolo nella vita accanto a persone importanti e sa come ottenerlo. Desidera conquistare la società con le sue buone opere. Confonde il prestigio con il vero amore. Sta dietro il palcoscenico, ma se ne vanta. È più intellettuale del tipo sessuale. È il più potente antagonista.",
        personaggi: "Napoleone, Johann Wolfgang von Goethe",
      },
      sessuale: {
        nome: "Sessuale (seduzione, aggressività)",
        descrizione: "Fa in modo di avere segnali costanti di simpatia: è seducente e invitante in modo plateale. Sensibile ai doni. Ama condividere i segreti del partner e degli amici. Cerca di dominare e pensa di sapere che cosa è meglio per gli altri. Si vanta di poter sedurre chiunque e confonde la seduzione con l'amore.",
        personaggi: "Maria Maddalena, Ba'al Shem Tov, Lord Byron",
      },
    },
    lavoro: {
      descrizione: "È un buon vice, una perfetta segretaria, un'ottima public relation.",
      mansioniAppropriate: "Ambiti relazionali, quelli in cui si aiuta il prossimo, il braccio destro nei gruppi.",
      mansioniNonAppropriate: "La pianificazione dei dettagli, le attività da svolgere in autonomia, le attività dove non si ricevano gratificazioni.",
    },
    coppia: {
      descrizione: `Si impegna molto nella relazione. Non sopporta di essere abbandonata in qualsiasi tipo di interazione. Cerca la co-dipendenza e spesso viene accusata di essere soffocante ed invadente.

Vuole piacere ed essere approvata e desiderata. Si aspetta riconoscimenti anche dall'ex partner. Pensa prima a sedurre e poi a che cosa significa stare col sedotto.

Può perdere interesse per l'altro, ma non tollera comunque l'abbandono. Fare innamorare l'altro è una sfida irresistibile.`,
    },
    livelli: {
      disintegrato: "Per ottenere affetto manipola e gioca sui sensi di colpa altrui: si presenta come cura per i mali che ha inflitto. Se capisce che sarà abbandonato/a usa i rinfacciamenti per ciò che ha fatto per l'amato. Richiede amore in modo esasperante.",
      intermedio: "I conoscenti devono diventare suoi amici. Architetta sistemi subdoli per attirare l'attenzione e si fa gli affari degli altri. È felice quando gli altri hanno bisogno di lei più di quanto lo sia quando può risolvere autonomamente i suoi problemi. È egocentrica e falsa modesta.",
      integrato: "Sviluppa altruismo disinteressato. Perde la compulsione di essere indispensabile: gli basta aver fatto del bene e non si vanta di averlo fatto. Sviluppa empatia e sa mettersi nei panni altrui. Si può sempre contare sul suo aiuto anche a costo di grandi sacrifici.",
    },
    astrologia: {
      segno: "Acquario (con tratti dei Pesci)",
      pianetaVedico: "Sole",
      pianetaDescrizione: "Se il Sole è forte l'individuo è generoso e magnanimo, se è debole logorroico, manipolativo e troppo appariscente.",
      controFreccia: "Cancro e Leone (qualità positive)",
      versoFreccia: "Toro e Pesci (qualità negative)",
      chakra: "6° Chakra (tra le sopracciglia: terzo occhio)",
    },
    dsm: "Istrionico / passivo aggressivo",
    domandeUtili: [
      "Tendi ad aiutare gli altri?",
      "Preferisci avere 10 o 100 amici?",
      "Quale è l'ultima volta che hai deciso di prendere del tempo per te?",
    ],
    ideeSacre: {
      titolo: "Volontà e Libertà",
      descrizione: `Esiste una volontà unificata nel completo funzionamento dell'universo e anche le nostre azioni vi rientrano.

L'enneatipo 2 perde la fiducia fondamentale nel fatto che non c'è bisogno di fare nulla per essere accuditi, per essere contenuti.

L'orgoglio egoico è quello di non credere nell'unica volontà e di voler fare le cose a modo proprio; credere di avere una volontà propria e di poter decidere a proprio piacimento. Si sente il bisogno di manipolare le cose e gli altri.

L'enneatipo 2 prende il posto di Dio. Essere liberi al contrario è volere quel che vuole l'universo.`,
    },
    evoluzione: "Un 2 si evolve se acquisisce qualità positive dall'ala 1 e dall'ala 3, dalla contro freccia 4 (più difficilmente dal verso freccia 8). Se rimane fermo rischia di assommare le sue qualità negative a quelle del verso freccia (8).",
  },

  3: {
    numero: 3,
    motto: "Vivere per il successo",
    personalitaNaranjo: "Isterica. Il manager o trasformista (Silvio Berlusconi).",
    credenze: "Il proprio valore dipende da quanto successo si ottiene. Bisogna \"rendere\" per ricevere affetto.",
    valori: "Tradizionalista (ricalca i valori del gruppo)",
    criterio: "Successo, immagine positiva / efficienza",
    definizione: "L'Aquila, sa risolvere un problema in modo efficace ed efficiente. La nazione che lo simboleggia è gli Stati Uniti.",
    animale: "Aquila",
    pnl: {
      accesso: "Visivo: ama ricevere le informazioni in forma di immagini; bada molto all'apparenza di chi incontra.",
      elaborazione: "Cenestesico: prende le decisioni sulla scorta di emozioni e sensazioni («Sento che la decisione è giusta»).",
      gestualita: "Propiziatore: con dei triangoli. Personalità collaborativa se gli conviene. In uscita utilizza il canale K (eccezione del triangolo).",
      sguardo: "Quando risponde ad una domanda secca guarda in alto.",
    },
    centro: {
      tipo: "Emotivo",
      domanda: "Che cosa sento?",
      nota: "Paradossalmente però si impedisce di sentire per essere più capace ed efficiente.",
    },
    comeSiVede: `Come una persona psicologicamente sana, cosa che non pensa degli altri. Indenne da critiche: non ascolta le critiche perché pensa che siano dettate dall'invidia.

Nella infanzia è stato amato perché è stato bravo, non perché semplicemente esisteva. L'amore dei genitori è condizionato dal successo: se fallisce non ci sarà nessun premio.

Da adulto fa carte false per successo (= amore): gli piace essere amato ma non sa come fare ad amare. Si identifica col successo.

Vuole evitare il fallimento ed il disprezzo degli altri. Ha un estremo bisogno di adeguare il suo comportamento alle esigenze degli altri. Di qui la nomea di essere un ingannatore ed una persona sfuggente.

È vanitoso e si specchia negli occhi degli altri. Ha un culto dell'immagine (Narciso) e considera poco importanti i sentimenti.

Il primo a cui mente è se stesso. Non è molto bravo ad affrontare l'intimità e la sofferenza. È iperattivo. Si presenta come corretto ed efficiente, ottimista.

Utilizza oggetti di pregio, orologi costosi, vestiti esclusivi. Preferisce l'azione alla riflessione: è impulsivo. Fa di tutto per avere un futuro finanziariamente rassicurante.

Non sopporta l'inattività perché lo fa pensare e non può permettersi di mettersi in discussione.`,

    comeSiRelaziona: `In amore segue l'etica sociale dominante. Non ha un senso etico proprio, ma incarna valori sociali per essere gradito alla società.

Per conquistare l'ammirazione di tutti si pavoneggia. Enfatizza quello che fa. Racconta piccole bugie per aprire la coda colorata.

Infonde sicurezza nelle relazioni, ma attrae persone insicure. Predilige obiettivi a breve termine e che richiedano azione.

Il 3 non sopporta i ragionamenti lunghi, suo motto è «dimmi che cosa devo fare e lo faccio».

3 e 7 vengono spesso confusi, ma sono diversi perché il 3 è disposto a faticare nella vita, mentre il 7 no.`,

    comeRapportarsi: `Se il 3 ha un insuccesso si sente malissimo. Non sfiorare mai l'argomento della possibilità di un fallimento.

Ai 3 piace molto pianificare il futuro e porsi degli obiettivi: ma non vanno fissati troppo in alto. Non tollera l'ansia: creare un ambiente senza tensioni.

Non si fida delle parole altrui: non fare complimenti eccessivi. È importante sottolineare ogni progresso che fa.

Empatia, emozione e sentimenti sono estranei al 3: è inutile usare tecniche empatiche.

Non fare mai confronti col 3: l'approccio giusto è «Tu che hai tanta esperienza dimmi come devo fare...»`,

    frecce: {
      stress: { numero: 9, descrizione: "Diventa pigro perché non raggiunge il successo nonostante quel che ha costruito: vuole evitare ulteriori fallimenti; rivolge verso se stesso l'odio che di solito prova per gli avversari." },
      riposo: { numero: 6, descrizione: "Trascorre più tempo in famiglia e con gli amici trascurando il voler apparire. Entra in contatto di più con la sfera emotiva, diventa fedele ed impegnato." },
    },
    ali: {
      sinistra: {
        numero: 2,
        descrizione: "Il 3 ala 2 ama essere al centro dell'attenzione e a contatto col pubblico. Più emotivo rispetto agli altri 3, riesce a motivare i collaboratori (però è più sensibile alle critiche). Competizione, confronto e successo sono i punti di riferimento.",
        somiglianza: "Assomiglia superficialmente al 7",
      },
      destra: {
        numero: 4,
        descrizione: "Il 3 ala 4 è poco comune; possiede un conflitto tra successo e profondità interiore. È estremamente creativo, ambizioso, centrato sull'obiettivo.",
        somiglianza: "Assomiglia superficialmente all'8",
      },
    },
    sottotipi: {
      conservativo: {
        nome: "Conservativo (sicurezza)",
        descrizione: "Ha paura di fallire e diventare povero; crede nell'accumulo di beni come in un salvagente, più che vanesio è materialista. Non crede esistano nemici: l'avversario di oggi può essere l'alleato di domani. Spesso è di umili origini e si è fatto da solo. È il più generoso e amorevole.",
        personaggi: "Caterina da Siena, Joseph Haydn",
        segnoAstrologico: "Toro",
      },
      sociale: {
        nome: "Sociale (prestigio)",
        descrizione: "Ambisce al prestigio sociale; ama il consenso o far parte di gruppi esclusivi. È un abile parlatore. Vuole essere leader e cambia comportamento se i sondaggi sono negativi. Rispetta le convenzioni sociali per l'approvazione degli altri. È il più brillante e loquace dei tre e il più competitivo.",
        personaggi: "Teresa d'Avila",
        segnoAstrologico: "Gemelli e Acquario",
      },
      sessuale: {
        nome: "Sessuale (sex appeal)",
        descrizione: "Vede la conquista sessuale come simbolo del successo, non tanto per consumare un rapporto ma per catturare l'attenzione. Non sopporta i segni del tempo e ricorre alla chirurgia estetica. Senza la giusta immagine perde il senso della vita. È il più ritirato e nascosto.",
        personaggi: "Eloisa, Joseph Campbell",
        segnoAstrologico: "Gemelli",
      },
    },
    lavoro: {
      descrizione: "Il 3 sceglie mansioni ove ci sono possibilità di carriera e si richiede chiarezza ed efficienza.",
      mansioniAppropriate: "Azione immediata, ambiti relazionali e gestione dell'immagine, pianificazione nel breve-medio periodo.",
      mansioniNonAppropriate: "Quelle da svolgere lontano dal pubblico, pianificazione nel lungo periodo, cura del dettaglio senza attività per il risultato.",
    },
    coppia: {
      descrizione: `Tende ad impersonare l'uomo o la donna come modello sociale prevalente: moralista, tradizionalista.

Esibisce la bella moglie/compagna come un trofeo che deve essere irraggiungibile per gli altri.

Con il partner si relaziona a luoghi comuni: il matrimonio e la religione sono sacri.`,
    },
    livelli: {
      disintegrato: "L'insuccesso è l'incubo peggiore. La slealtà è concessa: basta primeggiare. Arrivista e opportunista, voltagabbana. Lascia il partner dalla sera al mattino con indifferenza. Non ha il dono dell'empatia; danneggiare gli altri lo fa sentire superiore.",
      intermedio: "La competizione è la sua passione in virtù della vittoria finale. I rivali vanno combattuti senza pietà. Ama la compagnia degli inferiori che non possono offuscare il suo successo. Sacrifica amicizia e matrimonio alla carriera. Parla solo di se stesso.",
      integrato: "Si accetta rinunciando ad essere ammirato a tutti i costi. Focalizza le energie sul miglioramento personale (fisico e spirituale) e stimola gli altri a fare altrettanto. Non fa il «simpatico» e spesso è autocritico. Il successo arriva naturalmente grazie al suo equilibrio.",
    },
    astrologia: {
      segno: "Leone (con tratti della Bilancia e del Sagittario)",
      pianetaVedico: "Nodo lunare RAHU",
      pianetaDescrizione: "Se Rahu è forte la persona è attiva e adattiva, se è debole il soggetto è vanitoso e menzognero.",
      controFreccia: "Leone, Scorpione, Bilancia e Vergine (influenza positiva)",
      versoFreccia: "Cancro, Gemelli, Toro e Ariete (influenza negativa)",
      chakra: "Non corrisponde a nessun Chakra",
    },
    dsm: "Isteria",
    domandeUtili: [
      "Il successo è la leva che ti motiva nella vita?",
      "Ami circondarti di vestiti firmati, abiti firmati, orologi costosi?",
      "Quando ti poni un obiettivo stacchi la spina dai pensieri e vedi solo la meta da raggiungere?",
      "Pianifichi le tue giornate in anticipo e ti dà fastidio avere dei buchi?",
      "Prediligi gli obiettivi a breve termine piuttosto che quelli a lungo termine?",
    ],
    ideeSacre: {
      titolo: "Armonia, Legge, Speranza",
      descrizione: `Sacra Legge significa che l'universo muta e si trasforma come unità; in questa trasformazione è armonioso e ottimizzato perché contiene un'intelligenza interna.

Questo mutamento ottimizzato è la vera speranza, la fiducia che tutto andrà per il meglio. Chi lo sperimenta diventa ottimista in modo naturale.

L'inganno è la convinzione di essere artefice autonomo e separato dal resto dell'universo. Da ciò nasce la sensazione di impotenza: ci si sente abbandonati, che dobbiamo fare tutto da soli.

Bisogna accettare di essere impotente perché è parte dell'esistenza umana e perché allo stesso tempo si accetta l'impulso ottimizzante.`,
    },
    evoluzione: "Un 3 si evolve se acquisisce qualità positive dall'ala 2 e dall'ala 4, dalla contro freccia 6 (più difficilmente dal verso freccia 9). Se rimane fermo rischia di assommare le sue qualità negative a quelle del verso freccia (9).",
  },

  4: {
    numero: 4,
    motto: "Si è importanti per quel che si è, non per quel che si fa",
    personalitaNaranjo: "Masochista: è la vittima designata dalla vita. Il romantico (Fabrizio De André).",
    credenze: "Sono unico e speciale e le mie relazioni devono essere uniche e speciali.",
    valori: "Realizzare se stessi / amicizia profonda",
    criterio: "Autenticità / unicità",
    definizione: "Spesso gli appartenenti a questo enneatipo sono emarginati, incompresi e rifiutati.",
    animale: "Basset-Hound, un cane diverso dagli altri",
    pnl: {
      accesso: "Cenestesico: il mondo è percepito tramite sensazioni ed emozioni. Non badano nel nuovo incontro all'immagine dell'altro ma alla sensazione che ne ricavano.",
      elaborazione: "Auditivo: la sua riflessione è così logica che spesso rappresenta un ostacolo per l'azione.",
      gestualita: "Propiziatore. Ha gli stessi canali del 9 (KA) ma si differenzia perché il 9 si esprime in superlogico.",
      sguardo: "Prima di rispondere ad una domanda secca guarda in basso.",
    },
    centro: {
      tipo: "Emotivo",
      domanda: "Che cosa sento?",
      nota: "Esagera nel proprio sentire dando troppo peso alle proprie emozioni.",
    },
    comeSiVede: `Come l'unica persona in contatto con la profondità dell'essere che tuttavia sembra sempre sfuggirgli.

Da piccolo è stato abbandonato (idealmente o realmente) o ha avuto una famiglia/ambiente infelice. Da grande vuole evitare che si ripeta.

Vede nella sofferenza il sale della vita e riesce a dare risposte positive quando la subisce (è incline al masochismo).

Ricerca l'originalità: nel vestire, nel lavoro, nello stile di vita. Predilige interiorità ed è assai empatico.

Ha pochi amici con cui scambiare emotività intensa. Odia la superficialità e tutto quello che è legato all'immagine.

Manifesta la creatività attraverso l'arte: musica, pittura, scrittura. È invidioso di chi agisce. Si focalizza su ciò che non ha e avrebbe potuto avere.

Idealizza le persone ed il futuro, ma vive nel passato. Ha di solito due lavori: uno per mangiare e l'altro per essere felice.

Fa di tutto per non essere banale, per essere speciale, per essere fuori dalla massa. Solo se è visibile si sente amato.

È una cassa di risonanza dei dolori che lo circondano. Ama le storie romantiche tragiche. Il bisogno più forte è quello di inseguire l'amore ed evitarne la perdita.`,

    comeSiRelaziona: `Si comporta come il 2 quando capisce che sta perdendo l'amicizia. Ha degli sbalzi umorali quando perde il partner: può essere depresso o iperattivo.

Invidia chi è più speciale di lui. Vuole diventare unico per qualcuno in modo che questi non lo lasci mai.

Vive spesso una intensa comparazione con gli altri che lo porta ad essere invidioso.`,

    comeRapportarsi: `Non vive bene le figure autoritarie. Ammira le persone intelligenti, capaci e non direttive.

L'intelligenza per un 4 equivale al fascino. È sensibile all'uso di esempi e di metafore (è poetico e romantico).

Cerca di portare l'altro nel proprio vissuto. Il 4 cerca negli altri le sue caratteristiche.`,

    frecce: {
      stress: { numero: 2, descrizione: "La reale o parziale perdita della persona amata determina questo passaggio. Diventa dipendente e quindi altruista manipolativo; passa dalla passione al rancore." },
      riposo: { numero: 1, descrizione: "È più disciplinato e centrato nel presente; sviluppa un minimo di concretezza; abbandona l'istinto e fa autocritica in modo costruttivo." },
    },
    ali: {
      sinistra: {
        numero: 3,
        descrizione: "Il 4 con ala 3 è maggiormente portato per relazioni personali e più ambizioso. È un estroverso che sa socializzare. Cura l'immagine ed è profondo interiormente.",
        somiglianza: "Ha le caratteristiche di un 8",
      },
      destra: {
        numero: 5,
        descrizione: "Il 4 con ala 5 è più introverso ed ha un profondo rispetto per gli altri; possiede risorse creative superiori a tutti gli altri enneatipi. È insicuro nelle relazioni e non sa negoziare.",
        somiglianza: "Ha le caratteristiche di un 9",
      },
    },
    sottotipi: {
      conservativo: {
        nome: "Conservativo (temerarietà, caparbietà)",
        descrizione: "È l'unico enneatipo a cui non importa la propria sicurezza; fa di tutto per essere diverso e si sente incompreso. Si spinge fino ai limiti estremi per sentirsi vivo. Ama la gara e la vittoria. Sono molto esigenti con se stessi e più seduttivi. Seguire i sogni è un imperativo. Non gli importa di accumulare denaro. Recriminano verso il destino. Di solito sono ala 3.",
        personaggi: "Lawrence d'Arabia, Van Gogh, Thomas Paine",
        segnoAstrologico: "Sagittario",
      },
      sociale: {
        nome: "Sociale (vergogna, imbarazzo)",
        descrizione: "Si sente incompreso e disprezzato da tutti ma non sa il perché. Ha paura che il suo aspetto fisico non sia apprezzato. Ha molta vergogna. Non pensa di poter essere amato e non è molto seduttivo. Di solito è ala 5. Cerca di supplire con la creatività. È fragile, sensitivo, sensibile. È amaro e sarcastico nei commenti. È il più ritirato e timido.",
        personaggi: "Toulouse-Lautrec, Marcel Proust",
      },
      sessuale: {
        nome: "Sessuale (competizione, odio)",
        descrizione: "Non si piange addosso. Può sembrare un 3 tanto che è competitivo, estroverso, aggressivo e loquace. Non è mai completamente soddisfatto. Ama il teatro, la musica e la passionalità: può morire d'amore e reputa l'odio migliore della indifferenza. È il più aggressivo (può essere scambiato per un 8).",
        personaggi: "Rabbi Nachman",
        segnoAstrologico: "Sagittario",
      },
    },
    lavoro: {
      descrizione: "Il 4 sceglie professioni dove il talento deve emergere o dove si comunica in modo particolare: psicologo, formatore, scrittore, giornalista.",
      mansioniAppropriate: "Analisi e ricerca, creazione di procedure di lavoro e qualità, deve essere possibile autorealizzazione.",
      mansioniNonAppropriate: "Se ci vuole immediatezza di azione e ci sono pluralità di obiettivi che generano stress o troppa azione.",
    },
    coppia: {
      descrizione: `Idealizza troppo le relazioni sentimentali. Mitizza la persona amata creandosi una immagine ideale e quando la reale non corrisponde, lascia il partner.

Ma dopo l'abbandono si sente abbandonato e quindi cerca un riavvicinamento. È un perfezionista che rincorre vanamente l'amore perfetto.`,
    },
    livelli: {
      disintegrato: "Tende a odiarsi per tutte le opportunità gettate e pensa che anche gli altri lo disprezzino. È apatico, stanco e bloccato emozionalmente. L'unica cosa che fa è stare fermo. Potrebbe pensare al suicidio per scomparire.",
      intermedio: "Comunica con gli altri con la creatività per non esporsi direttamente. Idealizza e fantastica un po' troppo anche il partner. Può essere timidissimo. Quando viene offeso fugge. Si ritiene libero di vivere come vuole.",
      integrato: "Vive a contatto con l'inconscio ed è in grado di trasformarne le pulsioni in qualche cosa di straordinario. È fortemente intuitivo, autentico e sincero. Aiuta gli altri a trovare la propria vocazione. È un fine umorista.",
    },
    astrologia: {
      segno: "Cancro (con tratti dei Pesci)",
      pianetaVedico: "Mercurio",
      pianetaDescrizione: "Se Mercurio è forte l'individuo appare intuitivo-creativo, versatile e intelligente; se debole diventa polemico, umorale ed invidioso.",
      controFreccia: "Vergine e Gemelli (influenza positiva)",
      versoFreccia: "Leone e Cancro (influenza negativa)",
      chakra: "5° Chakra (in gola)",
    },
    dsm: "Borderline",
    domandeUtili: [
      "Tendi a fare voli di fantasia?",
      "Ti ritieni una persona unica?",
      "Anche se ti vesti con quattro stracci, sono accuratamente studiati?",
      "Tendi ad aprirti e a stabilire fortissime amicizie solo con pochissime persone?",
      "La sofferenza è un elemento cardine per apprezzare la vita?",
    ],
    ideeSacre: {
      titolo: "Origine",
      descrizione: `Ogni cosa inizia in Dio e a Lui tornerà. Ogni apparente manifestazione è una manifestazione di Lui. Dio non è fuori di noi.

L'inganno dell'enneatipo 4 è quello di credere di possedere una identità separata, un io isolato, autonomo, diverso e unico. L'originalità è solo la manifestazione dell'ego.

Ci si sente scollegati, estraniati, alienati, reietti ed abbandonati. Quindi si è malinconici, tristi e disperati. La sorgente appare irraggiungibile.`,
    },
    evoluzione: "Un 4 si evolve se acquisisce qualità positive dell'ala 3 e dell'ala 5, dalla contro freccia 1 (più difficilmente dal verso freccia 2). Se rimane fermo rischia di assommare le sue qualità negative a quelle del verso freccia (2).",
  },

  5: {
    numero: 5,
    motto: "La conoscenza è potere",
    personalitaNaranjo: "Schizoide. Il grande saggio (Isaac Newton) che abbandona il mondo e pensa di studiare.",
    credenze: "La logica è estremamente importante; il sapere e la conoscenza sono l'unica cosa su cui posso contare.",
    valori: "La mente ed il pensiero",
    criterio: "Sapere",
    definizione: "Vuole avidamente accumulare conoscenza, evitando la stupidità ed il coinvolgimento emotivo. Il suo motto è \"Lasciatemi in pace\".",
    animale: "Ostrica, un vero enigma per gli altri",
    pnl: {
      accesso: "Auditivo: approccio con la realtà auditivo ed iperlogico. In un incontro nuovo soppesa parole e razionalità dell'interlocutore.",
      elaborazione: "Visivo: quando ascolta si fa delle immagini mentali delle parole.",
      gestualita: "Superlogico (personalità cerchio). In uscita usa la modalità auditiva.",
      sguardo: "A domanda secca guarda ad altezza occhi.",
    },
    centro: {
      tipo: "Mentale",
      domanda: "Che cosa penso?",
      nota: "Esagera nella sua razionalità dando troppo peso alla logica.",
    },
    comeSiVede: `Si vede assai obiettivo e razionale. È la logica che spiega la realtà e non l'emotività.

Potremmo definirlo Eremita perché è isolato emotivamente; può restare fermo anche per ore. Pianifica la giornata secondo regole logiche: incontri e dialoghi sono programmati a tavolino.

È geloso del suo spazio personale perché da piccolo era continuamente invaso dagli altri o continuamente lasciato solo.

È colto/a; insegue il sapere che gli serve per colmare il vuoto che ha dentro; ama visceralmente internet, le biblioteche e le librerie.

Tuttavia, il suo sapere non viene divulgato all'esterno. In genere non è un creativo. Rispetta le regole solo se sono logiche.

Non ama la socialità e veste trasandato/a. Ha bisogni minimi ed è autosufficiente. Non accetta autorità diversa da sé.

Eviterà spesso la competizione perché ha paura del coinvolgimento e delle emozioni. In gruppo sta silente, ma quando parla può essere una illuminazione o un annientamento.

Si rifugia nel pensiero per sfuggire alla sofferenza. Ama creare sistemi logici e razionali. È un osservatore che ama studiare le dinamiche altrui.`,

    comeSiRelaziona: `Il 5 fa impazzire il partner perché non si confronta e non parla: più lo incalzi e più lo perdi.

Rinuncia alla relazione per non essere lasciato. Non si concede per paura di perdere l'altro.

Nelle fasi intime di un rapporto iniziale appare molto distante dal partner. Chi ha il permesso di entrare nel suo mondo diventa un suo possesso oggetto di inquisizione.

Può sparire per un mese e pensare che il partner lo aspetterà come se niente fosse.`,

    comeRapportarsi: `Di solito vive le esperienze per capire come funzionano, con approccio scientifico.

Il clima deve essere scevro da sentimentalismi. Si sente a suo agio quando può fare sfoggio della sua conoscenza.

Non forzarlo a parlare: parla solo quando vuole lui, è molto riservato. Evitare di stimolare un'apertura affettiva in pubblico.

Di fronte ad un problema è un bene chiedere a lui («Che cosa altro si potrebbe fare?»). Sollecitarlo a fare le connessioni logiche che ama.

Le sue amicizie sono a scomparti: gli amici del giorno non sono quelli della notte.`,

    frecce: {
      stress: { numero: 7, descrizione: "Quando esaurisce le sue risorse attinge a quelle del 7: si distacca dalla realtà per pianificare mille cose. Diventa attivo ma non costruisce. Perde il controllo della realtà." },
      riposo: { numero: 8, descrizione: "Assorbe l'espressione della potenza, abbandona la teoria e passa alla pratica. Dal ricevere passa al dare e si apre." },
    },
    ali: {
      sinistra: {
        numero: 4,
        descrizione: "Nel 5 con ala 4 la razionalità e la sensibilità sono fuse assieme; dall'unione nascono persone geniali, intuitive e dotate di un alto livello intellettuale.",
        somiglianza: "Ha le caratteristiche del 9",
      },
      destra: {
        numero: 6,
        descrizione: "Il 5 con ala 6 non ama i contatti sociali e tende a diffidare dei propri interlocutori. Può apparire impacciato o freddo. È polemico e talvolta arrogante. Le sue ricerche sono più importanti dei rapporti umani.",
        somiglianza: "Ha le caratteristiche dell'1",
      },
    },
    sottotipi: {
      conservativo: {
        nome: "Conservativo (eremo)",
        descrizione: "È il più isolato e autistico, portato a crearsi un comodo rifugio ove cerca di dimenticarsi del mondo. Può vivere in una sola stanza inaccessibile ai più. È felice di vivere così. Ma è anche il più amabile, protettivo e collaborativo.",
        personaggi: "Giovanni della Croce, Franz Kafka, José Saramago",
        segnoAstrologico: "Vergine",
      },
      sociale: {
        nome: "Sociale (totem)",
        descrizione: "Vede alcune persone come divine ed altre non interessanti. Cerca di diventare eletto di un maestro e di appartenere ad un gruppo chiuso. Il mondo ordinario non merita la sua attenzione. Spesso è un collezionista specializzato. Adora insegnare ma solo a chi non fa domande. È il 5 più ritirato.",
        personaggi: "Newton, Darwin, Einstein, Buddha, Talete, Pitagora, Democrito, Leonardo",
      },
      sessuale: {
        nome: "Sessuale (fiducia)",
        descrizione: "Cerca di formare un gruppetto di persone con cui scambiarsi segreti. Sa che esistono persone in grado di apprezzarli e sostenerli. Conosce la sua base emotiva, ma non gli va di esprimerla. È il più propenso ad andare contro.",
        personaggi: "Nietzsche, Jean Jacques Rousseau, Ralph Waldo Emerson, Antonio Machado",
      },
    },
    lavoro: {
      descrizione: "Il 5 predilige i lavori autonomi dove può concentrarsi e gestire i tempi (raccolta dati, bibliotecario, raccolta di flussi informativi).",
      mansioniAppropriate: "Lavori in autonomia nell'ambito di grandi progetti, analisi dei dettagli e progettazione, ottimizzazione dei flussi di comunicazione aziendali.",
      mansioniNonAppropriate: "Mansioni legate all'immagine e al contatto col pubblico, quando è richiesta improvvisazione, se sono richieste decisioni immediate.",
    },
    coppia: {
      descrizione: `Il 5 fa impazzire il partner perché non si confronta e non parla. Rinuncia alla relazione per non essere lasciato.

Non si concede per paura di perdere l'altro: si redime quando riesce ad amare senza paura. Nelle fasi intime appare molto distante.

In seguito, può eleggere il sesso come mezzo esclusivo di comunicazione. Chi entra nel suo mondo diventa un suo possesso.`,
    },
    livelli: {
      disintegrato: "Tiene distanti gli altri perché pensa di essere odiato tanto quanto odia loro. Può pensare di essere controllato da una autorità superiore e perseguitato anche da amici (paranoici). Dorme pochissimo e alla lunga può diventare schizofrenico.",
      intermedio: "La compulsione a ricercare il sapere è esagerata. Si interessa più ai dettagli che all'insieme. Investe grosse cifre in strumenti di conoscenza. Ama gli enigmi ed i giochi intellettuali. Nelle conversazioni salta di palo in frasca. Vuole diventare onnisciente.",
      integrato: "Non cerca più la conoscenza, ma cerca di collegarne i vari aspetti come nessuno ha mai fatto (epistemologi). Può sfidare i dogmi esistenti. La potenza rivoluzionaria dei suoi progetti può cambiare il corso della storia.",
    },
    astrologia: {
      segno: "Scorpione e Capricorno",
      pianetaVedico: "Saturno",
      pianetaDescrizione: "Se Saturno è forte gli individui appaiono attenti, competenti e pratici. Se debole: vedute ristrette, avarizia ed egocentrismo.",
      controFreccia: "Bilancia e Capricorno (influenza positiva)",
      versoFreccia: "Scorpione e Sagittario (influenza negativa)",
      chakra: "1° Chakra (base spina dorsale)",
    },
    dsm: "Schizoide",
    domandeUtili: [
      "Tendi a voler raccogliere molte informazioni?",
      "Odi gli incontri a sorpresa e un po' «stretti»?",
      "Giudichi male le persone troppo emotive?",
      "Per te il sapere (conoscenza) è importante?",
      "A volte pensi di essere osservato da qualcuno, amici o altro?",
    ],
    ideeSacre: {
      titolo: "Onniscienza",
      descrizione: `Al punto 5 troviamo la sacra Onniscienza e la sacra Trasparenza.

Noi siamo una estensione del tutto, una cellula di Dio. L'errore è considerarsi entità separate.

Siamo differenti, ma non separati: il mondo è un magnifico tappeto persiano pieno di colori o un mandala con al centro Dio.

L'enneatipo 5 quando perde la fiducia fondamentale si sente piccolo, tagliato fuori, separato, isolato, vuoto e impoverito. Di fronte a questa percezione si apparta nel tentativo di nascondersi dalla realtà.`,
    },
    evoluzione: "Un 5 si evolve se acquisisce qualità positive dall'ala 4 e dall'ala 6, dalla contro freccia 8 (più difficilmente dal verso freccia 7). Se rimane fermo rischia di assommare le sue qualità negative a quelle del verso freccia (7).",
  },

  6: {
    numero: 6,
    motto: "Fidarsi è bene, non fidarsi è meglio",
    personalitaNaranjo: "Evitante e paranoide. Lo scettico.",
    credenze: "Esporsi troppo è pericoloso. Niente è quello che sembra. La vita è piena di pericoli e problemi.",
    valori: "Fedeltà / affidabilità",
    criterio: "Sicurezza",
    definizione: "Lo scettico. Non sopporta chi non si attiene alle leggi, alle regole. Il suo vizio è la paura e la sua trappola la vigliaccheria o l'aggressività.",
    animale: "Cane Lupo: cane da difesa valido, guai a toccare i suoi cari",
    pnl: {
      accesso: "Auditivo: estremamente iperlogico; soppesa parole e razionalità dell'interlocutore; se mancano diventa dubbioso e diffidente.",
      elaborazione: "Visivo: ascolta e crea immagini mentali al fine di decidere.",
      gestualita: "Accusatore (uomo asta). Fa parte del triangolo: risponde in visivo e non in auditivo (eccezione).",
      sguardo: "Guarda ai lati degli occhi (accesso auditivo).",
    },
    centro: {
      tipo: "Mentale",
      domanda: "Che cosa penso?",
      nota: "Gela il suo pensiero cercando la sicurezza nelle logiche codificate dalla società o dall'etica che lo circonda.",
    },
    comeSiVede: `Come il paladino dei deboli a cui sacrifica se stesso con fedeltà.

Ha avuto genitori dai comportamenti imprevedibili (violenti o emozionalmente freddi). Nasce da punizioni ingiustificate ricevute da adulti poco affidabili.

Utilizza la proiezione: parti di sé ritenute inaccettabili vengono attribuite agli altri. Pensa sempre a «Dove è la fregatura?».

La diffidenza può arrivare a livelli incredibili. Desidera un ruolo di lavoro definito e sicuro. Rimanda il successo in modo esasperante.

Può essere fobico e contro fobico: il primo trema di paura ed il secondo aggredisce, si lancia in imprese impossibili.

La lealtà e la fiducia sono elementi fondamentali nella sua vita. Si prepara sempre per affrontare il peggio.

È meglio non fidarsi della gente: pensa molto e organizza, si informa sulle regole.

Tende spesso a identificarsi coi perdenti. Non è presuntuoso. Lo incarna Paolo Villaggio ed in particolare il suo personaggio Giandomenico Fracchia.

Ha un comportamento ambivalente e contraddittorio.`,

    comeSiRelaziona: `Quando concede la sua fiducia si fida ciecamente e chi lo tradisce non riacquista fiducia facilmente.

Cerca di controllare ogni situazione. Non partirebbe mai per un luogo che non conosce senza un viaggio organizzato.

Fa il grosso con i deboli ed il cattivo con i più forti. Entrambi i comportamenti si basano sul non volere essere sopraffatto dalla paura.`,

    comeRapportarsi: `Per il 6 bisogna creare un ambiente sicuro. Bisogna rispettare le regole e gli impegni che si prendono.

Non bisogna fare critiche se prima non si spiegano. I 6 amano l'intelligenza (come i 4).

Non riescono a prendere decisioni facilmente. Il 6 contro fobico dice facilmente «dopo vedremo».

Con il 6 si deve lavorare sulla paura. Il 6 può anche aggredire ma per paura.`,

    frecce: {
      stress: { numero: 3, descrizione: "Quando pensa di essere manipolato e di ricevere una grossa fregatura va in 3; diventa servile e falso verso la persona che ha scelto come autorità; se aumenta la paura tradisce tutti." },
      riposo: { numero: 9, descrizione: "Riesce a rapportarsi meglio e a vedere la situazione da più punti di vista. È più sereno e si fida di sé." },
    },
    ali: {
      sinistra: {
        numero: 5,
        descrizione: "Il 6 ala 5 è competente, formale ed osservatore dei suoi simili; ha buone capacità analitiche che consentono di prevedere gli eventi. È però litigioso, cinico e pessimista.",
        somiglianza: "Prende le caratteristiche dell'1",
      },
      destra: {
        numero: 7,
        descrizione: "Il 6 ala 7 è più estroverso e socievole (brioso, simpatico e ama le relazioni). Può realizzarsi molto bene nel contatto col pubblico.",
        somiglianza: "Ha le caratteristiche del 2",
      },
    },
    sottotipi: {
      conservativo: {
        nome: "Conservativo (calore)",
        descrizione: "Tende ad essere gentile per non essere attaccato. Pensa che se piace agli altri non verrà attaccato. Si mostra leale, affettuoso e cordiale. È quasi sempre fobico. Segue riti e abitudini. Desidera ardentemente sposarsi e avere una famiglia. È il più seduttore e conciliante dei tre.",
        personaggi: "Krishnamurti, Gandhi, Gesù Cristo, Franz Shubert, Dostoevskij",
        segnoAstrologico: "Cancro (con tratti della Vergine se ala 5)",
      },
      sociale: {
        nome: "Sociale (dovere)",
        descrizione: "È sicuro e pacificato quando compie il proprio dovere; è tanto rigido che sembra un 1 sociale. Diffida delle innovazioni, apprezza attività con chiara gerarchia. Segue le regole del gruppo. Cerca sicurezza in una fede, in un partito, nella razionalità. Collegato ad una autorità astratta interiorizzata.",
        personaggi: "Sri Aurobindo, Freud",
        segnoAstrologico: "Toro",
      },
      sessuale: {
        nome: "Sessuale (forza, bellezza)",
        descrizione: "Cura l'aspetto fisico come farebbe un 3, ma lo scopo è trovare sicurezza. Spesso pratica palestra o attività sportiva regolare. Nel lavoro non ama cambiare ruolo. È il più estroverso dei 6 ma se contro fobico manifesta durezza; se fobico è timido e particolarmente devoto.",
        personaggi: "Platone, Michelangelo, Beethoven",
      },
    },
    lavoro: {
      descrizione: "Il 6 ama il gioco di squadra perché così definisce il suo ruolo; è il dipendente leale per anni; può essere spesso un militare.",
      mansioniAppropriate: "Fobico: esecutive e di routine, lavori di squadra. Contro fobico: mansioni dove dimostra coraggio e problem solving.",
      mansioniNonAppropriate: "Per il fobico: cambiamenti improvvisi e decisioni immediate fuori da una squadra. Per il contro fobico: mansioni esecutive e di routine.",
    },
    coppia: {
      descrizione: `È devoto e leale se si fida dell'altro. La devozione aumenta se la coppia fa argine contro l'esterno.

Se viene meno la fiducia possono rifiutarsi di far sesso sino al ripristino.

L'amore e i piaceri della vita vengono dopo la sicurezza economica, e siccome nella vita si è sempre insicuri non se li concedono quasi mai.`,
    },
    livelli: {
      disintegrato: "È terribilmente ansioso ed insicuro. Ha costante paura degli altri. Un incidente terribile è sempre imminente. La gente trama alle sue spalle e l'autorità lo odia. È alla ricerca di qualcosa che possa creare paura ed angoscia.",
      intermedio: "Sviluppa dipendenza con chi si impegna e non riesce a prendere decisioni autonome. Più la decisione è importante più aumenta la paura. Può essere servile o aggressivo. È spesso nervoso e stanco. È un tradizionalista.",
      integrato: "Ha fede in se stesso e non più nelle figure autoritarie. Questo lo fa diventare coraggioso. Cura l'aspetto fisico e diventa seducente; conquista con la fiducia, la speranza e l'amore.",
    },
    astrologia: {
      segno: "Si potrebbe avvicinare al Capricorno",
      pianetaVedico: "Nodo lunare Ketu",
      pianetaDescrizione: "Se Ketu è forte l'individuo è forte, capace di sacrificio e perseverante. Se debole è dipendente e pauroso.",
      controFreccia: "Sagittario, Acquario, Pesci e Capricorno (influenza positiva)",
      versoFreccia: "Vergine, Scorpione, Bilancia e Leone (influenza negativa)",
      chakra: "Non corrisponde a nessun Chakra",
    },
    dsm: "Paranoide / Ossessivo-compulsivo",
    domandeUtili: [
      "Per te la fiducia ha un valore importante?",
      "Pensi che la gente tenti di ingannarti?",
      "Tendi ad essere aggressivo?",
      "Scegli lavori che ti danno sicurezza economica anche se non ti piacciono?",
      "Nelle decisioni importanti hai bisogno che sia qualcun altro a decidere?",
    ],
    ideeSacre: {
      titolo: "Forza e Fede",
      descrizione: `Nella nostra anima esiste una verità perfetta, amabile ed intrinsecamente buona.

La sacra Forza significa che riconosciamo l'essenza; da ciò nasce la sacra Fede ossia una trasformazione che ci porta ad essere fiduciosi.

L'enneatipo 6 manca di fiducia nell'uomo e nell'universo. Pensa che la vita sia una lotta per la sopravvivenza.

Per l'enneatipo 6 il mondo è un luogo pericoloso e non esiste un'essenza interiore che ci guida. Fare esperienza della sacra Forza significa sentire il sostegno, la forza, la sicurezza che affiorano quando riconosciamo che l'essenza è ciò di cui siamo costituiti.`,
    },
    evoluzione: "Un 6 si evolve se acquisisce qualità positive dall'ala 5 e dall'ala 7, dalla contro freccia 9 (più difficilmente dal verso freccia 3). Se rimane fermo rischia di assommare le sue qualità negative a quelle del verso freccia (3).",
  },

  7: {
    numero: 7,
    motto: "Vivere sulle ali della libertà",
    personalitaNaranjo: "Sindrome narcisistica. L'artista (Ulisse, Benigni).",
    credenze: "La vita è un «parco divertimenti». Se non hai la possibilità di scegliere sei finito.",
    valori: "Libertà",
    criterio: "Libertà di scelta",
    definizione: "Ultimo dei caratteri di pensiero. Amadeus di Nilos Forman è proprio un 7: gola e divertimento, anche sul letto di morte è in grado di immaginare un requiem fantastico.",
    animale: "Peter Pan (eterno bambino)",
    pnl: {
      accesso: "Visivo: il rapporto con la realtà è basato sulle immagini; l'estetica è fondamentale anche se spesso eccentrica.",
      elaborazione: "Cenestesico: quando decide si basa sulle sensazioni; amici e acquisti dipendono da queste ultime.",
      gestualita: "Accusatore. Ha gli stessi canali del 3 (V e K) ma si differenzia perché gesticola in accusatore e non porta spesso i lavori a termine.",
      sguardo: "Guarda in alto (accesso visivo).",
    },
    centro: {
      tipo: "Mentale",
      domanda: "Che cosa penso?",
      nota: "Esagera perché dà poca importanza alla logica, volendo vivere a briglia sciolta.",
    },
    comeSiVede: `Come un amante della vita, allegro e spensierato, in continua evoluzione spirituale, ottimista convinto.

È stato/a bambino/a felice a cui è accaduta una disgrazia: dall'Eden è stato scacciato. Ha paura per tutta la vita della sofferenza propria ed altrui.

Non vuole pensare al dolore e spera di ricostituire l'Eden perduto: è un eterno Peter Pan.

È chiamato artista perché le immagini creano emozioni molto intense. È un ottimo conversatore. Possiede una gioia innata.

È energico (iperattivo), ottimista, spensierato, allegro. Inizia mille cose e non ne conclude una: ha talenti in più aree. Conosce un sacco di cose, ma non in profondità.

Carismatico e ottimo comunicatore. È un grande movimentatore di serate. Dietro la fragorosa risata cela una forte fragilità.

È avventuroso, talentuoso, estroverso e popolare. Si concentra sulla libertà: non vuole rapporti impegnativi.

La sua principale preoccupazione è il divertimento e il piacere che cerca di condividere.`,

    comeSiRelaziona: `Ama quelli come lui. Passa facilmente dall'innamoramento all'indifferenza.

Sono anti-autoritari. Odiano farsi carico delle responsabilità altrui. Non è accondiscendente.

Si sente in trappola quando gli viene chiesto aiuto. Può prendere tre appuntamenti per la stessa ora.

Non riesce a tollerare i sentimenti negativi. I 7 sono generosi. Spesso si appoggia ad un 1 che lo fa sentire meno «brutto».`,

    comeRapportarsi: `Essere ottimisti sorridenti. Lasciare margine di manovra. Mantenersi indipendenti.

Ascoltarlo con piacere. Essere interessati ai suoi princìpi e valori. Va molto gratificato: gli piacciono i complimenti.

Dimostrarsi franchi e diretti. I 7 ed i 5 sono molto litigiosi tra loro.`,

    frecce: {
      stress: { numero: 1, descrizione: "Quando le risorse per non fermarsi si esauriscono, adotta un sistema di credenze inespugnabili che difende con aggressività. Rigido, intollerante, permaloso e critico." },
      riposo: { numero: 5, descrizione: "Riesce ad entrare nel proprio intimo e ad affrontare i suoi incubi. Accetta la dualità della vita: felicità e tristezza, bontà e cattiveria." },
    },
    ali: {
      sinistra: {
        numero: 6,
        descrizione: "Il 7 con ala 6 nutre un maggiore interesse per le persone e proietta un'immagine di successo; è spensierato ed arguto; ha più riguardo per le regole; se può evita le sfide verbali.",
        somiglianza: "Assomiglia al 2",
      },
      destra: {
        numero: 8,
        descrizione: "Il 7 con ala 8 ha un maggiore contatto con la realtà e quindi quando progetta esegue. Pretende che sia tutto suo; è il più innamorato di se stesso ed ha personalità aggressiva.",
        somiglianza: "Assomiglia al 3",
      },
    },
    sottotipi: {
      conservativo: {
        nome: "Conservativo (famiglia)",
        descrizione: "Si circonda di persone che la pensano come lui per essere protetto. La famiglia è molto importante. Può essere leader di movimenti sociali. È il più caloroso a livello affettivo, ma anche parsimonioso ed energico. Sempre allegro, detesta essere autoritario. È il più simile all'8.",
        personaggi: "Francis Bacon",
      },
      sociale: {
        nome: "Sociale (sacrificio, adattamento)",
        descrizione: "Sente un forte senso di responsabilità per la causa a cui si dedica e può rimandare il piacere. Ha sempre un atteggiamento fraterno ed amichevole. Si lancia in tanti progetti ma ha in mente una via d'uscita. Idolatra il padre. Sente che la sua mente è più agile di quella altrui.",
        personaggi: "San Francesco d'Assisi",
        segnoAstrologico: "Acquario",
      },
      sessuale: {
        nome: "Sessuale (stupore)",
        descrizione: "Salta da un fiore all'altro: non coltiva relazioni a lungo termine. Non sopporta l'abitudine e la routine. È il più appariscente, un inguaribile ottimista, divertente e popolare. È il più impulsivo ed estroverso.",
        personaggi: "Re Davide, Ibn Arabi, Emanuel Swedenborg",
      },
    },
    lavoro: {
      descrizione: "Predilige la libera professione quando si traduce in mansioni attive (ottimo venditore).",
      mansioniAppropriate: "Animazione, vendita, contatto col pubblico, attività di reazione e velocità, creatività, da svolgere in autonomia.",
      mansioniNonAppropriate: "Analisi e pianificazione, routine, con elevato controllo gerarchico.",
    },
    coppia: {
      descrizione: `Se qualcuno prova a limitarlo viene allontanato anche se il 7 lo ama.

È disposto ad impegnarsi nelle relazioni solo se mantiene la sensazione di libertà.

Nei rapporti occasionali getta tutto se stesso, ma il giorno dopo può mostrarsi glaciale.

L'attrazione per gli altri è morbosa: se incontra qualcuno più interessante del partner può perdere ogni interesse.`,
    },
    livelli: {
      disintegrato: "È alla costante ricerca di brividi ed emozioni. Se non ottiene quello che vuole diviene maleducato ed offensivo. Urla, piange o ride a crepapelle. Finita l'iperattività cade in depressione.",
      intermedio: "È un avido materialista e la paura della miseria lo spinge a chiedere sempre di più. È un ottimo attore quando vuole togliere di mezzo qualcuno. Ricerca costantemente il divertimento e ha sempre voglia di cambiare.",
      integrato: "Si gode ciò che la vita gli offre senza il costante pensiero di andare a cercarlo. L'obiettivo diventa la felicità interiore. Recupera facilmente dalle situazioni negative. Prova piacere nel far sentire felici gli altri. La sua capacità realizzativa aumenta sensibilmente.",
    },
    astrologia: {
      segno: "Gemelli e Sagittario",
      pianetaVedico: "Giove",
      pianetaDescrizione: "Se Giove è forte il soggetto è ottimista, pianifica di avere contatto col mondo. Se debole ne deriva un soggetto debole, intemperante e bizzarro.",
      controFreccia: "Sagittario e Scorpione (influenza positiva)",
      versoFreccia: "Acquario ed Ariete (influenza negativa)",
      chakra: "2° Chakra (sopra i genitali)",
    },
    dsm: "Narcisista",
    domandeUtili: [
      "Per te la libertà è un valore irrinunciabile?",
      "Tendi a lasciare a metà quello che fai per iniziare qualcos'altro?",
      "Tendi ad essere iperattivo?",
      "Esprimi le tue opinioni anche a rischio di metterti nei guai?",
      "Detesti chi ti carica dei suoi problemi facendoti sentire in obbligo?",
    ],
    ideeSacre: {
      titolo: "Saggezza, Lavoro, Progetto",
      descrizione: `La fissazione dell'enneatipo 7 è quella di pianificare come vuole essere, la convinzione di dirigere il proprio disvelamento.

In realtà così facendo si perde la capacità di sapere che cosa fare e dove andare.

La sacra Saggezza significa non sapere che cosa accadrà dopo, per cui l'unica cosa da fare è rilassarsi.

C'è un sacro progetto, un sacro Lavoro che opera per noi. Rilassandoci siamo.`,
    },
    evoluzione: "Un 7 si evolve se acquisisce qualità positive dall'ala 6 e dall'ala 8, dalla contro freccia 5 (più difficilmente dal verso freccia 1). Se rimane fermo rischia di assommare le sue qualità negative a quelle del verso freccia (1).",
  },

  8: {
    numero: 8,
    motto: "La potenza è nulla senza il controllo",
    personalitaNaranjo: "Antisociale e sadica. Il capo, il lottatore per eccellenza (Mike Tyson, Martin Luther King).",
    credenze: "Il mondo è un posto crudele e spietato dove solo il più forte sopravvive. La gente o è con me o è contro di me.",
    valori: "Lealtà / forza",
    criterio: "Controllo",
    definizione: "Nessuno controlla il territorio come lui. Il suo vizio è la lussuria e la sua trappola la vendetta, la ritorsione e la \"punizione\" del colpevole.",
    animale: "Mastino",
    pnl: {
      accesso: "Auditivo: vaglia con attenzione logica e argomentazioni dell'interlocutore; il suo approccio è razionale in linea con la realtà.",
      elaborazione: "Cenestesico: come per il 7, prende le decisioni in base alla sensazione. Tutto è valutato in base alla soddisfazione fisica ed emozionale.",
      gestualita: "Superlogico (personalità cerchio). Potenzialmente collaborativo a meno che non incontri un 1.",
      sguardo: "Guarda ai lati degli occhi (accesso auditivo).",
    },
    centro: {
      tipo: "Istintivo",
      domanda: "Che cosa faccio?",
      nota: "Esagera nella azione e nella reazione. Pensa che deve essere \"cattivo\" perché essere buoni significa essere deboli.",
    },
    comeSiVede: `Si vede come un tutore dei suoi amici e dei più deboli che protegge opponendosi alle ingiustizie.

Da piccolo il mondo era controllato dalla legge del più forte. Ha subito aggressioni fisiche e/o verbali. Ha sviluppato una strategia: controllo, aggressività e forza.

Da bambino ha imparato a rifiutare i propri limiti per sembrare forte (diniego).

Non è diplomatico. Le regole per portare giustizia le stabilisce lui. Ama il dominio e la leadership. Ama la bellezza. Ama la sincerità. Ama gli scontri diretti.

Ha un'ossessione del controllo che gli impedisce di godere pienamente della libertà.

È poco interessato al suo mondo interiore, ma coglie subito l'ipocrisia. È leale e offre protezione.

Grande affabulatore: molto abile nel persuadere. La vita per l'8 va vissuta fino in fondo e con forza: mai fare compromessi.

Si sfoga e lascia sfogare: non è rancoroso. Per lui la vita non è mai facile, visto che è un campo di battaglia.

Solo l'avversario che accetta lealmente la lotta diventa degno della sua stima.`,

    comeSiRelaziona: `È interessato ai bisogni degli altri, ma decide lui quali siano. Negoziare e discutere deve avere qualche utilità.

Non cede mai sotto pressione. Si innervosisce se c'è lentezza di comprensione e stupidità.

Un 8 in un gruppo o come partner rassicura: ma guai a sfuggire al suo controllo o a parlargli dietro le spalle.

Delega molto ed è bravissimo a scegliere i collaboratori. È un negoziatore aggressivo.`,

    comeRapportarsi: `Mai domandare ad un 8 «Come ti senti?», ma sempre «Che cosa ti dà fastidio?»

Avendo un carattere «azione» bisogna chiedergli «che cosa vuoi fare?». Quando chiede la parola, non dargliela equivale a dichiarazione di guerra.

Mai zittire un 8. Affrontarlo con atteggiamento tranquillo. Mantenere gli impegni e non essere conformisti.

Non cercare di manipolarlo facendo presa sui sentimenti. Non mostrarsi indecisi.`,

    frecce: {
      stress: { numero: 5, descrizione: "Se ha paura di perdere il controllo pensa alle ritorsioni. Perde la sua forza, vede nemici ovunque. Può diventare molto pericoloso e paranoico." },
      riposo: { numero: 2, descrizione: "Siccome il suo dominio non è posto in discussione, riesce a placare la sete di potere e scoprire il suo lato tenero; capisce che anche servire può avere valore." },
    },
    ali: {
      sinistra: {
        numero: 7,
        descrizione: "L'8 con ala 7 ha una personalità assertiva che ama stare al centro della attenzione; ha molta fiducia nelle sue capacità. Può fare tante cose perché ha molta energia. Ha spiccato senso degli affari.",
        somiglianza: "Assomiglia ad un 3",
      },
      destra: {
        numero: 9,
        descrizione: "L'8 con ala 9 preferisce coordinare il gruppo piuttosto che gestire il potere. Diffonde tranquillità ed energia e pare meno aggressivo; può essere gentile e accomodante o aggressivo e bellicoso.",
        somiglianza: "Assomiglia al 4",
      },
    },
    sottotipi: {
      conservativo: {
        nome: "Conservativo (dominio, soddisfazione)",
        descrizione: "Guadagna potere attraverso gli abusi; vive in un bunker, il controllo dello spazio è importante. Compra cibo in quantità industriale. Ama accumulare qualunque cosa sia necessaria per la sopravvivenza. Vuole una vita piena di soddisfazioni. Sa stare anche da solo.",
        personaggi: "Gurdjieff",
      },
      sociale: {
        nome: "Sociale (complicità, alleanza)",
        descrizione: "Fa di tutto per proteggere amici e deboli e cerca di farli incontrare tra loro. È prezioso nei tempi duri perché dà sempre sostegno. Gli amici sono un'ottima fonte di informazione per mantenere il controllo. È molto fazioso con gli amici e gaudente. È la forma meno antisociale, guadagna potere attraverso l'alleanza.",
        personaggi: "Socrate, Martin Luther King, Fidel Castro",
      },
      sessuale: {
        nome: "Sessuale (possesso, arrendevolezza)",
        descrizione: "Pretende dedizione ed in cambio si dona. Tutti i segreti devono essere condivisi. Esistono 8 forti ma sottomessi in coppia. Ama donne/uomini belli e macchine potenti. Esercita possesso sul partner. Sono orgogliosi della loro durezza. È il più antagonista e incline ad essere apertamente antisociale.",
        personaggi: "Diogene",
      },
    },
    lavoro: {
      descrizione: "L'8 predilige lavori in autonomia a capo di un gruppo; se dipendente lavora per ottenere autonomia.",
      mansioniAppropriate: "Controllo del personale, con libertà d'azione, ove può mostrare la sua forza, a capo di un gruppo.",
      mansioniNonAppropriate: "Dove è richiesta «cieca» dipendenza, poco attive e di concetto, con un gruppo ove sono tutti autonomi.",
    },
    coppia: {
      descrizione: `Incentra i rapporti di coppia sulla lealtà. Il partner è di suo possesso: lo difende anche dagli spasimanti.

Infonde senso di protezione e sicurezza, ma è duro e concreto: non consola il partner in difficoltà.

Se il partner non sfugge talvolta al suo controllo l'8 può perdere ogni interesse.`,
    },
    livelli: {
      disintegrato: "Si comporta in modo opprimente verso il prossimo togliendogli diritti e libertà. Al minimo pericolo fa scattare ritorsioni senza mostrare debolezze. Si sente autorizzato a distruggere: ciò accresce il suo ego.",
      intermedio: "È individualista e ama la libera iniziativa per poter controllare. Sfida il rivale ed è felice quando cede subito. La sicurezza gli proviene dalla vittoria e dal poter considerare le persone semplici pedine. Se è ricco si sente onnipotente.",
      integrato: "Ha un forte autocontrollo ed è tollerante verso gli altri. Al coraggio e alla forza si aggiunge un equilibrio psicologico che gli permette di fare del bene. È così responsabile che si addossa anche i fallimenti di chi confida in lui.",
    },
    astrologia: {
      segno: "Non indicato un segno dominante specifico",
      pianetaVedico: "Venere",
      pianetaDescrizione: "Se Venere è forte il soggetto impone la sua volontà con carisma, eleganza e fascino. Se debole: egoista, senza rispetto e eccessivamente lussurioso.",
      controFreccia: "Toro e Pesci (influenza positiva)",
      versoFreccia: "Bilancia e Capricorno (influenza negativa)",
      chakra: "4° Chakra (lungo la spina dorsale a livello del cuore)",
    },
    dsm: "Antisociale / Narcisista",
    domandeUtili: [
      "Per te il controllo è importante?",
      "Tendi ad essere aggressivo verbalmente?",
      "Non sopporti di essere controllato?",
      "Difendi chi ti sta vicino anche se ha torto?",
      "Stimi chi sa farsi valere con forza?",
      "Odi inganni e finzioni?",
    ],
    ideeSacre: {
      titolo: "Verità",
      descrizione: `Non esiste distinzione tra Dio, l'universo, il mondo e gli uomini. Il concetto di sacra verità nega la dualità.

L'ego dell'enneatipo 8 crede nella dualità, ma la dualità è un inganno.

L'enneatipo 8 ha perso la fiducia fondamentale ed allora parte dal presupposto che ogni cosa sia in contrasto con l'altra e che qualcuno sia il colpevole: bisogna vendicarsi e punirlo.

Può pensare di aver fatto qualcosa di sbagliato per aver perso il contenimento; per evitare di autopunirsi proietta la propria colpa sugli altri. Con la vendetta cerca di recuperare la condizione originaria di unità.`,
    },
    evoluzione: "Un 8 si evolve se acquisisce qualità positive dall'ala 7 e dall'ala 9, dalla contro freccia 2 (più difficilmente dal verso freccia 5). Se rimane fermo rischia di assommare le sue qualità negative a quelle del verso freccia (5).",
  },

  9: {
    numero: 9,
    motto: "Vivere in pace, a qualsiasi costo!",
    personalitaNaranjo: "Dipendente, ma anche rassegnata priva di iniziativa e pronta a farsi da parte. Il diplomatico.",
    credenze: "I problemi si risolvono da soli. Sono una persona soddisfatta e non ho particolari esigenze.",
    valori: "Pace / armonia",
    criterio: "Armonia / serenità",
    definizione: "Cerca di prevenire ed evitare i conflitti. Per il 9 l'ideale è la pace e l'omeostasi.",
    animale: "Acqua che prende la forma del contenitore",
    pnl: {
      accesso: "Cenestesico: in un nuovo incontro bada alle sensazioni che prova; lo stimola la persona amichevole ed emozionale.",
      elaborazione: "Auditivo: i suoni sono importanti per le sue scelte; ragiona troppo e non agisce.",
      gestualita: "Superlogico nei gesti (personalità cerchio). La sua è la personalità collaborativa per eccellenza. Si esprime in canale di elaborazione perché vertice del triangolo.",
      sguardo: "Guarda in basso a sinistra (accesso cenestesico).",
    },
    centro: {
      tipo: "Istintivo",
      domanda: "Che cosa faccio?",
      nota: "Si blocca evitando ogni attività che possa minare la sua pace.",
    },
    comeSiVede: `Ritiene di essere una brava persona. Sostiene che il mondo non cambierebbe granché se lui esistesse o no.

Nasce in un ambiente familiare ove non viene preso in considerazione. Il 9 è un bambino trascurato, quasi invisibile; ha fatto della solitudine il suo punto di forza.

Non ricevendo amore decide di donarlo per colmare il vuoto e si adatta agli altri: è figura camaleontica. Può essere gentile anche con chi non gli piace.

Il suo problema è l'accidia (inerzia, indolenza). La sua è una pigrizia mentale: non vuole guardare dentro se stesso.

Vuole evitare il conflitto: conosce strategie per evitare i contrasti. È difficile capire ciò che pensa, perché prende la posizione dell'altro.

Per il 9 è difficile dire di no. È stabile, gioioso, amichevole ed equilibrato. Fa da paciere.

Non conosce i suoi bisogni ed incorpora quelli delle persone vicine. Non riesce ad occuparsi di sé.

Sottovaluta le sue qualità che considera ovvie. Fa cose poco importanti e rimanda quelle importanti. Ama le strutture che decidono per lui. Quando decide è però cocciuto.

Ama seguire i programmi. Dirige la rabbia contro se stesso autopunendosi. È ottimista: i suoi problemi si risolvono da soli.`,

    comeSiRelaziona: `Si occupa degli altri per avere il suo posto nel mondo. Spesso distoglie l'attenzione da emozioni intense (deflessione).

Sembra un buon ascoltatore, ma in realtà si distrae facilmente. Per il 9 la sicurezza è potersi dimenticare di sé.

Il 9 non sa che cosa vuole, ma sa stare nell'intimità senza alzare la voce.`,

    comeRapportarsi: `Non cercare lo scontro. Complimentarsi. Chiedere la sua opinione. Lasciarlo parlare.

Discute per capire come trovare un accordo. Spesso fa troppe concessioni pur di non litigare.

Occorre aiutarlo a tollerare l'ansia. È difficile capire di che cosa ha bisogno. La libertà per il 9 è importante.

Emotivamente è molto controllato. Non dare per scontato che non provi sentimenti negativi come la vergogna.

Combattere la sua passività può essere inutile. Non gli si può chiedere di non essere in sintonia con i bisogni degli altri.`,

    frecce: {
      stress: { numero: 6, descrizione: "Aumenta la sua pigrizia e si affida mani e piedi ad una persona autoritaria; aumenta la narcotizzazione con abitudini e routine." },
      riposo: { numero: 3, descrizione: "È energico, costruttivo, produttivo e riesce a mettere meglio a fuoco situazioni ed obiettivi. Acquista fiducia in se stesso. Appare come una persona di grande successo." },
    },
    ali: {
      sinistra: {
        numero: 8,
        descrizione: "Il 9 ala 8 è tendenzialmente remissivo e sottomesso ai fini del gruppo, ma l'8 gli dona forza per raggiungere l'obiettivo. È calmo ma può incollerirsi se l'armonia del gruppo è minacciata.",
        somiglianza: "Assomiglia al 4",
      },
      destra: {
        numero: 1,
        descrizione: "Nel 9 ala 1 al desiderio di armonia si accompagna moralità ed etica. È dotato di buon senso ed imparzialità. Ha spirito idealista teso a migliorare la squadra; è emotivamente distaccato.",
        somiglianza: "Assomiglia al 5",
      },
    },
    sottotipi: {
      conservativo: {
        nome: "Conservativo (appetito)",
        descrizione: "Annulla le minacce bevendo, mangiando e guardando la televisione in modo quasi maniacale. Compra libri che non leggerà mai. Adotta strategie di stordimento. Estrae energie dalle cose. È abilissimo a scovare generi di conforto. È più facilmente ala 8. Tende ad esprimere maggiormente la rabbia.",
        personaggi: "Karen Horney",
        segnoAstrologico: "Vergine",
      },
      sociale: {
        nome: "Sociale (partecipazione)",
        descrizione: "Per lui è importante la partecipazione; non ambisce al ruolo di guida anche se di fatto lo è. Appartenere ad una comunità lo rende sicuro. L'energia dell'associazione risolve la pigrizia del singolo 9. Ama creare reti e si mette facilmente nei panni altrui. È il più socievole e affabile (espansivo).",
        personaggi: "Desmond Tutu, Benjamin Franklin, Margaret Mead",
      },
      sessuale: {
        nome: "Sessuale (fusione, unione)",
        descrizione: "Vive con e grazie al partner ed è felice se l'altro è appagato. Può essere pigro per i suoi affari ma non per quelli del partner. Nell'altro vede il divino. Aspira ad un amore assoluto. Ama fare mille telefonate perché ha bisogno di sentirsi vicino al partner. È il più ritirato e timido dei tre.",
        personaggi: "Carl Rogers",
      },
    },
    lavoro: {
      descrizione: "Ama routine, abitudinarietà in clima non competitivo, in strutture ove sono precisati diritti e doveri. È un ottimo mediatore, negoziatore e diplomatico.",
      mansioniAppropriate: "Abitudinarie, routinarie, ove c'è da comporre un conflitto.",
      mansioniNonAppropriate: "Se è richiesta improvvisazione o deve agire in un gruppo altamente competitivo; mansioni autonome fuori dal gruppo.",
    },
    coppia: {
      descrizione: `Il rapporto è totale fusione con l'altro: i bisogni del partner vanno al posto dei propri.

L'unione raggiunta è lo scopo della sua vita. Si pone in un ruolo passivo sempre pronto a seguire i programmi.

Ma se non raggiunge l'unione si chiude in silenzi e bronci prolungati. La fine del rapporto costituisce una tragedia.`,
    },
    livelli: {
      disintegrato: "Non muove un dito per risolvere i problemi. Si arrabbia e va in ansia se lo costringono. Non sente responsabilità verso se stesso. Scarica sugli altri le sue responsabilità. Giunge a gradi di trascuratezza incredibili.",
      intermedio: "Si identifica coi bisogni degli altri che soddisfa. Aspetta che i problemi si risolvano da soli. È sempre distratto. Non distingue l'utile dal futile. Cerca di calmare quelli che lo vogliono responsabilizzare, ma poi non si attiva.",
      integrato: "È estremamente pacifico e vitale ed ha piena consapevolezza dei suoi desideri. Ha un cervello sociale. È bravissimo nella mediazione perché sa individuare gli interessi comuni. Da lui emerge amore per tutti ed una specie di magia.",
    },
    astrologia: {
      segno: "Toro e Bilancia (con tratti dei Pesci)",
      pianetaVedico: "Luna",
      pianetaDescrizione: "Se la Luna è forte il soggetto è attivo, ottimo mediatore e porta pace. Se debole è indolente e pigro.",
      controFreccia: "Ariete, Toro, Gemelli e Cancro (influenza positiva)",
      versoFreccia: "Pesci, Acquario, Capricorno e Sagittario (influenza negativa)",
      chakra: "7° Chakra (parte superiore della testa)",
    },
    dsm: "Depresso maggiore / Passivo-aggressivo",
    domandeUtili: [
      "Ami la routine e tutti quei lavori in cui vi sono programmi da seguire?",
      "Pensi che i problemi si risolvono da soli?",
      "Se qualcuno ti spinge all'azione, ciò ti crea ansia?",
      "Nelle discussioni tendi a condividere l'opinione altrui anche se non sei d'accordo?",
      "Tendi ad occupare le tue giornate con passatempi ed appuntamenti televisivi?",
      "Sei generalmente pacifico e solo rarissime volte hai dei violenti scoppi d'ira?",
    ],
    ideeSacre: {
      titolo: "Amore",
      descrizione: `Il sacro Amore è il punto da cui si dipanano tutti gli altri punti.

Significa che la realtà è intrinsecamente piacevole, meravigliosa e dunque amabile. Ogni volta che la nostra esperienza è carente di bontà, bellezza, valore, la viviamo attraverso il filtro egoico.

L'inganno del nono enneatipo è quello di considerare l'amore condizionato e localizzato. Chi non si sente contenuto può pensare di non essere amato perché non è amabile.

L'enneatipo 9 crede di non essere abbastanza buono. L'anima che non si sente amata si rassegna, si addormenta.

Assumere come vera realtà quella convenzionale è una forma di pigrizia. Se non esiste l'amore dentro di me tanto vale dormire.`,
    },
    evoluzione: "Un 9 si evolve se acquisisce qualità positive dall'ala 8 e dall'ala 1, dalla contro freccia 3 (più difficilmente dal verso freccia 6). Se rimane fermo rischia di assommare le sue qualità negative a quelle del verso freccia (6).",
  },
};

// Integration/Disintegration arrows data for percentage calculations
export const enneagramArrows = {
  stress: { 1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6 },
  riposo: { 1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3 },
} as const;

// Calculate integration/disintegration percentages based on scores
export function calculateArrowPercentages(
  mainType: number,
  scores: Record<number, number>
) {
  const mainScore = scores[mainType] || 0;
  const maxPossible = 20;

  const stressType = enneagramArrows.stress[mainType as keyof typeof enneagramArrows.stress];
  const riposoType = enneagramArrows.riposo[mainType as keyof typeof enneagramArrows.riposo];

  const stressScore = scores[stressType] || 0;
  const riposoScore = scores[riposoType] || 0;

  // Calculate percentages: how much the person leans toward stress vs riposo direction
  // Based on the ratio of stress/riposo type scores relative to main type
  const totalArrowScore = stressScore + riposoScore;
  if (totalArrowScore === 0) {
    return { stressPercent: 50, riposoPercent: 50, stressType, riposoType };
  }

  const stressPercent = Math.round((stressScore / totalArrowScore) * 100);
  const riposoPercent = 100 - stressPercent;

  return { stressPercent, riposoPercent, stressType, riposoType };
}
