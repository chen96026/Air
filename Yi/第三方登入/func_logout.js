import { auth } from "./initialAuth.js";
const btnLogout = document.getElementById("member_logoutBtn");
// 登出
btnLogout.addEventListener("click", (e) => {
    auth.signOut().then(() => {
        window.location.href = "./member_login.html";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("signout問題\n" + errorCode + ": " + errorMessage);
    });
})