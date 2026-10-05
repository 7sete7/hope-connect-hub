import db from "./src/db";
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";

const migrationsDir = resolve(import.meta.dir, "migrations");

console.log("🔄 Executando migrations...");

// Registra quais migrations já rodaram, para que ALTER TABLE etc. não sejam reaplicados
db.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
  name TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
)`);

const applied = new Set((db.query("SELECT name FROM schema_migrations").all() as { name: string }[]).map((r) => r.name));

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

for (const file of files) {
  if (applied.has(file)) continue;
  const sql = readFileSync(resolve(migrationsDir, file), "utf-8");
  console.log(`  → ${file}`);
  db.transaction(() => {
    db.exec(sql);
    db.query("INSERT INTO schema_migrations (name) VALUES (?)").run(file);
  })();
}

console.log("✅ Migrations concluídas!");
