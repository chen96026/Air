import { auth } from "./initialAuth.js";
import { deleteUser } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
const btnDelete = document.getElementById("delete");
// 刪除
btnDelete.addEventListener("click", (e) => {
    deleteUser(auth.currentUser).then(() => {
        window.location.href = "http://127.0.0.1:5500/Integrate/Login.html";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("delete問題\n" + errorCode + ": " + errorMessage);
    });
})