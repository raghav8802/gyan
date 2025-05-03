'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      primary: 'bg-primary text-dark hover:bg-primary-dark',
      secondary: 'bg-dark-200 text-white hover:bg-dark-300',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-dark',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-10 px-6 text-base',
      lg: 'h-12 px-8 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="loading-dots flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-current" />
            <div className="w-2 h-2 rounded-full bg-current" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-current" style={{ animationDelay: '0.4s' }} />
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
