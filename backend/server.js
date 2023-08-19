const express = require('express'); // Express.js framework
const morgan = require('morgan'); // HTTP request logger middleware
const cors = require('cors'); // Cross-Origin Resource Sharing middleware
const connection= require('./db')
const userRoutes = require('./routes/user'); // Import user routes
// Load environment variables from .env file
require('dotenv').config();

// Create an Express app instance
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded requests
app.use(morgan("dev")); // Log HTTP requests in the "dev" format
app.use('/user', userRoutes); // Use user routes at the '/user' path
// Define the port number for the server to listen on
const port = process.env.PORT ;
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database.');
  });
// Start the server and listen on the defined port
app.listen(port, function () {
  console.log('Server is listening on port', port);
});