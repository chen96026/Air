import { auth } from "./initialAuth.js";
const btnLogout = document.getElementById("logout");
// 登出
btnLogout.addEventListener("click", (e) => {
    auth.signOut().then(() => {
        window.location.href = "http://127.0.0.1:5500/Integrate/Login.html";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("signout問題\n" + errorCode + ": " + errorMessage);
    });
})