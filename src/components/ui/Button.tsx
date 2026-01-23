'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const variants: Record<ButtonVariant, string> = {
  primary: 
    'bg-gradient-to-r from-primary to-secondary text-white ' +
    'hover:shadow-[0_0_30px_rgba(255,126,95,0.4)] ' +
    'active:shadow-[0_0_20px_rgba(255,126,95,0.6)]',
  secondary: 
    'bg-gradient-to-r from-accent-cyan to-accent-lime text-background ' +
    'hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] ' +
    'active:shadow-[0_0_20px_rgba(0,245,255,0.6)]',
  outline: 
    'border-2 border-primary/50 text-primary bg-transparent ' +
    'hover:border-primary hover:bg-primary/10 ' +
    'hover:shadow-[0_0_20px_rgba(255,126,95,0.2)]',
  ghost: 
    'text-white/80 bg-transparent ' +
    'hover:text-white hover:bg-white/5',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      type = 'button',
      onClick,
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        className={twMerge(
          clsx(
            // Base styles
            'relative inline-flex items-center justify-center',
            'font-medium rounded-xl',
            'transition-all duration-300 ease-out',
            // Focus styles
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            // Disabled styles
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
            // Overflow for glow effect
            'overflow-hidden',
            // Variant and size
            variants[variant],
            sizes[size],
            // Full width option
            fullWidth && 'w-full',
            className
          )
        )}
        whileHover={{ scale: isDisabled ? 1 : 1.02 }}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
        disabled={isDisabled}
        aria-busy={isLoading}
        type={type}
        onClick={onClick}
      >
        {/* Animated glow overlay */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent pointer-events-none"
          initial={{ opacity: 0, x: '-100%' }}
          whileHover={{ opacity: 1, x: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Content */}
        {isLoading ? (
          <span
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-label="Loading"
          />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
