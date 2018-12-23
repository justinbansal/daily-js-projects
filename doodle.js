// Form Elements
const titleInput = document.getElementById('title');
const locationInput = document.getElementById('location');
const commentsInput = document.getElementById('comments');
const eventInput = document.getElementById('event');
const addBtn = document.getElementById('addDate');
const submitBtn = document.getElementById('submit');


function addDate(e) {
  e.preventDefault();
  const input = document.createElement('INPUT');
  input.type = 'date';
  input.name = 'event';
  document.getElementById('dateRow').appendChild(input);
}

function saveForm() {
  localStorage.setItem('title', titleInput.value);
  localStorage.setItem('location', locationInput.value);
  localStorage.setItem('comments', commentsInput.value);
  localStorage.setItem('event', eventInput.value);
}

addBtn.addEventListener('click', addDate);
submitBtn.addEventListener('click', saveForm);
