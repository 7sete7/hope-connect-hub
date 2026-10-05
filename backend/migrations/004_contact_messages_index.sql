-- Listagem de mensagens de contato no admin (mais recentes primeiro)

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages (created_at DESC);
