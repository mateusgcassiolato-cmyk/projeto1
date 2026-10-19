"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Hydrated } from "@/components/PageShell";
import {
  Brain,
  StickyNote,
  KanbanSquare,
  Target,
  ArrowRight,
  CheckCircle2,
  Circle,
  Plus,
} from "lucide-react";
import { useState } from "react";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export default function DashboardPage() {
  return (
    <div className="px-4 md:px-8 pt-20 md:pt-8 pb-16 max-w-6xl mx-auto">
      <Hydrated>
        <Dashboard />
      </Hydrated>
    </div>
  );
}

function Dashboard() {
  const { mindMaps, notes, tasks, goals, socialPosts, createTask } = useStore();
  const [quick, setQuick] = useState("");

  const doing = tasks.filter((t) => t.status === "doing");
  const todo = tasks.filter((t) => t.status === "todo");
  const done = tasks.filter((t) => t.status === "done");
  const openTasks = tasks.filter((t) => t.status !== "done");
  const pct = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;

  const cards = [
    { label: "Mapas mentais", value: mindMaps.length, icon: Brain, href: "/mapas", color: "bg-brand-600" },
    { label: "Anotações", value: notes.length, icon: StickyNote, href: "/notas", color: "bg-amber-500" },
    { label: "Tarefas abertas", value: openTasks.length, icon: KanbanSquare, href: "/tarefas", color: "bg-pink-500" },
    { label: "Metas ativas", value: goals.length, icon: Target, href: "/metas", color: "bg-emerald-500" },
  ];

  const addQuick = () => {
    if (!quick.trim()) return;
    createTask({ title: quick.trim(), status: "todo" });
    setQuick("");
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const upcoming = [...socialPosts]
    .filter((p) => p.status !== "publicado")
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 4);

  return (
    <>
      <div className="mb-8">
        <p className="text-sm text-slate-400 capitalize">{today}</p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
          {greeting()} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Organize suas ideias, tarefas e metas de marketing em um só lugar.
        </p>
      </div>

      {/* Captura rápida */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Plus className="text-brand-600 shrink-0" size={20} />
          <input
            value={quick}
            onChange={(e) => setQuick(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addQuick()}
            placeholder="Captura rápida: adicione uma tarefa e pressione Enter…"
            className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
          <button
            onClick={addQuick}
            className="text-sm font-medium px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className={`grid h-10 w-10 place-items-center rounded-xl text-white ${color}`}>
              <Icon size={20} />
            </div>
            <div className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
              {label}
              <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Foco de hoje */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900 dark:text-white">Foco de hoje</h2>
            <Link href="/tarefas" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
              Ver quadro
            </Link>
          </div>

          {doing.length === 0 && todo.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">
              Nenhuma tarefa pendente. Aproveite para planejar! 🎯
            </p>
          ) : (
            <ul className="space-y-2">
              {[...doing, ...todo].slice(0, 6).map((t) => (
                <TaskRow key={t.id} id={t.id} title={t.title} channel={t.channel} status={t.status} />
              ))}
            </ul>
          )}
        </div>

        {/* Progresso */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Progresso da semana</h2>
          <div className="flex items-center justify-center py-2">
            <ProgressRing value={pct} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <Stat label="A fazer" value={todo.length + tasks.filter((t) => t.status === "backlog").length} />
            <Stat label="Fazendo" value={doing.length} />
            <Stat label="Feitas" value={done.length} />
          </div>
        </div>
      </div>

      {/* Próximos posts */}
      <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900 dark:text-white">Próximos posts</h2>
          <Link href="/calendario" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
            Ver calendário
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="text-sm text-slate-400 py-4 text-center">Nenhum post agendado. 📅</p>
        ) : (
          <ul className="space-y-2">
            {upcoming.map((p) => (
              <li key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="text-xs text-slate-400 w-24 shrink-0">
                  {new Date(p.date + "T00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} · {p.time}
                </span>
                <span className="flex-1 text-sm text-slate-700 dark:text-slate-200 truncate">{p.title}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {p.platform}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function TaskRow({
  id,
  title,
  channel,
  status,
}: {
  id: string;
  title: string;
  channel: string | null;
  status: string;
}) {
  const moveTask = useStore((s) => s.moveTask);
  return (
    <li className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <button onClick={() => moveTask(id, "done")} className="text-slate-300 dark:text-slate-600 hover:text-emerald-500">
        <Circle size={18} />
      </button>
      <span className="flex-1 text-sm text-slate-700 dark:text-slate-200">{title}</span>
      {channel && (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          {channel}
        </span>
      )}
      {status === "doing" && (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300">
          em andamento
        </span>
      )}
    </li>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-slate-50 dark:bg-slate-800 py-2">
      <div className="text-xl font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-32 w-32">
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}%</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <CheckCircle2 size={11} /> concluído
          </div>
        </div>
      </div>
    </div>
  );
}
