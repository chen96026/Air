// Select Area
$(() => {
    $('#forum_select_country').change(function() {
        switch ($(this).val()) 
        {
            case 'all':
                $('#forum_select_area').html(`
                    <optgroup label="全世界">
                        <option value="">所有地點</option>
                    </optgroup>
                `);
                break;
            case 'Japan':
                $('#forum_select_area').html(`
                    <optgroup label="北海道">
                        <option value="">北海道</option>
                    </optgroup>
                    <optgroup label="東北">
                        <option value="">青森</option>
                        <option value="">秋田</option>
                        <option value="">岩手</option>
                        <option value="">山形</option>
                        <option value="">宮城</option>
                        <option value="">福島</option>
                    </optgroup>
                    <optgroup label="北越信越">
                        <option value="">新潟</option>
                        <option value="">富山</option>
                        <option value="">石川</option>
                        <option value="">福井</option>
                        <option value="">長野</option>
                    </optgroup>
                    <optgroup label="關東">
                        <option value="">東京</option>
                        <option value="">神奈川</option>
                        <option value="">千葉</option>
                        <option value="">埼玉</option>
                        <option value="">茨城</option>
                        <option value="">栃木</option>
                        <option value="">群馬</option>
                    </optgroup>
                    <optgroup label="東海">
                        <option value="">山梨</option>
                        <option value="">靜岡</option>
                        <option value="">岐阜</option>
                        <option value="">愛知</option>
                        <option value="">三重</option>
                    </optgroup>
                    <optgroup label="關西">
                        <option value="">京都</option>
                        <option value="">大阪</option>
                        <option value="">滋賀</option>
                        <option value="">兵庫</option>
                        <option value="">奈良</option>
                        <option value="">和歌山</option>
                    </optgroup>
                    <optgroup label="中國">
                        <option value="">鳥取</option>
                        <option value="">島根</option>
                        <option value="">岡山</option>
                        <option value="">廣島</option>
                        <option value="">山口</option>
                    </optgroup>
                    <optgroup label="四國">
                        <option value="">德島</option>
                        <option value="">香川</option>
                        <option value="">愛媛</option>
                        <option value="">高知</option>
                    </optgroup>
                    <optgroup label="九州">
                        <option value="">福岡</option>
                        <option value="">佐賀</option>
                        <option value="">長崎</option>
                        <option value="">大分</option>
                        <option value="">熊本</option>
                        <option value="">宮崎</option>
                        <option value="">鹿兒島</option>
                    </optgroup>
                    <optgroup label="沖繩">
                        <option value="">沖繩</option>
                    </optgroup>
                `);
                break;
            default:
                return;
        }
    });
});