import { BenchmarkDeck } from '../types';

export const ALL_INDUSTRY_BENCHMARKS: Record<string, BenchmarkDeck[]> = {
  HealthTech: [
    {
      id: 'health-1',
      company_name: 'HealthPulse AI',
      fileName: 'HealthPulse_SeriesA_RPM.pdf',
      industry_vertical: 'HealthTech',
      funding_stage_guess: 'Series A ($5.0M)',
      valuation_or_ask: '$5.0M at $24M Post-Money Valuation',
      business_model_summary: '$65/patient/month recurring RPM software fee + CPT billing cut (99453/99454/99457)',
      target_customers: 'Independent Cardiology, Nephrology & Endocrinology Clinics',
      tam_sam_som_figures: {
        tam: '$18.5 Billion (Global Remote Patient Monitoring & Chronic Care)',
        sam: '$4.2 Billion (US Outpatient Chronic Disease Specialist Clinics)',
        som: '$380 Million (Top 10 US Metropolitan Specialist Practices)'
      },
      traction_metrics_mentioned: ['$1.4M ARR', '42 clinic contracts', '4.2x practice ROI via CPT reimbursements', '94% patient adherence', '<1% monthly churn'],
      slide_count: 10,
      slide_topics_present: ['Clinical Crisis', 'Remote Sensor Platform', 'FDA Regulatory Pathway', 'Reimbursement Economics', 'Clinical Validation', 'Market Size', 'GTM Sales Motion', 'Competition Matrix', 'Leadership Team', 'Series A Milestones'],
      notable_claims: ['CPT reimbursement yields $1,800/patient/year gross revenue for clinics', 'FDA Class II 510(k) cleared telemetry', 'Reduces 30-day hospital readmissions by 38%'],
      isDefaultSample: true,
      deck_slides: [
        {
          slide_number: 1,
          title: 'The Chronic Care Clinic Overload',
          key_content: 'Over 130M Americans live with chronic conditions, but outpatient specialist clinics lose $420K annually per provider to unmonitored exacerbations and missed preventative encounters.',
          bullet_points: ['45% of heart failure patients readmitted within 90 days', 'Cardiologists spend 3.2 hours/day on unbillable chart reviews', 'Fee-for-service transition to value-based care demands continuous data'],
          metrics_or_data: '$420K annual lost clinic revenue per specialist',
          visual_description: 'Comparative timeline of standard 6-month episodic clinic visits vs. real-time patient risk escalation chart'
        },
        {
          slide_number: 2,
          title: 'HealthPulse: Continuous Biometric RPM Platform',
          key_content: 'Zero-touch wearable biosensors paired with FDA-cleared triage AI that automatically surfaces at-risk patients and compiles audit-proof CPT reimbursement logs.',
          bullet_points: ['Cellular-connected patch requiring no patient smartphone pairing', 'Automated arrhythmia and decompensation anomaly detection', '1-click EHR integration (Epic, Cerner, AthenaHealth)'],
          metrics_or_data: '72-hour early warning window prior to acute decompensation',
          visual_description: 'Diagram of patient biosensor transmitting to cloud AI engine and EHR clinical dashboard'
        },
        {
          slide_number: 3,
          title: 'Market Opportunity: $18.5B Addressable Market',
          key_content: 'Chronic patient monitoring is the fastest-growing sector in healthcare IT, accelerated by permanent CMS reimbursement codes.',
          bullet_points: ['TAM: $18.5B across 45M high-risk US chronic patients', 'SAM: $4.2B in target cardiology, nephrology & diabetes specialties', 'SOM: $380M capturing 8,500 independent specialist practices'],
          metrics_or_data: 'TAM: $18.5B | SAM: $4.2B | SOM: $380M',
          visual_description: 'Standard 3-tier concentric circles market sizing diagram with bottom-up practice calculus'
        },
        {
          slide_number: 4,
          title: 'Business Model: High-Margin Recurring SaaS + Shared Savings',
          key_content: 'Clinics generate $150/patient/month in CMS Medicare reimbursement; HealthPulse charges a $65/patient/month software license, yielding instant cash-positive ROI.',
          bullet_points: ['Zero upfront hardware cost to the clinic', 'Net margin to clinic: $85/patient/month pure profit', 'HealthPulse software gross margin: 78%'],
          metrics_or_data: '$65/patient/mo SaaS fee | 78% Gross Margin',
          visual_description: 'Unit economics flow chart showing CMS reimbursement distribution between clinic and HealthPulse'
        },
        {
          slide_number: 5,
          title: 'Clinical Evidence & Outcomes Validation',
          key_content: 'Peer-reviewed multi-center clinical study across 1,200 patients demonstrated massive reduction in emergency events.',
          bullet_points: ['38% drop in 30-day all-cause hospital readmissions', '94% continuous biometric data compliance rate', '4.8/5.0 physician satisfaction score across 85 clinicians'],
          metrics_or_data: '38% readmission reduction | 94% compliance',
          visual_description: 'Side-by-side bar chart showing readmission rates with HealthPulse vs. standard of care control group'
        },
        {
          slide_number: 6,
          title: 'Rapid Commercial Traction',
          key_content: 'Scaled from zero to $1.4M ARR in 14 months with top-quartile enterprise health retention and net expansion.',
          bullet_points: ['42 specialist clinics under multi-year contracts', '14,200 active monthly monitored patients', '132% Net Revenue Retention via clinic panel expansion', 'CAC payback period of 4.5 months'],
          metrics_or_data: '$1.4M ARR | 132% NRR | 4.5 mo CAC payback',
          visual_description: 'Quarterly ARR growth curve hockey stick chart with cohort expansion overlay'
        },
        {
          slide_number: 7,
          title: 'Competitive Moat: Full-Stack Regulatory & EHR Integration',
          key_content: 'Unlike consumer wearables (Apple Watch, Whoop) or legacy call-center RPMs, HealthPulse provides bi-directional EHR writeback with automated CMS audit defensibility.',
          bullet_points: ['FDA 510(k) cleared clinical decision support algorithms', 'Proprietary cellular hub with 99.4% connectivity in rural zip codes', 'Defensible clinical patent portfolio on predictive arrhythmia onset'],
          metrics_or_data: 'FDA Class II 510(k) Cleared | 3 Granted Patents',
          visual_description: '2x2 matrix comparing Clinical Defensibility vs. Workflow Automation'
        },
        {
          slide_number: 8,
          title: 'Go-to-Market Strategy',
          key_content: 'Direct specialist sales force combined with channel partnerships with independent physician associations (IPAs) and medical device distributors.',
          bullet_points: ['Inside sales model targeting practice administrators and managing partners', 'IPA distribution deals covering 250+ clinics in pipeline', '90-day sales cycle with 30-day paid pilot conversion rate of 88%'],
          metrics_or_data: '88% pilot-to-contract conversion | 90-day cycle',
          visual_description: 'GTM funnel diagram showing lead gen, 30-day clinic pilot, and full enterprise rollout'
        },
        {
          slide_number: 9,
          title: 'Clinical & Technical Leadership',
          key_content: 'World-class team combining Stanford interventional cardiology leadership with enterprise health SaaS scaling veterans.',
          bullet_points: ['CEO: Ex-VP Product at Livongo (acquired for $18.5B)', 'CMO: Stanford Associate Professor of Cardiology, 40+ published papers', 'CTO: Former Lead Architect at Epic Systems'],
          metrics_or_data: '2 Prior Exits in Digital Health ($400M+)',
          visual_description: 'Executive team headshots with logos of previous successful healthcare companies'
        },
        {
          slide_number: 10,
          title: 'The Ask: $5.0M Series A for Commercial Scale',
          key_content: 'Raising $5.0M to expand regional clinical sales team, achieve ISO 27001 / SOC2 Type II certifications, and reach $6.5M ARR within 18 months.',
          bullet_points: ['55% Sales & Commercial Expansion', '25% R&D (Next-Gen Renal & Diabetes Biosensors)', '20% Clinical Trials & Regulatory Submissions'],
          metrics_or_data: '$5.0M Ask | Target: $6.5M ARR in 18 Months',
          visual_description: 'Use of funds pie chart alongside milestone projection roadmap to Series B'
        }
      ]
    },
    {
      id: 'health-2',
      company_name: 'OncoVision AI',
      fileName: 'OncoVision_Seed_Biotech.pdf',
      industry_vertical: 'HealthTech',
      funding_stage_guess: 'Seed ($3.2M)',
      valuation_or_ask: '$3.2M at $14M Cap',
      business_model_summary: '$250/case diagnostic AI co-pilot fee to pathology labs',
      target_customers: 'Hospital Pathology Departments & Academic Cancer Centers',
      tam_sam_som_figures: {
        tam: '$12.0 Billion (Global Computational Pathology & Oncology AI)',
        sam: '$3.1 Billion (US & European Digital Pathology Workstations)',
        som: '$210 Million (Tier-1 US Comprehensive Cancer Centers)'
      },
      traction_metrics_mentioned: ['8 academic medical center pilots', '45,000 biopsied slides analyzed', '98.6% sensitivity for early-stage metastasis', 'CLIA validation completed'],
      slide_count: 10,
      slide_topics_present: ['Diagnostic Bottleneck', 'Deep Learning Pathology', 'Biomarker Precision', 'Market Size', 'Clinical Pilots', 'Health Economics', 'Regulatory Strategy', 'Team', 'Capital Ask'],
      notable_claims: ['Reduces false negatives in biopsy reads by 64%', '8x faster slide review time for pathologists', 'Reimbursed under digital pathology CPT add-on codes'],
      isDefaultSample: true
    },
    {
      id: 'health-3',
      company_name: 'CareSync Health',
      fileName: 'CareSync_SeriesA_CareCoord.pdf',
      industry_vertical: 'HealthTech',
      funding_stage_guess: 'Series A ($6.5M)',
      valuation_or_ask: '$6.5M at $30M Post',
      business_model_summary: 'PMPM (Per Member Per Month) fee of $3.20 to Medicare Advantage payors',
      target_customers: 'Medicare Advantage Health Plans & Accountable Care Orgs (ACOs)',
      tam_sam_som_figures: {
        tam: '$22.0 Billion (US Value-Based Care Coordination Software)',
        sam: '$6.8 Billion (Medicare Advantage Managed Care Lives)',
        som: '$620 Million (Regional Blue Cross & Regional MA Plans)'
      },
      traction_metrics_mentioned: ['$2.8M ARR', '480K covered lives under management', '18% reduction in avoidable ER admissions', '140% NRR'],
      slide_count: 11,
      slide_topics_present: ['VBC Pressure', 'AI Care Orchestration', 'Payor ROI', 'Market Size', 'Traction', 'Customer Cohorts', 'EHR Interoperability', 'Team', 'Funding Ask'],
      notable_claims: ['Proven 3.8:1 medical cost savings ROI for Medicare plans', 'FHIR-native integration with 95% of US hospital systems'],
      isDefaultSample: true
    },
    {
      id: 'health-4',
      company_name: 'TheraLink Digital',
      fileName: 'TheraLink_Seed_MentalHealth.pdf',
      industry_vertical: 'HealthTech',
      funding_stage_guess: 'Seed ($2.5M)',
      valuation_or_ask: '$2.5M at $11M Valuation',
      business_model_summary: 'B2B Enterprise employer subscription: $5.50 PEPM',
      target_customers: 'Self-insured Enterprises (1,000+ employees)',
      tam_sam_som_figures: {
        tam: '$14.0 Billion (Global Workplace Behavioral Health Solutions)',
        sam: '$4.5 Billion (US Self-Insured Enterprise Workforces)',
        som: '$320 Million (Tech & Professional Services Employers)'
      },
      traction_metrics_mentioned: ['$780K ARR', '24 enterprise customers', '72-hour first-appointment match rate', '82% clinical symptom reduction score'],
      slide_count: 10,
      slide_topics_present: ['Workplace Burnout', 'Precision Matching Platform', 'Clinical Outcomes', 'Market Size', 'Enterprise Traction', 'Provider Network', 'Financials', 'Ask'],
      notable_claims: ['Matches employees with licensed therapist in <24 hours vs 48-day national average', '4.9/5 patient Net Promoter Score'],
      isDefaultSample: true
    },
    {
      id: 'health-5',
      company_name: 'CardioEcho AI',
      fileName: 'CardioEcho_Seed_Ultrasound.pdf',
      industry_vertical: 'HealthTech',
      funding_stage_guess: 'Seed ($3.0M)',
      valuation_or_ask: '$3.0M at $13M Cap',
      business_model_summary: '$1,200/month/device cloud AI ejection fraction analysis SaaS',
      target_customers: 'Hospital Emergency Departments & Urgent Care Chains',
      tam_sam_som_figures: {
        tam: '$9.5 Billion (Point-of-Care Ultrasound Diagnostic AI)',
        sam: '$2.8 Billion (US & EU Emergency & Critical Care Ultrasound)',
        som: '$240 Million (Top 5,000 US Hospital Emergency Departments)'
      },
      traction_metrics_mentioned: ['12 clinical hospital trials', '99.1% concordance with board-certified sonographers', 'FDA Breakthrough Device Designation granted', '$400K booked contracts'],
      slide_count: 10,
      slide_topics_present: ['Echo Expertise Shortage', 'Real-Time Guidance AI', 'Diagnostic Accuracy', 'Market Size', 'Clinical Evidence', 'Hospital Workflow', 'Team', 'Series Seed Ask'],
      notable_claims: ['Enables any nurse or EMT to capture diagnostic-quality cardiac echoes in 3 minutes', 'FDA Breakthrough Device status'],
      isDefaultSample: true
    },
    {
      id: 'health-6',
      company_name: 'TrialMatch Bio',
      fileName: 'TrialMatch_SeriesA_ClinicalRecruiting.pdf',
      industry_vertical: 'HealthTech',
      funding_stage_guess: 'Series A ($7.0M)',
      valuation_or_ask: '$7.0M at $35M Valuation',
      business_model_summary: '$35,000 per qualified enrolled oncology/rare disease patient trial participant',
      target_customers: 'Top 50 Global Pharmaceutical Sponsors & Biotech CROs',
      tam_sam_som_figures: {
        tam: '$16.0 Billion (Global Clinical Trial Recruitment & Retention)',
        sam: '$5.2 Billion (Phase II/III US Oncology & Rare Disease Trials)',
        som: '$510 Million (Biotech Sponsors in Boston & Bay Area)'
      },
      traction_metrics_mentioned: ['$3.1M revenue in 2023', '18 active Pharma sponsor contracts', '3.5x faster recruitment velocity', '92% trial retention rate'],
      slide_count: 12,
      slide_topics_present: ['Clinical Trial Delay Costs', 'Federated EHR Patient Search', 'Sponsor ROI', 'Market Size', 'Customer Case Studies', 'Pharma Pipeline', 'Data Security & HIPAA', 'Team', 'Capital Ask'],
      notable_claims: ['Pharmaceutical sponsors lose $1M/day in delayed patent exclusivity during enrollment delays', 'Proprietary federated EHR network across 40 health systems'],
      isDefaultSample: true
    },
    {
      id: 'health-7',
      company_name: 'SurgiGuide AR',
      fileName: 'SurgiGuide_Seed_Orthopedic.pdf',
      industry_vertical: 'HealthTech',
      funding_stage_guess: 'Seed ($4.0M)',
      valuation_or_ask: '$4.0M at $16M Valuation',
      business_model_summary: '$850 per surgical case disposable optical marker kit + $20K/yr software fee',
      target_customers: 'Ambulatory Surgery Centers (ASCs) & Orthopedic Surgeons',
      tam_sam_som_figures: {
        tam: '$11.0 Billion (Augmented Reality Surgical Navigation)',
        sam: '$3.4 Billion (US Total Joint Arthroplasty Procedures)',
        som: '$290 Million (High-Volume Ambulatory Surgery Centers)'
      },
      traction_metrics_mentioned: ['140 successful live patient knee/hip surgeries', '0.8mm implant alignment precision', 'FDA 510(k) clearance submitted', '5 ASC letters of intent'],
      slide_count: 11,
      slide_topics_present: ['Robotic Surgery High Cost', 'AR Headset Navigation', 'Surgical Accuracy Data', 'Market Opportunity', 'Clinical Video Cases', 'Economics for ASCs', 'IP Portfolio', 'Team', 'Funding Ask'],
      notable_claims: ['Costs $15K per system vs $1.2M for legacy surgical robots like Mako/Stryker', 'Sub-millimeter implant positioning accuracy'],
      isDefaultSample: true
    },
    {
      id: 'health-8',
      company_name: 'DermAI Diagnostics',
      fileName: 'DermAI_Seed_Triage.pdf',
      industry_vertical: 'HealthTech',
      funding_stage_guess: 'Seed ($2.2M)',
      valuation_or_ask: '$2.2M at $9.5M Cap',
      business_model_summary: '$18 per dermoscopy AI triage read for Primary Care Physicians',
      target_customers: 'Primary Care Physician Networks & Urgent Care Centers',
      tam_sam_som_figures: {
        tam: '$8.2 Billion (Global Dermatology Telehealth & Screening)',
        sam: '$2.4 Billion (US Outpatient Skin Lesion Triage in Primary Care)',
        som: '$190 Million (Primary Care Groups in Sunbelt States)'
      },
      traction_metrics_mentioned: ['60,000 skin lesions screened', '97.4% melanoma sensitivity in blind trial', '$380K ARR', 'CE Mark & FDA 510(k) in progress'],
      slide_count: 10,
      slide_topics_present: ['Dermatologist 6-Month Wait Time', 'Smartphone Optical Attachment', 'AI Melanoma Classifier', 'Market Sizing', 'Primary Care Workflow', 'Reimbursement', 'Team', 'Seed Milestones'],
      notable_claims: ['Triages malignant melanoma in 15 seconds during routine annual physical exams', 'Prevents 70% of unnecessary benign skin biopsies'],
      isDefaultSample: true
    },
    {
      id: 'health-9',
      company_name: 'NeuroVibe Therapeutics',
      fileName: 'NeuroVibe_SeriesA_Neuromod.pdf',
      industry_vertical: 'HealthTech',
      funding_stage_guess: 'Series A ($8.5M)',
      valuation_or_ask: '$8.5M at $40M Valuation',
      business_model_summary: '$2,400 per prescribed neuromodulation headset + $99/mo app subscription',
      target_customers: 'Chronic Migraine & Insomnia Patients via Neurologist Rx',
      tam_sam_som_figures: {
        tam: '$21.0 Billion (Non-Invasive Neuromodulation & Bioelectronic Medicine)',
        sam: '$5.8 Billion (Refractory Chronic Migraine Sufferers in US/EU)',
        som: '$480 Million (Target Patients with Commercial Insurance Coverage)'
      },
      traction_metrics_mentioned: ['$2.1M run-rate sales', '8,400 active device users', '62% reduction in monthly migraine days', 'Pivotal Phase III clinical trial completed'],
      slide_count: 12,
      slide_topics_present: ['Drug Side Effect Burden', 'Bioelectronic Nerve Stimulation', 'Phase III Clinical Results', 'Market Landscape', 'DTC & Rx Commercial Traction', 'Reimbursement Coverage', 'Manufacturing & Margins', 'Team', 'Series A Plan'],
      notable_claims: ['Non-invasive vagus nerve stimulation with zero pharmaceutical drug interactions', 'Covered by top commercial payors under dedicated HCPCS code'],
      isDefaultSample: true
    },
    {
      id: 'health-10',
      company_name: 'GenoLink Health',
      fileName: 'GenoLink_Seed_Pharmacogenomics.pdf',
      industry_vertical: 'HealthTech',
      funding_stage_guess: 'Seed ($2.8M)',
      valuation_or_ask: '$2.8M at $12M Cap',
      business_model_summary: '$120 per pharmacogenomic drug-interaction report via clinic billing',
      target_customers: 'Psychiatry Clinics & Senior Living Healthcare Systems',
      tam_sam_som_figures: {
        tam: '$13.5 Billion (Global Pharmacogenomics & Precision Prescribing)',
        sam: '$3.9 Billion (Polypharmacy Patients on 5+ Prescriptions)',
        som: '$310 Million (Psychiatric & Geriatric Specialist Clinics)'
      },
      traction_metrics_mentioned: ['16,000 patients genotyped', '$620K ARR', '4.6x reduction in adverse drug events', '18 health system partners'],
      slide_count: 10,
      slide_topics_present: ['Adverse Drug Event Crisis', 'Saliva-to-Prescription Software', 'Clinical Accuracy', 'Market Size', 'Clinic Traction', 'Lab Integration', 'Unit Economics', 'Team', 'Capital Ask'],
      notable_claims: ['Adverse drug interactions cause 100,000 deaths annually in the US', 'Instantly flags psychiatric drug metabolizer incompatibilities'],
      isDefaultSample: true
    }
  ],

  Fintech: [
    {
      id: 'fintech-1',
      company_name: 'Stripe',
      fileName: 'Stripe_SeriesA_Bench.pdf',
      industry_vertical: 'Fintech',
      funding_stage_guess: 'Series A ($2.0M)',
      valuation_or_ask: '$2.0M at $20M Valuation',
      business_model_summary: '2.9% + 30c per credit card transaction processed online',
      target_customers: 'Software Developers, Internet Startups, SaaS Providers',
      tam_sam_som_figures: {
        tam: '$12.0 Billion (Global Developer Payment APIs)',
        sam: '$3.5 Billion (Online SMB & e-commerce payments)',
        som: '$350 Million (Developer-first startup market)'
      },
      traction_metrics_mentioned: ['$2.4M annualized GMV', '120 active developer platforms', '18% MoM volume growth', '$0 churn in core cohort'],
      slide_count: 11,
      slide_topics_present: ['Problem', 'Solution', 'Developer Experience', 'Market Opportunity', 'Business Model', 'Unit Economics', 'Competitive Landscape', 'Security & Compliance', 'Team', 'Funding Request'],
      notable_claims: ['7-line integration code replaces 6-week merchant bank paperwork', 'Instant API key generation'],
      isDefaultSample: true,
      deck_slides: [
        {
          slide_number: 1,
          title: 'Accepting Payments Online Is Broken',
          key_content: 'Setting up merchant accounts requires weeks of paperwork, fax machines, high setup fees, and legacy gateway integrations.',
          bullet_points: ['Average merchant account setup takes 4 to 6 weeks', 'Fragmented gateway, acquirer, and processor layers', 'Legacy gateways reject international and developer-friendly business models'],
          metrics_or_data: '4-6 weeks setup time on legacy merchant accounts',
          visual_description: 'Diagram of complicated legacy banking spaghetti vs. 1 simple API endpoint'
        },
        {
          slide_number: 2,
          title: 'Stripe: Payment Infrastructure for the Internet',
          key_content: 'A complete developer platform that turns accepting payments into a single API call with clean client libraries.',
          bullet_points: ['7 lines of JavaScript code to accept credit cards', 'Instant onboarding with zero paperwork', 'Built-in fraud detection and tokenization'],
          metrics_or_data: '7 lines of code | <5 minute developer setup',
          visual_description: 'Code snippet showing standard Stripe.js checkout integration'
        },
        {
          slide_number: 3,
          title: 'Market Opportunity: $12B+ Global Online Payments',
          key_content: 'E-commerce and SaaS are experiencing exponential growth, yet internet GDP is artificially bottlenecked by payment friction.',
          bullet_points: ['TAM: $12B global developer payment processing revenues', 'SAM: $3.5B in US online startups and SMB digital commerce', 'SOM: $350M capturing high-growth developer-first platforms'],
          metrics_or_data: 'TAM: $12B | SAM: $3.5B | SOM: $350M',
          visual_description: 'Exponential online commerce growth chart overlaid on payment volume TAM'
        },
        {
          slide_number: 4,
          title: 'Business Model: Frictionless Transaction Fee',
          key_content: 'Simple, transparent, pay-as-you-go pricing with zero setup fees, monthly maintenance fees, or hidden chargeback markups.',
          bullet_points: ['2.9% + 30 cents per successful transaction', 'Net processing spread: ~0.80% - 1.20% net revenue margin', 'High operating leverage with zero manual underwriting overhead'],
          metrics_or_data: '2.9% + $0.30 fee | ~1% net margin take-rate',
          visual_description: 'Fee breakdown table comparing legacy merchant costs vs. Stripe transparent model'
        },
        {
          slide_number: 5,
          title: 'Developer Traction & Viral Adoption',
          key_content: 'Unprecedented bottom-up adoption driven entirely by developer word of mouth and hackathon developer love.',
          bullet_points: ['$2.4M annualized GMV processed in first year', '120 active developer SaaS & marketplace platforms', '18% compounded Month-over-Month volume growth', 'Zero churn in founding developer cohorts'],
          metrics_or_data: '$2.4M GMV | 18% MoM Growth | 0% Cohort Churn',
          visual_description: 'Monthly GMV transaction volume growth curve'
        }
      ]
    },
    {
      id: 'fintech-2',
      company_name: 'Brex',
      fileName: 'Brex_Seed_Benchmark.pdf',
      industry_vertical: 'Fintech',
      funding_stage_guess: 'Seed ($7.0M)',
      valuation_or_ask: '$7.0M at $28M Valuation',
      business_model_summary: '2.4% interchange fee on corporate credit card transaction volume',
      target_customers: 'Venture-backed Tech Startups & High-Growth Scaleups',
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
      id: 'fintech-3',
      company_name: 'Plaid Technologies',
      fileName: 'Plaid_SeriesA_APIs.pdf',
      industry_vertical: 'Fintech',
      funding_stage_guess: 'Series A ($4.2M)',
      valuation_or_ask: '$4.2M at $22M Valuation',
      business_model_summary: '$0.30 to $1.50 per successful bank account authentication & transaction sync API call',
      target_customers: 'FinTech Apps (Robinhood, Venmo, Coinbase) & Neo-Banks',
      tam_sam_som_figures: {
        tam: '$15.0 Billion (Open Banking & Financial Data APIs)',
        sam: '$4.1 Billion (US Consumer Fintech & Lending Apps)',
        som: '$380 Million (Top 500 Fintech Startups)'
      },
      traction_metrics_mentioned: ['180 fintech developer customers', '3.5M connected bank accounts', '15% MoM API call volume growth', '99.2% bank connectivity uptime'],
      slide_count: 10,
      slide_topics_present: ['Bank Scraper Fragility', 'Unified Core Banking API', 'Market Opportunity', 'Developer Traction', 'Business Model', 'Security Architecture', 'Team', 'Series A Plan'],
      notable_claims: ['Connects to 11,000+ US financial institutions in 3 clicks', 'Powers authentication for the top 10 consumer finance apps'],
      isDefaultSample: true
    },
    {
      id: 'fintech-4',
      company_name: 'PayStream Global',
      fileName: 'PayStream_Seed_FX.pdf',
      industry_vertical: 'Fintech',
      funding_stage_guess: 'Seed ($3.5M)',
      valuation_or_ask: '$3.5M at $15M Cap',
      business_model_summary: '0.25% FX smart routing spread on cross-border payments',
      target_customers: 'Global SaaS Exporters & Cross-Border B2B Marketplaces',
      tam_sam_som_figures: {
        tam: '$32.0 Billion (Global Cross-Border B2B Payments & FX)',
        sam: '$8.5 Billion (Digital Exporters in APAC & LATAM)',
        som: '$640 Million (SaaS & Digital Goods Exporters)'
      },
      traction_metrics_mentioned: ['$14M quarterly payment volume', '65 enterprise exporters', '90% lower FX fees vs legacy SWIFT', '$220K monthly gross revenue'],
      slide_count: 11,
      slide_topics_present: ['SWIFT Friction', 'Smart FX Treasury Routing', 'Unit Economics', 'Market Size', 'GTM Traction', 'Licensing & Compliance', 'Team', 'Capital Ask'],
      notable_claims: ['Replaces 3.5% wire fees with 0.25% instant virtual local IBAN settlement', 'Instant liquidity in 45 currency pairs'],
      isDefaultSample: true
    },
    {
      id: 'fintech-5',
      company_name: 'CapTable Pro',
      fileName: 'CapTable_Seed_Equity.pdf',
      industry_vertical: 'Fintech',
      funding_stage_guess: 'Seed ($2.4M)',
      valuation_or_ask: '$2.4M at $10M Valuation',
      business_model_summary: '$1,500/year base subscription + $10/stakeholder/year SaaS',
      target_customers: 'Seed & Series A Venture-Backed Startups',
      tam_sam_som_figures: {
        tam: '$6.5 Billion (Cap Table, Equity Management & 409A Valuations)',
        sam: '$1.8 Billion (US VC-Backed Startups & Law Firms)',
        som: '$150 Million (Early-Stage Tech Founders)'
      },
      traction_metrics_mentioned: ['450 active startup cap tables', '$580K ARR', '98% renewal rate', '40 partner law firms referring deals'],
      slide_count: 10,
      slide_topics_present: ['Excel Cap Table Chaos', 'Automated Equity Ledger', '409A Valuation Engine', 'Market Size', 'Traction', 'Law Firm Channels', 'Financials', 'Ask'],
      notable_claims: ['Eliminates costly $5,000 legal fees for standard equity grant issuances', 'Automated 409A valuation delivery in 48 hours'],
      isDefaultSample: true
    }
  ],

  'AI/ML': [
    {
      id: 'ai-1',
      company_name: 'CognitiveNode AI',
      fileName: 'CognitiveNode_AI_Seed.pdf',
      industry_vertical: 'AI/ML',
      funding_stage_guess: 'Seed ($3.0M)',
      valuation_or_ask: '$3.0M at $15M Post-Money',
      business_model_summary: '$0.002 per agentic routing call + $500/month enterprise gateway license',
      target_customers: 'Enterprise Software Engineering Teams & AI Product Orgs',
      tam_sam_som_figures: {
        tam: '$22.0 Billion (Enterprise AI Infrastructure & Agentic Middleware)',
        sam: '$5.4 Billion (Fortune 2000 Financial & Insurance Engineering)',
        som: '$420 Million (Fintech & Insurtech engineering orgs)'
      },
      traction_metrics_mentioned: ['$950K ARR', '28 enterprise engineering teams', '4.8x GPU inference cost reduction', '99.9% uptime SLA'],
      slide_count: 11,
      slide_topics_present: ['The AI Compute Bottleneck', 'Cognitive Routing Middleware', 'Benchmark Performance', 'Enterprise TAM', 'Developer Adoption', 'Monetization Architecture', 'Security & Compliance', 'Founding Team', 'Capital Requirements'],
      notable_claims: ['70% reduction in LLM inference token latency', '$0.002 per agent routing call', 'SOC2 Type II certified'],
      isDefaultSample: true,
      deck_slides: [
        {
          slide_number: 1,
          title: 'The Enterprise LLM Latency & Cost Crisis',
          key_content: 'Enterprises deploying multi-agent AI systems suffer from unpredictable GPU token costs, 12-second roundtrip latencies, and vendor lock-in to single model providers.',
          bullet_points: ['Enterprise token bills growing at 35% MoM', 'Cascading agent calls fail on 8% of complex queries', 'Lack of compliance audit logs for regulated industries'],
          metrics_or_data: '12s average agent workflow latency | 35% monthly cost inflation',
          visual_description: 'Diagram showing exploding inference expenses across unoptimized multi-agent loops'
        },
        {
          slide_number: 2,
          title: 'CognitiveNode: Real-Time Semantic LLM Router',
          key_content: 'An intelligent proxy that dynamically routes queries between small edge models and frontier models, reducing costs by 70% while improving benchmark accuracy.',
          bullet_points: ['Sub-10ms semantic intent classification', 'Automated fallbacks with multi-provider redundancy', 'Enterprise guardrails and PII token redaction'],
          metrics_or_data: '70% cost reduction | <10ms routing overhead',
          visual_description: 'Architecture diagram showing intelligent router dispatching to specialized SLMs and frontier LLMs'
        },
        {
          slide_number: 3,
          title: 'Market Size: $22B AI Middleware Layer',
          key_content: 'As every application becomes an AI application, the middleware routing layer represents the highest-margin software utility in computing history.',
          bullet_points: ['TAM: $22B Enterprise AI orchestration and routing software', 'SAM: $5.4B in high-security Financial & Healthcare engineering orgs', 'SOM: $420M capturing early-adopter fintech & insurtech developer teams'],
          metrics_or_data: 'TAM: $22B | SAM: $5.4B | SOM: $420M',
          visual_description: 'Standard 3-ring market sizing visualization with enterprise seat counts'
        }
      ]
    },
    {
      id: 'ai-2',
      company_name: 'Synthetix Data',
      fileName: 'Synthetix_Seed_DataGen.pdf',
      industry_vertical: 'AI/ML',
      funding_stage_guess: 'Seed ($4.0M)',
      valuation_or_ask: '$4.0M at $18M Valuation',
      business_model_summary: '$12,000 per synthetic multimodal fine-tuning dataset generation',
      target_customers: 'Autonomous Vehicle Developers & Robotics AI Labs',
      tam_sam_som_figures: {
        tam: '$16.5 Billion (Synthetic Data Generation & Foundation Model Training)',
        sam: '$4.2 Billion (Autonomous Systems & Industrial Robotics Teams)',
        som: '$350 Million (Robotics & Vision Startups)'
      },
      traction_metrics_mentioned: ['$1.2M booked revenue in Year 1', '14 robotics lab customers', '100M synthetic photorealistic frames rendered', '3.2x faster perception model convergence'],
      slide_count: 10,
      slide_topics_present: ['Real-World Data Scarcity', 'Physics-Engine Synthetic Data', 'Model Benchmark Gains', 'Market Size', 'Customer Proof Points', 'Unit Economics', 'Team', 'Seed Ask'],
      notable_claims: ['Solves corner-case perception failures without expensive physical vehicle fleets', 'Generates 1M edge-case scenarios per hour'],
      isDefaultSample: true
    },
    {
      id: 'ai-3',
      company_name: 'PromptArmor',
      fileName: 'PromptArmor_Seed_LLMSecurity.pdf',
      industry_vertical: 'AI/ML',
      funding_stage_guess: 'Seed ($2.5M)',
      valuation_or_ask: '$2.5M at $12M Cap',
      business_model_summary: '$2,500/month/enterprise application firewall subscription',
      target_customers: 'Enterprise CISOs & Chief AI Officers',
      tam_sam_som_figures: {
        tam: '$11.0 Billion (Generative AI Security, Firewall & Red-Teaming)',
        sam: '$3.2 Billion (Global 2000 Enterprises deploying RAG systems)',
        som: '$280 Million (Fintech & Healthcare AI Deployments)'
      },
      traction_metrics_mentioned: ['99.7% detection rate for indirect prompt injection attacks', '$720K ARR', '22 enterprise contracts', 'Zero latency penalty (<5ms)'],
      slide_count: 10,
      slide_topics_present: ['Prompt Injection Threats', 'Real-Time Neural Firewall', 'Attack Benchmark Data', 'Market Size', 'Enterprise Case Studies', 'GTM Strategy', 'Founders', 'Capital Ask'],
      notable_claims: ['Stops OWASP Top 10 for LLM vulnerabilities in real-time', 'Blocks malicious data exfiltration via poisoned RAG documents'],
      isDefaultSample: true
    }
  ],

  SaaS: [
    {
      id: 'saas-1',
      company_name: 'Buffer',
      fileName: 'Buffer_SeriesA_Deck.pdf',
      industry_vertical: 'SaaS',
      funding_stage_guess: 'Seed / Series A ($450K)',
      valuation_or_ask: '$450K at $5M Valuation',
      business_model_summary: '$10/month per user social media scheduling SaaS subscription',
      target_customers: 'Social Media Managers, SMBs, Content Creators, Agencies',
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
      id: 'saas-2',
      company_name: 'Loom',
      fileName: 'Loom_Seed_Reference.pdf',
      industry_vertical: 'SaaS',
      funding_stage_guess: 'Seed ($3.8M)',
      valuation_or_ask: '$3.8M at $20M Valuation',
      business_model_summary: '$10/user/month workspace tier for async video communication',
      target_customers: 'Remote Product, Engineering, and Design Teams',
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
      id: 'saas-3',
      company_name: 'Notion',
      fileName: 'Notion_Seed_Workspace.pdf',
      industry_vertical: 'SaaS',
      funding_stage_guess: 'Seed ($2.0M)',
      valuation_or_ask: '$2.0M at $15M Valuation',
      business_model_summary: 'Freemium with $8/user/month team workspace plan',
      target_customers: 'Knowledge Workers, Startups, Product Teams',
      tam_sam_som_figures: {
        tam: '$18.0 Billion (Collaborative Workspaces & Document Management)',
        sam: '$5.0 Billion (Global Tech Startups & Agencies)',
        som: '$450 Million (Early Adopter Tech Workers)'
      },
      traction_metrics_mentioned: ['500,000 active users', 'Product-Led Growth (PLG)', '45,000 paying teams', '140% Net Revenue Retention'],
      slide_count: 10,
      slide_topics_present: ['Siloed Tools Problem', 'All-in-One Modular Workspace', 'Templates & Community', 'Market Sizing', 'PLG Growth Velocity', 'Unit Economics', 'Team', 'The Ask'],
      notable_claims: ['Replaces Google Docs, Trello, Confluence, and Evernote with single canvas', 'Community templates drive 60% of new customer acquisition'],
      isDefaultSample: true
    }
  ],

  CleanTech: [
    {
      id: 'clean-1',
      company_name: 'Verdant Energy',
      fileName: 'VerdantEnergy_CleanTech_Benchmark.pdf',
      industry_vertical: 'CleanTech',
      funding_stage_guess: 'Seed ($2.5M)',
      valuation_or_ask: '$2.5M at $11M Valuation',
      business_model_summary: 'Energy-as-a-Service: $0 upfront, 15% revenue share on saved electricity bills',
      target_customers: 'Industrial Parks, Cold Storage Facilities & Warehouses',
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
      id: 'clean-2',
      company_name: 'Heirloom Carbon',
      fileName: 'Heirloom_SeriesA_DirectAirCapture.pdf',
      industry_vertical: 'CleanTech',
      funding_stage_guess: 'Series A ($10.0M)',
      valuation_or_ask: '$10.0M at $50M Valuation',
      business_model_summary: '$450/ton permanent high-durability carbon removal credits sold to Microsoft/Stripe',
      target_customers: 'Fortune 500 Net-Zero Corporate Buyers & Frontier Carbon Fund',
      tam_sam_som_figures: {
        tam: '$50.0 Billion (Permanent Engineered Carbon Dioxide Removal)',
        sam: '$12.0 Billion (Voluntary Corporate High-Quality Carbon Purchases)',
        som: '$1.2 Billion (Tech & Financial Services Corporate Offtakers)'
      },
      traction_metrics_mentioned: ['$45M multi-year offtake purchase agreements', 'Operating commercial facility in California', 'Low-cost mineral looping using abundant limestone', 'MRV verification completed'],
      slide_count: 11,
      slide_topics_present: ['Climate Target Gap', 'Limestone Mineral Looping', 'Levelized Cost Curve', 'Market Demand', 'Commercial Facility Operations', 'Corporate Offtake Backlog', 'Leadership Team', 'Series A Ask'],
      notable_claims: ['Path to <$100/ton carbon removal at gigaton scale', '1,000-year permanent geological mineralization'],
      isDefaultSample: true
    }
  ],

  EdTech: [
    {
      id: 'edtech-1',
      company_name: 'Edify Learning',
      fileName: 'Edify_EdTech_SeriesA.pdf',
      industry_vertical: 'EdTech',
      funding_stage_guess: 'Series A ($4.0M)',
      valuation_or_ask: '$4.0M at $18M Valuation',
      business_model_summary: '$12 per student per year school district annual software license',
      target_customers: 'K-12 US Public School Districts & Superintendents',
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
    }
  ],

  Marketplace: [
    {
      id: 'market-1',
      company_name: 'Airbnb',
      fileName: 'Airbnb_Seed_Deck.pdf',
      industry_vertical: 'Marketplace',
      funding_stage_guess: 'Seed ($600K)',
      valuation_or_ask: '$600K at $3.0M Valuation',
      business_model_summary: '10% guest booking fee + 3% host payment fee',
      target_customers: 'Budget Travelers & Event Attendees, Homeowners with Spare Rooms',
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
      id: 'market-2',
      company_name: 'Uber',
      fileName: 'Uber_Pitch_Deck_2008.pdf',
      industry_vertical: 'Marketplace',
      funding_stage_guess: 'Seed ($1.25M)',
      valuation_or_ask: '$1.25M at $5.0M Valuation',
      business_model_summary: '20% commission on on-demand car rides booked via mobile app',
      target_customers: 'Urban Professionals Needing Fast Reliable Rides, Black Car Drivers',
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
    }
  ]
};

// Flattened list for fallback
export const SAMPLE_BENCHMARKS: BenchmarkDeck[] = [
  ...ALL_INDUSTRY_BENCHMARKS.HealthTech,
  ...ALL_INDUSTRY_BENCHMARKS.Fintech,
  ...ALL_INDUSTRY_BENCHMARKS['AI/ML'],
  ...ALL_INDUSTRY_BENCHMARKS.SaaS,
  ...ALL_INDUSTRY_BENCHMARKS.CleanTech,
  ...ALL_INDUSTRY_BENCHMARKS.EdTech,
  ...ALL_INDUSTRY_BENCHMARKS.Marketplace,
];

// Helper to get 10 strictly relevant reference benchmark decks based on user industry vertical and idea
export function getRelevantBenchmarkDecks(
  vertical: string,
  businessIdea: string = '',
  customDecks: BenchmarkDeck[] = []
): BenchmarkDeck[] {
  const normVertical = (vertical || '').trim().toLowerCase();
  const normIdea = (businessIdea || '').toLowerCase();

  // 1. Check direct vertical matches
  let matchedGroup: BenchmarkDeck[] = [];

  if (
    normVertical.includes('health') ||
    normVertical.includes('bio') ||
    normVertical.includes('med') ||
    normVertical.includes('clinic') ||
    normVertical.includes('doctor') ||
    normVertical.includes('patient') ||
    normIdea.includes('health') ||
    normIdea.includes('cardiac') ||
    normIdea.includes('patient') ||
    normIdea.includes('clinic') ||
    normIdea.includes('pharma') ||
    normIdea.includes('medical')
  ) {
    matchedGroup = ALL_INDUSTRY_BENCHMARKS.HealthTech || [];
  } else if (
    normVertical.includes('fintech') ||
    normVertical.includes('finance') ||
    normVertical.includes('pay') ||
    normVertical.includes('bank') ||
    normIdea.includes('payment') ||
    normIdea.includes('treasury') ||
    normIdea.includes('banking') ||
    normIdea.includes('fintech')
  ) {
    matchedGroup = ALL_INDUSTRY_BENCHMARKS.Fintech || [];
  } else if (
    normVertical.includes('ai') ||
    normVertical.includes('machine learning') ||
    normVertical.includes('deeptech') ||
    normIdea.includes('ai agent') ||
    normIdea.includes('llm') ||
    normIdea.includes('artificial intelligence') ||
    normIdea.includes('neural')
  ) {
    matchedGroup = ALL_INDUSTRY_BENCHMARKS['AI/ML'] || [];
  } else if (
    normVertical.includes('saas') ||
    normVertical.includes('enterprise') ||
    normVertical.includes('cyber') ||
    normVertical.includes('b2b')
  ) {
    matchedGroup = ALL_INDUSTRY_BENCHMARKS.SaaS || [];
  } else if (
    normVertical.includes('clean') ||
    normVertical.includes('energy') ||
    normVertical.includes('climate')
  ) {
    matchedGroup = ALL_INDUSTRY_BENCHMARKS.CleanTech || [];
  } else if (
    normVertical.includes('edtech') ||
    normVertical.includes('education') ||
    normVertical.includes('learn')
  ) {
    matchedGroup = ALL_INDUSTRY_BENCHMARKS.EdTech || [];
  } else if (
    normVertical.includes('market') ||
    normVertical.includes('consumer') ||
    normVertical.includes('commerce')
  ) {
    matchedGroup = ALL_INDUSTRY_BENCHMARKS.Marketplace || [];
  } else {
    // Default to vertical or full sample
    matchedGroup = ALL_INDUSTRY_BENCHMARKS.HealthTech || [];
  }

  // Prepend any custom uploaded decks that match
  const combined = [...customDecks, ...matchedGroup];

  // If combined has fewer than 10, fill up with other high-quality decks
  if (combined.length < 10) {
    for (const d of SAMPLE_BENCHMARKS) {
      if (!combined.some((c) => c.id === d.id)) {
        combined.push(d);
        if (combined.length >= 10) break;
      }
    }
  }

  return combined.slice(0, 10);
}
