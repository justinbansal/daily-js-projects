// Variables
const EXPENSES_ARRAY = [];

// DOM Elements
const REGISTER_BUTTON = document.querySelector('.registerBtn');
const SIGN_IN_FORM = document.querySelector('.sign-in');
const ADD_EXPENSE_BUTTON = document.querySelector('.addExpenseBtn');

// Greet User
function displayGreeting(username) {
  const UPPERCASE_USERNAME = username.toUpperCase();
  document.querySelector('.greeting').innerHTML = `Welcome ${UPPERCASE_USERNAME}!`;
}

// Ask User to Register
function displayRegisterMessage() {
  document.querySelector('.greeting').innerHTML = 'Please Register Below';
}

/* CHECK IF REGISTERED USER
 * IF YES, DISPLAY GREETING, HIDE SIGN IN FORM
 * IF NO, DISPLAY REGISTER MESSAGE AND SHOW FORM
*/

function isRegistered() {
  const USERNAME = localStorage.getItem('username');
  if ((USERNAME) && (localStorage.getItem('password'))) {
    displayGreeting(USERNAME);
    SIGN_IN_FORM.style.display = 'none';
    return true;
  }
  displayRegisterMessage();
  SIGN_IN_FORM.style.display = 'block';
  return false;
}

/* REGISTER FUNCTION
 * Save username and password to local storage
*/
function registerUser() {
  const USERNAME = document.querySelector('input[id="username"]').value;
  const PASSWORD = document.querySelector('input[id="password"]').value;
  localStorage.setItem('username', USERNAME);
  localStorage.setItem('password', PASSWORD);
}

// Update monthly expense total
function updateExpenseTotal(total) {
  document.querySelector('.monthlyTotal').innerHTML = total;
}

// Calculate expense total
function calculateExpenseTotal() {
  const MONTHLY_TOTAL = EXPENSES_ARRAY.reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0);
  updateExpenseTotal(MONTHLY_TOTAL);
}

// CREATE NEW EXPENSE
function newExpense() {
  const EXPENSE_TYPE = document.querySelector('select[id="selectExpenseType"]').value;
  const EXPENSE_NAME = document.querySelector('input[name="expenseName"]').value;
  const EXPENSE_AMOUNT = Number(document.querySelector('input[name="expenseAmount"]').value);
  const EXPENSE = {};
  EXPENSE.type = EXPENSE_TYPE;
  EXPENSE.name = EXPENSE_NAME;
  EXPENSE.amount = EXPENSE_AMOUNT;
  EXPENSES_ARRAY.push(EXPENSE);
  calculateExpenseTotal();
}

// Event Listeners
REGISTER_BUTTON.addEventListener('click', registerUser);
ADD_EXPENSE_BUTTON.addEventListener('click', newExpense);

isRegistered();
