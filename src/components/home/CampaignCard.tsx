'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Campaign {
  id: number;
  title: string;
  description: string;
  image: React.ReactNode;
  raised: number;
  goal: number;
  daysLeft: string;
}

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.raised / campaign.goal) * 100;
  const raisedFormatted = `$${campaign.raised.toLocaleString()}`;
  const goalFormatted = `$${campaign.goal.toLocaleString()}`;

  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow border border-border">
      {/* Campaign Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {campaign.image}
        {/* Days left badge */}
        <div className="absolute top-3 right-3 bg-foreground/80 text-background text-xs font-semibold px-3 py-1.5 rounded">
          {campaign.daysLeft}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 sm:p-6">
        <h3 className="font-semibold text-foreground text-base sm:text-lg line-clamp-2">
          {campaign.title}
        </h3>

        <p className="mt-2 text-sm text-foreground/70 line-clamp-2 flex-grow">
          {campaign.description}{' '}
          <button className="text-primary hover:text-primary/80 font-medium">
            Read More
          </button>
        </p>

        {/* Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{raisedFormatted}</span>
            <span className="text-xs text-foreground/60">Raise goal {goalFormatted}</span>
          </div>
          <div className="w-full bg-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            size="sm"
          >
            Donate
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
