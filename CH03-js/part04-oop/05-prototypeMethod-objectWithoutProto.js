// Chúng ta đang code 2024, ai cũng biết __proto__ là gì
// sài như thế nào, nhưng chúng ta phải xem như
// __proto__ đã bị loại bỏ rồi, không được dùng nữa => phải dùng các method thay thế.

//3 method thay thế cho __proto__ chính thống do JS làm.
// + Object.getPrototypeOf(obj);
// + Object.setPrototypeOd(obj, new Proto);
// + Object.creat(proto, {descriptors});
    //{descriptors}: option. 
    //Tạo ra object rỗng có [[Prototype]] là proto
    //với các method có bộ miêu tả như param.

let animal = {
  eat: true,
  //[[Prototype]]: Object.prototype => class Object
};

//trong animal ngoài eat ra thì ta còn có [[Prototype]].
console.log(animal.__proto__ == Object.prototype); //true "class Object"
//vì animal được tạo từ constructor function của Object.
//nên animal.[[Prototype]] sẽ là prototype của constructor function Object.
//mà Object.prototype == class Object.
//=>> animal.[[Prototype]] là class Object
//=>> animal.__proto__ là class Object

//I- Prototypal inheritance: kế thừa nguyên mẫu(kế thừa giữa 2 object).
//Cách 1:Dùng __proto__
let rabbitYellow = {
  jump: true,
};
rabbitYellow.__proto__ = animal;

//Cách 2: dùng method .setPrototypeOf()
Object.setPrototypeOf(rabbitYellow, animal);

//Cách 3: dùng method .create(obj)
rabbitYellow = Object.create(animal);
//rabbitYellow là {}(object rỗng) có [[Prototype]] là animal.

//Cách 4: dùng method .create(obj, description)
rabbitYellow = Object.create(animal, {
  jump: { value: true, configurable: true },
});
console.log(Object.getOwnPropertyDescriptor(rabbitYellow, "jump"));
//{value: true, writable: false, enumerable: false, configurable: true}

//**II- Cách clone object
// Giờ ta muốn clone rabbitYellow thì sao?

//C1: destructuring(spread): "..." toán tử phân rã.
//Chỉ mạnh khi clone bình thường thui chứ clone vào sâu obj(bộ cờ) thì không ngon.
let objClone = { ...rabbitYellow };
//chỉ clone đc prop bình thường, không chép được bộ cờ(để tất cả là true).
console.log(objClone);

//C2: Object.definedProperties()
objClone = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(rabbitYellow)
);
console.log(objClone);
//clone được thuộc tính và bộ cờ nhưng không không clone đc [[Prototype]].

//C3: dùng .create() để clone
console.log(rabbitYellow);
objClone = Object.create(
  Object.getPrototypeOf(rabbitYellow),//__proto__ = animal
  Object.getOwnPropertyDescriptors(rabbitYellow)//lấy tất cả bộ cờ của các thuộc tính của 'rabbitY'
);
console.log(objClone);

//III- Very plain object - object siêu phẳng | Base object
//**1. [[Prototype]] của 1 object có thể là Object, class, null, không được là String
let obj = {}; // tạo một object rỗng.
obj.__proto__ = "Giá trị demo";
console.log(obj); // [[Prototype]] : Object 
//Bỏ qua chuỗi luôn và nhận Object làm cha luôn

// 2. Demo object siêu phẳng
// siêu phẳng đến nổi không biết __proto__ accessor property là gì luôn
obj = Object.create(null);// tạo ra một {} và [[Prototype]] là null
console.log(obj); //No properties



