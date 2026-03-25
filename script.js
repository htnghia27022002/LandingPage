// ===== MAIN JAVASCRIPT =====
// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Landing Page Initialized');
  
  // Initialize all components
  initScrollHeader();
  initScrollTop();
  initScrollReveal();
  initAOS();
  initPreloader();
});

// ===== AOS INITIALIZATION =====
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }
}

// ===== SCROLL HEADER =====
function initScrollHeader() {
  const header = document.getElementById('header');
  
  if (!header) return;
  
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
// ===== ANIMATIONS MODULE =====

document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initParallaxEffect();
  initCounterAnimation();
  initTypewriterEffect();
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  // Animate elements on scroll
  const animatedElements = document.querySelectorAll(`
    .program__card,
    .course__card,
    .gallery__item,
    .about__item,
    .info__item
  `);
  
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
  });
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.hero__image-wrapper');
  
  if (parallaxElements.length === 0) return;
  
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat__number');
  
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
  const target = element.textContent;
  const isPercentage = target.includes('%');
  const isPlus = target.includes('+');
  
  // Extract number
  const number = parseInt(target.replace(/\D/g, ''));
  
  if (isNaN(number)) return;
  
  const duration = 2000; // 2 seconds
  const frameDuration = 1000 / 60; // 60 FPS
  const totalFrames = Math.round(duration / frameDuration);
  const increment = number / totalFrames;
  
  let currentNumber = 0;
  let frame = 0;
  
  const counter = setInterval(() => {
    frame++;
    currentNumber += increment;
    
    if (frame === totalFrames) {
      currentNumber = number;
      clearInterval(counter);
    }
    
    let displayValue = Math.floor(currentNumber);
    
    if (isPercentage) {
      element.textContent = displayValue + '%';
    } else if (isPlus) {
      element.textContent = displayValue + '+';
    } else {
      element.textContent = displayValue;
    }
  }, frameDuration);
}

// ===== TYPEWRITER EFFECT =====
function initTypewriterEffect() {
  const typewriterElements = document.querySelectorAll('[data-typewriter]');
  
  typewriterElements.forEach(element => {
    const text = element.getAttribute('data-typewriter');
    const speed = parseInt(element.getAttribute('data-speed')) || 100;
    
    element.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };
    
    // Start typewriter when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(element);
  });
}

// ===== MOUSE FOLLOW EFFECT (Optional) =====
function initMouseFollowEffect() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    display: none;
  `;
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.display = 'block';
  });
  
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.2;
    cursorY += dy * 0.2;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Expand cursor on hover over clickable elements
  const clickables = document.querySelectorAll('a, button, input, textarea, select');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.borderColor = 'var(--color-secondary)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.borderColor = 'var(--color-primary)';
    });
  });
}

// Uncomment to enable mouse follow effect (desktop only)
// if (window.innerWidth > 1024) {
//   initMouseFollowEffect();
// }

// ===== FLOATING ANIMATION FOR CARDS =====
function initFloatingCards() {
  const cards = document.querySelectorAll('.hero__image-card');
  
  cards.forEach((card, index) => {
    const duration = 3 + (index * 0.5);
    const delay = index * 0.2;
    
    card.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
  });
}

initFloatingCards();

// ===== RIPPLE EFFECT ON BUTTONS =====
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add ripple animation to CSS if not exists
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

initRippleEffect();

// ===== IMAGE LAZY LOADING =====
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

initLazyLoading();

// Export for external use
window.AnimationsModule = {
  initScrollAnimations,
  initParallaxEffect,
  initCounterAnimation,
  initTypewriterEffect,
  animateCounter
};
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
// ===== MODAL MODULE =====

document.addEventListener('DOMContentLoaded', function() {
  initModal();
  initGalleryModal();
  initProgramModals();
});

// ===== IMAGE MODAL =====
function initModal() {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');
  
  if (!modal) return;
  
  // Open modal function
  function openModal(imageSrc, caption) {
    modal.classList.add('show');
    modalImage.src = imageSrc;
    modalCaption.textContent = caption;
    document.body.style.overflow = 'hidden';
  }
  
  // Close modal function
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Clear image after animation
    setTimeout(() => {
      modalImage.src = '';
      modalCaption.textContent = '';
    }, 300);
  }
  
  // Close button
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Close on background click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  // Export close function
  window.closeModal = closeModal;
  window.openModal = openModal;
}

// ===== GALLERY IMAGE MODAL =====
function initGalleryModal() {
  const galleryBtns = document.querySelectorAll('.gallery__btn');
  
  // Image data for gallery
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200',
      title: 'Design Thinking Workshop',
      description: 'Workshop về tư duy thiết kế với chuyên gia hàng đầu'
    },
    {
      src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200',
      title: 'Graphic Design Competition',
      description: 'Cuộc thi thiết kế đồ họa cấp trường năm 2025'
    },
    {
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
      title: 'Student Film Screening',
      description: 'Chiếu phim do chính sinh viên thực hiện'
    },
    {
      src: 'https://images.unsplash.com/photo-1558403194-611308249627?w=1200',
      title: '3D Animation Showcase',
      description: 'Triển lãm các dự án animation 3D xuất sắc'
    },
    {
      src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=1200',
      title: 'Video Production Workshop',
      description: 'Workshop thực hành quay dựng video chuyên nghiệp'
    },
    {
      src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200',
      title: 'Graduate Exhibition',
      description: 'Triển lãm tốt nghiệp của khóa 2024'
    }
  ];
  
  galleryBtns.forEach((btn, index) => {
    btn.addEventListener('click', function() {
      const imageIndex = parseInt(this.getAttribute('data-image')) - 1;
      const imageData = galleryImages[imageIndex];
      
      if (imageData && window.openModal) {
        window.openModal(
          imageData.src,
          `${imageData.title} - ${imageData.description}`
        );
      }
    });
  });
}

// ===== PROGRAM DETAIL MODALS =====
function initProgramModals() {
  const programBtns = document.querySelectorAll('[data-modal]');
  
  // Program details data
  const programDetails = {
    design: {
      title: 'Thiết kế Đồ họa',
      description: 'Chương trình đào tạo chuyên sâu về thiết kế đồ họa, từ cơ bản đến nâng cao.',
      content: `
        <h4>Nội dung chương trình:</h4>
        <ul>
          <li>Adobe Photoshop, Illustrator, InDesign</li>
          <li>Brand Identity & Logo Design</li>
          <li>UI/UX Design cho Web & Mobile</li>
          <li>Typography & Layout Design</li>
          <li>Packaging Design</li>
          <li>Print Design & Pre-press</li>
        </ul>
        <h4>Cơ hội nghề nghiệp:</h4>
        <p>Graphic Designer, Brand Designer, UI/UX Designer, Art Director, Creative Director</p>
      `
    },
    video: {
      title: 'Dựng Video',
      description: 'Học các kỹ thuật dựng phim chuyên nghiệp từ cơ bản đến nâng cao.',
      content: `
        <h4>Nội dung chương trình:</h4>
        <ul>
          <li>Adobe Premiere Pro & Final Cut Pro</li>
          <li>DaVinci Resolve - Color Grading</li>
          <li>Motion Graphics với After Effects</li>
          <li>Sound Design & Audio Editing</li>
          <li>Cinematography & Lighting</li>
          <li>Video Marketing & Social Media</li>
        </ul>
        <h4>Cơ hội nghề nghiệp:</h4>
        <p>Video Editor, Colorist, Motion Designer, Videographer, Content Creator</p>
      `
    },
    animation: {
      title: 'Animation',
      description: 'Tạo ra các hoạt họa 2D/3D sống động và chuyên nghiệp.',
      content: `
        <h4>Nội dung chương trình:</h4>
        <ul>
          <li>2D Animation với After Effects</li>
          <li>3D Modeling với Blender & Maya</li>
          <li>Character Animation & Rigging</li>
          <li>Visual Effects (VFX)</li>
          <li>Motion Design & Motion Graphics</li>
          <li>Stop Motion Animation</li>
        </ul>
        <h4>Cơ hội nghề nghiệp:</h4>
        <p>Animator, 3D Artist, VFX Artist, Motion Designer, Character Designer</p>
      `
    },
    media: {
      title: 'Media & Digital Marketing',
      description: 'Chiến lược nội dung đa phương tiện và digital marketing hiệu quả.',
      content: `
        <h4>Nội dung chương trình:</h4>
        <ul>
          <li>Content Strategy & Planning</li>
          <li>Social Media Marketing</li>
          <li>Digital Advertising (Facebook, Google Ads)</li>
          <li>Analytics & Data-driven Marketing</li>
          <li>SEO & Content Marketing</li>
          <li>Influencer Marketing</li>
        </ul>
        <h4>Cơ hội nghề nghiệp:</h4>
        <p>Content Creator, Social Media Manager, Digital Marketer, Marketing Strategist</p>
      `
    }
  };
  
  programBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modalType = this.getAttribute('data-modal');
      const program = programDetails[modalType];
      
      if (program) {
        showProgramModal(program);
      }
    });
  });
}

// Show program detail modal
function showProgramModal(program) {
  // Create modal if doesn't exist
  let modal = document.getElementById('program-modal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'program-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <button class="modal__close" id="program-modal-close">
        <i class="fas fa-times"></i>
      </button>
      <div class="modal__content" style="max-width: 700px; background: white; padding: 2rem; border-radius: 1rem;">
        <div id="program-modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add close functionality
    const closeBtn = modal.querySelector('#program-modal-close');
    closeBtn.addEventListener('click', closeProgramModal);
    
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeProgramModal();
      }
    });
  }
  
  // Update content
  const modalBody = modal.querySelector('#program-modal-body');
  modalBody.innerHTML = `
    <h2 style="margin-bottom: 1rem; color: var(--color-primary);">${program.title}</h2>
    <p style="font-size: 1.125rem; color: var(--color-gray-600); margin-bottom: 1.5rem;">${program.description}</p>
    ${program.content}
  `;
  
  // Show modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeProgramModal() {
  const modal = document.getElementById('program-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Close modals on ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeProgramModal();
  }
});

// Export for external use
window.ModalModule = {
  openModal: window.openModal,
  closeModal: window.closeModal,
  showProgramModal,
  closeProgramModal
};
// ===== FORM VALIDATION MODULE =====
// Validation: empty, email format, length, display errors, prevent submit

document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
});

// ===== CONTACT FORM VALIDATION =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (!form) return;
  
  // Get form fields
  const fullnameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const subjectSelect = document.getElementById('subject');
  const messageTextarea = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const successMessage = document.getElementById('success-message');
  
  // Validation functions
  const validators = {
    fullname: (value) => {
      if (!value || value.trim().length < 2) {
        return 'Họ và tên phải có ít nhất 2 ký tự';
      }
      if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value.trim())) {
        return 'Họ và tên chỉ được chứa chữ cái và khoảng trắng';
      }
      return '';
    },
    
    email: (value) => {
      if (!value || value.trim() === '') {
        return 'Vui lòng nhập email';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Email không đúng định dạng (ví dụ: example@email.com)';
      }
      return '';
    },
    
    phone: (value) => {
      if (!value || value.trim() === '') {
        return 'Vui lòng nhập số điện thoại';
      }
      const cleanPhone = value.replace(/\s/g, '');
      if (!/^[0-9]{10}$/.test(cleanPhone)) {
        return 'Số điện thoại phải có đúng 10 chữ số';
      }
      return '';
    },
    
    subject: (value) => {
      if (!value || value === '') {
        return 'Vui lòng chọn chủ đề';
      }
      return '';
    },
    
    message: (value) => {
      if (!value || value.trim().length < 20) {
        return 'Nội dung phải có ít nhất 20 ký tự';
      }
      if (value.trim().length > 500) {
        return 'Nội dung không được vượt quá 500 ký tự';
      }
      return '';
    }
  };
  
  // Show error message
  function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      inputElement.classList.add('error');
      inputElement.classList.remove('success');
    }
  }
  
  // Show success state
  function showSuccess(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      inputElement.classList.remove('error');
      inputElement.classList.add('success');
    }
  }
  
  // Clear all errors
  function clearErrors() {
    const errorElements = form.querySelectorAll('.form__error');
    const inputElements = form.querySelectorAll('.form__input, .form__select, .form__textarea');
    
    errorElements.forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });
    
    inputElements.forEach(el => {
      el.classList.remove('error', 'success');
    });
  }
  
  // Validate single field
  function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    if (!input) return false;
    
    const value = input.value;
    const error = validators[fieldId](value);
    
    if (error) {
      showError(fieldId, error);
      return false;
    } else {
      showSuccess(fieldId);
      return true;
    }
  }
  
  // Validate all fields
  function validateForm() {
    let isValid = true;
    
    // Validate each field
    ['fullname', 'email', 'phone', 'subject', 'message'].forEach(fieldId => {
      if (!validateField(fieldId)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  // Real-time validation on blur
  if (fullnameInput) {
    fullnameInput.addEventListener('blur', () => validateField('fullname'));
    fullnameInput.addEventListener('input', () => {
      if (fullnameInput.classList.contains('error')) {
        validateField('fullname');
      }
    });
  }
  
  if (emailInput) {
    emailInput.addEventListener('blur', () => validateField('email'));
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('error')) {
        validateField('email');
      }
    });
  }
  
  if (phoneInput) {
    phoneInput.addEventListener('blur', () => validateField('phone'));
    phoneInput.addEventListener('input', () => {
      if (phoneInput.classList.contains('error')) {
        validateField('phone');
      }
    });
  }
  
  if (subjectSelect) {
    subjectSelect.addEventListener('change', () => validateField('subject'));
  }
  
  if (messageTextarea) {
    messageTextarea.addEventListener('blur', () => validateField('message'));
    messageTextarea.addEventListener('input', () => {
      if (messageTextarea.classList.contains('error')) {
        validateField('message');
      }
    });
  }
  
  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide previous success message
    if (successMessage) {
      successMessage.style.display = 'none';
    }
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Đang gửi...</span> <i class="fas fa-spinner fa-spin"></i>';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Show success message
      if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      // Reset form
      form.reset();
      clearErrors();
      
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Gửi tin nhắn</span> <i class="fas fa-paper-plane"></i>';
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        if (successMessage) {
          successMessage.style.display = 'none';
        }
      }, 5000);
    }, 1500);
  });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initContactForm };
}



// ===== SLIDER MODULE =====

document.addEventListener('DOMContentLoaded', function() {
  initSlider();
  initGalleryFilter();
});

// ===== IMAGE SLIDER =====
function initSlider() {
  const slider = document.querySelector('.slider');
  const sliderTrack = document.querySelector('.slider__track');
  const slides = document.querySelectorAll('.slider__slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');
  
  if (!slider || !sliderTrack || slides.length === 0) return;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplayInterval;
  const autoplayDelay = 5000; // 5 seconds
  
  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('slider__dot');
      
      if (i === 0) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  // Update dots
  function updateDots() {
    const dots = document.querySelectorAll('.slider__dot');
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Go to specific slide
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const offset = -slideIndex * 100;
    sliderTrack.style.transform = `translateX(${offset}%)`;
    updateDots();
    resetAutoplay();
  }
  
  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }
  
  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  }
  
  // Autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, autoplayDelay);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
  
  // Touch/Swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  sliderTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  });
  
  sliderTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
  
  // Pause autoplay on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  
  // Initialize
  createDots();
  startAutoplay();
}

// ===== GALLERY FILTER =====
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter__btn');
  const galleryItems = document.querySelectorAll('.gallery__item');
  
  if (filterBtns.length === 0 || galleryItems.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.classList.remove('hide');
          item.style.display = 'block';
          
          // Animate in
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            item.classList.add('hide');
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ===== TABS FUNCTIONALITY =====
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab__button');
  const tabContents = document.querySelectorAll('.tab__content');
  
  if (tabButtons.length === 0 || tabContents.length === 0) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(targetTab)?.classList.add('active');
    });
  });
}

// Initialize tabs
initTabs();

// ===== ACCORDION (Optional - if needed) =====
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion__header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.parentElement;
      const isActive = accordionItem.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion__item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });
}

// Initialize accordion if exists
initAccordion();

// Export for external use
window.SliderModule = {
  initSlider,
  initGalleryFilter,
  initTabs,
  initAccordion
};
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
