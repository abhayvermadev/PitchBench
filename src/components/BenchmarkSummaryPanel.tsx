import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, Layers, TrendingUp, DollarSign, Target, CheckCircle2 } from 'lucide-react';
import { IndustryBenchmarkSummary, BenchmarkDeck } from '../types';

interface BenchmarkSummaryPanelProps {
  summary?: IndustryBenchmarkSummary;
  benchmarks: BenchmarkDeck[];
}

export const BenchmarkSummaryPanel: React.FC<BenchmarkSummaryPanelProps> = ({
  summary,
  benchmarks,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!summary && (!benchmarks || benchmarks.length === 0)) return null;

  return (
    <div className="bg-white border border-zinc-200 rounded-lg shadow-xs overflow-hidden">
      {/* Header Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-zinc-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-zinc-100 text-zinc-800 border border-zinc-200">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <span>Benchmark Grounding Transparency Panel</span>
              <span className="text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                {benchmarks.length} Reference Decks
              </span>
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Ground truth figures, TAM/SAM/SOM ranges, and valuation/ask baselines used to verify this deck.
            </p>
          </div>
        </div>

        <div className="text-zinc-500 hover:text-zinc-900 p-1">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-zinc-200 space-y-6">
          {/* Key Benchmark Metrics Grid */}
          {summary?.industry_benchmarks_applied && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-50 border border-zinc-200 rounded p-4 space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                  <Target className="h-3.5 w-3.5 text-zinc-700" /> TAM Range
                </span>
                <p className="text-sm font-bold font-mono text-zinc-900">
                  {summary.industry_benchmarks_applied.tam_range}
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded p-4 space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                  <Target className="h-3.5 w-3.5 text-zinc-700" /> SAM / SOM Range
                </span>
                <p className="text-xs font-bold font-mono text-zinc-800">
                  SAM: {summary.industry_benchmarks_applied.sam_range}
                  <br />
                  SOM: {summary.industry_benchmarks_applied.som_range}
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded p-4 space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-700" /> Typical Ask Range
                </span>
                <p className="text-sm font-bold font-mono text-emerald-900">
                  {summary.industry_benchmarks_applied.typical_ask_range}
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded p-4 space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-amber-700" /> Common Metrics
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {summary.industry_benchmarks_applied.common_traction_metrics.map((m, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium bg-white text-zinc-800 border border-zinc-200 px-1.5 py-0.5 rounded"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reference Decks List */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-zinc-700" /> Reference Pitch Decks In Dataset
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {benchmarks.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-zinc-200 rounded p-3 text-xs space-y-1 shadow-xs"
                >
                  <div className="flex items-center justify-between font-semibold text-zinc-900">
                    <span className="truncate max-w-[180px]" title={b.fileName}>
                      {b.fileName}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-800 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                      {b.industry_vertical}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">Stage: {b.funding_stage_guess}</p>
                  <p className="text-[11px] text-zinc-600 font-mono">
                    TAM: {b.tam_sam_som_figures.tam}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
