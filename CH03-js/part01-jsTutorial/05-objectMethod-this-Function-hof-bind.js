"use strict";
console.log("05-objectMethod-this-Function-hof-bind");

// 1.Object: Đối tượng
//   tất cả những gì sờ được đếm được thì xem là đối tượng.
//   các đối tượng (object) có thể được miêu tả bằng thuộc tính(prop).
//   các đối tượng còn có hành động đặt trưng method(phương thức).
//   hàm ở ngoài được gọi là function còn trong object thì được gọi là method.

//Các plain object thiếu iterator nên không có tính khả duyệt(iterable)
let promotionBoy = {
  //propertise
  nickName: "Lê Mười Điệp",
  //method: function
  //FD
  sayHi() {
    console.log("Ahihi quẹo lựa quẹo lựa");
  },
  //FE
  sayHi1: function () {
    console.log("Ahihi quẹo lựa quẹo lựa");
  },
  //FA
  sayHi2: () => {
    console.log("Ahihi quẹo lựa quẹo lựa");
  },
};

// Bởi vì cả ba method trên đều không có dùng this nên không có sự khác biệt.
// và trên thực tế FD và FE cũng không khác nhau về mặt lí thuyết(kế thừa nhưng quá nhỏ nên không ảnh hưởng nhiều).
// và khi tạo method thì người ta thường dụng FD.
// nếu phải viết function thì nên chọn FE || FA(chỉ dùng nếu không có this).

// ta có thể tạo thêm prop hay method sau khi đã tạo object.
// dựa vào hoisting mình hoàn toàn có thể thêm prop và prop chứa function(method)
// vào một object đã được tạo trước đó.
promotionBoy.money = 2000;
promotionBoy.chuiKhach = function () {
  console.log("Under the hood không được thì cook");
};


// Nâng cao 1 tý
// this trong method là gì ? // lúc chưa ai gọi thì là undefined.
// object > method > this.

let promotionBoy2 = {
  //prop
  nickName: "Lê Mười Điệp",
  //method
  //FD
  showName() {
    console.log("Nickname nè: " + this.nickName);
  },
  //FE
  showName1: function () {
    console.log("Nickname nè: " + this.nickName);
  },
  //FA
  showName2: () => {
    console.log("Nickname nè: " + this.nickName);
  },
};

// this là ám chỉ object đã gọi tới nó.
// this chỉ có giá trị khi runtime | khi mà hàm được gọi thì this mới có giá trị.
// this được xác định bằng object đang gọi method chứa nó.

//this là promotionBoy2
promotionBoy2.showName(); // "Lê Mười Điệp"
promotionBoy2.showName1(); // "Lê Mười Điệp"

//this là window
promotionBoy2.showName2(); // window.nickname => undefined
//Khi viết method thì không nên dùng function arrow vì nó không thích this(trong method thì rất ít hay có this)

// nâng cao 1 tí
// điều gì xảy ra nêu this nằm trong function của method trong object
let promotionBoy3 = {
  nickName: "Lê Mười Điệp",
  //method
  //FD
  showName() {
    //FA
    let arrow = () => {
      console.log("Nickname: " + this.nickName);
    };
    arrow();
  },

  //FD
  showName1() {
    //FE
    let expression = function () {
      console.log("Nickname: " + this.nickName);
    };
    expression();
  },
};

// promotionBoy3.showName1();

// m : fd > fe > this
// Cannot read properties of undefined (reading 'nickName')
// this được xác định là object gọi nó
// fe là 1 hàm giữ this lại
// nhưng trong trường hợp này không có ai gọi hàm fe cả
// thì mình phải xét theo mode
// use strict : this là undefined => undefined.nickName => bug: Cannot read properties of undefined (reading 'nickName')
// normal: this là window => window.nickName => undefined

promotionBoy3.showName();
//m: fd > fa > this
// arrow đá đi nhưng FD giữ lại vì vậy this này là promotionBoy3.
// fa ghét this, dù ở mode nào thì cũng sút this đi.
// nhưng may mắn là fa nằm trong fd(giữ lại fd).
// hên quá có người gọi m:fd nên ở mode nào thì cũng là ngươi đó.
// nếu cần sài 1 hàm bên trong 1 method thì nên dùng FA.

// nâng cao thêm 1 tý nữa.
// this trong function của callback nằm trong method của object thì sao?
//(Object > method > callback(callbackFn > this) )

let promotionBoy4 = {
  nickName: "Lê Mười Điệp",
  //method
  //FD
  showName() {
    //FA
    let arrow = () => {
      console.log("Nickname: " + this.nickName);
    };
    setTimeout(arrow, 3000);
  },

  //FD
  showName1() {
    //FE
    let expression = function () {
      console.log("Nickname: " + this.nickName);
    };
    setTimeout(expression, 3000);
  },
};

// setTimeOut sài callbackFn như đang sài ở lớp chứa nó
// kết quả sẽ y chang với trường hợp ở trên

// nâng cao 1 tí nữa
// tại sao phải dùng this?

let promotionBoy5 = {
  nickName: "Lê Mười Điệp",
  //fd
  showName() {
    console.log("Nickname nè: " + this.nickName);
    //nếu không có this thì ra bug: nickname id not defined
  },
};

promotionBoy5.showName();
// tầm quan trong khi dùng this:

// Trong JS thì this là chỉ tới người gọi đến nó.
// thay vì dùng định nghĩa trên thì áp dụng định nghĩa của this trong java : this ám chỉ đến object chứa nó
// nếu mà mình chỉ định rõ object của thuộc tính mà không dùng this thì sẽ ra một bug.

// let promotionBoy5 = {
//   nickName: "Lê Mười Điệp",
//   //fd
//   showName() {
//     console.log("Nickname nè: " + promotionBoy5.nickName);
//   },
// };
// let promotionBoy6 = promotionBoy5;
// hai chàng trỏ 1 nàng

// promotionBoy5 = null
// thì lúc này liên kết promotionBoy5 sẽ trỏ tới null
// bug sẽ xuất hiện.

// promotion6.showName();
// thì methodName() có cấu trúc như sau :
//   showName() {
//     console.log("Nickname nè: " + promotionBoy5.nickName);
//   },

// thì thay vì dùng this để gọi tới thuộc tính của người đang gọi mà fix cứng object(PromotionBoy5) đc gọi
// mà PromotionBoy5 đang trỏ tới null vì vậy cấu trúc của showname() sẽ là null.nickname
// => sẽ ra bug Cannot read prop of null
// nếu đây dùng this thì nó sẽ định nghĩa theo người gọi nó thì lúc này sẽ là Promotion6 => Promotion6.nickname

//2: trong Java thì không dùng this thì vẫn chạy đc
// trong Js thì this phải dùng trong object còn nếu khi không dùng thì nó sẽ không biết prop nickname của ai.

//Phần khó nhất.
// Hàm
// What?
// Nó trông như thế nào?

//Nâng cao: HOF
//Higher order function.
//Kỷ thuật xử lý hàm bậc cao
//lý do có nhiều cách viết: Cơ chế lưu trữ của JS: quá flexible.

//1. callback: một hàm nhận một hàm làm 1 đối số(argument).
//2: closure : một hàm trả ra 1 cái hàm khác.
//3. currying: kỹ thuật chuyển đổi một hàm có nhiều parameter thành nhiều hàm liên tiếp có parameter. là hệ quả của closure.

//Ví dụ:
//Viết hàm nhận vào 2 số, trả ra tổng của hai số đó.
let sumDemo = function (a, b) {
  return a + b;
}; //FE

// viết tắt
// Bước đầu dùng arrow
// FA
sumDemo = (a, b) => {
  return a + b;
};
// Bước hai vì return nên viết theo vậy
sumDemo = (a, b) => a + b;

//h mới dùng HOF (currying)
sumDemo = (a) => {
  return (b) => {
    return a + b;
  };
};

// vì vậy khi dùng phải chuyền 2 tầng
sumDemo(5)(7);
// hệ quả closure

// viết tắt hơn nữa của sumDemo
sumDemo = (a) => {
  return (b) => a + b;
};
// viết tắt nữa:
sumDemo = (a) => (b) => a + b;
// dùng ba kỹ thuật của hOF:
// closure
// currying
// lexical scoping



//HOF: có ba khai niệm:
//1. CallBack: một hàm nhận 1 hàm làm đối số argument (Khi đang chạy hàm) còn nếu parameter thì nói khi đang build hàm
const array1 = [1, 2, 3, 4, 5];
array1.forEach((val) => {
  console.log(val);
});

//2. Closure :
// 2.1 lexical scoping: hàm con sài biến của hàm cha
// 2.2 closure: hàm trả ra 1 hàm.

//ứng dụng: tạo ra 1 hàm, mà mỗi lần gọi nó thì nó trả ra 1 con số mới mà không trùng với con số cũ để làm key tự tăng.
const initIdentity = () => {
  let newID = 0;
  return () => {
    return ++newID;
  };
};
//xài thử
console.log(initIdentity()); // () => ++newID;
console.log(initIdentity()()); //1
console.log(initIdentity()()); //1

//Xài đúng
let demoClosure = initIdentity();
console.log(demoClosure()); //1
console.log(demoClosure()); //2

//3. currying: kỹ thuật chuyển từ 1 function từ nhiều para thành nhiều function liên tiếp có para

//Bài tập ứng dụng:
// viết 1 hàm xử lý 3 bài toán sau
// 1. tìm các số từ không đến 10 là số lẻ
// 2. tìm các số từ không đên 20 là số chẳn
// 3. tìm các số từ 0 đên 30 chia 3 dư 2

//dùng callback, truyền vào hàm kiểm tra số theo yêu cầu
let handle = (end, checkNumberFn) => {
  let result = [];
  for (let i = 0; i <= end; i++) {
    if (checkNumberFn(i)) result.push(i);
  }
  return result;
};

handle(10, (number) => number % 2 != 0);

//Call Apply Bind
const people = {
  print(age, location) {
    console.log(this.fullName + " " + age + " " + location);
  },
};

people.print(25, "TP HCM"); // undefined 25 TP HCM
//people.fullName => undefined

// ta có thể bẻ cong đường dẫn của this bằng call or apply or bind.
const diep = { fullName: "Điệp 10 điểm" };

//call
people.print.call(diep, 25, "TP HCM"); // Điệp 10 điểm 25 TP HCM 
// call(object và parameter cũ)

//apply
people.print.apply(diep, [25, "TP HCM"]); // Điệp 10 điểm 25 TP HCM 
// .apply(object, array[...parameter cũ])

//bind
people.print.bind(diep)(25, "TP HCM");
people.print.bind(diep, 25, "TP HCM");
// ép điệp vào hàm print => có this là điệp và biến thành một hàm mới và tốn 2 nhịp

/*
Thực thi hàm:
  bind(): Không thực thi ngay, tạo một hàm mới.
  call() và apply(): Thực thi hàm ngay lập tức.
Trả về:
  bind(): Trả về một hàm mới.
  call() và apply(): Trả về kết quả của việc thực thi hàm.
Cách truyền this:
  Cả ba đều nhận this làm đối số đầu tiên.
Cách truyền đối số:
  bind(): Có thể truyền đối số khi tạo hàm mới và khi gọi hàm đó.
  call(): Truyền từng đối số riêng biệt sau this.
  apply(): Truyền đối số dưới dạng một mảng.
*/

//Ứng dụng bind
let PromotionBoy7 = {
  nickname: "Lê Mười Điệp",
  showName() {
    let expression = function () {
      console.log(this.nickname);
    }.bind(this);
    expression();
  },
};
PromotionBoy7.showName();
//nếu không có .bind(this) thì đáp án sẽ là undefined nếu có .bind(this) thì gọi
//hằng đang gọi vào hàm và tạo ra một cái hàm mới có thuộc tính của người đang gọi

//datetime()
//thời gian trong JS là object | dựa vào milisecond
//được tính từ 1/1/1970 theo chuẩn UTC (ngày máy tính bắt đầu tính giờ)
let a = new Date();
//tạo ra ngày tháng năm hiện tại

a = new Date(1723877258096);
a = new Date("2024-8-17");
a = new Date(2024, 7, 17, 13, 45, 0, 0);
//y | m - 1| d | h | m | s | sm
//trong JS month tính từ 0
console.log(a);

// getDate()        : lấy ngày trong tháng
// getDay()         : lấy ngày trong tuần (0: chủ nhật - 6:thứ 7);
// getFullYear()    : lấy năm
// getHours()       : lấy giờ 0-23
// getMilliseconds(): lấy mili giây (0-999)
// getMinutes()     : lấy về phút (0-59)
// getMonth()       : lấy về tháng (0 -11)
// getSeconds()     : lấy về giây (0-59)
// toISOString()    : lấy định dạng thời gian chuẩn
console.log(a.getMilliseconds());

//định dạng ISO được dùng để bỏ vào DBI vì các ngôn ngữ trình duyệt khác
//đểu có thể chuyển từ ISO này về dạng bth được

// windowObject(wo) là đại diện cho cửa sổ trình duyệt
// tất cả các glocal Object, function, biến mà tạo bằng var
// thì đều là method | prop của wo

//window là full màn hình là trình duyệt
//ngay cả DOM(Document object model) cũng là của window (index.html cũng là của nó luôn)

console.log(window.innerHeight);
//lấy chiều dài trong (thực tế của màn hình)
console.log(window.innerWidth);
//lấy chiều rộng trong (thực tế của màn hình)

// setTimeout(() => {
//   window.open(
//     "https://www.dimtutac.com/",
//     "_blank",
//     "width = 500, height = 700"
//   );
// }, 3000);

//window.location
//location: href = protocol + hotname \ pathname

//location để xem cấu tạo
//history.back
//history.forward

// trình duyệt cung cấp 3 loại Popup:
// alert("Máy tính của bạn bị nhiễm virus rồi ");
// confirm("Bạn đã dính virus, bạn muốn tải phần mềm duyệt virus không?")
// prompt("Are you gay?")
