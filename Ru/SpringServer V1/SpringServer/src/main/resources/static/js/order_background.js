
document.addEventListener('DOMContentLoaded', function(){
	// 設定一個空的訂單列表
	   let orders = [];

	   // 從 API 獲取訂單數據
	   fetch('/orders/order_admin')
	       .then(response => response.json())
		   .then(data => {
		               console.log("Fetched data:", data); // 檢查從 API 返回的數據
		               if (Array.isArray(data)) {
		                   orders = data;  // 獲取數據後賦值給 orders
		                   renderOrder(orders);  // 渲染訂單
		               } else {
		                   console.error("The fetched data is not an array", data);
		               }
		           })
	       .catch(error => console.error('Error fetching orders:', error));
		   
		   

	   function renderOrder(order_list) {
	       const tbody = document.getElementById('order_tbody');
	       tbody.innerHTML = '';

	       order_list.forEach(order => {
	           const orderNumber = order.orderNumber;
	           const contactName = order.contactInformation.contactName;
			   const finalPrice = order.finalPrice;
	           const createDate = order.createDate;
			   const orderStatus = order.orderStatus;
			   

	           const row = `<tr>
	               <td>${orderNumber}</td>
	               <td>${contactName}</td>
	               <td>${finalPrice}</td>
	               <td>${createDate}</td>
				   <td>${orderStatus}</td>
	           </tr>`;
	           tbody.innerHTML += row;
	       });
	   }

	   function sortOrders(criteriaArray) {
	       let sortedOrders = [...orders];
	       sortedOrders.sort((a, b) => {
	           for (let criteria of criteriaArray) {
	               if (a[criteria] < b[criteria]) return -1;
	               if (a[criteria] > b[criteria]) return 1;
	           }
	           return 0;
	       });
	       renderOrder(sortedOrders);
	   }

	   document.getElementById('sort_button').addEventListener('click', (event) => {
	       event.preventDefault();
	       const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
	       const selectedCriteria = Array.from(checkboxes).map(checkbox => checkbox.value);
	       sortOrders(selectedCriteria);
	   });

});


	let orders = [];

    function renderOrders(order_list) {
        const tbody = document.getElementById('order_tbody');

        order_list.forEach(order => {
            const row = `<tr>
                        <td>${order.order_number}</td>
                        <td>${order.contact_name}</td>
                        <td>${order.finalpirce}</td>
                        <td>${order.createDate}</td>
                       </tr>`;
            tbody.innerHTML += row;
        })

    }

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            document.querySelectorAll('.tab_content').forEach(content => {
                content.style.display = 'none';
            });

            document.getElementById(target).style.display = 'block';

            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });

            tab.classList.add('active');
        });
    });

    document.querySelector('.tab').click();

    renderOrders(orders, 'order_tbody');