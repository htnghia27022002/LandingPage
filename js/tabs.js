// ===== TABS MODULE =====
// Tab switching for courses/activities pages

document.addEventListener('DOMContentLoaded', function() {
  initTabs();
});

// ===== TAB FUNCTIONALITY =====
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab__button, [data-tab]');
  
  if (tabButtons.length === 0) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      switchTab(this);
    });
    
    // Keyboard navigation
    button.addEventListener('keydown', function(e) {
      const buttons = Array.from(button.parentElement.querySelectorAll('.tab__button, [data-tab]'));
      const currentIndex = buttons.indexOf(this);
      
      let newIndex = currentIndex;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
      }
      
      if (newIndex !== currentIndex) {
        buttons[newIndex].focus();
        switchTab(buttons[newIndex]);
      }
    });
    
    // Set ARIA attributes
    button.setAttribute('role', 'tab');
    button.setAttribute('tabindex', button.classList.contains('active') ? '0' : '-1');
  });
}

function switchTab(button) {
  const tabId = button.getAttribute('data-tab');
  const tabContainer = button.closest('[data-tabs-container]') || button.closest('.curriculum__container') || button.parentElement.parentElement;
  
  if (!tabId || !tabContainer) return;
  
  // Update buttons
  const allButtons = tabContainer.querySelectorAll('.tab__button, [data-tab]');
  allButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
    btn.setAttribute('tabindex', '-1');
  });
  
  button.classList.add('active');
  button.setAttribute('aria-selected', 'true');
  button.setAttribute('tabindex', '0');
  
  // Update content
  const allContents = tabContainer.querySelectorAll('.tab__content, [data-tab-content]');
  allContents.forEach(content => {
    content.classList.remove('active');
    content.setAttribute('aria-hidden', 'true');
  });
  
  const targetContent = tabContainer.querySelector(`#${tabId}, [data-tab-content="${tabId}"]`);
  if (targetContent) {
    targetContent.classList.add('active');
    targetContent.setAttribute('aria-hidden', 'false');
    
    // Animate content
    targetContent.style.opacity = '0';
    setTimeout(() => {
      targetContent.style.opacity = '1';
    }, 10);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initTabs, switchTab };
}
