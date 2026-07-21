import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO } from "@/hooks/use-page-title";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle } from "lucide-react";
import { faqs } from "@shared/faq-data";

export default function FAQ() {
  useSEO({
    title: "FAQ | Enneagramma Evolutivo",
    description: "Le domande più frequenti sull'Enneagramma Evolutivo: il test dei 9 Frutti, gli enneatipi, la compatibilità e gli strumenti di mediazione.",
    path: "/faq",
  });
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
