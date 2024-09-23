var modal = document.getElementById("myModal");
var btn = document.getElementById("view_details");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



document.addEventListener('DOMContentLoaded', function () {
    const passengerContainer = document.getElementById('passenger_container');

    function updatePassengerNumbers() {
        const sections = passengerContainer.querySelectorAll('.form_section');
        sections.forEach((section, index) => {
            section.querySelector('div').textContent = `旅客${index + 1}(成人票)`;
        });
    }
    document.getElementById('add_passenger').addEventListener('click', function () {
        const newSection = passengerContainer.querySelector('.form_section').cloneNode(true);
        const deleteButton = newSection.querySelector('.delete_btn');

        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', function () {
            passengerContainer.removeChild(newSection);
            updatePassengerNumbers();
        });

        passengerContainer.appendChild(newSection);
        updatePassengerNumbers();
    });

    document.querySelectorAll('.form_section').forEach(section => {
        section.querySelector('.delete_btn').style.display = 'none';
    });
    updatePassengerNumbers();
});

document.addEventListener('DOMContentLoaded', function () {
    const selectElements = document.querySelectorAll('select.label_addluggage');
    const priceLuggageElement = document.getElementById('price_luggage');

    function updatePrice() {
        let total = 0;

        selectElements.forEach(selectElement => {
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            const priceTextMatch = selectedOption.textContent.match(/NT\$\d+,\d+/);

            if (priceTextMatch) {
                total += parseInt(priceTextMatch[0].replace('NT$', '').replace(',', ''), 10);
            }
        });

        if (total > 0) {
            priceLuggageElement.textContent = `NT$${total.toLocaleString()}`;
        } else {
            priceLuggageElement.textContent = '免費';
        }
    }
    selectElements.forEach(selectElement => {
        selectElement.addEventListener('change', updatePrice);
    });
    updatePrice();
});