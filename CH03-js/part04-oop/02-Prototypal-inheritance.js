// 02-Prototypal-inheritance
/**(Lý thuyết)
 * Prototypal-inheritance: Kế thừa nguyên mẫu(kế thừa 2 object với nhau):
 * [[Prototype]]: 
 * Trong bất cứ object nào thì luôn có 1 thuộc tính ẩn tên là [[Prototype]].
 *          [[Prototype]]: là thuộc tính chứa thông tin tiền thân của object đó
 *                          chứa tiền thân của nó(thằng tạo nó || cha nó).
 *          Lưu ý: Ta không thể .[[Prototype]] được
 *                 vì vậy muốn truy cập vào [[Prototype]] thì phải thông qua
 *                 accessor property có tên là __proto__.
 *          1. [[Prototype]] != __proto__
 */

/**Lưu ý : "__proto__"
 * Trước ES6(2015) không có cách nào truy cập vào [[Prototype]] cả
 * hầu hết các trình duyệt thêm vào accessor property "__proto__" => JS không cung cấp nhưng trình duyệt cung cấp.
 * '__proto__' : không phải là cách truy cập chính thống của JS.
 * '__proto__' : tính tới thời điểm hiện tại vẫn chưa bị loại bỏ.
 * '__proto__' : có thể thay thế bằng:
 *                  + Object.getPrototypeOf(obj).
 *                  + Object.setPrototypeOf(obj, obj2).
*/

let longEar = {
  ear: "long",
};

let pinkRabbit = {
  jump: true,
};

let congido = {
  eat: true,
  walk() {
    console.log("Tui chạy bộ nè");
  },
};

//1. Muốn "congido" trở thành con của "pinkRabbit" và  nhận longEar làm ông.
// congido   > pinkRabbit  > longEar
// con          cha          ông nội
congido.__proto__ = pinkRabbit;
//pinkRabbit.__proto__ = longEar;
congido.__proto__.__proto__ = longEar;

console.log(congido);
console.log(congido.ear); // long
console.log(pinkRabbit.eat); //undefined
console.log(pinkRabbit.ear); //long

//2. Muốn "congido" cập nhật "ear" thành "short".
congido.ear = "short";
/**
 * JS sẽ không cập nhật ear của cha => để tránh ảnh hưởng tới những hằng con khác.
 * Thay vào đó nó sẽ tạo một biến 'ear: "short"' ở chính lớp của nó => 'override'.
 * Khi nó sài thì nó sẽ nhìn từ bản thân nó ra "Nào gần nhất sẽ dùng nó luôn" 
 *            vì vậy nó sẽ sài 'ear: "short"'.
 * */ 
console.log(congido.ear); // short
console.log(pinkRabbit.ear); //long

//3. Muốn sửa thuộc tính ear của cha lun.
// Truy cập vào hằng cha nhờ vào '__proto__' để sửa.
congido.__proto__.__proto__.ear = "short";
console.log(congido.ear); // short
console.log(pinkRabbit.ear); //short

// Ví dụ năng cao
let student = {
  lastName: "Điệp", // value property
  firstName: "Lê", // value property

  //accessor property
  get fullname() {
    return this.firstName + " " + this.lastName;
  },

  set fullname(newName) {
    [this.firstName, this.lastName] = newName.split(" ");
  },
};

let user = {
  isUser: true,
  __proto__: student,
};

//** Accessor property có xu hương truyền từ đời này sang đời khác.
user.fullname = "Nhật Trường";//setter
console.log(user);//getter

//4.'fullname' trong student có bị thay đổi không?
// => Không bị ảnh hưởng và có 2 hướng giải thích cho trường hợp này:
// 1. Tự tạo thêm hai biến 'firsname:"Nhât"' và 'lastname: "Trường"' trong phạm vi của nó để ngăn chặn ảnh hưởng tới hằng cha.
// 2. Trong hàm set có this mà this là ám chỉ người gọi nó => this đây là user => user sẽ tạo ra biến firstname và lastname để lưu trữ.
