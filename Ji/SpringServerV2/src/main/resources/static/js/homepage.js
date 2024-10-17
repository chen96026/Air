const scrollRevealOption = {
	distance: "50px",
	origin: "bottom",
	duration: 1000,
};

ScrollReveal().reveal(".banner-left", {
	...scrollRevealOption,
});
ScrollReveal().reveal(".banner-right", {
	...scrollRevealOption,
});
ScrollReveal().reveal(".popular-destination-area", {
	...scrollRevealOption,
	delay: 500,
});

// 點擊get Started後會聚焦在航班出發地輸入欄位
document.getElementById("HpStardBtn").addEventListener("click", function() {
	// Focus the first input field without moving the page
	document.getElementById("des_start").focus();
	document.getElementById("des_start").style.borderColor = 'red';
});

// 新聞的輪播
let slideIndex = 1;
let timer;
showSlides(slideIndex);

function posterPlusSlides(n) {
	showSlides(slideIndex += n);
}

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("container-fluid");
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex - 1].style.display = "flex";
	// clearInterval(timer);
	// timer = setInterval(() => { showSlides(++slideIndex); }, 3000);
}

document.getElementById('search_btn').addEventListener('click', function(event) {

	localStorage.removeItem('selectedFlights');
	localStorage.removeItem('selectedFlights2');

	event.preventDefault();
	const desStart = document.getElementById('des_start').value;
	const desEnd = document.getElementById('des_end').value;
	const dateStart = document.getElementById('date_start').value;
	const dateEnd = document.getElementById('date_end').value;
	const adults = document.getElementById('adults').value;
	const child = document.getElementById('child').value;
	const type = document.querySelector('input[name="type"]:checked').value;

	const formData = `?des_start=${desStart}&des_end=${desEnd}&date_start=${dateStart}&date_end=${dateEnd}&adults=${adults}&child=${child}&type=${type}`;

	// 检查是否有任何输入框为空

	if (!desStart || !desEnd || !dateStart || !dateEnd || !adults || !child) {
		event.preventDefault();
		alert('請完整填寫所有欄位');
	} else {
		if (desEnd === '世界各地') {
			window.location.href = 'http://localhost:8890/searchpage?des_start=台灣&des_end=世界各地&date_start=2024%2F10%2F29&date_end=2024%2F10%2F30&adults=1&child=0&type=經濟艙';
		} else {
			fetch('http://localhost:8890/plane/check_country', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ country: desEnd })
			})
				.then(response => response.json())
				.then(data => {
					searchPage = data.length !== 0 ? 'http://localhost:8890/searchpage' : 'http://localhost:8890/searchpage2';
					window.location.href = searchPage + formData;
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	}
});

fetch('/forum/api/loadCards?country=全世界&city=所有城市&key=&sortBy=postDate&page=0')
	.then(response => {
		if (!response.ok) {
			throw new Error('blog Error: no response');
		}
		return response.json();
	})
	.then(data => {
		// 0~5
		console.log(data);
		console.log("------------");
		// 0~11
		let imgTemp = document.querySelectorAll('.HpBlogImg');
		console.log(imgTemp);
		console.log("------------");
		let img = document.querySelectorAll('.HpBlogImg');
		let tags = document.querySelectorAll('.HpBlogTags');
		let title = document.querySelectorAll('.HpBlogTitle');
		let text = document.querySelectorAll('.HpBlogText');
		let icon = document.querySelectorAll('.HpBlogIcon');
		let author = document.querySelectorAll('.HpBlogAuthor');
		let date = document.querySelectorAll('.HpBlogDate');
		for (let index = 0; index < 12; index++) {
			img[index].src = data[(index + 3) % 6].coverImgURL;
			let tagSplit = data[(index + 3) % 6].post.tags.split(",");
			let tagString = "";
			tagSplit.forEach(tag => {
				tagString += "<li><a href='/forum?key=" + tag + "'>" + tag + "</a></li>"
			});
			tags[index].innerHTML = tagString;
			title[index].innerHTML = "<a href='/forum_detail/" + data[(index + 3) % 6].post.id + "'>" + data[(index + 3) % 6].post.mainTitle + "</a>";
			text[index].innerHTML = data[(index + 3) % 6].post.content;
			icon[index].src = data[(index + 3) % 6].userNameIconDTO.iconURL;
			author[index].innerHTML = data[(index + 3) % 6].userNameIconDTO.username;
			date[index].innerHTML = data[(index + 3) % 6].post.startDate;
		}

	})
	.catch(error => {
		console.error('blog err:', error);
	});



// 防抖函數
function debounce(func, delay) {
	let debounceTimer;
	return function() {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	}
}

// 追蹤當前選中的建議索引，分別為 des_start 和 des_end
const currentFocus = {
	des_start: -1,
	des_end: -1
};

// 函數：顯示建議
function showSuggestions(input, suggestionsDiv, inputId) {
	const inputValue = input.value.toLowerCase();

	// 清空之前的建議
	suggestionsDiv.innerHTML = '';

	if (inputValue) {
		// 從伺服器獲取建議數據
		fetch(`/plane/inputSearch?query=${encodeURIComponent(inputValue)}`)
			.then(response => response.json())
			.then(data => {
				if (data.length === 0) {
					suggestionsDiv.style.display = 'none';
					return;
				}

				data.forEach(item => {
					const suggestionText = `${item.country} - ${item.city}`;
					const div = document.createElement('div');
					div.textContent = suggestionText;
					div.setAttribute('role', 'option');

					// 當點擊某個建議時，將其設置為輸入框的值
					div.addEventListener('click', function() {
						input.value = item.city;
						suggestionsDiv.style.display = 'none';
					});

					suggestionsDiv.appendChild(div);
				});

				suggestionsDiv.style.display = 'block';
			})
			.catch(error => {
				console.error('Error fetching suggestions:', error);
				suggestionsDiv.style.display = 'none';
			});
	} else {
		suggestionsDiv.style.display = 'none';
	}
}

// 監聽輸入事件並綁定防抖
const inputs = ['des_start', 'des_end'];
inputs.forEach(inputId => {
	const input = document.getElementById(inputId);
	const suggestionsDiv = document.getElementById(`suggestions_${inputId}`);

	input.addEventListener('input', debounce(function() {
		showSuggestions(input, suggestionsDiv, inputId);
		currentFocus[inputId] = -1; // 重置選中索引
	}, 300));

	// 監聽鍵盤事件
	input.addEventListener('keydown', function(e) {
		let suggestionItems = suggestionsDiv.getElementsByTagName('div');
		if (e.keyCode === 40) { // Arrow Down
			currentFocus[inputId]++;
			addActive(suggestionItems, inputId);
		} else if (e.keyCode === 38) { // Arrow Up
			currentFocus[inputId]--;
			addActive(suggestionItems, inputId);
		} else if (e.keyCode === 13) { // Enter
			e.preventDefault();
			if (currentFocus[inputId] > -1) {
				if (suggestionItems) suggestionItems[currentFocus[inputId]].click();
			}
		}
	});

	// 添加 active 類名以高亮選中項目
	function addActive(items, inputId) {
		if (!items) return false;
		removeActive(items);
		if (currentFocus[inputId] >= items.length) currentFocus[inputId] = 0;
		if (currentFocus[inputId] < 0) currentFocus[inputId] = items.length - 1;
		items[currentFocus[inputId]].classList.add('active');
		// 滾動到可見範圍
		items[currentFocus[inputId]].scrollIntoView({ block: 'nearest' });
	}

	// 移除所有 active 類名
	function removeActive(items) {
		for (let i = 0; i < items.length; i++) {
			items[i].classList.remove('active');
		}
	}
});

// 當點擊建議框外部時隱藏建議框
document.addEventListener('click', function(e) {
	inputs.forEach(inputId => {
		const suggestionsDiv = document.getElementById(`suggestions_${inputId}`);
		const input = document.getElementById(inputId);
		if (e.target === input || e.target.closest(`#suggestions_${inputId}`)) {
			// 點擊在輸入框內或建議框內，不做任何操作
			return;
		}
		// 隱藏所有建議框
		suggestionsDiv.style.display = 'none';
	});
});