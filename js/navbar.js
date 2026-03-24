// ===== NAVBAR MODULE =====
// Sticky nav, mobile hamburger, active link, scroll effect

document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavLink();
});

// ===== STICKY NAVBAR & SCROLL EFFECT =====
function initNavbar() {
  const header = document.getElementById('header');
  
  if (!header) return;
  
  function handleScroll() {
    if (window.scrollY >= 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
}

// ===== MOBILE HAMBURGER MENU =====
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  
  // Show menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Hide menu
  if (navClose) {
    navClose.addEventListener('click', () => {
      closeMenu();
    });
  }
  
  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && 
        !navToggle.contains(e.target) && 
        navMenu.classList.contains('show')) {
      closeMenu();
    }
  });
  
  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show')) {
      closeMenu();
    }
  });
  
  function closeMenu() {
    navMenu.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href.length <= 1) return;
      
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

// ===== ACTIVE NAV LINK =====
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  function highlightNavLink() {
    const scrollY = window.pageYOffset;
    const headerOffset = 100;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerOffset;
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
  }
  
  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink(); // Check initial state
}
