import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { Label, Input, Textarea, FieldError } from '../ui/FormField';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { contactSchema, getFieldErrors } from '../../lib/validation';
import { submitContactForm } from '../../services/contactService';

const SESSION_KEY = 'edutech_contact_popup_shown';

export default function ContactPopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Shows once per browser tab session, shortly after the site loads.
  // Layout only mounts once for the whole SPA session, so this naturally
  // will not reopen when navigating between pages — only on a fresh load/refresh.
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
    const { errors: fieldErrors, data } = getFieldErrors(contactSchema, values);
    setErrors(fieldErrors || {});
    if (fieldErrors) return;

    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      toast.success("Message sent! We'll get back to you within 1 business day.");
      setValues({ name: '', email: '', phone: '', message: '' });
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
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-heading"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[101] w-full max-w-md rounded-2xl bg-white p-6 shadow-panel sm:p-8"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-alt hover:text-ink"
            >
              <X size={18} />
            </button>

            <h2 id="contact-popup-heading" className="text-xl font-semibold text-ink">
              Let's talk about your next career move
            </h2>
            <p className="mt-1.5 text-sm text-ink-muted">
              Share a few details and an advisor will reach out within 1 business day.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <Label htmlFor="popup-name" required>
                  Full name
                </Label>
                <Input
                  id="popup-name"
                  value={values.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  error={errors.name}
                />
                <FieldError>{errors.name}</FieldError>
              </div>

              <div>
                <Label htmlFor="popup-email" required>
                  Email
                </Label>
                <Input
                  id="popup-email"
                  type="email"
                  value={values.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  error={errors.email}
                />
                <FieldError>{errors.email}</FieldError>
              </div>

              <div>
                <Label htmlFor="popup-phone">Phone (optional)</Label>
                <Input
                  id="popup-phone"
                  type="tel"
                  value={values.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="popup-message" required>
                  How can we help?
                </Label>
                <Textarea
                  id="popup-message"
                  rows={3}
                  value={values.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  error={errors.message}
                />
                <FieldError>{errors.message}</FieldError>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                {isSubmitting ? <Spinner size={18} /> : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}