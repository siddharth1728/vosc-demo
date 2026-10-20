"use client";

import React, { useState, useEffect } from "react";
import { usePrototype } from "../context/prototype-context";
import { PrototypeView } from "../data/types";
import {
  Search,
  X,
  Compass,
  Calendar,
  Briefcase,
  BookOpen,
  FolderGit2,
  Users,
  Award,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  BookCheck,
} from "lucide-react";

export function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setActiveView,
    events,
    projects,
    opportunities,
    learningResources,
  } = usePrototype();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (e.key === "Escape" && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (view: PrototypeView) => {
    setActiveView(view);
    setIsCommandPaletteOpen(false);
    setQuery("");
  };

  const views: { id: PrototypeView; label: string; group: string; icon: React.ElementType }[] = [
    { id: "home", label: "Student Home", group: "Discover", icon: Compass },
    { id: "search", label: "Universal Search", group: "Discover", icon: Search },
    { id: "start-here", label: "Start Here (Beginner Journey)", group: "Discover", icon: BookCheck },
    { id: "events", label: "Events Calendar", group: "Discover", icon: Calendar },
    { id: "opportunities", label: "Opportunities Board", group: "Discover", icon: Briefcase },
    { id: "learning", label: "Learning Hub", group: "Build", icon: BookOpen },
    { id: "projects", label: "Projects Hub", group: "Build", icon: FolderGit2 },
    { id: "collaboration", label: "Collaboration Board", group: "Build", icon: Users },
    { id: "journal", label: "Engineering Journal", group: "Build", icon: Sparkles },
    { id: "directory", label: "Student Directory", group: "Community", icon: Users },
    { id: "mentors", label: "Mentor / Faculty Connect", group: "Community", icon: Award },
    { id: "passport", label: "Contribution Passport", group: "Community", icon: Award },
    { id: "navigator", label: "Student Navigator", group: "Community", icon: Compass },
    { id: "knowledge", label: "College Knowledge Hub", group: "Community", icon: BookOpen },
    { id: "command-center", label: "VOSC Command Center", group: "Admin", icon: ShieldAlert },
  ];

  const filteredViews = views.filter(
    (v) =>
      v.label.toLowerCase().includes(query.toLowerCase()) ||
      v.group.toLowerCase().includes(query.toLowerCase())
  );

  const matchedEvents = query
    ? events.filter((e) => e.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];
  const matchedProjects = query
    ? projects.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];
  const matchedOpps = query
    ? opportunities.filter((o) => o.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-zinc-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="relative border-b border-zinc-200 flex items-center px-4 py-3">
          <Search className="w-4 h-4 text-zinc-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a feature, project, event, or press Esc..."
            className="w-full bg-transparent text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-zinc-400 hover:text-zinc-600 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-zinc-100">
          <div>
            <p className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Hub Features
            </p>
            <div className="space-y-0.5">
              {filteredViews.length === 0 ? (
                <p className="px-3 py-2 text-xs text-zinc-400">No matching views</p>
              ) : (
                filteredViews.map((v) => {
                  const Icon = v.icon;
                  return (
                    <button
                      key={v.id}
                      onClick={() => navigateTo(v.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-zinc-500" />
                        <span>{v.label}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 bg-zinc-50 border border-zinc-200/60 px-1.5 py-0.5 rounded">
                        {v.group}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {matchedEvents.length > 0 && (
            <div className="pt-2">
              <p className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Matching Events
              </p>
              {matchedEvents.map((e) => (
                <button
                  key={e.id}
                  onClick={() => navigateTo("events")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-800 hover:bg-zinc-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span className="truncate">{e.title}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-zinc-400 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {matchedProjects.length > 0 && (
            <div className="pt-2">
              <p className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Matching Projects
              </p>
              {matchedProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigateTo("projects")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-800 hover:bg-zinc-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-3.5 h-3.5 text-amber-500" />
                    <span className="truncate">{p.title}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-zinc-400 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {matchedOpps.length > 0 && (
            <div className="pt-2">
              <p className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Matching Opportunities
              </p>
              {matchedOpps.map((o) => (
                <button
                  key={o.id}
                  onClick={() => navigateTo("opportunities")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-800 hover:bg-zinc-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="truncate">{o.title}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-zinc-400 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-zinc-100 px-4 py-2 bg-zinc-50 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Tip: Press ⌘K or Ctrl+K anywhere to open this</span>
          <span className="font-mono">VOSC Prototype</span>
        </div>
      </div>
    </div>
  );
}
