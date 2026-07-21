# Edutech Skills — Frontend

A production-shaped clone of an EdTech certification platform, built with **React + Vite + Tailwind CSS (JavaScript, no TypeScript)**. This is the **frontend-only** phase — every data-fetching call is already written as an `async` function with the exact shape the real MERN backend will use, so connecting the backend later should mean editing `src/services/*.js`, not rewriting components.

## Tech Stack

- **React 18 + Vite** — fast dev server, code-split routes
- **Tailwind CSS** — all styling is utility classes; no global/component CSS files
- **Framer Motion + GSAP + Lenis** — scroll reveals, stagger animations, smooth scrolling
- **React Router v6** — routing, including a protected `/admin` section
- **Zod** — form validation (login, register, contact, admin course form)
- **Axios** — pre-wired API client with JWT + refresh-token interceptors (`src/services/api.js`)
- **Razorpay Checkout** — integration stubbed in `src/services/paymentService.js`, ready for backend order/verify endpoints

## Getting Started

```bash
npm install
cp .env.example .env   # then fill in VITE_API_BASE_URL / VITE_RAZORPAY_KEY_ID
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  app/                  (reserved for future route-level config)
  components/
    layout/              Navbar, MegaMenu, Footer, MobileMenu, CurrencySwitcher
    ui/                  Reusable design-system primitives (Button, Card, Badge, Accordion, forms...)
    common/               Reveal/StaggerGroup animation wrappers, SEO, ProtectedRoute, ScrollToTop
  features/
    home/                 Home page + all its sections
    courses/               Course listing, filters, CourseCard
    course-detail/         Course detail page, pricing card, curriculum accordion
    auth/                  Login / Register
    static/                About, Careers, Contact, Blog, FAQ, Terms, Privacy, Instructor, Affiliate, Help Center
    admin/                 Admin panel (dashboard, course CRUD, settings)
  context/                 CurrencyContext (INR/USD/GBP + GST logic), AuthContext (mock JWT/RBAC)
  data/                    Mock content — 9 sample courses, domains, testimonials, blog posts, FAQs
  services/                 API layer — swap mock bodies for real axios calls when the backend exists
  hooks/                   useLenis (smooth scroll), useCountUp (animated stats)
  lib/                     currency.js, constants.js, validation.js, utils.js
```

## Currency & GST Logic

`src/lib/currency.js` and `src/context/CurrencyContext.jsx` implement the pricing rule:

- Learners detected as browsing from **India** are billed in **INR, inclusive of 18% GST** (shown as a separate line at checkout).
- Learners outside India are billed in **USD**, no GST.
- A manual currency switcher (INR / USD / GBP) is available in the navbar for browsing; the **checkout total** always follows the India/non-India rule above, not the display currency, matching how GST law actually applies.
- Region detection here is a **frontend-only heuristic** (timezone-based) used just to pick a sensible default. Replace `guessIsIndiaFromTimezone()` with a real server-side IP-geolocation check before creating the Razorpay order once the backend exists — the rest of the pricing code does not need to change.

## Connecting the Real Backend

Every file in `src/services/` currently reads from `src/data/*.js` but is already `async` and returns the same shape a real endpoint would. To connect Express + MongoDB:

1. Set `VITE_API_BASE_URL` in `.env` to your API's base URL.
2. In each `services/*.js` file, replace the mock body with the commented-out `api.get/post/put/delete(...)` call shown directly below it.
3. `src/services/api.js` already has JWT bearer-token attachment and a silent refresh-token retry flow wired up — no changes needed there.
4. For Razorpay, implement two endpoints on the backend:
   - `POST /payments/razorpay/order` → creates an order server-side using the course's real price (never trust a client-sent amount) and returns `{ orderId, amount, currency, keyId }`.
   - `POST /payments/razorpay/verify` → verifies the payment signature server-side before marking the enrollment as paid.
5. For the admin panel to actually persist courses, implement `POST /admin/courses`, `PUT /admin/courses/:id`, `DELETE /admin/courses/:id` guarded by RBAC (`role: 'admin'`) middleware, matching the payload shape used in `CourseFormPage.jsx`.

## Admin Panel (Demo Access)

There's no real backend yet, so auth is mocked. To preview `/admin` in this demo:

- Register or log in with **any email ending in `@edutechskills.example`** → logs in with `role: 'admin'`.
- Any other email logs in as a regular learner (`role: 'learner'`).

This mock rule lives in `src/services/authService.js` and should be deleted once real JWT/RBAC auth is connected.

## Notes

- No TypeScript, per project requirements — plain JavaScript (`.js` / `.jsx`) throughout.
- No global CSS beyond the required Tailwind directives in `src/index.css` (base-layer resets only) — every component is styled with Tailwind utility classes.
- Images are sourced from Unsplash (CDN URLs) as stand-ins; swap for your own media/CDN in production.
