import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const VARIANTS = {
  primary:
    'bg-gradient-to-b from-primary-500 to-primary-600 text-white shadow-glow-primary hover:shadow-glow-primary-lg hover:from-primary-600 hover:to-primary-700',
  accent:
    'bg-gradient-to-b from-accent-500 to-accent-600 text-white shadow-glow-accent hover:shadow-glow-accent-lg hover:from-accent-600 hover:to-accent-700',
  outline: 'border border-ink/15 text-ink hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700',
  ghost: 'text-ink hover:bg-surface-alt',
  white: 'bg-white text-ink shadow-card hover:shadow-card-hover',
};

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

const Button = forwardRef(function Button(
  { as, to, href, variant = 'primary', size = 'md', className, children, ...props },
  ref
) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-50 disabled:pointer-events-none',
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
