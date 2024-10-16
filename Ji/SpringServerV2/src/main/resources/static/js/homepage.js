const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".banner-left", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".banner-right", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".popular-destination-area", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".img-fluid", {
  ...scrollRevealOption,
  delay: 500,
  interval: 200,
});

// 點擊get Started後會聚焦在航班出發地輸入欄位
document.getElementById("HpStardBtn").addEventListener("click", function() {
	// Focus the first input field without moving the page
	document.getElementById("des_start").focus();
	document.getElementById("des_start").style.borderColor = 'red';
});

// 新聞的輪播
let slideIndex = 1;
let timer;
showSlides(slideIndex);

function posterPlusSlides(n) {
	showSlides(slideIndex += n);
}

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("container-fluid");
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex - 1].style.display = "flex";
	// clearInterval(timer);
	// timer = setInterval(() => { showSlides(++slideIndex); }, 3000);
}

document.getElementById('search_btn').addEventListener('click', function(event) {

	localStorage.removeItem('selectedFlights');
	localStorage.removeItem('selectedFlights2');

	event.preventDefault();
	const desStart = document.getElementById('des_start').value;
	const desEnd = document.getElementById('des_end').value;
	const dateStart = document.getElementById('date_start').value;
	const dateEnd = document.getElementById('date_end').value;
	const adults = document.getElementById('adults').value;
	const child = document.getElementById('child').value;
	const type = document.querySelector('input[name="type"]:checked').value;

	const formData = `?des_start=${desStart}&des_end=${desEnd}&date_start=${dateStart}&date_end=${dateEnd}&adults=${adults}&child=${child}&type=${type}`;

	// 检查是否有任何输入框为空

	if (!desStart || !desEnd || !dateStart || !dateEnd || !adults || !child) {
		event.preventDefault();
		alert('請完整填寫所有欄位');
	} else {
		if (desEnd === '世界各地') {
			window.location.href = 'http://localhost:8890/searchpage?des_start=台灣&des_end=世界各地&date_start=2024%2F10%2F29&date_end=2024%2F10%2F30&adults=1&child=0&type=經濟艙';
		} else {
			fetch('http://localhost:8890/plane/check_country', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ country: desEnd })
			})
				.then(response => response.json())
				.then(data => {
					searchPage = data.length !== 0 ? 'http://localhost:8890/searchpage' : 'http://localhost:8890/searchpage2';
					window.location.href = searchPage + formData;
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	}
});