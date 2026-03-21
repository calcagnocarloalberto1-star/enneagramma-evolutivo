import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, ArrowRight, Star, Shield, Brain, Music, Gem, Heart, Sparkles,
  Eye, Users, MessageCircle, Briefcase, HeartHandshake, TrendingUp,
  HelpCircle, Lightbulb, Moon, AlertTriangle, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { enneatypesDetailed, type EnneatipoDetailed } from "@/data/enneatypes-detailed";

const fruitNames: Record<number, string> = {
  1: "Mela", 2: "Pera", 3: "Ciliegia", 4: "Nespola",
  5: "Uva", 6: "Mirtillo", 7: "Ananas", 8: "Albicocca", 9: "Fragola"
};
const fruitEmoji: Record<number, string> = {
  1: "🍎", 2: "🍐", 3: "🍒", 4: "🫐",
  5: "🍇", 6: "🫐", 7: "🍍", 8: "🍑", 9: "🍓"
};

function Section({ title, icon, children, id }: { title: string; icon: React.ReactNode; children: React.ReactNode; id?: string }) {
  return (
    <Card className="mb-6" id={id}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-serif flex items-center gap-2">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function TextBlock({ text }: { text: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      {text.split("\n\n").map((para, i) => (
        <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">
          {para}
        </p>
      ))}
    </div>
  );
}

function SottotipoCard({ nome, descrizione, personaggi, segnoAstrologico }: { nome: string; descrizione: string; personaggi: string; segnoAstrologico?: string }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <h4 className="font-semibold text-sm mb-2">{nome}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{descrizione}</p>
      <div className="space-y-1.5">
        <div className="text-xs">
          <span className="font-medium text-foreground">Personaggi:</span>{" "}
          <span className="text-muted-foreground">{personaggi}</span>
        </div>
        {segnoAstrologico && (
          <div className="text-xs">
            <span className="font-medium text-foreground">Segno:</span>{" "}
            <span className="text-muted-foreground">{segnoAstrologico}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EnneatipoDetail() {
  const [, params] = useRoute("/enneatipi/:id");
  const id = params?.id;
  const num = parseInt(id || "0");

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["/api/enneatipi", id],
    enabled: !!id,
  });

  const detailed: EnneatipoDetailed | undefined = enneatypesDetailed[num];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if ((isError && !detailed) || !num || num < 1 || num > 9) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Enneatipo non trovato</h2>
        <Link href="/enneatipi"><Button variant="outline"><ArrowLeft className="mr-2 w-4 h-4" /> Torna agli Enneatipi</Button></Link>
      </div>
    );
  }

  const prevNum = num === 1 ? 9 : num - 1;
  const nextNum = num === 9 ? 1 : num + 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/enneatipi" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Torna ai 9 Enneatipi
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">{fruitEmoji[num]}</div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2" data-testid="text-enneatipo-title">
          Enneatipo {num}: {data?.nome || detailed?.definizione?.split(".")[0]}
        </h1>
        {detailed && (
          <p className="text-lg text-muted-foreground font-serif italic">"{detailed.motto}"</p>
        )}
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          <Badge className="bg-primary/10 text-primary">Frutto: {fruitNames[num]}</Badge>
          {detailed && <Badge variant="secondary">{detailed.animale}</Badge>}
          {detailed && <Badge variant="outline">{detailed.centro.tipo}</Badge>}
        </div>
      </div>

      {/* Quick Nav */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {[
          { id: "panoramica", label: "Panoramica" },
          { id: "pnl", label: "PNL" },
          { id: "come-si-vede", label: "Come si vede" },
          { id: "relazioni", label: "Relazioni" },
          { id: "ali", label: "Ali" },
          { id: "sottotipi", label: "Sottotipi" },
          { id: "lavoro", label: "Lavoro" },
          { id: "coppia", label: "Coppia" },
          { id: "evoluzione", label: "Evoluzione" },
          { id: "astrologia", label: "Astrologia" },
          { id: "idee-sacre", label: "Idee Sacre" },
        ].map(({ id: sectionId, label }) => (
          <a key={sectionId} href={`#${sectionId}`}>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors text-xs">
              {label}
            </Badge>
          </a>
        ))}
      </div>

      {detailed && (
        <>
          {/* Panoramica */}
          <Section title="Panoramica" icon={<Star className="w-5 h-5 text-primary" />} id="panoramica">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2.5 text-sm">
                <div><span className="font-medium text-foreground">Personalità (Naranjo):</span> <span className="text-muted-foreground">{detailed.personalitaNaranjo}</span></div>
                <div><span className="font-medium text-foreground">Credenze:</span> <span className="text-muted-foreground">{detailed.credenze}</span></div>
                <div><span className="font-medium text-foreground">Valori:</span> <span className="text-muted-foreground">{detailed.valori}</span></div>
                <div><span className="font-medium text-foreground">Criterio:</span> <span className="text-muted-foreground">{detailed.criterio}</span></div>
              </div>
              <div className="space-y-2.5 text-sm">
                <div><span className="font-medium text-foreground">Centro:</span> <span className="text-muted-foreground">{detailed.centro.tipo}</span></div>
                <div><span className="font-medium text-foreground">Domanda guida:</span> <span className="text-muted-foreground italic">"{detailed.centro.domanda}"</span></div>
                <div className="text-muted-foreground text-xs">{detailed.centro.nota}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{detailed.definizione}</p>
          </Section>

          {/* Frecce: Stress e Riposo */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <Card className="border-red-200 dark:border-red-900/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                  <h3 className="font-semibold text-sm text-red-600 dark:text-red-400">In Stress → Tipo {detailed.frecce.stress.numero}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{detailed.frecce.stress.descrizione}</p>
              </CardContent>
            </Card>
            <Card className="border-green-200 dark:border-green-900/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <h3 className="font-semibold text-sm text-green-600 dark:text-green-400">In Riposo → Tipo {detailed.frecce.riposo.numero}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{detailed.frecce.riposo.descrizione}</p>
              </CardContent>
            </Card>
          </div>

          {/* PNL */}
          <Section title="PNL (Programmazione Neuro-Linguistica)" icon={<Brain className="w-5 h-5 text-primary" />} id="pnl">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Accesso</h4>
                <p className="text-sm">{detailed.pnl.accesso}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Elaborazione</h4>
                <p className="text-sm">{detailed.pnl.elaborazione}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Gestualità</h4>
                <p className="text-sm">{detailed.pnl.gestualita}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Sguardo</h4>
                <p className="text-sm">{detailed.pnl.sguardo}</p>
              </div>
            </div>
          </Section>

          {/* Come si vede */}
          <Section title="Come si vede" icon={<Eye className="w-5 h-5 text-primary" />} id="come-si-vede">
            <TextBlock text={detailed.comeSiVede} />
          </Section>

          {/* Relazioni */}
          <Section title="Come si relaziona con gli altri" icon={<Users className="w-5 h-5 text-primary" />} id="relazioni">
            <Tabs defaultValue="relaziona" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="relaziona" className="text-xs">Come si relaziona</TabsTrigger>
                <TabsTrigger value="rapportarsi" className="text-xs">Come rapportarsi</TabsTrigger>
              </TabsList>
              <TabsContent value="relaziona" className="mt-4">
                <TextBlock text={detailed.comeSiRelaziona} />
              </TabsContent>
              <TabsContent value="rapportarsi" className="mt-4">
                <TextBlock text={detailed.comeRapportarsi} />
              </TabsContent>
            </Tabs>
          </Section>

          {/* Ali */}
          <Section title="Le Ali" icon={<Shield className="w-5 h-5 text-primary" />} id="ali">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  {fruitEmoji[detailed.ali.sinistra.numero]} Ala {detailed.ali.sinistra.numero}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">{detailed.ali.sinistra.descrizione}</p>
                {detailed.ali.sinistra.somiglianza && (
                  <Badge variant="secondary" className="text-xs">{detailed.ali.sinistra.somiglianza}</Badge>
                )}
              </div>
              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  {fruitEmoji[detailed.ali.destra.numero]} Ala {detailed.ali.destra.numero}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">{detailed.ali.destra.descrizione}</p>
                {detailed.ali.destra.somiglianza && (
                  <Badge variant="secondary" className="text-xs">{detailed.ali.destra.somiglianza}</Badge>
                )}
              </div>
            </div>
          </Section>

          {/* Sottotipi */}
          <Section title="I Tre Sottotipi" icon={<MessageCircle className="w-5 h-5 text-primary" />} id="sottotipi">
            <div className="grid gap-4">
              <SottotipoCard {...detailed.sottotipi.conservativo} />
              <SottotipoCard {...detailed.sottotipi.sociale} />
              <SottotipoCard {...detailed.sottotipi.sessuale} />
            </div>
          </Section>

          {/* Lavoro */}
          <Section title="In Ambito Lavorativo" icon={<Briefcase className="w-5 h-5 text-primary" />} id="lavoro">
            <p className="text-sm text-muted-foreground mb-4">{detailed.lavoro.descrizione}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-sm text-green-700 dark:text-green-300 mb-1.5">Mansioni appropriate</h4>
                <p className="text-sm text-muted-foreground">{detailed.lavoro.mansioniAppropriate}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-sm text-red-700 dark:text-red-300 mb-1.5">Mansioni non appropriate</h4>
                <p className="text-sm text-muted-foreground">{detailed.lavoro.mansioniNonAppropriate}</p>
              </div>
            </div>
          </Section>

          {/* Coppia */}
          <Section title="Rapporto di Coppia" icon={<HeartHandshake className="w-5 h-5 text-rose-500" />} id="coppia">
            <TextBlock text={detailed.coppia.descrizione} />
          </Section>

          {/* Livelli Evoluzione */}
          <Section title="Livelli di Evoluzione" icon={<TrendingUp className="w-5 h-5 text-primary" />} id="evoluzione">
            <p className="text-sm text-muted-foreground mb-4">{detailed.evoluzione}</p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border-l-4 border-red-500 bg-red-50/50 dark:bg-red-900/10">
                <h4 className="font-semibold text-sm text-red-700 dark:text-red-400 mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Disintegrato
                </h4>
                <p className="text-sm text-muted-foreground">{detailed.livelli.disintegrato}</p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-amber-500 bg-amber-50/50 dark:bg-amber-900/10">
                <h4 className="font-semibold text-sm text-amber-700 dark:text-amber-400 mb-1.5">Intermedio</h4>
                <p className="text-sm text-muted-foreground">{detailed.livelli.intermedio}</p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-green-500 bg-green-50/50 dark:bg-green-900/10">
                <h4 className="font-semibold text-sm text-green-700 dark:text-green-400 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Integrato
                </h4>
                <p className="text-sm text-muted-foreground">{detailed.livelli.integrato}</p>
              </div>
            </div>
          </Section>

          {/* Attributi spirituali e benessere from API data */}
          {data && (
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-serif font-semibold text-base mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" /> Attributi Spirituali
                  </h3>
                  <dl className="space-y-2.5 text-sm">
                    {data.dignita && <div className="flex justify-between"><dt className="text-muted-foreground">Dignità</dt><dd className="font-medium">{data.dignita}</dd></div>}
                    {data.virtu && <div className="flex justify-between"><dt className="text-muted-foreground">Virtù</dt><dd className="font-medium">{data.virtu}</dd></div>}
                    {data.vizio && <div className="flex justify-between"><dt className="text-muted-foreground">Vizio</dt><dd className="font-medium">{data.vizio}</dd></div>}
                    {data.idea_sacra && <div className="flex justify-between"><dt className="text-muted-foreground">Idea Sacra</dt><dd className="font-medium">{data.idea_sacra}</dd></div>}
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <h3 className="font-serif font-semibold text-base mb-3 flex items-center gap-2">
                    <Music className="w-4 h-4 text-primary" /> Correlazioni
                  </h3>
                  <dl className="space-y-2.5 text-sm">
                    {data.gerarchia_angelica && <div className="flex justify-between"><dt className="text-muted-foreground">Gerarchia Angelica</dt><dd className="font-medium">{data.gerarchia_angelica}</dd></div>}
                    {data.musa && <div className="flex justify-between"><dt className="text-muted-foreground">Musa</dt><dd className="font-medium text-right">{data.musa}</dd></div>}
                    {data.melodia && <div className="flex justify-between"><dt className="text-muted-foreground">Melodia</dt><dd className="font-medium">{data.melodia}</dd></div>}
                    {data.pianeta && <div className="flex justify-between"><dt className="text-muted-foreground">Pianeta</dt><dd className="font-medium">{data.pianeta}</dd></div>}
                  </dl>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Wellness from API data */}
          {data?.pietre_curative && (
            <Section title="Benessere e Crescita" icon={<Heart className="w-5 h-5 text-rose-500" />}>
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                    <Gem className="w-4 h-4 text-purple-500" /> Pietre Curative
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.pietre_curative?.map((p: string) => (
                      <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Cibi Consigliati</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.cibi_consigliati?.map((c: string) => (
                      <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Attività Benessere
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.attivita_benessere?.map((a: string) => (
                      <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* Astrologia */}
          <Section title="Astrologia e Corrispondenze" icon={<Moon className="w-5 h-5 text-primary" />} id="astrologia">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2.5 text-sm">
                <div><span className="font-medium text-foreground">Segno:</span> <span className="text-muted-foreground">{detailed.astrologia.segno}</span></div>
                <div><span className="font-medium text-foreground">Pianeta vedico:</span> <span className="text-muted-foreground">{detailed.astrologia.pianetaVedico}</span></div>
                <div className="text-xs text-muted-foreground">{detailed.astrologia.pianetaDescrizione}</div>
              </div>
              <div className="space-y-2.5 text-sm">
                <div><span className="font-medium text-foreground">Chakra:</span> <span className="text-muted-foreground">{detailed.astrologia.chakra}</span></div>
                <div><span className="font-medium text-foreground">Contro freccia:</span> <span className="text-muted-foreground">{detailed.astrologia.controFreccia}</span></div>
                <div><span className="font-medium text-foreground">Verso freccia:</span> <span className="text-muted-foreground">{detailed.astrologia.versoFreccia}</span></div>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-muted/50">
              <span className="font-medium text-sm">DSM III:</span>{" "}
              <span className="text-sm text-muted-foreground">{detailed.dsm}</span>
            </div>
          </Section>

          {/* Domande Utili */}
          <Section title="Domande Utili per Identificarlo" icon={<HelpCircle className="w-5 h-5 text-primary" />}>
            <ul className="space-y-2">
              {detailed.domandeUtili.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-medium mt-0.5">{i + 1}.</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Idee Sacre */}
          <Section title={`Idee Sacre: ${detailed.ideeSacre.titolo}`} icon={<Lightbulb className="w-5 h-5 text-amber-500" />} id="idee-sacre">
            <TextBlock text={detailed.ideeSacre.descrizione} />
          </Section>

          {/* Evolutionary Path from API */}
          {data?.percorso && (
            <Section title="Percorso Evolutivo (Schema)" icon={<TrendingUp className="w-5 h-5 text-primary" />}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-green-600">Integrazione</h4>
                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    {data.percorso.integrazione?.map((t: number, i: number) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
                          {t}
                        </span>
                        {i < data.percorso.integrazione.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-red-600">Disintegrazione</h4>
                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    {data.percorso.disintegrazione?.map((t: number, i: number) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium">
                          {t}
                        </span>
                        {i < data.percorso.disintegrazione.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          )}
        </>
      )}

      {/* Navigation between types */}
      <div className="flex justify-between items-center pb-8">
        <Link href={`/enneatipi/${prevNum}`}>
          <Button variant="outline" data-testid="button-prev-type">
            <ArrowLeft className="mr-2 w-4 h-4" />
            {fruitEmoji[prevNum]} Tipo {prevNum}
          </Button>
        </Link>
        <Link href="/test">
          <Button className="bg-primary hover:bg-primary/90">
            Fai il Test
          </Button>
        </Link>
        <Link href={`/enneatipi/${nextNum}`}>
          <Button variant="outline" data-testid="button-next-type">
            Tipo {nextNum} {fruitEmoji[nextNum]}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
