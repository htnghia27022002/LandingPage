// ===== KHỞI ĐỘNG KHI TRANG TẢI XONG =====
// document.addEventListener('DOMContentLoaded', ...) nghĩa là:
// "Chờ HTML tải xong rồi mới chạy JavaScript bên trong"
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();   // Mở/đóng menu trên điện thoại
  initStickyHeader(); // Làm header nổi bật khi cuộn trang
  initScrollTop();    // Nút cuộn lên đầu trang
  initTabs();         // Chuyển tab (môn học, hoạt động)
  initContactForm();  // Kiểm tra form liên hệ
});


// ===== 1. MENU DI ĐỘNG (HAMBURGER) =====
// Khi bấm icon ≡ → menu trượt ra từ phải
// Khi bấm × hoặc click vào link → menu đóng lại
function initMobileMenu() {
  var toggle = document.getElementById('nav-toggle'); // Nút ≡
  var close  = document.getElementById('nav-close');  // Nút ×
  var menu   = document.getElementById('nav-menu');   // Khung menu
  var links  = document.querySelectorAll('.nav__link'); // Các link

  if (!toggle || !menu) return; // Không tìm thấy thì dừng

  // Mở menu
  toggle.addEventListener('click', function() {
    menu.classList.add('show');
  });

  // Đóng menu bằng nút ×
  if (close) {
    close.addEventListener('click', function() {
      menu.classList.remove('show');
    });
  }

  // Đóng menu khi click vào một link
  links.forEach(function(link) {
    link.addEventListener('click', function() {
      menu.classList.remove('show');
    });
  });
}


// ===== 2. HEADER DÍNH KHI CUỘN =====
// Khi cuộn xuống > 50px → thêm class "scrolled" → shadow đậm hơn
// Khi cuộn lên < 50px → bỏ class "scrolled"
function initStickyHeader() {
  var header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}


// ===== 3. NÚT CUỘN LÊN ĐẦU TRANG =====
// Nút ẩn mặc định, hiện khi cuộn xuống > 400px
// Bấm vào → trang cuộn về trên cùng
function initScrollTop() {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// ===== 4. CHUYỂN TAB =====
// Khi bấm vào nút tab (vd: "Năm 1") → hiện nội dung tương ứng
// Các tab khác tự động ẩn đi
function initTabs() {
  var tabBtns = document.querySelectorAll('.tab__button');
  if (tabBtns.length === 0) return;

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var targetId = this.getAttribute('data-tab'); // Lấy id tab cần hiện

      // Xác định container chứa tabs
      var container = this.closest('[data-tabs-container]') ||
                      this.parentElement.parentElement;

      // Bỏ active khỏi tất cả các nút
      container.querySelectorAll('.tab__button').forEach(function(b) {
        b.classList.remove('active');
      });
      this.classList.add('active'); // Active nút vừa bấm

      // Ẩn tất cả nội dung tab
      container.querySelectorAll('.tab__content').forEach(function(c) {
        c.classList.remove('active');
      });

      // Hiện nội dung của tab vừa chọn
      var target = container.querySelector('#' + targetId) ||
                   container.querySelector('[data-tab-content="' + targetId + '"]');
      if (target) {
        target.classList.add('active');
      }
    });
  });
}


// ===== 5. FORM LIÊN HỆ - KIỂM TRA ĐẦU VÀO =====
// Khi bấm "Gửi" → kiểm tra từng trường
// Nếu sai → hiện thông báo lỗi đỏ
// Nếu đúng hết → giả lập gửi thành công (vì không có server)
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn trình duyệt tự gửi form
    var ok = true;

    // Kiểm tra Họ tên (ít nhất 2 ký tự)
    var name = document.getElementById('fullname');
    var nameErr = document.getElementById('fullname-error');
    if (name && nameErr) {
      if (name.value.trim().length < 2) {
        nameErr.textContent = 'Vui lòng nhập họ tên (ít nhất 2 ký tự)';
        name.classList.add('error');
        ok = false;
      } else {
        nameErr.textContent = '';
        name.classList.remove('error');
      }
    }

    // Kiểm tra Email (phải có dạng abc@email.com)
    var email = document.getElementById('email');
    var emailErr = document.getElementById('email-error');
    if (email && emailErr) {
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
      if (!emailOk) {
        emailErr.textContent = 'Email không đúng (vd: abc@email.com)';
        email.classList.add('error');
        ok = false;
      } else {
        emailErr.textContent = '';
        email.classList.remove('error');
      }
    }

    // Kiểm tra Số điện thoại (đúng 10 chữ số)
    var phone = document.getElementById('phone');
    var phoneErr = document.getElementById('phone-error');
    if (phone && phoneErr) {
      var phoneOk = /^[0-9]{10}$/.test(phone.value.replace(/\s/g, ''));
      if (!phoneOk) {
        phoneErr.textContent = 'Số điện thoại phải đúng 10 chữ số';
        phone.classList.add('error');
        ok = false;
      } else {
        phoneErr.textContent = '';
        phone.classList.remove('error');
      }
    }

    // Nếu tất cả đúng → giả lập gửi thành công
    if (ok) {
      var btn = document.getElementById('submit-btn');
      var msg = document.getElementById('success-message');
      if (btn) btn.disabled = true;

      setTimeout(function() {
        form.reset(); // Xóa trắng form
        if (msg) msg.style.display = 'block'; // Hiện thông báo thành công
        if (btn) btn.disabled = false;

        // Tự ẩn thông báo sau 5 giây
        setTimeout(function() {
          if (msg) msg.style.display = 'none';
        }, 5000);
      }, 1000);
    }
  });
}
