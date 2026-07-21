import { useState } from 'react';
import toast from 'react-hot-toast';
import { ShieldCheck, Clock, BarChart3, Globe } from 'lucide-react';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { startCourseCheckout } from '../../services/paymentService';

export default function CoursePricingCard({ course }) {
  const { isIndia, getCheckoutBreakdown } = useCurrency();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const breakdown = getCheckoutBreakdown(course.priceINR);
  const discountPercent = Math.round(
    ((course.originalPriceINR - course.priceINR) / course.originalPriceINR) * 100
  );

  async function handleEnroll() {
    if (!isAuthenticated) {
      toast('Please log in to enroll in this course.');
      return;
    }
    setIsProcessing(true);
    await startCourseCheckout({
      courseId: course.id,
      currencyCode: breakdown.currencyCode,
      user,
      onSuccess: () => {
        toast.success('Enrollment successful! Check your email for access.');
        setIsProcessing(false);
      },
      onFailure: (error) => {
        // In this frontend-only phase there is no live backend order endpoint yet,
        // so a failed request here is expected until the API is connected.
        toast.error(error?.message || 'Checkout is not connected to a backend yet.');
        setIsProcessing(false);
      },
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/[0.06] bg-white shadow-panel">
      <img src={course.heroImage} alt="" className="h-44 w-full object-cover" loading="lazy" />
      <div className="p-6">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl font-semibold text-ink">{breakdown.subtotalLabel}</span>
        </div>
        <p className="mt-1 text-xs font-medium text-success-500">{discountPercent}% off — limited time</p>

        {breakdown.taxLabel && (
          <div className="mt-4 space-y-1.5 rounded-lg bg-surface-alt p-3 text-sm">
            <div className="flex justify-between text-ink-muted">
              <span>Course price</span>
              <span className="font-mono">{breakdown.subtotalLabel}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>{breakdown.taxRateLabel}</span>
              <span className="font-mono">{breakdown.taxLabel}</span>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-1.5 font-semibold text-ink">
              <span>Total payable</span>
              <span className="font-mono">{breakdown.totalLabel}</span>
            </div>
          </div>
        )}

        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-soft">
          <Globe size={13} />
          {isIndia ? 'Billed in India — 18% GST applies.' : 'Billed outside India — prices shown in USD, no GST.'}
        </p>

        <Button onClick={handleEnroll} disabled={isProcessing} className="mt-5 w-full" size="lg" variant="accent">
          {isProcessing ? <Spinner size={18} /> : 'Enroll Now'}
        </Button>
        <Button to="/contact" variant="outline" className="mt-2.5 w-full" size="lg">
          Talk to an Advisor
        </Button>

        <ul className="mt-6 space-y-3 border-t border-ink/[0.06] pt-5 text-sm text-ink-muted">
          <li className="flex items-center gap-2.5">
            <Clock size={15} className="text-primary-500" /> {course.duration} of live + self-paced content
          </li>
          <li className="flex items-center gap-2.5">
            <BarChart3 size={15} className="text-primary-500" /> {course.level} level
          </li>
          <li className="flex items-center gap-2.5">
            <ShieldCheck size={15} className="text-primary-500" /> 7-day refund guarantee
          </li>
        </ul>
      </div>
    </div>
  );
}
