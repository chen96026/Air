import { auth } from "../initialAuth.js";
import { updateProfile } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { reauthenticateWithCredential } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { EmailAuthProvider } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { verifyBeforeUpdateEmail } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { updatePassword } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { updateEmail,reauthenticateWithPopup,OAuthProvider } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';

const btnName = document.getElementById("name");
const btnNameUpdate = document.getElementById("nameUpdate");
const btnEmail = document.getElementById("email");
const btnEmailUpdate = document.getElementById("emailUpdate");
const btnPassword = document.getElementById("password");
const btnPasswordUpdate = document.getElementById("passwordUpdate");
const uid = document.getElementById("uid");

var user = auth.currentUser;
console.log(user);

// 監聽身份狀態變更
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User 出現: ', user);
        btnName.value = user.displayName;
        btnEmail.value = user.email;
        uid.innerHTML = user.uid;
    } else {
        console.log('User 走了');
    }
});

// 更新個人資訊(非帳號密碼)
btnNameUpdate.addEventListener("click", (e) => {
    updateProfile(auth.currentUser, {
        displayName: btnName.value
    }).then(() => {
        // Profile updated!
        window.location.href = "http://127.0.0.1:5500/Integrate/main.html";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("updateProfile問題\n" + errorCode + ": " + errorMessage);
    });
})

// 更新信箱
btnEmailUpdate.addEventListener("click", (e) => {

    // const provider = new OAuthProvider('oidc.line_login');
    // reauthenticateWithPopup(auth.currentUser, provider).then( () => {
    //     updateEmail(auth.currentUser, "blackgod00200@gmail.com").then(() => {
    //         // Email updated!
    //         // ...
    //         console.log("success");
            
    //     }).catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log("updateEmail問題\n" + errorCode + ": " + errorMessage);
    //     });
    // }).catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log("reauthenticateWithPopup問題\n" + errorCode + ": " + errorMessage);
    // });

    const password = document.getElementById("password").value;
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
    // 驗證登入憑證(執行更新信箱/密碼/刪除使用者都需要這步驟)
    reauthenticateWithCredential(auth.currentUser, credential).then(() => {
        // User re-authenticated.
        console.log("驗證成功");
        verifyBeforeUpdateEmail(auth.currentUser, btnEmail.value).then(() => {
            // Email updated!
            window.location.href = "http://127.0.0.1:5500/Integrate/Login.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("updateEmail問題\n" + errorCode + ": " + errorMessage);
        });

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("reauthen問題\n" + errorCode + ": " + errorMessage);
    });
})

// 更新密碼
btnPasswordUpdate.addEventListener("click", (e) => {
    updatePassword(auth.currentUser, btnPassword.value).then(() => {
        auth.signOut().then(() => {
            window.location.href = "http://127.0.0.1:5500/Integrate/Login.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("signout問題\n" + errorCode + ": " + errorMessage);
        });
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("updatePassword問題\n" + errorCode + ": " + errorMessage);
    });
})