import { useState, useCallback } from 'react';
import { Compass, Info } from 'lucide-react';
import { processUserInput } from './services/mockAgent.js';
import ChatInterface from './components/ChatInterface.jsx';
import ItineraryDashboard from './components/ItineraryDashboard.jsx';
import { ToastContainer, useToast } from './components/Toast.jsx';
import ProjectInfoModal from './components/ProjectInfoModal.jsx';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { toasts, showToast } = useToast();

  const handleSend = useCallback(async (text) => {
    const userMsg = { role: 'user', content: text, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const response = await processUserInput(text);

    const aiMsg = {
      role: 'ai',
      content: response.text,
      itinerary: response.itinerary,
      thoughts: response.thoughts,
      id: Date.now() + 1,
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  }, []);

  const handleRegenerate = useCallback(async () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      await handleSend(lastUserMsg.content);
    }
  }, [messages, handleSend]);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="shrink-0 glass-strong px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500 rounded-xl p-2 shadow-lg shadow-primary-500/25 animate-pulse-soft">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">NomadGuide AI</h1>
            <p className="text-xs text-slate-500">Your intelligent travel companion</p>
          </div>
        </div>
        <button
          onClick={() => setShowInfo(true)}
          className="rounded-full p-2 hover:bg-slate-100 transition-colors"
          title="About this project"
        >
          <Info className="w-5 h-5 text-slate-400 hover:text-slate-600" />
        </button>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chat Interface */}
        <ChatInterface messages={messages} isLoading={isLoading} onSend={handleSend} />

        {/* Vertical Divider */}
        <div className="w-px bg-slate-200/80 shrink-0" />

        {/* Right: Itinerary Dashboard */}
        <ItineraryDashboard
          messages={messages}
          showToast={showToast}
          onRegenerate={messages.length > 0 ? handleRegenerate : undefined}
        />
      </div>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={() => {}} />

      {/* Project Info Modal */}
      {showInfo && <ProjectInfoModal onClose={() => setShowInfo(false)} />}
    </div>
  );
}
