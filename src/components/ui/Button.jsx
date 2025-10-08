import React from 'react';
import * as Icons from 'lucide-react';
import { cn } from 'utils/cn';

const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none transition-colors select-none';

const variantStyles = {
  default: 'bg-blue-600 text-white shadow hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary',
  outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  subtle: 'bg-accent/50 text-foreground hover:bg-accent focus-visible:ring-ring',
  destructive: 'bg-red-600 text-white shadow hover:bg-red-700 focus-visible:ring-red-500'
};

const sizeStyles = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10 p-0'
};

export default function Button({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon, // React node
  iconName, // lucide icon name string
  iconPosition = 'left',
  loading = false,
  spinnerClassName,
  ...rest
}) {
  const LucideIcon = iconName ? (Icons[iconName] || Icons['CircleHelp']) : null;
  const contentIcon = icon || (LucideIcon ? <LucideIcon className="h-4 w-4" aria-hidden /> : null);

  return (
    <button
      className={cn(
        base,
        variantStyles[variant] || variantStyles.default,
        sizeStyles[size] || sizeStyles.md,
        loading && 'relative text-transparent pointer-events-none',
        className
      )}
      {...rest}
    >
      {loading && (
        <span className={cn('absolute inset-0 flex items-center justify-center', spinnerClassName)}>
          <Icons.Loader2 className="h-4 w-4 animate-spin" />
        </span>
      )}
      {contentIcon && iconPosition === 'left' && contentIcon}
      {children && <span className="whitespace-nowrap">{children}</span>}
      {contentIcon && iconPosition === 'right' && contentIcon}
    </button>
  );
}

