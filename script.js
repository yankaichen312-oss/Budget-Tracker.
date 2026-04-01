let transactions = JSON.parse(localStorage.getItem("data")) || [];

function updateUI(){
    let balance = 0;
    let income = 0;
    let expense = 0;

    let list = document.getElementById("list");
    list.innerHTML = "";

    transactions.forEach((t, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${t.text} : $${t.amount}
        <button class="delete-btn" onclick="deleteItem(${index})">X</button>`;
        list.appendChild(li);

        if(t.type === "income"){
            income += t.amount;
            balance += t.amount;
        } else {
            expense += t.amount;
            balance -= t.amount;
        }
    });

    document.getElementById("income").innerText = "$" + income;
    document.getElementById("expense").innerText = "$" + expense;
    document.getElementById("balance").innerText = "$" + balance;

    document.getElementById("incomeBar").style.width = income + "px";
    document.getElementById("expenseBar").style.width = expense + "px";

    localStorage.setItem("data", JSON.stringify(transactions));
}

function addTransaction(){
    let text = document.getElementById("text").value;
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    if(text === "" || amount === 0) return;

    transactions.push({text, amount, type});

    updateUI();

    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
}

function deleteItem(index){
    transactions.splice(index,1);
    updateUI();
}

updateUI();