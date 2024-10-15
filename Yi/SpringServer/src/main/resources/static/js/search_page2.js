document.addEventListener('DOMContentLoaded', () => {
	const urlParams = new URLSearchParams(window.location.search);

	const des_start = urlParams.get('des_start');
	const des_end = urlParams.get('des_end');
	const date_start = urlParams.get('date_start');
	const date_end = urlParams.get('date_end');
	const eco_quantity = urlParams.get('eco_quantity');
	const openBtnValue = '<img src="./assets/search.png" class="search_icon"></img>' + des_start + '-' + des_end + ' · ' + date_start.replaceAll('-', '/') + '-' + date_end.replaceAll('-', '/') + ' · ' + urlParams.get('openBtnValue').slice(88);
	const openBtnOnSearchPage = document.getElementById('search_bar_button');
	openBtnOnSearchPage.innerHTML = decodeURIComponent(openBtnValue);

	document.getElementById('search_country_start').value = des_start;
	document.getElementById('search_country_end').value = des_end;
	document.getElementById('departureDate').value = date_start;
	document.getElementById('returnDate').value = date_end;

	let totalResults = [];

	const apiUrl = `http://localhost:8890/plane/search2?departureCountry=${encodeURIComponent(des_start)}&arrivalCity=${encodeURIComponent(des_end)}&departureDate=${encodeURIComponent(date_start)}&requiredSeats=${eco_quantity}`;

	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			airline_choice(removeDuplicates(data), data);
			totalResults = sortBy(data, chooseMethod());
			loadChoice(totalResults);
		})
		.catch(error => {
			console.error('Error fetching flight data:', error);
		});

	function loadChoice(data) {
		const choiceContainer = document.querySelector('#search2_choice');
		choiceContainer.innerHTML = '';

		if (data.length === 0) {
			choiceContainer.innerHTML = '<p>沒有找到符合條件的航班...</p>';
			return;
		}

		data.forEach(flight => {
			let duration = calculateDuration(flight.plane.time_start, flight.plane.time_end, flight.time_zone);
			const choice = document.createElement('a');
			choice.style.color = 'black';
			choice.classList.add('choice-card');
			choice.href = '#';

			choice.innerHTML += `
					<h3>${flight.plane.airline}</h3>
					<p class="arrow-text-up">${flight.plane.des_start} - ${flight.plane.time_start.slice(0, 5)}</p>
					<div class="arrow">
						<svg width="24" height="54" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path d="M12 15l-10-10h6V0h8v5h6z" fill="black"/>
						</svg>
					</div>
					<p class="arrow-text-down">${flight.plane.des_end} - ${flight.plane.time_end.slice(0, 5)}</p>
					<p>飛行時間: ${Math.floor(duration / 60)}小時${duration % 60}分</p>
					<p>價格: NT$${flight.plane.eco_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
				`;

			choice.addEventListener('click', (e) => {
				e.preventDefault(); // Prevent default action

				const sectionTitle = document.getElementById('section_title').innerText.trim();
				if (sectionTitle === '選擇回程') {
					flight.duration = duration;
					flight.des_start = des_start;
					flight.des_end = des_end;
					flight.seat = urlParams.get('openBtnValue').slice(-3);
					flight.quantity = eco_quantity==0?bus_quantity:eco_quantity;
					localStorage.setItem('selectedFlights2', JSON.stringify(flight))
					modalContent(flight);//模態窗口資訊
					showModal(); // 顯示模態窗口
				} else {
					swapDestinations(des_start, des_end);
					flight.des_start = des_start;
					flight.des_end = des_end;
					flight.duration = duration;
					flight.seat = urlParams.get('openBtnValue').slice(-3);
					flight.quantity = eco_quantity==0?bus_quantity:eco_quantity;
					saveSelection(flight);
				}
			});

			choiceContainer.appendChild(choice);
		});
	}

	function swapDestinations(start, end) {
		const newUrl = `${window.location.origin}${window.location.pathname}?des_start=${end}&des_end=${start}&date_start=${encodeURIComponent(date_start)}&date_end=${encodeURIComponent(date_end)}&eco_quantity=${encodeURIComponent(eco_quantity)}&openBtnValue=${encodeURIComponent(urlParams.get('openBtnValue'))}`;
		window.location.href = newUrl;
	}

	// 儲存選擇到 localStorage
	function saveSelection(flight) {
		let selections = JSON.parse(localStorage.getItem('selectedFlights')) || [];

		// 檢查是否已經選擇過這筆航班
		if (!selections.some(selected => selected.plane.id === flight.plane.id)) {
			selections.push(flight);
			localStorage.setItem('selectedFlights', JSON.stringify(selections));
			displaySelectedFlights(); // 更新已選擇的顯示
		}
	}

	// 顯示選擇的航班
	function displaySelectedFlights() {
		const selectedFlights = JSON.parse(localStorage.getItem('selectedFlights')) || [];
		const search2Space = document.querySelector('#search2_space');
		search2Space.innerHTML = '';

		// 限制最多只顯示兩筆
		const flightsToDisplay = selectedFlights.slice(0, 1); // 取前兩筆航班

		flightsToDisplay.forEach(flight => {
			let duration = calculateDuration(flight.plane.time_start, flight.plane.time_end, flight.time_zone);
			const flightCard = document.createElement('div');
			flightCard.classList.add('choice-card2');
			flightCard.innerHTML += `
				<h3>${flight.plane.airline}</h3>
				<p class="arrow-text-up">${flight.plane.des_start} - ${flight.plane.time_start.slice(0, 5)}</p>
				<div class="arrow">
					<svg width="24" height="54" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M12 15l-10-10h6V0h8v5h6z" fill="black"/>
					</svg>
				</div>
				<p class="arrow-text-down">${flight.plane.des_end} - ${flight.plane.time_end.slice(0, 5)}</p>
				<p>飛行時間: ${Math.floor(duration / 60)}小時${duration % 60}分</p>
				<p>價格: NT$${flight.plane.eco_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
				<button class="close-btn" id="close-btn">取消</button>
			`;
			search2Space.appendChild(flightCard);
		});

		if (localStorage.getItem('selectedFlights')) {
			const cancelled = document.getElementById('close-btn');
			cancelled.addEventListener('click', () => {
				localStorage.removeItem('selectedFlights');
				localStorage.removeItem('selectedFlights2');
				swapDestinations(des_start, des_end);
			})
		}
	}

	// 顯示模態窗口
	function showModal() {
		const modal = document.getElementById('myModal');
		const span = document.getElementsByClassName('close')[0];

		modal.style.display = 'block';

		span.onclick = function() {
			modal.style.display = 'none';
		}

		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = 'none';
			}
		}
	}

	function modalContent(flight) {
		let selectedFlights = JSON.parse(localStorage.getItem('selectedFlights'));
		let arr = [];
		arr.push(selectedFlights[0]);
		arr.push(flight)

		const modalFlightInfo = document.getElementById('modalFlightInfo');
		modalFlightInfo.innerHTML = '';
		arr.forEach(item => {
			let duration = calculateDuration(item.plane.time_start, item.plane.time_end, item.time_zone);
			const flightCard = document.createElement('div');
			flightCard.classList.add('choice-card3');
			flightCard.innerHTML += `
						<h3>${item.plane.airline}</h3>
						<p class="arrow-text-up">${item.plane.des_start} - ${item.plane.time_start.slice(0, 5)}</p>
						<div class="arrow">
							<svg width="24" height="54" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path d="M12 15l-10-10h6V0h8v5h6z" fill="black"/>
							</svg>
						</div>
						<p class="arrow-text-down">${item.plane.des_end} - ${item.plane.time_end.slice(0, 5)}</p>
						<p>飛行時間: ${Math.floor(duration / 60)}小時${duration % 60}分</p>
						<p>價格: NT$${item.plane.eco_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
					`;
			modalFlightInfo.appendChild(flightCard);
		});
	}

	displaySelectedFlights();


	// 計算飛行時間
	function calculateDuration(time_start, time_end, time_zone) {
		let hour_start = time_start.slice(0, 2);
		let minute_start = time_start.slice(3, 5);
		let hour_end = time_end.slice(0, 2);
		let minute_end = time_end.slice(3, 5);

		let total_time_start = Number(hour_start * 60) + Number(minute_start);
		let total_time_end = Number(hour_end * 60) + Number(minute_end);
		let total_time = total_time_end - total_time_start;
		if (total_time < 0) {
			total_time = total_time_start - total_time_end;
			total_time = 1440 - total_time;
		}
		total_time = total_time - Number(time_zone * 60);
		return total_time;
	}

	// 排序方式
	function chooseMethod() {
		const sort_selects = document.querySelectorAll('.sort');
		sort_selects.forEach(sort_select => {
			sort_select.addEventListener('change', function() {
				applyFilters();
			});
		});
	}

	function sortBy(data, method) {
		if (method === 'price') {
			return data.sort((a, b) => a.plane.eco_price - b.plane.eco_price);
		} else if (method === 'time') {
			return data.sort((a, b) => calculateDuration(a.plane.time_start, a.plane.time_end, a.time_zone) -
				calculateDuration(b.plane.time_start, b.plane.time_end, b.time_zone));
		} else {
			return data;
		}
	}

	function getSortMethod() {
		const selectedSort = document.querySelector('.sort:checked');
		return selectedSort ? selectedSort.value : null;
	}

	// 去除重複資料(以航空公司做篩選)
	function removeDuplicates(data) {
		let unique = [];
		for (let i = 0; i < data.length; i++) {
			if (!unique.includes(data[i].plane.airline)) {
				unique.push(data[i].plane.airline);
			}
		}
		return unique;
	}

	// slider篩選時間
	const slider = document.getElementById('slider');
	const rangeDisplay = document.getElementById('selectedRange');

	noUiSlider.create(slider, {
		start: [0, 24],
		connect: true,
		range: {
			'min': 0,
			'max': 24
		},
		step: 1,
		format: {
			to: function(value) {
				return Math.round(value);
			},
			from: function(value) {
				return Number(value);
			}
		}
	});

	slider.noUiSlider.on('update', function(values) {
		rangeDisplay.textContent = `${values[0]} - ${values[1]}`;
		applyFilters();
	});

	// checkbox篩選航空公司
	function airline_choice(airline, data) {
		const airline_choice = document.getElementById('airline_container');
		const input = document.createElement('div');
		input.classList.add('airline_choice');
		input.setAttribute('id', 'airline_choice');
		let input_choice = '';

		input_choice += '<input type="checkbox" id="select_all" class="checkbox_all" checked><label for="select_all">全選</label><br>';

		for (let i = 0; i < airline.length; i++) {
			input_choice += '<input type="checkbox" class="checkbox" checked id="' + airline[i] + '" value="' + airline[i] + '">';
			input_choice += '<label for="' + airline[i] + '">' + airline[i] + '</label><br>';
		}

		input.innerHTML = input_choice;
		airline_choice.appendChild(input);

		const checkboxes = document.querySelectorAll('.checkbox');

		checkboxes.forEach(checkbox => {
			checkbox.addEventListener('change', function() {
				applyFilters();
			});
		});

		const selectAllCheckbox = document.getElementById('select_all');
		selectAllCheckbox.addEventListener('change', function() {
			const isChecked = this.checked;
			checkboxes.forEach(checkbox => {
				checkbox.checked = isChecked;
			});
			applyFilters();
		});

		loadChoice(data);
	}

	function getSelectedAirlines() {
		const selected = [];
		const checkboxes = document.querySelectorAll('.checkbox:checked');
		checkboxes.forEach(checkbox => {
			selected.push(checkbox.value);
		});
		return selected;
	}

	function filterData(data, minTime, maxTime, selectedAirlines) {
		return data.filter(flight => {
			const flightStartTime = Number(flight.plane.time_start.slice(0, 2));
			const airlineMatch = selectedAirlines.includes(flight.plane.airline);
			const timeMatch = flightStartTime >= Number(minTime) && flightStartTime <= Number(maxTime);
			return airlineMatch && timeMatch;
		});
	}

	// 有篩選動作便重新load
	function applyFilters() {
		const selectedAirlines = getSelectedAirlines();
		const sliderValues = slider.noUiSlider.get();
		const filteredData = filterData(totalResults, sliderValues[0], sliderValues[1], selectedAirlines);
		const selectedSortMethod = getSortMethod();
		const sortedData = sortBy(filteredData, selectedSortMethod);
		loadChoice(sortedData);
	}

	document.getElementById('confirmReturn').addEventListener('click', () => {
		window.location.href = '/orders/order';
	})

	if (JSON.parse(localStorage.getItem('selectedFlights')).length == 1) document.getElementById('section_title').innerHTML = '選擇回程';
});