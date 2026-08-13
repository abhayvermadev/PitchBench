import React from 'react';
import { Layers, Sparkles, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { PipelineStage } from '../types';

interface PipelineProgressProps {
  currentStage: PipelineStage;
  fileCount: number;
  extractedCount: number;
}

export const PipelineProgress: React.FC<PipelineProgressProps> = ({
  currentStage,
  fileCount,
  extractedCount,
}) => {
  if (currentStage === 'idle') return null;

  const stages = [
    {
      id: 'extracting',
      title: 'Stage 1 — Benchmark Extraction',
      description: `Analyzing ${fileCount} reference PDF decks with Gemini native document understanding to build grounding dataset. (${extractedCount}/${fileCount} done)`,
      icon: Layers,
    },
    {
      id: 'generating',
      title: 'Stage 2 — Deck Generation',
      description: 'Drafting 10 slides and verifying every numeric claim against vertical benchmark ranges.',
      icon: Sparkles,
    },
    {
      id: 'critiquing',
      title: 'Stage 3 — Investor Critique',
      description: 'Skeptical VC partner role-play analyzing weak assumptions and drafting slide pushback & fixes.',
      icon: ShieldAlert,
    },
  ];

  const getStageStatus = (stageId: string) => {
    if (currentStage === 'complete') return 'done';
    if (currentStage === 'error') return 'error';

    const order = ['extracting', 'generating', 'critiquing', 'complete'];
    const currentIndex = order.indexOf(currentStage);
    const stageIndex = order.indexOf(stageId);

    if (stageIndex < currentIndex) return 'done';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
          {currentStage !== 'complete' && <Loader2 className="h-4 w-4 text-zinc-800 animate-spin" />}
          {currentStage === 'complete' && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          <span>PitchBench Pipeline Execution</span>
        </h3>
        <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 font-semibold">
          {currentStage === 'extracting' && 'Running Stage 1 of 3'}
          {currentStage === 'generating' && 'Running Stage 2 of 3'}
          {currentStage === 'critiquing' && 'Running Stage 3 of 3'}
          {currentStage === 'complete' && 'Pipeline Complete'}
          {currentStage === 'error' && 'Pipeline Error'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {stages.map((st) => {
          const status = getStageStatus(st.id);
          const Icon = st.icon;

          return (
            <div
              key={st.id}
              className={`p-3.5 rounded border transition-all ${
                status === 'active'
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                  : status === 'done'
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-1.5 rounded shrink-0 ${
                    status === 'active'
                      ? 'bg-zinc-800 text-white'
                      : status === 'done'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  {status === 'active' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : status === 'done' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold ${
                      status === 'active'
                        ? 'text-white'
                        : status === 'done'
                        ? 'text-emerald-900'
                        : 'text-zinc-700'
                    }`}
                  >
                    {st.title}
                  </h4>
                  <p
                    className={`text-[11px] mt-0.5 leading-relaxed ${
                      status === 'active'
                        ? 'text-zinc-300'
                        : status === 'done'
                        ? 'text-emerald-800'
                        : 'text-zinc-500'
                    }`}
                  >
                    {st.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
