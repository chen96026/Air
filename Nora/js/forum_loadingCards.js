// Write:hover
$(() => {
    $('.forum_write').hover
    (() => {
        $('.forum_writeImg').addClass('forum_writeImg_hover');
        $('.forum_writeP').addClass('forum_writeP_hover');
    },
    () => {
        $('.forum_writeImg').removeClass('forum_writeImg_hover');
        $('.forum_writeP').removeClass('forum_writeP_hover');
    });
});

// Loading Cards
document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');
    const loading = document.getElementById('loading');

    let page = 1;
    const perPage = 6;
    let isLoading = false;

    function generateCardContent(index) {
        return `Card ${index}`;
    }

    function loadCards() {
        if (isLoading) return;
        isLoading = true;
        loading.style.display = 'block';

        setTimeout(() => {
            for (let i = 0; i < perPage; i++) {
                const card = document.createElement('div');
                card.innerHTML = `
                    <div class="forum_card">
                        <a href="">
                            <article>
                                <img class="forum_articleImg" src="https://picsum.photos/400/240?random=`+ Math.floor(Math.random() * 99) + `" alt="">
                                <h2>金閣寺真的好美！</h2>
                                <p class="forum_articleMore">
                                    這次旅遊去了金閣寺，真的超棒！<br>
                                    金光閃閃的寺廟在湖面上映出來，超級夢幻。周圍的環境也很寧靜，走在小徑上超放鬆。很推薦來京都旅遊的朋友們有時間一定要來這邊走
                                </p>
                            </article>
                            <div>
                                <img class="forum_authorImg" src="https://picsum.photos/50?random=`+ Math.floor(Math.random() * 99) + `" alt="author_icon">
                                <p class="forum_author">無名背包客</p>
                                <p class="forum_postDate">2024-01-01</p>
                            </div>
                        </a>
                    </div>
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