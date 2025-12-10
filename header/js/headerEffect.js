// 1. LOGIC QUẢN LÝ TRẠNG THÁI
let userIsLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

function checkLoginStatus() {
    return userIsLoggedIn;
}

function setLoggedIn(status) {
    userIsLoggedIn = status;
    sessionStorage.setItem('isLoggedIn', status); 
    updateLoginDropdown(); 
}

// 2. HÀM ĐĂNG XUẤT 
function handleLogout(event) {
    event.preventDefault(); 
    
// XÓA HOÀN TOÀN DỮ LIỆU SESSIONSTORAGE
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('isLoggedIn');
    
//  Cập nhật biến local
    userIsLoggedIn = false;
    
    console.log("Người dùng đã đăng xuất!");
    
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/login/') || currentPath.includes('/user/')) {
        window.location.href = "../main.html";
    } else {
        window.location.href = "main.html";
    }
}

function updateLoginDropdown() {
    const isUserLoggedIn = checkLoginStatus(); 
    const loginLink = document.querySelector(".user-dropdown .login-link");
    const registerLink = document.querySelector(".user-dropdown .register-link");
    const profileLink = document.querySelector(".user-dropdown .profile-link");
    const logoutLink = document.querySelector(".user-dropdown .logout-link");

    const userInfoBox = document.querySelector(".user-dropdown .user-info");
    const avatarImg = document.querySelector(".user-dropdown .avatar");
    const userName = document.querySelector(".user-dropdown .user-name");

    if (isUserLoggedIn) {
        // --- HIỂN THỊ THÔNG TIN USER ---
        const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

        if (userInfoBox) userInfoBox.classList.remove("hidden-item");
        if (avatarImg) avatarImg.src = userData.avatar || "img/default-user.png";
        if (userName) userName.textContent = userData.name || "User";

        // Ẩn login/register, hiện profile/logout
        if (loginLink) loginLink.classList.add("hidden-item");
        if (registerLink) registerLink.classList.add("hidden-item");
        if (profileLink) profileLink.classList.remove("hidden-item");
        if (logoutLink) logoutLink.classList.remove("hidden-item");

    } else {
        // Ẩn box user info
        if (userInfoBox) userInfoBox.classList.add("hidden-item");

        // Hiện login/register
        if (loginLink) loginLink.classList.remove("hidden-item");
        if (registerLink) registerLink.classList.remove("hidden-item");

        // Ẩn profile/logout
        if (profileLink) profileLink.classList.add("hidden-item");
        if (logoutLink) logoutLink.classList.add("hidden-item");
    }
}

function initHeaderEffect() {
    // Dropdown menu (More)
    const moreBtn = document.querySelector(".more-btn");
    const moreWrapper = document.querySelector(".more");
    const dropdown = document.querySelector(".dropdown");

    if (moreBtn && moreWrapper && dropdown) {
        moreBtn.addEventListener("mouseenter", () => {
            dropdown.style.display = "block";
            moreBtn.classList.add("active");
        });

        moreWrapper.addEventListener("mouseleave", () => {
            dropdown.style.display = "none";
            moreBtn.classList.remove("active");
        });
    }

    // Logo animation
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.classList.add("start-big");
        setTimeout(() => logo.classList.remove("start-big"), 800);
    }
    
    // Social Links Dropdown
    const socialLinksWrapper = document.querySelector(".social-links");
    const linkBtn = document.querySelector(".link-btn");
    const linkDropdown = document.querySelector(".link-dropdown");

    if (linkBtn && socialLinksWrapper && linkDropdown) {
        linkBtn.addEventListener("mouseenter", () => {
            linkDropdown.style.display = "flex"; 
            linkBtn.classList.add("active");
        });

        socialLinksWrapper.addEventListener("mouseleave", () => {
            linkDropdown.style.display = "none";
            linkBtn.classList.remove("active");
        });
    }

    // --- LOGIC USER STATUS DROP DOWN ---
    const userContainer = document.querySelector(".user-status-container");
    const loginBtn = document.querySelector(".login-btn");
    const userDropdown = document.querySelector(".user-dropdown");
    const logoutLink = document.querySelector(".user-dropdown .logout-link");

    if (loginBtn && userContainer && userDropdown) {
        //  GỌI NGAY KHI INIT ĐỂ CẬP NHẬT UI
        updateLoginDropdown(); 
        
        if (logoutLink) {
            logoutLink.addEventListener("click", handleLogout);
        }

        userContainer.addEventListener("mouseenter", () => {
            userDropdown.style.display = "flex";
            loginBtn.classList.add("active");
        });

        userContainer.addEventListener("mouseleave", () => {
            userDropdown.style.display = "none";
            loginBtn.classList.remove("active");
        });
    }
}

//  EXPORT RA WINDOW ĐỂ loadHeader.js GỌI
window.initHeaderEffect = initHeaderEffect;
window.setLoggedIn = setLoggedIn;

