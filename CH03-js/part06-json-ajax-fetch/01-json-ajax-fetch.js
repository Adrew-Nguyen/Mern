//01-json-ajax-fetch.js
//* 1. JSON
/**
 * Json: Javascript object notation.
 * Json: một chuỗi được viết dưới dạng JS object.
 * Công dụng: dùng để lưu trữ và trao đổi dữ liệu giữa các ngôn ngữ khác.
 * Có thể lưu trữ dữ liệu các dạng: number, String, Boolean, array, object, null.
 * Có hai thao tác chính: `Json.parse` và `Json.stringify`.
 * Không lưu trữ function của object.
 * */
//**Lưu ý: Server chỉ lưu chuỗi thôi.

//Demo JSON
const obj1 = {
    name: "Điệp đẹp trai",
    age: 22,
    status: "Hay dận dỗi",
    study() {
        console.log("Hello");
    }
}

let myJson = JSON.stringify(obj1);
console.log(obj1);
console.log(myJson);
//'{"name":"Điệp đẹp trai","age":22,"status":"Hay dận dỗi"}'
// Hình ảnh thật sự thì nó được bọc trong dấu ''.

//Cú pháp JSON
//Với object thì data là một cặp key: value (prop).
//Data được ngăn cách bởi dấu `,`.
//Object được bao bọc bởi dấu{}.
//Array được bao bọc bởi [].
//String được bao bọc bới "".
//Key phải là string và được bao bọc bởi "".
//Value phải thuộc các dạng: number, string, boolean, array, object, null.
//*Không lưu trữ được function và method.

//Đoán đáp án
let arr = ["cam", 22, 'chuối', "ổi"];
console.log(JSON.stringify(arr));
//'["cam", 22, "chuối", "ổi"]'
let a = 1;
console.log(JSON.stringify(a)); // 1 nhưng thật chất là '1'
let str = "ahihi";
console.log(JSON.stringify(str));//"ahihi" và thức thể nó '"ahihi"'
let bool = true;
console.log(JSON.stringify(bool)); // true nhưng thật chất là 'true'


/**AJAX: Asynchronous Javascript and XML
 * Tất cả mọi thứ học từ đầu khóa đến giờ đều được gọi là AJAX.
 * AJAX: không phải là `ngôn ngữ lập trình`.
 * AJAX là kết hợp của nhiều công nghệ: 
 *  + HTML: hiển thị dữ liệu và giao tiếp người dùng.
 *  + CSS: trang trí cho giao diện.
 *  + JS: xử lý logic.
 *  + XML: định dạng dữ liệu cần lưu trữ.
 *  + JSON: định dạng dữ liệu cần lưu trữ.
 *  + JS và DOM.  
 * AJAX: 
 *  + Giúp chúng ta đọc dữ liệu từ server trả về.
 *  + Giúp gữi dữ liệu lên server ở chế độ ngầm.
 *    => Cập nhật trang wed mà không cần reset trang.
 * AJAX: nền tàng phát triển của React, Angular, Vue.      
*/

//* Các cách để giao tiếp với 1 server side:
// Cách 1: XMLHttpRequest(XHR): 
//  + Giao thức giúp tương tác với server rất xa.
//  + Là một phương pháp giao tiếp giữa các server.
//  + Đây là phương pháp giao tiếp cổ xưa nhất.

// Cách 2: FetchAPI
//  + Tích hợp sẳn trên trình duyệt wed. Sài trên wedApis.
//  + Cung cấp khả năng gữi request
//      và nhận response thông qua trình duyệt.
// Fetch: đơn thuần cũng là một hàm trả ra Promise.
// Fetch: dùng công nghệ Promise.

// Request: Đòi server hứa làm gì đó.
// Server: bản thân là một người chuyên đi hứa.

/**
 * Trong hệ thông backend của mockAPI
 * thì endpoint được quy định là resource
 *                               collection
 *                               table
*/
// Schema: định nghĩa object(từ Json.parse ra) gồm những thuộc tính nào.
// Schema là một interface.

//baseURL:
const baseURL = "https://66fb75a68583ac93b40bd367.mockapi.io";

//Tạo ra 1 request yêu cầu sever hứa rằng sẽ trả dữ liệu về cho mình
//bằng cách `Fetch`
//Syntax: fetch(url, {....} : bộ miêu tả request);
//request: method, header, body, queryString, paramString.


//Thực chiến
//1. Lấy hết danh sách trên server về xem
// method: GET là method mặc định => không cần định nghĩa
// fetch(`${baseURL}/users`).then((response) => {
//     //mỗi một công nghệ hay một server đều có 1 reponse khác nhau
//     //server trả về response nếu oke thì khui còn không thì chữi.
//     if(response.ok){
//         //khui kiện hàng
//         return response.json();
//     }else{
//         throw new Error(response.statusText);
//     }
// }).then((data) => {
//     console.log(data);    
// }).catch((error) => {
//     console.log(error);   
// });

//2. Demo post một user mới vào table users của server.
fetch(`${baseURL}/users`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "Nguyễn Nhật Trường" }),
})
    .then((response) => {
        //mỗi một công nghệ hay một server đều có 1 reponse khác nhau
        //server trả về response nếu oke thì khui còn không thì chữi.
        if (response.ok) {
            //khui kiện hàng
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    }).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });


