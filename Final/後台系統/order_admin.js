document.addEventListener("DOMContentLoaded", function () {
	function Back_LeftSide() {
		const back_leftside = document.createElement("div");
		back_leftside.id = "Backstage_LeftInSide";
		back_leftside.innerHTML = `
      <div id="Backstage_LeftMember">會員管理</div>
      <div id="Backstage_LeftOrder">訂單管理</div>
      <div id="Backstage_LeftForum">論壇管理</div>
        `;
		document.getElementById("Backstage_LeftSide").innerHTML = '';
		document.getElementById("Backstage_LeftSide").appendChild(back_leftside);
		member_click_LeftSide();
	}

	function member_click_LeftSide() {
		document
			.getElementById("Backstage_LeftMember")
			.addEventListener("click", function () {
				window.location = "./member_admin.html"
			});

		document
			.getElementById("Backstage_LeftOrder")
			.addEventListener("click", function () {
				window.location = "./order_admin.html"
			});

		document
			.getElementById("Backstage_LeftForum")
			.addEventListener("click", function () {
				window.location = "./forum_admin.html"
			});
	}
	Back_LeftSide();
});




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

	        if (orderNumber) {
	            
	            searchOrder(orderNumber);
	        } else {
	            
	            filterOrdersByStatus();
	        }
	    } else {
	        console.error('The order number input element was not found.');
	    }
	});

	
	document.querySelectorAll('input[name="orderStatus"]').forEach(statusInput => {
	    statusInput.addEventListener('change', function() {
	       
	        filterOrdersByStatus();
	    });
	});

	
	function searchOrder(orderNumber) {
	   
	    let filteredOrders = orders.filter(order => order.orderNumber.includes(orderNumber));


	    const selectedStatus = document.querySelector('input[name="orderStatus"]:checked')?.value;
	    if (selectedStatus) {
	        filteredOrders = filteredOrders.filter(order => order.orderStatus === selectedStatus);
	    }

	    if (filteredOrders.length > 0) {
	        renderOrders(filteredOrders);
	    } else {
	        console.log('No orders found for the given order number and status.');
	        renderNoOrdersFound(); 
	    }
	}

	
	function filterOrdersByStatus() {
	    
	    const selectedStatus = document.querySelector('input[name="orderStatus"]:checked')?.value;
	    let filteredOrders = orders;

	    if (selectedStatus) {
	        filteredOrders = orders.filter(order => order.orderStatus === selectedStatus);
	    }

	    
	    const orderNumber = orderNumberInput.value.trim();
	    if (orderNumber) {
	        filteredOrders = filteredOrders.filter(order => order.orderNumber.includes(orderNumber));
	    }

	    if (filteredOrders.length > 0) {
	        renderOrders(filteredOrders);
	    } else {
	        renderNoOrdersFound(); 
	    }
	}

	
	function renderNoOrdersFound() {
	    ordersTable.innerHTML = '<tr><td colspan="5" style="text-align: center;">沒有找到符合的訂單</td></tr>';
	}

	
	function fetchOrders() {
	    fetch('/orders/order_admin_json')
	        .then(response => {
	            if (!response.ok) {
	                throw new Error('Network response was not ok ' + response.statusText);
	            }
	            return response.json();
	        })
	        .then(data => {
	            console.log('Fetched all orders:', data);
	            orders = data;
	            renderOrders(data); 
	        })
	        .catch(error => console.error('Error fetching all orders:', error));
	}
	
	
	function renderNoOrdersFound() {
		    ordersTable.innerHTML = '<tr><td colspan="5" style="text-align: center;">沒有找到符合的訂單</td></tr>';
		}


	
	function renderOrders(orderList) {
	    ordersTable.innerHTML = ''; 

	    orderList.forEach(order => {
	        let row = `<tr>
	                        <td>${order.orderNumber}</td>
	                        <td style="text-align: right;">${order.contactName}</td>
	                        <td style="text-align: right;">${order.finalPrice}</td>
	                        <td style="text-align: center;">${order.createDate}</td>
	                        <td style="text-align: center;">${order.orderStatus}</td>
	                   </tr>`;
	        ordersTable.innerHTML += row;
	    });
	}

	
	fetchOrders();
	
	function sortOrders() {

		let sortedOrders = [...orders];

		const orderDateSort = document.getElementById('orderDateSort').value;

		const selectedStatus = document.querySelector('input[name="orderStatus"]:checked').value;
		if (selectedStatus) {
			sortedOrders = sortedOrders.filter(order => order.orderStatus === selectedStatus);
		}


		sortedOrders.sort((a, b) => {
		        const dateA = new Date(a.createDate);
		        const dateB = new Date(b.createDate);
		        if (orderDateSort === 'newest') {
		            return dateB - dateA;
		        } else {
		            return dateA - dateB;
		        }
		    });

		    if (sortedOrders.length > 0) {
		        renderOrders(sortedOrders);
		    } else {
		        renderNoOrdersFound(); // 顯示「沒有符合條件的訂單」
		    }
	}


	document.querySelectorAll('input[name="orderStatus"]').forEach(statusInput => {
		statusInput.addEventListener('change', function () {
			sortOrders();
		});
	});

	document.getElementById('orderDateSort').addEventListener('change', sortOrders);
