import { auth } from "../initialAuth.js";
import { sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';

const btnPasswordForget = document.getElementById("passwordForget");

// 重設密碼信件
btnPasswordForget.addEventListener("click", (e) => {
    sendPasswordResetEmail(auth, document.getElementById("email").value)
        .then(() => {
            // Password reset email sent!
            auth.signOut().then(() => {
                window.location.href = "http://127.0.0.1:5500/Integrate/Login.html";
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("signout問題\n" + errorCode + ": " + errorMessage);
            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("sendPasswordResetEmail問題\n" + errorCode + ": " + errorMessage);
        });
})
