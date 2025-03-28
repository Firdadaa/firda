document.addEventListener("DOMContentLoaded", loadHistory);

function clearDisplay() {
    document.getElementById("display").value = "";
}

function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function appendSymbol(symbol) {
    document.getElementById("display").value += symbol;
}

function calculateResult() {
    try {
        let expression = document.getElementById("display").value;
        let result = eval(expression);
        document.getElementById("display").value = result;
        addHistory(expression + " = " + result);
    } catch (e) {
        alert("Kesalahan perhitungan");
    }
}

function addHistory(entry) {
    let historyDiv = document.getElementById("history");
    let historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.innerHTML = `<span>${entry}</span> <button onclick="removeHistory(this, '${entry}')">X</button>`;
    historyDiv.prepend(historyItem);

    saveHistory(entry);
}

function saveHistory(entry) {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    history.unshift(entry); // Menambahkan riwayat terbaru ke awal
    localStorage.setItem("calcHistory", JSON.stringify(history));
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    let historyDiv = document.getElementById("history");

    historyDiv.innerHTML = ""; // Kosongkan history sebelum ditampilkan ulang

    history.forEach(entry => {
        let historyItem = document.createElement("div");
        historyItem.classList.add("history-item");
        historyItem.innerHTML = `<span>${entry}</span> <button onclick="removeHistory(this, '${entry}')">X</button>`;
        historyDiv.appendChild(historyItem);
    });
}

function removeHistory(button, entry) {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    history = history.filter(item => item !== entry);
    localStorage.setItem("calcHistory", JSON.stringify(history));

    button.parentElement.remove();
}
