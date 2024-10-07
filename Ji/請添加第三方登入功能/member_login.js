const images = [
	'./assets/country/中國.jpg',
	'./assets/country/日本.jpg',
	'./assets/country/泰國.jpg'
];

let currentIndex = 0;
const intervalTime = 3000;

// 預加載所有圖片
function preloadImages(imageArray, callback) {
	let loadedImages = 0;
	const totalImages = imageArray.length;
	const preloadedImages = [];

	imageArray.forEach((src, index) => {
		const img = new Image();
		img.src = src;
		preloadedImages[index] = img;

		img.onload = () => {
			loadedImages++;
			if (loadedImages === totalImages) {
				callback(); // 所有圖片加載完成後執行回調
			}
		};
	});
}

// 切換圖片函數
function showNextImageSlide() {
	const currentImage = document.querySelector('.member_register_design-image.active');
	const nextImage = document.querySelector('.member_register_design-image:not(.active)');

	// 設置下一張圖片的 src
	currentIndex = (currentIndex + 1) % images.length;
	nextImage.src = images[currentIndex];

	// 讓當前圖片滑出並淡出
	currentImage.classList.remove('active');
	currentImage.classList.add('prev');

	// 讓下一張圖片從右側滑入
	nextImage.classList.add('active');
	nextImage.classList.remove('prev');

	// 重置當前圖片狀態
	setTimeout(() => {
		currentImage.classList.remove('prev');
	}, 1000); // 與 transition 的 left 時間保持一致
}

// 頁面加載時顯示第一張圖片（無過渡）
window.onload = () => {
	const savedUsername = localStorage.getItem('rememberedUsername');
	if (savedUsername) {
		document.getElementById('member_login_Email').value = savedUsername;
		document.getElementById('rememberMe').checked = true;
	}

	preloadImages(images, () => {
		// 當所有圖片預加載完成後，顯示第一張圖片並開始輪播
		const firstImage = document.querySelector('.member_register_design-image');
		firstImage.src = images[currentIndex]; // 設置第一張圖片
		firstImage.classList.add('initial'); // 避免初始圖片出現過渡

		setTimeout(() => {
			firstImage.classList.remove('initial'); // 移除初始化狀態
			firstImage.classList.add('active'); // 設置為 active，讓它成為顯示的圖片
		}, intervalTime); // 等待第一個圖片顯示的時間，然後開始過渡效果

		setInterval(showNextImageSlide, intervalTime); // 設置圖片輪播間隔
	});
};

// 確認是否有勾選記住帳號密碼
document.getElementById('loginForm').addEventListener('submit', function(e) {
	const rememberMe = document.getElementById('rememberMe').checked;
	const username = document.getElementById('member_login_Email').value;

	if (rememberMe) {
		// 保存帳號到 localStorage（注意：僅保存帳號，不保存密碼）
		localStorage.setItem('rememberedUsername', username);
	} else {
		// 刪除保存的帳號
		localStorage.removeItem('rememberedUsername');
	}
});

function login() {
	event.preventDefault();
	let email = document.getElementById("member_login_Email").value;
	let password = document.getElementById("member_login_Password").value;

	let data = {
		email: email,
		password: password,
	};
	fetch('/member/login', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('登入失敗');
			}
			return response.json();
		})
		.then(data => {
			if (data.memberStatus === 'LOGIN_SUCCESS') {
				localStorage.setItem('uid',data.member.uid);
				window.location.href = "/main_page";
			} else {
				alert("登入失敗，請確認帳號或密碼是否正確");
			}
		})
		.catch(error => {
			console.error('err', error);
		});
}


// 切換顯示或隱藏密碼
const togglePassword1 = document.querySelector('#member_eyes_Password_first');
const password1 = document.querySelector('#member_login_Password');

togglePassword1.addEventListener('click', function() {
	// 切換 input 的類型
	const type = password1.getAttribute('type') === 'password' ? 'text' : 'password';
	password1.setAttribute('type', type);
	// 切換眼睛圖示
	if (this.classList.contains('fa-eye-slash')) {
		this.classList.remove('fa-eye-slash');
		this.classList.add('fa-eye');
	} else {
		this.classList.remove('fa-eye');
		this.classList.add('fa-eye-slash');
	}
});

