//01-asynchronous - callback.js

//Bản thân của JS là ngôn ngữ đơn luồng.
//Đơn luồng: chạy tuyến tính từ trên xuống dưới(sequential).
//Nhưng JS lại chạy trên wed hoặc nodeJS(JS runtime enviroment): 2 môi trường để chạy code JS.
//2 thằng này hổ trợ đa luồng cho JS(V8).
//PhP và Java là đa luồng.

//1. Synchronous: Đồng bộ.
//- Có 1 tác vụ L1(chiếm 3s để hoàn thành) và L2(chiếm 2s để hoàn thành).
//- Đồng bộ có xu hướng đợi nhau.
//=> Để hoàn thành L1 và L2 thì tốn 5s.
//=> Nhưng nếu L1 là nguyên dẫn đến L2 thì mới hợp lí cho trường hợp đồng bộ.


//2. Asynchronous: bât đồng bộ
//- Ngược lại nếu L1 và L2 là 2 tác vụ độc lập.
//- thì ta muốn nó không cần đợi nhau nữa, chạy cùng lúc cho nhanh.
//=> Vì thể để hoàn thành L1 và L2 thì chỉ cần 3s.
//=> Trường hợp này gọi là asynchronous(bất đồng bộ).

//- JS luôn là asynchronous, việc này vừa tốt vừa xấu.
//- Khi nào cần L2 đợi L1 thì mình phải chỉnh về synchronomous.


//1. Call stack: là một cấu trúc dữ liệu dạng ngăn xếp(stack) => LIFO.
// Chỉ chứa các thao tác "đồng bộ" còn các tác vụ "bất đồng bộ" thì sẽ đc "Wed Apis" xử lý
// và đợi trong "callBack Queue"(hàng đợi của call back) trước khi được đưa ngược về call stack.
//2. Event loop: liên tục lập đi lập lại chờ đợi một sự kiện "click", "submit" hoặc các callback.
//  Nhiệm vụ: giám sát Call Stack và Callback Queue.
//  Khi Call Stack trống, nó sẽ lấy các tác vụ từ Callback Queue và
//  đẩy chúng vào Call Stack để thực thi.
//3. Callback queue(kiu): hàng đợi thực thi(tác vụ bất đồng bộ (như callback hoặc các sự kiện UI như click, submit) 
// đã hoàn thành ở "Wed Apis" và đang đợi "Event loop" để được đưa vào Call Stack để thực thi).

//- Về vùng nhớ: memory heap và call stack.
//- wed Apis: DOM | AJAX(XMLHttpRequyest) | timeOut(setTimeOut|....)


// DEMO 1: 
function a(x) {
    console.log(x);
}
function b(y) {
    a(y + 2);
}
b(5);//7
function c(z) {
    b(z + 1);
}
c(5);//8
//loupe
//c(5) => z = 5
//c(5) => b(z + 1) => z + 1
//c(5) => b(z + 1) => y = z + 1
//c(5) => b(z + 1) => a(y + 2) => y + 2
//c(5) => b(z + 1) => a(y + 2) => x = y + 2
//c(5) => b(z + 1) => a(y + 2) => log(x)


// Demo 2
function main() {
    console.log("command1");
    setTimeout(function () {
        console.log("command2");
    }, 3000);
    console.log("command3");
    setTimeout(function () {
        console.log("command4");
    }, 1000);
}
main();
//command 1
//command 3
//command 4
//command 2

/*
//JS là ngôn ngữ không đồng bộ. Vì vậy có vài cách để fix bất đồng bộ
//1. asynchronous callback: xử lý bất đồng bộ bằng callback.
docfile("ProductData.txt", (data) => {
    console.log(data);
})

dofile = function(urlFile, func){
    //urlFile trúy vấn file và đọc file 3s thu về data
    func(data); // để xử lý
}
//ưu điểm: dễ viết
//Nhược điểm: khó fix bug, callback hell
*/

//2. promise: lời hứa


// DEMO 3(hay)
//thay let thử
for (var i = 0; i <= 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 5000);
}
//output với var: 4 4 4 4
//output với let: 0 1 2 3 
//var là sài chung một i.
//nếu dùng let thì mỗi vòng lặp là một i khác nhau.


//Demo 4: 
// try {
//     throw new ("Ahihi đồ ngốc");
//     //Nếu để như vậy thì nó bặt được error và đẩy thông báo ra màn hình 
//     //không phát ra bug.
// } catch (error) {
//     console.log(error);
// }

//Lưu ý: khi chơi với try catch là không chơi với bất đồng book.
//Không nên xử lý như này.
//vì khi chạy tới setTimeOut thì callbackFC đã đc chuyển qua callBack Queue rồi
//khi hết timeOut thì nó mới chạy. Nhưng JS bẩn chất là bất đồng bộ nó sẽ không đợi
//nó sẽ chạy xuống dưới luôn => thoát khỏi try catch luôn
//vì vậy khi muốn try catch đi với setTimeOut thì nên để setTimeOut() bọc truy catch.
try {
    setTimeout(function () {
        throw new Error("Lỗi chà bá");
    }, 3000);
} catch (error) {
    console.log(error);
}

//Nên bọc settimeOut ngoài truCatch khi muốn chơi trong môi trường bất
//đồng bộ
setTimeout(() => {
    try {
        throw new ("SettimeOut bọc tryCatch nè!");
    } catch (error) {
        console.log(error);
    }
}, 9000);