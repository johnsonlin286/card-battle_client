'use client';

import { useEffect, useRef, useState } from 'react';

import { useToastStore } from '@/store/toast';

function Toast({ id, message, variant, duration }: Toast) {
  const toastRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { removeToast } = useToastStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(false);
      if (toastRef.current) {
        toastRef.current.addEventListener('transitionend', () => {
          removeToast(id || '');
        }, { once: true });
      }
    }, duration)

    return () => clearTimeout(timeout);
  }, [duration])

  const variantStyles = {
    success: 'bg-green-300 text-green-800',
    error: 'bg-red-300 text-red-800',
    warning: 'bg-yellow-300 text-yellow-800',
    info: 'bg-blue-300 text-blue-800',
  }[variant];

  return (
      <div
        ref={toastRef}
        className={`
          px-6 py-4 rounded-lg shadow-lg
          min-w-[300px] max-w-[500px]
          ${variantStyles}
          transition-all duration-300 ease-in-out
          ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        `}
        role="alert"
        aria-live="assertive"
      >
        {message}
      </div>
  );
}

export default function Toaster() {
  const { toasts } = useToastStore();

  if (toasts.length === 0) return null; 

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}