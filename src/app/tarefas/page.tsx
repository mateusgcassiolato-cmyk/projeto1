"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Hydrated, PageHeader } from "@/components/PageShell";
import type { Task, TaskStatus, TaskPriority } from "@/lib/types";
import { Plus, Trash2, X, Calendar, Flag } from "lucide-react";

const COLUMNS: { id: TaskStatus; label: string; accent: string }[] = [
  { id: "backlog", label: "Backlog", accent: "bg-slate-400" },
  { id: "todo", label: "A fazer", accent: "bg-sky-500" },
  { id: "doing", label: "Em andamento", accent: "bg-amber-500" },
  { id: "done", label: "Concluído", accent: "bg-emerald-500" },
];

const PRIORITY: Record<TaskPriority, { label: string; cls: string }> = {
  alta: { label: "Alta", cls: "bg-red-100 text-red-700" },
  media: { label: "Média", cls: "bg-amber-100 text-amber-700" },
  baixa: { label: "Baixa", cls: "bg-slate-100 text-slate-600" },
};

export default function TarefasPage() {
  return (
    <div className="px-4 md:px-8 pt-20 md:pt-8 pb-16 max-w-7xl mx-auto">
      <Hydrated>
        <Tarefas />
      </Hydrated>
    </div>
  );
}

function Tarefas() {
  const { tasks, moveTask, createTask } = useStore();
  const [dragId, setDragId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Task | null>(null);
  const [dragOver, setDragOver] = useState<TaskStatus | null>(null);

  return (
    <>
      <PageHeader
        title="Tarefas"
        subtitle="Organize o fluxo de trabalho do seu time de marketing."
        action={
          <button
            onClick={() => createTask({ title: "Nova tarefa", status: "todo" })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
          >
            <Plus size={18} /> Nova tarefa
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(col.id);
              }}
              onDragLeave={() => setDragOver((c) => (c === col.id ? null : c))}
              onDrop={() => {
                if (dragId) moveTask(dragId, col.id);
                setDragId(null);
                setDragOver(null);
              }}
              className={`rounded-2xl p-3 transition-colors ${
                dragOver === col.id ? "bg-brand-50 ring-2 ring-brand-200" : "bg-slate-100/70"
              }`}
            >
              <div className="flex items-center gap-2 px-1 mb-3">
                <span className={`h-2.5 w-2.5 rounded-full ${col.accent}`} />
                <span className="font-semibold text-slate-700 text-sm">{col.label}</span>
                <span className="text-xs text-slate-400">{colTasks.length}</span>
              </div>

              <div className="space-y-2 min-h-[80px]">
                {colTasks.map((t) => (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={() => setDragId(t.id)}
                    onDragEnd={() => setDragId(null)}
                    onClick={() => setEditing(t)}
                    className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm cursor-pointer hover:shadow-md active:cursor-grabbing transition-shadow"
                  >
                    <p className="text-sm font-medium text-slate-800">{t.title}</p>
                    {t.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{t.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${PRIORITY[t.priority].cls}`}>
                        {PRIORITY[t.priority].label}
                      </span>
                      {t.channel && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
                          {t.channel}
                        </span>
                      )}
                      {t.dueDate && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(t.dueDate + "T00:00").toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4">Arraste tarefas aqui</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {editing && <TaskEditor task={editing} onClose={() => setEditing(null)} />}
    </>
  );
}

function TaskEditor({ task, onClose }: { task: Task; onClose: () => void }) {
  const { updateTask, deleteTask } = useStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-5 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900">Editar tarefa</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <X size={20} />
          </button>
        </div>

        <label className="block text-xs font-medium text-slate-500 mb-1">Título</label>
        <input
          value={task.title}
          onChange={(e) => updateTask(task.id, { title: e.target.value })}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-200 mb-3"
        />

        <label className="block text-xs font-medium text-slate-500 mb-1">Descrição</label>
        <textarea
          value={task.description}
          onChange={(e) => updateTask(task.id, { description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-200 resize-none mb-3"
        />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
              <Flag size={12} /> Prioridade
            </label>
            <select
              value={task.priority}
              onChange={(e) => updateTask(task.id, { priority: e.target.value as TaskPriority })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-200 bg-white"
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
              <Calendar size={12} /> Prazo
            </label>
            <input
              type="date"
              value={task.dueDate ?? ""}
              onChange={(e) => updateTask(task.id, { dueDate: e.target.value || null })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
        </div>

        <label className="block text-xs font-medium text-slate-500 mb-1">Canal / Área</label>
        <input
          value={task.channel ?? ""}
          onChange={(e) => updateTask(task.id, { channel: e.target.value || null })}
          placeholder="Ex: Social, SEO, E-mail, Ads…"
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-200 mb-4"
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm("Excluir esta tarefa?")) {
                deleteTask(task.id);
                onClose();
              }
            }}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium"
          >
            <Trash2 size={16} /> Excluir
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
}
