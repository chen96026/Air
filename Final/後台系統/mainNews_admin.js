// 載入全部新聞
fetch('/news/getAll')
	.then(response => {
		if (!response.ok) {
			throw new Error('Error:get all News ->');
		}
		return response.json();
	})
	.then(data => {
		console.log(data);
		let news = document.getElementById("newsTable");
		for (let i = 0; i < data.length; i++) {
			news.innerHTML += "<tr>"
				+ "<td>" + data[i].id + "</td>"
				+ "<td class='newsClip'>" + data[i].title + "</td>"
				+ "<td class='newsClip'>" + data[i].text + "</td>"
				+ "<td class='newsClip'>" + "<a href='" + data[i].url + "' target='_blank'>" + data[i].url + "</a>" + "</td>"
				+ "<td>" + "<img src='data:image/png;base64," + data[i].img + "'>" + "</td>"
				+ "</tr>";
		}
	})
	.catch(error => {
		console.error('add Mews err:', error);
	});

// 加入新聞
document.getElementById('addForm').addEventListener('submit', function(e) {
	e.preventDefault(); // 阻止表單的默認提交行為
	let title = document.getElementById('addTitle').value;
	let text = document.getElementById('addText').value;
	let newsURL = document.getElementById('addNewsURL').value;
	let addFile = document.getElementById('addFile').files[0];
	let formData = new FormData(); // 創建 FormData 物件
	formData.append('title', title);
	formData.append('text', text);
	formData.append('newsURL', newsURL);
	formData.append('addFile', addFile);
	fetch('/news/add', {
		method: 'Post',
		body: formData
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Error:add News ->');
			}
			return response.json();
		})
		.then(data => {
			console.log('Success');
			window.location.href = '/back';
		})
		.catch(error => {
			console.error('add News err:', error);
		});
});

// 更改新聞
document.getElementById('updateForm').addEventListener('submit', function(e) {
	e.preventDefault(); // 阻止表單的默認提交行為
	let newsId = document.getElementById('updateNewsId').value;
	let title = document.getElementById('updateTitle').value;
	let text = document.getElementById('updateText').value;
	let newsURL = document.getElementById('updateNewsURL').value;
	let updateFile = document.getElementById('updateFile').files[0];
	let formData = new FormData(); // 創建 FormData 物件
	formData.append('newsId', newsId);
	formData.append('title', title);
	formData.append('text', text);
	formData.append('newsURL', newsURL);
	formData.append('updateFile', updateFile);
	fetch('/news/update', {
		method: 'PUT',
		body: formData
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Error:update News ->');
			}
			return response.json();
		})
		.then(data => {
			console.log('Success');
			window.location.href = '/back';
		})
		.catch(error => {
			console.error('update Mews err:', error);
		});
});

// 刪除新聞
document.getElementById('deleteForm').addEventListener('submit', function(e) {
	e.preventDefault(); // 阻止表單的默認提交行為
	let newsId = document.getElementById('deleteNewsId').value;
	fetch('/news/delete/' + newsId, {
		method: 'DELETE',
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Error:delete News ->');
			}
			console.log('Success');
			window.location.href = '/back';
		})
		.catch(error => {
			console.error('delete Mews err:', error);
		});
});

// 全部新聞/增加新聞/刪除修改新聞，三個頁面的tab切換
document.getElementById("newsFind").style.display = "block";
function newsDB(e, dbMove) {
	var i, newsContent, newsTab;
	newsContent = document.getElementsByClassName("newsContent");
	newsTabBtn = document.getElementsByClassName("newsTabBtn");
	for (i = 0; i < newsContent.length; i++) {
		newsContent[i].style.display = "none";
	}
	for (i = 0; i < newsTabBtn.length; i++) {
		newsTabBtn[i].classList.remove('newsTabActive');
	}
	e.target.classList.add('newsTabActive');
	document.getElementById(dbMove).style.display = "block";
}