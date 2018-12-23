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

function saveForm(e) {
  e.preventDefault();
  const poll = {};
  poll.title = titleInput.value;
  poll.location = locationInput.value;
  poll.comments = commentsInput.value;
  poll.date = eventInput.value;
  console.log(poll);
  localStorage.setItem('poll', JSON.stringify(poll));
}

addBtn.addEventListener('click', addDate);
submitBtn.addEventListener('click', saveForm);
