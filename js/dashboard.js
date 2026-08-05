/* js/dashboard.js - Visualizations & Key Metrics */

document.addEventListener('DOMContentLoaded', () => {
  const reports = JSON.parse(localStorage.getItem('patientReportsHistory')) || [];
  
  // Calculate Dynamic Stats
  const totalPatients = reports.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTests = reports.filter(r => r.patient.date === todayStr).length;
  const normalCount = reports.filter(r => r.analysis.overallRisk === 'Low Risk').length;
  const abnormalCount = reports.filter(r => r.analysis.overallRisk === 'High Risk' || r.analysis.overallRisk === 'Moderate Risk').length;

  // DOM Updates
  if (document.getElementById('stat-total')) document.getElementById('stat-total').innerText = totalPatients;
  if (document.getElementById('stat-today')) document.getElementById('stat-today').innerText = todayTests;
  if (document.getElementById('stat-normal')) document.getElementById('stat-normal').innerText = normalCount;
  if (document.getElementById('stat-abnormal')) document.getElementById('stat-abnormal').innerText = abnormalCount;

  renderRecentTable(reports.slice(-5).reverse());
  initChart(normalCount, abnormalCount);
});

function renderRecentTable(recent) {
  const tbody = document.getElementById('dashboard-recent-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  recent.forEach(item => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--border-color)';
    tr.innerHTML = `
      <td style="padding: 0.75rem 0;">${item.patient.name}</td>
      <td>${item.patient.date}</td>
      <td><span class="badge ${item.analysis.overallRisk === 'Low Risk' ? 'badge-normal' : 'badge-abnormal'}">${item.analysis.overallRisk}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function initChart(normal, abnormal) {
  const ctx = document.getElementById('riskChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Normal / Low Risk', 'Abnormal / Elevated'],
      datasets: [{
        data: [normal || 1, abnormal || 0],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: getComputedStyle(document.body).getPropertyValue('--text-main') } }
      }
    }
  });
}