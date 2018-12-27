// DOM Elements
const titleInput = document.getElementById('title');
const locationInput = document.getElementById('location');
const eventInput = document.getElementById('event');
const submitBtn = document.getElementById('submit');
const pollRow = document.getElementById('poll-row');
const voteInput = document.getElementById('voteInput');
const voteBtn = document.getElementById('submitVote');


// Variables
let polls = [];
let pollID = 0;

// show list of voters
function showVoters(ID) {
  document.getElementById(ID.fromElement.id).querySelector('ul').style.display = 'block';
}

// loop through array of polls and render them on the page
function displayPolls() {
  const storedPolls = JSON.parse(localStorage.getItem('polls'));
  if (storedPolls) {
    polls = storedPolls;
    pollID = polls.length;
  }
  for (let i = 0; i < polls.length; i += 1) {
    const pollContainer = document.createElement('div');
    pollContainer.classList = 'pollContainer col-md-3';
    pollContainer.id = polls[i].id;
    pollRow.appendChild(pollContainer);
    const dateHeading = document.createElement('h3');
    pollContainer.appendChild(dateHeading);
    dateHeading.innerHTML = polls[i].date;
    const filteredVotes = polls[i].voters.filter(voter => voter.vote === true);
    polls[i].votes = filteredVotes.length;
    const votesText = document.createElement('p');
    votesText.className = 'votesNumber';
    votesText.onmouseover = showVoters;
    pollContainer.appendChild(votesText);
    votesText.innerHTML = polls[i].votes;
    const checkboxLabel = document.createElement('label');
    checkboxLabel.className = 'form-check-label';
    checkboxLabel.innerHTML = 'Vote Yes';
    const voteCheck = document.createElement('INPUT');
    voteCheck.type = 'checkbox';
    voteCheck.className = 'form-check-input';
    voteCheck.name = 'voting';
    voteCheck.id = `checkbox${polls[i].id}`;
    pollContainer.appendChild(voteCheck);
    pollContainer.insertBefore(checkboxLabel, voteCheck);
    const votersList = document.createElement('ul');
    pollContainer.appendChild(votersList);
    for (let m = 0; m < filteredVotes.length; m += 1) {
      const voteItem = document.createElement('li');
      voteItem.innerHTML = filteredVotes[m].name;
      votersList.appendChild(voteItem);
    }
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
