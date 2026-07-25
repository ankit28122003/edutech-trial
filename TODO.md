# USD Pricing Implementation

## Steps

1. ✅ **Plan approved** — Add hardcoded USD prices to course data, floor to nearest 10
2. ✅ **Update `src/data/courses.js`** — Add `priceUSD` and `originalPriceUSD` to all 10 courses
3. ✅ **Update `src/lib/currency.js`** — Modify `formatMoney()` and `getCheckoutBreakdown()` to accept optional hardcoded USD values; GST skipped when not INR
4. ✅ **Update `src/context/CurrencyContext.jsx`** — Pass USD values and currencyCode through `format()` and `getCheckoutBreakdown()`
5. ✅ **Update `src/features/courses/CourseCard.jsx`** — Pass `course.priceUSD` and `course.originalPriceUSD`
6. ✅ **Update `src/features/home/FeaturedCourseCard.jsx`** — Pass USD values
7. ✅ **Update `src/features/course-detail/CoursePricingCard.jsx`** — Use hardcoded USD values, fix GST logic for currency switcher
8. ✅ **Update `src/features/admin/pages/CourseFormPage.jsx`** — Add USD fields to schema, form, and defaults
9. ✅ **Update `src/features/course-detail/CourseDetailPage.jsx`** — Related courses now show USD when switched, using `useCurrency` hook

