'use client';

interface StatCard {
  number: string;
  label: string;
  description?: string;
}

const stats: StatCard[] = [
  {
    number: '5,000+',
    label: 'Children educated',
  },
  {
    number: '10,000+',
    label: 'Meals provided',
  },
  {
    number: '150+',
    label: 'Community empowered',
  },
];

export function ImpactSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Our impact
          </h2>
          <p className="mt-4 text-base sm:text-lg text-foreground/70 text-balance max-w-2xl mx-auto">
            See how your contributions have made a difference. Meet the people whose lives have been transformed by your generosity.
          </p>
        </div>

        {/* Donor Avatar */}
        <div className="flex justify-center mb-12">
          <DonorAvatars />
        </div>

        {/* Stats */}
        <div className="grid gap-8 sm:gap-6 lg:grid-cols-3 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary">
                {stat.number}
              </div>
              <p className="mt-2 text-base sm:text-lg font-medium text-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonorAvatars() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex -space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground"
          >
            {i}
          </div>
        ))}
      </div>
      <span className="text-sm font-medium text-foreground/70">+215,458 donated</span>
    </div>
  );
}
