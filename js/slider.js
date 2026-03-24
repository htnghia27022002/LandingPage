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
