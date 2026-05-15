import { useState } from 'react';
import { Brain, ChevronDown } from 'lucide-react';

export default function ThoughtProcess({ thoughts }) {
  const [open, setOpen] = useState(false);

  if (!thoughts || thoughts.length === 0) return null;

  return (
    <div className="mb-3 border-b border-slate-100 pb-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-600 transition-colors w-full"
      >
        <Brain className="w-3.5 h-3.5 shrink-0" />
        <span className="font-medium">Thought Process</span>
        <ChevronDown
          className={`w-3.5 h-3.5 ml-auto transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-slate-50/80 rounded-lg p-3 space-y-2">
          {thoughts.map((step, i) => (
            <div key={i} className="flex gap-2">
              <span className="shrink-0 font-mono text-xs text-slate-400 w-4 text-right">
                {i + 1}.
              </span>
              <p className="font-mono text-xs text-slate-500 leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
