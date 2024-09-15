const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

ScrollReveal().reveal(".header_container h1", {
    ...scrollRevealOption,
});

ScrollReveal().reveal(".header_form", {
    ...scrollRevealOption,
    delay: 1000,
});

ScrollReveal().reveal(".destination_card", {
    duration: 1000,
    interval: 500,
});

document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');
    const loading = document.getElementById('loading');

    let page = 1;
    const perPage = 10;
    let isLoading = false;

    function generateCardContent(index) {
        return `Card ${index}`;
    }

    function loadCards() {
        if (isLoading) return;
        isLoading = true;
        loading.style.display = 'block';
        price = [10000, 20000, 30000, 40000, 50000, 60000];
        country = ["祕魯", "英國", "日本", "希臘", "澳洲", "荷蘭"];

        setTimeout(() => {
            for (let i = 0; i < perPage; i++) {
                let r = Math.floor(Math.random() * 6) + 1;
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4';
                card.innerHTML = `
                    <a href="#">
                        <div class="card">
                            <img src="./assets/destination-${r}.jpg" class="card-img-top">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h5 class="card-title">${country[r - 1]}</h5>
                                <div class="search_details">
                                    <div class="search_text">
                                        <div class="card-text">航班最低只要</div>
                                        <div class="card-text">直飛</div>
                                    </div>
                                    <div class="search_price">NT$${price[r - 1]}</div>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
                cardsContainer.appendChild(card);
            }

            page++;
            isLoading = false;
            loading.style.display = 'none';
        }, 1000);
    }

    function checkScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            loadCards();
        }
    }

    window.addEventListener('scroll', checkScroll);

    loadCards();
});

const country_start = document.getElementById('search_country_start');
const country_end = document.getElementById('search_country_end');
const date_start = document.getElementById('search_date_start');
const date_end = document.getElementById('search_date_end');
const people = document.getElementById('search_people');
const search = document.getElementById('search_btn');

document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('search_bar_button');
    const closeBtn = document.getElementById('overlay');
    const form = document.getElementById('search_form');

    openBtn.addEventListener('click', function () {
        form.style.display = 'flex';
        openBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        form.style.display = 'none';
        openBtn.style.display = 'block';
        closeBtn.style.display = 'none';
    })

    search.addEventListener('click', function () {
        openBtn.innerHTML = '<img src="./assets/search.png" class="search_icon"></img>' + country_start.value + '-' + country_end.value + ' · ' + date_start.value + '-' + date_end.value + ' · ' + people.value + '人';
        form.style.display = 'none';
        openBtn.style.display = 'block';
        closeBtn.style.display = 'none';
    })
});

const countryList = ["台灣", "日本", "中國", "美國", "德國"];

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', function () {
        const input = document.getElementById(this.id);
        const suggestionsDiv = document.getElementById('suggestions');
        const inputValue = input.value.toLowerCase();

        suggestionsDiv.innerHTML = '';

        if (inputValue) {
            const filteredSuggestions = countryList.filter(item =>
                item.toLowerCase().includes(inputValue)
            );

            filteredSuggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.textContent = suggestion;
                div.addEventListener('click', function () {
                    input.value = suggestion;
                    suggestionsDiv.style.display = 'none';
                });
                suggestionsDiv.appendChild(div);
            });
        }
    })
    
})

document.addEventListener('click', function (e) {
    const suggestionsDiv = document.getElementById('suggestions');
    const inputValue = e.target.value.toLowerCase();
    suggestionsDiv.innerHTML = '';
    if ( e.target.id == 'search_country_start' ) {
        console.log("start");
        suggestionsDiv.classList.remove("suggestions_country_start","suggestions_country_end");
        suggestionsDiv.classList.add("suggestions_country_start");
    }
    if ( e.target.id == 'search_country_end' ) {
        console.log("end");
        suggestionsDiv.classList.remove("suggestions_country_start","suggestions_country_end");
        suggestionsDiv.classList.add("suggestions_country_end");
    }

    if (inputValue) {
        const filteredSuggestions = countryList.filter(item =>
            item.toLowerCase().includes(inputValue)
        );
        filteredSuggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion;
            div.addEventListener('click', function () {
                e.target.value = suggestion;
                suggestionsDiv.style.display = 'none';
            });
            suggestionsDiv.appendChild(div);
        });
    }

    if (!e.target.closest('#search_country_start') && !e.target.closest('#search_country_end')) {
        suggestionsDiv.style.display = 'none';
    } else {
        suggestionsDiv.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const choiceContainer = document.getElementById('search2_choice');
    const loading = document.getElementById('loading');

    let page = 1;
    const perPage = 10;
    let isLoading = false;

    function loadChoice() {
        if (isLoading) return;
        isLoading = true;
        loading.style.display = 'block';
        price = [10000, 20000, 30000, 40000, 50000, 60000];

        setTimeout(() => {
            for (let i = 0; i < perPage; i++) {
                let r = Math.floor(Math.random() * 6);
                const choice = document.createElement('div');
                choice.className = 'search2_flight';
                choice.innerHTML = `
                <div class="search2_flight_left">
                    <div class="search2_go">
                        <div class="search2_go_airport">台灣</div>
                        <div class="search2_start">
                            <div class="search2_start_time">6:30</div>
                            <div class="search2_start_place">TPE</div>
                        </div>
                        <div class="svg-container">
                            <svg width="240" height="100" xmlns="http://www.w3.org/2000/svg">
                                <text x="110" y="30" text-anchor="middle" font-size="16">2小時40分鐘</text>
                                <line x1="20" y1="40" x2="200" y2="40" stroke="black" stroke-width="1" />
                                <polygon points="200,35 220,40 200,45" fill="black" />
                                <text x="110" y="60" text-anchor="middle" font-size="16">直達</text>
                            </svg>
                        </div>
                        <div class="search2_end">
                            <div class="search2_end_time">21:10</div>
                            <div class="search2_end_place">KIX</div>
                        </div>
                    </div>
                    <div class="search2_back">
                        <div class="search2_back_airport">桃子</div>
                        <div class="search2_start">
                            <div class="search2_start_time">21:00</div>
                            <div class="search2_start_place">KIX</div>
                        </div>
                        <div class="svg-container"></div>
                        <svg width="240" height="100" xmlns="http://www.w3.org/2000/svg">
                            <text x="110" y="30" text-anchor="middle" font-size="16">2小時45分鐘</text>
                            <line x1="20" y1="40" x2="200" y2="40" stroke="black" stroke-width="1" />
                            <polygon points="200,35 220,40 200,45" fill="black" />
                            <text x="110" y="60" text-anchor="middle" font-size="16">直達</text>
                        </svg>
                        <div class="search2_end">
                            <div class="search2_end_time">21:45</div>
                            <div class="search2_end_place">TPE</div>
                        </div>
                    </div>
                </div>
                <div class="search2_flight_right">
                    <div>NT$${price[r]}</div>
                    <div><button>選擇</button></div>
                </div>
                `;
                choiceContainer.appendChild(choice);
            }

            page++;
            isLoading = false;
            loading.style.display = 'none';
        }, 16);
    }

    function checkScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            loadChoice();
        }
    }

    window.addEventListener('scroll', checkScroll);

    loadChoice();
});

const slider = document.getElementById('myRange');
const slider2 = document.getElementById('myRange2');
const valueDisplay = document.getElementById('valueDisplay');
const valueDisplay2 = document.getElementById('valueDisplay2');

slider.addEventListener('input', function () {
    valueDisplay.textContent = this.value + '點';
});
slider2.addEventListener('input', function () {
    valueDisplay2.textContent = this.value + '點';
});

valueDisplay.textContent = slider.value + '點';
valueDisplay2.textContent = slider2.value + '點';

