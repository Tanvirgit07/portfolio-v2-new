'use client';

import { Card } from '@/components/ui/card';

interface DonationMatterCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const cards: DonationMatterCard[] = [
  {
    icon: '/images/donation1.png',
    title: 'Immediate Impact',
    description:
      'Your contribution goes straight to the people who need it most, delivering fast and meaningful support where it matters.',
  },
  {
    icon: '/images/donation1.png',
    title: 'Trusted results',
    description:
      'Our campaigns consistently achieve their goals, creating measurable and lasting change for the communities we support.',
  },
  {
    icon: '/images/donation1.png',
    title: 'Full Transparency',
    description:
      'We believe in openness at every step—clearly showing how funds are used and the real outcomes they help create.',
  },
];

export function DonationMattersSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[48px] font-medium text-foreground text-balance">
            Your donation matters
          </h2>
          <p className="mt-4 text-base sm:text-lg text-foreground/70 text-balance max-w-3xl mx-auto">
            Whether it&apos;s through donations, volunteering, or fundraising, there are many ways to make a meaningful impact. Find out how you can contribute to our mission.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="group flex flex-col overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0 bg-secondary p-8 flex items-center justify-center h-32">
                <div className="text-5xl text-primary">
                  {card.icon}
                  
                </div>
              </div>
              <div className="flex flex-col flex-grow p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-foreground/70 text-sm sm:text-base leading-relaxed flex-grow">
                  {card.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        fill="currentColor"
      />
    </svg>
  );
}

function TrustedIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M10 17l-3-3 1.41-1.41L10 14.17l5.59-5.59L17 10l-7 7z"
        fill="currentColor"
      />
    </svg>
  );
}

function TransparencyIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <path
        d="M12 4C7 4 2.73 7.11 1 11.46c1.73 4.35 6 7.54 11 7.54s9.27-3.19 11-7.54C21.27 7.11 17 4 12 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
