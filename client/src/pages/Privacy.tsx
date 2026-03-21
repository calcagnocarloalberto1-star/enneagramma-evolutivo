import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-serif font-bold mb-6" data-testid="text-privacy-title">Informativa sulla Privacy</h1>
      <div className="prose max-w-none text-muted-foreground space-y-4">
        <p><strong>Ultimo aggiornamento:</strong> Marzo 2026</p>
        <p>
          Informativa resa ai sensi degli artt. 13 e 14 del <strong>Regolamento UE 2016/679</strong> (GDPR)
          relativa al trattamento dei dati personali degli utenti che consultano il sito web
          Enneagramma Evolutivo.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">1. Titolare del Trattamento</h2>
        <p>
          Il Titolare del trattamento dei dati personali è:<br />
          <strong className="text-foreground">Carlo Alberto Calcagno</strong><br />
          Sede: Genova, Italia<br />
          Email: <a href="mailto:calcagnocarloalberto1@gmail.com" className="text-primary hover:underline">calcagnocarloalberto1@gmail.com</a>
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">2. Tipologie di Dati Raccolti</h2>
        <p>L'applicazione raccoglie le seguenti categorie di dati:</p>
        <ul>
          <li><strong>Dati del test:</strong> risposte alle 180 domande vero/falso, punteggi calcolati per ciascun frutto, enneatipo e ala determinati, età inserita dall'utente, eventuali note personali condivise volontariamente prima del test.</li>
          <li><strong>Identificatore anonimo:</strong> un ID visitatore generato casualmente dal browser (non collegato all'identità personale dell'utente e non riconducibile alla persona).</li>
          <li><strong>Dati di navigazione:</strong> dati tecnici acquisiti automaticamente dai sistemi informatici (indirizzo IP, tipo di browser, sistema operativo, pagine visitate, orari di accesso). Questi dati sono utilizzati esclusivamente per il funzionamento tecnico del servizio.</li>
        </ul>
        <p>
          <strong>Non vengono raccolti dati identificativi diretti</strong> (nome, cognome, email) a meno che l'utente non li fornisca volontariamente
          attraverso le note personali pre-test.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">3. Finalità e Base Giuridica del Trattamento</h2>
        <p>I dati vengono trattati per le seguenti finalità:</p>
        <ul>
          <li><strong>Erogazione del servizio</strong> (base giuridica: esecuzione del servizio richiesto, art. 6.1.b GDPR): calcolo e visualizzazione dei risultati del test dell'Enneagramma, generazione del profilo narrativo personalizzato, salvataggio dei risultati per consentire la consultazione successiva.</li>
          <li><strong>Miglioramento del servizio</strong> (base giuridica: legittimo interesse del Titolare, art. 6.1.f GDPR): analisi statistica aggregata e anonima sull'utilizzo del test per migliorare la qualità del servizio.</li>
        </ul>

        <h2 className="text-xl font-serif font-bold text-foreground">4. Modalità di Trattamento e Conservazione</h2>
        <p>
          I dati sono trattati con strumenti automatizzati e conservati su server forniti da
          <strong> Render.com</strong> (Render Services, Inc.), con sede negli Stati Uniti. Il trasferimento
          dei dati verso gli USA avviene nel rispetto delle garanzie previste dal GDPR (Capo V),
          incluse le clausole contrattuali standard della Commissione Europea.
        </p>
        <p>
          I risultati del test vengono conservati per un periodo massimo di <strong>12 mesi</strong> dalla
          data di compilazione, dopodiché vengono cancellati automaticamente.
        </p>
        <p>
          Sono adottate misure di sicurezza tecniche e organizzative adeguate per proteggere i dati
          da accessi non autorizzati, perdita o distruzione.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">5. Comunicazione e Diffusione dei Dati</h2>
        <p>
          I dati personali <strong>non vengono venduti, ceduti o comunicati a terzi</strong> per finalità
          di marketing o profilazione. I dati possono essere comunicati a:
        </p>
        <ul>
          <li>Fornitori di servizi tecnici (hosting, manutenzione) strettamente necessari al funzionamento del sito, in qualità di responsabili del trattamento.</li>
          <li>Google LLC, limitatamente al servizio Gemini AI utilizzato per la generazione del profilo narrativo (i dati inviati sono anonimizzati: punteggi, enneatipo, età, senza identificativi personali).</li>
        </ul>

        <h2 className="text-xl font-serif font-bold text-foreground">6. Diritti dell'Interessato</h2>
        <p>
          Ai sensi degli artt. 15-22 del Regolamento UE 2016/679, l'utente ha diritto di:
        </p>
        <ul>
          <li><strong>Accesso</strong> (art. 15): ottenere conferma dell'esistenza di un trattamento e accedere ai propri dati.</li>
          <li><strong>Rettifica</strong> (art. 16): ottenere la correzione di dati inesatti.</li>
          <li><strong>Cancellazione</strong> (art. 17): ottenere la cancellazione dei propri dati ("diritto all'oblio").</li>
          <li><strong>Limitazione</strong> (art. 18): ottenere la limitazione del trattamento.</li>
          <li><strong>Portabilità</strong> (art. 20): ricevere i propri dati in formato strutturato e leggibile da dispositivo automatico.</li>
          <li><strong>Opposizione</strong> (art. 21): opporsi al trattamento dei propri dati.</li>
          <li><strong>Reclamo</strong>: presentare reclamo all'Autorità Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).</li>
        </ul>
        <p>
          Per esercitare i propri diritti, l'utente può inviare una richiesta a:
          <a href="mailto:calcagnocarloalberto1@gmail.com" className="text-primary hover:underline"> calcagnocarloalberto1@gmail.com</a>
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">7. Cookie</h2>
        <p>
          L'applicazione utilizza esclusivamente cookie tecnici essenziali per il funzionamento del sito.
          Non vengono utilizzati cookie di profilazione o di tracciamento.
          Per maggiori dettagli, consulta la nostra <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">8. Modifiche alla Privacy Policy</h2>
        <p>
          Il Titolare si riserva il diritto di apportare modifiche alla presente informativa in qualsiasi momento.
          Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.
          Si consiglia di consultare periodicamente questa pagina.
        </p>
      </div>
    </div>
  );
}
