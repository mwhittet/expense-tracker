const amount = document.getElementById('amount');
const balance = document.getElementById('balance');
const error = document.getElementById('error');
const form = document.getElementById('form');
const list = document.getElementById('list');
const money_minus = document.getElementById('money-minus');
const money_plus = document.getElementById('money-plus');
const text = document.getElementById('text');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -19.99 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

let transactions = dummyTransactions;

// Add transaction
const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    error.style.display = 'block';
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateValues();
    text.value = '';
    amount.value = '';
  }
};

// Generate random ID
let generateID = () => Math.floor(Math.random() * 100000000);

// Add transactions to DOM list
const addTransactionToDOM = (transaction) => {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text}
    <span>${sign}${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="delete-btn" onclick="handleRemoveTransaction(${
      transaction.id
    })">x</button>
  `;

  list.appendChild(item);
};

// Update the balence, income and expenses
const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expenses = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `£${total}`;
  money_plus.innerText = `£${income}`;
  money_minus.innerText = `£${expenses}`;
};

// Remove transaction by ID
const handleRemoveTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  init();
};

// Init app
const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionToDOM);
  updateValues();
};

init();

form.addEventListener('submit', addTransaction);
