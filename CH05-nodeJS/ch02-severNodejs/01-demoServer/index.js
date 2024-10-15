// index giống main 
// nhưng mình sẽ dùng expressJS để dụng server
// thay cho http

//tạo sever với express.
const express = require("express");
const app = express();
const PORT = 4000;

app.listen(PORT, (rep, res) => {
    console.log("App express đang chạy trên port: " + PORT);
});

//route
// "/": localhost
app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/user", (req, res) => {
    res.send("User Lê Điệp đẹp trai");
});