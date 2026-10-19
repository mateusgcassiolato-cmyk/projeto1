"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Brain,
  StickyNote,
  KanbanSquare,
  Target,
  CalendarDays,
  Menu,
  X,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/mapas", label: "Mapas Mentais", icon: Brain },
  { href: "/notas", label: "Anotações", icon: StickyNote },
  { href: "/calendario", label: "Calendário Editorial", icon: CalendarDays },
  { href: "/tarefas", label: "Tarefas", icon: KanbanSquare },
  { href: "/metas", label: "Metas & OKRs", icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <>
      {/* Topbar mobile */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 h-14">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            <Sparkles size={18} />
          </span>
          MarketingFlow
        </Link>
        <div className="flex items-center gap-1">
          <ThemeButton theme={theme} toggle={toggle} />
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Overlay mobile */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center gap-2 px-5 border-b border-slate-100 dark:border-slate-800">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
            <Sparkles size={20} />
          </span>
          <div className="leading-tight flex-1">
            <div className="font-bold text-slate-900 dark:text-white">MarketingFlow</div>
            <div className="text-[11px] text-slate-400">Produtividade & Ideias</div>
          </div>
          <div className="hidden md:block">
            <ThemeButton theme={theme} toggle={toggle} />
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
                    ? "bg-brand-50 dark:bg-brand-600/20 text-brand-700 dark:text-brand-300"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon size={18} className={active ? "text-brand-600 dark:text-brand-400" : "text-slate-400"} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
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

function ThemeButton({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Alternar tema"
      title={theme === "dark" ? "Modo claro" : "Modo escuro"}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
