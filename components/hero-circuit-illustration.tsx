"use client";

import React from "react";

export default function HeroCircuitIllustration() {
  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none flex flex-col items-center justify-center">
      {/* Background radial mint/turquoise aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[340px] bg-[#00DCC0]/10 blur-[90px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 640 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_0_16px_rgba(0,220,192,0.2)]"
        aria-label="VOSC Open Source Knowledge Tree: Open book emitting circuit traces to developer monitors"
        role="img"
      >
        <defs>
          {/* Subtle neon glow filter */}
          <filter id="voscMintGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="traceGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00DCC0" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#00DCC0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6AFBD8" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="bookSpineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6AFBD8" />
            <stop offset="100%" stopColor="#00DCC0" />
          </linearGradient>
        </defs>

        {/* -------------------- 1. SATELLITE 1: CENTER TOP — CODE (</>) -------------------- */}
        <g id="screen-code" className="transition-transform duration-300 hover:-translate-y-1">
          {/* Card background and border */}
          <rect
            x="275"
            y="30"
            width="90"
            height="58"
            rx="5"
            fill="#061B1C"
            stroke="#00DCC0"
            strokeWidth="1.75"
          />
          {/* Header bar */}
          <line x1="275" y1="46" x2="365" y2="46" stroke="#003A3B" strokeWidth="1" />
          <circle cx="285" cy="38" r="2" fill="#00DCC0" />
          <circle cx="292" cy="38" r="2" fill="#003A3B" />
          <circle cx="299" cy="38" r="2" fill="#003A3B" />

          {/* Code Icon: </> */}
          <g stroke="#6AFBD8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Left bracket < */}
            <path d="M305 60 L297 66 L305 72" />
            {/* Center slash / */}
            <path d="M323 56 L317 76" />
            {/* Right bracket > */}
            <path d="M335 60 L343 66 L335 72" />
          </g>
        </g>

        {/* -------------------- 2. SATELLITE 2: TOP-LEFT — COMMUNITY (PEOPLE) -------------------- */}
        <g id="screen-community" className="transition-transform duration-300 hover:-translate-y-1">
          <rect
            x="165"
            y="75"
            width="84"
            height="56"
            rx="5"
            fill="#061B1C"
            stroke="#00DCC0"
            strokeWidth="1.75"
          />
          <line x1="165" y1="91" x2="249" y2="91" stroke="#003A3B" strokeWidth="1" />
          <circle cx="175" cy="83" r="2" fill="#00DCC0" />
          <circle cx="182" cy="83" r="2" fill="#003A3B" />
          <circle cx="189" cy="83" r="2" fill="#003A3B" />

          {/* Community / People Icon */}
          <g fill="#6AFBD8" stroke="#061B1C" strokeWidth="1">
            {/* Left person */}
            <circle cx="196" cy="104" r="5" />
            <path d="M187 122 C187 114 191 112 196 112 C201 112 205 114 205 122 Z" />
            {/* Right person */}
            <circle cx="218" cy="104" r="5" />
            <path d="M209 122 C209 114 213 112 218 112 C223 112 227 114 227 122 Z" />
            {/* Center connecting badge/node */}
            <circle cx="207" cy="108" r="3.5" fill="#00DCC0" />
          </g>
        </g>

        {/* -------------------- 3. SATELLITE 3: TOP-RIGHT — SETTINGS (GEAR) -------------------- */}
        <g id="screen-settings" className="transition-transform duration-300 hover:-translate-y-1">
          <rect
            x="391"
            y="75"
            width="84"
            height="56"
            rx="5"
            fill="#061B1C"
            stroke="#00DCC0"
            strokeWidth="1.75"
          />
          <line x1="391" y1="91" x2="475" y2="91" stroke="#003A3B" strokeWidth="1" />
          <circle cx="401" cy="83" r="2" fill="#00DCC0" />
          <circle cx="408" cy="83" r="2" fill="#003A3B" />
          <circle cx="415" cy="83" r="2" fill="#003A3B" />

          {/* Settings / Gear Icon */}
          <g transform="translate(433, 110)">
            <circle cx="0" cy="0" r="4.5" fill="none" stroke="#6AFBD8" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="9" fill="none" stroke="#6AFBD8" strokeWidth="2" strokeDasharray="4 3" />
            <path
              d="M-2 -12 H2 V-9 H-2 Z M-2 9 H2 V12 H-2 Z M-12 -2 V2 H-9 V-2 Z M9 -2 V2 H12 V-2 Z"
              fill="#6AFBD8"
            />
          </g>
        </g>

        {/* -------------------- 4. SATELLITE 4: FAR LEFT — TERMINAL (>_) -------------------- */}
        <g id="screen-terminal" className="transition-transform duration-300 hover:-translate-y-1">
          <rect
            x="55"
            y="145"
            width="82"
            height="56"
            rx="5"
            fill="#061B1C"
            stroke="#00DCC0"
            strokeWidth="1.75"
          />
          <line x1="55" y1="161" x2="137" y2="161" stroke="#003A3B" strokeWidth="1" />
          <circle cx="65" cy="153" r="2" fill="#00DCC0" />
          <circle cx="72" cy="153" r="2" fill="#003A3B" />
          <circle cx="79" cy="153" r="2" fill="#003A3B" />

          {/* Terminal Prompt: >_ */}
          <path
            d="M74 172 L82 178 L74 184"
            fill="none"
            stroke="#6AFBD8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="88" y1="185" x2="102" y2="185" stroke="#6AFBD8" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* -------------------- 5. SATELLITE 5: FAR RIGHT — GIT BRANCH (⑂) -------------------- */}
        <g id="screen-git" className="transition-transform duration-300 hover:-translate-y-1">
          <rect
            x="503"
            y="145"
            width="82"
            height="56"
            rx="5"
            fill="#061B1C"
            stroke="#00DCC0"
            strokeWidth="1.75"
          />
          <line x1="503" y1="161" x2="585" y2="161" stroke="#003A3B" strokeWidth="1" />
          <circle cx="513" cy="153" r="2" fill="#00DCC0" />
          <circle cx="520" cy="153" r="2" fill="#003A3B" />
          <circle cx="527" cy="153" r="2" fill="#003A3B" />

          {/* Git Branch Icon */}
          <g stroke="#6AFBD8" strokeWidth="2" fill="none">
            {/* Main trunk */}
            <line x1="532" y1="170" x2="532" y2="190" />
            {/* Branch curving right */}
            <path d="M532 182 C532 174 544 174 554 172" />
            <line x1="554" y1="172" x2="554" y2="188" />
            {/* Commit nodes */}
            <circle cx="532" cy="170" r="3" fill="#061B1C" stroke="#6AFBD8" strokeWidth="2" />
            <circle cx="532" cy="190" r="3" fill="#061B1C" stroke="#6AFBD8" strokeWidth="2" />
            <circle cx="554" cy="172" r="3" fill="#6AFBD8" />
          </g>
        </g>

        {/* -------------------- CIRCUIT TRACES (RISING FROM BOOK) -------------------- */}
        <g
          stroke="url(#traceGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Center Main Trunk to Code Card */}
          <path d="M320 280 V88" />
          <path d="M312 278 V125 L320 115" />
          <path d="M328 278 V125 L320 115" />

          {/* Inner Left Trace to Community Card */}
          <path d="M305 285 L260 215 V145 L225 131" />
          <path d="M295 290 L245 225 H207 V131" />

          {/* Inner Right Trace to Settings Card */}
          <path d="M335 285 L380 215 V145 L415 131" />
          <path d="M345 290 L395 225 H433 V131" />

          {/* Outer Left Trace to Terminal Card */}
          <path d="M280 295 L180 245 H125 V201" />
          <path d="M265 302 L160 255 H96 V201" />

          {/* Outer Right Trace to Git Card */}
          <path d="M360 295 L460 245 H515 V201" />
          <path d="M375 302 L480 255 H544 V201" />

          {/* Radiating Micro Traces & Branches */}
          <path d="M320 190 L290 170 H275" />
          <path d="M320 190 L350 170 H365" />
          <path d="M260 215 L240 195" />
          <path d="M380 215 L400 195" />
        </g>

        {/* -------------------- CIRCUIT NODES / SOLDER VIAS -------------------- */}
        <g fill="#6AFBD8" stroke="#012728" strokeWidth="1.5">
          <circle cx="320" cy="190" r="3.5" filter="url(#voscMintGlow)" />
          <circle cx="320" cy="140" r="3" />
          <circle cx="320" cy="100" r="3.5" />
          <circle cx="260" cy="215" r="3.5" />
          <circle cx="380" cy="215" r="3.5" />
          <circle cx="180" cy="245" r="3.5" />
          <circle cx="460" cy="245" r="3.5" />
          <circle cx="125" cy="201" r="3" />
          <circle cx="515" cy="201" r="3" />
          <circle cx="207" cy="131" r="3" />
          <circle cx="433" cy="131" r="3" />
          <circle cx="96" cy="201" r="3" />
          <circle cx="544" cy="201" r="3" />
          <circle cx="275" cy="170" r="2.5" />
          <circle cx="365" cy="170" r="2.5" />
        </g>

        {/* -------------------- THE CENTRAL OPEN BOOK -------------------- */}
        <g id="vosc-open-book" transform="translate(190, 275)">
          {/* Left Wing / Book Cover Base */}
          <path
            d="M130 50 L20 22 C14 20 8 25 8 32 V88 C8 94 14 99 20 101 L130 125 Z"
            fill="#061B1C"
            stroke="#00DCC0"
            strokeWidth="1.8"
          />

          {/* Left Pages (Cascading layered ribs) */}
          <path d="M126 58 L22 32 C18 31 14 34 14 39 V84 C14 89 18 92 22 93 L126 116" stroke="#003A3B" strokeWidth="1.5" />
          <path d="M126 66 L26 42 C22 41 18 44 18 49 V78 C18 82 22 85 26 86 L126 107" stroke="#00DCC0" strokeWidth="1.5" />
          
          {/* Left Internal Circuit Ribs */}
          <path d="M35 56 L118 78" stroke="#00DCC0" strokeWidth="1.5" strokeDasharray="4 3" />
          <path d="M35 70 L118 92" stroke="#6AFBD8" strokeWidth="1.5" />
          <path d="M40 84 L118 104" stroke="#00DCC0" strokeWidth="1.5" />

          {/* Right Wing / Book Cover Base */}
          <path
            d="M130 50 L240 22 C246 20 252 25 252 32 V88 C252 94 246 99 240 101 L130 125 Z"
            fill="#061B1C"
            stroke="#00DCC0"
            strokeWidth="1.8"
          />

          {/* Right Pages (Cascading layered ribs) */}
          <path d="M134 58 L238 32 C242 31 246 34 246 39 V84 C246 89 242 92 238 93 L134 116" stroke="#003A3B" strokeWidth="1.5" />
          <path d="M134 66 L234 42 C230 41 226 44 226 49 V78 C226 82 230 85 234 86 L134 107" stroke="#00DCC0" strokeWidth="1.5" />

          {/* Right Internal Circuit Ribs */}
          <path d="M225 56 L142 78" stroke="#00DCC0" strokeWidth="1.5" strokeDasharray="4 3" />
          <path d="M225 70 L142 92" stroke="#6AFBD8" strokeWidth="1.5" />
          <path d="M220 84 L142 104" stroke="#00DCC0" strokeWidth="1.5" />

          {/* Central Book Spine & Radiant Core */}
          <path
            d="M130 46 V128"
            stroke="url(#bookSpineGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#voscMintGlow)"
          />
          <circle cx="130" cy="46" r="4.5" fill="#6AFBD8" />
          <circle cx="130" cy="74" r="3" fill="#00DCC0" />
          <circle cx="130" cy="102" r="3" fill="#6AFBD8" />
          <circle cx="130" cy="128" r="4" fill="#00DCC0" />
        </g>

        {/* -------------------- FLOATING DATA PACKETS & PIXELS -------------------- */}
        <g fill="#6AFBD8" opacity="0.8">
          <rect x="150" y="60" width="4" height="4" fill="#00DCC0" />
          <rect x="480" y="60" width="4" height="4" fill="#6AFBD8" />
          <rect x="230" y="170" width="3" height="3" fill="#6AFBD8" />
          <rect x="410" y="170" width="3" height="3" fill="#00DCC0" />
          <rect x="318" y="240" width="4" height="4" fill="#6AFBD8" />
          <rect x="100" y="280" width="4" height="4" fill="#003A3B" />
          <rect x="540" y="280" width="4" height="4" fill="#003A3B" />
        </g>
      </svg>
    </div>
  );
}
