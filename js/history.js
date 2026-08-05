/* js/history.js - Patient Record Archival & Search */

document.addEventListener('DOMContentLoaded', () => {
  renderHistoryTable();

  const searchInput = document.getElementById('search-patient');
  const filterRisk = document.getElementById('filter-risk');

  if (searchInput) searchInput.addEventListener('input', filterRecords);
  if (filterRisk) filterRisk.addEventListener('change', filterRecords);
});

function getReportsFromStorage() {
  return JSON.parse(localStorage.getItem('patientReportsHistory')) || [];
}

function renderHistoryTable(records = null) {
  const tbody = document.getElementById('history-tbody');
  if (!tbody) return;

  const data = records || getReportsFromStorage();
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem;">No diagnostic reports found.</td></tr>`;
    return;
  }

  data.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--border-color)';
    
    let badgeClass = 'badge-normal';
    if (item.analysis.overallRisk === 'High Risk') badgeClass = 'badge-abnormal';
    if (item.analysis.overallRisk === 'Moderate Risk') badgeClass = 'badge-borderline';

    tr.innerHTML = `
      <td style="padding: 1rem;"><strong>${item.patient.id}</strong></td>
      <td style="padding: 1rem;">${item.patient.name}</td>
      <td style="padding: 1rem;">${item.patient.date}</td>
      <td style="padding: 1rem;"><span class="badge ${badgeClass}">${item.analysis.overallRisk} (${item.analysis.riskScore}%)</span></td>
      <td style="padding: 1rem;">${item.patient.doctor}</td>
      <td style="padding: 1rem; display: flex; gap: 0.5rem;">
        <button class="btn btn-secondary" onclick="viewReport(${index})">View</button>
        <button class="btn btn-danger" onclick="deleteReport(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterRecords() {
  const query = document.getElementById('search-patient').value.toLowerCase();
  const riskFilter = document.getElementById('filter-risk').value;
  const data = getReportsFromStorage();

  const filtered = data.filter(item => {
    const matchesSearch = item.patient.name.toLowerCase().includes(query) || item.patient.id.toLowerCase().includes(query);
    const matchesRisk = (riskFilter === 'all') || (item.analysis.overallRisk === riskFilter);
    return matchesSearch && matchesRisk;
  });

  renderHistoryTable(filtered);
}

function viewReport(index) {
  const reports = getReportsFromStorage();
  const target = reports[index];
  localStorage.setItem('activePatient', JSON.stringify(target.patient));
  localStorage.setItem('currentAnalysis', JSON.stringify(target.analysis));
  if (target.image) localStorage.setItem('uploadedStripImage', target.image);
  window.location.href = 'results.html';
}

function deleteReport(index) {
  if (confirm('Are you sure you want to delete this report record?')) {
    let reports = getReportsFromStorage();
    reports.splice(index, 1);
    localStorage.setItem('patientReportsHistory', JSON.stringify(reports));
    showToast('Record deleted.', 'success');
    renderHistoryTable();
  }
}