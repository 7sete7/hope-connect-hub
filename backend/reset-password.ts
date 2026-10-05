import db from "./src/db";

// Redefine a senha de um usuário admin (cria o usuário se não existir).
// Uso no servidor: sudo docker exec entreellas-backend-1 bun run reset-password.ts <email> <nova-senha>
const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error("Uso: bun run reset-password.ts <email> <nova-senha>");
  process.exit(1);
}
if (password.length < 8) {
  console.error("A senha precisa ter pelo menos 8 caracteres.");
  process.exit(1);
}

const hash = await Bun.password.hash(password, { algorithm: "bcrypt" });
const existing = db.query("SELECT id FROM users WHERE lower(email) = lower(?)").get(email) as { id: string } | null;
if (existing) {
  db.query("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, existing.id);
  console.log(`✅ Senha de ${email} atualizada.`);
} else {
  db.query("INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)").run(crypto.randomUUID(), email.trim(), hash);
  console.log(`✅ Usuário ${email} criado.`);
}
