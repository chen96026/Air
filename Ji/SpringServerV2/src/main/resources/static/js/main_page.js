const scrollRevealOption = {
	distance: "50vw",
	origin: "bottom",
	duration: 1000,
	easing: "ease-in-out",
	opacity: 0,
};

// destination container
ScrollReveal().reveal(".destination_card", {
	duration: 1000,
	interval: 500,
});

let slideIndex = 1;
let totalSlides;
const apiKey = 'ff4b3af578664a56b7c10de98a705f8b';
const query = '"機票" AND "旅遊" NOT "員工"';
const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&language=zh`;
const carouselInner = document.getElementById('carousel-inner');
const carouselDots = document.getElementById('carousel-dots');
let slides;

// 使用 fetch 獲取新聞資料
function homeNews() {
	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			carouselInner.innerHTML = '';
			carouselDots.innerHTML = '';

			let validArticles = 0;

			data.articles.some((article, index) => {
				if (!article.urlToImage || !article.title || article.urlToImage.includes("yahoo_default_logo")) {
					return false; // 跳過無效新聞
				}

				validArticles++;

				const slideElement = document.createElement('div');
				slideElement.classList.add('carousel_slide');
				slideElement.innerHTML = `
      				<img src="${article.urlToImage}" alt="新聞圖像">
      				<h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
    			`;
				carouselInner.appendChild(slideElement);

				// 停止抓取超過6則新聞
				return validArticles === 5;
			});

			slides = document.getElementsByClassName('carousel_slide');
			totalSlides = slides.length;

			// 複製第一張和最後一張
			const firstClone = slides[0].cloneNode(true);
			const lastClone = slides[totalSlides - 1].cloneNode(true);

			firstClone.id = 'first-clone';
			lastClone.id = 'last-clone';

			carouselInner.appendChild(firstClone);
			
			totalSlides = slides.length;

			// 生成對應幻燈片的圓點
			for (let i = 0; i < totalSlides - 1; i++) {
				const dot = document.createElement('span');
				dot.setAttribute('onclick', `goToSlide(${i + 1})`);
				if (i === 0) {
					dot.classList.add('active');  // 第一個圓點活動狀態
				}
				carouselDots.appendChild(dot);
			}

			if (validArticles > 0) {
				startCarousel();  // 啟動輪播
			}
		})
		.catch(error => {
			console.error('無法取得新聞資料:', error);
		});
}

setInterval(homeNews, 43200000);  //毫秒

homeNews();

// 啟動輪播的函數
function startCarousel() {
	setInterval(() => changeSlide(1), 10000);
	
}

function changeSlide(n) {
	const slideWidth = document.querySelector('.carousel_slide').offsetWidth; // 確保使用新的圖片寬度
	if (n > 0 && slideIndex+1 === totalSlides) {
		slideIndex = 0;
		setTimeout(() => {
			carouselInner.style.transition = 'transform 0.5s ease-in-out';
			carouselInner.style.transform = `translateX(-${slideIndex * slideWidth}px)`; // 使用新寬度
			updateDots();
			slideIndex += n;
		}, 50);
	} else if (n < 0 && slideIndex === 0) {
		slideIndex = totalSlides ;
		setTimeout(() => {
			carouselInner.style.transition = 'transform 0.5s ease-in-out';
			carouselInner.style.transform = `translateX(-${slideIndex * slideWidth}px)`; // 使用新寬度
			updateDots();
			slideIndex--;
		}, 50);
	} else {
		carouselInner.style.transform = `translateX(-${slideIndex * slideWidth}px)`; // 使用新寬度
		slideIndex += n;
		updateDots();
	}
}

function goToSlide(index) {
	slideIndex = index;
	carouselInner.style.transform = `translateX(-${slideIndex * 100}%)`;
	updateDots();
}

function updateDots() {
	const dots = carouselDots.getElementsByTagName('span');

	// 計算正確的 dotIndex，只針對真實的幻燈片
	let dotIndex = slideIndex -1;
	if (slideIndex === 0 ) {
		dotIndex = 0;  // 如果在第一個複製，對應第一個真實幻燈片
	}

	// 重置所有圓點的 active 狀態
	for (let i = 0; i < dots.length; i++) {
		dots[i].classList.remove('active');
	}

	// 設置當前活動圓點
	if (dots[dotIndex]) {
		dots[dotIndex].classList.add('active');
	}
}

// 獲取 client_grid 容器
const clientGrid = document.querySelector('.member_forum_card_group');

// 創建三個 card 元素的資料
const forumCards = [
	{
		img: 'https://picsum.photos/400/240?random=0',
		title: '超級可愛的熊本熊!',
		description: '終於看到心心念念的熊本熊! 現場拍真的是超~~~~大一隻😆😆🤣🤣 ...',
		authorImg: 'https://picsum.photos/50?random=0',
		author: '奇異鳥真奇異啊',
		postDate: '2024-09-14'
	},
	{
		img: 'https://picsum.photos/400/240?random=1',
		title: '超級可愛的熊本熊!',
		description: '終於看到心心念念的熊本熊! 現場拍真的是超~~~~大一隻😆😆🤣🤣 ...',
		authorImg: 'https://picsum.photos/50?random=1',
		author: '奇異鳥真奇異啊',
		postDate: '2024-09-14'
	},
	{
		img: 'https://picsum.photos/400/240?random=2',
		title: '超級可愛的熊本熊!',
		description: '終於看到心心念念的熊本熊! 現場拍真的是超~~~~大一隻😆😆🤣🤣 ...',
		authorImg: 'https://picsum.photos/50?random=2',
		author: '奇異鳥真奇異啊',
		postDate: '2024-09-14'
	}
];

forumCards.forEach(card => {
	const memberForumCard = document.createElement('div');
	memberForumCard.classList.add('member_forum_card');

	memberForumCard.innerHTML = `
    <a href="./forum_detail.html">
      <article>
        <img class="member_forum_articleImg" src="${card.img}" alt="">
        <h3>${card.title}</h3>
        <p class="member_forum_articleMore">${card.description}</p>
      </article>
      <div>
        <img class="member_forum_authorImg" src="${card.authorImg}" alt="">
        <p class="member_forum_author">${card.author}</p>
        <p class="member_forum_postDate">${card.postDate}</p>
      </div>
    </a>
  `;

	clientGrid.appendChild(memberForumCard);
});

//  member_forum_card
ScrollReveal().reveal(".member_forum_card", {
	scrollRevealOption,
	interval: 500,
});