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
let POLL_ID = 0;

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
    const checkboxLabel = document.createElement('label');
    checkboxLabel.innerHTML = 'Vote Yes';
    const voteCheck = document.createElement('INPUT');
    voteCheck.type = 'checkbox';
    voteCheck.name = 'voting';
    pollRow.appendChild(voteCheck);
    pollRow.insertBefore(checkboxLabel, voteCheck);
    const submitLabel = document.createElement('label');
    submitLabel.innerHTML = 'Enter Name';
    const submitName = document.createElement('INPUT');
    submitName.type = 'text';
    pollRow.appendChild(submitName);
    pollRow.insertBefore(submitLabel, submitName);
  }
}

function saveForm(e) {
  e.preventDefault();
  POLL_ID += 1;
  const poll = {};
  poll.title = titleInput.value;
  poll.location = locationInput.value;
  poll.comments = commentsInput.value;
  poll.date = eventInput.value;
  poll.id = POLL_ID;
  polls.push(poll);
  localStorage.setItem('polls', JSON.stringify(polls));
  displayPolls();
}

addBtn.addEventListener('click', addDate);
submitBtn.addEventListener('click', saveForm);

displayPolls();
