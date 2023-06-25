'use strict';


// ***** GLOBALS *****
let productArray = [];
let votingRounds = 25;

// ***** DOM WINDOWS *****
let imgContainer = document.getElementById('image-container');
let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');
let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');


// ***** CONSTRUCTOR FUNCTION *****
function Product (name, imageExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.views = 0;
  this.votes = 0;
}

// ***** HELPER FUNCTIONS / UTILITIES *****
function createProduct(name, imageExtension ='jpg') {
  productArray.push(new Product(name, imageExtension));
}

// ***** EVENT HANDLERS *****

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
createProduct('sweep');
createProduct('tauntaun');
createProduct('unicorn');
createProduct('water-can');
createProduct('wine-glass');
