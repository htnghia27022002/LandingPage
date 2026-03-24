// ===== NAVIGATION MODULE =====

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initSmoothScroll();
  initActiveNavLink();
});

// ===== MOBILE NAVIGATION TOGGLE =====
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  
  // Show menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
  }
  
  // Hide menu
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show');
      document.body.style.overflow = ''; // Restore scrolling
    });
  }
  
  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && 
        !navToggle.contains(e.target) && 
        navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav__link');
  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Check if it's an internal link
      if (href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function initActiveNavLink() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  
  function updateActiveLink() {
    const scrollY = window.pageYOffset;
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Handle when at top of page
    if (scrollY < 100) {
      navLinks.forEach(link => link.classList.remove('active'));
      const homeLink = document.querySelector('.nav__link[href="#hero"]');
      if (homeLink) homeLink.classList.add('active');
    }
  }
  
  // Throttle scroll event for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial check
  updateActiveLink();
}

// ===== STICKY NAVIGATION =====
function initStickyNav() {
  const header = document.getElementById('header');
  const hero = document.querySelector('.hero');
  
  if (!header || !hero) return;
  
  const heroHeight = hero.offsetHeight;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > heroHeight) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
}

// Initialize sticky nav
initStickyNav();

// Export for external use
window.NavigationModule = {
  initNavigation,
  initSmoothScroll,
  initActiveNavLink
};
