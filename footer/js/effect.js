document.addEventListener('DOMContentLoaded', () => {
    //TORCH EFFECT: Đèn pin theo chuột
    const torch = document.getElementById('torch-overlay');
    if (torch) {
        document.addEventListener('mousemove', (e) => {
            torch.style.setProperty('--x', e.clientX + 'px');
            torch.style.setProperty('--y', e.clientY + 'px');
        });
    }

    // PARTICLES: Tạo hạt bụi
    const particleContainer = document.getElementById('particles-container');
    if (particleContainer) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random kích thước và vị trí
            const size = Math.random() * 4 + 2; 
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + 'vw';
            
            // Random thời gian bay
            particle.style.animationDuration = Math.random() * 5 + 5 + 's'; // 5s - 10s
            
            particleContainer.appendChild(particle);

            // Xóa hạt sau khi bay xong để nhẹ trình duyệt
            setTimeout(() => {
                particle.remove();
            }, 10000);
        }
        setInterval(createParticle, 300); // Tạo hạt mỗi 300ms
    }

    // SCROLL REVEAL & ACTIVE LINK
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        // Hiệu ứng hiện ra
        reveals.forEach(reveal => {
            const boxTop = reveal.getBoundingClientRect().top;
            if(boxTop < triggerBottom) {
                reveal.classList.add('active');
            }
        });

        // Highlight Sidebar link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // const sectionHeight = section.clientHeight; // Không dùng nhưng giữ lại nếu cần tham khảo
            if (window.pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    // Gọi 1 lần đầu để hiện các phần tử đang thấy
    checkScroll();

    // Footer loader
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(r => r.ok ? r.text() : '')
            .then(d => footerPlaceholder.innerHTML = d)
            .catch(e => console.error('Lỗi tải footer:', e));
    }

    // READING PROGRESS BAR (Thanh tiến trình kiểu RPG)
    // Tạo thanh bar bằng JS để không phải sửa HTML
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'fixed top-0 left-0 w-full h-1 bg-[#140805] z-[60]';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'h-full bg-[#d4af37] w-0 transition-all duration-100 ease-out shadow-[0_0_10px_#d4af37]';
    progressBarContainer.appendChild(progressBar);
    document.body.appendChild(progressBarContainer);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // BACK TO TOP BUTTON (Nút Hồi thành)
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '▲'; // Có thể thay bằng SVG mũi tên
    backToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-[#140805] text-[#d4af37] border border-[#d4af37] rounded-full text-xl font-bold opacity-0 invisible transition-all duration-300 hover:bg-[#c2412d] hover:text-[#f3f1e6] hover:scale-110 z-40 shadow-[0_0_15px_#000]';
    backToTopBtn.title = "Quay lại đầu trang";
    
    document.body.appendChild(backToTopBtn);

    // Logic hiện/ẩn nút
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });

    // Sự kiện click cuộn mượt lên đầu
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // MOBILE MENU
    const mobileBtn = document.getElementById('mobile-quest-btn');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileNavContainer = document.getElementById('mobile-nav-container');
    const sidebarSource = document.getElementById('sidebar-nav');

    // a. Tự động copy link từ Sidebar sang Mobile Menu (đỡ phải viết lại HTML)
    if (sidebarSource && mobileNavContainer) {
        // Copy HTML
        mobileNavContainer.innerHTML = sidebarSource.innerHTML;
        
        // Tùy chỉnh lại style cho các link trong Mobile để to, dễ bấm hơn
        const mobileLinks = mobileNavContainer.querySelectorAll('a');
        mobileLinks.forEach(link => {
            // Xóa style của sidebar cũ
            link.className = ''; 
            // Thêm style mới: Chữ to, căn giữa, màu sáng
            link.classList.add('text-base', 'text-[#a68b7c]', 'hover:text-[#d4af37]', 'font-bold', 'tracking-wide', 'transition-colors', 'block', 'py-2');
            
            // Thêm sự kiện: Bấm vào link -> Đóng menu luôn
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });
    }

    // b. Hàm đóng mở menu
    function toggleMenu(show) {
        if (show) {
            mobileMenu.classList.remove('hidden');
            // Timeout nhỏ để hiệu ứng opacity chạy được (do display:none không transition)
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0', 'invisible');
            }, 10);
        } else {
            mobileMenu.classList.add('opacity-0', 'invisible');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300); // Đợi 300ms cho hết hiệu ứng mờ dần rồi mới ẩn
        }
    }

    // c. Gắn sự kiện click
    if (mobileBtn) mobileBtn.addEventListener('click', () => toggleMenu(true));
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMenu(false));
});