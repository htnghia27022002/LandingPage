// ===== MAIN JAVASCRIPT =====
// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Landing Page Initialized');
  
  // Initialize all components
  initScrollHeader();
  initScrollTop();
  initScrollReveal();
  initDarkMode();
  initPreloader();
});

// ===== SCROLL HEADER =====
function initScrollHeader() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY >= 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===== SCROLL TO TOP BUTTON =====
function initScrollTop() {
  const scrollTop = document.getElementById('scroll-top');
  
  if (!scrollTop) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY >= 500) {
      scrollTop.classList.add('show');
    } else {
      scrollTop.classList.remove('show');
    }
  });
  
  scrollTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
  const sections = document.querySelectorAll('.section');
  
  const revealSection = function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    });
  };
  
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    sectionObserver.observe(section);
  });
}

// ===== DARK MODE TOGGLE =====
function initDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  if (!themeToggle) return;
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
  }
  
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('dark-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });
}

// ===== PRELOADER =====
function initPreloader() {
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 300);
      }, 500);
    }
  });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Smooth scroll to element
function scrollToElement(elementId, offset = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Export functions for use in other modules
window.AppUtils = {
  debounce,
  throttle,
  isInViewport,
  scrollToElement
};
