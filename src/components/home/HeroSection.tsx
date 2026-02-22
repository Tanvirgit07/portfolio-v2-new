'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Empowering schools. Inspiring generosity.
            </h1>
            <p className="mt-6 text-lg text-foreground/70 leading-relaxed text-balance">
              Every donation helps schools, students, and communities reach their goals. Join us in making fundraising simple, transparent, and impactful.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                Donate now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn more
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative h-64 sm:h-96 lg:h-full flex items-center justify-center">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-md"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Hands */}
        <g>
          {/* Left hand */}
          <path
            d="M 80 200 Q 90 180 100 160 Q 110 140 120 130"
            stroke="#D4956D"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right hand */}
          <path
            d="M 320 200 Q 310 180 300 160 Q 290 140 280 130"
            stroke="#D4956D"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />
          {/* Center hand */}
          <path
            d="M 200 220 Q 200 190 200 150"
            stroke="#D4956D"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Money elements */}
        <g>
          {/* Dollar bill 1 */}
          <rect x="140" y="120" width="40" height="25" fill="#4CAF50" opacity="0.8" rx="2" />
          <text x="160" y="138" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            $
          </text>

          {/* Dollar bill 2 */}
          <rect x="220" y="125" width="40" height="25" fill="#45A049" opacity="0.9" rx="2" />
          <text x="240" y="143" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            $
          </text>

          {/* Coin */}
          <circle cx="200" cy="110" r="12" fill="#FFB81C" />
          <text x="200" y="115" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            C
          </text>
        </g>

        {/* "DONATE" Text Banner */}
        <g>
          <rect x="140" y="160" width="120" height="50" fill="none" stroke="#4CAF50" strokeWidth="2" rx="8" />
          <text
            x="200"
            y="195"
            fontSize="28"
            fill="#4CAF50"
            textAnchor="middle"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            DONATE
          </text>
        </g>
      </svg>
    </div>
  );
}
