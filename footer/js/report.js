// Import thêm các hàm xác thực (Auth)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- CẤU HÌNH ĐÃ ĐIỀN SẴN CỦA BẠN ---
const firebaseConfig = {
    apiKey: "AIzaSyAMDeuNc7wvxbuCiX1mcM6SFNckofh0d8g",
    authDomain: "wedsite-d28b6.firebaseapp.com",
    projectId: "wedsite-d28b6",
    storageBucket: "wedsite-d28b6.firebasestorage.app",
    messagingSenderId: "895688883914",
    appId: "1:895688883914:web:755cba4660ae7640923e33",
    measurementId: "G-TW862FJ7JK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Khởi tạo tính năng đăng nhập

// 1. Kiểm tra xem User đã đăng nhập chưa
onAuthStateChanged(auth, (user) => {
    const btnSubmit = document.querySelector('.btn-submit');
    
    if (user) {
        // Nếu đã đăng nhập -> Cho phép gửi
        console.log("Đã đăng nhập: " + user.email);
        btnSubmit.disabled = false;
        // btnSubmit.innerHTML = `<span>Gửi báo cáo (Hiệp sĩ: ${user.email || 'Ẩn danh'})</span>`;
    } else {
        // Nếu chưa đăng nhập -> Khóa nút gửi hoặc cảnh báo
        console.log("Chưa đăng nhập");
        // Tùy chọn: Bạn có thể ẩn form hoặc hiện thông báo bắt đăng nhập ở đây
        // Ví dụ đơn giản: Đổi nút thành "Vui lòng đăng nhập"
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `<span>⚠️ Vui lòng đăng nhập để gửi</span>`;
        btnSubmit.style.background = "#333";
    }
});

// 2. Xử lý khi bấm nút Gửi
document.getElementById('bugReportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = auth.currentUser;
    if (!user) {
        alert("Bạn cần đăng nhập để gửi báo cáo!");
        return;
    }

    const btn = document.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Đang gửi...';
    btn.disabled = true;

    try {
        const type = document.getElementById('bugType').value;
        const title = document.getElementById('bugTitle').value;
        const description = document.getElementById('bugDesc').value;

        // Gửi dữ liệu kèm thông tin người dùng (uid, email)
        await addDoc(collection(db, "bug_reports"), {
            uid: user.uid,           // <--- Lấy ID từ hệ thống Auth
            email: user.email,       // <--- Lấy Email người gửi
            type: type,
            title: title,
            description: description,
            status: "new",
            timestamp: serverTimestamp()
        });

        document.querySelector('.parchment-card').classList.add('hidden');
        document.getElementById('successMessage').classList.remove('hidden');

    } catch (error) {
        console.error("Lỗi: ", error);
        alert("Có lỗi xảy ra: " + error.message);
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});