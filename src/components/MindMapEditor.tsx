"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useStore, NODE_COLORS } from "@/lib/store";
import type { MindNode } from "@/lib/types";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Pencil,
} from "lucide-react";

export function MindMapEditor({
  mapId,
  onBack,
}: {
  mapId: string;
  onBack: () => void;
}) {
  const map = useStore((s) => s.mindMaps.find((m) => m.id === mapId));
  const { addNode, updateNode, deleteNode, renameMindMap } = useStore();

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);

  const dragRef = useRef<
    | { type: "node"; id: string; startX: number; startY: number; origX: number; origY: number }
    | { type: "pan"; startX: number; startY: number; origX: number; origY: number }
    | null
  >(null);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      if (d.type === "pan") {
        setPan({ x: d.origX + (e.clientX - d.startX), y: d.origY + (e.clientY - d.startY) });
      } else {
        const dx = (e.clientX - d.startX) / scale;
        const dy = (e.clientY - d.startY) / scale;
        updateNode(mapId, d.id, { x: d.origX + dx, y: d.origY + dy });
      }
    },
    [scale, mapId, updateNode]
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  if (!map) return null;

  const startNodeDrag = (e: React.PointerEvent, node: MindNode) => {
    e.stopPropagation();
    setSelected(node.id);
    dragRef.current = {
      type: "node",
      id: node.id,
      startX: e.clientX,
      startY: e.clientY,
      origX: node.x,
      origY: node.y,
    };
  };

  const startPan = (e: React.PointerEvent) => {
    setSelected(null);
    setEditing(null);
    dragRef.current = {
      type: "pan",
      startX: e.clientX,
      startY: e.clientY,
      origX: pan.x,
      origY: pan.y,
    };
  };

  const selectedNode = map.nodes.find((n) => n.id === selected);

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] md:h-[calc(100vh-4rem)] -mx-4 md:-mx-8 -mt-20 md:-mt-8">
      {/* Barra superior */}
      <div className="flex items-center gap-3 px-4 md:px-6 h-16 border-b border-slate-200 bg-white shrink-0">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft size={20} />
        </button>
        <input
          value={map.title}
          onChange={(e) => renameMindMap(mapId, e.target.value)}
          className="font-semibold text-slate-900 bg-transparent outline-none focus:bg-slate-50 rounded px-2 py-1 flex-1 min-w-0"
        />
        <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
          Arraste o fundo para mover · arraste os nós para posicionar
        </div>
      </div>

      {/* Canvas */}
      <div
        className="relative flex-1 overflow-hidden bg-slate-50 touch-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d6dbe4 1px, transparent 1px)",
          backgroundSize: `${24 * scale}px ${24 * scale}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
          cursor: "grab",
        }}
        onPointerDown={startPan}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
        >
          {/* Linhas de conexão */}
          <svg
            className="absolute top-0 left-0 overflow-visible pointer-events-none"
            style={{ width: 1, height: 1 }}
          >
            {map.nodes.map((n) => {
              if (!n.parentId) return null;
              const p = map.nodes.find((x) => x.id === n.parentId);
              if (!p) return null;
              const x1 = p.x + 70;
              const y1 = p.y + 20;
              const x2 = n.x + 70;
              const y2 = n.y + 20;
              const mx = (x1 + x2) / 2;
              return (
                <path
                  key={n.id}
                  d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                  stroke={n.color}
                  strokeWidth={2.5}
                  fill="none"
                  opacity={0.5}
                />
              );
            })}
          </svg>

          {/* Nós */}
          {map.nodes.map((n) => {
            const isRoot = n.parentId === null;
            const isSel = selected === n.id;
            return (
              <div
                key={n.id}
                onPointerDown={(e) => startNodeDrag(e, n)}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setEditing(n.id);
                }}
                className="absolute select-none"
                style={{ left: n.x, top: n.y, cursor: "grab" }}
              >
                <div
                  className="min-w-[90px] max-w-[200px] px-4 py-2.5 rounded-xl shadow-sm text-center text-sm font-medium transition-shadow"
                  style={{
                    background: isRoot ? n.color : "#ffffff",
                    color: isRoot ? "#ffffff" : "#0f172a",
                    border: `2px solid ${n.color}`,
                    boxShadow: isSel ? `0 0 0 3px ${n.color}44` : undefined,
                  }}
                >
                  {editing === n.id ? (
                    <input
                      autoFocus
                      defaultValue={n.text}
                      onBlur={(e) => {
                        updateNode(mapId, n.id, { text: e.target.value || "Nó" });
                        setEditing(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                      }}
                      className="w-full bg-transparent outline-none text-center"
                      style={{ color: isRoot ? "#fff" : "#0f172a" }}
                      onPointerDown={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="break-words">{n.text}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles de zoom */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-white rounded-xl border border-slate-200 shadow-sm p-1">
          <button
            onClick={() => setScale((s) => Math.min(2, +(s + 0.1).toFixed(2)))}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            title="Aproximar"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={() => setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(2)))}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            title="Afastar"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={() => {
              setScale(1);
              setPan({ x: 0, y: 0 });
            }}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            title="Resetar visão"
          >
            <Maximize size={18} />
          </button>
        </div>

        {/* Painel do nó selecionado */}
        {selectedNode && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white rounded-xl border border-slate-200 shadow-md px-3 py-2 animate-fade-in">
            <button
              onClick={() => addNode(mapId, selectedNode.id, "Novo nó")}
              className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700"
            >
              <Plus size={16} /> Filho
            </button>
            <button
              onClick={() => setEditing(selectedNode.id)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600"
              title="Editar texto"
            >
              <Pencil size={16} />
            </button>
            <div className="flex items-center gap-1 px-1 border-l border-slate-200">
              {NODE_COLORS.slice(0, 6).map((c) => (
                <button
                  key={c}
                  onClick={() => updateNode(mapId, selectedNode.id, { color: c })}
                  className="h-5 w-5 rounded-full border-2 border-white shadow ring-1 ring-slate-200"
                  style={{ background: c }}
                />
              ))}
            </div>
            {selectedNode.parentId && (
              <button
                onClick={() => {
                  deleteNode(mapId, selectedNode.id);
                  setSelected(null);
                }}
                className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 border-l border-slate-200 ml-1"
                title="Excluir nó"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
