// DOM: Document object model.
// Document được xem html.
// mọi thứ đều được xem là 1 phần tử.
// thể hiện qua mối quan hệ cha con.

/*-----------------------------------------------------------------------------------------------------------*/
//Phần 1: Liên Kết DOM (DOM)
//Móc một biến vào một đối tượng(tag) trong DOM.
//Tạo một biến và lưu trữ cái tag (sự dụng biến đó để control tag đó).
//Không gọi là tag mà gọi là node(object có chu trình sống(tạo ra - hiển thị - kết thúc))
//Nếu muốn DOM một đối tượng thì có 2 cách:
/*-----------------------------------------------------------------------------------------------------------*/

/* (Lý Thuyết)
Cách 1:
 - Truyền vào giá trị ID
 - Lưu ý: 
    + Tìm id thì thu được 1.
    + Tìm class thì có thể thu được nhiều.

 - Kết quả đưa ra có thể ở hai dạng:
    + Hiện thị dưới dạng object: `input#name.form-control`.
    + Hiện thị node(tag) móc được: `<input id="name" type="text" class="form-control">`
         
*/
//Móc thông qua ID thì chỉ lấy được một
let inputNode = document.getElementById("name");
console.log(inputNode);

//Móc thông qua class thì có lấy được nhiều
//Nó sẽ trả ra một dạng HTMLColection dù móc được 1 hay nhiều tag
let cardNode = document.getElementsByClassName("card"); //HTMLColection => Không có forEach
console.log(cardNode);
/* (Lý thuyết)
HTML Colection:
  - HTMLColection khá giống Array nhưng nó thiếu vài method cần thiết để xử lí mảng.
  - Nó không có method của array.(không có forEach).
    + Muốn có method của array thì biến về mảng dùng spread operator.
*/

//***Biến HTMLColection thành array
//Dùng spread operator để phân tách
let cardList = [...cardNode];
cardList.forEach((val) => {
  console.log(val);
});

/*-----------------------------------------------------------------------------------------------------------*/
/* (Lý Thuyết)
Cách 2:
 - Truy cập phần tử bằng một câu queryCSS.
 - Tìm id thì dùng `#`
 - Tìm class thì dùng `.`
 - Lưu ý:
    + Nếu dùng querySelector thì chỉ tìm được 1.
    + Nếu dùng querySelectorAll thì có thể thu được hết. 
*/

//querySelector: cho phép ta query tìm kiếm phần tử dựa trên selector css.
//Nhược điểm: Dù class hay id chỉ chỉ tìm một phần tử đầu tiên
inputNode = document.querySelector("#name"); //truyền vào selector CSS.
console.log(inputNode);

//Dùng querySelectorAll: để móc hết các tag có class `card`.
//Lưu ý: Nó sẽ trả về một cái NodeList
let cardList1 = document.querySelectorAll(".card"); //NodeList
cardList1.forEach((val) => {
  console.log(val);
});
/*
NodeList:
  - Nodelist thì sẽ giống array hơn HTMLColection.
  - Nó sẽ có vài method của array
*/

/*-----------------------------------------------------------------------------------------------------------*/
/* (Tổng kết)
So sánh giữa cách 1 và cách 2
- Giống nhau:
  + Nếu tìm ID thì chỉ thu được một đối tượng.(Cách 1: .getElementById() || Cách 2: .querySelector())
- Khác nhau:
  + Cách 1: Tìm class thì có thể thu được nhiều đối tượng. (.getElementByClassName()).
  + Cách 2: Tìm class thì cũng chỉ thu được một đối tượng. (.querySelector()).
*/

/* (Tổng kết)
  - Nếu muốn móc nhiều class thì có thể dùng 2 cách:
    + Cách 1: Dùng .getElementByClassName() => HTMLColection(thiếu method để xử lí mảng) => Không nên.
    + Cách 2: Dùng .querySelectorAll() => NodeList(có method để xử lí mảng) => Tạm được.
*/

/*-----------------------------------------------------------------------------------------------------------*/
//Phần 2: Thuộc tính trong một node
/*-----------------------------------------------------------------------------------------------------------*/
let firstCard = document.querySelector(".card");
console.log(firstCard);

//VD1: childNode
console.log(firstCard.childNodes); //[text, h2, text, p, text] NodeList
//Nhược điểm: sinh ra những tag con 'text' không cần thiết.

//VD2: children
console.log(firstCard.children); //[h2, p] HTMLCollection
//Nhược điểm: HTMLCollection

//VD3:classList
console.log(firstCard.classList); //['card', 'p-2', 'mb-3']
//Return về một mảng class có thể push hoặc pop thêm vào.
//Dùng khi không quan tâm class trước phía trước.

//VD4:className
console.log(firstCard.className); // "card p-2 mb-3"
//Return về chuỗi
//Dễ dàng khi thêm một số lượng lớn (thuận tiên hơn hằng classList rất nhiều).

//VD5: parentElement
console.log(firstCard.parentElement); //lấy phần tử cha

//VD6: .nextElementSibling
console.log(firstCard.nextElementSibling); // tìm một hằng ở phía dưới giống mình

//VD7:
console.log(firstCard.firstChild); //text

//VD8:
console.log(firstCard.firstElementChild); //h2

/*(Tổng kết)
- Những thuộc tính cần quan tâm của node.
  + .childNodes => return một NodeList gồm những phần tử con trong chính nó
                  + Nó xem khoảng cách giữa các tag con và tag cha là là một tag 'text' => đều này không hay.(VD1).

  + .children => return một HTMLColection chỉ gồm những tag con thật sự trong nó. => Tạm được. (VD2)

  + .classList => return ra một mảng chứa gồm những class của node 
              => Dùng: Khi không quan tâm đến class ở phía trước(vì mảng nên push pop đc) (VD3)

  + .className => return ra một chuỗi chứa những class của node.
              => Dùng: Khi muốn thêm một số lượng lớn class cho node. (VD4)


  + .pareantElement => return phần tử cha của node. (VD5)

  + .nextElementSibling => return ra một hằng ở phía dưới giống mình (VD6)

  + .firstChild => return con đầu tiên của node đó (có tính cả tag `text' [Khoảng cách]) (VD7)

  + .firstElementChild => return con thật sự đầu tiên của node đó(Không có tính tag 'text' [Khoảng cách]) (VD8)
*/

/*-----------------------------------------------------------------------------------------------------------*/
//Phần 3: Ứng dụng
//Tạo ra một card mới bằng js và nhét vào html.
//Đây là dom ảo => Không query đến dom ảo được.
/*-----------------------------------------------------------------------------------------------------------*/

// 1. Tạo một card bằng tag div
let newCard = document.createElement("div");

// 2. Adding class cho tag vừa tạo.

//Có hai cách:
//Cách 1: dùng classList => Không nên vì có quá nhiều thứ cần thêm nên cách này quá lâu
// newCard.classList.add("card", "mb-3", "p-2");

//Cách 2: dùng className => vì nó là chuỗi nên thuận tiện trong việc add => Nên
newCard.className = "card mb-3 p-2";

// 3. Thêm nội dung bên trong cho div vừa taok
newCard.innerHTML = `
<h2>Tao được tạo bằng JS</h2>
<p>Tao là 1 node fake</p>
`;

// 4. DOM đến node cha của của card
let cardGroup = document.querySelector(".card-group");

// 5.1 Thay thế div vừa tạo vào một vị trí mong muốn trong tag con của node đã được DOM
cardGroup.replaceChild(newCard, cardGroup.children[1]);

// 5.2 Thêm div vừa tạo vào cuối danh sách các node con của node cha.
// cardGroup.appendChild(newCard);

// 6. Thêm và xóa attribute vào node
firstCard.setAttribute("ahihi", "1");
console.log(firstCard.getAttribute("ahihi")); //1
firstCard.removeAttribute("ahihi");
