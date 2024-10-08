import { auth } from "./initialAuth.js";
import { deleteUser } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
const btnDelete = document.getElementById("member_confirmDeleteBtn");
// 刪除
btnDelete.addEventListener("click", (e) => {
    deleteUser(auth.currentUser).then(() => {
        window.location.href = "./member_login.html";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("delete問題\n" + errorCode + ": " + errorMessage);
    });
})