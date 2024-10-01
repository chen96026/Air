// Select Area
$(() => {
    let cityData = [];  // 存放讀到的 JSON 資料
	// console.log(myData);
    // 替換區域選項
    function changeOption(selected) {
        $('#forum_select_city').empty();  // 清除目前顯示的選項

        // 找目前選擇的國家的城市資料
        cityData.forEach(country => {
            if (country.country === selected) {
                // 區域群組
                country.area.forEach(area => {
                    const citys = $(`<optgroup>`, {label: `${area.areaName}`});

                    // 城市選項
                    area.city.forEach(city => {
                        citys.append(`
                            <option value=${city}>${city}</option>
                        `)
                    })
                    
                    $('#forum_select_city').append(citys);
                })
            }
        });
    }
	

    // 讀取 JSON 檔案
    $.getJSON('/data/city.json', data => {
        cityData = data;
						
		if (typeof setCountry !== 'undefined') {
			$(`select[name='country'] option[value='${setCountry}']`).prop('selected', true);
			changeOption($('#forum_select_country').val());
			
			if (setCity != null) $(`select[name='city'] option[value='${setCity}']`).prop('selected', true);
			
		} else {
			changeOption($('#forum_select_country').val());			
		}
						
    })

	
    // 偵測目前選擇的國家
    $('#forum_select_country').change(function() {
        changeOption(this.value);
    });
	

});