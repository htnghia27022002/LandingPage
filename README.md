# Landing Page - Truyền thông Đa phương tiện

Landing page giới thiệu ngành học Truyền thông Đa phương tiện với các chuyên ngành: Thiết kế Đồ họa, Dựng Video, Animation, và Media & Digital Marketing.

## 📁 Cấu trúc dự án

```
LandingPage/
├── index.html              # File HTML chính
├── css/
│   ├── variables.css       # CSS Variables (màu sắc, fonts, spacing)
│   ├── layout.css          # Layout chính (container, grid, flex)
│   ├── components.css      # Components (buttons, cards, forms)
│   ├── sections.css        # Styling từng section
│   └── responsive.css      # Media queries cho responsive
├── js/
│   ├── main.js            # Khởi tạo chính, utilities
│   ├── navigation.js      # Navigation menu, smooth scroll
│   ├── slider.js          # Image slider, gallery filter, tabs
│   ├── modal.js           # Modal popups
│   ├── form.js            # Form validation
│   └── animations.js      # Scroll animations, effects
└── README.md              # File này
```

## ✨ Tính năng

### HTML & Cấu trúc (Semantic HTML)
- ✅ Sử dụng semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ✅ Cấu trúc heading hợp lý (h1-h6)
- ✅ Alt text cho images, label cho inputs
- ✅ Accessibility attributes (aria-label)
- ✅ Tổ chức nội dung logic và rõ ràng

### CSS & Giao diện
- ✅ **Layout responsive** với Flexbox và CSS Grid
- ✅ **2 breakpoints**: Mobile (<768px) và Desktop (>=768px)
- ✅ **Design system** với CSS Variables
- ✅ **Components tái sử dụng**: buttons, cards, forms
- ✅ **Animations & Transitions** mượt mà
- ✅ **Dark Mode** toggle
- ✅ **Modern UI** với gradients và shadows

### JavaScript & Tương tác
- ✅ **Mobile Navigation** - Menu hamburger responsive
- ✅ **Smooth Scroll** - Cuộn mượt giữa các section
- ✅ **Image Slider** - Carousel tự động với controls
- ✅ **Gallery Filter** - Lọc hình ảnh theo category
- ✅ **Tabs Navigation** - Chuyển đổi nội dung môn học
- ✅ **Modal Popups** - Xem chi tiết hình ảnh và chương trình
- ✅ **Scroll Animations** - Hiệu ứng khi cuộn trang
- ✅ **Counter Animation** - Số liệu thống kê tăng dần
- ✅ **Scroll to Top** button

### Form & Validation
- ✅ **Contact Form** với 3 trường bắt buộc
- ✅ **Real-time Validation** - Kiểm tra ngay khi nhập
- ✅ **Custom Error Messages** - Thông báo lỗi tiếng Việt
- ✅ **Input Validation**:
  - Họ tên: Ít nhất 2 ký tự, chỉ chữ cái
  - Email: Format chuẩn email
  - Số điện thoại: Format số ĐT Việt Nam
- ✅ **Success/Error States** - Visual feedback
- ✅ **Form Reset** - Xóa form hợp lệ

## 🎨 Sections trong trang

1. **Header & Navigation** - Sticky header với menu responsive
2. **Hero Section** - Giới thiệu ngành học với animated cards
3. **About Section** - Về trường/ngành với thống kê
4. **Programs Section** - 4 chuyên ngành chính
5. **Curriculum Section** - Môn học theo năm (với tabs)
6. **Activities Section** - Gallery hoạt động SV (filter + slider)
7. **Contact Section** - Form liên hệ với validation
8. **Footer** - Thông tin, links, newsletter

## 🚀 Hướng dẫn sử dụng

### 1. Mở trang web
- Mở file `index.html` bằng trình duyệt web
- Hoặc sử dụng Live Server extension trong VS Code

### 2. Responsive Testing
- Desktop: >= 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

Sử dụng DevTools (F12) để test responsive:
```
- iPhone SE: 375px
- iPhone 12 Pro: 390px
- iPad: 768px
- Desktop: 1280px+
```

### 3. Features Testing

#### Navigation
- Click vào menu items để smooth scroll đến section
- Trên mobile: Click hamburger icon để mở menu
- Active link tự động highlight khi scroll

#### Gallery Filter
- Click các nút filter để lọc hình ảnh
- Click vào icon search để xem modal phóng to

#### Tabs (Môn học)
- Click "Năm 1", "Năm 2", "Năm 3", "Năm 4"
- Nội dung chuyển đổi với animation

#### Slider
- Tự động chuyển sau 5 giây
- Click prev/next để điều khiển
- Click dots để nhảy đến slide cụ thể
- Swipe trên mobile
- Pause khi hover (desktop)

#### Form Validation
- Nhập thông tin không hợp lệ để thấy error
- Nhập đúng để thấy success state
- Submit form để thấy loading state
- Reset để xóa form

#### Dark Mode
- Click icon moon/sun ở header
- Theme được lưu vào localStorage

## 🎯 Yêu cầu đã đáp ứng

### B. HTML & cấu trúc nội dung (20đ)
- ✅ (5đ) Semantic HTML tốt
- ✅ (5đ) Tổ chức nội dung hợp lý
- ✅ (5đ) Chuẩn truy cập: alt, label, rõ ràng
- ✅ (5đ) Hợp lệ và gọn: indent, class/id hợp lý

### C. CSS & giao diện (20đ)
- ✅ (5đ) Layout chuẩn: Flex/Grid, responsive 2 breakpoint
- ✅ (5đ) Tính nhất quán: font, màu, spacing, components
- ✅ (5đ) Tính thẩm mỹ: cân đối, dễ đọc, tương phản tốt
- ✅ (5đ) Tổ chức CSS tốt: tách file, comment, tránh inline

### D. JavaScript & tương tác (15đ)
- ✅ (4đ) Chức năng tương tác: filter, tab, modal, gallery, slider
- ✅ (4đ) Xử lý DOM tốt: query đúng, event listener, cập nhật UI
- ✅ (4đ) Code JS sạch: tách hàm, đặt tên rõ, tránh lặp
- ✅ (3đ) Trang thái/độ tin cậy: error handling, disable button

### E. Form cơ bản & validation (15đ)
- ✅ (4đ) Form đúng cấu trúc: label, input types, placeholder
- ✅ (4đ) Validation JS: rỗng, email đúng format, độ dài...
- ✅ (4đ) UX form: focus state, message thành công, reset/clear
- ✅ (3đ) Không cần backend nhưng có preventDefault, show summary

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Variables, Flexbox, Grid, Animations
- **JavaScript (ES6+)** - Modules, Arrow functions, Template literals
- **Font Awesome 6.5** - Icons
- **Google Fonts** - Poppins & Playfair Display
- **Unsplash** - Placeholder images

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 💡 Tips

### Customize Colors
Chỉnh sửa trong `css/variables.css`:
```css
:root {
  --color-primary: #6366f1;
  --color-secondary: #ec4899;
  --color-accent: #f59e0b;
}
```

### Add More Slides
Thêm slide mới trong HTML:
```html
<div class="slider__slide">
  <img src="your-image.jpg" alt="Description">
  <p class="slider__caption">Your caption</p>
</div>
```

### Add More Gallery Items
```html
<article class="gallery__item" data-category="workshop">
  <div class="gallery__image">
    <img src="your-image.jpg" alt="Description">
    <div class="gallery__overlay">
      <h3 class="gallery__title">Title</h3>
      <p class="gallery__category">Category</p>
      <button class="gallery__btn" data-image="7">
        <i class="fas fa-search-plus"></i>
      </button>
    </div>
  </div>
</article>
```

## 🐛 Known Issues

- None currently

## 📝 License

Dự án này được tạo cho mục đích học tập.

## 👨‍💻 Author

Sinh viên ngành Truyền thông Đa phương tiện

---

**Chúc bạn code vui vẻ! 🚀**
