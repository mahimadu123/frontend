// Toggle this to false to test the disabled download button for non-premium users
const isPremiumUser = true; 

const dummyExpenses = [
    { date: '01-03-2021', description: 'Milk', category: 'Milk', income: null, expense: 60.00 },
    { date: '04-03-2021', description: 'Salary', category: 'Salary', income: 40000.00, expense: null },
    { date: '04-03-2021', description: 'Fruits', category: 'Fruits', income: null, expense: 500.00 },
    { date: '04-03-2021', description: 'Medicines', category: 'Health', income: null, expense: 50.00 },
    { date: '05-03-2021', description: 'Salary', category: 'Salary', income: 20000.00, expense: null },
    { date: '05-03-2021', description: 'Milk', category: 'Milk', income: null, expense: 60.00 },
    { date: '05-03-2021', description: 'Fees', category: 'Education', income: null, expense: 4000.00 },
    { date: '05-03-2021', description: 'Party', category: 'Birthday Treat', income: null, expense: 500.00 },
    { date: '05-03-2021', description: 'Travel -#card', category: 'Auto And Transport', income: null, expense: 500.00 }
];

const dummyYearly = [
    { month: 'March', income: 60000.00, expense: 5670.00 }
];

const dummyNotes = [
    { date: '11-02-2021', note: 'Gave advance to construction.' },
    { date: '16-02-2021', note: 'Fghj hhj hjj' },
    { date: '17-02-2021', note: '17 17 17' },
    { date: '18-02-2021', note: '18' }
];

document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById('download-btn');
    if (!isPremiumUser) {
        downloadBtn.classList.add('disabled');
        downloadBtn.removeAttribute('href');
    }

    renderExpensesTable();
    renderYearlyTable();
    renderNotesTable();
});

function renderExpensesTable() {
    const tbody = document.getElementById('expense-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    let totalIncome = 0;
    let totalExpense = 0;

    dummyExpenses.forEach(item => {
        if (item.income) totalIncome += item.income;
        if (item.expense) totalExpense += item.expense;

        tbody.innerHTML += `
            <tr>
                <td>${item.date}</td>
                <td>${item.description}</td>
                <td>${item.category}</td>
                <td class="text-right">${item.income ? item.income.toFixed(2) : ''}</td>
                <td class="text-right">${item.expense ? item.expense.toFixed(2) : ''}</td>
            </tr>
        `;
    });

    tbody.innerHTML += `
        <tr class="subtotal-row">
            <td colspan="3"></td>
            <td class="text-right">${totalIncome.toFixed(2)}</td>
            <td class="text-right">${totalExpense.toFixed(2)}</td>
        </tr>
        <tr class="total-row">
            <td colspan="3"></td>
            <td class="text-right">₹ ${totalIncome.toFixed(2)}</td>
            <td class="text-right" style="color: #d32f2f;">₹ ${totalExpense.toFixed(2)}</td>
        </tr>
    `;

    const savings = totalIncome - totalExpense;
    document.getElementById('savings-display').innerText = `Savings = ₹ ${savings.toFixed(2)}`;
}

function renderYearlyTable() {
    const tbody = document.getElementById('yearly-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    let totalIncome = 0;
    let totalExpense = 0;

    dummyYearly.forEach(row => {
        totalIncome += row.income;
        totalExpense += row.expense;
        const savings = row.income - row.expense;

        tbody.innerHTML += `
            <tr>
                <td>${row.month}</td>
                <td class="text-right">${row.income.toFixed(2)}</td>
                <td class="text-right">${row.expense.toFixed(2)}</td>
                <td class="text-right">${savings.toFixed(2)}</td>
            </tr>
        `;
    });

    tbody.innerHTML += `
        <tr class="total-row">
            <td>Total</td>
            <td class="text-right" style="color: green;">₹ ${totalIncome.toFixed(2)}</td>
            <td class="text-right" style="color: red;">₹ ${totalExpense.toFixed(2)}</td>
            <td class="text-right" style="color: #1a237e;">₹ ${(totalIncome - totalExpense).toFixed(2)}</td>
        </tr>
    `;
}

function renderNotesTable() {
    const tbody = document.getElementById('notes-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    dummyNotes.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.date}</td>
                <td>${item.note}</td>
            </tr>
        `;
    });
}