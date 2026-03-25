// ===== DARK MODE MODULE - DISABLED =====
// Dark mode has been disabled. Website now uses light mode only.

document.addEventListener('DOMContentLoaded', function() {
  // Remove dark mode from body if it exists
  document.body.classList.remove('dark-mode');
  
  // Clear localStorage theme preference
  localStorage.removeItem('theme');
  
  console.log('Dark mode disabled. Light mode only.');
});

// ===== DARK MODE FUNCTIONALITY =====
function initDarkMode() {
  const toggleButton = document.getElementById('theme-toggle');
  const icon = toggleButton?.querySelector('i');
  
  if (!toggleButton) return;
  
  // Check for saved preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark-mode', currentTheme === 'dark');
  updateIcon(icon, currentTheme);
  
  // Toggle on button click
  toggleButton.addEventListener('click', function() {
    toggleDarkMode();
  });
  
  // Keyboard shortcut: Ctrl/Cmd + Shift + D
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      toggleDarkMode();
    }
  });
  
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const theme = isDark ? 'dark' : 'light';
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update icon
    updateIcon(icon, theme);
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }
  
  function updateIcon(icon, theme) {
    if (!icon) return;
    
    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }
}

// Detect system preference changes
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  mediaQuery.addEventListener('change', (e) => {
    // Only auto-switch if no saved preference
    if (!localStorage.getItem('theme')) {
      document.body.classList.toggle('dark-mode', e.matches);
    }
  });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initDarkMode };
}
