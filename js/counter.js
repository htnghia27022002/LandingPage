// ===== COUNTER MODULE =====
// Animated number counter when element enters viewport

document.addEventListener('DOMContentLoaded', function() {
  initCounters();
});

// ===== ANIMATED COUNTER =====
function initCounters() {
  const counters = document.querySelectorAll('.stat__number, [data-counter]');
  
  if (counters.length === 0) return;
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element) {
  const text = element.textContent;
  const hasPlus = text.includes('+');
  const hasPercent = text.includes('%');
  
  // Extract number from text
  const target = parseInt(text.replace(/\D/g, ''));
  
  if (isNaN(target)) return;
  
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    let displayValue = Math.floor(current);
    
    // Add suffix
    if (hasPlus) displayValue += '+';
    if (hasPercent) displayValue += '%';
    
    element.textContent = displayValue;
  }, 16);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initCounters, animateCounter };
}
