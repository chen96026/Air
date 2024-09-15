$(() => {
    // 複數上傳 & 產生預覽圖
    const selectedFiles = [];   // 暫存已上傳檔案
    const uploadImg = $('.forum_uploadImg');    // 所有 html 新文字、圖片寫入的對象
    
    // 更新已上傳圖片的預覽圖
    async function updatePreview() {
        uploadImg.empty().hide();  // / 清除前一次更新產生的預覽圖, 防止調整 CSS 前的圖片顯示在畫面上

        // 透過 async / await 讓圖片依上傳順序讀取並產生預覽圖，避免實際顯示的排序混亂
        function readURL(file) {
            return new Promise((resolve, reject) => {
                const imgReader = new FileReader();
                
                imgReader.onload = (e) => resolve(e.target.result); // 當圖片資訊讀取成功
                imgReader.onerror = (e) => reject(e);
                
                imgReader.readAsDataURL(file);
            })
        }
        
        // 把預覽圖寫入 html
        const moreImg = $(`<div>`, {class: 'forum_moreImg'});
        
        if(selectedFiles.length > 0) {
            
            for (let i = 0; i < selectedFiles.length; i++) {
                const preview = $(`<div>`);
                const closeIcon = $(`<span>`, {class: 'forum_deleteImg', 'data-index': i}); 
                const previewImg =  $(`<img>`);
                
                const file = selectedFiles[i]
                try {
                    const result = await readURL(file); 
                    previewImg.attr('src', result)
                    
                    if (i === 0) {
                        // 第一張預覽圖(左邊大區塊)
                        preview.addClass('forum_cover');
                        previewImg.addClass('forum_coverImg')
                        uploadImg.append((preview.append(closeIcon).append(previewImg)));
                    } else {
                        // 其他預覽圖(右邊小區塊)
                        preview.addClass('forum_preview');
                        previewImg.addClass('forum_previewImg');
                        moreImg.append((preview.append(closeIcon).append(previewImg)));
                    }
                } catch (error) {
                    console.log('讀取失敗:', i);
                }
            }
            if (selectedFiles.length > 1) uploadImg.append(moreImg);
            
        } else uploadImg.append($(`<div>`, {class: 'forum_noImg'}));

            
        // 更新文字顯示目前上傳圖片數量
        let count = selectedFiles.length > 0 
            ? `目前已上傳 ${selectedFiles.length} 張相片` 
            : `目前未選取相片`;

            uploadImg.append(`
            <div class="forum_chooseImg">
                <p>${count}</p>
                <label for="forum_chooseImg_id">
                    <img src="./img/icon/add_newImg.svg" alt="chooseImg">
                    <span>上傳相片…</span>
                    <input type="file" name="" id="forum_chooseImg_id" accept="image/*" multiple>
                </label>
            </div>
        `);

        // 調整 CSS
        if (selectedFiles.length > 4) {
            $('.forum_preview').css('width', `${100 / (selectedFiles.length - 1)}%`);
        }
        
        uploadImg.show();  // 顯示調整完 CSS 的預覽圖
    }


    // 選取上傳圖片用的 input 並讀取新上傳的圖片資料
    uploadImg.on('change', '#forum_chooseImg_id', (e) => {
        selectedFiles.push(...e.target.files);
        e.target.value = "";
        
        updatePreview();
    });


    // 刪除(取消上傳)點擊的圖片
    uploadImg.on('click','.forum_deleteImg', function() {
        let index = $(this).data('index');
        selectedFiles.splice(index, 1);

        updatePreview();
    })

})