
document.addEventListener('DOMContentLoaded', function(){
	let ordersTable = document.querySelector('#orderTableBody');
	let searchForm = document.querySelector('#orderSearchForm');
	let orderNumberInput = document.querySelector('#orderNumberInput')
	let orders = [];
	
	
		 function fetchOrders(orderNumber = '') {
		        let url = '/orders/order_admin_json';
		        if (orderNumber) {
		            url += `?orderNumber=${orderNumber}`; // 如果有訂單編號，加入查詢參數
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
		                orders = data; // 將訂單數據賦值給全局的 orders 變量
		                renderOrders(orders); // 渲染訂單列表
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
			

			// 監聽搜尋表單的提交事件
			   searchForm.addEventListener('submit', function(event) {
			       event.preventDefault(); // 阻止表單的默認提交行為
			       console.log('Form submitted'); // 調試日誌，確認表單已提交
			       if (orderNumberInput) {
			           let orderNumber = orderNumberInput.value.trim(); // 獲取輸入的訂單編號
			           console.log('Searching for order number:', orderNumber); // 調試日誌，確認輸入的訂單編號
			           fetchOrders(orderNumber); // 請求帶有訂單編號的數據
			       } else {
			           console.error('The order number input element was not found.');
			       }
			   });

			   // 頁面加載時顯示所有訂單
			   fetchOrders();

		    // 排序邏輯
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
		
		