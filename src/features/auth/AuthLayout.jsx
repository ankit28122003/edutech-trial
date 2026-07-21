import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Users, Award } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: Users, text: '3L+ learners trained across 25+ domains' },
  { icon: Award, text: 'Certifications aligned to PMI, ISACA, AWS & more' },
  { icon: ShieldCheck, text: 'Secure checkout with 7-day refund guarantee' },
];

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid min-h-[calc(100vh-1px)] grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-16 sm:px-6 lg:px-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white">
              <GraduationCap size={18} />
            </span>
            <span className="font-display text-lg font-semibold text-ink">Edutech Skills</span>
          </Link>
          <h1 className="text-2xl font-semibold text-ink">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-ink lg:flex lg:flex-col lg:justify-end lg:p-12">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="relative">
          <p className="text-2xl font-semibold leading-snug text-white">
            "The structured mentorship gave me more confidence than three years of self-study ever did."
          </p>
          <div className="mt-6 space-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-white/80">
                <Icon size={16} className="text-accent-400" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
