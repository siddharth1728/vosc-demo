import Link from "next/link";
import { Announcement } from "@/lib/types";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export default function AnnouncementCard({
  announcement,
}: AnnouncementCardProps) {
  return (
    <article className="group bg-[#061B1C] border border-[#00DCC0] hover:border-[#6AFBD8] p-5 sm:p-6 rounded-md flex flex-col justify-between transition-all duration-200 hover:shadow-[0_0_18px_rgba(0,220,192,0.18)] h-full">
      <div>
        <div className="flex justify-between items-center gap-2 mb-3">
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#003A3B] text-[#6AFBD8] border border-[#00DCC0]">
            dispatch #{announcement.id}
          </span>
          <time
            dateTime={announcement.date}
            className="text-xs font-mono text-[#B5FFF0]/70"
          >
            {announcement.date}
          </time>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#B5FFF0] group-hover:text-[#6AFBD8] transition-colors mb-2 tracking-tight">
          {announcement.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#B5FFF0]/80 leading-relaxed font-mono mb-4">
          {announcement.excerpt}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-[#003A3B] flex flex-col gap-3">
        {announcement.eventUrl ? (
          <Link
            href={announcement.eventUrl}
            className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded bg-[#6AFBD8] text-[#012728] font-bold text-xs uppercase tracking-wider hover:bg-[#B5FFF0] transition-all duration-200 shadow-[0_0_12px_rgba(106,251,216,0.3)] hover:shadow-[0_0_18px_rgba(106,251,216,0.5)] group/btn"
          >
            <span className="font-mono">Explore &amp; Register</span>
            <span className="font-mono font-bold group-hover/btn:translate-x-1 transition-transform">→</span>
          </Link>
        ) : (
          <div className="flex items-center justify-between text-[11px] font-mono text-[#B5FFF0]/60">
            <span>verified // broadcast</span>
            <span className="text-[#00DCC0]">[ received ]</span>
          </div>
        )}
      </div>
    </article>
  );
}

