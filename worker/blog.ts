// Blog articles bundled at build time (wrangler 'Text' rule for .md files, see wrangler.jsonc).
// To add an article: drop the .md file in worker/blog-articles and add it to the list below.

import a0 from "./blog-articles/01-enneagramma-evolutivo-guida-completa.md";
import a1 from "./blog-articles/02-mediazione-enneagramma-risoluzione-conflitti.md";
import a2 from "./blog-articles/03-9-frutti-albero-vita-simbolismo.md";
import a3 from "./blog-articles/04-enneagramma-gurdjieff-naranjo-differenze.md";
import a4 from "./blog-articles/05-compatibilita-coppia-enneagramma.md";
import a5 from "./blog-articles/articolo-1-cose-enneagramma.md";
import a6 from "./blog-articles/articolo-2-9-enneatipi.md";
import a7 from "./blog-articles/articolo-3-compatibilita-coppia.md";
import a8 from "./blog-articles/articolo-4-crescita-personale.md";
import a9 from "./blog-articles/articolo-5-test-enneagramma.md";

export const blogFiles: Record<string, string> = {
  "01-enneagramma-evolutivo-guida-completa": a0,
  "02-mediazione-enneagramma-risoluzione-conflitti": a1,
  "03-9-frutti-albero-vita-simbolismo": a2,
  "04-enneagramma-gurdjieff-naranjo-differenze": a3,
  "05-compatibilita-coppia-enneagramma": a4,
  "articolo-1-cose-enneagramma": a5,
  "articolo-2-9-enneatipi": a6,
  "articolo-3-compatibilita-coppia": a7,
  "articolo-4-crescita-personale": a8,
  "articolo-5-test-enneagramma": a9,
};
