import React from 'react';

interface DivipecaLogoProps {
  className?: string;
  size?: number | string;
}

export const DivipecaLogo: React.FC<DivipecaLogoProps> = ({ className = 'w-10 h-10', size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Logo DIVIPECA - Distribuidora Vito y Peppe C.A."
    >
      {/* Outer circular background with subtle border */}
      <circle cx="250" cy="250" r="240" fill="#FFFFFF" stroke="#333333" strokeWidth="1.5" />

      <defs>
        {/* Top Text Path for "Desde 1990" */}
        <path id="topArcPathReact" d="M 155,200 A 115,115 0 0,1 345,200" fill="none" />
        {/* Bottom Text Path for "Rif: J-060038278" */}
        <path id="bottomArcPathReact" d="M 140,305 A 125,125 0 0,0 360,305" fill="none" />
      </defs>

      {/* Central Badge Outline Container */}
      {/* Left Half: Green border (#0B7A36) */}
      <path
        d="M 250,140 
           A 110,110 0 0,0 152,185 
           L 60,185 
           A 45,45 0 0,0 60,315 
           L 152,315 
           A 110,110 0 0,0 250,360"
        fill="none"
        stroke="#0B7A36"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Half: Red border (#D32F2F) */}
      <path
        d="M 250,140 
           A 110,110 0 0,1 348,185 
           L 440,185 
           A 45,45 0 0,1 440,315 
           L 348,315 
           A 110,110 0 0,1 250,360"
        fill="none"
        stroke="#D32F2F"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top Arc Text: "Desde 1990" */}
      <text
        fontFamily="'Times New Roman', Georgia, serif"
        fontSize="34"
        fontWeight="bold"
        fontStyle="italic"
        fill="#111111"
        textAnchor="middle"
      >
        <textPath href="#topArcPathReact" startOffset="50%">
          Desde 1990
        </textPath>
      </text>

      {/* Center Wordmark: "DIVIPECA" */}
      <text
        x="250"
        y="275"
        fontFamily="'Playfair Display', 'Times New Roman', Georgia, serif"
        fontSize="62"
        fontWeight="900"
        fontStyle="italic"
        letterSpacing="4"
        fill="#111111"
        textAnchor="middle"
      >
        DIVIPECA
      </text>

      {/* Bottom Arc Text: "Rif: J-060038278" */}
      <text
        fontFamily="'Times New Roman', Georgia, serif"
        fontSize="30"
        fontWeight="bold"
        fontStyle="italic"
        fill="#111111"
        textAnchor="middle"
      >
        <textPath href="#bottomArcPathReact" startOffset="50%">
          Rif: J-060038278
        </textPath>
      </text>
    </svg>
  );
};
