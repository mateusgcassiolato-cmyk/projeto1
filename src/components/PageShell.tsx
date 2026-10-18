"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/** Garante que o conteúdo dependente do localStorage só renderize após hidratar. */
export function Hydrated({ children }: { children: React.ReactNode }) {
  const hydrated = useStore((s) => s.hydrated);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !hydrated) {
    return (
      <div className="flex items-center justify-center py-32 text-slate-400 text-sm">
        Carregando…
      </div>
    );
  }
  return <>{children}</>;
}
