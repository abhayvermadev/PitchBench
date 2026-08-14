export interface ReferenceDeckSlide {
  slide_number: number;
  title: string;
  key_content: string;
  bullet_points?: string[];
  metrics_or_data?: string;
  visual_description?: string;
}

export interface BenchmarkDeck {
  id: string;
  fileName: string;
  company_name?: string;
  industry_vertical: string;
  funding_stage_guess: string;
  tam_sam_som_figures: {
    tam: string;
    sam: string;
    som: string;
  };
  traction_metrics_mentioned: string[];
  slide_count: number;
  slide_topics_present: string[];
  notable_claims: string[];
  isDefaultSample?: boolean;
  business_model_summary?: string;
  valuation_or_ask?: string;
  target_customers?: string;
  deck_slides?: ReferenceDeckSlide[];
}

export interface NumericClaim {
  metric: string;
  value: string;
  within_benchmark_range: boolean;
  benchmark_comparison_note: string;
}

export interface PitchSlide {
  slide_number: number;
  slide_name: string;
  headline: string;
  key_points: string[];
  detailed_content: string;
  numeric_claims: NumericClaim[];
  suggested_visual: string;
}

export interface InvestorCritique {
  slide_number: number;
  slide_name: string;
  concern: string;
  suggested_fix: string;
  severity: 'high' | 'medium' | 'low' | 'fixed';
  is_fixed?: boolean;
  fixed_at?: string;
}

export interface IndustryBenchmarkSummary {
  decks_used_count: number;
  relevant_decks_names: string[];
  industry_benchmarks_applied: {
    tam_range: string;
    sam_range: string;
    som_range: string;
    common_traction_metrics: string[];
    typical_ask_range: string;
  };
}

export interface GeneratedDeckData {
  slides: PitchSlide[];
  critiques: InvestorCritique[];
  benchmark_summary: IndustryBenchmarkSummary;
}

export type PipelineStage = 'idle' | 'extracting' | 'generating' | 'critiquing' | 'complete' | 'error';

export interface FileUploadStatus {
  id: string;
  name: string;
  size: number;
  status: 'pending' | 'uploading' | 'extracting' | 'done' | 'error';
  progress: number;
  extractedBenchmark?: BenchmarkDeck;
  errorNote?: string;
}
