"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import { Bell, CheckCheck, ExternalLink, Calendar, Briefcase, Users, FolderGit2, Sparkles } from "lucide-react";

export function NotificationsPopover() {
  const { notifications, markNotificationRead, clearAllNotifications, setActiveView } = usePrototype();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="w-3.5 h-3.5 text-blue-500" />;
      case "opportunity":
        return <Briefcase className="w-3.5 h-3.5 text-emerald-500" />;
      case "mentor":
        return <Users className="w-3.5 h-3.5 text-purple-500" />;
      case "project":
        return <FolderGit2 className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-zinc-500" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
        aria-label="View notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-xs animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-zinc-200 bg-white shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 bg-zinc-50/70">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-zinc-900">Notifications</span>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  <CheckCheck className="w-3 h-3" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-400">No notifications</div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer ${
                      !n.read ? "bg-blue-50/40" : ""
                    }`}
                    onClick={() => {
                      markNotificationRead(n.id);
                      setActiveView(n.targetView);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md p-1.5 bg-zinc-100 border border-zinc-200/60">
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <p className="text-xs font-semibold text-zinc-900 truncate">{n.title}</p>
                          <span className="text-[10px] text-zinc-400 whitespace-nowrap">{n.timeAgo}</span>
                        </div>
                        <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">{n.message}</p>
                        <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-blue-600">
                          <span>View in {n.targetView}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-zinc-100 p-2.5 bg-zinc-50 text-center">
              <span className="text-[11px] text-zinc-400">Simulated live notifications for prototype review</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
