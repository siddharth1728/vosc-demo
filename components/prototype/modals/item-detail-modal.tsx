"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  X,
  ExternalLink,
  Calendar,
  Clock,
  MapPin,
  User,
  Check,
  Bookmark,
  Share2,
  Heart,
  Briefcase,
  FolderGit2,
  BookOpen,
  Award,
  Sparkles,
  ShieldCheck,
  Send,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export function ItemDetailModal() {
  const {
    selectedModalItem,
    closeDetailModal,
    toggleEventRegistration,
    toggleSaveOpportunity,
    applyOpportunity,
    toggleProjectInterest,
    toggleArticleLike,
    submitMentorshipRequest,
    toggleCollabInterest,
    setActiveView,
    role,
  } = usePrototype();

  const [mentorGoal, setMentorGoal] = useState("");
  const [mentorType, setMentorType] = useState<any>("Project Architecture Review");
  const [mentorMsg, setMentorMsg] = useState("");
  const [collabMsg, setCollabMsg] = useState("");
  const [projectRoleChoice, setProjectRoleChoice] = useState("");

  if (!selectedModalItem) return null;

  const { type, data } = selectedModalItem;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {type} preview
            </span>
            <span className="text-xs text-zinc-400 font-mono">Prototype · Demo Data</span>
          </div>
          <button
            onClick={closeDetailModal}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. PROJECT DETAIL */}
          {type === "project" && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {data.domain}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {data.status}
                  </span>
                  <span className="text-xs text-zinc-400">★ {data.starsCount}</span>
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{data.title}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{data.tagline}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Project Overview
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{data.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {data.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-400 block font-mono">Team Lead</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{data.leadStudent}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-mono">Difficulty Level</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{data.difficulty}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-mono">Team Size</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{data.teamSize}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-mono">Repository (Simulated)</span>
                  <span className="font-mono text-blue-600 truncate block">{data.repoPlaceholder}</span>
                </div>
              </div>

              {data.openRoles && data.openRoles.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                    Open Contributor Roles
                  </h4>
                  <div className="space-y-1.5">
                    {data.openRoles.map((roleName: string) => (
                      <div
                        key={roleName}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs"
                      >
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">{roleName}</span>
                        <button
                          onClick={() => {
                            toggleProjectInterest(data.id, roleName);
                            closeDetailModal();
                          }}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                            data.hasExpressedInterest && data.interestedRole === roleName
                              ? "bg-emerald-600 text-white"
                              : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
                          }`}
                        >
                          {data.hasExpressedInterest && data.interestedRole === roleName ? "Applied" : "Apply Role"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. EVENT DETAIL */}
          {type === "event" && (
            <div className="space-y-6">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-2 inline-block">
                  {data.category}
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{data.title}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  <span>Date: <strong>{data.date}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span>Time: <strong>{data.time}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  <span>Venue: <strong>{data.location}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-400" />
                  <span>Speaker: <strong>{data.speaker}</strong></span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  About This Event
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{data.description}</p>
              </div>

              {data.prerequisites && (
                <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                  <strong className="block mb-1">Prerequisites & Preparation:</strong>
                  {data.prerequisites}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100">
                <span>
                  Registered: <strong>{data.registeredCount}</strong> / {data.capacity} seats
                </span>
                <span className="font-mono text-zinc-400">Simulated Workshop</span>
              </div>
            </div>
          )}

          {/* 3. OPPORTUNITY DETAIL */}
          {type === "opportunity" && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {data.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {data.locationType}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{data.title}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{data.organization}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-400 block font-mono">Stipend / Prize</span>
                  <span className="font-bold text-emerald-600">{data.stipendOrPrize}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-mono">Application Deadline</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{data.deadline}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-zinc-400 block font-mono">Eligibility</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{data.eligibility}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Role Description & Scope
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{data.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Relevant Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. FACULTY / MENTOR DETAIL */}
          {type === "mentor" && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <img
                  src={data.avatar}
                  alt={data.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800"
                />
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{data.name}</h2>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{data.title}</p>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">{data.department}</p>
                  <span className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {data.availability}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Biography & Background
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{data.bio}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Specializations & Expertise
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {data.expertise.map((exp: string) => (
                    <span
                      key={exp}
                      className="px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs space-y-1">
                <span className="font-bold text-purple-900 block">Office Hours / Guidance Slots:</span>
                <span className="text-purple-800">{data.officeHoursDemo}</span>
              </div>

              {/* Mentorship Request Form */}
              <div className="pt-4 border-t border-zinc-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  Submit Simulated Mentorship Request
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-zinc-500 mb-1">Guidance Domain</label>
                    <select
                      value={mentorType}
                      onChange={(e) => setMentorType(e.target.value)}
                      className="w-full p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                    >
                      <option>Project Architecture Review</option>
                      <option>GSoC / Open Source Guidance</option>
                      <option>Research Mentorship</option>
                      <option>Career & Placement Path</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-500 mb-1">Your Specific Goal / Topic</label>
                    <input
                      type="text"
                      placeholder="e.g., Code review on Go Raft simulation"
                      value={mentorGoal}
                      onChange={(e) => setMentorGoal(e.target.value)}
                      className="w-full p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 mb-1">Brief Note / Context</label>
                    <textarea
                      rows={3}
                      placeholder="Explain what help you need and what you have built so far..."
                      value={mentorMsg}
                      onChange={(e) => setMentorMsg(e.target.value)}
                      className="w-full p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. ARTICLE DETAIL */}
          {type === "article" && (
            <div className="space-y-6">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200 mb-2 inline-block">
                  {data.category} · {data.readingTime}
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{data.title}</h2>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span>By <strong>{data.authorName}</strong> ({data.authorRole})</span>
                  <span>•</span>
                  <span>{data.publishedDate}</span>
                </div>
              </div>

              <div className="prose prose-zinc max-w-none text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
                {data.contentMarkdown}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <button
                  onClick={() => toggleArticleLike(data.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    data.isLiked
                      ? "bg-rose-50 border-rose-200 text-rose-600"
                      : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${data.isLiked ? "fill-rose-600 text-rose-600" : ""}`} />
                  <span>{data.likesCount} Helpful</span>
                </button>
                <span className="text-[11px] text-zinc-400 font-mono">Engineering Journal Sample</span>
              </div>
            </div>
          )}

          {/* 6. STUDENT PROFILE DETAIL */}
          {type === "student" && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <img
                  src={data.avatar}
                  alt={data.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800"
                />
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{data.name}</h2>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{data.year}</p>
                  <p className="text-xs text-zinc-500 font-mono">{data.department}</p>
                  <span className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {data.collaborationStatus}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  About
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{data.bio}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Technical Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Active Projects
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.projects.map((proj: string) => (
                    <span
                      key={proj}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 text-xs flex items-center justify-between text-zinc-500 font-mono">
                <span>Privacy: Opt-in Student Profile</span>
                <span>{data.contributionsCount} Community Points</span>
              </div>
            </div>
          )}

          {/* 7. KNOWLEDGE HUB DETAIL */}
          {type === "knowledge" && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
                    {data.category}
                  </span>
                  {data.isVerifiedLink ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified College Resource
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-400">Community Contributed</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{data.title}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{data.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Resource Details & Instructions
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {data.details}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
                <span className="text-zinc-400 block font-mono">Coordinator / Department Contact:</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 block">
                  {data.coordinatorOrContact}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 flex items-center justify-between gap-3">
          <button
            onClick={closeDetailModal}
            className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {type === "project" && (
              <button
                onClick={() => {
                  toggleProjectInterest(data.id);
                  closeDetailModal();
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  data.hasExpressedInterest
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
                }`}
              >
                {data.hasExpressedInterest ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Interested (Joined)
                  </>
                ) : (
                  <>
                    <FolderGit2 className="w-3.5 h-3.5" />
                    Express Interest in Project
                  </>
                )}
              </button>
            )}

            {type === "event" && (
              <button
                onClick={() => {
                  toggleEventRegistration(data.id);
                  closeDetailModal();
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  data.isRegistered
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
                }`}
              >
                {data.isRegistered ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Registered (Cancel)
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5" />
                    Register for Event
                  </>
                )}
              </button>
            )}

            {type === "opportunity" && (
              <>
                <button
                  onClick={() => toggleSaveOpportunity(data.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    data.isSaved
                      ? "bg-amber-50 border-amber-200 text-amber-700"
                      : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${data.isSaved ? "fill-amber-600" : ""}`} />
                </button>
                <button
                  onClick={() => {
                    applyOpportunity(data.id);
                    closeDetailModal();
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    data.applicationStatus === "applied"
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
                  }`}
                >
                  {data.applicationStatus === "applied" ? "Application Tracked" : "Apply (Demo Action)"}
                </button>
              </>
            )}

            {type === "mentor" && (
              <button
                onClick={() => {
                  submitMentorshipRequest({
                    mentorId: data.id,
                    mentorName: data.name,
                    goal: mentorGoal || "General Guidance",
                    guidanceType: mentorType,
                    message: mentorMsg || "Looking forward to guidance.",
                  });
                  closeDetailModal();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Mentorship Request
              </button>
            )}

            {type === "student" && (
              <button
                onClick={() => {
                  toast.success(`Collaboration invitation sent to ${data.name}!`, {
                    description: "Simulated invite recorded in demo state.",
                  });
                  closeDetailModal();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 text-white hover:opacity-90"
              >
                <Send className="w-3.5 h-3.5" />
                Invite to Collaborate
              </button>
            )}

            {type === "knowledge" && (
              <button
                onClick={() => {
                  toast.info(`Opened simulated college resource: ${data.actionText}`);
                  closeDetailModal();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 text-white"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {data.actionText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
