const express = require('express');
var cors = require('cors');
const rateLimit = require('express-rate-limit'); // Import express-rate-limit

const connection = require('./db');
const app = express();
const port = 3000;

// CORS options to allow requests from the frontend
var corsOptions = {
    origin: 'https://fe-ecom-sand.vercel.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Create a rate limiter with express-rate-limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to the /product route
app.use('/product', limiter);

app.get('/product', cors(corsOptions), (req, res) => {
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

app.use(cors());

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
