"use client";

import React from "react";

export default function HeroCircuitIllustration() {
  return (
    <div className="relative w-full max-w-[580px] lg:max-w-[620px] mx-auto select-none flex flex-col items-center justify-center">
      {/* Radiant ambient teal/cyan aura behind the book and circuits */}
      <div
        className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[360px] bg-[#00DCC0]/15 blur-[100px] pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[160px] bg-[#6AFBD8]/20 blur-[60px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 680 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_0_24px_rgba(0,220,192,0.28)]"
        aria-label="VOSC Open Source Knowledge Tree: Illuminated open book emitting circuit traces to five developer modules"
        role="img"
      >
        <defs>
          {/* Intense core glow for vias and nodes */}
          <filter id="voscNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Book illumination glow filter */}
          <filter id="voscBookGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0.86 0 0 0   0 0 0.75 0 0   0 0 0 0.45 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Circuit line gradient */}
          <linearGradient id="voscCircuitGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00DCC0" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#00DCC0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#6AFBD8" stopOpacity="1" />
          </linearGradient>

          {/* Luminous Book Page Spread Gradient (Pure White into Mint Glow) */}
          <linearGradient id="voscPageLeftSpread" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E6FFFA" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F0FDFA" />
          </linearGradient>

          <linearGradient id="voscPageRightSpread" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E6FFFA" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F0FDFA" />
          </linearGradient>

          {/* Page stack under-layers gradients */}
          <linearGradient id="voscStackGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6AFBD8" />
            <stop offset="100%" stopColor="#00DCC0" />
          </linearGradient>

          <linearGradient id="voscStackGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00DCC0" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Window module dark background gradient */}
          <linearGradient id="voscModuleBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#072224" />
            <stop offset="100%" stopColor="#031517" />
          </linearGradient>
        </defs>

        {/* ============================================================
             1. THE FIVE SURROUNDING WINDOW BOXES (IN AN ARCHING HALO)
             ============================================================ */}

        {/* --- BOX 1 (FAR LEFT): TERMINAL PROMPT (>_) --- */}
        <g id="box-terminal" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
          <rect
            x="44"
            y="172"
            width="88"
            height="58"
            rx="6"
            fill="url(#voscModuleBg)"
            stroke="#00DCC0"
            strokeWidth="1.75"
          />
          {/* Window Title Bar */}
          <line x1="44" y1="188" x2="132" y2="188" stroke="#003A3B" strokeWidth="1.2" />
          <circle cx="54" cy="180" r="2.2" fill="#00DCC0" />
          <circle cx="61" cy="180" r="2.2" fill="#003A3B" />
          <circle cx="68" cy="180" r="2.2" fill="#003A3B" />

          {/* Terminal Prompt Icon: >_ */}
          <path
            d="M66 198 L75 204 L66 210"
            fill="none"
            stroke="#6AFBD8"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="81"
            y1="210"
            x2="96"
            y2="210"
            stroke="#6AFBD8"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>

        {/* --- BOX 2 (MID LEFT): COMMUNITY (3 AVATARS) --- */}
        <g id="box-community" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
          <rect
            x="154"
            y="82"
            width="90"
            height="60"
            rx="6"
            fill="url(#voscModuleBg)"
            stroke="#00DCC0"
            strokeWidth="1.75"
          />
          <line x1="154" y1="98" x2="244" y2="98" stroke="#003A3B" strokeWidth="1.2" />
          <circle cx="164" cy="90" r="2.2" fill="#00DCC0" />
          <circle cx="171" cy="90" r="2.2" fill="#003A3B" />
          <circle cx="178" cy="90" r="2.2" fill="#003A3B" />

          {/* 3 Avatar Group Icon */}
          <g>
            {/* Left Member */}
            <circle cx="185" cy="111" r="3.5" fill="#00DCC0" />
            <path d="M178 128 C178 122 181 120 185 120 C189 120 192 122 192 128 Z" fill="#00DCC0" />
            {/* Right Member */}
            <circle cx="213" cy="111" r="3.5" fill="#00DCC0" />
            <path d="M206 128 C206 122 209 120 213 120 C217 120 220 122 220 128 Z" fill="#00DCC0" />
            {/* Center Leader */}
            <circle cx="199" cy="108" r="4.5" fill="#6AFBD8" stroke="#031517" strokeWidth="1" />
            <path d="M190 129 C190 120 193 117 199 117 C205 117 208 120 208 129 Z" fill="#6AFBD8" stroke="#031517" strokeWidth="1" />
          </g>
        </g>

        {/* --- BOX 3 (CENTER TOP - PINNACLE): CODE EDITOR (</>) --- */}
        <g id="box-code" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
          <rect
            x="294"
            y="26"
            width="92"
            height="62"
            rx="6"
            fill="url(#voscModuleBg)"
            stroke="#6AFBD8"
            strokeWidth="2"
            filter="url(#voscNodeGlow)"
          />
          <line x1="294" y1="43" x2="386" y2="43" stroke="#003A3B" strokeWidth="1.2" />
          <circle cx="305" cy="35" r="2.2" fill="#6AFBD8" />
          <circle cx="312" cy="35" r="2.2" fill="#00DCC0" />
          <circle cx="319" cy="35" r="2.2" fill="#003A3B" />

          {/* Code Icon: </> */}
          <g stroke="#6AFBD8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M324 57 L315 63 L324 69" />
            <path d="M344 53 L336 73" />
            <path d="M356 57 L365 63 L356 69" />
          </g>
        </g>

        {/* --- BOX 4 (MID RIGHT): SETTINGS / ARCHITECTURE (GEAR ⚙️) --- */}
        <g id="box-settings" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
          <rect
            x="436"
            y="82"
            width="90"
            height="60"
            rx="6"
            fill="url(#voscModuleBg)"
            stroke="#00DCC0"
            strokeWidth="1.75"
          />
          <line x1="436" y1="98" x2="526" y2="98" stroke="#003A3B" strokeWidth="1.2" />
          <circle cx="446" cy="90" r="2.2" fill="#00DCC0" />
          <circle cx="453" cy="90" r="2.2" fill="#003A3B" />
          <circle cx="460" cy="90" r="2.2" fill="#003A3B" />

          {/* Precision 8-Tooth Gear Icon */}
          <g transform="translate(481, 118)">
            <circle cx="0" cy="0" r="4.2" fill="#031517" stroke="#6AFBD8" strokeWidth="2" />
            <circle cx="0" cy="0" r="8" fill="none" stroke="#00DCC0" strokeWidth="1.5" />
            <circle
              cx="0"
              cy="0"
              r="11.5"
              fill="none"
              stroke="#6AFBD8"
              strokeWidth="3.2"
              strokeDasharray="4.8 4.2"
            />
          </g>
        </g>

        {/* --- BOX 5 (FAR RIGHT): VERSION CONTROL / GIT --- */}
        <g id="box-git" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
          <rect
            x="548"
            y="172"
            width="88"
            height="58"
            rx="6"
            fill="url(#voscModuleBg)"
            stroke="#00DCC0"
            strokeWidth="1.75"
          />
          <line x1="548" y1="188" x2="636" y2="188" stroke="#003A3B" strokeWidth="1.2" />
          <circle cx="558" cy="180" r="2.2" fill="#00DCC0" />
          <circle cx="565" cy="180" r="2.2" fill="#003A3B" />
          <circle cx="572" cy="180" r="2.2" fill="#003A3B" />

          {/* Git Diamond & Branch Nodes */}
          <g>
            <rect
              x="579"
              y="190"
              width="22"
              height="22"
              rx="3"
              transform="rotate(45 590 201)"
              fill="#031517"
              stroke="#6AFBD8"
              strokeWidth="1.8"
            />
            <line x1="586" y1="195" x2="586" y2="211" stroke="#6AFBD8" strokeWidth="1.8" />
            <path
              d="M586 205 C586 200 595 200 595 195"
              fill="none"
              stroke="#6AFBD8"
              strokeWidth="1.8"
            />
            <circle cx="586" cy="195" r="2.3" fill="#6AFBD8" />
            <circle cx="586" cy="211" r="2.3" fill="#6AFBD8" />
            <circle cx="595" cy="195" r="2.3" fill="#6AFBD8" />
          </g>
        </g>

        {/* ============================================================
             2. ELEGANT, NEAT PCB CIRCUIT TREE (SYMMETRICAL & ORDERED)
             ============================================================ */}
        <g
          stroke="url(#voscCircuitGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* A. Central Trunk to Top Code Box */}
          <path d="M 340 310 V 88" />

          {/* B. Inner Left Branch to Community Box */}
          <path d="M 328 310 V 226 L 244 142" />

          {/* C. Inner Right Branch to Settings/Gear Box (Exact Symmetrical Mirror) */}
          <path d="M 352 310 V 226 L 436 142" />

          {/* D. Outer Left Branch to Terminal Box (Clean 45° Chamfer into Horizontal Port) */}
          <path d="M 316 310 V 246 L 271 201 H 132" />

          {/* E. Outer Right Branch to Git Box (Clean 45° Chamfer into Horizontal Port) */}
          <path d="M 364 310 V 246 L 409 201 H 548" />

          {/* F. Balanced 45° Sprouting Foliage Stubs */}
          {/* Upper Trunk Sprout Pair */}
          <path d="M 340 156 L 312 128" />
          <path d="M 340 156 L 368 128" />

          {/* Mid Trunk Sprout Pair */}
          <path d="M 340 216 L 298 174" />
          <path d="M 340 216 L 382 174" />

          {/* Mid Wing Sprout Pair */}
          <path d="M 286 184 L 260 158" />
          <path d="M 394 184 L 420 158" />

          {/* Lower Outer Sprout Pair */}
          <path d="M 271 201 L 243 229" />
          <path d="M 409 201 L 437 229" />
        </g>

        {/* Luminous Glowing Circuit Vias / Solder Pads */}
        <g fill="#FFFFFF" stroke="#00DCC0" strokeWidth="2">
          {/* Box Connector Ports (Terminating Nodes) */}
          <circle cx="340" cy="88" r="3.5" filter="url(#voscNodeGlow)" />
          <circle cx="244" cy="142" r="3.5" filter="url(#voscNodeGlow)" />
          <circle cx="436" cy="142" r="3.5" filter="url(#voscNodeGlow)" />
          <circle cx="132" cy="201" r="3.5" filter="url(#voscNodeGlow)" />
          <circle cx="548" cy="201" r="3.5" filter="url(#voscNodeGlow)" />

          {/* Symmetrical Terminal Stubs Nodes */}
          <circle cx="312" cy="128" r="3.5" filter="url(#voscNodeGlow)" />
          <circle cx="368" cy="128" r="3.5" filter="url(#voscNodeGlow)" />
          <circle cx="298" cy="174" r="3.5" filter="url(#voscNodeGlow)" />
          <circle cx="382" cy="174" r="3.5" filter="url(#voscNodeGlow)" />
          <circle cx="260" cy="158" r="3" />
          <circle cx="420" cy="158" r="3" />
          <circle cx="243" cy="229" r="3" />
          <circle cx="437" cy="229" r="3" />

          {/* Trunk Junction Dots */}
          <circle cx="340" cy="156" r="2.5" fill="#6AFBD8" stroke="#012728" strokeWidth="1" />
          <circle cx="340" cy="216" r="2.5" fill="#6AFBD8" stroke="#012728" strokeWidth="1" />
        </g>

        {/* ============================================================
             3. THE CENTRAL OPEN BOOK (HIGH VISIBILITY & PROMINENCE)
             Engineered with bold, glowing white and layered mint pages
             so it unmistakably stands out as the centerpiece foundation.
             ============================================================ */}
        <g id="vosc-illuminated-book" className="transition-transform duration-300 hover:scale-[1.015]">
          
          {/* A. BROAD UNDER-BOOK ILLUMINATION HALO */}
          <ellipse
            cx="340"
            cy="365"
            rx="230"
            ry="45"
            fill="#00DCC0"
            opacity="0.22"
            filter="url(#voscBookGlow)"
          />

          {/* B. HARDCOVER BASE BINDING & CENTRAL SPINE NOTCH */}
          {/* Left Base Cover Edge */}
          <path
            d="M 130 380 L 322 380 C 327 386, 333 392, 340 392"
            stroke="#6AFBD8"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right Base Cover Edge */}
          <path
            d="M 550 380 L 358 380 C 353 386, 347 392, 340 392"
            stroke="#6AFBD8"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Vertical Binding Spine Rib */}
          <line
            x1="340"
            y1="310"
            x2="340"
            y2="392"
            stroke="#6AFBD8"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* C. MULTI-LAYERED FANNED PAGES (BOTTOM STACK TO TOP) */}

          {/* Layer 5 (Bottom Stack - Deep Emerald Wing) */}
          <path
            d="M 340 368 C 275 358, 200 358, 134 372 L 130 380 C 195 368, 275 366, 340 376 Z"
            fill="url(#voscStackGrad2)"
            stroke="#00DCC0"
            strokeWidth="1.2"
          />
          <path
            d="M 340 368 C 405 358, 480 358, 546 372 L 550 380 C 485 368, 405 366, 340 376 Z"
            fill="url(#voscStackGrad2)"
            stroke="#00DCC0"
            strokeWidth="1.2"
          />

          {/* Layer 4 (Stack Tier 4) */}
          <path
            d="M 340 358 C 280 344, 210 344, 142 358 L 138 368 C 208 354, 276 352, 340 364 Z"
            fill="url(#voscStackGrad1)"
            stroke="#6AFBD8"
            strokeWidth="1.2"
          />
          <path
            d="M 340 358 C 400 344, 470 344, 538 358 L 542 368 C 472 354, 404 352, 340 364 Z"
            fill="url(#voscStackGrad1)"
            stroke="#6AFBD8"
            strokeWidth="1.2"
          />

          {/* Layer 3 (Stack Tier 3) */}
          <path
            d="M 340 346 C 285 330, 220 328, 154 344 L 148 354 C 216 338, 280 338, 340 352 Z"
            fill="#E6FFFA"
            stroke="#00DCC0"
            strokeWidth="1.4"
          />
          <path
            d="M 340 346 C 395 330, 460 328, 526 344 L 532 354 C 464 338, 400 338, 340 352 Z"
            fill="#E6FFFA"
            stroke="#00DCC0"
            strokeWidth="1.4"
          />

          {/* Layer 2 (Stack Tier 2) */}
          <path
            d="M 340 332 C 290 314, 230 312, 168 328 L 160 338 C 224 322, 286 322, 340 338 Z"
            fill="#F0FDFA"
            stroke="#6AFBD8"
            strokeWidth="1.6"
          />
          <path
            d="M 340 332 C 390 314, 450 312, 512 328 L 520 338 C 456 322, 394 322, 340 338 Z"
            fill="#F0FDFA"
            stroke="#6AFBD8"
            strokeWidth="1.6"
          />

          {/* Layer 1 (THE MAIN OPEN PAGES - LUMINOUS PURE WHITE & HIGH CONTRAST) */}
          {/* Left Open Page Face */}
          <path
            d="M 340 310
               C 295 264, 240 252, 178 268
               L 168 318
               C 230 302, 290 306, 340 328 Z"
            fill="url(#voscPageLeftSpread)"
            stroke="#6AFBD8"
            strokeWidth="2.8"
            strokeLinejoin="round"
            filter="url(#voscBookGlow)"
          />
          {/* Left Page Top Radiant Edge Highlight */}
          <path
            d="M 340 310 C 295 264, 240 252, 178 268"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Open Page Face */}
          <path
            d="M 340 310
               C 385 264, 440 252, 502 268
               L 512 318
               C 450 302, 390 306, 340 328 Z"
            fill="url(#voscPageRightSpread)"
            stroke="#6AFBD8"
            strokeWidth="2.8"
            strokeLinejoin="round"
            filter="url(#voscBookGlow)"
          />
          {/* Right Page Top Radiant Edge Highlight */}
          <path
            d="M 340 310 C 385 264, 440 252, 502 268"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Page Authentic Text Lines (Subtle code/rule indentations) */}
          <g stroke="#00DCC0" strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
            <line x1="210" y1="285" x2="315" y2="280" />
            <line x1="220" y1="294" x2="320" y2="291" />
            <line x1="205" y1="303" x2="310" y2="302" />
          </g>

          {/* Right Page Authentic Text Lines */}
          <g stroke="#00DCC0" strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
            <line x1="365" y1="280" x2="470" y2="285" />
            <line x1="360" y1="291" x2="460" y2="294" />
            <line x1="370" y1="302" x2="475" y2="303" />
          </g>

          {/* Central Valley V-Cleft Crease */}
          <path
            d="M 326 298 L 340 310 L 354 298"
            stroke="#6AFBD8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <line
            x1="340"
            y1="310"
            x2="340"
            y2="330"
            stroke="#00DCC0"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* ============================================================
             4. FLOATING DATA PACKETS & CYBER PARTICLES (ATMOSPHERE)
             ============================================================ */}
        <g fill="#6AFBD8" opacity="0.9">
          {/* Top spark cluster */}
          <rect x="270" y="48" width="4.5" height="4.5" fill="#00DCC0" />
          <rect x="408" y="48" width="4.5" height="4.5" fill="#6AFBD8" />
          <rect x="135" y="68" width="3.5" height="3.5" fill="#00DCC0" />
          <rect x="540" y="68" width="3.5" height="3.5" fill="#6AFBD8" />

          {/* Mid spark cluster */}
          <rect x="228" y="152" width="3" height="3" fill="#FFFFFF" />
          <rect x="450" y="152" width="3" height="3" fill="#FFFFFF" />
          <rect x="325" y="215" width="4" height="4" fill="#6AFBD8" />
          <rect x="352" y="215" width="4" height="4" fill="#00DCC0" />

          {/* Lower book spark cluster */}
          <rect x="110" y="278" width="4.5" height="4.5" fill="#00DCC0" />
          <rect x="565" y="278" width="4.5" height="4.5" fill="#6AFBD8" />
          <rect x="120" y="340" width="3.5" height="3.5" fill="#FFFFFF" />
          <rect x="555" y="340" width="3.5" height="3.5" fill="#00DCC0" />
          <rect x="235" y="398" width="3.5" height="3.5" fill="#003A3B" />
          <rect x="445" y="398" width="3.5" height="3.5" fill="#003A3B" />
        </g>
      </svg>
    </div>
  );
}
