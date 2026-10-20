"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  Users,
  Search,
  ShieldCheck,
  Lock,
  Eye,
  Send,
  ExternalLink,
  ChevronRight,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

export function StudentDirectoryView() {
  const {
    students,
    currentUserProfile,
    updateProfileVisibility,
    openDetailModal,
  } = usePrototype();

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  const departments = [
    "All",
    "Computer Science & Engineering",
    "Information Technology",
    "Artificial Intelligence & Data Science",
    "Electronics & Communication",
    "Electrical & Electronics",
    "Mechanical Engineering",
  ];

  const filteredStudents = students.filter((s) => {
    const matchesDept = deptFilter === "All" || s.department === deptFilter;
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.bio.toLowerCase().includes(search.toLowerCase()) ||
      s.skills.some((sk) => sk.toLowerCase().includes(search.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
          Opt-in Student Directory
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
          Discover peers across departments, connect with teammates for hackathons, and exchange
          project feedback. Privacy is strictly preserved with simulated contact controls.
        </p>
      </div>

      {/* Privacy Notice & Current User Visibility Bar */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
              Privacy-First Community Architecture
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Profiles are opt-in. Student phone numbers and personal emails are never exposed publicly.
              All records shown are fictional sample data for prototype demonstration.
            </p>
          </div>
        </div>

        {/* Profile Visibility Toggle for Reviewers */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 bg-zinc-50 dark:bg-zinc-800 p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs">
          <span className="text-zinc-500 font-medium">Your Visibility:</span>
          <select
            value={currentUserProfile.visibility}
            onChange={(e) => updateProfileVisibility(e.target.value as any)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100"
          >
            <option value="public">Public</option>
            <option value="vosc_only">VOSC Members Only</option>
            <option value="hidden">Hidden / Private</option>
          </select>
        </div>
      </div>

      {/* Search & Department Filters */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name, skill (e.g. Next.js, PyTorch, Rust, Docker)..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">Branch:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 font-medium"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all flex flex-col justify-between space-y-4 shadow-2xs"
          >
            <div className="space-y-3">
              {/* Profile Header */}
              <div className="flex items-start gap-3.5">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-13 h-13 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 truncate">
                    {student.name}
                  </h3>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 truncate">
                    {student.year}
                  </p>
                  <span className="text-[10px] font-mono text-zinc-400 block truncate">
                    {student.department}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {student.bio}
              </p>

              {/* Collaboration Status Pill */}
              <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/60 text-[11px] font-medium text-emerald-800 truncate">
                {student.collaborationStatus}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {student.skills.map((skill) => (
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
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <button
                onClick={() => openDetailModal("student", student)}
                className="text-zinc-600 hover:text-zinc-900 font-medium"
              >
                View Profile →
              </button>

              <button
                onClick={() => {
                  toast.success(`Collaboration invitation sent to ${student.name}!`, {
                    description: "Simulated peer invite recorded.",
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 shadow-2xs"
              >
                <Send className="w-3 h-3" />
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
