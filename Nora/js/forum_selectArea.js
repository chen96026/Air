// Select Area
$(() => {
    let cityData = [];  // 存放讀到的 JSON 資料

    // 替換區域選項
    function changeOption(selected) {
        $('#forum_select_area').empty();  // 清除目前顯示的選項

        // 找目前選擇的國家的城市資料
        cityData.forEach(country => {
            if (country.country === selected) {
                // 區域群組
                country.area.forEach(area => {
                    const citys = $(`<optgroup>`, {label: `${area.areaName}`});

                    // 城市選項
                    area.city.forEach(city => {
                        citys.append(`
                            <option value=${city.cityValue}>${city.cityName}</option>
                        `)
                    })
                    
                    $('#forum_select_area').append(citys);
                })
            }
        });
    }

    // 讀取 JSON 檔案
    $.getJSON('./city.json', data => {
        cityData = data;
    })

    // 偵測目前選擇的國家
    $('#forum_select_country').change(function() {
        changeOption(this.value);
    });

});