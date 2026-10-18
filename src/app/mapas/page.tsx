"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Hydrated, PageHeader } from "@/components/PageShell";
import { MindMapEditor } from "@/components/MindMapEditor";
import { Brain, Plus, Trash2, Clock } from "lucide-react";

export default function MapasPage() {
  return (
    <div className="px-4 md:px-8 pt-20 md:pt-8 pb-16 max-w-6xl mx-auto">
      <Hydrated>
        <Mapas />
      </Hydrated>
    </div>
  );
}

function Mapas() {
  const { mindMaps, createMindMap, deleteMindMap } = useStore();
  const [openId, setOpenId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const current = mindMaps.find((m) => m.id === openId);

  if (current) {
    return <MindMapEditor mapId={current.id} onBack={() => setOpenId(null)} />;
  }

  return (
    <>
      <PageHeader
        title="Mapas Mentais"
        subtitle="Visualize campanhas, estratégias e brainstorms de forma conectada."
      />

      <div className="flex gap-2 mb-6">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const id = createMindMap(newTitle.trim());
              setNewTitle("");
              setOpenId(id);
            }
          }}
          placeholder="Nome do novo mapa mental…"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-brand-200"
        />
        <button
          onClick={() => {
            const id = createMindMap(newTitle.trim());
            setNewTitle("");
            setOpenId(id);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
        >
          <Plus size={18} /> Criar
        </button>
      </div>

      {mindMaps.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mindMaps.map((m) => (
            <div
              key={m.id}
              className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setOpenId(m.id)}
            >
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Brain size={20} />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Excluir "${m.title}"?`)) deleteMindMap(m.id);
                  }}
                  className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <h3 className="font-semibold text-slate-900 mt-3">{m.title}</h3>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                <span>{m.nodes.length} nós</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(m.updatedAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <Brain size={28} />
      </div>
      <p className="mt-4 font-medium text-slate-700">Nenhum mapa mental ainda</p>
      <p className="text-sm text-slate-400">Crie seu primeiro mapa acima para começar.</p>
    </div>
  );
}
