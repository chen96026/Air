import { auth } from "./initialAuth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const btnLogin = document.getElementById("login");
const btnPasswordForget = document.getElementById("passwordForget");
var user;
var email;
var password;

// 登入
btnLogin.addEventListener("click", (e) => {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            // console.log("註冊成功：");
            // console.log(user);

            // ...

            window.location.href = "http://127.0.0.1:5500/Integrate/main.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("signIn問題\n" + errorCode + ": " + errorMessage);
        });
});

// 發送忘記密碼的重設信件
btnPasswordForget.addEventListener("click", (e) => {
    email = document.getElementById("email").value;
    sendPasswordResetEmail(auth, email)
        .then(() => {
            window.location.href = "http://127.0.0.1:5500/Integrate/login.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("sendPasswordResetEmail問題\n" + errorCode + ": " + errorMessage);
        });
})

// 監聽身份狀態變更
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User 出現: ', user);
    } else {
        console.log('User 走了');
    }
});