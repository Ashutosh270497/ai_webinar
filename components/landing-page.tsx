"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";
import type { z } from "zod";
import * as Accordion from "@radix-ui/react-accordion";

const webinarDate = process.env.NEXT_PUBLIC_WEBINAR_DATE || process.env.WEBINAR_DATE || "2026-05-15T19:00:00+05:30";
type FormData = z.infer<typeof registerSchema>;

export function LandingPage() {
  const [left, setLeft] = useState("00:00:00");
  const [sticky, setSticky] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { phone: "+91" },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign"].forEach((key) => {
      const value = params.get(key) ?? sessionStorage.getItem(key) ?? "";
      if (value) {
        sessionStorage.setItem(key, value);
        setValue(key as keyof FormData, value as never);
      }
    });

    const interval = setInterval(() => {
      const diff = new Date(webinarDate).getTime() - Date.now();
      if (diff < 0) return setLeft("00:00:00");
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      setLeft(`${d}d:${h}h:${m}m`);
    }, 1000);

    const onScroll = () => setSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => { clearInterval(interval); window.removeEventListener("scroll", onScroll); };
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const res = await fetch("/api/register", { method: "POST", body: JSON.stringify(data) });
    const payload = await res.json();
    setLoading(false);
    if (payload?.razorpay_link) window.location.href = payload.razorpay_link;
  };

  const dateText = useMemo(() => new Date(webinarDate).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" }), []);

  return (
    <main>
      <section className="section container-x">
        <div className="flex items-start justify-between gap-4"><p className="text-sm">AI Webinar <span className="rounded-full border px-2 py-1">LIVE WEBINAR</span></p><p className="text-sm">{left}</p></div>
        <h1 className="mt-6 font-heading text-4xl md:text-6xl font-semibold max-w-4xl">Stop Watching AI Pass You By. Learn To Actually Use It — In 2 Hours.</h1>
        <p className="mt-4 text-zinc-300 text-lg max-w-3xl">A no-fluff live session on ChatGPT, Claude, and automation tools that save working professionals and students 10+ hours every week.</p>
        <div className="mt-6 flex flex-wrap gap-3"><span className="rounded-xl border px-4 py-2">📅 {dateText}</span><span className="rounded-xl border px-4 py-2">⏱ 2 Hours Live + 7-Day Recording</span></div>
        <button onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })} className="mt-8 h-14 rounded-xl bg-accent px-8 font-semibold text-white">Reserve My Seat — ₹99</button>
        <p className="mt-3 text-sm text-zinc-400">🔒 Secure payment via Razorpay · 500+ already registered</p>
      </section>

      <section className="section container-x"><h2 className="text-3xl md:text-5xl font-heading">You're drowning in work. AI could fix that. But where do you even start?</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{["Everyone's talking about AI but no one shows you what to actually do with it","Free YouTube tutorials are 4 hours long and still leave you confused","You've tried ChatGPT once, got a generic answer, and gave up"].map((t)=> <div key={t} className="rounded-2xl border p-6">{t}</div>)}</div></section>

      <section className="section container-x"><h2 className="text-3xl md:text-5xl font-heading">In 2 hours, you'll walk away with:</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{["Prompt Like a Pro","Email & Docs on Autopilot","Research in Seconds","No-Code Automations","20+ Tool Playbook","Your Workflow, Rebuilt"].map((t)=> <div key={t} className="rounded-2xl border p-6"><h3 className="font-semibold">{t}</h3></div>)}</div></section>

      <section className="section container-x"><h2 className="text-3xl md:text-5xl font-heading">Who This Is For</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{["Students — Crush assignments, research papers, and interview prep","Non-Tech Professionals — Marketing, HR, sales, operations folks who want to work smarter","Tech Professionals — Developers and analysts who want to 10x their output"].map((t)=> <div key={t} className="rounded-2xl border p-6">{t}</div>)}</div><p className="mt-4">If you can send an email, you can do this. No coding required.</p></section>

      <section className="section container-x"><h2 className="text-3xl md:text-5xl font-heading">About the Host</h2><div className="mt-8 grid gap-6 md:grid-cols-2"><div className="aspect-square max-w-xs rounded-2xl border grid place-items-center">Photo</div><div><p>{{"{{HOST_NAME}}"}} · {{"{{HOST_CREDENTIALS}}"}}</p><p className="mt-4 text-zinc-300">{{"{{HOST_BIO}}"}}</p><div className="mt-4 flex gap-2"><span className="rounded-full border px-3 py-1">{{"{{SOCIAL_BADGE_1}}"}}</span><span className="rounded-full border px-3 py-1">{{"{{SOCIAL_BADGE_2}}"}}</span></div></div></div></section>

      <section className="section container-x"><h2 className="text-3xl md:text-5xl font-heading">Agenda</h2><div className="mt-8 space-y-3">{["0:00–0:15 — The AI Landscape in 2026 (what matters, what's hype)","0:15–0:45 — Live Demo: ChatGPT + Claude for Real Work","0:45–1:15 — Building Your First Automation (live build)","1:15–1:35 — The 20-Tool AI Stack Walkthrough","1:35–1:50 — Q&A with the Host","1:50–2:00 — Your 7-Day Action Plan"].map((t)=> <div key={t} className="rounded-2xl border p-5">{t}</div>)}</div></section>

      <section className="section container-x"><h2 className="text-3xl md:text-5xl font-heading">Testimonials</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{["{{TESTIMONIAL_1}}","{{TESTIMONIAL_2}}","{{TESTIMONIAL_3}}"].map((t)=> <div key={t} className="rounded-2xl border p-6">{t}</div>)}</div></section>

      <section className="section container-x"><div className="mx-auto max-w-xl rounded-2xl border p-8 text-center"><p className="line-through text-zinc-400">Regular Price: ₹999</p><p className="mt-2 text-6xl font-heading font-semibold text-accent">Today: ₹99</p><ul className="mt-4 text-left list-disc pl-6"><li>Live session</li><li>7-day recording</li><li>Tool list PDF</li><li>Q&A access</li></ul><button onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })} className="mt-6 h-14 w-full rounded-xl bg-accent text-white font-semibold">Get Instant Access — ₹99</button><p className="mt-2 text-sm text-zinc-400">One-time payment. No subscription. No upsells.</p></div></section>

      <section className="section container-x"><h2 className="text-3xl md:text-5xl font-heading">FAQ</h2><Accordion.Root type="single" collapsible className="mt-8 space-y-3">{["What if I can't attend live?","How do I get the webinar link?","Is the recording included?","What's the refund policy?","Do I need any prior tech knowledge?","What tools do I need?","Will there be a certificate?","Who is this NOT for?"].map((q)=> <Accordion.Item key={q} value={q} className="rounded-2xl border p-4"><Accordion.Header><Accordion.Trigger className="w-full text-left">{q}</Accordion.Trigger></Accordion.Header><Accordion.Content className="pt-3 text-zinc-300">Detailed answer placeholder.</Accordion.Content></Accordion.Item>)}</Accordion.Root></section>

      <section id="register" className="section container-x"><h2 className="text-3xl md:text-5xl font-heading">Ready? Let's get you in.</h2><form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4 md:grid-cols-2"><input className="h-12 rounded-xl bg-zinc-900 border px-4" placeholder="Full Name" {...register("name")} /><input className="h-12 rounded-xl bg-zinc-900 border px-4" placeholder="Email" {...register("email")} /><input className="h-12 rounded-xl bg-zinc-900 border px-4" placeholder="Phone" {...register("phone")} /><select className="h-12 rounded-xl bg-zinc-900 border px-4" {...register("role")}><option value="">Select Role</option><option value="student">Student</option><option value="working_professional_non_tech">Non-Tech Professional</option><option value="working_professional_tech">Tech Professional</option><option value="other">Other</option></select><button disabled={loading} className="md:col-span-2 h-14 rounded-xl bg-accent text-white font-semibold">{loading ? "Processing..." : "Pay ₹99 & Reserve My Seat →"}</button>{Object.values(errors)[0] && <p className="text-red-400 text-sm md:col-span-2">Please fill all fields correctly.</p>}</form><p className="mt-3 text-sm text-zinc-400">🔒 Payment secured by Razorpay · You'll receive webinar details on email within 2 minutes of payment</p><p className="mt-2 text-xs text-zinc-500">By registering you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</p></section>

      <footer className="border-t border-zinc-800"><div className="container-x py-8 text-sm text-zinc-400 flex flex-wrap gap-4 justify-between"><p>AI Webinar</p><p>support@example.com</p><p><Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/refund">Refund policy</Link></p></div></footer>

      {sticky && <div className="fixed bottom-0 inset-x-0 p-4 md:hidden bg-background/95 border-t"><button onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })} className="h-14 w-full rounded-xl bg-accent text-white font-semibold">Reserve — ₹99</button></div>}
    </main>
  );
}
