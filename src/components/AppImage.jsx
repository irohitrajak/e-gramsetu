import React, { useState } from 'react';
import { cn } from 'utils/cn';

// Image with loading shimmer + error fallback
export default function AppImage({
  src,
  alt = '',
  className,
  aspect = 'square',
  rounded = 'md',
  fallback,
  imgClassName,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const aspectClass =
    aspect === 'square' ? 'aspect-square' :
    aspect === 'video' ? 'aspect-video' :
    aspect === 'wide' ? 'aspect-[3/1]' : '';

  if (errored && fallback) return fallback;

  return (
    <div className={cn('relative overflow-hidden bg-gray-200 dark:bg-gray-800', aspectClass, rounded && `rounded-${rounded}`, className)}>
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={cn('object-cover w-full h-full', !loaded && 'opacity-0', loaded && 'opacity-100 transition-opacity duration-300', imgClassName)}
        loading="lazy"
        {...rest}
      />
    </div>
  );
}

