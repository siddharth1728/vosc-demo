"use client";

import { Event } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
  event: Event;
  showPoster?: boolean;
}

export default function EventCard({ event, showPoster = false }: EventCardProps) {
  // Parse month and day cleanly from strings like "Nov 08, 2026" or "Oct 27, 2026, 10:00 AM – 4:00 PM"
  const parseDateParts = (dateStr: string) => {
    try {
      const match = dateStr.match(/([a-zA-Z]+)\s+(\d{1,2})/);
      if (match) {
        return {
          month: match[1].slice(0, 3).toUpperCase(),
          day: match[2].padStart(2, "0"),
        };
      }
    } catch {
      // fallback
    }
    return { month: "OCT", day: "27" };
  };

  const { month, day } = parseDateParts(event.date);

  const status = event.status?.toLowerCase() || "past";
  const isOngoing = status === "ongoing";
  const isUpcoming = status === "upcoming";

  return (
    <article className="group relative bg-[#061B1C] border border-[#00DCC0] hover:border-[#6AFBD8] rounded-md overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-[0_0_18px_rgba(0,220,192,0.18)]">
      {/* Optional Poster preview if requested or on prominent events */}
      {showPoster && event.poster && (
        <div className="w-full h-44 relative bg-[#003A3B]/40 border-b border-[#00DCC0]/40 overflow-hidden">
          <Image
            src={event.poster}
            alt={`${event.title} poster`}
            width={600}
            height={300}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Top header row: Date block, Title, and Status badge */}
          <div className="flex items-start gap-3 sm:gap-4 mb-3">
            {/* Left Date Block */}
            <div className="flex-shrink-0 w-13 sm:w-14 h-13 sm:h-14 rounded border border-[#00DCC0] bg-[#003A3B]/50 flex flex-col items-center justify-center py-1">
              <span className="text-[10px] font-bold tracking-wider text-[#6AFBD8] uppercase leading-none">
                {month}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#6AFBD8] font-mono leading-none mt-1">
                {day}
              </span>
            </div>

            {/* Title & Status Badge */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[#B5FFF0] group-hover:text-[#6AFBD8] transition-colors leading-snug">
                  {event.title}
                </h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border lowercase flex-shrink-0 ${
                    isOngoing
                      ? "border-[#6AFBD8] text-[#012728] bg-[#6AFBD8] font-bold"
                      : isUpcoming
                      ? "border-[#6AFBD8] text-[#6AFBD8] bg-[#003A3B]/70"
                      : "border-[#00DCC0]/70 text-[#B5FFF0]/80 bg-transparent"
                  }`}
                >
                  {event.status || "past"}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs font-mono text-[#B5FFF0]/80 leading-relaxed mb-4 line-clamp-3">
            {event.description}
          </p>
        </div>

        {/* Footer Link & Specs */}
        <div className="pt-2 flex items-center justify-between border-t border-[#003A3B]/50">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6AFBD8] hover:text-[#B5FFF0] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00DCC0]"
            aria-label={`Learn more about ${event.title}`}
          >
            <span>Learn more</span>
            <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
          </Link>

          {event.registrationUrl && (
            <span className="text-[10px] font-mono text-[#00DCC0]">
              [ registrations open ]
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
