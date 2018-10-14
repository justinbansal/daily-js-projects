let count = 1;

// array of image ID's
// loop through this looking for a match and showing the match, hide rest
const imageIDs = ['image1', 'image2', 'image3'];

function checkForMatch() {
  for (let i = 0; i < imageIDs.length; i += 1) {
    const image = document.getElementById(imageIDs[i]);
    if (imageIDs[i] === (`image${count}`)) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  }
}

// click next button to change picture
function next() {
  count += 1;
  console.log('Next button was clicked');
  console.log(count);
  checkForMatch();
}

checkForMatch();
