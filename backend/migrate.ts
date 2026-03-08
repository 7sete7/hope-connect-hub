import db from "./src/db";
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";

const migrationsDir = resolve(import.meta.dir, "migrations");

console.log("🔄 Executando migrations...");

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

for (const file of files) {
  const sql = readFileSync(resolve(migrationsDir, file), "utf-8");
  console.log(`  → ${file}`);
  db.exec(sql);
}

console.log("✅ Migrations concluídas!");
