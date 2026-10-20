"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  BookCheck,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Terminal,
  ExternalLink,
  Sparkles,
  Trophy,
} from "lucide-react";

export function StartHereView() {
  const { startHereSteps, toggleStartHereStep, setActiveView } = usePrototype();
  const [expandedStep, setExpandedStep] = useState<string>("sh-1");

  const completedCount = startHereSteps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / startHereSteps.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white via-zinc-50 to-emerald-50/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Beginner Onboarding Pathway
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
              Start Here: Zero to Open Source Contributor
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              New to Git, GitHub, or open-source software? Follow this guided 6-step curriculum
              crafted by VOSC senior students and faculty. Each step unlocks practical skills and
              awards points to your Contribution Passport.
            </p>
          </div>

          {/* Progress Card */}
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 shadow-2xs shrink-0 w-full sm:w-64 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Your Journey</span>
              <span className="font-mono font-bold text-emerald-600">{progressPercent}% Done</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span>{completedCount} of {startHereSteps.length} steps completed</span>
              {progressPercent === 100 && (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> Unlocked!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Guided Steps Accordion List */}
      <div className="space-y-4">
        {startHereSteps.map((step) => {
          const isExpanded = expandedStep === step.id;

          return (
            <div
              key={step.id}
              className={`rounded-xl border transition-all overflow-hidden ${
                step.completed
                  ? "border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              }`}
            >
              {/* Step Header Bar */}
              <div
                onClick={() => setExpandedStep(isExpanded ? "" : step.id)}
                className="p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/60 dark:hover:bg-zinc-850/50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStartHereStep(step.id);
                    }}
                    className={`mt-0.5 sm:mt-0 p-1 rounded-full transition-colors ${
                      step.completed
                        ? "text-emerald-600 hover:text-emerald-700"
                        : "text-zinc-300 hover:text-zinc-500"
                    }`}
                    title={step.completed ? "Mark incomplete" : "Mark as completed"}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-6 h-6 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                        Step 0{step.number}
                      </span>
                      {step.completed && (
                        <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 truncate">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{step.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-zinc-400 hidden sm:inline">
                    {step.checklist.length} checkpoints
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </div>
              </div>

              {/* Step Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 space-y-6">
                  {/* Guide Markdown / Explainer */}
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans">
                    {step.guideMarkdown}
                  </div>

                  {/* Checklist */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
                      Action Checklist:
                    </h5>
                    <div className="space-y-1.5">
                      {step.checklist.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${step.completed ? "bg-emerald-500" : "bg-zinc-400"}`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Related Resources Links & Toggle Completion Button */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-zinc-400">Related actions:</span>
                      {step.resources.map((res, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveView(res.linkView)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-blue-600 hover:bg-zinc-200 transition-colors"
                        >
                          <span>{res.title}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleStartHereStep(step.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-2xs ${
                        step.completed
                          ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {step.completed ? "Mark Step Incomplete" : "Mark Step as Completed ✓"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
