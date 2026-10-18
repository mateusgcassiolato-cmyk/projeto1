"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Hydrated, PageHeader } from "@/components/PageShell";
import type { Goal, KeyResult } from "@/lib/types";
import { Plus, Trash2, Target, X } from "lucide-react";

export default function MetasPage() {
  return (
    <div className="px-4 md:px-8 pt-20 md:pt-8 pb-16 max-w-5xl mx-auto">
      <Hydrated>
        <Metas />
      </Hydrated>
    </div>
  );
}

function krProgress(kr: KeyResult) {
  // Suporta metas de redução (ex.: reduzir CAC) quando current > target no início
  if (kr.target === 0) return 0;
  const p = (kr.current / kr.target) * 100;
  return Math.max(0, Math.min(100, Math.round(p)));
}

function goalProgress(goal: Goal) {
  if (goal.keyResults.length === 0) return 0;
  const sum = goal.keyResults.reduce((a, kr) => a + krProgress(kr), 0);
  return Math.round(sum / goal.keyResults.length);
}

function Metas() {
  const { goals, createGoal, deleteGoal, addKeyResult } = useStore();
  const [showNew, setShowNew] = useState(false);
  const [objective, setObjective] = useState("");
  const [quarter, setQuarter] = useState("Q4 2026");

  return (
    <>
      <PageHeader
        title="Metas & OKRs"
        subtitle="Defina objetivos e acompanhe os resultados-chave do marketing."
        action={
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
          >
            <Plus size={18} /> Novo objetivo
          </button>
        }
      />

      {showNew && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900 dark:text-white">Novo objetivo</h3>
            <button onClick={() => setShowNew(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="Ex: Aumentar o reconhecimento da marca"
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/40"
            />
            <input
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              placeholder="Trimestre"
              className="sm:w-32 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/40"
            />
            <button
              onClick={() => {
                if (!objective.trim()) return;
                createGoal(objective.trim(), quarter.trim() || "—");
                setObjective("");
                setShowNew(false);
              }}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
            >
              Criar
            </button>
          </div>
        </div>
      )}

      {goals.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400">
            <Target size={28} />
          </div>
          <p className="mt-4 font-medium text-slate-700 dark:text-slate-200">Nenhuma meta definida</p>
          <p className="text-sm text-slate-400">Crie um objetivo para começar a acompanhar.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {goals.map((g) => (
            <GoalCard key={g.id} goal={g} onDelete={() => deleteGoal(g.id)} onAddKr={(kr) => addKeyResult(g.id, kr)} />
          ))}
        </div>
      )}
    </>
  );
}

function GoalCard({
  goal,
  onDelete,
  onAddKr,
}: {
  goal: Goal;
  onDelete: () => void;
  onAddKr: (kr: Omit<KeyResult, "id">) => void;
}) {
  const { updateKeyResult, deleteKeyResult } = useStore();
  const [krTitle, setKrTitle] = useState("");
  const progress = goalProgress(goal);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-600/20 text-brand-600 dark:text-brand-300">
            {goal.quarter}
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">{goal.objective}</h3>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">{progress}%</div>
          <button
            onClick={() => {
              if (confirm("Excluir este objetivo?")) onDelete();
            }}
            className="text-slate-300 dark:text-slate-600 hover:text-red-500 mt-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-3 overflow-hidden">
        <div
          className="h-full bg-brand-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 space-y-3">
        {goal.keyResults.map((kr) => (
          <div key={kr.id} className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{kr.title}</span>
                <span className="text-xs text-slate-400 shrink-0">{krProgress(kr)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 mt-1 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${krProgress(kr)}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <input
                type="number"
                value={kr.current}
                onChange={(e) => updateKeyResult(goal.id, kr.id, { current: Number(e.target.value) })}
                className="w-16 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-right text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/40"
              />
              <span className="text-xs text-slate-400">/ {kr.target}</span>
              <span className="text-[11px] text-slate-400 w-10 truncate">{kr.unit}</span>
              <button
                onClick={() => deleteKeyResult(goal.id, kr.id)}
                className="text-slate-300 dark:text-slate-600 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <input
          value={krTitle}
          onChange={(e) => setKrTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && krTitle.trim()) {
              onAddKr({ title: krTitle.trim(), target: 100, current: 0, unit: "" });
              setKrTitle("");
            }
          }}
          placeholder="Adicionar resultado-chave (KR)…"
          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/40"
        />
        <button
          onClick={() => {
            if (krTitle.trim()) {
              onAddKr({ title: krTitle.trim(), target: 100, current: 0, unit: "" });
              setKrTitle("");
            }
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
