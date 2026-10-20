"use client";

import React from "react";
import { usePrototype } from "../context/prototype-context";
import { UserRole } from "../data/types";
import { GraduationCap, Award, ShieldAlert, Check } from "lucide-react";

export function RoleSwitcher() {
  const { role, setRole } = usePrototype();

  const roles: {
    id: UserRole;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    badge: string;
  }[] = [
    {
      id: "student",
      label: "Student",
      sublabel: "Arjun Verma (CSE '27)",
      icon: GraduationCap,
      badge: "Learner & Builder",
    },
    {
      id: "faculty",
      label: "Faculty / Mentor",
      sublabel: "Dr. K. Srinivas (CSE Dept)",
      icon: Award,
      badge: "Advisor & Reviewer",
    },
    {
      id: "organizer",
      label: "VOSC Organizer",
      sublabel: "Sneha Reddy (Core Lead)",
      icon: ShieldAlert,
      badge: "Community Admin",
    },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700/60 text-xs">
      {roles.map((r) => {
        const Icon = r.icon;
        const isActive = role === r.id;
        return (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium transition-all ${
              isActive
                ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs border border-zinc-200/80 dark:border-zinc-700"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200/50"
            }`}
            title={`Switch to ${r.label} perspective`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-500"}`} />
            <span className="hidden sm:inline font-semibold">{r.label}</span>
            {isActive && <Check className="w-3 h-3 text-blue-600 dark:text-blue-400 hidden lg:inline" />}
          </button>
        );
      })}
    </div>
  );
}
