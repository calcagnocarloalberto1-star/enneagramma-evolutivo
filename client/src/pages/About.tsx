import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users, Compass, Star, Scale, GraduationCap, Pen, Globe, Heart, HandHeart, Sparkles, UserCheck } from "lucide-react";
import ruotaLullo from "@assets/ruota-lullo.webp";
import chakraSymbols from "@assets/chakra-symbols.webp";
import carloPhoto from "@assets/carlo-alberto-calcagno.jpg";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3" data-testid="text-about-title">
          Chi Siamo
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          L'Enneagramma Evolutivo nasce da vent'anni di studi e pratica professionale nella mediazione e nella conoscenza di sé.
        </p>
      </div>

      {/* Author Bio - Main Section */}
      <section className="mb-16">
        <Card className="overflow-hidden border-[#c9a227]/20">
          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img src={carloPhoto} alt="Carlo Alberto Calcagno" className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#c9a227]/40 shrink-0" />
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f0e6d3] mb-1">
                  Carlo Alberto Calcagno
                </h2>
                <p className="text-[#c9a227] font-medium mb-3">
                  Mediatore · Formatore · Autore · Counselor · Pranoterapeuta
                </p>
                <p className="text-[#f0e6d3]/80 text-sm leading-relaxed max-w-xl">
                  Ideatore dell'Enneagramma Evolutivo, un sistema che integra la sapienza di Raimondo Lullo, 
                  le gerarchie angeliche, la psicologia moderna e i simboli dell'Albero della Vita 
                  in un percorso unico di crescita personale.
                </p>
              </div>
            </div>
          </div>
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Carlo Alberto Calcagno</strong> (Arenzano, 1963) è mediatore civile, commerciale e familiare, 
                formatore e autore, con sede professionale a Genova. Pur essendo iscritto all'Ordine degli Avvocati di Genova, 
                dal 2019 si dedica esclusivamente alla mediazione, alla formazione e alla ricerca.
              </p>
              <p>
                Mediatore civile e commerciale dal 2010 e mediatore familiare professionista certificato ai sensi della norma UNI 11644:2016, 
                è associato A.I.Me.F. (Associazione Italiana Mediatori Familiari) dal 2017, di cui è consigliere regionale. 
                Rappresenta l'Italia nel <strong className="text-foreground">Consiglio Internazionale di Mediazione (CIM-ICM)</strong>.
              </p>
              <p>
                È Vice Direttore della <strong className="text-foreground">Scuola di Alta Formazione U.N.A.M.</strong> (Unione Nazionale Avvocati 
                per la Mediazione) e responsabile scientifico di organismi di mediazione e formazione presso il Tribunale di Genova, 
                il Tribunale di Reggio Emilia e gli organismi Concordia et Ius e Mediamo. 
                È componente del Comitato direttivo per la mediazione e la negoziazione assistita del Consiglio dell'Ordine degli Avvocati di Genova.
              </p>
              <p>
                Formatore accreditato dal <strong className="text-foreground">Ministero della Giustizia</strong> per mediatori civili e commerciali (dal 2011) 
                e per mediatori familiari (dal 2017), ha insegnato negoziazione assistita e mediazione civile e commerciale 
                alla Scuola di Specializzazione per le Professioni Legali dell'Università di Genova (2017) 
                ed è stato docente presso la Scuola Superiore della Magistratura. 
                Ha ricoperto il ruolo di coach dell'Università di Pavia per la Competizione Italiana di Mediazione (CIM) nel 2016 e 2017.
              </p>
              <p>
                È anche <strong className="text-foreground">Counselor olistico</strong> e <strong className="text-foreground">Counselor rogersiano in formazione</strong>,
                <strong className="text-foreground">Pranoterapeuta</strong> (Operatore in Trattamento Energetico)
                e <strong className="text-foreground">Formatore A.I.M.e.F.</strong> (Associazione Italiana Mediatori Familiari).
              </p>
              <p>
                Esperto di strumenti alternativi al giudizio dal 2003, ha dedicato vent'anni allo studio
                dei sistemi comparati di risoluzione dei conflitti. È autore di diversi volumi e articoli scientifici, tra cui:
              </p>
            </div>

            {/* Publications */}
            <div className="mt-6 space-y-3">
              <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                <Pen className="w-5 h-5 text-[#c9a227]" />
                Pubblicazioni principali
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Breve storia della risoluzione del conflitto. I sistemi di composizione dall'origine al XXI secolo</strong>, 
                    prefazione di Marco Marinaro, Aracne Editrice, 2014 (575 pp.)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Il legale e la mediazione. I doveri e la pratica dell'avvocato mediatore e dell'accompagnatore alla procedura</strong>, 
                    Aracne Editrice, 2014 (215 pp.)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" />
                  <span>
                    Numerosi saggi e articoli su mediazione civile, commerciale e familiare, tecniche di negoziazione, 
                    storia dei sistemi giuridici e rapporto tra diritto e letteratura, pubblicati su riviste specializzate e portali giuridici.
                  </span>
                </li>
              </ul>
            </div>

            {/* Roles Grid */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#faf8f5]">
                <Scale className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Mediazione</p>
                  <p className="text-xs text-muted-foreground">Civile, commerciale e familiare dal 2010</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#faf8f5]">
                <GraduationCap className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Formazione</p>
                  <p className="text-xs text-muted-foreground">Accreditato dal Ministero della Giustizia</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#faf8f5]">
                <Globe className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">CIM-ICM</p>
                  <p className="text-xs text-muted-foreground">Rappresentante per l'Italia</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#faf8f5]">
                <Pen className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Blog e divulgazione</p>
                  <p className="text-xs text-muted-foreground">mediaresenzaconfini.org</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#faf8f5]">
                <Heart className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Counselor olistico</p>
                  <p className="text-xs text-muted-foreground">Approccio integrato alla persona</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#faf8f5]">
                <UserCheck className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Counselor rogersiano</p>
                  <p className="text-xs text-muted-foreground">In formazione — approccio centrato sulla persona</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#faf8f5]">
                <HandHeart className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Pranoterapeuta</p>
                  <p className="text-xs text-muted-foreground">Operatore in Trattamento Energetico</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#faf8f5]">
                <Sparkles className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Formatore A.I.M.e.F.</p>
                  <p className="text-xs text-muted-foreground">Associazione Italiana Mediatori Familiari</p>
                </div>
              </div>
            </div>

            {/* Enneagramma Evolutivo connection */}
            <div className="mt-8 p-4 rounded-lg border border-[#c9a227]/20 bg-[#c9a227]/5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">L'Enneagramma Evolutivo</strong> è il frutto di vent'anni di studi sull'Enneagramma 
                e della pratica quotidiana nella mediazione familiare. Carlo Alberto ha integrato gli insegnamenti 
                di Raimondo Lullo, Evagrio Pontico, Gurdjieff e Claudio Naranjo con le tecniche di PNL, 
                il genogramma e le neuroscienze, creando un sistema che non si limita a classificare la personalità 
                ma offre un percorso evolutivo concreto attraverso le fasi della vita. 
                Come Enneatipo 1 con Ala 9, porta nella sua pratica la ricerca dell'integrità 
                e la sensibilità verso l'armonia nelle relazioni.
              </p>
            </div>
          </CardContent>
        </Card>
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
