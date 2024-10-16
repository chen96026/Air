fetch('/orders/getoid')
    .then(response => response.json())
    .then(data => {
        var oid = data.oid;
        console.log("訂單 ID: ", oid);

        
        fetch('/orders/payBeforeTime/' + oid)
            .then(response => response.json())
            .then(data => {
                var payBeforeTime = data.payBeforeTimeISO;  
                console.log("支付截止時間: ", payBeforeTime);

                if (payBeforeTime) {
                    var deadline = new Date(payBeforeTime).getTime();

                    var countdownFunction = setInterval(function() {
                        var now = new Date().getTime()+(60*60*1000);
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
									setTimeout(function(){
										window.location.href = "/orderExpired";
									},1000);
                                } else {
                                    console.error("訂單狀態更新失敗，狀態碼:" + response.status);
                                }
                            })
                            .catch(error => {
                                console.error("發生錯誤", error);
                            });
                        }
                    }, 100);
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