"use client";

import Link from "next/link";
import AnnouncementCard from "@/components/announcement-card";
import announcements from "@/data/announcements.json";

export default function AnnouncementsPage() {
  return (
    <main className="bg-[#012728] text-[#B5FFF0] min-h-screen pt-20 sm:pt-24 pb-20 font-mono">
      {/* Header Banner */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 border-b border-[#00DCC0] terminal-grid">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="text-xs font-mono text-[#B5FFF0]/80 hover:text-[#6AFBD8] mb-6 inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00DCC0] rounded p-1"
          >
            <span>←</span>
            <span>[ return to terminal ]</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#6AFBD8] mb-2">
            <span>&gt; SYS.BROADCASTS // TRANSMISSIONS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#6AFBD8] tracking-tight mb-4 font-pixel uppercase">
            announcements
          </h1>

          <p className="text-xs sm:text-sm text-[#B5FFF0]/80 max-w-2xl leading-relaxed">
            Official dispatches, program launches, and critical timelines from
            the Vasavi Open Source Community leadership.
          </p>
        </div>
      </section>

      {/* Announcements Listing */}
      <section className="py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...announcements]
              .reverse()
              .map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
