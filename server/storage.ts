import { type TestResult, type InsertTestResult, testResults } from "@shared/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq } from "drizzle-orm";

const sqlite = new Database("data.db");
sqlite.pragma("journal_mode = WAL");

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
