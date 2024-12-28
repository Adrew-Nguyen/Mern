/**(Lý thuyết)
 * "PropertyFlag- DecriptorProperty - bộ cờ - bộ mô tả"
 * - 4 lá cờ của môt property:
 *      1. value: Giá trị của property.
 *      2. writable: true => value có thể thay đổi || false thì value không đổi được.
 *      3. enumerable: true => thì có thể duyệt trong vòng lặp || false thì không thể.
 *      4. configurable:
 *                  + "true" thì prop có thể cập nhật các là cờ được.
 *                  + "false" thì - không thể cập nhật được enumerable nữa.
 *                                - writeble thì từ T -> F thì được những F -> T thì không được.
 *                                - value thì dựa vào trạng thái hiện tại của writable.
 * Lưu ý: Bất cứ property nào của object cũng đều sở hữu 4 lá cờ (1 bộ cờ)
 *              và có tên là PropertyFlag- DecriptorProperty.
 */

/**(Method cần nhớ)
 * Tất cả các phương thức này là của đối tượng 'Object'.
 * .getOwnPropertyDescriptor(o: any, p: PropertyKey)
 *    - return Object chứa bộ cờ cần xử lý theo 'p' của 'o' 
 *                            || undefined(nếu không có thuộc tính đó).
 *    - 'o' là 'Object' cần xử lý.
 *    - 'p' là 'String' chứa prop cần xử lý của 'o'.
 *
 * .getOwnPropertyDescriptors(o: Object)
 *    - return Object chứa tất cả bộ cờ của mỗi prop trong 'o'.
 *    - 'o' là 'Object' cần xử lý.
 *
 * .defineProperty(o: Object, p: PropertyKey, descriptor: PropertyDescriptor)
 *    - return ra đối tượng đã thay đổi.
 *    - Cập nhật || tạo property 'p' có bộ cờ theo miêu tả trong 'descriptor' trong Object'o'.
 *    - 'o' là 'Object' cần xử lý.
 *    - 'p' là 'String' chứa prop cần xử lý của 'o'.
 *    - 'descriptor' là 'Object' chứa những mô tả bộ cờ của 'p'.
 *
 * .defineProperties(o: Object, properties: PropertyDescriptors)
 *    - return ra đối tượng đã thay đổi.
 *    - Cập nhật || tạo properties có các bộ cờ theo miêu tả trong 'properties'.
 *    - 'o' là 'Object' cần xử lý.
 *    - 'descriptors' là 'Object' chứa các mô tả thuộc tính gồm:
 *        + 'prop' là 'key'
 *        + 'Object chứa mô tả bộ cờ' là 'value'.
 *
 * - Lưu ý: Đối với .definedProperty() và .definedProperties() khi dùng để tạo prop thì 
 *            đối với những lá cờ nào không được liệt kê thì sẽ có giá trị là 'false'.
 */

//I- Demo
let profile = {
  fname: "Điệp",
  age: 18,
};
// 1. Ta có thể lấy ra xem bộ cờ của 1 property bất kỳ trong object.
console.log(Object.getOwnPropertyDescriptor(profile, "fname"));
// Trả ra một object chứa các lá cờ.
// {value: 'Điệp', writable: true, enumerable: true, configurable: true}

// 2. Cập nhật || thêm 1 property vào bộ cờ của nó.
// 2.1 Cập nhật 1 bộ cờ của 1 property trong một object.
// Ex: Cập nhật 'writable' của 'fname' của 'profile' từ 'True' thành 'False' 
// => Không thể cập nhật value của fname được nữa.
Object.defineProperty(profile, "fname", {
  writable: false,
});
profile.fname = "Trường";
// lệnh này vẫn chạy
// Nhưng 'writable: false' => nên không thể cập nhật được value 
// => không làm thay đổi gì cả => (Lưu ý: không đưa ra bug gì cả).
console.log(profile.fname); //Điệp

//2.2 Tạo mới thuộc tính kèm bộ cờ của một property trong một object bất kì:
//2.2.1 Dùng definedProperty để tạo
//Những lá cờ nào không được liệt ra thì là FALSE;
Object.defineProperty(profile, "job", {
  value: "yangho",
  writable: true,
});
console.log(Object.getOwnPropertyDescriptor(profile, "job"));
//{value: 'yangho', writable: true, enumerable: false, configurable: false}
// Với enumerable là false thì chúng ra sẽ không thể duyệt được thuộc tính này trong các vòng for vì chúng không được nhìn thấy.
// Demo chạy thử for khi cơ chế enumerable : False
for (const key in profile) {
  console.log(key);
} // fname, key

//2.2.2 Dùng cơ chế hostiong để tạo
//Bộ cờ sẽ ở trạng thái default của nó.
/**
 * value: SE
 * writable: T
 * enumertable: T
 * configurable: T
 */
profile.major = "SE"; // Cơ chế hosting
console.log(Object.getOwnPropertyDescriptor(profile, "major"));
//{value: 'SE', writable: true, enumerable: true, configurable: true}

// II- Non-configutable: Không thể cấu hình.
/**(Lý thuyết)
 * configurable: false => nghĩa là không cho ta set giá trị của bộ cờ.
 *                                  - Ngoại trừ writable : từ T => F.
 *                                  - Value thì dựa vào status của writable.
 * Lưu ý: Người ta thường configurable cho những prop đặc biệt như Math.Pi.
 * Khi đã configurable: false thì không thể dùng defineProperty để fix
 *                      configurable về true.
 *
 * Tóm tắt: Khi configurable: false thì:
 *          - 1. Không thể thay đổi configurable nữa.
 *          - 2. Không thể thay đổi enumerable nữa.
 *          - 3. Không thể thay đổi writable F-> T nữa nhưng  T -> F thì được.
 *          - 4. Value dựa vào status của writable.
 *          - 5. Không thể thay đổi được getter và setter của accessor property.
 */

// Demo const một prop trong một object (vừa fix writable và configurable là false):
let tmp = {};
Object.defineProperty(tmp, "job", { writable: false, configurable: false });

// 3. Ta có thể thêm || cập nhật nhiều property kèm bộ cờ "cùng lúc".
// 3.1 Thêm thuộc tính.
// Lưu ý: những bộ cờ nào không liệt kê thì bị FALSE.
Object.defineProperties(profile, {
  point: { value: 9, writable: true },
  student_id: { value: "SE111", writable: true },
});
console.log(Object.getOwnPropertyDescriptors(profile));

//3.2 Cập nhật thuộc tính
Object.defineProperties(profile, {
  point: { value: 10 },
  student_id: { value: "Se111" },
});

//4. Ta có thể lấy tất cả các bộ cờ của các property trong một object
console.log(Object.getOwnPropertyDescriptors(profile));

//5. Làm sao để có thể clone(sao chép) được một object
//5.1 dùng spread: "..."(Không nên dùng cách này)
//=> Chỉ sao chép được prop mà thôi "không sao chép được bộ cờ".
let objClone = { ...profile };
console.log(Object.getOwnPropertyDescriptors(objClone));

//5.2 dùng defineProperties(thông qua việc định nghĩa) => Nên dùng cách này
objClone = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(profile)
);
console.log(Object.getOwnPropertyDescriptors(profile));

/**(Lý thuyết)
 * Sealing an object globally - niêm phong toàn bộ 1 object.
 * những thằng này rất ít dùng trong dự án nhưng cũng rất là nhanh tiện.
 * 1. Object.preventExtensions(obj)
    *    Ngăn cấm thêm thuộc tính mới vào object
    *    muốn biết 1 object có đang preventExtensions không ta dùng Object.isExtensible(object)

 * 2. Object.seal(obj)
    *    Ngăn cấm thêm mới/xóa thuộc tính object.
    *    set configurable : false cho tất cả các prop.
    *    muốn biết 1 object có đang seal không ta dùng Object.isSealed(object).

 * 3. Object.freeze(obj)
    *    Ngăn cấm thêm mới/xóa/thay đổi thuộc tính object.
    *    set configurable : false và writable: false cho tất cả các pro.
    *    muốn biết 1 object có đang freeze không  ta dùng Object.isFrozen(object).
*/

//III- 'Property' trong 'Object'
//** Trong object có 2 loại property:
// value property && accessor property: nhìn ví dụ để định nghĩa.
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

console.log(student.fullname);
student.fullname = "Nhật Trường";
console.log(student);

//value property:       value  writable  enumerable   configurable
//accessor property:    get    set       enumerable   configurable
console.log(Object.getOwnPropertyDescriptor(student, "fullname"));
// Lưu ý: khi configurable: false thì nó các lá cờ còn lại không thể fix

//IV- getter và setter thông minh ứng dụng từ accessor property
//VD: cấm người code set giá trị có độ dài bé hơn 4
student = {
  get fname() {
    return this._fname;
  },
  set fname(newName) {
    if (newName.length < 4) {
      alert("Name is too short");
      return;
    } else {
      this._fname = newName;
    }
  },
};