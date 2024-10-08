import { auth } from "./initialAuth.js";
const btnCheck = document.getElementById("check");
// 點擊後使用 auth.currentUser 確認當前使用者
btnCheck.addEventListener("click", (e) => {
    if (!auth.currentUser) {
        console.log('No User.');
    } else {
        console.log('One User.');
        console.log(auth.currentUser);
    }
})