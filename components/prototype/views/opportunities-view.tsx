"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  Briefcase,
  Search,
  Bookmark,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export function OpportunitiesView() {
  const {
    opportunities,
    toggleSaveOpportunity,
    applyOpportunity,
    openDetailModal,
  } = usePrototype();

  const [activeTab, setActiveTab] = useState<"all" | "saved" | "applied">("all");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const types = ["All", "Internship", "Hackathon", "Open Source Program", "Research Position", "Competition"];

  const savedCount = opportunities.filter((o) => o.isSaved).length;
  const appliedCount = opportunities.filter((o) => o.applicationStatus === "applied" || o.applicationStatus === "interviewing").length;

  const filteredOpportunities = opportunities.filter((opp) => {
    if (activeTab === "saved" && !opp.isSaved) return false;
    if (activeTab === "applied" && opp.applicationStatus === "not_applied") return false;
    const matchesType = typeFilter === "All" || opp.type === typeFilter;
    const matchesSearch =
      !search ||
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.organization.toLowerCase().includes(search.toLowerCase()) ||
      opp.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
          Opportunities Board
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
          Curated internships, hackathons, research positions, and open-source fellowship programs
          relevant to Vasavi students. Track deadlines and simulated application statuses.
        </p>
      </div>

      {/* Tabs & Filters */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              All Listings ({opportunities.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                activeTab === "saved"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved Bookmarks ({savedCount})
            </button>
            <button
              onClick={() => setActiveTab("applied")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                activeTab === "applied"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              My Tracked Applications ({appliedCount})
            </button>
          </div>

          <span className="text-[11px] font-mono text-zinc-400">
            Simulated application tracker
          </span>
        </div>

        {/* Search & Type Select */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, company, or required skill (e.g. PyTorch, Go)..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  typeFilter === t
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="space-y-3.5">
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-12 p-6 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-xs text-zinc-400">
            No opportunities match your current filters.
          </div>
        ) : (
          filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {opp.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {opp.locationType}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600">
                    {opp.stipendOrPrize}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                    {opp.title}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    {opp.organization}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
                  <span>Eligibility: {opp.eligibility}</span>
                  <span>•</span>
                  <span>Deadline: {opp.deadline}</span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {opp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 md:flex-col md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-zinc-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveOpportunity(opp.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      opp.isSaved
                        ? "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                    title={opp.isSaved ? "Saved" : "Save opportunity"}
                  >
                    <Bookmark className={`w-4 h-4 ${opp.isSaved ? "fill-amber-600" : ""}`} />
                  </button>

                  <button
                    onClick={() => openDetailModal("opportunity", opp)}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 transition-colors"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => applyOpportunity(opp.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-2xs ${
                      opp.applicationStatus === "applied"
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90"
                    }`}
                  >
                    {opp.applicationStatus === "applied" ? "Applied ✓" : "Apply (Demo)"}
                  </button>
                </div>

                {opp.applicationStatus === "applied" && (
                  <span className="text-[10px] text-emerald-600 font-mono font-medium">
                    Status: Tracked in Local Session
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
