let count = 1;

// array of image ID's
// loop through this looking for a match and showing the match, hide rest
const imageIDs = ['image1', 'image2', 'image3'];

const circleIDs = ['circle1', 'circle2', 'circle3'];

// highlight circle that represents the current image
function highlightCircle() {
  for (let i = 0; i < circleIDs.length; i += 1) {
    const circle = document.getElementById(circleIDs[i]);
    if (circleIDs[i] === (`circle${count}`)) {
      circle.classList.add('highlighted-circle');
    } else {
      circle.classList.remove('highlighted-circle');
    }
  }
}

function checkForMatch() {
  for (let i = 0; i < imageIDs.length; i += 1) {
    const image = document.getElementById(imageIDs[i]);
    if (imageIDs[i] === (`image${count}`)) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  }
  highlightCircle();
}

// reset count to 1 if count reaches 4
function resetCount() {
  if (count === 4) {
    count = 1;
  } else if (count === 0) {
    count = 3;
  }
}

// click next button to change picture
function next() {
  count += 1;
  console.log('Next button was clicked');
  console.log(count);
  resetCount();
  checkForMatch();
}

// click previous button to go back
function previous() {
  count -= 1;
  console.log('Prevous button was clicked');
  console.log(count);
  resetCount();
  checkForMatch();
}

checkForMatch();
