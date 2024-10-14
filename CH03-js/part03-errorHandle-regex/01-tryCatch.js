//** JS được coi là đơn luồng nhưng sẽ là
//                          đa luồng trên nền tảng wed

// Chia lỗi ra 3 lỗi chính:
// 1. runtimeError: lỗi xảy ra trong quá trình vận hành
// Do người dùng(client)

// 2. syntaxError : lỗi sai cú pháp
// Do người code(dev)

// 3. logicError: lỗi sai tư duy
// Do người code(dev)

//tryCatch: dùng để xử lý lỗi phát sinh trong runtimeError
//nhớ rằng tryCatch không vận hành trong syntaxError
//**Try Catch chỉ hoạt động trong môi trường đồng bộ.

/*Môi trường đồng bộ: 
- Anh này đợi anh kia
- VD: 
    + a 5s
    + b 10s
    + c 7s
=> Nếu đồng bộ thì mất 22s (đợi hết việc này rồi mới tới việc kia)
=> Nếu mất đồng bộ thì chỉ mất 10s chúng sẽ không đợi nhau, nhưng thứ tự thì cx từ trên
xuống dưới(Không cùng được kích hoạt cùng một lúc).
*/

//VD: Đồng bộ
// try {
//   //ReferenceError: diepPiedTeam is not defined
//   //phát hiện lỗi thì bay xuống "catch" luôn
//   diepPiedTeam;
// } catch (error) {
//     console.log(error);
// }

//bất đồng bộ
// try {
//     setTimeout(() => {
//         dPiedTeam;
//     }, 1000);
//     console.log("hello");

// } catch (error) {
//     console.log(error);
// }

// Lỗi sẽ không catch được mà phát ra bug luôn
// vì setTimeOut sẽ được đưa vào callbackQueue
// và code sẽ chuyển xuống dưới và rồi kết thúc trycatch
// rồi hàm setTimeOut mới bắt đầu chạy thì lúc này đẩy ra bug
// chứ không catch được

//Fixed: nên code như thế này
// setTimeout(() => {
//     try {
//     //ReferenceError: diepPiedTeam is not defined
//     diepPiedTeam;
//     console.log("Hello");
//     } catch (error) {
//     console.log(error);
//     }
// }, 1000);
//**Chơi với callBack là chơi với bất đồng bộ.

//callback hell?

// Cấu trúc của một ERROR trong như thế nào?
// Vì mình làm backend nên mình phải xử lý lỗi rất nhiều
// Xử lí lỗi : làm cho lỗi tường mình và dễ nhìn
//              và phải giấu đi những thông tin nhạy cảm

// gõ thử "new Error" và ctrl + click xem trong đó có gì.
// try {
//   diepPiedTeam;
//   console.log("hello");
// } catch (error) {
//   console.log(error);
//   console.log(error.name); //Định dạnh của lỗi
//   //ReferenceError
//   console.log(error.message); //Thông tin của lỗi
//   //diepPiedTeam is not defined
//   console.log(error.stack); //full thông tin
//   //ReferenceError: diepPiedTeam is not defined
//   // at 01-tryCatch.js:76:3

//   2 cách custom lỗi
//   //Cách 1: flow omit
//   //   let newError = {
//   //     ...error,
//   //     name: error.name,
//   //     message: error.message,
//   //     stack: "",
//   //   }

//   //Cách 2: flow omit
// //   const { stack, ...newError } = error;
// //   console.log(Object.getOwnPropertyDescriptors(error));
//      //enumerable: false -- nghĩa là làm mất khả năng duyệt mảng của nó
// }

//** Bàn sâu về flow
// stack là prop mà mình không muốn người dùng nhìn thấy nhất
// flow1: omit stack || loại bỏ cái stack đó đi
//Error                 newError
//name                     name
//message       ----->     message
//stack
// flow2: custom Error(sẽ học khi vào hệ thông backend)
//Error                   newError
// name                     status
// message       ----->     message
// stack

// mình có thể tự điều hướng về catch thông qua lệnh throw
// let money = 9999999999999999; //15 số 9
// try {
//   if (money > 999999999999999) {
//     throw new RangeError("Số quá lớn với sức chứa");
//   }
//   console.log(money);
// } catch (error) {
//   console.log(error);
// }

// Tạo instance là tạo 1 object

// EvalError(): tạo 1 instance đại diện cho một lỗi xảy ra liên quan đến
//                                                    hàm toàn cục Eval()

// InternalError(): tạo 1 instance đại diện cho một lỗi xảy ra khi 1 lỗi
//                 bên trong jsEngine được ném. vd: quá nhiều đệ quy
// Lỗi mà lập trình viên không thể rào bắt trước các lỗi
// Mã Lỗi: 500

// RangeError()   : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến số hoặc tham chiếu
//                  nằm ngoài phạm vi hợp lệ của nó

// ReferenceError : tạo 1 instance đại diện cho một lỗi xảy ra khi hủy tham chiếu của 1 tham chiếu
//                  không hợp lệ

// SyntaxError    : tạo 1 instance đại diện cho một lỗi xảy ra trong khi phân tích cú pháp
//                                                                          mã trong Eval()

// TypeError      : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến hoặc 1 tham số
//                  có kiểu không hợp lệ

// URIError       : tạo 1 instance đại diện cho một lỗi xảy ra khi encodeURI() hoặc decodeURI()
//                  truyền các tham số không hợp lệ

// Finally
// Dù có lỗi hay không có lỗi đều chạy qua finally
// loading = true;
// try {
//     GetData(); // hàm chưa có => lỗi
//     loading = false;
// } catch (error) {
//     loading = true;
// } finally{
//     loading = false;
// }

//** Tạo ra một dạng lỗi mới
class ErrorWithStatus extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status;
  }
}

try {
  throw new Error("Tôi bị hack rồi");
} catch (error) {
  let newError = new ErrorWithStatus({
    status: 401,
    message: "Mày là thằng gà",
  });
  console.log(newError);
}
