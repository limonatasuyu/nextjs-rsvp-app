"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const ToastPortal = ({ toasts }: { toasts: Toast[] }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Don't render on server

  return createPortal(
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow-md text-white animate-fade-in-up ${
            toast.type === 'success'
              ? 'bg-green-600'
              : toast.type === 'error'
              ? 'bg-red-600'
              : 'bg-blue-600'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>,
    document.body
  );
};
