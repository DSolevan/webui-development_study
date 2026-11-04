/*jslint browser*/

const FORM_URL = "https://formcarry.com/s/YOUR_FORM_ID";
const STORAGE_KEY = "feedback-form";

const popup = document.getElementById("popup");
const form = document.getElementById("feedback-form");
const statusText = document.getElementById("status");

function showPopup() {
    popup.hidden = false;
}

function hidePopup() {
    popup.hidden = true;
}

function openForm() {
    window.history.pushState({form: true}, "", "#feedback");
    showPopup();
}

function closeForm() {
    if (window.history.state && window.history.state.form) {
        window.history.back();
    } else {
        window.history.replaceState(null, "", location.pathname);
        hidePopup();
    }
}

function showStatus(text, type) {
    statusText.textContent = text;
    statusText.className = "status " + type;
}

function saveForm() {
    const data = Object.fromEntries(new FormData(form));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function restoreForm() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    Object.keys(data).forEach(function (name) {
        const field = form.elements[name];
        if (field.type === "checkbox") {
            field.checked = true;
        } else {
            field.value = data[name];
        }
    });
}

function sendForm(event) {
    event.preventDefault();
    showStatus("Отправка...", "");
    fetch(FORM_URL, {
        body: new FormData(form),
        headers: {Accept: "application/json"},
        method: "POST"
    }).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.code !== 200) {
            throw new Error(result.message);
        }
        form.reset();
        localStorage.removeItem(STORAGE_KEY);
        showStatus("Сообщение отправлено. Спасибо!", "success");
    }).catch(function () {
        showStatus("Ошибка отправки. Попробуйте ещё раз.", "error");
    });
}

function checkUrl() {
    if (location.hash === "#feedback") {
        showPopup();
    } else {
        hidePopup();
    }
}

document.getElementById("open-button").addEventListener("click", openForm);
document.getElementById("close-button").addEventListener("click", closeForm);
form.addEventListener("input", saveForm);
form.addEventListener("submit", sendForm);
window.addEventListener("popstate", checkUrl);

restoreForm();
checkUrl();
