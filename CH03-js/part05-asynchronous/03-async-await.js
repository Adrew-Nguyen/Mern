//Ngày xưa ngta dung callback để xử lý bất đồng bộ,
//Nhưng dễ bị callback hell.
//ES6: người ta dùng promise để khắc phục callback hell.
//ES7: function async Await được dùng để kết hợp với promise
//giảm tải việc dùng .then .catch

//function async là một hàm return về một promise
new Promise((resolve, reject) => {
    resolve("ahihi");
})

// Viết tắt của trên nhưng lại bọc them vào 1 lớp function để tránh trường hợp từ động chạy
function handle() {
    return Promise.resolve("ahihi");
}

//hàm này cũng y chang hàm trên nhưng dùng async function thui cả hai đều trả Promise
//nhưng vì return nên sẽ ở trạng thái onFulFilled
async function handle1() {
    return "ahihi";//return Promise.resolve("ahihi");
}
console.log(handle());//Promise.resolve("ahihi");
console.log(handle1());//Promise.resolve("ahihi");
handle().then((value) => {
    console.log(value); // ahihi

})
handle1().then((value) => {
    console.log(value); // ahihi
})


//Await: đợi 1 tý
// let getProfile = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({ name: "Điệp", age: 25 });
//         }, 3000);
//     });
// };

// let getArticle = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(["Hoàng tử bé", "Mèo dạy hải âu bay",
//                 "Cây cam ngọt của tôi"]);
//         }, 2000);
//     })
// }

// // cách 1: Nguyên nhân kết quả(5s)
// let getData = async () => {
//     let profile = await getProfile();
//     let article = await getArticle();
//     console.log(profile, article);
// };

// getData();
//Nhược điểm của async await là không có hàm xử lý lỗi cụ thể => nên phải dùng try-catch
//Ưu điểm: không cần .then .catch

// let getData = async () => {
//     try {
//         let profile = await getProfile();
//         let article = await getArticle();
//     } catch (error) {
//         console.log(error);
//     }
//     console.log(profile, article);
// };

// cách 2: độc lập 3s
// let getData = async () => {
//     const [profile, article] =  await Promise.all([getProfile(), getArticle()]);
//     console.log(profile, article);
// };
// getData();

//I- Xử lý lỗi
// let getStudent = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject("Lỗi kinh hoàng!!!");
//         }, 3000);
//     })
// }

// Xử lý bằng promise.
// getStudent().then((value) => {
//     console.log(value);

// }).catch((error) => {
//     console.log(error);
// })

//xử lý bằng async await thì sao?
// let handle3 = async () => {
//     try {
//         let student = await getStudent();
//         console.log(student);
//     } catch (error) {
//         console.log(error);
//     }
// }
// handle3();

//Đừng bao giờ dùng async với các toán tử đồng bộ
//Demo
let x = 0;
let handle4 = async () => {
    x += 1;
    console.log(x);
    return 5;// return Promise.resolve(5)
}
let handle5 = async () => {
    x += await handle4();
    console.log(x);
}
handle5();