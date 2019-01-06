// Initialize App State
// https://flow.org/en/docs/types/objects/#toc-exact-object-types
let state={incomeAmount:0,expenseArray:[],userAuthenticated:!1// DOM Elements
};const LOGIN_BUTTON=document.querySelector('.loginBtn'),SIGN_IN_FORM=document.querySelector('.sign-in'),SIGN_OUT_BUTTON=document.querySelector('.signOutBtn'),REGISTER_BUTTON=document.querySelector('.registerBtn'),MAIN_APP=document.querySelector('.budget-app'),ADD_INCOME_BUTTON=document.querySelector('.addIncomeBtn'),ADD_EXPENSE_BUTTON=document.querySelector('.addExpenseBtn');// Greet User
function displayGreeting(a){const b=a.toUpperCase();document.querySelector('.greeting').innerHTML=`Welcome ${b}!`}// Ask User to Register
function displayRegisterMessage(a){document.querySelector('.greeting').innerHTML=a}// Convert to Currency
function addCurrencyToNumber(a){return`$ ${a.toFixed(2)}`}// if userAuthenticated false, hide app
function hideApplication(){SIGN_IN_FORM.style.display='block',LOGIN_BUTTON.style.display='inline-block',REGISTER_BUTTON.style.display='inline-block',MAIN_APP.style.display='none',displayRegisterMessage('Please Login First')}// if userAuthentication true, show app
function showApplication(){const a=localStorage.getItem('username');displayGreeting(a),SIGN_IN_FORM.style.display='none',MAIN_APP.style.display='block'}/* Filter by expense type and display both name & amount
 * Needs to add to page based on what is in expense array
 * Use object deconstruction to set variables
 */function displayExpense(){for(let a=0;a<state.expenseArray.length;a+=1){const{type:b,name:c,id:d,amount:e}=state.expenseArray[a];let f=addCurrencyToNumber(e);const g=document.querySelector(`.${b.toLowerCase()}`),h=document.createElement('div'),i=document.createElement('button');i.classList='btn btn-danger deleteBtn',i.innerHTML='X',i.onclick=handleDeleteButton,h.appendChild(i);const j=document.createElement('button');j.classList='btn btn-primary editBtn',j.innerHTML='EDIT',j.onclick=editExpense,h.appendChild(j),h.className='expenseContainer',h.id=d,g.appendChild(h);const k=document.createElement('p');k.className='expenseName',k.innerHTML=c.toUpperCase(),h.append(k);const l=document.createElement('p');l.className='expenseAmount',l.innerHTML=f,h.appendChild(l)}}// Update monthly expense total
function updateExpenseTotal(a){const b=addCurrencyToNumber(a);document.querySelector('.monthlyTotal').innerHTML=b}// Check Income
function getNewIncome(){let a=document.querySelector('input[name="income"]').value;return validateNumericInput(a)?(console.log('validated'),+a.replace(',','')):(alert('invalid input'),null)}function validateNumericInput(a){// There is probably a package that can handle this, but since the point is learning, this would be a regex that would cover a few
// https://stackoverflow.com/questions/2227370/currency-validation
var b=/^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;return b.test(a)}// Calculate balance, income minus expenses
function calculateBalance(a){let b=state.incomeAmount-a;document.querySelector('.balance').innerHTML=addCurrencyToNumber(b)}// Calculate expense total
function calculateExpenseTotal(){const a=state.expenseArray.reduce((a,b)=>a+b.amount,0);updateExpenseTotal(a),calculateBalance(a)}// Remove all matching elements from DOM
function clearExpenses(){document.querySelectorAll('.expenseContainer').forEach(a=>a.parentNode.removeChild(a))}// Get income
function getIncomeFromStorage(){state.incomeAmount=+localStorage.getItem('income'),console.log('set income',state)}// Retrieve expense data
function getExpenses(){const a=JSON.parse(localStorage.getItem('expenses'));a&&(state.expenseArray=a,clearExpenses(),displayExpense(),calculateExpenseTotal())}// Checks Authentication
function isAuthenticated(){state.userAuthenticated?(getExpenses(),getIncomeFromStorage(),updateIncomeDisplay(),showApplication()):hideApplication()}// Sign Out
function signOut(){state.userAuthenticated=!1,isAuthenticated(),localStorage.setItem('expenses',JSON.stringify(state.expenseArray)),localStorage.setItem('income',state.incomeAmount.toString())}// Switch to registration menu
function showRegistration(){displayRegisterMessage('Please register below'),SIGN_IN_FORM.style.display='block',LOGIN_BUTTON.style.display='none',MAIN_APP.style.display='none',REGISTER_BUTTON.style.display='block'}/* REGISTER FUNCTION
 * Save username and password to local storage
 */function registerUser(a){a.preventDefault(),showRegistration();const b=document.querySelector('input[id="username"]').value,c=document.querySelector('input[id="password"]').value;b&&c?(localStorage.setItem('username',b),localStorage.setItem('password',c),state.userAuthenticated=!0,showApplication()):console.log('Please enter both fields')}/* CHECK IF REGISTERED USER
 * IF YES, DISPLAY GREETING, HIDE SIGN IN FORM
 * IF NO, DISPLAY REGISTER MESSAGE AND SHOW FORM
 * RUNS WHEN USER CLICKS LOGIN, VERIFIES USERNAME & PASSWORD EXISTS
 * DISPLAYS ERROR MESSAGE IF NOT REGISTERED, ASKS TO REGISTER FIRST
 */function isRegistered(a){a.preventDefault();const b=document.querySelector('input[id="username"]').value,c=document.querySelector('input[id="password"]').value,d=localStorage.getItem('username'),e=localStorage.getItem('password');b===d&&c===e?(displayGreeting(d),SIGN_IN_FORM.style.display='none',MAIN_APP.style.display='block',getExpenses(),getIncomeFromStorage(),updateIncomeDisplay()):(alert('You must register first!'),showRegistration())}// Update expense subtotal
function updateXPSubtotal(a,b){const c=addCurrencyToNumber(a);document.querySelector(`.${b.toLowerCase()}__subtotal`).innerHTML=c}// Calculate expense subtotal
function calculateXPSubtotal(a){const b=state.expenseArray.filter(b=>b.type===a),c=b.reduce((a,b)=>a+b.amount,0);updateXPSubtotal(c,a)}// Edit Expense Function
function editExpense(a){const b=+a.target.parentElement.id,c=state.expenseArray.find(a=>a.id===b);if(c){const a=c.type,b=prompt('Enter new expense name'),d=+prompt('Enter new expense amount');b&&(c.name=b),d&&(c.amount=d),clearExpenses(),displayExpense(),calculateXPSubtotal(a),calculateExpenseTotal()}else alert('Problem locating expense')}/* Delete Expense Function
 * Matches ID in expense array and creates new array without id
 */function deleteExpense(a){const b=state.expenseArray.find(b=>b.id===a);b?(state.expenseArray=state.expenseArray.filter(b=>b.id!==a),clearExpenses(),displayExpense(),calculateXPSubtotal(b.type),calculateExpenseTotal()):alert('Problem deleting expense')}// Handle Delete Button Click
function handleDeleteButton(a){const b=+a.target.parentElement.id;deleteExpense(b)}// CREATE NEW EXPENSE
function newExpense(){const a=state.expenseArray.length+1,b=document.querySelector('select[id="selectExpenseType"]').value,c=document.querySelector('input[name="expenseName"]').value,d=+document.querySelector('input[name="expenseAmount"]').value;// ***NOTE***: Do you need to do any conversions to handle different styles of inputting a number?
// Alternatively, is there a way that you could force the formatting of a number and display that to the user?
// Think about the difference between one thousand, 1,000, 1000, and 1000.00
state.expenseArray.push({type:b,name:c,amount:d,id:a}),calculateXPSubtotal(b),calculateExpenseTotal(),clearExpenses(),displayExpense()}// ADD INCOME
function addIncome(){let a=getNewIncome();console.log('amount',a),null!==a&&(console.log('setting new income'),state.incomeAmount=a,updateIncomeDisplay(),localStorage.setItem('income',state.incomeAmount.toString()),calculateExpenseTotal())}function updateIncomeDisplay(){document.querySelector('.monthlyIncome').innerHTML=addCurrencyToNumber(state.incomeAmount)}// Event Listeners
LOGIN_BUTTON.addEventListener('click',isRegistered),SIGN_OUT_BUTTON.addEventListener('click',signOut),ADD_EXPENSE_BUTTON.addEventListener('click',newExpense),ADD_INCOME_BUTTON.addEventListener('click',addIncome),REGISTER_BUTTON.addEventListener('click',registerUser);// CSS Variable Manipulation
const INPUTS=document.querySelectorAll('.budget-app__customizations input');function handleUpdate(){document.documentElement.style.setProperty(`--${this.name}`,this.value)}INPUTS.forEach(a=>a.addEventListener('change',handleUpdate));