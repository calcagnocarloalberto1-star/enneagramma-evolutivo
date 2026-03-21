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
      const { risposte, eta, visitorId } = req.body;
      
      if (!risposte || !eta || !visitorId) {
        return res.status(400).json({ error: "Dati mancanti" });
      }

      const scores = calculateScores(risposte);
      const { enneatipo, needsGenogram: ngFromType } = determineEnneatipo(scores);
      const { ala, needsGenogram: ngFromWing } = determineAla(enneatipo, scores);
      const needsGenogram = ngFromType || ngFromWing;

      const result = storage.createTestResult({
        visitorId,
        enneatipo,
        ala,
        eta: parseInt(eta),
        punteggiFrutti: JSON.stringify(scores),
        risposte: JSON.stringify(risposte),
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
    
    const attrs = attributiEnneatipi.enneatipi[String(result.enneatipo)];
    const percorso = percorsi.percorsi[String(result.enneatipo)];
    const etaInfo = percorsi.etaEnneatipi;
    const eduInfo = educationalContent.enneatipi?.find((e: any) => e.numero === result.enneatipo || String(e.numero) === String(result.enneatipo));
    const percorsoPersonalizzato = getPercorsoPersonalizzato(result.enneatipo, result.eta);
    
    res.json({
      ...result,
      punteggiFrutti: JSON.parse(result.punteggiFrutti),
      attributi: attrs,
      descrizioni: attributiDescrizioni,
      educativo: eduInfo || null,
      percorso,
      percorsoPersonalizzato,
      etaInfo,
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
        glossario,
        educativo: eduInfo,
        descrizioni: attributiDescrizioni,
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

  return httpServer;
}
