let initialMemberData = {};
fetch('/member/info')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to load member info');
        }
    })
    .then(member => {
		
		// 存儲初始資料
		initialMemberData = {
			uid: member.uid,
			name: member.name,
			email: member.email,
			phone: member.phone,
			birthday: member.birthday
			};
		
        // 將會員信息顯示在頁面上
		document.getElementById('member_info_uid').value = member.uid;
        document.getElementById('member_info_name').value = member.name;
        document.getElementById('member_info_email').value = member.email;
        document.getElementById('member_info_phone_number').value = member.phone;
        document.getElementById('member_info_birth').value = member.birthday;
   		 })
   	 		.catch(error => {
       		 console.error('Error:', error);
    	});
	

	document.getElementById("member_Info_revisebtn").addEventListener("click", function() {
		
		let updatedMember = {
		           uid: document.getElementById('member_info_uid').value
		       };
			   
			   // 比較每個欄位的初始值與當前值，只有不同時才更新
		const name = document.getElementById('member_info_name').value;
			          if (name && name !== initialMemberData.name) {
			              updatedMember.name = name;
			          }
		const email = document.getElementById('member_info_email').value;
					  if (email && email !== initialMemberData.email) {
					      updatedMember.email = email;
					  }
		const phone = document.getElementById('member_info_phone_number').value;
					  if (phone && phone !== initialMemberData.phone) {
					      updatedMember.phone = phone;
					  }
		const birthday = document.getElementById('member_info_birth').value;
					  if (birthday !== initialMemberData.birthday) {
						  updatedMember.birthday = birthday !== "" ? birthday : null;  // 確保不傳空字符串
					  }
			  
		const password = document.getElementById('member_info_password').value;
					  if (password && password !== "") {
			              updatedMember.password = password;
			  		  }
		
	    fetch('/member/update', {
	        method: 'PUT',
	        headers: {
	            'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(updatedMember)
	    })
	    .then(response => {
	        if (response.ok) {
	            return response.json();
	        } else {
	            throw new Error('更新失敗');
	        }
	    })
	    .then(updatedData => {
	        alert("會員資料更新成功");
	    })
	    .catch(error => {
	        console.error('Error:', error);
	    });
	});


	// 當齒輪被點擊時，啟用對應的輸入欄位
	document.querySelectorAll('.gear-icon').forEach(icon => {
	    icon.addEventListener('click', function (event) {
	      event.stopPropagation(); // 防止點擊齒輪時觸發全局的點擊事件
	  
	      const inputId = this.getAttribute('data-input');
	      const inputField = document.getElementById(inputId);
	      
	      // 切換input狀態
	      if (inputField.disabled) {
	        inputField.disabled = false; // 解鎖輸入
	        inputField.focus();          // 聚焦到該輸入欄位
	        inputField.style.backgroundColor = "#fff"; // 改變背景顏色
	      } else {
	        inputField.disabled = true;  // 鎖定輸入
	        inputField.style.backgroundColor = "#e9ecef"; // 恢復禁用背景顏色
	      }
	    });
	  });
	  
	  // 點擊空白處時恢復所有input的非編輯狀態
	  document.addEventListener('click', function () {
	      document.querySelectorAll('input').forEach(input => {
	          if (!input.disabled && input.type !== 'file'&& input.type !== 'email') {  // 排除 type="file" 的輸入框
	              input.disabled = true;  // 鎖定輸入
	              input.style.backgroundColor = "#e9ecef";  // 恢復禁用背景顏色
	          }
	      });
	  });
	  
	  // 防止點擊input時觸發恢復非編輯狀態
	  document.querySelectorAll('input').forEach(input => {
	    input.addEventListener('click', function (event) {
	      event.stopPropagation(); // 阻止點擊input觸發全局點擊事件
	    });
	  
	    // 監聽輸入框的鍵盤事件，當按下Enter鍵時自動鎖定輸入
	    input.addEventListener('keydown', function (event) {
	      if (event.key === "Enter") {
	        event.preventDefault(); // 阻止表單提交或其他默認行為
	        input.disabled = true; // 鎖定輸入
	        input.style.backgroundColor = "#e9ecef"; // 恢復禁用背景顏色
	      }
	    });
	  });
	  
	  
	  //密碼確認勾勾
	  document.getElementById('member_info_confirm_password').addEventListener('input', function () {
	    const password = document.getElementById('member_info_password').value;
	    const confirmPassword = this.value;
	    const passwordMatchIcon = document.getElementById('member_info_passwordMatchIcon');

	    if (confirmPassword === password && confirmPassword !== "") {
	      // 顯示綠色勾勾
	      passwordMatchIcon.innerHTML = '<i class="fas fa-check-circle" style="color: green;"></i>';
	    } else if (confirmPassword !== password && confirmPassword !== "") {
	      // 顯示紅色叉叉
	      passwordMatchIcon.innerHTML = '<i class="fas fa-times-circle" style="color: red;"></i>';
	    } else {
	      // 清空圖示
	      passwordMatchIcon.innerHTML = '';
	    }
	  });
	  
	    
	  //上傳頭像
	  document.getElementById('member_Info_upload_button').addEventListener('click', function () {
	      const fileInput = document.getElementById('member_Info_upload_Image');
	      const file = fileInput.files[0];
	      const uid = document.getElementById('member_info_uid').value;

	      // 調試輸出文件和 UID
	      console.log("Selected file:", file);
	      console.log("UID:", uid);

	      if (file && file.size <= 1 * 1024 * 1024) {  // 檢查檔案大小是否小於 1MB
	          const formData = new FormData();
	          formData.append('avatar', file);
	          formData.append('uid', uid);  // 添加 uid 到請求中

	          fetch('/member/uploadicon', {
	              method: 'POST',
	              body: formData
	          })
	          .then(response => {
	              if (response.ok) {
	                  return response.text();
	              } else {
	                  throw new Error('頭像上傳失敗');
	              }
	          })
	          .then(data => {
	              console.log("後端響應：", data);  // 調試輸出後端響應
	              alert('頭像上傳成功！');
	          })
	          .catch(error => {
	              console.error('Error:', error);
	          });
	      } else {
	          alert('請選擇一張大小小於 1MB 的圖片');
	      }
	  });
	  
	 
	  //顯示頭像
	  document.addEventListener("DOMContentLoaded", function() {
	      // 首先獲取會員信息，確保 uid 被設置
	      fetch('/member/info')
	          .then(response => response.json())
	          .then(member => {
	              // 確保 UID 被正確賦值
	              document.getElementById('member_info_uid').value = member.uid;
	              console.log("UID 設置為:", member.uid);
	              
	              // 使用獲取到的 UID 獲取並顯示頭像
	              const uid = member.uid;
	              if (uid) {
	                  fetch(`/member/geticon/${uid}`)
	                      .then(response => response.text())
	                      .then(base64Image => {
	                          if (base64Image.startsWith("data:image")) {
	                              document.getElementById('member_info_icon').src = base64Image;
	                              console.log("圖片已更新，新的 src 值: ", document.getElementById('member_info_icon').src);
	                          } else {
	                              console.error("圖片未找到或格式錯誤");
	                          }
	                      })
	                      .catch(error => {
	                          console.error("Error:", error);
	                      });
	              } else {
	                  console.error("UID 未設置或為空");
	              }
	          })
	          .catch(error => {
	              console.error('Error:', error);
	          });
	  });
	
	  
	  
	  //刪除帳號
	  const deleteBtn = document.getElementById("member_Info_deletebtn");  // 刪除帳號按鈕
	  const modal = document.getElementById("member_deleteAccountModal");  // 模態框
	  const closeModal = document.getElementById("member_info_close");  // 關閉按鈕
	  const cancelDeleteBtn = document.getElementById("member_cancelDeleteBtn");  // 取消按鈕
	  const confirmDeleteBtn = document.getElementById("member_confirmDeleteBtn");  // 確認刪除按鈕
	  const confirmEmailInput = document.getElementById("member_confirmEmail");  // Email 輸入框
	  const registeredEmail = document.getElementById("member_info_email").value;  // 預設的註冊 Email

	  
	  deleteBtn.addEventListener("click", function () {
	    modal.style.display = "block";
	  	 });
  
	  closeModal.addEventListener("click", function () {
		modal.style.display = "none";
		 });

	  cancelDeleteBtn.addEventListener("click", function () {
	    modal.style.display = "none";
	     });

	  window.addEventListener("click", function (event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	         }
	     });

	     // 點擊確認刪除按鈕時，發送刪除請求
	  confirmDeleteBtn.addEventListener("click", function () {
	    const enteredEmail = confirmEmailInput.value;
		const registeredEmail = document.getElementById("member_info_email").value;  // 預設的註冊 Email

	         // 檢查輸入的 Email 是否正確
	         if (enteredEmail === registeredEmail) {
	             // 發送 DELETE 請求到後端，這裡用的是 email
	             fetch(`/member/delete/${encodeURIComponent(enteredEmail)}`, {
	                 method: 'DELETE'
	             })
	             .then(response => {
	                 if (response.ok) {
	                     alert("帳號刪除成功");
	                     window.location.href = '/member_register';
	                 } else {
	                     alert("刪除帳號失敗，請再試一次");
	                 }
	             })
	             .catch(error => {
	                 console.error('Error:', error);
	             });

	             modal.style.display = "none";
	         } else {
	             alert("Email 不正確，請重新輸入");
	         }
	     });

	  
		 //自定上傳檔案按鈕
		 document.getElementById('member_customUploadButton').addEventListener('click', function () {
		   document.getElementById('member_Info_upload_Image').click(); // 模擬點擊隱藏的 input
		 });
			  