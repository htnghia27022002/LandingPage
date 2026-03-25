# Landing Page - Truyền thông Đa phương tiện

Landing page giới thiệu ngành học Truyền thông Đa phương tiện với 4 chuyên ngành: Thiết kế Đồ họa, Dựng Video, Animation, và Media & Digital Marketing.

---

## 📁 Cấu trúc file

```
LandingPage/
├── index.html        ← Trang chủ
├── about.html        ← Trang giới thiệu ngành
├── courses.html      ← Trang môn học (4 năm)
├── activities.html   ← Trang hoạt động sinh viên
├── contact.html      ← Trang liên hệ + form
├── style.css         ← Toàn bộ CSS của dự án
├── script.js         ← Toàn bộ JavaScript của dự án
└── README.md         ← File này
```

---

## 🌐 Cách chạy trang web

1. Mở thư mục dự án
2. Mở file `index.html` bằng trình duyệt (Chrome, Firefox, Edge...)
3. Hoặc dùng **Live Server** trong VS Code để tự reload khi sửa code

---

## 📄 HTML – Cấu trúc từng trang

Mỗi trang HTML đều có **3 phần chính**:

```
<header>  ← Thanh menu (navigation) ở trên cùng
<main>    ← Nội dung chính của trang
<footer>  ← Chân trang ở dưới cùng
```

### Cấu trúc của Header (menu)

```html
<header class="header" id="header">
    <nav class="nav container">
        <!-- Logo -->
        <a href="index.html" class="nav__logo">Media Arts</a>

        <!-- Danh sách link menu -->
        <div class="nav__menu" id="nav-menu">
            <ul class="nav__list">
                <li><a href="index.html" class="nav__link active">Trang chủ</a></li>
                <li><a href="about.html" class="nav__link">Giới thiệu</a></li>
                ...
            </ul>
            <!-- Nút X để đóng menu trên điện thoại -->
            <div class="nav__close" id="nav-close">...</div>
        </div>

        <!-- Nút 3 gạch (hamburger) - chỉ hiện trên điện thoại -->
        <div class="nav__toggle" id="nav-toggle">...</div>
    </nav>
</header>
```

### Cấu trúc của một Section (phần nội dung)

```html
<section class="section">
    <div class="container">             <!-- Giới hạn chiều rộng, canh giữa -->
        <div class="section__header">   <!-- Tiêu đề phần -->
            <span class="section__subtitle">Nhãn nhỏ trên</span>
            <h2 class="section__title">Tiêu đề chính</h2>
            <p class="section__description">Mô tả ngắn</p>
        </div>
        <!-- Nội dung chính của section -->
    </div>
</section>
```

---

## 🎨 CSS – Style của trang

Toàn bộ CSS nằm trong file `style.css`. File được chia thành các phần rõ ràng với comment như:

```
/* ===== TÊN PHẦN ===== */
```

### Biến CSS (CSS Variables)

Ở đầu file có khai báo biến màu và font chung:

```css
:root {
    --green: #1A6B3C;       /* Màu xanh chính */
    --green-light: #4ECB71; /* Màu xanh nhạt */
    --white: #ffffff;
    --text-dark: #0D2B1A;   /* Màu chữ tối */
    --font-heading: 'Playfair Display', serif;
    --font-body: 'DM Sans', sans-serif;
}
```

Cách dùng biến:
```css
/* Thay vì viết trực tiếp */
color: #1A6B3C;

/* Dùng biến cho dễ thay đổi sau này */
color: var(--green);
```

### Container – Khung bao nội dung

```css
.container {
    max-width: 1200px;  /* Giới hạn chiều rộng tối đa */
    margin: 0 auto;     /* Canh giữa trang */
    padding: 0 20px;    /* Lề 2 bên */
}
```

### Grid Layout – Chia cột bằng CSS Grid

```css
/* 4 cột đều nhau */
.programs__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}

/* Trên điện thoại → đổi thành 1 cột */
@media (max-width: 768px) {
    .programs__grid {
        grid-template-columns: 1fr;
    }
}
```

### Responsive – Trang web tự co giãn theo màn hình

Ở cuối file `style.css` có phần `@media (max-width: 768px)`:

```css
/* Chỉ áp dụng khi màn hình < 768px (điện thoại) */
@media (max-width: 768px) {
    .hero__title { font-size: 34px; }       /* Chữ nhỏ lại */
    .hero__container { grid-template-columns: 1fr; } /* 1 cột */
    .nav__toggle { display: block; }        /* Hiện nút hamburger */
}
```

---

## ⚡ JavaScript – Tương tác của trang

Toàn bộ JS nằm trong file `script.js`. Có **5 chức năng chính**:

### 1. Khởi động khi trang tải xong

```js
document.addEventListener('DOMContentLoaded', function() {
    // Code ở đây chạy sau khi HTML tải xong
    initMobileMenu();
    initStickyHeader();
    initScrollTop();
    initTabs();
    initContactForm();
});
```

### 2. Menu hamburger (điện thoại)

**Vấn đề:** Trên điện thoại, menu không hiện vì màn hình nhỏ.  
**Giải pháp:** Dùng nút ≡ để mở/đóng menu bằng cách thêm/xóa class `show`.

```js
function initMobileMenu() {
    var toggle = document.getElementById('nav-toggle'); // Nút ≡
    var menu   = document.getElementById('nav-menu');   // Khung menu

    toggle.addEventListener('click', function() {
        menu.classList.add('show'); // Thêm class → CSS sẽ trượt menu ra
    });
}
```

CSS phần responsive:
```css
/* Menu ẩn mặc định (trượt ra ngoài màn hình) */
.nav__menu { right: -100%; }

/* Khi có class "show" → trượt vào trong */
.nav__menu.show { right: 0; }
```

### 3. Header nổi bật khi cuộn

**Vấn đề:** Cần phân biệt header khi đang ở đầu trang vs khi đã cuộn xuống.  
**Giải pháp:** Kiểm tra `window.scrollY`, nếu > 50px thì thêm class `scrolled`.

```js
function initStickyHeader() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');    // Thêm bóng đổ đậm
        } else {
            header.classList.remove('scrolled'); // Bỏ bóng đổ
        }
    });
}
```

### 4. Nút cuộn lên đầu trang

**Vấn đề:** Khi cuộn xuống xa, muốn quay lại đầu trang nhanh.  
**Giải pháp:** Nút ẩn mặc định, hiện ra khi cuộn > 400px, bấm vào thì cuộn về trên.

```js
function initScrollTop() {
    // Hiện/ẩn nút
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    // Cuộn về đầu khi bấm
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
```

### 5. Chuyển tab (Năm 1 / Năm 2 / Năm 3 / Năm 4)

**Vấn đề:** Cần hiện/ẩn nội dung theo tab được chọn.  
**Giải pháp:** Bấm vào tab → xóa active khỏi tất cả → thêm active vào tab được chọn.

```js
// HTML - Tab button có data-tab="year1"
// <button class="tab__button" data-tab="year1">Năm 1</button>

// HTML - Nội dung tab có id="year1"
// <div class="tab__content" id="year1">...</div>

function initTabs() {
    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var targetId = this.getAttribute('data-tab'); // Lấy id

            // Bỏ active khỏi tất cả nút
            allButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active'); // Active nút này

            // Ẩn tất cả nội dung
            allContents.forEach(c => c.classList.remove('active'));

            // Hiện nội dung tương ứng
            document.getElementById(targetId).classList.add('active');
        });
    });
}
```

CSS phần tabs:
```css
.tab__content { display: none; }        /* Ẩn tất cả */
.tab__content.active { display: block; } /* Chỉ hiện cái có class "active" */
```

### 6. Kiểm tra form liên hệ

**Vấn đề:** Người dùng có thể bỏ trống hoặc nhập sai định dạng.  
**Giải pháp:** Khi bấm Gửi → kiểm tra từng trường → hiện lỗi nếu sai.

```js
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn form gửi đi (vì không có server)

    // Kiểm tra họ tên
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Vui lòng nhập ít nhất 2 ký tự';
        nameInput.classList.add('error'); // CSS: viền đỏ
    }

    // Kiểm tra email bằng regex
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    if (!emailOk) {
        emailError.textContent = 'Email không đúng định dạng';
    }

    // Nếu tất cả đúng → giả lập thành công
    if (ok) {
        form.reset();
        successMessage.style.display = 'block';
    }
});
```

---

## 📱 Test Responsive

Dùng DevTools (nhấn F12) → icon điện thoại → chọn kích thước:

| Thiết bị    | Chiều rộng |
|-------------|-----------|
| Điện thoại  | 375px     |
| Tablet      | 768px     |
| Desktop     | 1280px+   |

---

## 🔤 Font và Icon

- **Font chữ**: Lấy từ Google Fonts (Playfair Display + DM Sans)
- **Icon**: Font Awesome 6.5 (dùng thẻ `<i class="fas fa-...">`)

Ví dụ icon:
```html
<i class="fas fa-graduation-cap"></i>  <!-- Mũ tốt nghiệp -->
<i class="fas fa-arrow-right"></i>     <!-- Mũi tên phải -->
<i class="fas fa-bars"></i>            <!-- Icon 3 gạch (hamburger) -->
```

---

## 🎯 Luồng hoạt động tóm tắt

```
Người dùng mở trang
       ↓
HTML hiển thị nội dung
       ↓
CSS tạo giao diện đẹp (màu sắc, layout, responsive)
       ↓
JS thêm tương tác (menu mobile, scroll, tabs, form)
```

---

**Chúc bạn code vui! 🚀**
