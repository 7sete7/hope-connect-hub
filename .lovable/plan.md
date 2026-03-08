

# Cooperativa Contra o Câncer — Site Institucional

## Visão Geral
Site institucional moderno e acolhedor para cooperativa de empresas contra o câncer, com painel administrativo completo. Frontend React/Tailwind com dados mock e interfaces de API prontas para integração com backend Bun/SQLite.

## Paleta de Cores
- **Primária**: Roxo acolhedor (#7C3AED) — representa esperança e solidariedade
- **Secundária**: Rosa suave (#EC4899) — causa câncer/saúde
- **Acentos**: Verde esperança (#10B981) para CTAs
- **Neutros**: Cinzas quentes para texto e fundos
- Todas as cores customizáveis via painel admin

## Páginas Públicas

### 1. Página Inicial (Home)
- **Header**: Logo + navegação (Home, Quem Somos, Eventos, Associados, Contato)
- **Carrossel Hero**: Imagens fullwidth com texto/subtexto animado, transição automática e controles
- **Seção Eventos**: Cards com imagem, título, texto truncado, link para detalhe e "Ver todos os eventos"
- **Seção Parceiros**: Grid elegante com logos (15+), efeito hover, links WhatsApp/website, botão "Seja nosso parceiro" → Contato
- **Rodapé**: Info da cooperativa, redes sociais, link discreto "Área administrativa"

### 2. Quem Somos
- Texto institucional com imagem lateral
- Seções alternadas (texto esquerda/imagem direita e vice-versa) para Missão, Visão e Valores
- Imagens de fundo com overlay suave

### 3. Eventos
- Lista completa de eventos com filtro
- Página de detalhe individual de cada evento (imagem, título, conteúdo completo, data)

### 4. Associados
- Grid dinâmico com logos dos associados
- Links para WhatsApp e/ou website
- Animações de entrada ao scroll

### 5. Contato
- Link direto para WhatsApp (número customizável)
- Formulário: Nome, Email, Telefone, Mensagem
- Validação com feedback visual

### 6. Login (acesso discreto via rodapé)
- Tela de login simples (email + senha), sem cadastro público
- Apenas admin cria contas

## Painel Administrativo

### Dashboard
- Visão geral: total de eventos, parceiros, associados

### Gerenciamento de Conteúdo
- **Carrossel**: Adicionar/editar/remover slides (imagem, texto, subtexto, ordem)
- **Eventos**: CRUD completo (título, conteúdo rico, imagem, data, status)
- **Parceiros**: CRUD (logo, nome, WhatsApp, website)
- **Associados**: CRUD (logo, nome, WhatsApp, website)
- **Quem Somos**: Editar textos e imagens de cada seção
- **Contato**: Configurar número WhatsApp
- **Cores**: Customizar paleta de cores do site

### Upload de Imagens
- Interface de upload com preview
- Preparado para envio ao servidor (mock no frontend)

## Animações e UX
- Fade-in ao scroll (seções aparecem suavemente)
- Hover effects em cards e logos de parceiros
- Transições suaves entre páginas
- Carrossel com animação de slide
- Skeleton loading nos dados dinâmicos

## Arquitetura Frontend
- Contexto global para dados do site (cores, conteúdos)
- Serviço de API centralizado (fácil trocar mock por endpoints reais)
- Rotas protegidas para área admin
- Dados mock realistas para todas as seções

