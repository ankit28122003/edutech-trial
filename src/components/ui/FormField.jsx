import { cn } from '../../lib/utils';

export function Label({ children, htmlFor, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children} {required && <span className="text-accent-600">*</span>}
    </label>
  );
}

export function Input({ className, error, ...props }) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-lg border border-ink/15 bg-white px-3.5 text-sm text-ink placeholder:text-ink-soft transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100',
        error && 'border-accent-500 focus:border-accent-500 focus:ring-accent-100',
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, error, ...props }) {
  return (
    <textarea
      className={cn(
        'w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100',
        error && 'border-accent-500 focus:border-accent-500 focus:ring-accent-100',
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, error, children, ...props }) {
  return (
    <select
      className={cn(
        'h-11 w-full rounded-lg border border-ink/15 bg-white px-3.5 text-sm text-ink transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100',
        error && 'border-accent-500',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs font-medium text-accent-600">{children}</p>;
}
