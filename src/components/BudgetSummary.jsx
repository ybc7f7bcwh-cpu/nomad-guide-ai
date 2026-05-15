import { DollarSign, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const DEFAULT_BUDGET_LIMIT = 1000;

export default function BudgetSummary({ itinerary }) {
  const totalCost = itinerary.days.reduce(
    (sum, day) => sum + day.activities.reduce((s, a) => s + a.cost, 0),
    0
  );
  const budgetLimit = itinerary.totalBudget || DEFAULT_BUDGET_LIMIT;
  const isOverBudget = totalCost > budgetLimit;
  const percentage = Math.round((totalCost / budgetLimit) * 100);

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Budget Overview
        </span>
        {isOverBudget ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 rounded-full px-2.5 py-1">
            <AlertTriangle className="w-3 h-3" />
            Over Budget
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-1">
            <CheckCircle className="w-3 h-3" />
            On Track
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 mb-3">
        <DollarSign className="w-5 h-5 text-slate-400" />
        <span className="text-2xl font-bold text-slate-800">{totalCost}</span>
        <span className="text-sm text-slate-400">
          / ${budgetLimit} budget
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out ${
            isOverBudget ? 'bg-rose-400' : percentage > 75 ? 'bg-amber-400' : 'bg-emerald-400'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="flex items-center gap-1 mt-2">
        <TrendingUp className="w-3 h-3 text-slate-400" />
        <span className="text-xs text-slate-400">
          {isOverBudget
            ? `$${totalCost - budgetLimit} over limit — consider reducing activities`
            : `$${budgetLimit - totalCost} remaining for extras`}
        </span>
      </div>
    </div>
  );
}
