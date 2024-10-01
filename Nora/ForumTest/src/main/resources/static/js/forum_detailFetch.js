$(() => {
	const url = window.location.pathname;
	const urlparts = url.split('/');
	const postId = urlparts[urlparts.length - 1];
	const data = {id: postId};
	console.log(data);
	
	$('#forum_detail_like').click(() => {
		
		console.log(postId);
		console.log(JSON.stringify(data));
		
		if(!like) {
			fetch('/forum/api/like', {
		    	method: 'POST',
		    	headers: {
		        	'Content-Type': 'application/json'
		        },
		        body: JSON.stringify(data)
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
		        body: JSON.stringify(data)
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
		}, 300);
		
	})

	
	$('#forum_detail_bookmark').click(() => {
		if(!bookmark) {
			fetch('/forum/api/bookmark', {
		    	method: 'POST',
		    	headers: {
		        	'Content-Type': 'application/json'
		        },
		        body: JSON.stringify(data)
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
		        body: JSON.stringify(data)
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
		if(!report) {
			fetch('/forum/api/report', {
		    	method: 'POST',
		    	headers: {
		        	'Content-Type': 'application/json'
		        },
		        body: JSON.stringify(data)
		    })
		    .then(response => {
				if (response.ok) {
			    	console.log('Success: ', response);
			        report = true;	
			    } else {
			        console.error('Failed to report the post');
			    }
			})
		    .catch(error => {
		        console.error('err', error);
		    })
		}
	})
	
	
	$('#forum_detail_delete').click(() => {
		if(!report) {
			fetch('/forum/api/deletePost', {
		    	method: 'DELETE',
		    	headers: {
		        	'Content-Type': 'application/json'
		        },
		        body: JSON.stringify(data)
		    })
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
		}
	})

})