import { X, ExternalLink } from 'lucide-react';

const techStack = [
  { name: 'React 18', desc: 'UI library' },
  { name: 'Vite 6', desc: 'Build tool' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling' },
  { name: 'Lucide React', desc: 'Icon library' },
  { name: 'Claude Code', desc: 'AI-assisted development' },
  { name: 'JSON-based Agent Logic', desc: 'Mock itinerary engine' },
];

export default function ProjectInfoModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-strong rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-slate-800">About This Project</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Description */}
        <div className="mb-5">
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-700">NomadGuide AI</strong> is a Product Manager
            portfolio project demonstrating the integration of conversational AI with structured,
            data-rich itinerary planning.
          </p>
        </div>

        {/* Tech stack */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Tech Stack
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-slate-50 rounded-lg px-3 py-2">
                <p className="text-sm font-medium text-slate-700">{tech.name}</p>
                <p className="text-xs text-slate-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs text-slate-400">Built with Claude Code</span>
          <a
            href="https://claude.ai/code"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Learn more
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
