import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTestResultSchema } from "@shared/schema";
import fs from "fs";
import path from "path";

// Load data files
const dataDir = path.join(process.cwd(), "server", "data");
const blogDir = path.join(process.cwd(), "server", "blog-articles");

function loadJSON(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, filename), "utf-8"));
}

const testQuestions = loadJSON("test-questions.json");
const attributiEnneatipi = loadJSON("attributi-enneatipi.json");
const compatibilitaCoppia = loadJSON("compatibilita-coppia.json");
const percorsi = loadJSON("percorsi.json");
const sistemaEta = loadJSON("sistema-eta-completo.json");
const percorsiEnneatipi = loadJSON("percorsi-enneatipi.json");
const educationalContent = loadJSON("educational-content.json");
const attributiDescrizioni = loadJSON("attributi-descrizioni.json");
const percorsiEvolutiviCompleti = loadJSON("percorsi-evolutivi-completi.json");
const glossario = loadJSON("glossario.json");

// Get the user's current life phase and evolutionary path details
function getPercorsoPersonalizzato(enneatipo: number, eta: number) {
  const tipoData = percorsiEvolutiviCompleti.percorsiCompleti[String(enneatipo)];
  if (!tipoData) return null;
  
  const isCicloBreve = tipoData.cicloBrève === true;
  const integrazione = tipoData.integrazione;
  const disintegrazione = tipoData.disintegrazione;
  const puntiAttr = percorsiEvolutiviCompleti.puntiAttributi;
  
  // Determine current phase based on age
  let faseCorrente = "";
  if (isCicloBreve) {
    if (eta <= 30) faseCorrente = "0-30";
    else if (eta <= 60) faseCorrente = "30-60";
    else faseCorrente = "60+";
  } else {
    if (eta <= 3) faseCorrente = "0-3";
    else if (eta <= 12) faseCorrente = "3-12";
    else if (eta <= 19) faseCorrente = "12-19";
    else if (eta <= 30) faseCorrente = "19-30";
    else if (eta <= 60) faseCorrente = "30-60";
    else faseCorrente = "60+";
  }
  
  // Get current phase details for both paths
  const faseIntegrazione = integrazione.fasi[faseCorrente] || null;
  const faseDisintegrazione = disintegrazione.fasi[faseCorrente] || null;
  
  // Get attributes for the current integration point
  const puntoIntegrazione = faseIntegrazione?.punto;
  const puntoDisintegrazione = faseDisintegrazione?.punto;
  const attrIntegrazione = puntiAttr[String(puntoIntegrazione)] || null;
  const attrDisintegrazione = puntiAttr[String(puntoDisintegrazione)] || null;
  
  // Get crossing table data relevant to this type
  const tabellaIncroci = percorsiEvolutiviCompleti.tabellaIncroci;
  const puntiCaldi = tabellaIncroci?.incrociMisti?.puntiCaldi?.filter((pc: any) => {
    const puntiPercorso = [...integrazione.sequenza, ...disintegrazione.sequenza];
    return puntiPercorso.includes(pc.punto);
  }) || [];
  
  return {
    nome: tipoData.nome,
    ali: tipoData.ali,
    cicloBreve: isCicloBreve,
    faseCorrente,
    eta,
    integrazione: {
      sequenza: integrazione.sequenza,
      fasi: integrazione.fasi,
      incroci: integrazione.incroci,
      faseAttuale: faseIntegrazione,
      attributiPunto: attrIntegrazione,
      dignita: integrazione.dignita,
      virtu: integrazione.virtu
    },
    disintegrazione: {
      sequenza: disintegrazione.sequenza,
      fasi: disintegrazione.fasi,
      incroci: disintegrazione.incroci,
      faseAttuale: faseDisintegrazione,
      attributiPunto: attrDisintegrazione,
      vizi: disintegrazione.vizi
    },
    puntiCaldi,
    statistiche: tabellaIncroci?.statistiche
  };
}

// Age-based attribute analysis for parenting plan
function getAgePhaseAttributes(enneatipo: number, age: number) {
  const tipoData = percorsiEvolutiviCompleti.percorsiCompleti[String(enneatipo)];
  if (!tipoData) return null;

  const isCicloBreve = tipoData.cicloBrève === true;
  const integrazione = tipoData.integrazione;
  const puntiAttr = percorsiEvolutiviCompleti.puntiAttributi;

  // Determine current phase
  let faseCorrente = "";
  if (isCicloBreve) {
    if (age <= 30) faseCorrente = "0-30";
    else if (age <= 60) faseCorrente = "30-60";
    else faseCorrente = "60+";
  } else {
    if (age <= 3) faseCorrente = "0-3";
    else if (age <= 12) faseCorrente = "3-12";
    else if (age <= 19) faseCorrente = "12-19";
    else if (age <= 30) faseCorrente = "19-30";
    else if (age <= 60) faseCorrente = "30-60";
    else faseCorrente = "60+";
  }

  const faseIntegrazione = integrazione.fasi[faseCorrente];
  if (!faseIntegrazione) return null;

  const puntoCorrente = faseIntegrazione.punto;
  const attrs = puntiAttr[String(puntoCorrente)];
  if (!attrs) return null;

  return {
    fase: faseCorrente,
    faseNome: faseIntegrazione.nome,
    faseDesc: faseIntegrazione.desc,
    puntoCorrente,
    dignita: attrs.dignita,
    virtu: attrs.virtu,
    vizio: attrs.vizio,
    topica: attrs.topica,
    meccanismo: attrs.meccanismo,
  };
}

function buildAttributeAnalysis(nome1: string, e1: number, eta1: number, nome2: string, e2: number, eta2: number): string {
  const attrs1 = getAgePhaseAttributes(e1, eta1);
  const attrs2 = getAgePhaseAttributes(e2, eta2);

  if (!attrs1 || !attrs2) return "";

  let analysis = `\nANALISI DEGLI ATTRIBUTI PER ETA (per il piano genitoriale):\n\n`;
  analysis += `${nome1} (${eta1} anni, Enneatipo ${e1}):\n`;
  analysis += `- Fase attuale: ${attrs1.fase} - ${attrs1.faseNome}\n`;
  analysis += `- ${attrs1.faseDesc}\n`;
  analysis += `- Dignita: ${attrs1.dignita}, Virtu: ${attrs1.virtu}, Vizio: ${attrs1.vizio}\n`;
  analysis += `- Meccanismo di difesa: ${attrs1.meccanismo}\n`;
  analysis += `- Topica: ${attrs1.topica}\n\n`;

  analysis += `${nome2} (${eta2} anni, Enneatipo ${e2}):\n`;
  analysis += `- Fase attuale: ${attrs2.fase} - ${attrs2.faseNome}\n`;
  analysis += `- ${attrs2.faseDesc}\n`;
  analysis += `- Dignita: ${attrs2.dignita}, Virtu: ${attrs2.virtu}, Vizio: ${attrs2.vizio}\n`;
  analysis += `- Meccanismo di difesa: ${attrs2.meccanismo}\n`;
  analysis += `- Topica: ${attrs2.topica}\n\n`;

  // Find shared and different attributes
  const shared: string[] = [];
  const different: string[] = [];

  if (attrs1.dignita === attrs2.dignita) shared.push(`Dignita condivisa: ${attrs1.dignita}`);
  else different.push(`Dignita: ${attrs1.dignita} (${nome1}) vs ${attrs2.dignita} (${nome2})`);

  if (attrs1.virtu === attrs2.virtu) shared.push(`Virtu condivisa: ${attrs1.virtu}`);
  else different.push(`Virtu: ${attrs1.virtu} (${nome1}) vs ${attrs2.virtu} (${nome2})`);

  if (attrs1.vizio === attrs2.vizio) shared.push(`Vizio condiviso: ${attrs1.vizio}`);
  else different.push(`Vizio: ${attrs1.vizio} (${nome1}) vs ${attrs2.vizio} (${nome2})`);

  if (attrs1.topica === attrs2.topica) shared.push(`Topica condivisa: ${attrs1.topica}`);
  else different.push(`Topica: ${attrs1.topica} (${nome1}) vs ${attrs2.topica} (${nome2})`);

  if (attrs1.meccanismo === attrs2.meccanismo) shared.push(`Meccanismo condiviso: ${attrs1.meccanismo}`);
  else different.push(`Meccanismo: ${attrs1.meccanismo} (${nome1}) vs ${attrs2.meccanismo} (${nome2})`);

  if (shared.length > 0) {
    analysis += `ATTRIBUTI CONDIVISI (terreno comune per il piano genitoriale):\n`;
    for (const s of shared) analysis += `- ${s}\n`;
    analysis += `\n`;
  }

  if (different.length > 0) {
    analysis += `ATTRIBUTI DIVERSI (aree di potenziale attrito):\n`;
    for (const d of different) analysis += `- ${d}\n`;
    analysis += `\n`;
  }

  return analysis;
}

// Fruit to enneatipo mapping
const fruitToEnneatipo: Record<string, number> = {
  "Mela": 1, "Pera": 2, "Ciliegia": 3, "Nespola": 4,
  "Uva": 5, "Mirtillo": 6, "Ananas": 7, "Albicocca": 8, "Fragola": 9
};

function calculateScores(risposte: Record<string, boolean[]>) {
  const scores: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) scores[i] = 0;
  
  for (const [fruitName, answers] of Object.entries(risposte)) {
    const enneatipo = fruitToEnneatipo[fruitName];
    if (enneatipo) {
      scores[enneatipo] = answers.filter(Boolean).length;
    }
  }
  return scores;
}

function determineEnneatipo(scores: Record<number, number>) {
  let maxScore = 0;
  let maxTypes: number[] = [];
  
  for (let i = 1; i <= 9; i++) {
    if (scores[i] > maxScore) {
      maxScore = scores[i];
      maxTypes = [i];
    } else if (scores[i] === maxScore) {
      maxTypes.push(i);
    }
  }
  
  if (maxTypes.length > 1) {
    return { enneatipo: maxTypes[0], needsGenogram: true };
  }
  
  return { enneatipo: maxTypes[0], needsGenogram: false };
}

function determineAla(mainType: number, scores: Record<number, number>) {
  const mainScore = scores[mainType];
  if (mainScore < 10) return { ala: null, needsGenogram: true };
  
  const leftWing = mainType === 1 ? 9 : mainType - 1;
  const rightWing = mainType === 9 ? 1 : mainType + 1;
  
  const leftScore = scores[leftWing];
  const rightScore = scores[rightWing];
  
  if (leftScore === rightScore) return { ala: null, needsGenogram: true };
  if (leftScore < 5 && rightScore < 5) return { ala: null, needsGenogram: true };
  
  return { ala: leftScore > rightScore ? leftWing : rightWing, needsGenogram: false };
}

function validateResults(scores: Record<number, number>, enneatipo: number) {
  const maxScore = Math.max(...Object.values(scores));

  // Rule 1: Two or more types tied for highest score
  const maxTypes = Object.entries(scores)
    .filter(([, v]) => v === maxScore)
    .map(([k]) => parseInt(k));
  const tiedMaxScores = maxTypes.length > 1;

  // Rule 3: Max score too low (< 10)
  const maxScoreTooLow = maxScore < 10;

  // Rule 2: Wing scores tied
  const leftWing = enneatipo === 1 ? 9 : enneatipo - 1;
  const rightWing = enneatipo === 9 ? 1 : enneatipo + 1;
  const tiedWingScores = !tiedMaxScores && !maxScoreTooLow && scores[leftWing] === scores[rightWing];

  const valid = !tiedMaxScores && !tiedWingScores && !maxScoreTooLow;

  return {
    valid,
    validationIssues: {
      tiedMaxScores,
      tiedWingScores,
      maxScoreTooLow,
      // Dati extra per messaggi precisi nel banner del frontend
      tiedTypes: maxTypes,                                          // es. [8, 9] se T8 e T9 pareggiano
      maxScore,                                                     // es. 13 (punteggio massimo numerico)
      tiedWingTypes: tiedWingScores ? [leftWing, rightWing] : [],   // es. [7, 9] se ali in pareggio
    },
  };
}

// Load blog articles
function loadBlogArticles() {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith(".md")).sort();
  return files.map((filename, index) => {
    const content = fs.readFileSync(path.join(blogDir, filename), "utf-8");
    const lines = content.split("\n");
    const title = lines[0]?.replace(/^#\s*/, "") || filename;
    const slug = filename.replace(".md", "");
    
    // Extract meta description
    const metaLine = lines.find(l => l.startsWith("**Meta Description**:"));
    const description = metaLine?.replace("**Meta Description**:", "").trim() || "";
    
    // Extract category
    const catLine = lines.find(l => l.startsWith("**Categoria**:") || l.startsWith("**Keywords**:"));
    const category = catLine?.replace(/^\*\*(Categoria|Keywords)\*\*:\s*/, "").trim() || "Enneagramma";
    
    return { id: index + 1, slug, title, description, category, filename };
  });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // GET test questions
  app.get("/api/test/questions", (_req, res) => {
    res.json(testQuestions);
  });

  // POST submit test
  app.post("/api/test/submit", (req, res) => {
    try {
      const { risposte, eta, visitorId, intro } = req.body;
      
      if (!risposte || !eta || !visitorId) {
        return res.status(400).json({ error: "Dati mancanti" });
      }

      const scores = calculateScores(risposte);
      const { enneatipo, needsGenogram: ngFromType } = determineEnneatipo(scores);
      const { ala, needsGenogram: ngFromWing } = determineAla(enneatipo, scores);
      const needsGenogram = ngFromType || ngFromWing;
      const validation = validateResults(scores, enneatipo);

      const result = storage.createTestResult({
        visitorId,
        enneatipo,
        ala,
        eta: parseInt(eta),
        punteggiFrutti: JSON.stringify(scores),
        risposte: JSON.stringify(risposte),
        personalNotes: intro?.trim() || null,
        needsGenogram,
      });

      // Get attributes for the determined enneatipo
      const attrs = attributiEnneatipi.enneatipi[String(enneatipo)];
      const percorso = percorsi.percorsi[String(enneatipo)];
      const etaInfo = percorsi.etaEnneatipi;
      const eduInfo = educationalContent.enneatipi?.find((e: any) => e.numero === enneatipo || String(e.numero) === String(enneatipo));
      const percorsoPersonalizzato = getPercorsoPersonalizzato(enneatipo, parseInt(eta));

      res.json({
        ...result,
        punteggiFrutti: scores,
        attributi: attrs,
        descrizioni: attributiDescrizioni,
        educativo: eduInfo || null,
        percorso,
        percorsoPersonalizzato,
        glossario,
        etaInfo,
        needsGenogram,
        ...validation,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET test result by ID
  app.get("/api/test/result/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const result = storage.getTestResult(id);
    if (!result) {
      return res.status(404).json({ error: "Risultato non trovato" });
    }
    
    const scores = JSON.parse(result.punteggiFrutti);
    const validation = validateResults(scores, result.enneatipo);
    const attrs = attributiEnneatipi.enneatipi[String(result.enneatipo)];
    const percorso = percorsi.percorsi[String(result.enneatipo)];
    const etaInfo = percorsi.etaEnneatipi;
    const eduInfo = educationalContent.enneatipi?.find((e: any) => e.numero === result.enneatipo || String(e.numero) === String(result.enneatipo));
    const percorsoPersonalizzato = getPercorsoPersonalizzato(result.enneatipo, result.eta);

    res.json({
      ...result,
      punteggiFrutti: scores,
      attributi: attrs,
      descrizioni: attributiDescrizioni,
      educativo: eduInfo || null,
      percorso,
      percorsoPersonalizzato,
      etaInfo,
      ...validation,
    });
  });

  // POST generate narrative profile
  app.post("/api/profile/generate", async (req, res) => {
    try {
      const { testResultId } = req.body;
      const result = storage.getTestResult(testResultId);
      if (!result) {
        return res.status(404).json({ error: "Risultato non trovato" });
      }
      
      const attrs = attributiEnneatipi.enneatipi[String(result.enneatipo)];
      const percorsoPersonalizzato = getPercorsoPersonalizzato(result.enneatipo, result.eta);
      const eduInfo = educationalContent.enneatipi?.find((e: any) => e.numero === result.enneatipo || String(e.numero) === String(result.enneatipo));
      
      const { generateNarrativeProfile } = await import('./profile-generator');
      const narrative = await generateNarrativeProfile({
        enneatipo: result.enneatipo,
        ala: result.ala,
        eta: result.eta,
        punteggiFrutti: JSON.parse(result.punteggiFrutti),
        attrs,
        percorsoPersonalizzato,
        educativo: eduInfo,
        descrizioni: attributiDescrizioni,
        personalNotes: result.personalNotes || null,
      });
      
      res.json({ narrative, testResultId });
    } catch (err: any) {
      console.error("[Profile] Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // GET couple compatibility
  app.get("/api/compatibility/:type1/:type2", (req, res) => {
    const t1 = parseInt(req.params.type1);
    const t2 = parseInt(req.params.type2);
    
    // Try both key orderings
    const key1 = `${Math.min(t1, t2)}-${Math.max(t1, t2)}`;
    const key2 = `${t1}-${t2}`;
    
    const compat = compatibilitaCoppia.compatibilita[key2] || compatibilitaCoppia.compatibilita[key1];
    
    if (!compat) {
      return res.status(404).json({ error: "Compatibilità non trovata" });
    }

    res.json({
      ...compat,
      tipo1: { numero: t1, ...attributiEnneatipi.enneatipi[String(t1)] },
      tipo2: { numero: t2, ...attributiEnneatipi.enneatipi[String(t2)] },
    });
  });

  // GET all enneatypes
  app.get("/api/enneatipi", (_req, res) => {
    const list = Object.entries(attributiEnneatipi.enneatipi).map(([num, attrs]: [string, any]) => ({
      numero: parseInt(num),
      nome: attrs.nome,
      motto: attrs.motto,
    }));
    res.json(list);
  });

  // GET single enneatype
  app.get("/api/enneatipi/:id", (req, res) => {
    const id = req.params.id;
    const attrs = attributiEnneatipi.enneatipi[id];
    if (!attrs) {
      return res.status(404).json({ error: "Enneatipo non trovato" });
    }
    
    const percorso = percorsi.percorsi[id];
    let detailedPaths = null;
    if (percorsiEnneatipi && percorsiEnneatipi[id]) {
      detailedPaths = percorsiEnneatipi[id];
    }
    
    res.json({
      numero: parseInt(id),
      ...attrs,
      percorso,
      percorsiDettagliati: detailedPaths,
    });
  });

  // GET blog articles list
  app.get("/api/blog", (_req, res) => {
    const articles = loadBlogArticles();
    res.json(articles);
  });

  // GET single blog article
  app.get("/api/blog/:slug", (req, res) => {
    const { slug } = req.params;
    const filepath = path.join(blogDir, `${slug}.md`);
    
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: "Articolo non trovato" });
    }
    
    const content = fs.readFileSync(filepath, "utf-8");
    const lines = content.split("\n");
    const title = lines[0]?.replace(/^#\s*/, "") || slug;
    
    res.json({ slug, title, content });
  });

  // GET educational content
  app.get("/api/educational", (_req, res) => {
    res.json(educationalContent);
  });

  // GET percorsi data (age paths)
  app.get("/api/percorsi", (_req, res) => {
    res.json({ percorsi, sistemaEta });
  });

  // GET all compatibility data
  app.get("/api/compatibility-data", (_req, res) => {
    res.json(compatibilitaCoppia);
  });

  // GET glossario
  app.get("/api/glossario", (_req, res) => {
    res.json(glossario);
  });

  // GET admin stats
  app.get("/api/admin/stats", (_req, res) => {
    try {
      const allResults = storage.getAllTestResults();
      const totalTests = allResults.length;

      if (totalTests === 0) {
        return res.json({
          totalTests: 0,
          averageAge: 0,
          mostCommonType: null,
          typeDistribution: {},
          ageByType: {},
          testsPerDay: [],
          recentTests: [],
        });
      }

      // Average age
      const averageAge = Math.round(allResults.reduce((sum, r) => sum + r.eta, 0) / totalTests);

      // Type distribution
      const typeDistribution: Record<number, number> = {};
      const agesByType: Record<number, number[]> = {};
      for (let i = 1; i <= 9; i++) {
        typeDistribution[i] = 0;
        agesByType[i] = [];
      }
      for (const r of allResults) {
        typeDistribution[r.enneatipo] = (typeDistribution[r.enneatipo] || 0) + 1;
        if (!agesByType[r.enneatipo]) agesByType[r.enneatipo] = [];
        agesByType[r.enneatipo].push(r.eta);
      }

      // Most common type
      const mostCommonType = Object.entries(typeDistribution)
        .sort((a, b) => b[1] - a[1])[0]?.[0];

      // Average age by type
      const ageByType: Record<number, number> = {};
      for (const [type, ages] of Object.entries(agesByType)) {
        ageByType[parseInt(type)] = ages.length > 0
          ? Math.round(ages.reduce((s, a) => s + a, 0) / ages.length)
          : 0;
      }

      // Tests per day (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const testsPerDayMap: Record<string, number> = {};
      for (const r of allResults) {
        const date = r.createdAt?.substring(0, 10);
        if (date && new Date(date) >= thirtyDaysAgo) {
          testsPerDayMap[date] = (testsPerDayMap[date] || 0) + 1;
        }
      }
      const testsPerDay = Object.entries(testsPerDayMap)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      // Recent tests (last 20)
      const recentTests = allResults
        .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
        .slice(0, 20)
        .map(r => ({
          id: r.id,
          enneatipo: r.enneatipo,
          ala: r.ala,
          eta: r.eta,
          createdAt: r.createdAt,
        }));

      res.json({
        totalTests,
        averageAge,
        mostCommonType: mostCommonType ? parseInt(mostCommonType) : null,
        typeDistribution,
        ageByType,
        testsPerDay,
        recentTests,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET sitemap.xml
  app.get("/sitemap.xml", (_req, res) => {
    const baseUrl = "https://enneagrammaevolutivo.it";
    const urls = [
      { loc: "/", changefreq: "weekly", priority: "1.0" },
      { loc: "/test", changefreq: "monthly", priority: "0.9" },
      { loc: "/enneatipi", changefreq: "monthly", priority: "0.8" },
      ...Array.from({ length: 9 }, (_, i) => ({
        loc: `/enneatipi/${i + 1}`, changefreq: "monthly", priority: "0.7",
      })),
      { loc: "/compatibilita/coppia", changefreq: "monthly", priority: "0.8" },
      { loc: "/compatibilita/famiglia", changefreq: "monthly", priority: "0.8" },
      { loc: "/compatibilita/lavoro", changefreq: "monthly", priority: "0.7" },
      { loc: "/percorsi", changefreq: "monthly", priority: "0.7" },
      { loc: "/mediazione/civile", changefreq: "monthly", priority: "0.7" },
      { loc: "/mediazione/familiare", changefreq: "monthly", priority: "0.7" },
      { loc: "/about", changefreq: "monthly", priority: "0.6" },
      { loc: "/blog", changefreq: "weekly", priority: "0.6" },
      { loc: "/glossario", changefreq: "monthly", priority: "0.5" },
      { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
      { loc: "/termini", changefreq: "yearly", priority: "0.3" },
      { loc: "/cookies", changefreq: "yearly", priority: "0.3" },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.set("Content-Type", "application/xml");
    res.send(xml);
  });

  // Google Search Console verification
  app.get("/googleb2392e1f3564a1be.html", (_req, res) => {
    res.set("Content-Type", "text/html");
    res.send("google-site-verification: googleb2392e1f3564a1be.html");
  });

  // GET robots.txt
  app.get("/robots.txt", (_req, res) => {
    res.set("Content-Type", "text/plain");
    res.send(`User-agent: *
Allow: /
Sitemap: https://enneagrammaevolutivo.it/sitemap.xml
`);
  });

  // POST generate minuta di accordo
  app.post("/api/mediation/minuta", async (req, res) => {
    try {
      const { tipo, parte1, parte2, tipoControversia, livelloConflitto, inquadramento, figliCoinvolti, numFigli, etaFigli, eta1, eta2 } = req.body;

      if (!parte1?.enneatipo || !parte2?.enneatipo) {
        return res.status(400).json({ error: "Dati delle parti mancanti" });
      }

      const typeNamesLocal: Record<number, string> = {
        1: "Il Perfezionista", 2: "L'Altruista", 3: "Il Realizzatore",
        4: "L'Individualista", 5: "L'Osservatore", 6: "Il Leale",
        7: "L'Entusiasta", 8: "Il Leader", 9: "Il Pacificatore"
      };

      const enneatipoLanguageGuide: Record<number, string> = {
        1: "Linguaggio preciso, regole chiare, enfasi su equità e correttezza. Clausole ben definite senza ambiguità.",
        2: "Linguaggio che preserva le relazioni, cura reciproca, toni caldi. Enfasi sulla collaborazione e il benessere delle persone coinvolte.",
        3: "Linguaggio efficiente, orientato ai risultati, deliverables chiari. Tempistiche definite e obiettivi misurabili.",
        4: "Riconoscimento dell'unicità della situazione, espressione autentica. Clausole che rispettano la sensibilità e l'individualità.",
        5: "Linguaggio dettagliato, logico, ben documentato. Ogni clausola motivata razionalmente con riferimenti precisi.",
        6: "Focus sulla sicurezza, piani di contingenza, riferimenti alla lealtà. Garanzie e meccanismi di protezione chiari.",
        7: "Framing positivo, possibilità future, flessibilità. Linguaggio aperto che mantiene opzioni e guarda al futuro.",
        8: "Linguaggio diretto, enfasi sulla giustizia, equilibrio di potere chiaro. Clausole forti e inequivocabili.",
        9: "Orientamento all'armonia, bilanciamento, inclusività. Linguaggio che favorisce la pace e il consenso reciproco."
      };

      const tipoLabel = tipo === "familiare" ? "FAMILIARE" : "CIVILE E COMMERCIALE";
      const nome1 = parte1.nome || "Parte 1";
      const nome2 = parte2.nome || "Parte 2";
      const e1 = parte1.enneatipo;
      const e2 = parte2.enneatipo;

      // Build age-based attribute analysis if ages are provided (family mediation)
      const ageAnalysis = (eta1 && eta2 && figliCoinvolti)
        ? buildAttributeAnalysis(nome1, e1, parseInt(eta1), nome2, e2, parseInt(eta2))
        : "";

      const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

      if (GEMINI_API_KEY) {
        try {
          const { GoogleGenerativeAI } = await import("@google/generative-ai");
          const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

          const prompt = `Sei un mediatore professionista esperto. Genera una MINUTA DI ACCORDO DI MEDIAZIONE ${tipoLabel} in italiano formale.

DATI DEL CASO:
- Tipo mediazione: ${tipoLabel}
- ${nome1}: Enneatipo ${e1} (${typeNamesLocal[e1]})${parte1.ala && parte1.ala !== "nessuna" ? `, Ala ${parte1.ala}` : ""}${parte1.sottotipo ? `, Sottotipo: ${parte1.sottotipo}` : ""}
- ${nome2}: Enneatipo ${e2} (${typeNamesLocal[e2]})${parte2.ala && parte2.ala !== "nessuna" ? `, Ala ${parte2.ala}` : ""}${parte2.sottotipo ? `, Sottotipo: ${parte2.sottotipo}` : ""}
${tipoControversia ? `- Tipo controversia: ${tipoControversia}` : ""}
- Livello conflitto: ${livelloConflitto || "medio"}
${inquadramento ? `- Descrizione del caso: ${inquadramento}` : ""}
${figliCoinvolti ? `- Figli coinvolti: ${numFigli || "sì"}${etaFigli ? ` (età: ${etaFigli})` : ""}` : ""}

GUIDA LINGUISTICA PER ENNEATIPO:
- Per ${nome1} (Tipo ${e1}): ${enneatipoLanguageGuide[e1]}
- Per ${nome2} (Tipo ${e2}): ${enneatipoLanguageGuide[e2]}
${ageAnalysis ? `\n${ageAnalysis}` : ""}
ISTRUZIONI:
1. Struttura il documento come un verbale di accordo di mediazione formale
2. Includi: INTESTAZIONE, PREMESSE (con fatti del caso), IDENTIFICAZIONE DELLE PARTI, ACCORDI RAGGIUNTI (clausole specifiche adattate al tipo di controversia e ai bisogni delle parti), CLAUSOLA DI REVISIONE, CLAUSOLA DI SALVAGUARDIA, FIRME
3. Il linguaggio delle clausole deve COMBINARE gli stili comunicativi di entrambi gli enneatipi per risultare accettabile a entrambe le parti
4. Usa la descrizione del caso per creare clausole specifiche e concrete, non generiche
${figliCoinvolti ? "5. Includi una sezione dedicata al piano genitoriale con disposizioni per i figli. Se presente l'analisi degli attributi per eta, usa gli attributi condivisi come leve per il piano genitoriale e gli attributi diversi come aree di attenzione" : ""}
6. Includi una sezione su come gestire eventuali controversie relative all'accordo stesso
7. Termina con le righe per le firme delle parti e del mediatore
8. Scrivi SOLO il testo dell'accordo, senza commenti o spiegazioni aggiuntive`;

          const result = await model.generateContent(prompt);
          const text = result.response.text();
          if (text) {
            return res.json({ minuta: text, generatedBy: "ai" });
          }
        } catch (aiError) {
          console.error("[Minuta] Gemini API error, falling back to static:", aiError);
        }
      }

      // Static fallback
      const today = new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
      const guidaParte1 = enneatipoLanguageGuide[e1] || "";
      const guidaParte2 = enneatipoLanguageGuide[e2] || "";

      let minuta = `VERBALE DI ACCORDO DI MEDIAZIONE ${tipoLabel}\n\n`;
      minuta += `Data: ${today}\n`;
      minuta += `Procedimento di mediazione n. ___/${new Date().getFullYear()}\n\n`;

      minuta += `═══════════════════════════════════════\n`;
      minuta += `PREMESSE\n`;
      minuta += `═══════════════════════════════════════\n\n`;
      minuta += `In data odierna, presso l'Organismo di Mediazione _______________, `;
      minuta += `si sono presentate le seguenti parti per tentare una composizione ${tipo === "familiare" ? "delle questioni familiari" : "della controversia civile e commerciale"} che le oppone.\n\n`;
      if (inquadramento) {
        minuta += `Oggetto della mediazione:\n${inquadramento}\n\n`;
      }
      if (tipoControversia) {
        minuta += `Materia: ${tipoControversia}\n`;
      }
      minuta += `Livello di conflittualità dichiarato: ${livelloConflitto || "medio"}\n\n`;

      minuta += `═══════════════════════════════════════\n`;
      minuta += `IDENTIFICAZIONE DELLE PARTI\n`;
      minuta += `═══════════════════════════════════════\n\n`;

      minuta += `PARTE 1: ${nome1}\n`;
      minuta += `Profilo di personalità: Enneatipo ${e1} — ${typeNamesLocal[e1]}\n`;
      minuta += `Approccio comunicativo privilegiato: ${guidaParte1}\n\n`;

      minuta += `PARTE 2: ${nome2}\n`;
      minuta += `Profilo di personalità: Enneatipo ${e2} — ${typeNamesLocal[e2]}\n`;
      minuta += `Approccio comunicativo privilegiato: ${guidaParte2}\n\n`;

      if (figliCoinvolti) {
        minuta += `Figli coinvolti: ${numFigli || "sì"}`;
        if (etaFigli) minuta += ` (età: ${etaFigli})`;
        minuta += `\n\n`;
      }

      minuta += `═══════════════════════════════════════\n`;
      minuta += `ACCORDI RAGGIUNTI\n`;
      minuta += `═══════════════════════════════════════\n\n`;

      minuta += `Le parti, con l'assistenza del mediatore, hanno raggiunto i seguenti accordi:\n\n`;

      minuta += `Art. 1 — Oggetto dell'accordo\n`;
      minuta += `Le parti convengono di risolvere la controversia in oggetto secondo i termini e le condizioni qui di seguito specificati, `;
      minuta += `nel rispetto dei principi di equità, buona fede e reciproca collaborazione.\n\n`;

      minuta += `Art. 2 — Obblighi di ${nome1}\n`;
      minuta += `${nome1} si impegna a: _______________________________________________\n`;
      minuta += `[Clausole da compilare in base all'accordo raggiunto]\n\n`;

      minuta += `Art. 3 — Obblighi di ${nome2}\n`;
      minuta += `${nome2} si impegna a: _______________________________________________\n`;
      minuta += `[Clausole da compilare in base all'accordo raggiunto]\n\n`;

      minuta += `Art. 4 — Termini e modalità\n`;
      minuta += `Gli impegni di cui sopra dovranno essere adempiuti entro il termine di ______________ `;
      minuta += `dalla data di sottoscrizione del presente accordo.\n\n`;

      if (figliCoinvolti) {
        minuta += `═══════════════════════════════════════\n`;
        minuta += `PIANO GENITORIALE\n`;
        minuta += `═══════════════════════════════════════\n\n`;
        minuta += `Art. 5 — Affidamento e responsabilità genitoriale\n`;
        minuta += `Le parti concordano un affidamento ______________ dei figli minori.\n\n`;
        minuta += `Art. 6 — Tempi di permanenza\n`;
        minuta += `I figli trascorreranno: _______________________________________________\n\n`;
        minuta += `Art. 7 — Contributo al mantenimento\n`;
        minuta += `Il contributo al mantenimento dei figli è fissato in € _______/mese.\n\n`;
        if (ageAnalysis) {
          minuta += `═══════════════════════════════════════\n`;
          minuta += `ANALISI DEGLI ATTRIBUTI PER ETA\n`;
          minuta += `═══════════════════════════════════════\n\n`;
          minuta += ageAnalysis;
        }
      }

      minuta += `═══════════════════════════════════════\n`;
      minuta += `CLAUSOLA DI REVISIONE\n`;
      minuta += `═══════════════════════════════════════\n\n`;
      minuta += `Le parti si impegnano a riesaminare i termini del presente accordo qualora `;
      minuta += `sopraggiungano circostanze sostanzialmente diverse da quelle esistenti alla data `;
      minuta += `della presente sottoscrizione. In tale evenienza, le parti si impegnano a ricorrere `;
      minuta += `nuovamente alla mediazione prima di adire le vie giudiziarie.\n\n`;

      minuta += `═══════════════════════════════════════\n`;
      minuta += `CLAUSOLA DI SALVAGUARDIA\n`;
      minuta += `═══════════════════════════════════════\n\n`;
      minuta += `Qualora una o più clausole del presente accordo risultino invalide o inapplicabili, `;
      minuta += `le restanti clausole manterranno la loro piena efficacia. Le parti si impegnano a `;
      minuta += `sostituire le clausole invalide con disposizioni valide che si avvicinino il più possibile `;
      minuta += `allo scopo economico e giuridico delle clausole sostituite.\n\n`;

      minuta += `═══════════════════════════════════════\n`;
      minuta += `GESTIONE DELLE CONTROVERSIE SULL'ACCORDO\n`;
      minuta += `═══════════════════════════════════════\n\n`;
      minuta += `Per qualsiasi controversia relativa all'interpretazione o all'esecuzione del presente `;
      minuta += `accordo, le parti si impegnano a ricorrere preventivamente a un nuovo tentativo di `;
      minuta += `mediazione presso il medesimo Organismo, prima di adire l'Autorità Giudiziaria.\n\n`;

      minuta += `═══════════════════════════════════════\n`;
      minuta += `FIRME\n`;
      minuta += `═══════════════════════════════════════\n\n`;
      minuta += `Luogo: _______________  Data: ${today}\n\n`;
      minuta += `${nome1}\n`;
      minuta += `_________________________________\n\n`;
      minuta += `${nome2}\n`;
      minuta += `_________________________________\n\n`;
      minuta += `Il Mediatore\n`;
      minuta += `_________________________________\n`;

      res.json({ minuta, generatedBy: "static" });
    } catch (err: any) {
      console.error("[Minuta] Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  return httpServer;
}
