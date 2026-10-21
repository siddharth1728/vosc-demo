import Link from "next/link";
import EventCard from "@/components/event-card";
import AnnouncementCard from "@/components/announcement-card";
import HeroCircuitIllustration from "@/components/hero-circuit-illustration";
import announcements from "@/data/announcements.json";
import events from "@/data/events.json";

export default function Home() {
  // Top 3 latest announcements matching upstream reverse order
  const latestAnnouncements = [...announcements].reverse().slice(0, 3);

  // Ongoing and upcoming active events
  const ongoingEvents = events.filter((e) => e.status === "ongoing");
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const featuredEvents = [...ongoingEvents, ...upcomingEvents].slice(0, 3);

  // Verified community repositories
  const verifiedProjects = [
    {
      id: "vosc-portal",
      name: "vasaviosc.github.io",
      category: "Core Community Platform",
      description:
        "The official open-source website and portal for Vasavi Open Source Community. Built collaboratively by students at Vasavi College of Engineering.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "React 19"],
      repoUrl: "https://github.com/vasaviosc/vasaviosc.github.io",
      contributionGuide: "Open issues for UI refinements, event submissions, and blog posts.",
    },
  ];

  return (
    <main className="bg-[#012728] text-[#B5FFF0] min-h-screen relative overflow-hidden">
      {/* -------------------- 1. HERO SECTION -------------------- */}
      <section
        id="hero"
        className="relative pt-6 sm:pt-8 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#00DCC0] terminal-grid"
      >
        {/* Decorative Floating Retro Pixel Blocks across Hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Top Left Pixels */}
          <div className="absolute top-8 left-[10%] w-3 h-3 bg-[#00DCC0]/30" />
          <div className="absolute top-16 left-[18%] w-4 h-4 bg-[#003A3B]" />
          <div className="absolute top-24 left-[7%] w-2.5 h-2.5 bg-[#6AFBD8]/40" />
          <div className="absolute top-36 left-[22%] w-3.5 h-3.5 bg-[#061B1C]" />

          {/* Top Right Pixels */}
          <div className="absolute top-10 right-[15%] w-3.5 h-3.5 bg-[#003A3B]" />
          <div className="absolute top-20 right-[25%] w-2.5 h-2.5 bg-[#00DCC0]/35" />
          <div className="absolute top-32 right-[8%] w-4 h-4 bg-[#061B1C]" />
          <div className="absolute top-44 right-[20%] w-3 h-3 bg-[#6AFBD8]/30" />

          {/* Mid & Lower Pixels */}
          <div className="absolute bottom-20 left-[14%] w-3 h-3 bg-[#003A3B]" />
          <div className="absolute bottom-12 left-[28%] w-2.5 h-2.5 bg-[#00DCC0]/25" />
          <div className="absolute bottom-16 right-[18%] w-4 h-4 bg-[#003A3B]" />
          <div className="absolute bottom-24 right-[28%] w-2 h-2 bg-[#6AFBD8]/50" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Main Hero Title & Subtitle */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl text-[#6AFBD8] tracking-widest leading-none drop-shadow-[0_0_20px_rgba(106,251,216,0.35)]">
              VOSC
            </h1>
            <p className="font-mono text-sm sm:text-base md:text-lg text-[#B5FFF0] tracking-wide mt-2">
              Vasavi Open Source Community
            </p>
          </div>

          {/* Three-Column Desktop Layout: Quote (Left), Circuit Book & Explore (Center), Action Tags (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4 mt-2">
            {/* Desktop Left Column: Quote Manifesto */}
            <div className="lg:col-span-3 flex flex-col justify-center font-mono text-xs sm:text-sm text-[#B5FFF0] order-2 lg:order-1 text-center lg:text-left">
              <div className="space-y-1 inline-block">
                <p className="text-[#B5FFF0] leading-relaxed">
                  <span className="text-[#6AFBD8] font-bold mr-1">&gt;</span> Open source
                </p>
                <p className="text-[#B5FFF0] leading-relaxed pl-3 lg:pl-4">
                  is not just code,
                </p>
                <p className="text-[#B5FFF0] leading-relaxed pl-3 lg:pl-4">
                  it&apos;s a community.
                </p>
              </div>
            </div>

            {/* Centerpiece: Vector Knowledge Tree Illustration + Explore Button */}
            <div className="lg:col-span-6 w-full flex flex-col items-center justify-center order-1 lg:order-2">
              <HeroCircuitIllustration />

              {/* Pixel-bordered Explore Button directly beneath the open book */}
              <div className="mt-4 sm:mt-5">
                <a
                  href="#announcements"
                  className="inline-flex items-center justify-center px-7 py-2 rounded-sm bg-[#061B1C] text-[#B5FFF0] border border-[#00DCC0] hover:border-[#6AFBD8] hover:text-[#6AFBD8] hover:shadow-[0_0_14px_rgba(0,220,192,0.3)] font-mono text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200"
                >
                  explore
                </a>
              </div>
            </div>

            {/* Desktop Right Column: Three Stacked Action Bracket Tags */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center gap-2.5 font-mono text-xs sm:text-sm order-3">
              <Link
                href="/events"
                className="w-48 text-left px-3.5 py-1.5 rounded-sm bg-[#061B1C]/70 border border-[#00DCC0]/60 hover:border-[#6AFBD8] text-[#B5FFF0] hover:text-[#6AFBD8] transition-all flex items-center justify-between group"
              >
                <span>[ Learn</span>
                <span className="text-[#00DCC0] group-hover:text-[#6AFBD8]">]</span>
              </Link>

              <a
                href="https://github.com/vasavi-osc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-48 text-left px-3.5 py-1.5 rounded-sm bg-[#061B1C]/70 border border-[#00DCC0]/60 hover:border-[#6AFBD8] text-[#B5FFF0] hover:text-[#6AFBD8] transition-all flex items-center justify-between group"
              >
                <span>[ Contribute</span>
                <span className="text-[#00DCC0] group-hover:text-[#6AFBD8]">]</span>
              </a>

              <Link
                href="#pathways"
                className="w-48 text-left px-3.5 py-1.5 rounded-sm bg-[#061B1C]/70 border border-[#00DCC0]/60 hover:border-[#6AFBD8] text-[#B5FFF0] hover:text-[#6AFBD8] transition-all flex items-center justify-between group"
              >
                <span>[ Make an Impact</span>
                <span className="text-[#00DCC0] group-hover:text-[#6AFBD8]">]</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 2. ANNOUNCEMENTS SECTION -------------------- */}
      <section
        id="announcements"
        className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#00DCC0] bg-[#003A3B]/20 terminal-grid"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="text-xs font-mono text-[#6AFBD8] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6AFBD8] animate-pulse" />
                <span>// SYSTEM BROADCASTS &amp; DISPATCHES</span>
              </div>
              <h2 className="font-pixel text-xl sm:text-2xl text-[#6AFBD8] tracking-wider uppercase flex items-center gap-2">
                <span className="text-[#00DCC0]">&gt;</span> ANNOUNCEMENTS
              </h2>
            </div>

            <Link
              href="/announcements"
              className="text-xs sm:text-sm font-mono text-[#B5FFF0] hover:text-[#6AFBD8] hover:underline flex items-center gap-1.5 transition-colors"
            >
              <span>[ view all announcements</span>
              <span>→ ]</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 3. UPCOMING & ONGOING EVENTS SECTION -------------------- */}
      <section
        id="upcoming-events"
        className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#00DCC0] bg-[#003A3B]/30 terminal-grid"
      >
        {/* Subtle decorative pixels */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-6 right-1/4 w-3 h-3 bg-[#003A3B]" />
          <div className="absolute bottom-6 left-1/5 w-2 h-2 bg-[#00DCC0]/30" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header: > UPCOMING EVENTS and View all events -> */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="font-pixel text-lg sm:text-2xl text-[#6AFBD8] tracking-wider uppercase flex items-center gap-2">
              <span className="text-[#00DCC0]">&gt;</span> UPCOMING EVENTS
            </h2>

            <Link
              href="/events"
              className="text-xs sm:text-sm font-mono text-[#B5FFF0] hover:text-[#6AFBD8] hover:underline flex items-center gap-1.5 transition-colors"
            >
              <span>View all events</span>
              <span>→</span>
            </Link>
          </div>

          {/* 3 Featured Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 3. LEARN AND CONTRIBUTE PATHWAYS -------------------- */}
      <section
        id="pathways"
        className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#00DCC0] bg-[#012728]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono text-[#6AFBD8] uppercase tracking-wider mb-2">
                // ARCHITECTURE OF PARTICIPATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#B5FFF0]">
                Three Steps to Open Source Mastery
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#B5FFF0]/80 max-w-md">
              New to open source? Start here. No gatekeeping, just collaborative
              growth from day zero.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 01 — LEARN */}
            <div className="bg-[#061B1C] border border-[#00DCC0] hover:border-[#6AFBD8] p-6 rounded-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-pixel text-2xl text-[#6AFBD8]">01</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#00DCC0] text-[#B5FFF0]">
                    FOUNDATION
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#B5FFF0] group-hover:text-[#6AFBD8] transition-colors mb-2">
                  LEARN
                </h3>
                <p className="text-xs text-[#B5FFF0]/80 font-mono leading-relaxed mb-6">
                  Explore developer resources, Git fundamentals, tooling tutorials,
                  and technology roadmaps curated by experienced peers.
                </p>
              </div>
              <div className="pt-3 border-t border-[#003A3B]">
                <Link
                  href="/events"
                  className="text-xs font-mono text-[#6AFBD8] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>[ explore workshops &amp; primers → ]</span>
                </Link>
              </div>
            </div>

            {/* 02 — BUILD */}
            <div className="bg-[#061B1C] border border-[#00DCC0] hover:border-[#6AFBD8] p-6 rounded-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-pixel text-2xl text-[#6AFBD8]">02</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#00DCC0] text-[#B5FFF0]">
                    EXPERIMENT
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#B5FFF0] group-hover:text-[#6AFBD8] transition-colors mb-2">
                  BUILD
                </h3>
                <p className="text-xs text-[#B5FFF0]/80 font-mono leading-relaxed mb-6">
                  Discover community ideas, experiment with modern tech stacks,
                  and collaborate with fellow students across engineering branches.
                </p>
              </div>
              <div className="pt-3 border-t border-[#003A3B]">
                <a
                  href="#project-discovery"
                  className="text-xs font-mono text-[#6AFBD8] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>[ see community projects → ]</span>
                </a>
              </div>
            </div>

            {/* 03 — CONTRIBUTE */}
            <div className="bg-[#061B1C] border border-[#00DCC0] hover:border-[#6AFBD8] p-6 rounded-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-pixel text-2xl text-[#6AFBD8]">03</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#00DCC0] text-[#B5FFF0]">
                    IMPACT
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#B5FFF0] group-hover:text-[#6AFBD8] transition-colors mb-2">
                  CONTRIBUTE
                </h3>
                <p className="text-xs text-[#B5FFF0]/80 font-mono leading-relaxed mb-6">
                  Find beginner-friendly &apos;good-first-issue&apos; tasks, craft clean PRs,
                  and learn professional open-source workflows from the inside.
                </p>
              </div>
              <div className="pt-3 border-t border-[#003A3B]">
                <a
                  href="https://github.com/vasavi-osc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#6AFBD8] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>[ start your open-source journey ↗ ]</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 4. PROJECT DISCOVERY -------------------- */}
      <section
        id="project-discovery"
        className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#00DCC0] bg-[#003A3B]/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono text-[#6AFBD8] uppercase tracking-wider mb-2">
                // OPEN SOURCE CODEBASES
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#B5FFF0]">
                BUILT BY THE COMMUNITY.
              </h2>
            </div>

            <a
              href="https://github.com/vasavi-osc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#6AFBD8] hover:underline"
            >
              [ view all repos on github ↗ ]
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {verifiedProjects.map((proj) => (
              <article
                key={proj.id}
                className="bg-[#061B1C] border border-[#00DCC0] hover:border-[#6AFBD8] p-6 rounded-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#003A3B] text-[#6AFBD8] border border-[#00DCC0]">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono text-[#00DCC0]">
                      [ active repo ]
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#B5FFF0] group-hover:text-[#6AFBD8] transition-colors mb-2 font-mono">
                    {proj.name}
                  </h3>

                  <p className="text-xs text-[#B5FFF0]/80 leading-relaxed mb-5 font-mono">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-[#012728] text-[#B5FFF0] border border-[#003A3B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#003A3B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-[11px] font-mono text-[#B5FFF0]/60">
                    {proj.contributionGuide}
                  </span>
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[#6AFBD8] hover:underline"
                  >
                    <span>[ inspect repository ↗ ]</span>
                  </a>
                </div>
              </article>
            ))}

            {/* Submission Card */}
            <div className="bg-[#061B1C]/60 border border-dashed border-[#00DCC0]/70 hover:border-[#6AFBD8] p-6 rounded-md flex flex-col justify-between transition-colors">
              <div>
                <div className="flex justify-between items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#003A3B] text-[#6AFBD8] border border-[#00DCC0]">
                    COMMUNITY SHOWCASE
                  </span>
                  <span className="text-xs font-mono text-[#00DCC0]">
                    [ open submission ]
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#B5FFF0] mb-2 font-mono">
                  Have a Project Built at Vasavi?
                </h3>

                <p className="text-xs text-[#B5FFF0]/80 leading-relaxed mb-5 font-mono">
                  Are you building developer tools, campus utilities, robotics
                  firmware, or web apps? Submit your repository to be featured in the
                  official VOSC directory.
                </p>
              </div>

              <div className="pt-3 border-t border-[#003A3B]">
                <a
                  href="https://github.com/vasavi-osc/vasaviosc.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6AFBD8] hover:underline"
                >
                  <span>[ submit your project via pr → ]</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

