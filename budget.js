// Variables
let incomeAmount;
let expenseArray = [];
let expenseID = 0;
let userAuthenticated = false;

// DOM Elements
const LOGIN_BUTTON = document.querySelector('.loginBtn');
const SIGN_IN_FORM = document.querySelector('.sign-in');
const SIGN_OUT_BUTTON = document.querySelector('.signOutBtn');
const REGISTER_BUTTON = document.querySelector('.registerBtn');
const MAIN_APP = document.querySelector('.budget-app');
const ADD_INCOME_BUTTON = document.querySelector('.addIncomeBtn');
const ADD_EXPENSE_BUTTON = document.querySelector('.addExpenseBtn');

// Greet User
function displayGreeting(username) {
  const UPPERCASE_USERNAME = username.toUpperCase();
  document.querySelector('.greeting').innerHTML = `Welcome ${UPPERCASE_USERNAME}!`;
}

// Ask User to Register
function displayRegisterMessage(message) {
  document.querySelector('.greeting').innerHTML = message;
}

// Convert to Currency
function formatNumber(amount) {
  return `$ ${amount.toFixed(2)}`;
}

// if userAuthenticated false, hide app
function hideApplication() {
  SIGN_IN_FORM.style.display = 'block';
  LOGIN_BUTTON.style.display = 'inline-block';
  REGISTER_BUTTON.style.display = 'inline-block';
  MAIN_APP.style.display = 'none';
  displayRegisterMessage('Please Login First');
}

// if userAuthentication true, show app
function showApplication() {
  const USERNAME_STORED = localStorage.getItem('username');
  displayGreeting(USERNAME_STORED);
  SIGN_IN_FORM.style.display = 'none';
  MAIN_APP.style.display = 'block';
}

/* Filter by expense type and display both name & amount
 * Needs to add to page based on what is in expense array
 * Use object deconstruction to set variables
 */
function displayExpense() {
  for (let expense = 0; expense < expenseArray.length; expense += 1) {
    const {
      type, name, id,
    } = expenseArray[expense];
    let {
      amount,
    } = expenseArray[expense];
    amount = formatNumber(amount);
    const LIST = document.querySelector(`.${type.toLowerCase()}`);
    const DIV_CONTAINER = document.createElement('div');
    const DELETE_BTN = document.createElement('button');
    DELETE_BTN.classList = 'btn btn-danger deleteBtn';
    DELETE_BTN.innerHTML = 'X';
    DELETE_BTN.onclick = handleDeleteButton;
    DIV_CONTAINER.appendChild(DELETE_BTN);
    const EDIT_BTN = document.createElement('button');
    EDIT_BTN.classList = 'btn btn-primary editBtn';
    EDIT_BTN.innerHTML = 'EDIT';
    EDIT_BTN.onclick = editExpense;
    DIV_CONTAINER.appendChild(EDIT_BTN);
    DIV_CONTAINER.className = 'expenseContainer';
    DIV_CONTAINER.id = id;
    LIST.appendChild(DIV_CONTAINER);
    const EXPENSE_NAME = document.createElement('p');
    EXPENSE_NAME.className = 'expenseName';
    EXPENSE_NAME.innerHTML = name.toUpperCase();
    DIV_CONTAINER.append(EXPENSE_NAME);
    const EXPENSE_AMOUNT = document.createElement('p');
    EXPENSE_AMOUNT.className = 'expenseAmount';
    EXPENSE_AMOUNT.innerHTML = amount;
    DIV_CONTAINER.appendChild(EXPENSE_AMOUNT);
  }
}

// Update monthly expense total
function updateExpenseTotal(total) {
  const FORMATTED_TOTAL = formatNumber(total);
  document.querySelector('.monthlyTotal').innerHTML = FORMATTED_TOTAL;
}

// Check Income
function checkIncome() {
  incomeAmount = Number(document.querySelector('input[name="income"]').value);
  return incomeAmount;
}

// Calculate balance, income minus expenses
function calculateBalance(expenses) {
  checkIncome();
  let BALANCE = incomeAmount - expenses;
  BALANCE = formatNumber(BALANCE);
  document.querySelector('.balance').innerHTML = BALANCE;
}

// Calculate expense total
function calculateExpenseTotal() {
  const MONTHLY_TOTAL = expenseArray.reduce((previous, current) => previous + current.amount, 0);
  updateExpenseTotal(MONTHLY_TOTAL);
  calculateBalance(MONTHLY_TOTAL);
}

// Remove all matching elements from DOM
function clearExpenses() {
  document.querySelectorAll('.expenseContainer').forEach(expense => expense.parentNode.removeChild(expense));
}

// Get income
function getIncome() {
  incomeAmount = localStorage.getItem('income');
}

// Retrieve expense data
function getExpenses() {
  const EXPENSES = JSON.parse(localStorage.getItem('expenses'));
  if (EXPENSES) {
    expenseArray = EXPENSES;
    clearExpenses();
    displayExpense();
    calculateExpenseTotal();
  }
}

// Checks Authentication
function isAuthenticated() {
  if (userAuthenticated) {
    showApplication();
    getExpenses();
    getIncome();
  } else {
    hideApplication();
  }
}

// Sign Out
function signOut() {
  userAuthenticated = false;
  isAuthenticated();
  localStorage.setItem('expenses', JSON.stringify(expenseArray));
  localStorage.setItem('income', incomeAmount);
}

// Switch to registration menu
function showRegistration() {
  displayRegisterMessage('Please register below');
  SIGN_IN_FORM.style.display = 'block';
  LOGIN_BUTTON.style.display = 'none';
  MAIN_APP.style.display = 'none';
  REGISTER_BUTTON.style.display = 'block';
}


/* REGISTER FUNCTION
 * Save username and password to local storage
*/
function registerUser(e) {
  e.preventDefault();
  showRegistration();
  const USERNAME = document.querySelector('input[id="username"]').value;
  const PASSWORD = document.querySelector('input[id="password"]').value;
  if (USERNAME && PASSWORD) {
    localStorage.setItem('username', USERNAME);
    localStorage.setItem('password', PASSWORD);
    userAuthenticated = true;
    showApplication();
  } else {
    console.log('Please enter both fields');
  }
}

/* CHECK IF REGISTERED USER
 * IF YES, DISPLAY GREETING, HIDE SIGN IN FORM
 * IF NO, DISPLAY REGISTER MESSAGE AND SHOW FORM
 * RUNS WHEN USER CLICKS LOGIN, VERIFIES USERNAME & PASSWORD EXISTS
 * DISPLAYS ERROR MESSAGE IF NOT REGISTERED, ASKS TO REGISTER FIRST
*/

function isRegistered(e) {
  e.preventDefault();
  const USERNAME_PROVIDED = document.querySelector('input[id="username"]').value;
  const PASSWORD_PROVIDED = document.querySelector('input[id="password"]').value;
  const USERNAME_STORED = localStorage.getItem('username');
  const PASSWORD_STORED = localStorage.getItem('password');
  if ((USERNAME_PROVIDED === USERNAME_STORED) && (PASSWORD_PROVIDED === PASSWORD_STORED)) {
    displayGreeting(USERNAME_STORED);
    SIGN_IN_FORM.style.display = 'none';
    MAIN_APP.style.display = 'block';
    getExpenses();
    getIncome();
  } else {
    alert('You must register first!');
    showRegistration();
  }
}

// Update expense subtotal
function updateXPSubtotal(total, type) {
  const FORMATTED_TOTAL = formatNumber(total);
  document.querySelector(`.${type.toLowerCase()}__subtotal`).innerHTML = FORMATTED_TOTAL;
}

// Calculate expense subtotal
function calculateXPSubtotal(type) {
  const FILTERED_EXPENSES = expenseArray.filter(expense => expense.type === type);
  const XP_SUBTOTAL = FILTERED_EXPENSES.reduce((previous, current) => previous + current.amount, 0);
  updateXPSubtotal(XP_SUBTOTAL, type);
}

// Edit Expense Function
function editExpense(e) {
  const CLICKED_XP = Number(e.target.parentElement.id);
  const FILTERED_ARRAY = expenseArray.filter(expense => expense.id === CLICKED_XP);
  const EXPENSE_TYPE = FILTERED_ARRAY[0].type;
  const NEW_NAME = prompt('Enter new expense name');
  const NEW_AMOUNT = Number(prompt('Enter new expense amount'));
  if (NEW_NAME) {
    FILTERED_ARRAY[0].name = NEW_NAME;
  }
  if (NEW_AMOUNT) {
    FILTERED_ARRAY[0].amount = NEW_AMOUNT;
  }
  clearExpenses();
  displayExpense();
  calculateXPSubtotal(EXPENSE_TYPE);
  calculateExpenseTotal();
}

/* Delete Expense Function
 * Matches ID in expense array and creates new array without id
*/
function deleteExpense(ID) {
  const FILTERED_ARRAY = expenseArray.filter(expense => expense.id === ID);
  const UPDATED_XP_ARRAY = expenseArray.filter(expense => expense.id !== ID);
  const EXPENSE_TYPE = FILTERED_ARRAY[0].type;
  expenseArray = UPDATED_XP_ARRAY;
  clearExpenses();
  displayExpense();
  calculateXPSubtotal(EXPENSE_TYPE);
  calculateExpenseTotal();
}

// Handle Delete Button Click
function handleDeleteButton(e) {
  const CLICKED_XP = Number(e.target.parentElement.id);
  deleteExpense(CLICKED_XP);
}

// CREATE NEW EXPENSE
function newExpense() {
  expenseID = expenseArray.length;
  expenseID += 1;
  const EXPENSE_TYPE = document.querySelector('select[id="selectExpenseType"]').value;
  const EXPENSE_NAME = document.querySelector('input[name="expenseName"]').value;
  const EXPENSE_AMOUNT = Number(document.querySelector('input[name="expenseAmount"]').value);
  const EXPENSE = {};
  EXPENSE.type = EXPENSE_TYPE;
  EXPENSE.name = EXPENSE_NAME;
  EXPENSE.amount = EXPENSE_AMOUNT;
  EXPENSE.id = expenseID;
  expenseArray.push(EXPENSE);
  calculateXPSubtotal(EXPENSE_TYPE);
  calculateExpenseTotal();
  clearExpenses();
  displayExpense();
}

// ADD INCOME
function addIncome() {
  checkIncome();
  incomeAmount = formatNumber(incomeAmount);
  document.querySelector('.monthlyIncome').innerHTML = incomeAmount;
  calculateExpenseTotal();
}

// Event Listeners
LOGIN_BUTTON.addEventListener('click', isRegistered);
SIGN_OUT_BUTTON.addEventListener('click', signOut);
ADD_EXPENSE_BUTTON.addEventListener('click', newExpense);
ADD_INCOME_BUTTON.addEventListener('click', addIncome);
REGISTER_BUTTON.addEventListener('click', registerUser);
