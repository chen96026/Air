const LoginOrMember = document.getElementById('LoginOrMember');
if (localStorage.getItem('uid') != null) {
	LoginOrMember.innerHTML = `<a href="/member_page"><img src="./assets/member.png"></a>`
} else {
	LoginOrMember.innerHTML = `<a href="/login"><img src="./assets/login.png"></a>`
}

const s = document.createElement('div');
s.className = 'search_section_container search_header_container';
s.setAttribute("id", "home")
s.innerHTML = `	
				<div class="search_header_form">
					<div>
						<button class="search_bar" id="search_bar_button"
							th:utext="${'openBtnValue'}"></button>
					</div>
					<form id="search_form" th:action="@{/search_page}" method="get">
						<div class="search_input_group">
							<label for="search_country_start">出發地</label> <input type="text"
								placeholder="國家" id="search_country_start" autocomplete="off" />
						</div>
						<div class="search_input_group">
							<label for="search_country_end">目的地</label> <input type="text"
								placeholder="國家" id="search_country_end" autocomplete="off" />
						</div>
						<div class="search_input_group">
							<label for="departureDate">出發</label> <input type="text"
								id="departureDate" placeholder="新增日期" readonly>
						</div>
						<div class="search_input_group">
							<label for="returnDate">回程</label> <input type="text"
								id="returnDate" placeholder="新增日期" readonly>
						</div>
						<div class="search_input_group">
							<label for="quantityInput">旅客</label> <input type="text"
								id="quantityInput" placeholder="選擇人數" readonly>
						</div>
						<button class="search_btn" id="search_btn">搜尋</button>
					</form>
					<div id="suggestions"></div>
					<!--選單-->
					<div class="quantity-container">
						<div id="quantityBox" class="quantity-box">
							<div class="quantity-item">
								<span>客艙等級</span> <select id="quantityRoom">
									<option selected>經濟艙</option>
									<option>商務艙</option>
								</select>
							</div>
							<div class="quantity-item">
								<span>成人</span>
								<button class="quantity-btn" data-type="adult"
									data-action="decrease">-</button>
								<span class="quantity-number" data-type="adult">0</span>
								<button class="quantity-btn" data-type="adult"
									data-action="increase">+</button>
							</div>
							<div
								style="color: #8e8e8e; margin-left: 1vw; margin-bottom: 10px;">年滿18歲</div>
							<div class="quantity-item">
								<span>青年</span>
								<button class="quantity-btn" data-type="teen"
									data-action="decrease">-</button>
								<span class="quantity-number" data-type="teen">0</span>
								<button class="quantity-btn" data-type="teen"
									data-action="increase">+</button>
							</div>
							<div
								style="color: #8e8e8e; margin-left: 1vw; margin-bottom: 10px;">12
								~ 18歲</div>
							<div class="quantity-item">
								<span>兒童</span>
								<button class="quantity-btn" data-type="child"
									data-action="decrease">-</button>
								<span class="quantity-number" data-type="child">0</span>
								<button class="quantity-btn" data-type="child"
									data-action="increase">+</button>
							</div>
							<div
								style="color: #8e8e8e; margin-left: 1vw; margin-bottom: 10px;">2
								~ 12歲</div>
							<div class="quantity-item">
								<span>嬰兒</span>
								<button class="quantity-btn" data-type="baby"
									data-action="decrease">-</button>
								<span class="quantity-number" data-type="baby">0</span>
								<button class="quantity-btn" data-type="baby"
									data-action="increase">+</button>
							</div>
							<div
								style="color: #8e8e8e; margin-left: 1vw; margin-bottom: 10px;">2歲以下</div>
							<div id="quantityWarning" style="color: red; margin-left: 1vw;"></div>
							<button id="confirmBtn" class="confirm-btn">套用</button>
						</div>
					</div>
				</div>
			</div> `;
const search_header = document.getElementById('search_header');
search_header.append(s)


// 搜尋欄位控制
const country_start = document.getElementById('search_country_start');
const country_end = document.getElementById('search_country_end');
const date_start = document.getElementById('departureDate');
const date_end = document.getElementById('returnDate');
const people = document.getElementById('quantityInput');
const search = document.getElementById('search_btn');

document.addEventListener('DOMContentLoaded', function() {
	const openBtn = document.getElementById('search_bar_button');
	const closeBtn = document.getElementById('overlay');
	const form = document.getElementById('search_form');

	if (openBtn.innerHTML.trim() === '') openBtn.innerHTML = '點此安排行程';

	const checkFormFields = () => {
		const isValid = country_start.value.trim() !== '' && country_end.value.trim() !== '' && date_start.value.trim() !== '' && date_end.value.trim() !== '' && people.value.trim() !== '';
		search.disabled = !isValid;
	};
	[country_start, country_end, date_start, date_end, people].forEach(input => {
		input.addEventListener('input', checkFormFields);
	});
	checkFormFields();

	openBtn.addEventListener('click', function() {
		form.style.display = 'flex';
		openBtn.style.display = 'none';
		closeBtn.style.display = 'block';
	});

	closeBtn.addEventListener('click', function() {
		form.style.display = 'none';
		openBtn.style.display = 'block';
		closeBtn.style.display = 'none';
	})

	search.addEventListener('click', function(event) {
		localStorage.removeItem('selectedFlights');
		event.preventDefault();
		openBtnValue = '<img src="./assets/search.png" class="search_icon"></img>' + country_start.value + '-' + country_end.value + ' · ' + date_start.value + '-' + date_end.value + ' · ' + people.value;

		openBtn.innerHTML = openBtnValue;
		form.style.display = 'none';
		openBtn.style.display = 'block';
		closeBtn.style.display = 'none';

		const date_start_obj = new Date(date_start.value);
		const date_end_obj = new Date(date_end.value);
		date_start_obj.setDate(date_start_obj.getDate() + 1);
		date_end_obj.setDate(date_end_obj.getDate() + 1);

		let eco_quantity = 0;
		let bus_quantity = 0;
		people.value.slice(-3) == '經濟艙' ? eco_quantity = Number(people.value.replace(/\D/g, '')) : bus_quantity = Number(people.value.replace(/\D/g, ''));

		let searchPage;

		const urlParams = new URLSearchParams();
		urlParams.append('openBtnValue', openBtnValue);
		urlParams.append('des_start', country_start.value);
		urlParams.append('des_end', country_end.value);
		urlParams.append('date_start', date_start_obj.toISOString().split('T')[0]);
		urlParams.append('date_end', date_end_obj.toISOString().split('T')[0]);
		urlParams.append('eco_quantity', eco_quantity);
		urlParams.append('bus_quantity', bus_quantity);

		if (country_end.value === '世界各地') {
			const url = new URL('http://localhost:8890/search_page');
			url.search = urlParams.toString();
			window.location.href = url.toString();
		} else {
			fetch('http://localhost:8890/plane/check_country', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ country: country_end.value })
			})
				.then(response => response.json())
				.then(data => {
					console.log(data);

					searchPage = data.length !== 0 ? 'http://localhost:8890/search_page' : 'http://localhost:8890/search_page2';

					const url = new URL(searchPage);
					url.search = urlParams.toString();
					window.location.href = url.toString();
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	});
});

// 出發地與目的地輸入欄位的建議選項
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
	input.addEventListener('input', function() {
		const input = document.getElementById(this.id);
		const suggestionsDiv = document.getElementById('suggestions');
		const inputValue = input.value.toLowerCase();

		suggestionsDiv.innerHTML = '';

		if (inputValue) {
			fetch(`/plane/inputSearch?query=${inputValue}`)
				.then(response => response.json())
				.then(data => {
					console.log(data)
					data.forEach(item => {
						const suggestion = `${item.city}`;
						const div = document.createElement('div');
						div.textContent = `${item.country} - ` + suggestion;
						div.addEventListener('click', function() {
							input.value = suggestion;
							suggestionsDiv.style.display = 'none';
						});
						suggestionsDiv.appendChild(div);
					});
				})
				.catch(error => {
					console.error('Error fetching suggestions:', error);
				});
		}
	})
})

// 當點擊建議框外部時隱藏建議框
document.addEventListener('click', function(e) {
	const suggestionsDiv = document.getElementById('suggestions');
	if (!e.target.closest('#search_form') && !e.target.closest('#suggestions')) {
		suggestionsDiv.style.display = 'none';
	}
});

const search_form = document.getElementById('search_form');
search_form.addEventListener('click', function(e) {
	const suggestionsDiv = document.getElementById('suggestions');
	const inputValue = e.target.value.toLowerCase();
	suggestionsDiv.innerHTML = '';

	if (e.target.id == 'search_country_start') {
		suggestionsDiv.classList.remove("suggestions_country_start", "suggestions_country_end");
		suggestionsDiv.classList.add("suggestions_country_start");
	}
	if (e.target.id == 'search_country_end') {
		suggestionsDiv.classList.remove("suggestions_country_start", "suggestions_country_end");
		suggestionsDiv.classList.add("suggestions_country_end");
	}

	if (inputValue) {
		fetch(`/plane/inputSearch?query=${inputValue}`)
			.then(response => response.json())
			.then(data => {
				data.forEach(item => {
					const suggestion = `${item.city}`;
					const div = document.createElement('div');
					div.textContent = `${item.country} - ` + suggestion;
					div.addEventListener('click', function() {
						e.target.value = suggestion;
						suggestionsDiv.style.display = 'none';
					});
					suggestionsDiv.appendChild(div);
				});
			})
			.catch(error => {
				console.error('Error fetching suggestions:', error);
			});
	}

	if (!e.target.closest('#search_country_start') && !e.target.closest('#search_country_end')) {
		suggestionsDiv.style.display = 'none';
	} else {
		suggestionsDiv.style.display = 'block';
	}
});


document.addEventListener('DOMContentLoaded', function() {
	const departureDateInput = document.getElementById('departureDate');
	const returnDateInput = document.getElementById('returnDate');

	const datePicker = flatpickr(departureDateInput, {
		mode: "range",
		dateFormat: "Y-m-d",
		minDate: "2024-09-12",
		maxDate: "2025-12-31",
		showMonths: 2,
		closeOnSelect: false,
		locale: "zh",
		onChange: function(selectedDates) {
			if (selectedDates.length === 2) {
				departureDateInput.value = selectedDates[0].toLocaleDateString();
				returnDateInput.value = selectedDates[1].toLocaleDateString();
			}
		},
		onReady: function(selectedDates, dateStr, instance) {
			const submitBtn = document.createElement("button");
			submitBtn.innerText = "套用";
			submitBtn.id = "submitBtn";
			submitBtn.classList.add('btn', 'btn-primary');

			submitBtn.onclick = function() {
				const selectedDates = instance.selectedDates;
				if (selectedDates.length === 2) {
					departureDateInput.value = selectedDates[0].toLocaleDateString();
					returnDateInput.value = selectedDates[1].toLocaleDateString();
					instance.close();
				}
			};
			const line = document.createElement("hr");
			instance.calendarContainer.appendChild(line);
			instance.calendarContainer.appendChild(submitBtn);
		}
	});

	returnDateInput.addEventListener('focus', () => {
		datePicker.open();
	});

	departureDateInput.addEventListener('focus', () => {
		datePicker.open();
	});
});

document.addEventListener('DOMContentLoaded', function() {
	const quantityInput = document.getElementById('quantityInput');
	const quantityBox = document.getElementById('quantityBox');
	const confirmBtn = document.getElementById('confirmBtn');
	const quantityWarning = document.getElementById('quantityWarning');
	const quantityRoom = document.getElementById('quantityRoom');

	// 顯示或隱藏票數選單
	quantityInput.addEventListener('click', () => {
		toggleDisplay(quantityBox);
	});

	// 點擊增加或減少票數
	document.querySelectorAll('.quantity-btn').forEach(button => {
		button.addEventListener('click', () => updateQuantity(button));
	});

	// 確認票數
	confirmBtn.onclick = function() {
		const adultQuantity = getQuantity('adult');
		const teenQuantity = getQuantity('teen');
		const childQuantity = getQuantity('child');
		const babyQuantity = getQuantity('baby');
		const ticketTotal = adultQuantity + teenQuantity + childQuantity + babyQuantity;
		const roomNum = quantityRoom.selectedIndex;

		if (ticketTotal == 0) showWarning('票數不能為0!');
		else if (adultQuantity >= (childQuantity + babyQuantity)) {
			quantityInput.value = `票數: ${ticketTotal}位 , ${quantityRoom.options[roomNum].value}`;
			quantityInput.dispatchEvent(new Event('input'));
			quantityWarning.style.display = 'none';
			quantityBox.style.display = 'none';
		} else {
			showWarning('每位大人最多攜帶<br>一位兒童或嬰兒!');
		}
	};

	// 點擊外部隱藏票數選單
	document.addEventListener('click', function(event) {
		if (!quantityInput.contains(event.target) && !quantityBox.contains(event.target)) {
			quantityBox.style.display = 'none';
		}
	});

	// 更新票數
	function updateQuantity(button) {
		const type = button.getAttribute('data-type');
		const action = button.getAttribute('data-action');
		const quantityNumber = document.querySelector(`.quantity-number[data-type="${type}"]`);
		let currentValue = parseInt(quantityNumber.textContent);

		if (action === 'increase') {
			quantityNumber.textContent = currentValue + 1;
		} else if (action === 'decrease' && currentValue > 0) {
			quantityNumber.textContent = currentValue - 1;
		}
	}

	// 獲取指定類型的票數
	function getQuantity(type) {
		return Number(document.querySelector(`.quantity-number[data-type="${type}"]`).textContent);
	}

	// 顯示或隱藏元素
	function toggleDisplay(element) {
		element.style.display = element.style.display === 'block' ? 'none' : 'block';
	}

	// 顯示警告訊息
	function showWarning(message) {
		quantityWarning.style.display = 'block';
		quantityWarning.innerHTML = message;
	}
});