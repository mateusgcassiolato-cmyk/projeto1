# MarketingFlow 🚀

Sistema completo de **produtividade, organização, mapas mentais e anotações**, feito para quem trabalha como **Head de Marketing**.

Tudo em um só lugar: planeje campanhas em mapas mentais, capture ideias em notas, organize o fluxo do time em um quadro Kanban e acompanhe metas (OKRs).

## ✨ Funcionalidades

- **Dashboard** — visão geral com métricas, captura rápida de tarefas, foco do dia e progresso da semana.
- **Mapas Mentais** — canvas interativo com nós arrastáveis, conexões, zoom/pan, cores e edição inline. Ideal para brainstorms e planejamento de campanhas.
- **Anotações** — notas estilo "post-it" com cores, tags, fixar (pin) e busca.
- **Tarefas (Kanban)** — quadro com colunas *Backlog → A fazer → Em andamento → Concluído*, arrastar e soltar, prioridade, prazo e canal de marketing.
- **Metas & OKRs** — objetivos por trimestre com resultados-chave (KRs) e barras de progresso.

> 💾 Os dados são salvos automaticamente no **localStorage do navegador** — não precisa de backend nem login para começar a usar.

## 🛠️ Tecnologias

- [Next.js 14](https://nextjs.org/) (App Router) + React 18
- TypeScript
- Tailwind CSS
- Zustand (estado + persistência)
- lucide-react (ícones)

## ▶️ Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## ☁️ Deploy na Vercel

1. Faça push deste repositório para o GitHub.
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório.
3. A Vercel detecta o Next.js automaticamente — basta clicar em **Deploy**.

Nenhuma variável de ambiente é necessária.

## 📁 Estrutura

```
src/
├── app/
│   ├── layout.tsx         # layout raiz + sidebar
│   ├── page.tsx           # Dashboard
│   ├── mapas/             # Mapas mentais
│   ├── notas/             # Anotações
│   ├── tarefas/           # Kanban de tarefas
│   └── metas/             # Metas & OKRs
├── components/
│   ├── Sidebar.tsx
│   ├── PageShell.tsx      # cabeçalho + guard de hidratação
│   └── MindMapEditor.tsx  # editor de mapa mental
└── lib/
    ├── types.ts           # tipos
    └── store.ts           # store Zustand + dados de exemplo
```

## 💡 Próximos passos (ideias)

- Sincronização em nuvem (Supabase/Vercel Postgres) para acessar de qualquer dispositivo.
- Exportar mapas mentais e notas para PDF/Markdown.
- Modo escuro.
- Integração com Google Calendar / Notion.

---

Feito com 💜 para organizar a vida de marketing.
