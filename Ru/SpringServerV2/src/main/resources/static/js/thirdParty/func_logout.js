import { auth } from "./initialAuth.js";
const logout = document.getElementById("logout");
// 登出
logout.addEventListener("click", () => {
    auth.signOut().then(() => {
		localStorage.removeItem('uid');
		
        window.location.href = "/homepage";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("signout問題\n" + errorCode + ": " + errorMessage);
    });
})