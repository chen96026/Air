
document.addEventListener('DOMContentLoaded', function(){
	let ordersTable = document.querySelector('#orderTableBody');
	let searchForm = document.querySelector('#orderSearchForm');
	let orderNumberInput = document.querySelector('#orderNumberInput')
	let orders = [];
	
	
		 function fetchOrders(orderNumber = '') {
		        let url = '/orders/order_admin_json';
		        if (orderNumber) {
		            url += `?orderNumber=${orderNumber}`; 
		        }

		        fetch(url)
		            .then(response => {
						console.log('Response status:', response.status); 
		                if (!response.ok) {
		                    throw new Error('Network response was not ok ' + response.statusText);
		                }
		                return response.json();
		            })
		            .then(data => {
						console.log('Fetched data:', data);
		                orders = data;
		                renderOrders(orders); 
		            })
		            .catch(error => console.error('Error fetching orders:', error));
		    }

			
			
		    function renderOrders(orderList) {
		        ordersTable.innerHTML = '';
				console.log('Rendering orders:', orderList); 

		        if (orderList.length === 0) {
		            ordersTable.innerHTML = '<tr><td colspan="5">沒有找到符合條件的訂單</td></tr>';
		            return;
		        }

		        orderList.forEach(order => {
		            let row = `<tr>
		                            <td>${order.orderNumber}</td>
		                            <td>${order.contactName}</td>
		                            <td>${order.finalPrice}</td>
		                            <td>${order.createDate}</td>
		                            <td>${order.orderStatus}</td>
		                       </tr>`;
							   
		            ordersTable.innerHTML += row;
		        });
		    }
			

		
			   searchForm.addEventListener('submit', function(event) {
			       event.preventDefault(); 
			       console.log('Form submitted');
			       if (orderNumberInput) {
			           let orderNumber = orderNumberInput.value.trim(); 
			           console.log('Searching for order number:', orderNumber); 
			       } else {
			           console.error('The order number input element was not found.');
			       }
			   });

			   
			   fetchOrders();

		    
		    function sortOrders() {
				
				let sortedOrders = [...orders];
					       
				const orderNumberSort = document.getElementById('orderNumberSort').value;
				const orderDateSort = document.getElementById('orderDateSort').value;
				
				
				
				const selectedStatus = document.querySelector('input[name="orderStatus"]:checked').value;
				if (selectedStatus){
					sortedOrders = sortedOrders.filter(order => order.orderStatus === selectedStatus);
				}
				
				
				
				sortedOrders.sort((a,b) =>{
					if(orderNumberSort === 'asc') {
						return a.orderNumber.localeCompare(b.orderNumber);
					}else{
						return b.orderNumber.localeCompare(a.orderNumber);
					}
				});
				
				
				
				sortedOrders.sort((a,b) => {
					const dateA = new Date(a.createDate);
					const dateB = new Date(b.createDate);
					if(orderDateSort === 'newest'){
						return dateB - dateA;
					}else{
						return dateA - dateB
					}
				});    
				renderOrders(sortedOrders);
			}
			
			
			document.querySelectorAll('input[name="orderStatus"]').forEach(statusInput => {
			    statusInput.addEventListener('change', function() {
			    sortOrders();
			     });
			});
			
			document.getElementById('orderNumberSort').addEventListener('change', sortOrders);
			document.getElementById('orderDateSort').addEventListener('change', sortOrders);
			
			
		});   
		
		