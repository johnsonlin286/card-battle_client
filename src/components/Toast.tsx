'use client';

import { useEffect, useState } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  children: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  onDismiss?: () => void;
}

export default function Toast({ 
  children, 
  variant = 'info', 
  duration = 5000,
  onDismiss 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger slide down and fade in animation on mount
    setTimeout(() => setIsMounted(true), 10);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, 300); // Match animation duration
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  const variantStyles = {
    success: 'bg-green-500 text-white border-green-600',
    error: 'bg-red-500 text-white border-red-600',
    warning: 'bg-yellow-500 text-white border-yellow-600',
    info: 'bg-blue-500 text-white border-blue-600',
  }[variant];

  return (
    <div
      className={`
        px-6 py-4 rounded-lg shadow-lg
        border-2 min-w-[300px] max-w-[500px]
        ${variantStyles}
        transition-all duration-300 ease-in-out
        ${isAnimating 
          ? 'opacity-0 -translate-y-4' 
          : isMounted
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4'
        }
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-between">
        {children}
      </div>
    </div>
  );
}

