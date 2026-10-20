"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePrototype } from "../context/prototype-context";
import { PrototypeView } from "../data/types";
import {
  Compass,
  Search,
  BookCheck,
  Calendar,
  Briefcase,
  BookOpen,
  FolderGit2,
  Users,
  Sparkles,
  Award,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  GraduationCap,
  Sparkle,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onNavigate?: () => void; // for mobile drawer close
}

export function PrototypeSidebar({ isCollapsed, setIsCollapsed, onNavigate }: SidebarProps) {
  const {
    activeView,
    setActiveView,
    role,
    startHereSteps,
    setIsResetModalOpen,
    events,
    collaborationRequests,
    mentorshipRequests,
  } = usePrototype();

  const completedSteps = startHereSteps.filter((s) => s.completed).length;
  const registeredEvents = events.filter((e) => e.isRegistered).length;
  const openCollabs = collaborationRequests.filter((c) => c.status === "Open").length;
  const pendingMentorship = mentorshipRequests.filter((m) => m.status === "pending").length;

  const navGroups: {
    groupName: string;
    items: {
      id: PrototypeView;
      label: string;
      icon: React.ElementType;
      badge?: string | number;
      organizerOnly?: boolean;
    }[];
  }[] = [
    {
      groupName: "Discover",
      items: [
        { id: "home", label: "Student Home", icon: Compass },
        { id: "search", label: "Universal Search", icon: Search },
        {
          id: "start-here",
          label: "Start Here",
          icon: BookCheck,
          badge: `${completedSteps}/${startHereSteps.length}`,
        },
        {
          id: "events",
          label: "Events Calendar",
          icon: Calendar,
          badge: registeredEvents > 0 ? registeredEvents : undefined,
        },
        { id: "opportunities", label: "Opportunities", icon: Briefcase },
      ],
    },
    {
      groupName: "Build",
      items: [
        { id: "learning", label: "Learning Hub", icon: BookOpen },
        { id: "projects", label: "Projects Hub", icon: FolderGit2 },
        {
          id: "collaboration",
          label: "Collaboration Board",
          icon: Users,
          badge: openCollabs > 0 ? openCollabs : undefined,
        },
        { id: "journal", label: "Engineering Journal", icon: Sparkles },
      ],
    },
    {
      groupName: "Community",
      items: [
        { id: "directory", label: "Student Directory", icon: Users },
        {
          id: "mentors",
          label: "Mentor / Faculty Connect",
          icon: Award,
          badge: role === "faculty" && pendingMentorship > 0 ? `${pendingMentorship} pending` : undefined,
        },
        { id: "passport", label: "Contribution Passport", icon: GraduationCap },
        { id: "navigator", label: "Student Navigator", icon: Sparkle },
        { id: "knowledge", label: "College Knowledge Hub", icon: BookOpen },
      ],
    },
    {
      groupName: "Administration",
      items: [
        {
          id: "command-center",
          label: "VOSC Command Center",
          icon: ShieldAlert,
          badge: role === "organizer" ? "Active" : undefined,
        },
      ],
    },
  ];

  const handleItemClick = (viewId: PrototypeView) => {
    setActiveView(viewId);
    if (onNavigate) onNavigate();
  };

  return (
    <aside
      className={`h-screen flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-300 relative select-none ${
        isCollapsed ? "w-18" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link
          href="/"
          className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? "justify-center w-full" : ""}`}
          title="Return to Main Website"
        >
          <div className="relative w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center shrink-0 shadow-xs">
            <Image
              src="/vosc-ascii-logo.png"
              alt="VOSC Logo"
              width={24}
              height={24}
              className="invert dark:invert-0 object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black tracking-tight text-zinc-950 dark:text-zinc-50 uppercase">
                VOSC Hub
              </span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-tight truncate">
                Digital Community
              </span>
            </div>
          )}
        </Link>

        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors hidden md:flex"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Expand Button when Collapsed */}
      {isCollapsed && (
        <div className="hidden md:flex justify-center py-2 border-b border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-6">
        {navGroups.map((group) => (
          <div key={group.groupName} className="space-y-1">
            {!isCollapsed ? (
              <p className="px-2.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5 font-mono">
                {group.groupName}
              </p>
            ) : (
              <div className="w-6 h-px bg-zinc-200 dark:bg-zinc-800 mx-auto my-2" />
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const isCommandCenter = item.id === "command-center";

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all group relative ${
                    isActive
                      ? isCommandCenter
                        ? "bg-amber-600 text-white shadow-xs font-semibold"
                        : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs font-semibold"
                      : isCommandCenter
                        ? "text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  } ${isCollapsed ? "justify-center px-0" : ""}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive
                        ? "text-inherit"
                        : isCommandCenter
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`ml-1.5 px-1.5 py-0.2 rounded text-[10px] font-mono font-medium ${
                            isActive
                              ? "bg-white/20 text-white"
                              : isCommandCenter
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sidebar Footer with Reset & Prototype Tag */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 space-y-2">
        {!isCollapsed && (
          <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Prototype Mode
              </span>
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                {role === "student" ? "Student" : role === "faculty" ? "Faculty" : "Organizer"}
              </span>
            </div>
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="p-1 rounded text-zinc-500 hover:text-red-600 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {isCollapsed && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-zinc-100 transition-colors"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
