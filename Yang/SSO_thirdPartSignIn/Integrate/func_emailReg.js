import { auth } from "../initialAuth.js";
import { createUserWithEmailAndPassword,sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';

const btnRegist = document.getElementById("regist");
var user;
var email;
var password;

// 註冊+登入
btnRegist.addEventListener("click", (e) => {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            user = userCredential.user;
            console.log("註冊成功：");
            console.log(user);
            // 驗證信箱
            sendEmailVerification(auth.currentUser)
                // 成功
                .then(() => {
                    // Email verification sent!
                    console.log("驗證成功");
                    window.location.href = "http://127.0.0.1:5500/Integrate/main.html?good";
                });

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("createUser問題\n" + errorCode + ": " + errorMessage);

            // ..
        });
});

// 監聽身份狀態變更
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User 出現: ', user);
    } else {
        console.log('User 走了');
    }
});