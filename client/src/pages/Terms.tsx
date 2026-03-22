import { useEffect } from "react";
import { Link } from "wouter";

export default function Terms() {
  useEffect(() => { document.title = "Termini d'Uso | Enneagramma Evolutivo"; }, []);
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-serif font-bold mb-6" data-testid="text-terms-title">Termini e Condizioni d'Uso</h1>
      <div className="prose max-w-none text-muted-foreground space-y-4">
        <p><strong>Ultimo aggiornamento:</strong> Marzo 2026</p>

        <h2 className="text-xl font-serif font-bold text-foreground">1. Accettazione dei Termini</h2>
        <p>
          L'accesso e l'utilizzo del sito web Enneagramma Evolutivo e di tutti i servizi in esso
          contenuti (di seguito "il Servizio") comportano l'accettazione integrale e senza riserve
          dei presenti Termini e Condizioni d'Uso. Se l'utente non accetta i presenti termini,
          è pregato di non utilizzare il Servizio.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">2. Descrizione del Servizio</h2>
        <p>
          Enneagramma Evolutivo offre un test di personalità basato sul sistema dell'Enneagramma
          (denominato "Test dei 9 Frutti"), strumenti di compatibilità tra enneatipi (coppia, famiglia,
          lavoro), un profilo narrativo personalizzato generato tramite intelligenza artificiale,
          percorsi evolutivi basati sull'età e contenuti educativi sulla crescita personale.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">3. Natura del Servizio — Disclaimer Importante</h2>
        <p>
          <strong className="text-foreground">Il Test dei 9 Frutti e tutti i contenuti del sito hanno carattere esclusivamente
          informativo, educativo e di autoconsapevolezza.</strong> In particolare:
        </p>
        <ul>
          <li>I risultati del test <strong>non costituiscono diagnosi psicologica, psichiatrica o medica</strong> di alcun tipo.</li>
          <li>Il test <strong>non è uno strumento clinico validato</strong> e non sostituisce in alcun modo il parere di professionisti qualificati (psicologi, psicoterapeuti, psichiatri, medici).</li>
          <li>I risultati sono da considerarsi <strong>indicativi e non definitivi</strong>: rappresentano una riflessione sulla personalità, non una classificazione rigida.</li>
          <li>Il profilo narrativo generato dall'intelligenza artificiale è un <strong>testo creativo a scopo di introspezione</strong>, non una valutazione professionale.</li>
          <li>Per qualsiasi problematica di natura psicologica, emotiva o relazionale, si raccomanda di <strong>consultare un professionista qualificato</strong>.</li>
        </ul>

        <h2 className="text-xl font-serif font-bold text-foreground">4. Proprietà Intellettuale</h2>
        <p>
          Tutti i contenuti presenti sul sito — inclusi ma non limitati a testi, immagini, grafica,
          struttura del test, algoritmi di calcolo, design, software e codice sorgente — sono protetti
          dal diritto d'autore (L. 633/1941) e dalla legislazione italiana, europea e internazionale
          sulla proprietà intellettuale.
        </p>
        <p>
          Il sistema dell'"Enneagramma Evolutivo" è un'opera intellettuale originale di
          <strong className="text-foreground"> Carlo Alberto Calcagno</strong>. È vietata la riproduzione, la distribuzione,
          la modifica o qualsiasi forma di utilizzo commerciale dei contenuti senza autorizzazione
          scritta del Titolare.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">5. Uso Consentito</h2>
        <p>L'utente si impegna a:</p>
        <ul>
          <li>Utilizzare il Servizio esclusivamente per uso personale e non commerciale.</li>
          <li>Non tentare di accedere in modo non autorizzato ai sistemi informatici del sito.</li>
          <li>Non utilizzare i risultati del test per fini discriminatori, lesivi della dignità altrui o in qualsiasi modo contrario alla legge.</li>
          <li>Non riprodurre, modificare o ridistribuire i contenuti del sito senza autorizzazione.</li>
          <li>Rispettare la privacy degli altri utenti.</li>
        </ul>

        <h2 className="text-xl font-serif font-bold text-foreground">6. Limitazione di Responsabilità</h2>
        <p>
          Il Titolare non è responsabile per eventuali danni diretti o indiretti derivanti dall'utilizzo
          o dall'impossibilità di utilizzo del Servizio, inclusi danni derivanti dall'affidamento
          sui risultati del test o sui contenuti del sito.
        </p>
        <p>
          Il Servizio è fornito "così com'è" (<em>as is</em>) senza garanzie di alcun tipo,
          esplicite o implicite. Il Titolare si riserva il diritto di modificare, sospendere o
          interrompere il Servizio in qualsiasi momento senza preavviso.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">7. Trattamento dei Dati Personali</h2>
        <p>
          Il trattamento dei dati personali è disciplinato dalla nostra{" "}
          <Link href="/privacy" className="text-primary hover:underline">Informativa sulla Privacy</Link>,
          che costituisce parte integrante dei presenti Termini.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">8. Modifiche ai Termini</h2>
        <p>
          Il Titolare si riserva il diritto di modificare i presenti Termini in qualsiasi momento.
          Le modifiche saranno efficaci dal momento della loro pubblicazione sul sito. L'uso
          continuato del Servizio dopo la pubblicazione delle modifiche costituisce accettazione
          delle stesse.
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">9. Legge Applicabile e Foro Competente</h2>
        <p>
          I presenti Termini e Condizioni d'Uso sono regolati dalla legge italiana. Per qualsiasi
          controversia derivante dall'interpretazione, esecuzione o risoluzione dei presenti Termini,
          sarà competente in via esclusiva il Foro di Genova, salvo il foro inderogabile del
          consumatore ai sensi del D.Lgs. 206/2005 (Codice del Consumo).
        </p>

        <h2 className="text-xl font-serif font-bold text-foreground">10. Contatti</h2>
        <p>
          Per qualsiasi domanda relativa ai presenti Termini, è possibile contattare:<br />
          <strong className="text-foreground">Carlo Alberto Calcagno</strong><br />
          Email: <a href="mailto:calcagnocarloalberto1@gmail.com" className="text-primary hover:underline">calcagnocarloalberto1@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
