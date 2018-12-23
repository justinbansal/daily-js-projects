// DOM Elements
const titleInput = document.getElementById('title');
const locationInput = document.getElementById('location');
const commentsInput = document.getElementById('comments');
const eventInput = document.getElementById('event');
const addBtn = document.getElementById('addDate');
const submitBtn = document.getElementById('submit');
const pollRow = document.getElementById('poll-row');


// Variables
let polls = [];

function addDate(e) {
  e.preventDefault();
  const input = document.createElement('INPUT');
  input.type = 'date';
  input.name = 'event';
  document.getElementById('dateRow').appendChild(input);
}

// loop through array of polls and render them on the page
function displayPolls() {
  const storedPolls = JSON.parse(localStorage.getItem('polls'));
  if (storedPolls) {
    polls = storedPolls;
  }
  for (let i = 0; i < polls.length; i += 1) {
    const dateHeading = document.createElement('h1');
    pollRow.appendChild(dateHeading);
    dateHeading.innerHTML = polls[i].date;
    const voteCheck = document.createElement('INPUT');
    voteCheck.type = 'checkbox';
    voteCheck.name = 'voting';
    pollRow.appendChild(voteCheck);
    const submitName = document.createElement('INPUT');
    submitName.type = 'text';
    pollRow.appendChild(submitName);
  }
}

function saveForm(e) {
  e.preventDefault();
  const poll = {};
  poll.title = titleInput.value;
  poll.location = locationInput.value;
  poll.comments = commentsInput.value;
  poll.date = eventInput.value;
  polls.push(poll);
  displayPolls();
  localStorage.setItem('polls', JSON.stringify(polls));
}

addBtn.addEventListener('click', addDate);
submitBtn.addEventListener('click', saveForm);

displayPolls();
