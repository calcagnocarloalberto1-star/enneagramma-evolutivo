import { Link } from "wouter";
import { PerplexityAttribution } from "./PerplexityAttribution";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-serif font-bold text-sm">E</span>
              </div>
              <span className="font-serif font-bold text-foreground">Enneagramma</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Scopri il tuo enneatipo attraverso il test dei 9 Frutti dell'Albero della Vita.
            </p>
          </div>

          {/* Test & Strumenti */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Test & Strumenti</h4>
            <ul className="space-y-2">
              <li><Link href="/test" className="text-sm text-muted-foreground hover:text-primary transition-colors">Fai il Test</Link></li>
              <li><Link href="/compatibilita/coppia" className="text-sm text-muted-foreground hover:text-primary transition-colors">Compatibilità Coppia</Link></li>
              <li><Link href="/enneatipi" className="text-sm text-muted-foreground hover:text-primary transition-colors">I 9 Enneatipi</Link></li>
            </ul>
          </div>

          {/* Risorse */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Risorse</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Chi Siamo</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/glossario" className="text-sm text-muted-foreground hover:text-primary transition-colors">Glossario</Link></li>
            </ul>
          </div>

          {/* Legale */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Legale</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Termini d'Uso</Link></li>
              <li><Link href="/cookie-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Enneagramma Evolutivo. Tutti i diritti riservati.
          </p>
          <PerplexityAttribution />
        </div>
      </div>
    </footer>
  );
}
