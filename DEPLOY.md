# Enneagramma Evolutivo su Cloudflare (Worker + D1)

Frontend (Vite/React) e API girano in un unico Worker Cloudflare; i risultati dei test sono salvati in D1 (SQLite). Il piano gratuito è sufficiente.

## Struttura
- `client/` frontend React (build in `dist/public`)
- `worker/` API (Hono): `routes.ts` contiene le stesse route del vecchio server Express
- `worker/data`, `worker/blog-articles` contenuti inclusi nel bundle in fase di build
- `migrations/` schema del database D1
- `wrangler.jsonc` configurazione Cloudflare

## Prima pubblicazione
1. `npm install`
2. `npx wrangler login`
3. `npx wrangler d1 create enneagramma-evolutivo-db` e copiare il `database_id` stampato in `wrangler.jsonc`
4. `npm run db:migrate:remote`
5. `npx wrangler secret put GEMINI_API_KEY` (incollare la chiave Gemini)
6. `npm run deploy`

## Dominio enneagrammaevolutivo.it
1. In Cloudflare aggiungere il dominio (Add a site, piano Free) e impostare presso il registrar i nameserver indicati.
2. Workers & Pages -> `enneagramma-evolutivo` -> Settings -> Domains & Routes -> Add -> Custom domain -> `enneagrammaevolutivo.it` (e `www`).
3. Rimuovere i vecchi record DNS che puntavano a Render.

## Sviluppo locale
- `npm run db:migrate:local` (una volta), poi `npm run dev` (http://localhost:8787)
- Per testare Gemini in locale creare `.dev.vars` con `GEMINI_API_KEY=...` (il file è ignorato da git)

## Note
- Modello Gemini: variabile `GEMINI_MODEL` in `wrangler.jsonc` (il vecchio `gemini-2.0-flash` è stato spento da Google il 1 giugno 2026).
- Nuovo articolo del blog: aggiungere il file `.md` in `worker/blog-articles` e registrarlo in `worker/blog.ts`.
- Se Gemini non risponde, profilo e minuta ricadono sulla versione statica, come prima.
