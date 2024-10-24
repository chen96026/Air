document.addEventListener('DOMContentLoaded', function() {
	const scrollRevealOption = {
		distance: "50px",
		origin: "bottom",
		duration: 1000,
	};

	ScrollReveal().reveal(".banner-right", {
		...scrollRevealOption,
	});

	const urlParams = new URLSearchParams(window.location.search);

	const des_start = urlParams.get('des_start');
	const des_end = urlParams.get('des_end');
	const date_start = urlParams.get('date_start');
	const date_end = urlParams.get('date_end');
	const adults = urlParams.get('adults');
	const child = urlParams.get('child');
	const type = urlParams.get('type');

	document.getElementById('des_start').value = des_start;
	document.getElementById('des_end').value = des_end;
	document.getElementById('date_start').value = date_start;
	document.getElementById('date_end').value = date_end;
	document.getElementById('adults').value = adults;
	document.getElementById('child').value = child;


	// 接收的資料
	const searchData = {
		des_start: des_start,
		des_end: des_end,
		date_start: date_start,
		date_end: date_end,
		adults: adults,
		child: child,
		type: type
	};

	console.log(searchData);
	if (des_end == '世界各地') {
		fetch('http://localhost:8890/plane/min_prices', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				displayCountryCards(data);
			})
			.catch(error => {
				console.error('error:', error);
			});
	} else {
		fetch('http://localhost:8890/plane/cheapest_by_city', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ country: des_end })
		})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				displayCityCards(data, searchData);
			})
			.catch(error => {
				console.error('error:', error);
			});
	}
});

// 卡片
function displayCityCards(data, searchData) {
	document.getElementById('section_title').textContent = '選擇城市';

	const cardsContainer = document.getElementById('cards-container');
	const loading = document.getElementById('loading');

	let currentPage = 0;
	const perPage = 9;
	let isLoading = false;

	function loadCards() {
		if (isLoading || currentPage * perPage >= data.length) return;
		isLoading = true;
		loading.style.display = 'block';

		setTimeout(() => {
			const start = currentPage * perPage;
			const end = Math.min(start + perPage, data.length);

			for (let i = start; i < end; i++) {

				let url = new URL(window.location.href);
				url.searchParams.set('des_end', data[i].city);
				let city_url = url.toString();
				city_url = city_url.replace('searchpage', 'searchpage2');

				const card = document.createElement('div');
				card.className = 'col-md-4 mb-4';
				card.innerHTML = `
                    <a href="${city_url}" id="${data[i].city}">
                        <div class="card">
                            <img src="./assets/city/${data[i].city}.jpg" class="card-img-top">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h5 class="card-title">${data[i].city}</h5>
                                <div class="search_details">
                                    <div class="search_text">
                                        <div class="card-text">直飛</div><br>
                                    	<div class="card-text">航班最低只要 NT$${data[i].minPrice}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
				
				// 檢查是否填寫所有欄位
				card.querySelector('a').addEventListener('click', function(event) {
					if (!searchData.des_start || !searchData.date_start || !searchData.date_end || !searchData.adults || !searchData.child) {
						event.preventDefault();
						alert('請填寫所有欄位');
					}
					localStorage.removeItem('selectedFlights');
					localStorage.removeItem('selectedFlights2');
				});

				cardsContainer.appendChild(card);
			}

			currentPage++;
			isLoading = false;
			loading.style.display = 'none';
			
		}, 16);
	}

	function checkScroll() {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
			loadCards();
		}
	}

	window.addEventListener('scroll', checkScroll);

	loadCards();

}

function displayCountryCards(data) {
	document.getElementById('section_title').textContent = '選擇國家';

	const cardsContainer = document.getElementById('cards-container');
	const loading = document.getElementById('loading');

	let currentPage = 0;
	const perPage = 9;
	let isLoading = false;

	function loadCards() {
		if (isLoading || currentPage * perPage >= data.length) return;
		isLoading = true;
		loading.style.display = 'block';

		setTimeout(() => {
			const start = currentPage * perPage;
			const end = Math.min(start + perPage, data.length);

			for (let i = start; i < end; i++) {
				let url = new URL(window.location.href);
				url.searchParams.set('des_end', data[i][0]);

				const card = document.createElement('div');
				card.className = 'col-md-4 mb-4';
				card.innerHTML = `
                    <a href="${url}" id="${data[i][0]}">
                        <div class="card">
                            <img src="./assets/country/${data[i][0]}.jpg" class="card-img-top">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${data[i][0]}</h5>
                                <div class="search_details">
                                    <div class="search_text">
                                        <div class="card-text">直飛</div><br>
                                    	<div class="card-text">最低只要 NT$${data[i][1]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
				cardsContainer.appendChild(card);
			}

			currentPage++;
			isLoading = false;
			loading.style.display = 'none';
		}, 16);
	}

	function checkScroll() {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
			loadCards();
		}
	}

	window.addEventListener('scroll', checkScroll);

	loadCards();
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

	const formData = `?des_start=${desStart}&des_end=${desEnd}&date_start=${dateStart}&date_end=${dateEnd}&adults=${adults}&child=${child}&type=經濟艙`;

	// 检查是否有任何输入框为空

	if (!desStart || !desEnd || !dateStart || !dateEnd || !adults || !child) {
		event.preventDefault();
		alert('請完整填寫所有欄位');
	} else {
		if (desEnd === '世界各地') {
			console.log('123')
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
					console.log(123)
					console.log(data);

					searchPage = data.length !== 0 ? 'http://localhost:8890/searchpage' : 'http://localhost:8890/searchpage2';

					window.location.href = searchPage + formData;
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	}
});

localStorage.setItem('lastUrl',window.location.href);