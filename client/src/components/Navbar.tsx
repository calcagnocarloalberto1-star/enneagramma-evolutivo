import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/test", label: "Fai il Test" },
  { href: "/enneatipi", label: "I 9 Enneatipi" },
  { href: "/percorsi", label: "Percorsi di Vita" },
  { href: "/compatibilita/coppia", label: "Coppia" },
  { href: "/compatibilita/famiglia", label: "Famiglia" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Chi Siamo" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Enneagramma Logo">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" fill="none" />
                {/* Enneagram star inner lines */}
                <path d="M12 2 L15.5 9 L22 12 L15.5 15 L12 22 L8.5 15 L2 12 L8.5 9 Z" stroke="white" strokeWidth="0.8" fill="none" />
                <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="serif">E</text>
              </svg>
            </div>
            <span className="font-serif text-lg font-bold text-foreground hidden sm:block">
              Enneagramma Evolutivo
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-testid={`nav-link-${link.href.replace(/\//g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link href="/test" className="hidden sm:block">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-start-test-nav">
                Inizia il Test
              </Button>
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border/50 mt-2 pt-2" data-testid="nav-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileOpen(false)}
                data-testid={`nav-mobile-link-${link.href.replace(/\//g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/test" onClick={() => setMobileOpen(false)}>
              <Button className="w-full mt-2 bg-primary hover:bg-primary/90" data-testid="button-start-test-mobile">
                Inizia il Test
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
