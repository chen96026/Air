document.getElementById('member_logout').addEventListener('click', () => {
	localStorage.removeItem('uid');
	window.location.href = '/homepage';	
});

fetch('/member/info')
	.then(response => { return response.json(); })
	.then(member => {
		if (member.icon != null) {
			let base64Image = member.icon;
			if (!base64Image.startsWith('data:image/')) {
				base64Image = 'data:image/jpeg;base64,' + base64Image;
			}
			document.getElementById('member_info_icon2').src = base64Image;
		}
	})
	.catch(error => {
		console.error('Error:', error);
	});

function toggleDropdown(dropdownId) {
	const dropdowns = document.querySelectorAll('.dropdown');

	dropdowns.forEach(dropdown => {
		if (dropdown.id !== dropdownId) {
			dropdown.classList.remove('show');
			dropdown.style.maxHeight = '0';
			dropdown.style.opacity = '0';
			dropdown.style.visibility = 'hidden';
		}
	});

	const currentDropdown = document.getElementById(dropdownId);

	if (currentDropdown.classList.contains('show')) {
		currentDropdown.classList.remove('show');
		currentDropdown.style.maxHeight = '0';
		currentDropdown.style.opacity = '0';
		currentDropdown.style.visibility = 'hidden';
	} else {
		currentDropdown.classList.add('show');
		currentDropdown.style.maxHeight = '200px';
		currentDropdown.style.opacity = '1';
		currentDropdown.style.visibility = 'visible';
	}
}

const mainContent = document.getElementById('main-content');
//以下有修改
// 個人資料
const account = document.getElementById('account');
const password = document.getElementById('password');

account.addEventListener('click', loadMemberInfoPage);
password.addEventListener('click', loadPasswordPage);

document.addEventListener('DOMContentLoaded', function() {

	if (!localStorage.getItem('uid')) window.location.href = '/homepage';

	if (account) {
		toggleDropdown('accountDropdown')
		account.click();
	}
});

//更改齒輪功能拉出來變成一個function，新增點擊齒輪後標題也會變黑色
function gearuse() {
	// 處理齒輪圖標的邏輯
	document.querySelectorAll('.gear-icon').forEach(icon => {
		icon.addEventListener('click', function(event) {
			event.stopPropagation();

			const inputId = this.getAttribute('data-input');
			const inputField = document.getElementById(inputId);

			// 獲取當前齒輪對應的表單組，找到對應的標籤
			const formGroup = this.closest('.member_Info_form-group') || this.closest('.member_Password_form-group');
			const label = formGroup ? formGroup.querySelector('label') : null;

			// 先禁用所有輸入框和重設所有標籤顏色為灰色
			document.querySelectorAll('.member_Info_form input, .member_Password_form input').forEach(input => {
				input.disabled = true;
				const group = input.closest('.member_Info_form-group') || input.closest('.member_Password_form-group');
				const inputLabel = group ? group.querySelector('label') : null;
				if (inputLabel) {
					inputLabel.style.color = "gray"; // 重設標籤顏色為灰色
				}
			});

			// 如果當前欄位被禁用，啟用它，並將標籤顏色設為黑色
			if (inputField.disabled) {
				inputField.disabled = false;
				inputField.focus();
				inputField.style.backgroundColor = "#fff";
				if (label) {
					label.style.color = "#000"; // 將標籤顏色設為黑色
				}
			}
		});
	});

	// 點擊空白處時禁用所有輸入欄位並恢復標籤顏色
	document.addEventListener('click', function() {
		document.querySelectorAll('.member_Info_form input, .member_Password_form input').forEach(input => {
			input.disabled = true;
			input.style.backgroundColor = "#fff";

			const formGroup = input.closest('.member_Info_form-group') || input.closest('.member_Password_form-group');
			const label = formGroup ? formGroup.querySelector('label') : null;
			if (label) {
				label.style.color = "gray"; // 將標籤顏色變回灰色
			}
		});
	});

	// 防止點擊輸入框時觸發全局事件
	document.querySelectorAll('.member_Info_form input, .member_Password_form input').forEach(input => {
		input.addEventListener('click', function(event) {
			event.stopPropagation();
		});

		// 當按下 Enter 鍵時，自動禁用輸入框並恢復標籤顏色
		input.addEventListener('keydown', function(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input.disabled = true;
				input.style.backgroundColor = "#fff";

				const formGroup = input.closest('.member_Info_form-group') || input.closest('.member_Password_form-group');
				const label = formGroup ? formGroup.querySelector('label') : null;
				if (label) {
					label.style.color = "gray"; // 將標籤顏色變回灰色
				}
			}
		});
	});
}

//更改密碼欄位剃除
const memberInfoHTML = `
<div class="member_Info_container">
    <h2>個人資料</h2>
    <div id="member_Info_User">
        <div class="member_Info_Avatar">
            <img id="member_info_icon" src="./assets/member.png" />
        </div>

        <div id="member_Info_Upload_group">
            <input type="file" id="member_Info_upload_Image" accept="image/*" style="display: none;" />
            <button id="member_customUploadButton">選擇檔案</button>
            <div class="member_Info_Remind">檔案大小:最大1MB</div>
            <div class="member_Info_Remind">檔案限制:.JPEG、.PNG</div>
        </div>
        <button id="member_Info_upload_button">上傳頭像</button>
    </div>

    <input type="hidden" id="member_info_uid" value="uid">

    <div class="member_Info_form">
        <div class="member_Info_form-group">
            <label for="member_info_name">用戶名</label>
            <div class="input-with-icon">
                <input type="text" id="member_info_name" name="member_info_name" placeholder="請輸入用戶名" disabled> <i class="fas fa-cog gear-icon" data-input="member_info_name"></i>
            </div>
        </div>

        <div class="member_Info_form-group">
            <label for="member_info_email">E-mail</label>
            <div class="input-with-icon">
                <input type="email" id="member_info_email" name="member_info_email" disabled> <i class="fas fa-cog gear-icon" data-input="member_info_email"></i>
            </div>
        </div>
      
        <div class="member_Info_form-group">
            <label for="member_info_phone_number">手機</label>
            <div class="input-with-icon">
                <input type="text" id="member_info_phone_number" name="member_info_phone_number" placeholder="請輸入手機號碼"> <i class="fas fa-cog gear-icon" data-input="member_info_phone_number"></i>
            </div>
        </div>

        <div class="member_Info_form-group">
            <label for="member_info_birth">出生日期</label>
            <div class="input-with-icon">
                <input type="date" id="member_info_birth" name="member_info_birth">
                <i class="fas fa-cog gear-icon" data-input="member_info_birth"></i>
            </div>
        </div>

        <div id="member_info_group-btn">
            <button type="submit" class="member_Info_submit-btn" id="member_Info_revisebtn">確認修改</button>
            <button type="submit" class="member_Info_submit-btn" id="member_Info_deletebtn">刪除帳號</button>
        </div>

        <div id="member_deleteAccountModal" class="modal">
            <div id="member_info_modal-content">
                <span id="member_info_close">&times;</span>
                <h3>確認刪除帳號嗎?</h3>
                <br>
                <p>請輸入您的 Email 確認刪除</p>
                <input type="email" id="member_confirmEmail" placeholder="請輸入您的Email"> <br> <br>
                <div id="member_delete_group">
                    <button id="member_confirmDeleteBtn">確認</button>
                    <button id="member_cancelDeleteBtn">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

//更改密碼單獨拉出(新增舊密碼欄位)
const memberPasswordHTML = `
<div class="member_Password_container">
    <h2>更改密碼</h2>
    <div id="member_Info_User">

    <input type="hidden" id="member_info_uid" value="uid">

    <div class="member_Password_form">

	  <div class="member_Password_form-group">
            <label for="member_info_old_password">舊密碼</label>
            <div class="input-with-icon">
                <input type="password" id="member_info_old_password" name="member_info_old_password"> <i class="fas fa-cog gear-icon" data-input="member_info_old_password"></i>
            </div>
        </div>
       
        <div class="member_Password_form-group">
            <label for="member_info_password">新密碼</label>
            <div class="input-with-icon">
                <input type="password" id="member_info_password" name="member_info_password"> <i class="fas fa-cog gear-icon" data-input="member_info_password"></i>
            </div>
        </div>

        <div class="member_Password_form-group">
            <label for="member_info_confirm_password">確認新密碼</label>
            <div class="input-with-icon">
                <input type="password" id="member_info_confirm_password" name="member_info_confirm_password"> <span id="member_info_passwordMatchIcon"></span> <i class="fas fa-cog gear-icon" data-input="member_info_confirm_password"></i>
            </div>
        </div>

        <div id="member_info_group-btn">
            <button type="submit" class="member_Info_submit-btn" id="member_Info_revisebtn">確認修改</button>
        </div>

    </div>
</div>
`;

//更改帳號資料頁面(把跟密碼相關的拉掉)
function loadMemberInfoPage() {
	mainContent.innerHTML = memberInfoHTML;
	gearuse();

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
			initialMemberData = {
				uid: member.uid,
				name: member.name,
				email: member.email,
				phone: member.phone,
				birthday: member.birthday,
				icon: member.icon
			};

			// 將會員訊息顯示在頁面上
			document.getElementById('member_info_uid').value = member.uid;
			document.getElementById('member_info_name').value = member.name;
			document.getElementById('member_info_email').value = member.email;
			document.getElementById('member_info_phone_number').value = member.phone;
			document.getElementById('member_info_birth').value = member.birthday;

			if (member.icon != null) {
				let base64Image = member.icon;
				if (!base64Image.startsWith('data:image/')) {
					base64Image = 'data:image/jpeg;base64,' + base64Image;
				}
				document.getElementById('member_info_icon').src = base64Image;
				document.getElementById('member_info_icon2').src = base64Image;
			}
		})
		.catch(error => {
			console.error('Error:', error);
		});


	document.getElementById("member_Info_revisebtn").addEventListener("click", function() {
		let updatedMember = {
			uid: document.getElementById('member_info_uid').value
		};

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

	//上傳頭像
	document.getElementById('member_Info_upload_button').addEventListener('click', function() {
		const fileInput = document.getElementById('member_Info_upload_Image');
		const file = fileInput.files[0];
		const uid = document.getElementById('member_info_uid').value;

		console.log("Selected file:", file);
		console.log("UID:", uid);

		if (file && file.size <= 1 * 1024 * 1024) {
			const formData = new FormData();
			formData.append('avatar', file);
			formData.append('uid', uid);

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
					console.log("後端響應：", data);
					alert('頭像上傳成功！');
				})
				.catch(error => {
					console.error('Error:', error);
				});
		} else {
			alert('請選擇一張大小小於 1MB 的圖片');
		}
	});

	//刪除帳號
	const deleteBtn = document.getElementById("member_Info_deletebtn");
	const modal = document.getElementById("member_deleteAccountModal");
	const closeModal = document.getElementById("member_info_close");
	const cancelDeleteBtn = document.getElementById("member_cancelDeleteBtn");
	const confirmDeleteBtn = document.getElementById("member_confirmDeleteBtn");
	const confirmEmailInput = document.getElementById("member_confirmEmail");
	const registeredEmail = document.getElementById("member_info_email").value;


	deleteBtn.addEventListener("click", function() {
		modal.style.display = "block";
	});

	closeModal.addEventListener("click", function() {
		modal.style.display = "none";
	});

	cancelDeleteBtn.addEventListener("click", function() {
		modal.style.display = "none";
	});

	window.addEventListener("click", function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	});

	confirmDeleteBtn.addEventListener("click", function() {
		const enteredPassword = confirmEmailInput.value;
		const registeredEmail = document.getElementById("member_info_email").value;
		const data = { email: registeredEmail, password: enteredPassword };

		fetch(`/member/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (response.ok) {
					alert("帳號刪除成功");
					window.location.href = '/register';
				} else {
					alert("刪除帳號失敗，請再試一次");
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});

		modal.style.display = "none";
	});

	document.getElementById('member_customUploadButton').addEventListener('click', function() {
		document.getElementById('member_Info_upload_Image').click();
	});

	const fileInput = document.getElementById('member_Info_upload_Image');
	const imagePreview = document.getElementById('member_info_icon');
	fileInput.addEventListener('change', function() {
		const file = fileInput.files[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = function(e) {
				imagePreview.src = e.target.result;
				imagePreview.style.display = 'block';
			}
			reader.readAsDataURL(file);
		} else {
			alert('請選擇 JPEG 或 PNG 格式的檔案。');
		}
	});
}

//更改密碼頁面(只留下跟密碼相關的)
function loadPasswordPage() {
	mainContent.innerHTML = memberPasswordHTML;

	let initialMemberData = {};
	gearuse();

	document.getElementById("member_Info_revisebtn").addEventListener("click", function() {

		const old_password = document.getElementById("member_info_old_password").value;
		const new_password = document.getElementById("member_info_password").value;
		const confirm_password = document.getElementById("member_info_confirm_password").value;

		if (new_password !== confirm_password) {
			alert("密碼不符")
			return
		}

		let checkPassword = {
			uid: localStorage.getItem("uid"),
			old_password: old_password,
			password: confirm_password
		};

		console.log(checkPassword)

		fetch('/member/updatepassword', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(checkPassword)
		}).then(response => {
			return response.text();
		}).then(data => {
			if (data == "") {
				alert("密碼已更改")
			}
		})
			.catch(error => {
				console.error('Error:', error);
			});
	});

	document.getElementById('member_info_confirm_password').addEventListener('input', function() {
		const password = document.getElementById('member_info_password').value;
		const confirmPassword = this.value;
		const passwordMatchIcon = document.getElementById('member_info_passwordMatchIcon');

		if (confirmPassword === password && confirmPassword !== "") {
			passwordMatchIcon.innerHTML = '<i class="fas fa-check-circle" style="color: green;"></i>';
		} else if (confirmPassword !== password && confirmPassword !== "") {
			passwordMatchIcon.innerHTML = '<i class="fas fa-times-circle" style="color: red;"></i>';
		} else {
			passwordMatchIcon.innerHTML = '';
		}
	});
}
//修改如上


// 當前訂單
const orderNumber = 'AE9268';
const ticketCount = '2';
const totalPrice = '8,829';
const goCity = 'TPE';
const backCity = 'KIX';

const go_goTime = '2024年8月30日(週五)';
const go_orderclass = '經濟艙';
const go_plane = '長榮航空';
const go_airline = 'BR700'
const go_departSmallTime = '9:00';
const go_departCity = 'KIX';
const go_wholeTime = '2小時45分鐘';
const go_landSmallTime = '11:45';
const go_landCity = 'TPE';

const back_goTime = '2024年8月30日(週五)';
const back_orderclass = '經濟艙';
const back_plane = '長榮航空';
const back_airline = 'BR700'
const back_departSmallTime = '9:00';
const back_departCity = 'KIX';
const back_wholeTime = '2小時45分鐘';
const back_landSmallTime = '11:45';
const back_landCity = 'TPE';

const order_nowHTML = `    
        <section id="member_Order_Ticket">
          <section id="member_Order_TopSchedule">
              <div id="member_Order_TotalSchedule">
                <i class="fas fa-plane icon" id="member_Order_planeIcon"></i>
                <span id="member_Order_Form">訂單編號</span>
                <span style="font-size: 1vw">:&nbsp;</span>
                <span id="member_Order_Number">${orderNumber}</span>
                <span style="font-size: 1vw">｜&nbsp;</span>
                <span id="member_Order_GoCity">${goCity}</span>
                <img style="width: 1.1vw" src="./icon/arrow-come_back.png" alt="" />
                &nbsp;
                <span id="member_Order_BackCity">${backCity}</span>
              </div>
              <div id="member_Order_State"> 
                  <div>狀態</div>
                  <span>&nbsp;:&nbsp;</span>
                  <span>待出發</span>
                 </div>
            </section>

            <section id="member_Order_WholeTicket">
              <div id="member_Order_GoPlane">
                <div id="member_Order_Go_side">
                  <span id="member_Order_Go">去程</span>
                  <span>&nbsp;:&nbsp;</span>
                  <span id="member_Order_GoTime">${go_goTime}</span>
                </div>

                <div id="member_Order_Plane_side">
                  <span id="member_Order_Plane">${go_plane}</span>
                  <span>&nbsp;&nbsp;</span>
                  <span id="member_Order_airline">${go_airline}</span>
                  <span>&nbsp;:&nbsp;</span>
                  <span id="member_Order_Class">${go_orderclass}</span>
                </div>

              </div>
              <div id="member_Order_BigMiddle">
                
                <div id="member_Order_Schedule">
                  <div id="member_Order_DepartTime">
                    <div>
                      <span id="member_Order_DepartSmallTime">${go_departSmallTime}</span>
                    </div>
                    <div>
                      <span id="member_Order_DepartCity">${go_departCity}</span>
                    </div>
                  </div>
                  <div id="member_Order_WholeTime">
                      <div>
                        ${go_wholeTime}
                      </div>
                      <div class="arrow-container"></div>
                      <div>
                        直飛
                      </div>
                  </div>
                  <div id="member_Order_LandTime">
                    <div>
                      <span id="member_Order_LandSmallTime">${go_landSmallTime}</span>
                    </div>
                    <div>
                      <span id="member_Order_LandCity">${go_landCity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="member_Order_WholeTicket">
              <div id="member_Order_GoPlane">
                <div id="member_Order_Go_side">
                  <span id="member_Order_Go">回程</span>
                  <div style="font-size: 1vw">&nbsp;:&nbsp;</div>
                  <span id="member_Order_GoTime">${back_goTime}</span>
                </div>

                <div id="member_Order_Plane_side">
                  <span id="member_Order_Plane">${back_plane}</span>
                   <span>&nbsp;&nbsp;</span>
                  <span id="member_Order_airline">${back_airline}</span>
                  <span>&nbsp;:&nbsp;</span>
                  <span id="member_Order_Class">${back_orderclass}</span>
                </div>

              </div>
              <div id="member_Order_BigMiddle">
                
                <div id="member_Order_Schedule">
                  <div id="member_Order_DepartTime">
                    <div>
                      <span id="member_Order_DepartSmallTime">${back_departSmallTime}</span>
                    </div>
                    <div>
                      <span id="member_Order_DepartCity">${back_departCity}</span>
                    </div>
                  </div>
                  <div id="member_Order_WholeTime">
                   
                      <div>
                        ${back_wholeTime}
                      </div>
                      <div class="arrow-container"></div>
                      <div>
                        直飛
                      </div>
               
                  </div>
                  <div id="member_Order_LandTime">
                    <div>
                      <span id="member_Order_LandSmallTime">${back_landSmallTime}</span>
                    </div>
                    <div>
                      <span id="member_Order_LandCity">${back_landCity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="member_Order_BottomPrice">
              <div id="member_Order_PeoplePrice">
                <div id="member_Order_People">
                  <span>張數&nbsp;:&nbsp</span>
                  <span>${ticketCount}</span>
                </div>
                <div id="member_Order_TotalPrice">
                  <span>總價&nbsp;:&nbspNT$</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <div>
                <button id="member_Order_Cancel">取消</button>
              </div>
            </section>
      </section>`;

const order_now = document.getElementById('order_now');
order_now.addEventListener('click', () => {
	mainContent.innerHTML = order_nowHTML;
})

// 歷史評論
function member_forum_generateHTML(member_forum_imageUrl, member_forum_title, member_forum_content, member_forum_authorImage, member_forum_author, member_forum_date) {
	return `
    <div class="member_forum_card">
      <a href="./forum_detail.html">
        <article>
          <img class="member_forum_articleImg" src="${member_forum_imageUrl}" alt="${member_forum_title}">
          <h3>${member_forum_title}</h3>
          <p class="member_forum_articleMore">${member_forum_content}</p>
        </article>
        <div>
          <img class="member_forum_authorImg" src="${member_forum_authorImage}" alt="author_icon">
          <p class="member_forum_author">${member_forum_author}</p>
          <p class="member_forum_postDate">${member_forum_date}</p>
        </div>
      </a>
    </div>
  `;
}

let member_forum_imageUrl = "https://picsum.photos/400/240?random=0";
let member_forum_title = "超級可愛的熊本熊!";
let member_forum_content = "終於看到心心念念的熊本熊! 現場拍真的是超~~~~大一隻😆😆🤣🤣 ...";
let member_forum_authorImage = 'https://picsum.photos/50?random=0';
let member_forum_author = "奇異鳥真奇異啊";
let member_forum_date = "2024-01-15";
const forumByMe = document.getElementById('forumByMe');
forumByMe.addEventListener('click', () => {
	mainContent.innerHTML = member_forum_generateHTML(member_forum_imageUrl, member_forum_title, member_forum_content, member_forum_authorImage, member_forum_author, member_forum_date);
})