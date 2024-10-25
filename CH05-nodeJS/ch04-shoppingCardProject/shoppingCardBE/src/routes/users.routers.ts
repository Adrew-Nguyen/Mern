import express from 'express'
import { register } from 'module'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
//Dựng user route
const userRouter = express.Router()

//setup middlware
//hàm có res, req là handler
//handler có next đc gọi là middleware.
//có thể có hơn 2 middlewware trong một dự án.
//handler xử lý cuối cùng thì được gọi là controller.
//Đây được gọi middleware toàn cục(vào là luôn sẽ đi qua middleware này)
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
//loginValidator ở đây được gọi là middleware cục bộ
// ở tầng middleware thì chỉ nên kiểm tra thôi chứ không nên vào database xem.
// chỉ nên ở tầng controller thì mới nên giao tiếp với database
//localhost:3000/users/login
userRouter.post('/login', loginValidator, loginController)
//phương thức get thì không nhận body của req muốn thì dùng post
//loginValidator: kiểm tra tính hợp lệ.
//loginController: kiểm tra logic
//lớp 3 là service: database đò
//và đây là mô hình 3 lớp

userRouter.post('/register', registerController)

//public nó ra rồi để default lun để chỉ cần ấn tên ra là dùng được luôn
export default userRouter
