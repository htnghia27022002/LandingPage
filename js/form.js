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


// Initialize phone formatting
formatPhoneInput();

// Export for external use
window.FormModule = {
  initFormValidation,
  initNewsletterForm
};
