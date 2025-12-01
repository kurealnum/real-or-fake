"use server";
import { db } from "@app/db";
import { entries } from "@app/db/schema";

export async function saveResponse(wasRight: boolean, filename: string) {
  "use server";
  const entry: typeof entries.$inferInsert = {
    wasRight: wasRight,
    filename: filename,
  };
  await db.insert(entries).values(entry);
}
