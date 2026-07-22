import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { X, Sparkles, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { FieldError } from '../ui/FormField';
import { advisorPopupSchema, getFieldErrors } from '../../lib/validation';
import { ADVISOR_PURPOSES, COUNTRY_CODES } from '../../lib/constants';
import { submitContactForm } from '../../services/contactService';

const SESSION_KEY = 'edutech_contact_popup_shown';

const INITIAL_VALUES = {
  name: '',
  email: '',
  countryCode: COUNTRY_CODES[0].code,
  phone: '',
  purpose: '',
  agree: false,
};

/** Outlined field with a small "notched" label, matching the reference design. */
function FloatingField({ label, required, children }) {
  return (
    <div className="relative">
      <span className="absolute -top-2 left-3 z-10 bg-white px-1.5 text-xs font-medium text-ink-muted">
        {label}
        {required && <span className="text-accent-600"> *</span>}
      </span>
      {children}
    </div>
  );
}

export default function ContactPopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Shows once per browser tab session, shortly after the site loads.
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll while open, allow Escape to close.
  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function updateField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { errors: fieldErrors, data } = getFieldErrors(advisorPopupSchema, values);
    setErrors(fieldErrors || {});
    if (fieldErrors) return;

    setIsSubmitting(true);
    try {
      // Reuses the existing contact endpoint contract (name/email/phone/message)
      // so contactService.js doesn't need a separate backend route for this form.
      await submitContactForm({
        name: data.name,
        email: data.email,
        phone: `${data.countryCode} ${data.phone}`,
        message: `Advisor request — Purpose: ${data.purpose}`,
      });
      toast.success("Thanks! An advisor will reach out shortly.");
      setValues(INITIAL_VALUES);
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="advisor-popup-heading"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[101] grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-panel md:grid-cols-[42%_1fr]"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white"
            >
              <X size={18} />
            </button>

            {/* Left visual panel */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#1c0f2e] to-black md:flex md:flex-col">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
              <div className="relative z-10 px-8 pt-8">
                <p className="text-lg text-white/85">Get in touch with our</p>
                <p className="font-display text-4xl font-bold uppercase leading-tight text-white">
                  Learning Advisor
                </p>
              </div>

              <div className="relative mt-auto flex flex-1 items-end">
                <Sparkles
                  size={34}
                  className="absolute left-8 top-10 text-violet-400"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <img
                  src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=800&auto=format&fit=crop"
                  alt=""
                  className="h-50 w-full object-cover object-top"
                  loading="lazy"
                />
                <p className="absolute bottom-6 right-6 max-w-[10rem] text-right text-base font-medium leading-snug text-white">
                  <span className="text-success-500">Enter</span> Your Info to Connect
                </p>
              </div>
            </div>

            {/* Right form panel */}
            <div className="p-6 sm:p-10">
              <h2 id="advisor-popup-heading" className="text-2xl font-semibold text-ink sm:text-3xl">
                Talk to a Learning Advisor
              </h2>
              <p className="mt-2 text-sm text-ink-muted">Get in touch with a Learning Advisor</p>

              <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
                <div>
                  <FloatingField label="Full Name" required>
                    <input
                      value={values.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="h-14 w-full rounded-xl border border-ink/15 px-4 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  </FloatingField>
                  <FieldError>{errors.name}</FieldError>
                </div>

                <div>
                  <FloatingField label="Email Id" required>
                    <input
                      type="email"
                      value={values.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="h-14 w-full rounded-xl border border-ink/15 px-4 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  </FloatingField>
                  <FieldError>{errors.email}</FieldError>
                </div>

                <div>
                  <FloatingField label="Phone" required>
                    <div className="flex h-14 items-center gap-2 rounded-xl border border-ink/15 pl-2 pr-4 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100">
                      <div className="relative">
                        <select
                          value={values.countryCode}
                          onChange={(e) => updateField('countryCode', e.target.value)}
                          className="h-10 appearance-none rounded-lg bg-transparent pl-2 pr-6 text-sm text-ink focus:outline-none"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink-soft"
                        />
                      </div>
                      <span className="h-6 w-px bg-ink/10" aria-hidden="true" />
                      <input
                        type="tel"
                        value={values.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="h-full flex-1 bg-transparent text-sm text-ink focus:outline-none"
                      />
                    </div>
                  </FloatingField>
                  <FieldError>{errors.phone}</FieldError>
                </div>

                <div>
                  <FloatingField label="Purpose" required>
                    <div className="relative">
                      <select
                        value={values.purpose}
                        onChange={(e) => updateField('purpose', e.target.value)}
                        className="h-14 w-full appearance-none rounded-xl border border-ink/15 px-4 pr-10 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      >
                        <option value="">Select an option</option>
                        {ADVISOR_PURPOSES.map((purpose) => (
                          <option key={purpose} value={purpose}>
                            {purpose}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft"
                      />
                    </div>
                  </FloatingField>
                  <FieldError>{errors.purpose}</FieldError>
                </div>

                <div>
                  <label className="flex items-start gap-2.5 text-sm text-ink-muted">
                    <input
                      type="checkbox"
                      checked={values.agree}
                      onChange={(e) => updateField('agree', e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/20 text-success-500 focus:ring-success-500/30"
                    />
                    <span>
                      I agree to Edutech Skills's{' '}
                      <Link to="/terms" target="_blank" className="font-medium text-ink underline hover:text-primary-600">
                        Terms &amp; Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" target="_blank" className="font-medium text-ink underline hover:text-primary-600">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  <FieldError>{errors.agree}</FieldError>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-violet-600 hover:bg-violet-700"
                  size="lg"
                >
                  {isSubmitting ? <Spinner size={18} /> : (
                    <>
                      Submit <span aria-hidden="true">→</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}