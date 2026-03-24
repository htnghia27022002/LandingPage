// ===== FORM VALIDATION MODULE =====

document.addEventListener('DOMContentLoaded', function() {
  initFormValidation();
  initNewsletterForm();
});

// ===== CONTACT FORM VALIDATION =====
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  // Form fields
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const programSelect = document.getElementById('program');
  const messageTextarea = document.getElementById('message');
  
  // Error elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  
  // Form message
  const formMessage = document.getElementById('form-message');
  
  // Validation functions
  function validateName(name) {
    if (!name || name.trim().length < 2) {
      return 'Vui lòng nhập họ tên hợp lệ (ít nhất 2 ký tự)';
    }
    if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(name)) {
      return 'Họ tên chỉ được chứa chữ cái';
    }
    return '';
  }
  
  function validateEmail(email) {
    if (!email || email.trim() === '') {
      return 'Vui lòng nhập email';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email không hợp lệ';
    }
    return '';
  }
  
  function validatePhone(phone) {
    if (!phone || phone.trim() === '') {
      return 'Vui lòng nhập số điện thoại';
    }
    // Vietnamese phone number pattern
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return 'Số điện thoại không hợp lệ';
    }
    return '';
  }
  
  // Show error
  function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
  }
  
  // Show success
  function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
  }
  
  // Show form message
  function showFormMessage(message, isSuccess) {
    formMessage.textContent = message;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(isSuccess ? 'success' : 'error');
    formMessage.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      formMessage.classList.remove('show');
    }, 5000);
  }
  
  // Real-time validation
  if (nameInput) {
    nameInput.addEventListener('blur', function() {
      const error = validateName(this.value);
      if (error) {
        showError(this, nameError, error);
      } else {
        showSuccess(this, nameError);
      }
    });
    
    nameInput.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        const error = validateName(this.value);
        if (!error) {
          showSuccess(this, nameError);
        }
      }
    });
  }
  
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const error = validateEmail(this.value);
      if (error) {
        showError(this, emailError, error);
      } else {
        showSuccess(this, emailError);
      }
    });
    
    emailInput.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        const error = validateEmail(this.value);
        if (!error) {
          showSuccess(this, emailError);
        }
      }
    });
  }
  
  if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
      const error = validatePhone(this.value);
      if (error) {
        showError(this, phoneError, error);
      } else {
        showSuccess(this, phoneError);
      }
    });
    
    phoneInput.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        const error = validatePhone(this.value);
        if (!error) {
          showSuccess(this, phoneError);
        }
      }
    });
  }
  
  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate all fields
    const nameVal = nameInput.value;
    const nameErr = validateName(nameVal);
    if (nameErr) {
      showError(nameInput, nameError, nameErr);
      isValid = false;
    } else {
      showSuccess(nameInput, nameError);
    }
    
    const emailVal = emailInput.value;
    const emailErr = validateEmail(emailVal);
    if (emailErr) {
      showError(emailInput, emailError, emailErr);
      isValid = false;
    } else {
      showSuccess(emailInput, emailError);
    }
    
    const phoneVal = phoneInput.value;
    const phoneErr = validatePhone(phoneVal);
    if (phoneErr) {
      showError(phoneInput, phoneError, phoneErr);
      isValid = false;
    } else {
      showSuccess(phoneInput, phoneError);
    }
    
    // If form is valid, submit (simulate)
    if (isValid) {
      // Get form data
      const formData = {
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        program: programSelect.value,
        message: messageTextarea.value
      };
      
      console.log('Form submitted:', formData);
      
      // Simulate API call
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showFormMessage('✓ Đăng ký thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.', true);
        
        // Reset form
        contactForm.reset();
        
        // Remove success classes
        nameInput.classList.remove('success');
        emailInput.classList.remove('success');
        phoneInput.classList.remove('success');
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
      }, 1500);
    } else {
      // Show error message
      showFormMessage('⚠ Vui lòng kiểm tra lại thông tin trong form!', false);
      
      // Focus first error field
      const firstError = contactForm.querySelector('.error');
      if (firstError) {
        firstError.focus();
      }
    }
  });
  
  // Reset button
  contactForm.addEventListener('reset', function() {
    // Clear all error/success states
    const inputs = contactForm.querySelectorAll('.form__input, .form__select, .form__textarea');
    inputs.forEach(input => {
      input.classList.remove('error', 'success');
    });
    
    // Clear error messages
    const errors = contactForm.querySelectorAll('.form__error');
    errors.forEach(error => {
      error.textContent = '';
    });
    
    // Hide form message
    formMessage.classList.remove('show');
  });
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll('.footer__newsletter');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email) {
        alert('Vui lòng nhập email!');
        emailInput.focus();
        return;
      }
      
      if (!emailRegex.test(email)) {
        alert('Email không hợp lệ!');
        emailInput.focus();
        return;
      }
      
      // Simulate subscription
      const btn = this.querySelector('.newsletter__btn');
      btn.classList.add('loading');
      
      setTimeout(() => {
        btn.classList.remove('loading');
        alert('✓ Đăng ký nhận tin thành công!');
        emailInput.value = '';
      }, 1000);
    });
  });
}

// ===== INPUT FORMATTING =====
function formatPhoneInput() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  
  phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      // Remove non-numeric characters
      let value = this.value.replace(/\D/g, '');
      
      // Limit to 10 digits for Vietnamese phone numbers
      if (value.length > 10) {
        value = value.substring(0, 10);
      }
      
      this.value = value;
    });
  });
}

// Initialize phone formatting
formatPhoneInput();

// Export for external use
window.FormModule = {
  initFormValidation,
  initNewsletterForm
};
