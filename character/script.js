// DỮ LIỆU NHÂN VẬT
        const characters = [
            { 
                id: "01", name: "Alius", role: "Quang thức", image: "character/alius.png", color: "#FFD700",
                quote: "Tôi không biết? Tôi không nhớ? Tôi không hiểu? Tôi là ai?",
                fullDesc: "Sở hữu sức mạnh của Ánh sáng và Trí thức. Alius luôn tìm kiếm câu trả lời cho nguồn gốc của mình giữa thế giới hỗn mang."
            },
            { 
                id: "02", name: "Salvat", role: "Hỏa", image: "character/Salvat.png", color: "#FF4500",
                quote: "Tôi chỉ muốn bảo vệ những người thân yêu của mình thôi! Không thể để mất ai lần nào nữa, không thể để sai lầm đó xảy ra lại lần nữa",
                fullDesc: "Không thể để mất ai lần nào nữa. Ngọn lửa của Salvat là lá chắn vững chắc nhất để bảo vệ đồng đội khỏi mọi hiểm nguy."
            },
            { 
                id: "03", name: "Vivian", role: "Mộc", image: "character/Vivian.png", color: "#00FF7F",
                quote: "Thời trang không hề có giới tính cưng à, chính con người đã áp đặt định kiến giới lên nó đấy. Tại sao ư? Vì họ thích như vậy. Hahaha",
                fullDesc: "Tự do và phóng khoáng như thiên nhiên. Vivian sử dụng sức mạnh của Mộc để trói buộc kẻ thù và chữa lành vết thương."
            },
            { 
                id: "04", name: "Carceus", role: "Ám", image: "character/carceus.png", color: "#9D00FF",
                quote: "Cuộc sống là vô vàn cơ hội, vô vàn khả năng, chính vì vậy mà cuộc sống mới thú vị đấy, cậu có biết không?",
                fullDesc: "Bóng tối không phải là điều xấu xa, nó là nơi ẩn chứa những khả năng vô tận mà Carceus luôn khao khát khám phá."
            }
        ];

        let currentIndex = 0;

        const thumbList = document.getElementById('thumb-list');
        const bigImg = document.getElementById('big-char-img');
        const charName = document.getElementById('char-name');
        const charBadge = document.getElementById('char-badge');
        const charQuote = document.getElementById('char-quote');
        const charDesc = document.getElementById('char-desc');
        const charNumber = document.getElementById('char-number');
        const badgeTop = document.querySelector('.decor-badge-top');
        const rightTriangle = document.querySelector('.decor-right-solid-bg');

        function renderThumbs() {
            thumbList.innerHTML = '';
            characters.forEach((char, index) => {
                const btn = document.createElement('div');
                btn.className = `thumb-btn ${index === currentIndex ? 'active' : ''}`;
                btn.onclick = () => selectCharacter(index);
                btn.innerHTML = `<img src="${char.image}" alt="${char.name}">`;
                thumbList.appendChild(btn);
            });
        }

        function selectCharacter(index) {
            currentIndex = index;
            const char = characters[currentIndex];
            const btnElements = document.querySelectorAll('.thumb-btn');

            btnElements.forEach((b, i) => {
                if (i === currentIndex) {
                    b.classList.add('active');
                    b.style.borderColor = char.color; 
                } else {
                    b.classList.remove('active');
                    b.style.borderColor = 'rgba(255,255,255,0.5)';
                }
            });

            bigImg.style.animation = 'none';
            bigImg.offsetHeight; 
            bigImg.style.animation = 'slideInLeft 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            
            bigImg.src = char.image;
            charName.innerText = char.name;
            charQuote.innerText = `"${char.quote}"`;
            charDesc.innerText = char.fullDesc;
            charBadge.innerText = char.role;
            charNumber.innerText = char.id;

            // Đổi màu
            charBadge.style.backgroundColor = char.color;
            if (char.color === "#FFD700" || char.color === "#00FF7F") {
                charBadge.style.color = "#000";
            } else {
                charBadge.style.color = "#fff";
            }

            if(rightTriangle) rightTriangle.style.backgroundColor = char.color; 
            charQuote.style.borderLeftColor = char.color;
            
            if (window.innerWidth <= 900) {
                 charQuote.style.borderTopColor = char.color;
            }

            if(badgeTop) badgeTop.style.backgroundColor = char.color; 
        }

        function navigateUp() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = characters.length - 1;
            selectCharacter(newIndex);
        }

        function navigateDown() {
            let newIndex = currentIndex + 1;
            if (newIndex >= characters.length) newIndex = 0;
            selectCharacter(newIndex);
        }

        // --- VIDEO POPUP LOGIC (CHO VIDEO OFFLINE) ---
        function openVideo() { 
            const vm = document.getElementById('videoModal');
            vm.classList.add('active'); 
            
            // Tự động phát khi mở (tùy chọn)
            const vid = document.getElementById('myTrailer');
            if(vid) vid.play();
        }

        function closeVideo() { 
            const vm = document.getElementById('videoModal');
            vm.classList.remove('active');
            
            // Dừng video khi đóng modal
            const vid = document.getElementById('myTrailer');
            if (vid) {
                vid.pause();       // Dừng phát
                vid.currentTime = 0; // Tua về đầu
            }
        }

        renderThumbs();
        selectCharacter(currentIndex);
        // =========================================
        // HIỆU ỨNG SCROLL REVEAL
        // =========================================

        function reveal() {
            var reveals = document.querySelectorAll(".reveal");

            for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100; // Khoảng cách từ đáy màn hình để bắt đầu hiện

            if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } 
         else {
            reveals[i].classList.remove("active");
        } 
    }
}

        // Bắt sự kiện cuộn trang
        window.addEventListener("scroll", reveal);

        // Gọi hàm 1 lần ngay khi tải trang để hiện những phần đầu tiên
        reveal();
        // HÀM BẬT/TẮT MENU MOBILE
        function toggleMenu() {
        // 1. Tìm cái menu
        const navMenu = document.getElementById('nav-menu');
        // 2. Thêm hoặc bỏ class 'active' (CSS sẽ dựa vào class này để hiện menu ra)
        navMenu.classList.toggle('active');
        }
        renderThumbs();
        selectCharacter(currentIndex);
    