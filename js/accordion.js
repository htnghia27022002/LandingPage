// ===== ACCORDION MODULE =====
// FAQ, syllabus expand/collapse with animation

document.addEventListener('DOMContentLoaded', function() {
  initAccordions();
});

// ===== ACCORDION FUNCTIONALITY =====
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion__header, [data-accordion-trigger]');
  
  if (accordionHeaders.length === 0) return;
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      toggleAccordion(this);
    });
    
    // Add keyboard support
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAccordion(this);
      }
    });
    
    // Set ARIA attributes
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
  });
}

function toggleAccordion(header) {
  const accordionItem = header.closest('.accordion__item') || header.parentElement;
  const content = accordionItem.querySelector('.accordion__content, [data-accordion-content]');
  const isActive = accordionItem.classList.contains('active');
  
  if (!content) return;
  
  // Close all accordions in same group (optional single-open behavior)
  const singleOpen = accordionItem.closest('[data-accordion-single]');
  if (singleOpen && !isActive) {
    const allItems = singleOpen.querySelectorAll('.accordion__item');
    allItems.forEach(item => {
      if (item !== accordionItem) {
        item.classList.remove('active');
        const itemContent = item.querySelector('.accordion__content, [data-accordion-content]');
        if (itemContent) {
          itemContent.style.maxHeight = null;
        }
      }
    });
  }
  
  // Toggle current accordion
  accordionItem.classList.toggle('active');
  
  if (isActive) {
    // Close
    content.style.maxHeight = null;
    header.setAttribute('aria-expanded', 'false');
  } else {
    // Open
    content.style.maxHeight = content.scrollHeight + 'px';
    header.setAttribute('aria-expanded', 'true');
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initAccordions, toggleAccordion };
}
