"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#00DCC0] bg-[#012728] pt-12 pb-8 px-4 sm:px-6 font-mono text-xs text-[#B5FFF0] terminal-grid overflow-hidden">
      {/* Background scattered decorative pixel squares */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-6 left-1/4 w-3 h-3 bg-[#003A3B]" />
        <div className="absolute top-12 left-1/3 w-2 h-2 bg-[#00DCC0]/40" />
        <div className="absolute top-8 right-1/3 w-3 h-3 bg-[#061B1C]" />
        <div className="absolute bottom-10 left-12 w-2.5 h-2.5 bg-[#00DCC0]/20" />
        <div className="absolute bottom-8 right-1/4 w-3.5 h-3.5 bg-[#003A3B]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10">
          {/* Col 1: VOSC Brand Info */}
          <div className="space-y-3">
            <h4 className="font-pixel text-base sm:text-lg text-[#6AFBD8] tracking-wider uppercase">
              vosc
            </h4>
            <p className="text-xs text-[#B5FFF0]/80">
              open source @ vasavi
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#6AFBD8] lowercase tracking-wide">
              links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#6AFBD8] transition-colors">
                  home
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-[#6AFBD8] transition-colors">
                  announcements
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#6AFBD8] transition-colors">
                  blog
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#6AFBD8] transition-colors">
                  events
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Community Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#6AFBD8] lowercase tracking-wide">
              community
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://chat.whatsapp.com/vosc-vasavi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#6AFBD8] transition-colors"
                >
                  whatsapp
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vasavi-osc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#6AFBD8] transition-colors"
                >
                  github
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/vosc-vasavi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#6AFBD8] transition-colors"
                >
                  discord
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Vasavi College Emblem & VOSC Logo with Vertical Divider */}
          <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
            {/* Vasavi College Seal */}
            <div className="w-12 h-12 relative flex-shrink-0 flex items-center justify-center">
              <Image
                src="/vce-logo.svg"
                alt="Vasavi College of Engineering Emblem"
                width={48}
                height={48}
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>

            {/* Vertical Turquoise Divider Bar */}
            <div className="w-[1.5px] h-12 bg-[#00DCC0]" aria-hidden="true" />

            {/* VOSC Logo & Label */}
            <div className="flex flex-col items-start gap-1">
              <div className="w-7 h-7 flex items-center justify-center text-[#6AFBD8]">
                <svg
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  aria-hidden="true"
                >
                  {/* Curved Open Book Base & Deckle Wings */}
                  <path
                    d="M18 31 C15 32.2 10 32 4 29 C3 28.5 2.5 27.5 3 26.5 L4 23.5 C8 26 13 26.5 18 24.5 C23 26.5 28 26 32 23.5 L33 26.5 C33.5 27.5 33 28.5 32 29 C26 32 21 32.2 18 31 Z"
                    stroke="#00DCC0"
                    strokeWidth="1.3"
                    fill="#061B1C"
                  />
                  {/* Left Curved Open Spread */}
                  <path
                    d="M18 15 C13 11.5 7 12 3 15 L4 23 C8 20 13 20 18 23.5 Z"
                    stroke="#00DCC0"
                    strokeWidth="1.3"
                    fill="#061B1C"
                  />
                  {/* Right Curved Open Spread */}
                  <path
                    d="M18 15 C23 11.5 29 12 33 15 L32 23 C28 20 23 20 18 23.5 Z"
                    stroke="#00DCC0"
                    strokeWidth="1.3"
                    fill="#061B1C"
                  />
                  {/* Inner Page Ribs */}
                  <path d="M17.5 18 C13.5 15.5 8.5 15.5 4.5 18" stroke="#6AFBD8" strokeWidth="1" strokeLinecap="round" />
                  <path d="M18.5 18 C22.5 15.5 27.5 15.5 31.5 18" stroke="#6AFBD8" strokeWidth="1" strokeLinecap="round" />
                  {/* Book Center Spine */}
                  <line x1="18" y1="13" x2="18" y2="31" stroke="#6AFBD8" strokeWidth="1.8" strokeLinecap="round" />
                  {/* Radiating Circuit Lines from Spine Cleft */}
                  <path d="M18 13 V5" stroke="#6AFBD8" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M18 9 L11 6 V3" stroke="#6AFBD8" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M18 9 L25 6 V3" stroke="#6AFBD8" strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="11" cy="3" r="1.3" fill="#6AFBD8" />
                  <circle cx="18" cy="4" r="1.5" fill="#6AFBD8" />
                  <circle cx="25" cy="3" r="1.3" fill="#6AFBD8" />
                </svg>
              </div>
              <span className="font-pixel text-xs text-[#6AFBD8] tracking-wider uppercase leading-none">
                vosc
              </span>
              <span className="text-[9px] text-[#B5FFF0]/70 font-mono tracking-tight leading-tight">
                Vasavi Open Source Community
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Centered Copyright */}
        <div className="pt-6 border-t border-[#003A3B] text-center text-[11px] text-[#B5FFF0]/75">
          &copy; 2026 vosc. all rights reserved.
        </div>
      </div>
    </footer>
  );
}
