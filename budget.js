// DOM Elements
const REGISTER_BUTTON = document.querySelector('.registerBtn');

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
