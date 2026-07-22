import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Enter your full name'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const contactSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Tell us a bit more (at least 10 characters)'),
});

/** Runs a zod schema and returns a flat { fieldName: message } error map instead of a ZodError. */
export function getFieldErrors(schema, values) {
  const result = schema.safeParse(values);
  if (result.success) return { errors: null, data: result.data };
  const errors = {};
  for (const issue of result.error.issues) {
    errors[issue.path[0]] = issue.message;
  }
  return { errors, data: null };
}

export const advisorPopupSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  countryCode: z.string().min(1, 'Select a code'),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .regex(/^[0-9\s-]+$/, 'Digits only, please'),
  purpose: z.string().min(1, 'Select a purpose'),
  agree: z.literal(true, {
    errorMap: () => ({ message: 'Please accept the Terms & Conditions to continue' }),
  }),
});