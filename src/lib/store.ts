"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Goal,
  KeyResult,
  MindMap,
  MindNode,
  Note,
  Task,
  TaskStatus,
} from "./types";

export const NODE_COLORS = [
  "#6366f1",
  "#ec4899",
  "#f97316",
  "#10b981",
  "#0ea5e9",
  "#8b5cf6",
  "#ef4444",
  "#eab308",
];

export const NOTE_COLORS = [
  "#ffffff",
  "#fef9c3",
  "#dcfce7",
  "#dbeafe",
  "#fae8ff",
  "#ffe4e6",
];

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

interface State {
  hydrated: boolean;
  setHydrated: (v: boolean) => void;

  // Mapas mentais
  mindMaps: MindMap[];
  createMindMap: (title: string) => string;
  deleteMindMap: (id: string) => void;
  renameMindMap: (id: string, title: string) => void;
  addNode: (mapId: string, parentId: string | null, text: string) => void;
  updateNode: (mapId: string, nodeId: string, patch: Partial<MindNode>) => void;
  deleteNode: (mapId: string, nodeId: string) => void;

  // Notas
  notes: Note[];
  createNote: () => string;
  updateNote: (id: string, patch: Partial<Note>) => void;
  deleteNote: (id: string) => void;

  // Tarefas
  tasks: Task[];
  createTask: (patch: Partial<Task>) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;

  // Metas
  goals: Goal[];
  createGoal: (objective: string, quarter: string) => string;
  deleteGoal: (id: string) => void;
  addKeyResult: (goalId: string, kr: Omit<KeyResult, "id">) => void;
  updateKeyResult: (goalId: string, krId: string, patch: Partial<KeyResult>) => void;
  deleteKeyResult: (goalId: string, krId: string) => void;
}

function seed(): Pick<State, "mindMaps" | "notes" | "tasks" | "goals"> {
  const now = Date.now();
  const rootId = uid();
  const c1 = uid();
  const c2 = uid();
  const c3 = uid();
  return {
    mindMaps: [
      {
        id: uid(),
        title: "Campanha Q4 — Lançamento",
        createdAt: now,
        updatedAt: now,
        nodes: [
          { id: rootId, text: "Lançamento Q4", x: 420, y: 260, color: NODE_COLORS[0], parentId: null },
          { id: c1, text: "Conteúdo", x: 180, y: 120, color: NODE_COLORS[1], parentId: rootId },
          { id: c2, text: "Mídia Paga", x: 700, y: 140, color: NODE_COLORS[2], parentId: rootId },
          { id: c3, text: "E-mail Marketing", x: 680, y: 420, color: NODE_COLORS[3], parentId: rootId },
          { id: uid(), text: "Blog + SEO", x: 60, y: 40, color: NODE_COLORS[1], parentId: c1 },
          { id: uid(), text: "Redes Sociais", x: 60, y: 200, color: NODE_COLORS[1], parentId: c1 },
          { id: uid(), text: "Google Ads", x: 860, y: 60, color: NODE_COLORS[2], parentId: c2 },
          { id: uid(), text: "Meta Ads", x: 880, y: 200, color: NODE_COLORS[2], parentId: c2 },
        ],
      },
    ],
    notes: [
      {
        id: uid(),
        title: "Ideias de pauta — Blog",
        content:
          "- Tendências de marketing para 2026\n- Como medir ROI de campanhas\n- Estudo de caso: cliente X\n- Guia de automação de e-mail",
        tags: ["conteúdo", "blog"],
        pinned: true,
        color: NOTE_COLORS[1],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uid(),
        title: "Reunião com diretoria",
        content:
          "Apresentar resultados do trimestre.\nFoco em CAC, LTV e crescimento de leads qualificados.",
        tags: ["reunião"],
        pinned: false,
        color: NOTE_COLORS[3],
        createdAt: now,
        updatedAt: now,
      },
    ],
    tasks: [
      { id: uid(), title: "Briefing da campanha de fim de ano", description: "Alinhar objetivos com vendas", status: "todo", priority: "alta", dueDate: null, channel: "Estratégia", createdAt: now, updatedAt: now },
      { id: uid(), title: "Aprovar criativos do Instagram", description: "", status: "doing", priority: "media", dueDate: null, channel: "Social", createdAt: now, updatedAt: now },
      { id: uid(), title: "Revisar relatório de performance", description: "Dados de setembro", status: "done", priority: "media", dueDate: null, channel: "Analytics", createdAt: now, updatedAt: now },
      { id: uid(), title: "Planejar calendário editorial", description: "", status: "backlog", priority: "baixa", dueDate: null, channel: "Conteúdo", createdAt: now, updatedAt: now },
    ],
    goals: [
      {
        id: uid(),
        objective: "Aumentar geração de leads qualificados",
        quarter: "Q4 2026",
        createdAt: now,
        keyResults: [
          { id: uid(), title: "MQLs por mês", target: 500, current: 320, unit: "leads" },
          { id: uid(), title: "Taxa de conversão do site", target: 4, current: 2.6, unit: "%" },
          { id: uid(), title: "Reduzir CAC", target: 80, current: 110, unit: "R$" },
        ],
      },
    ],
  };
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),

      ...seed(),

      // ---------- Mapas ----------
      createMindMap: (title) => {
        const id = uid();
        const now = Date.now();
        const rootId = uid();
        set((s) => ({
          mindMaps: [
            {
              id,
              title: title || "Novo mapa mental",
              createdAt: now,
              updatedAt: now,
              nodes: [
                { id: rootId, text: title || "Ideia central", x: 400, y: 260, color: NODE_COLORS[0], parentId: null },
              ],
            },
            ...s.mindMaps,
          ],
        }));
        return id;
      },
      deleteMindMap: (id) =>
        set((s) => ({ mindMaps: s.mindMaps.filter((m) => m.id !== id) })),
      renameMindMap: (id, title) =>
        set((s) => ({
          mindMaps: s.mindMaps.map((m) =>
            m.id === id ? { ...m, title, updatedAt: Date.now() } : m
          ),
        })),
      addNode: (mapId, parentId, text) =>
        set((s) => ({
          mindMaps: s.mindMaps.map((m) => {
            if (m.id !== mapId) return m;
            const parent = m.nodes.find((n) => n.id === parentId);
            const color = NODE_COLORS[(m.nodes.length) % NODE_COLORS.length];
            const baseX = parent ? parent.x + 180 : 400;
            const baseY = parent ? parent.y + (Math.random() * 160 - 80) : 260;
            const node: MindNode = {
              id: uid(),
              text: text || "Novo nó",
              x: baseX,
              y: baseY,
              color,
              parentId: parentId,
            };
            return { ...m, nodes: [...m.nodes, node], updatedAt: Date.now() };
          }),
        })),
      updateNode: (mapId, nodeId, patch) =>
        set((s) => ({
          mindMaps: s.mindMaps.map((m) =>
            m.id === mapId
              ? {
                  ...m,
                  nodes: m.nodes.map((n) => (n.id === nodeId ? { ...n, ...patch } : n)),
                  updatedAt: Date.now(),
                }
              : m
          ),
        })),
      deleteNode: (mapId, nodeId) =>
        set((s) => ({
          mindMaps: s.mindMaps.map((m) => {
            if (m.id !== mapId) return m;
            // remove o nó e descendentes
            const toRemove = new Set<string>([nodeId]);
            let changed = true;
            while (changed) {
              changed = false;
              for (const n of m.nodes) {
                if (n.parentId && toRemove.has(n.parentId) && !toRemove.has(n.id)) {
                  toRemove.add(n.id);
                  changed = true;
                }
              }
            }
            return { ...m, nodes: m.nodes.filter((n) => !toRemove.has(n.id)), updatedAt: Date.now() };
          }),
        })),

      // ---------- Notas ----------
      createNote: () => {
        const id = uid();
        const now = Date.now();
        set((s) => ({
          notes: [
            { id, title: "", content: "", tags: [], pinned: false, color: NOTE_COLORS[0], createdAt: now, updatedAt: now },
            ...s.notes,
          ],
        }));
        return id;
      },
      updateNote: (id, patch) =>
        set((s) => ({
          notes: s.notes.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n)),
        })),
      deleteNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),

      // ---------- Tarefas ----------
      createTask: (patch) => {
        const now = Date.now();
        set((s) => ({
          tasks: [
            {
              id: uid(),
              title: patch.title || "Nova tarefa",
              description: patch.description || "",
              status: patch.status || "todo",
              priority: patch.priority || "media",
              dueDate: patch.dueDate ?? null,
              channel: patch.channel ?? null,
              createdAt: now,
              updatedAt: now,
            },
            ...s.tasks,
          ],
        }));
      },
      updateTask: (id, patch) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: Date.now() } : t)),
        })),
      moveTask: (id, status) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, status, updatedAt: Date.now() } : t)),
        })),
      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      // ---------- Metas ----------
      createGoal: (objective, quarter) => {
        const id = uid();
        set((s) => ({
          goals: [
            { id, objective, quarter, keyResults: [], createdAt: Date.now() },
            ...s.goals,
          ],
        }));
        return id;
      },
      deleteGoal: (id) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
      addKeyResult: (goalId, kr) =>
        set((s) => ({
          goals: s.goals.map((g) =>
            g.id === goalId ? { ...g, keyResults: [...g.keyResults, { ...kr, id: uid() }] } : g
          ),
        })),
      updateKeyResult: (goalId, krId, patch) =>
        set((s) => ({
          goals: s.goals.map((g) =>
            g.id === goalId
              ? { ...g, keyResults: g.keyResults.map((k) => (k.id === krId ? { ...k, ...patch } : k)) }
              : g
          ),
        })),
      deleteKeyResult: (goalId, krId) =>
        set((s) => ({
          goals: s.goals.map((g) =>
            g.id === goalId ? { ...g, keyResults: g.keyResults.filter((k) => k.id !== krId) } : g
          ),
        })),
    }),
    {
      name: "marketingflow-v1",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
