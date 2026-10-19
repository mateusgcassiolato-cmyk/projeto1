"use client";

import { useState, type FormEvent } from "react";
import {
  Trophy,
  CalendarCheck,
  Users,
  TrendingUp,
  MessageCircle,
  Instagram,
  Star,
  Check,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Target,
  BarChart3,
  Megaphone,
  Smartphone,
  Clock,
  ShieldCheck,
  Phone,
  MapPin,
  Mail,
  Quote,
  Zap,
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
  "https://wa.me/5500000000000?text=Quero%20lotar%20as%20quadras%20do%20meu%20clube";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-court-950 text-white overflow-x-hidden selection:bg-ball-400 selection:text-court-950">
      <Header />
      <Hero />
      <StatsBar />
      <Problem />
      <HowItWorks />
      <Features />
      <Results />
      <Testimonials />
      <Offer />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ----------------------------- HEADER ----------------------------- */
function Header() {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const solid = y > 40;

  const links = [
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#beneficios", label: "Benefícios" },
    { href: "#resultados", label: "Resultados" },
    { href: "#planos", label: "Planos" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-court-950/80 backdrop-blur-lg border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-extrabold text-lg tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ball-400 text-court-950 shadow-lg shadow-ball-400/30">
            <TennisRacketIcon size={20} />
          </span>
          Match<span className="text-ball-400">Point</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-court-100">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ball-400 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contato"
            className="rounded-full bg-ball-400 px-5 py-2.5 text-sm font-bold text-court-950 hover:bg-ball-300 transition-colors shadow-lg shadow-ball-400/30"
          >
            Quero mais alunos
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
            className="block text-center mt-2 rounded-xl bg-ball-400 px-5 py-3 font-bold text-court-950"
          >
            Quero mais alunos
          </a>
        </div>
      )}
    </header>
  );
}

/* ------------------------------ HERO ------------------------------ */
function Hero() {
  const mouse = useMouseParallax(14);

  return (
    <section id="top" className="relative court-gradient">
      {/* Linhas da quadra em perspectiva */}
      <div className="pointer-events-none absolute inset-0 perspective">
        <div
          className="absolute inset-x-0 bottom-0 h-[70%] court-lines opacity-50"
          style={{ transform: "rotateX(62deg) scale(1.6)", transformOrigin: "bottom" }}
        />
      </div>

      {/* Brilhos / orbes com parallax */}
      <Parallax speed={0.25} className="pointer-events-none absolute -left-24 top-24">
        <div className="h-72 w-72 rounded-full bg-ball-400/20 blur-3xl" />
      </Parallax>
      <Parallax speed={0.4} className="pointer-events-none absolute right-0 top-40">
        <div className="h-80 w-80 rounded-full bg-court-400/20 blur-3xl" />
      </Parallax>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 pt-36 md:pt-44 pb-24 md:pb-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-ball-300">
              <Zap size={14} /> Marketing + Agenda para clubes de tênis e padel
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
              Lote suas quadras e{" "}
              <span className="text-gradient-ball">encha a agenda</span> de alunos o ano inteiro.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-lg text-court-100/90 max-w-xl">
              Atraímos novos alunos, preenchemos os horários ociosos e fidelizamos quem
              já joga no seu clube — com tráfego, agendamento online e automação de
              WhatsApp feitos sob medida para o esporte.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#contato"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ball-400 px-7 py-4 font-bold text-court-950 hover:bg-ball-300 transition-all shadow-xl shadow-ball-400/30 hover:-translate-y-0.5"
              >
                Quero lotar minhas quadras
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 font-semibold text-white hover:bg-white/15 transition-colors"
              >
                Ver como funciona
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex items-center gap-4 text-sm text-court-100/80">
              <div className="flex -space-x-2">
                {["#d8f84a", "#34d27f", "#16b866", "#0a7c45"].map((c) => (
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
                +120 clubes já jogam com a gente
              </div>
            </div>
          </Reveal>
        </div>

        {/* Visual 3D */}
        <div className="relative h-[420px] md:h-[520px] perspective">
          <div
            className="relative h-full w-full preserve-3d"
            style={{
              transform: `rotateY(${mouse.x}deg) rotateX(${-mouse.y}deg)`,
              transition: "transform .2s ease-out",
            }}
          >
            {/* Card de agenda flutuante */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-80 animate-float">
              <div className="rounded-3xl glass p-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <p className="font-bold">Agenda de hoje</p>
                  <span className="rounded-full bg-ball-400/20 px-2.5 py-1 text-xs font-semibold text-ball-300">
                    94% ocupada
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { h: "07:00", n: "Aula — Iniciante", c: "bg-ball-400" },
                    { h: "09:00", n: "Padel — Dupla", c: "bg-court-400" },
                    { h: "18:00", n: "Clínica de saque", c: "bg-ball-400" },
                    { h: "20:00", n: "Racha fixo", c: "bg-court-400" },
                  ].map((s) => (
                    <div key={s.h} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2">
                      <span className="text-xs text-court-100/70 w-10">{s.h}</span>
                      <span className={`h-2.5 w-2.5 rounded-full ${s.c}`} />
                      <span className="text-sm">{s.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bola de tênis 3D quicando */}
            <div className="absolute -top-2 right-6 animate-bounce-ball" style={{ transform: "translateZ(90px)" }}>
              <div className="relative">
                <TennisBall size={110} className="drop-shadow-2xl animate-spin-slow" />
              </div>
            </div>

            {/* Raquete de padel */}
            <Parallax speed={-0.15} className="absolute -bottom-2 -left-2">
              <PadelRacket size={150} className="drop-shadow-2xl animate-float-slow" />
            </Parallax>

            {/* Badge de métrica */}
            <div className="absolute bottom-10 right-0 rounded-2xl glass px-4 py-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-ball-400" size={20} />
                <div>
                  <p className="text-lg font-black leading-none">+38%</p>
                  <p className="text-[11px] text-court-100/70">novos alunos / mês</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onda inferior */}
      <div className="relative">
        <svg viewBox="0 0 1440 90" className="block w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60 C 360 10, 1080 110, 1440 40 L1440 90 L0 90 Z" fill="#052e1d" />
        </svg>
      </div>
    </section>
  );
}

/* ---------------------------- STATS BAR --------------------------- */
function StatsBar() {
  const items = [
    { icon: Users, to: 120, suffix: "+", label: "clubes atendidos" },
    { icon: CalendarCheck, to: 94, suffix: "%", label: "ocupação média" },
    { icon: Trophy, to: 38, suffix: "%", label: "mais alunos/mês" },
    { icon: Clock, to: 3, suffix: "x", label: "retorno sobre o investimento" },
  ];
  return (
    <section className="bg-court-950 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, to, suffix, label }, i) => (
          <Reveal key={label} delay={i * 80} className="rounded-2xl glass p-6 text-center">
            <Icon className="mx-auto text-ball-400" size={26} />
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
    "Quadras vazias nos horários de baixa procura, queimando faturamento.",
    "Alunos que somem depois de duas aulas e você não sabe por quê.",
    "Instagram parado e nenhum tempo para postar ou responder mensagem.",
    "Agenda no caderno ou no grupo do WhatsApp, com furos e conflitos.",
  ];
  return (
    <section className="bg-court-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="text-ball-400 font-semibold text-sm">O problema</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black leading-tight">
            Quadra parada é dinheiro saindo da sua conta.
          </h2>
          <p className="mt-4 text-court-100/80">
            A maioria dos clubes de tênis e padel não perde por falta de estrutura —
            perde por falta de previsibilidade. Sem um fluxo constante de novos alunos
            e sem organização da agenda, o faturamento vira uma montanha-russa.
          </p>
        </Reveal>
        <div className="space-y-3">
          {pains.map((p, i) => (
            <Reveal key={p} delay={i * 80} className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-4">
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

/* --------------------------- HOW IT WORKS ------------------------- */
function HowItWorks() {
  const steps = [
    {
      icon: Megaphone,
      title: "1. Atraímos",
      text: "Campanhas de tráfego pago e conteúdo para Instagram e Google que colocam seu clube na frente de quem quer jogar na sua região.",
    },
    {
      icon: CalendarCheck,
      title: "2. Agendamos",
      text: "Página de agendamento online e automação de WhatsApp: o aluno reserva a quadra ou a aula sozinho, sem você parar o que está fazendo.",
    },
    {
      icon: Users,
      title: "3. Fidelizamos",
      text: "Réguas de retorno, planos recorrentes e campanhas para turmas e torneios que transformam o visitante em aluno fixo.",
    },
  ];
  return (
    <section id="como-funciona" className="relative bg-court-900 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-ball-400 font-semibold text-sm">Como funciona</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">
            Um sistema simples em <span className="text-gradient-ball">3 movimentos</span>
          </h2>
          <p className="mt-4 text-court-100/80">
            Do primeiro clique à mensalidade recorrente — cuidamos de cada ponto do jogo.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 120} className="relative group">
              <div className="h-full rounded-3xl bg-court-950/60 border border-white/10 p-7 transition-all group-hover:-translate-y-1.5 group-hover:border-ball-400/40">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ball-400 text-court-950 shadow-lg shadow-ball-400/30">
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

/* ----------------------------- FEATURES --------------------------- */
function Features() {
  const feats = [
    { icon: Target, title: "Tráfego certeiro", text: "Anúncios segmentados por bairro, idade e interesse em tênis e padel." },
    { icon: Smartphone, title: "Agendamento online", text: "Reserva de quadras e aulas direto pelo celular, 24h por dia." },
    { icon: MessageCircle, title: "WhatsApp automático", text: "Confirmações, lembretes e reativação de alunos sem esforço manual." },
    { icon: Instagram, title: "Social media", text: "Calendário de posts, reels e stories que mostram a energia do clube." },
    { icon: BarChart3, title: "Painel de resultados", text: "Ocupação, novos alunos e retorno do investimento em tempo real." },
    { icon: ShieldCheck, title: "Planos recorrentes", text: "Mensalidades e pacotes que estabilizam o caixa do seu clube." },
  ];
  return (
    <section id="beneficios" className="bg-court-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-ball-400 font-semibold text-sm">Benefícios</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">
            Tudo que o seu clube precisa, em uma só quadra
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feats.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 100}
              className="group rounded-3xl bg-gradient-to-b from-white/[0.07] to-transparent border border-white/10 p-7 hover:border-ball-400/40 transition-colors"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-court-700/60 text-ball-400 group-hover:bg-ball-400 group-hover:text-court-950 transition-colors">
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

/* ----------------------------- RESULTS ---------------------------- */
function Results() {
  return (
    <section id="resultados" className="relative court-gradient py-20 md:py-28 overflow-hidden">
      <Parallax speed={0.3} className="pointer-events-none absolute -right-20 -top-10">
        <TennisBall size={220} className="opacity-20 animate-spin-slow" />
      </Parallax>
      <div className="relative mx-auto max-w-5xl px-4 md:px-8 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Resultados que cabem no <span className="text-gradient-ball">placar</span>
          </h2>
          <p className="mt-4 text-court-100/85 max-w-2xl mx-auto">
            Média dos clubes de tênis e padel nos primeiros 90 dias de trabalho conjunto.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { to: 38, suffix: "%", label: "novos alunos" },
            { to: 94, suffix: "%", label: "ocupação de pico" },
            { to: 61, suffix: "%", label: "menos faltas" },
            { to: 3, suffix: "x", label: "ROI do marketing" },
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
      text: "Em dois meses lotamos os horários da manhã, que antes ficavam vazios. O agendamento online acabou com a bagunça do WhatsApp.",
    },
    {
      name: "Carla Nogueira",
      role: "Sócia — Padel House Club",
      text: "A automação de mensagens trouxe de volta dezenas de alunos que tinham sumido. Hoje o caixa é previsível pela primeira vez.",
    },
    {
      name: "Diego Fontes",
      role: "Gestor — Smash Padel & Tennis",
      text: "O painel de resultados mostra exatamente quanto cada real investido em anúncio virou aula. Mudou minha forma de decidir.",
    },
  ];
  return (
    <section className="bg-court-900 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-ball-400 font-semibold text-sm">Depoimentos</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">
            Donos de clube que já estão na frente
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 110} className="rounded-3xl bg-court-950/60 border border-white/10 p-7">
              <Quote className="text-ball-400" size={28} />
              <p className="mt-4 text-court-100/90 leading-relaxed">“{q.text}”</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ball-400 font-bold text-court-950">
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
      tag: "Para começar",
      price: "997",
      highlight: false,
      features: ["Gestão de tráfego pago", "Agendamento online", "Relatório mensal", "Suporte por WhatsApp"],
    },
    {
      name: "Smash",
      tag: "Mais escolhido",
      price: "1.897",
      highlight: true,
      features: [
        "Tudo do plano Saque",
        "Automação de WhatsApp",
        "Social media (12 posts/mês)",
        "Campanhas de fidelização",
        "Painel de resultados ao vivo",
      ],
    },
    {
      name: "Grand Slam",
      tag: "Escala total",
      price: "3.497",
      highlight: false,
      features: ["Tudo do plano Smash", "Gestor dedicado", "Produção de vídeo no clube", "Torneios e eventos", "Estratégia de expansão"],
    },
  ];
  return (
    <section id="planos" className="bg-court-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-ball-400 font-semibold text-sm">Planos</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">Escolha o seu saque inicial</h2>
          <p className="mt-4 text-court-100/80">
            Sem fidelidade de longo prazo. Cancele quando quiser — mas duvidamos que vá querer.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 110}
              className={`relative flex flex-col rounded-3xl p-7 border ${
                p.highlight
                  ? "bg-gradient-to-b from-court-700 to-court-900 border-ball-400/60 shadow-2xl shadow-ball-400/10 md:-translate-y-4"
                  : "bg-court-900/60 border-white/10"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ball-400 px-4 py-1 text-xs font-bold text-court-950">
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
                    <Check size={18} className="text-ball-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold transition-all ${
                  p.highlight
                    ? "bg-ball-400 text-court-950 hover:bg-ball-300 shadow-lg shadow-ball-400/30"
                    : "glass text-white hover:bg-white/15"
                }`}
              >
                Começar agora <ArrowRight size={16} />
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
      q: "Funciona para clube de tênis e também de padel?",
      a: "Sim. Toda a estratégia é adaptada ao seu esporte e à sua cidade — seja um clube só de tênis, só de padel ou com as duas modalidades.",
    },
    {
      q: "Preciso ter perfil no Instagram ou site pronto?",
      a: "Não. Montamos o que faltar: página de agendamento, perfil otimizado e as peças de campanha. Você só precisa das quadras e da vontade de lotá-las.",
    },
    {
      q: "Em quanto tempo vejo resultado?",
      a: "As primeiras reservas vindas de anúncio costumam aparecer na primeira ou segunda semana. O ganho consistente de alunos é medido já nos primeiros 30 a 90 dias.",
    },
    {
      q: "Vocês cuidam do investimento em anúncios?",
      a: "Nós gerenciamos as campanhas; a verba de mídia (o valor pago às plataformas) é definida com você e fica na sua conta de anúncios. Recomendamos o melhor valor para a sua meta.",
    },
    {
      q: "Existe fidelidade ou multa?",
      a: "Trabalhamos com contrato mensal. Pedimos um período mínimo de 90 dias para a estratégia maturar, mas sem multas abusivas.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-court-900 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <Reveal className="text-center">
          <span className="text-ball-400 font-semibold text-sm">Dúvidas frequentes</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">Antes de entrar em quadra</h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left rounded-2xl bg-court-950/60 border border-white/10 p-5 hover:border-ball-400/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold">{f.q}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-ball-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
      <Parallax speed={0.35} className="pointer-events-none absolute -left-16 bottom-0">
        <PadelRacket size={200} className="opacity-20" />
      </Parallax>
      <Parallax speed={0.5} className="pointer-events-none absolute right-10 top-10">
        <TennisBall size={120} className="opacity-25 animate-spin-slow" />
      </Parallax>

      <div className="relative mx-auto max-w-6xl px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-black leading-[1.1]">
            Pronto para ver suas quadras <span className="text-gradient-ball">lotadas?</span>
          </h2>
          <p className="mt-5 text-court-100/90 text-lg">
            Receba um diagnóstico gratuito do potencial do seu clube. Em 20 minutos
            mostramos quantos alunos a mais você pode conquistar na sua região.
          </p>
          <ul className="mt-8 space-y-3">
            {["Diagnóstico sem compromisso", "Plano de ação personalizado", "Resposta em até 1 dia útil"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-court-100">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ball-400 text-court-950">
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
            <MessageCircle size={18} className="text-ball-400" /> Prefiro falar no WhatsApp
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl bg-court-950/80 backdrop-blur border border-white/10 p-7 md:p-8 shadow-2xl">
            {sent ? (
              <div className="text-center py-10">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ball-400 text-court-950">
                  <Check size={30} />
                </div>
                <h3 className="mt-5 text-2xl font-black">Game, set, match! 🎾</h3>
                <p className="mt-2 text-court-100/80">
                  Recebemos seus dados. Nossa equipe vai entrar em contato em breve com o
                  diagnóstico do seu clube.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold">Peça seu diagnóstico gratuito</h3>
                <p className="mt-1 text-sm text-court-100/70">
                  Preencha e entraremos em contato com um plano para o seu clube.
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
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ball-400 px-6 py-4 font-bold text-court-950 hover:bg-ball-300 transition-colors shadow-lg shadow-ball-400/30"
                  >
                    Quero meu diagnóstico <ArrowRight size={18} />
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
  "w-full rounded-xl bg-white/5 border border-white/15 px-10 py-3 text-sm text-white placeholder:text-court-100/40 outline-none focus:border-ball-400 focus:ring-2 focus:ring-ball-400/30 transition";

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
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ball-400">
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
    <footer className="bg-court-950 border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid md:grid-cols-4 gap-8">
        <div>
          <a href="#top" className="flex items-center gap-2 font-extrabold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-ball-400 text-court-950">
              <TennisRacketIcon size={20} />
            </span>
            Match<span className="text-ball-400">Point</span>
          </a>
          <p className="mt-4 text-sm text-court-100/60 max-w-xs">
            Marketing e gestão de agenda para clubes de tênis e padel que querem
            jogar para ganhar.
          </p>
        </div>

        <FooterCol title="Navegação" links={["Como funciona", "Benefícios", "Resultados", "Planos", "FAQ"]} />
        <FooterCol title="Modalidades" links={["Tênis", "Padel", "Beach Tennis", "Multiesportes"]} />

        <div>
          <p className="font-semibold text-sm">Fale com a gente</p>
          <ul className="mt-4 space-y-3 text-sm text-court-100/70">
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-ball-400" /> (00) 00000-0000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-ball-400" /> contato@matchpoint.com.br
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={15} className="text-ball-400" /> @matchpoint
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
            <a href="#top" className="hover:text-ball-400 transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
