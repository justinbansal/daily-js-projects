// DOM Elements
const titleInput = document.getElementById('title');
const locationInput = document.getElementById('location');
const dateInput1 = document.getElementById('date1');
const dateInput2 = document.getElementById('date2');
const dateInput3 = document.getElementById('date3');
const dateInput4 = document.getElementById('date4');
const dateInput5 = document.getElementById('date5');
const addBtn = document.getElementById('addDate');
const submitBtn = document.getElementById('submit');
const dateGroup = document.getElementById('date-group');
const pollRow = document.getElementById('poll-row');
const voteInput = document.getElementById('voteInput');
const voteBtn = document.getElementById('submitVote');


// Variables
let polls = [];
let pollID = 0;
let dateID = 1;

// show list of voters
function showVoters(ID) {
  document.getElementById(ID.fromElement.id).querySelector('ul').style.display = 'block';
}

// hide list of voters
function hideVoters(ID) {
  document.getElementById(ID.toElement.id).querySelector('ul').style.display = 'none';
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
    votesText.onmouseleave = hideVoters;
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

function countDateFields() {
  const count = document.querySelectorAll('input[name^="date"').length;
  dateID = count + 1;
  if (dateID === 5) {
    addBtn.style.display = 'none';
  }
}

function addDate(e) {
  e.preventDefault();
  countDateFields();
  const label = document.createElement('label');
  label.for = 'date';
  label.innerHTML = 'Date';
  const newInput = document.createElement('input');
  newInput.type = 'date';
  newInput.name = 'date';
  newInput.id = `date${dateID}`;
  dateGroup.appendChild(label);
  dateGroup.appendChild(newInput);
}

function saveForm(e) {
  e.preventDefault();
  pollID += 1;
  const poll = {};
  poll.title = titleInput.value;
  poll.location = locationInput.value;
  // poll.date = eventInput.value;
  // poll.id = pollID;
  // poll.voters = [];
  // poll.votes = '';
  poll.eventDetails = [];
  // create new object for each date
  for (let d = 1; d <= dateID; d += 1) {
    const event = {};
    // event.date = dateInput1.value;
    event.date = `dateInput${d}`.value;
    event.id = pollID;
    event.voters = [];
    event.votes = '';
    poll.eventDetails.push(event);
  }
  // const event = {};
  // event.date = dateInput1.value;
  // event.id = pollID;
  // event.voters = [];
  // event.votes = '';
  // poll.eventDetails.push(event);
  polls.push(poll);
  localStorage.setItem('polls', JSON.stringify(polls));
  // displayPolls();
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

addBtn.addEventListener('click', addDate);
submitBtn.addEventListener('click', saveForm);
voteBtn.addEventListener('click', submitVote);

displayPolls();
