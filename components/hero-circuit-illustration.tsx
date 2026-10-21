"use client";

import React from "react";

export default function HeroCircuitIllustration() {
  return (
    <div className="relative w-full max-w-[580px] lg:max-w-[620px] mx-auto select-none flex flex-col items-center justify-center">
      {/* Radiant ambient teal/cyan aura behind the book and circuits (Layer D) */}
      <div
        className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[360px] bg-[#00DCC0]/15 blur-[100px] pointer-events-none rounded-full vosc-ambient-breathe-1"
        aria-hidden="true"
      />
      <div
        className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[160px] bg-[#6AFBD8]/20 blur-[60px] pointer-events-none rounded-full vosc-ambient-breathe-2"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 680 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_0_24px_rgba(0,220,192,0.28)]"
        aria-label="VOSC Open Source Knowledge Tree: Illuminated open book emitting a 9-stem circuit tree to five developer modules"
        role="img"
      >
        <defs>
          {/* Intense core glow for vias and nodes */}
          <filter id="voscNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
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
            <stop offset="0%" stopColor="#00DCC0" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#00DCC0" stopOpacity="0.95" />
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
        <g id="box-terminal" className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(106,251,216,0.35)]">
          <rect
            x="45"
            y="168"
            width="88"
            height="58"
            rx="6"
            fill="url(#voscModuleBg)"
            stroke="#00DCC0"
            strokeWidth="1.75"
            className="transition-colors duration-300 group-hover:stroke-[#6AFBD8]"
          />
          {/* Window Title Bar */}
          <line x1="45" y1="184" x2="133" y2="184" stroke="#003A3B" strokeWidth="1.2" />
          <circle cx="55" cy="176" r="2.2" fill="#00DCC0" />
          <circle cx="62" cy="176" r="2.2" fill="#003A3B" />
          <circle cx="69" cy="176" r="2.2" fill="#003A3B" />

          {/* Terminal Prompt Icon: >_ */}
          <path
            d="M67 194 L76 200 L67 206"
            fill="none"
            stroke="#6AFBD8"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="82"
            y1="206"
            x2="97"
            y2="206"
            stroke="#6AFBD8"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="group-hover:stroke-[#FFFFFF] transition-colors duration-300"
          />
        </g>

        {/* --- BOX 2 (MID LEFT): COMMUNITY (3 AVATARS) --- */}
        <g id="box-community" className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(106,251,216,0.35)]">
          <rect
            x="148"
            y="76"
            width="90"
            height="60"
            rx="6"
            fill="url(#voscModuleBg)"
            stroke="#00DCC0"
            strokeWidth="1.75"
            className="transition-colors duration-300 group-hover:stroke-[#6AFBD8]"
          />
          <line x1="148" y1="92" x2="238" y2="92" stroke="#003A3B" strokeWidth="1.2" />
          <circle cx="158" cy="84" r="2.2" fill="#00DCC0" />
          <circle cx="165" cy="84" r="2.2" fill="#003A3B" />
          <circle cx="172" cy="84" r="2.2" fill="#003A3B" />

          {/* 3 Avatar Group Icon */}
          <g>
            <circle cx="179" cy="105" r="3.5" fill="#00DCC0" />
            <path d="M172 122 C172 116 175 114 179 114 C183 114 186 116 186 122 Z" fill="#00DCC0" />
            <circle cx="207" cy="105" r="3.5" fill="#00DCC0" />
            <path d="M200 122 C200 116 203 114 207 114 C211 114 214 116 214 122 Z" fill="#00DCC0" />
            <circle cx="193" cy="102" r="4.5" fill="#6AFBD8" stroke="#031517" strokeWidth="1" className="group-hover:fill-[#FFFFFF] transition-colors duration-300" />
            <path d="M184 123 C184 114 187 111 193 111 C199 111 202 114 202 123 Z" fill="#6AFBD8" stroke="#031517" strokeWidth="1" />
          </g>
        </g>

        {/* --- BOX 3 (CENTER TOP - PINNACLE): CODE EDITOR (</>) --- */}
        <g id="box-code" className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_18px_rgba(106,251,216,0.5)]">
          <rect
            x="294"
            y="20"
            width="92"
            height="62"
            rx="6"
            fill="url(#voscModuleBg)"
            stroke="#6AFBD8"
            strokeWidth="2"
            filter="url(#voscNodeGlow)"
            className="transition-colors duration-300 group-hover:stroke-[#FFFFFF]"
          />
          <line x1="294" y1="37" x2="386" y2="37" stroke="#003A3B" strokeWidth="1.2" />
          <circle cx="305" cy="29" r="2.2" fill="#6AFBD8" />
          <circle cx="312" cy="29" r="2.2" fill="#00DCC0" />
          <circle cx="319" cy="29" r="2.2" fill="#003A3B" />

          {/* Code Icon: </> */}
          <g stroke="#6AFBD8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-105 origin-center">
            <path d="M324 51 L315 57 L324 63" />
            <path d="M344 47 L336 67" />
            <path d="M356 51 L365 57 L356 63" />
          </g>
        </g>

        {/* --- BOX 4 (MID RIGHT): SETTINGS / ARCHITECTURE (GEAR ⚙️) --- */}
        <g id="box-settings" className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(106,251,216,0.35)]">
          <rect
            x="442"
            y="76"
            width="90"
            height="60"
            rx="6"
            fill="url(#voscModuleBg)"
            stroke="#00DCC0"
            strokeWidth="1.75"
            className="transition-colors duration-300 group-hover:stroke-[#6AFBD8]"
          />
          <line x1="442" y1="92" x2="532" y2="92" stroke="#003A3B" strokeWidth="1.2" />
          <circle cx="452" cy="84" r="2.2" fill="#00DCC0" />
          <circle cx="459" cy="84" r="2.2" fill="#003A3B" />
          <circle cx="466" cy="84" r="2.2" fill="#003A3B" />

          {/* Precision 8-Tooth Gear Icon */}
          <g transform="translate(487, 112)" className="vosc-gear-spin">
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
        <g id="box-git" className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_12px_rgba(106,251,216,0.35)]">
          <rect
            x="547"
            y="168"
            width="88"
            height="58"
            rx="6"
            fill="url(#voscModuleBg)"
            stroke="#00DCC0"
            strokeWidth="1.75"
            className="transition-colors duration-300 group-hover:stroke-[#6AFBD8]"
          />
          <line x1="547" y1="184" x2="635" y2="184" stroke="#003A3B" strokeWidth="1.2" />
          <circle cx="557" cy="176" r="2.2" fill="#00DCC0" />
          <circle cx="564" cy="176" r="2.2" fill="#003A3B" />
          <circle cx="571" cy="176" r="2.2" fill="#003A3B" />

          {/* Git Diamond & Branch Nodes */}
          <g>
            <rect
              x="578"
              y="186"
              width="22"
              height="22"
              rx="3"
              transform="rotate(45 589 197)"
              fill="#031517"
              stroke="#6AFBD8"
              strokeWidth="1.8"
              className="transition-colors duration-300 group-hover:stroke-[#FFFFFF]"
            />
            <line x1="585" y1="191" x2="585" y2="207" stroke="#6AFBD8" strokeWidth="1.8" />
            <path
              d="M585 201 C585 196 594 196 594 191"
              fill="none"
              stroke="#6AFBD8"
              strokeWidth="1.8"
            />
            <circle cx="585" cy="191" r="2.3" fill="#6AFBD8" />
            <circle cx="585" cy="207" r="2.3" fill="#6AFBD8" />
            <circle cx="594" cy="191" r="2.3" fill="#6AFBD8" />
          </g>
        </g>

        {/* ============================================================
             2. THE 9-STEM CIRCUIT TREE (EXACT REFERENCE REPRODUCTION)
             Rising symmetrically from the central cleft of the open book
             into 9 glowing circular hollow via rings.
             ============================================================ */}
        <g
          stroke="url(#voscCircuitGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stem 0: Central Vertical Trunk (Pinnacle to Y=92) */}
          <path d="M 340 310 V 99" />

          {/* Stem L2: Near-Center Left High Branch (Peaks at Y=130) */}
          <path d="M 336 310 V 151 L 315 130" />

          {/* Stem R2: Near-Center Right High Branch (Peaks at Y=130) */}
          <path d="M 344 310 V 151 L 365 130" />

          {/* Stem L1: Inner Left Dip Branch (Peaks at Y=175) */}
          <path d="M 330 310 V 220 L 285 175" />

          {/* Stem R1: Inner Right Dip Branch (Peaks at Y=175) */}
          <path d="M 350 310 V 220 L 395 175" />

          {/* Stem L3: Mid Left Peak Branch (Peaks at Y=150) */}
          <path d="M 324 310 V 244 L 230 150" />

          {/* Stem R3: Mid Right Peak Branch (Peaks at Y=150) */}
          <path d="M 356 310 V 244 L 450 150" />

          {/* Stem L4: Outermost Left Wing Branch (Lower Wing at Y=205) */}
          <path d="M 318 310 V 265 L 258 205 H 195" />

          {/* Stem R4: Outermost Right Wing Branch (Lower Wing at Y=205) */}
          <path d="M 362 310 V 265 L 422 205 H 485" />
        </g>

        {/* --- LIGHT PULSE OVERLAYS (LAYERS A & C) --- */}
        <g pointerEvents="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Autonomous ambient pulses (Layer A) */}
          <path d="M 324 310 V 244 L 230 150" stroke="#6AFBD8" filter="url(#voscNodeGlow)" className="vosc-ambient-stem-pulse-1" />
          <path d="M 356 310 V 244 L 450 150" stroke="#6AFBD8" filter="url(#voscNodeGlow)" className="vosc-ambient-stem-pulse-2" />

          {/* Coordinated Book-to-Circuit Sequence Pulses (Layer C, Step 3) */}
          <path d="M 340 310 V 99" stroke="#FFFFFF" filter="url(#voscNodeGlow)" className="vosc-pulse-stem-0" />
          <path d="M 336 310 V 151 L 315 130" stroke="#6AFBD8" filter="url(#voscNodeGlow)" className="vosc-pulse-stem-near" />
          <path d="M 344 310 V 151 L 365 130" stroke="#6AFBD8" filter="url(#voscNodeGlow)" className="vosc-pulse-stem-near" />
          <path d="M 330 310 V 220 L 285 175" stroke="#6AFBD8" filter="url(#voscNodeGlow)" className="vosc-pulse-stem-mid" />
          <path d="M 350 310 V 220 L 395 175" stroke="#6AFBD8" filter="url(#voscNodeGlow)" className="vosc-pulse-stem-mid" />
          <path d="M 324 310 V 244 L 230 150" stroke="#6AFBD8" filter="url(#voscNodeGlow)" className="vosc-pulse-stem-mid" />
          <path d="M 356 310 V 244 L 450 150" stroke="#6AFBD8" filter="url(#voscNodeGlow)" className="vosc-pulse-stem-mid" />
          <path d="M 318 310 V 265 L 258 205 H 195" stroke="#6AFBD8" filter="url(#voscNodeGlow)" className="vosc-pulse-stem-outer" />
          <path d="M 362 310 V 265 L 422 205 H 485" stroke="#6AFBD8" filter="url(#voscNodeGlow)" className="vosc-pulse-stem-outer" />
        </g>

        {/* Solder Ring Via Nodes (9 White Rings with Hollow Dark Center - Layer C, Step 4) */}
        <g stroke="#FFFFFF" strokeWidth="2.6" fill="#012728" filter="url(#voscNodeGlow)">
          {/* Outermost Wings */}
          <circle cx="195" cy="205" r="7" className="vosc-node-seq-outer" />
          <circle cx="485" cy="205" r="7" className="vosc-node-seq-outer" />

          {/* Mid High Peaks */}
          <circle cx="230" cy="150" r="7" className="vosc-node-seq-mid" />
          <circle cx="450" cy="150" r="7" className="vosc-node-seq-mid" />

          {/* Inner Dips */}
          <circle cx="285" cy="175" r="7" className="vosc-node-seq-inner" />
          <circle cx="395" cy="175" r="7" className="vosc-node-seq-inner" />

          {/* Near-Center High Peaks */}
          <circle cx="315" cy="130" r="7" className="vosc-node-seq-near" />
          <circle cx="365" cy="130" r="7" className="vosc-node-seq-near" />

          {/* Central Pinnacle Node */}
          <circle cx="340" cy="92" r="7.5" className="vosc-node-seq-pinnacle" />
        </g>

        {/* Inner Cyan Via Ring Accents (Refining the Hollow PCB Via Look) */}
        <g stroke="#00DCC0" strokeWidth="1" fill="none">
          <circle cx="195" cy="205" r="4.2" />
          <circle cx="485" cy="205" r="4.2" />
          <circle cx="230" cy="150" r="4.2" />
          <circle cx="450" cy="150" r="4.2" />
          <circle cx="285" cy="175" r="4.2" />
          <circle cx="395" cy="175" r="4.2" />
          <circle cx="315" cy="130" r="4.2" />
          <circle cx="365" cy="130" r="4.2" />
          <circle cx="340" cy="92"  r="4.5" />
        </g>

        {/* ============================================================
             3. THE CENTRAL OPEN BOOK (HIGH VISIBILITY & PROMINENCE)
             Engineered with bold, glowing white and layered mint pages
             so it unmistakably stands out as the centerpiece foundation.
             ============================================================ */}
        <g id="vosc-illuminated-book" className="transition-transform duration-300 hover:scale-[1.015]">
          
          {/* A. BROAD UNDER-BOOK ILLUMINATION HALO (Layer C, Step 1) */}
          <ellipse
            cx="340"
            cy="365"
            rx="230"
            ry="45"
            fill="#00DCC0"
            opacity="0.22"
            filter="url(#voscBookGlow)"
            className="vosc-book-aura-pulse"
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
            className="vosc-book-edge-glow"
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
            className="vosc-book-edge-glow"
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

          {/* Focal Central Cleft Pulse Node (Layer C, Step 2) */}
          <circle
            cx="340"
            cy="310"
            r="5"
            fill="#FFFFFF"
            stroke="#6AFBD8"
            strokeWidth="2.5"
            filter="url(#voscNodeGlow)"
            className="vosc-cleft-pulse"
            pointerEvents="none"
          />
        </g>

        {/* ============================================================
             4. FLOATING DATA PACKETS & CYBER PARTICLES (ATMOSPHERE)
             ============================================================ */}
        <g fill="#6AFBD8" opacity="0.9" pointerEvents="none">
          {/* Top spark cluster */}
          <g className="vosc-spark-twinkle-1">
            <rect x="270" y="44" width="4.5" height="4.5" fill="#00DCC0" />
            <rect x="408" y="44" width="4.5" height="4.5" fill="#6AFBD8" />
            <rect x="135" y="60" width="3.5" height="3.5" fill="#00DCC0" />
            <rect x="540" y="60" width="3.5" height="3.5" fill="#6AFBD8" />
          </g>

          {/* Mid spark cluster */}
          <g className="vosc-spark-twinkle-2">
            <rect x="255" y="140" width="3" height="3" fill="#FFFFFF" />
            <rect x="420" y="140" width="3" height="3" fill="#FFFFFF" />
            <rect x="325" y="200" width="4" height="4" fill="#6AFBD8" />
            <rect x="352" y="200" width="4" height="4" fill="#00DCC0" />
          </g>

          {/* Lower book spark cluster */}
          <g className="vosc-spark-twinkle-1">
            <rect x="110" y="278" width="4.5" height="4.5" fill="#00DCC0" />
            <rect x="565" y="278" width="4.5" height="4.5" fill="#6AFBD8" />
            <rect x="120" y="340" width="3.5" height="3.5" fill="#FFFFFF" />
            <rect x="555" y="340" width="3.5" height="3.5" fill="#00DCC0" />
            <rect x="235" y="398" width="3.5" height="3.5" fill="#003A3B" />
            <rect x="445" y="398" width="3.5" height="3.5" fill="#003A3B" />
          </g>
        </g>
      </svg>
    </div>
  );
}
