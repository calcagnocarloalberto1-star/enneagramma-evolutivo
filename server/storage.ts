import { type TestResult, type InsertTestResult, testResults } from "@shared/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq } from "drizzle-orm";

const sqlite = new Database("data.db");
sqlite.pragma("journal_mode = WAL");

// Auto-create tables if they don't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT NOT NULL,
    enneatipo INTEGER NOT NULL,
    ala INTEGER,
    eta INTEGER NOT NULL,
    punteggi_frutti TEXT NOT NULL,
    risposte TEXT NOT NULL,
    needs_genogram INTEGER DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

export const db = drizzle(sqlite);

export interface IStorage {
  createTestResult(result: InsertTestResult): TestResult;
  getTestResult(id: number): TestResult | undefined;
  getTestResultByVisitorId(visitorId: string): TestResult | undefined;
}

export class DatabaseStorage implements IStorage {
  createTestResult(result: InsertTestResult): TestResult {
    return db.insert(testResults).values(result).returning().get();
  }

  getTestResult(id: number): TestResult | undefined {
    return db.select().from(testResults).where(eq(testResults.id, id)).get();
  }

  getTestResultByVisitorId(visitorId: string): TestResult | undefined {
    return db.select().from(testResults).where(eq(testResults.visitorId, visitorId)).get();
  }
}

export const storage = new DatabaseStorage();
