import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const entries = pgTable("entries", {
  id: serial().primaryKey().notNull(),
  wasRight: boolean().notNull(),
  filename: varchar().notNull(),
});
