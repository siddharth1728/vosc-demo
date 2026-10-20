import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#012728] text-[#B5FFF0] min-h-screen flex items-center justify-center pt-20 px-4 font-mono terminal-grid">
      <section className="text-center max-w-md bg-[#061B1C] border border-[#00DCC0] p-8 sm:p-12 rounded shadow-[0_0_24px_rgba(0,220,192,0.18)]">
        <div className="text-xs font-mono text-[#6AFBD8] uppercase tracking-wider mb-2">
          [ 404 // ROUTE_NOT_RESOLVED ]
        </div>
        <h1 className="font-pixel text-6xl sm:text-7xl font-black text-[#6AFBD8] mb-4">
          404
        </h1>
        <p className="text-xs sm:text-sm text-[#B5FFF0]/80 mb-8 font-mono">
          The requested memory address or route does not exist in the VOSC tree.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#003A3B] text-[#6AFBD8] px-6 py-3 text-xs font-mono font-bold hover:bg-[#6AFBD8] hover:text-[#012728] transition-colors border border-[#00DCC0] rounded-sm"
        >
          [ return to base terminal → ]
        </Link>
      </section>
    </main>
  );
}
