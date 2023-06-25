'use strict';


// ***** GLOBALS *****
let productArray = [];
let votingRounds = 25;
let indexArray = [];

// ***** DOM WINDOWS *****
let imgContainer = document.getElementById('image-container');
let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');
let figCaptionOne = document.querySelector('#image-one + figcaption');
let figCaptionTwo = document.querySelector('#image-two + figcaption');
let figCaptionThree = document.querySelector('#image-three + figcaption');
let resultsBtn = document.getElementById('show-results-btn');
let roundsLeft = document.getElementById('show-rounds-left');
let resultsHeader = document.getElementById('results-header');

// ***** CANVAS ELEMENT *****
let ctx = document.getElementById('my-chart');

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

// Create Product Objects
function createProduct(name, imageExtension ='jpg') {
  productArray.push(new Product(name, imageExtension));
}

// Create Chart from Chart.JS library
function renderChart() {
  // Prepare chart data
  let chartLabels = [];
  let chartViews =[];
  let chartVotes = [];

  for(let i = 0; i < productArray.length; i++) {
    chartLabels.push(productArray[i].name);
    chartViews.push(productArray[i].views);
    chartVotes.push(productArray[i].votes);
  }

  // Configure chart options
  let chartOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14 // set font size for chart legends
          }
        }
      }
    },
    // Set bar chart horizontally
    indexAxis: 'y',
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          display: true
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  // Configure chart datasets
  let chartDatasets = [
    {
      label: '# of Views',
      data: chartViews,
      borderWidth: 0.75,
      borderColor: '#000000',
      backgroundColor: '#7fffd4'
    },
    {
      label: '# of Votes',
      data: chartVotes,
      borderWidth: 0.75,
      borderColor: '#000000',
      backgroundColor: '#ffa07a'
    }
  ];

  // Create chart object
  let chartConfig = {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: chartDatasets
    },
    options: chartOptions
  };

  // Render chart
  new Chart(ctx, chartConfig);
}

// Render Images
function renderImages(){
  let imageOneIndex, imageTwoIndex, imageThreeIndex;

  // Generate 6 random numbers and check if numbers are unique
  while(indexArray.length < 6) {
    let randomNumber = randomIndexGenerator();
    if (!indexArray.includes(randomNumber) ) {
      indexArray.push(randomNumber);
    }
  }
  // Remove first three indices from indexArray
  imageOneIndex = indexArray.shift();
  imageTwoIndex = indexArray.shift();
  imageThreeIndex = indexArray.shift();

  // Assign unique image as source to be rendered, assign title, assign alt
  imageOne.src = productArray[imageOneIndex].image;
  imageOne.title = productArray[imageOneIndex].name;
  imageOne.alt = `picture of ${productArray[imageOneIndex].name}`;
  figCaptionOne.textContent = capitalizeFirstLetter(productArray[imageOneIndex].name);

  imageTwo.src = productArray[imageTwoIndex].image;
  imageTwo.title = productArray[imageTwoIndex].name;
  imageTwo.alt = `picture of ${productArray[imageTwoIndex].name}`;
  figCaptionTwo.textContent = capitalizeFirstLetter(productArray[imageTwoIndex].name);

  imageThree.src = productArray[imageThreeIndex].image;
  imageThree.title = productArray[imageThreeIndex].name;
  imageThree.alt = `picture of ${productArray[imageThreeIndex].name}`;
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
      // Generate new images
      renderImages();
      // Decrement voting round
      votingRounds--;
      roundsLeft.textContent = `There are ${votingRounds} voting rounds left!`;
    }
  }

  // Once voting rounds equal zero, remove ability to click image
  if (votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {
    resultsHeader.textContent = 'Voting Results';

    // Apply styling to .chart-container
    let chartContainer = document.querySelector('.chart-container');
    chartContainer.style.position = 'relative';
    chartContainer.style.margin = 'auto';
    chartContainer.style.height = '100vh';
    chartContainer.style.width = '30vw';
    chartContainer.style.border = '2px solid black';
    chartContainer.style.background = 'white';

    // Create Chart
    renderChart();

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

