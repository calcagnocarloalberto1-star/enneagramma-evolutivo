import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { testResults, type TestResult } from "@shared/schema";

type NewTestResult = typeof testResults.$inferInsert;

// Storage backed by Cloudflare D1 (SQLite). Tables are created by migrations/0001_init.sql.
export function createStorage(d1: D1Database) {
  const db = drizzle(d1);

  return {
    async createTestResult(result: NewTestResult): Promise<TestResult> {
      const rows = await db.insert(testResults).values(result).returning();
      return rows[0];
    },

    async getTestResult(id: number): Promise<TestResult | undefined> {
      const rows = await db.select().from(testResults).where(eq(testResults.id, id)).limit(1);
      return rows[0];
    },

    async getAllTestResults(): Promise<TestResult[]> {
      return db.select().from(testResults);
    },
  };
}

export type Storage = ReturnType<typeof createStorage>;
