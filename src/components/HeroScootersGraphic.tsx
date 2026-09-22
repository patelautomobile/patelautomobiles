// High-fidelity automotive electric scooter visual composite matching Image 2
// Features 2 dominant electric scooters standing on the asphalt road:
// 1. Sporty Red & Black Performance EV Scooter (Left)
// 2. Retro-Modern Metallic Silver EV Scooter (Right)

export function HeroScootersGraphic() {
  return (
    <div className="relative w-full h-full flex items-end justify-center select-none pointer-events-none">
      
      {/* Ground Contact Shadow (Radial Blur beneath both scooters on asphalt road) */}
      <div 
        className="absolute bottom-2 sm:bottom-4 inset-x-2 sm:inset-x-6 h-10 sm:h-16 bg-black/85 blur-lg rounded-[100%] pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1 sm:bottom-2 inset-x-8 sm:inset-x-12 h-6 sm:h-8 bg-red-600/15 blur-md rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 680 540"
        className="w-full max-w-[580px] sm:max-w-[680px] h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for Sporty Red & Black Scooter */}
          <linearGradient id="sportBlack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="40%" stopColor="#090E14" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="sportRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF334B" />
            <stop offset="60%" stopColor="#D90429" />
            <stop offset="100%" stopColor="#8A0017" />
          </linearGradient>

          <linearGradient id="sportMetallic" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <linearGradient id="chromeGuard" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="25%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="75%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Gradients for Retro Silver Scooter */}
          <linearGradient id="retroSilver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="35%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="retroSilverDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="60%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Headlight Glows */}
          <radialGradient id="redHeadlightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="30%" stopColor="#FF2E3B" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#E50914" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E50914" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="silverHeadlightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#CBD5E1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="tyreRubber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18181B" />
            <stop offset="30%" stopColor="#27272A" />
            <stop offset="70%" stopColor="#18181B" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
        </defs>

        {/* ========================================================= */}
        {/* RIGHT SCOOTER: RETRO-MODERN METALLIC SILVER (Apex style)   */}
        {/* ========================================================= */}
        <g id="retro-silver-scooter" transform="translate(320, 70)">
          
          {/* Rear body shadow & floor contact */}
          <ellipse cx="190" cy="445" rx="85" ry="18" fill="rgba(0,0,0,0.6)" filter="blur(6px)" />

          {/* Rear Wheel & Tyre */}
          <ellipse cx="235" cy="385" rx="36" ry="60" fill="url(#tyreRubber)" />
          <ellipse cx="235" cy="385" rx="24" ry="40" fill="#475569" stroke="#94A3B8" strokeWidth="2" />

          {/* Rear Chassis & Passenger Grab Rail */}
          <path
            d="M210 240 L285 270 L280 320 L205 340 Z"
            fill="url(#retroSilverDark)"
          />
          <path
            d="M250 250 Q280 235 275 270"
            stroke="url(#chromeGuard)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Two-tone Passenger Seat */}
          <path
            d="M175 225 Q235 210 270 245 C275 255 260 270 240 270 L170 255 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Front Tyre & 10-inch Alloy Wheel */}
          <ellipse cx="190" cy="425" rx="34" ry="46" fill="url(#tyreRubber)" />
          <ellipse cx="190" cy="425" rx="22" ry="30" fill="#64748B" stroke="#CBD5E1" strokeWidth="3" />
          {/* Wheel Spokes */}
          <line x1="190" y1="400" x2="190" y2="450" stroke="#F1F5F9" strokeWidth="3" />
          <line x1="172" y1="415" x2="208" y2="435" stroke="#F1F5F9" strokeWidth="3" />
          <line x1="172" y1="435" x2="208" y2="415" stroke="#F1F5F9" strokeWidth="3" />

          {/* Front Telescopic Hydraulic Suspension */}
          <rect x="178" y="340" width="8" height="60" rx="4" fill="url(#chromeGuard)" />
          <rect x="194" y="340" width="8" height="60" rx="4" fill="url(#chromeGuard)" />

          {/* Front Mudguard (Curved Metallic Silver) */}
          <path
            d="M152 355 C152 320 228 320 228 355 L218 368 C200 348 180 348 162 368 Z"
            fill="url(#retroSilver)"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />

          {/* Lower Front Apron & Footboard */}
          <path
            d="M140 330 L160 380 L230 380 L245 330 L220 250 L165 250 Z"
            fill="url(#retroSilverDark)"
          />

          {/* Main Front Apron (Curvaceous Metallic Silver Front Shield) */}
          <path
            d="M130 180 C135 150 245 150 250 180 C258 230 248 315 225 330 C205 340 175 340 155 330 C132 315 122 230 130 180 Z"
            fill="url(#retroSilver)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />

          {/* Center Vertical Chrome Accent & Brand Medallion */}
          <rect x="186" y="200" width="8" height="75" rx="4" fill="url(#chromeGuard)" />
          <circle cx="190" cy="210" r="9" fill="#060608" stroke="#FF2E3B" strokeWidth="2" />
          <text x="190" y="213" fill="#FF2E3B" fontSize="8" fontWeight="bold" textAnchor="middle">P</text>

          {/* Flush LED Front Turn Indicators (Left & Right) */}
          <path d="M142 225 L158 230 L152 248 L138 240 Z" fill="#F8FAFC" stroke="#FF2E3B" strokeWidth="1" />
          <path d="M238 225 L222 230 L228 248 L242 240 Z" fill="#F8FAFC" stroke="#FF2E3B" strokeWidth="1" />

          {/* Handlebar Stem & Fairing */}
          <path
            d="M150 115 C160 98 220 98 230 115 L225 150 L155 150 Z"
            fill="url(#retroSilver)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          {/* Hexagonal/Round Jewel LED Headlamp with Angel-Eye Ring */}
          <circle cx="190" cy="125" r="28" fill="url(#chromeGuard)" />
          <circle cx="190" cy="125" r="23" fill="#0F172A" />
          <circle cx="190" cy="125" r="20" fill="none" stroke="#FF2E3B" strokeWidth="3" opacity="0.9" />
          <circle cx="190" cy="125" r="14" fill="url(#silverHeadlightGlow)" />
          {/* Headlamp Lens Glare */}
          <path d="M178 115 Q190 110 202 115" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />

          {/* Chrome Retro Rearview Mirrors */}
          <g>
            <line x1="150" y1="110" x2="120" y2="70" stroke="url(#chromeGuard)" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="115" cy="65" rx="14" ry="14" fill="url(#chromeGuard)" />
            <ellipse cx="115" cy="65" rx="11" ry="11" fill="#64748B" stroke="#94A3B8" strokeWidth="1" />
          </g>
          <g>
            <line x1="230" y1="110" x2="260" y2="70" stroke="url(#chromeGuard)" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="265" cy="65" rx="14" ry="14" fill="url(#chromeGuard)" />
            <ellipse cx="265" cy="65" rx="11" ry="11" fill="#64748B" stroke="#94A3B8" strokeWidth="1" />
          </g>
        </g>

        {/* ========================================================= */}
        {/* LEFT SCOOTER: SPORTY RED & BLACK EV SCOOTER (PROX / X-Men) */}
        {/* ========================================================= */}
        <g id="sporty-red-scooter" transform="translate(100, 45)">
          
          {/* Floor Contact Shadows */}
          <ellipse cx="170" cy="470" rx="95" ry="20" fill="rgba(0,0,0,0.75)" filter="blur(7px)" />

          {/* Front Tyre & Sporty Alloy Wheel */}
          <ellipse cx="170" cy="445" rx="38" ry="52" fill="url(#tyreRubber)" />
          <ellipse cx="170" cy="445" rx="26" ry="36" fill="#090E17" stroke="#334155" strokeWidth="2" />
          {/* Ventilated Disc Brake Rotor with Red Caliper */}
          <circle cx="170" cy="445" r="20" fill="none" stroke="#94A3B8" strokeWidth="4" strokeDasharray="3,2" />
          <rect x="150" y="435" width="10" height="18" rx="3" fill="#EF4444" />
          {/* Red Alloy Rim Ring */}
          <ellipse cx="170" cy="445" rx="24" ry="33" fill="none" stroke="#DC2626" strokeWidth="2" />

          {/* Dual Inverted Suspension Forks */}
          <rect x="156" y="360" width="9" height="65" rx="3" fill="url(#chromeGuard)" />
          <rect x="175" y="360" width="9" height="65" rx="3" fill="url(#chromeGuard)" />

          {/* Aerodynamic Front Red Mudguard */}
          <path
            d="M125 375 C125 330 215 330 215 375 L205 390 C185 365 155 365 135 390 Z"
            fill="url(#sportRed)"
            stroke="#991B1B"
            strokeWidth="1.5"
          />

          {/* Tubular Chrome Crash Safety Guard (Wraparound) */}
          <path
            d="M95 295 C85 360 100 420 170 428 C240 420 255 360 245 295"
            fill="none"
            stroke="url(#chromeGuard)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line x1="110" y1="360" x2="135" y2="350" stroke="url(#chromeGuard)" strokeWidth="5" />
          <line x1="230" y1="360" x2="205" y2="350" stroke="url(#chromeGuard)" strokeWidth="5" />

          {/* Lower Fairing & Floorboard */}
          <path
            d="M110 330 L130 405 L210 405 L230 330 Z"
            fill="url(#sportBlack)"
          />

          {/* Main Front Body (Aggressive Dual-Tone Black & Red Predator Shield) */}
          <path
            d="M95 200 L115 150 L225 150 L245 200 L235 320 L170 365 L105 320 Z"
            fill="url(#sportBlack)"
            stroke="#1E293B"
            strokeWidth="1.5"
          />

          {/* Red Aerodynamic Racing Chevrons */}
          <path
            d="M110 195 L145 235 L125 310 L105 270 Z"
            fill="url(#sportRed)"
          />
          <path
            d="M230 195 L195 235 L215 310 L235 270 Z"
            fill="url(#sportRed)"
          />

          {/* Center Grille & Air Scoop */}
          <polygon points="155,270 185,270 178,325 162,325" fill="#020617" stroke="#DC2626" strokeWidth="1.5" />
          <line x1="160" y1="285" x2="180" y2="285" stroke="#334155" strokeWidth="2" />
          <line x1="163" y1="300" x2="177" y2="300" stroke="#334155" strokeWidth="2" />

          {/* Dual Predator Projector LED Headlamps (Lit with Bright Red & White) */}
          {/* Left Headlamp */}
          <g>
            <polygon points="120,220 150,230 145,265 125,255" fill="#090E17" stroke="#FF2E3B" strokeWidth="2" />
            <ellipse cx="135" cy="245" rx="8" ry="12" fill="url(#redHeadlightGlow)" />
            {/* LED Beam Glow effect */}
            <polygon points="125,250 145,255 120,320 80,310" fill="#FF2E3B" opacity="0.12" />
          </g>

          {/* Right Headlamp */}
          <g>
            <polygon points="220,220 190,230 195,265 215,255" fill="#090E17" stroke="#FF2E3B" strokeWidth="2" />
            <ellipse cx="205" cy="245" rx="8" ry="12" fill="url(#redHeadlightGlow)" />
            {/* LED Beam Glow effect */}
            <polygon points="215,250 195,255 220,320 260,310" fill="#FF2E3B" opacity="0.12" />
          </g>

          {/* Top Aerodynamic Fairing & Smoked Wind Visor */}
          <path
            d="M125 130 L140 70 L200 70 L215 130 L170 145 Z"
            fill="url(#sportBlack)"
            stroke="#334155"
            strokeWidth="1.5"
          />
          <polygon points="148,80 192,80 185,120 155,120" fill="#020617" stroke="#FF2E3B" strokeWidth="1" opacity="0.9" />

          {/* Digital Dashboard Glow (Visible through smoked visor) */}
          <rect x="160" y="92" width="20" height="8" rx="2" fill="#FF2E3B" opacity="0.85" />

          {/* Aerodynamic Sport Rearview Mirrors (Carbon fiber finish) */}
          <g>
            <path d="M130 90 L85 45" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            <polygon points="85,35 60,30 55,50 82,52" fill="url(#sportBlack)" stroke="#DC2626" strokeWidth="1.5" />
          </g>
          <g>
            <path d="M210 90 L255 45" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            <polygon points="255,35 280,30 285,50 258,52" fill="url(#sportBlack)" stroke="#DC2626" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
