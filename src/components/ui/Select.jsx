import React from 'react';
import { clsx } from 'clsx';

export default function Select({ className, children, ...rest }) {
  return (
    <select
      className={clsx('w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500', className)}
      {...rest}
    >
      {children}
    </select>
  );
}
