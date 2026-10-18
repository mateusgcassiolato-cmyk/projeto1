"use client";

import { useState, useMemo } from "react";
import { useStore, NOTE_COLORS } from "@/lib/store";
import { Hydrated, PageHeader } from "@/components/PageShell";
import type { Note } from "@/lib/types";
import { Plus, Search, Pin, Trash2, X, Tag } from "lucide-react";

export default function NotasPage() {
  return (
    <div className="px-4 md:px-8 pt-20 md:pt-8 pb-16 max-w-6xl mx-auto">
      <Hydrated>
        <Notas />
      </Hydrated>
    </div>
  );
}

function Notas() {
  const { notes, createNote, updateNote, deleteNote } = useStore();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const list = q
      ? notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q) ||
            n.tags.some((t) => t.toLowerCase().includes(q))
        )
      : notes;
    return [...list].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt);
  }, [notes, query]);

  const open = notes.find((n) => n.id === openId) || null;

  return (
    <>
      <PageHeader
        title="Anotações"
        subtitle="Capture ideias, pautas e insights. Use tags para organizar."
        action={
          <button
            onClick={() => setOpenId(createNote())}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
          >
            <Plus size={18} /> Nova nota
          </button>
        }
      />

      <div className="relative mb-6 max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar notas, conteúdo ou tags…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
          {query ? "Nenhuma nota encontrada." : "Crie sua primeira anotação."}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {filtered.map((n) => (
            <NoteCard key={n.id} note={n} onOpen={() => setOpenId(n.id)} onPin={() => updateNote(n.id, { pinned: !n.pinned })} onDelete={() => deleteNote(n.id)} />
          ))}
        </div>
      )}

      {open && <NoteEditor note={open} onClose={() => setOpenId(null)} />}
    </>
  );
}

function NoteCard({
  note,
  onOpen,
  onPin,
  onDelete,
}: {
  note: Note;
  onOpen: () => void;
  onPin: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      className="group break-inside-avoid rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
      style={{ background: note.color }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900 line-clamp-2">
          {note.title || "Sem título"}
        </h3>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin();
            }}
            className={`p-1 rounded-lg hover:bg-black/5 ${note.pinned ? "text-brand-600" : "text-slate-300 opacity-0 group-hover:opacity-100"}`}
          >
            <Pin size={16} fill={note.pinned ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Excluir esta nota?")) onDelete();
            }}
            className="p-1 rounded-lg hover:bg-black/5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {note.content && (
        <p className="text-sm text-slate-600 mt-2 whitespace-pre-wrap line-clamp-6">
          {note.content}
        </p>
      )}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {note.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 text-slate-600">
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function NoteEditor({ note, onClose }: { note: Note; onClose: () => void }) {
  const updateNote = useStore((s) => s.updateNote);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/^#/, "");
    if (t && !note.tags.includes(t)) updateNote(note.id, { tags: [...note.tags, t] });
    setTagInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-xl rounded-2xl shadow-xl max-h-[85vh] flex flex-col animate-fade-in"
        style={{ background: note.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 pb-0">
          <div className="flex items-center gap-1">
            {NOTE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => updateNote(note.id, { color: c })}
                className="h-6 w-6 rounded-full ring-1 ring-slate-300 shadow-sm"
                style={{ background: c, outline: note.color === c ? "2px solid #4f46e5" : "none", outlineOffset: 1 }}
              />
            ))}
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pt-2">
          <input
            value={note.title}
            onChange={(e) => updateNote(note.id, { title: e.target.value })}
            placeholder="Título"
            className="w-full bg-transparent text-xl font-bold text-slate-900 outline-none placeholder:text-slate-400"
          />
          <textarea
            value={note.content}
            onChange={(e) => updateNote(note.id, { content: e.target.value })}
            placeholder="Escreva suas ideias aqui…"
            rows={10}
            className="w-full bg-transparent text-sm text-slate-700 outline-none resize-none mt-3 placeholder:text-slate-400"
          />
        </div>

        <div className="p-4 pt-2 border-t border-black/5">
          <div className="flex flex-wrap items-center gap-1.5">
            {note.tags.map((t) => (
              <span key={t} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-black/5 text-slate-600">
                #{t}
                <button
                  onClick={() => updateNote(note.id, { tags: note.tags.filter((x) => x !== t) })}
                  className="hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <div className="flex items-center gap-1 text-slate-400">
              <Tag size={14} />
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                placeholder="adicionar tag…"
                className="bg-transparent text-xs outline-none w-28 text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
