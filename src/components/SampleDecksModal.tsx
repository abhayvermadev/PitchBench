import React from 'react';
import { X, Layers, FileText, Eye, Target, TrendingUp, CheckCircle2 } from 'lucide-react';
import { BenchmarkDeck } from '../types';

interface SampleDecksModalProps {
  benchmarks: BenchmarkDeck[];
  onClose: () => void;
  onViewReferenceDeck?: (deck: BenchmarkDeck) => void;
}

export const SampleDecksModal: React.FC<SampleDecksModalProps> = ({
  benchmarks,
  onClose,
  onViewReferenceDeck,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-zinc-100 text-zinc-800 border border-zinc-200">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Reference Pitch Decks in Dataset ({benchmarks.length})
              </h2>
              <p className="text-xs text-zinc-500">
                Grounding dataset used by Gemini to benchmark TAM, SAM, SOM, metrics, and asks. Click any card to inspect full slides.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors border border-zinc-200 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* List of Decks */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-[#FAFAFA]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benchmarks.map((deck) => (
              <div
                key={deck.id}
                onClick={() => {
                  if (onViewReferenceDeck) {
                    onViewReferenceDeck(deck);
                  }
                }}
                className="bg-white border border-zinc-200 rounded-lg p-4 space-y-3 hover:border-zinc-500 hover:shadow-md transition-all shadow-xs cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="h-4 w-4 text-zinc-600 shrink-0 group-hover:text-black" />
                      <span
                        className="font-bold text-xs text-zinc-900 truncate"
                        title={deck.company_name || deck.fileName}
                      >
                        {deck.company_name || deck.fileName}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 shrink-0">
                      {deck.industry_vertical}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-zinc-400 font-medium">Stage & Ask:</span>
                      <p className="font-semibold text-zinc-800">{deck.funding_stage_guess}</p>
                    </div>
                    <div>
                      <span className="text-zinc-400 font-medium">TAM Sizing:</span>
                      <p className="font-semibold text-zinc-800 truncate" title={deck.tam_sam_som_figures.tam}>
                        {deck.tam_sam_som_figures.tam}
                      </p>
                    </div>
                  </div>

                  {deck.traction_metrics_mentioned?.length > 0 && (
                    <div className="text-[11px] space-y-1">
                      <span className="text-zinc-400 font-medium">Key Traction Signals:</span>
                      <div className="flex flex-wrap gap-1">
                        {deck.traction_metrics_mentioned.slice(0, 3).map((t, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[10px] border border-zinc-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="text-[10px] font-mono">{deck.slide_count} Slides</span>
                  <span className="inline-flex items-center gap-1 text-black font-semibold text-xs group-hover:underline">
                    <Eye className="h-3.5 w-3.5" /> Inspect Deck
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-black hover:bg-zinc-800 text-xs font-semibold text-white transition-colors shadow-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
