"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  Search,
  X,
  Calendar,
  BookOpen,
  FolderGit2,
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";

type SearchCategory =
  | "all"
  | "events"
  | "learning"
  | "projects"
  | "opportunities"
  | "students"
  | "mentors"
  | "journal"
  | "knowledge";

export function UniversalSearchView() {
  const {
    events,
    learningResources,
    projects,
    opportunities,
    students,
    mentors,
    journalArticles,
    collegeKnowledge,
    openDetailModal,
    searchQuery,
    setSearchQuery,
  } = usePrototype();

  const [category, setCategory] = useState<SearchCategory>("all");

  const query = searchQuery.trim().toLowerCase();

  const popularSearches = [
    "Next.js",
    "GSoC",
    "Hackathon",
    "PyTorch",
    "Docker",
    "Vasavi Nav",
    "Research",
    "Git",
  ];

  // Search aggregations
  const matchedEvents = events
    .filter((e) => !query || e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query))
    .map((e) => ({
      id: `evt-${e.id}`,
      type: "event" as const,
      categoryName: "Events",
      title: e.title,
      snippet: e.description,
      meta: `${e.date} · ${e.category}`,
      raw: e,
    }));

  const matchedLearning = learningResources
    .filter((l) => !query || l.title.toLowerCase().includes(query) || l.description.toLowerCase().includes(query) || l.tags.some((t) => t.toLowerCase().includes(query)))
    .map((l) => ({
      id: `lr-${l.id}`,
      type: "learning" as const,
      categoryName: "Learning",
      title: l.title,
      snippet: l.description,
      meta: `${l.category} · ${l.difficulty}`,
      raw: l,
    }));

  const matchedProjects = projects
    .filter((p) => !query || p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.techStack.some((t) => t.toLowerCase().includes(query)))
    .map((p) => ({
      id: `proj-${p.id}`,
      type: "project" as const,
      categoryName: "Projects",
      title: p.title,
      snippet: p.description,
      meta: `${p.domain} · ${p.status}`,
      raw: p,
    }));

  const matchedOpportunities = opportunities
    .filter((o) => !query || o.title.toLowerCase().includes(query) || o.description.toLowerCase().includes(query) || o.skills.some((s) => s.toLowerCase().includes(query)))
    .map((o) => ({
      id: `opp-${o.id}`,
      type: "opportunity" as const,
      categoryName: "Opportunities",
      title: o.title,
      snippet: o.description,
      meta: `${o.organization} · ${o.type}`,
      raw: o,
    }));

  const matchedStudents = students
    .filter((s) => !query || s.name.toLowerCase().includes(query) || s.bio.toLowerCase().includes(query) || s.skills.some((sk) => sk.toLowerCase().includes(query)))
    .map((s) => ({
      id: `std-${s.id}`,
      type: "student" as const,
      categoryName: "Students",
      title: s.name,
      snippet: s.bio,
      meta: `${s.year} · ${s.skills.slice(0, 3).join(", ")}`,
      raw: s,
    }));

  const matchedMentors = mentors
    .filter((m) => !query || m.name.toLowerCase().includes(query) || m.bio.toLowerCase().includes(query) || m.expertise.some((ex) => ex.toLowerCase().includes(query)))
    .map((m) => ({
      id: `men-${m.id}`,
      type: "mentor" as const,
      categoryName: "Mentors",
      title: m.name,
      snippet: m.bio,
      meta: `${m.department} · ${m.availability}`,
      raw: m,
    }));

  const matchedArticles = journalArticles
    .filter((a) => !query || a.title.toLowerCase().includes(query) || a.excerpt.toLowerCase().includes(query))
    .map((a) => ({
      id: `art-${a.id}`,
      type: "article" as const,
      categoryName: "Journal",
      title: a.title,
      snippet: a.excerpt,
      meta: `${a.authorName} · ${a.readingTime}`,
      raw: a,
    }));

  const matchedKnowledge = collegeKnowledge
    .filter((k) => !query || k.title.toLowerCase().includes(query) || k.summary.toLowerCase().includes(query) || k.tags.some((t) => t.toLowerCase().includes(query)))
    .map((k) => ({
      id: `know-${k.id}`,
      type: "knowledge" as const,
      categoryName: "Knowledge",
      title: k.title,
      snippet: k.summary,
      meta: `${k.category} · ${k.coordinatorOrContact}`,
      raw: k,
    }));

  let allResults = [
    ...matchedEvents,
    ...matchedLearning,
    ...matchedProjects,
    ...matchedOpportunities,
    ...matchedStudents,
    ...matchedMentors,
    ...matchedArticles,
    ...matchedKnowledge,
  ];

  if (category !== "all") {
    allResults = allResults.filter(
      (r) => r.categoryName.toLowerCase() === category.toLowerCase()
    );
  }

  const handleResultClick = (item: (typeof allResults)[0]) => {
    openDetailModal(item.type as any, item.raw);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
          Universal Search
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Instant full-index discovery across campus events, student projects, learning guides,
          opportunities, and mentors.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by keyword, technology (e.g. Next.js, PyTorch), event, or mentor..."
          className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggested Search Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-zinc-400 mr-1">Popular searches:</span>
        {popularSearches.map((term) => (
          <button
            key={term}
            onClick={() => setSearchQuery(term)}
            className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {term}
          </button>
        ))}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-zinc-200 dark:border-zinc-800 text-xs">
        {[
          { id: "all", label: "All Records", count: allResults.length },
          { id: "events", label: "Events", count: matchedEvents.length },
          { id: "learning", label: "Learning", count: matchedLearning.length },
          { id: "projects", label: "Projects", count: matchedProjects.length },
          { id: "opportunities", label: "Opportunities", count: matchedOpportunities.length },
          { id: "students", label: "Students", count: matchedStudents.length },
          { id: "mentors", label: "Faculty Mentors", count: matchedMentors.length },
          { id: "journal", label: "Journal Articles", count: matchedArticles.length },
          { id: "knowledge", label: "Knowledge Hub", count: matchedKnowledge.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategory(tab.id as SearchCategory)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              category === tab.id
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs font-semibold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                category === tab.id
                  ? "bg-white/20 text-white dark:bg-black/20 dark:text-zinc-900"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {allResults.length === 0 ? (
          <div className="text-center py-16 p-6 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-3">
            <Search className="w-8 h-8 text-zinc-400 mx-auto stroke-1" />
            <h4 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              No matching records found
            </h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              We couldn't find any items matching "{searchQuery}". Try different keywords or clear the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategory("all");
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 text-white hover:opacity-90 transition-opacity"
            >
              Clear Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {allResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleResultClick(item)}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {item.categoryName}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[200px]">
                      {item.meta}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-zinc-400 font-mono">Click to view details</span>
                  <span className="font-semibold text-blue-600 flex items-center gap-1 group-hover:underline">
                    Inspect <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
