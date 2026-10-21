import React from "react";

interface VoscLogoMarkProps {
  className?: string;
  size?: number | string;
}

export default function VoscLogoMark({
  className = "w-9 h-9",
  size,
}: VoscLogoMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="navBookWhiteSpread" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E6FFFA" />
        </linearGradient>
      </defs>

      {/* Circuit Traces Emerging from Spine Cleft */}
      <g
        stroke="#6AFBD8"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Center trunk */}
        <path d="M 20 26 V 6" />
        {/* Left branch */}
        <path d="M 20 18 L 11 12 V 6" />
        {/* Right branch */}
        <path d="M 20 18 L 29 12 V 6" />
        {/* Outer mini branches */}
        <path d="M 15 15 L 7 11" />
        <path d="M 25 15 L 33 11" />
      </g>

      {/* Circuit Nodes / Hollow Solder Via Rings */}
      <g stroke="#FFFFFF" strokeWidth="1.2" fill="#012728">
        <circle cx="11" cy="6" r="2" />
        <circle cx="20" cy="5.5" r="2.2" />
        <circle cx="29" cy="6" r="2" />
        <circle cx="7" cy="11" r="1.8" />
        <circle cx="33" cy="11" r="1.8" />
      </g>

      {/* THE PROMINENT OPEN BOOK WITH LUMINOUS WHITE PAGES */}
      {/* 1. Underlying Page Stack Layers */}
      <path
        d="M 20 29 C 14 27, 8 27, 3 29.5 L 4 32 C 9 30, 15 29.5, 20 31 Z"
        fill="#00DCC0"
        stroke="#6AFBD8"
        strokeWidth="0.8"
      />
      <path
        d="M 20 29 C 26 27, 32 27, 37 29.5 L 36 32 C 31 30, 25 29.5, 20 31 Z"
        fill="#00DCC0"
        stroke="#6AFBD8"
        strokeWidth="0.8"
      />

      {/* 2. Main Open Book Spreads - Glowing Crisp White */}
      <path
        d="M 20 25.5
           C 16 21, 11 20, 5 21.5
           L 4 27
           C 10 25.5, 15 26, 20 28.5 Z"
        fill="url(#navBookWhiteSpread)"
        stroke="#6AFBD8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 20 25.5
           C 24 21, 29 20, 35 21.5
           L 36 27
           C 30 25.5, 25 26, 20 28.5 Z"
        fill="url(#navBookWhiteSpread)"
        stroke="#6AFBD8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Top Page Highlight White Edges */}
      <path
        d="M 20 25.5 C 16 21, 11 20, 5 21.5"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 20 25.5 C 24 21, 29 20, 35 21.5"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Base Spine Fold & Notch */}
      <path
        d="M 4 32 L 18 32 C 19 33.5, 20 34, 20 34 C 20 34, 21 33.5, 22 32 L 36 32"
        stroke="#6AFBD8"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="20"
        y1="25.5"
        x2="20"
        y2="34"
        stroke="#6AFBD8"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
