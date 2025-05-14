import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, fullWidth = false, ...props }, ref) => {
    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            className={cn(
              'block rounded-md bg-white dark:bg-gray-800 shadow-sm transition-colors',
              'border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'text-gray-900 dark:text-gray-100',
              icon ? 'pl-10' : 'pl-4',
              'py-2 pr-4',
              fullWidth && 'w-full',
              error && 'border-error-500 focus:border-error-500 focus:ring-error-500',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-error-600 dark:text-error-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;