let count = 1;

// click next button to change picture
function next() {
  count += 1;
  console.log('Next button was clicked');
  console.log(count);
  show()
}

// show image equal to count
function show() {
  console.log('Function show triggered...');
  console.log(`image${count}`);
  const imageID = `image${count}`;
  const image = document.getElementById(imageID);
  if (window.getComputedStyle(image).display === 'none') {
    image.style.display = 'block';
  } else {
    image.style.display = 'none';
  }
}

show();
