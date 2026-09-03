# 📚 Catálogo de Livros — Frontend

Interface web SPA para o [Catálogo de Livros](#), consumindo a API REST em Spring Boot. Permite autenticação de usuários e gerenciamento (CRUD) de livros, autores e categorias, com um visual minimalista inspirado no Notion.

## 🚀 Tecnologias

- **React 19** + **Vite**
- **React Router** para navegação entre páginas
- **Axios** para chamadas HTTP, com interceptor de token JWT
- **CSS puro** com variáveis globais (sem framework CSS)
- **ESLint** para linting, com regras de React Hooks

## 🎨 Identidade visual

- **Paleta**: fundo off-white, texto em cinza-carvão, accent azul-petróleo — tons inspirados no Notion
- **Tipografia**: `Source Serif 4` para títulos (remetendo a capas/lombadas de livro), `Inter` para o corpo do texto, `JetBrains Mono` para metadados numéricos (páginas, datas)
- **Elemento de assinatura**: cada linha de livro na listagem exibe uma "lombada" colorida, reforçando a metáfora de estante/catálogo físico

## 🏗️ Arquitetura

```
src/
├── api/          → configuração do Axios e funções de chamada à API, uma por entidade
├── components/   → componentes reutilizáveis (Sidebar, Layout, RotaProtegida)
├── contexts/     → AuthContext, gerencia login/logout/token em toda a aplicação
├── pages/        → páginas da aplicação (Login, Registrar, Livros, Autores, Categorias e seus formulários)
├── styles/       → variáveis CSS globais (cores, tipografia, espaçamento)
├── App.jsx        → definição de rotas
└── main.jsx       → ponto de entrada, envolve a aplicação com AuthProvider
```

## 🔐 Autenticação

O login e registro são feitos via `AuthContext`, que:

1. Chama os endpoints `/auth/login` ou `/auth/registrar` da API
2. Salva o token JWT retornado no `localStorage`
3. Disponibiliza `isAuthenticated`, `login`, `registrar` e `logout` para qualquer componente via o hook `useAuth()`

O Axios está configurado com um **interceptor de requisição** (`src/api/axios.js`) que anexa automaticamente o token salvo no header `Authorization: Bearer <token>` em toda chamada à API — nenhum componente precisa lidar com isso manualmente.

### Rotas protegidas

O componente `RotaProtegida` verifica `isAuthenticated` antes de renderizar páginas como `/livros`, `/autores` e `/categorias`, redirecionando para `/login` caso o usuário não esteja autenticado. Essas páginas ficam aninhadas dentro de um `Layout` compartilhado, que renderiza a `Sidebar` de navegação ao lado do conteúdo.

## 📋 Páginas

| Rota | Descrição |
|---|---|
| `/login` | Autenticação de usuário existente |
| `/registrar` | Criação de novo usuário |
| `/livros` | Listagem de livros, com autor e categorias exibidos |
| `/livros/novo` | Formulário de criação de livro, com seleção de autor e categorias |
| `/autores` | Listagem de autores |
| `/autores/novo` | Formulário de criação de autor |
| `/categorias` | Listagem de categorias |
| `/categorias/novo` | Formulário de criação de categoria |

## ⚙️ Configuração e execução local

### Pré-requisitos

- Node.js
- O [backend](#) rodando localmente em `http://localhost:8080` (com CORS habilitado para `http://localhost:5173`)

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar a aplicação

```bash
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

> A URL base da API está configurada em `src/api/axios.js`. Ajuste a `baseURL` conforme necessário ao apontar para um backend em produção.

## ☁️ Deploy (Vercel)

O frontend é implantado na [Vercel](https://vercel.com), conectado diretamente ao repositório do GitHub. A Vercel detecta automaticamente o projeto Vite e configura build/deploy sem necessidade de configuração manual adicional.

Para produção, a `baseURL` do Axios deve apontar para a URL do backend implantado no Render, e o backend precisa ter a origem da Vercel liberada em seu `CorsConfig`.

## 🎯 Decisões técnicas relevantes

- **Context API em vez de bibliotecas de estado externas**: como o estado compartilhado se resume à autenticação, o `AuthContext` nativo do React foi suficiente, sem necessidade de Redux ou similares.
- **CSS puro com variáveis**: dado o escopo controlado da interface e a intenção de um visual bem específico (não genérico), CSS direto ofereceu mais controle fino do que uma biblioteca de utilitários.
- **Separação de funções de API por entidade**: cada arquivo em `src/api/` (autores.js, livros.js, etc.) expõe funções simples (`listarAutores`, `criarAutor`...), mantendo os componentes de página livres de conhecer URLs ou detalhes de HTTP diretamente.
- **Componentes de formulário reaproveitando CSS**: os formulários de Autor e Categoria reaproveitam o mesmo CSS do formulário de Livro, evitando duplicação para um padrão visual idêntico.

## 📌 Próximos passos

- Edição e exclusão de registros pela interface (atualmente disponíveis via API, mas não expostas na UI)
- Estados de carregamento e erro mais refinados
- Paginação/busca na listagem de livros
