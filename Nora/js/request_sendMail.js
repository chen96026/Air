$(() => {
    $('#requests_submit').click(() => {
        // 讓表單無法送出，讓前端功能能正常展示
        // 正式加入後端後視情況拿掉
        event.preventDefault();
        //

        $('.requests_send').html(`
            <img class="requests_mail" src="./img/icon/mail_175dp_BC002D_FILL1_wght400_GRAD0_opsz48.svg" alt="mail">
            <h1>感謝您的信件</h1>
            <p>我們已收到您的問題與回饋，我們將於近日內回信至您填寫的 E-MAIL</p>
            <button id="requests_Close" class="requests_btnClose">關閉</button>
        `);
        $('.requests_send').fadeIn(100);
    });

    $(document).on('click', '#requests_Close', () => {
        $('.requests_send').fadeOut(100);
        $('.requests_send').empty();
    });
});

