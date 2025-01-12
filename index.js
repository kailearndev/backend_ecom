const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connection = require('./db');
const app = express();
const port = 3000;

// CORS options to allow requests from the frontend
const corsOptions = {
    origin: ['https://fe-ecom-sand.vercel.app'], // Replace with your frontend domain
    methods: ['GET', 'POST', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers like Authorization
    optionsSuccessStatus: 200
};

// Apply CORS globally before defining routes
app.use(cors(corsOptions));

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Route to fetch all products
app.get('/product', (req, res) => {
    const query = 'SELECT * FROM product';  // Change to your actual table name
    connection.query(query, (err, result) => {
        if (err) {
            console.error("Error connecting or querying database: ", err.message);
            return res.status(500).send('Error querying the database');
        }

        res.json({ data: result });
    });
});

// Webhook to receive QR scan data
app.post('/webhook', (req, res) => {
    const data = req.body; // Data from webhook (QR scan)
    console.log('Received QR data:', data);
    res.status(200).send({ message: 'Webhook received successfully!' });
});

// Handle preflight requests
app.options('*', cors(corsOptions));  // Allow preflight requests for all routes

// Start the server
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
