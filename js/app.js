'use strict';


// ***** GLOBALS *****
let productArray = [];
let votingRounds = 25;

// ***** DOM WINDOWS *****
let imgContainer = document.getElementById('image-container');
let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');
let figCaptionOne = document.querySelector('#image-one + figcaption');
let figCaptionTwo = document.querySelector('#image-two + figcaption');
let figCaptionThree = document.querySelector('#image-three + figcaption');
let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');
let roundsLeft = document.getElementById('show-rounds-left');
let resultsHeader = document.getElementById('results-header');


// ***** CONSTRUCTOR FUNCTION *****
function Product (name, imageExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.views = 0;
  this.votes = 0;
}

// ***** HELPER FUNCTIONS / UTILITIES *****

// Generate random numbers for product array
function randomIndexGenerator() {
  return Math.floor(Math.random() * productArray.length);
}

// Capitalize first letter of string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Make bold text by creating element
function createStrongElement(text) {
  let strongElement = document.createElement('strong');
  strongElement.textContent = text;
  strongElement.style.fontWeight = 'bold';
  return strongElement;
}

// Create Product Objects
function createProduct(name, imageExtension ='jpg') {
  productArray.push(new Product(name, imageExtension));
}

// Render Images
function renderImages(){

  // Generate three random images and check if images are unique
  let imageOneIndex, imageTwoIndex, imageThreeIndex;

  do {
    imageOneIndex = randomIndexGenerator();
    imageTwoIndex = randomIndexGenerator();
    imageThreeIndex = randomIndexGenerator();
  } while (
    imageOneIndex === imageTwoIndex ||
    imageOneIndex === imageThreeIndex ||
    imageTwoIndex === imageThreeIndex);

  // Assign unique image as source to be rendered, assign title, assign alt
  imageOne.src = productArray[imageOneIndex].image;
  imageOne.title = productArray[imageOneIndex].name;
  imageOne.alt = `picture of ${productArray[imageOneIndex].name}`;
  figCaptionOne.textContent = capitalizeFirstLetter(productArray[imageOneIndex].name);

  imageTwo.src = productArray[imageTwoIndex].image;
  imageTwo.title = productArray[imageTwoIndex].name;
  imageOne.alt = `picture of ${productArray[imageTwoIndex].name}`;
  figCaptionTwo.textContent = capitalizeFirstLetter(productArray[imageTwoIndex].name);

  imageThree.src = productArray[imageThreeIndex].image;
  imageThree.title = productArray[imageThreeIndex].name;
  imageOne.alt = `picture of ${productArray[imageThreeIndex].name}`;
  figCaptionThree.textContent = capitalizeFirstLetter(productArray[imageThreeIndex].name);

  // Increase image views
  productArray[imageOneIndex].views++;
  productArray[imageTwoIndex].views++;
  productArray[imageThreeIndex].views++;
}

// ***** EVENT HANDLERS *****
function handleImgClick(event) {
  // Identify image clicked
  let imageClicked = event.target.title;

  // Increase vote on image clicked
  for(let i = 0; i < productArray.length; i++) {
    if(imageClicked === productArray[i].name){
      productArray[i].votes++;
    }
  }

  // Generate new images
  renderImages();

  // Decrement voting round
  votingRounds--;
  roundsLeft.textContent = `There are ${votingRounds} voting rounds left!`;

  // Once voting rounds equal zero, remove ability to click
  if (votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {
    resultsHeader.textContent = 'Voting Results';

    // Create li elements to show results of rounds (view and votes)
    for (let i = 0; i < productArray.length; i++) {
      let resultListItem = document.createElement('li');

      // Make votes and views bold and capitalize first letter of product
      let productName = createStrongElement( capitalizeFirstLetter(productArray[i].name) );
      let productVotes = createStrongElement(productArray[i].votes);
      let productViews = createStrongElement(productArray[i].views);

      // .innerHTML used since manipulating elements to make bold, and not .textContent
      resultListItem.innerHTML = `${productName.outerHTML} - Votes: ${productVotes.outerHTML} & Views: ${productViews.outerHTML}`;

      resultsList.appendChild(resultListItem);
    }

    // Prevent duplicate list re-creation
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// ***** EXECUTABLE CODE *****
createProduct('bag');
createProduct('banana');
createProduct('bathroom');
createProduct('boots');
createProduct('breakfast');
createProduct('bubblegum');
createProduct('chair');
createProduct('cthulhu');
createProduct('dog-duck');
createProduct('dragon');
createProduct('pen');
createProduct('pet-sweep');
createProduct('scissors');
createProduct('shark');
createProduct('sweep','png');
createProduct('tauntaun');
createProduct('unicorn');
createProduct('water-can');
createProduct('wine-glass');

renderImages();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);

