import { BenchmarkDeck } from '../types';

export const SAMPLE_BENCHMARKS: BenchmarkDeck[] = [
  {
    id: 'sample-1',
    fileName: 'Airbnb_Seed_Deck.pdf',
    industry_vertical: 'Consumer Tech',
    funding_stage_guess: 'Seed ($600K)',
    tam_sam_som_figures: {
      tam: '$2.0 Billion (Global budget trips booked)',
      sam: '$560 Million (Online travel & budget market)',
      som: '$84 Million (15% market capture target)'
    },
    traction_metrics_mentioned: ['80,000 trips booked', '$200K revenue', '10,000 active listings', '42% MoM host growth'],
    slide_count: 12,
    slide_topics_present: ['Problem', 'Solution', 'Market Validation', 'Market Size', 'Product', 'Business Model', 'Adoption Strategy', 'Competitors', 'Competitive Advantages', 'Team', 'Press', 'Financial Ask'],
    notable_claims: ['Taken 10% commission per booking', 'Average $20 fee per booking', '$2.1B TAM base in 2008'],
    isDefaultSample: true
  },
  {
    id: 'sample-2',
    fileName: 'Uber_Pitch_Deck_2008.pdf',
    industry_vertical: 'Marketplace',
    funding_stage_guess: 'Seed ($1.25M)',
    tam_sam_som_figures: {
      tam: '$4.2 Billion (US On-Demand Car Service)',
      sam: '$1.2 Billion (Top 10 US Metropolitan areas)',
      som: '$150 Million (Initial NYC & SF On-demand market)'
    },
    traction_metrics_mentioned: ['15-minute average ETA in SF', '1,200 rides in launch month', '85% driver retention', '$100K gross monthly booking'],
    slide_count: 25,
    slide_topics_present: ['Problem', 'Fast Facts', 'Solution', 'Key Differentiators', 'Use Cases', 'User Benefits', 'Driver Benefits', 'Market Size', 'Target Cities', 'Progress to Date', 'Financial Projections', 'Funding Ask'],
    notable_claims: ['Medallion taxis are slow and expensive', '5-minute pick-up target', '$30 average ride fare'],
    isDefaultSample: true
  },
  {
    id: 'sample-3',
    fileName: 'Buffer_SeriesA_Deck.pdf',
    industry_vertical: 'SaaS',
    funding_stage_guess: 'Seed / Series A ($450K)',
    tam_sam_som_figures: {
      tam: '$1.5 Billion (Social Media Management Software)',
      sam: '$450 Million (SMB & Creator Social Tools)',
      som: '$45 Million (Active Twitter & LinkedIn posters)'
    },
    traction_metrics_mentioned: ['$150K ARR', '20,000 registered users', '800 paying subscribers', '4.2% free-to-paid conversion'],
    slide_count: 10,
    slide_topics_present: ['Trends', 'Problem', 'Solution', 'Traction', 'Business Model', 'Social Media Landscape', 'Competitive Advantage', 'Team', 'Financials', 'The Ask'],
    notable_claims: ['$10/mo subscription fee', '$0.15 CAC via organic viral social sharing', '50% gross margin'],
    isDefaultSample: true
  },
  {
    id: 'sample-4',
    fileName: 'Stripe_SeriesA_Bench.pdf',
    industry_vertical: 'Fintech',
    funding_stage_guess: 'Series A ($2M)',
    tam_sam_som_figures: {
      tam: '$12.0 Billion (Global Developer Payment APIs)',
      sam: '$3.5 Billion (Online SMB & e-commerce payments)',
      som: '$350 Million (Developer-first startup market)'
    },
    traction_metrics_mentioned: ['$2.4M annualized GMV', '120 active developer platforms', '18% MoM volume growth', '$0 churn in core cohort'],
    slide_count: 11,
    slide_topics_present: ['Problem', 'Solution', 'Developer Experience', 'Market Opportunity', 'Business Model', 'Unit Economics', 'Competitive Landscape', 'Security & Compliance', 'Team', 'Funding Request'],
    notable_claims: ['2.9% + 30c per transaction', '7-line integration code', 'Instant account activation'],
    isDefaultSample: true
  },
  {
    id: 'sample-5',
    fileName: 'Brex_Seed_Benchmark.pdf',
    industry_vertical: 'Fintech',
    funding_stage_guess: 'Seed / Series A ($7M)',
    tam_sam_som_figures: {
      tam: '$18.0 Billion (Corporate Card & Expense Management)',
      sam: '$4.8 Billion (Venture-backed startups & SMBs)',
      som: '$600 Million (US Tech Startups)'
    },
    traction_metrics_mentioned: ['$8.5M Card Volume in Q1', '120 YC startups onboarded', '2.4% net interchange yield', '$50,000 average monthly spend per user'],
    slide_count: 14,
    slide_topics_present: ['Executive Summary', 'Problem', 'Solution', 'Underwriting Edge', 'Business Model', 'Traction', 'Customer Acquisition', 'Financial Model', 'Team', 'Capital Ask'],
    notable_claims: ['No personal guarantee required', '10x higher credit limits based on bank balance', 'Instant virtual card generation'],
    isDefaultSample: true
  },
  {
    id: 'sample-6',
    fileName: 'Loom_Seed_Reference.pdf',
    industry_vertical: 'SaaS',
    funding_stage_guess: 'Seed ($3.8M)',
    tam_sam_som_figures: {
      tam: '$5.0 Billion (Asynchronous Video Work Communication)',
      sam: '$1.2 Billion (Remote Tech & Product Teams)',
      som: '$120 Million (Product & Design teams at tech companies)'
    },
    traction_metrics_mentioned: ['1.2M registered users', '18,000 companies', '15% organic viral referral rate', '2.5M videos recorded/month'],
    slide_count: 10,
    slide_topics_present: ['Problem', 'Solution', 'Why Now', 'Product Overview', 'Viral Growth Loop', 'Business Model', 'Enterprise Potential', 'Competitive Quadrant', 'Team', 'Funding Use'],
    notable_claims: ['Free Chrome extension viral loop', '$10/user/mo workspace tier', '8x faster than typing long emails'],
    isDefaultSample: true
  },
  {
    id: 'sample-7',
    fileName: 'HealthPulse_SeriesA_Deck.pdf',
    industry_vertical: 'HealthTech',
    funding_stage_guess: 'Series A ($5M)',
    tam_sam_som_figures: {
      tam: '$15.0 Billion (Remote Patient Monitoring & Telehealth)',
      sam: '$3.8 Billion (US Chronic Care Management Clinics)',
      som: '$280 Million (Cardiology & Diabetes Specialist Practices)'
    },
    traction_metrics_mentioned: ['$1.2M ARR', '34 clinical practices contracted', '4.2x ROI for practices via CPT reimbursement codes', '92% patient compliance'],
    slide_count: 12,
    slide_topics_present: ['Executive Summary', 'Clinical Problem', 'RPM Platform Solution', 'Reimbursement Model', 'Market Opportunity', 'Clinical Results', 'Go-To-Market Strategy', 'Regulatory Status', 'Unit Economics', 'Team', 'Milestones & Ask'],
    notable_claims: ['CPT Code 99453/99454 reimbursement enabled', '$65/patient/month recurring SaaS fee', 'FDA Class II cleared device integration'],
    isDefaultSample: true
  },
  {
    id: 'sample-8',
    fileName: 'VerdantEnergy_CleanTech_Benchmark.pdf',
    industry_vertical: 'CleanTech',
    funding_stage_guess: 'Seed ($2.5M)',
    tam_sam_som_figures: {
      tam: '$28.0 Billion (Commercial Microgrid Energy Storage)',
      sam: '$6.5 Billion (Industrial Parks & Warehouses in CA/TX)',
      som: '$450 Million (Tier-1 Logistics Hubs)'
    },
    traction_metrics_mentioned: ['$800K contracted backlog', '3 pilot installations active', '32% energy bill reduction for clients', '$120K LTV per enterprise contract'],
    slide_count: 13,
    slide_topics_present: ['Energy Crisis', 'Verdant AI Storage Solution', 'Hardware & Software Architecture', 'Target Market', 'Project Economics', 'Customer Testimonials', 'GTM & Utility Partnerships', 'Team', 'Financial Forecast', 'Funding Plan'],
    notable_claims: ['$0 upfront capital via Energy-as-a-Service model', '3-year hardware payback period', 'IRA 30% Investment Tax Credit applicable'],
    isDefaultSample: true
  },
  {
    id: 'sample-9',
    fileName: 'Edify_EdTech_SeriesA.pdf',
    industry_vertical: 'EdTech',
    funding_stage_guess: 'Series A ($4M)',
    tam_sam_som_figures: {
      tam: '$8.5 Billion (K-12 Adaptive STEM Learning)',
      sam: '$2.1 Billion (US Public School Districts)',
      som: '$180 Million (Title I Schools in 5 Target States)'
    },
    traction_metrics_mentioned: ['$1.8M ARR', '140 school districts', '350,000 active students', '118% Net Revenue Retention'],
    slide_count: 11,
    slide_topics_present: ['Student Achievement Gap', 'Adaptive AI Tutor Solution', 'Pedagogical Evidence', 'District Buying Cycle', 'Traction & Case Studies', 'Financial Trajectory', 'Competitive Comparison', 'Leadership Team', 'Ask'],
    notable_claims: ['$12 per student per year district license', '2.1 grade levels math gain in 14 weeks', 'Procurement cycle reduced from 12 to 4 months'],
    isDefaultSample: true
  },
  {
    id: 'sample-10',
    fileName: 'CognitiveNode_AI_Seed.pdf',
    industry_vertical: 'AI/ML',
    funding_stage_guess: 'Seed ($3.0M)',
    tam_sam_som_figures: {
      tam: '$22.0 Billion (Enterprise AI Infrastructure & Agentic Middleware)',
      sam: '$5.4 Billion (Fortune 2000 Financial & Insurance Engineering)',
      som: '$420 Million (Fintech & Insurtech engineering orgs)'
    },
    traction_metrics_mentioned: ['$950K ARR', '28 enterprise engineering teams', '4.8x GPU inference cost reduction', '99.9% uptime SLA'],
    slide_count: 11,
    slide_topics_present: ['The AI Compute Bottleneck', 'Cognitive Routing Middleware', 'Benchmark Performance', 'Enterprise TAM', 'Developer Adoption', 'Monetization Architecture', 'Security & Compliance', 'Founding Team', 'Capital Requirements'],
    notable_claims: ['70% reduction in token latency', '$0.002 per agent routing call', 'SOC2 Type II certified'],
    isDefaultSample: true
  }
];
