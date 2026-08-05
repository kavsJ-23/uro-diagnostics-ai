/* js/prediction.js - Synthetic AI Diagnostic Logic */

// Analyte reference configuration
const ANALYTES_CONFIG = {
  glucose: { name: 'Glucose', unit: 'mg/dL', normal: 'Negative', ranges: ['Negative', '100 (Trace)', '250 (+)', '500 (++)', '1000 (+++)'] },
  protein: { name: 'Protein', unit: 'mg/dL', normal: 'Negative', ranges: ['Negative', '15 (Trace)', '30 (+)', '100 (++)', '300 (+++)'] },
  ketones: { name: 'Ketones', unit: 'mg/dL', normal: 'Negative', ranges: ['Negative', '5 (Trace)', '15 (+)', '40 (++)', '80 (+++)'] },
  blood: { name: 'Blood', unit: 'Ery/µL', normal: 'Negative', ranges: ['Negative', '10 (Trace)', '25 (+)', '50 (++)', '200 (+++)'] },
  nitrite: { name: 'Nitrite', unit: '', normal: 'Negative', ranges: ['Negative', 'Positive'] },
  leukocytes: { name: 'Leukocytes', unit: 'Leu/µL', normal: 'Negative', ranges: ['Negative', '15 (Trace)', '70 (+)', '125 (++)', '500 (+++)'] },
  sg: { name: 'Specific Gravity', unit: '', normal: '1.015 - 1.025', ranges: ['1.005', '1.010', '1.015', '1.020', '1.025', '1.030'] },
  ph: { name: 'pH', unit: '', normal: '5.0 - 7.0', ranges: ['5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5'] },
  bilirubin: { name: 'Bilirubin', unit: 'mg/dL', normal: 'Negative', ranges: ['Negative', '1 (+)', '2 (++)', '4 (+++)'] },
  urobilinogen: { name: 'Urobilinogen', unit: 'mg/dL', normal: '0.2 - 1.0', ranges: ['0.2', '1.0', '2.0', '4.0', '8.0'] }
};

// Generates synthetic AI diagnostic prediction based on simulated strip analysis
function simulateAIPrediction() {
  const isAbnormalCase = Math.random() > 0.4; // 60% chance of detecting abnormalities for testing
  let totalScore = 0;
  const results = {};

  Object.keys(ANALYTES_CONFIG).forEach(key => {
    const config = ANALYTES_CONFIG[key];
    let valIndex = 0;
    let status = 'Normal';

    if (isAbnormalCase && Math.random() > 0.5) {
      valIndex = Math.floor(Math.random() * (config.ranges.length - 1)) + 1;
      status = valIndex > 2 ? 'Abnormal' : 'Borderline';
      totalScore += valIndex * 15;
    }

    results[key] = {
      name: config.name,
      value: config.ranges[valIndex],
      unit: config.unit,
      status: status,
      reference: config.normal
    };
  });

  // Calculate Overall Risk Score (0 - 100)
  const riskScore = Math.min(Math.round(totalScore / 1.5), 100);
  let overallRisk = 'Low Risk';
  let summary = 'Urine strip analysis indicates normal physiological metrics with no significant biomarker deviation.';

  if (riskScore > 65) {
    overallRisk = 'High Risk';
    summary = 'Critical indications of protein/leukocyte elevations detected. Potential UTI or renal involvement recommended for medical correlation.';
  } else if (riskScore > 30) {
    overallRisk = 'Moderate Risk';
    summary = 'Mild trace values detected across specific analytes. Hydration monitoring and follow-up recommended.';
  }

  return {
    analytes: results,
    riskScore: riskScore,
    overallRisk: overallRisk,
    summary: summary,
    timestamp: new Date().toISOString()
  };
}