"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import VoscLogoMark from "@/components/vosc-logo-mark";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left: VOSC Brand with Book Circuit Icon */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00DCC0] rounded p-1"
            aria-label="VOSC Home"
          >
            {/* VOSC Book & Circuit Vector Mark */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#6AFBD8] group-hover:scale-105 transition-transform shrink-0">
              <VoscLogoMark className="w-9 h-9 sm:w-10 sm:h-10" />
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
