const apiBase = '/api';
let userId = null;

const signup = async () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  try {
    const response = await fetch(`${apiBase}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    const user = await response.json();
    userId = user._id;
    document.getElementById('register').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    loadExpenses();
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

const addExpense = async () => {
  const name = document.getElementById('expenseName').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  try {
    await fetch(`${apiBase}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, name, description, category, amount, type })
    });
    loadExpenses();
  } catch (error) {
    console.error('Error adding expense:', error);
  }
};

const loadExpenses = async () => {
  try {
    const response = await fetch(`${apiBase}/expenses/${userId}`);
    const expenses = await response.json();
    const historyList = document.getElementById('historyList');
    const totalExpenses = document.getElementById('totalExpenses');
    historyList.innerHTML = '';
    let total = 0;
    expenses.forEach(expense => {
      const li = document.createElement('li');
      li.textContent = `${expense.name}: ${expense.amount} (${expense.description})`;
      li.style.color = expense.type === 'credit' ? 'green' : 'red';
      historyList.appendChild(li);
      total += expense.type === 'credit' ? expense.amount : -expense.amount;
    });
    totalExpenses.textContent = `Total: ${total}`;
    renderChart(expenses);
  } catch (error) {
    console.error('Error loading expenses:', error);
  }
};

const renderChart = (expenses) => {
  const ctx = document.getElementById('expenseChart').getContext('2d');
  const labels = expenses.map(exp => exp.name);
  const data = expenses.map(exp => exp.amount);
  const colors = expenses.map(exp => exp.type === 'credit' ? 'green' : 'red');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Expenses',
        data,
        backgroundColor: colors
      }]
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (userId) loadExpenses();
});
