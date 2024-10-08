
    document.addEventListener('DOMContentLoaded', function () {
        var modal = document.getElementById("myModal");
        var btn = document.getElementById("view_details");
        var span = document.getElementsByClassName("close")[0];
        btn.onclick = function () {
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });



	/*-------------------------------------------------------------------------------*/
	

    document.addEventListener('DOMContentLoaded', function () {
        const passengerContainer = document.getElementById('passenger_container');
        const luggageContainer = document.getElementById('luggage_container');
        const priceLuggageElement = document.getElementById('price_luggage');
        const ticketPriceElement = document.getElementById('ticket_price');
        const finalPriceElement = document.getElementById('final_price');
        const priceTotalElement = document.getElementById('price_total');
        const mainTicketPriceElement = document.getElementById('main_ticket_price')
		
		
			
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
		
		
		function bindBlurEvents(){
			document.querySelectorAll('input, select').forEach(input => {
				input.addEventListener('blur', function(){
					validateField(input);
				});
			});
		}
		

        document.getElementById('add_passenger').addEventListener('click', function () {
            const newSection = passengerContainer.querySelector('.form_section').cloneNode(true);
            const newLuggageSection = luggageContainer.querySelector('.luggageform_section').cloneNode(true);
            const deleteButton = newSection.querySelector('.delete_btn');

            deleteButton.style.display = 'block';
            deleteButton.addEventListener('click', function () {
                passengerContainer.removeChild(newSection);
                luggageContainer.removeChild(newLuggageSection);
                updatePassengerNumbers();
                updateLuggageNumbers();
                updatePrice();
            });
            
            newSection.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]').forEach(input=>{
            	input.value='';
            });
            
            newSection.querySelectorAll('[id]').forEach(input=>{
            	input.removeAttribute('id');
            })
			
			newSection.querySelectorAll('span').forEach(span => {
			            span.remove(); // 移除所有現有的錯誤訊息
			        });
            
            const newSelectElements = newLuggageSection.querySelectorAll('.label_addluggage');
            newSelectElements.forEach(selectElement => {
                selectElement.addEventListener('change', updatePrice);
            });
            
            passengerContainer.appendChild(newSection);
            luggageContainer.appendChild(newLuggageSection);
            updatePassengerNumbers();
            updateLuggageNumbers();
            updatePrice();  
			
			
			bindBlurEvents();
        });

        document.querySelectorAll('.form_section').forEach(section => {
            section.querySelector('.delete_btn').style.display = 'none';
        });
        
        updatePassengerNumbers();
        updateLuggageNumbers();
        updatePrice();
		
		bindBlurEvents();

        const allSelectElements = document.querySelectorAll('.label_addluggage');
        allSelectElements.forEach(selectElement => {
            selectElement.addEventListener('change', updatePrice); 
        });
    });

	
	
	
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
	       	
	           if (name.startsWith('contact')){
	           	console.log('發送的數據:', requestData);
	           	response = await fetch('/validation/validateContact', {
	                   method: 'POST',
	                   headers: { 'Content-Type': 'application/json' },
	                   body: JSON.stringify(requestData)
	               });
	           }else if(name.startsWith('lastname') || name.startsWith('firstname') || name.startsWith('idnumber')){
	           	response = await fetch('/validation/validatePassenger', {
	                   method: 'POST',
	                   headers: { 'Content-Type': 'application/json' },
	                   body: JSON.stringify(requestData)
	               });
	           }else {
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
	           }else {
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
	   
	   
	   

	      async function validateContactFields(){
	          const contactFields = ['contact_name', 'contact_phone', 'contact_email'];
	          let allValid = true;
	          for(const field of contactFields) {
	              const input = document.getElementById(field);
	              const isValid = await validateField(input);
	              if (!isValid) {
	                  allValid = false;
	              }
	          }
	          return allValid;
	      }

	      async function validatePassengerFields(){
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
	      }
		  
	
	
document.addEventListener('DOMContentLoaded', function () {
    const passengerContainer = document.getElementById('passenger_container');
	
    const luggageContainer = document.getElementById('luggage_container');
    
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('blur', function () {
            validateField(input);
        });
        
    });
    
	const nextStepButton = document.getElementById('next_step');
    if (nextStepButton) {
        nextStepButton.addEventListener('click', async function (event) {
            event.preventDefault();
            
        
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
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(contactData)
                });

                if (!contactResponse.ok) throw new Error ('Contact submission failed');
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

           
                const passengerResponse = await fetch('/passenger/createpassenger', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json' },
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
    }else{
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

            console.log(`旅客 ${i+1}資料:`, passenger);
            passengers.push(passenger);
        }
        return passengers;
    }
    
    function createOrderData(contactId){
    	const finalPriceElement = document.getElementById('final_price');
        const finalPrice = finalPriceElement ? parseFloat(finalPriceElement.value) || 0 : 0;
        return{
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
        

