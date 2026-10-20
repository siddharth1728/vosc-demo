import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import events from "@/data/events.json";

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const hasWinners =
    event.winners &&
    event.winners.some(
      (w) => w.teamName !== "To Be Announced" || w.members.length > 0
    );

  return (
    <main className="bg-[#012728] text-[#B5FFF0] min-h-screen pt-20 sm:pt-24 pb-20 font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#B5FFF0]/80 hover:text-[#6AFBD8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00DCC0] rounded p-1"
          >
            <span>←</span>
            <span>[ back to events archive ]</span>
          </Link>
        </div>

        {/* Main Event Article Container */}
        <article className="bg-[#061B1C] border border-[#00DCC0] rounded-lg overflow-hidden shadow-[0_0_24px_rgba(0,220,192,0.12)]">
          {/* Optional Poster Header Banner */}
          {event.poster && (
            <div className="w-full bg-[#003A3B]/40 border-b border-[#00DCC0] flex items-center justify-center p-4 sm:p-8">
              <div className="relative max-w-2xl w-full max-h-[460px] overflow-hidden rounded border border-[#00DCC0]/40">
                <Image
                  src={event.poster}
                  alt={`${event.title} poster`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain max-h-[460px]"
                  priority
                />
              </div>
            </div>
          )}

          <div className="p-6 sm:p-10 space-y-8">
            {/* Header Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#003A3B]">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#003A3B] text-[#6AFBD8] border border-[#00DCC0]">
                  SPEC #{event.id}
                </span>
                <span className="text-xs font-mono text-[#B5FFF0]/70">
                  slug: {event.slug}
                </span>
              </div>

              <span
                className={`text-[11px] font-mono px-3 py-0.5 rounded-full border uppercase ${
                  event.status === "ongoing"
                    ? "border-[#6AFBD8] text-[#6AFBD8] bg-[#003A3B]"
                    : event.status === "upcoming"
                    ? "border-[#00DCC0] text-[#6AFBD8] bg-[#003A3B]/50"
                    : "border-[#00DCC0]/60 text-[#B5FFF0]/80"
                }`}
              >
                status: {event.status}
              </span>
            </div>

            {/* Title & Metadata Grid */}
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#6AFBD8] tracking-tight mb-4 font-pixel uppercase">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#003A3B]/60 text-xs font-mono">
                <div className="bg-[#012728] p-3 rounded border border-[#003A3B]">
                  <span className="text-[#00DCC0] block text-[10px] uppercase font-bold mb-1">
                    [ DATE & TIME ]
                  </span>
                  <span className="text-[#B5FFF0]">{event.date}</span>
                </div>

                {event.venue && (
                  <div className="bg-[#012728] p-3 rounded border border-[#003A3B]">
                    <span className="text-[#00DCC0] block text-[10px] uppercase font-bold mb-1">
                      [ VENUE ]
                    </span>
                    <span className="text-[#B5FFF0]">{event.venue}</span>
                  </div>
                )}

                {event.teamSize && (
                  <div className="bg-[#012728] p-3 rounded border border-[#003A3B]">
                    <span className="text-[#00DCC0] block text-[10px] uppercase font-bold mb-1">
                      [ TEAM SIZE ]
                    </span>
                    <span className="text-[#B5FFF0]">{event.teamSize}</span>
                  </div>
                )}

                {event.registrationFee && (
                  <div className="bg-[#012728] p-3 rounded border border-[#003A3B]">
                    <span className="text-[#00DCC0] block text-[10px] uppercase font-bold mb-1">
                      [ REGISTRATION FEE ]
                    </span>
                    <span className="text-[#B5FFF0]">{event.registrationFee}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Event Description */}
            <div className="space-y-4 pt-4 border-t border-[#003A3B]">
              <h2 className="text-xs uppercase tracking-wider text-[#6AFBD8] font-bold">
                // OVERVIEW
              </h2>
              <p className="text-[#B5FFF0] leading-relaxed text-sm sm:text-base">
                {event.description}
              </p>
            </div>

            {/* Registration Callout if Available */}
            {event.registrationUrl && (
              <div className="bg-[#003A3B]/40 border border-[#00DCC0] rounded-md p-6 text-center space-y-4">
                <h3 className="font-pixel text-lg sm:text-xl text-[#6AFBD8] uppercase">
                  READY TO REGISTER?
                </h3>
                <p className="text-xs sm:text-sm text-[#B5FFF0]/90 max-w-lg mx-auto">
                  Submit your team details for {event.title} and join the community in building real solutions.
                </p>
                {event.registrationDeadline && (
                  <p className="text-xs text-[#6AFBD8] font-bold">
                    Registration deadline: {event.registrationDeadline}
                  </p>
                )}
                <div className="pt-2">
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-sm bg-[#6AFBD8] text-[#012728] font-bold font-mono text-sm hover:bg-[#B5FFF0] transition-colors shadow-[0_0_15px_rgba(106,251,216,0.35)]"
                  >
                    <span>Register Now</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            )}

            {/* Domains Grid (e.g. OpenQuest) */}
            {event.domains && event.domains.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-[#003A3B]">
                <h2 className="text-xs uppercase tracking-wider text-[#6AFBD8] font-bold">
                  // INNOVATION TRACKS & DOMAINS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.domains.map((domain, index) => (
                    <div
                      key={domain}
                      className="bg-[#012728] border border-[#00DCC0] p-4 rounded-sm flex items-start gap-3"
                    >
                      <span className="font-pixel text-[#6AFBD8] text-xs">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[#B5FFF0] font-bold">
                        {domain}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prize Pool Grid (e.g. OpenQuest) */}
            {event.prizes && event.prizes.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-[#003A3B]">
                <h2 className="text-xs uppercase tracking-wider text-[#6AFBD8] font-bold">
                  // REWARDS & PRIZE POOL
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.prizes.map((prize) => (
                    <div
                      key={prize.position}
                      className="bg-[#012728] border border-[#00DCC0] p-6 rounded-sm text-center"
                    >
                      <span className="text-xs text-[#B5FFF0]/70 uppercase block mb-2">
                        {prize.position}
                      </span>
                      <span className="font-pixel text-xl sm:text-2xl text-[#6AFBD8]">
                        {prize.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery (e.g. Domain Discovery, Git Session) */}
            {event.gallery && event.gallery.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-[#003A3B]">
                <h2 className="text-xs uppercase tracking-wider text-[#6AFBD8] font-bold">
                  // EVENT GALLERY & MOMENTS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.gallery.map((photo, index) => (
                    <a
                      key={photo}
                      href={photo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block relative overflow-hidden rounded border border-[#00DCC0] bg-[#012728]"
                    >
                      <Image
                        src={photo}
                        alt={`${event.title} photograph ${index + 1}`}
                        width={800}
                        height={500}
                        className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="p-2.5 flex items-center justify-between text-xs text-[#B5FFF0] bg-[#061B1C]/90 border-t border-[#003A3B]">
                        <span>Moment #{index + 1}</span>
                        <span className="text-[#6AFBD8] group-hover:underline">
                          View full photo ↗
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Winners & Achievements */}
            {hasWinners && (
              <div className="space-y-4 pt-6 border-t border-[#003A3B]">
                <h2 className="text-xs uppercase tracking-wider text-[#6AFBD8] font-bold">
                  // WINNERS & ACHIEVEMENTS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.winners?.map((winner, idx) => (
                    <div
                      key={idx}
                      className="bg-[#012728] border border-[#00DCC0] p-4 rounded-sm"
                    >
                      <span className="text-[10px] text-[#6AFBD8] font-bold uppercase block mb-1">
                        {winner.position}
                      </span>
                      <h4 className="text-sm font-bold text-[#B5FFF0] mb-2">
                        {winner.teamName}
                      </h4>
                      {winner.members.length > 0 && (
                        <p className="text-xs text-[#B5FFF0]/70">
                          Members: {winner.members.join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instagram Highlight Link */}
            {event.instagram && (
              <div className="pt-6 border-t border-[#003A3B] flex items-center justify-between text-xs">
                <span className="text-[#B5FFF0]/80">
                  Catch full session highlights and reels on Instagram:
                </span>
                <a
                  href={event.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6AFBD8] hover:underline font-bold"
                >
                  View Instagram Post ↗
                </a>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="pt-6 border-t border-[#003A3B] flex flex-wrap items-center justify-between gap-4">
              <a
                href="https://github.com/vasavi-osc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#003A3B] text-[#6AFBD8] border border-[#00DCC0] hover:bg-[#00DCC0] hover:text-[#012728] font-mono text-xs transition-colors"
              >
                <span>[ browse organization repositories ↗ ]</span>
              </a>

              <Link
                href="/events"
                className="text-xs font-mono text-[#B5FFF0] hover:text-[#6AFBD8] transition-colors"
              >
                [ return to all events ]
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
