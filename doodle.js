// Form Elements
const titleInput = document.getElementById('title');
const locationInput = document.getElementById('location');
const commentsInput = document.getElementById('comments');
const eventInput = document.getElementById('event');
const addBtn = document.getElementById('addDate');
const submitBtn = document.getElementById('submit');
let pollID = 0;

function addDate(e) {
  e.preventDefault();
  const input = document.createElement('INPUT');
  input.type = 'date';
  input.name = 'event';
  document.getElementById('dateRow').appendChild(input);
}

function saveForm(e) {
  e.preventDefault();
  const poll = {};
  pollID += 1;
  poll.title = titleInput.value;
  poll.location = locationInput.value;
  poll.comments = commentsInput.value;
  poll.date = eventInput.value;
  localStorage.setItem(`poll${pollID}`, JSON.stringify(poll));
}

addBtn.addEventListener('click', addDate);
submitBtn.addEventListener('click', saveForm);
