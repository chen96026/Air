document.addEventListener('DOMContentLoaded', function() {
	const urlParams = new URLSearchParams(window.location.search);

	const openBtnValue = urlParams.get('openBtnValue');
	const des_start = urlParams.get('des_start');
	const des_end = urlParams.get('des_end');
	const date_start = urlParams.get('date_start');
	const date_end = urlParams.get('date_end');
	const eco_quantity = urlParams.get('eco_quantity');
	const bus_quantity = urlParams.get('bus_quantity');

	const openBtnOnSearchPage = document.getElementById('search_bar_button');
	openBtnOnSearchPage.innerHTML = decodeURIComponent(openBtnValue);

	// 接收的資料
	const searchData = {
		des_start: des_start,
		des_end: des_end,
		date_start: date_start,
		date_end: date_end,
		eco_quantity: eco_quantity,
		bus_quantity: bus_quantity
	};
	
	document.getElementById('search_country_start').value = searchData.des_start
	document.getElementById('search_country_end').value = searchData.des_end
	document.getElementById('departureDate').value = searchData.date_start
	document.getElementById('returnDate').value = searchData.date_end

	console.log(searchData);
	if (des_end == '世界各地') {
		// request = country => request = cities array => response = {city,minPrice}
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
		// request = country => request = cities array => response = {city,minPrice}
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
				displayCityCards(data);
			})
			.catch(error => {
				console.error('error:', error);
			});
	}
});

// 卡片
function displayCityCards(data) {
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
				city_url = city_url.replace('search_page', 'search_page2');

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
                                        <div class="card-text">航班最低只要</div>
                                        <div class="card-text">直飛</div>
                                    </div>
                                    <div class="search_price">NT$${data[i].minPrice}</div>
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
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h5 class="card-title">${data[i][0]}</h5>
                                <div class="search_details">
                                    <div class="search_text">
                                        <div class="card-text">航班最低只要</div>
                                        <div class="card-text">直飛</div>
                                    </div>
                                    <div class="search_price">NT$${data[i][1]}</div>
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