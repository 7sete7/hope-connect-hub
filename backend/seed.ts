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
  "Somos uma cooperativa formada por empresas comprometidas com a luta contra o câncer. Acreditamos que juntos podemos transformar vidas e oferecer esperança a milhares de pessoas que enfrentam essa batalha.",
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop",
  "Promover a união de empresas e profissionais em prol do combate ao câncer, oferecendo apoio integral a pacientes e suas famílias.",
  "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
  "Ser referência nacional como cooperativa de empresas no combate ao câncer, reconhecida pela excelência em suas ações.",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
  "Solidariedade: acreditamos no poder da união.\nEsperança: mantemos o otimismo mesmo nos momentos difíceis.\nTransparência: agimos com ética e responsabilidade.\nInclusão: respeitamos e acolhemos todas as pessoas.\nCompromisso: dedicamo-nos integralmente à nossa causa.",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop"
);

// Contact settings
db.query("UPDATE contact_settings SET whatsapp_number = ?, email = ?, phone = ?, address = ? WHERE id = 1").run(
  "5551999999999", "contato@cooperativavida.org.br", "(51) 99999-9999", "Av. Paulista, 1000 - São Paulo, SP"
);

// Colors
db.query('UPDATE site_colors SET "primary" = ?, secondary = ?, accent = ? WHERE id = 1').run(
  "263 83% 58%", "330 81% 60%", "160 84% 39%"
);

// General settings
db.query("UPDATE general_settings SET site_title = ?, tagline = ?, intro_title = ?, intro_text = ? WHERE id = 1").run(
  "Ser Mulher de Impacto entre Ellas",
  "Unindo empresas na luta contra o câncer. Juntos somos mais fortes.",
  "Nossa causa",
  "Somos uma rede de empresas que acredita que a união transforma vidas. Cada parceria, cada evento e cada gesto aproxima quem enfrenta o câncer do cuidado, do acolhimento e da esperança que merece."
);

console.log("✅ Seed concluído!");
