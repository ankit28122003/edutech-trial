import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Section from '../../components/ui/Section';
import Reveal from '../../components/common/Reveal';
import { Label, Input, Textarea, FieldError } from '../../components/ui/FormField';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import PageHero from './PageHero';
import { CONTACT_INFO } from '../../lib/constants';
import { contactSchema, getFieldErrors } from '../../lib/validation';
import { submitContactForm } from '../../services/contactService';

const CONTACT_CARDS = [
  { icon: MessageCircle, label: CONTACT_INFO.whatsappUS.label, href: CONTACT_INFO.whatsappUS.href },
  { icon: Phone, label: CONTACT_INFO.callUS.label, href: CONTACT_INFO.callUS.href },
  { icon: Mail, label: CONTACT_INFO.email.label, href: CONTACT_INFO.email.href },
];

export default function ContactPage() {
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { errors: fieldErrors, data } = getFieldErrors(contactSchema, values);
    setErrors(fieldErrors || {});
    if (fieldErrors) return;

    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      toast.success("Message sent! We'll get back to you within 1 business day.");
      setValues({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the Edutech Skills team — course questions, partnerships, or career guidance."
        canonicalPath="/contact"
      />
      <PageHero
        eyebrow="Get in Touch"
        title="Let's talk about your next career move"
        description="Whether you're comparing programs or ready to enroll, our advisors respond within one business day."
      />

      <Section className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {CONTACT_CARDS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 rounded-xl border border-ink/[0.06] bg-white p-4 shadow-card transition-colors hover:border-primary-200"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Icon size={17} />
                </span>
                <span className="text-sm font-medium text-ink">{label}</span>
              </a>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {CONTACT_INFO.addresses.map((address) => (
              <div key={address.country} className="flex gap-3 rounded-xl border border-ink/[0.06] bg-white p-4 shadow-card">
                <MapPin size={17} className="mt-0.5 shrink-0 text-primary-600" />
                <div>
                  <p className="text-sm font-semibold text-ink">{address.country} Office</p>
                  {address.lines.map((line) => (
                    <p key={line} className="text-xs text-ink-muted">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal className="mt-10">
          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-semibold text-ink">Send us a message</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" required>
                  Full name
                </Label>
                <Input
                  id="name"
                  value={values.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  error={errors.name}
                />
                <FieldError>{errors.name}</FieldError>
              </div>
              <div>
                <Label htmlFor="email" required>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  error={errors.email}
                />
                <FieldError>{errors.email}</FieldError>
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" type="tel" value={values.phone} onChange={(e) => updateField('phone', e.target.value)} />
            </div>

            <div className="mt-4">
              <Label htmlFor="message" required>
                How can we help?
              </Label>
              <Textarea
                id="message"
                rows={5}
                value={values.message}
                onChange={(e) => updateField('message', e.target.value)}
                error={errors.message}
              />
              <FieldError>{errors.message}</FieldError>
            </div>

            <Button type="submit" disabled={isSubmitting} className="mt-6 w-full" size="lg">
              {isSubmitting ? <Spinner size={18} /> : 'Send Message'}
            </Button>
          </form>
        </Reveal>
      </Section>
    </>
  );
}
