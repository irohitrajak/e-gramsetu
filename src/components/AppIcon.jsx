import * as Icons from 'lucide-react';
import React from 'react';
import { cn } from 'utils/cn';

/**
 * Generic icon component using lucide-react.
 * Props: name, size (number), className, color, fallback
 */
export default function Icon({ name, size = 18, className, color, fallback = 'CircleHelp', ...rest }) {
  const LucideIcon = Icons[name] || Icons[fallback] || (() => <span />);
  return (
    <LucideIcon
      aria-hidden="true"
      size={size}
      className={cn('shrink-0', color && `text-${color}-600`, className)}
      {...rest}
    />
  );
}

