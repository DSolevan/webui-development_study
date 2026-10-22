const prices = {
    options: {large: 25000, medium: 10000, small: 0},
    property: 3000,
    types: {gpu: 30000, mouse: 1500, pc: 70000}
};

function calculate() {
    const quantity = Number(document.getElementById("quantity").value);
    const type = document.querySelector("input[name='type']:checked").value;
    const optionBlock = document.getElementById("option-block");
    const propertyBlock = document.getElementById("property-block");
    const result = document.getElementById("result");
    let price = prices.types[type];

    optionBlock.style.display = "none";
    propertyBlock.style.display = "none";

    if (type === "gpu") {
        optionBlock.style.display = "block";
        price += prices.options[document.getElementById("option").value];
    }

    if (type === "pc") {
        propertyBlock.style.display = "block";
        if (document.getElementById("property").checked) {
            price += prices.property;
        }
    }

    if (Number.isInteger(quantity) && quantity > 0) {
        result.textContent = (price * quantity) + " ₽";
    } else {
        result.textContent = "введите целое число больше 0";
    }
}

window.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("calc");

    form.addEventListener("input", calculate);
    form.addEventListener("change", calculate);
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });

    calculate();
});
