"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";
import type { z } from "zod";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Shield, CheckCircle2, Rocket, Wand2, Workflow, FileText, Bot,
  GraduationCap, Briefcase, Code2, Star, ChevronDown, PlayCircle,
  MessageCircle, ArrowRight, Trophy, Gift, Flame, CheckCheck, Lock,
  Calendar, Video, Clock, Search, Mail, Zap, Users,
} from "lucide-react";
import hostImage from "@/assets/My_Pic.jpeg";

const webinarDate =
  process.env.NEXT_PUBLIC_WEBINAR_DATE ||
  process.env.WEBINAR_DATE ||
  "2026-05-15T19:00:00+05:30";

type FormData = z.infer<typeof registerSchema>;
type Role = FormData["role"];

// —————————————————————————————————————————————————————————————————
// CONTENT
// —————————————————————————————————————————————————————————————————

const TICKER_ITEMS = [
  { name: "Priya S.",       city: "Pune",      role: "Marketing Manager" },
  { name: "Rahul M.",       city: "Bengaluru", role: "Software Engineer" },
  { name: "Ananya K.",      city: "Delhi",     role: "Final Year Student" },
  { name: "Karthik R.",     city: "Chennai",   role: "Sales Lead" },
  { name: "Sneha P.",       city: "Mumbai",    role: "HR Specialist" },
  { name: "Arjun V.",       city: "Hyderabad", role: "Product Analyst" },
  { name: "Neha T.",        city: "Gurgaon",   role: "Operations" },
  { name: "Siddharth J.",   city: "Kolkata",   role: "Freelancer" },
  { name: "Ishita G.",      city: "Ahmedabad", role: "Content Creator" },
  { name: "Rohit D.",       city: "Noida",     role: "Data Analyst" },
];

const LOGOS = [
  "Zoom", "Razorpay", "Google Meet", "ChatGPT", "Claude", "Gemini", "Notion AI",
  "Perplexity", "Zapier", "Make", "Canva AI", "Grammarly",
];

const COUNTRY_CODES = [
  { label: "IN (+91)", value: "+91" },
  { label: "US (+1)", value: "+1" },
  { label: "UK (+44)", value: "+44" },
  { label: "SG (+65)", value: "+65" },
  { label: "AE (+971)", value: "+971" },
];

const LEARN_TABS = [
  {
    id: "prompt",
    label: "Prompt",
    icon: Wand2,
    title: "Prompt like a pro — every single time",
    bullets: [
      "The 4-part CRAC framework used by AI power-users",
      "15 copy-paste templates for the most common work tasks",
      "How to get precise, structured answers — not generic fluff",
    ],
  },
  {
    id: "automate",
    label: "Automate",
    icon: Workflow,
    title: "Build automations — without writing a single line of code",
    bullets: [
      "Connect ChatGPT to Gmail, Sheets, and Calendar using no-code tools",
      "5 plug-and-play workflows you can install right after the session",
      "Save 10+ hours a week on repetitive, mind-numbing tasks",
    ],
  },
  {
    id: "produce",
    label: "Produce",
    icon: FileText,
    title: "Turn blank pages into finished work — in minutes",
    bullets: [
      "Draft emails, reports, and decks that actually sound like you",
      "Summarise 30-page PDFs into a 2-minute read",
      "Research any topic faster than Google ever could",
    ],
  },
  {
    id: "tools",
    label: "Tool Stack",
    icon: Bot,
    title: "Your personal AI toolkit — curated & categorised",
    bullets: [
      "20+ AI tools organised by use case (with free-tier flags)",
      "Which ones are worth paying for — and which are a waste",
      "A printable tool-map you'll keep coming back to",
    ],
  },
] as const;

const AGENDA = [
  { time: "0:00 – 0:15", title: "The AI Landscape in 2026", detail: "What's real, what's hype, and where the actual time-savings live.", icon: Sparkles },
  { time: "0:15 – 0:45", title: "Live Demo: ChatGPT + Claude for real work", detail: "We'll take 4 real tasks — an email, a report, a research doc, a deck — and build them live in front of you.", icon: PlayCircle },
  { time: "0:45 – 1:15", title: "Build Your First Automation (Live)", detail: "Watch me build a no-code AI automation from scratch. You'll have the template to copy right after.", icon: Workflow },
  { time: "1:15 – 1:35", title: "The 20-Tool AI Stack Walkthrough", detail: "A rapid-fire tour of the exact tools I use every week — free-tier flags included.", icon: Bot },
  { time: "1:35 – 1:50", title: "Live Q&A with the Host", detail: "Bring your hardest questions. Everyone gets an answer — no scripted nonsense.", icon: MessageCircle },
  { time: "1:50 – 2:00", title: "Your 7-Day Action Plan", detail: "A printable checklist so you don't walk away inspired and then do nothing.", icon: Trophy },
];

const TESTIMONIALS = [
  {
    name: "Meera R.",
    role: "Marketing Manager, Bengaluru",
    quote: "Paid ₹99 expecting a basic webinar. Walked away with 3 automations that now save me 12+ hours a week. Best ₹99 I've spent this year.",
    initials: "MR",
    rating: 5,
  },
  {
    name: "Vikram D.",
    role: "Final-year BTech, Hyderabad",
    quote: "I finally understood prompting. Used it the same night to finish my assignment in 20 minutes — what used to take me 4 hours. Changed how I study.",
    initials: "VD",
    rating: 5,
  },
  {
    name: "Priyanka S.",
    role: "HR Business Partner, Mumbai",
    quote: "No jargon, no gatekeeping, just real examples with my kind of work. The tool list alone is worth 10× the price. My whole team has registered now.",
    initials: "PS",
    rating: 5,
  },
];

const FAQS = [
  { q: "What if I can't attend live?", a: "No problem. Every registrant gets a 7-day recording link within 24 hours of the session, so you can watch whenever works for you." },
  { q: "How do I get the webinar join link?", a: "The moment your ₹99 payment is confirmed, we email you the Zoom join link, a calendar invite, and a short prep note — usually within 2 minutes." },
  { q: "Is the recording really included?", a: "Yes — 7 days of full recording access plus the downloadable 20-tool PDF. Every registrant gets both, no upsell." },
  { q: "What's the refund policy?", a: "If you attend the first 30 minutes and feel it isn't for you, reply to the confirmation email and we'll refund ₹99 in full, no questions asked." },
  { q: "Do I need any prior tech knowledge?", a: "None. If you can write an email and open a browser tab, you'll be able to follow along. We designed this for absolute beginners too." },
  { q: "What tools do I need to join?", a: "Just a laptop or phone with internet and a free ChatGPT account. We'll share the 2-minute setup guide after registration." },
  { q: "Will I get a certificate?", a: "Yes — a digital certificate of attendance is emailed to everyone who watches the live session or the recording till the end." },
  { q: "Who is this NOT for?", a: "If you're already building LLM apps in production, this will feel basic. It's for people who want to use AI to save hours — not build it." },
];

const ROLE_CARDS: { id: Role; title: string; icon: typeof GraduationCap; blurb: string; points: string[] }[] = [
  {
    id: "student",
    icon: GraduationCap,
    title: "Students",
    blurb: "Ace assignments, research, and interviews.",
    points: ["Finish assignments in 20 mins", "Crack interview prep 3× faster", "Summarise textbooks in seconds"],
  },
  {
    id: "working_professional_non_tech",
    icon: Briefcase,
    title: "Non-Tech Professionals",
    blurb: "Marketing, HR, sales, ops — work smarter.",
    points: ["Draft emails and reports in minutes", "Turn data into clean summaries", "Build automations without code"],
  },
  {
    id: "working_professional_tech",
    icon: Code2,
    title: "Tech Professionals",
    blurb: "Devs, analysts, PMs — ship 10× faster.",
    points: ["Debug and review code at speed", "Auto-generate tests & docs", "Stack LLM tools into your flow"],
  },
];

// —————————————————————————————————————————————————————————————————
// HOOKS / UTILITIES
// —————————————————————————————————————————————————————————————————

function useCountdown(target: string) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) return setLeft({ d: 0, h: 0, m: 0, s: 0, done: true });
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
        done: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return left;
}

function FadeUp({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// —————————————————————————————————————————————————————————————————
// MAIN
// —————————————————————————————————————————————————————————————————

export function LandingPage() {
  const [sticky, setSticky] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tick, setTick] = useState(0);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].value);
  const [activeTab, setActiveTab] = useState<(typeof LEARN_TABS)[number]["id"]>(LEARN_TABS[0].id);
  const [expandedAgenda, setExpandedAgenda] = useState<number | null>(0);

  const countdown = useCountdown(webinarDate);

  const {
    register, handleSubmit, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { phone: "" },
  });

  const selectedRole = watch("role");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    (["utm_source", "utm_medium", "utm_campaign"] as const).forEach((k) => {
      const v = params.get(k) ?? sessionStorage.getItem(k) ?? "";
      if (v) {
        sessionStorage.setItem(k, v);
        setValue(k, v);
      }
    });

    const onScroll = () => setSticky(window.scrollY > 720);
    window.addEventListener("scroll", onScroll, { passive: true });
    const tickerId = setInterval(() => setTick((t) => t + 1), 4500);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(tickerId);
    };
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const normalizedPhone = `${countryCode}${data.phone.replace(/\D/g, "")}`;
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phone: normalizedPhone }),
      });
      const payload = await res.json();
      if (typeof window !== "undefined" && (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq) {
        (window as unknown as { fbq: (...a: unknown[]) => void }).fbq("track", "Lead");
      }
      if (payload?.razorpay_link) {
        window.location.href = payload.razorpay_link;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  const dateText = useMemo(
    () =>
      new Date(webinarDate).toLocaleString("en-IN", {
        weekday: "long", day: "numeric", month: "short",
        hour: "numeric", minute: "2-digit", hour12: true,
      }),
    []
  );

  const scrollToForm = () =>
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });

  const pickRole = (r: Role) => {
    setValue("role", r, { shouldValidate: true });
    scrollToForm();
  };

  const ticker = TICKER_ITEMS[tick % TICKER_ITEMS.length];
  const firstError = Object.values(errors)[0]?.message;

  return (
    <main className="relative overflow-x-hidden pb-20 md:pb-0">
      {/* ————— Urgency bar ————— */}
      <div className="sticky top-0 z-40 border-b border-emerald-900/40 bg-accent/95 backdrop-blur text-black text-[13px] sm:text-sm font-medium">
        <div className="container-x flex items-center justify-center gap-2 py-1.5 sm:py-2 text-center">
          <Flame className="h-4 w-4 shrink-0" />
          <span className="truncate">
            Early-bird <b>₹99</b> · Only <b>47 seats</b> left<span className="hidden sm:inline"> this week · Price goes up to ₹499 after</span>.
          </span>
        </div>
      </div>

      {/* ————— HERO ————— */}
      <section className="relative">
        <div aria-hidden className="absolute inset-0 -z-10 hero-mesh" />
        <div className="container-x pt-8 sm:pt-10 md:pt-16 pb-10 sm:pb-12 md:pb-20">
          <nav className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm min-w-0">
              <div className="h-9 w-9 rounded-xl bg-accent/15 grid place-items-center shrink-0">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <span className="font-heading font-semibold truncate">AI Fundamentals</span>
              <span className="ml-1 inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-400 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
              </span>
            </div>
            <button
              onClick={scrollToForm}
              className="hidden sm:inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              Reserve seat <ArrowRight className="h-4 w-4" />
            </button>
          </nav>

          <div className="mt-12 md:mt-16 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-start">
            {/* Left — copy */}
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                  <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                  Rated 4.9 / 5 by 500+ attendees
                </div>
              </FadeUp>
              <FadeUp delay={0.05}>
                <h1 className="mt-4 font-heading text-[32px] leading-[1.08] sm:text-5xl md:text-6xl font-semibold tracking-tight md:leading-[1.05]">
                  Stop watching AI pass you by.{" "}
                  <span className="text-gradient-accent">Actually use it — in 2 hours.</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl">
                  A no-fluff live session on ChatGPT, Claude, and automation tools that save working professionals and students{" "}
                  <span className="text-white font-semibold">10+ hours every week</span>.
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-2.5 text-xs sm:text-sm">
                  <Chip icon={Calendar}>{dateText} IST</Chip>
                  <Chip icon={Video}>2-hr live + 7-day recording</Chip>
                  <Chip icon={Gift}>Bonus: 20-tool PDF</Chip>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                  <button
                    onClick={scrollToForm}
                    className="group inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-semibold text-white shadow-glow hover:brightness-110 hover:scale-[1.02] transition active:scale-100"
                  >
                    Reserve my seat — ₹99
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
                  </button>
                  <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                    <Shield className="h-4 w-4" /> Razorpay · 500+ already registered
                  </div>
                </div>
              </FadeUp>

              {/* Live registration ticker */}
              <div className="mt-6 min-h-[40px] max-w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ticker.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent animate-pulse" />
                    <span className="truncate">
                      <span className="font-medium text-white">{ticker.name}</span>{" "}
                      from {ticker.city} · {ticker.role} just registered
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right — countdown card */}
            <FadeUp delay={0.15}>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 sm:p-6 md:p-7 shadow-xl">
                <p className="text-xs uppercase tracking-wider text-zinc-400">
                  Webinar starts in
                </p>
                <div className="mt-4 grid grid-cols-4 gap-1.5 sm:gap-2">
                  {[
                    { label: "Days", v: countdown.d },
                    { label: "Hours", v: countdown.h },
                    { label: "Mins", v: countdown.m },
                    { label: "Secs", v: countdown.s },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="rounded-xl border border-white/10 bg-black/30 px-1 py-2.5 sm:px-2 sm:py-3 text-center"
                    >
                      <div className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold tabular-nums">
                        {String(c.v).padStart(2, "0")}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                        {c.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2.5 text-sm text-zinc-300">
                  {[
                    "Live on Zoom · real Q&A",
                    "7-day recording access",
                    "Downloadable 20-tool PDF",
                    "Certificate of completion",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <CheckCheck className="h-4 w-4 text-accent shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={scrollToForm}
                  className="mt-6 h-12 w-full rounded-xl bg-accent text-white font-semibold hover:brightness-110 transition"
                >
                  Pay ₹99 & Reserve
                </button>
                <p className="mt-2 text-center text-xs text-zinc-500">
                  <Lock className="inline h-3 w-3 -mt-0.5 mr-1" />
                  Razorpay · UPI, card, netbanking
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Stats strip */}
          <FadeUp delay={0.25}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { v: "500+", l: "Registered" },
                { v: "4.9★", l: "Avg rating" },
                { v: "10+", l: "Hrs saved / wk" },
                { v: "20+", l: "Tools covered" },
              ].map((s) => (
                <div key={s.l} className="card-surface p-4 text-center">
                  <div className="font-heading text-2xl md:text-3xl font-semibold text-accent">{s.v}</div>
                  <div className="text-xs text-zinc-400 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ————— Logo marquee ————— */}
      <section className="border-y border-white/5 bg-white/[0.01] py-8">
        <p className="container-x text-center text-xs uppercase tracking-wider text-zinc-500">
          Tools & platforms we cover in the session
        </p>
        <div className="mt-5 overflow-hidden no-scrollbar">
          <div className="flex w-max animate-marquee gap-10 px-6 text-zinc-400">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span key={`${l}-${i}`} className="whitespace-nowrap text-sm font-heading font-medium">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Problem ————— */}
      <section className="section container-x">
        <FadeUp>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold max-w-4xl">
            You&apos;re drowning in work. AI could fix that.{" "}
            <span className="text-zinc-400">But where do you even start?</span>
          </h2>
        </FadeUp>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Search,
              title: "Everyone's talking. No one's showing.",
              body: "Endless reels and hot-takes, but nobody shows you what to actually do with AI at your desk tomorrow.",
            },
            {
              icon: Clock,
              title: "4-hour YouTube rabbit holes.",
              body: "You come out of a tutorial marathon more confused than when you went in — with nothing usable.",
            },
            {
              icon: Zap,
              title: "One try with ChatGPT, and you gave up.",
              body: "Generic answer, weird tone, pointless output. You close the tab and decide AI isn't for you.",
            },
          ].map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.08}>
              <div className="card-surface card-surface-hover p-6 h-full">
                <p.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-heading text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ————— What you'll learn (interactive tabs) ————— */}
      <section className="section container-x">
        <FadeUp>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-heading text-3xl md:text-5xl font-semibold max-w-3xl">
              In 2 hours, you&apos;ll walk away with:
            </h2>
            <p className="text-sm text-zinc-400">Tap a pillar to see what&apos;s inside ↓</p>
          </div>
        </FadeUp>

        <div className="mt-10 grid gap-6 lg:gap-8 lg:grid-cols-[280px_1fr]">
          <div
            role="tablist"
            className="-mx-4 sm:-mx-6 lg:mx-0 flex lg:flex-col gap-2 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-0 snap-x snap-mandatory"
          >
            {LEARN_TABS.map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(t.id)}
                  className={`snap-start shrink-0 min-h-[48px] flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition whitespace-nowrap lg:whitespace-normal ${
                    active
                      ? "border-accent/40 bg-accent/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/20"
                  }`}
                >
                  <t.icon className={`h-5 w-5 shrink-0 ${active ? "text-accent" : "text-zinc-400"}`} />
                  <span className="font-heading font-medium">{t.label}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 md:p-8 min-h-[280px]">
            <AnimatePresence mode="wait">
              {LEARN_TABS.filter((t) => t.id === activeTab).map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                    <t.icon className="h-3.5 w-3.5" />
                    {t.label}
                  </div>
                  <h3 className="mt-3 font-heading text-2xl md:text-3xl font-semibold">{t.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-zinc-300">
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ————— Who it's for (role picker → pre-fills form) ————— */}
      <section className="section container-x">
        <FadeUp>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold">
            Pick your path. <span className="text-zinc-400">Same session, tailored outcomes.</span>
          </h2>
          <p className="mt-3 text-zinc-400">Tap your role — we&apos;ll pre-fill the form for you.</p>
        </FadeUp>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {ROLE_CARDS.map((r, i) => {
            const active = selectedRole === r.id;
            return (
              <FadeUp key={r.id} delay={i * 0.08}>
                <button
                  onClick={() => pickRole(r.id)}
                  className={`w-full text-left card-surface card-surface-hover p-6 h-full transition ${
                    active ? "border-accent/50 bg-accent/[0.05]" : ""
                  }`}
                >
                  <div className={`h-11 w-11 rounded-xl grid place-items-center ${active ? "bg-accent/20" : "bg-white/5"}`}>
                    <r.icon className={`h-5 w-5 ${active ? "text-accent" : "text-zinc-300"}`} />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{r.blurb}</p>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    {active ? "Selected" : "I'm in this group"}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </FadeUp>
            );
          })}
        </div>
        <p className="mt-6 text-zinc-400">If you can send an email, you can do this.{" "}
          <span className="text-white">No coding required.</span>
        </p>
      </section>

      {/* ————— Host ————— */}
      <section className="section container-x">
        <FadeUp>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold">About your host</h2>
        </FadeUp>
        <div className="mt-10 grid gap-8 md:grid-cols-[280px_1fr] items-start">
          <FadeUp>
            <div className="aspect-square w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] mx-auto md:mx-0 rounded-3xl border border-white/10 bg-gradient-to-br from-accent/20 to-white/[0.03] grid place-items-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(16,185,129,0.6),transparent_70%)]" />
              <Image
                src={hostImage}
                alt="Ashutosh Tiwari"
                fill
                sizes="(max-width: 768px) 240px, 280px"
                className="object-cover"
                priority
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div>
              <p className="font-heading text-xl sm:text-2xl font-semibold">Ashutosh Tiwari</p>
              <p className="text-accent text-sm mt-1">Founder &amp; Lead Engineer</p>
              <p className="mt-4 sm:mt-5 text-zinc-300 leading-relaxed max-w-2xl">
                Senior software engineer who&apos;s been shipping enterprise-scale systems for 7+
                years, managing AWS, Kubernetes, and telecom-grade production infra handling
                millions of transactions. Now building AI-native products full-time.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                <Chip icon={Trophy}>7+ yrs production</Chip>
                <Chip icon={Code2}>AWS · Kubernetes · Claude</Chip>
                <Chip icon={Workflow}>Enterprise-scale systems</Chip>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ————— Agenda ————— */}
      <section className="section container-x">
        <FadeUp>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold">
            What actually happens in the 2 hours
          </h2>
          <p className="mt-3 text-zinc-400">Click a block to expand.</p>
        </FadeUp>
        <div className="mt-10 space-y-3">
          {AGENDA.map((item, i) => {
            const open = expandedAgenda === i;
            return (
              <FadeUp key={item.title} delay={i * 0.04}>
                <button
                  onClick={() => setExpandedAgenda(open ? null : i)}
                  className={`group w-full text-left card-surface p-5 md:p-6 transition ${open ? "border-accent/40" : "hover:border-white/20"}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 shrink-0 rounded-xl grid place-items-center ${open ? "bg-accent/20" : "bg-white/5"}`}>
                      <item.icon className={`h-5 w-5 ${open ? "text-accent" : "text-zinc-300"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-medium text-accent tracking-wider">{item.time}</p>
                        <ChevronDown className={`h-4 w-4 text-zinc-400 transition ${open ? "rotate-180 text-accent" : ""}`} />
                      </div>
                      <p className="mt-1 font-heading text-lg md:text-xl font-semibold">{item.title}</p>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-2 text-sm text-zinc-400 leading-relaxed overflow-hidden"
                          >
                            {item.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ————— Testimonials ————— */}
      <section className="section container-x">
        <FadeUp>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold">People who&apos;ve already been in the room</h2>
        </FadeUp>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.08}>
              <div className="card-surface p-6 h-full">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="mt-4 text-zinc-300 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/15 grid place-items-center font-heading text-sm font-semibold text-accent">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ————— Pricing ————— */}
      <section className="section container-x">
        <FadeUp>
          <div className="mx-auto max-w-xl rounded-3xl border border-accent/30 bg-gradient-to-b from-accent/[0.08] to-white/[0.02] p-6 sm:p-8 md:p-10 text-center relative overflow-hidden">
            <div aria-hidden className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
              <Flame className="h-3.5 w-3.5" /> Early-bird offer
            </span>
            <p className="mt-5 text-sm text-zinc-400 line-through">Regular price · ₹999</p>
            <p className="mt-1 font-heading text-5xl sm:text-6xl md:text-7xl font-semibold text-gradient-accent">
              ₹99
            </p>
            <p className="mt-1 text-sm text-zinc-400">One-time · no subscription · no upsells</p>

            <ul className="mt-7 grid gap-2.5 text-left text-sm text-zinc-300 max-w-sm mx-auto">
              {[
                "2-hour live session on Zoom",
                "7-day recording access",
                "20-tool AI stack PDF",
                "Live Q&A with the host",
                "Prompt template library",
                "Certificate of completion",
              ].map((b) => (
                <li key={b} className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToForm}
              className="mt-8 h-14 w-full rounded-xl bg-accent text-white font-semibold shadow-glow hover:brightness-110 transition"
            >
              Get instant access — ₹99
            </button>
            <p className="mt-3 text-xs text-zinc-500">
              <Shield className="inline h-3 w-3 -mt-0.5 mr-1" />
              30-minute money-back guarantee · pay via UPI, card, or netbanking
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ————— FAQ ————— */}
      <section className="section container-x">
        <FadeUp>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold">Frequently asked</h2>
        </FadeUp>
        <Accordion.Root type="single" collapsible className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <FadeUp key={f.q} delay={i * 0.03}>
              <Accordion.Item value={f.q} className="card-surface overflow-hidden">
                <Accordion.Header>
                  <Accordion.Trigger className="group w-full flex items-center justify-between gap-3 px-5 py-4 text-left">
                    <span className="font-heading font-medium">{f.q}</span>
                    <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-[fadeIn_.2s_ease-out]">
                  <p className="px-5 pb-5 text-zinc-300 leading-relaxed">{f.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            </FadeUp>
          ))}
        </Accordion.Root>
      </section>

      {/* ————— Register form ————— */}
      <section id="register" className="section">
        <div className="container-x">
          <FadeUp>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <Rocket className="h-3.5 w-3.5" /> Last step
              </div>
              <h2 className="mt-4 font-heading text-3xl md:text-5xl font-semibold">
                Ready? Let&apos;s get you in.
              </h2>
              <p className="mt-3 text-zinc-400">
                ₹99 · UPI, card, netbanking · Seat & recording access unlocked the moment payment clears.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 card-surface p-5 sm:p-6 md:p-8 grid gap-4 md:grid-cols-2"
              noValidate
            >
              <Field label="Full name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  placeholder="Your name"
                  autoComplete="name"
                  className="h-12 w-full rounded-xl bg-black/30 border border-white/10 px-4 placeholder:text-zinc-500 focus:border-accent/60"
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@work.com"
                  autoComplete="email"
                  inputMode="email"
                  className="h-12 w-full rounded-xl bg-black/30 border border-white/10 px-4 placeholder:text-zinc-500 focus:border-accent/60"
                />
              </Field>
              <Field label="Phone (WhatsApp)" error={errors.phone?.message}>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    aria-label="Country code"
                    className="h-12 w-[122px] rounded-xl bg-black/30 border border-white/10 px-3 focus:border-accent/60"
                  >
                    {COUNTRY_CODES.map((code) => (
                      <option key={code.value} value={code.value}>
                        {code.label}
                      </option>
                    ))}
                  </select>
                  <input
                    {...register("phone", {
                      setValueAs: (value: string) => value.replace(/\D/g, ""),
                    })}
                    placeholder="9876543210"
                    autoComplete="tel-national"
                    inputMode="numeric"
                    className="h-12 w-full rounded-xl bg-black/30 border border-white/10 px-4 placeholder:text-zinc-500 focus:border-accent/60"
                  />
                </div>
              </Field>
              <Field label="I am a" error={errors.role?.message}>
                <select
                  {...register("role")}
                  defaultValue=""
                  className="h-12 w-full rounded-xl bg-black/30 border border-white/10 px-4 focus:border-accent/60"
                >
                  <option value="" disabled>Select role</option>
                  <option value="student">Student</option>
                  <option value="working_professional_non_tech">Non-Tech Professional</option>
                  <option value="working_professional_tech">Tech Professional</option>
                  <option value="other">Other</option>
                </select>
              </Field>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="md:col-span-2 h-14 rounded-xl bg-accent text-white font-semibold shadow-glow hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-transparent animate-spin" />
                    Redirecting to Razorpay…
                  </>
                ) : (
                  <>
                    Pay ₹99 & reserve my seat <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {firstError && (
                <p className="md:col-span-2 text-sm text-red-400">{firstError}</p>
              )}

              <div className="md:col-span-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-400 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> Payment by Razorpay
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Joining link within 2 minutes
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" /> 30-min money-back guarantee
                </span>
              </div>
              <p className="md:col-span-2 text-xs text-zinc-500">
                By registering you agree to our{" "}
                <Link href="/terms" className="underline hover:text-zinc-300">Terms</Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-zinc-300">Privacy Policy</Link>.
              </p>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* ————— Footer ————— */}
      <footer className="border-t border-white/10 mt-10">
        <div className="container-x py-10 text-sm text-zinc-400 grid gap-4 md:grid-cols-[1fr_auto] items-center">
          <div>
            <div className="flex items-center gap-2 text-white">
              <div className="h-7 w-7 rounded-lg bg-accent/15 grid place-items-center">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
              </div>
              <span className="font-heading font-semibold">AI Fundamentals Live</span>
            </div>
            <p className="mt-2">© {new Date().getFullYear()} · Built for people who want to do more with less time.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:support@example.com" className="hover:text-zinc-200">support@example.com</a>
            <Link href="/terms" className="hover:text-zinc-200">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-200">Privacy</Link>
            <Link href="/refund" className="hover:text-zinc-200">Refund policy</Link>
          </div>
        </div>
      </footer>

      {/* ————— Floating WhatsApp help ————— */}
      <a
        href="https://wa.me/919999999999?text=Hi%2C%20I%20have%20a%20question%20about%20the%20AI%20webinar"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className={`fixed right-4 md:right-6 z-40 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/85 backdrop-blur text-sm font-medium text-white shadow-xl hover:border-accent/40 transition h-12 w-12 md:h-auto md:w-auto md:px-4 md:py-2.5 ${
          sticky ? "bottom-[84px] md:bottom-6" : "bottom-5 md:bottom-6"
        }`}
      >
        <MessageCircle className="h-5 w-5 text-accent md:h-4 md:w-4" />
        <span className="hidden md:inline">Questions? Chat on WhatsApp</span>
      </a>

      {/* ————— Sticky mobile CTA ————— */}
      <AnimatePresence>
        {sticky && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 inset-x-0 z-40 p-3 md:hidden bg-background/95 backdrop-blur border-t border-white/10"
          >
            <button
              onClick={scrollToForm}
              className="h-12 w-full rounded-xl bg-accent text-white font-semibold shadow-glow flex items-center justify-center gap-2"
            >
              Reserve my seat — ₹99 <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// —————————————————————————————————————————————————————————————————
// SMALL PRIMITIVES
// —————————————————————————————————————————————————————————————————

function Chip({
  icon: Icon, children,
}: { icon: typeof Calendar; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
      <Icon className="h-4 w-4 text-accent" />
      {children}
    </span>
  );
}

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-zinc-400">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
