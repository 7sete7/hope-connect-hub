-- Configurações gerais do site (título, frase do rodapé e texto de apresentação)

CREATE TABLE IF NOT EXISTS general_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  site_title TEXT NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  intro_title TEXT NOT NULL DEFAULT '',
  intro_text TEXT NOT NULL DEFAULT ''
);

INSERT OR IGNORE INTO general_settings (id) VALUES (1);
