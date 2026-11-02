CREATE TABLE IF NOT EXISTS test_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT NOT NULL,
  enneatipo INTEGER NOT NULL,
  ala INTEGER,
  eta INTEGER NOT NULL,
  punteggi_frutti TEXT NOT NULL,
  risposte TEXT NOT NULL,
  personal_notes TEXT,
  needs_genogram INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_test_results_created_at ON test_results (created_at);
