// 02-promise.js
//`Promise: một lời hứa sẽ diễn ra trong tương lai.
// Promis là `eager` chứ không phải `lazy`.
// =>Ý nghĩa: có hiệu lực từ khi phát động `promise`.

// Một lời hứa cơ bản:
// VD: Anh hứa sẽ đi Vùng Tàu và mua bánh bông lan trứng muối về cho em
//                                                        trong tháng 10!!!
//    - Khi hứa thì phải nghĩ tới kết quả khi trường hợp thất bại và thành công.
//          => Nếu thành công: "niềm tin, 1 nụ hôn".
//          => Nếu thất bại  : "1 sự thất vọng".

// Một lời hứa sẽ có 3 trạng thái
// Lưu ý: Chỉ nằm 1 trong 3 trạng thái trong cùng một thời điểm thôi.
// 1. `Pending`: đang chờ kết quả, đang thực thi, đang thực hiện.
// 2. `OnFulFilled`: cái Promise sẽ dùng resolve("1 nụ hôn").
// 3. `OnRejected`: cái Promise sẽ dùng reject("1 sự thất vọng").


//TH1: Giả sử: Đầu tháng 10 sếp ép ảnh phải ra Vũng Tàu công tác 2 ngày.
//==> Rất dễ để mua bông lan trứng muối => giữ được lời hứa.
//==> Trạng thái lời hứa của anh sẽ được
// chuyển từ `Pending` sang `onFulFilled`

//TH2: Giả sử: Nếu như xui, trời đánh thánh vật, ảnh bệnh tật
// hết nguyên tháng 10.
// => Vì vậy không đi Vũng Tàu được => Không mua được bánh => Thất hứa.
//==> Trạng thái lời hứa của anh sẽ được
// chuyển từ `Pending` sang `onRejected`

//Thực hành.
//Syntax:
//Cách 1:  new Promise((resolve, reject)=> {})
//Cách 2:  new Promise(function (resolve, reject) {});

// //Tạo bối cảnh
// //-- Vai 1: Tác nhân ngoại cảnh(ví dụ: Chúa).
// // Giả sử túi tiền có 1000.
// let wallet = 1000;


// //-- Vai 2: Anh trai hứa cô gái
// //"Anh hứa sẽ mua cho em chiếc cà rá 5000$"
// let p1 = new Promise((resolve, reject) => {
//     if (wallet >= 5000) {
//         resolve("1 nụ hôn");
//     } else {
//         reject("1 sự thất vọng");
//     }
// })

// //--Vai 3: cô gái nhận lời hứa
// //nếu thành công thì  `.then`
// //nếu thất thì thì `.catch`
// p1.then((value) => {
//     //value: giá trị bên resolve
//     console.log(`Nếu code chạy vào đây, nghĩa anh ấy đã đủ tiền mua nhẫn
//         và lời hứa đã chạm được vào resolve => code vào then =>
//             value là những gì nằm trong resolve`);
//     console.log(value);
// }).catch((error) => {
//     console.log(`Nếu code chạy được vào đây thì anh ấy không đủ tiền
//         và lời hứa đã chạm vào reject => code vào catch => error chính
//         là những gì có trong reject.`);
//     console.log(error);
// })

// wallet = 6000;
// //Thì cũng vào catch vì cô gái đã kiếm chứng rồi.
// //==> vẫn là thất hứa thui.


//Demo 1:
//Thử chuyển 1 async callback về thành 1 promise;
// => Không đồng bộ
// let data;//undefined

// //Mô phỏng rằng lên sever và lấy dữ liệu về.
// //và việc này chắc chắn sẽ mất thời gian.
// //sau 3s thì biến data mới có giá trị
// setTimeout(()=>{
//     data = {name: "Điệp", age: 25};
// }, 3000);

// console.log(data);


// // Dùng promise để chuyển thành đồng bộ
// // B1: Ép Sever hứa rằng sẽ trả dữ liệu sau 1 khoảng thời gian nhé.
// // Nhưng sẽ có 2 TH giao tiếp với sever thất bại:
// //                  + gữi đường dẫn sai.
// //                  + mất mạng giữa chừng.

// // thành công và và thất bại của sever là 'có kết nối được sever không'.
// // =>     sever không bao giờ reject
// let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve({ name: "Điệp", age: 24 });
//     }, 3000);
// })

// //Đóng vai client: người dùng
// //xác thực lời hứa từ sever.
// let data;
// p2.then((value) => {
//     data = value;
//     console.log(data);
// });

// //Giai đoạn từ 0 đến 3s đc gọi là `pending`
// //nếu sau đó resolve thì sẽ có trạng thái onFulFilled vào then
// //nếu rejecct thì em sẽ có onReject vào catch.
// //nhưng server không bao giờ reject
// //nếu thất bại thì server vẫn có resolve("câu chữi").

// Promise is eager not lazy
//Cách 1:
//Ví dụ: cách không hay
//lời hứa khi vừa viết xong thì đã chạy rồi.
// let a = 1;
// let p3 = new Promise((resolve, reject) => {
//     a++;
// });
// console.log(a);

// //Cách 2: hơi không hay: function
// let a = 1;
// function ahihi(){
//     let p3 = new Promise((resolve, reject) => {
//         a++;
//     });
//     return p3;
// }
// ahihi();
// //vì ahihi() return `Promise` nên nó cũng có thể .then .catch thoải mái
// console.log(a); //2

//Cách 3: dùng arrow
// let a = 1;
// let p3 = () => {
//     return new Promise((resolve, reject) => {
//         a++;
//     });  
// }
// p3();
// //p3 là một hàm trả một cái promise nên có thể .then .catch
// console.log(a);

//------------------------------------------------------------------
//1 promist chỉ có thể rơi vào 1 trong 3 trạng thái sau:
//  pending           onFulFilled           onRejected
//                      resolve                 reject

// resolve => onFulFilled => then
// reject  => onRejected  => catch
// resolve và reject rất giống return

// resolve ném giá trị cho then dưới dạng value.
// reject ném giá trị cho catch dưới dạng error.

// resolve và reject không thể ngừng code lại như return
// trong Promise nếu chạm resolve trước thì onFulfilled.
//                        reject trước thì onRejected.

// let p4 = () => {
//     return new Promise((resolve, reject) => {
//         resolve("ahihi");
//         reject("Lỗi chà bá");
//         console.log("Xin chào các bạn mọi người");
//     });
// };

// //xác thực 
// p4().then((value) => {
//     console.log("thành công " + value);
// }).catch((error) => {
//     console.log("Thất bại " + error);
// });

// //resolve và reject thì dựa vào hằng tới trước thì lấy trước
// // xong bỏ qua hằng con lại rồi chạy tới line code khác

// //Cách viết 2
// p4().then(
//     (value) => {
//         console.log("thành công " + value);
//     },
//     (error) => { 
//         console.log("Thất bại " + error);
//     }
// )

//Main concept
//*1. Nếu return trong then | catch thì ta đưa promise về
// `onFulFilled`.
// let p5 = () => {
//     return new Promise((resolve, reject) => {
//         reject("Lỗi chà bá");
//     });
// };

// //Xác thực
// p5().then((value) => {
//     console.log("P5 đã thành công và nhận được " + value);
// }).catch((error) => {
//     console.log("P5 đã thất bại và bị " + error);
//     return  "Lê Hồ Điệp"; 
//     //return Promise.resolve("Lê Hồ Điệp")
// }).then((value) => {
//     console.log("Lần này anh ấy đã có được "+ value);
// })

// //*2: Nêu throw trong then | trong catch thì sẽ đưa về'onRejected'.
// let p5 = () => {
//     return new Promise((resolve, reject) => {
//         resolve("Vui ghê");
//     });
// };

// //Xác thực
// p5().then((value) => {
//     console.log("Value là: " + value);
//     throw "Ahuhu";// promise.reject("ahuhu");
// }).catch((error) => {
//     console.log("P5 đã thất bại và bị " + error);
//     return "Lê Hồ Điệp";
// }).then((value) => {
//     console.log("Lần này anh ấy có được " + value);
// }).catch((error) => {
//     console.log("Error: " + error);
// });

// Dùng promise để xử lý bất đồng bộ.
// ví dụ ta có 2 task cần làm
// task1: Lấy profile từ server về(3s).
// task2: lấy article từ server về(2s).

//mô phỏng việc lên việc database lấy profile từ server về
//ép server phải hứa rằng sau 3s thì đưa cho mình profile
let getProfile = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "Điệp", age: 25 });
        }, 3000);
    });
};

let getArticle = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["Hoàng tử bé", "Mèo dạy hải âu bay",
                "Cây cam ngọt của tôi"]);
        }, 2000);
    })
}

//nếu hai tác vụ làm độc lập thì chỉ cần tốn 3s để hoàn thành 2 task

//Tổng thể là không đồng bô của 2 task nhưng bên trong của nó  
// vẫn đồng bộ trong nội bộ.
// getProfile().then((value) => {
//     console.log(value);
// });

// getArticle().then((value) => {
//     console.log(value);  
// })

//nếu bây h anh muốn có nguyên nhân kết quả
// Demo đồng bộ
// không nên như vậy vì vậy sẽ gây ra promise hell
// getProfile().then((value) => {
//     console.log(value);
//     getArticle().then((value) => {
//         console.log(value);
//     })
// });

// Cách viết chuẩn
//==> tránh được promise hell
// nếu return thì tìm then gần nhất còn throw thì tìm catch gần nó nhất.

getProfile().then((value) => {
    console.log(value);
    return getArticle();
}).then((value) => {
    console.log(value);
})
