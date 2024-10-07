function member_load_MiddleSide(content) {
  document.getElementById("member_Main").innerHTML = content;
}

function member_forum_generateHTML(member_forum_imageUrl, member_forum_title, member_forum_content, member_forum_authorImage, member_forum_author, member_forum_date) {
  return `
    <div class="member_forum_card">
      <a href="./forum_detail.html">
        <article>
          <img class="member_forum_articleImg" src="${member_forum_imageUrl}" alt="${member_forum_title}">
          <h3>${member_forum_title}</h3>
          <p class="member_forum_articleMore">${member_forum_content}</p>
        </article>
        <div>
          <img class="member_forum_authorImg" src="${member_forum_authorImage}" alt="author_icon">
          <p class="member_forum_author">${member_forum_author}</p>
          <p class="member_forum_postDate">${member_forum_date}</p>
        </div>
      </a>
    </div>
  `;
}

function member_load_MiddleSide_Forum(Forum_type = "article") {
  let Forum_content = `
    <div id="member_Forum_MiddleSide">
  `;

  if (Forum_type === "article") {
    Forum_content += member_forum_generateHTML(
      "https://picsum.photos/400/240?random=0",
      "超級可愛的熊本熊!",
      "終於看到心心念念的熊本熊! 現場拍真的是超~~~~大一隻😆😆🤣🤣 ...",
      "https://picsum.photos/50?random=0",
      "奇異鳥真奇異啊",
      "2024-09-14"
    );
  } else if (Forum_type === "collection") {
    Forum_content += member_forum_generateHTML(
      "https://picsum.photos/400/240?random=3",
      "姬路城美景",
      "今天來到了姬路城，真的是如傳聞中般壯觀！🌸 ...",
      "https://picsum.photos/50?random=3",
      "無名旅行者",
      "2024-01-15"
    );
  }
  `</div>`;

  member_load_MiddleSide(Forum_content);

  document.addEventListener("click", function (event) {
    if (event.target && event.target.id === "member_Forum_MyArticle") {
      member_load_MiddleSide_Forum("article");
    }
    if (event.target && event.target.id === "member_Forum_MyCollection") {
      member_load_MiddleSide_Forum("collection");
    }
  });
}

member_load_MiddleSide_Forum();