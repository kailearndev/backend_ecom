const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connection = require('./db');

const app = express();
const port = 3000;

// CORS options to allow requests from the frontend
const corsOptions = {
    origin: ['https://fe-ecom-sand.vercel.app/'], // Replace with your frontend domain
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS globally
app.use(cors(corsOptions));

// Middleware for parsing JSON requests
app.use(express.json());

// Create a rate limiter for product route (limit 100 requests per 15 minutes)
const productRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});

// Apply rate limiter to /product route
app.use('/product', productRateLimiter);

// Route to fetch all products
app.get('/product', (req, res) => {
    const query = 'SELECT * FROM product';  // Change to your actual table name
    connection.query(query, (err, result) => {
        if (err) {
            console.error("Error connecting or querying database: ", err.message);
            return res.status(500).send('Error querying the database');
        }

        res.json({
            data: result
        });
    });
});

// Webhook to receive QR scan data
app.post('/webhook', (req, res) => {
    const data = req.body; // Data from webhook (QR scan)

    console.log('Received QR data:', data);

    res.status(200).send({ message: 'Webhook received successfully!' });
});

// Start the server
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
