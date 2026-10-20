import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <main className="bg-[#012728] text-[#B5FFF0] min-h-screen pt-20 sm:pt-24 pb-20 font-mono">
      {/* Header Banner */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 border-b border-[#00DCC0] terminal-grid">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-xs font-mono text-[#B5FFF0]/80 hover:text-[#6AFBD8] mb-6 inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00DCC0] rounded p-1"
          >
            <span>←</span>
            <span>[ return to terminal ]</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#6AFBD8] mb-2">
                <span>&gt; ENGINEERING.JOURNAL // LOGS</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#6AFBD8] tracking-tight font-pixel uppercase">
                blog &amp; logs
              </h1>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfxI4ZlUPM9Zb7laaHZiRMpg281996T3pqVXm5giTMzCtXTNA/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2.5 px-4 rounded-sm bg-[#003A3B] text-[#6AFBD8] border border-[#00DCC0] hover:bg-[#00DCC0] hover:text-[#012728] font-bold text-xs uppercase tracking-wider transition-colors self-start sm:self-auto"
            >
              <span>[ submit an article ↗ ]</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm text-[#B5FFF0]/80">
            Technical write-ups, deep dives into frameworks, and developer notes
            from VOSC community members.
          </p>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="bg-[#061B1C] border border-[#00DCC0] rounded-md p-8 text-center text-[#B5FFF0]/60">
              [ no blog posts published yet ]
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-[#061B1C] border border-[#00DCC0] hover:border-[#6AFBD8] p-5 sm:p-7 rounded-md transition-all group hover:shadow-[0_0_18px_rgba(0,220,192,0.18)]"
                >
                  <Link
                    href={`/blog/${post.id}`}
                    className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00DCC0] rounded"
                  >
                    <div className="flex items-center gap-4 text-xs text-[#6AFBD8] mb-3">
                      <time dateTime={post.date}>[{post.date}]</time>
                      <span className="text-[#00DCC0]/50">|</span>
                      <span className="text-[#B5FFF0]/70">author: {post.author}</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-[#B5FFF0] group-hover:text-[#6AFBD8] transition-colors mb-3">
                      {post.title}
                    </h2>

                    <div className="inline-flex items-center gap-1.5 text-xs text-[#6AFBD8] font-semibold">
                      <span>[ read entry</span>
                      <span className="group-hover:translate-x-1 transition-transform">→ ]</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
