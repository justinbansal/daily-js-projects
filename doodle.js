// DOM Elements
const titleInput = document.getElementById('title');
const locationInput = document.getElementById('location');
const commentsInput = document.getElementById('comments');
const eventInput = document.getElementById('event');
const addBtn = document.getElementById('addDate');
const submitBtn = document.getElementById('submit');
const pollRow = document.getElementById('poll-row');
const voteInput = document.getElementById('voteInput');
const voteBtn = document.getElementById('submitVote');


// Variables
let polls = [];
let pollID = 0;

// loop through array of polls and render them on the page
function displayPolls() {
  const storedPolls = JSON.parse(localStorage.getItem('polls'));
  if (storedPolls) {
    polls = storedPolls;
    pollID = polls.length;
  }
  for (let i = 0; i < polls.length; i += 1) {
    const pollContainer = document.createElement('div');
    pollContainer.className = 'pollContainer';
    pollContainer.id = polls[i].id;
    pollRow.appendChild(pollContainer);
    const dateHeading = document.createElement('h3');
    pollContainer.appendChild(dateHeading);
    dateHeading.innerHTML = polls[i].date;
    const filteredVotes = polls[i].voters.filter(voter => voter.vote === true);
    polls[i].votes = filteredVotes.length;
    const votesText = document.createElement('p');
    pollContainer.appendChild(votesText);
    votesText.innerHTML = polls[i].votes;
    const checkboxLabel = document.createElement('label');
    checkboxLabel.innerHTML = 'Vote Yes';
    const voteCheck = document.createElement('INPUT');
    voteCheck.type = 'checkbox';
    voteCheck.name = 'voting';
    voteCheck.id = `checkbox${polls[i].id}`;
    pollContainer.appendChild(voteCheck);
    pollContainer.insertBefore(checkboxLabel, voteCheck);
  }
}

function saveForm(e) {
  e.preventDefault();
  pollID += 1;
  const poll = {};
  poll.title = titleInput.value;
  poll.location = locationInput.value;
  poll.date = eventInput.value;
  poll.id = pollID;
  poll.voters = [];
  poll.votes = '';
  polls.push(poll);
  localStorage.setItem('polls', JSON.stringify(polls));
  displayPolls();
}

// update each poll with name of voter
function submitVote() {
  for (let i = 0; i < polls.length; i += 1) {
    const voter = {
      name: `${voteInput.value}`,
      vote: document.getElementById(`checkbox${polls[i].id}`).checked,
    };
    polls[i].voters.push(voter);
  }
  localStorage.setItem('polls', JSON.stringify(polls));
  window.location.reload();
}

submitBtn.addEventListener('click', saveForm);
voteBtn.addEventListener('click', submitVote);

displayPolls();
