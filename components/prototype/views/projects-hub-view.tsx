"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  FolderGit2,
  Search,
  Filter,
  Check,
  Star,
  Users,
  Code2,
  ChevronRight,
  ExternalLink,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

export function ProjectsHubView() {
  const { projects, openDetailModal, toggleProjectInterest } = usePrototype();

  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const domains = ["All", "Web & Cloud", "AI / ML", "Mobile & IoT", "Systems & DevOps", "Campus Tools"];
  const statuses = ["All", "Seeking Contributors", "In Active Development", "Beta Released"];

  const filteredProjects = projects.filter((p) => {
    const matchesDomain = domainFilter === "All" || p.domain === domainFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesDomain && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
            Projects Hub
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
            Explore active open-source projects built by Vasavi engineering students. Find teams
            seeking contributors, review system architectures, and join real codebases.
          </p>
        </div>

        {/* Project Count Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {projects.length} Active Codebases
          </span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by name, tech (e.g. Next.js, Go, ROS2)..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          {/* Status Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 font-medium"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setDomainFilter(dom)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                domainFilter === dom
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-2xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((proj) => {
          const isSeeking = proj.status === "Seeking Contributors";

          return (
            <div
              key={proj.id}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Status & Stars */}
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono font-semibold ${
                      isSeeking
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    }`}
                  >
                    {proj.status}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-400 font-mono">
                    <Star className="w-3.5 h-3.5 fill-zinc-300 text-zinc-400" />
                    <span>{proj.starsCount}</span>
                  </div>
                </div>

                {/* Project Title & Tagline */}
                <div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {proj.tagline}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Open Roles Preview */}
                {proj.openRoles && proj.openRoles.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-800 text-xs">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Seeking:
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium line-clamp-1">
                      {proj.openRoles.join(" · ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => openDetailModal("project", proj)}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium flex items-center gap-1"
                >
                  Architecture & Docs <ChevronRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => toggleProjectInterest(proj.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs ${
                    proj.hasExpressedInterest
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90"
                  }`}
                >
                  {proj.hasExpressedInterest ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Joined
                    </>
                  ) : (
                    "Join Project"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
