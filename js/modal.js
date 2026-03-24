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
