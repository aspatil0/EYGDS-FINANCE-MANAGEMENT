document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalBalance = document.getElementById("total-balance");
    let balance = 0;
    let expenses = [];

    const handleClick = (e) => {
        e.preventDefault();
        const category = document.getElementById("expense-category").value;
        let name = document.getElementById("expense-name").value.trim();
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const type = document.getElementById("expense-type").value;
        const date = document.getElementById("expense-date").value;
    };
    
    // Usage in JSX
    <button onClick={handleClick}>+ Add Expense</button>
    
    

        if (!name) {
            name = category;
        }

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const expense = { id: Date.now(), category, name, amount, type, date };
        expenses.push(expense);
        updateBalance();
        displayExpenses();
        expenseForm.reset();
    });

    function displayExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${expense.category}</td><td>${expense.name}</td><td>₹${expense.amount.toFixed(2)}</td><td>${expense.type}</td><td>${expense.date}</td><td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>`;
            expenseList.appendChild(row);
        });
    }

    function updateBalance() {
        balance = expenses.reduce((acc, expense) => expense.type === "Credit" ? acc + expense.amount : acc - expense.amount, 0);
        totalBalance.textContent = balance.toFixed(2);
    }
;
