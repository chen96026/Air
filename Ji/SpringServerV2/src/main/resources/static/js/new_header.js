if (!localStorage.getItem('uid')) {
	document.getElementById('member_page').style.display = 'none';
	document.getElementById('login_page').innerHTML = `<a href="/login" style="font-size:16px;">登入</a>`;
} else {
	document.getElementById('member_page').style.display = 'block';
	document.getElementById('login_page').innerHTML = `<a href='/homepage' id='logout' style="font-size:16px;">登出</a>`
}

const nowTime = new Date().getTime();
const uidData = JSON.parse(localStorage.getItem('uid'));
if(uidData) {
	// 沒登出超過一定時間會自動登出
	if (Number(uidData.date) + 9000000 <= nowTime) localStorage.removeItem('uid');
	
	// logout登出
	document.getElementById('logout').addEventListener('click', () => {
		localStorage.removeItem('uid');
	})
	
	forum_write
}

localStorage.setItem('lastUrl',window.location.href);