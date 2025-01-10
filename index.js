const express = require('express');
var cors = require('cors')

const connection = require('./db');
const app = express();
const port = 3000;


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/product', cors(corsOptions), (req, res) => {
    const query = 'select * from product';  // Thay "product" thành "products" nếu bảng của bạn tên là "products"
    connection.query(query, (err, result) => {
        if (err) {
            console.error("Lỗi khi kết nối hoặc truy vấn cơ sở dữ liệu: ", err.message);
            return res.status(500).send('Lỗi khi truy vấn cơ sở dữ liệu');
        }

        res.json(
            {
                data: result
            });  // Trả về kết quả truy vấn dưới dạng JSON
    });


});
app.use(cors())

app.listen(port, () => {
    console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
