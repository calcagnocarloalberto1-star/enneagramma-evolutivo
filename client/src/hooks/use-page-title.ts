import { useEffect } from "react";

const SITE_URL = "https://enneagrammaevolutivo.it";

function setMeta(selector: string, attr: string, content: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, content);
}

/**
 * Updates document.title only. Kept for backward compatibility;
 * prefer useSEO() for any indexable page so description/canonical/og:url
 * are also kept in sync with the route.
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

interface SEOOptions {
  /** Full <title> content. */
  title: string;
  /** Meta description, ideally ~140-160 characters. */
  description: string;
  /** Route path starting with "/", e.g. "/enneatipi/1". Defaults to "/". */
  path?: string;
  /** Optional override for og:title (defaults to title). */
  ogTitle?: string;
}

/**
 * Keeps <title>, <meta name="description">, <link rel="canonical">,
 * <meta property="og:url">, <meta property="og:title"> and
 * <meta property="og:description"> in sync with the current route.
 *
 * Without this, every page silently re-declared the home page's
 * description/canonical/og:url, which told search engines every
 * subpage was a duplicate of the home page and broke social-share
 * previews for every internal page.
 */
export function useSEO({ title, description, path = "/", ogTitle }: SEOOptions) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", `${SITE_URL}${path}`);
    setMeta('meta[property="og:url"]', "content", `${SITE_URL}${path}`);
    setMeta('meta[property="og:title"]', "content", ogTitle || title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", ogTitle || title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="robots"]', "content", "index, follow");
  }, [title, description, path, ogTitle]);
}

/**
 * Marks the current page as noindex (e.g. a visitor's personal test
 * results, or an internal admin dashboard) and sets its title.
 * The base index.html defaults to "index, follow" for every route,
 * so pages that should stay out of search results must opt out
 * explicitly.
 */
export function useNoIndex(title: string) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="robots"]', "content", "noindex, nofollow");
    return () => setMeta('meta[name="robots"]', "content", "index, follow");
  }, [title]);
}
