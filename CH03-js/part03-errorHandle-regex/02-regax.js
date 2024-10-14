// Regex: regular expression | pattern | biểu thức chính quy
//                              | mẫu định dạng cho các chuỗi
// Hơi giống Like trong SQL
// Regex là một object
// mình dùng method .test() cho JS | thay vì matches() java

// let regex = /name/;
// console.log(regex.test("Điệp is my name")); // true

//i: ignore case
// regex = /name/i;
// console.log(regex.test("Điệp is my Name")); //true

// một vài method xài cũng regax
// console.log(regex.exec("Điệp is my Name"));
//['Name', index: 11, input: 'Điệp is my Name', groups: undefined]
// vị trí bắt được mảng
// console.log("Điệp is my name".match(regex));
//['name', index: 11, input: 'Điệp is my name', groups: undefined]
// console.log("Điệp is my name".search(regex)); //11

// replace

//II- Regex metcharacter symbols: Những kí hiệu khớp
// nên test ở regexr.com

// ^ : bắt đầu chuỗi
// $ : kết thúc chuỗi
// . : một ký tự bất kì(trừ xuống hàng)
// + : {1, }
// ? : {0, 1}
// * : {0, }
// {start, end}: từ start đến end lần
// [] hoặc \ để thoát chuỗi (escape charater)

//III- Regex Character sets và Quantifiers
// character set [...]
// except character set [^...]
// set digit [0-9]
// set alpha [a-z] || [A-Z] || [a-zA-Z]
// gom nhóm () và hoặc |

// IV- Short Hand
// muốn chữ và số \w     not: \W
// muốn số        \d     not: \d
// muốn space     \s     not: \S
// a(?=n) tìm a mà kế bên là n
// a(?!n) tìm a mà kế bên không phải là n

//Ký tự biên \b
//Ký tư biên là gì? và nằm ở đây trong câu
//Ký tự biên nằm giữa cấu trúc
//      Ký tự từ + ký tự biên + không phải ký tự từ
//      không phải ký tự từ + ký tự biên + không phải ký tự từ

//VD
/*
\bword\b
*/

//bootstrap form
//HOF: callback currying closure
//method xử lý mảng
//ERROR

//1.
let arr = [1, 2, 5, 6, 4];
let result = arr.filter((item) => item % 3 == 2);
console.log(result);

//2.
let tmp = arr.map((item) => (item += 2));
console.log(tmp);

//3.
let productList = [
  { id: "P1", desc: "Quần 1", quant: 10, price: "120000" },
  { id: "P2", desc: "Quần 2", quant: 4, price: "150000" },
  { id: "P3", desc: "Quần 3", quant: 12, price: "220000" },
];
//Muốn biết tất cả các sản phẩm đều có giá tiền  > 10000 ?
console.log(productList.every((item) => item.price > 10000));

//4. Biến productList thành mảng chứa các chuổi có dạng
// 'ma ne p1 co ten Quan 1 số lượng 10 giá 12000

productList = productList.map(
  (item) =>
    `ma ne ${item.id} có tên ${item.desc} số lượng ${item.quant} giá ${item.price}`
);

console.log(productList);

//5. biến đổi mảng này thành chuỗi rất dài tạo thành từ các chuỗi có dạng 'ma ne p1 co ten Quan 1 số lượng 10 giá 12000` nối lại với nhau
let str = productList.reduce((total, item) => total + item + " ", "");
console.log(str);
