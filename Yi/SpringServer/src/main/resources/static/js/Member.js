const Members = [
  {
    "id": 1,
    "name": "王小明",
    "email": "xiaoming@gmail.com",
    "mobile": "0912345678",
    "dob": "1990-01-01",
    "gender": "男",
    "idNumber": "A123456789",
    "nationality": "台灣",
    "idType": "身份證",
    "idExpiry": "2030-01-01"
  }
];

let Member_filtered = Members; // 用一個變數去包裝，不要用原始資料，確保篩選後的資料符合條件
const Member_perPage = 10;
let Member_currentPage = 1;

// 生成會員清單
function Member_loadList() {
  const Member_TableBody = document.querySelector("#Member_Table tbody");
  Member_TableBody.innerHTML = "";

  //從0開始計算，所以減1，乘上10筆資料
  const startIndex = (Member_currentPage - 1) * Member_perPage;
  //到第11筆資料結束
  const endIndex = startIndex + Member_perPage;

  //切從0~9、10~19(這邊是陣列，所以是20筆，只是從0開始)
  const Member_Slice_Page = Member_filtered.slice(startIndex, endIndex);

  Member_Slice_Page.forEach((Member_Each) => {
    const Member_row = document.createElement("tr");
    Member_row.innerHTML = `
        <td><input type="checkbox" class="Member_Checkbox" data-id="${Member_Each.id
      }"></td>
        <td>${Member_Each.id}</td>
        <td>${Member_Each.name}</td>
        <td>${Member_Each.email}</td>
        <td>${Member_Each.mobile}</td>
        <td>${Member_Each.dob}</td>
        <td><button class="Member_Checklook" onclick="Member_Window_Details(${Member_Each.id
      })">查看</button></td>
    `;
    Member_TableBody.appendChild(Member_row);
  });
  Member_updateControls();
}

//分頁
function Member_updateControls() {
  //Math.ceil()-確保如果只有少量資料也能顯示在最後一頁
  const totalPages = Math.ceil(Member_filtered.length / Member_perPage);
  const pageSelector = document.getElementById("Member_pageSelector");
  pageSelector.innerHTML = "";

  if (Member_currentPage > totalPages) {
    Member_currentPage = totalPages;
  }

  for (let i = 1; i <= totalPages; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `第 ${i} 頁`;
    if (i === Member_currentPage) {
      option.selected = true;
    }
    pageSelector.appendChild(option);
  }

  //disabled-禁用狀態，第1頁的話禁止按上一頁，最後一頁禁止按下一頁
  document.getElementById("Member_prevPage").disabled = Member_currentPage === 1;
  document.getElementById("Member_nextPage").disabled = Member_currentPage === totalPages || totalPages === 0;;
}

document.getElementById("Member_prevPage").addEventListener("click", () => {
  const totalPages = Math.ceil(Member_filtered.length / Member_perPage);
  if (Member_currentPage > 1) {
    Member_currentPage--;
    Member_loadList();
  }
});

document.getElementById("Member_nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(Member_filtered.length / Member_perPage);
  if (Member_currentPage < totalPages) {
    Member_currentPage++;
    Member_loadList();
  }
});

document.getElementById("Member_pageSelector").addEventListener("change", (event) => {
  Member_currentPage = parseInt(event.target.value, 10);
  Member_loadList();
});

// 搜尋
document
  .getElementById("Member_searchBar")
  .addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();

    Member_filtered = Members.filter((Member_Each) => {
      return (
        Member_Each.name.toLowerCase().includes(searchValue) ||
        Member_Each.email.toLowerCase().includes(searchValue)
      );
    });

    //重置頁碼
    Member_currentPage = 1;
    Member_loadList();
  });

//全部勾選
document.getElementById("Member_CheckAll").addEventListener("change", function () {
  const beChecked = this.checked;
  const checkboxes = document.querySelectorAll(".Member_Checkbox");
  checkboxes.forEach(checkbox => {
    checkbox.checked = beChecked;
  });
});

// 跳出通知
function Member_notifyJump() {
  const notificationDiv = document.getElementById("Member_notification");

  if (notificationDiv) {
    notificationDiv.style.display = 'flex';
    setTimeout(() => {
      notificationDiv.style.display = 'none';
    }, 5000);
  } else {
    console.error("未找到");
  }
}
document.getElementById("Member_Notify").addEventListener("click", Member_notifyJump);

// 顯示會員資料視窗
function Member_Window_Details(id) {
  const member = Members.find(m => m.id === id);

  if (member) {
    document.getElementById('gender').textContent = member.gender;
    document.getElementById('idNumber').textContent = member.idNumber;
    document.getElementById('nationality').textContent = member.nationality;
    document.getElementById('idType').textContent = member.idType;
    document.getElementById('idExpiry').textContent = member.idExpiry;

    document.getElementById('Member_Window').style.display = 'block';
  }

  document.getElementById('Member_CloseModal').addEventListener('click', function () {
    document.getElementById('Member_Window').style.display = 'none';
  });
}

// 點擊彈窗外部關閉彈窗
window.onclick = function (event) {
  const modal = document.getElementById('Member_Window');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// 初始載入會員清單
Member_loadList();
