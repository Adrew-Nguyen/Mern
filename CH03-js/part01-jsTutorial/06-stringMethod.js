// 06-stringMethod.js

console.log("06-stringMethod.js");
// string là immutable: object có method không làm thay đổi object đó
// mà return về object kết quả vì thế cần một biến hứng.
// chuỗi trong JS được đặt trong dấu '' || "" || ``(templet string)


/*
================================Tổng hợp==============================================================
1/  length: độ dài

2/  .indexOf(str): vị trí của chuỗi str trong chuỗi cha

3/  .slice(start, end): tách chuỗi cha từ start đến end (có thể duyệt ngược)

4/  .substring(start, end) :  tách chuỗi cha từ start đến end(không có duyệt ngược)

5/  .substr(start, length): tách chuỗi cha từ vị trí start lấy một mảng có độ dài bằng length

6/  .replace(từ muốn thay, từ thay): thay thế `từ muốn thay` đầu tiên trong chuỗi cha thành`từ thay`.
    .replace(regax, từ thay) 

7/  .replaceAll(từ muốn thay, từ thay) ==  .replace(/regax/g, từ thay): 
		thay thế tất cả các từ giống `từ muốn thay` trong chuỗi cha thành`từ thay`.

8/  .toUpperCase() : In hoa chuỗi

9/  .toLowerCase(): In thường chuỗi

10/ .concat(...string) || "+" || template string ``: Nối chuỗi

11/ .trim(): bỏ space ở hai đầu

12/ == so sánh giá trị === so sánh địa chỉ

13/ charAt(number): tìm ký tự ở vị trí number trong chuỗi cha
======================================================================================================
*/ 


// 1. length: là prop của string cung cấp độ dài.
let str = "ahihi";
console.log(str.length);


// 2. indexOf(str): là method nhận vào chuỗi và trả ra vị trí tìm được chuỗi đó.
console.log(str.indexOf("h")); // 1
console.log(str.indexOf("ih")); // 2
console.log(str.indexOf("s")); // -1


// 3. slice(start, end): tách chuỗi.
// Chiết xuất chuỗi con trong chuỗi cha.

  // I> Tính từ start đến (end - 1).
  let x = "Xin chào PiedTeam, mình là Điệp";
  console.log(x.length);
  let result = x.slice(9, 17); //PiedTeam

  // II> Tách theo chiều ngược luôn (end + 1).
  // xem -14 là start và -22 là end.
  result = x.slice(-22, -14);
  console.log(result); //PiedTeam

  // III> Cắt bằng 1 parameter: từ vị trí đó cắt cho đến hết
  result = x.slice(9); // PiedTeam, mình là Điệp

  // IV> Cắt bằng 1 parameter nhưng ngược.
  // coi start là -0 và end là -12
  result = x.slice(-12); // mình là Điệp


// 4. substring(start, end): giống slice không có duyệt ngược
// Chiết xuất chuỗi con trong chuỗi cha nhưng không có khả năng duyệt theo chiều ngược.
result = x.substring(9, 17);
console.log(result); // PiedTeam


// 5. substr(start, length): 
// Chiết xuất chuỗi con từ start có độ dài là length.
// function đã bị deprecated(Không được dùng nữa) trong JS.  
result = x.substr(9, 8); 
console.log(result);//PiedTeam

//II - Các method phổ biến:

//1> .replace: thay thế chuỗi
// Có hai cách dùng cơ bản:
  
  //Cách 1: Dùng bình chữ thay thế bình thường
  //Nhược điểm: chỉ thay đổi một lần. 
  let str1 = "PiedTeam có nhiều bạn rất nhiều tiền";
  str1 = str1.replace("nhiều", "ít");
  console.log(str1); //PiedTeam có ít bạn rất nhiều tiền

  // Cách 2: Dùng regex:
  //Ưu điểm: chữ nào trong string thõa được regax thì đều thay đổi
  // g: Toàn cục (global). Tìm tất cả các lần xuất hiện của mẫu.
  str1 = "PiedTeam có nhiều bạn rất nhiều tiền";
  str1 = str1.replace(/nhiều/g, "ít");
  console.log(str1); //PiedTeam có ít bạn rất it tiền
  //thay đổi tất cả các chữ nhiều

//2. replaceAll()
str1 = "PiedTeam có nhiều bạn rất nhiều tiền";
str1 = str1.replaceAll("nhiều", "ít");
console.log(str1); //PiedTeam có ít bạn rất ít tiền


//3. toUpperCase() 
console.log(str1.toLowerCase());//piedteam có ít bạn rất ít tiền


//4. toLowerCase()
console.log(str1.toUpperCase());//PIEDTEAM CÓ ÍT BẠN RẤT ÍT TIỀN


//5 .conCat(): nối chuỗi
// Hàm nhận một rest parameter có kiểu dữ liệu là String
// hàm này nhận vào 1 rest parameter string

str1 = "Xin chào";
let str2 = "piedTeam";
str3 = str1.concat(" ", "mừng bạn đến vơi", " ", str2);

//Ngoài cách dùng .concat() để nối chuỗi thì vần còn vài option để dùng.

  // Cũng có thể dùng dấu cộng để thực hiện việc nối chuỗi
  str3 = str1 + " " + "mừng bạn đến vơi" + " " + str2;

  // Cũng có dùng template để thực hiện việc này.
  //${}: chèn giá trị hoặc biểu thức vào một chuỗi khi sử dụng template String.
  str3 = `${str1} mừng bạn đến với ${str2}`;
  console.log(str3); //Xin chào mừng bạn đến với piedTeam


//6. trim(): xóa khoảng cách thừa ở 2 đầu mút.
str1 = "  xin      chào   các    bạn   ";
str1 = str1.trim();
console.log(str1); //xin      chào   các    bạn


//7. So sánh chuỗi   ==: so sánh giá trị || ===: so sánh địa chỉ
// Liên quan tới String pool 
str1 = "Xin chào các bạn";
str2 = "Xin chào các bạn";
console.log(str1 == str2); // true
console.log(str1 === str2); // true
// "Xin chào các bạn" nằm trong vùng nhớ string pool của heap 

str1 = "Xin chào các bạn";
str2 = new String("Xin chào các bạn");
console.log(str1 == str2); // true // auto-unboxing
console.log(str1 === str2); // false
//Không bằng nhau vì từ khóa "new" đây là yêu cầu tạo ra một object mới nên không
//dung cơ chế cơ String pool được


//8. charAt(index): trả ra ký tự ở vị trí index trong chuỗi.
str = "Lê Mười Điệp";
console.log(str.charAt(3)); //M
console.log(str[3]); //M

str[3] = "L";
console.log(str);//Lê Mười Điệp
// Không thay đổi vì string là immutable


//Ứng dung:

  //Vài cách để format lại một chuỗi không có dấu cách thừa
    //Cách 1: Dùng .replace() để xóa khoảng cách thừa ở giữa các từ
    //Xuất hiện 2 dấu cách liền kề nhau thì thay bằng 1 dấu cách.
    //Sau khi xử lý ở giữa thì dùng .trim() để xử lí hai đầu.
    str1 = "  xin      chào   các    bạn   ";
    str1 = str1.replace(/\s+/g, " ").trim();
    console.log(str1); // xin chào các bạn

    // cách 2: pro player có kinh nghiệm xử lý mảng và chuỗi.
    // .split: Để tìm cách tách từng chữ trong chuỗi ra.
    // .filter: lọc từ thì giữ còn dấu cách thì bỏ
    // .join: nối lại
    str1 = "  xin      chào   các    bạn   ";
    str1 = str1
      .split(" ")
      .filter((item) => item != "")
      .join("-");
    console.log(str1);//xin-chào-các-bạn

//Về làm: :LÊ mưỜi ĐIỆP  => "Lê Mười Điệp"
str1 = "LÊ mưỜi ĐIỆP";
console.log(str1);

str1 = str1.toLowerCase()
           .trim()
           .replace(/(^|\s)\S/g, (a) => a.toUpperCase());       
console.log(str1);

