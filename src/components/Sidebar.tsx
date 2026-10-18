"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Brain,
  StickyNote,
  KanbanSquare,
  Target,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/mapas", label: "Mapas Mentais", icon: Brain },
  { href: "/notas", label: "Anotações", icon: StickyNote },
  { href: "/tarefas", label: "Tarefas", icon: KanbanSquare },
  { href: "/metas", label: "Metas & OKRs", icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Topbar mobile */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between bg-white border-b border-slate-200 px-4 h-14">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            <Sparkles size={18} />
          </span>
          MarketingFlow
        </Link>
        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-700"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Overlay mobile */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center gap-2 px-5 border-b border-slate-100">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
            <Sparkles size={20} />
          </span>
          <div className="leading-tight">
            <div className="font-bold text-slate-900">MarketingFlow</div>
            <div className="text-[11px] text-slate-400">Produtividade & Ideias</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} className={active ? "text-brand-600" : "text-slate-400"} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
            <p className="text-sm font-semibold">Head de Marketing</p>
            <p className="text-xs text-brand-100 mt-1">
              Seus dados ficam salvos neste navegador.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
