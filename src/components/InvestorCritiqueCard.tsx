import React from 'react';
import { ShieldAlert, AlertTriangle, Lightbulb, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { InvestorCritique } from '../types';

interface InvestorCritiqueCardProps {
  critique?: InvestorCritique;
  onApplyFix?: () => void;
  isApplyingFix?: boolean;
}

export const InvestorCritiqueCard: React.FC<InvestorCritiqueCardProps> = ({
  critique,
  onApplyFix,
  isApplyingFix = false,
}) => {
  if (!critique) {
    return (
      <div className="bg-white border border-zinc-200 rounded-lg p-5 text-zinc-400 text-xs">
        No investor critique available for this slide.
      </div>
    );
  }

  const isFixed = critique.is_fixed === true || critique.severity === 'fixed';

  const cardStyle = isFixed
    ? 'border-l-4 border-l-emerald-600 bg-emerald-50/40 border border-emerald-200 text-zinc-900'
    : critique.severity === 'high'
    ? 'border-l-4 border-l-red-500 bg-red-50/60 border border-red-200 text-zinc-900'
    : critique.severity === 'medium'
    ? 'border-l-4 border-l-amber-500 bg-amber-50/60 border border-amber-200 text-zinc-900'
    : 'border-l-4 border-l-zinc-700 bg-zinc-50 border border-zinc-200 text-zinc-900';

  return (
    <div className={`rounded-r-lg p-5 shadow-xs space-y-4 transition-all ${cardStyle}`}>
      {/* Critique Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80">
        <div className="flex items-center gap-2">
          {isFixed ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          ) : (
            <ShieldAlert className="h-4 w-4 text-red-600" />
          )}
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
            {isFixed ? 'VC Defense Strategy Applied' : 'Investor Critique Callout'}
          </h3>
        </div>

        {isFixed ? (
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border bg-emerald-100 text-emerald-800 border-emerald-300 flex items-center gap-1 shadow-xs">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            Slide Fixed
          </span>
        ) : (
          <span
            className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${
              critique.severity === 'high'
                ? 'bg-red-100 text-red-800 border-red-200'
                : critique.severity === 'medium'
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-zinc-100 text-zinc-800 border-zinc-200'
            }`}
          >
            {critique.severity} Risk Pushback
          </span>
        )}
      </div>

      {/* VC Concern / Objection */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5">
          {isFixed ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />
          )}
          {isFixed ? 'Resolved Investor Objection' : 'Skeptical VC Concern'}
        </label>
        <p
          className={`text-xs text-zinc-800 leading-relaxed bg-white rounded p-3 font-sans shadow-xs border ${
            isFixed ? 'border-emerald-200' : 'border-red-200/80'
          }`}
        >
          "{critique.concern}"
        </p>
      </div>

      {/* Suggested VC Fix */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          {isFixed ? 'Integrated Defense & Proof Points' : 'Recommended Fix / Defense Strategy'}
        </label>
        <p className="text-xs text-zinc-800 leading-relaxed bg-white border border-zinc-200 rounded p-3 shadow-xs">
          {critique.suggested_fix}
        </p>
      </div>

      {/* Apply Fix Action Button */}
      {onApplyFix && (
        <button
          type="button"
          onClick={onApplyFix}
          disabled={isApplyingFix}
          className={`w-full mt-2 py-2 px-3 rounded text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer disabled:cursor-not-allowed ${
            isFixed
              ? 'bg-emerald-800 hover:bg-emerald-900 text-white'
              : 'bg-black hover:bg-zinc-800 disabled:bg-zinc-700 text-white'
          }`}
        >
          {isApplyingFix ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-300" />
              <span>Rewriting Slide Content with VC Fix...</span>
            </>
          ) : isFixed ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              <span>Slide Fixed • Click to Re-Optimize</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
              <span>Auto-Apply VC Fix to Slide Content</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
