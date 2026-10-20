"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Check,
  Filter,
  CheckCircle2,
  Users,
} from "lucide-react";

export function EventsCalendarView() {
  const { events, toggleEventRegistration, openDetailModal } = usePrototype();

  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "past" | "registered">("all");
  const [selectedMonthOffset, setSelectedMonthOffset] = useState<number>(0); // 0 = Oct 2026, 1 = Nov 2026

  const monthNames = ["October 2026", "November 2026", "December 2026"];
  const currentMonthName = monthNames[Math.min(Math.max(0, selectedMonthOffset), monthNames.length - 1)];

  const categories = ["All", "Workshop", "Hackathon", "Open Source Sprint", "Tech Talk"];

  const filteredEvents = events.filter((e) => {
    if (filterStatus === "registered" && !e.isRegistered) return false;
    if (filterStatus === "upcoming" && e.status !== "upcoming" && e.status !== "closing_soon") return false;
    if (filterStatus === "past" && e.status !== "past") return false;
    if (filterCategory !== "All" && e.category !== filterCategory) return false;
    return true;
  });

  // Simple visual calendar days for demo (Oct 2026 starts on Thursday, 31 days)
  const daysInMonth = selectedMonthOffset === 0 ? 31 : selectedMonthOffset === 1 ? 30 : 31;
  const startDayPadding = selectedMonthOffset === 0 ? 4 : selectedMonthOffset === 1 ? 0 : 2; // Thu = 4

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingArray = Array.from({ length: startDayPadding }, (_, i) => i);

  // Check if a day has an event
  const getEventsForDay = (day: number) => {
    const monthNum = selectedMonthOffset === 0 ? "10" : selectedMonthOffset === 1 ? "11" : "12";
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const targetDate = `2026-${monthNum}-${dayStr}`;
    return events.filter((e) => e.date === targetDate);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
            Events Calendar
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
            Workshops, open-source contribution sprints, hackathons, and tech talks across Vasavi
            College of Engineering. Register to reserve simulated workshop seats.
          </p>
        </div>

        {/* View filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs self-start md:self-auto font-medium">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterStatus === "all" ? "bg-white dark:bg-zinc-900 shadow-2xs font-semibold" : "text-zinc-600"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilterStatus("upcoming")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterStatus === "upcoming" ? "bg-white dark:bg-zinc-900 shadow-2xs font-semibold" : "text-zinc-600"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilterStatus("registered")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterStatus === "registered" ? "bg-white dark:bg-zinc-900 shadow-2xs font-semibold text-emerald-700" : "text-zinc-600"
            }`}
          >
            My Registrations
          </button>
          <button
            onClick={() => setFilterStatus("past")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterStatus === "past" ? "bg-white dark:bg-zinc-900 shadow-2xs font-semibold" : "text-zinc-600"
            }`}
          >
            Past Archive
          </button>
        </div>
      </div>

      {/* Interactive Month Calendar Grid */}
      <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
        {/* Month Navigator Bar */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {currentMonthName}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedMonthOffset(Math.max(0, selectedMonthOffset - 1))}
              disabled={selectedMonthOffset === 0}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedMonthOffset(0)}
              className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setSelectedMonthOffset(Math.min(2, selectedMonthOffset + 1))}
              disabled={selectedMonthOffset === 2}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold font-mono text-zinc-400 uppercase py-1">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days Cells */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {paddingArray.map((_, i) => (
            <div
              key={`pad-${i}`}
              className="h-16 sm:h-20 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/20 border border-transparent"
            />
          ))}

          {daysArray.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isToday = selectedMonthOffset === 0 && day === 10;

            return (
              <div
                key={`day-${day}`}
                className={`h-16 sm:h-20 p-1.5 rounded-xl border flex flex-col justify-between transition-all ${
                  isToday
                    ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/20 font-bold"
                    : dayEvents.length > 0
                    ? "border-zinc-300 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-850"
                    : "border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-850/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono ${
                      isToday ? "text-blue-600 font-bold" : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                  )}
                </div>

                {/* Day events badges */}
                <div className="space-y-1 overflow-hidden">
                  {dayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => openDetailModal("event", ev)}
                      className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 truncate cursor-pointer hover:opacity-80"
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filterable Schedule List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Schedule & Registration ({filteredEvents.length})
          </h2>

          <div className="flex items-center gap-1.5 text-xs overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  filterCategory === c
                    ? "bg-zinc-900 text-white font-semibold"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                    {evt.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {evt.status === "past" ? "Past Event" : evt.status === "closing_soon" ? "Closing Soon" : "Upcoming"}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-500 font-mono">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{evt.date} · {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Lead: {evt.speaker} ({evt.speakerRole})</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => openDetailModal("event", evt)}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 font-medium"
                >
                  View Agenda & Details →
                </button>

                <button
                  onClick={() => toggleEventRegistration(evt.id)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs ${
                    evt.isRegistered
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90"
                  }`}
                >
                  {evt.isRegistered ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Registered
                    </>
                  ) : (
                    "Register (Demo)"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
