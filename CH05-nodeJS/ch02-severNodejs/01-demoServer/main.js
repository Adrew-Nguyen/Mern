// Trong nodejs có http là 1 module(object) chứa các method giúp mình tạo và thao tác với server
// http là một hằng giúp mình liên kết với server
// module hiện tại: CommonJs

const http = require("http");
const PORT = 4000;

//dùng http tạo server
//server là hằng nhận respone và trả ra request nền mình truyền 
//vào callback để xử lý 2 res này.

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(`{"msg": "Ahihi json nè"}`);
});

//server mở port 4000
server.listen(PORT, () => {
    console.log("Sever đang chạy trên port: " + PORT);
});

