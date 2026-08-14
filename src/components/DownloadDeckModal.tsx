import React, { useState } from 'react';
import {
  Download,
  FileCode,
  FileText,
  FileJson,
  Printer,
  X,
  CheckCircle2,
  Sparkles,
  Layers,
  Presentation,
  FileSpreadsheet,
  Loader2,
} from 'lucide-react';
import { GeneratedDeckData } from '../types';
import {
  downloadPDFDeck,
  downloadPPTXDeck,
  downloadHTMLPresentation,
  downloadMarkdownDeck,
  downloadTextMemo,
  downloadJSONDeck,
} from '../utils/exportDeck';

interface DownloadDeckModalProps {
  data: GeneratedDeckData;
  businessIdea: string;
  industryVertical: string;
  targetAudience?: string;
  onClose: () => void;
  onPresentDeck?: () => void;
}

export const DownloadDeckModal: React.FC<DownloadDeckModalProps> = ({
  data,
  businessIdea,
  industryVertical,
  targetAudience,
  onClose,
  onPresentDeck,
}) => {
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  const handleDownload = async (format: 'pdf' | 'pptx' | 'html' | 'md' | 'txt' | 'json' | 'print') => {
    setDownloadingFormat(format);
    try {
      if (format === 'pdf') {
        downloadPDFDeck(data, businessIdea, industryVertical, targetAudience);
      } else if (format === 'pptx') {
        await downloadPPTXDeck(data, businessIdea, industryVertical, targetAudience);
      } else if (format === 'html') {
        downloadHTMLPresentation(data, businessIdea, industryVertical, targetAudience);
      } else if (format === 'md') {
        downloadMarkdownDeck(data, businessIdea, industryVertical, targetAudience);
      } else if (format === 'txt') {
        downloadTextMemo(data, businessIdea, industryVertical, targetAudience);
      } else if (format === 'json') {
        downloadJSONDeck(data, businessIdea, industryVertical, targetAudience);
      } else if (format === 'print') {
        window.print();
      }

      setDownloadedFormat(format);
      setTimeout(() => setDownloadedFormat(null), 3000);
    } catch (err) {
      console.error('Error generating download file:', err);
    } finally {
      setDownloadingFormat(null);
    }
  };

  const options = [
    {
      id: 'pdf',
      title: 'Direct PDF Slide Deck',
      extension: '.pdf',
      badge: 'Direct PDF',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      description:
        'Download instant 16:9 widescreen PDF with formatted typography, peer metric benchmark comparisons, visual layouts, and resolved investor defense notes.',
      icon: FileText,
      actionText: 'Download PDF (.pdf)',
      isHero: true,
    },
    {
      id: 'pptx',
      title: 'PowerPoint Slide Deck',
      extension: '.pptx',
      badge: 'PowerPoint',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
      description:
        'Download native 16:9 Microsoft PowerPoint presentation with editable slides, styled metric tables, visual cues, and built-in speaker notes for every slide.',
      icon: Presentation,
      actionText: 'Download PPT (.pptx)',
      isHero: true,
    },
    {
      id: 'html',
      title: 'Interactive Presentation Web Package',
      extension: '.html',
      badge: 'Standalone HTML',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description:
        'Self-contained 16:9 interactive slide deck. Opens in any browser offline with arrow key navigation, fullscreen mode, dark aesthetic, and print-to-PDF styles.',
      icon: Presentation,
      actionText: 'Download HTML (.html)',
    },
    {
      id: 'md',
      title: 'Markdown Document',
      extension: '.md',
      badge: 'Notion & Docs',
      badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
      description:
        'Formatted markdown pitch deck with structured headings, key bullets, metrics tables, and investor defense notes. Ready for Notion, Obsidian, or GitHub.',
      icon: FileCode,
      actionText: 'Download Markdown (.md)',
    },
    {
      id: 'txt',
      title: 'Executive Investor Pitch Memo',
      extension: '.txt',
      badge: 'Email / Memo',
      badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
      description:
        'Clean plain-text executive pitch memo. Ideal for emailing to prospective angel investors, VC partners, and advisors.',
      icon: FileCode,
      actionText: 'Download Memo (.txt)',
    },
    {
      id: 'json',
      title: 'Structured JSON Dataset',
      extension: '.json',
      badge: 'Data & Schema',
      badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
      description:
        'Raw structured pitch deck JSON including all 10 slides, numeric benchmark comparisons, and investor critique defenses for developer workflows.',
      icon: FileJson,
      actionText: 'Download JSON (.json)',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-black text-white">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-zinc-900">Download Slide Deck</h2>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200">
                  {industryVertical || 'Institutional'} Vertical
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Download your benchmark-grounded 10-slide pitch deck directly as PDF, PowerPoint PPTX, or other formats.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors border border-zinc-200 cursor-pointer"
            title="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-140px)]">
          {/* Direct Quick Actions Bar */}
          <div className="bg-zinc-950 text-white rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">Direct Presentation Downloads</span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                10-slide pitch deck formatted in 16:9 widescreen layout with speaking notes and verified peer metrics.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => handleDownload('pdf')}
                disabled={downloadingFormat === 'pdf'}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              >
                {downloadingFormat === 'pdf' ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : downloadedFormat === 'pdf' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Download className="h-3.5 w-3.5 text-red-600" />
                )}
                <span>{downloadedFormat === 'pdf' ? 'Downloaded PDF!' : 'Download PDF'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('pptx')}
                disabled={downloadingFormat === 'pptx'}
                className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-zinc-700 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              >
                {downloadingFormat === 'pptx' ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : downloadedFormat === 'pptx' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Download className="h-3.5 w-3.5 text-orange-400" />
                )}
                <span>{downloadedFormat === 'pptx' ? 'Downloaded PPT!' : 'Download PPT'}</span>
              </button>
            </div>
          </div>

          {/* Quick Deck Info Banner */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Layers className="h-4 w-4 text-zinc-600 shrink-0" />
              <div>
                <span className="font-semibold text-zinc-900">10 Grounded Slides Ready</span>
                <span className="text-zinc-500 text-[11px] block">
                  Includes {data.critiques?.filter((c) => c.is_fixed || c.severity === 'fixed').length || 0} reinforced investor defenses
                </span>
              </div>
            </div>

            {onPresentDeck && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onPresentDeck();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 transition-colors shrink-0 cursor-pointer"
              >
                <Presentation className="h-3.5 w-3.5 text-zinc-700" />
                <span>Present Live</span>
              </button>
            )}
          </div>

          {/* Download Options List */}
          <div className="space-y-2.5">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isDone = downloadedFormat === opt.id;
              const isBusy = downloadingFormat === opt.id;

              return (
                <div
                  key={opt.id}
                  className={`bg-white border rounded-lg p-3.5 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 group ${
                    opt.isHero
                      ? 'border-zinc-300 hover:border-zinc-900 bg-zinc-50/40'
                      : 'border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 border ${
                        opt.id === 'pdf'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : opt.id === 'pptx'
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : 'bg-zinc-100 text-zinc-800 border-zinc-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xs font-bold text-zinc-900">{opt.title}</h3>
                        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${opt.badgeColor}`}>
                          {opt.badge}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">{opt.extension}</span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed pr-2">
                        {opt.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownload(opt.id as any)}
                    disabled={isBusy}
                    className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      opt.id === 'pdf'
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                        : opt.id === 'pptx'
                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
                        : opt.id === 'html'
                        ? 'bg-black hover:bg-zinc-800 text-white shadow-xs'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300'
                    }`}
                  >
                    {isBusy ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : isDone ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                        <span>Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-3.5 w-3.5" />
                        <span>{opt.actionText}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick Print Action */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => handleDownload('print')}
              className="w-full py-2 px-4 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 border border-zinc-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-zinc-600" />
              <span>Print or Save to PDF via Browser Dialog</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500 font-mono">
            PitchBench • Grounded in {data.slides.length} Institutional Slides
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-xs font-semibold text-zinc-700 border border-zinc-300 transition-colors shadow-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
