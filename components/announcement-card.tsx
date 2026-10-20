import Link from "next/link";

interface AnnouncementCardProps {
  announcement: {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    eventUrl?: string;
  };
}

export default function AnnouncementCard({
  announcement,
}: AnnouncementCardProps) {
  return (
    <article className="group bg-[#061B1C] border border-[#00DCC0] hover:border-[#6AFBD8] p-5 sm:p-6 rounded-md flex flex-col justify-between transition-all duration-200 hover:shadow-[0_0_18px_rgba(0,220,192,0.18)]">
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

        <p className="text-xs sm:text-sm text-[#B5FFF0]/80 leading-relaxed font-mono">
          {announcement.excerpt}
        </p>
      </div>

      <div className="mt-6 pt-3 border-t border-[#003A3B] flex items-center justify-between text-[11px] font-mono text-[#B5FFF0]/60">
        {announcement.eventUrl ? (
          <Link
            href={announcement.eventUrl}
            className="text-[#6AFBD8] hover:text-[#B5FFF0] hover:underline flex items-center gap-1 font-bold"
          >
            <span>[ view event dispatch</span>
            <span>→ ]</span>
          </Link>
        ) : (
          <span>verified // broadcast</span>
        )}
        <span className="text-[#00DCC0]">[ received ]</span>
      </div>
    </article>
  );
}
