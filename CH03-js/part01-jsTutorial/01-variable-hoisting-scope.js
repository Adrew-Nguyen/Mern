//01-variable-hoisting-scope.js
// "use strict";

// js là ngôn ngữ hướng thủ tục và hướng kịch bản và lập trình hàm
// js chỉ có 1 access modifier là public
// comment
/* comment */

// cách để print
console.log("Bài 1: variable - hoisting - scope");
// js có khả năng thao tác cả database back và font được dùng để chơi với user
// vì thế nó không thể ràng buộc đầu vào
// cái giá phải trả là ở khâu xử lí

// java ngta sẽ dùng để thao tác database vì thế nó phải biết kiểu dữ liệu của cell đó

// biến có thể lưu cả mảng class hàm

// cách khai báo biến: 3 cách

// cách 1: dùng var
// nó xuất hiện từ phiên bản ES đầu tiên
// kiểu dữ liệu sẽ theo dữ liệu nó đang lưu trữ
// dùng var để tạo thì ở đâu cx biết (global scope luôn)
// ES: ECMAScript
// phiên bản thứ 6 được xem là phiên bản thay đổi nhiều nhất đại trùng tu

var name1 = "Nguyễn Nhật Trường";
name1 = "Trường"; // re-asigning: gán lại giá trị
// có kiểu dữ liệu là any có thể chứa bất kì kiểu dữ liệu nào
// tùy vào việc cung cấp cái gì thì nó sẽ dịnh dạng lại kiểu dữ liêu sau

// nếu khai báo và không khai báo giá trị
var num;
console.log(num); //undefined
age = 10; // hosting
console.log(age); // 10
console.log(typeof age); // number

// class: uppercamellcase
// biến bình thường: cammellcase
// database: underscrore

// Quy tắc đăt tên biến
// 1. Không bắt đầu bằng số.
// 2. Nguyên tắc : cammelCase, underscrore, PascalCase(upperCammelCase)
// 3. Được phép dùng _(private) và $(protected) ở đầu tên

// Hosting với var(Hoisting: móc ngược lên)
// Hosting là tính năng không phải bug
// chỉ có dùng var mới sản sinh ra hosting
// hosting xẩy ra khi in một biến đc tạo bằng var và nằm ở dưới
// thì nó sẽ sẽ lôi dòng code khai báo lên trên lệnh in

// trong js có 2 chế độ code:
// Nghiêm khắc:
// cẩu thả

// demo 1

console.log(age); // undefined
var age = 10;
console.log(age); // 10

// Bản chất:
// var age;
// console.log(age);
// age = 10;
// console.log(age);

// demo 2

// message = "Thông báo";
// console.log(message);
// trường hợp này tùy theo chế độ mà đang code
// nếu đang ở chế độ normal thì nó sẽ hoạt động như sau:
// var message;
// message = "Thông báo";
// console.log(message);
// nếu ở chế độ thì nghiêm khắc thì nó sai

// lập trình viên không thích cơ chế hoisting mà hoisting chỉ xuất hiện khi dùng var
// vì thế muốn tránh cơ chế này thì dùng let

// (ES6 2015) xuất hiện let và const
// ES6 thì đầu tiên xuất hiện class

// let và const thì giống var nhưng mà không hoisting

// console.log(age1); // undefined
// let age1 = 10;
// console.log(age1); // 10

// sẽ lỗi về age1 không tạo bằng var nên hông có tính năng hosting

// const: hằng số;
// dùng chế nào độ nào thì cũng sai nếu thay đổi giá trị
const num1 = 10;
// đưa giá trị nào thì dùng nó làm kiểu dữ liệu lun => không thay đổi đc

// const với object
const profile = {
  name: "Toàn",
  height: 160,
};
profile.name = "Toàn cao";
console.log(profile.name); // Toàn cao

//Giải thích
// object được lưu nằm trong head.
// {
//     name: "Toàn",
//     height: 160,
// };

// profied thì sẽ nằm trong stack.
// profied sẽ lưu địa chỉ của object nằm trong head
// nên const ở đây không thay đổi là địa chỉ lưu object

// Nếu chúng ta tạo thêm một profile mới như sau
// profile = {
//     name: "Toàn Cao ",
//     height: 160,
// };
//  như vậy sẽ sai vì nó đang tạo một đối tượng mới và ném ra một địa chỉ mới

// const với array
// y chang với trw hợp const với object
const array1 = [1, 2, 3, 4, 5];
array1.push(6);
//  vẫn chạy bth
// như sau thì sai
// array1 = [1, 2, 3, 4, 5, 6];
//  vì này sẽ tạo ra 1 mảng mới và yêu cầu hằng array1 lưu địa chỉ mảng mới này

// scope: trong js có 3 loại scope
// Global Scope: toàn cục
// khai báo một nơi và có thể  sử dụng ở bất cứ đâu

// Function scope: trong hàm
// những gì đc tao trong hàm thì ngoài hông nhìn thấy đc

// Block scope(local scope) : cục bộ
// phạm vi truy cập cũng như hàm scope

if (true) {
  var son = "Toàn";
}
console.log(son); // Toàn


// let | const không hoisting  | var có hoisting(use strict)
// là  blockscope              | và là global

