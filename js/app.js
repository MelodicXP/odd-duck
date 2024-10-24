'use strict';
// ***** GLOBALS *****
let originalProductData = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck'
 ,'dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass']; // original data
let productArray = []; // store products as they are created
let votingRounds = 25;
let randomIndexArray = []; // hold randomly generated index numbers

// ***** DOM WINDOWS *****
let imgContainer = document.getElementById('image-container');
let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');
let imageCaptionOne = document.querySelector('#image-one + figcaption');
let imageCaptionTwo = document.querySelector('#image-two + figcaption');
let imageCaptionThree = document.querySelector('#image-three + figcaption');
let resultsBtn = document.getElementById('show-results-btn');
let roundsLeft = document.getElementById('show-rounds-left');
let resultsHeader = document.getElementById('chart-header');

// ***** CANVAS ELEMENT *****
let ctx = document.getElementById('my-chart');

// ***** CONSTRUCTOR FUNCTION *****
function Product (name, imageExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.views = 0;
  this.votes = 0;
}

// Create Product Objects
function createProduct(name, imageExtension ='jpg') {
  productArray.push(new Product(name, imageExtension));
}

// Render Images
function renderThreeRandomImages() {
  // Generate 6 random numbers and check if numbers are unique
  while (randomIndexArray.length < 6) {
    let randomNumber = randomIndexGenerator();
    if (!randomIndexArray.includes(randomNumber) ) {
      randomIndexArray.push(randomNumber);
    }
  }

  // Remove last three random numbers from randomIndexArray
  let randomIndexNumbers = [randomIndexArray.pop(), randomIndexArray.pop(), randomIndexArray.pop()];
  
  // Get image elements from html (defined at top)
  let imageElements = [imageOne, imageTwo, imageThree];
  let imageCaptions = [imageCaptionOne, imageCaptionTwo, imageCaptionThree];
  
  // For each random index number generated, get random product and set image attributes and increase views
  randomIndexNumbers.forEach((index, i) => {
    let randomProduct = productArray[index];
    setImageAttributes(imageElements[i], imageCaptions[i], randomProduct);
    randomProduct.views++;
  });
}

// Generate random numbers for product array
function randomIndexGenerator() {
  return Math.floor(Math.random() * productArray.length);
}
// Set attritbutes for each image rendered
let setImageAttributes = (imageElement, imageCaptionElement, product) => {
  imageElement.src = product.image;
  imageElement.title = product.name;
  imageElement.alt = `picture of ${product.name}`;
  imageCaptionElement = capitalizeFirstLetter(product.name);
};

// Capitalize first letter of string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ***** EVENT HANDLERS *****
function handleImgClick(event) {
  // Identify image clicked
  let imageClicked = event.target.title;

  // Increase vote on image clicked
  for (let i = 0; i < productArray.length; i++) {
    if (imageClicked === productArray[i].name) {
      productArray[i].votes++;
      // Generate new images
      renderThreeRandomImages();
      // Decrement voting round
      votingRounds--;
      roundsLeft.textContent = `There are ${votingRounds} voting rounds left!`;
    }
  }

  // Once voting rounds equal zero, remove ability to click image
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);

    // ***** LOCAL STORAGE *****

    // Convert data to string/JSON to store in local storage
    let stringifiedProducts = JSON.stringify(productArray);

    // Store stringified data to local storage
    localStorage.setItem('myProducts', stringifiedProducts);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {
    resultsHeader.textContent = 'Voting Results';

    // Apply styling to .chart-container
    let chartContainer = document.querySelector('#chart-data');
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

// ***** lOCAL STORAGE CONTINUES HERE *****

const loadAndRebuildProductData = () => {
  // Retrieve data from local storage if any
  let productsFromLocalStorage = localStorage.getItem('myProducts');
  
  // Convert data from local storage into usable data (parse)
  let parsedProductsFromLocalStorage = JSON.parse(productsFromLocalStorage);
  
  // If products from local storage present, Re-build products from local storage
  if (productsFromLocalStorage) {
    parsedProductsFromLocalStorage.forEach((product) => {
      if (product.name === 'sweep') {
        createProduct(product.name, 'png');
      } else {
        createProduct(product.name);
      }
      // Assign views and votes as product objects are being re-created
      productArray[productArray.length - 1].views = product.views;
      productArray[productArray.length - 1].votes = product.votes;
    });
  } else { // If no objects in local storage create objects using original product data
    originalProductData.forEach((product) => {
      if (product === 'sweep') {
        createProduct(product, 'png');
      } else {
        createProduct(product);
      }
    });
  }
}

// ***** EXECUTABLE CODE *****
loadAndRebuildProductData();
renderThreeRandomImages();
imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);

