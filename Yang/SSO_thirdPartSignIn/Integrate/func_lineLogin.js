import { auth } from "../initialAuth.js";
import { signInWithPopup, OAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const btnLine = document.getElementById("lineLogin");
const provider = new OAuthProvider('oidc.line_login');
// Line登入
btnLine.addEventListener("click", (e) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // User is signed in.
            // IdP data available using getAdditionalUserInfo(result)

            // Get the OAuth access token and ID Token
            console.log(result);
            const credential = OAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log(credential);

            const user = result.user;
            console.log(user);

            window.location.href = "http://127.0.0.1:5500/Integrate/main.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("line問題\n" + errorCode + ": " + errorMessage);
        });
});