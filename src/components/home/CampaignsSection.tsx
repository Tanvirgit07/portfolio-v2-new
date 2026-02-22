'use client';

import Link from 'next/link';
import { CampaignCard } from './CampaignCard';

const campaigns = [
  {
    id: 1,
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be a right, not a privilege. Read more about our efforts to help communities get the care they need.',
    image: <CampaignImage1 />,
    raised: 20256,
    goal: 100000,
    daysLeft: 'Expired in 7days',
  },
  {
    id: 2,
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be a right, not a privilege. Read more about our efforts to help communities get the care they need.',
    image: <CampaignImage2 />,
    raised: 24256,
    goal: 100000,
    daysLeft: 'Expired in 7days',
  },
  {
    id: 3,
    title: 'Bringing health to those who need it most',
    description:
      'Access to healthcare should be a right, not a privilege. Read more about our efforts to help communities get the care they need.',
    image: <CampaignImage3 />,
    raised: 53256,
    goal: 100000,
    daysLeft: 'Expired in 7days',
  },
];

export function CampaignsSection() {
  return (
    <section id="campaigns" className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12 sm:mb-16 flex-col sm:flex-row gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Current Campaigns
            </h2>
            <p className="mt-4 text-base sm:text-lg text-foreground/70 text-balance max-w-2xl">
              From emergency relief to long-term development projects, your help can make a crucial difference.
            </p>
          </div>
          <Link
            href="#"
            className="text-primary hover:text-primary/80 font-medium text-sm sm:text-base whitespace-nowrap transition-colors"
          >
            See all
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignImage1() {
  return (
    <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 relative overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="300" fill="#999" />
        {/* Silhouettes */}
        <path
          d="M 50 150 L 50 250 M 50 180 Q 30 160 50 140 Q 70 160 50 180"
          stroke="#666"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 150 150 L 150 250 M 150 180 Q 130 160 150 140 Q 170 160 150 180"
          stroke="#666"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 250 150 L 250 250 M 250 180 Q 230 160 250 140 Q 270 160 250 180"
          stroke="#666"
          strokeWidth="2"
          fill="none"
        />
        {/* Buildings */}
        <rect x="280" y="100" width="100" height="150" fill="#777" />
        <rect x="290" y="110" width="15" height="15" fill="#333" />
        <rect x="310" y="110" width="15" height="15" fill="#333" />
        <rect x="330" y="110" width="15" height="15" fill="#333" />
      </svg>
    </div>
  );
}

function CampaignImage2() {
  return (
    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="300" fill="#aaa" />
        {/* Figures in conversation */}
        <circle cx="100" cy="100" r="20" fill="#888" />
        <path
          d="M 100 120 L 100 180 M 80 140 L 120 140 M 80 180 L 100 220 M 100 180 L 120 220"
          stroke="#888"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="250" cy="100" r="20" fill="#777" />
        <path
          d="M 250 120 L 250 180 M 230 140 L 270 140 M 230 180 L 250 220 M 250 180 L 270 220"
          stroke="#777"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

function CampaignImage3() {
  return (
    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="300" fill="#B3D9E6" />
        {/* Sky and landscape */}
        <path d="M 0 200 Q 100 180 200 190 T 400 200 L 400 300 L 0 300 Z" fill="#8BC4D6" />
        {/* Figure */}
        <circle cx="150" cy="140" r="20" fill="#E8B8A0" />
        <path
          d="M 150 160 L 150 200 M 130 175 L 170 175 M 130 200 L 150 240 M 150 200 L 170 240"
          stroke="#E8B8A0"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}
