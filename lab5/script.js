const QUANTITY_PATTERN = /^[1-9]\d*$/;

function onCalculateClick(event) {
    const quantityInput = document.getElementById("quantity");
    const productSelect = document.getElementById("product");
    const result = document.getElementById("result");
    const quantityText = quantityInput.value.trim();
    let price;
    let quantity;
    let cost;

    event.preventDefault();

    if (QUANTITY_PATTERN.test(quantityInput.value)) {
        price = parseInt(productSelect.value, 10);
        quantity = parseInt(quantityText, 10);
        cost = price * quantity;
        result.textContent = "Стоимость заказа: " + cost + " руб";
        result.className = "success";
    } else {
        result.textContent = "Ошибка: введите нормальное число"
        result.className = "error";
    }
}

window.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("calc-button");
    button.addEventListener("click", onCalculateClick);
});