-- Cooperativa Database Schema
-- Run via: bun run migrate.ts

CREATE TABLE IF NOT EXISTS slides (
  id TEXT PRIMARY KEY,
  image TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  "order" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft'))
);

CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  whatsapp TEXT,
  website TEXT
);

CREATE TABLE IF NOT EXISTS associates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  whatsapp TEXT,
  website TEXT
);

CREATE TABLE IF NOT EXISTS about (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  intro TEXT NOT NULL DEFAULT '',
  intro_image TEXT NOT NULL DEFAULT '',
  mission TEXT NOT NULL DEFAULT '',
  mission_image TEXT NOT NULL DEFAULT '',
  vision TEXT NOT NULL DEFAULT '',
  vision_image TEXT NOT NULL DEFAULT '',
  "values" TEXT NOT NULL DEFAULT '',
  values_image TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS contact_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  whatsapp_number TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS site_colors (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  "primary" TEXT NOT NULL DEFAULT '263 83% 58%',
  secondary TEXT NOT NULL DEFAULT '330 81% 60%',
  accent TEXT NOT NULL DEFAULT '160 84% 39%'
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Ensure singleton rows exist
INSERT OR IGNORE INTO about (id) VALUES (1);
INSERT OR IGNORE INTO contact_settings (id) VALUES (1);
INSERT OR IGNORE INTO site_colors (id) VALUES (1);
