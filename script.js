document.addEventListener("DOMContentLoaded", function() {

    // Toggle mật khẩu
    function togglePassword(inputId, iconId) {
        const input = document.getElementById(inputId);
        const icon = document.getElementById(iconId);
        if (!input || !icon) return;

        icon.addEventListener("click", () => {
            if (input.type === "password") {
                input.type = "text";
                icon.src = "https://cdn-icons-png.flaticon.com/512/565/565655.png";
            } else {
                input.type = "password";
                icon.src = "https://cdn-icons-png.flaticon.com/512/159/159604.png";
            }
        });
    }

    togglePassword("password1", "eye1");
    togglePassword("password2", "eye2"); // chỉ Register có
})
//======== thay màu ==============
function activeButton(inputIds, btnSelector) {
    const btn = document.querySelector(btnSelector);
    if (!btn) return;

    function check() {
        const allFilled = inputIds.every(id => {
            const el = document.getElementById(id);
            return el && el.value.trim() !== "";
        });

        btn.classList.toggle("active", allFilled);
    }

    inputIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", check);
    });

    check(); // Kiểm tra khi load trang
}

if (document.getElementById("login-btn")) {
    activeButton(["user", "password1"], "#login-btn");
}

if (document.getElementById("register-btn")) {
    activeButton(["user", "password1", "password2"], "#register-btn");
}
 
