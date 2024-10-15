document.addEventListener("DOMContentLoaded", function() {

const LoginOrMember = document.getElementById('LoginOrMember');
if (localStorage.getItem('uid') != null) {
	LoginOrMember.innerHTML = `<a href="/member_page"><img src="/assets/member.png"></a>`
} else {
	LoginOrMember.innerHTML = `<a href="/login"><img src="/assets/login.png"></a>`
}


});