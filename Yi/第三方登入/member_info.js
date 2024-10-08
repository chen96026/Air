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
    if (!input.disabled && input.type !== 'file' && input.type !== 'email') {  // 排除 type="file" 的輸入框
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






const deleteBtn = document.getElementById("member_Info_deletebtn");
const modal = document.getElementById("member_deleteAccountModal");
const closeModal = document.getElementById("member_info_close");
const cancelDeleteBtn = document.getElementById("member_cancelDeleteBtn");

// 顯示模態框
deleteBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// 點擊關閉按鈕時，隱藏模態框
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

// 點擊取消按鈕時，隱藏模態框
cancelDeleteBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// 點擊空白區域時，隱藏模態框
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});


document.getElementById('member_customUploadButton').addEventListener('click', function () {
  document.getElementById('member_Info_upload_Image').click(); // 模擬點擊隱藏的 input
});
