// @flow

// https://flow.org/en/docs/types/objects/#toc-exact-object-types
type Expense = {|
    id: number,
    name: string,
    type: string,
    amount: number,
|}

type State = {|
    incomeAmount: number,
    expenseArray: Expense[],
    userAuthenticated: boolean,
|}

// Initialize App State
let state: State = {
    incomeAmount: 0,
    expenseArray: [],
    userAuthenticated: false,
}

// DOM Elements
const LOGIN_BUTTON = document.querySelector('.loginBtn')
const SIGN_IN_FORM = document.querySelector('.sign-in')
const SIGN_OUT_BUTTON = document.querySelector('.signOutBtn')
const REGISTER_BUTTON = document.querySelector('.registerBtn')
const MAIN_APP = document.querySelector('.budget-app')
const ADD_INCOME_BUTTON = document.querySelector('.addIncomeBtn')
const ADD_EXPENSE_BUTTON = document.querySelector('.addExpenseBtn')

// Greet User
function displayGreeting(username) {
    const UPPERCASE_USERNAME = username.toUpperCase()
    document.querySelector('.greeting').innerHTML = `Welcome ${UPPERCASE_USERNAME}!`
}

// Ask User to Register
function displayRegisterMessage(message) {
    document.querySelector('.greeting').innerHTML = message
}

// Convert to Currency
function addCurrencyToNumber(amount: number): string {
    return `$ ${amount.toFixed(2)}`
}

// if userAuthenticated false, hide app
function hideApplication() {
    SIGN_IN_FORM.style.display = 'block'
    LOGIN_BUTTON.style.display = 'inline-block'
    REGISTER_BUTTON.style.display = 'inline-block'
    MAIN_APP.style.display = 'none'
    displayRegisterMessage('Please Login First')
}

// if userAuthentication true, show app
function showApplication() {
    const USERNAME_STORED = localStorage.getItem('username')
    displayGreeting(USERNAME_STORED)
    SIGN_IN_FORM.style.display = 'none'
    MAIN_APP.style.display = 'block'
}

/* Filter by expense type and display both name & amount
 * Needs to add to page based on what is in expense array
 * Use object deconstruction to set variables
 */
function displayExpense() {
    for (let expense = 0; expense < state.expenseArray.length; expense += 1) {
        const { type, name, id, amount } = state.expenseArray[expense]
        let amount_with_currency = addCurrencyToNumber(amount)
        const LIST = document.querySelector(`.${type.toLowerCase()}`)
        const DIV_CONTAINER = document.createElement('div')
        const DELETE_BTN = document.createElement('button')
        DELETE_BTN.classList = 'btn btn-danger deleteBtn'
        DELETE_BTN.innerHTML = 'X'
        DELETE_BTN.onclick = handleDeleteButton
        DIV_CONTAINER.appendChild(DELETE_BTN)
        const EDIT_BTN = document.createElement('button')
        EDIT_BTN.classList = 'btn btn-primary editBtn'
        EDIT_BTN.innerHTML = 'EDIT'
        EDIT_BTN.onclick = editExpense
        DIV_CONTAINER.appendChild(EDIT_BTN)
        DIV_CONTAINER.className = 'expenseContainer'
        DIV_CONTAINER.id = id
        LIST.appendChild(DIV_CONTAINER)
        const EXPENSE_NAME = document.createElement('p')
        EXPENSE_NAME.className = 'expenseName'
        EXPENSE_NAME.innerHTML = name.toUpperCase()
        DIV_CONTAINER.append(EXPENSE_NAME)
        const EXPENSE_AMOUNT = document.createElement('p')
        EXPENSE_AMOUNT.className = 'expenseAmount'
        EXPENSE_AMOUNT.innerHTML = amount_with_currency
        DIV_CONTAINER.appendChild(EXPENSE_AMOUNT)
    }
}

// Update monthly expense total
function updateExpenseTotal(total) {
    const FORMATTED_TOTAL = addCurrencyToNumber(total)
    document.querySelector('.monthlyTotal').innerHTML = FORMATTED_TOTAL
}

// Check Income
function getNewIncome() {
    let raw_value = document.querySelector('input[name="income"]').value
    if (validateNumericInput(raw_value)) {
        console.log('validated')
        return Number(raw_value.replace(',', ''))
    } else {
        alert('invalid input')
        return null
    }
}

function validateNumericInput(amount: string): boolean {
    // There is probably a package that can handle this, but since the point is learning, this would be a regex that would cover a few
    // https://stackoverflow.com/questions/2227370/currency-validation
    var regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/

    return regex.test(amount)
}

// Calculate balance, income minus expenses
function calculateBalance(expenses) {
    let BALANCE = state.incomeAmount - expenses
    document.querySelector('.balance').innerHTML = addCurrencyToNumber(BALANCE)
}

// Calculate expense total
function calculateExpenseTotal() {
    const MONTHLY_TOTAL = state.expenseArray.reduce(
        (previous, current) => previous + current.amount,
        0
    )
    updateExpenseTotal(MONTHLY_TOTAL)
    calculateBalance(MONTHLY_TOTAL)
}

// Remove all matching elements from DOM
function clearExpenses() {
    document
        .querySelectorAll('.expenseContainer')
        .forEach(expense => expense.parentNode.removeChild(expense))
}

// Get income
function getIncomeFromStorage() {
    state.incomeAmount = Number(localStorage.getItem('income'))
    console.log('set income', state)
}

// Retrieve expense data
function getExpenses() {
    const EXPENSES = JSON.parse(localStorage.getItem('expenses'))
    if (EXPENSES) {
        state.expenseArray = EXPENSES
        clearExpenses()
        displayExpense()
        calculateExpenseTotal()
    }
}

// Checks Authentication
function isAuthenticated() {
    if (state.userAuthenticated) {
        getExpenses()
        getIncomeFromStorage()
        updateIncomeDisplay()
        showApplication()
    } else {
        hideApplication()
    }
}

// Sign Out
function signOut() {
    state.userAuthenticated = false
    isAuthenticated()
    localStorage.setItem('expenses', JSON.stringify(state.expenseArray))
    localStorage.setItem('income', state.incomeAmount.toString())
}

// Switch to registration menu
function showRegistration() {
    displayRegisterMessage('Please register below')
    SIGN_IN_FORM.style.display = 'block'
    LOGIN_BUTTON.style.display = 'none'
    MAIN_APP.style.display = 'none'
    REGISTER_BUTTON.style.display = 'block'
}

/* REGISTER FUNCTION
 * Save username and password to local storage
 */
function registerUser(e) {
    e.preventDefault()
    showRegistration()
    const USERNAME = document.querySelector('input[id="username"]').value
    const PASSWORD = document.querySelector('input[id="password"]').value
    if (USERNAME && PASSWORD) {
        localStorage.setItem('username', USERNAME)
        localStorage.setItem('password', PASSWORD)
        state.userAuthenticated = true
        showApplication()
    } else {
        console.log('Please enter both fields')
    }
}

/* CHECK IF REGISTERED USER
 * IF YES, DISPLAY GREETING, HIDE SIGN IN FORM
 * IF NO, DISPLAY REGISTER MESSAGE AND SHOW FORM
 * RUNS WHEN USER CLICKS LOGIN, VERIFIES USERNAME & PASSWORD EXISTS
 * DISPLAYS ERROR MESSAGE IF NOT REGISTERED, ASKS TO REGISTER FIRST
 */

function isRegistered(e) {
    e.preventDefault()
    const USERNAME_PROVIDED = document.querySelector('input[id="username"]').value
    const PASSWORD_PROVIDED = document.querySelector('input[id="password"]').value
    const USERNAME_STORED = localStorage.getItem('username')
    const PASSWORD_STORED = localStorage.getItem('password')
    if (USERNAME_PROVIDED === USERNAME_STORED && PASSWORD_PROVIDED === PASSWORD_STORED) {
        displayGreeting(USERNAME_STORED)
        SIGN_IN_FORM.style.display = 'none'
        MAIN_APP.style.display = 'block'
        getExpenses()
        getIncomeFromStorage()
        updateIncomeDisplay()
    } else {
        alert('You must register first!')
        showRegistration()
    }
}

// Update expense subtotal
function updateXPSubtotal(total, type) {
    const FORMATTED_TOTAL = addCurrencyToNumber(total)
    document.querySelector(`.${type.toLowerCase()}__subtotal`).innerHTML = FORMATTED_TOTAL
}

// Calculate expense subtotal
function calculateXPSubtotal(type) {
    const FILTERED_EXPENSES = state.expenseArray.filter(expense => expense.type === type)
    const XP_SUBTOTAL = FILTERED_EXPENSES.reduce(
        (previous, current) => previous + current.amount,
        0
    )
    updateXPSubtotal(XP_SUBTOTAL, type)
}

// Edit Expense Function
function editExpense(e) {
    const CLICKED_XP = Number(e.target.parentElement.id)
    const expense = state.expenseArray.find(expense => expense.id === CLICKED_XP)
    if (expense) {
        const EXPENSE_TYPE = expense.type
        const NEW_NAME = prompt('Enter new expense name')
        const NEW_AMOUNT = Number(prompt('Enter new expense amount'))
        if (NEW_NAME) {
            expense.name = NEW_NAME
        }
        if (NEW_AMOUNT) {
            expense.amount = NEW_AMOUNT
        }
        clearExpenses()
        displayExpense()
        calculateXPSubtotal(EXPENSE_TYPE)
        calculateExpenseTotal()
    } else {
        alert('Problem locating expense')
    }
}

/* Delete Expense Function
 * Matches ID in expense array and creates new array without id
 */
function deleteExpense(ID) {
    const expense_to_delete = state.expenseArray.find(expense => expense.id === ID)

    if (expense_to_delete) {
        state.expenseArray = state.expenseArray.filter(expense => expense.id !== ID)
        clearExpenses()
        displayExpense()
        calculateXPSubtotal(expense_to_delete.type)
        calculateExpenseTotal()
    } else {
        alert('Problem deleting expense')
    }
}

// Handle Delete Button Click
function handleDeleteButton(e) {
    const CLICKED_XP = Number(e.target.parentElement.id)
    deleteExpense(CLICKED_XP)
}

// CREATE NEW EXPENSE
function newExpense() {
    const expenseID = state.expenseArray.length + 1
    const EXPENSE_TYPE = document.querySelector('select[id="selectExpenseType"]').value
    const EXPENSE_NAME = document.querySelector('input[name="expenseName"]').value
    const EXPENSE_AMOUNT = Number(document.querySelector('input[name="expenseAmount"]').value)

    const EXPENSE = {
        type: EXPENSE_TYPE,
        name: EXPENSE_NAME,
        amount: EXPENSE_AMOUNT,
        id: expenseID,
    }
    state.expenseArray.push(EXPENSE)
    calculateXPSubtotal(EXPENSE_TYPE)
    calculateExpenseTotal()
    clearExpenses()
    displayExpense()
}

// ADD INCOME
function addIncome() {
    let amount = getNewIncome()
    console.log('amount', amount)
    if (amount !== null) {
        console.log('setting new income')
        state.incomeAmount = amount
        updateIncomeDisplay()
        localStorage.setItem('income', state.incomeAmount.toString())
        calculateExpenseTotal()
    }
}

function updateIncomeDisplay() {
    document.querySelector('.monthlyIncome').innerHTML = addCurrencyToNumber(state.incomeAmount)
}

// Event Listeners
LOGIN_BUTTON.addEventListener('click', isRegistered)
SIGN_OUT_BUTTON.addEventListener('click', signOut)
ADD_EXPENSE_BUTTON.addEventListener('click', newExpense)
ADD_INCOME_BUTTON.addEventListener('click', addIncome)
REGISTER_BUTTON.addEventListener('click', registerUser)

// CSS Variable Manipulation
const INPUTS = document.querySelectorAll('.budget-app__customizations input')

function handleUpdate() {
    document.documentElement.style.setProperty(`--${this.name}`, this.value)
}

INPUTS.forEach(input => input.addEventListener('change', handleUpdate))
