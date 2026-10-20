"use client";

import React from "react";
import Link from "next/link";
import { usePrototype } from "../context/prototype-context";
import { RoleSwitcher } from "./role-switcher";
import { NotificationsPopover } from "./notifications-popover";
import {
  Search,
  Menu,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  GraduationCap,
  Award,
} from "lucide-react";

interface TopbarProps {
  onToggleMobileDrawer: () => void;
}

export function PrototypeTopbar({ onToggleMobileDrawer }: TopbarProps) {
  const {
    role,
    userPoints,
    setIsCommandPaletteOpen,
    setIsResetModalOpen,
    currentUserProfile,
    mentors,
  } = usePrototype();

  const activeMentor = mentors[0]; // Dr. K. Srinivas

  return (
    <header className="h-16 px-4 md:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-3">
      {/* Left: Mobile Toggle & Quick Search Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleMobileDrawer}
          className="p-2 -ml-2 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 md:hidden transition-colors"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input Button */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-400 hover:text-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="truncate">Search events, projects, resources...</span>
          </div>
          <kbd className="hidden sm:inline-block rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Center / Right: Demo Role Switcher, Indicators, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Prototype Demo Tag */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 text-[11px] font-mono text-amber-800 dark:text-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Prototype · Demo Data</span>
        </div>

        {/* Demo Role Switcher */}
        <RoleSwitcher />

        {/* Notifications */}
        <NotificationsPopover />

        {/* User Identity Preview based on Active Role */}
        <div className="flex items-center gap-2 pl-1 border-l border-zinc-200 dark:border-zinc-800">
          {role === "student" && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src={currentUserProfile.avatar}
                  alt={currentUserProfile.name}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                  {currentUserProfile.name}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono leading-none">
                  {userPoints} Passport Pts
                </span>
              </div>
            </div>
          )}

          {role === "faculty" && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 flex items-center justify-center text-purple-700 dark:text-purple-300 font-semibold text-xs">
                <Award className="w-4 h-4" />
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                  {activeMentor.name}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono leading-none">
                  Faculty Advisor
                </span>
              </div>
            </div>
          )}

          {role === "organizer" && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 flex items-center justify-center text-amber-700 dark:text-amber-300 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                  Sneha Reddy
                </span>
                <span className="text-[10px] text-amber-600 font-mono leading-none">
                  VOSC Core Organizer
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Return to Public Site */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
          title="Return to Public Live Website"
        >
          <span>Main Site</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400" />
        </Link>
      </div>
    </header>
  );
}
