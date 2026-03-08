import { Database } from "bun:sqlite";
import { resolve } from "path";

const DB_PATH = process.env.DB_PATH || resolve(import.meta.dir, "../data/cooperativa.sqlite");

// Ensure data directory exists
const dir = DB_PATH.substring(0, DB_PATH.lastIndexOf("/"));
await Bun.write(Bun.file(dir + "/.gitkeep"), "");

const db = new Database(DB_PATH, { create: true });

// Performance optimizations
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA busy_timeout = 5000;");
db.exec("PRAGMA synchronous = NORMAL;");
db.exec("PRAGMA foreign_keys = ON;");

export default db;
