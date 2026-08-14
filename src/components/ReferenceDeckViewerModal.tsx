import React, { useState } from 'react';
import {
  X,
  Layers,
  FileText,
  Building2,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { BenchmarkDeck } from '../types';

interface ReferenceDeckViewerModalProps {
  deck: BenchmarkDeck | null;
  onClose: () => void;
}

export const ReferenceDeckViewerModal: React.FC<ReferenceDeckViewerModalProps> = ({
  deck,
  onClose,
}) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  if (!deck) return null;

  const slides = deck.deck_slides || [];
  const hasSlides = slides.length > 0;
  const currentSlide = hasSlides ? slides[activeSlideIdx] : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-zinc-800 text-emerald-400 border border-zinc-700">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {deck.company_name || deck.fileName.replace(/\.pdf$/i, '').replace(/_/g, ' ')}
                </h2>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {deck.industry_vertical}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {deck.funding_stage_guess}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                Source: {deck.fileName} • {deck.slide_count} Slides In Dataset
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-zinc-700 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]">
          {/* Top Quick Facts Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* TAM / SAM / SOM Card */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <Target className="h-3.5 w-3.5 text-zinc-700" /> Market Sizing (TAM/SAM/SOM)
              </span>
              <div className="text-xs space-y-1 font-mono">
                <p className="text-zinc-900 font-bold">TAM: {deck.tam_sam_som_figures.tam}</p>
                <p className="text-zinc-600 text-[11px]">SAM: {deck.tam_sam_som_figures.sam}</p>
                <p className="text-zinc-600 text-[11px]">SOM: {deck.tam_sam_som_figures.som}</p>
              </div>
            </div>

            {/* Target Customers & Model */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5 text-zinc-700" /> Monetization & Customers
              </span>
              <div className="text-xs space-y-1 text-zinc-800">
                <p className="font-semibold text-zinc-900">
                  {deck.business_model_summary || 'Standard Recurring SaaS / Transaction Spread'}
                </p>
                <p className="text-[11px] text-zinc-500">
                  Target: {deck.target_customers || 'High-Growth Tech Startups & Enterprises'}
                </p>
              </div>
            </div>

            {/* Valuation & Capital Ask */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-emerald-700" /> Valuation & Round Ask
              </span>
              <div className="text-xs space-y-1">
                <p className="font-bold text-emerald-900 font-mono">
                  {deck.valuation_or_ask || deck.funding_stage_guess}
                </p>
                <p className="text-[11px] text-zinc-500">
                  Slide Count: <span className="font-medium text-zinc-800">{deck.slide_count} slides</span>
                </p>
              </div>
            </div>
          </div>

          {/* Traction Metrics & Notable Claims Chips */}
          <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-3 shadow-xs">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-zinc-700" />
                Extracted Ground-Truth Traction Metrics & KPIs
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {deck.traction_metrics_mentioned.map((metric, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2.5 py-1 rounded bg-zinc-100 text-zinc-900 border border-zinc-200"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    {metric}
                  </span>
                ))}
              </div>
            </div>

            {deck.notable_claims && deck.notable_claims.length > 0 && (
              <div className="pt-3 border-t border-zinc-100">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Notable Investment Thesis Claims
                </h4>
                <ul className="mt-1.5 space-y-1 text-xs text-zinc-700">
                  {deck.notable_claims.map((claim, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-zinc-400 font-bold">•</span>
                      <span>{claim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Detailed Slide Breakdown Section */}
          <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                <Layers className="h-4 w-4 text-zinc-700" />
                <span>Reference Pitch Deck Slide Breakdown</span>
              </h3>

              {hasSlides && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-zinc-500">
                    Slide {activeSlideIdx + 1} of {slides.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveSlideIdx((p) => Math.max(0, p - 1))}
                      disabled={activeSlideIdx === 0}
                      className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 disabled:opacity-30 border border-zinc-200"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveSlideIdx((p) => Math.min(slides.length - 1, p + 1))}
                      disabled={activeSlideIdx === slides.length - 1}
                      className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 disabled:opacity-30 border border-zinc-200"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {hasSlides && currentSlide ? (
              <div className="space-y-4">
                {/* Slide Pills Navigation */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  {slides.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIdx(idx)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                        idx === activeSlideIdx
                          ? 'bg-black text-white font-semibold'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-60">#{s.slide_number}</span>
                      <span>{s.title}</span>
                    </button>
                  ))}
                </div>

                {/* Active Slide Viewer Card */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase bg-white px-2 py-0.5 rounded border border-zinc-200 text-zinc-800">
                      Slide #{currentSlide.slide_number}
                    </span>
                    <span className="text-xs font-bold text-zinc-900">{currentSlide.title}</span>
                  </div>

                  <p className="text-xs text-zinc-800 leading-relaxed font-medium bg-white p-3 rounded border border-zinc-200">
                    "{currentSlide.key_content}"
                  </p>

                  {currentSlide.bullet_points && currentSlide.bullet_points.length > 0 && (
                    <ul className="space-y-1 text-xs text-zinc-700 bg-white p-3 rounded border border-zinc-200">
                      {currentSlide.bullet_points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-zinc-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    {currentSlide.metrics_or_data && (
                      <div className="bg-emerald-50/70 border border-emerald-200 p-2.5 rounded text-emerald-950">
                        <span className="font-bold block text-[10px] uppercase tracking-wider text-emerald-800">
                          Key Slide Metric:
                        </span>
                        <span className="font-mono font-semibold">{currentSlide.metrics_or_data}</span>
                      </div>
                    )}
                    {currentSlide.visual_description && (
                      <div className="bg-zinc-100 border border-zinc-200 p-2.5 rounded text-zinc-800">
                        <span className="font-bold block text-[10px] uppercase tracking-wider text-zinc-500">
                          Slide Visual Layout:
                        </span>
                        <span>{currentSlide.visual_description}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* If no full slide breakdowns exist, show the table of contents */
              <div className="space-y-2">
                <p className="text-xs text-zinc-500">
                  Extracted section topics present in this reference pitch deck:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {deck.slide_topics_present.map((topic, i) => (
                    <div
                      key={i}
                      className="bg-zinc-50 border border-zinc-200 rounded p-2 text-xs font-medium text-zinc-800 flex items-center gap-2"
                    >
                      <span className="font-mono text-[10px] text-zinc-400">#{i + 1}</span>
                      <span className="truncate">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Active reference deck in Gemini pitch grounding pipeline</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-black hover:bg-zinc-800 text-xs font-semibold text-white transition-colors shadow-xs cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
