// Class là khuôn.
// Bên trong class có constructor(phễu), properties, method.
// class sẽ dùng constructor để tạo ra đối tượng(Object).
// Lưu ý : trong JS hàm sinh ra trước class

class User {
  constructor(fullname) {
    [this.firstname, this.lastname] = fullname.split(" ");
  }
  show() {
    console.log(`
        Firstname nè ${this.firstname},
        Lastname nè ${this.lastname}`);
  }
}

// Tạo thử object từ User
let diep = new User("Lê Điệp");
console.log(diep);
/*
diep{
    firstname: "Lê",
    lastname: "Điệp",
    [[Prototype]]: User.prototype => class User{
                                        constructor(),
                                        show()
                                    }
}
*/

diep.show();
console.log(diep.__proto__ == User.prototype); //true "class User"
console.log(User); //constructor function User
console.log(typeof User); //function
console.log(User.prototype.constructor == User); //true "constructor function User"

//class còn được gọi với cái tên là 'syntactic sugar'.
//'syntactic sugar' cú pháp kẹo đường => ý chỉ sự thay đổi về mặt
//                  syntax cho người mới dễ tiếp cận.

//Ta hoàn toàn có thể thay thế class bằng function.
//Ta sẽ tạo ra hàng student là phiên bản nháy lại class user nhưng chỉ dùng function.
function Student(fname) {
  [this.fullname, this.lastname] = fname.split(" ");
  //   this.show = function () {
  //     console.log(`
  //         Firstname nè ${this.firstname},
  //         Lastname nè ${this.lastname}`);
  //   };
}

// Bản chất class vẫn là một Object mà Object thì có
// khả năng tạo một thuộc tính mới
Student.prototype.show = function () {
  console.log(`
        Firstname nè ${this.firstname},
        Lastname nè ${this.lastname}`);
};

// Khác nhau giữa việc tạo object tạo từ class 'User' và function 'Student'
/**
 * 1. Constructor function không cần dùng toán tử new.
 * 2. Về mặt hình: một hằng là class một hằng là function.
 * 3. Code bên trong class luôn là 'use-strict' mode => không hosting variable.
 */

//1
// let hung = User("Thế Hùng");// lỗi thiếu new
let truong = Student("Nhật Trường");
console.log(truong); // undefined => function thiếu return nên nó sẽ undefined
truong = new Student("Nhật Trường");
console.log(truong); //Student {fullname: 'Nhật', lastname: 'Trường'}
// Student suy cho cùng cũng chỉ là function mà thôi.
// nếu Student xài mà có new thì nó được hiểu là constructor function
// tạo ra object
// nếu student xài mà không có new thì coi như hàm bình thường mà thiếu return.

//III- Class mà ta tạo ở trên là class declaration.
//class expression
let User1 = class Ahihi {
  constructor(fullname) {
    [this.firstname, this.lastname] = fullname.split(" ");
  }
  show() {
    console.log(`
        Firstname nè ${this.firstname},
        Lastname nè ${this.lastname}`);
  }
};

// không thể sử dụng class ahihi nữa
// let tuan = new Ahihi("cuoi tuan") => bug
// lúc này class ahihi đã bị đổi tên thành User1

// class anonymous

/*Biễu diễn*/
// Hàm tạo ra class:
function makeClass() {
  class Ahihi {
    constructor(fullname) {
      [this.firstname, this.lastname] = fullname.split(" ");
    }
    show() {
      console.log(`
        Firstname nè ${this.firstname},
        Lastname nè ${this.lastname}`);
    }
  }
  return Ahihi;
}
let User3 = makeClass();
let obj3 = new User3("Ahihi");

// *** Compute Name:
// symbol
class User5 {
  firstname = "Nguyễn";
  ["show" + "Name"]() {
    console.log("Hello");
  }
}

let hue = new User5();
hue.showName();

/**
 * OOP
 * method của array
 * this
 */

//**Cảnh giác this trong các method của class
class Button {
  constructor(value) {
    this.value = value;
  }
  click() {
    console.log("Giá trị là " + this.value);
  }
}

let btn = new Button("Ahihi");
/*
btn{
  valur: "Ahihi",
  [[Prototype]]: Button.prototype => class Button
                                            constructor
                                            click()
}
*/

// btn.click(); //"Ahihi"

// //Muốn hàm click() được chạy sau 3 giây thì làm sao?
// setTimeout(btn.click(), 3000);
// //truyền vào btn.click() là sai
// //khi mà btn.click() thì chạy luôn, trước cả khi timeout.

//Truyền vào btn.click thì xài đúng
//setTimeout(btn.click, 3000);//Giá trị là undefined
//btn.click là công thức, và sau 3s thì công thức được lôi ra chạy
//nhưng sau 3s đợi nhưng không phải btn chạy mà là window chạy
//xui là trong click có this, khi công thức được gọi trễ thì không còn người gọi nữa
//this -> window => window.value = undefined.

//Các cách fix:
//Cách 1:  bộc nó vô một cái hàm
// setTimeout(() => {
//   btn.click();
// }, 3000);

//Cách 2: bind
// class Button1 {
//   constructor(value) {
//     this.value = value;
//     this.click = this.click.bind(this);
//   }

//   click() {
//     console.log("Giá trị là " + this.value);
//   }
// }

// let btn1 = new Button1("Ahihi");
// setTimeout(btn1.click, 3000);
/*
btn{
  valur: "Ahihi",
  click() được độ có thêm this
  [[Prototype]]: Button.prototype => class Button
                                            constructor
                                            click()
}
*/

//cách 3: dùng arrow
// class Button2 {
//   constructor(value) {
//     this.value = value;
//   }
//   click = () => {
//     console.log("Giá trị là " + this.value);
//   }
// }
// let btn2 = new Button2("Ahihi");
// setTimeout(btn2.click, 3000);

//II- Class-inheritance: Kế thừa bằng class
// trước khi có class thì chúng ta chỉ có constructor function mà thôi
// việc kế thừa chắc chắn không phải thông qua từ khóa "extends"


class Animal {
  constructor(name) {
    this.name = name;
    this.speed = 0;
  }
  //method
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}`);
  }
  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still`);
  }
}

let ani = new Animal("Ahihi đồ chó");

class Rabbit extends Animal {
  // Rabbit.prototype = Animal.prototype;
  constructor(name) {
    super(name);
  }
  //constructor con phải có constructor cha trong đó,
  //tk cha cần dì thì truyền vào constructor con tk đó
  hide() {
    console.log(`${this.name} hides!!!`);
  }
  stop() {
    setTimeout(() => {
      super.stop();
    }, 1000); //đợi 1s ròi đợi hàm stop của cha
  }
}
let yellowRabbit = new Rabbit("yellowRabbit");
/*
yellowRabbit{
    name: "yellowRabbit",
    speed: 0,
    [[Prototype]]: Rabbit.protutype => class Animal,
}
*/
yellowRabbit.hide();//yellowRabbit hides!!!
yellowRabbit.run(yellowRabbit.speed); //yellowRabbit runs with speed 0
yellowRabbit.stop();//yellowRabbit stands still
// ani.hide();// không chay được vì ani là của animal


// class field là phiên bản lý thuyết của prop
class Animal2 {
  name = "isAnimal"; //class field
  constructor() {
    console.log(this.name);
  }
}

class Rabbit2 extends Animal2 {
  name = "isRabbit";
  constructor() {
    super();
  }
}
let an2 = new Animal2(); //isAnimal
let rb2 = new Rabbit2(); // isAnimal
console.log(rb2); // Rabbit2 { name: 'isRabbit' }
//giữa các object thì prop có tính chát override giữa các obj
//class field không kế thừa, không có override, chỉ có overwrite

//8- static
//static: tĩnh || không phân bảng
//trong java static có nghĩa prop thuộc về class,
//instance được phép truy cập và sử dụng, dùng chung
//trong JS static nghĩa là prop 'chỉ' thuộc về class 
// => instance không được phép truy cập

class User9 {
  name = "Điệp";
  static name2 = "Lan";
}

let obj1 = new User9();
console.log(obj1.name); //Điệp
console.log(obj1.name2); //undefined (Java chạy được)
console.log(User9.name2); //Lan

// -----------------
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}

// danh sách mấy bài báo lá cải
let articleList = [
  new Article("Hoài Linh để quên 14 tỷ trong ngân hàng", new Date(2022, 3, 6)),
  new Article("Jack bán áo có chữ ký Messi để từ thiện", new Date(2022, 0, 6)),
  new Article(
    "Người mua áo Messi dùng tiền để từ thiện trẻ mồ côi",
    new Date(2022, 8, 6)
  ),
];

articleList.sort(Article.compare);
console.log(articleList);

//Access modifier : đây là đại diện của tính đóng gói trong OOP ở js

//trong js chỉ chia ra 2 là Internal và External interface
// Internal interface - phương thức và thuộc tính chỉ có thể được truy cập bên trong các phương thức trong class, không phải từ bên ngoài.
// External interface - phương thức và thuộc tính có thể truy cập được từ ngoài và trong class.
// Trong Javascript, có 2 loại thuộc tính và phương thức:

// Public: có thể truy cập từ bất kỳ đâu. Nghĩa là external interface. Cho đến bây giờ thì chúng ta chỉ sử dụng thuộc tính public
// Private: có thể truy cập bên trong class. Nghĩa là internal interface
// Trong nhiều ngôn ngữ khác thì còn tồn tại trường "protected": chỉ có thể truy cập bên trong class và những class kế thừa.

// Trường Protected không được quy định trong Javascript ở cấp độ ngôn ngữ, những trong thực tế để cho tiện lợi thì chúng ta có thể giả lập để quy ước với nhau.

//ReadOnly
//nếu khai báo get mà k có set, thì nó sẽ thành readOnly, không đổi giá trị đc
//nếu không có set/get thì nó tự tạo , sẽ gán bt
//các dev quy ước tên _ ở trước là private chỉ dùng trong class, 
// nên truy cập bằng get/set không nên . tới
//việc quy ước này không đảm bảo được ngôn ngữ, chỉ là quy ước

class CoffeeMachine {
  constructor(power) {
    this._power = power;
  }
  get power() {
    return this._power;
  }
}

let cfm = new CoffeeMachine(100);
cfm.power = 1000; // không có setter nên không thay đổi đc
cfm._power = 1000; //thoải mái(nhưng không nên);
console.log(cfm.power);
//dấu '_' khai báo private trong cấp độ ngôn ngữ lun.