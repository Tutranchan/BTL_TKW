// loadHeader.js
fetch("../header/header.html")
  .then(res => res.text())
  .then(html => {
    const headerBox = document.getElementById("header");
    headerBox.innerHTML = html; // Header DOM đã được chèn vào đây!

    // === LOGIC MỚI: ẨN SPINNER SAU KHI TẢI XONG ===
   const spinner = document.getElementById("loading-spinner");
    if (spinner) {
        // 1. Kích hoạt hiệu ứng fade-out (opacity: 1 -> 0)
        spinner.classList.add("fade-out"); 

        // 2. Thêm độ trễ 1000ms (1 giây) trước khi ẩn hẳn (display: none)
        setTimeout(() => {
            // Thêm class 'hidden' để ẩn hoàn toàn khỏi bố cục
            spinner.classList.add("hidden"); 
        }, 400000); 
    }
    // ============================================

    // Chọn menu active
    const active = window.ACTIVE_MENU;
    const item = headerBox.querySelector(`[data-page="${active}"]`);
    if(item) item.classList.add("active-page");
    if(active === "main") headerBox.classList.add("home-mode");
    else headerBox.classList.remove("home-mode");

    // --- INIT HEADER EFFECT (DOM đã có) ---
    // Gọi hàm initHeaderEffect() để xử lý dropdown và logo
    if (window.initHeaderEffect) {
        window.initHeaderEffect();
    }

    // *** LOGIC SOUND/MUSIC DUY NHẤT Ở ĐÂY (ĐÃ ĐẢM BẢO DOM TỒN TẠI) ***
    const soundBtn = document.querySelector(".sound-btn");
    const soundIcon = document.querySelector(".sound-img");
    const music = document.getElementById("bgMusic"); // Đã có sau khi chèn HTML

    let playing = false;
    
    // Thêm check null/undefined để đảm bảo element tồn tại
    if (soundBtn && soundIcon && music) {
        soundBtn.addEventListener("click", () => {
            if(!playing){
                music.play().catch(err => {
                    console.log("Nhạc chưa được phép play (có thể cần tương tác của người dùng):", err);
                });
                soundIcon.src = "../img/sound.svg"; 
                playing = true;
            } else {
                music.pause();
                soundIcon.src = "../img/mute.svg";
                playing = false;
            }
        });
    }
});