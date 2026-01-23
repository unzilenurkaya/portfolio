'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-white/80 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={twMerge(
              clsx(
                'w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/40 transition-all duration-300',
                'focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:shadow-primary/10',
                'hover:border-white/20',
                leftIcon && 'pl-12',
                rightIcon && 'pr-12',
                error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20',
                className
              )
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea Component
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-white/80 mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={twMerge(
            clsx(
              'w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/40 transition-all duration-300 resize-none',
              'focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:shadow-primary/10',
              'hover:border-white/20',
              error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20',
              className
            )
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Input;
