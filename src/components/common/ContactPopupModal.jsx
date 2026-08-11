import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { FieldError } from '../ui/FormField';
import { advisorPopupSchema, coursePopupSchema, getFieldErrors } from '../../lib/validation';
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
  const navigate = useNavigate();
  const location = useLocation();
  const { isContactOpen, openContact, closeContact } = useModal();
  const { contactVariant, contactMeta } = useModal();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasShownAuto = useRef(false);

  // Use the PMP-specific image when the popup is shown on the PMP course page,
  // otherwise fall back to the default contact popup image. For the `course`
  // variant we won't render the left image.
  const isPmpPage = location.pathname.includes('pmp-certification');
  const popupImage = isPmpPage
    ? '/WhatsApp%20Image%202026-08-05%20at%202.32.04%20PM.jpeg'
    : '/WhatsApp%20Image%202026-08-05%20at%202.32.06%20PM%20(1).jpeg';

// Auto-show once per session — handled by ModalContext initial state
  useEffect(() => {
    hasShownAuto.current = true;
    // No need to call openContact() here; context handles it on mount.
  }, []);

  // Always show the popup when the user is on the PMP course page so the
  // PMP-specific image is displayed. Uses a ref to avoid re-triggering on
  // every render while the modal is already open.
  const pmpAutoShown = useRef(false);
  useEffect(() => {
    if (!isPmpPage) {
      pmpAutoShown.current = false;
      return;
    }
    if (!pmpAutoShown.current) {
      pmpAutoShown.current = true;
      openContact();
    }
  }, [isPmpPage, openContact]);

  // Lock body scroll while open, allow Escape to close.
  useEffect(() => {
    if (!isContactOpen) return undefined;
    document.body.style.overflow = 'hidden';
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeContact();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContactOpen, closeContact]);

  function updateField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const schema = contactVariant === 'course' ? coursePopupSchema : advisorPopupSchema;
    const { errors: fieldErrors, data } = getFieldErrors(schema, values);
    setErrors(fieldErrors || {});
    if (fieldErrors) return;

    setIsSubmitting(true);
    try {
      if (contactVariant === 'course') {
        await submitContactForm({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          message: contactMeta?.title
            ? `Interested in course: ${contactMeta.title}`
            : 'Interested in a course',
        });
        toast.success("Thanks! We'll get back to you about this course soon.");
      } else {
        await submitContactForm({
          name: data.name,
          email: data.email,
          phone: `${data.countryCode} ${data.phone}`,
          message: `Advisor request — Purpose: ${data.purpose}`,
        });
        toast.success("Thanks! An advisor will reach out shortly.");
      }

      setValues(INITIAL_VALUES);
      closeContact();
      navigate('/thankyou');
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
{isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContact}
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
            className="relative z-[101] grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-2xl bg-white shadow-panel md:grid-cols-[42%_1fr]"
          >
            <button
              type="button"
              onClick={closeContact}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white"
            >
              <X size={18} />
            </button>

            {/* Left visual panel — full image, shown only on md+ screens */}
            {contactVariant !== 'course' && (
              <div className="hidden md:flex relative order-first w-full items-center justify-center overflow-hidden bg-white md:min-h-[560px]">
                <img
                  src={popupImage}
                  alt=""
                  className="h-auto max-h-[70vh] w-full object-contain md:max-h-none md:h-full md:object-contain"
                  loading="lazy"
                />
              </div>
            )}

            {/* Right form panel */}
            <div className="p-6 sm:p-10">
              {contactVariant === 'course' ? (
                <>
                  <h2 id="advisor-popup-heading" className="text-2xl font-semibold text-ink sm:text-3xl">
                    Interested in this course?
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted">Share your details and we'll get back to you.</p>

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
                      <FloatingField label="Phone">
                        <input
                          type="tel"
                          value={values.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="h-14 w-full rounded-xl border border-ink/15 px-4 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                        />
                      </FloatingField>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-violet-600 hover:bg-violet-700"
                      size="lg"
                    >
                      {isSubmitting ? <Spinner size={18} /> : 'Contact Me'}
                    </Button>
                  </form>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

