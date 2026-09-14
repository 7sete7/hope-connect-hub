import db from "./src/db";

console.log("🌱 Inserindo dados iniciais...");

// Create admin user (password: admin123)
const adminPasswordHash = await Bun.password.hash("admin123", { algorithm: "bcrypt" });
db.query("INSERT OR IGNORE INTO users (id, email, password_hash) VALUES (?, ?, ?)").run(
  "admin-1", "admin@cooperativa.com", adminPasswordHash
);

// Slides
const slides = [
  { id: "1", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1600&h=600&fit=crop", title: "Juntos Contra o Câncer", subtitle: "Unindo empresas para transformar vidas e construir esperança", order: 1 },
  { id: "2", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&h=600&fit=crop", title: "Solidariedade em Ação", subtitle: "Cada parceria faz a diferença na luta contra o câncer", order: 2 },
  { id: "3", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&h=600&fit=crop", title: "Esperança que Transforma", subtitle: "Apoiando pacientes e famílias em sua jornada", order: 3 },
];
const insertSlide = db.prepare('INSERT OR IGNORE INTO slides (id, image, title, subtitle, "order") VALUES (?, ?, ?, ?, ?)');
for (const s of slides) insertSlide.run(s.id, s.image, s.title, s.subtitle, s.order);

// Events
const events = [
  { id: "1", title: "Caminhada pela Vida 2026", content: "Participe da nossa caminhada anual em prol da conscientização sobre o câncer. Um evento que reúne centenas de pessoas em nome da esperança e solidariedade.", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop", date: "2026-04-15", status: "published" },
  { id: "2", title: "Palestra: Prevenção e Diagnóstico Precoce", content: "Evento gratuito com especialistas renomados em oncologia. Venha aprender sobre a importância da prevenção e do diagnóstico precoce.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", date: "2026-05-20", status: "published" },
  { id: "3", title: "Bazar Beneficente de Inverno", content: "Nosso tradicional bazar beneficente está de volta! Roupas, acessórios, artesanato e muito mais com preços acessíveis.", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop", date: "2026-06-10", status: "published" },
];
const insertEvent = db.prepare("INSERT OR IGNORE INTO events (id, title, content, image, date, status) VALUES (?, ?, ?, ?, ?, ?)");
for (const e of events) insertEvent.run(e.id, e.title, e.content, e.image, e.date, e.status);

// Partners
const colors = ["7C3AED", "EC4899", "10B981", "6366F1", "F59E0B", "8B5CF6"];
const insertPartner = db.prepare("INSERT OR IGNORE INTO partners (id, name, logo, whatsapp, website) VALUES (?, ?, ?, ?, ?)");
for (let i = 0; i < 18; i++) {
  insertPartner.run(
    String(i + 1),
    `Parceiro ${i + 1}`,
    `https://ui-avatars.com/api/?name=P${i + 1}&background=${colors[i % 6]}&color=fff&size=120&bold=true&format=svg`,
    "5511999999999",
    "https://example.com"
  );
}

// About
db.query(`UPDATE about SET 
  intro = ?, intro_image = ?, mission = ?, mission_image = ?,
  vision = ?, vision_image = ?, "values" = ?, values_image = ?
  WHERE id = 1`).run(
  "O Ser Mulheres de Impacto Entre Ellas é uma rede de mulheres empreendedoras criada para promover conexões, compartilhar conhecimento e gerar novas oportunidades. \nCriamos um espaço onde mulheres podem apresentar seus negócios, trocar experiências, ampliar sua rede de contatos e construir parcerias.",
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop",
  "Nosso objetivo é fortalecer o empreendedorismo feminino criando oportunidades para que mulheres se conectem, aprendam umas com as outras e desenvolvam novos caminhos para seus negócios e projetos.\nPor meio de diferentes ações e experiências, buscamos unir empreendedorismo, conhecimento e relacionamento em torno de temas atuais e relevantes para a comunidade.",
  "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
  "Ser uma rede de referência na conexão e no fortalecimento de mulheres, criando oportunidades de crescimento, colaboração e desenvolvimento por meio de experiências, conhecimento e empreendedorismo.",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
  "Conexão: Acreditamos que boas relações podem gerar novas ideias, parcerias e oportunidades.\nColaboração: Valorizamos a troca de experiências, conhecimentos e apoio entre mulheres, profissionais e empresas.\nEmpreendedorismo: Incentivamos mulheres a desenvolverem seus projetos, apresentarem seus negócios e ampliarem suas possibilidades.\nConhecimento: Promovemos espaços de aprendizado, desenvolvimento e compartilhamento de experiências.\nValorização das mulheres: Buscamos criar ambientes onde mulheres possam se expressar, fortalecer suas trajetórias e ocupar novos espaços.",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop"
);

// Contact settings
db.query("UPDATE contact_settings SET whatsapp_number = ?, email = ?, phone = ?, address = ? WHERE id = 1").run(
  "5551997602948", "comunidadeentreellas@gmail.com", "(51) 99999-9999", "Av. Ely Correa"
);

// Colors
db.query('UPDATE site_colors SET "primary" = ?, secondary = ?, accent = ? WHERE id = 1').run(
  "263 83% 58%", "330 81% 60%", "160 84% 39%"
);

// General settings
db.query("UPDATE general_settings SET site_title = ?, tagline = ?, intro_text = ? WHERE id = 1").run(
  "Ser Mulher de Impacto entre Ellas",
  "Juntas podemos fazer impacto",
  "Uma rede que aproxima mulheres empreendedoras, profissionais, empresas e ideias por meio de encontros, experiências e novas conexões.\\nConheça o Ser Mulheres de Impacto Entre Ellas"
);

console.log("✅ Seed concluído!");
