import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users, Compass, Star } from "lucide-react";
import enneagramDiagram from "@assets/enneagram-diagram.webp";
import ruotaLullo from "@assets/ruota-lullo.webp";
import chakraSymbols from "@assets/chakra-symbols.webp";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3" data-testid="text-about-title">
          Chi Siamo
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          L'Enneagramma Evolutivo è un sistema innovativo di conoscenza di sé che integra tradizione e modernità.
        </p>
      </div>

      {/* Methodology */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">La Nostra Metodologia</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                L'Enneagramma Evolutivo nasce dall'intuizione dell'avvocato <strong className="text-foreground">Carlo Alberto Calcagno</strong>, 
                che ha integrato diverse tradizioni sapienziali in un unico sistema coerente di auto-conoscenza.
              </p>
              <p>
                Il test dei <strong className="text-foreground">9 Frutti dell'Albero della Vita</strong> rappresenta un approccio 
                unico alla tipologia dell'Enneagramma, in cui ogni frutto simbolico corrisponde a un enneatipo 
                e porta con sé un ricco patrimonio di correlazioni spirituali, psicologiche e culturali.
              </p>
              <p>
                Questo sistema non si limita a classificare, ma offre un <strong className="text-foreground">percorso evolutivo</strong> personalizzato 
                che tiene conto dell'età, delle ali, delle linee di integrazione e disintegrazione, 
                e delle correlazioni con le tradizioni vediche, angeliche e musicali.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={enneagramDiagram} alt="Diagramma Enneagramma" className="w-full max-w-sm rounded-2xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* Historical Roots */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-6 text-center">Le Radici Storiche</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif font-bold mb-2">Raimondo Lullo (1232-1316)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Filosofo catalano, creò l'"Ars Magna", un sistema combinatorio di nove dignità divine 
                (Bontà, Grandezza, Eternità, Potere, Sapienza, Volontà, Virtù, Verità, Gloria) 
                che si ritrova nella struttura dell'Enneagramma Evolutivo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif font-bold mb-2">Athanasius Kircher (1602-1680)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Gesuita erudito, creò una struttura enneadica collegando discipline come la musica, 
                l'astronomia e le gerarchie angeliche, contribuendo alla visione integrata 
                che l'Enneagramma Evolutivo ha ereditato.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif font-bold mb-2">G.I. Gurdjieff (1866-1949)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mistico e maestro spirituale, introdusse il simbolo dell'Enneagramma in Occidente 
                come strumento di comprensione dei processi cosmici e della meccanicità umana. 
                Il suo Enneagramma era un simbolo dinamico di trasformazione.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif font-bold mb-2">Claudio Naranjo (1932-2019)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Psichiatra cileno, collegò i nove punti dell'Enneagramma ai tipi di personalità, 
                creando il moderno sistema degli enneatipi con le sue correlazioni psicologiche, 
                i meccanismi di difesa e le passioni dominanti.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Images section */}
      <section className="mb-16">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={ruotaLullo} alt="La Ruota di Raimondo Lullo" className="w-full h-48 object-cover" />
            <div className="p-4 bg-card">
              <h3 className="font-serif font-semibold text-sm">La Ruota di Raimondo Lullo</h3>
              <p className="text-xs text-muted-foreground mt-1">L'Ars Magna combinatoria alla base del sistema</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={chakraSymbols} alt="I Chakra e l'Enneagramma" className="w-full h-48 object-cover" />
            <div className="p-4 bg-card">
              <h3 className="font-serif font-semibold text-sm">Chakra e Correlazioni Vediche</h3>
              <p className="text-xs text-muted-foreground mt-1">Le connessioni tra centri energetici ed enneatipi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold mb-3">Scopri il Tuo Percorso</h2>
        <p className="text-muted-foreground mb-6">Inizia il test dei 9 Frutti e intraprendi il tuo cammino interiore.</p>
        <Link href="/test">
          <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-about-cta">
            Fai il Test Gratuito <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
