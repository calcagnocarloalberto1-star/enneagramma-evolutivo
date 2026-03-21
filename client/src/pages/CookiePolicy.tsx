import { Link } from "wouter";

export default function CookiePolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-serif font-bold mb-6" data-testid="text-cookie-title">Cookie Policy</h1>
      <div className="prose max-w-none text-muted-foreground space-y-4">
        <p><strong>Ultimo aggiornamento:</strong> Marzo 2026</p>
        <p>
          La presente Cookie Policy è resa ai sensi dell'art. 122 del D.Lgs. 196/2003 ("Codice Privacy"),
          come modificato dal D.Lgs. 101/2018, e delle Linee Guida del Garante per la Protezione
          dei Dati Personali sui cookie e altri strumenti di tracciamento (10 giugno 2021).
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">1. Cosa Sono i Cookie</h2>
        <p>
          I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al suo
          terminale (computer, tablet, smartphone), dove vengono memorizzati per essere poi
          ritrasmessi agli stessi siti alla visita successiva. I cookie permettono al sito di
          funzionare correttamente e di migliorare l'esperienza di navigazione.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">2. Tipologie di Cookie Utilizzati</h2>
        <p>Il sito Enneagramma Evolutivo utilizza <strong>esclusivamente cookie tecnici essenziali</strong>:</p>
        <ul>
          <li><strong>Cookie di sessione:</strong> necessari per il corretto funzionamento del sito e la gestione della navigazione. Vengono eliminati automaticamente alla chiusura del browser.</li>
          <li><strong>Cookie funzionali:</strong> utilizzati per memorizzare le preferenze dell'utente (es. avanzamento nel test). Hanno durata limitata alla sessione di navigazione.</li>
        </ul>

        <p className="font-medium text-foreground">Il sito NON utilizza:</p>
        <ul>
          <li>Cookie di profilazione</li>
          <li>Cookie di terze parti per finalità pubblicitarie</li>
          <li>Cookie di tracciamento comportamentale</li>
          <li>Cookie analitici di terze parti (es. Google Analytics)</li>
          <li>Pixel di tracciamento o tecnologie similari</li>
        </ul>

        <h2 className="text-xl font-serif font-bold text-foreground">3. Consenso</h2>
        <p>
          Ai sensi della normativa vigente e delle Linee Guida del Garante, i <strong>cookie tecnici
          essenziali non richiedono il consenso preventivo</strong> dell'utente, in quanto strettamente
          necessari per l'erogazione del servizio richiesto. Per questo motivo il sito non presenta
          un banner di consenso per i cookie.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">4. Gestione dei Cookie dal Browser</h2>
        <p>
          L'utente può gestire le preferenze relative ai cookie direttamente attraverso le impostazioni
          del proprio browser. Di seguito i link alle istruzioni dei principali browser:
        </p>
        <ul>
          <li><strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
          <li><strong>Firefox:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
          <li><strong>Safari:</strong> Preferenze → Privacy → Cookie</li>
          <li><strong>Edge:</strong> Impostazioni → Cookie e autorizzazioni sito</li>
        </ul>
        <p>
          La disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento
          del sito e impedire l'utilizzo del test.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">5. Dati di Navigazione</h2>
        <p>
          I sistemi informatici e le procedure software preposte al funzionamento del sito acquisiscono,
          nel corso del loro normale esercizio, alcuni dati personali la cui trasmissione è implicita
          nell'uso dei protocolli di comunicazione Internet (es. indirizzi IP, nomi a dominio dei
          computer utilizzati, orari delle richieste). Tali dati sono utilizzati al solo fine di
          ricavare informazioni statistiche anonime sull'uso del sito e per controllarne il corretto
          funzionamento.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">6. Diritti dell'Utente</h2>
        <p>
          Per informazioni complete sui diritti dell'utente relativi al trattamento dei dati personali,
          si rimanda alla nostra <Link href="/privacy" className="text-primary hover:underline">Informativa sulla Privacy</Link>.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">7. Titolare del Trattamento</h2>
        <p>
          <strong className="text-foreground">Carlo Alberto Calcagno</strong><br />
          Sede: Genova, Italia<br />
          Email: <a href="mailto:calcagnocarloalberto1@gmail.com" className="text-primary hover:underline">calcagnocarloalberto1@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
