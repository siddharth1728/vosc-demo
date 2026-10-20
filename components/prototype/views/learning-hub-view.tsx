"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  BookOpen,
  Search,
  CheckCircle2,
  Circle,
  Clock,
  Award,
  Layers,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function LearningHubView() {
  const {
    learningResources,
    learningPaths,
    toggleLessonCompleted,
    openDetailModal,
  } = usePrototype();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("All");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectedPathId, setSelectedPathId] = useState<string>(learningPaths[0].id);

  const categories = [
    "All",
    "Web Development",
    "Backend Engineering",
    "AI & Machine Learning",
    "Cybersecurity",
    "Cloud & DevOps",
    "Open Source",
    "Programming Fundamentals",
    "Data Structures & Algorithms",
  ];

  const filteredResources = learningResources.filter((res) => {
    const matchesCat = activeCategory === "All" || res.category === activeCategory;
    const matchesDiff = activeDifficulty === "All" || res.difficulty === activeDifficulty;
    const matchesSearch =
      !searchFilter ||
      res.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      res.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCat && matchesDiff && matchesSearch;
  });

  const currentPath = learningPaths.find((p) => p.id === selectedPathId) || learningPaths[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
          Learning Hub
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
          Curated engineering curriculums, interactive guides, and hands-on labs built by VOSC
          mentors to prepare students for real-world software development.
        </p>
      </div>

      {/* Featured Structured Learning Paths */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Featured Learning Paths
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Structured step-by-step tracks
          </span>
        </div>

        {/* Path Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {learningPaths.map((path) => (
            <div
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedPathId === path.id
                  ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 shadow-xs"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {path.difficulty}
                </span>
                <span className="text-xs font-mono font-bold text-blue-600">
                  {path.progressPercent}%
                </span>
              </div>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">
                {path.title}
              </h4>
              <p className="text-xs text-zinc-500 line-clamp-2 mt-1">{path.description}</p>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${path.progressPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Selected Path Curriculum Detail Deck */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold">
                Active Track Curriculum
              </span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {currentPath.title}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">{currentPath.estimatedTime}</p>
            </div>
            {currentPath.badgeEarned && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Unlocks badge: {currentPath.badgeEarned}</span>
              </div>
            )}
          </div>

          {/* Lessons Checklist */}
          <div className="space-y-2.5">
            {currentPath.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                onClick={() => toggleLessonCompleted(currentPath.id, lesson.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  lesson.completed
                    ? "border-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/10"
                    : "border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLessonCompleted(currentPath.id, lesson.id);
                    }}
                    className="p-1 text-zinc-300 hover:text-emerald-600"
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="w-5 h-5 fill-emerald-100 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-zinc-400" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-zinc-400 block">
                      Lesson 0{idx + 1} · {lesson.duration} · {lesson.type}
                    </span>
                    <h5
                      className={`font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate ${
                        lesson.completed ? "line-through text-zinc-400" : ""
                      }`}
                    >
                      {lesson.title}
                    </h5>
                    <p className="text-[11px] text-zinc-500 line-clamp-1">{lesson.summary}</p>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-semibold whitespace-nowrap px-2.5 py-1 rounded ${
                    lesson.completed
                      ? "bg-emerald-100 text-emerald-700 font-mono"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  {lesson.completed ? "Completed ✓" : "Mark Done"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Library Browser */}
      <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Resource Library
            </h2>
            <p className="text-xs text-zinc-500">
              Showing {filteredResources.length} engineering resources
            </p>
          </div>

          {/* Search within resources */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search tutorials, labs, topics..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-2xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                    {res.category}
                  </span>
                  <span className="text-zinc-400">{res.difficulty}</span>
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">
                  {res.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {res.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-50 dark:bg-zinc-800 text-zinc-500 border border-zinc-200/60 dark:border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-mono text-[11px]">
                  {res.duration} · {res.format}
                </span>
                <button
                  onClick={() => openDetailModal("learning", res)}
                  className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  Explore <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
