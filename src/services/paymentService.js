/**
 * Razorpay checkout integration.
 *
 * Frontend responsibility is only: (1) ask the backend to create an order,
 * (2) open Razorpay Checkout with that order, (3) send the payment response
 * back to the backend for signature verification. All amount calculation
 * and signature verification MUST happen server-side.
 */
import { api } from './api';

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Kicks off checkout for a course. Requires the backend order-creation and
 * verification endpoints to exist:
 *   POST /payments/razorpay/order   -> { orderId, amount, currency, keyId }
 *   POST /payments/razorpay/verify  -> { success }
 */
export async function startCourseCheckout({ courseId, currencyCode, user, onSuccess, onFailure }) {
  const scriptLoaded = await loadRazorpayScript();
  if (!scriptLoaded) {
    onFailure?.(new Error('Unable to load Razorpay checkout. Check your connection.'));
    return;
  }

  try {
    const { data: order } = await api.post('/payments/razorpay/order', {
      courseId,
      currencyCode, // 'INR' (GST-inclusive) or 'USD'
    });

    const razorpay = new window.Razorpay({
      key: order.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Edutech Skills',
      description: 'Course enrollment',
      order_id: order.orderId,
      prefill: { name: user?.name, email: user?.email },
      theme: { color: '#2541F0' },
      handler: async (response) => {
        try {
          const { data } = await api.post('/payments/razorpay/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId,
          });
          onSuccess?.(data);
        } catch (verifyError) {
          onFailure?.(verifyError);
        }
      },
      modal: {
        ondismiss: () => onFailure?.(new Error('Payment cancelled')),
      },
    });

    razorpay.open();
  } catch (error) {
    onFailure?.(error);
  }
}
