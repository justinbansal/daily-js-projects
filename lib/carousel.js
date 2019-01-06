let count=1;// array of image ID's
// loop through this looking for a match and showing the match, hide rest
const imageIDs=['image1','image2','image3'],circleIDs=['circle1','circle2','circle3'];// highlight circle that represents the current image
function highlightCircle(){for(let a=0;a<circleIDs.length;a+=1){const b=document.getElementById(circleIDs[a]);`circle${count}`===circleIDs[a]?b.classList.add('highlighted-circle'):b.classList.remove('highlighted-circle')}}function checkForMatch(){for(let a=0;a<imageIDs.length;a+=1){const b=document.getElementById(imageIDs[a]);b.style.display=`image${count}`===imageIDs[a]?'block':'none'}highlightCircle()}// clicking circle will show image it represents
function showClicked(a){const b=+a.match(/\d/g);for(let c=0;c<imageIDs.length;c+=1){const a=document.getElementById(imageIDs[c]);a.style.display=`image${b}`===imageIDs[c]?'block':'none'}count=b,highlightCircle()}// reset count to 1 if count reaches 4
function resetCount(){4===count?count=1:0===count&&(count=3)}// click next button to change picture
function next(){count+=1,resetCount(),checkForMatch()}// click previous button to go back
function previous(){count-=1,resetCount(),checkForMatch()}checkForMatch();