"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Hydrated, PageHeader } from "@/components/PageShell";
import type { SocialPost, SocialPlatform, PostFormat, PostStatus } from "@/lib/types";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Trash2,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Music2,
  Twitter,
} from "lucide-react";

const PLATFORMS: { id: SocialPlatform; color: string; icon: React.ElementType }[] = [
  { id: "Instagram", color: "#ec4899", icon: Instagram },
  { id: "Facebook", color: "#2563eb", icon: Facebook },
  { id: "LinkedIn", color: "#0a66c2", icon: Linkedin },
  { id: "TikTok", color: "#0f172a", icon: Music2 },
  { id: "X", color: "#475569", icon: Twitter },
  { id: "YouTube", color: "#dc2626", icon: Youtube },
];

const FORMATS: PostFormat[] = ["Post", "Reels", "Story", "Carrossel", "Vídeo", "Artigo"];

const STATUS: Record<PostStatus, { label: string; cls: string }> = {
  ideia: { label: "Ideia", cls: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300" },
  producao: { label: "Em produção", cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300" },
  agendado: { label: "Agendado", cls: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300" },
  publicado: { label: "Publicado", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" },
};

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const pad = (n: number) => String(n).padStart(2, "0");
const platformMeta = (p: SocialPlatform) => PLATFORMS.find((x) => x.id === p)!;

export default function CalendarioPage() {
  return (
    <div className="px-4 md:px-8 pt-20 md:pt-8 pb-16 max-w-6xl mx-auto">
      <Hydrated>
        <Calendario />
      </Hydrated>
    </div>
  );
}

function Calendario() {
  const { socialPosts, createSocialPost } = useStore();
  const today = new Date();
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [editingId, setEditingId] = useState<string | null>(null);

  const firstDay = new Date(cursor.year, cursor.month, 1).getDay();
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const dateStr = (day: number) =>
    `${cursor.year}-${pad(cursor.month + 1)}-${pad(day)}`;

  const postsOf = (day: number) =>
    socialPosts
      .filter((p) => p.date === dateStr(day))
      .sort((a, b) => a.time.localeCompare(b.time));

  const monthPosts = socialPosts.filter((p) => {
    const [y, m] = p.date.split("-").map(Number);
    return y === cursor.year && m === cursor.month + 1;
  });

  const prev = () =>
    setCursor((c) => (c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 }));
  const next = () =>
    setCursor((c) => (c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 }));

  const addPost = (day: number) => {
    const id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    // cria e abre
    createSocialPost({ date: dateStr(day), title: "Novo post" });
    // o item mais recente é o primeiro
    setTimeout(() => {
      const latest = useStore.getState().socialPosts[0];
      setEditingId(latest?.id ?? id);
    }, 0);
  };

  const editing = socialPosts.find((p) => p.id === editingId) || null;

  return (
    <>
      <PageHeader
        title="Calendário Editorial"
        subtitle="Planeje e acompanhe os posts de social media mês a mês."
      />

      {/* Controles */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={prev} className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white w-44 text-center">
            {MONTHS[cursor.month]} {cursor.year}
          </h2>
          <button onClick={next} className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            <ChevronRight size={18} />
          </button>
          <button
            onClick={() => setCursor({ year: today.getFullYear(), month: today.getMonth() })}
            className="ml-2 text-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Hoje
          </button>
        </div>
        <span className="text-sm text-slate-400">{monthPosts.length} posts no mês</span>
      </div>

      {/* Legenda de plataformas */}
      <div className="flex flex-wrap gap-3 mb-4">
        {PLATFORMS.map(({ id, color, icon: Icon }) => (
          <span key={id} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="grid h-5 w-5 place-items-center rounded-md text-white" style={{ background: color }}>
              <Icon size={12} />
            </span>
            {id}
          </span>
        ))}
      </div>

      {/* Grade do calendário */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800">
          {WEEKDAYS.map((w) => (
            <div key={w} className="py-2 text-center text-xs font-semibold text-slate-400 dark:text-slate-500">
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const isToday = day !== null && dateStr(day) === todayStr;
            const posts = day !== null ? postsOf(day) : [];
            return (
              <div
                key={i}
                className={`group min-h-[104px] border-b border-r border-slate-100 dark:border-slate-800 p-1.5 ${
                  i % 7 === 0 ? "border-l" : ""
                } ${day === null ? "bg-slate-50/50 dark:bg-slate-900/50" : ""}`}
              >
                {day !== null && (
                  <>
                    <div className="flex items-center justify-between px-0.5">
                      <span
                        className={`text-xs font-medium grid h-6 w-6 place-items-center rounded-full ${
                          isToday ? "bg-brand-600 text-white" : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {day}
                      </span>
                      <button
                        onClick={() => addPost(day)}
                        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-brand-600 transition-opacity"
                        title="Adicionar post"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <div className="mt-1 space-y-1">
                      {posts.map((p) => {
                        const meta = platformMeta(p.platform);
                        const Icon = meta.icon;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setEditingId(p.id)}
                            className="w-full flex items-center gap-1 px-1.5 py-1 rounded-md text-left text-[11px] text-white truncate hover:opacity-90"
                            style={{ background: meta.color, opacity: p.status === "publicado" ? 0.6 : 1 }}
                            title={`${p.time} · ${p.platform} · ${p.format}`}
                          >
                            <Icon size={11} className="shrink-0" />
                            <span className="truncate">{p.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {editing && <PostEditor post={editing} onClose={() => setEditingId(null)} />}
    </>
  );
}

function PostEditor({ post, onClose }: { post: SocialPost; onClose: () => void }) {
  const { updateSocialPost, deleteSocialPost } = useStore();
  const inputCls =
    "w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/40";
  const labelCls = "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-5 max-h-[88vh] overflow-y-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900 dark:text-white">Post de social media</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
            <X size={20} />
          </button>
        </div>

        <label className={labelCls}>Título</label>
        <input
          value={post.title}
          onChange={(e) => updateSocialPost(post.id, { title: e.target.value })}
          className={inputCls + " mb-3"}
        />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={labelCls}>Plataforma</label>
            <select
              value={post.platform}
              onChange={(e) => updateSocialPost(post.id, { platform: e.target.value as SocialPlatform })}
              className={inputCls}
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>{p.id}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Formato</label>
            <select
              value={post.format}
              onChange={(e) => updateSocialPost(post.id, { format: e.target.value as PostFormat })}
              className={inputCls}
            >
              {FORMATS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={labelCls}>Data</label>
            <input
              type="date"
              value={post.date}
              onChange={(e) => updateSocialPost(post.id, { date: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Horário</label>
            <input
              type="time"
              value={post.time}
              onChange={(e) => updateSocialPost(post.id, { time: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>

        <label className={labelCls}>Status</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {(Object.keys(STATUS) as PostStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => updateSocialPost(post.id, { status: s })}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                post.status === s ? STATUS[s].cls + " ring-2 ring-brand-300" : STATUS[s].cls + " opacity-60"
              }`}
            >
              {STATUS[s].label}
            </button>
          ))}
        </div>

        <label className={labelCls}>Legenda / Conteúdo</label>
        <textarea
          value={post.caption}
          onChange={(e) => updateSocialPost(post.id, { caption: e.target.value })}
          rows={4}
          placeholder="Escreva a legenda, roteiro ou briefing do post…"
          className={inputCls + " resize-none mb-4"}
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm("Excluir este post?")) {
                deleteSocialPost(post.id);
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
