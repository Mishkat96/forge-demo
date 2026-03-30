"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Flame,
  CalendarDays,
  Brain,
  RefreshCcw,
  Check,
  Clock3,
  LineChart,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const serif = "font-serif tracking-[-0.035em]";
const sectionWrap = "mx-auto w-full max-w-7xl px-6 md:px-8";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const driftMap = [
  {
    missed: 0,
    projected: "Jun 12",
    confidence: 84,
    recovery: "No recovery needed",
    message: "You’re still on track.",
    risk: "Low",
  },
  {
    missed: 1,
    projected: "Jun 16",
    confidence: 71,
    recovery: "1 recovery session",
    message: "One miss moved the plan.",
    risk: "Watch it",
  },
  {
    missed: 2,
    projected: "Jun 23",
    confidence: 56,
    recovery: "2 recovery sessions",
    message: "The drift is now visible.",
    risk: "Medium",
  },
  {
    missed: 3,
    projected: "Jul 1",
    confidence: 39,
    recovery: "3 recovery sessions",
    message: "The deadline moved again.",
    risk: "High",
  },
];

function FeatureCard({ icon: Icon, title, body, eyebrow }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-[28px] border border-black/10 bg-white p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
    >
      {eyebrow && (
        <div className="mb-5 inline-flex rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/45">
          {eyebrow}
        </div>
      )}
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-[#f4eee6] text-[#7c5b45]">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <h3 className={`${serif} text-[1.5rem] leading-[1.04] text-black`}>{title}</h3>
      <p className="mt-3 text-sm leading-6 text-black/65">{body}</p>
    </motion.div>
  );
}

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
        <div
          className={`mb-5 inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${
            featured
              ? "border-[#c5a37d]/25 bg-[#d6c0a7]/10 text-[#ead8c1]"
              : "border-black/10 bg-black/[0.03] text-black/45"
          }`}
        >
          {badge}
        </div>
      )}

      <div className="text-[0.72rem] uppercase tracking-[0.2em] text-current/45">{name}</div>
      <div className={`${serif} mt-4 text-5xl leading-none`}>{price}</div>
      <p className={`mt-4 text-sm leading-6 ${featured ? "text-white/68" : "text-black/65"}`}>
        {subtitle}
      </p>

      <div className={`my-7 h-px ${featured ? "bg-white/10" : "bg-black/10"}`} />

      <ul className="space-y-3.5">
        {features.map((item) => (
          <li
            key={item}
            className={`flex items-start gap-3 text-sm ${featured ? "text-white/82" : "text-black/76"}`}
          >
            <span
              className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                featured ? "border-white/15 bg-white/5" : "border-black/10 bg-black/[0.03]"
              }`}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
          featured
            ? "border border-[#d3b390]/20 bg-[#efe1ca] text-black hover:-translate-y-0.5 hover:bg-[#f5ead9]"
            : "border border-black/10 bg-black text-white hover:-translate-y-0.5 hover:bg-black/90"
        }`}
      >
        Choose {name}
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function OneTapRecovery({ serif }) {
  const [done, setDone] = useState(false);
  return (
    <motion.div variants={fadeUp} className="rounded-[32px] border border-black/10 bg-white p-6 md:p-7">
      <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-black/40">Feature 05</div>
      <h3 className={`${serif} text-[1.8rem] leading-tight`}>One-tap recovery</h3>
      <p className="mt-2 text-sm leading-6 text-black/65">No text plan to decipher. One button moves the missed session to the next open slot.</p>

      <div className="mt-6 rounded-[22px] border border-black/8 bg-[#111] p-5 text-white">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#c04a3d]" />
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#c88d86]">Wednesday session missed</div>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/75">
          SQL practice · 90 min · was scheduled for 6pm
        </p>
        <div className="mt-5">
          {done ? (
            <div className="flex items-center gap-3 rounded-2xl border border-[#59705b]/25 bg-[#59705b]/10 px-4 py-3.5">
              <Check className="h-4 w-4 text-[#a3c4a8]" strokeWidth={2.2} />
              <div>
                <div className="text-sm text-[#c8ddca]">Rescheduled to Thu 7:00 AM</div>
                <div className="text-[10px] text-[#a3c4a8]/70 mt-0.5">Deadline holds at Jun 12</div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setDone(true)}
              className="group w-full rounded-2xl border border-[#d3b390]/20 bg-[#efe1ca] px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5ead9]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-black">Reschedule to Thu 7:00 AM</div>
                  <div className="text-[10px] text-black/50 mt-0.5">Keeps deadline at Jun 12</div>
                </div>
                <ArrowRight className="h-4 w-4 text-black/50 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          )}
        </div>
        {!done && (
          <button className="mt-2 w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/40 transition hover:text-white/60">
            I'll handle it myself
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Page() {
  const [missed, setMissed] = useState(1);
  const current = useMemo(() => driftMap[missed], [missed]);

  const progressWidth = `${Math.max(22, 82 - missed * 16)}%`;
  const driftWidth = `${10 + missed * 18}%`;

  const calendarRows = [
    { day: "Mon", block: "SQL practice", state: "done" },
    { day: "Tue", block: "Dashboard project", state: "done" },
    { day: "Wed", block: "Missed deep work", state: "missed" },
    { day: "Thu", block: "Recovery block", state: "planned" },
    { day: "Fri", block: "Portfolio case study", state: "planned" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f0e8] text-black selection:bg-[#b04a3e]/20">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.08),transparent_55%)]" />
        <div className="absolute left-[-12%] top-[10%] h-[440px] w-[440px] rounded-full bg-[#cab79b]/10 blur-3xl" />
        <div className="absolute right-[-12%] top-[22%] h-[440px] w-[440px] rounded-full bg-[#983c33]/[0.07] blur-3xl" />
      </div>

      <main className="relative z-10">
        <section className="border-b border-black/8">
          <div className={`${sectionWrap} pt-6 md:pt-8`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-black text-[#f4f0e8]">
                  <Flame className="h-4.5 w-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[0.72rem] uppercase tracking-[0.22em] text-black/40">Forge</div>
                  <div className={`${serif} -mt-0.5 text-lg`}>Finish the goal you keep delaying</div>
                </div>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <button className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/70 transition hover:border-black/20 hover:bg-white">
                  Pricing
                </button>
                <button className="rounded-full bg-black px-4 py-2 text-sm text-white transition hover:bg-black/90">
                  Start free
                </button>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="grid gap-14 pb-20 pt-14 md:grid-cols-[1.06fr_0.94fr] md:items-end md:pb-28 md:pt-24"
            >
              <div>
                <motion.div variants={fadeUp}>
                  <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
                    FOR ONE GOAL THAT ACTUALLY MATTERS
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className={`${serif} mt-6 max-w-5xl text-[3.2rem] leading-[0.94] md:text-[5.5rem]`}
                >
                  Forge shows
                  <br />
                  when your goal is slipping —
                  <br />
                  and how to fix it.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-6 max-w-2xl text-[1.06rem] leading-8 text-black/68 md:text-[1.12rem]"
                >
                  Not another to-do list. Forge tracks one important goal, forecasts deadline drift,
                  blocks focused sessions into your week, and builds a recovery plan the moment you start slipping.
                </motion.p>

                <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-[#f4f0e8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/92">
                    See how it works
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white/70 px-6 py-3.5 text-sm font-medium text-black/78 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:bg-white">
                    Preview prototype
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2.5">
                  {["Drift forecast", "Calendar blocking", "Recovery plan"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-black/60 backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-[580px] md:ml-auto">
                <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#9b3f33]/10 blur-2xl" />

                <div className="overflow-hidden rounded-[34px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.68))] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                  <div className="rounded-[28px] border border-black/8 bg-[#111111] p-5 text-white md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[0.68rem] uppercase tracking-[0.18em] text-white/40">Goal</div>
                        <div className={`${serif} mt-2 text-[1.9rem] leading-tight`}>
                          Become a data analyst
                        </div>
                      </div>
                      <div className="rounded-full border border-[#b68c68]/25 bg-[#d6c0a7]/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#e6d3bf]">
                        Premium preview
                      </div>
                    </div>

                    <div className="mt-7 grid grid-cols-3 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">Target</div>
                        <div className="mt-2 text-lg">Jun 12</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">Today</div>
                        <div className="mt-2 text-lg">Mar 30</div>
                      </div>
                      <div className="rounded-2xl border border-[#8d433c]/30 bg-[#8d433c]/[0.08] p-4">
                        <div className="text-[0.62rem] uppercase tracking-[0.18em] text-[#c88d86]">
                          Projected
                        </div>
                        <div className="mt-2 text-lg text-[#f0dedc]">{current.projected}</div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                          Weekly risk
                        </div>
                        <div className="text-[0.62rem] uppercase tracking-[0.18em] text-[#ddb8a5]">
                          {current.risk}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/78">
                        You said this goal matters because you want a different career this year. {current.message}
                      </p>
                    </div>

                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/38">
                        <span>Progress vs drift</span>
                        <span>{missed} session{missed !== 1 ? "s" : ""} missed</span>
                      </div>
                      <div className="relative h-3 overflow-hidden rounded-full bg-white/8">
                        <motion.div
                          animate={{ width: progressWidth }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#ede5da,#d7bb9a)]"
                        />
                        <motion.div
                          animate={{ width: driftWidth }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-y-0 right-0 rounded-full bg-[linear-gradient(90deg,#6e2e28,#b04a3e)]"
                        />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">Confidence</div>
                        <div className="mt-2 text-lg">{current.confidence}%</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">Recovery</div>
                        <div className="mt-2 text-lg">{current.recovery}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className={sectionWrap}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="grid gap-10 md:grid-cols-[0.95fr_1.05fr]"
            >
              <div>
                <motion.div variants={fadeUp}>
                  <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
                    WHAT MAKES IT PAYABLE
                  </span>
                </motion.div>
                <motion.h2
                  variants={fadeUp}
                  className={`${serif} mt-5 max-w-xl text-[2.7rem] leading-[0.98] md:text-[4rem]`}
                >
                  It does three useful things
                  <br />
                  your notes app does not.
                </motion.h2>
              </div>

              <motion.p
                variants={fadeUp}
                className="max-w-2xl self-end text-[1.05rem] leading-8 text-black/68"
              >
                Forge is not trying to be a giant productivity suite. It focuses on one job:
                helping you finish one serious goal by forecasting drift, protecting time on your calendar,
                and giving you a clear recovery path when you miss.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="mt-12 grid gap-4 md:grid-cols-3"
            >
              {[
                {
                  title: "Forecasts the slip",
                  body: "Not just what you missed. What it changed in the actual timeline.",
                },
                {
                  title: "Blocks the work",
                  body: "Turns the goal into focused sessions and places them in your week.",
                },
                {
                  title: "Repairs the damage",
                  body: "After a miss, it tells you the fastest way to get back on track.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-[28px] border border-black/10 bg-white p-6 md:p-7"
                >
                  <h3 className={`${serif} text-[1.7rem] leading-tight`}>{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/65">{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-[#0d0d0c] py-20 text-white md:py-28">
          <div className={sectionWrap}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/55">
                  LIVE EXAMPLE
                </span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-6 grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end"
              >
                <div>
                  <h2 className={`${serif} max-w-xl text-[2.7rem] leading-[0.98] md:text-[4.1rem]`}>
                    Missed work
                    <br />
                    should change the plan instantly.
                  </h2>
                </div>
                <p className="max-w-2xl text-[1.04rem] leading-8 text-white/68">
                  Move the slider and see what Premium actually does: update the projected deadline,
                  flag risk, and generate the shortest recovery route.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]"
              >
                <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.4)] md:p-6">
                  <div className="grid gap-4 md:grid-cols-[1fr_250px]">
                    <div className="rounded-[28px] border border-white/8 bg-[#121211] p-5 md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[0.68rem] uppercase tracking-[0.18em] text-white/38">
                            Goal
                          </div>
                          <div className={`${serif} mt-2 text-[1.85rem] leading-tight`}>
                            Become a data analyst
                          </div>
                        </div>
                        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
                          Why?
                        </button>
                      </div>

                      <div className="mt-7 grid grid-cols-3 gap-3">
                        <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                          <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                            Target
                          </div>
                          <div className="mt-2 text-lg">Jun 12</div>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                          <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                            Today
                          </div>
                          <div className="mt-2 text-lg">Mar 30</div>
                        </div>
                        <div className="rounded-2xl border border-[#8d433c]/30 bg-[#8d433c]/[0.08] p-4">
                          <div className="text-[0.62rem] uppercase tracking-[0.18em] text-[#c88d86]">
                            Projected
                          </div>
                          <div className="mt-2 text-lg text-[#f0dedc]">{current.projected}</div>
                        </div>
                      </div>

                      <div className="mt-7">
                        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/38">
                          <span>Progress vs drift</span>
                          <span>{missed} session{missed !== 1 ? "s" : ""} missed</span>
                        </div>
                        <div className="relative h-3 overflow-hidden rounded-full bg-white/7">
                          <motion.div
                            animate={{ width: progressWidth }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#ede5da,#d7bb9a)]"
                          />
                          <motion.div
                            animate={{ width: driftWidth }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-y-0 right-0 rounded-full bg-[linear-gradient(90deg,#6e2e28,#b04a3e)]"
                          />
                        </div>
                      </div>

                      <div className="mt-6 rounded-[24px] border border-white/8 bg-white/[0.025] p-4">
                        <div className="text-[0.66rem] uppercase tracking-[0.18em] text-white/35">
                          Recovery plan
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/78">
                          {current.recovery}. Move one review block to Thursday and protect Friday’s deep work
                          session to hold the original target as closely as possible.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                        <div className="text-[0.68rem] uppercase tracking-[0.18em] text-white/38">
                          Missed sessions
                        </div>
                        <div className={`${serif} mt-2 text-[2.3rem] leading-none`}>{missed}</div>

                        <div className="mt-6">
                          <input
                            type="range"
                            min={0}
                            max={3}
                            step={1}
                            value={missed}
                            onChange={(e) => setMissed(Number(e.target.value))}
                            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#c04a3d]"
                          />
                          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-white/28">
                            <span>0</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                        <div className="text-[0.68rem] uppercase tracking-[0.18em] text-white/38">
                          New projection
                        </div>
                        <div className={`${serif} mt-2 text-[2rem] leading-none`}>{current.projected}</div>
                      </div>

                      <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                        <div className="text-[0.68rem] uppercase tracking-[0.18em] text-white/38">
                          Confidence
                        </div>
                        <div className={`${serif} mt-2 text-[2rem] leading-none`}>{current.confidence}%</div>
                      </div>

                      <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                        <div className="text-[0.68rem] uppercase tracking-[0.18em] text-white/38">Risk</div>
                        <div className="mt-2 text-lg text-white/82">{current.risk}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#e6d3bf]">
                      <CalendarDays className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="text-[0.68rem] uppercase tracking-[0.18em] text-white/38">Calendar protection</div>
                      <div className={`${serif} mt-1 text-[1.8rem] leading-tight`}>Your week, already blocked.</div>
                    </div>
                  </div>

                  <div className="mt-7 space-y-3">
                    {calendarRows.map((row) => (
                      <div
                        key={row.day}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                          row.state === "done"
                            ? "border-[#59705b]/20 bg-[#59705b]/10"
                            : row.state === "missed"
                            ? "border-[#8d433c]/25 bg-[#8d433c]/10"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 text-sm uppercase tracking-[0.18em] text-white/45">{row.day}</div>
                          <div className="text-sm text-white/82">{row.block}</div>
                        </div>
                        <div
                          className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${
                            row.state === "done"
                              ? "bg-[#6b886d]/20 text-[#c8ddca]"
                              : row.state === "missed"
                              ? "bg-[#8d433c]/20 text-[#f0c9c3]"
                              : "bg-white/8 text-white/48"
                          }`}
                        >
                          {row.state}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <div className="text-[0.66rem] uppercase tracking-[0.18em] text-white/35">
                      Premium action
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      Forge automatically adds recovery blocks to the calendar after slippage instead of leaving you to “figure it out later.”
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className={sectionWrap}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
                  HOW IT WORKS
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className={`${serif} mt-5 text-[2.7rem] leading-[0.98] md:text-[4rem]`}
              >
                Simple enough to explain in four steps.
              </motion.h2>

              <div className="mt-12 grid gap-4 md:grid-cols-4">
                {[
                  {
                    step: "Step 1",
                    title: "Set one goal",
                    body: "Choose one real goal, deadline, and available hours each week.",
                  },
                  {
                    step: "Step 2",
                    title: "Build the plan",
                    body: "Forge breaks it into weekly sessions and milestones.",
                  },
                  {
                    step: "Step 3",
                    title: "Protect the week",
                    body: "Premium places those sessions into your calendar automatically.",
                  },
                  {
                    step: "Step 4",
                    title: "Recover fast",
                    body: "If you miss, Forge updates the forecast and generates the comeback plan.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.step}
                    variants={fadeUp}
                    className="relative rounded-[28px] border border-black/10 bg-white p-6 md:p-7"
                  >
                    <div className="absolute right-5 top-5 text-[3.5rem] leading-none text-black/[0.05]">
                      0{idx + 1}
                    </div>
                    <div className="text-[0.68rem] uppercase tracking-[0.18em] text-black/42">
                      {item.step}
                    </div>
                    <h3 className={`${serif} mt-4 text-[1.7rem] leading-tight`}>{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-black/65">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className={sectionWrap}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
                  CORE FEATURES
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className={`${serif} mt-5 max-w-3xl text-[2.7rem] leading-[0.98] md:text-[4rem]`}
              >
                Smaller product.
                <br />
                Better reason to pay.
              </motion.h2>

              <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <FeatureCard
                  icon={LineChart}
                  title="Drift forecast"
                  body="See exactly how missed work changes the finish date."
                  eyebrow="Signature"
                />
                <FeatureCard
                  icon={CalendarDays}
                  title="Calendar blocking"
                  body="Turn the goal into real sessions inside your actual week."
                  eyebrow="Premium utility"
                />
                <FeatureCard
                  icon={RefreshCcw}
                  title="Recovery plan"
                  body="Get the shortest path back after a miss instead of starting over."
                  eyebrow="High value"
                />
                <FeatureCard
                  icon={Brain}
                  title="Weekly review"
                  body="A clean summary of what moved you forward, what slipped, and what to change."
                  eyebrow="Useful insight"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className={sectionWrap}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
            >
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
                  WHAT KEEPS YOU COMING BACK
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-5 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
                <h2 className={`${serif} text-[2.7rem] leading-[0.98] md:text-[4rem]`}>
                  Five mechanics that turn
                  <br />a goal into a habit.
                </h2>
                <p className="max-w-xl text-[1.04rem] leading-8 text-black/65">
                  Not gamification gimmicks. Each one is tied directly to the goal and designed to keep momentum alive past the first week.
                </p>
              </motion.div>

              {/* Row 1: Momentum Score + Cost of Today */}
              <div className="mt-12 grid gap-5 md:grid-cols-[1.15fr_0.85fr]">

                {/* Momentum Score */}
                <motion.div variants={fadeUp} className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
                  <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-black/40">Feature 01</div>
                  <h3 className={`${serif} text-[2rem] leading-tight`}>Momentum Score</h3>
                  <p className="mt-2 text-sm leading-6 text-black/65">Not a streak. A score that factors in consistency, how fast you recover, and how close you are to the deadline. Harder to game, more meaningful to watch grow.</p>

                  <div className="mt-7 rounded-[26px] border border-black/8 bg-[#111] p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">Momentum Score</div>
                        <div className={`${serif} mt-2 text-[3.8rem] leading-none`}>78</div>
                        <div className="mt-1.5 text-xs text-white/40">↑ 4 pts from last week</div>
                      </div>
                      <div className="relative h-24 w-24">
                        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="58" />
                          <defs>
                            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#d7bb9a" />
                              <stop offset="100%" stopColor="#b04a3e" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-white/45">78%</div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {[
                        { label: "Consistency", value: 85, color: "#d7bb9a" },
                        { label: "Recovery speed", value: 61, color: "#c47d6a" },
                        { label: "Goal proximity", value: 88, color: "#a3c4a8" },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="mb-1.5 flex justify-between text-[10px] uppercase tracking-[0.18em] text-white/38">
                            <span>{item.label}</span>
                            <span>{item.value}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                            <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Cost of Today */}
                <motion.div variants={fadeUp} className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
                  <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-black/40">Feature 02</div>
                  <h3 className={`${serif} text-[2rem] leading-tight`}>"Cost of today" alert</h3>
                  <p className="mt-2 text-sm leading-6 text-black/65">At 8pm, if the session is unlogged, Forge sends one message that makes the cost of skipping impossible to ignore.</p>

                  <div className="mt-7 space-y-4">
                    <div className="overflow-hidden rounded-[24px] bg-[#1c1c1e] p-4">
                      <div className="flex items-start gap-3 rounded-2xl bg-[#2c2c2e] p-4">
                        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-black">
                          <Flame className="h-4 w-4 text-[#f4f0e8]" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-[11px] font-medium text-white/90">Forge</div>
                            <div className="text-[10px] text-white/35 flex-shrink-0">8:00 PM</div>
                          </div>
                          <div className="mt-1.5 text-[13px] leading-5 text-white/80">
                            You have <span className="font-medium text-[#e8c4a0]">1 unlogged session</span> today. Missing it moves your deadline to <span className="font-medium text-[#f0a090]">Jul 3</span>.
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button className="rounded-xl bg-[#2c2c2e] py-3 text-sm text-[#4da6f5]">Log now</button>
                        <button className="rounded-xl bg-[#2c2c2e] py-3 text-sm text-white/40">Skip today</button>
                      </div>
                    </div>

                    <div className="rounded-[20px] border border-[#8d433c]/15 bg-[#8d433c]/[0.05] p-4">
                      <div className="text-[0.62rem] uppercase tracking-[0.18em] text-[#8d433c]/80">The difference</div>
                      <p className="mt-2 text-sm leading-6 text-black/65">Most apps let you skip silently. Forge makes the cost visible before you decide.</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Row 2: Why Resurface + Milestone + One-tap Recovery */}
              <div className="mt-5 grid gap-5 md:grid-cols-3">

                {/* Why Resurface */}
                <motion.div variants={fadeUp} className="rounded-[32px] border border-black/10 bg-white p-6 md:p-7">
                  <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-black/40">Feature 03</div>
                  <h3 className={`${serif} text-[1.8rem] leading-tight`}>The "why" resurface</h3>
                  <p className="mt-2 text-sm leading-6 text-black/65">When you slip, Forge brings back the reason you started — in your own words, at the exact right moment.</p>

                  <div className="mt-6 rounded-[22px] border border-black/8 bg-[#111] p-5 text-white">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#c04a3d]" />
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#c88d86]">2 sessions missed this week</div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/35">You said, 3 weeks ago</div>
                      <p className="mt-2 text-sm leading-6 text-white/85 italic">"I want a different career by December. I'm tired of doing work that doesn't matter."</p>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/60">December is still reachable — but only if this week recovers.</p>
                  </div>
                </motion.div>

                {/* Milestone Unlocks */}
                <motion.div variants={fadeUp} className="rounded-[32px] border border-black/10 bg-white p-6 md:p-7">
                  <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-black/40">Feature 04</div>
                  <h3 className={`${serif} text-[1.8rem] leading-tight`}>Milestone unlocks</h3>
                  <p className="mt-2 text-sm leading-6 text-black/65">No confetti. A locked forecast update that only becomes visible when you earn it.</p>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-[22px] border border-[#59705b]/20 bg-[#59705b]/[0.06] p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#59705b]">Unlocked · 3 weeks straight</div>
                        <Check className="h-4 w-4 text-[#59705b]" strokeWidth={2.2} />
                      </div>
                      <div className={`${serif} mt-2 text-[1.45rem]`}>Confidence: 91%</div>
                      <p className="mt-1 text-xs leading-5 text-black/55">You held the deadline for 21 days. Projection locked at Jun 12.</p>
                    </div>

                    <div className="rounded-[22px] border border-black/8 bg-black/[0.02] p-4 opacity-40 select-none">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-black/40">Locked · 5 weeks straight</div>
                        <div className="h-4 w-4 rounded-full border border-black/15" />
                      </div>
                      <div className={`${serif} mt-2 text-[1.45rem] blur-sm`}>Confidence: 97%</div>
                      <p className="mt-1 text-xs leading-5 text-black/40 blur-[2px]">Two more weeks to unlock this forecast.</p>
                    </div>
                  </div>
                </motion.div>

                {/* One-tap Recovery */}
                <OneTapRecovery serif={serif} />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#11110f] py-20 text-white md:py-28">
          <div className={sectionWrap}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/55">
                  WHY SOMEONE PAYS €9
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className={`${serif} mt-5 text-[2.7rem] leading-[0.98] md:text-[4rem]`}
              >
                Because it saves
                <br />
                the most dangerous week:
                <br />
                the week after you slip.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-3xl text-[1.04rem] leading-8 text-white/68"
              >
                Free tools store tasks. Premium Forge protects momentum: it forecasts drift, blocks time,
                and rebuilds the plan before one bad week becomes a lost month.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-12 grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: Clock3,
                    title: "Less wasted time",
                    body: "Misses immediately turn into a revised plan instead of vague guilt.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "More structure",
                    body: "The goal lives in the calendar, not in good intentions.",
                  },
                  {
                    icon: AlertCircle,
                    title: "Earlier correction",
                    body: "Users see drift while it is still recoverable, not weeks later.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-7"
                  >
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#e8d6bf]">
                      <item.icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h3 className={`${serif} text-[1.7rem] leading-tight`}>{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/68">{item.body}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className={sectionWrap}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div variants={fadeUp}>
                <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
                  PRICING
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className={`${serif} mt-5 text-[2.7rem] leading-[0.98] md:text-[4rem]`}
              >
                Free to try.
                <br />
                €9 when the goal is serious.
              </motion.h2>

              <div className="mt-12 grid gap-5 xl:grid-cols-2">
                <PricingCard
                  name="Free"
                  price="€0"
                  badge="Good for trying the core idea"
                  subtitle="A simple version for people who want visibility without automation."
                  features={[
                    "1 goal",
                    "Basic drift tracking",
                    "Basic weekly plan",
                    "Manual check-ins",
                    "Simple recovery suggestions",
                  ]}
                />
                <PricingCard
                  name="Premium"
                  price="€9"
                  featured
                  badge="Worth it when slipping has a real cost"
                  subtitle="The version that saves time, reduces drift, and keeps the goal alive in your week."
                  features={[
                    "Everything in Free",
                    "Automatic calendar blocking",
                    "Projected deadline forecast",
                    "Fast recovery plan after misses",
                    "Weekly review with next-step recommendations",
                    "Smarter accountability messages",
                  ]}
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-16 pt-6 md:pb-24">
          <div className={sectionWrap}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="overflow-hidden rounded-[36px] border border-black/10 bg-[linear-gradient(180deg,#151412,#0f0f0e)] px-6 py-12 text-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] md:px-10 md:py-16"
            >
              <motion.div variants={fadeUp} className="mx-auto max-w-4xl text-center">
                <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/55">
                  FINAL CTA
                </div>

                <h2 className={`${serif} text-[2.7rem] leading-[0.98] md:text-[4.7rem]`}>
                  The goal is not
                  <br />
                  to track more.
                  <br />
                  It is to finish.
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-8 text-white/66">
                  Forge is a focused app for one important goal: plan it, protect it in your calendar,
                  and recover fast when the week goes wrong.
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#efe1ca] px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5ead9]">
                    Start free
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]">
                    Preview prototype
                    <Sparkles className="h-4 w-4" />
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