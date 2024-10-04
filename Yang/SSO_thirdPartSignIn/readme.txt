
目前有
1. 郵件信箱

	·註冊(註冊成功會同時登入)，createUserWithEmailAndPassword(auth, email, password)
	   且會發送信件來驗證信箱，sendEmailVerification(auth.currentUser)
	·登入，signInWithEmailAndPassword(auth, email, password)
	·發送密碼重設信件，sendPasswordResetEmail(auth, email)
	·更新名字，updateProfile(auth.currentUser, )
	·更新信箱(需要先通過憑證驗證，reauthenticateWithCredential)，verifyBeforeUpdateEmail(auth.currentUser, btnEmail.value)
	·更新密碼，updatePassword(auth.currentUser, btnPassword.value)
	·刪除用戶，deleteUser(auth.currentUser)
	·登出用戶，auth.signOut()

2. 第三方登入 - Google 和 Line

	·Google，signInWithPopup(auth, provider)
	·Line，signInWithPopup(auth, provider)

	第三方登入的帳戶可以登出/刪除/更改名字，但無法更改信箱或密碼


const firebaseConfig = {
    apiKey: "AIzaSyCqMg4nhFesKBtEtIbxxOUUKAeIebNip1Q",
    authDomain: "javel-85c60.firebaseapp.com",
    projectId: "javel-85c60",
    storageBucket: "javel-85c60.appspot.com",
    messagingSenderId: "780056726416",
    appId: "1:780056726416:web:eae377e64ad572c30a8115",
    measurementId: "G-5WEC19NR0Z"
};