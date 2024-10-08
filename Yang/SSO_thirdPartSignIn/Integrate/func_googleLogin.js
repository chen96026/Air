import { auth } from "./initialAuth.js";
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const btnGoogle = document.getElementById("googleLogin");
// Google登入
btnGoogle.addEventListener("click", (e) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "consent", // 強制要求用戶每次都需要授權
    });
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log(credential);
            
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            window.location.href = "http://127.0.0.1:5500/Integrate/main.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("google問題\n" + errorCode + ": " + errorMessage);
        });
});