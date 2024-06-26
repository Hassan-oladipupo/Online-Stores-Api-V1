// Import the express package which is a web application framework for Node.js.
const express = require('express');

// Import the dotenv package to load environment variables from a .env file into process.env.
const dotEnv = require('dotenv');

// Import swagger-ui-express for serving the Swagger API documentation.
const swaggerUi = require('swagger-ui-express');
// Import yamljs to load YAML files.
const YAML = require('yamljs');
// Load the Swagger document from the specified YAML file.
const swaggerDocument = YAML.load('./swagger.yaml');

// Import a custom database connection module.
const dbConnection = require('./database/connection');

// Call the config method from the dotenv package to read the .env file and set environment variables.
dotEnv.config();

// Import the cors package to enable CORS (Cross-Origin Resource Sharing).
const cors = require("cors");

// Create an instance of an Express application.
const app = express();

// API Documentation
// If the application is not running in production, serve the Swagger API documentation.
if (process.env.NODE_ENV != 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Enable CORS for all routes.
app.use(cors());

// Establish database connectivity.
dbConnection();

// Middleware to parse JSON payloads in incoming requests.
app.use(express.json());
// Middleware to parse URL-encoded payloads in incoming requests.
app.use(express.urlencoded({ extended: true }));

// Use product routes for any requests to /api/v1/product.
app.use('/api/v1/product', require('./routes/productRoutes'));
// Use user routes for any requests to /api/v1/user.
app.use('/api/v1/user', require('./routes/userRoutes'));

// Define a route handler for the root URL ("/").
app.get('/', (req, res, next) => {
  // Send a response with the text 'Welcome to Node API Server'.
  res.send('Welcome to Node API Server');
});

// Set the port number to listen on. It uses the value from the environment variable PORT if available, otherwise defaults to 3000.
const PORT = process.env.PORT || 3000;

// Start the Express server and listen on the specified port. Log a message to the console once the server is up and running.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Define an error-handling middleware to catch and handle errors.
app.use(function (err, req, res, next) {
  // Log the error stack to the console.
  console.error(err.stack);
  // Send a 500 status response with the error message and an empty body.
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {}
  });
});
