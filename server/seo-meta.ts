// Meta tag e dati strutturati (JSON-LD) per rotta, generati lato server.
//
// Perché serve: essendo una SPA, l'unico index.html statico veniva servito
// identico per ogni URL (vedi static.ts). Il hook client useSEO() aggiorna
// title/description/canonical/OG via JavaScript dopo il mount di React, ma
// qualunque crawler o servizio che NON esegue JavaScript (molti bot di
// citazione AI, i generatori di anteprima social meno sofisticati, alcuni
// motori di ricerca in modalità "light") vede sempre gli stessi meta tag
// della homepage per qualsiasi pagina — inclusi i profili dei singoli
// enneatipi e gli articoli del blog. Questo file fornisce l'equivalente
// "server-side" di useSEO(), usato da static.ts per riscrivere l'HTML
// prima di inviarlo.

import { enneatypesDetailed } from "@/data/enneatypes-detailed";
import { typeNames } from "@/data/percorsi-eta";
import { faqs } from "@shared/faq-data";

export const SITE_URL = "https://enneagrammaevolutivo.it";

export interface RouteMeta {
  title: string;
  description: string;
  ogTitle?: string;
  /** "index, follow" (default) o "noindex, nofollow" per pagine private/dinamiche. */
  robots?: string;
  /** Blocchi JSON-LD aggiuntivi specifici della rotta (oltre a WebSite/Person, sempre presenti). */
  jsonLd?: Record<string, unknown>[];
}

const AUTHOR_PERSON = {
  "@type": "Person",
  name: "Carlo Alberto Calcagno",
  jobTitle: "Mediatore civile, commerciale e familiare, formatore, autore",
  url: `${SITE_URL}/about`,
  address: { "@type": "PostalAddress", addressLocality: "Genova", addressCountry: "IT" },
} as const;

function breadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// Meta statici per le rotte a contenuto fisso (copiati 1:1 dalle chiamate
// useSEO() già presenti in ogni pagina, per restare coerenti col client).
const STATIC_ROUTES: Record<string, RouteMeta> = {
  "/": {
    title: "Enneagramma Evolutivo — I 9 Frutti del Tuo Cammino Interiore",
    description: "Scopri il tuo enneatipo con il test gratuito dei 9 Frutti dell'Albero della Vita: compatibilità di coppia, percorsi di vita e mediazione familiare.",
  },
  "/test": {
    title: "Fai il Test | Enneagramma Evolutivo",
    description: "Fai il test gratuito dei 9 Frutti dell'Albero della Vita: 180 domande per scoprire il tuo enneatipo secondo l'Enneagramma Evolutivo.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Test dei 9 Frutti dell'Albero della Vita",
        url: `${SITE_URL}/test`,
        applicationCategory: "LifestyleApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        description: "Test gratuito di 180 domande per scoprire il tuo enneatipo secondo l'Enneagramma Evolutivo.",
        inLanguage: "it",
      },
    ],
  },
  "/enneatipi": {
    title: "I 9 Enneatipi | Enneagramma Evolutivo",
    description: "Scopri le caratteristiche uniche dei 9 enneatipi dell'Enneagramma Evolutivo: personalità, motivazioni, ali e percorsi di crescita.",
    jsonLd: [breadcrumb([{ name: "Home", path: "/" }, { name: "I 9 Enneatipi", path: "/enneatipi" }])],
  },
  "/compatibilita/coppia": {
    title: "Compatibilità di Coppia | Enneagramma Evolutivo",
    description: "Scopri la compatibilità di coppia secondo l'Enneagramma Evolutivo: dinamiche, sfide comuni e consigli per ogni combinazione di enneatipi.",
  },
  "/compatibilita/famiglia": {
    title: "Compatibilità Familiare | Enneagramma Evolutivo",
    description: "Scopri le dinamiche familiari secondo l'Enneagramma Evolutivo: compatibilità tra genitori e figli e strategie per relazioni più armoniose.",
  },
  "/compatibilita/lavoro": {
    title: "Compatibilità Lavorativa | Enneagramma Evolutivo",
    description: "Scopri la compatibilità lavorativa secondo l'Enneagramma Evolutivo: dinamiche di team, punti di forza e attriti tra colleghi.",
  },
  "/mediazione/civile": {
    title: "Mediazione Civile e Commerciale | Enneagramma Evolutivo",
    description: "Strumento AI per mediatori civili e commerciali: analisi delle parti basata sull'Enneagramma, strategie di mediazione e bozza di accordo personalizzata.",
  },
  "/mediazione/familiare": {
    title: "Mediazione Familiare | Enneagramma Evolutivo",
    description: "Strumento AI per mediatori familiari: analisi dei membri della famiglia basata sull'Enneagramma, strategie e bozza di accordo personalizzata.",
  },
  "/percorsi": {
    title: "Percorsi di Vita | Enneagramma Evolutivo",
    description: "I percorsi di vita dell'Enneagramma Evolutivo: come cambia il tuo enneatipo nelle diverse fasi della vita, dall'infanzia alla maturità.",
  },
  "/about": {
    title: "Chi Siamo — Carlo Alberto Calcagno | Enneagramma Evolutivo",
    description: "Chi è Carlo Alberto Calcagno: avvocato, mediatore e ideatore dell'Enneagramma Evolutivo. Scopri il metodo, la formazione e la filosofia del progetto.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: {
          "@type": "Person",
          name: "Carlo Alberto Calcagno",
          jobTitle: "Mediatore civile, commerciale e familiare, formatore, autore, counselor",
          description: "Ideatore dell'Enneagramma Evolutivo. Mediatore civile e commerciale dal 2010, mediatore familiare professionista certificato UNI 11644:2016, rappresentante dell'Italia nel Consiglio Internazionale di Mediazione (CIM-ICM), Vice Direttore della Scuola di Alta Formazione U.N.A.M., formatore accreditato dal Ministero della Giustizia.",
          url: `${SITE_URL}/about`,
          address: { "@type": "PostalAddress", addressLocality: "Genova", addressCountry: "IT" },
          memberOf: { "@type": "Organization", name: "A.I.Me.F. — Associazione Italiana Mediatori Familiari" },
        },
      },
      breadcrumb([{ name: "Home", path: "/" }, { name: "Chi Siamo", path: "/about" }]),
    ],
  },
  "/blog": {
    title: "Blog | Enneagramma Evolutivo",
    description: "Approfondimenti, guide e articoli sull'Enneagramma Evolutivo, i 9 enneatipi, la compatibilità di coppia e la mediazione dei conflitti.",
    jsonLd: [breadcrumb([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])],
  },
  "/faq": {
    title: "FAQ | Enneagramma Evolutivo",
    description: "Le domande più frequenti sull'Enneagramma Evolutivo: il test dei 9 Frutti, gli enneatipi, la compatibilità e gli strumenti di mediazione.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  },
  "/glossario": {
    title: "Glossario | Enneagramma Evolutivo",
    description: "Il glossario dell'Enneagramma Evolutivo: il significato di ogni termine usato nei risultati del test, da Dignità a Idea Sacra.",
  },
  "/privacy": {
    title: "Privacy Policy | Enneagramma Evolutivo",
    description: "Informativa Privacy di Enneagramma Evolutivo, ai sensi del Regolamento UE 2016/679: titolare del trattamento, dati raccolti e diritti dell'utente.",
  },
  "/termini": {
    title: "Termini d'Uso | Enneagramma Evolutivo",
    description: "Termini d'Uso di Enneagramma Evolutivo: condizioni di utilizzo del sito, del test e degli strumenti di mediazione basati sull'Enneagramma.",
  },
  "/terms": {
    title: "Termini d'Uso | Enneagramma Evolutivo",
    description: "Termini d'Uso di Enneagramma Evolutivo: condizioni di utilizzo del sito, del test e degli strumenti di mediazione basati sull'Enneagramma.",
  },
  "/cookies": {
    title: "Cookie Policy | Enneagramma Evolutivo",
    description: "Cookie Policy di Enneagramma Evolutivo: quali cookie tecnici e di preferenza usa il sito, come sono gestiti e come disattivarli.",
  },
  "/cookie-policy": {
    title: "Cookie Policy | Enneagramma Evolutivo",
    description: "Cookie Policy di Enneagramma Evolutivo: quali cookie tecnici e di preferenza usa il sito, come sono gestiti e come disattivarli.",
  },
  // Pagine private/dinamiche: niente contenuto pubblico rilevante, noindex esplicito
  // già dal server (finora lo era solo lato client via useNoIndex(), invisibile ai bot senza JS).
  "/admin": {
    title: "Dashboard | Enneagramma Evolutivo",
    description: "Area interna riservata.",
    robots: "noindex, nofollow",
  },
};

export interface BlogArticleMeta {
  slug: string;
  title: string;
  description: string;
}

/** Rimuove lo slash finale (es. "/faq/" -> "/faq", ma "/" resta "/"), così
 * tutte le varianti di uno stesso URL risolvono alla stessa voce e allo
 * stesso canonical, invece di essere trattate come pagine diverse. */
function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function getRouteMeta(pathname: string, blogArticles: BlogArticleMeta[]): RouteMeta | null {
  pathname = normalizePathname(pathname);

  if (STATIC_ROUTES[pathname]) return STATIC_ROUTES[pathname];

  if (pathname.startsWith("/test/results/")) {
    return {
      title: "Risultati del Test | Enneagramma Evolutivo",
      description: "Risultati personali del test dell'Enneagramma Evolutivo.",
      robots: "noindex, nofollow",
    };
  }

  const enneMatch = pathname.match(/^\/enneatipi\/(\d)$/);
  if (enneMatch) {
    const num = Number(enneMatch[1]);
    const name = typeNames[num];
    const detailed = enneatypesDetailed[num];
    if (name && detailed) {
      const title = `Enneatipo ${num} — ${name} | Enneagramma Evolutivo`;
      const description = `Enneatipo ${num}, ${name}: "${detailed.motto}". Scopri personalità, ali, sottotipi, relazioni e percorso evolutivo secondo l'Enneagramma Evolutivo.`;
      return {
        title,
        description,
        jsonLd: [
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "I 9 Enneatipi", path: "/enneatipi" },
            { name: `Enneatipo ${num} — ${name}`, path: pathname },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
            about: { "@type": "Thing", name: `Enneatipo ${num} — ${name}` },
            author: AUTHOR_PERSON,
            publisher: { "@type": "Organization", name: "Enneagramma Evolutivo", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}${pathname}`,
            inLanguage: "it",
          },
        ],
      };
    }
  }

  const blogMatch = pathname.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const article = blogArticles.find((a) => a.slug === blogMatch[1]);
    if (article) {
      const title = `${article.title} | Enneagramma Evolutivo`;
      const description = article.description || "Approfondimenti, guide e articoli sull'Enneagramma Evolutivo e la crescita personale.";
      return {
        title,
        description,
        jsonLd: [
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: article.title, path: pathname },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description,
            author: AUTHOR_PERSON,
            publisher: { "@type": "Organization", name: "Enneagramma Evolutivo", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}${pathname}`,
            inLanguage: "it",
          },
        ],
      };
    }
  }

  return null;
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function jsonLdScriptTag(obj: Record<string, unknown>): string {
  // < evita che una stringa nei dati chiuda prematuramente il tag <script>.
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, "\\u003c")}\n</script>`;
}

/**
 * Riscrive l'index.html grezzo (client/index.html, sempre identico per
 * ogni rotta lato build) inserendo title/description/canonical/OG/robots
 * e i JSON-LD specifici della rotta richiesta. Se la rotta non è
 * riconosciuta, l'HTML viene restituito invariato (fallback: i meta
 * generici della homepage, comportamento identico a prima di questa modifica).
 */
export function renderHtmlForRoute(template: string, pathname: string, blogArticles: BlogArticleMeta[]): string {
  const meta = getRouteMeta(pathname, blogArticles);
  if (!meta) return template;

  const title = meta.title;
  const description = meta.description;
  const ogTitle = meta.ogTitle || title;
  const robots = meta.robots || "index, follow";
  // Canonical sempre sulla variante normalizzata (senza slash finale), così
  // "/faq" e "/faq/" puntano allo stesso canonical invece di essere trattati
  // come due URL distinti.
  const canonicalUrl = `${SITE_URL}${normalizePathname(pathname)}`;

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`);
  html = html.replace(/<meta name="description" content="[\s\S]*?"\s*\/>/, `<meta name="description" content="${escapeAttr(description)}" />`);
  html = html.replace(/<meta name="robots" content="[\s\S]*?"\s*\/>/, `<meta name="robots" content="${robots}" />`);
  html = html.replace(/<link rel="canonical" href="[\s\S]*?"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title" content="[\s\S]*?"\s*\/>/, `<meta property="og:title" content="${escapeAttr(ogTitle)}" />`);
  html = html.replace(/<meta property="og:description" content="[\s\S]*?"\s*\/>/, `<meta property="og:description" content="${escapeAttr(description)}" />`);
  html = html.replace(/<meta property="og:url" content="[\s\S]*?"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta name="twitter:title" content="[\s\S]*?"\s*\/>/, `<meta name="twitter:title" content="${escapeAttr(ogTitle)}" />`);
  html = html.replace(/<meta name="twitter:description" content="[\s\S]*?"\s*\/>/, `<meta name="twitter:description" content="${escapeAttr(description)}" />`);

  if (meta.jsonLd?.length) {
    const blocks = meta.jsonLd.map(jsonLdScriptTag).join("\n");
    html = html.replace("</head>", `${blocks}\n</head>`);
  }

  return html;
}
