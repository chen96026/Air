$(() => {
    // 複數上傳 & 產生預覽圖
    const selectedFiles = [];   // 暫存已上傳檔案
	const imageDB = [];	// 記錄圖片原先在資料庫中的id
	const deleteImg = [];	// 記錄要從資料庫中刪除的圖片id
    const uploadImg = $('#forum_uploadImg');    // 所有 html 新文字、圖片寫入的對象
	const urlParams = new URLSearchParams(window.location.search);
	const postId = urlParams.get('id');
    let check = false;	// 檢查所有必填欄位皆不為空
	let fetchURL;
	let fetchMethod;
	let fetchMessge;
	let fetchFailMessge = `
		<div class="forum_edit_failwindow">
			<p>
				${fetchMessge}失敗<br>
				請重新送出或檢查是否有遺漏必填項目
			</p>
			<button id="forum_closeWindow">繼續</button>
		</div>`	;
	let toURL;
	
	// 檢查是否為編輯舊文章，若為「是」則將資料庫中的圖片放入暫存陣列
	if (typeof isEdit !== 'undefined') {
		fetchURL = `/forum/api/editPost?id=${postId}`;
		fetchMethod = 'PUT';
		fetchMessge = `編輯`;
		toURL = `/forum_detail/${postId}`
			
		fetch(`/forum/api/getImg?id=${postId}`)
			.then(response => response.json())
			.then(data => {
				console.log(data); 
				if (data.length > 0) {
					data.forEach(img => {
						console.log(typeof img.base64URL);
						const fileName = img.postId + '_' + img.imageId;
						
						// 分割從後端取得的 Base64 字串，提取純數據部分
						const base64Data = img.base64URL.split(',')[1];

						// 將 Base64 字串轉換為二進制陣列
						const byteCharacters = atob(base64Data);
						const byteNumbers = new Uint8Array(byteCharacters.length);
							    
						for (let i = 0; i < byteCharacters.length; i++) {
							byteNumbers[i] = byteCharacters.charCodeAt(i);
						}
		        		const blob = new Blob([byteNumbers], { type: `${img.mimeType}` });
						const file = new File([blob], fileName, { type: `${img.mimeType}` });
							
						// 將轉換完的圖片放回暫存陣列
						selectedFiles.push(file);
						imageDB.push(img.imageId);
					})
					updatePreview();
					console.log("imgDB:" + imageDB);
				}
			})
			.catch(error => {
				console.error('Error loading posts:', error);
			});
				
	} else {
		fetchURL = '/forum/api/editPost';
		fetchMethod = 'POST';
		fetchMessge = `上傳`;
		toURL = '/forum';
	}
	

    // 更新已上傳圖片的預覽圖
    async function updatePreview() {
        uploadImg.empty().hide();  // 清除前一次更新產生的預覽圖, 防止調整 CSS 前的圖片顯示在畫面上

        // 透過 async / await 讓圖片依上傳順序讀取並產生預覽圖，避免實際顯示的排序混亂
        function readURL(file) {
            return new Promise((resolve, reject) => {
                const imgReader = new FileReader();

                imgReader.onload = (e) => resolve(e.target.result); // 當圖片資訊成功讀取完成時回傳
                imgReader.onerror = (e) => reject(e);

                imgReader.readAsDataURL(file);
            })
        }

        // 把預覽圖寫入 html
        const moreImg = $(`<div>`, { class: 'forum_moreImg' });
        // 圖片區
        if (selectedFiles.length > 0) {

            for (let i = 0; i < selectedFiles.length; i++) {
                const preview = $(`<div>`);
                const closeIcon = $(`<span>`, { class: 'forum_deleteImg', 'data-index': i }); // 在 .forum_deleteImg 設置 CSS 讓游標滑過圖片時顯示 "X" 提示可取消上傳
                const previewImg = $(`<img>`);

                const file = selectedFiles[i]
                try {
                    const result = await readURL(file); // selectedFiles[i] 的資料讀取完成才繼續往下執行
                    previewImg.attr('src', result);

                    if (i === 0) {
                        // 加入第一張預覽圖(左邊大區塊)
                        preview.addClass('forum_cover');
                        previewImg.addClass('forum_coverImg');
                        uploadImg.append((preview.append(closeIcon).append(previewImg)));
                    } else {
                        // 加入其他預覽圖(右邊小區塊)
                        preview.addClass('forum_preview');
                        previewImg.addClass('forum_previewImg');
                        moreImg.append((preview.append(closeIcon).append(previewImg)));
                    }
                } catch (error) {
                    console.log('讀取失敗:', i);
                }
            }
            if (selectedFiles.length > 1) uploadImg.append(moreImg);

        } else uploadImg.append($(`<div>`, { class: 'forum_noImg' }));    // 目前無上傳檔案


        // 更新文字顯示目前上傳圖片數量
        let count = selectedFiles.length > 0
            ? `目前已上傳 ${selectedFiles.length} 張相片`
            : `至少上傳一張相片，目前未選取相片`;

        uploadImg.append(`
        	<div class="forum_chooseImg">
            	<p>${count}</p>
                <label for="forum_chooseImg_id" id="forum_chooseImg_label">
	                <img src="/assets/forum/add_newImg.svg" alt="chooseImg">
	                <span>上傳相片…</span>
	                <input type="file" name="" id="forum_chooseImg_id" accept="image/*" multiple>
                </label>
            </div>
        `);

        // 調整 CSS 
        // 其他預覽圖的寬
        if (selectedFiles.length > 4) {
            $('.forum_preview').css('width', `${100 / (selectedFiles.length - 1)}%`);
        }
        // 上傳驗證
        checkValue('#forum_chooseImg_label', selectedFiles.length == 0);

        uploadImg.show();  // 顯示調整完 CSS 的預覽圖
    }


    // 讀取新上傳的圖片資料
    uploadImg.on('change', '#forum_chooseImg_id', function (e) {
        selectedFiles.push(...e.target.files);
        e.target.value = "";    // 清空 input 讓同張圖片能重複上傳

        updatePreview();
    });


    // 刪除(取消上傳)被點擊的圖片
    uploadImg.on('click', '.forum_deleteImg', function () {
        let index = $(this).data('index');
		
        selectedFiles.splice(index, 1);
		
		if(index < imageDB.length) {
			deleteImg.push(imageDB[index]);
			imageDB.splice(index, 1);
		}

		console.log("selectedFiles:" + selectedFiles);
		console.log("imageDB:" + imageDB);
		console.log("deleteImg:" + deleteImg);
		
        updatePreview();
    })
	

    // 輸入/上傳必填
    // 符合條件(沒填值)的元素加上紅框
    function checkValue(selector, condition) {
        if (condition) {
            $(selector).addClass('forum_edit_emptyInput');
            check = false;
        } else {
            $(selector).removeClass('forum_edit_emptyInput');
        }
    }

    // 失焦時驗證
	// 選擇國家
    $('#forum_select_country').blur(function () {
        checkValue(this, this.value === `全世界`);
    })

	// 選擇城市
    $('#forum_select_city').blur(function () {
        checkValue(this, this.value === `所有城市`);
    })

	// 主標題
    $('#forum_edit_title1').blur(function () {
        checkValue(this, !this.checkValidity());
    })

	// 星級評分
    $('.forum_e_star').change(function () {
        checkValue('#forum_stars', !this.checkValidity());
    })

	// 內文
    $('#forum_edit_textarea').blur(function () {
        checkValue('.forum_e_textarea', !this.checkValidity());
    })

	// 圖片
    $('#forum_chooseImg_id').click(function () {
        checkValue('#forum_chooseImg_label', selectedFiles.length == 0);
    })

    $('#submit').click(() => {
        check = true;
        checkValue('#forum_select_country', $('#forum_select_country').value === `all`);
        checkValue('#forum_select_city', $('#forum_select_city').val() === `所有城市`);
        checkValue('#forum_edit_title1', !$('#forum_edit_title1')[0].checkValidity());
        checkValue('#forum_stars', !$('.forum_e_star').first()[0].checkValidity());
        checkValue('.forum_e_textarea', !$('#forum_edit_textarea')[0].checkValidity());
        checkValue('#forum_chooseImg_label', selectedFiles.length == 0);
    })


    // 將表單傳送給後端
    $('#forum_form').on('submit', function (e) {
        e.preventDefault(); // 阻止表單送出

        if(check) {
            const data = new FormData(this);

			selectedFiles.splice(0, imageDB.length);	// 從暫存陣列中去除原先已在資料庫中的圖片
            // 將目前讀到的所有新照片也加入表單中
			if(selectedFiles.length > 0) {
				selectedFiles.forEach((file) => {
				    data.append('images', file);
				})
			}

            data.forEach((value, key) => {
                console.log(key, value);
            });

            fetch(fetchURL, {
                method: fetchMethod,
                body: data
            })
            .then(data => {
            	console.log('Success: ', data)
				$('main').append(`
					<div class="forum_edit_OKwindow">
					<p>
						${fetchMessge}成功<br>
						畫面將自動跳轉回文章頁
					</p>
					<div class="spinner-box">
						<div class="three-quarter-spinner"></div>
					</div>
					</div>
				`);
				
				if(deleteImg.length > 0) {
					fetch(`/forum/api/deleteImg?id=${postId}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(deleteImg)
					})
					.then(response => {
						if (response.ok) {
							console.log('Success: ', response);
														
						} else {
							console.error('Failed to delete the images');
						}
					})
					.catch(error => {
						console.error('err', error);
					})
				}
				
				setTimeout(() => {
					window.location.href = toURL;						
				}, 1000);
				
            })
            .catch(error => {
            	console.error('err', error);
				$('main').append(fetchFailMessge);
        	})
			
        } else {
			console.log("fail")
			$('main').append(fetchFailMessge);
		}

    })
	
	// 關閉送出失敗的提示div
	$(document).on('click', '#forum_closeWindow',() => {
	        console.log("Close");
	        $('.forum_edit_failwindow').remove();
	})
	

})