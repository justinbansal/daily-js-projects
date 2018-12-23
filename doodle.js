function addDate(e) {
  e.preventDefault();
  const input = document.createElement('INPUT');
  input.type = 'date';
  input.name = 'event';
  document.getElementById('dateRow').appendChild(input);
}

document.getElementById('addDate').addEventListener('click', addDate);
