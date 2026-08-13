import React, { useState, useEffect } from 'react';
import { PitchSlide } from '../types';
import { X, ChevronLeft, ChevronRight, Presentation, Maximize2 } from 'lucide-react';

interface PresentationModalProps {
  slides: PitchSlide[];
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ slides, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onClose]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-[#FAFAFA] flex flex-col justify-between p-6 md:p-12 text-zinc-900">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Presentation className="h-5 w-5 text-zinc-700" />
          <span className="text-xs font-bold tracking-wider font-mono uppercase text-zinc-700">
            PitchBench Investor Presentation
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono font-bold bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full border border-zinc-200">
            Slide {currentIndex + 1} of {slides.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors border border-zinc-200"
            title="Exit Presentation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slide Body Stage */}
      <div className="my-auto max-w-5xl mx-auto w-full bg-white border border-zinc-200 rounded-lg p-8 sm:p-14 shadow-md space-y-8 min-h-[480px] flex flex-col justify-center">
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
            {currentSlide.slide_name}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-900 leading-tight">
            {currentSlide.headline}
          </h1>
        </div>

        {/* Detailed Points */}
        <div className="space-y-4 text-zinc-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans border-t border-b border-zinc-200 py-6">
          {currentSlide.detailed_content}
        </div>

        {/* Numeric Highlights */}
        {currentSlide.numeric_claims && currentSlide.numeric_claims.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-2">
            {currentSlide.numeric_claims.map((claim, idx) => (
              <div
                key={idx}
                className="bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded text-xs space-y-0.5"
              >
                <span className="text-zinc-500 uppercase font-bold text-[10px]">
                  {claim.metric}
                </span>
                <p className="text-sm font-bold font-mono text-zinc-900">{claim.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Bar Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-200 max-w-5xl mx-auto w-full">
        <span className="text-xs text-zinc-500 font-mono">
          Use ← Left / Right → keys or click to navigate slides
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-medium"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentIndex === slides.length - 1}
            className="px-5 py-2 rounded bg-black hover:bg-zinc-800 text-white disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-semibold shadow-xs"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
