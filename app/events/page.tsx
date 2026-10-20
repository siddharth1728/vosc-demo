"use client";

import Link from "next/link";
import EventCard from "@/components/event-card";
import events from "@/data/events.json";

export default function EventsPage() {
  const ongoingEvents = events.filter((e) => e.status === "ongoing");
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "past");

  return (
    <main className="bg-[#012728] text-[#B5FFF0] min-h-screen pt-20 sm:pt-24 pb-20 font-mono">
      {/* Header Banner */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 border-b border-[#00DCC0] terminal-grid">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="text-xs font-mono text-[#B5FFF0]/80 hover:text-[#6AFBD8] mb-6 inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00DCC0] rounded p-1"
          >
            <span>←</span>
            <span>[ return to terminal ]</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#6AFBD8] mb-2">
            <span>&gt; SYS.CATALOG // EVENTS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#6AFBD8] tracking-tight mb-4 font-pixel uppercase">
            events archive
          </h1>

          <p className="text-xs sm:text-sm text-[#B5FFF0]/80 max-w-2xl leading-relaxed">
            Hackathons, engineering sprints, Git deep-dives, and community
            gatherings hosted at Vasavi College of Engineering.
          </p>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Ongoing Events (e.g. OpenQuest) */}
          {ongoingEvents.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#00DCC0]">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#6AFBD8] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6AFBD8] animate-pulse" />
                  LIVE &amp; ONGOING SESSIONS
                </h2>
                <span className="text-xs text-[#6AFBD8] font-bold">
                  [ ACTIVE NOW ]
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoingEvents.map((event) => (
                  <EventCard key={event.id} event={event} showPoster={true} />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Section */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#00DCC0]">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#6AFBD8] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00DCC0]" />
                UPCOMING EVENTS &amp; REGISTRATIONS
              </h2>
              <span className="text-xs text-[#B5FFF0]/70">
                active: {upcomingEvents.length}
              </span>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-[#061B1C] border border-[#00DCC0] rounded-md p-8 text-center">
                <p className="text-sm font-bold text-[#6AFBD8] mb-2">
                  [ NO UPCOMING SCHEDULED TRANSMISSIONS ]
                </p>
                <p className="text-xs text-[#B5FFF0]/80 max-w-md mx-auto">
                  New workshops are announced regularly. Check the announcements
                  feed or follow our GitHub discussions for dates.
                </p>
              </div>
            )}
          </div>

          {/* Past Events */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#00DCC0]">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#B5FFF0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#003A3B]" />
                PAST EVENTS &amp; ARCHIVES
              </h2>
              <span className="text-xs text-[#B5FFF0]/70">
                total: {pastEvents.length} archived
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} showPoster={!!event.poster} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
