// ================== 8 ẢNH SLIDER ==================
const sliderImages = [
    "https://via.placeholder.com/350x180?text=Event+1",
    "https://via.placeholder.com/350x180?text=Event+2",
    "https://via.placeholder.com/350x180?text=Event+3",
    "https://via.placeholder.com/350x180?text=Event+4",
    "https://via.placeholder.com/350x180?text=Event+5",
    "https://via.placeholder.com/350x180?text=Event+6",
    "https://via.placeholder.com/350x180?text=Event+7",
    "https://via.placeholder.com/350x180?text=Event+8"
];

const sliderWrapper = document.getElementById("sliderWrapper");
const sliderDots = document.getElementById("sliderDots");

let sliderPage = 0;
const perSlide = 3;
const totalSliderPages = Math.ceil(sliderImages.length / perSlide);

// tạo ảnh
function renderSlider() {
    sliderWrapper.innerHTML = "";

    const start = sliderPage * perSlide;
    const viewImages = sliderImages.slice(start, start + perSlide);

    viewImages.forEach(img => {
        sliderWrapper.innerHTML += `
            <div class="slide-item">
                <img src="${img}">
            </div>
        `;
    });

    renderSliderDots();
}

// tạo dấu chấm
function renderSliderDots() {
    sliderDots.innerHTML = "";

    for (let i = 0; i < totalSliderPages; i++) {
        const dot = document.createElement("span");
        dot.className = "slider-dot" + (i === sliderPage ? " active" : "");
        dot.onclick = () => {
            sliderPage = i;
            renderSlider();
        };
        sliderDots.appendChild(dot);
    }
}

// auto slide
setInterval(() => {
    sliderPage = (sliderPage + 1) % totalSliderPages;
    renderSlider();
}, 3500);

renderSlider();

// ================== DỮ LIỆU TIN ==================
const data = [
    { id: 1, title: "Sự kiện Hollow Zero mở cửa", type: "event", date: "2025-11-28", img: "https://via.placeholder.com/400x200?text=Hollow+Zero" },
    { id: 2, title: "Event Proxy 2025", type: "event", date: "2025-11-20", img: "https://via.placeholder.com/400x200?text=Proxy" },
    { id: 3, title: "Thợ Săn Hollow trở lại", type: "event", date: "2025-10-15", img: "https://via.placeholder.com/400x200?text=Hunter" },

    { id: 4, title: "Banner Agent mới", type: "news", date: "2025-11-01", img: "https://via.placeholder.com/400x200?text=Agent" },
    { id: 5, title: "Trailer nhân vật mới", type: "news", date: "2025-10-20", img: "https://via.placeholder.com/400x200?text=New+Char" },

    { id: 6, title: "Bảo trì hệ thống", type: "notice", date: "2025-11-05", img: "https://via.placeholder.com/400x200?text=Fix" },
    { id: 7, title: "Khắc phục lỗi server", type: "notice", date: "2025-10-22", img: "https://via.placeholder.com/400x200?text=Server" },

    { id: 8, title: "Update 2.3", type: "update", date: "2025-11-23", img: "https://via.placeholder.com/400x200?text=Update" }
];

let currentTab = "latest";
let currentPage = 1;

// TABS
document.querySelectorAll(".tab").forEach(tab => {
    tab.onclick = () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        currentTab = tab.dataset.tab;
        currentPage = 1;
        applyFilter();
    };
});

// LIST
function renderNews(list) {
    const box = document.getElementById("newsList");

    box.innerHTML = list.length
        ? list.map(item => `
            <div class="news-card" onclick="openDetail(${item.id})">
                <img src="${item.img}">
                <div>
                    <h3>${item.title}</h3>
                    <div>${item.date}</div>
                </div>
            </div>
        `).join("")
        : "<p>Không có dữ liệu.</p>";
}

// PAGINATION
function renderPagination(totalPages) {
    const dotBox = document.querySelector(".page-dots");
    const leftBtn = document.querySelector(".page-btn.left");
    const rightBtn = document.querySelector(".page-btn.right");

    dotBox.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const dot = document.createElement("span");
        dot.className = "dot" + (i === currentPage ? " active" : "");
        dot.textContent = i;

        dot.onclick = () => {
            currentPage = i;
            applyFilter();
        };

        dotBox.appendChild(dot);
    }

    leftBtn.onclick = () => {
        if (currentPage > 1) currentPage--;
        applyFilter();
    };

    rightBtn.onclick = () => {
        if (currentPage < totalPages) currentPage++;
        applyFilter();
    };
}

// FILTER
function applyFilter() {
    let filtered = currentTab === "latest" ? [...data] : data.filter(d => d.type === currentTab);

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    const perPage = 3;
    const totalPages = Math.ceil(filtered.length / perPage);

    const start = (currentPage - 1) * perPage;
    const paginated = filtered.slice(start, start + perPage);

    renderNews(paginated);
    renderPagination(totalPages);
}

applyFilter();

function openDetail(id) {
    window.location.href = "detail.html?id=" + id;
}
