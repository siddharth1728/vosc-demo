"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  Users,
  Search,
  Plus,
  Check,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  X,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export function CollaborationBoardView() {
  const {
    collaborationRequests,
    toggleCollabInterest,
    createCollabRequest,
    openDetailModal,
  } = usePrototype();

  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states for creating request
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillsStr, setSkillsStr] = useState("");
  const [spots, setSpots] = useState(2);
  const [context, setContext] = useState("");
  const [formError, setFormError] = useState("");

  const popularSkills = ["All", "React", "Python", "Go", "PyTorch", "Figma", "Docker", "Embedded C"];

  const filteredCollabs = collaborationRequests.filter((c) => {
    const matchesSkill = skillFilter === "All" || c.requiredSkills.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()));
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.requiredSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesSkill && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !skillsStr.trim()) {
      setFormError("Please fill in the title, description, and at least one required skill.");
      return;
    }
    const skillsArray = skillsStr.split(",").map((s) => s.trim()).filter(Boolean);
    createCollabRequest({
      title: title.trim(),
      description: description.trim(),
      requiredSkills: skillsArray,
      spotsAvailable: spots,
      projectContext: context.trim() || "Student Project",
    });
    // Reset form
    setTitle("");
    setDescription("");
    setSkillsStr("");
    setSpots(2);
    setContext("");
    setFormError("");
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
            Collaboration Board
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
            Find teammates for upcoming hackathons, research projects, and campus tooling.
            Express interest in open contributor slots or post your own team request.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity shadow-xs self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post Collaboration Request</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, required tech, or project name..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
            {popularSkills.map((s) => (
              <button
                key={s}
                onClick={() => setSkillFilter(s)}
                className={`px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  skillFilter === s
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCollabs.map((collab) => (
          <div
            key={collab.id}
            className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {collab.spotsAvailable} {collab.spotsAvailable === 1 ? "Spot" : "Spots"} Open
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{collab.createdAt}</span>
              </div>

              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 leading-snug">
                  {collab.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {collab.description}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-800 text-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-0.5">
                  Project Context:
                </span>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium line-clamp-1">
                  {collab.projectContext}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {collab.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono text-[11px]">
                Posted by {collab.authorName} ({collab.authorYear})
              </span>

              <button
                onClick={() => toggleCollabInterest(collab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs ${
                  collab.hasExpressedInterest
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90"
                }`}
              >
                {collab.hasExpressedInterest ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Interest Sent
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    Express Interest
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Request Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                Create Collaboration Request
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Request Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Looking for ML engineer for Indic dialect model"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Project Context / Competition
                </label>
                <input
                  type="text"
                  placeholder="e.g., Smart India Hackathon 2026 or Campus Nav tool"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Description of Work *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what you are building and what role the teammate will play..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Required Skills (comma separated) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React, TypeScript, FastAPI"
                    value={skillsStr}
                    onChange={(e) => setSkillsStr(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Available Spots
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={spots}
                    onChange={(e) => setSpots(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg font-medium text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs hover:opacity-90"
                >
                  Publish Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
