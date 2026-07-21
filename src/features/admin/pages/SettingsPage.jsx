import { useState } from 'react';
import toast from 'react-hot-toast';
import SEO from '../../../components/common/SEO';
import { Label, Input, Textarea } from '../../../components/ui/FormField';
import Button from '../../../components/ui/Button';
import { CONTACT_INFO, SITE_NAME } from '../../../lib/constants';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState(SITE_NAME);
  const [email, setEmail] = useState(CONTACT_INFO.email.label);
  const [heroHeadline, setHeroHeadline] = useState("Learn in-demand skills for tomorrow's jobs");
  const [gstRate, setGstRate] = useState(18);

  function handleSave(e) {
    e.preventDefault();
    // Future implementation: PUT /admin/settings — persists to a Settings collection
    // in MongoDB and is read by the storefront on load instead of lib/constants.js.
    toast.success('Settings saved (demo only — connect the backend to persist this).');
  }

  return (
    <>
      <SEO title="Site Settings" description="Manage global site configuration." />
      <h1 className="text-2xl font-semibold text-ink">Site Settings</h1>
      <p className="mt-1 text-sm text-ink-muted">
        These fields are placeholders for values that should be admin-editable once the backend is connected.
      </p>

      <form onSubmit={handleSave} className="mt-6 max-w-2xl space-y-6">
        <section className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">General</h2>
          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="siteName">Site name</Label>
              <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="heroHeadline">Homepage hero headline</Label>
              <Textarea id="heroHeadline" rows={2} value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Contact & Support</h2>
          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="supportEmail">Support email</Label>
              <Input id="supportEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Payments</h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gstRate">GST rate for India (%)</Label>
              <Input id="gstRate" type="number" min="0" max="100" value={gstRate} onChange={(e) => setGstRate(e.target.value)} />
            </div>
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            This should map to <code className="rounded bg-surface-alt px-1">GST_RATE</code> in{' '}
            <code className="rounded bg-surface-alt px-1">lib/currency.js</code> once served from the backend.
          </p>
        </section>

        <Button type="submit" variant="accent">
          Save Settings
        </Button>
      </form>
    </>
  );
}
