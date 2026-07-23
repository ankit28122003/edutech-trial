import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Phone, User, MessageSquare } from 'lucide-react';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { FieldError } from '../../components/ui/FormField';
import { contactSchema, getFieldErrors } from '../../lib/validation';
import { submitContactForm } from '../../services/contactService';

const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export default function CourseContactForm({ courseTitle }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);
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
      await submitContactForm({
        ...data,
        message: data.message
          ? `[${courseTitle}] ${data.message}`
          : `Interested in course: ${courseTitle}`,
      });
      toast.success("Message sent! We'll get back to you within 1 business day.");
      setValues(INITIAL_VALUES);
      navigate('/thankyou');
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/[0.06] bg-white shadow-panel">
      <div className="bg-primary-600 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Have Questions?</h3>
        <p className="mt-0.5 text-sm text-primary-100">
          Our advisors are here to help you choose the right program.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
        <div>
          <div className="relative">
            <User
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none"
            />
            <input
              placeholder="Full name"
              value={values.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="h-11 w-full rounded-lg border border-ink/15 bg-white pl-9 pr-3.5 text-sm text-ink placeholder:text-ink-soft transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <FieldError>{errors.name}</FieldError>
        </div>

        <div>
          <div className="relative">
            <Mail
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none"
            />
            <input
              type="email"
              placeholder="Email address"
              value={values.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="h-11 w-full rounded-lg border border-ink/15 bg-white pl-9 pr-3.5 text-sm text-ink placeholder:text-ink-soft transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <FieldError>{errors.email}</FieldError>
        </div>

        <div>
          <div className="relative">
            <Phone
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={values.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="h-11 w-full rounded-lg border border-ink/15 bg-white pl-9 pr-3.5 text-sm text-ink placeholder:text-ink-soft transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <MessageSquare
              size={15}
              className="absolute left-3 top-3 text-ink-soft pointer-events-none"
            />
            <textarea
              placeholder="How can we help?"
              rows={3}
              value={values.message}
              onChange={(e) => updateField('message', e.target.value)}
              className="w-full rounded-lg border border-ink/15 bg-white pl-9 pr-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <FieldError>{errors.message}</FieldError>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
          variant="accent"
        >
          {isSubmitting ? <Spinner size={18} /> : 'Send Message'}
        </Button>

        <p className="text-xs text-center text-ink-soft">
          We typically respond within 1 business day.
        </p>
      </form>
    </div>
  );
}

