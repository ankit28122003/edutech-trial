import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Instagram, Linkedin, MessageCircle, Phone, Mail } from 'lucide-react';
import { DOMAINS } from '../../data/domains';
import {
  CONTACT_INFO,
  FOOTER_COMPANY_LINKS,
  FOOTER_PARTNER_LINKS,
  FOOTER_RESOURCE_LINKS,
  FOOTER_SUPPORT_LINKS,
} from '../../lib/constants';

const SOCIAL_ICONS = [
  { Icon: Facebook, href: 'https://facebook.com/edutechskills', label: 'Facebook' },
  { Icon: Instagram, href: 'https://instagram.com/edutech_skills', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/edutechskills', label: 'LinkedIn' },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm text-ink-muted transition-colors hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-ink/[0.06] bg-surface-alt">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Edutech Skills home">
              <img src="/edutech-logo-redesign (1).svg" alt="Edutech Skills" className="h-10 w-auto" />
              {/* <span className="font-display text-lg font-semibold tracking-tight text-ink">Edutech Skills</span> */}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Mentor-led certification programs in Agile, AI, Cloud, Cyber Security and DevOps — built to get you
              hired, not just certified.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIAL_ICONS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-muted transition-colors hover:border-primary-300 hover:text-primary-600"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Company" links={FOOTER_COMPANY_LINKS} />
          <FooterColumn title="Partner with Us" links={FOOTER_PARTNER_LINKS} />
          <FooterColumn title="Resources" links={FOOTER_RESOURCE_LINKS} />
          <FooterColumn title="Support" links={FOOTER_SUPPORT_LINKS} />
        </div>

        <div className="mt-12 border-t border-ink/10 pt-8">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">Offerings</h3>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {DOMAINS.map((domain) => (
              <Link
                key={domain.id}
                to={`/courses?category=${encodeURIComponent(domain.name)}`}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {domain.name}
              </Link>
            ))}
            <Link to="/courses" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              View All Courses
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-ink/10 pt-8 md:grid-cols-3">
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">Contact Us</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li className="flex items-center gap-2">
                <MessageCircle size={15} className="shrink-0 text-primary-500" />
                <a href={CONTACT_INFO.whatsappUS.href} className="hover:text-ink">
                  {CONTACT_INFO.whatsappUS.label}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-primary-500" />
                <a href={CONTACT_INFO.callUS.href} className="hover:text-ink">
                  {CONTACT_INFO.callUS.label}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-primary-500" />
                <a href={CONTACT_INFO.whatsappIndia.href} className="hover:text-ink">
                  {CONTACT_INFO.whatsappIndia.label}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-primary-500" />
                <a href={CONTACT_INFO.email.href} className="hover:text-ink">
                  {CONTACT_INFO.email.label}
                </a>
              </li>
            </ul>
          </div>

          {CONTACT_INFO.addresses.map((address) => (
            <div key={address.country}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {address.country}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row">
          <p className="text-xs text-ink-soft">© 2026 Edutech Skills. All rights reserved.</p>
          <div className="flex gap-5">
            {FOOTER_SUPPORT_LINKS.map((link) => (
              <Link key={link.label} to={link.to} className="text-xs text-ink-soft hover:text-ink">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
