// DOM Elements
const USERNAME = document.querySelector('input[id="username"]');
const PASSWORD = document.querySelector('input[id="password"]');
const REGISTER_BUTTON = document.querySelector('.registerBtn');

/* REGISTER FUNCTION
 * Save username and password to local storage
*/
function registerUser() {
  localStorage.setItem('username', USERNAME);
  localStorage.setItem('password', PASSWORD);
}

// Event Listeners
REGISTER_BUTTON.addEventListener('click', registerUser);
