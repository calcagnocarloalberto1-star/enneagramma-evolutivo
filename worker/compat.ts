import type { Context, Hono } from "hono";
import { createStorage, type Storage } from "./storage";

// Bindings configured in wrangler.jsonc (DB) and as secret/variables (GEMINI_*).
export interface Env {
  DB: D1Database;
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
}

export interface Req {
  body: any;
  params: Record<string, string>;
  env: Env;
  storage: Storage;
}

export interface Res {
  status(code: number): Res;
  set(name: string, value: string): Res;
  json(body: unknown): Res;
  send(body: string): Res;
}

type Handler = (req: Req, res: Res) => unknown | Promise<unknown>;

export interface App {
  get(path: string, handler: Handler): void;
  post(path: string, handler: Handler): void;
}

// Tiny adapter that lets the existing (req, res) route handlers run on Hono.
function adapt(handler: Handler) {
  return async (c: Context<{ Bindings: Env }>) => {
    let body: any = undefined;
    if (c.req.method === "POST") {
      body = await c.req.json().catch(() => ({}));
    }

    let status = 200;
    const headers = new Headers();
    let response: Response | undefined;

    const res: Res = {
      status(code) {
        status = code;
        return res;
      },
      set(name, value) {
        headers.set(name, value);
        return res;
      },
      json(payload) {
        headers.set("Content-Type", "application/json; charset=utf-8");
        response = new Response(JSON.stringify(payload), { status, headers });
        return res;
      },
      send(payload) {
        response = new Response(payload, { status, headers });
        return res;
      },
    };

    const req: Req = {
      body,
      params: c.req.param() as Record<string, string>,
      env: c.env,
      storage: createStorage(c.env.DB),
    };

    try {
      await handler(req, res);
    } catch (err: any) {
      console.error("Unhandled route error:", err);
      return c.json({ error: err?.message || "Internal Server Error" }, 500);
    }
    return response ?? c.json({ error: "Nessuna risposta" }, 500);
  };
}

export function toApp(hono: Hono<{ Bindings: Env }>): App {
  return {
    get: (path, handler) => {
      hono.get(path, adapt(handler));
    },
    post: (path, handler) => {
      hono.post(path, adapt(handler));
    },
  };
}
