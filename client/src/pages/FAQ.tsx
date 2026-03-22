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
