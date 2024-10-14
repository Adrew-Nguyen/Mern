// 07-arrayMehtod-objectMethod.js
console.log("07-arrayMehtod-objectMethod.js");

/*
1/  lenght: Độ dài của array, là một prop xủa array

2/  .isArray() (syntax: Array.isArray()) || `instanceof`: Kiểm tra coi có phải Array không 

3/  .toString(): Chuyển từ array sang String kèm ',' giữa các phần tử.

4/  .slice(start, end): Tách mảng cha từ start đến end - 1 (có thể theo chiều ngược)

5/  .splice(start, length, ...pt muốn thêm): 
	- Từ start:  + Xóa length phần tử
	     		     + Thêm '...pt muốn thêm'
	- Return ra mảng các phần tử bị xóa. 	
	
6/  .split(token): băm chuỗi bằng các token thành Array 

7/  .join(token): ghép các phần tử trong Array với các token thành một cái chuỗi

8/  .push(item): Thêm item vào cuối array
				- Trả ra length hiện tại

9/  .unshift(item): Thêm item vào đầu array
				- Trả ra length hiện tại

10/ .pop(): Xóa phần tử cuối array
				- Trả ra phần tử bị xóa

11/ .shift(): Xóa phần tử đầu array
				- Trả ra phần tử bị xóa

12/ delete  (systax: delete array[index]): xóa phần tử ở vị trí 'index' của mảng 'array'

13/ .concat(...array): nối 2 hoặc nhiều mảng và trả ra một mảng mới

14/ spread operator `...`: phân rả mọi thứ kể cả mảng và object

15/ .forEach(cf) : duyệt val là chính và key là phụ thông qua iterable
	cf: val(item), key(index), array

16/ map(cf) : biến đổi từng phần tử trong array theo một công thức nhất định
	cf:  val(item), key(index), array

17/ .reduce(cf, initial): ép tất cả phần tử về một biến
	cf: total, current(val-item), currentIndex(key-index)

18/ .filter(cf): lọc các phẩn từ thõa cf (true: giữ || fasle: bỏ)
	cf: item(val)

19/ .find(cf) : tìm giá trị đầu tiên(item - val) thõa cf
	cf: val(item), key(index), array

20/ .findIndex(cf): tìm vị trí của giá trị đầu tiên thõa cf
	cf: val(item), key(index), array

21/ .indexOf(val): tìm vị trí của val trong mảng

22/ .every(cf): Xem xét nghiêm khắc nếu tất cả phần tử đều thỏa cf thì mới trả ra true
	cf: val(item), key(index), array

23/ .some(cf): Chỉ cần tìm thấy một pt thõa cf thì trả ra true
	cf: val(item), key(index), array

24/ .include(val): kiểm tra xem val có nằm trong array không

25/ .reverse(cf?): lật ngược array lại

26/ .sort(cf?): sắp sếp array
*/

//1. Mảng trong JS không nhất thiết phải có cùng kiểu dữ liệu.
let arr1 = [1, 2, "a", { lname: "Huệ", age: 10 }, [3, 5]];
console.log(arr1);

//2. length cung cấp độ dài.
console.log(arr1.length); //5

//3. Array.isArray(arr): kiểm tra biến arr có phải là array không?
// .isArray là một method của Array
console.log(Array.isArray(arr1)); // true
//Cách dùng khác
console.log(arr1 instanceof Array); //true

//4. toString(): biến mảng thành chuỗi kèm ','.
let workerList = ["Huệ", "Lan", "Trà"];
let str = workerList.toString();
console.log(str); //Huệ,Lan,Trà.

//5. split(token): bâm từ chuỗi biến thành mảng.
workerList = str.split(",");
console.log(workerList);//["Huệ", "Lan", "Trà"]

//6. join(token): từ mảng thành chuỗi.
console.log(workerList.join("-"));//Huệ-Lan-Trà

//II- chèn mảng
//Array là mutable: có các method có khả năng chỉnh sửa object.

//6. push(item): nhét item vào cuối của mảng.
//trả ra độ dài của array mới
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.push("Cúc");
console.log(result); //4

//7. unshift(item) : nhét item vào đầu của mảng
//trả ra độ dài của array mới
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.unshift("Cúc");
console.log(workerList, result);
//['Cúc', 'Huệ', 'Lan', 'Trà'] 4

//8. pop(): xóa phần tử ở cuối danh sách
//return ra phần tử đã xóa
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.pop();
console.log(workerList, result);
//['Huệ', 'Lan'] 'Trà'

//9. .shift(): xóa phần tử ở đầu và return về phần tử đã xóa
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.shift();
console.log(result); // Huệ

//10. delete array[index]: xóa phần tử ở vị trí index (cùi)
// xóa giá trị ở index đó và để lại empty (làm thủng mảng).
workerList = ["Huệ", "Lan", "Trà"];
delete workerList[1];
console.log(workerList); //['Huệ', empty, 'Trà']
console.log(workerList[1]); //undefined

//11. splice(start, length, ...pt muốn thêm)
// từ start :xóa số lượng length phần tử
//          :nhét các pt muốn thêm vào index
// return mảng các phần tử bị xóa.

// thêm và không xóa
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 0, "Điệp", "Cường");
console.log(workerList); // ['Huệ', 'Điệp', 'Cường', 'Lan', 'Trà']
console.log(result); // []

// xóa và không thêm
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 1);
console.log(workerList); // ['Huệ', 'Trà']
console.log(result); // ["Lan"]

//Vừa xóa vừa thêm
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(0, 2, "Điệp", "Cường");
console.log(workerList); // ['Điệp', 'Cường', 'Trà']
console.log(result); // ['Huệ', 'Lan']

// 12. slice(start, end): chiết xuất mảng con từ start đến end - 1
console.log(workerList); //['Điệp', 'Cường', 'Trà']
console.log(workerList.slice(-3, -1)); //['Điệp', 'Cường']

// 13. concat(...array): nối mảng
let workerGirl = ["Huệ", "Lan", "Tân"];
let workerBoy = ["Điệp", ["Cường", "Hùng"]];
workerList = workerGirl.concat(workerBoy, "Hồng", ["Trúc", "Lâm"]);
// hai chàng trỏ một nàng và điều này không tốt.
console.log(workerList);
workerBoy[1][0] = "Tuấn";
//làm thay đổi giá trị của workList luôn
console.log(workerList);
// shallow Copy: sao chéo nông
// sao chép giá trị nhưng không cắt được hết dây mơ rễ má

//14. spread operator: destructuring| kỹ thuật phân rã|
// có thể phân rả mọi thứ kể cả mảng và object
// đại diện cho nó là `...`
workerList = [...workerGirl, ...workerBoy];
console.log(workerList); //shallow copy
// rã thêm một phát nữa
workerList[4] = [...workerList[4]]; //deep copy
console.log(workerBoy[1] == workerList[4]); // false
console.log(workerList);

//15. .forEach(cf): lập mảng
// cf: (val(item), index(key), arr) => {}
arr1 = ["Huệ", "Cúc", "Hồng"];
arr1.forEach((item, index, array) => {
  console.log(item, index, array);
});

//16.*** map(cf): biến đổi từng phần tử theo một công thức.
// cf: (val, index, array) => {}
// không được thiếu return còn nếu thiếu thì undefined.
arr1 = [2, 6, 9];
result = arr1.map((item) => item + 2);
console.log(arr1); //[2, 6, 9] ==> map không tác động vào arr1
console.log(result); //[4, 8, 11]

//17. .filter(cf): hàm duyệt qua các item, item nào bỏ vào cf
// được true thì giữ lại còn false thì bỏ
// cf: (item) => true (giữ)| false(bỏ)

arr1 = [1, 2, 3, 4, 5, 6];
//muốn lọc ra các số chẳn
arr1 = arr1.filter((item) => item % 2 == 0);
console.log(arr1); //[2, 4, 6]

//18. find(cf): hàm duyệt các item của mảng
//cf:(val(item), key(index), array) => {}: true | false
//tìm item đầu tiên nào bỏ vào cf mà true thì lấy val
arr1 = [1, 2, 3, 4, 5, 6];
//muốn lọc ra các số chẳn
result = arr1.find((item) => item % 3 == 2);
console.log(result); //2

//19. findIndex(cf): hàm duyệt các item của mảng
//tìm item đầu tiên nào bỏ vào cf mà true thì lấy index
//cf:(val, key, array) => {}: true | false
arr1 = [1, 2, 3, 4, 5, 6];
result = arr1.findIndex((item) => item % 3 == 2);
console.log(result); //1

//20. IndexOf(val): tìm vị trí của value nằm trong mảng
arr1 = [3, 5, 9, 2, 0];
console.log(arr1.indexOf(9)); // 2

//filter(cf): lọc các item thõa cf => danh sách các item thỏa
//find(cf): tìm item đầu tiên thõa cf => item thõa
//findIndex(cf): tìm item đầu tiên thõa cf => index của item đó
//indexOf(val): tìm val trong mảng => index của val đó

//21. every(cf): giống All trong DBI
//cf: (val, key, array) => {}: true | false
//chức năng: duyệt qua các item nếu tất cả các item đi qua cf đều được
//true thì every mới trả ra true
arr1 = [2, 4, 6, 8];
//muốn lọc ra các số chẳn
result = arr1.every((item) => item % 2 == 0);
console.log(result); //true

//22. some(cf): giống như IN trong DBI
// chỉ cần 1 pt thỏa thì some là true.
arr1 = [2, 4, 5, 6, 8];
result = arr1.some((item) => item % 2 == 0);
console.log(result); //true

//23. include(val) tìm xem val có tồn tại trong mảng không
// VD: 2 có nằm trong tập hợp đó không?
console.log([1, 3, 5, 7, 8, 10, 12].includes(2)); // false

//24. reverse(cf?)

//25. sort(cf?): sắp xếp
// ?: options có cx được không có cũng không sao.

// 1.Đối với mảng chứa các String
arr1 = ["Điệp", "An", "Bụp"];
// arr1 = arr1.sort();
// hoặc cũng có thể viếc cách này
arr1.sort();
console.log(arr1); //['An', 'Bụp', 'Điệp']

// 2. Đối với mảng chứa các Number
arr1 = [1, 20, 100, 5, 3];
arr1.sort(); //[1, 100, 20, 3, 5]
console.log(arr1);
// vì nó xem như chuỗi
// vì vậy cần phải dạy nó cách sắp xếp
arr1.sort((a, b) => a - b);
console.log(arr1); //[1, 3, 5, 20, 100]

//26. ***Reduce(cf, initial) != map
//cf : (total, current(item - value), currentIndex(index-key), array) => {}
// nếu map dùng để thay đổi các phần tử trong mảng theo 1 công thức
// reduce có khả năng biến đổi các pt và dồn hết về 1 biến.
arr1 = [1, 3, 20, 100];
result = arr1.reduce((total, item) => (total += item + 2), 0);
console.log(result); //132
//ứng dụng:
let productList = [
  { proName: "xe", desc: "audi" },
  { proName: "nhà", desc: "biệt thự" },
  { proName: "người yêu", desc: "ngọc trinh" },
];

let content = productList.reduce((total, product) => {
  return total + `<h1>${product.proName}</h1> <p>${product.desc}</p>`;
}, "");
document.querySelector(".demoReduce").innerHTML = content;
/*
- document.querySelector(".demoReduce") : Trong document tìm hằng đầu tiên có class == demoReduce
- innerHTML = content   : nội dụng trong html đã chọn được thì sẽ bằng content
*/

//** Không cần quan tâm: Có thể dùng reduce biến array thành object
arr1 = ["Điệp", 10, 22];
newObject = arr1.reduce((total, val, key) => {
  total[key] = val;
  return total;
}, {});
console.log(newObject);

//Object method
//Entry của object (key: value).
//Entry là một prop.
//key(index) thì luôn là String number.
//val(item): object| number| string| function
let worker1 = {
  lname: "Điệp 10 điểm",
  age: 25,
  //FD
  showInfor() {
    console.log(this.lname + " " + this.age);
  },
};
worker1.showInfor(); //Điệp 10 điểm

//1> Thêm thuộc tính.
worker1.point = 10;
worker1["point"] = 10;

//2> Update prop.
worker1.lname = "Điệp đẹp trai";

//3> xóa prop
delete worker1.age;
console.log(worker1);

//4> .assign(object 1, ...object 2)
// .assign() là method của Object
// giống concat()thay vì là nối, thì nó merge(hợp) object
// Cách hoạt động: Hằng sau đè hằng trước.
//target: person1 bị biến dạng.
//source: person2 không bị biến dạng.
// có thể nhận nhiều source

// Ví dụ
let person1 = {
  lname: "Điệp",
  age: 25,
  job: ["yangho", "coder"],
};

let person2 = {
  lname: "Lan",
  age: 24,
  company: "PiedTeam",
};

let person4 = {
  lname: "Trường",
  age: 18,
  company: "Team",
};

Object.assign(person1, person2, person4);
console.log("Test nè: ");
console.log(person1);
console.log(person2);
console.log(person4);

// Tuy nhiên trên thực tế thì cách này sẽ không được ưu chuộng.
// ưu tiên dùng spread.
let person3 = { ...person1, ...person2 };
console.log(person3);
//những hằng cũ sẽ không bị ảnh hưởng gì cả.
//nhưng sẽ bị 2 chàng trỏ 1 nàng.
person3.job = { ...person3.job }; //deep copy
console.log(person3.job == person1.job); //false

//5> .keys(): danh sách các key của object
// .keys() là method của Object
console.log(Object.keys(person3));

//6> .values(): danh sách các value của object
// .values() là method của Object
console.log(Object.values(person3));

//6> .entries(): danh sách các cặp (key: value) của object
// .entries() là method của Object
// trả ra một cái mảng lưu trữ các mảng giữ cặp key: value
console.log(Object.entries(person3));

//7> for-in: duyệt key của object chê set.

//8> for-of: duyệt value của object chê plain object

//9> for-each: duyệt value là chính và key là phụ và cũng chê plain object.
