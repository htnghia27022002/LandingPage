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
