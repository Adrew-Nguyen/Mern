//03-F-prototype
/**(Lý thuyết)
 * Trong JS người ta thích dùng function hơn là class.
 * Bên Java nếu muốn tạo một 1 object(bức tượng) gồm 2 bước:
 *                  + B1: Cần tạo class(khuôn).
 *                  + B2: Tạo constructor(cái phễu).
 * Bên JS: ta không cần class, ta chỉ cần 1 cái hàm thì có thể đúc được.
 *                    tức là function dùng để tạo object.(constructor function)
 */

/**(Lưu ý)
 * Bất cứ một constructor function đều có một thuộc tính ẩn là 'prototype'.
 * 'prototype' chứa chính class đã đúc nó.
 * Ý nghĩa: Sau khi dùng khuôn của constructor function để tạo một object thì sẽ 
 * có 'prototype' lưu lại thông tin của class(khuôn) mà nó được đúc ra để object biết nó được
 * tạo ra từ đâu và như đã biết thì mỗi object đều sẽ có thuộc tính ẩn [[Prototype]] dùng để chứa
 * thông tin cha nó và lúc này [[Prototype]] sẽ trỏ tới prototype để biết người tạo ra object này 
 * ([[Prototye]] == prototye)
 */ 

// Có thể kế thừa cả một object khác.
// JS không đảm bảo constructor nếu như ta chủ động thay đổi prototype của constructor.
// Có thể dùng khuôn của một đối tượng khác để đúc ra một đối tượng mới.

//Demo
//Tạo một cái khuôn đúc cái xe.
function Car(name, price) {
  this.name = name;
  this.price = price;
  //prototype: class Car
}
// class Car {
//   constructor(name, price) {
//     this.name = name;
//     this.price = price;
//     prototype: class Car
//   }
// }

//Dùng hàm constructor car tạo một đối tượng mới.
let audi = new Car("audi", "2 tỷ");
console.log(audi);
/**
 * audi{
 *      name: "audi",
 *      price: "2 tỷ",
 *      [[Prototype]]: prototype của function Car => class Car {
 *                                                      constructor{
 *                                                          prototype: class Car{...}
 *                                                      }
 *                                                   }
 * }
 */

// Ví dụ khác
let factory = {
  date: 2023,
};

Car.prototype = factory;
let rollRoyce = new Car("RR", "1 tỷ 2");
// **Có khả năng kế thừa cả object khác.
// JS không đảm bảo constructor nếu như ta chủ động thay đổi prototype của constructor.
/*
rollRoyce{
    name: "RR",
    price: "1 tỷ 2"
    [[Prototype]]: prototype của function Car => factory
}
*/

// Ôn lại bài trên:
// F.prototype: mặc định là thuộc tính của constructor function.
// mỗi constructor function đều sẽ có một thuộc tính ẩn "prototype".
// "prototype" mặc định là object chứa constructor(class) trỏ ngược lại funtion đó.
function Animal(name) {
  this.name = name;
  //prototype: class Animal
  //                constructor(name){//function Animal
  //                    this.name = name;
  //                    prototype: class Animal{...}
  //                }
}
console.log(Animal.prototype); // class animal
console.log(Animal.prototype.constructor); // function Animal
console.log(Animal.prototype.constructor == Animal); // true
let dog = new Animal("Chi pu");
console.log(dog.__proto__); // class Animal
console.log(dog.__proto__ == Animal.prototype);// true 'class animal
//Có thể dùng khuôn của một đối tượng khác để đúc ra một đối tượng mới.
let newPet = new dog.constructor("qua da");