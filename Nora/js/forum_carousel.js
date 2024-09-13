$(() => {
    // 輪播
    let slideIndex = 1;
    showSlides(slideIndex);

    function showSlides(n) {
        let slides = $(".forum_photoImg");
        let forum_smallPhotos = $(".forum_smallPhoto");

        // 確保索引在合理範圍內
        if (n > slides.length) { slideIndex = 1; }    
        if (n < 1) { slideIndex = slides.length; }

        // 隱藏所有幻燈片
        slides.hide();  

        // 移除所有點的活躍狀態
        forum_smallPhotos.removeClass("forum_smallPhoto_active");

        // 顯示當前幻燈片
        slides.eq(slideIndex - 1).show();  
        
        // 設置當前點為活躍狀態
        forum_smallPhotos.eq(slideIndex - 1).addClass("forum_smallPhoto_active");
    }

    // 每隔 ~ 秒自動切換
    setInterval(() => { showSlides(slideIndex += 1); }, 5000);

    // 設置按鈕事件
    $("#forum_lastImg").on('click', function() {
        showSlides(slideIndex -= 1);
    });

    $("#forum_nextImg").on('click', function() {
        showSlides(slideIndex += 1)
    });
    
    $(".forum_smallPhoto").on('click', function() {
        let index = $(this).index() + 1;
        showSlides(slideIndex = index);
    });

    
    // 依圖片數量更變小圖示寬
    if ($(".forum_smallPhoto").length > 1) {
        $('.forum_smallPhoto').css({
            'width':  `${100 / $(".forum_smallPhoto").length}%`
        })
    }
});