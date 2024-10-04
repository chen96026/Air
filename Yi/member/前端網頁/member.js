document.addEventListener("DOMContentLoaded", function () {

  function member_load_LeftSide() {
    const member_leftside = document.createElement("div");
    member_leftside.id = "member_Left_InSide";
    member_leftside.innerHTML = `
        <div id="member_LeftOrder" class="member_LeftButton"><span class="member_LeftInsideButton">訂單查詢</span></div>
        <div id="member_LeftCollection" class="member_LeftButton"><span class="member_LeftInsideButton">時程收藏</span></div>
        <div id="member_LeftForum" class="member_LeftButton"><span class="member_LeftInsideButton">論壇收藏</span></div>
        `;
    document.getElementById("member_LeftSide").innerHTML = '';
    document.getElementById("member_LeftSide").appendChild(member_leftside);
    member_click_LeftSide();
    member_click_color();
  }

  function member_click_LeftSide() {

    document
      .getElementById("member_LeftOrder")
      .addEventListener("click", function () {
        member_load_MiddleSide_Order();
        member_click_color();
      });

    document
      .getElementById("member_LeftCollection")
      .addEventListener("click", function () {
        member_load_MiddleSide_Collection();
      });

    document
      .getElementById("member_LeftForum")
      .addEventListener("click", function () {
        member_load_MiddleSide_Forum("article");
      });
  }

  function member_click_color() {
    let button_color = document.getElementsByClassName("member_LeftInsideButton");
    for (let i = 0; i < button_color.length; i++) {
      button_color[i].onclick = function () {
        for (let j = 0; j < button_color.length; j++) {
          button_color[j].style.backgroundColor = "";
        }
        this.style.backgroundColor = "#6adceb";
      }
    }
  }

  function member_load_MiddleSide(content) {
    document.getElementById("member_MiddleSide").innerHTML = '';
    document.getElementById("member_MiddleSide").innerHTML = content;
  }

  function member_load_MiddleSide_Order(status) {

    const Order_stateMap = {
      depart: '待出發',
      pay: '待付款',
      finish: '已完成',
      cancel: '已取消'
    };

    const orderNumber = 'AE9268';
    const ticketCount = '2';
    const totalPrice = '8,829';
    const goCity = 'TPE';
    const backCity = 'KIX';

    const go_goTime = '2024年8月30日(週五)';
    const go_orderclass = '經濟艙';
    const go_plane = '長榮航空';
    const go_departSmallTime = '9:00';
    const go_departCity = 'KIX';
    const go_wholeTime = '2小時45分鐘';
    const go_landSmallTime = '11:45';
    const go_landCity = 'TPE';

    const back_goTime = '2024年8月30日(週五)';
    const back_orderclass = '經濟艙';
    const back_plane = '長榮航空';
    const back_departSmallTime = '9:00';
    const back_departCity = 'KIX';
    const back_wholeTime = '2小時45分鐘';
    const back_landSmallTime = '11:45';
    const back_landCity = 'TPE';

    const Order_currentState = Order_stateMap[status] || '待出發';

    const Order_content = `  <div id="member_Order_Operation">
          <div class="member_Order_Button"><span id="member_Order_Depart" class="member_Order_InsideButton">目前訂單</span></div>
          <!--<div class="member_Order_Button"><span id="member_Order_Pay" class="member_Order_InsideButton">待付款</span></div>-->
          <div class="member_Order_Button"><span id="member_Order_Finish" class="member_Order_InsideButton">歷史訂單</span></div>
          <!--<div class="member_Order_Button"><span id="member_Order_Cancel" class="member_Order_InsideButton">已取消訂單</span></div>-->
        </div>
        
        <section id="member_Order_Ticket">
          <section id="member_Order_TopSchedule">
              <div id="member_Order_TotalSchedule">
                <i class="fas fa-plane icon"></i>
                <span id="member_Order_Form">訂單編號</span>
                <span style="font-size: 1vw">:&nbsp;</span>
                <span id="member_Order_Number">${orderNumber}</span>
                <span style="font-size: 1vw">｜&nbsp;</span>
                <span id="member_Order_GoCity">${goCity}</span>
                <img style="width: 1.1vw" src="./icon/arrow-come_back.png" alt="" />
                &nbsp;
                <span id="member_Order_BackCity">${backCity}</span>
              </div>
              <div id="member_Order_State"> 
                  <div>狀態</div>
                  <span>&nbsp;:&nbsp;</span>
                  <span>${Order_currentState}</span>
                 </div>
            </section>

            <section id="member_Order_WholeTicket">
              <div id="member_Order_GoPlane">
                <div id="member_Order_Go_side">
                  <span id="member_Order_Go">去程</span>
                  <span>&nbsp;:&nbsp;</span>
                  <span id="member_Order_GoTime">${go_goTime}</span>
                </div>

                <div id="member_Order_Plane_side">
                  <span id="member_Order_Plane">${go_plane}</span>
                  <span>&nbsp;:&nbsp;</span>
                  <span id="member_Order_Class">${go_orderclass}</span>
                </div>

              </div>
              <div id="member_Order_BigMiddle">
                
                <div id="member_Order_Schedule">
                  <div id="member_Order_DepartTime">
                    <div>
                      <span id="member_Order_DepartSmallTime">${go_departSmallTime}</span>
                    </div>
                    <div>
                      <span id="member_Order_DepartCity">${go_departCity}</span>
                    </div>
                  </div>
                  <div id="member_Order_WholeTime">
                      <div>
                        ${go_wholeTime}
                      </div>
                      <div class="arrow-container"></div>
                      <div>
                        直飛
                      </div>
                  </div>
                  <div id="member_Order_LandTime">
                    <div>
                      <span id="member_Order_LandSmallTime">${go_landSmallTime}</span>
                    </div>
                    <div>
                      <span id="member_Order_LandCity">${go_landCity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="member_Order_WholeTicket">
              <div id="member_Order_GoPlane">
                <div id="member_Order_Go_side">
                  <span id="member_Order_Go">去程</span>
                  <div style="font-size: 1vw">&nbsp;:&nbsp;</div>
                  <span id="member_Order_GoTime">${back_goTime}</span>
                </div>

                <div id="member_Order_Plane_side">
                  <span id="member_Order_Plane">${back_plane}</span>
                  <span>&nbsp;:&nbsp;</span>
                  <span id="member_Order_Class">${back_orderclass}</span>
                </div>

              </div>
              <div id="member_Order_BigMiddle">
                
                <div id="member_Order_Schedule">
                  <div id="member_Order_DepartTime">
                    <div>
                      <span id="member_Order_DepartSmallTime">${back_departSmallTime}</span>
                    </div>
                    <div>
                      <span id="member_Order_DepartCity">${back_departCity}</span>
                    </div>
                  </div>
                  <div id="member_Order_WholeTime">
                   
                      <div>
                        ${go_wholeTime}
                      </div>
                      <div class="arrow-container"></div>
                      <div>
                        直飛
                      </div>
               
                  </div>
                  <div id="member_Order_LandTime">
                    <div>
                      <span id="member_Order_LandSmallTime">${back_landSmallTime}</span>
                    </div>
                    <div>
                      <span id="member_Order_LandCity">${back_landCity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="member_Order_BottomPrice">
              <div id="member_Order_PeoplePrice">
                <div id="member_Order_People">
                  <span>張數&nbsp;:</span>
                  <span>${ticketCount}</span>
                </div>
                <div id="member_Order_TotalPrice">
                  <span>總價&nbsp;NT$</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </section>
      </section>`;

    member_load_MiddleSide(Order_content);

    document.addEventListener("click", function (event) {

      if (event.target && event.target.id === "member_Order_Depart") {
        member_load_MiddleSide_Order('depart');
      }

      if (event.target && event.target.id === "member_Order_Pay") {
        member_load_MiddleSide_Order('pay');
      }

      if (event.target && event.target.id === "member_Order_Finish") {
        member_load_MiddleSide_Order('finish');
      }

      if (event.target && event.target.id === "member_Order_Cancel") {
        member_load_MiddleSide_Order('cancel');
      }
    });
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

  function member_load_MiddleSide_Forum(Forum_type) {

    let Forum_content = "";

    if (Forum_type === "article") {
      Forum_content = ` 
      <div id="member_Forum_Operation">
        <div class="member_Forum_Button"><span id="member_Forum_MyArticle" class="member_Forum_InsideButton">我的文章</span></div>
        <div class="member_Forum_Button"><span id="member_Forum_MyCollection" class="member_Forum_InsideButton">文章收藏</span></div>
      </div>
      <div id=member_Forum_MiddleSide>
          <div id="member_Forum_InSide">
           <div class="member_forum_card">
                <a href="./forum_detail.html">
                    <article>
                        <img class="member_forum_articleImg" src="https://picsum.photos/400/240?random=0" alt="">
                        <h3>超級可愛的熊本熊!</h3>
                        <p class="member_forum_articleMore">
                            終於看到心心念念的熊本熊!<br>
                            現場拍真的是超~~~~大一隻😆😆🤣🤣<br>
                            除此之外，沒想到熊本的食物都超級好吃！<br>
                            除了拉麵以外，還有超級有名的赤牛丼都好
                        </p>
                        </article>
                         <div>
                      <img class="member_forum_authorImg" src="https://picsum.photos/50?random=0" alt="">
                      <p class="member_forum_author">奇異鳥真奇異啊</p>
                      <p class="member_forum_postDate">2024-09-14</p>
                  </div>
                </a>
            </div>
            <div class="member_forum_card">
                <a href="">
                    <article>
                        <img class="member_forum_articleImg" src="https://picsum.photos/400/240?random=1" alt="">
                        <h3>德國之旅</h3>
                        <p class="member_forum_articleMore">
                            慕尼黑這座城市真是充滿了魅力和歷史！🌟🏰 漫步在古老的廣場，感受著濃厚的歷史氛圍，每個角落都充滿了故事。無論是壯麗的瑪利亞廣場、宏偉的慕尼黑皇宮，還是迷人的英國花園，都讓人流連忘返。品嚐當地的啤酒和美食，更是旅行的一大亮點。慕尼黑的氛圍溫暖而親切，每一刻都值得珍藏。期待下次再來探索更多
                        </p>
                    </article>
                    <div>
                        <img class="member_forum_authorImg" src="https://picsum.photos/50?random=1" alt="author_icon">
                        <p class="member_forum_author">無名背包客</p>
                        <p class="member_forum_postDate">2024-01-01</p>
                    </div>
                </a>
            </div>
            <div class="member_forum_card">
                <a href="">
                    <article>
                        <img class="member_forum_articleImg" src="https://picsum.photos/400/240?random=2" alt="">
                        <h3>金閣寺真的好美！</h3>
                        <p class="member_forum_articleMore">
                            這次旅遊去了金閣寺，真的超棒！<br>
                            金光閃閃的寺廟在湖面上映出來，超級夢幻。周圍的環境也很寧靜，走在小徑上超放鬆。很推薦來京都旅遊的朋友們有時間一定要來這邊走
                        </p>
                    </article>
                    <div>
                        <img class="member_forum_authorImg" src="https://picsum.photos/50?random=2" alt="author_icon">
                        <p class="member_forum_author">無名背包客</p>
                        <p class="member_forum_postDate">2024-01-01</p>
                    </div>
                </a>
            </div>
            </div>
          `;
    }

    else if (Forum_type === "collection") {
      Forum_content = `  
      <div id="member_Forum_Operation">
        <div class="member_Forum_Button"><span id="member_Forum_MyArticle" class="member_Forum_InsideButton">我的文章</span></div>
        <div class="member_Forum_Button"><span id="member_Forum_MyCollection" class="member_Forum_InsideButton">文章收藏</span></div>
      </div><div id=member_Forum_MiddleSide>
        <div id="member_Forum_InSide">
         <div class="member_forum_card">
              <a href="./forum_detail.html">
                  <article>
                      <img class="member_forum_articleImg" src="https://picsum.photos/400/240?random=0" alt="">
                      <h3>美麗的姬路城</h3>
                      <p class="member_forum_articleMore">
                          今天來到了美麗的姬路城，真的是如傳聞中般壯觀！🌸 
                          白鷺城的外牆在藍天下顯得格外耀眼✨，漫步在古老的城牆間，
                          彷彿穿越回了戰國時代。特別是登上天守閣後，
                          俯瞰整個城市的景色實在令人難忘！景色優美之外，
                          城內還保留了許多歷史遺跡，讓人感受到濃厚的日本文化。
                      </p>
                      </article>
                       <div>
                    <img class="member_forum_authorImg" src="https://picsum.photos/50?random=0" alt="">
                    <p class="member_forum_author">奇異鳥真奇異啊</p>
                    <p class="member_forum_postDate">2024-09-14</p>
                </div>
              </a>
          </div>
          <div class="member_forum_card">
              <a href="">
                  <article>
                      <img class="member_forum_articleImg" src="https://picsum.photos/400/240?random=1" alt="">
                      <h3>沖繩水族館好讚</h3>
                      <p class="member_forum_articleMore">
                          今天探訪了沖繩水族館，真的是一場視覺與心靈的饗宴！
                          🐠🦈 巨大的海洋生物展示區讓我驚嘆不已，特別是那隻龐大的鯨鯊，真是壯觀至極！
                          🌊💙 站在透明的圓頂前，看著各種五彩斑斕的魚群悠游其間，仿佛進入了夢幻的海底世界。
                          這次的旅行讓我更加珍惜和愛護海洋生物，推薦大家一定要來感受這份美麗與震撼！
                      </p>
                  </article>
                  <div>
                      <img class="member_forum_authorImg" src="https://picsum.photos/50?random=1" alt="author_icon">
                      <p class="member_forum_author">無名背包客</p>
                      <p class="member_forum_postDate">2024-01-01</p>
                  </div>
              </a>
          </div>
          <div class="member_forum_card">
              <a href="">
                  <article>
                      <img class="member_forum_articleImg" src="https://picsum.photos/400/240?random=2" alt="">
                      <h3>漫步在布拉格</h3>
                      <p class="member_forum_articleMore">
                          在捷克首都布拉格的旅行真是一次難忘的經歷！
                          🏰✨ 漫步在古老的查理大橋上，感受著歷史的沉澱，仿佛時光倒流。
                          🌉📸 布拉格城堡的壯麗景色也讓人驚嘆不已，尤其是俯瞰整個城市的全景，
                          美得讓人屏息。🍻🗺️ 品嘗了當地美味的捷克啤酒和傳統美食，
                          完美地為這次旅行畫上句點。如果你也喜歡古典與浪漫的氛圍，
                          布拉格絕對是個不容錯過的城市！
                      </p>
                  </article>
                  <div>
                      <img class="member_forum_authorImg" src="https://picsum.photos/50?random=2" alt="author_icon">
                      <p class="member_forum_author">無名背包客</p>
                      <p class="member_forum_postDate">2024-01-01</p>
                  </div>
              </a>
          </div>
          </div>
        `;
    }

    member_load_MiddleSide(Forum_content);

    document.addEventListener("click", function (event) {
      if (event.target && event.target.id === "member_Forum_MyArticle") {
        member_load_MiddleSide_Forum("collection");
      }
      if (event.target && event.target.id === "member_Forum_MyCollection") {
        member_load_MiddleSide_Forum("article");
      }
    });
  }

  member_load_LeftSide("會員資訊");
  member_load_MiddleSide_Order();
});

