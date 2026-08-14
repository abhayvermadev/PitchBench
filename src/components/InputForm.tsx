import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  Trash2,
  FileCheck,
  Building2,
  Users,
  Lightbulb,
  Layers,
  AlertCircle,
} from 'lucide-react';
import { FileUploadStatus } from '../types';

interface InputFormProps {
  businessIdea: string;
  setBusinessIdea: (val: string) => void;
  targetAudience: string;
  setTargetAudience: (val: string) => void;
  industryVertical: string;
  setIndustryVertical: (val: string) => void;
  uploadedFiles: FileUploadStatus[];
  onFileUpload: (files: FileList | File[]) => void;
  onRemoveFile: (id: string) => void;
  onLoadSampleDecks: () => void;
  onStartPipeline: () => void;
  isProcessing: boolean;
}

const INDUSTRY_VERTICALS = [
  'SaaS',
  'Fintech',
  'HealthTech',
  'AI/ML',
  'E-commerce',
  'CleanTech',
  'EdTech',
  'Marketplace',
  'Consumer Tech',
  'DeepTech',
  'BioTech',
  'Cybersecurity',
  'B2B Enterprise',
];

const PRESETS = [
  {
    title: 'CognitiveDev - AI Code Agent',
    vertical: 'AI/ML',
    audience: 'Enterprise Software Engineering Orgs & Tech Leads',
    idea: 'CognitiveDev is an autonomous AI developer agent that monitors GitHub repositories, automatically fixes complex software bugs, runs regression test suites, and drafts pull requests with 99% accuracy. Monetized via per-seat + usage token model.',
  },
  {
    title: 'PayStream - Global B2B Payments',
    vertical: 'Fintech',
    audience: 'Cross-border E-commerce Platforms & Global SaaS Exporters',
    idea: 'PayStream provides instant zero-fee cross-border treasury settlements for B2B exporters using automated FX smart routing. Reduces international payment fees from 3.5% down to 0.2% while providing real-time multi-currency virtual IBANs.',
  },
  {
    title: 'PulseCare - Remote Cardiac Monitoring',
    vertical: 'HealthTech',
    audience: 'Cardiology Practices & Healthcare Systems',
    idea: 'PulseCare is a FDA-cleared continuous cardiac patch sensor paired with predictive AI that detects arrhythmias 72 hours before clinical onset. Reimbursed through CPT codes 99453/99454 with $65/patient/month recurring SaaS revenue.',
  },
];

export const InputForm: React.FC<InputFormProps> = ({
  businessIdea,
  setBusinessIdea,
  targetAudience,
  setTargetAudience,
  industryVertical,
  setIndustryVertical,
  uploadedFiles,
  onFileUpload,
  onRemoveFile,
  onLoadSampleDecks,
  onStartPipeline,
  isProcessing,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
    }
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setBusinessIdea(preset.idea);
    setTargetAudience(preset.audience);
    setIndustryVertical(preset.vertical);
  };

  const isFormValid = businessIdea.trim().length > 10 && industryVertical.trim().length > 0;

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-6 sm:p-8 shadow-xs space-y-6">
      {/* Section Heading & Presets */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-zinc-700" />
              1. Define Pitch Inputs
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Provide your core business idea, target audience, and industry vertical.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-zinc-400 font-medium hidden sm:inline">Try preset:</span>
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(preset)}
                className="text-xs px-2.5 py-1 rounded bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 transition-colors"
              >
                {preset.title.split(' - ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Business Idea (Multi-line text area) */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-zinc-600" />
            Business Idea <span className="text-red-500">*</span>
          </label>
          <textarea
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
            disabled={isProcessing}
            rows={4}
            placeholder="Describe your business idea, value proposition, monetization model, and key differentiation in 2-4 sentences..."
            className="w-full bg-white border border-zinc-200 rounded p-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all resize-y"
          />
        </div>

        {/* Industry Vertical & Target Audience */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-zinc-600" />
              Industry Vertical <span className="text-red-500">*</span>
            </label>
            <select
              value={industryVertical}
              onChange={(e) => setIndustryVertical(e.target.value)}
              disabled={isProcessing}
              className="w-full bg-white border border-zinc-200 rounded p-2.5 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
            >
              <option value="">Select industry vertical...</option>
              {INDUSTRY_VERTICALS.map((vert) => (
                <option key={vert} value={vert}>
                  {vert}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-zinc-600" />
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              disabled={isProcessing}
              placeholder="e.g. B2B Enterprise CFOs, SMB SaaS Founders"
              className="w-full bg-white border border-zinc-200 rounded p-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
            />
          </div>
        </div>
      </div>

      {/* Reference Pitch Deck Multi-File Upload Section */}
      <div className="space-y-4 pt-4 border-t border-zinc-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-zinc-700" />
              <span>2. Reference Grounding Decks (Relevant Industry Dataset)</span>
              {industryVertical && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  10 {industryVertical} Decks Active
                </span>
              )}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Strictly filters and loads 10 relevant reference pitch decks for <strong>{industryVertical || 'your industry'}</strong> to benchmark TAM/SAM/SOM, CAC, valuation, and asks.
            </p>
          </div>

          <button
            type="button"
            onClick={onLoadSampleDecks}
            disabled={isProcessing}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors cursor-pointer"
          >
            <FileCheck className="h-3.5 w-3.5 text-zinc-600" />
            <span>Load 10 {industryVertical || ''} Decks</span>
          </button>
        </div>

        {/* Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded p-5 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-black bg-zinc-100'
              : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".pdf,application/pdf"
            multiple
            className="hidden"
            disabled={isProcessing}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="h-9 w-9 rounded bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 shadow-xs">
              <Upload className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-800">
                <span className="text-black font-semibold">Click to upload PDFs</span> or drag & drop reference pitch decks
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Supports multiple PDFs. Gemini native document parsing extracts market figures automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded File List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between text-xs text-zinc-500 font-medium px-1">
              <span>Grounding Files ({uploadedFiles.length})</span>
              <span>Extraction Status</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white border border-zinc-200 rounded p-2.5 flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 text-zinc-500 shrink-0" />
                    <span className="text-zinc-800 font-medium truncate" title={file.name}>
                      {file.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {file.status === 'done' && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="h-3 w-3" /> Extracted
                      </span>
                    )}
                    {file.status === 'extracting' && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200 animate-pulse">
                        Extracting...
                      </span>
                    )}
                    {file.status === 'pending' && (
                      <span className="text-[11px] text-zinc-400 font-medium">Ready</span>
                    )}
                    {file.status === 'error' && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-red-700 font-medium bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        <AlertCircle className="h-3 w-3" /> Error
                      </span>
                    )}

                    {!isProcessing && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFile(file.id);
                        }}
                        className="text-zinc-400 hover:text-red-600 p-1 rounded transition-colors"
                        title="Remove file"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Action Trigger Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100">
        <div className="text-xs text-zinc-500">
          {!isFormValid ? (
            <span className="text-amber-700 flex items-center gap-1.5 font-medium">
              <AlertCircle className="h-4 w-4" /> Please enter your Business Idea and select an Industry Vertical.
            </span>
          ) : (
            <span className="text-emerald-700 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="h-4 w-4" /> Ready to run 3-stage benchmarked pitch deck pipeline.
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onStartPipeline}
          disabled={!isFormValid || isProcessing}
          className={`w-full sm:w-auto px-6 py-2.5 rounded font-medium text-xs shadow-xs flex items-center justify-center gap-2 transition-all ${
            !isFormValid || isProcessing
              ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-300'
              : 'bg-black hover:bg-zinc-800 text-white active:scale-[0.99]'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
          <span>{isProcessing ? 'Pipeline Running...' : 'Generate My Pitch Deck'}</span>
        </button>
      </div>
    </div>
  );
};
