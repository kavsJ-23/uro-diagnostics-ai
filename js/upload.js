/* js/upload.js - Strip Image Processing */

document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const previewImg = document.getElementById('preview-img');
  const filenameDisplay = document.getElementById('file-name');
  const analyzeBtn = document.getElementById('analyze-btn');
  const uploadSuccess = document.getElementById('upload-success');

  // Guard: Ensure active patient exists
  const activePatient = localStorage.getItem('activePatient');
  if (!activePatient) {
    showToast('Please register a patient first.', 'error');
    setTimeout(() => { window.location.href = 'patient.html'; }, 1200);
    return;
  }

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', handleFileSelect);

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--primary)';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = 'var(--border-color)';
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--border-color)';
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelect();
      }
    });
  }

  function handleFileSelect() {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
        filenameDisplay.innerText = `File: ${file.name}`;
        uploadSuccess.style.display = 'flex';
        analyzeBtn.disabled = false;
        localStorage.setItem('uploadedStripImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'loading-overlay';
      overlay.innerHTML = `
        <div class="spinner"></div>
        <p style="margin-top: 1rem; font-weight: 600;">Analyzing Urine Test Strip with AI...</p>
      `;
      document.body.appendChild(overlay);

      setTimeout(() => {
        const predictionData = simulateAIPrediction();
        localStorage.setItem('currentAnalysis', JSON.stringify(predictionData));
        window.location.href = 'results.html';
      }, 2000);
    });
  }
});