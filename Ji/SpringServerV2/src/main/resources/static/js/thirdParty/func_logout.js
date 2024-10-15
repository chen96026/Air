import { auth } from "./initialAuth.js";
const btnLogout = document.getElementById("member_logoutBtn");
// 登出
btnLogout.addEventListener("click", (e) => {
    auth.signOut().then(() => {
		
		sessionStorage.clear(); // 清除會話
		localStorage.clear();   // 清除本地儲存
		
        window.location.href = "/home";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("signout問題\n" + errorCode + ": " + errorMessage);
    });
})

    auth.onAuthStateChanged(user => {
        if (!user) {
            // 用戶未登入，重定向到首頁或登入頁面
            window.location.href = "/member_login";
			console.log("User登出");
        }
    });
