import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

/**
 * Export Utilities for PDF and Excel
 * 
 * Functions:
 * - exportComplianceToPDF
 * - exportComplianceToExcel
 * - exportFrameworkToPDF
 * - exportFrameworkToExcel
 */

export interface ComplianceData {
  frameworkCode: string;
  frameworkName: string;
  score: number;
  status: string;
  totalControls: number;
  compliantControls: number;
  gaps: Array<{
    category: string;
    gapCount: number;
    percentage: number;
  }>;
  generatedAt: Date;
}

/**
 * Export Compliance Report to PDF
 */
export function exportComplianceToPDF(data: ComplianceData) {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('تقرير الامتثال التنظيمي', 105, 20, { align: 'center' });
  
  // Framework Info
  doc.setFontSize(14);
  doc.text(`الإطار: ${data.frameworkName} (${data.frameworkCode})`, 20, 40);
  
  // Score
  doc.setFontSize(12);
  doc.text(`نسبة الامتثال: ${data.score.toFixed(1)}%`, 20, 55);
  doc.text(`الحالة: ${data.status}`, 20, 65);
  doc.text(`إجمالي الضوابط: ${data.totalControls}`, 20, 75);
  doc.text(`الضوابط المطابقة: ${data.compliantControls}`, 20, 85);
  
  // Gaps Analysis
  doc.setFontSize(14);
  doc.text('تحليل الفجوات:', 20, 105);
  
  doc.setFontSize(10);
  let y = 120;
  data.gaps.forEach((gap, index) => {
    doc.text(`${index + 1}. ${gap.category}: ${gap.gapCount} فجوة (${gap.percentage.toFixed(1)}%)`, 25, y);
    y += 10;
  });
  
  // Footer
  doc.setFontSize(8);
  doc.text(`تم الإنشاء: ${data.generatedAt.toLocaleString('ar-SA')}`, 20, 280);
  doc.text('منصة RegTech - نظام الامتثال التنظيمي', 105, 290, { align: 'center' });
  
  // Save
  doc.save(`compliance-report-${data.frameworkCode}-${Date.now()}.pdf`);
}

/**
 * Export Compliance Report to Excel
 */
export function exportComplianceToExcel(data: ComplianceData) {
  // Create workbook
  const wb = XLSX.utils.book_new();
  
  // Summary Sheet
  const summaryData = [
    ['تقرير الامتثال التنظيمي'],
    [],
    ['الإطار', data.frameworkName],
    ['الكود', data.frameworkCode],
    ['نسبة الامتثال', `${data.score.toFixed(1)}%`],
    ['الحالة', data.status],
    ['إجمالي الضوابط', data.totalControls],
    ['الضوابط المطابقة', data.compliantControls],
    ['الضوابط غير المطابقة', data.totalControls - data.compliantControls],
    [],
    ['تم الإنشاء', data.generatedAt.toLocaleString('ar-SA')],
  ];
  
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summarySheet, 'ملخص');
  
  // Gaps Sheet
  const gapsData = [
    ['الفئة', 'عدد الفجوات', 'النسبة المئوية'],
    ...data.gaps.map(gap => [
      gap.category,
      gap.gapCount,
      `${gap.percentage.toFixed(1)}%`
    ])
  ];
  
  const gapsSheet = XLSX.utils.aoa_to_sheet(gapsData);
  XLSX.utils.book_append_sheet(wb, gapsSheet, 'تحليل الفجوات');
  
  // Save
  XLSX.writeFile(wb, `compliance-report-${data.frameworkCode}-${Date.now()}.xlsx`);
}

/**
 * Export Framework Details to PDF
 */
export function exportFrameworkToPDF(framework: {
  code: string;
  name: string;
  description: string;
  category: string;
  totalControls: number;
  controls: Array<{
    controlCode: string;
    controlDescription: string;
    category: string;
  }>;
}) {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text(`إطار ${framework.name}`, 105, 20, { align: 'center' });
  
  // Info
  doc.setFontSize(12);
  doc.text(`الكود: ${framework.code}`, 20, 40);
  doc.text(`الفئة: ${framework.category}`, 20, 50);
  doc.text(`إجمالي الضوابط: ${framework.totalControls}`, 20, 60);
  
  // Description
  doc.setFontSize(10);
  const descLines = doc.splitTextToSize(framework.description, 170);
  doc.text(descLines, 20, 75);
  
  // Controls (first page only - full list would need pagination)
  doc.setFontSize(12);
  doc.text('الضوابط:', 20, 110);
  
  doc.setFontSize(9);
  let y = 120;
  const maxControls = 10; // Show first 10 controls
  framework.controls.slice(0, maxControls).forEach((control, index) => {
    if (y > 270) return; // Stop if page full
    doc.text(`${index + 1}. ${control.controlCode}`, 20, y);
    y += 5;
    const controlDesc = doc.splitTextToSize(control.controlDescription, 160);
    doc.text(controlDesc, 25, y);
    y += (controlDesc.length * 5) + 5;
  });
  
  if (framework.controls.length > maxControls) {
    doc.text(`... و ${framework.controls.length - maxControls} ضابط آخر`, 20, y);
  }
  
  // Footer
  doc.setFontSize(8);
  doc.text(`تم الإنشاء: ${new Date().toLocaleString('ar-SA')}`, 20, 290);
  
  // Save
  doc.save(`framework-${framework.code}-${Date.now()}.pdf`);
}

/**
 * Export Framework Details to Excel
 */
export function exportFrameworkToExcel(framework: {
  code: string;
  name: string;
  description: string;
  category: string;
  totalControls: number;
  controls: Array<{
    controlCode: string;
    controlDescription: string;
    category: string;
  }>;
}) {
  const wb = XLSX.utils.book_new();
  
  // Info Sheet
  const infoData = [
    [`إطار ${framework.name}`],
    [],
    ['الكود', framework.code],
    ['الاسم', framework.name],
    ['الفئة', framework.category],
    ['الوصف', framework.description],
    ['إجمالي الضوابط', framework.totalControls],
    [],
    ['تم الإنشاء', new Date().toLocaleString('ar-SA')],
  ];
  
  const infoSheet = XLSX.utils.aoa_to_sheet(infoData);
  XLSX.utils.book_append_sheet(wb, infoSheet, 'معلومات');
  
  // Controls Sheet
  const controlsData = [
    ['الكود', 'الوصف', 'الفئة'],
    ...framework.controls.map(control => [
      control.controlCode,
      control.controlDescription,
      control.category
    ])
  ];
  
  const controlsSheet = XLSX.utils.aoa_to_sheet(controlsData);
  XLSX.utils.book_append_sheet(wb, controlsSheet, 'الضوابط');
  
  // Save
  XLSX.writeFile(wb, `framework-${framework.code}-${Date.now()}.xlsx`);
}

/**
 * Export All Frameworks Comparison to Excel
 */
export function exportAllFrameworksToExcel(frameworks: Array<{
  code: string;
  name: string;
  score: number;
  status: string;
  totalControls: number;
  compliantControls: number;
}>) {
  const wb = XLSX.utils.book_new();
  
  const data = [
    ['مقارنة الأطر التنظيمية'],
    [],
    ['الكود', 'الاسم', 'نسبة الامتثال', 'الحالة', 'إجمالي الضوابط', 'الضوابط المطابقة', 'الفجوات'],
    ...frameworks.map(fw => [
      fw.code,
      fw.name,
      `${fw.score.toFixed(1)}%`,
      fw.status,
      fw.totalControls,
      fw.compliantControls,
      fw.totalControls - fw.compliantControls
    ]),
    [],
    ['تم الإنشاء', new Date().toLocaleString('ar-SA')],
  ];
  
  const sheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, sheet, 'مقارنة الأطر');
  
  XLSX.writeFile(wb, `frameworks-comparison-${Date.now()}.xlsx`);
}
