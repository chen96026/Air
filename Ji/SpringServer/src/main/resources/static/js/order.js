document.addEventListener('DOMContentLoaded', function() {
	var modal = document.getElementById("myModal");
	var btn = document.getElementById("view_details");
	var span = document.getElementsByClassName("close")[0];
	btn.onclick = function() {
		modal.style.display = "block";
	}
	span.onclick = function() {
		modal.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
});



/*-------------------------------------------------------------------------------*/


document.addEventListener('DOMContentLoaded', function() {
	
	// 顯示訂單
	const weekday = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
	function getday(flight_date) {
		let date = new Date(flight_date);
		return date.getDay();
	}

	const flight_start = JSON.parse(localStorage.getItem('selectedFlights'))[0];
	const flight_end = JSON.parse(localStorage.getItem('selectedFlights2'));
	const container = document.getElementById('container');
	const order_details = document.createElement('div');
	order_details.innerHTML = `
					<div class="box">
		                    <div style="font-weight: bold;">
		                    	<span id="departure_city">${flight_end.city}</span>-><span id="arrival_city">${flight_start.city}</span>
		                    </div>
		                    <div style="display: flex;padding:20px 0">
		                        <div
		                            style="background-color: #f8b600; color:white; margin: 0 5px; padding: 0 10px; border-radius: 5px;">
		                            去程</div>
		                        <div><span >${flight_start.plane.date_start.slice(5, 7).replace(/^0/, '')}月${flight_start.plane.date_start.slice(8, 10).replace(/^0/, '')}日</span> <span>${weekday[getday(flight_start.plane.date_start)]}</span>｜</div>
		                        <div>所需時間: ${Math.floor(flight_start.duration / 60)}小時${flight_start.duration % 60}分</div>
		                    </div>
		                    <div style="display: flex; gap: 30px;">
		                        <div style="display:grid; justify-items: center;gap: 20px;">
		                            <div>${flight_start.plane.time_start.slice(0, 5)}</div>
		                            <div>${flight_start.plane.airline}</div>
		                            <div>${flight_start.plane.time_end.slice(0, 5)}</div>
		                        </div>
		                        <div style="display:grid; justify-content:center; gap: 20px;">
		                            <span class="material-symbols-outlined">more_vert</span>
		                            <span class="material-symbols-outlined">more_vert</span>
		                            <span class="material-symbols-outlined">more_vert</span>
		                        </div>
		                        <div style="display: grid; justify-content: center;gap: 20px;">
		                            <div>${flight_start.plane.des_start}${flight_end.city} ${flight_end.airport_name}</div>
		                            <div>${flight_start.plane.type} ${flight_start.seat}</div>
		                            <div>${flight_start.plane.des_end}${flight_start.city} ${flight_start.airport_name}</div>
		                        </div>

		                    </div>
		                </div>
		                <hr style="border: none; border-top: 5px dashed rgba(34, 34, 34, 0.9);">
		                <div class="box">
		                    <div style="font-weight: bold;">
								<span id="departure_city">${flight_start.city}</span>-><span id="arrival_city">${flight_end.city}</span>
							</div>
		                    <div style="display: flex;padding:20px 0">
		                        <div
		                            style="background-color: #f8b600; color:white;margin: 0 5px; padding: 0 10px; border-radius: 5px;">
		                            回程</div>
									<div><span >${flight_end.plane.date_start.slice(5, 7).replace(/^0/, '')}月${flight_end.plane.date_start.slice(8, 10).replace(/^0/, '')}日</span> <span>${weekday[getday(flight_end.plane.date_start)]}</span>｜</div>
									<div>所需時間: ${Math.floor(flight_end.duration / 60)}小時${flight_end.duration % 60}分</div>
		                    </div>
		                    <div style="display: flex; gap: 30px;">
		                        <div style="display:grid; justify-items: center;gap: 20px;">
									<div>${flight_end.plane.time_start.slice(0, 5)}</div>
									<div>${flight_end.plane.airline}</div>
									<div>${flight_end.plane.time_end.slice(0, 5)}</div>
		                        </div>
		                        <div style="display:grid; justify-content:center;gap: 20px;">
		                            <span class="material-symbols-outlined">more_vert</span>
		                            <span class="material-symbols-outlined">more_vert</span>
		                            <span class="material-symbols-outlined">more_vert</span>
		                        </div>
		                        <div style="display: grid; justify-content: center;gap: 20px;">
									<div>${flight_end.plane.des_start}${flight_start.city} ${flight_start.airport_name}</div>
									<div>${flight_end.plane.type} ${flight_end.seat}</div>
									<div>${flight_end.plane.des_end}${flight_end.city} ${flight_end.airport_name}</div>
		                        </div>
		                    </div>
		                </div>
		`
	container.appendChild(order_details);


	const passengerContainer = document.getElementById('passenger_container');
	const luggageContainer = document.getElementById('luggage_container');
	const priceLuggageElement = document.getElementById('price_luggage');
	const ticketPeople = document.getElementById('ticket_people');
	const ticketPriceElement = document.getElementById('ticket_price');
	const finalPriceElement = document.getElementById('final_price');
	const priceTotalElement = document.getElementById('price_total');
	const mainTicketPriceElement = document.getElementById('main_ticket_price');
	
	const passengerForm = document.querySelector('.form_section');
	const luggageForm = document.querySelector('.luggageform_section');

	// 票價 
	let human = flight_start.quantity;
	ticketPeople.innerHTML = `機票 (${human}位成人)`
	if(flight_start.seat === '經濟艙'){
		ticketPriceElement.innerHTML = `NT$ ${Number(flight_start.plane.eco_price)*human+Number(flight_end.plane.eco_price)*human}`	
	}else{
		ticketPriceElement.innerHTML = `NT$ ${Number(flight_start.plane.bus_price)*human+Number(flight_end.plane.bus_price)*human}`			
	}
	

	function updatePassengerNumbers() {
		const sections = passengerContainer.querySelectorAll('.form_section');
		sections.forEach((section, index) => {
			section.querySelector('div').textContent = `旅客${index + 1}(成人票)`;
			section.querySelectorAll('input, select').forEach(input => {
				const name = input.getAttribute('name');
				if (name) {
					input.setAttribute('name', `${name.split('_')[0]}_${index}`);
				}
			});
		});
	}

	function updateLuggageNumbers() {
		const luggageSections = luggageContainer.querySelectorAll('.luggageform_section');
		luggageSections.forEach((luggageSection, index) => {
			luggageSection.querySelector('div').textContent = `旅客${index + 1} 行李:`;
		});
	}

	function updatePrice() {
		const selectElements = document.querySelectorAll('select.label_addluggage');
		let totalLuggagePrice = 0;
		selectElements.forEach(selectElement => {
			const selectedOption = selectElement.options[selectElement.selectedIndex];
			const priceTextMatch = selectedOption.textContent.match(/NT\$\d+,\d+/);

			if (priceTextMatch) {
				totalLuggagePrice += parseInt(priceTextMatch[0].replace('NT$', '').replace(',', ''), 10);
			}
		});

		priceLuggageElement.textContent = totalLuggagePrice > 0 ? `NT$${totalLuggagePrice.toLocaleString()}` : '免費';


		const ticketPrice = parseInt(ticketPriceElement.textContent.replace('NT$', '').replace(',', ''), 10);
		const finalPrice = ticketPrice + totalLuggagePrice;

		mainTicketPriceElement.textContent = `NT$${finalPrice.toLocaleString()}`;
		priceTotalElement.textContent = `NT$${finalPrice.toLocaleString()}`;
		finalPriceElement.value = finalPrice;
	}


	function bindBlurEvents() {
		document.querySelectorAll('input, select').forEach(input => {
			input.addEventListener('blur', function() {
				validateField(input);
			});
		});
	}

	
	refreshPassengerAndLuggage();

	function refreshPassengerAndLuggage() {
	
	    passengerContainer.innerHTML = '';
	    luggageContainer.innerHTML = '';

	    for (let i = 0; i < human; i++) {
	        const newSection = passengerForm.cloneNode(true);
	        const newLuggageSection = luggageForm.cloneNode(true);

	        newSection.removeAttribute('id');
	        newLuggageSection.removeAttribute('id');

	        newSection.querySelector('div').textContent = `旅客${i + 1} 成人票`;
	        newSection.querySelectorAll('input, select').forEach(input => {
	            const name = input.getAttribute('name');
	            if (name) {
	                input.setAttribute('name', `${name.split('_')[0]}_${i}`);
	            }
	        });

	        newLuggageSection.querySelector('div').textContent = `旅客${i + 1} 行李:`;
	        newLuggageSection.querySelectorAll('.label_addluggage').forEach(selectElement => {
	            selectElement.addEventListener('change', updatePrice);
	        });

	        passengerContainer.appendChild(newSection);
	        luggageContainer.appendChild(newLuggageSection);

	        console.log(`Generating form for passenger ${i + 1}`);
	    }
	}
	updatePrice();
	bindBlurEvents();


/*-------------------------------------------------------------------------------*/



async function validateField(input) {
	const name = input.name;
	const value = input.value.trim();
	let errorMessage = '';


	const requestData = {
		[name.split('_')[0]]: value  // 只傳遞不帶索引的欄位名稱
	};

	try {

		let response;

		if (name.startsWith('contact')) {
			console.log('發送的數據:', requestData);
			response = await fetch('/validation/validateContact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(requestData)
			});
		} else if (name.startsWith('lastname') || name.startsWith('firstname') || name.startsWith('idnumber')) {
			response = await fetch('/validation/validatePassenger', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(requestData)
			});
		} else {
			return true;
		}

		if (!response.ok) {
			const errors = await response.json();
			const actualName = name.split('_')[0];

			console.log('後端返回的錯誤:', errors);

			// 查找對應的錯誤訊息
			if (errors[actualName]) {
				errorMessage = errors[actualName];
			}
		} else {
			errorMessage = '';
		}

	} catch (error) {
		console.error('驗證過程中出現問題：', error);
	}

	if (errorMessage) {
		showFieldError(name, errorMessage);
		return false;
	} else {
		clearFieldError(name);
		return true;
	}
}




async function validateContactFields() {
	const contactFields = ['contact_name', 'contact_phone', 'contact_email'];
	let allValid = true;
	for (const field of contactFields) {
		const input = document.getElementById(field);
		const isValid = await validateField(input);
		if (!isValid) {
			allValid = false;
		}
	}
	return allValid;
}

async function validatePassengerFields() {
	const passengerFields = ['lastname', 'firstname', 'idnumber'];
	let allValid = true;
	const sections = document.querySelectorAll('.form_section');
	for (let i = 0; i < sections.length; i++) {
		for (const field of passengerFields) {
			const input = sections[i].querySelector(`[name="${field}_${i}"]`);
			const isValid = await validateField(input);
			if (!isValid) {
				allValid = false;
			}
		}
	}
	return allValid;
}


function showFieldError(fieldName, message) {
	const inputElement = document.querySelector(`[name="${fieldName}"]`);

	if (!inputElement) {
		console.error(`Cannot find element with name: ${fieldName}`);
		return;
	}

	let errorSpan = inputElement.nextElementSibling;

	if (!errorSpan || errorSpan.tagName !== 'SPAN') {
		errorSpan = document.createElement('span');
		errorSpan.style.color = 'red';
		errorSpan.style.fontSize = '12px';
		inputElement.parentNode.appendChild(errorSpan);
	}

	errorSpan.textContent = message;
}

function clearFieldError(fieldName) {
	let inputElement = document.querySelector(`[name="${fieldName}"]`);
	if (!inputElement) {
		console.error(`Cannot find element with name: ${fieldName}`);
		return;
	}
	let errorSpan = inputElement.nextElementSibling;
	if (errorSpan && errorSpan.tagName === 'SPAN') {
		errorSpan.textContent = '';
	}
};



// document.addEventListener('DOMContentLoaded', function() {

	//const passengerContainer = document.getElementById('passenger_container');

	//const luggageContainer = document.getElementById('luggage_container');

	document.querySelectorAll('input, select').forEach(input => {
		input.addEventListener('blur', function() {
			validateField(input);
		});

	});

	// 付款完成後,再update到資料庫
	const nextStepButton = document.getElementById('next_step');

	
	if (nextStepButton) {
		nextStepButton.addEventListener('click', async function(event) {
			event.preventDefault();
			console.log('Next Step button clicked!');

			try {
				const isContactValid = await validateContactFields();
				const isPassengerValid = await validatePassengerFields();

				if (!isContactValid || !isPassengerValid) {
					alert('請修正表單中的錯誤再提交。');
					return;
				}

				const contactData = {
					contactName: document.getElementById('contact_name').value,
					contactPhone: document.getElementById('contact_phone').value,
					contactEmail: document.getElementById('contact_email').value,
				};
				const contactResponse = await fetch('/orders/createContact', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(contactData)
				});

				if (!contactResponse.ok) throw new Error('Contact submission failed');
				const { cid } = await contactResponse.json();
				console.log('獲取的 contactId:', cid);

				// createOrderData 並獲取 orderId
				const orderData = createOrderData(cid);
				const orderResponse = await fetch('/orders/createOrder', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(orderData)
				});

				if (!orderResponse.ok) throw new Error('Order submission failed');
				const { oid } = await orderResponse.json();
				console.log("Order ID:", oid);

				const passengerData = createPassengerData(cid);

				const passengerOrderRequest = {
					passengers: passengerData,
					orderId: oid
				};
				
				try {
				    const contactResponse = await fetch('/orders/createContact', {
				        method: 'POST',
				        headers: { 'Content-Type': 'application/json' },
				        body: JSON.stringify(contactData)
				    });
				    if (!contactResponse.ok) throw new Error('Contact submission failed');
				    const { cid } = await contactResponse.json();
				    console.log('獲取的 contactId:', cid);
				} catch (error) {
				    console.error('聯絡人資料提交失敗：', error);
				    alert('聯絡人資料提交失敗：' + error.message);
				    return;  // 阻止後續操作
				}

				const passengerResponse = await fetch('/passenger/createpassenger', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(passengerOrderRequest)
				});

				if (!passengerResponse.ok) throw new Error('Passenger submission failed');


				const passengerResponseData = await passengerResponse.json();
				console.log("Passenger response data:", passengerResponseData);

				const savedPassengerIds = passengerResponseData.map(passenger => passenger.pid);
				console.log("Passenger IDs:", savedPassengerIds);

				await submitLuggageData(oid, savedPassengerIds);

				alert('所有資料已提交');
				window.location.href = `/orders/Complete/${oid}`;
			} catch (error) {
				console.error('資料提交過程中出現問題：', error);
				alert('提交失敗：' + error.message);
			}
		});
	} else {
		console.error('next_step not found');
	}

	function createPassengerData(contactId, orderId) {
		const passengers = [];
		const sections = document.querySelectorAll('.form_section');
		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];

			const lastNameInput = section.querySelector(`[name="lastname_${i}"]`);
			const firstNameInput = section.querySelector(`[name="firstname_${i}"]`);
			const genderInput = section.querySelector(`[name="gender_${i}"]`);
			const birthdayInput = section.querySelector(`[name="dob_${i}"]`);
			const countryInput = section.querySelector(`[name="country_${i}"]`);
			const idTypeInput = section.querySelector(`[name="idtype_${i}"]`);
			const idNumberInput = section.querySelector(`[name="idnumber_${i}"]`);
			const idDateInput = section.querySelector(`[name="dop_${i}"]`);

			if (!lastNameInput || !firstNameInput || !genderInput || !birthdayInput || !countryInput || !idTypeInput || !idNumberInput || !idDateInput) {
				console.error(`旅客 ${i + 1} 的某些欄位沒有找到`);
				return passengers;
			}

			const passenger = {
				lastName: lastNameInput.value,
				firstName: firstNameInput.value,
				gender: genderInput.value,
				birthday: birthdayInput.value,
				country: countryInput.value,
				idType: idTypeInput.value,
				idNumber: idNumberInput.value,
				idDate: idDateInput.value,
				contactId: contactId,
				orderId: orderId
			};

			console.log(`旅客 ${i + 1}資料:`, passenger);
			passengers.push(passenger);
		}
		return passengers;
	}

	function createOrderData(contactId) {
		const finalPriceElement = document.getElementById('final_price');
		const finalPrice = finalPriceElement ? parseFloat(finalPriceElement.value) || 0 : 0;
		return {
			orderNumber: 'OD' + new Date().getTime(),
			contactId: contactId,
			finalPrice: finalPrice
		};

	}


	async function submitLuggageData(orderId, passengerIds) {
		const luggageData = [];
		const luggageSections = document.querySelectorAll('.luggageform_section');

		luggageSections.forEach((luggageSection, index) => {
			const tripType = luggageSection.dataset.tripType;
			const luggageOption1 = luggageSection.querySelector('#add_luggage_1').value;
			const luggageOption2 = luggageSection.querySelector('#add_returnluggage_2').value;

			const passengerId = passengerIds[index];
			if (passengerId === undefined) {
				console.error(`Passenger ID at index ${index} is undefined.`);
				return;
			}

			if (index < 0 || index >= passengerIds.length) {
				console.error(`Index ${index} is out of bounds for passengerIds.`);
				return;
			}

			if (luggageOption1 !== "add_lg") {
				luggageData.push({
					tripType: "OUTBOUND",
					addLuggage: luggageOption1,
					lgprice: getLuggagePrice(luggageOption1),
					passenger: { pid: passengerId },
					orders: { oid: orderId }
				});
			}

			if (luggageOption2 !== "add_lg") {
				luggageData.push({
					tripType: "RETURN",
					addLuggage: luggageOption2,
					lgprice: getLuggagePrice(luggageOption2),
					passenger: { pid: passengerId },
					orders: { oid: orderId }
				});
			}
		});

		const luggageResponse = await fetch('/luggage/createluggages', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(luggageData)
		});

		if (!luggageResponse.ok) throw new Error('Luggage submission failed');
	}


	function getLuggagePrice(optionValue) {
		switch (optionValue) {
			case 'non_lg':
				return 0;
			case 'one_lg':
				return 1224;
			case 'two_lg':
				return 1698;
			case 'three_lg':
				return 2171;
			default:
				return 0;
		}
	}
});