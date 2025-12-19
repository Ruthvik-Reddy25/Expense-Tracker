const balance = document.getElementById("balance");
const list = document.getElementById("list");
const form = document.getElementById("expenseForm");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    list.innerHTML = "";
    let total = 0;

    transactions.forEach((transaction, index) => {
        total += transaction.amount;

        const li = document.createElement("li");
        li.classList.add(transaction.amount < 0 ? "minus" : "plus");

        li.innerHTML = `
            ${transaction.text} <span>₹${transaction.amount}</span>
            <button class="delete-btn" onclick="removeTransaction(${index})">x</button>
        `;

        list.appendChild(li);
    });

    balance.innerText = `₹${total}`;
}

function addTransaction(e) {
    e.preventDefault();

    const transaction = {
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    text.value = "";
    amount.value = "";

    updateUI();
}

function removeTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
}

form.addEventListener("submit", addTransaction);

updateUI();
