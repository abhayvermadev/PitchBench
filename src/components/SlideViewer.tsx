import React, { useState } from 'react';
import {
  RefreshCw,
  Edit3,
  Check,
  AlertCircle,
  TrendingUp,
  Presentation,
  Grid,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  Loader2,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { PitchSlide, InvestorCritique } from '../types';
import { InvestorCritiqueCard } from './InvestorCritiqueCard';

interface SlideViewerProps {
  slides: PitchSlide[];
  critiques: InvestorCritique[];
  investorPersona?: string;
  onUpdateSlideContent: (slideNumber: number, newContent: string, newHeadline?: string) => void;
  onRegenerateSlide: (slideNumber: number, customInstructions?: string) => void;
  onApplyVcFixSingleSlide?: (slideNumber: number) => void;
  onApplyVcFixCompleteDeck?: () => void;
  onOpenDownloadModal?: () => void;
  onDirectDownloadPDF?: () => void;
  onDirectDownloadPPT?: () => void;
  onPresentDeck?: () => void;
  isRegeneratingSlide: boolean;
  regeneratingSlideNum?: number;
  isApplyingFixSlideNum?: number;
  isApplyingFixDeck?: boolean;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  slides,
  critiques,
  investorPersona,
  onUpdateSlideContent,
  onRegenerateSlide,
  onApplyVcFixSingleSlide,
  onApplyVcFixCompleteDeck,
  onOpenDownloadModal,
  onDirectDownloadPDF,
  onDirectDownloadPPT,
  onPresentDeck,
  isRegeneratingSlide,
  regeneratingSlideNum,
  isApplyingFixSlideNum,
  isApplyingFixDeck = false,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'focused' | 'grid'>('focused');
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [regenPrompt, setRegenPrompt] = useState('');

  if (!slides || slides.length === 0) {
    return (
      <div className="bg-white border border-zinc-200 rounded-lg p-12 text-center text-zinc-500">
        <Presentation className="h-10 w-10 mx-auto text-zinc-400 mb-3" />
        <p className="text-sm font-medium text-zinc-700">No slides generated yet.</p>
        <p className="text-xs text-zinc-400 mt-1">Fill out the inputs above and click "Generate My Pitch Deck".</p>
      </div>
    );
  }

  const currentSlide = slides[activeSlideIndex];
  const currentCritique = critiques?.find((c) => c.slide_number === currentSlide?.slide_number);

  const triggerRegen = () => {
    if (!currentSlide) return;
    onRegenerateSlide(currentSlide.slide_number, regenPrompt);
    setShowRegenModal(false);
    setRegenPrompt('');
  };

  return (
    <div className="space-y-6">
      {/* Deck-Wide Investor Defense Action Banner */}
      {onApplyVcFixCompleteDeck && (
        <div className="bg-zinc-900 text-white rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm border border-zinc-800">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Complete Deck VC Optimization
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono font-medium">
                  AI Investor Defense
                </span>
                {investorPersona && (
                  <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px] px-2 py-0.5 rounded font-medium">
                    Lens: {investorPersona}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-300">
                Auto-apply all investor critiques and defense recommendations across all 10 slides simultaneously.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onApplyVcFixCompleteDeck}
            disabled={isApplyingFixDeck}
            className="shrink-0 px-4 py-2 rounded bg-white hover:bg-zinc-100 disabled:bg-zinc-200 text-zinc-900 disabled:text-zinc-500 text-xs font-bold flex items-center gap-2 transition-colors shadow-xs border border-zinc-200 cursor-pointer disabled:cursor-not-allowed"
          >
            {isApplyingFixDeck ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-800" />
                <span>Updating All 10 Slides with VC Fixes...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-zinc-900" />
                <span>Auto-Apply VC Fixes to Complete Slide Deck</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Slide Navigation Tabs & View Mode Toggle */}
      <div className="bg-white border border-zinc-200 rounded-lg p-3 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Slide Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
          {slides.map((s, idx) => (
            <button
              key={s.slide_number}
              onClick={() => setActiveSlideIndex(idx)}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                idx === activeSlideIndex
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 border border-zinc-200'
              }`}
            >
              <span className="font-mono text-[10px] opacity-60">#{s.slide_number}</span>
              <span>{s.slide_name}</span>
            </button>
          ))}
        </div>

        {/* View and Export Toggles */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <div className="flex items-center bg-zinc-100 p-0.5 rounded border border-zinc-200">
            <button
              onClick={() => setViewMode('focused')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'focused'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>Focus</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Grid className="h-3 w-3" />
              <span>Overview</span>
            </button>
          </div>

          {onPresentDeck && (
            <button
              type="button"
              onClick={onPresentDeck}
              className="px-2.5 py-1.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Enter full-screen live presentation mode"
            >
              <Presentation className="h-3.5 w-3.5 text-zinc-700" />
              <span>Present</span>
            </button>
          )}

          {onDirectDownloadPDF && (
            <button
              type="button"
              onClick={onDirectDownloadPDF}
              className="px-2.5 py-1.5 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download direct 16:9 PDF presentation"
            >
              <Download className="h-3.5 w-3.5 text-red-600" />
              <span>PDF</span>
            </button>
          )}

          {onDirectDownloadPPT && (
            <button
              type="button"
              onClick={onDirectDownloadPPT}
              className="px-2.5 py-1.5 rounded bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download direct Microsoft PowerPoint presentation (.pptx)"
            >
              <Download className="h-3.5 w-3.5 text-orange-600" />
              <span>PPT</span>
            </button>
          )}

          {onOpenDownloadModal && (
            <button
              type="button"
              onClick={onOpenDownloadModal}
              className="px-3 py-1.5 rounded bg-black hover:bg-zinc-800 text-white text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              title="Open full download menu (PDF, PPT, HTML, Markdown, JSON, Memo)"
            >
              <Download className="h-3.5 w-3.5 text-white" />
              <span>All Formats</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Overview View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {slides.map((s, idx) => {
            const crit = critiques?.find((c) => c.slide_number === s.slide_number);
            return (
              <div
                key={s.slide_number}
                onClick={() => {
                  setActiveSlideIndex(idx);
                  setViewMode('focused');
                }}
                className="bg-white border border-zinc-200 hover:border-zinc-400 rounded-lg p-5 cursor-pointer transition-all shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <span className="text-xs font-mono font-bold text-zinc-900">
                    Slide #{s.slide_number}
                  </span>
                  <span className="text-xs font-semibold text-zinc-700">{s.slide_name}</span>
                </div>
                <h4 className="text-sm font-serif font-semibold text-zinc-900 line-clamp-2">{s.headline}</h4>
                <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">{s.detailed_content}</p>

                {crit && (
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500 font-medium">Investor Status:</span>
                    {crit.is_fixed || crit.severity === 'fixed' ? (
                      <span className="font-semibold px-2 py-0.5 rounded text-[10px] uppercase border bg-emerald-50 text-emerald-700 border-emerald-300 flex items-center gap-1">
                        <Check className="h-3 w-3 text-emerald-600" />
                        Slide Fixed
                      </span>
                    ) : (
                      <span
                        className={`font-semibold px-2 py-0.5 rounded text-[10px] uppercase border ${
                          crit.severity === 'high'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : crit.severity === 'medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                        }`}
                      >
                        {crit.severity} risk
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Focus Mode: Slide Editor + Investor Critique Side-by-Side */}
      {viewMode === 'focused' && currentSlide && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editable Slide Card (2 Columns) */}
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-lg p-6 sm:p-8 shadow-xs space-y-6">
            {/* Slide Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-zinc-100 text-zinc-900 px-2.5 py-0.5 rounded border border-zinc-200">
                    Slide {currentSlide.slide_number} / 10
                  </span>
                  <h2 className="text-base font-bold text-zinc-900">{currentSlide.slide_name}</h2>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  Suggested Visual: <span className="text-zinc-700 font-medium">{currentSlide.suggested_visual}</span>
                </p>
              </div>

              {/* Prev/Next & Regenerate */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeSlideIndex === 0}
                  className="p-1.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 disabled:opacity-40 transition-colors border border-zinc-200"
                  title="Previous Slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
                  disabled={activeSlideIndex === slides.length - 1}
                  className="p-1.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 disabled:opacity-40 transition-colors border border-zinc-200"
                  title="Next Slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowRegenModal(true)}
                  disabled={isRegeneratingSlide}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-black text-white text-xs font-medium transition-colors"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${
                      isRegeneratingSlide && regeneratingSlideNum === currentSlide.slide_number
                        ? 'animate-spin text-zinc-300'
                        : ''
                    }`}
                  />
                  <span>Regenerate Slide</span>
                </button>
              </div>
            </div>

            {/* Editable Headline */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Edit3 className="h-3.5 w-3.5 text-zinc-600" /> Slide Headline
              </label>
              <input
                type="text"
                value={currentSlide.headline}
                onChange={(e) => onUpdateSlideContent(currentSlide.slide_number, currentSlide.detailed_content, e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded p-3 text-lg font-serif font-bold text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Editable Content Text Area */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                <span>Slide Content & Story (Editable)</span>
                <span className="text-[10px] text-zinc-400 lowercase font-normal">Supports text editing</span>
              </label>
              <textarea
                value={currentSlide.detailed_content}
                onChange={(e) => onUpdateSlideContent(currentSlide.slide_number, e.target.value)}
                rows={7}
                className="w-full bg-white border border-zinc-200 rounded p-3.5 text-xs text-zinc-800 leading-relaxed font-sans focus:outline-none focus:ring-1 focus:ring-black resize-y"
              />
            </div>

            {/* Numeric Claims Grounding Badges */}
            {currentSlide.numeric_claims && currentSlide.numeric_claims.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-zinc-200">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-zinc-700" />
                  Grounded Numeric Benchmarks
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentSlide.numeric_claims.map((claim, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded border text-xs space-y-1.5 ${
                        claim.within_benchmark_range
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50/60 border-amber-200 text-amber-950'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-zinc-900">{claim.metric}:</span>
                        <span className="font-mono font-bold text-xs text-zinc-900">{claim.value}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        {claim.within_benchmark_range ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                            <Check className="h-3 w-3" /> Within Benchmark Range
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                            <AlertCircle className="h-3 w-3" /> Benchmark Outlier
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-tight">
                        {claim.benchmark_comparison_note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Investor Critique Callout */}
          <div className="space-y-4">
            <InvestorCritiqueCard
              critique={currentCritique}
              onApplyFix={
                onApplyVcFixSingleSlide
                  ? () => onApplyVcFixSingleSlide(currentSlide.slide_number)
                  : undefined
              }
              isApplyingFix={isApplyingFixSlideNum === currentSlide.slide_number}
            />
          </div>
        </div>
      )}

      {/* Regenerate Slide Custom Instructions Modal */}
      {showRegenModal && currentSlide && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-lg max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-zinc-700" />
              Regenerate Slide #{currentSlide.slide_number} ({currentSlide.slide_name})
            </h3>
            <p className="text-xs text-zinc-500">
              Re-run Gemini AI generation for this slide against the grounding benchmarks. Optional: Provide custom instructions or focus areas.
            </p>

            <textarea
              value={regenPrompt}
              onChange={(e) => setRegenPrompt(e.target.value)}
              placeholder="e.g. Make TAM more conservative, highlight B2B expansion revenue, add unit economics detail..."
              rows={3}
              className="w-full bg-white border border-zinc-300 rounded p-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-black"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRegenModal(false)}
                className="px-3.5 py-1.5 rounded text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={triggerRegen}
                className="px-4 py-1.5 rounded text-xs font-medium bg-black hover:bg-zinc-800 text-white flex items-center gap-1.5 shadow-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Re-draft Slide</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
