const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const connection = require('./db');
const app = express();
const port = 3000;

// CORS options to allow requests from the frontend
var corsOptions = {
    origin: ['*'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Create a rate limiter with express-rate-limit


// Apply rate limiting to the /product route

app.use(bodyParser.json());

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
app.post('/webhook', cors(corsOptions), (req, res) => {
    const data = req.body; // Dữ liệu từ webhook (từ QR scan)


    console.log('Received QR data:', data);


    res.status(200).send({ message: 'Webhook received successfully!' });
});

app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
