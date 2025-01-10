const mysql = require('mysql2')
require('dotenv').config(); // Đọc file .env

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

connection.connect(err => {
    if (err) {
        console.error('Không thể kết nối tới MySQL: ', err.message);
        throw err;
    }
    console.log('Kết nối MySQL thành công!');
});


module.exports = connection;