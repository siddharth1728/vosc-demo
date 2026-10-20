"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/prototype")) {
    return null;
  }

  const navLinks = [
    { label: "home", href: "/" },
    { label: "events", href: "/events" },
    { label: "announcements", href: "/announcements" },
    { label: "blog", href: "/blog" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#012728]/95 backdrop-blur-md border-b border-[#00DCC0] terminal-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: VOSC Brand with Book Circuit Icon */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00DCC0] rounded p-1"
            aria-label="VOSC Home"
          >
            {/* VOSC Book & Circuit Vector Mark */}
            <div className="w-8 h-8 flex items-center justify-center text-[#6AFBD8] group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                aria-hidden="true"
              >
                {/* Book Base */}
                <path
                  d="M18 10 L6 6 C4 5 2 6 2 8 V24 C2 26 4 27 6 28 L18 32 Z"
                  stroke="#00DCC0"
                  strokeWidth="1.5"
                  fill="#061B1C"
                />
                <path
                  d="M18 10 L30 6 C32 5 34 6 34 8 V24 C34 26 32 27 30 28 L18 32 Z"
                  stroke="#00DCC0"
                  strokeWidth="1.5"
                  fill="#061B1C"
                />
                {/* Book Center Line */}
                <line x1="18" y1="8" x2="18" y2="32" stroke="#6AFBD8" strokeWidth="2" />
                {/* Radiating Circuit Lines */}
                <path d="M18 14 L12 11 V8" stroke="#6AFBD8" strokeWidth="1.2" />
                <path d="M18 14 L24 11 V8" stroke="#6AFBD8" strokeWidth="1.2" />
                <circle cx="12" cy="7" r="1.5" fill="#6AFBD8" />
                <circle cx="24" cy="7" r="1.5" fill="#6AFBD8" />
                <circle cx="18" cy="8" r="1.5" fill="#6AFBD8" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-pixel text-base sm:text-lg tracking-wider text-[#6AFBD8] group-hover:text-[#B5FFF0] transition-colors leading-tight">
                VOSC
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#B5FFF0]/80 font-mono tracking-tight">
                Vasavi Open Source Community
              </span>
            </div>
          </Link>

          {/* Right: Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-sm"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-150 relative py-1 ${
                    active
                      ? "text-[#6AFBD8] font-bold"
                      : "text-[#B5FFF0] hover:text-[#6AFBD8]"
                  } focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00DCC0]`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00DCC0]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded text-[#B5FFF0] hover:text-[#6AFBD8] hover:bg-[#003A3B] border border-[#00DCC0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00DCC0]"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="sr-only">Toggle navigation</span>
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <nav
            id="mobile-navigation"
            className="md:hidden border-t border-[#00DCC0] py-4 space-y-2 bg-[#012728]"
            aria-label="Mobile Navigation"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 text-sm rounded font-mono ${
                    active
                      ? "text-[#6AFBD8] bg-[#003A3B] font-bold"
                      : "text-[#B5FFF0] hover:text-[#6AFBD8] hover:bg-[#061B1C]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
