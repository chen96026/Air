function member_load_MiddleSide(content) {
    document.getElementById("member_Main").innerHTML = '';
    document.getElementById("member_Main").innerHTML = content;
}

function member_load_MiddleSide_Collection() {
    const Collection_content = `
  <div id="member_Order_Operation"></div>
<section id="member_Collection_WholeTicket">
<div id="member_Collection_BigMiddle">
  <span id="member_Collection_Plane">長榮</span>
  <div id="member_Collection_Schedule">

    <div id="member_Collection_DepartTime">
      <span id="member_Collection_DepartSmallTime">9:00</span>
      <span id="member_Collection_DepartCity">KIX</span>
    </div>

    <div id="member_Collection_WholeTime">
      <div id="member_Collection_WholeTime">2小時45分</div>
      <div class="arrow-container"></div>
      <div>直飛</div>
    </div>

    <div id="member_Collection_LandTime">
      <span id="member_Collection_LandSmallTime">11:45</span>
      <span id="member_Collection_LandCity">TPE</span>
    </div>

  </div>
</div>
</div>
   <section id="member_Collection_BottomPrice">
      <div id="member_Collection_NowPrice">
      <span>目前票價&nbsp;NT$</span>
      <span>8,829</span>
      </div>
       <button id="member_Collection_GOBuy" class="member_button">馬上訂票&nbsp;<i class="fa-solid fa-arrow-right"></i></button>
    </section>
</section>
  </section>
`;
    member_load_MiddleSide(Collection_content);

    //收藏頁點擊變色
    document.getElementById("heart").addEventListener("click", function () {
        heart.classList.toggle("liked");
    });
}

member_load_MiddleSide_Collection();


