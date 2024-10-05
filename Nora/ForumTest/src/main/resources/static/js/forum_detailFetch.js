$(() => {
	const url = window.location.pathname;
	const urlparts = url.split('/');
	const postId = urlparts[urlparts.length - 1];
	console.log(typeof (like));

	// 按讚
	//判斷是否為登入狀態
	if (typeof like !== 'undefined') {
		$('#forum_detail_like').click(() => {
			console.log(postId);
			// 判斷是否已點過讚
			if (!like) {
				fetch('/forum/api/like', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(postId)
				})
					.then(response => {
						console.log(response);
						if (response.ok) {
							console.log('Success: ', response);
							like = true;

							$('#forum_detail_like').addClass('forum_d_like_checked')
							$('#forum_detail_like').removeClass('forum_d_like_unchecked')

							return response.json();

						} else {
							console.error('Failed to like the post');
						}
					})
					.catch(error => {
						console.error('err', error);
					})

			} else {
				fetch('/forum/api/like', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(postId)
				})
					.then(response => {
						if (response.ok) {
							console.log('Success: ', response);
							like = false;

							$('#forum_detail_like').addClass('forum_d_like_unchecked')
							$('#forum_detail_like').removeClass('forum_d_like_checked')
						} else {
							console.error('Failed to unlike the post');
						}
					})
					.catch(error => {
						console.error('err', error);
					})
			}

			setTimeout(() => {
				fetch(`/forum/api/countLikes/${postId}`)
					.then(response => response.json())
					.then(data => {
						console.log("data:");
						console.log(data);
						$('#forum_detail_countLike').html(`${data}`);
					})
					.catch(error => {
						console.error('Error loading posts:', error);
					})
			}, 200);

		})

	} else {
		$('#forum_detail_like').click(() => {
			console.log("Not logging")
			$('main').append(`
				<div class="forum_bg"></div>  
			  	<div class="forum_detail_checkwindow">
					<p>您尚未登入，請先登入！</p>
					<a href="/login" id="forum_toLogin" class="forum_a_toLogin">前往登入</a>
					<button id="forum_closeWindow" class="forum_checkwindow_cancel">暫時不要</button>
				</div>
			`)
			$('.forum_bg').fadeIn(100);
		})
	}

	$('#forum_detail_bookmark').click(() => {
		if (!bookmark) {
			fetch('/forum/api/bookmark', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(postId)
			})
				.then(response => {
					if (response.ok) {
						console.log('Success: ', response);
						bookmark = true;

						$('#forum_detail_bookmark').addClass('forum_d_bookmark_checked')
						$('#forum_detail_bookmark').removeClass('forum_d_bookmark_unchecked')
					} else {
						console.error('Failed to bookmark the post');
					}
				})
				.catch(error => {
					console.error('err', error);
				})

		} else {
			fetch('/forum/api/bookmark', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(postId)
			})
				.then(response => {
					if (response.ok) {
						console.log('Success: ', response);
						bookmark = false;

						$('#forum_detail_bookmark').addClass('forum_d_bookmark_unchecked')
						$('#forum_detail_bookmark').removeClass('forum_d_bookmark_checked')
					} else {
						console.error('Failed to unbookmark the post');
					}
				})
				.catch(error => {
					console.error('err', error);
				})
		}
	})


	$('#forum_detail_report').click(() => {
		if (!report) {
			$('main').append(`
					<div class="forum_bg"></div>  
					<div class="forum_detail_checkwindow">
						<p>確定要檢舉這篇文章嗎？</p>
						<button id="forum_reportPost" class="forum_checkwindow_OK">確定</button>
						<button id="forum_closeWindow" class="forum_checkwindow_cancel">取消</button>
					</div>
				`)
			$('.forum_bg').fadeIn(100);
		} else {
			$('main').append(`
					<div class="forum_bg"></div>  
					<div class="forum_detail_checkwindow">
						<p>您已經檢舉過這篇文章</p>
						<button id="forum_closeWindow" class="forum_checkwindow_close">關閉</button>
					</div>
				`)
			$('.forum_bg').fadeIn(100);
		}
	})


	$(document).on('click', '#forum_reportPost', () => {
		fetch('/forum/api/report', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postId)
		})
			.then(response => {
				if (response.ok) {
					console.log('Success: ', response);
					report = true;
					$('.forum_detail_checkwindow').remove();
					$('main').append(`
						<div class="forum_bg"></div>  
						<div class="forum_detail_checkwindow">
							<p>我們已收到您的檢舉</p>
							<button id="forum_closeWindow" class="forum_checkwindow_close">關閉</button>
						</div>
					`)
				} else {
					console.error('Failed to report the post');
				}
			})
			.catch(error => {
				console.error('err', error);
			})
	})


	$('#forum_detail_delete').click(() => {
		console.log("Not logging")
		$('main').append(`
				<div class="forum_bg"></div>  
			  	<div class="forum_detail_checkwindow">
					<p>確定要刪除這篇文章嗎？</p>
					<button id="forum_deletePost" class="forum_checkwindow_OK">確定</button>
					<button id="forum_closeWindow" class="forum_checkwindow_cancel">取消</button>
				</div>
			`)
		$('.forum_bg').fadeIn(100);
	})


	$(document).on('click', '#forum_deletePost', () => {
		fetch('/forum/api/deletePost', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postId)
				.then(response => {
					if (response.ok) {
						console.log('Success: ', response);
						setTimeout(() => {
							window.location.href = '/forum';
						}, 1000);
					} else {
						console.error('Failed to delete the post');
					}
				})
				.catch(error => {
					console.error('err', error);
				})
		})

	})

	$(document).on('click', '#forum_closeWindow, .forum_bg', () => {
		$('.forum_bg').fadeOut(100)
		$('.forum_bg').remove();
		$('.forum_detail_checkwindow').remove();
	})

})