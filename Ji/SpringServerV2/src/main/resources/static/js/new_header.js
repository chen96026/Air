if (!localStorage.getItem('uid')) {
	document.getElementById('member_page').style.display = 'none';
	document.getElementById('login_page').innerHTML = `<a href="/login">Login</a>`;
} else {
	document.getElementById('member_page').style.display = 'block';
	document.getElementById('login_page').innerHTML = `<a href='/homepage' id='logout'>Logout</a>`
}

const now = new Date().getTime();
const uidData = JSON.parse(localStorage.getItem('uid'));
if (Number(uidData.date) + 900000 <= now) localStorage.removeItem('uid');

document.getElementById('logout').addEventListener('click', () => {
	localStorage.removeItem('uid');
})