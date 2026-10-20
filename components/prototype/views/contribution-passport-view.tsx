"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  GraduationCap,
  Award,
  GitPullRequest,
  GitBranch,
  Users,
  Trophy,
  Sparkles,
  Calendar,
  BookOpen,
  FolderGit2,
  Plus,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export function ContributionPassportView() {
  const {
    currentUserProfile,
    userPoints,
    badges,
    activities,
    learningPaths,
    events,
    projects,
    simulateActivity,
  } = usePrototype();

  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [simTitle, setSimTitle] = useState("");
  const [simPoints, setSimPoints] = useState(30);

  const registeredCount = events.filter((e) => e.isRegistered).length;
  const joinedProjects = projects.filter((p) => p.hasExpressedInterest).length;

  // Level computation: e.g. Level 1: 0-100, Level 2: 101-250, Level 3: 251-500, Level 4: 501+
  const currentLevel = userPoints >= 500 ? 4 : userPoints >= 250 ? 3 : userPoints >= 100 ? 2 : 1;
  const nextLevelThreshold = currentLevel === 1 ? 100 : currentLevel === 2 ? 250 : currentLevel === 3 ? 500 : 1000;
  const prevLevelThreshold = currentLevel === 1 ? 0 : currentLevel === 2 ? 100 : currentLevel === 3 ? 250 : 500;
  const levelProgress = Math.min(
    100,
    Math.round(((userPoints - prevLevelThreshold) / (nextLevelThreshold - prevLevelThreshold)) * 100)
  );

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "GitPullRequest":
        return <GitPullRequest className="w-5 h-5 text-purple-600" />;
      case "GitBranch":
        return <GitBranch className="w-5 h-5 text-blue-600" />;
      case "Users":
        return <Users className="w-5 h-5 text-emerald-600" />;
      case "Trophy":
        return <Trophy className="w-5 h-5 text-amber-600" />;
      default:
        return <Award className="w-5 h-5 text-indigo-600" />;
    }
  };

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simTitle.trim()) return;
    simulateActivity(simTitle.trim(), "PR Merged", simPoints);
    toast.success(`Simulated milestone recorded: +${simPoints} points!`, {
      description: "Passport points and milestone progress updated.",
    });
    setSimTitle("");
    setIsSimulateModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Passport Identity Deck */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 text-white p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={currentUserProfile.avatar}
                alt={currentUserProfile.name}
                className="w-18 h-18 rounded-2xl object-cover border-2 border-white/20 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-900" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-white/10 text-zinc-300">
                  {currentUserProfile.rollNumberDemo}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Vasavi Open Source Passport
                </span>
              </div>
              <h1 className="text-2xl font-black tracking-tight">{currentUserProfile.name}</h1>
              <p className="text-xs text-zinc-400">
                {currentUserProfile.year} · {currentUserProfile.department}
              </p>
            </div>
          </div>

          {/* Milestone Tier Indicator */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 shrink-0 w-full sm:w-60 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 uppercase">Tier</span>
              <span className="font-bold text-amber-400">Level {currentLevel} Contributor</span>
            </div>
            <div className="text-2xl font-bold font-mono tracking-tight text-white">
              {userPoints} <span className="text-xs font-normal text-zinc-400">PTS</span>
            </div>
            {/* Progress to next level */}
            <div className="space-y-1">
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
              <span className="text-[10px] text-zinc-400 font-mono block text-right">
                {levelProgress}% to Level {currentLevel + 1}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Growth Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
          <div>
            <span className="text-zinc-400 font-mono text-[11px] block">Verified Badges</span>
            <span className="text-lg font-bold font-mono">{badges.length} Earned</span>
          </div>
          <div>
            <span className="text-zinc-400 font-mono text-[11px] block">Workshops Attended</span>
            <span className="text-lg font-bold font-mono">{registeredCount} Sessions</span>
          </div>
          <div>
            <span className="text-zinc-400 font-mono text-[11px] block">Active Projects</span>
            <span className="text-lg font-bold font-mono">{joinedProjects} Codebases</span>
          </div>
          <div>
            <span className="text-zinc-400 font-mono text-[11px] block">Recorded Activities</span>
            <span className="text-lg font-bold font-mono">{activities.length} Milestones</span>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Bar */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Prototype Growth Simulation
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            (Test adding points to live meters)
          </span>
        </div>
        <button
          onClick={() => setIsSimulateModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Simulate New Contribution</span>
        </button>
      </div>

      {/* Earned Badges Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Earned Badges & Milestones
          </h2>
          <span className="text-xs text-zinc-400 font-mono">{badges.length} verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700">
                  {getBadgeIcon(badge.iconName)}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  {badge.level}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{badge.name}</h4>
                <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">{badge.description}</p>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 block pt-1 border-t border-zinc-100 dark:border-zinc-800">
                Earned {badge.earnedDate}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Stream */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          Contribution Activity Ledger
        </h2>

        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800">
          {activities.map((act) => (
            <div key={act.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.2 rounded text-[10px] font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {act.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">{act.date}</span>
                </div>
                <h4 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                  {act.title}
                </h4>
                <p className="text-[11px] text-zinc-500 line-clamp-1">{act.details}</p>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-600 shrink-0">
                +{act.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Simulate Modal */}
      {isSimulateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              Simulate New Contribution
            </h3>
            <p className="text-xs text-zinc-500">
              Record a simulated achievement to test the local growth meters in real time.
            </p>

            <form onSubmit={handleSimulateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-500 mb-1">Achievement Description</label>
                <input
                  type="text"
                  placeholder="e.g., Merged PR #24 in Campus Nav"
                  value={simTitle}
                  onChange={(e) => setSimTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-zinc-500 mb-1">Points to Award</label>
                <input
                  type="number"
                  min={10}
                  max={100}
                  step={5}
                  value={simPoints}
                  onChange={(e) => setSimPoints(parseInt(e.target.value) || 25)}
                  className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsSimulateModalOpen(false)}
                  className="px-4 py-2 rounded-lg font-medium text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                >
                  Award Points
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
