import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const testResults = sqliteTable("test_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  visitorId: text("visitor_id").notNull(),
  enneatipo: integer("enneatipo").notNull(),
  ala: integer("ala"),
  eta: integer("eta").notNull(),
  punteggiFrutti: text("punteggi_frutti").notNull(), // JSON string of scores
  risposte: text("risposte").notNull(), // JSON string of answers
  needsGenogram: integer("needs_genogram", { mode: "boolean" }).default(false),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertTestResultSchema = createInsertSchema(testResults).omit({
  id: true,
  createdAt: true,
});

export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type TestResult = typeof testResults.$inferSelect;
