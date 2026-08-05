/* js/patient.js - Patient Record Handler */

document.addEventListener('DOMContentLoaded', () => {
  const patientForm = document.getElementById('patient-form');
  if (patientForm) {
    // Auto fill date & time
    document.getElementById('reg-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('reg-time').value = new Date().toTimeString().split(' ')[0].substring(0,5);

    patientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const patientData = {
        id: document.getElementById('patient-id').value.trim(),
        name: document.getElementById('patient-name').value.trim(),
        age: document.getElementById('patient-age').value.trim(),
        gender: document.getElementById('patient-gender').value,
        doctor: document.getElementById('patient-doctor').value.trim(),
        date: document.getElementById('reg-date').value,
        time: document.getElementById('reg-time').value
      };

      if (!patientData.id || !patientData.name) {
        showToast('Please complete all required fields', 'error');
        return;
      }

      // Store in Active Session & Local Storage History Database
      localStorage.setItem('activePatient', JSON.stringify(patientData));
      showToast('Patient Registered Successfully! Proceeding to upload...', 'success');
      
      setTimeout(() => {
        window.location.href = 'upload.html';
      }, 1000);
    });
  }
});