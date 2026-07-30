const COMPANY_LOGOS = [
  { name: 'TCS', src: 'https://logo.clearbit.com/tcs.com' },
  { name: 'Tech Mahindra', src: 'https://logo.clearbit.com/techmahindra.com' },
  { name: 'HCLTech', src: 'https://logo.clearbit.com/hcltech.com' },
  { name: 'Infosys', src: 'https://logo.clearbit.com/infosys.com' },
  { name: 'NVIDIA', src: 'https://logo.clearbit.com/nvidia.com' },
  { name: 'Amex', src: 'https://logo.clearbit.com/americanexpress.com' },
  { name: 'Google', src: 'https://logo.clearbit.com/google.com' },
];

export default function TrustedBy() {
  return (
    <section className="bg-surface-alt py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-ink-muted">
          Trusted by Professionals From
        </p>

        {/* Desktop: horizontal row */}
        <div className="hidden items-center justify-center gap-x-10 gap-y-6 md:flex md:flex-wrap">
          {COMPANY_LOGOS.map((company) => (
            <div key={company.name} className="flex h-10 items-center justify-center">
              <img
                src={company.src}
                alt={company.name}
                className="max-h-8 max-w-[120px] object-contain opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-sm font-bold text-ink-muted">{company.name}</span>
            </div>
          ))}
        </div>

        {/* Mobile: grid */}
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:hidden">
          {COMPANY_LOGOS.map((company) => (
            <div key={company.name} className="flex h-10 items-center justify-center">
              <img
                src={company.src}
                alt={company.name}
                className="max-h-8 max-w-full object-contain opacity-50 grayscale"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-sm font-bold text-ink-muted">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

