// 04-function-number-method
"use strict";
console.log("Bài 4: Hàm và các method của Number");

// Hàm trong JS được chia thành hai loại chính:
// Function declaration FD || Function Expression FE

// 1. Function declaration FD (khai báo hàm)
// Cách khai báo hàm rất phổ biến ở rất nhiều ngôn ngữ.

// Đối với cách khai báo hàm FD thì rất flex trong việc call.
// => Call ở trước dòng lệnh khai báo hay dưới đều được.


handle1(); // Tôi là hàm được tạo từ Function declaration
function handle1() {
  console.log("Tôi là hàm được tạo từ Function declaration");
}
handle1(); // Tôi là hàm được tạo từ Function declaration


//2. Function Expression FE(Biểu thức hàm):

// Cơ chế khai bào này không cho hoisting.
// - Dùng let thì error: Cannot access 'handle2' before initialization.
// - Dùng var thì error: lỗi handle2 not funtion.


// handle2(); //Cannot access 'handle2' before initialization
let handle2 = function () {
  console.log("Tôi là hàm được tạo từ Function Expression");
};


//3. IIFE: Immediately invokable function expression.
// Công dụng: hàm vừa tạo ra thì chạy luôn.
// Nhược điểm: Không có tính tái sử dụng.
// IIFE thường sẽ đi trùng với async await.

// DEMO:
// (async function () {
//   let data = await getDataFromSever();
//   showData();
// })();


//nên dùng kèm ; ở đầu function để tự cứu lấy mình
;(function () {
  let a = 10;
  let b = 20;
  console.log(a + b);
})();


// CallBack: gọi lại 
// Hàm nhận 1 hàm làm đối số (argument) trong runtime và parameter trong quá trình buld hàm.
// Cấu trúc: function1(a, function2) gọi là callBack | function2 gọi là callbackFunction.

let handle3 = function () {
  console.log("Ahihi đồ chó");
};

// Những hàm callback đã từng biết:
// 1. for-each().
// 2. setTimeout().
// setTimeout(callbackFunc, timeout);
// đợi 1 khoảng thời gian bằng với timeout
// sau đó call callbackFunc

// Mô phỏng setTimeout():
// setTimeout(handle3, 3000);
// sau 3s thì sẽ chạy handle3

// setTimeout(handle3(), 3000);
// nếu viết vậy thì nó sẽ chạy lun xong rồi ném undefined.
// và sau 3 giây thì thấy undefined và không chạy.

// 4. Anonymous function(Hàm ấn danh)
// Không cần đặt tên cho hàm.
// Nhược điểm: không có tính tái sử dụng.
// Ưu điểm: nhanh và tiện.

setTimeout(function () {
  console.log("Ahihi đồ chó");
}, 3000);


// 5. Arrow funtion(Hàm mũi tên)
// Arrow function là cách viết tắt của FE(function expression)
setTimeout(() => {
    console.log("Ahihi đồ chó");
}, 3000);

/*-----------------------------------------------------------------------------------------------------------*/

// FD|FE|FA có sự khác nhau nhất định về mặt kết quả

// Mode: Strict mode
// Arrow thì rất ghét this thấy this thì nó đá về cửa sổ trình duyệt.
// FD && FE thì nó giam cầm lại đợi người gọi đến nó.

// Mode: Normal
// Đối với FD && FE thì không ai gọi thì window ráng window là cha trong normal.
// Arrow thì rất ghét this thấy this thì nó đá về cửa sổ trình duyệt.



// Ví dụ 1:

// FD
function handle4() {
  console.log(this);
}
// FE
let handle5 = function () {
  console.log(this);
};
// FA
let handle6 = () => {
  console.log(this);
};
//test                   useStrict                NON-useStrict
handle4();              //undefined                 //window
handle5();              //undefined                 //window
handle6();              //window                    //window

// Ví dụ 2:
let preson1 = {
  // prop
  fullName: "Điệp đẹp trai",
  //method: function trong object trong class
  //FA
  getNameByFa: () => {
    console.log(this.fullName); // this lúc này là undefined
  },
  //FE
  getNameByFe: function () {
    console.log(this.fullName); // this lúc này là undefined
  },
  //FD
  getNameByFd() {
    console.log(this.fullName); // this lúc này là undefined
  },
};
//use strict
preson1.getNameByFd(); //Điệp đẹp trai
preson1.getNameByFe(); //Điệp đẹp trai
preson1.getNameByFa(); //undefined


/* Tổng kết
  * Trong JS this là đại diện cho object đang gọi tới nó.
  * Mode: Use strict
  *   FD và FE sẽ giam this(điều này tốt)| nếu có cụ thể object nào gọi thì giá trị
  *       của this sẽ là object đó, còn nếu không ai gọi thì là giá trí của this là undefined.
  * Mode: normal 
  *   Khi không ai gọi thì có nghĩa là window gọi || window là cha của chúng.
  * 
  * **FA luôn sút this ra ngoài global(window) dù ở mode nào.
*/
/*
lời khuyên:
    FD: nên dùng làm method trong object.
    FE: dùng cho function bình thường và cả function có this.
    FA: nên dùng cho các function không có this.
*/


/*-------------------------------------------------------------------------------------------------------------*/ 

/*
Phân biệt parameter(tham số) và argument(đối số)
*/

//Ví dụ:
function handle7(a, b = 10) {
  console.log(a + b);
}
// Demo 1:
handle7(5); // 15
// Ban đầu:
//    a =
//    b = 10
// Lúc sau:
//    a= 5;
//    b = 10;

//Demo 2:
handle7(5, 3); // 8
// 5, 3 được gọi là đối số argument.
// a, b là parameter(tham số).
// b = 10 là deflaut parameter b.
// nếu không truyền đủ thì b có giá trị là 10 còn nếu.
// có truyền thì b sẽ giá trị đc truyền.

//**  Tham số còn lại| Tham số nghỉ | Rest parameter(không phải spread)
let handle8 = function (a, b, ...c) {
  console.log(a);
  console.log(b);
  console.log(c);
};
handle8(2, 5, 7, 9, 10);
//  Output:
//  a = 2
//  b = 5
//  c = [7, 9, 10]


// Ứng dụng
// Viết hàm nhận vào 1 đống giá trị số tính tổng của một đống số đó.
let handle9 = (...numList) => {
  let result = 0;
  numList.forEach((val) => {
    result += val;
  });
  return result;
};

console.log(handle9(5, 6, 8, 3, 9, 10));

// Number và method của number.
// Không ai dùng JS để làm app ngân hàng hết.
// vì số trong JS chỉ có dạng number.
// số nguyên trong JS chỉ có độ chính xác là 15 số.
// đối với số thập phân thị độ chính xác là 17 số.

// trong công thức có phép cộng thì ưu tiên đẩy về chuỗi.
// trong công thức có phép trừ thì ưu tiên đẩy về số.

let a = 999999999999999; //999999999999999
a = 9999999999999999; //1000000000000000

a = 0.2 + 0.1; // 0.300000000000000004
a = (0.2 * 10 + 0.1 * 10) / 10; // 0.3
a = Number(0.2 + 0.1).toFixed(1); //0.3

console.log(2 + 2); // 4
console.log(2 + "2"); // "22"
console.log(2 + "d"); // "2d"

console.log(2 - "d"); // NaN
console.log(2 - "2"); //0

console.log(2 / 0); // infinity
console.log(-2 / 0); // -infinity

a = 0o7;// hệ 8
x = 0xff; // hệ 16
a = 10; // hệ 10

a = String(a); // ép String
a = a + ""; // cách ép về String
a = a.toFixed(0); // cách về chuỗi 
