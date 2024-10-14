//04-nativePrototype.js
/**(Lý thuyết)
 * Thuộc tính prototype của constructor function được sử dụng rộng rãi trong JS.
 * Mọi constructor function trong JS đều sẽ có prototype.
 * [[Prototype]] là 1 thuộc tính ẩn của object, là đại diễn cho prototype thực thể.
 * __proto__: là getter và setter(accessor property) của [[Prototype]].
*/

//Một đối tượng không có bất cứ một thuộc tính nào => object plain
let obj = {}; //obj = new Object;
console.log(obj.toString()); //[object Object]
console.log(obj.__proto__ == Object.prototype);//true "class Object"
//'Object' là một constructor function chứ không phải là class
console.log(Object.prototype);//class Object
console.log(Object.prototype.__proto__);//null được xem là cha của vạn vật
console.log(obj.__proto__);//class Object
console.log(obj.__proto__.__proto__);// null
//----------------------------------
let arr1 = [1,2,3];
console.log(arr1.__proto__); // class Array
console.log(arr1.__proto__.__proto__); // class object
console.log(arr1.__proto__.__proto__.__proto__); // null
console.log(arr1.__proto__ == Array.prototype); //true "class array"
console.log(Array.prototype.__proto__); // Class object
console.log(Array.prototype.__proto__ == Object.prototype); //true
console.log(arr1.__proto__.__proto__ == Array.prototype.__proto__);//true "class object"
// nếu arr1.toString() thì nó xài toString của Array hay Object => sài hàm của Array
console.log(arr1.toString()); // 1, 2, 3 
//
let a = 5;
console.log(a.__proto__ == Number.prototype);//true "class number"













