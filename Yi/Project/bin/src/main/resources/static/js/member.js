document.addEventListener("DOMContentLoaded", function () {

  function member_load_LeftSide() {
    const member_leftside = document.createElement("div");
    member_leftside.id = "member_Left_InSide";
    member_leftside.innerHTML = `
        <div id="member_LeftInfo" class="member_Button">會員資訊</div>
        <div id="member_LeftPassword" class="member_Button">更改密碼</div>
        <div id="member_LeftOrder" class="member_Button">訂單查詢</div>
        <div id="member_LeftCollection" class="member_Button">機票收藏</div>
        <div id="member_LeftForum" class="member_Button">論壇收藏</div>
        `;
    document.getElementById("member_LeftSide").innerHTML = '';
    document.getElementById("member_LeftSide").appendChild(member_leftside);
    member_click_LeftSide();
    member_click_color();
  }

  function member_click_LeftSide() {
    document
      .getElementById("member_LeftInfo")
      .addEventListener("click", function () {
        member_load_MiddleSide_Info("info");
      });

    document
      .getElementById("member_LeftPassword")
      .addEventListener("click", function () {
        member_load_MiddleSide_Info("password");
      });

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
    let button_color = document.getElementsByClassName("member_Button");
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

  function member_load_MiddleSide_Info(Info_type) {

    let Info_content = "";

    if (Info_type === "info") {
      Info_content = `
      <div id="member_Order_Operation"></div>
      <div id=member_Info_MiddleInside>
        <form>
          <div>
          <div class="member_Info_Group">
              <label>帳號&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <div id="member_Info_userAccount">adsf0349</div>
            </div>
            <div class="member_Info_Group">
              <label>用戶名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <div id="member_Info_userName">奇異鳥真奇異啊</div>
            </div>
            <div class="member_Info_Group">
              <label>手機&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <div>0921651148</div>
            </div>
            <div class="member_Info_Group">
              <label>電子郵件&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <div>kiwibird@gmail.com</div>
            </div>
            <div class="member_Info_Group">
              <label>出生日期&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <div>2004/5/6</div>
            </div>
            <div class="member_Info_Group">
              <label>性別&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <div>男</div>
            </div>
          </div>
          <div id="member_Info_User">
            <img class="member_Info_Avatar" src="./icon/avatar.png" alt="" />
          </div>
        </form>
        <div id="member_Info_BottomButton">    
          <button id="member_Info_ConfirmButton" class="member_button">修改資料</button>
          <button id="member_Info_DeleteButton"  class="member_button">刪除帳號</button>
        </div>
      </div>`;
    }

    else if (Info_type === "info_revise") {
      Info_content = `
      <div id="member_Order_Operation"></div>
      <div id=member_Info_MiddleInside>
        <form>
          <div>
            <div class="member_Info_Group">
              <label for="member_Info_username">用戶名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="text" id="member_Info_username" />
            </div>
            <div class="member_Info_Group">
              <label for="member_Info_Phone">手機&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="text" id="member_Info_Phone" />
            </div>
            <div class="member_Info_Group">
              <label for="member_Info_mail">電子郵件&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="email" id="member_Info_mail" />
            </div>
            <div class="member_Info_Group">
              <label for="member_Info_Birth">出生日期&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="date" id="member_Info_Birth" />
            </div>
            <div class="member_Info_Group">
              <label>性別&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <div class="member_Info_Sex_Word">男&nbsp;</div>
              <input type="radio" name="sex" value="male" class="member_Info_Sex_Circle" />
              <div class="member_Info_Sex_Word">女&nbsp;</div>
              <input type="radio" name="sex" value="female" class="member_Info_Sex_Circle" />
            </div>
          </div>
          <div id="member_Info_User">
            <img class="member_Info_Avatar" src="./icon/avatar.png" alt="" />
            <div id="member_Info_Upload">
              <label for="member_Info_upload_Image" id="member_Info_custom_Upload_Button">上傳圖片</label>
              <input type="file" id="member_Info_upload_Image" accept="image/*" style="display: none;" />
            </div>
            <div>
              <div class="member_Info_Remind">檔案大小:最大1MB</div>
              <div class="member_Info_Remind">檔案限制:.JPEG、.PNG</div>
            </div>
          </div>
        </form>
        <button id="member_Info_ChangeButton"  class="member_button">確認修改</button>
      </div>`;
    }

    else if (Info_type === "password") {
      Info_content = `
      <div id="member_Order_Operation"></div>
      <div id=member_Password_MiddleInside>
        <form>
          <div class="member_Password_Group">
            <label for="member_Password_Old">目前的密碼</label>
            <input type="password" id="member_Password_Old" />
          </div>
          <div class="member_Password_Group">
            <label for="member_Password_New">新密碼</label>
            <input type="password" id="member_Password_New" />
          </div>
          <div class="member_Password_Group">
            <label for="member_Password_New_Confirm">新密碼確認</label>
            <input type="password" id="member_Password_New_Confirm" />
          </div>
        </form>
        <div id="member_Password_Remind">
          請輸入6個字元以上的英文字母及數字，不含特殊符號。
        </div>
        <button id="member_Password_ChangeButton" class="member_button">確認修改</button>
      </div>`;
    }

    member_load_MiddleSide(Info_content);

    if (Info_type === "info") {
      document.getElementById("member_Info_ConfirmButton").addEventListener("click", function () {
        member_load_MiddleSide_Info('info_revise');
      });

      document.getElementById("member_Info_DeleteButton").addEventListener("click", function () {
        member_load_Delete_Info();
      });

      function member_load_Delete_Info() {

        // 確保彈窗 HTML 只插入一次
        if (!document.getElementById("member_Info_deleteModal")) {
          const member_Info_Delete = `
      <div id="member_Info_deleteModal" class=".modal">
        <div id="member_Info_deleteContent">
          <span id="member_Info_close">&times;</span>
          <p>若要刪除請輸入您的帳號：</p>
          <input type="text" id="member_Info_confirmUsername" />
          <div id="member_delete_button_section">
          <button id="member_Info_confirmDelete" class="member_button">確定</button>
          <button id="member_Info_cancelDelete" class="member_button">取消</button>
          </div>
          <div id="member_Info_errormessage">輸入錯誤</div>
        </div>
      </div>`;

          // 將彈窗插入到頁面
          document.body.insertAdjacentHTML("beforeend", member_Info_Delete);
        }

        // 隱藏錯誤訊息
        document.getElementById("member_Info_errormessage").style.display = "none";

        // 移除舊的事件處理器
        document.getElementById("member_Info_close")?.removeEventListener("click", member_Info_closeModal);
        document.getElementById("member_Info_cancelDelete")?.removeEventListener("click", member_Info_closeModal);
        document.getElementById("member_Info_confirmDelete")?.removeEventListener("click", member_load_Info_confirmDelete);

        // 點擊 "×" 關閉彈窗
        document.getElementById("member_Info_close").addEventListener("click", member_Info_closeModal);

        // 點擊 "取消" 按鈕關閉彈窗
        document.getElementById("member_Info_cancelDelete").addEventListener("click", member_Info_closeModal);

        // 點擊 "確定" 按鈕執行刪除邏輯
        document.getElementById("member_Info_confirmDelete").addEventListener("click", member_load_Info_confirmDelete);

        // 點擊彈窗外部，關閉彈窗
        window.onclick = function (event) {
          if (event.target === document.getElementById("member_Info_deleteModal")) {
            member_Info_closeModal();
          }
        };

        // 顯示彈窗
        document.getElementById("member_Info_deleteModal").style.display = "block";

        //隱藏彈窗
        function member_Info_closeModal() {
          document.getElementById("member_Info_deleteModal").style.display = "none";
        }

        //刪除函式
        function member_load_Info_confirmDelete() {
          const member_Info_Delete_currentUsername = document.getElementById("member_Info_userName").textContent.trim();
          const member_Info_Delete_inputUsername = document.getElementById("member_Info_confirmUsername").value.trim();
          const member_Info_Delete_errorMessage = document.getElementById("member_Info_errormessage");

          // 隱藏錯誤訊息
          document.getElementById("member_Info_errormessage").style.display = "none";

          if (member_Info_Delete_inputUsername === member_Info_Delete_currentUsername) {
            alert("帳號已刪除");
            member_Info_closeModal();
            // 在這裡加入實際的刪除邏輯，例如 API 請求
          } else {
            document.getElementById("member_Info_errormessage").style.display = "block";
          }
        }
      }
    }

    else if (Info_type === "info_revise") {
      document.getElementById("member_Info_ChangeButton").addEventListener("click", function () {
        member_load_MiddleSide_Info('info');
        alert("資料已修改！");
      });
    }

    else if (Info_type === "password") {
      document.getElementById("member_Password_ChangeButton").addEventListener("click", function () {
        alert("密碼已修改！");
      });
    }
  }

  function member_load_MiddleSide_Order(status) {

    const Order_stateMap = {
      depart: '待出發',
      pay: '待付款',
      finish: '已完成',
      cancel: '已取消'
    };

    const Order_currentState = Order_stateMap[status] || '待出發';

    const Order_content = `  <div id="member_Order_Operation">
          <div id="member_Order_Depart" class="member_Button">待出發</div>
          <div id="member_Order_Pay" class="member_Button">待付款</div>
          <div id="member_Order_Finish" class="member_Button">已完成</div>
          <div id="member_Order_Cancel" class="member_Button">已取消</div>
        </div>
        <section id="member_Order_Ticket">
          <section id="member_Order_TopSchedule">
              <div id="member_Order_TotalSchedule">
                <img style="width: 1.8vw" src="./icon/plane.png" alt="" />
                <span id="member_Order_Form">訂單編號</span>
                <span style="font-size: 1vw">:&nbsp;</span>
                <span id="member_Order_Number"> AE9268 </span>
                <span style="font-size: 1vw">｜&nbsp;</span>
                <span id="member_Order_GoCity">台北</span>
                <img style="width: 1.1vw" src="./icon/arrow-come_back.png" alt="" />
                <span id="member_Order_BackCity">KIX</span>
              </div>
              <div id="member_Order_State"> 
                  <div>狀態:</div>
                  <span>${Order_currentState}</span>
                 </div>
            </section>

            <section id="member_Order_WholeTicket">
              <div id="member_Order_GoPlane">
                <span id="member_Order_Go">去程</span>
                <div style="font-size: 1vw">&nbsp;:&nbsp;</div>
                <span id="member_Order_GoTime">2024年8月30日(週五)</span>
                <span>｜</span>
                <span id="member_Order_Class">經濟艙</span>
              </div>
              <div id="member_Order_BigMiddle">
                <span id="member_Order_Plane">長榮</span>
                <div id="member_Order_Schedule">
                  <div id="member_Order_DepartTime">
                    <div>
                      <span id="member_Order_DepartSmallTime">9:00</span>
                    </div>
                    <div>
                      <span id="member_Order_DepartCity">KIX</span>
                    </div>
                  </div>
                  <div id="member_Order_WholeTime">
                    <svg
                      width="100%"
                      height="auto"
                      viewBox="0 0 240 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <text x="115" y="40" text-anchor="middle" font-size="1vw">
                        2小時45分鐘
                      </text>
                   
                      <line 
                        x1="20"
                        y1="50"
                        x2="200"
                        y2="50"
                        stroke="black"
                        stroke-width="1"
                      />
                      <polygon points="200,45 220,50 200,55" fill="black" />
          
                      <text x="115" y="75" text-anchor="middle" font-size="1vw">
                        直飛
                      </text>
                    </svg>
                  </div>
                  <div id="member_Order_LandTime">
                    <div>
                      <span id="member_Order_LandSmallTime">11:45</span>
                    </div>
                    <div>
                      <span id="member_Order_LandCity">TPE</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="member_Order_WholeTicket">
              <div id="member_Order_GoPlane">
                <span id="member_Order_Go">回程</span>
                <div style="font-size: 1vw">&nbsp;:&nbsp;</div>
                <span id="member_Order_GoTime">2024年9月1日(週一)</span>
                <span>｜</span>
                <span id="member_Order_Class">經濟艙</span>
              </div>
              <div id="member_Order_BigMiddle">
                <span id="member_Order_Plane">長榮</span>
                <div id="member_Order_Schedule">
                  <div id="member_Order_DepartTime">
                    <div>
                      <span id="member_Order_DepartSmallTime">21:00</span>
                    </div>
                    <div>
                      <span id="member_Order_DepartCity">KIX</span>
                    </div>
                  </div>
                  <div id="member_Order_WholeTime">
                    <svg
                      width="100%"
                      height="auto"
                      viewBox="0 0 240 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <text x="115" y="40" text-anchor="middle" font-size="1vw">
                        2小時45分鐘
                      </text>
                      <line
                        x1="20"
                        y1="50"
                        x2="200"
                        y2="50"
                        stroke="black"
                        stroke-width="1"
                      />
                      <polygon points="200,45 220,50 200,55" fill="black" />
                      <text x="115" y="75" text-anchor="middle" font-size="1vw">
                        直飛
                      </text>
                    </svg>
                  </div>
                  <div id="member_Order_LandTime">
                    <div>
                      <span id="member_Order_LandSmallTime">23:45</span>
                    </div>
                    <div>
                      <span id="member_Order_LandCity">TPE</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="member_Order_BottomPrice">
              <div id="member_Order_PeoplePrice">
                <div id="member_Order_People">
                  <span>張數&nbsp;:</span>
                  <span>1</span>
                </div>
                <div id="member_Order_TotalPrice">
                  <span>總價&nbsp;NT$</span>
                  <span>8,829</span>
                </div>
              </div>
            </section>
      </section>`;

    member_load_MiddleSide(Order_content);
    setButtonColor(status);

    function setButtonColor(status) {
      const orderQueryButton = document.getElementById("member_LeftOrder"); // 訂單查詢按鈕
      const isDepartOrPay = status === 'depart' || status === 'pay' || status === 'finish' || status === 'cancel';
      orderQueryButton.style.backgroundColor = isDepartOrPay ? "#6adceb" : ""; // 設置顏色
    }

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
    <section id="member_Collection_Ticket">
      <section id="member_Collection_TopSchedule">
        <div id="member_Collection_TotalSchedule">
          <img style="width: 1.8vw" src="./icon/plane.png" alt="" />
          <span id="member_Collection_Form">訂單編號</span>
          <span style="font-size: 1vw">:&nbsp;</span>
          <span id="member_Collection_Number"> AE9268 </span>
          <span style="font-size: 1vw">｜&nbsp;</span>
          <span id="member_Collection_GoCity">TPE</span>
          <img style="width: 1.1vw" src="./icon/arrow-come_back.png" alt="" />
          <span id="member_Collection_BackCity">KIX</span>
        </div>
        <div id="member_Collection_State">
          <i id="heart" class="fa-solid fa-heart heart-icon"></i>
        </div>
      </section>

      <section id="member_Collection_WholeTicket">
        <div id="member_Collection_GoPlane">
          <span id="member_Collection_Go">去程</span>
          <div style="font-size: 1vw">&nbsp;:&nbsp;</div>
          <span id="member_Collection_GoTime">2024年8月30日(週五)</span>
          <span>｜</span>
          <span id="member_Collection_Class">經濟艙</span>
        </div>
        <div id="member_Collection_BigMiddle">
          <span id="member_Collection_Plane">長榮</span>
          <div id="member_Collection_Schedule">
            <div id="member_Collection_DepartTime">
              <div>
                <span id="member_Collection_DepartSmallTime">9:00</span>
              </div>
              <div>
                <span id="member_Collection_DepartCity">KIX</span>
              </div>
            </div>
            <div id="member_Collection_WholeTime">
              <svg
                width="100%"
                height="auto"
                viewBox="0 0 240 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text x="115" y="40" text-anchor="middle" font-size="1vw">
                  2小時45分鐘
                </text>
                <line
                  x1="20"
                  y1="50"
                  x2="200"
                  y2="50"
                  stroke="black"
                  stroke-width="1"
                />
                <polygon points="200,45 220,50 200,55" fill="black"/>
                <text x="115" y="75" text-anchor="middle" font-size="1vw">
                  直飛
                </text>
              </svg>
            </div>
            <div id="member_Collection_LandTime">
              <div>
                <span id="member_Collection_LandSmallTime">11:45</span>
              </div>
              <div>
                <span id="member_Collection_LandCity">TPE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="member_Collection_WholeTicket">
        <div id="member_Collection_GoPlane">
          <span id="member_Collection_Go">回程</span>
          <div style="font-size: 1vw">&nbsp;:&nbsp;</div>
          <span id="member_Collection_GoTime">2024年9月1日(週一)</span>
          <span>｜</span>
          <span id="member_Collection_Class">經濟艙</span>
        </div>
        <div id="member_Collection_BigMiddle">
          <span id="member_Collection_Plane">長榮</span>
          <div id="member_Collection_Schedule">
            <div id="member_Collection_DepartTime">
              <div>
                <span id="member_Collection_DepartSmallTime">21:00</span>
              </div>
              <div>
                <span id="member_Collection_DepartCity">KIX</span>
              </div>
            </div>
            <div id="member_Collection_WholeTime">
              <svg
                 width="100%"
                 height="auto"
                 viewBox="0 0 240 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text x="115" y="40" text-anchor="middle" font-size="1vw">
                  2小時45分鐘
                </text>
                <line
                  x1="20"
                  y1="50"
                  x2="200"
                  y2="50"
                  stroke="black"
                  stroke-width="1"
                />
                <polygon points="200,45 220,50 200,55" fill="black" />
                <text x="115" y="75" text-anchor="middle" font-size="1vw">
                  直飛
                </text>
              </svg>
            </div>
            <div id="member_Collection_LandTime">
              <div>
                <span id="member_Collection_LandSmallTime">23:45</span>
              </div>
              <div>
                <span id="member_Collection_LandCity">TPE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="member_Collection_BottomPrice">
        <div id="member_Collection_NowPrice">
        <span>目前票價&nbsp;NT$</span>
        <span>8,829</span>
        </div>
         <button id="member_Collection_GOBuy" class="member_button">馬上訂票&nbsp;<i class="fa-solid fa-arrow-right"></i></button>
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
        <div id="member_Forum_MyArticle" class="member_Forum_Button">我的文章</div>
        <div id="member_Forum_MyCollection" class="member_Forum_Button">文章收藏</div>
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
        <div id="member_Forum_MyArticle" class="member_Forum_Button">我的文章</div>
        <div id="member_Forum_MyCollection" class="member_Forum_Button">文章收藏</div>
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
  member_load_MiddleSide_Info("info");
});

