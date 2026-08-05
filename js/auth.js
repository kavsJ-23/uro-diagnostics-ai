/* js/auth.js - Auth Guard & Theme Switcher */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  checkAuth();
  setupSidebar();
});

// Protect routes except login page
function checkAuth() {
  const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  if (!isLoggedIn && !isLoginPage) {
    window.location.href = 'index.html';
  } else if (isLoggedIn && isLoginPage) {
    window.location.href = 'dashboard.html';
  }
}

// Handle Login
function loginUser(username, password) {
  if (username === 'doctor' && password === '123456') {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('sessionDoctor', 'Dr. Alex Mercer');
    showToast('Login successful! Redirecting...', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
    return true;
  } else {
    showToast('Invalid credentials! (Use: doctor / 123456)', 'error');
    return false;
  }
}

// Handle Logout
function logoutUser() {
  localStorage.removeItem('loggedIn');
  showToast('Logged out successfully.', 'success');
  setTimeout(() => { window.location.href = 'index.html'; }, 800);
}

// Global Toast System
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Dark Mode Toggle Logic
function initTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    themeBtn.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }
}

function setupSidebar() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
  }
}