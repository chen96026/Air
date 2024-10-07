$(() => {
    let id;
    let page = 0;

    function getPosts(page) {
        $('.Forum_divTable').empty();
        $('.Forum_divTable').append(`
            <table class="Forum_table">
                <thead>
                    <tr class="Forum_thead_tr">
                        <th>編號</th>
                        <th>主標題</th>
                        <th class="Forum_table_content">內文</th>
                        <th class="Forum_table_reportCount">檢舉數</th>
                        <th class="Forum_table_keep">保留</th>
                        <th>刪除</th>
                    </tr>
                </thead>
            </table>`)

        fetch(`/forum/api/adminGetReportedPosts?page=${page}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const tbody = $(`<tbody>`)
                if (data.postViewDTOList.length > 0) {
                    data.postViewDTOList.forEach(post => {
                        const reportedPost =
                            `<tr class="Forum_tbody_tr">
                                <td class="Forum_table_id">${post.post.id}</td>
                                <td class="Forum_table_title"><span>${post.post.mainTitle}</span></td>
                                <td class="Forum_table_content">
                                    <span>
                                        ${post.post.content}
                                    </span>
                                </td>
                                <td class="Forum_table_reportCount">${post.countReports}</td>
                                <td class="Forum_table_keep">
                                    <button class="Forum_btn Forum_keep"></button>
                                </td>
                                <td class="Forum_table_delete">
                                    <button class="Forum_btn Forum_delete"></button>
                                </td>
                            </tr>`
                        tbody.append(reportedPost);
                    })

                    $('.Forum_table').append(tbody);
                    
                    $('.Forum_page').empty();
                    for (let i = 1; i <= data.totalPage; i++) {
                        $('.Forum_page').append(`<button class="Forum_pageBtn">${i}</button>`)
                    }

                    $('.Forum_pageBtn').eq(page).addClass('Forum_thisPage');

                    if (data.postViewDTOList.length == 1 && page != 0) {
                        page -= 1;
                    }

                } else {
                    $('.Forum_divTable').append(`
                        <p class="Forum_noReports">
                            <span>目前沒有待處理的文章</span><br>
                            <span>檢舉數 ≥ 5 的文章會暫時被下架並顯示在此</span>
                        </p>
                    `)
                }
            })
            .catch(error => {
                console.error('Error loading posts:', error);
            })
    }

    function getPostDetail(id) {
        fetch(`/forum/api/adminGetReportedPostDetail?id=${id}`)
            .then(response => response.json())
            .then(data => {
				let images = `<div>`;
				console.log(images);
                data.imageURL.forEach(imgURL => {
                    const setImg = `<img src="${imgURL}" class="Forum_detail_img">`;
					console.log(setImg);
                    images += setImg;
                })
				images += `</div>`;
                const share = (data.post.share) ? "是" : "否"
                const post =
                    `<div class="Forum_bg"></div> 
                    <div class="Forum_post">
                        <div class="Forum_post_detail">
                            <div id="Forum_closePost" class="Forum_closeDetail"></div>
                            <div class="Forum_detail_systemInformation">
                                <p>文章編號：${data.post.id}</p>
                                <p>檢舉數：${data.countReports}</p>
                                <p>投稿日期：${data.createdDate}</p>
                                <p>作者：${data.userNameIconDTO.username}</p>
                            </div>
                            <p class="Forum_detail_rateAndShare"><span>評分：${data.post.rate}</span><span>分享首頁：${share}</span></p>
                            <p>主標題：${data.post.mainTitle}</p>
                            <p>副標題：${data.post.subTitle}</p>
                            <p>出發日：${data.post.startDate}</p>
                            <p>回程日：${data.post.endDate}</p>
                            <p>Tags：${data.post.tags}</p>
                            <div class="Forum_detail_content">
                                <p>內文：</p>
                                <p>${data.post.content}</p>
                            </div>
                            <p>附圖：</p>
                            <div>
                                ${images}
                            </div>
                        </div>
                        <div class="Forum_post_btns">
                            <button id="Forum_post_keep" class="Forum_post_btn">保留</button>
                            <button id="Forum_post_delete" class="Forum_post_btn">刪除</button>
                        </div>
                    </div>`
                $('main').append(post);
				$('.Forum_bg').fadeIn(100);
            })
            .catch(error => {
                console.error('Error loading postDetail:', error);
            })
    }

    function keepPost(id) {
        fetch(`/forum/api/adminClearReports?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Success: ', response);
					getPosts(page);
					removeWidows();
                } else {
                    console.error('Failed to delete the reports');
                }
            })
            .catch(error => {
                console.error('err', error);
            })

    }

    function deletePost(id) {
        fetch('/forum/api/deletePost', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
		})
            .then(response => {
            	if (response.ok) {
                	console.log('Success: ', response);
					getPosts(page);
					removeWidows();
            	} else {
                    console.error('Failed to delete the post');
                }
            })
            .catch(error => {
                console.error('err', error);
            })
    }

    function removeWidows() {
        $('.forum_detail_checkwindow').remove();
        $('.Forum_post').remove();
        $('.Forum_bg').fadeOut(100)
        $('.Forum_bg').remove();
    }


    getPosts(page);


    $('main').on('click', '.Forum_tbody_tr', function() {
        id = $(this).find('.Forum_table_id').text();

        getPostDetail(id);
    })

    $('main').on('click', '.Forum_keep', function(e) {
        const tr = $(this).closest('.Forum_tbody_tr');
        id = tr.find('.Forum_table_id').text();

        e.stopPropagation();
        $('main').append(`
            <div class="Forum_bg"></div> 
            <div class="forum_detail_checkwindow">
                <p>確定要保留這篇文章嗎？</p>
                <button id="Forum_keepPost" class="forum_checkwindow_OK">確定</button>
                <button id="Forum_closeWindow" class="forum_checkwindow_cancel">取消</button>
            </div>
        `)
        $('.Forum_bg').fadeIn(100);
    })

    $('main').on('click', '.Forum_delete', (e) => {
        e.stopPropagation();
        $('main').append(`
            <div class="Forum_bg"></div> 
            <div class="forum_detail_checkwindow">
                <p>確定要刪除這篇文章嗎？</p>
                <button id="Forum_deletePost" class="forum_checkwindow_OK">確定</button>
                <button id="Forum_closeWindow" class="forum_checkwindow_cancel">取消</button>
            </div>
        `)
        $('.Forum_bg').fadeIn(100);
    })

    $('main').on('click', '#Forum_post_keep', () => {
        $('.Forum_bg').addClass('Forum_bg_zIndex2');
        $('main').append(`
            <div class="forum_detail_checkwindow">
                <p>確定要保留這篇文章嗎？</p>
                <button id="Forum_keepPost" class="forum_checkwindow_OK">確定</button>
                <button id="Forum_post_closeWindow" class="forum_checkwindow_cancel">取消</button>
            </div>
        `)
    })

    $('main').on('click', '#Forum_post_delete', () => {
        $('.Forum_bg').addClass('Forum_bg_zIndex2');
        $('main').append(`
            <div class="forum_detail_checkwindow">
                <p>確定要刪除這篇文章嗎？</p>
                <button id="Forum_deletePost" class="forum_checkwindow_OK">確定</button>
                <button id="Forum_post_closeWindow" class="forum_checkwindow_cancel">取消</button>
            </div>
        `)
    })

    $('main').on('click', '#Forum_keepPost', () => {
        keepPost(id);
    })
    
    $('main').on('click', '#Forum_deletePost', () => {
        deletePost(id);
    })

    $('main').on('click', '#Forum_closeWindow, .forum_bg', () => {
        $('.forum_detail_checkwindow').remove();
        $('.Forum_bg').fadeOut(100)
        $('.Forum_bg').remove();
    })

    $('main').on('click', '#Forum_closePost, .forum_bg', () => {
        $('.Forum_post').remove();
        $('.Forum_bg').fadeOut(100)
        $('.Forum_bg').remove();
    })

    $('main').on('click', '#Forum_post_closeWindow, .forum_bg', () => {
        $('.forum_detail_checkwindow').remove();
        $('.Forum_bg').removeClass('Forum_bg_zIndex2');
    })

    $('main').on('click', '.Forum_pageBtn', function () {
        $('.Forum_pageBtn').removeClass('Forum_thisPage');
        $(this).addClass('Forum_thisPage');

        page= $(this).index();
        getPosts(page);
    })
	
	$('main').on('click', '.Forum_detail_img', function (e) {
		e.stopPropagation();
		$(this).toggleClass('Froum_Img');

	})
    
})