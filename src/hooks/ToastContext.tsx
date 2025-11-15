'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import Toast, { ToastVariant } from '@/components/Toast';

interface ToastItem {
  id: string;
  message: React.ReactNode;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toast: (message: React.ReactNode, variant?: ToastVariant, duration?: number) => void;
  success: (message: React.ReactNode, duration?: number) => void;
  error: (message: React.ReactNode, duration?: number) => void;
  warning: (message: React.ReactNode, duration?: number) => void;
  info: (message: React.ReactNode, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((
    message: React.ReactNode,
    variant: ToastVariant = 'info',
    duration = 5000
  ) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, variant, duration }]);
  }, []);

  const toast = useCallback((message: React.ReactNode, variant?: ToastVariant, duration?: number) => {
    addToast(message, variant, duration);
  }, [addToast]);

  const success = useCallback((message: React.ReactNode, duration?: number) => {
    addToast(message, 'success', duration);
  }, [addToast]);

  const error = useCallback((message: React.ReactNode, duration?: number) => {
    addToast(message, 'error', duration);
  }, [addToast]);

  const warning = useCallback((message: React.ReactNode, duration?: number) => {
    addToast(message, 'warning', duration);
  }, [addToast]);

  const info = useCallback((message: React.ReactNode, duration?: number) => {
    addToast(message, 'info', duration);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      {/* Toast container - renders all active toasts */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            duration={toast.duration}
            onDismiss={() => removeToast(toast.id)}
          >
            {toast.message}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

