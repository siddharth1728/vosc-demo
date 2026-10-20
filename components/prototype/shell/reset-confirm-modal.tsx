"use client";

import React from "react";
import { usePrototype } from "../context/prototype-context";
import { RotateCcw, AlertTriangle, X } from "lucide-react";

export function ResetConfirmModal() {
  const { isResetModalOpen, setIsResetModalOpen, resetDemoData } = usePrototype();

  if (!isResetModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-amber-50 border border-amber-200 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 text-base">Reset Demo Data</h3>
              <p className="text-xs text-zinc-500">Restore original seeded state</p>
            </div>
          </div>
          <button
            onClick={() => setIsResetModalOpen(false)}
            className="text-zinc-400 hover:text-zinc-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed mb-6">
          This action will restore all prototype datasets (registrations, bookmarks, learning progress,
          new collaboration requests, and simulated journal articles) back to their original seeded
          state. It does not affect any real live website content.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={() => setIsResetModalOpen(false)}
            className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={resetDemoData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
}
