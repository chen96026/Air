function member_load_MiddleSide(content) {
  document.getElementById("member_Main").innerHTML = '';
  document.getElementById("member_Main").innerHTML = content;
}

function member_load_MiddleSide_Order(status) {

  const Order_stateMap = {
    depart: '待出發',
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
  const go_airline = 'BR700'
  const go_departSmallTime = '9:00';
  const go_departCity = 'KIX';
  const go_wholeTime = '2小時45分鐘';
  const go_landSmallTime = '11:45';
  const go_landCity = 'TPE';

  const back_goTime = '2024年8月30日(週五)';
  const back_orderclass = '經濟艙';
  const back_plane = '長榮航空';
  const back_airline = 'BR700'
  const back_departSmallTime = '9:00';
  const back_departCity = 'KIX';
  const back_wholeTime = '2小時45分鐘';
  const back_landSmallTime = '11:45';
  const back_landCity = 'TPE';

  const Order_currentState = Order_stateMap[status] || '待出發';

  const Order_content = `  <div id="member_Order_Operation">
          <div class="member_Order_Button"><span id="member_Order_Depart" class="member_Order_InsideButton">目前訂單</span></div>
          <div class="member_Order_Button"><span id="member_Order_Finish" class="member_Order_InsideButton">歷史訂單</span></div>
          <div class="member_Order_Button"><span id="member_Order_Cancel" class="member_Order_InsideButton">已取消訂單</span></div>
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
                  <span>&nbsp;&nbsp;</span>
                  <span id="member_Order_airline">${go_airline}</span>
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
                   <span>&nbsp;&nbsp;</span>
                  <span id="member_Order_airline">${back_airline}</span>
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
                        ${back_wholeTime}
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

    if (event.target && event.target.id === "member_Order_Finish") {
      member_load_MiddleSide_Order('finish');
    }

    if (event.target && event.target.id === "member_Order_Cancel") {
      member_load_MiddleSide_Order('cancel');
    }
  });
}

member_load_MiddleSide_Order();


