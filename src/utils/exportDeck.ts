import pptxgen from 'pptxgenjs';
import { jsPDF } from 'jspdf';
import { GeneratedDeckData, PitchSlide, InvestorCritique } from '../types';

function sanitizeFilename(text: string): string {
  return text.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 40) || 'PitchDeck';
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Generates and downloads a direct native PowerPoint (.pptx) file
 * 16:9 widescreen layout with slide layouts, metrics, and presenter notes
 */
export async function downloadPPTXDeck(
  data: GeneratedDeckData,
  businessIdea: string,
  industryVertical: string,
  targetAudience?: string
) {
  const safeName = sanitizeFilename(industryVertical || 'Startup');
  const pres = new pptxgen();

  // Configure 16:9 Widescreen Presentation
  pres.layout = 'LAYOUT_16x9';
  pres.title = `${industryVertical || 'Institutional'} Pitch Deck`;
  pres.subject = businessIdea.slice(0, 100);
  pres.author = 'PitchBench AI Benchmark Engine';

  // 1. Cover Slide
  const titleSlide = pres.addSlide();
  titleSlide.background = { color: '09090B' };

  titleSlide.addText('PITCHBENCH GROUNDED DECK', {
    x: 0.8,
    y: 1.2,
    w: 8.0,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    bold: true,
    color: '10B981',
    charSpacing: 2,
  });

  titleSlide.addText(
    `${industryVertical || 'Institutional'} Venture Pitch`,
    {
      x: 0.8,
      y: 1.8,
      w: 11.5,
      h: 1.2,
      fontSize: 34,
      fontFace: 'Arial',
      bold: true,
      color: 'FFFFFF',
    }
  );

  titleSlide.addText(
    businessIdea,
    {
      x: 0.8,
      y: 3.2,
      w: 11.5,
      h: 1.5,
      fontSize: 16,
      fontFace: 'Arial',
      color: 'D4D4D8',
      lineSpacingMultiple: 1.2,
    }
  );

  if (targetAudience) {
    titleSlide.addText(`Target Market / Customer: ${targetAudience}`, {
      x: 0.8,
      y: 4.8,
      w: 11.0,
      h: 0.35,
      fontSize: 13,
      fontFace: 'Arial',
      color: 'A1A1AA',
    });
  }

  if (data.investor_persona) {
    titleSlide.addText(`Target Investor Lens: ${data.investor_persona}`, {
      x: 0.8,
      y: 5.25,
      w: 11.0,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: '34D399',
    });
  }

  // Cover footer benchmark badge
  const benchmarkCount = data.benchmark_summary?.decks_used_count || 10;
  titleSlide.addText(
    `Grounded in ${benchmarkCount} institutional peer benchmark pitch decks (${industryVertical})`,
    {
      x: 0.8,
      y: 6.2,
      w: 11.5,
      h: 0.4,
      fontSize: 11,
      fontFace: 'Courier New',
      color: '71717A',
    }
  );

  // 2. Individual 10 Pitch Slides
  data.slides.forEach((slide) => {
    const s = pres.addSlide();
    s.background = { color: '09090B' };

    const critique = data.critiques?.find((c) => c.slide_number === slide.slide_number);
    const isFixed = critique?.is_fixed || critique?.severity === 'fixed';

    // Slide Tag & Category
    s.addText(
      `SLIDE ${slide.slide_number} OF ${data.slides.length} • ${slide.slide_name.toUpperCase()}`,
      {
        x: 0.8,
        y: 0.5,
        w: 9.0,
        h: 0.3,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: 'A1A1AA',
        charSpacing: 1.5,
      }
    );

    // Slide Headline
    s.addText(slide.headline, {
      x: 0.8,
      y: 0.9,
      w: 11.7,
      h: 0.9,
      fontSize: 22,
      fontFace: 'Arial',
      bold: true,
      color: 'FFFFFF',
      lineSpacingMultiple: 1.1,
    });

    // Left Column: Narrative & Bullets (width 6.8 inches)
    const leftTextBlocks: any[] = [];
    leftTextBlocks.push({
      text: slide.detailed_content + '\n\n',
      options: { fontSize: 13, color: 'D4D4D8', lineSpacingMultiple: 1.2 },
    });

    if (slide.key_points && slide.key_points.length > 0) {
      slide.key_points.forEach((pt) => {
        leftTextBlocks.push({
          text: `•  ${pt}\n`,
          options: { fontSize: 13, color: 'F4F4F5', bold: true, lineSpacingMultiple: 1.2 },
        });
      });
    }

    s.addText(leftTextBlocks, {
      x: 0.8,
      y: 1.9,
      w: 6.8,
      h: 4.4,
      fontFace: 'Arial',
      valign: 'top',
    });

    // Right Column: Metric Cards & Investor Defense (width 4.6 inches)
    let rightY = 1.9;

    // Metrics Table / Box
    if (slide.numeric_claims && slide.numeric_claims.length > 0) {
      const metricRows: any[][] = [
        [
          { text: 'METRIC', options: { bold: true, color: 'A1A1AA', fontSize: 9 } },
          { text: 'VALUE', options: { bold: true, color: 'A1A1AA', fontSize: 9 } },
          { text: 'BENCHMARK STATUS', options: { bold: true, color: 'A1A1AA', fontSize: 9 } },
        ],
      ];

      slide.numeric_claims.slice(0, 3).forEach((claim) => {
        metricRows.push([
          { text: claim.metric, options: { fontSize: 10, color: 'FFFFFF', bold: true } },
          { text: claim.value, options: { fontSize: 11, color: '10B981', bold: true } },
          {
            text: claim.within_benchmark_range ? 'Verified Peer Range' : 'Outlier / High',
            options: {
              fontSize: 9,
              color: claim.within_benchmark_range ? '34D399' : 'FBBF24',
            },
          },
        ]);
      });

      s.addTable(metricRows, {
        x: 8.0,
        y: rightY,
        w: 4.5,
        fill: { color: '18181B' },
        border: { type: 'solid', pt: 1, color: '27272A' },
        colW: [1.8, 1.2, 1.5],
        autoPage: false,
      });

      rightY += 1.6;
    }

    // Suggested Visual Card
    if (slide.suggested_visual) {
      s.addShape(pres.ShapeType.rect, {
        x: 8.0,
        y: rightY,
        w: 4.5,
        h: 1.1,
        fill: { color: '18181B' },
        line: { color: '3F3F46', width: 1, dashType: 'dash' },
      });

      s.addText(
        `🎨 VISUAL DIRECTION:\n${slide.suggested_visual}`,
        {
          x: 8.1,
          y: rightY + 0.08,
          w: 4.3,
          h: 0.95,
          fontSize: 10,
          fontFace: 'Arial',
          color: 'A1A1AA',
        }
      );

      rightY += 1.25;
    }

    // Investor Defense Card
    if (critique) {
      const bgColor = isFixed ? '064E3B' : '27272A';
      const borderColor = isFixed ? '10B981' : '52525B';

      s.addShape(pres.ShapeType.rect, {
        x: 8.0,
        y: rightY,
        w: 4.5,
        h: 1.4,
        fill: { color: bgColor },
        line: { color: borderColor, width: 1 },
      });

      s.addText(
        `${isFixed ? '✓ DEFENSE REINFORCED' : 'INVESTOR PUSHBACK'}: ${critique.concern}\nFIX: ${critique.suggested_fix}`,
        {
          x: 8.1,
          y: rightY + 0.08,
          w: 4.3,
          h: 1.25,
          fontSize: 10,
          fontFace: 'Arial',
          color: isFixed ? 'A7F3D0' : 'E4E4E7',
        }
      );
    }

    // Footer
    s.addText(`PitchBench Grounded Deck • ${industryVertical}`, {
      x: 0.8,
      y: 6.8,
      w: 6.0,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Courier New',
      color: '52525B',
    });

    s.addText(`Slide ${slide.slide_number} of ${data.slides.length}`, {
      x: 10.0,
      y: 6.8,
      w: 2.5,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Courier New',
      color: '52525B',
      align: 'right',
    });

    // Presenter Notes
    let notes = `Slide ${slide.slide_number}: ${slide.slide_name}\n`;
    notes += `Headline: ${slide.headline}\n\n`;
    notes += `Narrative & Speaking Track:\n${slide.detailed_content}\n\n`;
    if (critique) {
      notes += `VC Defense Preparation:\n- Concern: ${critique.concern}\n- Response: ${critique.suggested_fix}\n`;
    }
    s.addNotes(notes);
  });

  // Save PPTX
  await pres.writeFile({ fileName: `PitchBench_${safeName}_Presentation.pptx` });
}

/**
 * Generates and downloads a direct native PDF (.pdf) file
 * 16:9 landscape pages, styled cards, metrics, and investor defenses
 */
export function downloadPDFDeck(
  data: GeneratedDeckData,
  businessIdea: string,
  industryVertical: string,
  targetAudience?: string
) {
  const safeName = sanitizeFilename(industryVertical || 'Startup');

  // Standard 16:9 ratio in mm: 297mm x 167.06mm (or 280 x 157.5)
  // Let's use 297mm x 167mm landscape for crisp 16:9 slides
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [297, 167],
  });

  const total = data.slides.length;

  // 1. Cover Page
  pdf.setFillColor(9, 9, 11);
  pdf.rect(0, 0, 297, 167, 'F');

  // Emerald Tag
  pdf.setTextColor(16, 185, 129);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.text('PITCHBENCH GROUNDED VENTURE DECK', 20, 25);

  // Main Cover Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(26);
  pdf.text(`${industryVertical || 'Institutional'} Pitch Deck`, 20, 40);

  // Business Idea / Thesis Box
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(13);
  pdf.setTextColor(212, 212, 216);
  const splitIdea = pdf.splitTextToSize(businessIdea, 250);
  pdf.text(splitIdea, 20, 56);

  if (targetAudience) {
    pdf.setFontSize(10.5);
    pdf.setTextColor(161, 161, 170);
    pdf.text(`Target Audience / Customer: ${targetAudience}`, 20, 93);
  }

  if (data.investor_persona) {
    pdf.setFontSize(10.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(52, 211, 153);
    pdf.text(`Target Investor Persona Lens: ${data.investor_persona}`, 20, 100);
    pdf.setFont('helvetica', 'normal');
  }

  // Benchmark stats box
  pdf.setFillColor(24, 24, 27);
  pdf.setDrawColor(39, 39, 42);
  pdf.roundedRect(20, 110, 257, 36, 3, 3, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(255, 255, 255);
  pdf.text('Institutional Grounding & Market Calibration', 26, 120);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(161, 161, 170);
  const benchmarkCount = data.benchmark_summary?.decks_used_count || 10;
  const peerNames = data.benchmark_summary?.relevant_decks_names?.join(', ') || 'Peer cohort';
  pdf.text(
    `• Grounded across ${benchmarkCount} top-tier seed/Series A benchmark pitch decks (${peerNames})`,
    26,
    128
  );

  const applied = data.benchmark_summary?.industry_benchmarks_applied;
  if (applied) {
    pdf.text(
      `• TAM Benchmark Range: ${applied.tam_range || 'N/A'} | Typical Ask: ${applied.typical_ask_range || 'N/A'}`,
      26,
      136
    );
  }

  pdf.setTextColor(113, 113, 122);
  pdf.setFontSize(9);
  pdf.text('Generated via PitchBench Engine • Confidential Investor Presentation', 20, 158);

  // 2. Individual 10 Slides
  data.slides.forEach((slide) => {
    pdf.addPage([297, 167], 'landscape');

    // Background
    pdf.setFillColor(9, 9, 11);
    pdf.rect(0, 0, 297, 167, 'F');

    const critique = data.critiques?.find((c) => c.slide_number === slide.slide_number);
    const isFixed = critique?.is_fixed || critique?.severity === 'fixed';

    // Slide Tag & Category
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(161, 161, 170);
    pdf.text(`SLIDE ${slide.slide_number} OF ${total}  •  ${slide.slide_name.toUpperCase()}`, 20, 16);

    pdf.setFont('courier', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(113, 113, 122);
    pdf.text(`PitchBench • ${industryVertical}`, 240, 16);

    // Divider
    pdf.setDrawColor(39, 39, 42);
    pdf.line(20, 20, 277, 20);

    // Headline
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(255, 255, 255);
    const splitHeadline = pdf.splitTextToSize(slide.headline, 257);
    pdf.text(splitHeadline, 20, 29);

    // Left Column: Narrative & Key Highlights (Width ~ 145mm)
    let leftY = 44;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(212, 212, 216);
    const splitContent = pdf.splitTextToSize(slide.detailed_content, 145);
    pdf.text(splitContent, 20, leftY);

    leftY += splitContent.length * 4.6 + 6;

    if (slide.key_points && slide.key_points.length > 0) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(244, 244, 245);

      slide.key_points.forEach((pt) => {
        if (leftY < 145) {
          const splitPt = pdf.splitTextToSize(`• ${pt}`, 142);
          pdf.text(splitPt, 20, leftY);
          leftY += splitPt.length * 4.4 + 2;
        }
      });
    }

    // Right Column: Metric Cards, Visual Direction & VC Defense (Width ~ 100mm, X = 175)
    let rightY = 42;

    // Metrics Box
    if (slide.numeric_claims && slide.numeric_claims.length > 0) {
      pdf.setFillColor(24, 24, 27);
      pdf.setDrawColor(39, 39, 42);
      pdf.roundedRect(175, rightY, 102, 34, 2, 2, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8.5);
      pdf.setTextColor(161, 161, 170);
      pdf.text('GROUNDED NUMERIC CLAIMS', 180, rightY + 6);

      let metricY = rightY + 13;
      slide.numeric_claims.slice(0, 2).forEach((nc) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(161, 161, 170);
        pdf.text(nc.metric, 180, metricY);

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.text(nc.value, 180, metricY + 4.5);

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        if (nc.within_benchmark_range) {
          pdf.setTextColor(52, 211, 153);
          pdf.text('✓ Within Benchmark', 240, metricY + 4.5);
        } else {
          pdf.setTextColor(251, 191, 36);
          pdf.text('⚠️ Outlier', 240, metricY + 4.5);
        }

        metricY += 10.5;
      });

      rightY += 38;
    }

    // Suggested Visual Card
    if (slide.suggested_visual && rightY < 125) {
      pdf.setFillColor(18, 18, 20);
      pdf.setDrawColor(63, 63, 70);
      pdf.roundedRect(175, rightY, 102, 20, 2, 2, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(161, 161, 170);
      pdf.text('🎨 SUGGESTED VISUAL', 180, rightY + 5.5);

      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      pdf.setTextColor(212, 212, 216);
      const splitVisual = pdf.splitTextToSize(slide.suggested_visual, 92);
      pdf.text(splitVisual.slice(0, 2), 180, rightY + 11);

      rightY += 24;
    }

    // VC Critique Defense Box
    if (critique && rightY < 145) {
      const isCardFixed = isFixed;
      if (isCardFixed) {
        pdf.setFillColor(6, 78, 59);
        pdf.setDrawColor(16, 185, 129);
      } else {
        pdf.setFillColor(28, 25, 23);
        pdf.setDrawColor(68, 64, 60);
      }
      pdf.roundedRect(175, rightY, 102, 34, 2, 2, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(isCardFixed ? 167 : 251, isCardFixed ? 243 : 191, isCardFixed ? 208 : 36);
      pdf.text(
        isCardFixed ? '✓ DEFENSE REINFORCED' : '🛡️ INVESTOR PUSHBACK DEFENSE',
        180,
        rightY + 6
      );

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(244, 244, 245);
      const splitConcern = pdf.splitTextToSize(`Risk: ${critique.concern}`, 92);
      pdf.text(splitConcern.slice(0, 2), 180, rightY + 12);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(isCardFixed ? 209 : 212, isCardFixed ? 250 : 212, isCardFixed ? 229 : 216);
      const splitFix = pdf.splitTextToSize(`Fix: ${critique.suggested_fix}`, 92);
      pdf.text(splitFix.slice(0, 3), 180, rightY + 21);
    }

    // Footer
    pdf.setDrawColor(39, 39, 42);
    pdf.line(20, 154, 277, 154);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(113, 113, 122);
    pdf.text(
      businessIdea.length > 90 ? businessIdea.substring(0, 90) + '...' : businessIdea,
      20,
      160
    );

    pdf.setFont('courier', 'bold');
    pdf.setFontSize(8.5);
    pdf.text(`Slide ${slide.slide_number} / ${total}`, 255, 160);
  });

  // Save PDF directly to disk
  pdf.save(`PitchBench_${safeName}_Pitch_Deck.pdf`);
}

/**
 * Generates and downloads a clean Markdown file of the 10-slide deck
 */
export function downloadMarkdownDeck(
  data: GeneratedDeckData,
  businessIdea: string,
  industryVertical: string,
  targetAudience?: string
) {
  const safeName = sanitizeFilename(industryVertical || 'Startup');
  const now = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let md = `# Pitch Deck — ${industryVertical || 'Institutional Pitch'}\n\n`;
  md += `**Date:** ${now}\n`;
  md += `**Industry Vertical:** ${industryVertical || 'Tech'}\n`;
  if (targetAudience) md += `**Target Audience / Customer:** ${targetAudience}\n`;
  md += `**Core Thesis / Idea:**\n> ${businessIdea}\n\n`;
  md += `---\n\n`;

  // Benchmark grounding summary
  if (data.benchmark_summary) {
    const bs = data.benchmark_summary;
    md += `## 📊 Benchmark Grounding & Dataset\n`;
    md += `- **Reference Decks Analyzed:** ${bs.decks_used_count} industry decks\n`;
    if (bs.relevant_decks_names?.length) {
      md += `- **Peer Dataset:** ${bs.relevant_decks_names.join(', ')}\n`;
    }
    if (bs.industry_benchmarks_applied) {
      const b = bs.industry_benchmarks_applied;
      md += `- **Market Sizing Ground Truth:** TAM (${b.tam_range || 'N/A'}), SAM (${b.sam_range || 'N/A'}), SOM (${b.som_range || 'N/A'})\n`;
      md += `- **Baseline Ask Range:** ${b.typical_ask_range || 'N/A'}\n`;
    }
    md += `\n---\n\n`;
  }

  // Slides
  md += `## 📑 10-Slide Pitch Deck\n\n`;

  data.slides.forEach((slide) => {
    const critique = data.critiques?.find((c) => c.slide_number === slide.slide_number);
    const isFixed = critique?.is_fixed || critique?.severity === 'fixed';

    md += `### Slide ${slide.slide_number}: ${slide.slide_name}\n\n`;
    md += `**Headline:**\n# ${slide.headline}\n\n`;

    if (slide.key_points && slide.key_points.length > 0) {
      md += `**Key Highlights:**\n`;
      slide.key_points.forEach((pt) => {
        md += `- ${pt}\n`;
      });
      md += `\n`;
    }

    md += `**Detailed Narrative & Script:**\n${slide.detailed_content}\n\n`;

    if (slide.numeric_claims && slide.numeric_claims.length > 0) {
      md += `**Grounded Numeric Claims & Metrics:**\n`;
      md += `| Metric | Value | Benchmark Status | Context |\n`;
      md += `| :--- | :--- | :--- | :--- |\n`;
      slide.numeric_claims.forEach((claim) => {
        const status = claim.within_benchmark_range ? '✅ Within Range' : '⚠️ Outlier';
        md += `| ${claim.metric} | **${claim.value}** | ${status} | ${claim.benchmark_comparison_note || '-'} |\n`;
      });
      md += `\n`;
    }

    if (slide.suggested_visual) {
      md += `🎨 **Suggested Slide Visual:** *${slide.suggested_visual}*\n\n`;
    }

    if (critique) {
      md += `> 🛡️ **Investor Defense & VC Critique (${isFixed ? 'RESOLVED' : critique.severity.toUpperCase() + ' RISK'}):**\n`;
      md += `> - **Concern:** ${critique.concern}\n`;
      md += `> - **Defense Fix Applied:** ${critique.suggested_fix}\n`;
      md += `> - **Status:** ${isFixed ? '✅ Slide Fixed & Reinforced' : '⚠️ Pending Optimization'}\n\n`;
    }

    md += `---\n\n`;
  });

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  triggerDownload(blob, `PitchBench_${safeName}_Pitch_Deck.md`);
}

/**
 * Generates and downloads a complete structured JSON representation
 */
export function downloadJSONDeck(
  data: GeneratedDeckData,
  businessIdea: string,
  industryVertical: string,
  targetAudience?: string
) {
  const safeName = sanitizeFilename(industryVertical || 'Startup');
  const payload = {
    metadata: {
      generated_by: 'PitchBench AI Pitch Deck & Investor Benchmark Engine',
      generated_at: new Date().toISOString(),
      industry_vertical: industryVertical,
      target_audience: targetAudience || '',
      business_idea: businessIdea,
      total_slides: data.slides?.length || 10,
    },
    benchmark_summary: data.benchmark_summary,
    slides: data.slides,
    critiques: data.critiques,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  triggerDownload(blob, `PitchBench_${safeName}_Deck_Data.json`);
}

/**
 * Generates and downloads an Executive Pitch Memo (.txt)
 */
export function downloadTextMemo(
  data: GeneratedDeckData,
  businessIdea: string,
  industryVertical: string,
  targetAudience?: string
) {
  const safeName = sanitizeFilename(industryVertical || 'Startup');
  const now = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let txt = `========================================================================\n`;
  txt += `                      EXECUTIVE PITCH MEMO & SLIDE DECK                 \n`;
  txt += `                     Generated via PitchBench Engine                    \n`;
  txt += `========================================================================\n\n`;
  txt += `DATE:     ${now}\n`;
  txt += `VERTICAL: ${industryVertical || 'Technology'}\n`;
  if (targetAudience) txt += `AUDIENCE: ${targetAudience}\n`;
  txt += `\nCORE BUSINESS CONCEPT:\n${businessIdea}\n\n`;

  if (data.benchmark_summary) {
    const bs = data.benchmark_summary;
    txt += `------------------------------------------------------------------------\n`;
    txt += `BENCHMARK GROUND TRUTH SUMMARY (${bs.decks_used_count} Peer Decks)\n`;
    txt += `------------------------------------------------------------------------\n`;
    if (bs.relevant_decks_names?.length) {
      txt += `Grounding Peer Decks: ${bs.relevant_decks_names.join(', ')}\n`;
    }
    if (bs.industry_benchmarks_applied) {
      const b = bs.industry_benchmarks_applied;
      txt += `TAM Range:   ${b.tam_range || 'N/A'}\n`;
      txt += `SAM Range:   ${b.sam_range || 'N/A'}\n`;
      txt += `SOM Range:   ${b.som_range || 'N/A'}\n`;
      txt += `Typical Ask: ${b.typical_ask_range || 'N/A'}\n`;
    }
    txt += `\n`;
  }

  txt += `========================================================================\n`;
  txt += `                             10-SLIDE NARRATIVE                         \n`;
  txt += `========================================================================\n\n`;

  data.slides.forEach((s) => {
    const crit = data.critiques?.find((c) => c.slide_number === s.slide_number);
    const isFixed = crit?.is_fixed || crit?.severity === 'fixed';

    txt += `[SLIDE ${s.slide_number} of 10] ${s.slide_name.toUpperCase()}\n`;
    txt += `HEADLINE: ${s.headline}\n\n`;

    if (s.key_points && s.key_points.length > 0) {
      txt += `KEY BULLETS:\n`;
      s.key_points.forEach((pt) => {
        txt += `  * ${pt}\n`;
      });
      txt += `\n`;
    }

    txt += `NARRATIVE & SCRIPT:\n${s.detailed_content}\n\n`;

    if (s.numeric_claims && s.numeric_claims.length > 0) {
      txt += `NUMERIC CLAIMS & BENCHMARKS:\n`;
      s.numeric_claims.forEach((nc) => {
        const mark = nc.within_benchmark_range ? '[VERIFIED]' : '[OUTLIER]';
        txt += `  - ${nc.metric}: ${nc.value} ${mark} (${nc.benchmark_comparison_note || ''})\n`;
      });
      txt += `\n`;
    }

    txt += `SUGGESTED VISUAL: ${s.suggested_visual || 'N/A'}\n\n`;

    if (crit) {
      txt += `INVESTOR PUSHBACK DEFENSE (${isFixed ? 'STATUS: RESOLVED' : crit.severity.toUpperCase() + ' RISK'}):\n`;
      txt += `  Concern: ${crit.concern}\n`;
      txt += `  Defense: ${crit.suggested_fix}\n\n`;
    }

    txt += `------------------------------------------------------------------------\n\n`;
  });

  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  triggerDownload(blob, `PitchBench_${safeName}_Investor_Memo.txt`);
}

/**
 * Generates an interactive, standalone HTML presentation package (.html)
 */
export function downloadHTMLPresentation(
  data: GeneratedDeckData,
  businessIdea: string,
  industryVertical: string,
  targetAudience?: string
) {
  const safeName = sanitizeFilename(industryVertical || 'Startup');
  const total = data.slides.length;

  const slidesHtml = data.slides
    .map((slide, index) => {
      const critique = data.critiques?.find((c) => c.slide_number === slide.slide_number);
      const isFixed = critique?.is_fixed || critique?.severity === 'fixed';

      const metricsHtml =
        slide.numeric_claims && slide.numeric_claims.length > 0
          ? `<div class="metrics-grid">
            ${slide.numeric_claims
              .map(
                (m) => `
              <div class="metric-card ${m.within_benchmark_range ? 'verified' : 'outlier'}">
                <div class="metric-label">${escapeHtml(m.metric)}</div>
                <div class="metric-value">${escapeHtml(m.value)}</div>
                <div class="metric-status">
                  ${m.within_benchmark_range ? '✓ Within Peer Benchmark' : '⚠️ Benchmark Outlier'}
                </div>
                <div class="metric-note">${escapeHtml(m.benchmark_comparison_note || '')}</div>
              </div>
            `
              )
              .join('')}
          </div>`
          : '';

      const bulletsHtml =
        slide.key_points && slide.key_points.length > 0
          ? `<ul class="bullets-list">
            ${slide.key_points.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
          </ul>`
          : '';

      const defenseHtml = critique
        ? `<div class="investor-defense ${isFixed ? 'fixed' : critique.severity}">
            <div class="defense-header">
              <span class="defense-badge">${isFixed ? '✓ DEFENSE REINFORCED' : 'INVESTOR PUSHBACK'}</span>
              <span class="defense-title">Slide #${slide.slide_number} VC Defense</span>
            </div>
            <p><strong>Investor Risk:</strong> ${escapeHtml(critique.concern)}</p>
            <p><strong>Institutional Defense:</strong> ${escapeHtml(critique.suggested_fix)}</p>
          </div>`
        : '';

      return `
      <section class="slide ${index === 0 ? 'active' : ''}" data-slide="${index + 1}">
        <div class="slide-inner">
          <div class="slide-header">
            <div class="slide-meta">
              <span class="slide-tag">SLIDE ${slide.slide_number} OF ${total}</span>
              <span class="slide-category">${escapeHtml(slide.slide_name)}</span>
            </div>
            <div class="slide-brand">PitchBench • ${escapeHtml(industryVertical || 'Institutional Pitch')}</div>
          </div>

          <h2 class="slide-headline">${escapeHtml(slide.headline)}</h2>

          <div class="slide-body">
            <div class="slide-narrative">
              <div class="narrative-text">${escapeHtml(slide.detailed_content).replace(/\n/g, '<br/>')}</div>
              ${bulletsHtml}
            </div>
            
            <div class="slide-sidebar">
              ${metricsHtml}
              ${
                slide.suggested_visual
                  ? `<div class="visual-card">
                      <div class="visual-title">🎨 Suggested Slide Visual</div>
                      <div class="visual-text">${escapeHtml(slide.suggested_visual)}</div>
                    </div>`
                  : ''
              }
              ${defenseHtml}
            </div>
          </div>

          <div class="slide-footer">
            <div class="footer-left">${escapeHtml(businessIdea.slice(0, 80))}${businessIdea.length > 80 ? '...' : ''}</div>
            <div class="footer-right">Slide ${slide.slide_number} / ${total}</div>
          </div>
        </div>
      </section>
      `;
    })
    .join('\n');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(industryVertical || 'Pitch')} Deck — PitchBench Presentation</title>
  <style>
    :root {
      --bg: #09090b;
      --card-bg: #18181b;
      --text: #f4f4f5;
      --text-muted: #a1a1aa;
      --border: #27272a;
      --accent: #ffffff;
      --emerald: #10b981;
      --amber: #f59e0b;
      --red: #ef4444;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      overflow: hidden;
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      background: rgba(24, 24, 27, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      z-index: 100;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .brand-badge {
      background: #27272a;
      color: #e4e4e7;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 4px;
      font-family: monospace;
    }

    .nav-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn {
      background: #27272a;
      color: #fff;
      border: 1px solid #3f3f46;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .btn:hover { background: #3f3f46; }
    .btn-primary { background: #ffffff; color: #09090b; border-color: #ffffff; }
    .btn-primary:hover { background: #e4e4e7; }
    .btn:disabled { opacity: 0.3; cursor: not-allowed; }

    .counter {
      font-family: monospace;
      font-size: 12px;
      font-weight: 700;
      background: #18181b;
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid var(--border);
    }

    .deck-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      position: relative;
    }

    .slide {
      display: none;
      width: 100%;
      max-width: 1120px;
      aspect-ratio: 16 / 9;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      padding: 40px 48px;
      position: relative;
      animation: fadeIn 0.25s ease-out forwards;
    }

    .slide.active { display: block; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .slide-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }

    .slide-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding-bottom: 14px;
    }

    .slide-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .slide-tag {
      font-family: monospace;
      font-size: 11px;
      font-weight: 700;
      background: #27272a;
      padding: 3px 8px;
      border-radius: 4px;
      color: #d4d4d8;
    }

    .slide-category {
      font-size: 13px;
      font-weight: 600;
      color: #a1a1aa;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .slide-brand {
      font-size: 11px;
      color: #71717a;
      font-family: monospace;
    }

    .slide-headline {
      font-size: 26px;
      font-weight: 800;
      line-height: 1.25;
      color: #ffffff;
      margin: 18px 0 16px 0;
      letter-spacing: -0.02em;
    }

    .slide-body {
      flex: 1;
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 28px;
      overflow-y: auto;
      margin-bottom: 12px;
    }

    .slide-narrative {
      font-size: 13.5px;
      line-height: 1.65;
      color: #d4d4d8;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .bullets-list {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .bullets-list li { color: #e4e4e7; }

    .slide-sidebar {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .metric-card {
      background: #27272a;
      border: 1px solid #3f3f46;
      border-radius: 8px;
      padding: 10px 14px;
    }
    .metric-card.verified { border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.07); }
    .metric-card.outlier { border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.07); }

    .metric-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: #a1a1aa;
    }

    .metric-value {
      font-size: 16px;
      font-weight: 800;
      font-family: monospace;
      color: #ffffff;
      margin: 2px 0;
    }

    .metric-status {
      font-size: 10px;
      font-weight: 600;
      color: #34d399;
    }
    .metric-card.outlier .metric-status { color: #fbbf24; }

    .metric-note {
      font-size: 10px;
      color: #a1a1aa;
      margin-top: 2px;
      line-height: 1.3;
    }

    .visual-card {
      background: #18181b;
      border: 1px dashed #3f3f46;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 11px;
    }
    .visual-title { font-weight: 700; color: #a1a1aa; margin-bottom: 2px; }
    .visual-text { color: #d4d4d8; font-style: italic; }

    .investor-defense {
      background: #1c1917;
      border: 1px solid #44403c;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 11px;
      color: #d6d3d1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .investor-defense.fixed {
      background: rgba(16, 185, 129, 0.08);
      border-color: rgba(16, 185, 129, 0.3);
      color: #a7f3d0;
    }
    .defense-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2px;
    }
    .defense-badge {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .defense-title { font-size: 10px; font-weight: 700; color: #a1a1aa; }

    .slide-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--border);
      padding-top: 10px;
      font-size: 11px;
      color: #71717a;
      font-family: monospace;
    }

    @media print {
      body {
        background: #ffffff !important;
        color: #000000 !important;
        overflow: visible !important;
        height: auto !important;
      }
      header, .nav-controls { display: none !important; }
      .deck-container { padding: 0 !important; display: block !important; }
      .slide {
        display: block !important;
        page-break-after: always !important;
        break-after: page !important;
        width: 100% !important;
        max-width: none !important;
        height: 100vh !important;
        box-shadow: none !important;
        border: none !important;
        background: #ffffff !important;
        color: #000000 !important;
        padding: 40px !important;
      }
      .slide-headline { color: #000000 !important; }
      .slide-narrative, .bullets-list li { color: #27272a !important; }
      .metric-card, .visual-card, .investor-defense {
        background: #f4f4f5 !important;
        border-color: #e4e4e7 !important;
        color: #18181b !important;
      }
      .metric-value { color: #000000 !important; }
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <span>PitchBench Presentation</span>
      <span class="brand-badge">${escapeHtml(industryVertical || 'Institutional')}</span>
    </div>

    <div class="nav-controls">
      <button class="btn" id="prevBtn" onclick="prevSlide()">← Prev</button>
      <span class="counter" id="counter">1 / ${total}</span>
      <button class="btn" id="nextBtn" onclick="nextSlide()">Next →</button>
      <button class="btn btn-primary" onclick="window.print()">🖨️ Save as PDF / Print</button>
      <button class="btn" onclick="toggleFullscreen()">⛶ Fullscreen</button>
    </div>
  </header>

  <main class="deck-container">
    ${slidesHtml}
  </main>

  <script>
    let current = 0;
    const total = ${total};
    const slides = document.querySelectorAll('.slide');
    const counter = document.getElementById('counter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showSlide(index) {
      if (index < 0) index = 0;
      if (index >= total) index = total - 1;
      current = index;

      slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === current);
      });

      counter.textContent = (current + 1) + ' / ' + total;
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === total - 1;
    }

    function prevSlide() { showSlide(current - 1); }
    function nextSlide() { showSlide(current + 1); }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
        window.print();
      }
    });

    showSlide(0);
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  triggerDownload(blob, `PitchBench_${safeName}_Presentation.html`);
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
