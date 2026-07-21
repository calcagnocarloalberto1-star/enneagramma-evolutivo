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

  app.use(express.static(distPath));

  // index.html is read once and cached: it never changes at runtime,
  // only the per-route meta tags/JSON-LD injected into a copy of it do.
  const indexPath = path.resolve(distPath, "index.html");
  const indexTemplate = fs.readFileSync(indexPath, "utf-8");
  const blogArticles = loadBlogArticles();

  // fall through to index.html if the file doesn't exist, injecting
  // per-route SEO/GEO meta tags and JSON-LD so bots that don't execute
  // JavaScript still see the correct title/description/canonical/OG for
  // the requested URL instead of always the homepage's (see seo-meta.ts).
  app.use("/{*path}", (req, res) => {
    const html = renderHtmlForRoute(indexTemplate, req.path, blogArticles);
    res.set("Content-Type", "text/html");
    res.send(html);
  });
}
