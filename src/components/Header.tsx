import React from 'react';
import { Presentation, ShieldCheck, Sparkles, FolderOpen, Download } from 'lucide-react';

interface HeaderProps {
  referenceCount: number;
  onOpenSampleDecks: () => void;
  onStartPresentation: () => void;
  onExportJSON: () => void;
  hasGeneratedDeck: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  referenceCount,
  onOpenSampleDecks,
  onStartPresentation,
  onExportJSON,
  hasGeneratedDeck,
}) => {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-40 px-4 lg:px-8 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Engine Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center relative shrink-0">
            <Presentation className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 font-sans">
                PitchBench
              </h1>
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Engine: Gemini 1.5 Pro</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500">
              Transform ideas into benchmarked, investor-ready 10-slide pitch decks
            </p>
          </div>
        </div>

        {/* Action Controls & Reference Counter */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onOpenSampleDecks}
            className="flex items-center gap-2 px-3.5 py-2 rounded text-xs font-medium bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 transition-colors"
            title="Inspect loaded benchmark reference decks"
          >
            <FolderOpen className="h-3.5 w-3.5 text-zinc-500" />
            <span>Reference Decks ({referenceCount})</span>
          </button>

          {hasGeneratedDeck && (
            <>
              <button
                onClick={onStartPresentation}
                className="flex items-center gap-2 px-5 py-2 rounded text-xs font-medium bg-black text-white hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
                <span>Present Deck</span>
              </button>

              <button
                onClick={onExportJSON}
                className="flex items-center gap-2 px-3.5 py-2 rounded text-xs font-medium bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-zinc-500" />
                <span>Export</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
