/* js/pdf.js - Professional Medical PDF Report Generation */

function generatePDFReport() {
  const patient = JSON.parse(localStorage.getItem('activePatient'));
  const analysis = JSON.parse(localStorage.getItem('currentAnalysis'));

  if (!patient || !analysis) {
    showToast('Missing data to generate report', 'error');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(2, 132, 199); // Primary Accent Color
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('URO DIAGNOSTICS AI - LABORATORY REPORT', 14, 20);

  // Patient Info Box
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PATIENT & CLINICAL DETAILS', 14, 40);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Patient ID: ${patient.id}`, 14, 48);
  doc.text(`Patient Name: ${patient.name}`, 14, 54);
  doc.text(`Age/Gender: ${patient.age} Y / ${patient.gender}`, 14, 60);

  doc.text(`Date: ${patient.date}`, 120, 48);
  doc.text(`Time: ${patient.time}`, 120, 54);
  doc.text(`Attending Physician: ${patient.doctor}`, 120, 60);

  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 66, 196, 66);

  // Analyte Table Setup
  const tableData = Object.keys(analysis.analytes).map(key => {
    const item = analysis.analytes[key];
    return [item.name, item.value + ' ' + item.unit, item.reference, item.status];
  });

  doc.autoTable({
    startY: 72,
    head: [['Analyte Biomarker', 'Measured Value', 'Reference Range', 'Status Flag']],
    body: tableData,
    headStyles: { fillStyle: 'F', fillColor: [2, 132, 199], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14 }
  });

  // Overall Diagnosis Summary Box
  const finalY = doc.lastAutoTable.finalY + 12;

  doc.setFont('helvetica', 'bold');
  doc.text(`Overall Risk Assessment: ${analysis.overallRisk} (${analysis.riskScore}%)`, 14, finalY);

  doc.setFont('helvetica', 'normal');
  const summaryLines = doc.splitTextToSize(`Clinical Impression: ${analysis.summary}`, 180);
  doc.text(summaryLines, 14, finalY + 8);

  // Footer Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Report generated automatically via Uro Diagnostics Computer Vision Engine. Signature not required.', 14, 285);

  // Trigger Save PDF
  doc.save(`UroDiagnostics_${patient.id}_${patient.name.replace(/\s+/g, '_')}.pdf`);
  showToast('PDF Report downloaded successfully!', 'success');
}