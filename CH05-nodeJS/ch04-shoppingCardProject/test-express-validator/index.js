const express = require("express");
const { query, validationResult, matchedData } = require("express-validator");

const app = express();
const PORT = 3000;
app.use(express.json());

//route
//chưa áp dụng thư viện vô
// app.get("/hello",
//     (req, res, next) => {
//         if (!req.query.person) {
//             res.status(422).json({
//                 msg: "Missing person query",
//             });
//         } else next();
//     },
//     (req, res) => {
//         res.send("Hello,  Bạn " + req.query.person)
//     })


// Áp dụng thư viện vô
// app.get("/hello", query("person").notEmpty().withMessage("Missing person query"), (req, res) => {
//     const errors = validationResult(req);// Lấy danh sách lỗi đã cất trong request
//     if (errors.isEmpty()) {
//         res.send("Hello,  Bạn " + req.query.person)
//     } else {
//         res.status(422).json({
//             msg: "Missing value",
//             errors
//         })
//     }
// })

/***
 * Nhưng vẫn còn bug vì hacker vẫn có thể chèn một thứ gì đó vô để phá chứ không phải là nội dung đàng quàn(tấn công xss). */

/** 
 * Fix lỗi trên dùng thì dùng escape()
 * escape() có chức năng là để thay đổi các ký tự đăt biệt(<>) và biến dạng nó để nó không bị biến thành các ký tự bình thường không có chức năng gì đặt biệt*/

// => Hành động này gọi là hành đông dọn rác

//Cách test:  thay john thành một tag` <h>John<h>` trước và sau thêm excapse thì sẽ hiểu

// app.get("/hello", query("person").notEmpty().withMessage("Missing person query").escape(), (req, res) => {
//     const errors = validationResult(req);// Lấy danh sách lỗi đã cất trong request
//     if (errors.isEmpty()) {
//         // Nhưng đây lại có một bug do thói quen cứ tưởng xử lý và xác minh xong thì an toàn nên ném thắng nội dung(res.query) vô database
//         // Nhưng chính vì sự lười biếng đó mà hacker lại tận dụng add thêm các nội dung khác
//         // VD: monney = 100000, role = admin .....
//         res.send("Hello,  Bạn " + req.query.person)
//     } else {
//         res.status(422).json({
//             msg: "Missing value",
//             errors
//         })
//     }
// })

// Fix lỗ hổng ở trên dùng matchedData(): chỉ những thông tin đã xác minh thì mới được add vô database
// Lúc này thì mới được coi là an toàn
app.get("/hello", query("person").notEmpty().withMessage("Missing person query").escape(), (req, res) => {
    const errors = validationResult(req);// Lấy danh sách lỗi đã cất trong request
    if (errors.isEmpty()) {
        // khi dùng matched thì những dữ liệu nào đã valid thì mới lấy.
        // dùng này test thử là hiểu liền http://localhost:3000/hello?person=john&role=admin
        console.log(req.query);
        const validData = matchedData(req);
        console.log(validData);

        //lấy validdata lưu vào database lúc này mới án toàn
        res.send("Hello,  Bạn " + req.query.person)
    } else {
        res.status(422).json({
            msg: "Missing value",
            errors
        })
    }
})
//
app.listen(PORT, () => {
    console.log("Server test validator đang mở ở Port: " + PORT);
})