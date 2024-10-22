// 新聞管理
import { auth } from "/js/thirdParty/initialAuth.js";
import { getStorage, ref } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import { uploadBytes } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import { getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import { deleteObject } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

console.log('ok')

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
				+ "<td class='newsClip' data-fulltext='" + data[i].title + "'>" + data[i].title + "</td>"
				+ "<td class='newsClip' data-fulltext='" + data[i].text + "'>" + data[i].text + "</td>"
				+ "<td class='newsClip' data-fulltext='" + data[i].url + "'>" + "<a href='" + data[i].url + "' target='_blank'>" + data[i].url + "</a>" + "</td>"
				+ "<td>" + "<img class='newsTinyImg' src='" + data[i].imgurl + "'>" + "</td>"
				+ "</tr>";
		}



		// 控制tooltip位置
		const newsCells = document.querySelectorAll('.newsClip');
		newsCells.forEach(cell => {
			const tooltip = document.createElement('div');
			tooltip.className = 'newsTooltip';
			tooltip.textContent = cell.getAttribute('data-fulltext');
			cell.appendChild(tooltip);

			cell.addEventListener('mousemove', (e) => {
				const tooltipWidth = tooltip.offsetWidth;

				// 計算顯示位置
				let left = e.clientX;
				let top = e.clientY - document.getElementById("header").offsetHeight; // 向下偏移
				// 檢查 tooltip 是否會超出視窗
				if (left + tooltipWidth > window.innerWidth) {
					left = e.clientX - tooltipWidth; // 改為顯示在左邊
				}

				// 設置 tooltip 位置
				tooltip.style.left = `${left}px`;
				tooltip.style.top = `${top}px`;
			});

			cell.addEventListener('mouseenter', () => {
				tooltip.style.display = 'block'; // 顯示 tooltip
			});

			cell.addEventListener('mouseleave', () => {
				tooltip.style.display = 'none'; // 隱藏 tooltip
			});
		});

		// 新聞小圖切換大圖

		const newsImgModal = document.getElementById("newsImgModal");
		const newsImg = document.getElementById("newsImg");
		const newsImgCloseBtn = document.getElementById("newsImgCloseBtn");
		const newsTinyImg = document.querySelectorAll(".newsTinyImg");
		newsTinyImg.forEach(image => {
			image.addEventListener('click', (e) => {
				// 在懸停時顯示大圖
				console.log(e.target)
				newsImg.src = image.src.replace('small-image.jpg', 'large-image.jpg');
				newsImgModal.style.display = "flex";
			});
		});

		newsImgCloseBtn.onclick = () => {
			newsImgModal.style.display = "none";
		};

		window.onclick = (event) => {
			// 點擊模態外部也可以關閉
			if (event.target == newsImgModal) {
				newsImgModal.style.display = "none";
			}
		};
	})
	.catch(error => {
		console.error('add Mews err:', error);
	});

// 加入新聞
document.getElementById('addForm').addEventListener('submit', async (e) => {
	// e.preventDefault(); // 阻止表單的默認提交行為
	let title = document.getElementById('addTitle').value;
	let text = document.getElementById('addText').value;
	let newsURL = document.getElementById('addNewsURL').value;
	let imgURL;

	const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
	const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

	const files = document.getElementById('addFile').files;
	if (files.length > 0) {
		const file = files[0];
		// 檢查檔案大小
		if (file.size > MAX_FILE_SIZE) {
			alert('檔案大小不能超過 10 MB。');
			return;
		}
		// 檢查檔案類型
		if (!ALLOWED_FILE_TYPES.includes(file.type)) {
			alert('只允許上傳 JPEG、PNG 檔案。');
			return;
		}
		const storage = getStorage();
		// 上傳檔案的邏輯
		const storageRef = ref(storage, `news/${file.name}`);
		try {
			uploadBytes(storageRef, file); // 上傳檔案和中繼資料

			getDownloadURL(ref(storage, `news/${file.name}`))
				.then((url) => {
					imgURL = url;

					let formData = new FormData(); // 創建 FormData 物件
					formData.append('title', title);
					formData.append('text', text);
					formData.append('newsURL', newsURL);
					formData.append('imgURL', imgURL);
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

				})
				.catch((error) => {
					console.error('獲取url失敗')
				});

		} catch (error) {
			console.error('上傳失敗:', error);
		}
	} else {
		console.log('沒有選擇檔案');
	}

});

// 更改新聞
document.getElementById('updateForm').addEventListener('submit', function(e) {
	// e.preventDefault(); // 阻止表單的默認提交行為
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
	// e.preventDefault(); // 阻止表單的默認提交行為
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
window.newsDB = function(e, dbMove) {
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
