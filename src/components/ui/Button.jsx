import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const VARIANTS = {
  primary:
    'bg-ink text-white hover:bg-primary-700 shadow-sm hover:shadow-card-hover',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-card-hover',
  outline: 'border border-ink/15 text-ink hover:border-ink/30 hover:bg-surface-alt',
  ghost: 'text-ink hover:bg-surface-alt',
  white: 'bg-white text-ink hover:bg-white/90',
};

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

/**
 * Polymorphic Button: renders a <button>, an internal <Link>, or an external <a>
 * depending on the props passed, while sharing one consistent visual style.
 */
const Button = forwardRef(function Button(
  { as, to, href, variant = 'primary', size = 'md', className, children, ...props },
  ref
) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    VARIANTS[variant],
    SIZES[size],
    className
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  const Tag = as || 'button';
  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
});

export default Button;
