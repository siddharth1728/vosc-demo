"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  Award,
  Search,
  CheckCircle2,
  Clock,
  Send,
  XCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export function MentorConnectView() {
  const {
    mentors,
    mentorshipRequests,
    respondMentorshipRequest,
    openDetailModal,
    role,
  } = usePrototype();

  const [domainFilter, setDomainFilter] = useState("All");
  const [search, setSearch] = useState("");

  const domains = [
    "All",
    "GSoC / Open Source Guidance",
    "Project Architecture Review",
    "Research Mentorship",
    "Career & Placement Path",
  ];

  const filteredMentors = mentors.filter((m) => {
    const matchesDomain = domainFilter === "All" || m.mentorshipDomains.includes(domainFilter);
    const matchesSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase()) ||
      m.expertise.some((ex) => ex.toLowerCase().includes(search.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
          Mentor / Faculty Connect
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
          Connect directly with Vasavi professors, research leads, and industry alumni for guidance
          on open-source programs (GSoC/LFX), systems architecture, and research publications.
        </p>
      </div>

      {/* If in Faculty/Mentor role: Display Faculty Operations Dashboard */}
      {role === "faculty" && (
        <div className="p-6 rounded-2xl border-2 border-purple-300 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-600 text-white">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  Faculty Advisor Inbox (Dr. K. Srinivas Perspective)
                </h3>
                <p className="text-xs text-zinc-500">
                  Review student guidance requests, schedule office hours, and review project architectures.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {mentorshipRequests.length} Student Requests
            </span>
          </div>

          {/* List of Student Requests */}
          <div className="space-y-3 pt-2">
            {mentorshipRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {req.studentName}
                    </span>
                    <span className="text-zinc-400 font-mono text-[11px]">({req.studentYear})</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                      req.status === "accepted"
                        ? "bg-emerald-100 text-emerald-800"
                        : req.status === "declined"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {req.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-400 font-mono text-[10px] block">
                    Domain: {req.guidanceType}
                  </span>
                  <p className="text-zinc-800 dark:text-zinc-200 font-medium">{req.goal}</p>
                  <p className="text-zinc-500 italic mt-0.5">"{req.message}"</p>
                </div>

                {req.status === "pending" && (
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-2">
                    <button
                      onClick={() => respondMentorshipRequest(req.id, "declined")}
                      className="px-3 py-1.5 rounded-md text-zinc-600 hover:bg-zinc-100 font-medium"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() =>
                        respondMentorshipRequest(
                          req.id,
                          "accepted",
                          "Approved. Let's meet during Thursday office hours in Lab 4."
                        )
                      }
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-semibold bg-purple-600 text-white hover:bg-purple-700 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Accept & Schedule
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Domain Filters */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search faculty or alumni mentors by name, department, or topic..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setDomainFilter(dom)}
                className={`px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  domainFilter === dom
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3.5">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-13 h-13 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 truncate">
                    {mentor.name}
                  </h3>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 line-clamp-1">
                    {mentor.title}
                  </p>
                  <span className="text-[10px] font-mono text-zinc-400 block truncate mt-0.5">
                    {mentor.department}
                  </span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-purple-50/70 border border-purple-200/60 text-[11px] font-medium text-purple-800">
                {mentor.availability}
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {mentor.bio}
              </p>

              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
                  Expertise:
                </span>
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <button
                onClick={() => openDetailModal("mentor", mentor)}
                className="text-zinc-600 hover:text-zinc-900 font-medium"
              >
                Profile & Research →
              </button>

              <button
                onClick={() => openDetailModal("mentor", mentor)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 shadow-2xs"
              >
                <Send className="w-3 h-3" />
                Request Mentorship
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
