var imagesArray = [
  {
    id: 1,
    imgPath: 'images/frank-mckenna.jpg',
    selected: false,
  },
  {
    id: 2,
    imgPath: 'images/harley-davidson.jpg',
    selected: false,
  },
  {
    id: 3,
    imgPath: 'images/joelvalve.jpg',
    selected: false,
  },
  {
    id: 4,
    imgPath: 'images/kyle-johnson.jpg',
    selected: false,
  },
  {
    id: 5,
    imgPath: 'images/mikhail-vasilyev.jpg',
    selected: false,
  },
  {
    id: 6,
    imgPath: 'images/sammie-vasquez.jpg',
    selected: false,
  },
  {
    id: 1,
    imgPath: 'images/frank-mckenna.jpg',
    selected: false,
  },
  {
    id: 2,
    imgPath: 'images/harley-davidson.jpg',
    selected: false,
  },
  {
    id: 3,
    imgPath: 'images/joelvalve.jpg',
    selected: false,
  },
  {
    id: 4,
    imgPath: 'images/kyle-johnson.jpg',
    selected: false,
  },
  {
    id: 5,
    imgPath: 'images/mikhail-vasilyev.jpg',
    selected: false,
  },
  {
    id: 6,
    imgPath: 'images/sammie-vasquez.jpg',
    selected: false,
  }
]

// Create game board
var gameBoard = document.querySelector('.game-board');
var placeholderImage = 'images/jules-bss.jpg';

var matchesElement = document.querySelector('.matches');
var missesElement = document.querySelector('.misses');

var matches = 0;
var misses = 0; 

matchesElement.innerHTML = matches;
missesElement.innerHTML = misses;

// Shuffle elements of the array
for (var i = imagesArray.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * i);
  var temp = imagesArray[i];
  imagesArray[i] = imagesArray[j];
  imagesArray[j] = temp;
}

imagesArray.forEach(function(item, index) {
  // Create square element
  var squareElement = document.createElement('div');

  // Add class to square
  squareElement.classList.add('square');

  // Add id attribute to square
  squareElement.setAttribute('id', item.id);

  // Add selected attribute to square
  squareElement.setAttribute('data-selected', item.selected);

  // Create image element
  var img = document.createElement('img');

  // Add placeholder image path
  img.src = placeholderImage;

  // Append image to square
  squareElement.appendChild(img);

  // Append square to game board
  gameBoard.appendChild(squareElement);    

})

// Select all square tiles on page
var squaresArray = document.querySelectorAll('.square');
var clickedArray = [];

function hideSquares(square1, square2) {
  square1.classList.add('item-is-hidden');
  square2.classList.add('item-is-hidden');
}

function showImages(square) {
  imagesArray.forEach(function(image, imageIndex) {
    // Checks clicked square against its image id
    if (square.getAttribute('id') == image.id) {
      square.querySelector('img').setAttribute('src', image.imgPath);
    }
  })
}

function hideImages(square1, square2) {
  imagesArray.forEach(function(image, imageIndex) {
    // Checks clicked square against its image id
    if (square1.getAttribute('id') == image.id) {
      square1.querySelector('img').setAttribute('src', placeholderImage);
      square1.classList.remove('clicked', 'disabled');
    }
    if (square2.getAttribute('id') == image.id) {
      square2.querySelector('img').setAttribute('src', placeholderImage);
      square2.classList.remove('clicked', 'disabled');
    }
  })
}

function checkClickedItems() {
  var firstItem = clickedArray[0];
  var secondItem = clickedArray[1];

  if (firstItem.getAttribute('id') == secondItem.getAttribute('id')) {
    hideSquares(firstItem, secondItem);
    clickedArray = [];
    matches += 1;
    matchesElement.innerHTML = matches;
  } else {
    setTimeout(hideImages, 1500, firstItem, secondItem);
    clickedArray = [];
    misses += 1;
    missesElement.innerHTML = misses;
  }

}

if (clickedArray.length < 3) {
  squaresArray.forEach(function(square, index) {
    square.addEventListener('click', function() {
      this.classList.add('clicked', 'disabled');
      showImages(square);
      clickedArray.push(square);
      if (clickedArray.length == 2) {
        checkClickedItems();
      }
    })
  })
}









