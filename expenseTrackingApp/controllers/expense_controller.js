import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

export default class ExpenseController extends Controller {
    connect() {
        this.loadExpenses();
    }

    addExpense(event) {
        event.preventDefault();

        const params = new FormData(event.currentTarget);
        const description = params.get("description");
        const amount = parseFloat(params.get("amount"));

        if (!description || amount <= 0) {
            alert("Geçerli bir açıklama ve tutar giriniz!");
            return;
        }

        this.addExpenseToDOM(description, amount);
        this.saveExpense(description, amount);

        event.currentTarget.reset();
    }

    addExpenseToDOM(description, amount) {
        const list = document.getElementById("expense-list");
        const li = document.createElement("li");
        li.innerHTML = `
            ${description} - <strong>${amount}₺</strong> 
            <button class="delete-btn" onclick="expenseController.removeExpense('${description}', ${amount}); this.parentElement.remove();">Sil</button>`;
        list.appendChild(li);

        this.updateTotal(amount);
    }

    updateTotal(amount) {
        const totalElement = document.getElementById("total");
        let total = parseFloat(totalElement.innerText);
        total += amount;
        totalElement.innerText = total.toFixed(2);
    }

    saveExpense(description, amount) {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push({ description, amount });
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    loadExpenses() {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.forEach(expense => {
            this.addExpenseToDOM(expense.description, expense.amount);
        });
    }

    removeExpense(description, amount) {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses = expenses.filter(expense => expense.description !== description || expense.amount !== amount);
        localStorage.setItem("expenses", JSON.stringify(expenses));

        const totalElement = document.getElementById("total");
        let total = parseFloat(totalElement.innerText);
        total -= amount;
        totalElement.innerText = total.toFixed(2);
    }

    toggleList() {
        const expenseSection = document.getElementById("expense-section");
        expenseSection.classList.toggle("hidden");

        const button = document.querySelector(".show-btn");
        if (expenseSection.classList.contains("hidden")) {
            button.textContent = "Harcama Listesini Göster";
        } else {
            button.textContent = "Harcama Listesini Gizle";
        }
    }
}

window.expenseController = new ExpenseController();
