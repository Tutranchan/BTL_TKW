// data.js

import { auth } from "./conf.js";
import { 
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
 

// ========== REGISTER ==========
const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("user").value.trim();
        const pass1 = document.getElementById("password1").value;
        const pass2 = document.getElementById("password2").value;

        if (!email.includes("@")) {
            alert("Vui lòng nhập đúng định dạng email!");
            return;
        }

        if (pass1 !== pass2) {
            alert("Mật khẩu không trùng nhau!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, pass1)
            .then(() => {
                alert("Đăng ký thành công!");
                window.location.href = "login.html";
            })
            .catch(err => {
                alert("Lỗi tạo tài khoản: " + err.code);
                console.log(err);
            });
    });
}



// ========== LOGIN ==========
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("user").value;
        const password = document.getElementById("password1").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // LẤY THÔNG TIN USER TỪ FIREBASE
                const user = userCredential.user;
                
                //  LƯU VÀO SESSIONSTORAGE
                const userData = {
                    name: user.displayName || user.email.split('@')[0], // Lấy tên từ email nếu không có displayName
                    avatar: user.photoURL || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E",
                    email: user.email
                };
                
                sessionStorage.setItem("userData", JSON.stringify(userData));
                sessionStorage.setItem("isLoggedIn", "true");
                
                console.log("✅ Đã lưu userData:", userData);
                
                alert("Đăng nhập thành công!");
                window.location.href = "../main.html";
            })
            .catch(err => {
                alert("Sai email hoặc mật khẩu!");
                console.log(err);
            });
    });
}

//=========== Reset Password =========
const resetForm = document.getElementById("reset-form");

if (resetForm) {
    resetForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("user").value.trim();

        if (!email) {
            alert("Vui lòng nhập email!");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Đã gửi email đặt lại mật khẩu!");
                window.location.href = "Login.html";
            })
            .catch(err => {
                alert("Gửi email thất bại: " + err.message);
                console.log(err);
            });
    });
}

        

// ========== GOOGLE LOGIN ==========
const googleBtn = document.getElementById("googleBtn");

if (googleBtn) {
    const providerGoogle = new GoogleAuthProvider();

    googleBtn.addEventListener("click", () => {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                // ✅ LẤY THÔNG TIN USER TỪ GOOGLE
                const user = result.user;
                
                // ✅ LƯU VÀO SESSIONSTORAGE
                const userData = {
                    name: user.displayName || "Google User",
                    avatar: user.photoURL || "../img/user.jpg",
                    email: user.email
                };
                
                sessionStorage.setItem("userData", JSON.stringify(userData));
                sessionStorage.setItem("isLoggedIn", "true");
                
                console.log("✅ Google Login - Đã lưu userData:", userData);
                
                alert("Đăng nhập Google thành công!");
                window.location.href = "../main.html";
            })
            .catch((error) => {
                console.error(error);
                alert("Đăng nhập Google thất bại!");
            });
    });
}