import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Briefcase, Sparkles } from "lucide-react";
import ruotaLullo from "@assets/ruota-lullo.webp";
import ruotaLulloClassica from "@assets/ruota-lullo-classica.png";

const features = [
  {
    title: "Fai il Test",
    desc: "Scopri il tuo enneatipo attraverso il test dei 9 Frutti dell'Albero della Vita",
    icon: Sparkles,
    href: "/test",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  {
    title: "Compatibilità di Coppia",
    desc: "Scopri la compatibilità con il tuo partner basata sugli enneatipi",
    icon: Heart,
    href: "/compatibilita/coppia",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-200 dark:border-rose-800",
  },
  {
    title: "Compatibilità Famiglia",
    desc: "Esplora le dinamiche familiari alla luce dell'Enneagramma Evolutivo",
    icon: Users,
    href: "/compatibilita/famiglia",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
  {
    title: "Compatibilità Lavoro",
    desc: "Migliora le relazioni professionali comprendendo gli enneatipi del team",
    icon: Briefcase,
    href: "/compatibilita/lavoro",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)`
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6" data-testid="text-hero-title">
                Enneagramma Evolutivo
              </h1>
              <p className="text-xl md:text-2xl font-serif text-white/90 mb-4" data-testid="text-hero-subtitle">
                I 9 frutti del tuo cammino interiore
              </p>
              <p className="text-base text-white/75 mb-8 max-w-lg leading-relaxed">
                Scopri il tuo enneatipo attraverso un percorso unico che integra la sapienza di Raimondo Lullo, 
                le gerarchie angeliche e i simboli dell'Albero della Vita.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/test">
                  <Button size="lg" className="bg-white text-purple-700 hover:bg-white/90 font-semibold" data-testid="button-hero-test">
                    Fai il Test Gratuito
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/enneatipi">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" data-testid="button-hero-enneatipi">
                    Scopri i 9 Enneatipi
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src={ruotaLullo}
                alt="La Ruota di Raimondo Lullo"
                className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl opacity-90 rounded-xl"
                data-testid="img-hero-enneagram"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <Link key={f.title} href={f.href}>
              <Card className={`border ${f.borderColor} hover:shadow-lg transition-all cursor-pointer h-full`} data-testid={`card-feature-${f.title}`}>
                <CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-lg ${f.color} flex items-center justify-center mb-3`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* What is Enneagramma Evolutivo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground" data-testid="text-section-about">
              Che cos'è l'Enneagramma Evolutivo?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                L'Enneagramma Evolutivo è un sistema innovativo che integra la tradizionale tipologia dei 
                nove enneatipi con le correlazioni vediche, le gerarchie angeliche e i frutti simbolici 
                dell'Albero della Vita.
              </p>
              <p>
                Questo approccio unico trae ispirazione dalla <strong className="text-foreground">Ruota di Raimondo Lullo</strong>, 
                dalle ricerche di <strong className="text-foreground">Athanasius Kircher</strong>, dagli insegnamenti 
                di <strong className="text-foreground">G.I. Gurdjieff</strong> e dalla psicologia moderna 
                di <strong className="text-foreground">Claudio Naranjo</strong>.
              </p>
              <p>
                Ogni enneatipo è associato a un frutto simbolico, una dignità, una virtù, una melodia 
                e una gerarchia angelica — creando un percorso di crescita personale profondamente integrato.
              </p>
            </div>
            <Link href="/about">
              <Button variant="outline" className="mt-6" data-testid="button-learn-more">
                Scopri di più <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src={ruotaLulloClassica}
              alt="La Ruota di Raimondo Lullo - Schema Classico"
              className="w-full max-w-sm rounded-2xl shadow-xl bg-white p-4"
              data-testid="img-ruota-lullo"
            />
          </div>
        </div>
      </section>

      {/* 9 Fruits Preview */}
      <section className="bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">I 9 Frutti dell'Albero della Vita</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ogni frutto rappresenta un enneatipo e racchiude qualità uniche del tuo percorso interiore.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
            {[
              { name: "Mela", type: 1, emoji: "🍎" },
              { name: "Pera", type: 2, emoji: "🍐" },
              { name: "Ciliegia", type: 3, emoji: "🍒" },
              { name: "Nespola", type: 4, emoji: "🫐" },
              { name: "Uva", type: 5, emoji: "🍇" },
              { name: "Mirtillo", type: 6, emoji: "🫐" },
              { name: "Ananas", type: 7, emoji: "🍍" },
              { name: "Albicocca", type: 8, emoji: "🍑" },
              { name: "Fragola", type: 9, emoji: "🍓" },
            ].map((fruit) => (
              <Link key={fruit.type} href={`/enneatipi/${fruit.type}`}>
                <div className="text-center p-3 rounded-xl hover:bg-white dark:hover:bg-card hover:shadow-md transition-all cursor-pointer" data-testid={`card-fruit-${fruit.type}`}>
                  <div className="text-3xl mb-2">{fruit.emoji}</div>
                  <div className="text-xs font-medium text-foreground">{fruit.name}</div>
                  <div className="text-[10px] text-muted-foreground">Tipo {fruit.type}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" data-testid="text-cta-title">
            Inizia il Tuo Viaggio
          </h2>
          <p className="text-lg text-white/80 mb-6 max-w-xl mx-auto">
            Completa il test dei 9 Frutti e scopri il tuo enneatipo, la tua ala e il tuo percorso evolutivo personalizzato.
          </p>
          <Link href="/test">
            <Button size="lg" className="bg-white text-purple-700 hover:bg-white/90 font-semibold" data-testid="button-cta-test">
              Fai il Test Ora — È Gratuito
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
