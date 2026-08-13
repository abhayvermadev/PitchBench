/**
 * PitchBench — AI Pitch Deck Generator & Investor Benchmark Engine
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { PipelineProgress } from './components/PipelineProgress';
import { SlideViewer } from './components/SlideViewer';
import { BenchmarkSummaryPanel } from './components/BenchmarkSummaryPanel';
import { PresentationModal } from './components/PresentationModal';
import { SampleDecksModal } from './components/SampleDecksModal';
import { SAMPLE_BENCHMARKS } from './data/sampleBenchmarks';
import {
  BenchmarkDeck,
  FileUploadStatus,
  GeneratedDeckData,
  PipelineStage,
  PitchSlide,
  InvestorCritique,
} from './types';
import { AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

export default function App() {
  // Input State
  const [businessIdea, setBusinessIdea] = useState<string>(
    'CognitiveDev is an autonomous AI developer agent that monitors GitHub repositories, automatically fixes complex software bugs, runs regression test suites, and drafts pull requests with 99% accuracy.'
  );
  const [targetAudience, setTargetAudience] = useState<string>(
    'Enterprise Software Engineering Orgs & Tech Leads'
  );
  const [industryVertical, setIndustryVertical] = useState<string>('AI/ML');

  // Grounding Data State (Default 10 Reference Decks)
  const [benchmarks, setBenchmarks] = useState<BenchmarkDeck[]>(SAMPLE_BENCHMARKS);
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadStatus[]>([]);

  // Pipeline Execution State
  const [currentStage, setCurrentStage] = useState<PipelineStage>('idle');
  const [generatedData, setGeneratedData] = useState<GeneratedDeckData | null>(null);
  const [isRegeneratingSlide, setIsRegeneratingSlide] = useState(false);
  const [regeneratingSlideNum, setRegeneratingSlideNum] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [showPresentation, setShowPresentation] = useState(false);
  const [showSampleDecks, setShowSampleDecks] = useState(false);

  // Load persisted dataset if available
  useEffect(() => {
    try {
      const savedBenchmarks = localStorage.getItem('pitchbench_benchmarks');
      if (savedBenchmarks) {
        const parsed = JSON.parse(savedBenchmarks);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBenchmarks(parsed);
        }
      }
      const savedDeck = localStorage.getItem('pitchbench_generated_deck');
      if (savedDeck) {
        setGeneratedData(JSON.parse(savedDeck));
      }
    } catch (e) {
      console.warn('LocalStorage restore note:', e);
    }
  }, []);

  // Save benchmarks to localStorage
  const saveBenchmarksToStorage = (newBenchmarks: BenchmarkDeck[]) => {
    setBenchmarks(newBenchmarks);
    try {
      localStorage.setItem('pitchbench_benchmarks', JSON.stringify(newBenchmarks));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  };

  // Handle PDF File Upload
  const handleFileUpload = async (filesList: FileList | File[]) => {
    const filesArray = Array.from(filesList);
    const pdfFiles = filesArray.filter(
      (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    );

    if (pdfFiles.length === 0) {
      alert('Please upload PDF pitch deck files.');
      return;
    }

    const newStatuses: FileUploadStatus[] = pdfFiles.map((file) => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: file.name,
      size: file.size,
      status: 'pending',
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newStatuses]);

    // Convert files to base64
    const payloadFiles = await Promise.all(
      pdfFiles.map((file) => {
        return new Promise<{ name: string; data: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ name: file.name, data: reader.result as string });
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      })
    );

    // Extract PDF benchmarks via backend API (Stage 1 for new files)
    try {
      setUploadedFiles((prev) =>
        prev.map((item) =>
          newStatuses.some((n) => n.name === item.name) ? { ...item, status: 'extracting' } : item
        )
      );

      const res = await fetch('/api/benchmark/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: payloadFiles }),
      });

      if (!res.ok) {
        throw new Error(`PDF extraction failed (${res.status})`);
      }

      const data = await res.json();
      const extractedList: BenchmarkDeck[] = data.extractedBenchmarks || [];

      // Update uploaded files status
      setUploadedFiles((prev) =>
        prev.map((item) => {
          const matched = extractedList.find((e) => e.fileName === item.name);
          if (matched) {
            return { ...item, status: 'done', extractedBenchmark: matched };
          }
          return item;
        })
      );

      // Add to main benchmark dataset
      if (extractedList.length > 0) {
        saveBenchmarksToStorage([...extractedList, ...benchmarks]);
      }
    } catch (err: any) {
      console.error('File extraction error:', err);
      setUploadedFiles((prev) =>
        prev.map((item) =>
          newStatuses.some((n) => n.name === item.name) ? { ...item, status: 'error' } : item
        )
      );
    }
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleLoadSampleDecks = () => {
    saveBenchmarksToStorage(SAMPLE_BENCHMARKS);
    alert('Loaded 10 reference benchmark pitch decks (Airbnb, Uber, Buffer, Stripe, Brex, Loom, HealthPulse, Verdant, Edify, CognitiveNode).');
  };

  // Full 3-Stage Pipeline Action
  const handleStartPipeline = async () => {
    setErrorMessage(null);
    setCurrentStage('extracting');

    try {
      // Stage 1 Check: Ensure benchmark dataset exists (from uploaded PDFs or pre-loaded reference decks)
      let activeBenchmarks = [...benchmarks];
      const pendingFiles = uploadedFiles.filter((f) => f.status === 'pending');

      if (pendingFiles.length > 0) {
        // Run extraction on pending files first
        // Already handled or can be processed
      }

      const extractedDoneCount = activeBenchmarks.length;

      // Stage 2: Deck Generation
      setCurrentStage('generating');
      const genRes = await fetch('/api/deck/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessIdea,
          targetAudience,
          industryVertical,
          benchmarks: activeBenchmarks,
        }),
      });

      if (!genRes.ok) {
        const errText = await genRes.text();
        throw new Error(`Deck generation error: ${errText}`);
      }

      const genData = await genRes.json();
      const generatedSlides: PitchSlide[] = genData.slides || [];
      const summary = genData.benchmark_summary;

      // Stage 3: Investor Critique
      setCurrentStage('critiquing');
      const critRes = await fetch('/api/deck/critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessIdea,
          targetAudience,
          industryVertical,
          slides: generatedSlides,
          benchmarks: activeBenchmarks,
        }),
      });

      if (!critRes.ok) {
        const errText = await critRes.text();
        throw new Error(`Investor critique error: ${errText}`);
      }

      const critData = await critRes.json();
      const critiques: InvestorCritique[] = critData.critiques || [];

      const fullResult: GeneratedDeckData = {
        slides: generatedSlides,
        critiques,
        benchmark_summary: summary,
      };

      setGeneratedData(fullResult);
      setCurrentStage('complete');

      try {
        localStorage.setItem('pitchbench_generated_deck', JSON.stringify(fullResult));
      } catch (e) {
        console.warn('LocalStorage deck save note:', e);
      }
    } catch (err: any) {
      console.error('Pipeline Execution Error:', err);
      setCurrentStage('error');
      setErrorMessage(err.message || 'An error occurred during pipeline execution.');
    }
  };

  // Slide Edit Handlers
  const [isApplyingFixSlideNum, setIsApplyingFixSlideNum] = useState<number | undefined>(undefined);
  const [isApplyingFixDeck, setIsApplyingFixDeck] = useState(false);

  // Auto-Apply VC Fix to Single Slide
  const handleApplyVcFixSingleSlide = async (slideNumber: number) => {
    if (!generatedData) return;

    const currentSlide = generatedData.slides.find((s) => s.slide_number === slideNumber);
    const critique = generatedData.critiques.find((c) => c.slide_number === slideNumber);
    if (!currentSlide) return;

    setIsApplyingFixSlideNum(slideNumber);

    try {
      const res = await fetch('/api/deck/apply-vc-fix-slide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slideNumber,
          currentSlide,
          critique,
          businessIdea,
          targetAudience,
          industryVertical,
          benchmarks,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `Failed to apply VC fix for slide #${slideNumber}`);
      }

      const data = await res.json();
      const updatedSlide: PitchSlide = data.slide;
      const updatedCritique: InvestorCritique = data.critique;

      const updatedSlides = generatedData.slides.map((s) =>
        s.slide_number === slideNumber ? updatedSlide : s
      );

      const updatedCritiques = generatedData.critiques.map((c) =>
        c.slide_number === slideNumber ? updatedCritique : c
      );

      const newData = {
        ...generatedData,
        slides: updatedSlides,
        critiques: updatedCritiques,
      };

      setGeneratedData(newData);
      try {
        localStorage.setItem('pitchbench_generated_deck', JSON.stringify(newData));
      } catch (e) {}
    } catch (err: any) {
      alert(`Error applying VC fix: ${err.message}`);
    } finally {
      setIsApplyingFixSlideNum(undefined);
    }
  };

  // Auto-Apply VC Fixes to Complete Slide Deck
  const handleApplyVcFixCompleteDeck = async () => {
    if (!generatedData) return;

    setIsApplyingFixDeck(true);

    try {
      const res = await fetch('/api/deck/apply-vc-fixes-deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessIdea,
          targetAudience,
          industryVertical,
          slides: generatedData.slides,
          critiques: generatedData.critiques,
          benchmarks,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to apply VC fixes to complete deck');
      }

      const data = await res.json();
      const updatedSlides: PitchSlide[] = data.slides || generatedData.slides;
      const updatedCritiques: InvestorCritique[] = data.critiques || generatedData.critiques;

      const newData = {
        ...generatedData,
        slides: updatedSlides,
        critiques: updatedCritiques,
      };

      setGeneratedData(newData);
      try {
        localStorage.setItem('pitchbench_generated_deck', JSON.stringify(newData));
      } catch (e) {}
    } catch (err: any) {
      alert(`Error applying VC fixes to complete deck: ${err.message}`);
    } finally {
      setIsApplyingFixDeck(false);
    }
  };

  const handleUpdateSlideContent = (
    slideNumber: number,
    newContent: string,
    newHeadline?: string
  ) => {
    if (!generatedData) return;

    const updatedSlides = generatedData.slides.map((s) => {
      if (s.slide_number === slideNumber) {
        return {
          ...s,
          detailed_content: newContent,
          headline: newHeadline !== undefined ? newHeadline : s.headline,
        };
      }
      return s;
    });

    const updatedData = { ...generatedData, slides: updatedSlides };
    setGeneratedData(updatedData);
    try {
      localStorage.setItem('pitchbench_generated_deck', JSON.stringify(updatedData));
    } catch (e) {}
  };

  // Regenerate Single Slide
  const handleRegenerateSlide = async (slideNumber: number, customInstructions?: string) => {
    if (!generatedData) return;

    const currentSlide = generatedData.slides.find((s) => s.slide_number === slideNumber);
    if (!currentSlide) return;

    setIsRegeneratingSlide(true);
    setRegeneratingSlideNum(slideNumber);

    try {
      const res = await fetch('/api/deck/regenerate-slide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slideNumber,
          currentSlide,
          businessIdea,
          targetAudience,
          industryVertical,
          benchmarks,
          userInstructions: customInstructions,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to regenerate slide #${slideNumber}`);
      }

      const data = await res.json();
      const updatedSlide: PitchSlide = data.slide;
      const updatedCritique: InvestorCritique = data.critique;

      const updatedSlides = generatedData.slides.map((s) =>
        s.slide_number === slideNumber ? updatedSlide : s
      );

      const updatedCritiques = generatedData.critiques.map((c) =>
        c.slide_number === slideNumber ? updatedCritique : c
      );

      const newData = {
        ...generatedData,
        slides: updatedSlides,
        critiques: updatedCritiques,
      };

      setGeneratedData(newData);
      try {
        localStorage.setItem('pitchbench_generated_deck', JSON.stringify(newData));
      } catch (e) {}
    } catch (err: any) {
      alert(`Error regenerating slide: ${err.message}`);
    } finally {
      setIsRegeneratingSlide(false);
      setRegeneratingSlideNum(undefined);
    }
  };

  const handleExportJSON = () => {
    if (!generatedData) return;
    const blob = new Blob([JSON.stringify(generatedData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PitchBench_${industryVertical}_Deck.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const extractedCount = benchmarks.length;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans flex flex-col selection:bg-zinc-900 selection:text-white">
      {/* Top Navbar */}
      <Header
        referenceCount={benchmarks.length}
        onOpenSampleDecks={() => setShowSampleDecks(true)}
        onStartPresentation={() => setShowPresentation(true)}
        onExportJSON={handleExportJSON}
        hasGeneratedDeck={!!generatedData}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Input Form Area */}
        <InputForm
          businessIdea={businessIdea}
          setBusinessIdea={setBusinessIdea}
          targetAudience={targetAudience}
          setTargetAudience={setTargetAudience}
          industryVertical={industryVertical}
          setIndustryVertical={setIndustryVertical}
          uploadedFiles={uploadedFiles}
          onFileUpload={handleFileUpload}
          onRemoveFile={handleRemoveFile}
          onLoadSampleDecks={handleLoadSampleDecks}
          onStartPipeline={handleStartPipeline}
          isProcessing={currentStage === 'extracting' || currentStage === 'generating' || currentStage === 'critiquing'}
        />

        {/* Pipeline Execution Progress Indicator */}
        <PipelineProgress
          currentStage={currentStage}
          fileCount={uploadedFiles.length || benchmarks.length}
          extractedCount={extractedCount}
        />

        {/* Error Banner if Pipeline Fails */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-800 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <div>
              <p className="font-semibold">Pipeline Execution Issue</p>
              <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Generated Pitch Deck Output Workspace */}
        {generatedData && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-zinc-700" />
                <span>Generated 10-Slide Pitch Deck</span>
              </h2>
              <span className="text-xs text-zinc-500 font-mono">
                Grounded in {benchmarks.length} reference pitch decks
              </span>
            </div>

            {/* Slide Editor & Investor Critique View */}
            <SlideViewer
              slides={generatedData.slides}
              critiques={generatedData.critiques}
              onUpdateSlideContent={handleUpdateSlideContent}
              onRegenerateSlide={handleRegenerateSlide}
              onApplyVcFixSingleSlide={handleApplyVcFixSingleSlide}
              onApplyVcFixCompleteDeck={handleApplyVcFixCompleteDeck}
              isRegeneratingSlide={isRegeneratingSlide}
              regeneratingSlideNum={regeneratingSlideNum}
              isApplyingFixSlideNum={isApplyingFixSlideNum}
              isApplyingFixDeck={isApplyingFixDeck}
            />

            {/* Transparency Summary Panel */}
            <BenchmarkSummaryPanel
              summary={generatedData.benchmark_summary}
              benchmarks={benchmarks}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500 font-medium">
        <p>© 2024 PitchBench Analytics — Grounded AI Pitch Deck Generation & Investor Benchmark Engine</p>
      </footer>

      {/* Presentation Fullscreen Modal */}
      {showPresentation && generatedData && (
        <PresentationModal
          slides={generatedData.slides}
          onClose={() => setShowPresentation(false)}
        />
      )}

      {/* Sample Reference Decks Modal */}
      {showSampleDecks && (
        <SampleDecksModal
          benchmarks={benchmarks}
          onClose={() => setShowSampleDecks(false)}
        />
      )}
    </div>
  );
}
