"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Flame,
  CalendarDays,
  Check,
  AlertCircle,
  Sparkles,
  Lock,
} from "lucide-react";

const serif = "font-serif tracking-[-0.035em]";
const sectionWrap = "mx-auto w-full max-w-7xl px-6 md:px-10";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } };

const driftMap = [
  { missed: 0, projected: "Jun 12", confidence: 84, recovery: "No recovery needed", message: "You're still on track.", risk: "Low" },
  { missed: 1, projected: "Jun 16", confidence: 71, recovery: "1 recovery session", message: "One miss moved the plan.", risk: "Watch it" },
  { missed: 2, projected: "Jun 23", confidence: 56, recovery: "2 recovery sessions", message: "The drift is now visible.", risk: "Medium" },
  { missed: 3, projected: "Jul 1",  confidence: 39, recovery: "3 recovery sessions", message: "The deadline moved again.", risk: "High" },
];

/* ─── Reusable components ─── */

function PricingCard({ name, price, subtitle, features, featured = false, badge }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative overflow-hidden rounded-[30px] border p-7 md:p-8 ${
        featured
          ? "border-[#7a5e49] bg-[#141311] text-white shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
          : "border-black/10 bg-white text-black"
      }`}
    >
      {badge && (
        <div className={`mb-5 inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${
          featured ? "border-[#c5a37d]/25 bg-[#d6c0a7]/10 text-[#ead8c1]" : "border-black/10 bg-black/[0.03] text-black/45"
        }`}>
          {badge}
        </div>
      )}
      <div className="text-[0.72rem] uppercase tracking-[0.2em] opacity-45">{name}</div>
      <div className={`${serif} mt-4 text-5xl leading-none`}>{price}</div>
      <p className={`mt-4 text-sm leading-6 ${featured ? "text-white/65" : "text-black/65"}`}>{subtitle}</p>
      <div className={`my-7 h-px ${featured ? "bg-white/10" : "bg-black/10"}`} />
      <ul className="space-y-3.5">
        {features.map((item) => (
          <li key={item} className={`flex items-start gap-3 text-sm ${featured ? "text-white/82" : "text-black/76"}`}>
            <span className={`mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${
              featured ? "border-white/15 bg-white/5" : "border-black/10 bg-black/[0.03]"
            }`}>
              <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
        featured
          ? "border border-[#d3b390]/20 bg-[#efe1ca] text-black hover:-translate-y-0.5 hover:bg-[#f5ead9]"
          : "border border-black/10 bg-black text-white hover:-translate-y-0.5 hover:bg-black/90"
      }`}>
        Choose {name} <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function SlipModeDemo({ serif }) {
  const [hardWeek, setHardWeek] = useState(false);
  return (
    <motion.div variants={fadeUp} className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-black/40">Slip Mode</div>
          <h3 className={`${serif} text-[1.9rem] leading-tight`}>Forge adapts when life hits</h3>
          <p className="mt-2 text-sm leading-6 text-black/60 max-w-sm">
            Two misses in a row: Forge shifts into a lighter week automatically. Same goal. Fewer sessions. Zero guilt. No other app does this.
          </p>
        </div>
        <button
          onClick={() => setHardWeek((v) => !v)}
          className={`flex-shrink-0 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
            hardWeek ? "border-[#8d433c]/25 bg-[#8d433c]/10 text-[#c04a3d]" : "border-black/10 bg-black/[0.03] text-black/50"
          }`}
        >
          {hardWeek ? "Hard week ←" : "Toggle →"}
        </button>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <div className="rounded-[22px] border border-black/8 bg-[#fafafa] p-5">
          <div className="mb-4 text-[0.62rem] uppercase tracking-[0.18em] text-black/35">Other apps</div>
          <div className="space-y-2">
            {["SQL practice", "Dashboard project", "Case study draft", "Portfolio review"].map((task, i) => (
              <div key={task} className={`flex items-center gap-3 rounded-xl border border-[#8d433c]/18 bg-[#8d433c]/[0.05] px-3 py-2.5 text-sm text-[#c04a3d] transition-all duration-300 ${hardWeek && i >= 2 ? "opacity-50 line-through" : ""}`}>
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2} />
                <span>{task}</span>
                <span className="ml-auto text-[10px] opacity-60">Overdue</span>
              </div>
            ))}
          </div>
          {hardWeek && <p className="mt-3 text-[11px] leading-5 text-black/38 italic">4 overdue. No guidance. Just guilt.</p>}
        </div>

        <div className="rounded-[22px] border border-black/8 bg-[#111] p-5 text-white">
          <div className="mb-4 text-[0.62rem] uppercase tracking-[0.18em] text-white/35">Forge</div>
          {hardWeek ? (
            <div>
              <div className="rounded-2xl border border-[#d3b390]/15 bg-[#d3b390]/[0.07] p-4 mb-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#e8c4a0] mb-1.5">Slip mode active</div>
                <p className="text-sm leading-5 text-white/80">Rough week detected. Reduced to 2 sessions. Deadline holds at Jun 12.</p>
              </div>
              <div className="space-y-2">
                {["SQL practice", "Dashboard project"].map((t) => (
                  <div key={t} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/80">
                    <div className="h-3.5 w-3.5 rounded-full border border-white/20 flex-shrink-0" />{t}
                  </div>
                ))}
                {["Case study draft", "Portfolio review"].map((t) => (
                  <div key={t} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 text-sm text-white/22 line-through">
                    <div className="h-3.5 w-3.5 rounded-full border border-white/8 flex-shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {["SQL practice", "Dashboard project", "Case study draft", "Portfolio review"].map((t) => (
                <div key={t} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/80">
                  <div className="h-3.5 w-3.5 rounded-full border border-white/20 flex-shrink-0" />{t}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DeadlineHonesty({ serif }) {
  const [revealed, setRevealed] = useState(false);
  const [choice, setChoice] = useState(null);
  return (
    <motion.div variants={fadeUp} className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
      <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-black/40">Deadline Honesty</div>
      <h3 className={`${serif} text-[1.9rem] leading-tight`}>The truth before you start</h3>
      <p className="mt-2 text-sm leading-6 text-black/60 max-w-sm">
        Most apps accept any deadline you set. Forge calculates if it's actually possible and tells you the truth upfront — so you fix it now, not weeks in.
      </p>

      <div className="mt-7 rounded-[26px] border border-black/8 bg-[#111] p-5 text-white">
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[["Goal", "Data analyst"], ["Deadline", "Jun 12"], ["Hrs/week", "5 hrs"]].map(([label, val]) => (
            <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
              <div className="text-[0.56rem] uppercase tracking-[0.16em] text-white/35">{label}</div>
              <div className="mt-1.5 text-sm text-white/80">{val}</div>
            </div>
          ))}
        </div>

        {!revealed ? (
          <button onClick={() => setRevealed(true)} className="w-full rounded-2xl border border-[#d3b390]/20 bg-[#efe1ca] py-3 text-sm font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-[#f5ead9]">
            Check if this is realistic →
          </button>
        ) : choice === "adjust" ? (
          <div className="rounded-2xl border border-[#59705b]/20 bg-[#59705b]/10 p-4">
            <div className="flex items-center gap-2 mb-2"><Check className="h-4 w-4 text-[#a3c4a8]" strokeWidth={2.2} /><div className="text-[10px] uppercase tracking-[0.18em] text-[#a3c4a8]">Deadline updated</div></div>
            <p className="text-sm leading-5 text-white/80">New deadline: <span className="text-[#c8ddca] font-medium">Sep 4</span>. Confidence: <span className="text-[#c8ddca] font-medium">87%</span>. You're starting honest.</p>
            <button onClick={() => { setRevealed(false); setChoice(null); }} className="mt-3 text-[11px] uppercase tracking-[0.16em] text-white/28 hover:text-white/50 transition">Reset</button>
          </div>
        ) : choice === "keep" ? (
          <div className="rounded-2xl border border-[#8d433c]/25 bg-[#8d433c]/10 p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#c88d86] mb-2">Drift tracking active</div>
            <p className="text-sm leading-5 text-white/75">Keeping Jun 12. Forge will alert you the moment recovery becomes difficult.</p>
            <button onClick={() => { setRevealed(false); setChoice(null); }} className="mt-3 text-[11px] uppercase tracking-[0.16em] text-white/28 hover:text-white/50 transition">Reset</button>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#8d433c]/25 bg-[#8d433c]/10 p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#c88d86] mb-2">Forge honest assessment</div>
            <p className="text-sm leading-5 text-white/80 mb-4">At 5 hrs/week, this takes <span className="text-[#f0a090] font-medium">~18 weeks</span>. You have <span className="text-[#f0a090] font-medium">10 weeks</span>. You're already behind before you start.</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setChoice("adjust")} className="rounded-xl bg-[#efe1ca] py-2.5 text-sm font-medium text-black transition hover:bg-[#f5ead9]">Adjust to Sep 4</button>
              <button onClick={() => setChoice("keep")} className="rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm text-white/60 transition hover:bg-white/10">Keep Jun 12</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ExitInterview({ serif }) {
  const [state, setState] = useState("idle");
  return (
    <motion.div variants={fadeUp} className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
      <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-black/40">Exit Interview</div>
      <h3 className={`${serif} text-[1.9rem] leading-tight`}>Quitting is a decision, not a failure</h3>
      <p className="mt-2 text-sm leading-6 text-black/60 max-w-sm">
        After 7 days inactive, no spam. One honest question. If you're back, a recovery plan loads instantly. If not, Forge closes the goal with zero guilt.
      </p>

      <div className="mt-7 rounded-[26px] border border-black/8 bg-[#111] p-5 text-white">
        {state === "idle" && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-1.5 w-1.5 rounded-full bg-white/22" />
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/35">7 days since last session</div>
            </div>
            <p className={`${serif} text-[1.55rem] leading-tight mb-6`}>Is this goal still something you want?</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setState("yes")} className="rounded-2xl border border-[#d3b390]/20 bg-[#efe1ca] py-3 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:bg-[#f5ead9]">Yes, I'm back</button>
              <button onClick={() => setState("no")} className="rounded-2xl border border-white/10 bg-white/[0.04] py-3 text-sm text-white/55 transition hover:bg-white/[0.08]">Honestly, no</button>
            </div>
          </div>
        )}
        {state === "yes" && (
          <div>
            <div className="flex items-center gap-2 mb-4"><Check className="h-4 w-4 text-[#a3c4a8]" strokeWidth={2.2} /><div className="text-[10px] uppercase tracking-[0.18em] text-[#a3c4a8]">Welcome back</div></div>
            <p className="text-sm leading-6 text-white/80 mb-4">Plan rebuilt from today. Deadline shifted to <span className="text-[#c8ddca] font-medium">Jul 3</span>. 2 recovery sessions added this week.</p>
            <button onClick={() => setState("idle")} className="text-[11px] uppercase tracking-[0.16em] text-white/28 hover:text-white/50 transition">Reset demo</button>
          </div>
        )}
        {state === "no" && (
          <div>
            <div className="flex items-center gap-2 mb-4"><div className="h-1.5 w-1.5 rounded-full bg-white/22" /><div className="text-[10px] uppercase tracking-[0.18em] text-white/35">Goal closed — no guilt</div></div>
            <p className="text-sm leading-6 text-white/72 mb-4">That's a real decision. What changed?</p>
            <div className="space-y-2 mb-4">
              {["The goal changed", "Life got in the way", "Not the right time", "Found a better path"].map((opt) => (
                <button key={opt} className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5 text-left text-sm text-white/62 transition hover:bg-white/[0.07] hover:text-white/85">{opt}</button>
              ))}
            </div>
            <button onClick={() => setState("idle")} className="text-[11px] uppercase tracking-[0.16em] text-white/28 hover:text-white/50 transition">Reset demo</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function OneTapRecovery({ serif }) {
  const [done, setDone] = useState(false);
  return (
    <motion.div variants={fadeUp} className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
      <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-black/40">One-tap Recovery</div>
      <h3 className={`${serif} text-[1.9rem] leading-tight`}>One button. Session rescheduled.</h3>
      <p className="mt-2 text-sm leading-6 text-black/60 max-w-sm">
        No text plan to figure out. Forge finds the next open slot and moves the session there. Tap once. Deadline holds.
      </p>

      <div className="mt-7 rounded-[26px] border border-black/8 bg-[#111] p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1.5 w-1.5 rounded-full bg-[#c04a3d]" />
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#c88d86]">Wednesday session missed</div>
        </div>
        <p className="text-sm text-white/65 mb-5">SQL practice · 90 min · was scheduled for 6pm</p>
        {done ? (
          <div className="flex items-center gap-3 rounded-2xl border border-[#59705b]/25 bg-[#59705b]/10 px-4 py-3.5">
            <Check className="h-4 w-4 text-[#a3c4a8]" strokeWidth={2.2} />
            <div>
              <div className="text-sm text-[#c8ddca]">Rescheduled to Thu 7:00 AM</div>
              <div className="text-[10px] text-[#a3c4a8]/70 mt-0.5">Deadline holds at Jun 12</div>
            </div>
          </div>
        ) : (
          <button onClick={() => setDone(true)} className="group w-full rounded-2xl border border-[#d3b390]/20 bg-[#efe1ca] px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5ead9]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-black">Reschedule to Thu 7:00 AM</div>
                <div className="text-[10px] text-black/50 mt-0.5">Keeps deadline at Jun 12</div>
              </div>
              <ArrowRight className="h-4 w-4 text-black/50 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        )}
        {!done && (
          <button className="mt-2 w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/38 transition hover:text-white/58">I'll handle it myself</button>
        )}
        {done && (
          <button onClick={() => setDone(false)} className="mt-3 text-[11px] uppercase tracking-[0.16em] text-white/28 hover:text-white/50 transition">Reset demo</button>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Page ─── */

export default function Page() {
  const [missed, setMissed] = useState(1);
  const current = useMemo(() => driftMap[missed], [missed]);
  const progressWidth = `${Math.max(22, 82 - missed * 16)}%`;
  const driftWidth = `${10 + missed * 18}%`;

  const calendarRows = [
    { day: "Mon", block: "SQL practice",       state: "done" },
    { day: "Tue", block: "Dashboard project",  state: "done" },
    { day: "Wed", block: "Missed deep work",   state: "missed" },
    { day: "Thu", block: "Recovery block",     state: "planned" },
    { day: "Fri", block: "Portfolio case study", state: "planned" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f0e8] text-black selection:bg-[#b04a3e]/20">

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.07),transparent_60%)]" />
        <div className="absolute left-[-10%] top-[8%] h-[500px] w-[500px] rounded-full bg-[#cab79b]/8 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#983c33]/[0.06] blur-3xl" />
      </div>

      <main className="relative z-10">

        {/* ── 1. NAV + HERO ── */}
        <section className="border-b border-black/8">
          <div className={`${sectionWrap} pt-6 md:pt-8`}>

            {/* Nav */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-black text-[#f4f0e8]">
                  <Flame className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[0.7rem] uppercase tracking-[0.22em] text-black/40">Forge</div>
                  <div className={`${serif} -mt-0.5 text-[1.05rem]`}>Finish the goal you keep delaying</div>
                </div>
              </div>
              <div className="hidden items-center gap-3 md:flex">
                <button className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/68 transition hover:border-black/20 hover:bg-white">Pricing</button>
                <button className="rounded-full bg-black px-4 py-2 text-sm text-white transition hover:bg-black/88">Start free</button>
              </div>
            </div>

            {/* Hero grid */}
            <motion.div
              initial="hidden" animate="show" variants={stagger}
              className="grid gap-16 pb-20 pt-16 md:grid-cols-[1.08fr_0.92fr] md:items-center md:pb-28 md:pt-24"
            >
              <div>
                <motion.div variants={fadeUp}>
                  <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-black/58 backdrop-blur">
                    For one goal that actually matters
                  </span>
                </motion.div>

                <motion.h1 variants={fadeUp} className={`${serif} mt-7 text-[3.4rem] leading-[0.93] md:text-[5.2rem]`}>
                  Forge shows<br />when your goal<br />is slipping —<br />and how to fix it.
                </motion.h1>

                <motion.p variants={fadeUp} className="mt-7 max-w-xl text-[1.08rem] leading-[1.85] text-black/65">
                  Not another to-do list. Forge tracks one serious goal, forecasts deadline drift, blocks focused sessions into your calendar, and builds a recovery plan the moment you start slipping.
                </motion.p>

                <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-[#f4f0e8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/90">
                    See how it works
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white/70 px-7 py-3.5 text-sm font-medium text-black/75 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white">
                    Preview prototype <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
                  {["Drift forecast", "Calendar blocking", "Slip mode", "Recovery plan"].map((t) => (
                    <span key={t} className="rounded-full border border-black/10 bg-white/65 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-black/55 backdrop-blur">{t}</span>
                  ))}
                </motion.div>
              </div>

              {/* Hero card */}
              <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-[520px] md:ml-auto">
                <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-[#9b3f33]/10 blur-2xl" />
                <div className="overflow-hidden rounded-[34px] border border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.88),rgba(255,255,255,0.65))] p-4 shadow-[0_32px_96px_rgba(0,0,0,0.13)] backdrop-blur-xl">
                  <div className="rounded-[28px] border border-black/8 bg-[#111] p-5 text-white md:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[0.66rem] uppercase tracking-[0.18em] text-white/38">Active goal</div>
                        <div className={`${serif} mt-2 text-[1.8rem] leading-tight`}>Become a data analyst</div>
                      </div>
                      <div className="rounded-full border border-[#b68c68]/22 bg-[#d6c0a7]/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#e6d3bf] flex-shrink-0">Premium</div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-2.5">
                      {[["Target", "Jun 12", false], ["Today", "Mar 31", false], ["Projected", current.projected, true]].map(([label, val, red]) => (
                        <div key={label} className={`rounded-2xl border p-3.5 ${red ? "border-[#8d433c]/28 bg-[#8d433c]/[0.07]" : "border-white/10 bg-white/[0.03]"}`}>
                          <div className={`text-[0.58rem] uppercase tracking-[0.16em] ${red ? "text-[#c88d86]" : "text-white/35"}`}>{label}</div>
                          <div className={`mt-1.5 text-base font-medium ${red ? "text-[#f0dedc]" : ""}`}>{val}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/35">
                        <span>Progress vs drift</span>
                        <span>{missed} session{missed !== 1 ? "s" : ""} missed</span>
                      </div>
                      <div className="relative h-2.5 overflow-hidden rounded-full bg-white/8">
                        <motion.div animate={{ width: progressWidth }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#ede5da,#d7bb9a)]" />
                        <motion.div animate={{ width: driftWidth }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-y-0 right-0 rounded-full bg-[linear-gradient(90deg,#6e2e28,#b04a3e)]" />
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2.5">
                      {[["Confidence", `${current.confidence}%`], ["Risk", current.risk], ["Recovery", current.recovery.split(" ").slice(0, 2).join(" ")]].map(([label, val]) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <div className="text-[0.56rem] uppercase tracking-[0.16em] text-white/32">{label}</div>
                          <div className="mt-1.5 text-sm">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. THE PROBLEM (dark, brutal truths) ── */}
        <section className="bg-[#0f0e0d] py-16 text-white md:py-20">
          <div className={sectionWrap}>
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
              className="grid gap-px md:grid-cols-3"
            >
              {[
                { stat: "47", unit: "apps", truth: "The average person has tried this many productivity apps. They quit all of them." },
                { stat: "7", unit: "days", truth: "How long it takes for a broken streak to turn into app avoidance — then full abandonment." },
                { stat: "0", unit: "answers", truth: "What every other app gives you when you miss a week. Just more red tasks. No path back." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="border border-white/8 bg-white/[0.02] p-8 md:p-10 first:rounded-l-[28px] last:rounded-r-[28px]">
                  <div className={`${serif} text-[4rem] leading-none text-white/90 md:text-[5rem]`}>
                    {item.stat}<span className="text-[2rem] text-white/30 ml-1">{item.unit}</span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/55">{item.truth}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 3. HOW IT WORKS (light, 4 numbered steps) ── */}
        <section className="py-20 md:py-28">
          <div className={sectionWrap}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-black/58 backdrop-blur">How it works</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className={`${serif} mt-5 text-[2.8rem] leading-[0.97] md:text-[4rem]`}>
                Simple enough to explain<br />in four steps.
              </motion.h2>

              <div className="mt-12 grid gap-4 md:grid-cols-4">
                {[
                  { n: "01", title: "Set one goal", body: "One goal, one deadline, hours available per week. Forge does the rest." },
                  { n: "02", title: "Get a real plan", body: "Forge breaks the goal into focused sessions and checks if your deadline is actually achievable." },
                  { n: "03", title: "Work protected", body: "Sessions go into your calendar automatically. Your week is blocked before life fills it with something else." },
                  { n: "04", title: "Recover fast", body: "Miss a session? Forge updates the forecast and gives you one button to reschedule. The goal stays alive." },
                ].map((s) => (
                  <motion.div key={s.n} variants={fadeUp} className="relative rounded-[28px] border border-black/10 bg-white p-6 md:p-7 overflow-hidden">
                    <div className={`${serif} absolute right-5 top-3 text-[4rem] leading-none text-black/[0.04]`}>{s.n}</div>
                    <div className="text-[0.66rem] uppercase tracking-[0.18em] text-black/38 mb-5">{s.n}</div>
                    <h3 className={`${serif} text-[1.65rem] leading-tight`}>{s.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-black/60">{s.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 4. DRIFT DEMO (dark, interactive signature feature) ── */}
        <section className="bg-[#0d0d0c] py-20 text-white md:py-28">
          <div className={sectionWrap}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/50">Live demo</span>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-5 grid gap-6 md:grid-cols-2 md:items-end">
                <h2 className={`${serif} text-[2.8rem] leading-[0.97] md:text-[4rem]`}>
                  Missed work changes<br />the deadline instantly.
                </h2>
                <p className="text-[1.02rem] leading-8 text-white/60">
                  Move the slider and watch Forge update the projected deadline, flag risk level, and generate the shortest recovery route — in real time.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

                {/* Drift panel */}
                <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                  <div className="grid gap-4 md:grid-cols-[1fr_220px]">

                    {/* Main goal card */}
                    <div className="rounded-[26px] border border-white/8 bg-[#121211] p-5 md:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[0.65rem] uppercase tracking-[0.18em] text-white/35">Goal</div>
                          <div className={`${serif} mt-2 text-[1.75rem] leading-tight`}>Become a data analyst</div>
                        </div>
                        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/45 flex-shrink-0">Why?</button>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-2.5">
                        {[["Target", "Jun 12", false], ["Today", "Mar 31", false], ["Projected", current.projected, true]].map(([label, val, red]) => (
                          <div key={label} className={`rounded-2xl border p-3.5 ${red ? "border-[#8d433c]/28 bg-[#8d433c]/[0.07]" : "border-white/8 bg-white/[0.025]"}`}>
                            <div className={`text-[0.58rem] uppercase tracking-[0.16em] ${red ? "text-[#c88d86]" : "text-white/32"}`}>{label}</div>
                            <div className={`mt-1.5 text-base ${red ? "text-[#f0dedc]" : ""}`}>{val}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <div className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-white/35">
                          <span>Progress vs drift</span><span>{missed} missed</span>
                        </div>
                        <div className="relative h-2.5 overflow-hidden rounded-full bg-white/8">
                          <motion.div animate={{ width: progressWidth }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#ede5da,#d7bb9a)]" />
                          <motion.div animate={{ width: driftWidth }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-y-0 right-0 rounded-full bg-[linear-gradient(90deg,#6e2e28,#b04a3e)]" />
                        </div>
                      </div>

                      <div className="mt-5 rounded-[20px] border border-white/8 bg-white/[0.025] p-4">
                        <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/32 mb-2">Recovery plan</div>
                        <p className="text-sm leading-6 text-white/72">{current.recovery}. Move one review block to Thursday and protect Friday's deep work session.</p>
                      </div>
                    </div>

                    {/* Slider controls */}
                    <div className="grid gap-3">
                      <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5">
                        <div className="text-[0.65rem] uppercase tracking-[0.18em] text-white/35 mb-2">Missed sessions</div>
                        <div className={`${serif} text-[2.5rem] leading-none mb-5`}>{missed}</div>
                        <input
                          type="range" min={0} max={3} step={1} value={missed}
                          onChange={(e) => setMissed(Number(e.target.value))}
                          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#c04a3d]"
                        />
                        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-white/25">
                          <span>0</span><span>1</span><span>2</span><span>3</span>
                        </div>
                      </div>
                      {[["New projection", current.projected], ["Confidence", `${current.confidence}%`], ["Risk level", current.risk]].map(([label, val]) => (
                        <div key={label} className="rounded-[26px] border border-white/8 bg-white/[0.03] p-4">
                          <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/32 mb-1.5">{label}</div>
                          <div className="text-lg text-white/85">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calendar blocking panel */}
                <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#e6d3bf]">
                      <CalendarDays className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="text-[0.65rem] uppercase tracking-[0.18em] text-white/35">Calendar protection</div>
                      <div className={`${serif} mt-0.5 text-[1.6rem] leading-tight`}>Your week, already blocked.</div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {calendarRows.map((row) => (
                      <div key={row.day} className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                        row.state === "done" ? "border-[#59705b]/18 bg-[#59705b]/8"
                          : row.state === "missed" ? "border-[#8d433c]/22 bg-[#8d433c]/8"
                          : "border-white/8 bg-white/[0.025]"
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 text-sm uppercase tracking-[0.18em] text-white/40">{row.day}</div>
                          <div className="text-sm text-white/78">{row.block}</div>
                        </div>
                        <div className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${
                          row.state === "done" ? "bg-[#6b886d]/18 text-[#c8ddca]"
                            : row.state === "missed" ? "bg-[#8d433c]/18 text-[#f0c9c3]"
                            : "bg-white/6 text-white/42"
                        }`}>{row.state}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[20px] border border-white/8 bg-black/25 p-4">
                    <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/30 mb-2">Premium action</div>
                    <p className="text-sm leading-6 text-white/65">
                      Forge automatically inserts recovery blocks after slippage — instead of leaving you to figure it out later.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── 5. UNIQUE FEATURES (warm bg, 4 interactive demos) ── */}
        <section className="bg-[#eee9de] py-20 md:py-28">
          <div className={sectionWrap}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-black/55 backdrop-blur">No other app does this</span>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-5 grid gap-6 md:grid-cols-2 md:items-end">
                <h2 className={`${serif} text-[2.8rem] leading-[0.97] md:text-[4rem]`}>
                  Four features built from<br />real user complaints.
                </h2>
                <p className="text-[1.02rem] leading-8 text-black/60">
                  Every one of these came directly from what people say they hate about every other productivity app. All four demos are interactive — try them.
                </p>
              </motion.div>

              <div className="mt-12 grid gap-5 md:grid-cols-2">
                <SlipModeDemo serif={serif} />
                <DeadlineHonesty serif={serif} />
                <OneTapRecovery serif={serif} />
                <ExitInterview serif={serif} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 6. RETENTION LAYER (dark, momentum + pattern + why) ── */}
        <section className="bg-[#111110] py-20 text-white md:py-28">
          <div className={sectionWrap}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/48">What keeps you coming back</span>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-5 grid gap-6 md:grid-cols-2 md:items-end">
                <h2 className={`${serif} text-[2.8rem] leading-[0.97] md:text-[4rem]`}>
                  Not streaks.<br />Momentum.
                </h2>
                <p className="text-[1.02rem] leading-8 text-white/58">
                  Streak counters make people feel guilty and quit. Forge replaces streaks with a momentum score, a pattern discovery engine, and a "why" that resurfaces when you need it most.
                </p>
              </motion.div>

              {/* Row 1: Momentum Score + Cost of Today */}
              <div className="mt-12 grid gap-5 md:grid-cols-[1.15fr_0.85fr]">

                {/* Momentum Score */}
                <motion.div variants={fadeUp} className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/35">Momentum Score</div>
                  <h3 className={`${serif} text-[1.9rem] leading-tight`}>Not a streak. A score that reflects real effort.</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55 max-w-sm">Factors in consistency, recovery speed, and goal proximity. One missed day doesn't zero it. Getting back fast actually improves it.</p>

                  <div className="mt-7 rounded-[24px] border border-white/8 bg-[#0d0d0c] p-5">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-[0.6rem] uppercase tracking-[0.18em] text-white/30">This week</div>
                        <div className={`${serif} mt-1.5 text-[3.5rem] leading-none`}>78</div>
                        <div className="mt-1 text-xs text-white/35">↑ 4 pts from last week</div>
                      </div>
                      <div className="relative h-24 w-24">
                        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke="url(#sg)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="58" />
                          <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#d7bb9a" /><stop offset="100%" stopColor="#b04a3e" /></linearGradient></defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-white/40">78%</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[["Consistency", 85, "#d7bb9a"], ["Recovery speed", 61, "#c47d6a"], ["Goal proximity", 88, "#a3c4a8"]].map(([label, val, color]) => (
                        <div key={label}>
                          <div className="mb-1.5 flex justify-between text-[10px] uppercase tracking-[0.18em] text-white/32">
                            <span>{label}</span><span>{val}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${val}%`, backgroundColor: color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Cost of Today */}
                <motion.div variants={fadeUp} className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/35">"Cost of Today" Alert</div>
                  <h3 className={`${serif} text-[1.9rem] leading-tight`}>8pm. One message. Impossible to ignore.</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">If today's session is unlogged, Forge sends one notification that shows the exact deadline cost. Not a reminder — a consequence.</p>

                  <div className="mt-7 space-y-4">
                    <div className="overflow-hidden rounded-[22px] bg-[#1c1c1e] p-4">
                      <div className="flex items-start gap-3 rounded-2xl bg-[#2c2c2e] p-4">
                        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-black">
                          <Flame className="h-4 w-4 text-[#f4f0e8]" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] font-medium text-white/90">Forge</div>
                            <div className="text-[10px] text-white/32">8:00 PM</div>
                          </div>
                          <div className="mt-1.5 text-[13px] leading-5 text-white/78">
                            You have <span className="font-medium text-[#e8c4a0]">1 unlogged session</span> today. Missing it moves your deadline to <span className="font-medium text-[#f0a090]">Jul 3</span>.
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button className="rounded-xl bg-[#2c2c2e] py-3 text-sm text-[#4da6f5]">Log now</button>
                        <button className="rounded-xl bg-[#2c2c2e] py-3 text-sm text-white/35">Skip today</button>
                      </div>
                    </div>
                    <div className="rounded-[18px] border border-[#8d433c]/15 bg-[#8d433c]/[0.05] p-4">
                      <div className="text-[0.6rem] uppercase tracking-[0.18em] text-[#8d433c]/75 mb-1.5">The difference</div>
                      <p className="text-sm leading-6 text-white/55">Most apps let you skip silently. Forge shows the real cost before you decide.</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Row 2: Pattern Discovery + Why Resurface + Milestone */}
              <div className="mt-5 grid gap-5 md:grid-cols-3">

                {/* Pattern Discovery */}
                <motion.div variants={fadeUp} className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-7">
                  <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/35">Pattern Discovery</div>
                  <h3 className={`${serif} text-[1.7rem] leading-tight`}>Forge learns when you work best</h3>
                  <p className="mt-2 text-sm leading-6 text-white/52">After 4 weeks, it shows you what you never noticed — and moves your sessions to the times that actually work.</p>

                  <div className="mt-5 rounded-[20px] border border-white/8 bg-[#0d0d0c] p-4">
                    <div className="mb-3 text-[0.58rem] uppercase tracking-[0.18em] text-white/28">Completion heatmap</div>
                    <div className="grid grid-cols-6 gap-1 mb-1.5">
                      {["", "Mo", "Tu", "We", "Th", "Fr"].map((d) => (
                        <div key={d} className="text-center text-[9px] text-white/25">{d}</div>
                      ))}
                    </div>
                    {[
                      { time: "7am",  vals: [45, 91, 38, 29, 88] },
                      { time: "12pm", vals: [72, 68, 55, 61, 70] },
                      { time: "6pm",  vals: [30, 25, 22, 18, 35] },
                      { time: "9pm",  vals: [15, 20, 12, 8,  19] },
                    ].map((row) => (
                      <div key={row.time} className="grid grid-cols-6 gap-1 mb-1">
                        <div className="flex items-center text-[9px] text-white/25">{row.time}</div>
                        {row.vals.map((v, i) => (
                          <div key={i} className="h-7 rounded-lg" style={{
                            backgroundColor: v > 80 ? `rgba(163,196,168,${v/100})` : v > 50 ? `rgba(215,187,154,${v/100})` : `rgba(141,67,60,${Math.max(0.06, v/200)})`,
                          }} />
                        ))}
                      </div>
                    ))}
                    <div className="mt-4 rounded-xl border border-[#a3c4a8]/18 bg-[#a3c4a8]/[0.06] p-3">
                      <p className="text-xs leading-5 text-white/68"><span className="text-[#c8ddca] font-medium">Tue 7am: 91%</span> · Thu 9pm: <span className="text-[#f0a090]">8%</span>. Your calendar has it backwards.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Why Resurface */}
                <motion.div variants={fadeUp} className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-7">
                  <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/35">Why Resurface</div>
                  <h3 className={`${serif} text-[1.7rem] leading-tight`}>Your own words when you're slipping</h3>
                  <p className="mt-2 text-sm leading-6 text-white/52">When you set a goal, you write one sentence explaining why it matters. Forge surfaces it at the exact moment you start drifting.</p>

                  <div className="mt-5 rounded-[20px] border border-white/8 bg-[#0d0d0c] p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#c04a3d]" />
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#c88d86]">2 sessions missed this week</div>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 mb-4">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-2">You said, 3 weeks ago</div>
                      <p className="text-sm leading-6 text-white/80 italic">"I want a different career by December. I'm tired of work that doesn't matter."</p>
                    </div>
                    <p className="text-sm leading-6 text-white/52">December is still reachable — but only if this week recovers.</p>
                  </div>
                </motion.div>

                {/* Milestone Unlocks */}
                <motion.div variants={fadeUp} className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-7">
                  <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/35">Milestone Unlocks</div>
                  <h3 className={`${serif} text-[1.7rem] leading-tight`}>No confetti. An earned forecast update.</h3>
                  <p className="mt-2 text-sm leading-6 text-white/52">A locked confidence update becomes visible only when you've held the deadline for 3 consecutive weeks. You earn the number.</p>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-[20px] border border-[#59705b]/20 bg-[#59705b]/[0.07] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#59705b]">Unlocked · 3 weeks straight</div>
                        <Check className="h-4 w-4 text-[#59705b]" strokeWidth={2.2} />
                      </div>
                      <div className={`${serif} text-[1.4rem]`}>Confidence: 91%</div>
                      <p className="mt-1 text-xs leading-5 text-white/48">21 days held. Projection locked at Jun 12.</p>
                    </div>
                    <div className="rounded-[20px] border border-white/8 bg-white/[0.02] p-4 opacity-38 select-none">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-white/35">Locked · 5 weeks straight</div>
                        <Lock className="h-4 w-4 text-white/25" strokeWidth={2} />
                      </div>
                      <div className={`${serif} text-[1.4rem] blur-sm`}>Confidence: 97%</div>
                      <p className="mt-1 text-xs leading-5 text-white/35 blur-[2px]">Two more weeks to unlock.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 7. PRICING (light) ── */}
        <section className="py-20 md:py-28">
          <div className={sectionWrap}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-black/55 backdrop-blur">Pricing</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className={`${serif} mt-5 text-[2.8rem] leading-[0.97] md:text-[4rem]`}>
                Free to try.<br />€9 when the goal is serious.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 max-w-xl text-[1.02rem] leading-8 text-black/60">
                The free plan gives you the core experience. Premium adds everything that keeps you on track when life gets hard.
              </motion.p>

              <div className="mt-12 grid gap-5 xl:grid-cols-2">
                <PricingCard
                  name="Free"
                  price="€0"
                  badge="Good for trying the core idea"
                  subtitle="Visibility without automation. A solid start."
                  features={["1 goal", "Drift tracking", "Basic weekly plan", "Manual check-ins", "Simple recovery suggestions"]}
                />
                <PricingCard
                  name="Premium"
                  price="€9 / mo"
                  featured
                  badge="Worth it when slipping has a real cost"
                  subtitle="The version that saves time, reduces drift, and keeps the goal alive in your week."
                  features={[
                    "Everything in Free",
                    "Slip mode — auto gear-shift on hard weeks",
                    "Deadline honesty check at goal setup",
                    "Automatic calendar blocking",
                    "One-tap session rescheduling",
                    "Momentum score (not a streak counter)",
                    "Pattern discovery after 4 weeks",
                    "Weekly why-resurface when drifting",
                    "Exit interview instead of spam",
                  ]}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 8. FINAL CTA (dark) ── */}
        <section className="pb-16 pt-4 md:pb-24">
          <div className={sectionWrap}>
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={stagger}
              className="overflow-hidden rounded-[36px] border border-black/10 bg-[linear-gradient(160deg,#151412,#0f0f0e)] px-7 py-14 text-white shadow-[0_32px_100px_rgba(0,0,0,0.22)] md:px-12 md:py-18"
            >
              <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
                <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/48">
                  The point
                </div>
                <h2 className={`${serif} text-[2.8rem] leading-[0.97] md:text-[4.5rem]`}>
                  The goal is not<br />to track more.<br />It is to finish.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-8 text-white/58">
                  Forge is a focused app for one important goal. Plan it, protect it in your calendar, and recover fast when the week goes wrong.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#efe1ca] px-7 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5ead9]">
                    Start free
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-7 py-3.5 text-sm font-medium text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]">
                    Preview prototype <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
