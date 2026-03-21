export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-serif font-bold mb-6" data-testid="text-privacy-title">Privacy Policy</h1>
      <div className="prose max-w-none text-muted-foreground space-y-4">
        <p><strong>Ultimo aggiornamento:</strong> Marzo 2026</p>
        
        <h2>1. Titolare del Trattamento</h2>
        <p>Il titolare del trattamento dei dati personali è Enneagramma Evolutivo, con sede in Italia.</p>
        
        <h2>2. Tipologie di Dati Raccolti</h2>
        <p>L'applicazione raccoglie i seguenti dati:</p>
        <ul>
          <li><strong>Dati del test:</strong> risposte alle domande del test, punteggi calcolati, enneatipo determinato, età inserita</li>
          <li><strong>Identificatore anonimo:</strong> un ID visitatore generato casualmente (non collegato all'identità personale)</li>
          <li><strong>Dati di navigazione:</strong> dati tecnici standard (tipo di browser, sistema operativo, pagine visitate)</li>
        </ul>
        
        <h2>3. Finalità del Trattamento</h2>
        <p>I dati vengono trattati per le seguenti finalità:</p>
        <ul>
          <li>Calcolo e visualizzazione dei risultati del test dell'Enneagramma</li>
          <li>Salvataggio dei risultati per consentire la consultazione successiva</li>
          <li>Miglioramento del servizio e analisi statistica aggregata</li>
        </ul>
        
        <h2>4. Base Giuridica</h2>
        <p>Il trattamento dei dati si basa sul consenso dell'utente e sull'interesse legittimo del titolare.</p>
        
        <h2>5. Conservazione dei Dati</h2>
        <p>I risultati del test vengono conservati per un periodo massimo di 12 mesi dalla data di compilazione.</p>
        
        <h2>6. Diritti dell'Interessato</h2>
        <p>Ai sensi del Regolamento UE 2016/679 (GDPR), l'utente ha diritto di:</p>
        <ul>
          <li>Accedere ai propri dati personali</li>
          <li>Richiedere la rettifica o la cancellazione dei dati</li>
          <li>Opporsi al trattamento</li>
          <li>Richiedere la portabilità dei dati</li>
          <li>Presentare reclamo all'Autorità Garante per la Protezione dei Dati Personali</li>
        </ul>
        
        <h2>7. Cookie</h2>
        <p>L'applicazione non utilizza cookie di profilazione. Per maggiori dettagli, consulta la nostra <a href="#/cookie-policy">Cookie Policy</a>.</p>
        
        <h2>8. Modifiche alla Privacy Policy</h2>
        <p>Il titolare si riserva il diritto di modificare questa policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina.</p>
      </div>
    </div>
  );
}
