import express from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
const userRouter = express.Router() // Dùng epress.Router() để dụng user router.

// Handle: hàm có req, res
// Middlware: Là handle nhưng có thêm next() && sẽ được xử lý trước khi xử lý controller
//          Lưu ý: Có thể có 2 hoặc nhiều hơn 2 middlewware trong một chức năng
//  Controller: handle được xử lý sau cùng.

// Đặc biệt: đây được gọi middleware toàn cục(vào là luôn sẽ đi qua middleware này)
// userRouter.use(
//   (req, res, next) => {
//     console.log('Time1:', Date.now())
//     //return thì nó bay ra khỏi hàm luôn => kết thúc luôn hàm.
//     //next() nếu chỉ dùng như vậy thì mặc dù vẫn next xuống handle dưới
//     //nhưng nó vẫn chạy hết phần còn lại của handler(middleware này).
//     return next()
//     // nếu dùng như vậy thì next sang handler dưới và đồng thời kết thúc hàm hiện tại lun.
//     res.status(400).send('Not allowed')
//     console.log('ahihi')
//   },
//   (req, res, next) => {
//     console.log('Time2:', Date.now())
//     return next()
//   }
// )

// Đây được gọi là controller
// loginValidator ở đây được gọi là middleware cục bộ
// ở tầng middleware thì chỉ nên kiểm tra thôi chứ không nên vào database xem.
// chỉ nên ở tầng controller thì mới nên giao tiếp với database
// Path: localhost:3000/users/login
userRouter.post('/login', loginValidator, loginController)
//phương thức get thì không nhận body của req muốn thì dùng post
//loginValidator: kiểm tra tính hợp lệ.
//loginController: kiểm tra logic
//lớp 3 là service: database đò
//và đây là mô hình 3 lớp

/*
desc: Register a new user
Path: /register
Method: post
Body: {
    name: String,
    email: String,
    password: String,
    confirm_password: String,
    date_of_birth: String có dạng ISO8601
}
*/
userRouter.post('/register', registerValidator, registerController)

//public nó ra rồi để default lun để chỉ cần ấn tên ra là dùng được luôn
export default userRouter
