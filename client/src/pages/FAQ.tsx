import { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Cos'è l'Enneagramma?",
    a: "L'Enneagramma è un antico sistema simbolico che descrive nove tipi fondamentali di personalità e le loro interconnessioni. Il termine deriva dal greco \"ennea\" (nove) e \"gramma\" (punto, figura). È uno strumento potente per la conoscenza di sé, la crescita personale e la comprensione delle dinamiche relazionali."
  },
  {
    q: "Cos'è l'Enneagramma Evolutivo?",
    a: "L'Enneagramma Evolutivo è un'evoluzione del sistema classico che integra le dignità di Raimondo Lullo, le gerarchie angeliche, i chakra, le correlazioni vediche, le muse greche e i frutti simbolici dell'Albero della Vita. Offre un percorso di crescita personale più profondo e completo rispetto al semplice inquadramento tipologico."
  },
  {
    q: "Come funziona il test dei 9 Frutti?",
    a: "Il test è composto da 180 domande (20 per ciascuno dei 9 frutti). Per ogni domanda rispondi Vero o Falso in base a come ti senti. Il frutto con il punteggio più alto determina il tuo enneatipo principale. I frutti adiacenti aiutano a determinare la tua 'ala', ovvero la sfumatura secondaria della tua personalità."
  },
  {
    q: "Quanto tempo richiede il test?",
    a: "Il test completo richiede circa 15-20 minuti. Ti consigliamo di compilarlo in un momento tranquillo, rispondendo in modo spontaneo senza pensarci troppo. Le risposte istintive sono generalmente le più accurate."
  },
  {
    q: "Cosa sono i Frutti dell'Albero della Vita?",
    a: "I 9 Frutti dell'Albero della Vita sono simboli che rappresentano ciascun enneatipo: Mela (Tipo 1 - Il Perfezionista), Pera (Tipo 2 - L'Altruista), Ciliegia (Tipo 3 - Il Realizzatore), Nespola (Tipo 4 - L'Individualista), Uva (Tipo 5 - L'Osservatore), Mirtillo (Tipo 6 - Il Leale), Ananas (Tipo 7 - L'Entusiasta), Albicocca (Tipo 8 - Il Leader), Fragola (Tipo 9 - Il Pacificatore)."
  },
  {
    q: "Cosa significa 'ala' nell'Enneagramma?",
    a: "L'ala è l'enneatipo adiacente al tuo tipo principale che ha il punteggio più alto. Ad esempio, se sei un Tipo 5, la tua ala può essere il 4 o il 6. L'ala aggiunge sfumature alla tua personalità: un 5 con ala 4 sarà più introspettivo e creativo, mentre un 5 con ala 6 sarà più cauto e orientato alla sicurezza."
  },
  {
    q: "Cosa sono le linee di integrazione e disintegrazione?",
    a: "Le linee di integrazione indicano la direzione della crescita personale: quando sei in salute, acquisisci le qualità positive di un altro enneatipo. Le linee di disintegrazione indicano dove vai sotto stress, assumendo le qualità meno sane di un altro tipo. Conoscere queste dinamiche ti aiuta a riconoscere i tuoi pattern di comportamento."
  },
  {
    q: "Cos'è il genogramma e quando è necessario?",
    a: "Il genogramma è una rappresentazione grafica della struttura familiare che aiuta a comprendere le dinamiche transgenerazionali. Nel contesto dell'Enneagramma Evolutivo, viene suggerito quando il test mostra risultati ambigui (punteggi uguali per più tipi o ali). Un professionista può aiutarti a determinare il tuo enneatipo con maggiore precisione."
  },
  {
    q: "L'Enneagramma può cambiare nel tempo?",
    a: "Il tuo enneatipo di base rimane stabile per tutta la vita, poiché si forma nell'infanzia. Tuttavia, il modo in cui lo esprimi può cambiare significativamente con la crescita personale. L'Enneagramma Evolutivo tiene conto anche delle fasi di vita legate all'età, mostrando come ogni periodo porta sfide e opportunità diverse."
  },
  {
    q: "Come funziona la compatibilità di coppia?",
    a: "La compatibilità di coppia analizza le dinamiche tra due enneatipi, evidenziando i punti di forza della relazione, le sfide potenziali e i consigli per una convivenza armoniosa. Non esiste una combinazione 'impossibile': ogni coppia ha il suo potenziale unico di crescita."
  },
  {
    q: "Che relazione c'è tra Enneagramma e chakra?",
    a: "L'Enneagramma Evolutivo collega ogni enneatipo a un chakra specifico, riflettendo il centro energetico dominante di ciascun tipo. Questa correlazione apre la porta a pratiche di benessere e meditazione mirate per ogni enneatipo."
  },
  {
    q: "Chi ha creato l'Enneagramma Evolutivo?",
    a: "L'Enneagramma Evolutivo è stato sviluppato dall'avvocato Carlo Alberto Calcagno, che ha integrato le conoscenze dell'Enneagramma tradizionale con le dignità di Raimondo Lullo, le ricerche di Athanasius Kircher, gli insegnamenti di Gurdjieff e la psicologia di Claudio Naranjo, creando un sistema unico di auto-conoscenza."
  },
  {
    q: "A cosa serve la card 'Mediazione Civile e Commerciale'?",
    a: `La card \"Al Tavolo della Mediazione Civile e Commerciale\" è uno strumento professionale pensato per i mediatori. Permette di:\n\n• Inserire l'enneatipo (con ala e sottotipo) delle due parti in causa, il tipo di controversia (contratti, diritti reali, condominio, successioni, ecc.) e il livello di conflittualità.\n\n• Ricevere il Profilo delle Parti al Tavolo: per ciascuna parte viene analizzato l'adattamento di personalità secondo l'Analisi Transazionale (le tre porte: aperta, bersaglio e trappola), il driver motivazionale, lo stile sociale e la reazione sotto pressione.\n\n• Ottenere una Strategia del Mediatore articolata in sei sezioni: approccio iniziale (come aprire il dialogo con ciascuna parte attraverso la sua \"porta aperta\"), gestione della sessione congiunta (turni, seating, quando usare il caucus), leve motivazionali specifiche per enneatipo, terreno comune su cui costruire l'accordo, trappole da evitare e tecniche AT specifiche.\n\n• Generare Tracce di Simulazione: 2-3 scenari realistici di mediazione basati sulla combinazione di enneatipi selezionata, completi di contesto, punto critico e obiettivi formativi — utili per l'addestramento dei mediatori.\n\n• Inserire l'Inquadramento della Vicenda: un campo libero dove il mediatore descrive i fatti del caso, che viene integrato nell'analisi e nella generazione della minuta.\n\n• Generare una Minuta di Accordo: una bozza formale di verbale di mediazione il cui linguaggio è adattato alla personalità delle parti (ad esempio, clausole precise e regolari per un Tipo 1, linguaggio diretto e orientato alla giustizia per un Tipo 8).`
  },
  {
    q: "A cosa serve la card 'Mediazione Familiare'?",
    a: `La card \"Al Tavolo della Mediazione Familiare\" offre le stesse funzionalità della mediazione civile, ma con caratteristiche specifiche per il contesto familiare:\n\n• Il form prevede campi aggiuntivi: il ruolo familiare di ciascun membro (coniuge, genitore, figlio, fratello), l'età, il tipo di mediazione familiare (separazione, affidamento figli, gestione patrimonio, conflitto genitori-figli, successione ereditaria) e la possibilità di indicare i figli coinvolti con le relative età.\n\n• La Card Introduttiva sulla Sessione Congiunta spiega i tre principi fondamentali della mediazione familiare: Impermanenza (le posizioni possono cambiare), Compassione (\"è un rapporto tra eguali\", Pema Chödrön) e Interdipendenza.\n\n• L'analisi include sezioni dedicate alle Dinamiche Familiari e all'Attaccamento, che spiegano come ciascun enneatipo vive i legami familiari in base al proprio adattamento AT (sopravvivenza vs performance).\n\n• Se ci sono figli, viene generata un'analisi sull'Impatto sui Figli e sulla Gestione dell'Emotività, con tecniche specifiche per contenere il flooding emotivo.\n\n• La sezione Ricostruzione della Comunicazione suggerisce come aiutare i due enneatipi a ricostruire il dialogo dopo il conflitto.\n\n• La Minuta di Accordo include un Piano Genitoriale con disposizioni per l'affidamento, i tempi di permanenza e il contributo al mantenimento, il tutto adattato agli enneatipi e arricchito dall'Analisi degli Attributi per Età: il sistema identifica gli attributi che ciascun genitore sta vivendo nella sua fase di vita attuale (dignità, virtù, vizio, meccanismo di difesa), evidenziando gli attributi condivisi come terreno comune e quelli diversi come aree di potenziale attrito.`
  },
  {
    q: "Posso usare gli strumenti di mediazione senza essere un mediatore?",
    a: "Gli strumenti di mediazione sono progettati principalmente per mediatori professionisti, avvocati e operatori delle relazioni d'aiuto. Tuttavia, chiunque può utilizzarli per comprendere meglio le dinamiche di un conflitto in cui è coinvolto. Le analisi basate sull'Enneagramma e sull'Analisi Transazionale offrono una chiave di lettura preziosa per qualsiasi situazione relazionale complessa."
  },
  {
    q: "Cos'è l'Analisi Transazionale applicata alla mediazione?",
    a: "L'Analisi Transazionale (AT) è un approccio psicologico fondato da Eric Berne che studia gli adattamenti di personalità sviluppati nell'infanzia. Nel contesto della mediazione, l'AT è particolarmente utile perché identifica per ciascuna persona le tre 'porte' di comunicazione (aperta, bersaglio, trappola): il mediatore deve entrare dalla porta aperta, lavorare su quella bersaglio ed evitare la trappola. Il sistema identifica sei adattamenti principali (Istrionico, Ossessivo-compulsivo, Paranoide, Schizoide, Passivo-aggressivo, Antisociale) e fornisce indicazioni precise su come comunicare efficacemente con ciascuno."
  },
  {
    q: "Cosa sono le simulazioni di mediazione?",
    a: "Le tracce di simulazione sono scenari realistici generati automaticamente in base alla combinazione di enneatipi e al tipo di controversia selezionati. Ogni simulazione include un contesto narrativo, la descrizione delle parti con le loro caratteristiche enneagrammatiche, il punto critico della mediazione (il momento di massima tensione), l'obiettivo formativo per il mediatore in formazione e i suggerimenti operativi. Sono pensate per l'addestramento pratico dei mediatori."
  },
  {
    q: "Come funziona la Minuta di Accordo?",
    a: "La Minuta di Accordo è una bozza formale di verbale di mediazione generata dall'intelligenza artificiale (o da un template strutturato). Il suo linguaggio viene adattato alla personalità di ciascuna parte in base all'enneatipo: ad esempio, per un Tipo 1 le clausole saranno precise e ben definite, per un Tipo 2 il linguaggio preserverà la relazione, per un Tipo 8 sarà diretto e orientato alla giustizia. La minuta include premesse, identificazione delle parti, accordi raggiunti, clausole di revisione e salvaguardia, e le righe per le firme. Per la mediazione familiare include anche il piano genitoriale."
  },
];

export default function FAQ() {
  useEffect(() => { document.title = "FAQ | Enneagramma Evolutivo"; }, []);
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3" data-testid="text-faq-title">
          Domande Frequenti
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Trova le risposte alle domande più comuni sull'Enneagramma e il nostro test.
        </p>
      </div>

      <Accordion type="single" collapsible className="mb-10">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} data-testid={`faq-item-${i}`}>
            <AccordionTrigger className="text-left font-serif font-semibold text-base">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">Non hai trovato la risposta che cercavi?</p>
        <Link href="/test">
          <Button className="bg-primary hover:bg-primary/90" data-testid="button-faq-test">
            Prova il Test dei 9 Frutti <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
