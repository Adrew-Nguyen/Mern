// 02-datatype-passByValue-passByReferences
console.log("Bài 2: Kiểu dữ liệu - truyền tham trị - truyền tham chiếu");

// có hai nhóm kiểu dữ liệu chính
// I-1. primitive datatype: kiểu nguyên thủy
/*
// khả năng xử lí toán học của JS kém nên gọi chung là số
   - number:  1, 12, 13.6
   - string: một hay nhiều ký tự cũng là string
   - boolean: true(1) | false(0)   -0 => false  -1 => true
   tất cả các số là true trừ 0 và -0
   - null: là giá trị rỗng biết kiểu dữ liệu
   trong js không có null một cách tự nhiên
   trừ khi cung cấp một object mà không đưa thì hiểu giá trị là null
   => null là giá trị của một object
   - undefined: giá trị rỗng - không biết kiểu dữ liệu
   - symbol(ES6): tạo ra một chuỗi một cách ngẫu nhiên
*/

/*
    Null và undefined khác nhau như nào
*/
console.log(typeof null); // object,
// vì sao xếp null vào primative mà không object
// vì prototype chain của js thì coi null là đầu là sản sinh ra vạn vật là không có gì để tách nhỏ
// primative datatype là ngôn ngữ không thể chia nhỏ đc nữa
// mặc dụ tiệm cận với object

console.log(typeof undefined); // undefined
//  khi nào có undefined là khi tạo một biến mà không biết kiểu dữ liệu

// null và undefined có bằng nhau không

console.log(null == undefined); // true vì có giá trị rỗng
console.log(null === undefined); // false

// ==: so sánh giá trị(ép kiểu và unboxing nếu cần trong wrapper class)
// ===: so sánh giá trị và kiểu

console.log(2 == "2"); // true
console.log(2 === "2"); // fasle

// undefined trong parameter của function
// trong js không quan tâm kiểu dữ liệu đầu vào và đầu ra
//function mà không return thì nghĩa là return undefined

function handle1(a, b) {
  return b;
}

let c = handle1(5);
console.log(c); // undefined
// 5 sẽ truyền cho a và b không ai chuyền nên undefined
// c giữ undefined


// undefined trong thuộc tính của object
// bản chất của object là hosting cục bộ, bản chất là tạo một biến có dữ liệu var trong thuộc tính
let tan = {
  name: "Bá Tân",
  height: 165,
  //nguoiYeu: , var
  //money: , var

};
console.log(tan.nguoiYeu); //undefined // cơ chế hosting
tan.money = 1000;
console.log(tan.money); // 1000 hosting

// bất lợi

/*
register
{
    email: "ahihidocho@gmail.com"
    password: 123123abc
    confirm_password: 123123abx
    vì hosting nên nó có thể chèn thêm
    token: 123 // dung để xác nhận tài khoản
}
*/

// NULL: là biết kiểu dữ liệu những không biết giá trị
// rỗng thì có null và undefined

let str = ""; // gọi là chuỗi rỗng không đc gọi là rỗng
// vẫn thừa hưởng những method và sài bth

str = null; // gọi là rỗng thuộc về dạng object không phải về chuỗi
// và lúc này sẽ không thừa hưỡng bất kì method nào



// null và undefined thì sẽ không có thuộc tính
// trong mặt  lưu trữ ta không nên lưu null
// tránh việc xử lý vào NULL làm crash app

//I-2 : Object datatype: khác primative

// Plain Object: object phẳng
// chỉ là object (không có cha nào hết không có kế thừa hay gì hết , ....)
let student = { name: "Tùng", point: 10 };
//            property|entry
//            key: value

console.log(student.name);
console.log(student["name"]);

// array là cấp khai báo nhiều biến cùng tên, cùng lúc và không cần cùng kiểu dữ liệu

// array là object mà object là con trỏ
// prototype chain

let flowerList = ["Huệ", "Cúc", "Lan"];

/*
flowerList = {
    0: "Huệ",
    1: "Cúc",
    2: "Lan"
}

*/

console.log(flowerList);

// regulax expression: regax là gì? là string, mà string là object immutable => regax là object
let regax1 = /SE\d{9}/;
console.log(typeof regax1); // object

console.log(typeof handle1); // function là object
console.log(handle1.prototype); //Object

// function có typeof là function, gốc gác sâu hơn là object, cao hơn nữa là null

console.log(10 / "d");
// NaN: Not a number
// là 1 trạng thái của number
console.log(typeof NaN); // number -> object -> null
console.log(typeof Number); // Object


console.log(NaN === Number); //false
// một hằng là trạng thái và một hằng là number nên không bằng nhau
// NULL == NULL fasle
// NaN == NaN false
// NaN == Number fasle




// tất cả các cách khai báo primative đều có thể khai báo bằng constructor
// Wrapper Class
let str1 = "Ahihi";
str1 = new String("Ahihi1");
// str1 chỉ chỏ tới địa chỉ thui cái địa chỉ này mới chỏ tới vùng nhớ luu ahihi1
console.log(str1);
console.log(str1 == "Ahihi1"); // true // autoboxing
console.log(str1 === "Ahihi1"); // false so sánh 2 địa chỉ
console.log(str1.valueOf() === "Ahihi1"); // true

// dùng wrapper class để ép kiểu
let year = String(1999);
console.log(year);// 1999 datatype: String

// bàn riêng về boolean
console.log(Boolean(1999)); // true
console.log(Boolean(0)); //fasle
console.log(Boolean("0")); //true // ký tự 0 là số 48 trong mã ASCii -> true
console.log(Boolean("")); // false /0 => 0
console.log(Boolean(" ")); // true ký tự " " là số 32 trong mã ASCii
console.log(Boolean(null)); //fasle null địa diện cho 0
console.log(Boolean({})); //true object không có thuộc tính vì vẫn là một vùng nhớ vẫn là con trỏ => vẫn là con số
console.log(Boolean([])); // true mảng là object là con trỏ là số nên true
console.log(Boolean(10 / "d")); // một số không thể chia cho một ký tự nên sẽ ra trạng thái NaN => flase
console.log(Boolean(false)); // false

// Falsy:  đối với JS những gì không chứa giá trị là fasle
// null, undefined, 0, -0, false, NaN.
// Truthy: ngược lại vs Falsy
// chuỗi khác rỗng, số khác 0 và -0, object đều là true.

// passByValue: truyền tham trị
let a = 1;
let b = a;
b += 2;
console.log(a); // 1
console.log(b); // 3

//vd 2:
let point = 4;
// hàm sửa điểm
function updatePoint(currentPoint) {
  currentPoint = 10;
}

updatePoint(point);
console.log(point);

// pass by references: truyền tham chiếu

let boyFriend1 = { name: "hotGirl", size: "B cub" };
let boyFriend2 = boyFriend1;
boyFriend2.size = "H cub";

// OPERATOR Toán tử
//trong js có 10 loại toán tử
/*
1  Assignment            gán = 
2  Comparison            so sánh ==  ===
3  Arithmetic            toán hạng
4  bitwase               bitwase
5  logical               logic && ||
6  String                chuỗi
7  Conditional(ternary)  ba ngôi
8  Comma                 phẩy
9  Unary                 một ngôi
10 Relational            Quan hệ
*/

// Arithmetic Operator toán tử toán hạng
//  + | - | * | ** | / | % | variable++ | variable-- | ++variable | --variable |
//  không được n++ ++n --n n-- với n là số bất kỳ

// Assignment Operator toán tử gán
//  = | += | -= | *= | **= | /= | %= |


// Comparison Operator toán tử so sánh
//  == bằng giá trị là được (không quan tâm kiểu)

console.log(2 == "2"); // true // so sánh về giá trị tự ép kiểu
console.log(2 !== "2"); // có khác về giá trị và khác về kiểu không ? //true
// 2 và '2' có giá trị bằng nhau nhưng kiểu nó khác nhau nên kết quả là true
console.log(2 !== 2); // false giống nhau vể cả giá trị và kiểu dữ liệu
console.log(2 != "2"); // false;

let diep = "đẹp trai";
let isDepTrai = diep == "đẹp trai";
console.log(isDepTrai); // true

let diep1 = "đẹp trai";
let isDepTrai1 = diep1 === "đẹp trai";// so sánh địa chỉ và có địa chỉ bằng nhau vì cơ chế boud
console.log(isDepTrai); // true cơ chế boud

console.log("b" + "a" + +"a" + "a"); //baNaNa

//logical
// && và ||  và đấu !
// & và |
// || tìm true
// && tìm false
console.log(0 && 1); // 0
console.log(0 || 1 || 4); // 1
console.log(0); // 0
console.log(!0); // true
// đặt trưng đấu ! ép kiểu về true false
console.log(""); // in ra rõng 
console.log(!""); // true // '!' ép về true và false và "" có giá trị /0 = 0 mà 0 là false
console.log(!"" && 0 && 1); // 0  
// !"" đứa ra true và chạy qua kia thì 0 trong && khi gặp 0 hoặc sẽ đưa ra kết luận.
