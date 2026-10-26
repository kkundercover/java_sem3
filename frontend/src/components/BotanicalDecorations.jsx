import React from 'react';

export default function BotanicalDecorations() {
  return (
    <>
      {/* Left Botanical Margin Illustration */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '12px',
          bottom: '20px',
          width: '120px',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.88,
        }}
        className="botanical-left"
      >
        <svg viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
          {/* Top floating olive leaf */}
          <g transform="translate(15, 10) rotate(-15)">
            <path
              d="M10 25C10 10 25 5 35 5C35 20 20 35 10 25Z"
              fill="#A2BA9F"
              stroke="#2E4A35"
              strokeWidth="1.5"
            />
            <path d="M12 24L32 7" stroke="#2E4A35" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M20 16L16 11" stroke="#2E4A35" strokeWidth="1" strokeLinecap="round" />
            <path d="M26 12L24 7" stroke="#2E4A35" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Cupped hand top subtle gesture */}
          <path
            d="M5 80C15 82 25 80 32 86C38 92 36 100 28 102C18 104 8 98 5 80Z"
            fill="#EAD0BE"
            stroke="#2E4A35"
            strokeWidth="1.5"
          />

          {/* Little earthy heart */}
          <path
            d="M30 115C30 110 35 106 40 109C45 106 50 110 50 115C50 122 40 128 40 128C40 128 30 122 30 115Z"
            fill="#D48B6A"
            stroke="#2E4A35"
            strokeWidth="1.2"
          />

          {/* Center Sapling tree held by cupped hands */}
          <g transform="translate(10, 140)">
            {/* Tree trunk */}
            <path d="M45 75L45 42" stroke="#6F4D38" strokeWidth="3" strokeLinecap="round" />
            <path d="M45 52L55 42" stroke="#6F4D38" strokeWidth="2" strokeLinecap="round" />
            <path d="M45 58L35 48" stroke="#6F4D38" strokeWidth="2" strokeLinecap="round" />

            {/* Tree foliage / leaves */}
            <circle cx="45" cy="30" r="18" fill="#9CB89A" stroke="#2E4A35" strokeWidth="1.5" />
            <circle cx="34" cy="24" r="12" fill="#8CA889" stroke="#2E4A35" strokeWidth="1.5" />
            <circle cx="56" cy="24" r="12" fill="#ADC7AB" stroke="#2E4A35" strokeWidth="1.5" />
            <circle cx="45" cy="16" r="10" fill="#9CB89A" stroke="#2E4A35" strokeWidth="1.5" />

            {/* Cupped hands cradling soil & tree */}
            {/* Left cupped hand */}
            <path
              d="M15 78C22 75 35 76 45 79C43 86 32 90 20 88C14 86 12 82 15 78Z"
              fill="#E8CBB8"
              stroke="#2E4A35"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Fingers cupping upward */}
            <path
              d="M15 78C12 70 18 64 25 68C28 72 26 77 22 78"
              fill="#E8CBB8"
              stroke="#2E4A35"
              strokeWidth="1.5"
            />
          </g>

          {/* Bottom leafy branch */}
          <g transform="translate(15, 230)">
            <path d="M10 40C15 25 25 15 40 5" stroke="#2E4A35" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 28C28 26 34 29 32 35C26 37 20 34 22 28Z" fill="#9CB89A" stroke="#2E4A35" strokeWidth="1.2" />
            <path d="M30 18C36 16 42 19 40 25C34 27 28 24 30 18Z" fill="#8CA889" stroke="#2E4A35" strokeWidth="1.2" />
            <path d="M38 8C44 6 50 9 48 15C42 17 36 14 38 8Z" fill="#ADC7AB" stroke="#2E4A35" strokeWidth="1.2" />
          </g>
        </svg>
      </div>

      {/* Right Botanical Margin Illustration */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          right: '12px',
          bottom: '20px',
          width: '120px',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.88,
        }}
        className="botanical-right"
      >
        <svg viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
          {/* Top tree branch */}
          <g transform="translate(45, 10)">
            <path d="M30 50L30 15" stroke="#6F4D38" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="30" cy="18" r="14" fill="#9CB89A" stroke="#2E4A35" strokeWidth="1.5" />
            <circle cx="20" cy="14" r="10" fill="#8CA889" stroke="#2E4A35" strokeWidth="1.5" />
            <circle cx="40" cy="14" r="10" fill="#ADC7AB" stroke="#2E4A35" strokeWidth="1.5" />
          </g>

          {/* Wooden donation box / brick symbol */}
          <g transform="translate(40, 75)">
            <rect x="5" y="5" width="32" height="18" rx="4" fill="#D8B775" stroke="#2E4A35" strokeWidth="1.5" />
            <line x1="12" y1="14" x2="30" y2="14" stroke="#2E4A35" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Floating leaf */}
          <g transform="translate(55, 110) rotate(25)">
            <path
              d="M5 20C5 8 18 4 26 4C26 16 14 28 5 20Z"
              fill="#9CB89A"
              stroke="#2E4A35"
              strokeWidth="1.5"
            />
            <path d="M7 19L24 5" stroke="#2E4A35" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Hand holding tree */}
          <g transform="translate(30, 140)">
            <path d="M35 75L35 45" stroke="#6F4D38" strokeWidth="3" strokeLinecap="round" />
            <circle cx="35" cy="28" r="18" fill="#9CB89A" stroke="#2E4A35" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="12" fill="#8CA889" stroke="#2E4A35" strokeWidth="1.5" />
            <circle cx="46" cy="24" r="12" fill="#ADC7AB" stroke="#2E4A35" strokeWidth="1.5" />

            {/* Hand cradling below */}
            <path
              d="M10 82C20 78 35 78 48 82C45 90 30 94 15 92C10 90 8 86 10 82Z"
              fill="#E8CBB8"
              stroke="#2E4A35"
              strokeWidth="1.8"
            />
            <path
              d="M48 82C52 74 46 68 40 70"
              fill="#E8CBB8"
              stroke="#2E4A35"
              strokeWidth="1.5"
            />
          </g>

          {/* Donation gold coin */}
          <g transform="translate(55, 230)">
            <circle cx="16" cy="16" r="12" fill="#D8B775" stroke="#2E4A35" strokeWidth="1.5" />
            <text x="12" y="21" fill="#2E4A35" fontSize="12" fontWeight="bold" fontFamily="sans-serif">$</text>
          </g>

          {/* Bottom foliage branch */}
          <g transform="translate(35, 245)">
            <path d="M5 30C15 20 25 15 35 5" stroke="#2E4A35" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 20C18 18 24 21 22 26C16 28 10 25 12 20Z" fill="#9CB89A" stroke="#2E4A35" strokeWidth="1.2" />
          </g>
        </svg>
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .botanical-left, .botanical-right {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
