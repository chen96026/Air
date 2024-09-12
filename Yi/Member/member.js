document.addEventListener("DOMContentLoaded", function () {
  //新增跳轉網頁方法
  function member_Click() {
    let url = "";
    switch (this.id) {
      case "member_LeftMember":
        url = "./member_Home.html?Color=member_LeftMember";
        break;
      case "member_LeftInfo":
        url = "./member_Info.html?Color=member_LeftInfo";
        break;
      case "member_LeftPassword":
        url = "./member_Password.html?Color=member_LeftPassword";
        break;
      case "member_LeftOrder":
        url = "./member_Order.html?Color=member_LeftOrder";
        break;
      case "member_LeftCard":
        url = "./member_Card_Plus.html?Color=member_LeftCard";
        break;
      case "member_Card_PlusButton":
        url = "./member_Card_Write.html?Color=member_Card_PlusButton";
        break;
      case "member_Card_CreditButton":
        url = "./member_Card_Write.html?Color=member_Card_CreditButton";
        break;
      case "member_Card_ConfirmButton":
        url = "./member_Card_CreditCard.html?Color=member_Card_ConfirmButton";
        break;
      case "member_LeftCollection":
        url = "./member_Collection.html?Color=member_LeftCollection";
        break;
      case "member_Order_All":
        url = "./member_Order.html?Color=member_Order_All";
        break;
      case "member_Order_Pay":
        url = "./member_Order_Pay.html?Color=member_Order_Pay";
        break;
      case "member_Order_Depart":
        url = "./member_Order_Depart.html?Color=member_Order_Depart";
        break;
      case "member_Order_Finish":
        url = "./member_Order_Finished.html?Color=member_Order_Finish";
        break;
      case "member_Order_Cancel":
        url = "./member_Order_Cancel.html?Color=member_Order_Cancel";
        break;
      default:
        return;
    }
    if (url) {
      window.location.href = url;
    }
  }
  document
    .querySelectorAll(
      "#member_LeftMember,#member_LeftInfo,#member_LeftPassword,#member_LeftOrder,#member_LeftCard,#member_Card_PlusButton,#member_Card_CreditButton,#member_Card_ConfirmButton,#member_LeftCollection,#member_Order_All,#member_Order_Pay,#member_Order_Depart,#member_Order_Finish,#member_Order_Cancel"
    )
    .forEach((element) => {
      element.addEventListener("click", member_Click);
    });

  //左側選擇欄，新增點擊分頁的顏色hover
  const params = new URLSearchParams(window.location.search);
  const member_CoverColor = params.get("Color");
  if (member_CoverColor) {
    const element = document.getElementById(member_CoverColor);
    if (element) {
      (element.style.backgroundColor = "#79470d"),
        (element.style.color = "#FFFFFF");
    }
  }

  //收藏頁點擊變色
  let heart = document.querySelector("#heart");
  heart.addEventListener("click", () => {
    heart.classList.toggle("liked");
  });

  //信用卡點擊切換
  // var creditImage = document.querySelector("#member_Card_CreditCard_Img");
  // creditImage.onclick = function () {
  //   let mySrc = creditImage.getAttribute("src");
  //   if (mySrc === "./pic/CreditCard1.png") {
  //     creditImage.setAttribute("src", "./pic/CreditCard2.png");
  //   } else {
  //     creditImage.setAttribute("src", "./pic/CreditCard3.png");
  //   }
  // };

  //新增滑鼠移動變色方法
  // function member_Mouseover() {
  //   this.style.backgroundColor = "#BC002D";
  // }

  // function member_Mouseout() {
  //   this.style.backgroundColor = "white";
  // }

  // const member_Element = document.querySelectorAll(
  //   "#member_LeftMember, #member_LeftInfo, #member_LeftPassword, #member_LeftOrder,#member_Order_All,#member_Order_Pay,#member_Order_Depart,#member_Order_Finish,#member_Order_Cancel,#member_LeftCard, #member_LeftCollection"
  // );

  // member_Element.forEach((element) => {
  //   element.addEventListener("mouseover", member_Mouseover);
  //   element.addEventListener("mouseout", member_Mouseout);
  // });
});
