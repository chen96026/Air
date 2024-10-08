import { auth } from "./initialAuth.js";
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const btnGoogle = document.getElementById("googleLogin");
let iconBlob;
// Google登入
btnGoogle.addEventListener("click", (e) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account" // 讓用戶可以選擇帳號
    });
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);

            // 上次登入時間 = 創建時間，為新帳號，需要把資料送進資料庫
            if (user.metadata.creationTime == user.metadata.lastSignInTime) {
                urlToBlob(iconUrl).then(blob => { 
                    iconBlob = blob;
                    let data = {
                        email: user.email,
                        password: "1111111",
                        name: user.displayName,
                        icon: iconBlob
                    };
                    
                    fetch('網址', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error:login()');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Success:', data);
                            window.location.href = "http://127.0.0.1:5500/Integrate/main.html";
                        })
                        .catch(error => {
                            console.error('err:', error);
                        });
                    
                })

                // 上次登入時間 != 創建時間，為舊帳號，不需送進資料庫
            } else {
                window.location.href = "";
            }

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("google問題\n" + errorCode + ": " + errorMessage);
        });
});

// 圖片url轉成BLOB
async function urlToBlob(url) {
    try {
        // 使用 fetch 來取得圖片資料
        const response = await fetch(url);

        // 檢查回應狀態是否正常
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 將回應的資料轉為 Blob
        const blob = await response.blob();
        return blob; // 這裡返回 Blob 物件
    } catch (error) {
        console.error('Error fetching and converting to Blob:', error);
    }
}