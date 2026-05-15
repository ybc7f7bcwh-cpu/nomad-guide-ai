import { useState } from 'react';
import {
  MapPin, Calendar, Route, Utensils, Car, DollarSign,
  CloudSun, Sun, ChevronDown, Footprints,
  Share2, FileDown, RefreshCw,
} from 'lucide-react';
import BudgetSummary from './BudgetSummary.jsx';

const typeConfig = {
  food: { icon: Utensils, label: 'Food', color: 'text-amber-500', bg: 'bg-amber-50' },
  transport: { icon: Car, label: 'Transport', color: 'text-blue-500', bg: 'bg-blue-50' },
  sightseeing: { icon: MapPin, label: 'Sightseeing', color: 'text-emerald-500', bg: 'bg-emerald-50' },
};

function ActivityRow({ activity }) {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[activity.type] ?? typeConfig.sightseeing;
  const Icon = config.icon;

  const hasExtra = activity.walkingTime;

  return (
    <div
      className={`border-b border-slate-100 last:border-0 transition-colors ${
        expanded ? 'bg-slate-50/50' : ''
      }`}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 py-2.5 px-4 text-left hover:bg-slate-50/30 transition-colors"
        disabled={!hasExtra}
      >
        <div className={`shrink-0 rounded-lg p-1.5 ${config.bg}`}>
          <Icon className={`w-4 h-4 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-500">{activity.time}</span>
            <span className="text-xs font-medium text-slate-400">${activity.cost}</span>
          </div>
          <p className="text-sm text-slate-700 truncate">{activity.location}</p>
        </div>
        {hasExtra && (
          <ChevronDown
            className={`w-4 h-4 text-slate-300 transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      {/* Expandable detail */}
      <div
        className={`overflow-hidden transition-all duration-200 ${
          expanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-3 flex items-center gap-2 text-xs text-slate-400 border-t border-slate-100 pt-2">
          <Footprints className="w-3.5 h-3.5" />
          <span>Estimated walking: <strong className="text-slate-500">{activity.walkingTime}</strong></span>
        </div>
      </div>
    </div>
  );
}

function WeatherBadge({ weather }) {
  const isSunny = weather?.toLowerCase().includes('sunny');

  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-white/60 rounded-full px-2.5 py-1">
      {isSunny ? (
        <Sun className="w-3.5 h-3.5 text-amber-400" />
      ) : (
        <CloudSun className="w-3.5 h-3.5 text-slate-400" />
      )}
      {weather}
    </span>
  );
}

function DayCard({ day, index }) {
  const totalCost = day.activities.reduce((sum, a) => sum + a.cost, 0);

  return (
    <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
      {/* Day header */}
      <div className="bg-primary-50/50 px-4 py-3 border-b border-primary-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">
              Day {index + 1}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {day.weather && <WeatherBadge weather={day.weather} />}
            <span className="text-xs font-medium text-slate-500">${totalCost}</span>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-0.5">{day.date}</p>
      </div>

      {/* Activities */}
      <div className="divide-y divide-slate-100">
        {day.activities.map((activity, i) => (
          <ActivityRow key={i} activity={activity} />
        ))}
      </div>
    </div>
  );
}

function ActionButtons({ showToast, onRegenerate }) {
  return (
    <div className="flex gap-2 pt-2 pb-1">
      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="flex-1 glass rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-medium text-primary-600 hover:bg-white/90 transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate
        </button>
      )}
      <button
        onClick={() => showToast?.('Share link copied to clipboard!')}
        className="flex-1 glass rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-medium text-slate-600 hover:bg-white/90 transition-all duration-200"
      >
        <Share2 className="w-4 h-4" />
        Copy Share Link
      </button>
      <button
        onClick={() => showToast?.('PDF download coming soon!')}
        className="flex-1 glass rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-medium text-slate-600 hover:bg-white/90 transition-all duration-200"
      >
        <FileDown className="w-4 h-4" />
        Download PDF
      </button>
    </div>
  );
}

function getLatestItinerary(messages) {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].itinerary?.days?.length > 0) {
      return messages[i].itinerary;
    }
  }
  return null;
}

export default function ItineraryDashboard({ messages, showToast, onRegenerate }) {
  const itinerary = getLatestItinerary(messages);

  if (!itinerary) {
    return (
      <aside className="w-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="glass-card rounded-2xl p-8 max-w-sm">
          <div className="bg-slate-100 rounded-full p-4 w-fit mx-auto mb-4">
            <MapPin className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-600 mb-2">
            Your Itinerary
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Start a conversation on the left to build your personalized travel
            plan. It&apos;ll appear here.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[400px] flex flex-col overflow-hidden">
      {/* Dashboard header */}
      <div className="shrink-0 glass px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-primary-500" />
            <h2 className="text-sm font-semibold text-slate-700">
              {itinerary.destination}
            </h2>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-primary-600 bg-primary-50 rounded-lg px-2.5 py-1">
            <DollarSign className="w-3 h-3" />
            {itinerary.totalBudget}
          </div>
        </div>
      </div>

      {/* Dashboard body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        <BudgetSummary itinerary={itinerary} />

        {itinerary.days.map((day, index) => (
          <DayCard key={index} day={day} index={index} />
        ))}

        <ActionButtons showToast={showToast} onRegenerate={onRegenerate} />
      </div>
    </aside>
  );
}
