//03- loop
console.log("Bài 3: Loop - vòng lặp");

// Reuse: dùng lại                       -Repeat: lặp lại

// Reuse là dùng lại một cái gì đó.
// Thời gian dùng lại không cố đinh.
// Đại điện là function.

// Repeat: Lặp lại một cái gì đó.
// Thời gian lặp lại là cố đinh.
// Đại diện là loop.

//for | do-while | while

//Plain object: object phẳng
//Không có chiều sâu( không kế thừa) chỉ có vài method đơn giản và không có constructor luôn
let student1 = { name: "Điệp", point: 10, major: "SE" };
//               property | entry
//                  key: value

let array1 = [12, 17, 19];
// array => object => con trỏ

// Array1{
//     0: 12
//     1: 17
//     2: 19
// }

// array thì vẫn có key: value nhưng thay vị gọi là key
// thì người ta thường gọi là index

console.log(student1.name); // Điệp
console.log(student1["name"]); //Điệp // truy cập vào bằng key
console.log(array1["1"]); // 17 truy cập bằng key

//FOR

//Bàn về các vòng for
// Vòng for cơ bản
// Duyêt từ start đến end theo nhu cầu khai báo
// Giúp kiểm soát được loop chạy từ đâu đến đâu
// Phụ hợp cho mảng biết trước kích thước

//Vòng for cải tiến:
//duyệt từ đầu đến cuối không kiểm soát đc số lần lặp
//Không vận hành bằng index

//for-in: duyêt các key của object
//Ứng dụng: lấy ra danh sách các thuộc tính của một object

for (const key in student1) {
  console.log(key);
}
//name
//point
//major

// truy cập vào value thì
for (const key in student1) {
  console.log(student1[key]);
}

// Bất lợi:
// for-in với set không được gì cả, vì set không có key => không duyệt được

// Set là một tập hợp loại trùng
// khi loại trùng thì các phần tử không nằm vị trí index(key) ban đầu
// nên key lúc này vô dụng => set bỏ key lun => set không có key
// set không cho lấy phần tư thông qua index
let demoSet = new Set(["Điệp", "Huệ", "Lan", "Huệ"]);
console.log(demoSet);

for (const key in demoSet) {
  console.log(key);
}
// không chạy đc thì trong set không có key

//Đa phần các object đều có tính khả duyệt(iterable) có chiều sâu và có khả năng tự duyệt
//nhưng thường các object mà mình tự tạo ra nó không có chiều sâu

//for-of | for-each không duyệt bằng index và key, và duyệt bằng iterable => Không chơi với plain object

//for-of dùng để duyệt value nhưng không qua từng key hay index mà dùng iterable => chê plain object

// for (const val of student1) {
//   console.log(val); //Error: student1 is not iterable
// }

for (const val of array1) {
  console.log(val);
}
// set vẫn chạy đc bình thường vì nó vẫn còn value và có bô duyệt iterator.



// hiện tượng callback
//for-each(method(function) của object có iterable): duyệt chính là value và có thể di kèm key và dùng cơ chế iterable
// là giao thoa giữa for-in và for-of

//for-each là môt hàm và không nhận vào một số hay gì đó đó mà trong JS cho nhập một hàm vào nên => for-each nhận vào môt hàm khác
// xử lí các lần lặp bằng callback
array1.forEach((val, key) => {
  console.log(val, key);
});

//callbackFunction: một cái hàm được gọi lại
//Diễn giải quá trình xử lý của for-each

//for-each được gọi là callback
//hàm nhận vào được gọi là callbackfunction

//HOF: callback | currying | lexcial scoping

demoSet.forEach((val, key) => {
  console.log(val, key);
});

// Set không có key thì nó lấy value nó làm key luôn


/*
    For-in duyệt key(chơi được với mọi object những phải để ý đến SET và không có bug nếu chơi vs set nhưng sẽ không chạy được gì)
    For-of: duyệt value bằng iterable(chê plain Object - đây là lỗi luôn)
    For-each: duyệt value là chính và key là đi kèm và  bằng iterable (chê Plain Object - lỗi)
*/