import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";

export default function Glossario() {
  const { data: glossario, isLoading } = useQuery<any>({
    queryKey: ["/api/glossario"],
  });

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

  const categorie = glossario?.categorie || {};

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-10">
        <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Glossario dell'Enneagramma Evolutivo
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Ogni termine usato nei risultati del test ha un significato preciso. 
          Qui trovi le spiegazioni di tutti gli attributi — cosa significano e perché sono importanti per te.
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(categorie).map(([key, cat]: [string, any]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="text-lg font-serif">{cat.titolo}</CardTitle>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                {cat.spiegazione}
              </p>
            </CardHeader>
            {cat.valori && Object.keys(cat.valori).length > 0 && (
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(cat.valori).map(([valore, desc]: [string, any]) => (
                    <AccordionItem key={valore} value={valore}>
                      <AccordionTrigger className="text-sm font-semibold">
                        {valore}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {desc}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
