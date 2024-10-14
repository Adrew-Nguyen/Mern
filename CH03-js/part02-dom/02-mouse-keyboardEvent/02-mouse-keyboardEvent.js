// drag JS
/*----------------------------------------------------------------------------------*/
//Phần 1: Mouse event
/*----------------------------------------------------------------------------------*/
/* (Lý thuyết)
  - Event: Cung cấp thông tin của những sự kiện đang xảy ra.
  - Thuộc tính của Event đối với Mouse event:
    + target: Chỉ đến đối tượng đang xảy ra sự kiện
    + clientX: tọa độ x so với góc (góc được xác định là góc đầu bên trái màn hình).
    + clientY: tọa độ y so với góc (góc được xác định là góc đầu bên trái màn hình).
    + offsetX: tọa độ x so với góc (góc được xác định là góc đầu bên trái của phần tử).
    + offsetY: tọa độ y so với góc (góc được xác định là góc đầu bên trái của phần tử).
*/
/*(Lý thuyết)
- Các chế độ của mouse:
  1. mouseover: đưa vô là có.  
  2. mouseout: đưa vô thì không có nhưng đưa ra thì có.
  3. click: ấn vào mới có.
  4. dblclick: ấn hai lần liên tiếp thì mới có.
*/

//Đề: Nhập nội dung vào tag input và lấy nội dung đó nạp vào list
//B1: DOM tới node button
let btnAdd = document.querySelector("#btn-add");

//B2: Lắng nghe sự kiện khi click vào nút
btnAdd.addEventListener("click", (event) => {
  console.log(event);
  //In ra sự kiện xảy ra.
  //console.log(event.target);
  //In ra element vừa dính sự kiện.

  //B3: DOM tới node input 
  let inputNode = document.querySelector("#name");

  //B4: Tạo một node li ảo
  let newItem = document.createElement("li");

  //B5: Set attribute cho node ảo này
  newItem.className = "card mb-3 p-2";

  //B6: Set nội dung của thẻ input vào node ảo mới tạo
  newItem.innerHTML = `<p>${inputNode.value}</p>`;

  //B7: DOM tới node list (cha của của các node li)
  let list = document.querySelector("#list");

  //B8: chèn node li mới vào cuối danh sách của node list
  list.appendChild(newItem);

  //B9: Reset lại ô input khi đã submit và tạo danh sách thành công
  inputNode.value = "";
});

/*----------------------------------------------------------------------------------*/
//Phần 2: Keyboard event
//Bất cứ một tag nào đều có thể lắng nghe keyboard event
/*----------------------------------------------------------------------------------*/
// piano sound online
// piano sound effect
// timer

/* (Lý thuyết)
  - Event: Cung cấp thông tin của những sự kiện đang xảy ra.
  - Thuộc tính của Event đối với KeyboardEvent:
    + target: Chỉ đến đối tượng đang xảy ra sự kiện
    + code: ký tự vừa ấn.
    + keycode: mã ascii của ký tự vừa ấn.
*/

/*(Lý thuyết)
 - Bất cứ một tag nào đều có thể lắng nghe keyboard event.
 - Hành trình của một keyboard event: keydown => keypress => keyup
 - Các mode của keyboard: 
    1. keydown: đè xuống.
    2. keypress: đè rồi.
    3. keyup: thả lên.
    4. input == keyup.
    5. change: khi gõ không có gì xảy ra khi ấn chuột chổ khác thì xuất hiện.
*/

let inputNode = document.querySelector("#name");
inputNode.addEventListener("keyup", (event) => {
  console.log(inputNode.value);
});



/*----------------------------------------------------------------------------------*/
//Phần 3: Cookie && localStorage
/*----------------------------------------------------------------------------------*/
/*(Lý thuyết)
  -  Giống nhau:
    + cookie && localStorage: phía lưu trữ client (lưu những thông tin không quan trọng)
  - Khác nhau:
    + local storage: 
            1. Được lưu trữ thẳng trên máy tính ngươi dùng (nằm ở application).
            2. Chỉ lữu trữ được dạng chuỗi và số(tự ép về chuỗi trước khi nạp) .
    + cookie: 
            1. Được lưu trữ ở một bên thứ 3.(Khá tốn kém vì phải thuê người ta).
            2. Chỉ lưu trữ được dạng chuỗi.
*/

/*(Lý thuyết)
  - Local starage chỉ lưu trữ chuỗi và số => Không lưu obj và array
  - Muốn lưu obj vào local starage => ép về chuỗi
    + Dùng thuộc tính .stringify của JSON để ép một obj => chuỗi
    + Dùng thuộc tính .parse của JSON để ép một chuỗi => obj
*/

// 1. Lưu trữ chuỗi
localStorage.setItem("name", "Điệp 10 ring");
// "name" là key.
// "Điệp 10 ring" là value

// 2. Lưu trữ số
localStorage.setItem("age", 18);
let age = localStorage.getItem("age"); // datatype: String

// 3. Lưu trữ obj
// localStorage chỉ lữu trữ được chuỗi và số mà thôi
// nếu muốn lưu object | mảng thì phải chuyển thành chuỗi dạng json
const profile = {
  name: "Điệp đẹp trai",
  age: 25,
};
console.log(profile); //{name: 'Điệp đẹp trai', age: 25}

//Chuyển object sang dạng chuỗi để có nạp vào local starage
let str = JSON.stringify(profile);
console.log(str); //{"name":"Điệp đẹp trai","age":25}
// profile là key
//`{"name":"Điệp đẹp trai","age":25}` là value

//Nạp str vào local starage
localStorage.setItem("profile", str);

let data = localStorage.getItem("profile"); // ra dạng chuỗi
console.log(data); //{"name":"Điệp đẹp trai","age":25}

//Chuyển từ dạng chuỗi sang object
let obj = JSON.parse(data);
console.log(obj); //{name: 'Điệp đẹp trai', age: 25}
