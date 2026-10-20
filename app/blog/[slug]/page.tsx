import { getPostData, getAllPostSlugs } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <main className="bg-[#012728] text-[#B5FFF0] min-h-screen pt-20 sm:pt-24 pb-20 font-mono">
      {/* Header Banner */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 border-b border-[#00DCC0] terminal-grid">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="text-xs font-mono text-[#B5FFF0]/80 hover:text-[#6AFBD8] mb-6 inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00DCC0] rounded p-1"
          >
            <span>←</span>
            <span>[ back to all blogs ]</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#6AFBD8] mb-3">
            <span>&gt; JOURNAL.ENTRY // {postData.id}.md</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#6AFBD8] tracking-tight mb-4 font-pixel uppercase">
            {postData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#B5FFF0]/80">
            <div className="flex items-center gap-1.5">
              <span className="text-[#00DCC0]">[ DATE ]</span>
              <time dateTime={postData.date}>{postData.date}</time>
            </div>
            <span className="text-[#003A3B]">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#00DCC0]">[ AUTHOR ]</span>
              <span className="text-[#6AFBD8] font-bold">{postData.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <article className="bg-[#061B1C] border border-[#00DCC0] rounded-lg p-6 sm:p-12 shadow-[0_0_24px_rgba(0,220,192,0.12)]">
            <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed text-[#B5FFF0]">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {postData.content}
              </ReactMarkdown>
            </div>

            <div className="mt-12 pt-6 border-t border-[#003A3B] flex justify-between items-center text-xs text-[#B5FFF0]/70">
              <span>checksum: verified</span>
              <Link
                href="/blog"
                className="text-[#6AFBD8] hover:underline"
              >
                [ return to blog index → ]
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
