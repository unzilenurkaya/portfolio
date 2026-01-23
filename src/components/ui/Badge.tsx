'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white/80',
  primary: 'bg-gradient-to-r from-primary to-secondary text-white',
  secondary: 'bg-gradient-to-r from-accent-cyan to-accent-lime text-background',
  outline: 'border border-primary/50 text-primary bg-transparent',
  success: 'bg-accent-lime/20 text-accent-lime border border-accent-lime/30',
  warning: 'bg-primary/20 text-primary border border-primary/30',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200',
            variantStyles[variant],
            sizeStyles[size],
            className
          )
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
