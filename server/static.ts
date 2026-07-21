import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { renderHtmlForRoute } from "./seo-meta";
import { loadBlogArticles } from "./routes";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // index: false disabilita la risposta automatica di index.html per "/":
  // altrimenti express.static risponde direttamente per la home, che non
  // passerebbe mai dal catch-all sottostante e non riceverebbe mai i meta
  // per-rotta (bug riscontrato in produzione: la home mostrava il <title>
  // grezzo di client/index.html invece di quello aggiornato in seo-meta.ts).
  app.use(express.static(distPath, { index: false }));

  // index.html is read once and cached: it never changes at runtime,
  // only the per-route meta tags/JSON-LD injected into a copy of it do.
  const indexPath = path.resolve(distPath, "index.html");
  const indexTemplate = fs.readFileSync(indexPath, "utf-8");
  const blogArticles = loadBlogArticles();

  // fall through to index.html if the file doesn't exist, injecting
  // per-route SEO/GEO meta tags and JSON-LD so bots that don't execute
  // JavaScript still see the correct title/description/canonical/OG for
  // the requested URL instead of always the homepage's (see seo-meta.ts).
  //
  // IMPORTANT: app.get (non app.use) qui è deliberato. app.use(path, fn)
  // tratta "path" come un mount-point e RISCRIVE req.url/req.path relativi
  // ad esso (per supportare router annidati) — con un wildcard che cattura
  // l'intero percorso, questo faceva sì che req.path fosse SEMPRE "/" dentro
  // l'handler, qualunque fosse l'URL richiesto: bug root-cause per cui ogni
  // rotta (/faq, /admin, /enneatipi/4, ...) riceveva sempre i meta della
  // home. app.get (una vera route, non un mount) non riscrive req.path.
  app.get("/{*path}", (req, res) => {
    const html = renderHtmlForRoute(indexTemplate, req.path, blogArticles);
    res.set("Content-Type", "text/html");
    res.send(html);
  });
}
