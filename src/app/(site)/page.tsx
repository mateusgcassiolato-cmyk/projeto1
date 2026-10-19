"use client";

import { useState, type FormEvent } from "react";
import {
  Trophy,
  CalendarCheck,
  Users,
  CreditCard,
  Wallet,
  Smartphone,
  MessageCircle,
  BarChart3,
  GraduationCap,
  Bell,
  LineChart,
  ShieldCheck,
  Clock,
  Check,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Star,
  Phone,
  MapPin,
  Mail,
  Quote,
  Zap,
  Instagram,
  Sparkles,
} from "lucide-react";
import {
  Parallax,
  Reveal,
  Counter,
  useScrollY,
  useMouseParallax,
} from "@/components/landing/motion";
import {
  TennisBall,
  PadelRacket,
  TennisRacketIcon,
} from "@/components/landing/graphics";

const WHATSAPP =
  "https://wa.me/5500000000000?text=Quero%20conhecer%20o%20sistema%20de%20gest%C3%A3o%20MatchPoint";

export default function LandingPage() {
  return (
    <div className="min-h-screen app-bg text-white overflow-x-hidden selection:bg-aqua-400 selection:text-court-950">
      <Header />
      <Hero />
      <StatsBar />
      <Problem />
      <Modules />
      <HowItWorks />
      <Showcase />
      <Results />
      <Testimonials />
      <Offer />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}

/** Blobs coloridos de fundo (aurora). */
function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`aurora ${className}`} aria-hidden="true">
      <span
        className="h-80 w-80"
        style={{ left: "6%", top: "8%", background: "#3ee9d4", animationDelay: "0s" }}
      />
      <span
        className="h-96 w-96"
        style={{ right: "4%", top: "0%", background: "#16b866", animationDelay: "-6s" }}
      />
      <span
        className="h-72 w-72"
        style={{ left: "40%", bottom: "0%", background: "#c6ef22", opacity: 0.35, animationDelay: "-11s" }}
      />
    </div>
  );
}

/* ----------------------------- HEADER ----------------------------- */
function Header() {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const solid = y > 40;

  const links = [
    { href: "#recursos", label: "Recursos" },
    { href: "#como-funciona", label: "Como começar" },
    { href: "#resultados", label: "Resultados" },
    { href: "#planos", label: "Planos" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl transition-all duration-300 ${
            solid ? "glass px-4 py-2.5" : "px-0 py-0"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 font-extrabold text-lg tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-ball-400 to-aqua-400 text-court-950 shadow-lg shadow-aqua-400/30">
              <TennisRacketIcon size={20} />
            </span>
            Match<span className="text-aqua-400">Point</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-court-100">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-aqua-300 transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contato"
              className="rounded-full bg-gradient-to-r from-ball-400 to-aqua-400 px-5 py-2.5 text-sm font-bold text-court-950 hover:brightness-105 transition shadow-lg shadow-aqua-400/30"
            >
              Agendar demonstração
            </a>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mx-4 mt-3 rounded-2xl glass p-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-court-100 hover:bg-white/10"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="block text-center mt-2 rounded-xl bg-gradient-to-r from-ball-400 to-aqua-400 px-5 py-3 font-bold text-court-950"
          >
            Agendar demonstração
          </a>
        </div>
      )}
    </header>
  );
}

/* ------------------------------ HERO ------------------------------ */
function Hero() {
  const mouse = useMouseParallax(12);

  return (
    <section id="top" className="relative court-gradient">
      <Aurora />
      {/* Linhas da quadra em perspectiva */}
      <div className="pointer-events-none absolute inset-0 perspective">
        <div
          className="absolute inset-x-0 bottom-0 h-[70%] court-lines opacity-40"
          style={{ transform: "rotateX(62deg) scale(1.6)", transformOrigin: "bottom" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 pt-36 md:pt-44 pb-24 md:pb-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-aqua-300">
              <Sparkles size={14} /> O sistema completo de gestão para clubes
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
              Toda a gestão do seu clube{" "}
              <span className="text-gradient-ball">em um só lugar.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-lg text-court-100/90 max-w-xl">
              Reserva de quadras, alunos, turmas, mensalidades, financeiro e app para o
              aluno — tudo integrado. Chega de planilhas, caderno e grupos de WhatsApp
              bagunçados para administrar seu clube de tênis ou padel.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#contato"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ball-400 to-aqua-400 px-7 py-4 font-bold text-court-950 hover:brightness-105 transition-all shadow-xl shadow-aqua-400/30 hover:-translate-y-0.5"
              >
                Testar grátis por 14 dias
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#recursos"
                className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/15 transition-colors"
              >
                Ver recursos
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex items-center gap-4 text-sm text-court-100/80">
              <div className="flex -space-x-2">
                {["#d8f84a", "#7ff5e4", "#34e3d0", "#16b866"].map((c) => (
                  <span
                    key={c}
                    className="h-8 w-8 rounded-full border-2 border-court-950"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div>
                <div className="flex text-ball-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                +120 clubes já gerenciam com o MatchPoint
              </div>
            </div>
          </Reveal>
        </div>

        {/* Visual 3D */}
        <div className="relative h-[440px] md:h-[540px] perspective">
          <div
            className="relative h-full w-full preserve-3d"
            style={{
              transform: `rotateY(${mouse.x}deg) rotateX(${-mouse.y}deg)`,
              transition: "transform .2s ease-out",
            }}
          >
            {/* Card principal: dashboard do clube */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-[22rem] animate-float">
              <div className="rounded-3xl glass p-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-court-100/60">Painel do clube</p>
                    <p className="font-bold text-lg">R$ 48.250</p>
                    <p className="text-[11px] text-aqua-300">faturamento do mês · +18%</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-aqua-400/20 text-aqua-300">
                    <LineChart size={20} />
                  </span>
                </div>

                {/* mini gráfico */}
                <div className="mt-4 flex items-end gap-1.5 h-16">
                  {[40, 55, 48, 70, 62, 85, 78].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-aqua-500/40 to-ball-400"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-white/5 px-3 py-2">
                    <p className="text-[11px] text-court-100/60">Ocupação</p>
                    <p className="font-bold">94%</p>
                  </div>
                  <div className="rounded-xl bg-white/5 px-3 py-2">
                    <p className="text-[11px] text-court-100/60">Inadimplência</p>
                    <p className="font-bold text-aqua-300">2,1%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de notificação flutuante */}
            <div className="absolute -top-2 right-0 w-56 animate-float" style={{ animationDelay: "0.8s" }}>
              <div className="rounded-2xl glass px-4 py-3 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-ball-400/20 text-ball-400">
                  <CreditCard size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">Mensalidade paga</p>
                  <p className="text-[11px] text-court-100/60">Ana R. · R$ 320 via Pix</p>
                </div>
              </div>
            </div>

            {/* Bola de tênis 3D quicando */}
            <div className="absolute top-6 left-2 animate-bounce-ball" style={{ transform: "translateZ(80px)" }}>
              <TennisBall size={92} className="drop-shadow-2xl animate-spin-slow" />
            </div>

            {/* Raquete de padel */}
            <Parallax speed={-0.15} className="absolute -bottom-4 -left-2">
              <PadelRacket size={140} className="drop-shadow-2xl animate-float-slow" />
            </Parallax>

            {/* Badge reserva */}
            <div className="absolute bottom-6 right-2 rounded-2xl glass px-4 py-3 animate-float" style={{ animationDelay: "1.4s" }}>
              <div className="flex items-center gap-2">
                <CalendarCheck className="text-aqua-300" size={20} />
                <div>
                  <p className="text-sm font-bold leading-none">Quadra 3 reservada</p>
                  <p className="text-[11px] text-court-100/60">hoje · 18h–19h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onda inferior */}
      <div className="relative z-10">
        <svg viewBox="0 0 1440 90" className="block w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60 C 360 10, 1080 110, 1440 40 L1440 90 L0 90 Z" fill="#041f16" />
        </svg>
      </div>
    </section>
  );
}

/* ---------------------------- STATS BAR --------------------------- */
function StatsBar() {
  const items = [
    { icon: Users, to: 120, suffix: "+", label: "clubes usando" },
    { icon: CalendarCheck, to: 85, suffix: "mil", label: "reservas por mês" },
    { icon: Clock, to: 12, suffix: "h", label: "economizadas por semana" },
    { icon: Wallet, to: 60, suffix: "%", label: "menos inadimplência" },
  ];
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, to, suffix, label }, i) => (
          <Reveal key={label} delay={i * 80} className="rounded-2xl glass p-6 text-center">
            <Icon className="mx-auto text-aqua-300" size={26} />
            <div className="mt-3 text-3xl md:text-4xl font-black">
              <Counter to={to} suffix={suffix} />
            </div>
            <p className="mt-1 text-sm text-court-100/70">{label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- PROBLEM ---------------------------- */
function Problem() {
  const pains = [
    "Agenda no caderno ou no grupo do WhatsApp, com reservas duplicadas e furos.",
    "Planilhas espalhadas para controlar alunos, turmas e pagamentos.",
    "Mensalidades atrasadas que você só percebe quando falta dinheiro no caixa.",
    "Nenhuma visão clara de ocupação, faturamento e desempenho do clube.",
  ];
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="text-aqua-300 font-semibold text-sm">O problema</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black leading-tight">
            Gerir o clube não deveria ser um quebra-cabeça.
          </h2>
          <p className="mt-4 text-court-100/80">
            A maioria dos clubes de tênis e padel perde tempo e dinheiro com processos
            manuais e ferramentas desconectadas. O MatchPoint reúne tudo em um só
            sistema, feito para o dia a dia de quem vive o esporte.
          </p>
        </Reveal>
        <div className="space-y-3">
          {pains.map((p, i) => (
            <Reveal key={p} delay={i * 80} className="flex items-start gap-3 rounded-2xl glass-soft p-4">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-500/20 text-red-300">
                <X size={16} />
              </span>
              <p className="text-court-100/90">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- MODULES ---------------------------- */
function Modules() {
  const feats = [
    { icon: CalendarCheck, title: "Reserva de quadras", text: "Agenda visual em tempo real e reserva online pelo aluno, sem conflitos de horário." },
    { icon: GraduationCap, title: "Alunos & turmas", text: "Cadastro completo, matrículas, presença e histórico de cada aluno e turma." },
    { icon: CreditCard, title: "Mensalidades & Pix", text: "Cobrança recorrente automática, pagamentos por Pix, cartão e boleto em um clique." },
    { icon: Wallet, title: "Controle financeiro", text: "Fluxo de caixa, contas a pagar e receber e relatórios de faturamento do clube." },
    { icon: Smartphone, title: "App para o aluno", text: "O aluno reserva, paga e acompanha as aulas pelo celular, com a marca do seu clube." },
    { icon: MessageCircle, title: "Automação de WhatsApp", text: "Lembretes de aula, confirmação de reserva e avisos de cobrança enviados sozinhos." },
    { icon: BarChart3, title: "Relatórios & dashboards", text: "Ocupação, inadimplência e desempenho em painéis claros para decidir com dados." },
    { icon: Trophy, title: "Torneios & eventos", text: "Monte chaves, inscrições e rankings de torneios e rachas do seu clube." },
    { icon: Bell, title: "Avisos e comunicação", text: "Comunique turmas, times e sócios por push e WhatsApp sem sair do sistema." },
  ];
  return (
    <section id="recursos" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-aqua-300 font-semibold text-sm">Recursos</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">
            Um sistema, <span className="text-gradient-ball">todos os módulos</span>
          </h2>
          <p className="mt-4 text-court-100/80">
            Tudo que o seu clube precisa para funcionar sem papel, sem planilha e sem dor de cabeça.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feats.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 100}
              className="group rounded-3xl glass-soft p-7 hover:bg-white/[0.07] transition-colors"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-aqua-500/30 to-court-700/40 text-aqua-300 group-hover:from-ball-400 group-hover:to-aqua-400 group-hover:text-court-950 transition-colors">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-court-100/75">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- HOW IT WORKS ------------------------- */
function HowItWorks() {
  const steps = [
    {
      icon: Sparkles,
      title: "1. Configuramos para você",
      text: "Importamos seus alunos, quadras e turmas. Em poucos dias o sistema está pronto com a cara do seu clube.",
    },
    {
      icon: Users,
      title: "2. Sua equipe começa a usar",
      text: "Recepção, professores e gestão trabalham no mesmo lugar. Treinamento incluído e suporte humano de verdade.",
    },
    {
      icon: LineChart,
      title: "3. Você acompanha tudo",
      text: "Agenda cheia, pagamentos em dia e um painel com a saúde do clube na palma da mão, de onde estiver.",
    },
  ];
  return (
    <section id="como-funciona" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-aqua-300 font-semibold text-sm">Como começar</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">
            No ar em <span className="text-gradient-ball">3 passos</span>
          </h2>
          <p className="mt-4 text-court-100/80">
            Migração sem complicação. Você joga, a gente cuida da virada de chave.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 120} className="relative group">
              <div className="h-full rounded-3xl glass p-7 transition-all group-hover:-translate-y-1.5">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-ball-400 to-aqua-400 text-court-950 shadow-lg shadow-aqua-400/30">
                  <Icon size={26} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-court-100/80">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SHOWCASE --------------------------- */
function Showcase() {
  const points = [
    "Agenda unificada de todas as quadras e professores",
    "Reserva e pagamento online direto pelo app do aluno",
    "Cobrança recorrente automática com baixa de inadimplência",
    "Relatórios de ocupação e faturamento em tempo real",
  ];
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
        {/* Mock de tela */}
        <Reveal>
          <div className="relative perspective">
            <div className="rounded-[2rem] glass p-5" style={{ transform: "rotateY(-8deg) rotateX(4deg)" }}>
              <div className="flex items-center gap-1.5 mb-4">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-ball-400/70" />
                <span className="h-3 w-3 rounded-full bg-aqua-400/70" />
                <span className="ml-3 text-xs text-court-100/50">MatchPoint · Agenda</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-[10px]">
                {["Quadra 1", "Quadra 2", "Quadra 3", "Padel 1"].map((q) => (
                  <div key={q} className="rounded-lg bg-white/5 px-2 py-1 text-center text-court-100/70">{q}</div>
                ))}
                {[
                  ["bg-ball-400/80", "bg-aqua-400/70", "", "bg-court-400/70"],
                  ["bg-aqua-400/70", "", "bg-ball-400/80", "bg-ball-400/60"],
                  ["", "bg-court-400/70", "bg-aqua-400/70", ""],
                  ["bg-ball-400/70", "bg-ball-400/60", "bg-aqua-400/70", "bg-court-400/70"],
                ].map((row, r) =>
                  row.map((c, ci) => (
                    <div
                      key={`${r}-${ci}`}
                      className={`h-10 rounded-lg ${c || "bg-white/[0.04]"} flex items-center justify-center text-court-950/80 font-semibold`}
                    >
                      {c ? `${8 + r}h` : ""}
                    </div>
                  ))
                )}
              </div>
            </div>
            <Parallax speed={0.3} className="pointer-events-none absolute -right-6 -top-8">
              <TennisBall size={70} className="animate-spin-slow drop-shadow-xl" />
            </Parallax>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="text-aqua-300 font-semibold text-sm">Na prática</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black leading-tight">
            Da recepção ao financeiro, tudo conversa entre si
          </h2>
          <p className="mt-4 text-court-100/80">
            Uma reserva vira cobrança, que vira recibo, que entra no relatório — sem
            retrabalho. O MatchPoint elimina as planilhas paralelas e dá ao dono do
            clube o controle total da operação.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-court-100/90">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-aqua-400/20 text-aqua-300">
                  <Check size={16} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ball-400 to-aqua-400 px-6 py-3.5 font-bold text-court-950 hover:brightness-105 transition shadow-lg shadow-aqua-400/30"
          >
            Quero ver na prática <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- RESULTS ---------------------------- */
function Results() {
  return (
    <section id="resultados" className="relative court-gradient py-20 md:py-28 overflow-hidden">
      <Aurora />
      <Parallax speed={0.3} className="pointer-events-none absolute -right-20 -top-10 z-10">
        <TennisBall size={200} className="opacity-20 animate-spin-slow" />
      </Parallax>
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Resultados que cabem no <span className="text-gradient-ball">placar</span>
          </h2>
          <p className="mt-4 text-court-100/85 max-w-2xl mx-auto">
            Média dos clubes nos primeiros 90 dias usando o sistema MatchPoint.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { to: 12, suffix: "h", label: "economizadas/semana" },
            { to: 94, suffix: "%", label: "ocupação de pico" },
            { to: 60, suffix: "%", label: "menos inadimplência" },
            { to: 100, suffix: "%", label: "operação sem planilhas" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="rounded-3xl glass p-6">
              <div className="text-4xl md:text-5xl font-black text-ball-400">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-court-100/80">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- TESTIMONIALS ------------------------- */
function Testimonials() {
  const quotes = [
    {
      name: "Rafael Menezes",
      role: "Dono — Arena Set Point (Tênis)",
      text: "Larguei três planilhas e o caderno de reservas. Hoje vejo a agenda e o caixa do clube pelo celular, de qualquer lugar.",
    },
    {
      name: "Carla Nogueira",
      role: "Sócia — Padel House Club",
      text: "A cobrança automática derrubou a inadimplência. Os alunos pagam no Pix pelo app e eu nem preciso cobrar ninguém.",
    },
    {
      name: "Diego Fontes",
      role: "Gestor — Smash Padel & Tennis",
      text: "A recepção, os professores e eu trabalhamos no mesmo sistema. Acabou o retrabalho e ninguém mais se perde nos horários.",
    },
  ];
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-aqua-300 font-semibold text-sm">Depoimentos</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">
            Donos de clube que trocaram a planilha pelo MatchPoint
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 110} className="rounded-3xl glass p-7">
              <Quote className="text-aqua-300" size={28} />
              <p className="mt-4 text-court-100/90 leading-relaxed">“{q.text}”</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-ball-400 to-aqua-400 font-bold text-court-950">
                  {q.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold">{q.name}</p>
                  <p className="text-xs text-court-100/60">{q.role}</p>
                </div>
              </div>
              <div className="mt-4 flex text-ball-400">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} fill="currentColor" />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ OFFER ----------------------------- */
function Offer() {
  const plans = [
    {
      name: "Saque",
      tag: "Clubes pequenos",
      price: "197",
      highlight: false,
      features: ["Até 2 quadras", "Reserva e agenda online", "Gestão de alunos e turmas", "Mensalidades no Pix", "Suporte por WhatsApp"],
    },
    {
      name: "Smash",
      tag: "Mais escolhido",
      price: "397",
      highlight: true,
      features: [
        "Tudo do plano Saque",
        "Quadras ilimitadas",
        "App com a marca do clube",
        "Automação de WhatsApp",
        "Controle financeiro completo",
        "Relatórios e dashboards",
      ],
    },
    {
      name: "Grand Slam",
      tag: "Rede & alto volume",
      price: "697",
      highlight: false,
      features: ["Tudo do plano Smash", "Múltiplas unidades", "Torneios e rankings", "Gestor de contas dedicado", "Integrações e API"],
    },
  ];
  return (
    <section id="planos" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-aqua-300 font-semibold text-sm">Planos</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">Um plano para cada fase do clube</h2>
          <p className="mt-4 text-court-100/80">
            14 dias grátis em qualquer plano. Sem cartão para começar, sem fidelidade.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 110}
              className={`relative flex flex-col rounded-3xl p-7 ${
                p.highlight
                  ? "glass shadow-2xl shadow-aqua-400/10 md:-translate-y-4"
                  : "glass-soft"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-ball-400 to-aqua-400 px-4 py-1 text-xs font-bold text-court-950">
                  {p.tag}
                </span>
              )}
              {!p.highlight && <span className="text-xs font-semibold text-court-100/60">{p.tag}</span>}
              <h3 className="mt-2 text-2xl font-black">{p.name}</h3>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-sm text-court-100/70">R$</span>
                <span className="text-4xl font-black">{p.price}</span>
                <span className="text-sm text-court-100/70">/mês</span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-court-100/90">
                    <Check size={18} className="text-aqua-300 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold transition-all ${
                  p.highlight
                    ? "bg-gradient-to-r from-ball-400 to-aqua-400 text-court-950 hover:brightness-105 shadow-lg shadow-aqua-400/30"
                    : "glass text-white hover:bg-white/15"
                }`}
              >
                Testar grátis <ArrowRight size={16} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- FAQ ------------------------------ */
function Faq() {
  const faqs = [
    {
      q: "Serve para clube de tênis e também de padel?",
      a: "Sim. O MatchPoint gerencia quadras de tênis, padel, beach tennis ou clubes com várias modalidades ao mesmo tempo.",
    },
    {
      q: "Preciso instalar algo? Funciona no celular?",
      a: "É 100% na nuvem. A gestão funciona no navegador do computador e do celular, e seus alunos usam o app para reservar e pagar.",
    },
    {
      q: "Vocês ajudam a migrar meus dados?",
      a: "Sim. Importamos sua base de alunos, quadras e turmas e configuramos o sistema com a cara do seu clube. Treinamento incluído.",
    },
    {
      q: "Como funcionam as mensalidades e pagamentos?",
      a: "O sistema gera cobrança recorrente automática e aceita Pix, cartão e boleto. O aluno paga pelo app e a baixa é automática no financeiro.",
    },
    {
      q: "Tem fidelidade? Posso cancelar?",
      a: "Sem fidelidade. Você testa grátis por 14 dias e segue no plano mensal enquanto fizer sentido — cancela quando quiser.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <Reveal className="text-center">
          <span className="text-aqua-300 font-semibold text-sm">Dúvidas frequentes</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">Antes de entrar em quadra</h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left rounded-2xl glass-soft p-5 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold">{f.q}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-aqua-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-3 text-court-100/80">{f.a}</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- FINAL CTA --------------------------- */
function FinalCta() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contato" className="relative court-gradient py-20 md:py-28 overflow-hidden">
      <Aurora />
      <Parallax speed={0.35} className="pointer-events-none absolute -left-16 bottom-0 z-10">
        <PadelRacket size={200} className="opacity-20" />
      </Parallax>
      <Parallax speed={0.5} className="pointer-events-none absolute right-10 top-10 z-10">
        <TennisBall size={120} className="opacity-25 animate-spin-slow" />
      </Parallax>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-black leading-[1.1]">
            Pronto para gerir seu clube <span className="text-gradient-ball">no automático?</span>
          </h2>
          <p className="mt-5 text-court-100/90 text-lg">
            Agende uma demonstração gratuita. Em 20 minutos mostramos o MatchPoint
            funcionando com a realidade do seu clube — e você já sai testando.
          </p>
          <ul className="mt-8 space-y-3">
            {["14 dias grátis, sem cartão", "Migração e treinamento inclusos", "Suporte humano de verdade"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-court-100">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-ball-400 to-aqua-400 text-court-950">
                  <Check size={16} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 font-semibold text-white hover:bg-white/15 transition-colors"
          >
            <MessageCircle size={18} className="text-aqua-300" /> Prefiro falar no WhatsApp
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl glass p-7 md:p-8 shadow-2xl">
            {sent ? (
              <div className="text-center py-10">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-ball-400 to-aqua-400 text-court-950">
                  <Check size={30} />
                </div>
                <h3 className="mt-5 text-2xl font-black">Game, set, match! 🎾</h3>
                <p className="mt-2 text-court-100/80">
                  Recebemos seus dados. Nossa equipe vai entrar em contato para agendar
                  sua demonstração e liberar o teste grátis.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold">Agende sua demonstração gratuita</h3>
                <p className="mt-1 text-sm text-court-100/70">
                  Preencha e liberamos seu acesso de teste por 14 dias.
                </p>
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <Field label="Seu nome" icon={<Users size={16} />}>
                    <input required name="nome" placeholder="Nome completo" className={inputCls} />
                  </Field>
                  <Field label="WhatsApp" icon={<Phone size={16} />}>
                    <input required name="whats" type="tel" placeholder="(00) 00000-0000" className={inputCls} />
                  </Field>
                  <Field label="Nome do clube" icon={<Trophy size={16} />}>
                    <input required name="clube" placeholder="Ex.: Arena Set Point" className={inputCls} />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Cidade" icon={<MapPin size={16} />}>
                      <input required name="cidade" placeholder="Cidade/UF" className={inputCls} />
                    </Field>
                    <Field label="Modalidade" icon={<TennisRacketIcon size={16} />}>
                      <select name="modalidade" className={inputCls}>
                        <option className="text-court-950">Tênis</option>
                        <option className="text-court-950">Padel</option>
                        <option className="text-court-950">Tênis e Padel</option>
                        <option className="text-court-950">Beach Tennis</option>
                      </select>
                    </Field>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ball-400 to-aqua-400 px-6 py-4 font-bold text-court-950 hover:brightness-105 transition shadow-lg shadow-aqua-400/30"
                  >
                    Quero minha demonstração <ArrowRight size={18} />
                  </button>
                  <p className="text-center text-xs text-court-100/50">
                    Seus dados estão seguros. Sem spam, prometido.
                  </p>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl bg-white/5 border border-white/15 px-10 py-3 text-sm text-white placeholder:text-court-100/40 outline-none focus:border-aqua-400 focus:ring-2 focus:ring-aqua-400/30 transition";

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-court-100/70">{label}</span>
      <span className="relative mt-1 block">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-aqua-300">
          {icon}
        </span>
        {children}
      </span>
    </label>
  );
}

/* ------------------------------ FOOTER ---------------------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid md:grid-cols-4 gap-8">
        <div>
          <a href="#top" className="flex items-center gap-2 font-extrabold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-ball-400 to-aqua-400 text-court-950">
              <TennisRacketIcon size={20} />
            </span>
            Match<span className="text-aqua-400">Point</span>
          </a>
          <p className="mt-4 text-sm text-court-100/60 max-w-xs">
            O sistema completo de gestão para clubes de tênis e padel. Agenda, alunos,
            pagamentos e financeiro em um só lugar.
          </p>
        </div>

        <FooterCol title="Produto" links={["Recursos", "Como começar", "Resultados", "Planos", "FAQ"]} />
        <FooterCol title="Modalidades" links={["Tênis", "Padel", "Beach Tennis", "Multiesportes"]} />

        <div>
          <p className="font-semibold text-sm">Fale com a gente</p>
          <ul className="mt-4 space-y-3 text-sm text-court-100/70">
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-aqua-300" /> (00) 00000-0000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-aqua-300" /> contato@matchpoint.com.br
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={15} className="text-aqua-300" /> @matchpoint
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-court-100/50">
        <p>© {new Date().getFullYear()} MatchPoint. Todos os direitos reservados.</p>
        <p>Feito com 🎾 para quem vive o esporte.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="font-semibold text-sm">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-court-100/70">
        {links.map((l) => (
          <li key={l}>
            <a href="#top" className="hover:text-aqua-300 transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
