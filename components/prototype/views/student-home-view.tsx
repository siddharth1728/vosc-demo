"use client";

import React from "react";
import { usePrototype } from "../context/prototype-context";
import {
  Compass,
  ArrowRight,
  Calendar,
  BookOpen,
  FolderGit2,
  Briefcase,
  Sparkles,
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Award,
  Bell,
  Sparkle,
} from "lucide-react";

export function StudentHomeView() {
  const {
    currentUserProfile,
    userPoints,
    events,
    learningPaths,
    projects,
    opportunities,
    announcements,
    activities,
    setActiveView,
    openDetailModal,
    toggleEventRegistration,
  } = usePrototype();

  const registeredEvents = events.filter((e) => e.isRegistered);
  const upcomingEvents = events.filter((e) => e.status === "upcoming").slice(0, 2);
  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 3);
  const topOpportunities = opportunities.slice(0, 2);
  const activePath = learningPaths[0]; // Modern Web Architecture

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Welcome Greeting & Stats Header */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white via-zinc-50 to-zinc-100/60 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {currentUserProfile.year}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {currentUserProfile.rollNumberDemo}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
              Welcome back, {currentUserProfile.name.split(" ")[0]} 👋
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Your personalized hub for technical growth at Vasavi College. Discover campus projects,
              register for upcoming workshops, and advance your open-source journey.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 shrink-0">
            <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs text-center">
              <span className="text-[11px] text-zinc-500 font-mono uppercase block mb-1">
                Passport
              </span>
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {userPoints}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium block">Level 3 Contributor</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs text-center">
              <span className="text-[11px] text-zinc-500 font-mono uppercase block mb-1">
                Events
              </span>
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {registeredEvents.length}
              </span>
              <span className="text-[10px] text-zinc-400 block">Registered</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs text-center">
              <span className="text-[11px] text-zinc-500 font-mono uppercase block mb-1">
                Learning
              </span>
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">2</span>
              <span className="text-[10px] text-zinc-400 block">In Progress</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs text-center">
              <span className="text-[11px] text-zinc-500 font-mono uppercase block mb-1">
                Team
              </span>
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1</span>
              <span className="text-[10px] text-zinc-400 block">Active Project</span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-6 pt-6 border-t border-zinc-200/80 dark:border-zinc-800 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveView("start-here")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 shadow-2xs transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            Beginner Journey (Start Here)
          </button>
          <button
            onClick={() => setActiveView("navigator")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
          >
            <Sparkle className="w-3.5 h-3.5 text-blue-600" />
            Launch Student Navigator
          </button>
          <button
            onClick={() => setActiveView("opportunities")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 transition-colors"
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            Explore Internships & Hackathons
          </button>
          <button
            onClick={() => setActiveView("collaboration")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-purple-600" />
            Find Project Teammates
          </button>
        </div>
      </div>

      {/* 2. Announcements Ticker / Highlight */}
      {announcements.length > 0 && (
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                  {announcements[0].category}
                </span>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {announcements[0].title}
                </span>
              </div>
              <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                {announcements[0].excerpt}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveView("events")}
            className="text-xs font-semibold text-blue-600 hover:underline shrink-0 flex items-center gap-1"
          >
            <span>Details</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 3. Two Column Layout: In-Progress Learning & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: In-Progress Curriculum & Featured Projects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Learning Path Card */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  Active Learning Path
                </h3>
              </div>
              <button
                onClick={() => setActiveView("learning")}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                Learning Hub <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase text-zinc-500">
                    {activePath.category} · {activePath.difficulty}
                  </span>
                  <h4 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mt-0.5">
                    {activePath.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                    {activePath.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-lg font-mono font-bold text-blue-600">
                    {activePath.progressPercent}%
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-mono">Progress</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${activePath.progressPercent}%` }}
                />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  Next lesson: <strong>State Management in React 19</strong>
                </span>
                <button
                  onClick={() => setActiveView("learning")}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
                >
                  Continue Course
                </button>
              </div>
            </div>
          </div>

          {/* Featured Student Projects */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  Featured Community Projects
                </h3>
              </div>
              <button
                onClick={() => setActiveView("projects")}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                All Projects <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {featuredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => openDetailModal("project", proj)}
                  className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all cursor-pointer bg-zinc-50/50 dark:bg-zinc-850 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                      <span>{proj.domain}</span>
                      <span>★ {proj.starsCount}</span>
                    </div>
                    <h5 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {proj.title}
                    </h5>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {proj.tagline}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500 font-mono">{proj.status}</span>
                    <span className="text-blue-600 font-semibold group-hover:underline">
                      View →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Upcoming Events & Recommended Opportunities */}
        <div className="space-y-6">
          {/* Upcoming Events Box */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  Upcoming Events
                </h3>
              </div>
              <button
                onClick={() => setActiveView("events")}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                      {evt.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">{evt.date}</span>
                  </div>
                  <h5 className="font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                    {evt.title}
                  </h5>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-zinc-500 truncate max-w-[130px]">{evt.location}</span>
                    <button
                      onClick={() => toggleEventRegistration(evt.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                        evt.isRegistered
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                      }`}
                    >
                      {evt.isRegistered ? "Registered" : "Register"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Opportunities */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  Opportunities
                </h3>
              </div>
              <button
                onClick={() => setActiveView("opportunities")}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {topOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => openDetailModal("opportunity", opp)}
                  className="p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors text-xs space-y-1.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {opp.type}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">Due {opp.deadline}</span>
                  </div>
                  <h5 className="font-semibold text-zinc-900 dark:text-zinc-100">{opp.title}</h5>
                  <p className="text-[11px] text-zinc-500">{opp.organization}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent Contribution Activity Timeline */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Recent Activity & Growth Timeline
            </h3>
          </div>
          <button
            onClick={() => setActiveView("passport")}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Contribution Passport →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {activities.slice(0, 3).map((act) => (
            <div
              key={act.id}
              className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400">{act.date}</span>
                <span className="text-[10px] font-bold text-emerald-600 font-mono">
                  +{act.points} pts
                </span>
              </div>
              <h6 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                {act.title}
              </h6>
              <p className="text-[11px] text-zinc-500 line-clamp-1">{act.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
