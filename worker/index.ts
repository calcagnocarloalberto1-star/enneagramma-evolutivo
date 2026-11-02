import { Hono } from "hono";
import { toApp, type Env } from "./compat";
import { registerRoutes } from "./routes";

const app = new Hono<{ Bindings: Env }>();

registerRoutes(toApp(app));

// Anything that is not an API/SEO route is served by the static assets
// (see "assets" in wrangler.jsonc), so unknown /api paths end up here:
app.all("/api/*", (c) => c.json({ error: "Endpoint non trovato" }, 404));

export default app;
