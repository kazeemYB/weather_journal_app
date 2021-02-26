// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Servers
const PORT = 8000;

// Spin up server
const server = app.listen(PORT, () => {
  console.log('Server is running.');
  console.log(`Running on Localhost: ${PORT}.`)
});


// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData (req, res) {
  console.log('REQ.BODY from Server.js-->', req.body);
  res.send(projectData);
};

// POST route
app.post('/add', addData);

function addData(req, res) {
  projectData['temp'] = req.body.temp;
  projectData['date'] = req.body.date;
  projectData['content'] = req.body.content;
  res.send(projectData);
  console.log('POST ----> ')
}

