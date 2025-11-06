// 監聽滑鼠移動事件
document.addEventListener("mousemove", function (e) {
    // 建立一個殘影元素
    const trail = document.createElement("div");
    trail.classList.add("cursor-trail");
    document.body.appendChild(trail);

    // 設定位置（跟隨滑鼠座標）
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;

    // 動畫結束後移除元素，避免太多節點造成 lag
    setTimeout(() => {
        trail.remove();
    }, 800);
});

// 1. 等待網頁元素都載入完成
document.addEventListener("DOMContentLoaded", function () {

    // 2. 找到右側的圖片
    const mainImage = document.getElementById('main-image');
    
    // 3. 找到左側所有的導覽連結
    const navLinks = document.querySelectorAll('.sidebar .nav-link');

    // 4. 為每一個連結都加上「點擊監聽」
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // 阻止連結點擊後跳轉 (因為 href="#" 會讓頁面跳到頂部)

            // 獲取點擊連結上的 data-image 內容
            const newImageSrc = this.dataset.image;
            const currentActive = document.querySelector('.sidebar .nav-link.active');

            // 檢查：如果連結有 data-image 屬性，並且點的不是當前已啟用的連結
            if (newImageSrc && this !== currentActive) {

                // --- 處理 Active 狀態 ---
                // 移除舊的 active
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                // 在點擊的連結上加入 active
                this.classList.add('active');

                // --- 處理圖片漸變 ---
                // 1. 先讓圖片淡出 (變透明)
                mainImage.style.opacity = 0;

                // 2. 稍等 300 毫秒 (等淡出動畫播完)
                setTimeout(() => {
                    // 3. 在圖片透明時，更換圖片來源
                    mainImage.src = newImageSrc;
                    // 4. 再讓圖片淡入 (恢復不透明)
                    mainImage.style.opacity = 1;
                }, 300); // 這個 300 毫秒必須對應 a.css 裡的 transition 時間
            }
        });
    });
});