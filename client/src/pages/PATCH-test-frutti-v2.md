# PATCH — TestResults.tsx (versione 2 · NON BLOCCANTE)

## Repository
`enneagramma-evolutivo` · file `client/src/pages/TestResults.tsx`

## Obiettivo

Trasformare il warning di validazione **da bloccante a informativo**.

**Comportamento attuale (problematico)**: se ci sono pareggi o max score basso, l'utente vede SOLO un avviso e perde tutto il profilo (enneatipo provvisorio, ali, sottotipi, percorso, profilo narrativo AI).

**Comportamento corretto (filosofia condivisa con SYSTEM_PROMPT olismo-integrato.it)**: l'utente vede comunque il profilo completo come "ipotesi provvisoria", con un banner amber in cima che lo invita a costruire il genogramma per confermare.

---

## ═══════════════════════════════════════════════
## FILE 1 (BACKEND): server/routes.ts
## ═══════════════════════════════════════════════

✅ **Già pronto in `/mnt/user-data/outputs/routes.ts`**

Lei deve solo cestinare il vecchio `server/routes.ts` su GitHub e caricare quello nuovo.

**Cosa cambia**: la funzione `validateResults` ora espone 3 campi extra:
- `tiedTypes`: array dei tipi pareggianti (es. `[8, 9]`)
- `maxScore`: il punteggio massimo numerico (es. `13`)
- `tiedWingTypes`: array delle ali pareggianti (es. `[7, 9]`)

Il frontend leggerà questi dati per messaggi precisi.

---

## ═══════════════════════════════════════════════
## FILE 2 (FRONTEND): client/src/pages/TestResults.tsx
## ═══════════════════════════════════════════════

Due modifiche puntuali. Le applichi nel GitHub web editor con copia-incolla.

### MODIFICA 1 — RIMUOVERE il blocco bloccante

**Cercare nel file** (è all'incirca verso il centro, dopo la definizione di `scoreChart`):

```tsx
  // Rule 1 or Rule 3: blocking validation — show warning instead of profile
  if (showBlockingWarning) {
    const warningMessage = tiedMaxScores
      ? "Non è stato possibile identificare con certezza il tuo enneatipo perché due o più tipi hanno ottenuto lo stesso punteggio massimo. Ti consigliamo di effettuare un genogramma personalizzato."
      : "Il punteggio massimo ottenuto è inferiore a 10/20, il che non consente un'identificazione affidabile. Ti consigliamo di effettuare un genogramma personalizzato.";

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Risultati del Test
          </h1>
        </div>

        {/* Warning Card */}
        <Card className="mb-8 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30" data-testid="validation-warning-card">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <AlertTriangle className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            <p className="text-amber-800 dark:text-amber-200 text-base leading-relaxed max-w-xl" data-testid="validation-warning-message">
              {warningMessage}
            </p>
            <Link href="/about">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white mt-2" data-testid="button-contact-cta">
                Contatta per un genogramma personalizzato
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Genogramma explanation */}
        <div className="mb-8 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <GenogrammaExplanation />
        </div>

        {/* Still show the score chart */}
        {scoreChart}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center pb-8">
          <Link href="/test">
            <Button variant="outline" data-testid="button-retake">Rifai il Test</Button>
          </Link>
        </div>
      </div>
    );
  }
```

**Sostituire l'intero blocco con un commento di una riga** (così l'eliminazione è tracciabile e ripristinabile):

```tsx
  // Note: Il warning bloccante è stato sostituito da un banner non-bloccante (vedi sotto, dopo l'header).
```

---

### MODIFICA 2 — AGGIUNGERE il banner non-bloccante

**Cercare nel file** (subito dopo aver rimosso il blocco precedente, all'inizio del rendering normale):

```tsx
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">{fruitEmoji[enneatipo]}</div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2" data-testid="text-result-type">
          Enneatipo {enneatipo}: {attrs?.nome}
        </h1>
        <p className="text-lg text-muted-foreground font-serif italic" data-testid="text-result-motto">
          "{attrs?.motto}"
        </p>
```

**Sostituire questo intero blocco con:**

```tsx
  // Costruzione del messaggio del banner non-bloccante (solo se ci sono problemi di validazione)
  const showCautionBanner = tiedMaxScores || maxScoreTooLow || tiedWingScores;
  const tiedTypes: number[] = validationIssues?.tiedTypes ?? [];
  const tiedWingTypes: number[] = validationIssues?.tiedWingTypes ?? [];
  const maxScoreFromBackend: number = validationIssues?.maxScore ?? maxScore;

  let cautionTitle = "";
  let cautionMessage = "";

  if (tiedMaxScores && tiedTypes.length > 1) {
    const tiedNames = tiedTypes.map(t => `Tipo ${t} (${typeNames[t]})`).join(", ");
    cautionTitle = "Risultato provvisorio: pareggio tra più enneatipi";
    cautionMessage = `Il test ha rilevato che ${tiedNames} hanno ottenuto lo stesso punteggio massimo (${maxScoreFromBackend}/20). Le mostriamo qui sotto il profilo del Tipo ${enneatipo} come ipotesi provvisoria, ma per identificare con certezza il Suo enneatipo dominante Le consigliamo di costruire il Suo genogramma.`;
  } else if (maxScoreTooLow) {
    cautionTitle = "Risultato provvisorio: punteggio massimo basso";
    cautionMessage = `Il punteggio massimo ottenuto è ${maxScoreFromBackend}/20, sotto la soglia di affidabilità di 10/20. Le mostriamo comunque il profilo del Tipo ${enneatipo} come ipotesi provvisoria, ma per un'identificazione più affidabile Le consigliamo di costruire il Suo genogramma.`;
  } else if (tiedWingScores && tiedWingTypes.length === 2) {
    const [lw, rw] = tiedWingTypes;
    cautionTitle = "Ala incerta: due ali con lo stesso punteggio";
    cautionMessage = `L'enneatipo ${enneatipo} è ben identificato, ma le due ali (Tipo ${lw} e Tipo ${rw}) hanno lo stesso punteggio. Può scegliere l'ala in cui si riconosce di più dal selettore qui sotto, oppure costruire il Suo genogramma per chiarire questo aspetto.`;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Banner non-bloccante in cima (visibile solo se ci sono problemi di validazione) */}
      {showCautionBanner && (
        <Card className="mb-6 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30" data-testid="caution-banner">
          <CardContent className="p-5">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 text-sm mb-1" data-testid="caution-banner-title">
                  {cautionTitle}
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed mb-3" data-testid="caution-banner-message">
                  {cautionMessage}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/about">
                    <Button size="sm" variant="outline" className="border-amber-400 text-amber-900 hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-amber-900/40 text-xs">
                      → Costruisci il genogramma
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">{fruitEmoji[enneatipo]}</div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2" data-testid="text-result-type">
          Enneatipo {enneatipo}: {attrs?.nome}
        </h1>
        <p className="text-lg text-muted-foreground font-serif italic" data-testid="text-result-motto">
          "{attrs?.motto}"
        </p>
```

---

## Riepilogo della logica

| Scenario | Comportamento attuale (bloccante) | Comportamento dopo PATCH (informativo) |
|---|---|---|
| Profilo univoco e chiaro | Mostra tutto | **Identico** — nessun banner, profilo completo |
| Due tipi pareggiano (es. T8=T9=13) | Solo avviso, niente profilo | Banner ambra in cima + profilo del Tipo 8 (primo trovato) come ipotesi provvisoria |
| Max score basso (es. T8=8) | Solo avviso, niente profilo | Banner ambra in cima + profilo del Tipo 8 come ipotesi provvisoria |
| Ali pareggianti (es. T8 dominante, T7=T9) | (Già non-bloccante: banner nel selettore ali) | **Identico** + banner generale in cima per coerenza |

---

## Procedura di deploy

1. Vada su `https://github.com/calcagnocarloalberto1-star/enneagramma-evolutivo`
2. **Apra `server/routes.ts`** → cestino → carica nuovo `routes.ts` (da `/mnt/user-data/outputs/`)
3. **Apra `client/src/pages/TestResults.tsx`** → modalità edit (icona matita)
4. Applichi MODIFICA 1: trovi il blocco `if (showBlockingWarning) { ... }` e lo sostituisca col commento
5. Applichi MODIFICA 2: trovi `return ( <div className="max-w-4xl... { /* Header */ }` e lo sostituisca col blocco con banner

Commit message suggerito: *"Test 9 Frutti: warning validazione da bloccante a informativo (mostra profilo provvisorio + invito al genogramma)"*

Render farà il rebuild automaticamente in 3-5 minuti. Dopo il deploy, il test si comporterà come da regola condivisa con olismo-integrato.it.

---

## Nota di stile

Il banner usa lo stesso pattern grafico già presente nel selettore delle ali (`bg-amber-50` con icona `AlertTriangle`), quindi è già coerente con il design system della pagina. Non servono nuove dipendenze né nuovi import — `AlertTriangle` è già importato da `lucide-react`.
