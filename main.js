// 🌟 等待網頁元素都載入完成 (DOM)
document.addEventListener("DOMContentLoaded", function () {

    // ===================================
    // 1. 滑鼠殘影 (Cursor Trail) 
    // ===================================
    // 監聽「整個文件」的滑鼠移動
    document.addEventListener("mousemove", function (e) {
        // 建立一個殘影元素
        const trail = document.createElement("div");
        trail.classList.add("cursor-trail");

        // 🌟 關鍵修正：確保 document.body 已經存在才附加
        if (document.body) {
            document.body.appendChild(trail);
        }

        // 設定位置（跟隨滑鼠座標）
        trail.style.left = `${e.pageX}px`;
        trail.style.top = `${e.pageY}px`;

        // 動畫結束後移除元素，避免太多節點造成 lag
        setTimeout(() => {
            trail.remove();
        }, 500);
    });


    // ===================================
    // 2. 圖片切換 (Image Switcher)
    // ===================================

    // 找到右側的圖片
    const mainImage = document.getElementById('main-image');

    // 找到左側所有的導覽連結
    const navLinks = document.querySelectorAll('.sidebar .nav-link');

    // 確保 mainImage 和 navLinks 都存在 (避免錯誤)
    if (mainImage && navLinks.length > 0) {

        // 為每一個連結都加上「點擊監聽」
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault(); // 阻止連結點擊後跳轉

                // 獲取點擊連結上的 data-image 內容
                const newImageSrc = this.dataset.image;
                const currentActive = document.querySelector('.sidebar .nav-link.active');

                // 檢查：如果連結有 data-image 屬性，並且點的不是當前已啟用的連結
                if (newImageSrc && this !== currentActive) {

                    // --- 處理 Active 狀態 ---
                    if (currentActive) {
                        currentActive.classList.remove('active');
                    }
                    this.classList.add('active');

                    // --- 處理圖片漸變 ---
                    mainImage.style.opacity = 0;
                    setTimeout(() => {
                        mainImage.src = newImageSrc;
                        mainImage.style.opacity = 1;
                    }, 300);
                    // 1. 取得新內容區塊的 ID (例如 "#content-home")
                    const newContentSelector = this.dataset.content;

                    // 2. 找到目前顯示的區塊 (它有 .active-content)
                    const currentContent = document.querySelector('.text-section.active-content');

                    // 3. 找到即將要顯示的新區塊
                    const newContent = document.querySelector(newContentSelector);

                    // 4. 切換
                    if (newContent && newContent !== currentContent) {
                        // 移除舊的 active
                        if (currentContent) {
                            currentContent.classList.remove('active-content');
                        }
                        // 加入新的 active
                        newContent.classList.add('active-content');
                    }
                }
            });
        });
    }
    const soundButton = document.getElementById('btn-sound-toggle');
    let isMuted = true; // 狀態：true = 關閉, false = 開啟

    if (soundButton) {
        soundButton.addEventListener('click', function () {
            // 切換狀態
            isMuted = !isMuted;

            const icon = document.getElementById('sound-icon');
            const textNode = icon.nextSibling; // 抓取圖示旁邊的文字 (" 聲音：關閉")

            if (isMuted) {
                // 更新為「關閉」狀態
                icon.className = 'bi bi-volume-mute';
                textNode.textContent = ' 聲音：關閉';
            } else {
                // 更新為「開啟」狀態
                icon.className = 'bi bi-volume-up-fill'; // 'bi-volume-up-fill' 圖示比較明顯
                textNode.textContent = ' 聲音：開啟';
            }
        });
    }

}); // 🌟 DOMContentLoaded 監聽器的結束大括號