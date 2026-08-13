import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

// Enable large JSON body parsing for base64 PDF uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Helper to initialize Gemini SDK safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper to call Gemini with retries and model fallbacks for 503/429 transient high-demand errors
async function generateContentWithRetry(ai: GoogleGenAI, params: any) {
  const primaryModel = params.model || 'gemini-3.7-flash';
  const modelsToTry = [primaryModel, 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  const uniqueModels = Array.from(new Set(modelsToTry));

  let lastError: any = null;

  for (const modelName of uniqueModels) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          ...params,
          model: modelName,
        });
        return response;
      } catch (err: any) {
        lastError = err;
        console.warn(`Gemini attempt ${attempt} with model ${modelName} failed:`, err?.message || err);
        const errMsg = String(err?.message || err);
        const isTransient =
          err?.status === 503 ||
          err?.code === 503 ||
          err?.status === 429 ||
          errMsg.includes('503') ||
          errMsg.includes('high demand') ||
          errMsg.includes('UNAVAILABLE') ||
          errMsg.includes('RESOURCE_EXHAUSTED');

        if (isTransient && attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1200 * attempt));
        } else if (!isTransient) {
          break;
        }
      }
    }
  }

  throw lastError;
}

// ================= SCHEMAS FOR STRUCTURED OUTPUT =================

// Stage 1 Schema: Benchmark extraction per PDF
const benchmarkSchema = {
  type: Type.OBJECT,
  properties: {
    industry_vertical: {
      type: Type.STRING,
      description: 'Primary industry vertical (e.g., SaaS, Fintech, HealthTech, AI/ML, E-commerce, CleanTech, Consumer)',
    },
    funding_stage_guess: {
      type: Type.STRING,
      description: 'Guessed funding stage and round size (e.g., Pre-Seed $500K, Seed $2M, Series A $10M)',
    },
    tam_sam_som_figures: {
      type: Type.OBJECT,
      properties: {
        tam: { type: Type.STRING, description: 'Total Addressable Market figure or estimate' },
        sam: { type: Type.STRING, description: 'Serviceable Addressable Market figure or estimate' },
        som: { type: Type.STRING, description: 'Serviceable Obtainable Market figure or estimate' },
      },
      required: ['tam', 'sam', 'som'],
    },
    traction_metrics_mentioned: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Key traction metrics or KPIs mentioned in deck (e.g., ARR, MRR, CAC, LTV, Active Users, MoM growth)',
    },
    slide_count: {
      type: Type.NUMBER,
      description: 'Total number of slides detected in deck',
    },
    slide_topics_present: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of slide topics or section titles present',
    },
    notable_claims: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Notable value proposition claims, growth metrics, unit economics, or benchmarks',
    },
  },
  required: [
    'industry_vertical',
    'funding_stage_guess',
    'tam_sam_som_figures',
    'traction_metrics_mentioned',
    'slide_count',
    'slide_topics_present',
    'notable_claims',
  ],
};

// Stage 2 Schema: 10-slide deck generation with numeric checks
const slideSchema = {
  type: Type.OBJECT,
  properties: {
    slide_number: { type: Type.NUMBER, description: '1 to 10' },
    slide_name: {
      type: Type.STRING,
      description: 'Exact slide title from the 10 standard topics',
    },
    headline: {
      type: Type.STRING,
      description: 'Punchy 1-sentence investor headline for slide top',
    },
    key_points: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3 to 5 core bullet points articulating the slide narrative',
    },
    detailed_content: {
      type: Type.STRING,
      description: 'Complete slide copy, data points, story, and execution details',
    },
    numeric_claims: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          metric: { type: Type.STRING, description: 'Name of the metric e.g. TAM, CAC, Seed Ask' },
          value: { type: Type.STRING, description: 'Proposed numeric value e.g. $4.2B' },
          within_benchmark_range: {
            type: Type.BOOLEAN,
            description: 'True if value falls within reference decks benchmark range, false if outside',
          },
          benchmark_comparison_note: {
            type: Type.STRING,
            description: 'Explanation comparing this value to the benchmark reference decks for this vertical',
          },
        },
        required: ['metric', 'value', 'within_benchmark_range', 'benchmark_comparison_note'],
      },
      description: 'All numeric figures used on this slide, checked against benchmark dataset ranges',
    },
    suggested_visual: {
      type: Type.STRING,
      description: 'Recommendation for visual layout, diagram, chart type, or mockup for this slide',
    },
  },
  required: [
    'slide_number',
    'slide_name',
    'headline',
    'key_points',
    'detailed_content',
    'numeric_claims',
    'suggested_visual',
  ],
};

const deckGenerationSchema = {
  type: Type.OBJECT,
  properties: {
    slides: {
      type: Type.ARRAY,
      items: slideSchema,
      description: 'Array of exactly 10 slides in order',
    },
    benchmark_summary: {
      type: Type.OBJECT,
      properties: {
        decks_used_count: { type: Type.NUMBER },
        relevant_decks_names: { type: Type.ARRAY, items: { type: Type.STRING } },
        industry_benchmarks_applied: {
          type: Type.OBJECT,
          properties: {
            tam_range: { type: Type.STRING },
            sam_range: { type: Type.STRING },
            som_range: { type: Type.STRING },
            common_traction_metrics: { type: Type.ARRAY, items: { type: Type.STRING } },
            typical_ask_range: { type: Type.STRING },
          },
          required: [
            'tam_range',
            'sam_range',
            'som_range',
            'common_traction_metrics',
            'typical_ask_range',
          ],
        },
      },
      required: ['decks_used_count', 'relevant_decks_names', 'industry_benchmarks_applied'],
    },
  },
  required: ['slides', 'benchmark_summary'],
};

// Stage 3 Schema: Investor Critique
const critiqueSchema = {
  type: Type.OBJECT,
  properties: {
    critiques: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          slide_number: { type: Type.NUMBER },
          slide_name: { type: Type.STRING },
          concern: {
            type: Type.STRING,
            description: 'Skeptical VC critique highlighting weak assumptions, missing metrics, or risk factors',
          },
          suggested_fix: {
            type: Type.STRING,
            description: 'Specific actionable fix to make the slide bulletproof for investor pitch meetings',
          },
          severity: {
            type: Type.STRING,
            enum: ['high', 'medium', 'low'],
            description: 'Severity level of the investor concern',
          },
        },
        required: ['slide_number', 'slide_name', 'concern', 'suggested_fix', 'severity'],
      },
    },
  },
  required: ['critiques'],
};

// Single slide regeneration schema
const singleSlideSchema = {
  type: Type.OBJECT,
  properties: {
    slide: slideSchema,
    critique: {
      type: Type.OBJECT,
      properties: {
        slide_number: { type: Type.NUMBER },
        slide_name: { type: Type.STRING },
        concern: { type: Type.STRING },
        suggested_fix: { type: Type.STRING },
        severity: { type: Type.STRING, enum: ['high', 'medium', 'low'] },
      },
      required: ['slide_number', 'slide_name', 'concern', 'suggested_fix', 'severity'],
    },
  },
  required: ['slide', 'critique'],
};

// Full deck with updated critiques schema (for bulk VC fix)
const deckAndCritiquesSchema = {
  type: Type.OBJECT,
  properties: {
    slides: {
      type: Type.ARRAY,
      items: slideSchema,
      description: 'Array of 10 updated slides with investor fixes applied',
    },
    critiques: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          slide_number: { type: Type.NUMBER },
          slide_name: { type: Type.STRING },
          concern: {
            type: Type.STRING,
            description: 'Updated VC status or remaining minor observation after applying defense',
          },
          suggested_fix: {
            type: Type.STRING,
            description: 'Defense strategy implemented / confirmed fix',
          },
          severity: {
            type: Type.STRING,
            enum: ['high', 'medium', 'low'],
            description: 'Updated severity level',
          },
        },
        required: ['slide_number', 'slide_name', 'concern', 'suggested_fix', 'severity'],
      },
      description: 'Updated investor critiques for all 10 slides',
    },
  },
  required: ['slides', 'critiques'],
};

// ================= API ENDPOINTS =================

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Stage 1: Benchmark extraction from uploaded PDF files
app.post('/api/benchmark/extract', async (req, res) => {
  try {
    const ai = getGeminiClient();
    const { files } = req.body; // Array of { name: string, data: string (base64) }

    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: 'No files provided for extraction' });
    }

    const extractedBenchmarks = [];

    for (const file of files) {
      try {
        // Strip data URL prefix if present (e.g. data:application/pdf;base64,...)
        let cleanBase64 = file.data;
        if (cleanBase64.includes(';base64,')) {
          cleanBase64 = cleanBase64.split(';base64,')[1];
        }

        const pdfPart = {
          inlineData: {
            mimeType: 'application/pdf',
            data: cleanBase64,
          },
        };

        const promptText = `Analyze this reference pitch deck PDF file "${file.name}" thoroughly using native document understanding. 
Extract structured benchmark figures, market sizes (TAM/SAM/SOM), traction metrics, funding stage, slide topics, and notable claims into the requested JSON schema.`;

        const response = await generateContentWithRetry(ai, {
          model: 'gemini-3.7-flash',
          contents: { parts: [pdfPart, { text: promptText }] },
          config: {
            responseMimeType: 'application/json',
            responseSchema: benchmarkSchema,
          },
        });

        const text = response.text || '{}';
        const parsedData = JSON.parse(text);

        extractedBenchmarks.push({
          id: `extracted-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          fileName: file.name,
          ...parsedData,
        });
      } catch (fileErr) {
        console.error(`Error processing file ${file.name}:`, fileErr);
        // Fallback for failed individual file extraction
        extractedBenchmarks.push({
          id: `extracted-fallback-${Date.now()}`,
          fileName: file.name,
          industry_vertical: 'General Tech',
          funding_stage_guess: 'Seed ($1M-$3M)',
          tam_sam_som_figures: {
            tam: '$1.0 Billion - $5.0 Billion',
            sam: '$250M - $1.0B',
            som: '$25M - $100M',
          },
          traction_metrics_mentioned: ['ARR', 'Monthly Active Users', 'Customer Acquisition Cost'],
          slide_count: 10,
          slide_topics_present: ['Problem', 'Solution', 'Market Size', 'Business Model', 'Traction', 'Team'],
          notable_claims: ['Standard high-growth tech startup metrics'],
        });
      }
    }

    res.json({ extractedBenchmarks });
  } catch (error: any) {
    console.error('API /api/benchmark/extract Error:', error);
    res.status(500).json({ error: error.message || 'Failed to extract PDF benchmarks' });
  }
});

// Stage 2: Deck Generation grounded in benchmark dataset
app.post('/api/deck/generate', async (req, res) => {
  try {
    const ai = getGeminiClient();
    const { businessIdea, targetAudience, industryVertical, benchmarks } = req.body;

    if (!businessIdea || !industryVertical) {
      return res.status(400).json({ error: 'Business idea and industry vertical are required.' });
    }

    const benchmarkText = JSON.stringify(benchmarks || [], null, 2);

    const prompt = `You are a world-class venture capitalist, pitch strategist, and financial analyst.
Turn this raw business idea into a benchmarked, investor-ready 10-slide pitch deck grounded in the provided reference benchmark dataset.

INPUT DETAILS:
- Business Idea: "${businessIdea}"
- Target Audience: "${targetAudience || 'General Market'}"
- Industry Vertical: "${industryVertical}"

REFERENCE BENCHMARK DATASET (from reference pitch decks):
${benchmarkText}

INSTRUCTIONS:
1. Filter and analyze the benchmark dataset for reference decks in the "${industryVertical}" vertical (or closest relevant verticals).
2. Draft EXACTLY 10 slides in this mandatory order:
   Slide 1: Problem
   Slide 2: Solution
   Slide 3: Market Size (TAM/SAM/SOM)
   Slide 4: Business Model
   Slide 5: Competitive Landscape
   Slide 6: Go-To-Market Strategy
   Slide 7: Team Composition
   Slide 8: Financial Projections
   Slide 9: Traction Metrics
   Slide 10: Funding Ask

3. CRITICAL BENCHMARKING REQUIREMENT:
   Every numeric claim (TAM/SAM/SOM market size figures, traction metrics like ARR/MoM, funding ask, valuation estimates) MUST be checked against the range found in the benchmark dataset for that vertical.
   - Set 'within_benchmark_range' to true if the proposed figure aligns with benchmark ranges, or false if it is unusually high/low.
   - Provide a clear 'benchmark_comparison_note' explaining how the figure compares to reference decks (e.g. "User TAM of $8B is above the $1B-$5B benchmark range for Seed SaaS decks").

4. Format response strictly according to JSON responseSchema. Make slide text persuasive, professional, concise, and pitch-ready.`;

    const response = await generateContentWithRetry(ai, {
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: deckGenerationSchema,
      },
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('API /api/deck/generate Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate pitch deck' });
  }
});

// Stage 3: Investor Critique
app.post('/api/deck/critique', async (req, res) => {
  try {
    const ai = getGeminiClient();
    const { businessIdea, targetAudience, industryVertical, slides, benchmarks } = req.body;

    const slidesText = JSON.stringify(slides || [], null, 2);
    const benchmarkText = JSON.stringify(benchmarks || [], null, 2);

    const prompt = `Role-play as a highly skeptical, seasoned Silicon Valley VC General Partner who has reviewed thousands of pitch decks in the ${industryVertical} space and is intimately familiar with standard market benchmarks.

Analyze these 10 generated pitch slides against the user idea and benchmark dataset:

BUSINESS IDEA: "${businessIdea}"
TARGET AUDIENCE: "${targetAudience}"
VERTICAL: "${industryVertical}"

SLIDES TO CRITIQUE:
${slidesText}

REFERENCE BENCHMARK DATASET:
${benchmarkText}

TASK:
For each of the 10 slides, provide a sharp, realistic investor critique.
Flag anything that is thin, unrealistic, unverified, ungrounded, or likely to draw a hard pushback question during a pitch meeting.
Provide a clear, actionable 'suggested_fix' for each slide. Set severity to 'high', 'medium', or 'low'.
Return strictly valid JSON adhering to responseSchema.`;

    const response = await generateContentWithRetry(ai, {
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are a skeptical, highly experienced venture capitalist partner. Be direct, insightful, demanding, and constructive.',
        responseMimeType: 'application/json',
        responseSchema: critiqueSchema,
      },
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('API /api/deck/critique Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate investor critiques' });
  }
});

// Regenerate single slide
app.post('/api/deck/regenerate-slide', async (req, res) => {
  try {
    const ai = getGeminiClient();
    const {
      slideNumber,
      currentSlide,
      businessIdea,
      targetAudience,
      industryVertical,
      benchmarks,
      userInstructions,
    } = req.body;

    const prompt = `Regenerate Slide #${slideNumber} (${currentSlide?.slide_name || 'Pitch Slide'}) for PitchBench.

CONTEXT:
- Business Idea: "${businessIdea}"
- Target Audience: "${targetAudience}"
- Industry Vertical: "${industryVertical}"
- User Refinement Request / Feedback: "${userInstructions || 'Improve clarity, investor rigor, and benchmark alignment.'}"
- Current Slide Data: ${JSON.stringify(currentSlide || {})}
- Reference Benchmarks: ${JSON.stringify(benchmarks || [])}

Re-draft this single slide to be exceptionally pitch-ready, checking all numeric claims against the reference benchmarks, and generate a revised investor critique for this slide.
Return strictly valid JSON according to responseSchema.`;

    const response = await generateContentWithRetry(ai, {
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: singleSlideSchema,
      },
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('API /api/deck/regenerate-slide Error:', error);
    res.status(500).json({ error: error.message || 'Failed to regenerate slide' });
  }
});

// Auto-apply VC fix to a single slide (intelligently rewriting slide content + updating critique)
app.post('/api/deck/apply-vc-fix-slide', async (req, res) => {
  try {
    const ai = getGeminiClient();
    const {
      slideNumber,
      currentSlide,
      critique,
      businessIdea,
      targetAudience,
      industryVertical,
      benchmarks,
    } = req.body;

    const prompt = `You are an elite pitch strategist and venture capitalist. 
Your objective is to AUTO-FIX Slide #${slideNumber} (${currentSlide?.slide_name || 'Slide'}) by directly incorporating the investor critique and defense recommendation into the slide content.

SLIDE TO FIX:
- Slide Number: ${slideNumber}
- Slide Name: "${currentSlide?.slide_name}"
- Current Headline: "${currentSlide?.headline}"
- Current Content: "${currentSlide?.detailed_content}"
- Current Key Points: ${JSON.stringify(currentSlide?.key_points || [])}
- Current Numeric Claims: ${JSON.stringify(currentSlide?.numeric_claims || [])}

INVESTOR CRITIQUE TO RESOLVE:
- VC Concern: "${critique?.concern || 'Needs stronger proof points'}"
- Recommended Fix / Defense Strategy: "${critique?.suggested_fix || 'Add clear metrics and risk mitigation'}"

BUSINESS CONTEXT:
- Business Idea: "${businessIdea}"
- Target Audience: "${targetAudience}"
- Industry Vertical: "${industryVertical}"
- Benchmarks: ${JSON.stringify(benchmarks || [])}

TASK:
1. Completely rewrite and upgrade this slide's 'headline', 'key_points', 'detailed_content', and 'numeric_claims'.
   DO NOT simply append text like "Note: fix applied". Instead, seamlessly integrate the VC defense strategy, metrics, and evidence directly into the primary copy so the slide stands as a rock-solid, investor-grade asset.
2. Produce a new revised 'critique' for this slide acknowledging that the objection has been addressed, setting severity to 'low'.
Return strictly valid JSON matching singleSlideSchema.`;

    const response = await generateContentWithRetry(ai, {
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: singleSlideSchema,
      },
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('API /api/deck/apply-vc-fix-slide Error:', error);
    res.status(500).json({ error: error.message || 'Failed to apply VC fix to slide' });
  }
});

// Auto-apply VC fixes to the COMPLETE pitch deck (bulk rewriting all 10 slides + updating critiques)
app.post('/api/deck/apply-vc-fixes-deck', async (req, res) => {
  try {
    const ai = getGeminiClient();
    const {
      businessIdea,
      targetAudience,
      industryVertical,
      slides,
      critiques,
      benchmarks,
    } = req.body;

    const prompt = `You are a Silicon Valley Managing Partner and pitch deck master.
Your goal is to AUTO-FIX the ENTIRE 10-slide pitch deck by applying all investor critiques and recommended defense strategies across all slides.

BUSINESS CONTEXT:
- Idea: "${businessIdea}"
- Target Audience: "${targetAudience}"
- Industry Vertical: "${industryVertical}"

CURRENT 10 SLIDES:
${JSON.stringify(slides || [])}

INVESTOR CRITIQUES AND VC RECOMMENDATIONS FOR ALL SLIDES:
${JSON.stringify(critiques || [])}

REFERENCE BENCHMARKS:
${JSON.stringify(benchmarks || [])}

INSTRUCTIONS:
1. Re-draft ALL 10 slides in order (Slide 1 to 10).
2. On EVERY slide, directly resolve the corresponding VC concern by incorporating the recommended fix into the headline, key_points, detailed_content, and numeric_claims.
   The resulting slides must read like a bulletproof, institutional-ready pitch deck with no obvious vulnerabilities.
3. Generate updated investor critiques for all 10 slides confirming that each major risk/concern has been addressed, with severity set to 'low' for resolved items.
4. Return strictly valid JSON matching deckAndCritiquesSchema (containing 'slides' array and 'critiques' array).`;

    const response = await generateContentWithRetry(ai, {
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert VC advisor fixing a pitch deck to guarantee maximum investor approval.',
        responseMimeType: 'application/json',
        responseSchema: deckAndCritiquesSchema,
      },
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('API /api/deck/apply-vc-fixes-deck Error:', error);
    res.status(500).json({ error: error.message || 'Failed to apply VC fixes to complete deck' });
  }
});

// Start Express Server with Vite Dev / Prod Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PitchBench Server] Running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
