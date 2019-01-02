// DOM Elements
const REGISTER_BUTTON = document.querySelector('.registerBtn');
const SIGN_IN_FORM = document.querySelector('.sign-in');

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

// Event Listeners
REGISTER_BUTTON.addEventListener('click', registerUser);

isRegistered();
