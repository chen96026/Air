fetch('/orders/getoid')
    .then(response => response.json())
    .then(data => {
        var oid = data.oid;
        console.log("訂單 ID: ", oid);

        // 確保在獲取到 oid 後，再發送第二個請求獲取支付截止時間
        fetch('/orders/payBeforeTime/' + oid)
            .then(response => response.json())
            .then(data => {
                var payBeforeTime = data.payBeforeTimeISO;  // 從後端返回的支付截止時間
                console.log("支付截止時間: ", payBeforeTime);

                if (payBeforeTime) {
                    var deadline = new Date(payBeforeTime).getTime();

                    var countdownFunction = setInterval(function() {
                        var now = new Date().getTime();
                        var timeLeft = deadline - now;

                        if (timeLeft > 0) {
                            var minutes = Math.floor(timeLeft / (1000 * 60));
                            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                            document.getElementById("countdown").innerHTML = minutes + "分 " + seconds + "秒";
                        } else {
                            clearInterval(countdownFunction);
                            document.getElementById("countdown").innerHTML = "訂單已逾期";
							
							
                            fetch('/orders/ordercancel', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            })
                            .then(response => {
                                if (response.ok) {
                                    console.log("訂單狀態更新成功");
									window.location.href = "/order_expired";
                                } else {
                                    console.error("訂單狀態更新失敗，狀態碼:" + response.status);
                                }
                            })
                            .catch(error => {
                                console.error("發生錯誤", error);
                            });
                        }
                    }, 1000);
                } else {
                    document.getElementById("countdown").innerHTML = "無法獲取倒數計時時間";
                }
            })
            .catch(error => {
                console.error("無法獲取支付截止時間", error);
            });
    })
    .catch(error => {
        console.error("無法獲取訂單 ID", error);
    });