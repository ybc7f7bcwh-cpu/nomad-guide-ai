import { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Sparkles, User, Compass, Loader2 } from 'lucide-react';
import ThoughtProcess from './ThoughtProcess.jsx';

export default function ChatInterface({ messages, isLoading, onSend }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    onSend(text);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <section className="flex-1 flex flex-col min-w-0">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="bg-primary-50 rounded-full p-4 mb-4">
              <Sparkles className="w-8 h-8 text-primary-500" />
            </div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              Where to next?
            </h2>
            <p className="text-slate-500 max-w-md text-sm leading-relaxed">
              Tell me your dream destination, travel dates, and what you love
              doing — I&apos;ll craft a personalized itinerary for you.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`shrink-0 rounded-full p-2 ${
                msg.role === 'user'
                  ? 'bg-primary-500 shadow-sm shadow-primary-500/20'
                  : 'glass-strong'
              }`}
            >
              {msg.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Compass className="w-4 h-4 text-primary-500" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={
                msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
              }
            >
              {/* Thought process accordion — only for AI messages */}
              {msg.thoughts && msg.thoughts.length > 0 && (
                <ThoughtProcess thoughts={msg.thoughts} />
              )}

              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="shrink-0 glass-strong rounded-full p-2">
              <Compass className="w-4 h-4 text-primary-500" />
            </div>
            <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="shrink-0 glass-strong px-4 py-4">
        <div className="flex items-end gap-2 max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Try &quot;I want to go to Tokyo&quot; or &quot;Plan a Paris trip!&quot;"
              rows={1}
              disabled={isLoading}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all disabled:opacity-50"
              style={{ minHeight: 48, maxHeight: 120 }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="shrink-0 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 rounded-xl p-3 text-white transition-all duration-200 shadow-lg shadow-primary-500/25 disabled:shadow-none"
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
