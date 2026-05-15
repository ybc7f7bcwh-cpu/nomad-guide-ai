import { useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return { toasts, showToast };
}

export function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto animate-slide-up glass-strong rounded-xl px-5 py-3 flex items-center gap-3 shadow-xl max-w-sm"
        >
          <span className="text-sm text-slate-700">{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            className="shrink-0 rounded-full p-0.5 hover:bg-slate-100 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      ))}
    </div>
  );
}
